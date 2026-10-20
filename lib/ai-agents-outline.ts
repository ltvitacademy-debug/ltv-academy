// The full AI Agents course outline. Only lessons with a contentDir +
// videoUrl are playable; everything else renders as "in production".
// Assumes RAG & Vector Databases and Prompt & Context Engineering — this
// course moves from a system that answers questions to one that takes
// actions, safely.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/ai-agents/
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

export const AI_AGENTS_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "What an AI Agent Actually Is",
    lessons: [
      L(1, "agents-vs-simple-chat", "Agents vs. Simple Chat", { contentDir: "ch01/01-agents-vs-simple-chat", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792498891/ltv-ai-agents/agents-vs-simple-chat.mp4", durationLabel: "1 min 32 s" }),
      L(2, "the-agent-loop", "The Agent Loop: Plan, Act, Observe", { contentDir: "ch01/02-the-agent-loop", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792498957/ltv-ai-agents/the-agent-loop.mp4", durationLabel: "1 min 32 s" }),
      L(3, "tool-use-fundamentals", "Tool Use Fundamentals", { contentDir: "ch01/03-tool-use-fundamentals", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792499003/ltv-ai-agents/tool-use-fundamentals.mp4", durationLabel: "1 min 25 s" }),
      L(4, "agent-frameworks-overview", "Agent Frameworks, Overview", { contentDir: "ch01/04-agent-frameworks-overview", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792499054/ltv-ai-agents/agent-frameworks-overview.mp4", durationLabel: "1 min 43 s" }),
      L(5, "when-agents-are-overkill", "When Agents Are Overkill", { contentDir: "ch01/05-when-agents-are-overkill", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792499105/ltv-ai-agents/when-agents-are-overkill.mp4", durationLabel: "1 min 25 s" }),
    ],
  },
  {
    n: 2,
    title: "Tool Calling & Function Design",
    lessons: [
      L(6, "designing-good-tool-schemas", "Designing Good Tool Schemas", { contentDir: "ch02/06-designing-good-tool-schemas", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792499151/ltv-ai-agents/designing-good-tool-schemas.mp4", durationLabel: "1 min 34 s" }),
      L(7, "tool-calling-in-practice", "Tool Calling in Practice", { contentDir: "ch02/07-tool-calling-in-practice", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792499218/ltv-ai-agents/tool-calling-in-practice.mp4", durationLabel: "1 min 35 s" }),
      L(8, "error-handling-in-tools", "Error Handling in Tools", { contentDir: "ch02/08-error-handling-in-tools", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792499284/ltv-ai-agents/error-handling-in-tools.mp4", durationLabel: "1 min 29 s" }),
      L(9, "tool-selection-and-routing", "Tool Selection & Routing", { contentDir: "ch02/09-tool-selection-and-routing", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792499334/ltv-ai-agents/tool-selection-and-routing.mp4", durationLabel: "1 min 33 s" }),
      L(10, "multi-tool-agents", "Multi-Tool Agents", { contentDir: "ch02/10-multi-tool-agents", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792499384/ltv-ai-agents/multi-tool-agents.mp4", durationLabel: "1 min 34 s" }),
      L(11, "tool-output-formatting", "Tool Output Formatting", { contentDir: "ch02/11-tool-output-formatting", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792499435/ltv-ai-agents/tool-output-formatting.mp4", durationLabel: "1 min 32 s" }),
    ],
  },
  {
    n: 3,
    title: "Model Context Protocol (MCP)",
    lessons: [
      L(12, "what-mcp-is-and-why-it-exists", "What MCP Is & Why It Exists", { contentDir: "ch03/12-what-mcp-is-and-why-it-exists" }),
      L(13, "mcp-architecture-hosts-clients-servers", "MCP Architecture: Hosts, Clients & Servers", { contentDir: "ch03/13-mcp-architecture-hosts-clients-servers" }),
      L(14, "resources-tools-and-prompts-in-mcp", "Resources, Tools & Prompts in MCP", { contentDir: "ch03/14-resources-tools-and-prompts-in-mcp" }),
      L(15, "building-a-simple-mcp-server", "Building a Simple MCP Server", { contentDir: "ch03/15-building-a-simple-mcp-server" }),
      L(16, "connecting-an-agent-to-an-mcp-server", "Connecting an Agent to an MCP Server", { contentDir: "ch03/16-connecting-an-agent-to-an-mcp-server" }),
      L(17, "mcp-vs-custom-tool-integrations", "MCP vs. Custom Tool Integrations", { contentDir: "ch03/17-mcp-vs-custom-tool-integrations" }),
    ],
  },
  {
    n: 4,
    title: "Agent Architectures & Patterns",
    lessons: [
      L(18, "the-react-pattern", "The ReAct Pattern", { contentDir: "ch04/18-the-react-pattern", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792499483/ltv-ai-agents/the-react-pattern.mp4", durationLabel: "1 min 31 s" }),
      L(19, "planning-agents", "Planning Agents", { contentDir: "ch04/19-planning-agents", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792499531/ltv-ai-agents/planning-agents.mp4", durationLabel: "1 min 34 s" }),
      L(20, "multi-agent-systems", "Multi-Agent Systems", { contentDir: "ch04/20-multi-agent-systems", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792499580/ltv-ai-agents/multi-agent-systems.mp4", durationLabel: "1 min 32 s" }),
      L(21, "orchestrator-worker-patterns", "Orchestrator/Worker Patterns", { contentDir: "ch04/21-orchestrator-worker-patterns", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792499630/ltv-ai-agents/orchestrator-worker-patterns.mp4", durationLabel: "1 min 33 s" }),
      L(22, "reflection-and-self-correction", "Reflection & Self-Correction", { contentDir: "ch04/22-reflection-and-self-correction", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792499676/ltv-ai-agents/reflection-and-self-correction.mp4", durationLabel: "1 min 31 s" }),
      L(23, "state-and-memory-in-agents", "State & Memory in Agents", { contentDir: "ch04/23-state-and-memory-in-agents", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792499726/ltv-ai-agents/state-and-memory-in-agents.mp4", durationLabel: "1 min 41 s" }),
    ],
  },
  {
    n: 5,
    title: "Human-in-the-Loop & Approval",
    lessons: [
      L(24, "why-human-approval-matters", "Why Human Approval Matters", { contentDir: "ch05/24-why-human-approval-matters", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792499773/ltv-ai-agents/why-human-approval-matters.mp4", durationLabel: "1 min 28 s" }),
      L(25, "designing-approval-checkpoints", "Designing Approval Checkpoints", { contentDir: "ch05/25-designing-approval-checkpoints", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792499817/ltv-ai-agents/designing-approval-checkpoints.mp4", durationLabel: "1 min 24 s" }),
      L(26, "escalation-patterns", "Escalation Patterns", { contentDir: "ch05/26-escalation-patterns", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792499862/ltv-ai-agents/escalation-patterns.mp4", durationLabel: "1 min 26 s" }),
      L(27, "audit-logging-for-agent-actions", "Audit Logging for Agent Actions", { contentDir: "ch05/27-audit-logging-for-agent-actions", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792499905/ltv-ai-agents/audit-logging-for-agent-actions.mp4", durationLabel: "1 min 20 s" }),
      L(28, "undo-and-rollback-strategies", "Undo & Rollback Strategies", { contentDir: "ch05/28-undo-and-rollback-strategies", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792499949/ltv-ai-agents/undo-and-rollback-strategies.mp4", durationLabel: "1 min 29 s" }),
    ],
  },
  {
    n: 6,
    title: "Agent Safety & Guardrails",
    lessons: [
      L(29, "preventing-runaway-agents", "Preventing Runaway Agents", { contentDir: "ch06/29-preventing-runaway-agents", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792499996/ltv-ai-agents/preventing-runaway-agents.mp4", durationLabel: "1 min 32 s" }),
      L(30, "cost-and-action-limits", "Cost & Action Limits", { contentDir: "ch06/30-cost-and-action-limits", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792500046/ltv-ai-agents/cost-and-action-limits.mp4", durationLabel: "1 min 33 s" }),
      L(31, "sandboxing-agent-actions", "Sandboxing Agent Actions", { contentDir: "ch06/31-sandboxing-agent-actions", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792500095/ltv-ai-agents/sandboxing-agent-actions.mp4", durationLabel: "1 min 35 s" }),
      L(32, "prompt-injection-risks-for-agents", "Prompt Injection Risks for Agents", { contentDir: "ch06/32-prompt-injection-risks-for-agents", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792500143/ltv-ai-agents/prompt-injection-risks-for-agents.mp4", durationLabel: "1 min 29 s" }),
      L(33, "monitoring-agent-behavior", "Monitoring Agent Behavior", { contentDir: "ch06/33-monitoring-agent-behavior", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792500193/ltv-ai-agents/monitoring-agent-behavior.mp4", durationLabel: "1 min 34 s" }),
    ],
  },
  {
    n: 7,
    title: "Capstone",
    lessons: [
      L(34, "capstone-kickoff", "Capstone Kickoff", { contentDir: "ch07/34-capstone-kickoff", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792500237/ltv-ai-agents/capstone-kickoff.mp4", durationLabel: "1 min 25 s" }),
      L(35, "capstone-building-a-tool-using-agent", "Capstone: Building a Tool-Using Agent With Human Approval", { contentDir: "ch07/35-capstone-building-a-tool-using-agent", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792500287/ltv-ai-agents/capstone-building-a-tool-using-agent.mp4", durationLabel: "1 min 34 s" }),
      L(36, "capstone-adding-logging-and-guardrails", "Capstone: Adding Logging & Guardrails", { contentDir: "ch07/36-capstone-adding-logging-and-guardrails", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792500330/ltv-ai-agents/capstone-adding-logging-and-guardrails.mp4", durationLabel: "1 min 34 s" }),
      L(37, "capstone-deploying-the-agent", "Capstone: Deploying the Agent", { contentDir: "ch07/37-capstone-deploying-the-agent", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792500374/ltv-ai-agents/capstone-deploying-the-agent.mp4", durationLabel: "1 min 23 s" }),
      L(38, "capstone-wrap-up", "Capstone: Wrap-Up & Portfolio Presentation", { contentDir: "ch07/38-capstone-wrap-up", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792500418/ltv-ai-agents/capstone-wrap-up.mp4", durationLabel: "1 min 26 s" }),
    ],
  },
];
