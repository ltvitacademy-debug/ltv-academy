// AI & Agentic Automation with Power Automate — Power Automate used as the
// orchestration layer for AI: AI Builder, Azure AI, Copilot Studio agents,
// and human-in-the-loop enterprise automation. Written for students who
// have NOT taken the standalone Power Automate course, so Chapter 1 is a
// condensed foundations pass, not a full repeat of it.
// Lessons without a contentDir render as "in production".

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/power-automate-ai-agents/
  videoUrl?: string;
  durationLabel?: string;
};

export type ChapterMeta = { n: number; title: string; lessons: LessonMeta[] };

const L = (n: number, slug: string, title: string, extra?: Partial<LessonMeta>): LessonMeta => ({
  n,
  slug,
  title,
  ...extra,
});

export const POWER_AUTOMATE_AI_AGENTS_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Power Automate Foundations for AI Engineers",
    lessons: [
      L(1, "why-orchestration-matters", "Power Automate for AI Engineers: Why Orchestration Matters", { contentDir: "ch01/01-why-orchestration-matters" }),
      L(2, "flows-triggers-and-actions-essentials", "Flows, Triggers and Actions: The Essentials", { contentDir: "ch01/02-flows-triggers-and-actions-essentials" }),
      L(3, "conditions-loops-and-variables", "Conditions, Loops and Variables: The Essentials", { contentDir: "ch01/03-conditions-loops-and-variables" }),
      L(4, "http-actions-calling-any-api", "HTTP Actions: Calling Any API from a Flow", { contentDir: "ch01/04-http-actions-calling-any-api" }),
      L(5, "working-with-json-parse-and-compose", "Working with JSON: Parse JSON and Compose", { contentDir: "ch01/05-working-with-json-parse-and-compose" }),
      L(6, "error-handling-and-run-after", "Error Handling and Run After", { contentDir: "ch01/06-error-handling-and-run-after" }),
    ],
  },
  {
    n: 2,
    title: "AI Builder & Azure AI Integration",
    lessons: [
      L(7, "introduction-to-ai-builder", "Introduction to AI Builder", { contentDir: "ch02/07-introduction-to-ai-builder" }),
      L(8, "document-extraction-with-ai-builder", "Document Extraction with AI Builder", { contentDir: "ch02/08-document-extraction-with-ai-builder" }),
      L(9, "classifying-text-and-images", "Classifying Text and Images with AI Builder", { contentDir: "ch02/09-classifying-text-and-images" }),
      L(10, "summarizing-content-with-azure-ai", "Summarizing Content with AI Builder and Azure AI", { contentDir: "ch02/10-summarizing-content-with-azure-ai" }),
      L(11, "structured-output-prompts-and-schemas", "Structured Output: Prompts and JSON Schemas", { contentDir: "ch02/11-structured-output-prompts-and-schemas" }),
      L(12, "calling-azure-openai-from-a-flow", "Calling Azure OpenAI and Azure AI Services from a Flow", { contentDir: "ch02/12-calling-azure-openai-from-a-flow" }),
      L(13, "ai-powered-document-processing-flow", "Building an AI-Powered Document Processing Flow", { contentDir: "ch02/13-ai-powered-document-processing-flow" }),
    ],
  },
  {
    n: 3,
    title: "Copilot Studio & AI Agents",
    lessons: [
      L(14, "introduction-to-copilot-studio", "Introduction to Copilot Studio", { contentDir: "ch03/14-introduction-to-copilot-studio" }),
      L(15, "building-your-first-copilot-studio-agent", "Building Your First Copilot Studio Agent", { contentDir: "ch03/15-building-your-first-copilot-studio-agent" }),
      L(16, "connecting-agents-to-power-automate-flows", "Connecting a Copilot Studio Agent to Power Automate Flows", { contentDir: "ch03/16-connecting-agents-to-power-automate-flows" }),
      L(17, "ai-generated-actions-and-dynamic-steps", "AI-Generated Actions and Dynamic Flow Steps", { contentDir: "ch03/17-ai-generated-actions-and-dynamic-steps" }),
      L(18, "human-in-the-loop-approval-gates", "Human-in-the-Loop: Approval Gates for AI Actions", { contentDir: "ch03/18-human-in-the-loop-approval-gates" }),
      L(19, "enterprise-ai-automation-patterns", "Enterprise AI Automation Patterns and Governance", { contentDir: "ch03/19-enterprise-ai-automation-patterns" }),
      L(20, "capstone-ai-agent-support-ticket-triage", "Capstone: An AI Agent That Triages Support Tickets", { contentDir: "ch03/20-capstone-ai-agent-support-ticket-triage" }),
    ],
  },
];
