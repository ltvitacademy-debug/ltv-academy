// The full Salesforce Analytics Career & Capstone course outline. Only
// lessons with a contentDir + videoUrl are playable; everything else
// renders as "in production". Deliberately project-heavy: three portfolio
// projects of increasing independence (Sales Pipeline -> Customer Service
// -> Executive CRM Analytics), then interview prep.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/salesforce-analytics-capstone/
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

export const SALESFORCE_ANALYTICS_CAPSTONE_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Career Overview",
    lessons: [
      L(1, "the-salesforce-analytics-career-ladder", "The Salesforce Analytics Career Ladder"),
      L(2, "target-job-titles-and-what-they-do", "Target Job Titles & What They Actually Do"),
      L(3, "building-a-portfolio-strategy", "Building a Portfolio Strategy"),
    ],
  },
  {
    n: 2,
    title: "Project 1 — Sales Pipeline",
    lessons: [
      L(4, "project-1-kickoff", "Project 1 Kickoff: The Business Questions"),
      L(5, "project-1-connecting-the-objects", "Connecting Leads, Accounts, Contacts & Opportunities"),
      L(6, "project-1-pipeline-and-conversion", "Pipeline & Conversion Analysis"),
      L(7, "project-1-sales-rep-performance", "Sales Rep Performance Analysis"),
      L(8, "project-1-deal-size-and-cycle", "Deal Size & Sales Cycle Analysis"),
      L(9, "project-1-wrap-up", "Project 1: Wrap-Up & Presentation"),
    ],
  },
  {
    n: 3,
    title: "Project 2 — Customer Service",
    lessons: [
      L(10, "project-2-kickoff", "Project 2 Kickoff: The Business Questions"),
      L(11, "project-2-case-volume-and-resolution-time", "Case Volume & Resolution Time"),
      L(12, "project-2-sla-and-escalations", "SLA & Escalation Analysis"),
      L(13, "project-2-agent-performance", "Agent Performance Analysis"),
      L(14, "project-2-wrap-up", "Project 2: Wrap-Up & Presentation"),
    ],
  },
  {
    n: 4,
    title: "Project 3 — Executive CRM Analytics",
    lessons: [
      L(15, "project-3-kickoff", "Project 3 Kickoff: Minimal Hand-Holding"),
      L(16, "project-3-combining-leads-opportunities-cases", "Combining Leads, Opportunities & Cases"),
      L(17, "project-3-data-cleaning-at-scale", "Data Cleaning at Scale"),
      L(18, "project-3-building-the-executive-dashboard", "Building the Executive Dashboard"),
      L(19, "project-3-presenting-to-a-vp-of-sales", "Presenting to a \"VP of Sales\""),
      L(20, "project-3-data-storytelling-techniques", "Data Storytelling Techniques"),
      L(21, "project-3-wrap-up", "Project 3: Wrap-Up & Presentation"),
    ],
  },
  {
    n: 5,
    title: "Interview Preparation",
    lessons: [
      L(22, "common-salesforce-analyst-interview-questions", "Common Salesforce Analyst Interview Questions"),
      L(23, "walking-through-your-portfolio", "Walking Through Your Portfolio"),
      L(24, "salary-negotiation-basics", "Salary Negotiation Basics"),
      L(25, "next-steps-toward-analytics-engineering", "Next Steps Toward Analytics Engineering"),
    ],
  },
];
