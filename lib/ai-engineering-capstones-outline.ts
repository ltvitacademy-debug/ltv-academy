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
      L(1, "program-overview-and-portfolio-strategy", "Program Overview & Portfolio Strategy", { contentDir: "ch01/01-program-overview-and-portfolio-strategy", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792500757/ltv-ai-engineering-capstones/program-overview-and-portfolio-strategy.mp4", durationLabel: "1 min 23 s" }),
      L(2, "choosing-your-project-emphasis", "Choosing Your Project Emphasis", { contentDir: "ch01/02-choosing-your-project-emphasis", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792500805/ltv-ai-engineering-capstones/choosing-your-project-emphasis.mp4", durationLabel: "1 min 19 s" }),
    ],
  },
  {
    n: 2,
    title: "Project 1 — Production RAG Knowledge Assistant",
    lessons: [
      L(3, "project-1-kickoff", "Project 1 Kickoff", { contentDir: "ch02/03-project-1-kickoff", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792500865/ltv-ai-engineering-capstones/project-1-kickoff.mp4", durationLabel: "1 min 39 s" }),
      L(4, "project-1-ingestion-and-chunking-pipeline", "Ingestion & Chunking Pipeline", { contentDir: "ch02/04-project-1-ingestion-and-chunking-pipeline", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792500919/ltv-ai-engineering-capstones/project-1-ingestion-and-chunking-pipeline.mp4", durationLabel: "1 min 31 s" }),
      L(5, "project-1-retrieval-and-generation", "Retrieval & Generation", { contentDir: "ch02/05-project-1-retrieval-and-generation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792500981/ltv-ai-engineering-capstones/project-1-retrieval-and-generation.mp4", durationLabel: "1 min 44 s" }),
      L(6, "project-1-evaluation-and-tuning", "Evaluation & Tuning", { contentDir: "ch02/06-project-1-evaluation-and-tuning", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792501035/ltv-ai-engineering-capstones/project-1-evaluation-and-tuning.mp4", durationLabel: "1 min 25 s" }),
      L(7, "project-1-deployment-and-wrap-up", "Deployment & Wrap-Up", { contentDir: "ch02/07-project-1-deployment-and-wrap-up", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792501097/ltv-ai-engineering-capstones/project-1-deployment-and-wrap-up.mp4", durationLabel: "1 min 41 s" }),
    ],
  },
  {
    n: 3,
    title: "Project 2 — AI Data Analyst (SQL/APIs)",
    lessons: [
      L(8, "project-2-kickoff", "Project 2 Kickoff", { contentDir: "ch03/08-project-2-kickoff", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792501158/ltv-ai-engineering-capstones/project-2-kickoff.mp4", durationLabel: "1 min 47 s" }),
      L(9, "project-2-connecting-to-a-database-safely", "Connecting to a Database Safely", { contentDir: "ch03/09-project-2-connecting-to-a-database-safely", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792501226/ltv-ai-engineering-capstones/project-2-connecting-to-a-database-safely.mp4", durationLabel: "1 min 59 s" }),
      L(10, "project-2-natural-language-to-sql", "Natural-Language-to-SQL Patterns", { contentDir: "ch03/10-project-2-natural-language-to-sql", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792501288/ltv-ai-engineering-capstones/project-2-natural-language-to-sql.mp4", durationLabel: "1 min 53 s" }),
      L(11, "project-2-combining-sql-and-api-data", "Combining SQL Results With API Data", { contentDir: "ch03/11-project-2-combining-sql-and-api-data", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792501353/ltv-ai-engineering-capstones/project-2-combining-sql-and-api-data.mp4", durationLabel: "1 min 46 s" }),
      L(12, "project-2-wrap-up-and-presentation", "Wrap-Up & Presentation", { contentDir: "ch03/12-project-2-wrap-up-and-presentation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792501418/ltv-ai-engineering-capstones/project-2-wrap-up-and-presentation.mp4", durationLabel: "1 min 50 s" }),
    ],
  },
  {
    n: 4,
    title: "Project 3 — Tool-Using Agent With Human Approval",
    lessons: [
      L(13, "project-3-kickoff", "Project 3 Kickoff", { contentDir: "ch04/13-project-3-kickoff", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792501481/ltv-ai-engineering-capstones/project-3-kickoff.mp4", durationLabel: "1 min 46 s" }),
      L(14, "project-3-designing-the-tool-set", "Designing the Tool Set", { contentDir: "ch04/14-project-3-designing-the-tool-set", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792501545/ltv-ai-engineering-capstones/project-3-designing-the-tool-set.mp4", durationLabel: "1 min 38 s" }),
      L(15, "project-3-building-the-approval-workflow", "Building the Approval Workflow", { contentDir: "ch04/15-project-3-building-the-approval-workflow", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792501607/ltv-ai-engineering-capstones/project-3-building-the-approval-workflow.mp4", durationLabel: "1 min 44 s" }),
      L(16, "project-3-adding-security-and-logging", "Adding Security & Logging", { contentDir: "ch04/16-project-3-adding-security-and-logging", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792501657/ltv-ai-engineering-capstones/project-3-adding-security-and-logging.mp4", durationLabel: "1 min 38 s" }),
      L(17, "project-3-deploying-the-agent", "Deploying the Agent", { contentDir: "ch04/17-project-3-deploying-the-agent", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792501708/ltv-ai-engineering-capstones/project-3-deploying-the-agent.mp4", durationLabel: "1 min 40 s" }),
      L(18, "project-3-wrap-up-and-presentation", "Wrap-Up & Presentation", { contentDir: "ch04/18-project-3-wrap-up-and-presentation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792501763/ltv-ai-engineering-capstones/project-3-wrap-up-and-presentation.mp4", durationLabel: "1 min 54 s" }),
    ],
  },
  {
    n: 5,
    title: "Career Preparation",
    lessons: [
      L(19, "building-your-ai-engineering-resume", "Building Your AI Engineering Resume", { contentDir: "ch05/19-building-your-ai-engineering-resume", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792501806/ltv-ai-engineering-capstones/building-your-ai-engineering-resume.mp4", durationLabel: "1 min 20 s" }),
      L(20, "portfolio-presentation-strategy", "Portfolio Presentation Strategy", { contentDir: "ch05/20-portfolio-presentation-strategy", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792501842/ltv-ai-engineering-capstones/portfolio-presentation-strategy.mp4", durationLabel: "1 min 6 s" }),
      L(21, "common-ai-engineer-interview-questions", "Common AI Engineer Interview Questions", { contentDir: "ch05/21-common-ai-engineer-interview-questions", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792501888/ltv-ai-engineering-capstones/common-ai-engineer-interview-questions.mp4", durationLabel: "1 min 31 s" }),
      L(22, "system-design-questions-for-ai-roles", "System Design Questions for AI Roles", { contentDir: "ch05/22-system-design-questions-for-ai-roles", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792501934/ltv-ai-engineering-capstones/system-design-questions-for-ai-roles.mp4", durationLabel: "1 min 33 s" }),
      L(23, "salary-negotiation-and-next-steps", "Salary Negotiation & Next Steps", { contentDir: "ch05/23-salary-negotiation-and-next-steps", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792501996/ltv-ai-engineering-capstones/salary-negotiation-and-next-steps.mp4", durationLabel: "2 min 12 s" }),
    ],
  },
];
