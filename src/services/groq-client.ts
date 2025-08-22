import Groq from "groq-sdk";
import { ResearchPaper } from "../types/paper.js";

export class GroqService {
  private client: Groq;

  constructor(apiKey: string) {
    this.client = new Groq({ apiKey });
  }

  async generateSummary(
    paper: ResearchPaper,
    type: 'brief' | 'detailed' | 'methodology' | 'findings'
  ): Promise<string> {
    const prompt = this.buildSummaryPrompt(paper, type);
    const completion = await this.client.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'mixtral-8x7b-32768',
      max_tokens: type === 'brief' ? 200 : 500,
      temperature: 0.3
    });
    return completion.choices[0]?.message?.content || '';
  }

  private buildSummaryPrompt(paper: ResearchPaper, type: string): string {
    const baseInfo = `Title: ${paper.title}\nAuthors: ${paper.authors.join(', ')}\nAbstract: ${paper.abstract ?? ''}`;
    switch (type) {
      case 'detailed':
        return `${baseInfo}\n\nProvide a detailed summary covering the problem, methodology, key findings, and implications:`;
      case 'methodology':
        return `${baseInfo}\n\nFocus on summarizing the research methodology and experimental approach:`;
      case 'findings':
        return `${baseInfo}\n\nSummarize the key findings, results, and conclusions:`;
      case 'brief':
      default:
        return `${baseInfo}\n\nProvide a 2-3 sentence summary of this research paper's main contribution:`;
    }
  }
}

