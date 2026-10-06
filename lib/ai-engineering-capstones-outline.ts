// The full AI Engineering Capstones course outline. Only lessons with a
// contentDir + videoUrl are playable; everything else renders as "in
// production". The last course in the AI Engineer path — three flagship
// portfolio projects (a production RAG assistant, an AI data analyst
// working with SQL/APIs, and a tool-using agent with human approval,
// security, logging & deployment), then job preparation.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/ai-engineering-capstones/
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

export const AI_ENGINEERING_CAPSTONES_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Capstone Overview",
    lessons: [
      L(1, "program-overview-and-portfolio-strategy", "Program Overview & Portfolio Strategy", { contentDir: "ch01/01-program-overview-and-portfolio-strategy" }),
      L(2, "choosing-your-project-emphasis", "Choosing Your Project Emphasis", { contentDir: "ch01/02-choosing-your-project-emphasis" }),
    ],
  },
  {
    n: 2,
    title: "Project 1 — Production RAG Knowledge Assistant",
    lessons: [
      L(3, "project-1-kickoff", "Project 1 Kickoff", { contentDir: "ch02/03-project-1-kickoff" }),
      L(4, "project-1-ingestion-and-chunking-pipeline", "Ingestion & Chunking Pipeline", { contentDir: "ch02/04-project-1-ingestion-and-chunking-pipeline" }),
      L(5, "project-1-retrieval-and-generation", "Retrieval & Generation", { contentDir: "ch02/05-project-1-retrieval-and-generation" }),
      L(6, "project-1-evaluation-and-tuning", "Evaluation & Tuning", { contentDir: "ch02/06-project-1-evaluation-and-tuning" }),
      L(7, "project-1-deployment-and-wrap-up", "Deployment & Wrap-Up", { contentDir: "ch02/07-project-1-deployment-and-wrap-up" }),
    ],
  },
  {
    n: 3,
    title: "Project 2 — AI Data Analyst (SQL/APIs)",
    lessons: [
      L(8, "project-2-kickoff", "Project 2 Kickoff"),
      L(9, "project-2-connecting-to-a-database-safely", "Connecting to a Database Safely"),
      L(10, "project-2-natural-language-to-sql", "Natural-Language-to-SQL Patterns"),
      L(11, "project-2-combining-sql-and-api-data", "Combining SQL Results With API Data"),
      L(12, "project-2-wrap-up-and-presentation", "Wrap-Up & Presentation"),
    ],
  },
  {
    n: 4,
    title: "Project 3 — Tool-Using Agent With Human Approval",
    lessons: [
      L(13, "project-3-kickoff", "Project 3 Kickoff"),
      L(14, "project-3-designing-the-tool-set", "Designing the Tool Set"),
      L(15, "project-3-building-the-approval-workflow", "Building the Approval Workflow"),
      L(16, "project-3-adding-security-and-logging", "Adding Security & Logging"),
      L(17, "project-3-deploying-the-agent", "Deploying the Agent"),
      L(18, "project-3-wrap-up-and-presentation", "Wrap-Up & Presentation"),
    ],
  },
  {
    n: 5,
    title: "Career Preparation",
    lessons: [
      L(19, "building-your-ai-engineering-resume", "Building Your AI Engineering Resume", { contentDir: "ch05/19-building-your-ai-engineering-resume" }),
      L(20, "portfolio-presentation-strategy", "Portfolio Presentation Strategy", { contentDir: "ch05/20-portfolio-presentation-strategy" }),
      L(21, "common-ai-engineer-interview-questions", "Common AI Engineer Interview Questions", { contentDir: "ch05/21-common-ai-engineer-interview-questions" }),
      L(22, "system-design-questions-for-ai-roles", "System Design Questions for AI Roles", { contentDir: "ch05/22-system-design-questions-for-ai-roles" }),
      L(23, "salary-negotiation-and-next-steps", "Salary Negotiation & Next Steps", { contentDir: "ch05/23-salary-negotiation-and-next-steps" }),
    ],
  },
];
