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
      L(1, "agents-vs-simple-chat", "Agents vs. Simple Chat", { contentDir: "ch01/01-agents-vs-simple-chat" }),
      L(2, "the-agent-loop", "The Agent Loop: Plan, Act, Observe", { contentDir: "ch01/02-the-agent-loop" }),
      L(3, "tool-use-fundamentals", "Tool Use Fundamentals", { contentDir: "ch01/03-tool-use-fundamentals" }),
      L(4, "agent-frameworks-overview", "Agent Frameworks, Overview", { contentDir: "ch01/04-agent-frameworks-overview" }),
      L(5, "when-agents-are-overkill", "When Agents Are Overkill", { contentDir: "ch01/05-when-agents-are-overkill" }),
    ],
  },
  {
    n: 2,
    title: "Tool Calling & Function Design",
    lessons: [
      L(6, "designing-good-tool-schemas", "Designing Good Tool Schemas", { contentDir: "ch02/06-designing-good-tool-schemas" }),
      L(7, "tool-calling-in-practice", "Tool Calling in Practice", { contentDir: "ch02/07-tool-calling-in-practice" }),
      L(8, "error-handling-in-tools", "Error Handling in Tools", { contentDir: "ch02/08-error-handling-in-tools" }),
      L(9, "tool-selection-and-routing", "Tool Selection & Routing", { contentDir: "ch02/09-tool-selection-and-routing" }),
      L(10, "multi-tool-agents", "Multi-Tool Agents", { contentDir: "ch02/10-multi-tool-agents" }),
      L(11, "tool-output-formatting", "Tool Output Formatting", { contentDir: "ch02/11-tool-output-formatting" }),
    ],
  },
  {
    n: 3,
    title: "Agent Architectures & Patterns",
    lessons: [
      L(12, "the-react-pattern", "The ReAct Pattern", { contentDir: "ch03/12-the-react-pattern" }),
      L(13, "planning-agents", "Planning Agents", { contentDir: "ch03/13-planning-agents" }),
      L(14, "multi-agent-systems", "Multi-Agent Systems", { contentDir: "ch03/14-multi-agent-systems" }),
      L(15, "orchestrator-worker-patterns", "Orchestrator/Worker Patterns", { contentDir: "ch03/15-orchestrator-worker-patterns" }),
      L(16, "reflection-and-self-correction", "Reflection & Self-Correction", { contentDir: "ch03/16-reflection-and-self-correction" }),
      L(17, "state-and-memory-in-agents", "State & Memory in Agents", { contentDir: "ch03/17-state-and-memory-in-agents" }),
    ],
  },
  {
    n: 4,
    title: "Human-in-the-Loop & Approval",
    lessons: [
      L(18, "why-human-approval-matters", "Why Human Approval Matters"),
      L(19, "designing-approval-checkpoints", "Designing Approval Checkpoints"),
      L(20, "escalation-patterns", "Escalation Patterns"),
      L(21, "audit-logging-for-agent-actions", "Audit Logging for Agent Actions"),
      L(22, "undo-and-rollback-strategies", "Undo & Rollback Strategies"),
    ],
  },
  {
    n: 5,
    title: "Agent Safety & Guardrails",
    lessons: [
      L(23, "preventing-runaway-agents", "Preventing Runaway Agents"),
      L(24, "cost-and-action-limits", "Cost & Action Limits"),
      L(25, "sandboxing-agent-actions", "Sandboxing Agent Actions"),
      L(26, "prompt-injection-risks-for-agents", "Prompt Injection Risks for Agents"),
      L(27, "monitoring-agent-behavior", "Monitoring Agent Behavior"),
    ],
  },
  {
    n: 6,
    title: "Capstone",
    lessons: [
      L(28, "capstone-kickoff", "Capstone Kickoff"),
      L(29, "capstone-building-a-tool-using-agent", "Capstone: Building a Tool-Using Agent With Human Approval"),
      L(30, "capstone-adding-logging-and-guardrails", "Capstone: Adding Logging & Guardrails"),
      L(31, "capstone-deploying-the-agent", "Capstone: Deploying the Agent"),
      L(32, "capstone-wrap-up", "Capstone: Wrap-Up & Portfolio Presentation"),
    ],
  },
];
