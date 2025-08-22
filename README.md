# Research Paper Fetcher MCP

A Model Context Protocol (MCP) server that provides intelligent research paper discovery and management capabilities. It fetches papers from multiple academic sources, generates AI-powered summaries using Groq, and offers advanced filtering and export features.

## 🚀 Features

- **Multi-source paper fetching**: arXiv, IEEE Xplore, Springer, PubMed, CrossRef
- **AI-powered summaries**: Generated using Groq LLM (fast and cost-effective)
- **Advanced filtering**: By year, journal, open-access status, citation count
- **Citation export**: BibTeX, APA, IEEE, MLA formats
- **PDF retrieval**: Direct download when available
- **Workspace integration**: Save to Notion, OwnCloud, local files
- **MCP Protocol**: Standard Model Context Protocol server

## 🏗️ Architecture

```
src/
├── index.ts                 # Main MCP server entry point
├── worker.ts                # Cloudflare Workers entry point
├── tools/                   # MCP tool implementations
│   ├── search-papers.ts     # Paper search tool
│   ├── generate-summary.ts  # AI summary generation
│   ├── export-citations.ts  # Citation export tool
│   ├── fetch-pdf.ts         # PDF download tool
│   └── save-workspace.ts    # Workspace integration
├── services/                # External API clients
│   ├── arxiv.ts            # arXiv API client
│   ├── ieee.ts             # IEEE Xplore API client
│   ├── springer.ts         # Springer API client
│   ├── pubmed.ts           # PubMed API client
│   ├── crossref.ts         # CrossRef API client
│   ├── groq-client.ts      # Groq LLM integration
│   ├── notion.ts           # Notion API client
│   └── owncloud.ts         # OwnCloud integration
├── types/                   # TypeScript type definitions
└── utils/                   # Utility functions
```

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Groq API key (for AI summaries)
- Optional: IEEE, Springer API keys for enhanced search

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/preksha2166/Research_Paper_Fetcher_MCP.git
   cd Research_Paper_Fetcher_MCP
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Copy the example file
   cp .env.example .env
   
   # Edit .env with your API keys
   GROQ_API_KEY=your_groq_api_key_here
   IEEE_API_KEY=your_ieee_api_key_here
   SPRINGER_API_KEY=your_springer_api_key_here
   ```

4. **Build the project**
   ```bash
   npm run build
   ```

## 🚀 Usage

### Local Development

1. **Start the MCP server**
   ```bash
   npm run dev
   ```

2. **Use the interactive client**
   ```bash
   node mcp-client.js
   ```

### Available Commands

- `help` - Show available commands
- `tools` - List all available tools
- `search <query>` - Search for papers (e.g., "search machine learning")
- `summary <paperId>` - Generate AI summary for a paper
- `export <format> <ids>` - Export citations (e.g., "export bibtex paper1 paper2")
- `quit` - Exit the client

### MCP Tools

1. **search_papers** - Search across 5 academic sources
2. **generate_summary** - AI-powered paper summaries
3. **export_citations** - Multiple citation formats
4. **fetch_pdf** - Download PDFs when available
5. **save_to_workspace** - Save to Notion, OwnCloud, or local

## ☁️ Cloudflare Workers Deployment

### Prerequisites

1. **Install Wrangler**
   ```bash
   npm install -g wrangler
   ```

2. **Login to Cloudflare**
   ```bash
   wrangler login
   ```

### Deploy

1. **Build and deploy to staging**
   ```bash
   npm run deploy:staging
   ```

2. **Deploy to production**
   ```bash
   npm run deploy:production
   ```

3. **Set secrets in Cloudflare**
   ```bash
   wrangler secret put GROQ_API_KEY
   wrangler secret put IEEE_API_KEY
   wrangler secret put SPRINGER_API_KEY
   ```

### Environment Variables

Set these in your Cloudflare Workers dashboard:
- `NODE_ENV`: production
- `GROQ_API_KEY`: Your Groq API key
- `IEEE_API_KEY`: Your IEEE API key
- `SPRINGER_API_KEY`: Your Springer API key

## 🔧 Development

### Scripts

- `npm run build` - Build TypeScript
- `npm run dev` - Start development server
- `npm run start` - Start production server
- `npm run typecheck` - Type check without building
- `npm run worker:dev` - Start Cloudflare Workers dev server
- `npm run worker:build` - Build and deploy to Workers

### Testing

```bash
# Test the server
node test-server.js

# Test the interactive client
node mcp-client.js
```

## 📚 API Sources

| Source | API | Required | Description |
|--------|-----|----------|-------------|
| **arXiv** | Free | ❌ | Preprint repository |
| **IEEE Xplore** | API Key | ❌ | IEEE publications |
| **Springer** | API Key | ❌ | Springer publications |
| **PubMed** | Free | ❌ | Medical research |
| **CrossRef** | Free | ❌ | DOI resolution |

## 🤖 AI Integration

- **Groq LLM**: Fast, cost-effective AI summaries
- **Summary Types**: Brief, detailed, methodology, findings
- **Fallback**: Abstract-based summaries if AI fails

## 🔒 Security

- API keys stored securely
- Input validation with Zod schemas
- Rate limiting per source
- CORS support for web clients

## 📄 License

MIT License - see LICENSE file for details

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/preksha2166/Research_Paper_Fetcher_MCP/issues)
- **Discussions**: [GitHub Discussions](https://github.com/preksha2166/Research_Paper_Fetcher_MCP/discussions)

## 🎯 Roadmap

- [ ] Add more academic sources
- [ ] Implement caching and rate limiting
- [ ] Add Notion and OwnCloud integrations
- [ ] Web interface for non-MCP clients
- [ ] Advanced filtering and sorting
- [ ] PDF text extraction and analysis

---

Built with ❤️ using the Model Context Protocol

