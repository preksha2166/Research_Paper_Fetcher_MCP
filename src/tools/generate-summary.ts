import { ResearchPaper } from "../types/paper.js";

// Simple in-memory cache for Phase 1
const paperCache = new Map<string, ResearchPaper>();

export function cachePaper(paper: ResearchPaper) {
  paperCache.set(paper.id, paper);
}

async function getPaperById(paperId: string): Promise<ResearchPaper | undefined> {
  if (paperCache.has(paperId)) return paperCache.get(paperId);
  return undefined; // Phase 1: only from cache
}

export async function generateSummary(args: {
  paperId: string;
  summaryType?: "brief" | "detailed" | "methodology" | "findings";
}): Promise<{ summary: string }> {
  const { paperId, summaryType = "brief" } = args;
  const paper = await getPaperById(paperId);
  if (!paper) {
    throw new Error(`Paper with ID ${paperId} not found`);
  }

  const { GroqService } = await import("../services/groq-client.js");
  const groq = new GroqService(process.env.GROQ_API_KEY || "");
  const summary = await groq.generateSummary(paper, summaryType);
  return { summary };
}

