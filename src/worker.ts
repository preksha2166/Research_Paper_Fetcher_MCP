import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

// Cloudflare Workers entry point
export default {
  async fetch(request: Request, env: any, ctx: any): Promise<Response> {
    // Handle CORS
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    try {
      // Parse the request
      const body = await request.json();
      
      // Create MCP server instance
      const mcp = new McpServer(
        { name: "research-paper-fetcher", version: "1.0.0" },
        { capabilities: { tools: {} } }
      );

      // Register tools
      mcp.tool(
        "search_papers",
        "Search for research papers across multiple academic databases",
        {
          query: z.string(),
          filters: z
            .object({
              yearFrom: z.number().optional(),
              yearTo: z.number().optional(),
              openAccessOnly: z.boolean().optional(),
              maxResults: z.number().optional(),
              sortBy: z.enum(["relevance", "date", "citations"]).optional(),
            })
            .passthrough()
            .optional(),
        },
        async ({ query, filters }) => {
          const mod = await import("./tools/search-papers.js");
          const { papers } = await mod.searchPapers({ query, filters: filters || {} });
          return { content: [{ type: "json", json: { papers } }] } as any;
        }
      );

      mcp.tool(
        "generate_summary",
        "Generate AI-powered summary for a research paper",
        {
          paperId: z.string(),
          summaryType: z.enum(["brief", "detailed", "methodology", "findings"]).optional(),
        },
        async ({ paperId, summaryType }) => {
          const mod = await import("./tools/generate-summary.js");
          const { summary } = await mod.generateSummary({ paperId, summaryType });
          return { content: [{ type: "text", text: summary }] } as any;
        }
      );

      // Handle MCP protocol requests
      if (body.method === "tools/list") {
        const result = await mcp.listTools();
        return new Response(JSON.stringify(result), {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
      }

      if (body.method === "tools/call") {
        const result = await mcp.callTool(body.params.name, body.params.arguments);
        return new Response(JSON.stringify(result), {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
      }

      // Default response
      return new Response(JSON.stringify({ error: "Method not supported" }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });

    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }
  },
};
