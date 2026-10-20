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
      L(1, "why-orchestration-matters", "Power Automate for AI Engineers: Why Orchestration Matters", { contentDir: "ch01/01-why-orchestration-matters", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792500495/ltv-power-automate-ai-agents/why-orchestration-matters.mp4", durationLabel: "1 min 57 s" }),
      L(2, "flows-triggers-and-actions-essentials", "Flows, Triggers and Actions: The Essentials", { contentDir: "ch01/02-flows-triggers-and-actions-essentials", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792500548/ltv-power-automate-ai-agents/flows-triggers-and-actions-essentials.mp4", durationLabel: "1 min 49 s" }),
      L(3, "conditions-loops-and-variables", "Conditions, Loops and Variables: The Essentials", { contentDir: "ch01/03-conditions-loops-and-variables", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792500596/ltv-power-automate-ai-agents/conditions-loops-and-variables.mp4", durationLabel: "1 min 35 s" }),
      L(4, "http-actions-calling-any-api", "HTTP Actions: Calling Any API from a Flow", { contentDir: "ch01/04-http-actions-calling-any-api", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792500659/ltv-power-automate-ai-agents/http-actions-calling-any-api.mp4", durationLabel: "1 min 58 s" }),
      L(5, "working-with-json-parse-and-compose", "Working with JSON: Parse JSON and Compose", { contentDir: "ch01/05-working-with-json-parse-and-compose", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792500711/ltv-power-automate-ai-agents/working-with-json-parse-and-compose.mp4", durationLabel: "1 min 43 s" }),
      L(6, "error-handling-and-run-after", "Error Handling and Run After", { contentDir: "ch01/06-error-handling-and-run-after", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792500773/ltv-power-automate-ai-agents/error-handling-and-run-after.mp4", durationLabel: "1 min 55 s" }),
    ],
  },
  {
    n: 2,
    title: "AI Builder & Azure AI Integration",
    lessons: [
      L(7, "introduction-to-ai-builder", "Introduction to AI Builder", { contentDir: "ch02/07-introduction-to-ai-builder", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792500830/ltv-power-automate-ai-agents/introduction-to-ai-builder.mp4", durationLabel: "2 min 1 s" }),
      L(8, "document-extraction-with-ai-builder", "Document Extraction with AI Builder", { contentDir: "ch02/08-document-extraction-with-ai-builder", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792500890/ltv-power-automate-ai-agents/document-extraction-with-ai-builder.mp4", durationLabel: "1 min 56 s" }),
      L(9, "classifying-text-and-images", "Classifying Text and Images with AI Builder", { contentDir: "ch02/09-classifying-text-and-images", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792500950/ltv-power-automate-ai-agents/classifying-text-and-images.mp4", durationLabel: "1 min 55 s" }),
      L(10, "summarizing-content-with-azure-ai", "Summarizing Content with AI Builder and Azure AI", { contentDir: "ch02/10-summarizing-content-with-azure-ai", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792501005/ltv-power-automate-ai-agents/summarizing-content-with-azure-ai.mp4", durationLabel: "1 min 53 s" }),
      L(11, "structured-output-prompts-and-schemas", "Structured Output: Prompts and JSON Schemas", { contentDir: "ch02/11-structured-output-prompts-and-schemas", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792501059/ltv-power-automate-ai-agents/structured-output-prompts-and-schemas.mp4", durationLabel: "1 min 50 s" }),
      L(12, "calling-azure-openai-from-a-flow", "Calling Azure OpenAI and Azure AI Services from a Flow", { contentDir: "ch02/12-calling-azure-openai-from-a-flow", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792501127/ltv-power-automate-ai-agents/calling-azure-openai-from-a-flow.mp4", durationLabel: "2 min 11 s" }),
      L(13, "ai-powered-document-processing-flow", "Building an AI-Powered Document Processing Flow", { contentDir: "ch02/13-ai-powered-document-processing-flow", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792501197/ltv-power-automate-ai-agents/ai-powered-document-processing-flow.mp4", durationLabel: "2 min 16 s" }),
    ],
  },
  {
    n: 3,
    title: "Copilot Studio & AI Agents",
    lessons: [
      L(14, "introduction-to-copilot-studio", "Introduction to Copilot Studio", { contentDir: "ch03/14-introduction-to-copilot-studio", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792501254/ltv-power-automate-ai-agents/introduction-to-copilot-studio.mp4", durationLabel: "1 min 56 s" }),
      L(15, "building-your-first-copilot-studio-agent", "Building Your First Copilot Studio Agent", { contentDir: "ch03/15-building-your-first-copilot-studio-agent", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792501313/ltv-power-automate-ai-agents/building-your-first-copilot-studio-agent.mp4", durationLabel: "1 min 55 s" }),
      L(16, "connecting-agents-to-power-automate-flows", "Connecting a Copilot Studio Agent to Power Automate Flows", { contentDir: "ch03/16-connecting-agents-to-power-automate-flows", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792501363/ltv-power-automate-ai-agents/connecting-agents-to-power-automate-flows.mp4", durationLabel: "1 min 42 s" }),
      L(17, "ai-generated-actions-and-dynamic-steps", "AI-Generated Actions and Dynamic Flow Steps", { contentDir: "ch03/17-ai-generated-actions-and-dynamic-steps", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792501429/ltv-power-automate-ai-agents/ai-generated-actions-and-dynamic-steps.mp4", durationLabel: "2 min 19 s" }),
      L(18, "human-in-the-loop-approval-gates", "Human-in-the-Loop: Approval Gates for AI Actions", { contentDir: "ch03/18-human-in-the-loop-approval-gates", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792501493/ltv-power-automate-ai-agents/human-in-the-loop-approval-gates.mp4", durationLabel: "2 min 11 s" }),
      L(19, "enterprise-ai-automation-patterns", "Enterprise AI Automation Patterns and Governance", { contentDir: "ch03/19-enterprise-ai-automation-patterns", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792501554/ltv-power-automate-ai-agents/enterprise-ai-automation-patterns.mp4", durationLabel: "1 min 59 s" }),
      L(20, "capstone-ai-agent-support-ticket-triage", "Capstone: An AI Agent That Triages Support Tickets", { contentDir: "ch03/20-capstone-ai-agent-support-ticket-triage", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792501623/ltv-power-automate-ai-agents/capstone-ai-agent-support-ticket-triage.mp4", durationLabel: "2 min 19 s" }),
    ],
  },
];
