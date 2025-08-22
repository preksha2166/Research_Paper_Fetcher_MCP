# 🔬 Research Paper Fetcher MCP

<div align="center">

**Intelligent research paper discovery and management with AI-powered summaries**

[![License: MIT](https://img.shields.io/badge/License-MIT-007ACC?style=for-the-badge&logo=opensourceinitiative&logoColor=white)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Cloudflare Workers](https://img.shields.io/badge/Cloudflare-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)](https://workers.cloudflare.com/)

[**🚀 Quick Start**](#-quick-start) • [**📖 Documentation**](#-api-reference) • [**☁️ Deploy**](#️-cloudflare-workers-deployment) • [**🤝 Contribute**](#-contributing)

</div>

---

## ⚡ Features

- 🎯 **Multi-Source Discovery** - Search across arXiv, IEEE Xplore, Springer, PubMed, CrossRef
- 🤖 **AI-Powered Summaries** - Intelligent summaries using Groq LLM (fast & cost-effective)
- 📊 **Advanced Filtering** - Filter by year, journal, open-access, citation count
- 📝 **Citation Export** - Support for BibTeX, APA, IEEE, MLA formats
- 📄 **PDF Retrieval** - Direct download when available
- 💾 **Workspace Integration** - Save to Notion, OwnCloud, local files
- 🌐 **Edge Computing** - Deploy on Cloudflare Workers for global performance

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Groq API key (for AI summaries)
- Optional: IEEE, Springer API keys for enhanced search

### Installation

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

4. **Build and start**
   ```bash
   npm run build
   npm run dev
   ```

### Interactive Client

```bash
# Use the built-in interactive client
node mcp-client.js

# Available commands:
search machine learning    # Search for papers
summary <paperId>          # Generate AI summary
export bibtex <ids>        # Export citations
```

## ☁️ Cloudflare Workers Deployment

Deploy globally with edge computing for maximum performance.

### Prerequisites

```bash
# Install Wrangler CLI
npm install -g wrangler

# Authenticate with Cloudflare
wrangler login
```

### Deploy

```bash
# Deploy to staging
npm run deploy:staging

# Deploy to production
npm run deploy:production

# Set secrets
wrangler secret put GROQ_API_KEY
wrangler secret put IEEE_API_KEY
wrangler secret put SPRINGER_API_KEY
```

### Environment Configuration

| Variable | Description | Required |
|----------|-------------|----------|
| `GROQ_API_KEY` | Groq LLM API key for summaries | ✅ |
| `IEEE_API_KEY` | IEEE Xplore API access | ❌ |
| `SPRINGER_API_KEY` | Springer Nature API access | ❌ |
| `NODE_ENV` | Environment (production/development) | ✅ |

## 🏗️ Architecture

<details>
<summary>Click to expand project structure</summary>

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
</details>

## 🔌 Claude Desktop Integration

Add this server to your Claude Desktop configuration:

```json
{
  "mcpServers": {
    "research-paper-fetcher": {
      "command": "node",
      "args": ["path/to/Research_Paper_Fetcher_MCP/dist/index.js"],
      "env": {
        "GROQ_API_KEY": "your_groq_key_here",
        "IEEE_API_KEY": "your_ieee_key_here",
        "SPRINGER_API_KEY": "your_springer_key_here"
      }
    }
  }
}
```

## 📊 Data Sources

| Source | API Required | Description | Coverage |
|--------|--------------|-------------|-----------|
| **arXiv** | ❌ Free | Preprint repository | Physics, Math, CS |
| **IEEE Xplore** | ⭐ Enhanced | IEEE publications | Engineering, Technology |
| **Springer** | ⭐ Enhanced | Springer publications | All disciplines |
| **PubMed** | ❌ Free | Medical research | Medicine, Life Sciences |
| **CrossRef** | ❌ Free | DOI resolution | All disciplines |

## 🤖 AI-Powered Features

### Summary Generation
- **Groq LLM Integration** - Fast, cost-effective AI summaries
- **Multiple Types** - Brief, detailed, methodology, findings
- **Fallback Support** - Abstract-based summaries if AI unavailable
- **Smart Caching** - Reduced API calls and faster responses

## 📖 Usage Examples

### Basic Paper Search

```bash
# Interactive client
node mcp-client.js

# Commands
search "machine learning transformers"
summary arxiv:2106.04560
export bibtex paper1 paper2 paper3
fetch_pdf arxiv:2106.04560
```

### MCP Tool Usage

```typescript
// Search for papers with advanced filtering
await searchPapers({
  query: "neural networks",
  sources: ["arxiv", "ieee"],
  filters: {
    yearRange: { start: 2020, end: 2024 },
    openAccess: true,
    minCitations: 10
  },
  limit: 50
});

// Generate AI summary
await generateSummary({
  paperId: "arxiv:2106.04560",
  summaryType: "detailed" // brief, detailed, methodology, findings
});

// Export citations
await exportCitations({
  paperIds: ["arxiv:2106.04560", "doi:10.1038/nature12373"],
  format: "bibtex" // bibtex, apa, ieee, mla
});
```

### Advanced Filtering

```typescript
const results = await searchPapers({
  query: "deep learning",
  sources: ["arxiv", "springer", "ieee"],
  filters: {
    yearRange: { start: 2020, end: 2024 },
    authors: ["Geoffrey Hinton", "Yann LeCun"],
    venues: ["NIPS", "ICML", "Nature"],
    categories: ["cs.AI", "cs.LG"],
    openAccess: true,
    minCitations: 100
  },
  sortBy: "citations", // relevance, date, citations
  limit: 25
});
```

## 🛠️ API Reference

### Available Tools

| Tool Name | Description | Parameters |
|-----------|-------------|------------|
| `search_papers` | Search for academic papers | `query`, `sources`, `limit`, `filters` |
| `fetch_paper` | Get detailed paper information | `id`, `source` |
| `get_citations` | Retrieve paper citations | `paperId`, `format` |
| `download_pdf` | Download paper PDF (when available) | `paperId`, `source` |

### Response Schema

```typescript
interface Paper {
  id: string;
  title: string;
  abstract: string;
  authors: Author[];
  publicationDate: string;
  venue: string;
  citations: number;
  url: string;
  pdfUrl?: string;
  categories: string[];
  source: DataSource;
}
```

## 🧪 Development

### Project Structure

```
├── src/
│   ├── index.ts          # Main MCP server entry point
│   ├── tools/            # MCP tool implementations
│   ├── services/         # API service integrations
│   ├── types/            # TypeScript type definitions
│   └── utils/            # Helper utilities
├── docs/                 # Documentation
├── tests/                # Test suites
└── dist/                 # Built output
```

### Running Tests

```bash
npm test              # Run all tests
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
```

### Code Quality

```bash
npm run lint          # ESLint check
npm run format        # Prettier formatting
npm run type-check    # TypeScript validation
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📚 Documentation

- [Project Implementation Details](docs/project_implementation.md)
- [API Documentation](docs/api.md)
- [Configuration Guide](docs/configuration.md)
- [Troubleshooting](docs/troubleshooting.md)

## 🐛 Troubleshooting

### Common Issues

**API Rate Limiting**
- Implement exponential backoff
- Consider upgrading to higher-tier API plans
- Use caching to reduce API calls

**Connection Timeouts**
- Check network connectivity
- Increase timeout values in configuration
- Verify API endpoints are accessible

**Invalid API Keys**
- Ensure keys are correctly set in `.env`
- Verify key permissions with service providers
- Check for key expiration

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Model Context Protocol](https://modelcontextprotocol.io/) for the foundational framework
- [Anthropic](https://anthropic.com/) for Claude integration capabilities
- Academic data providers: arXiv, PubMed, Semantic Scholar, bioRxiv

## 📞 Support

- 🐛 [Report bugs](https://github.com/preksha2166/Research_Paper_Fetcher_MCP/issues)
- 💡 [Request features](https://github.com/preksha2166/Research_Paper_Fetcher_MCP/issues)
- 📧 [Contact maintainer](mailto:preksha2166@example.com)

---
