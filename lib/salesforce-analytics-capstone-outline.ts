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
      L(1, "the-salesforce-analytics-career-ladder", "The Salesforce Analytics Career Ladder", { contentDir: "ch01/01-the-salesforce-analytics-career-ladder" }),
      L(2, "target-job-titles-and-what-they-do", "Target Job Titles & What They Actually Do", { contentDir: "ch01/02-target-job-titles-and-what-they-do" }),
      L(3, "building-a-portfolio-strategy", "Building a Portfolio Strategy", { contentDir: "ch01/03-building-a-portfolio-strategy" }),
    ],
  },
  {
    n: 2,
    title: "Project 1 — Sales Pipeline",
    lessons: [
      L(4, "project-1-kickoff", "Project 1 Kickoff: The Business Questions", { contentDir: "ch02/04-project-1-kickoff" }),
      L(5, "project-1-connecting-the-objects", "Connecting Leads, Accounts, Contacts & Opportunities", { contentDir: "ch02/05-project-1-connecting-the-objects" }),
      L(6, "project-1-pipeline-and-conversion", "Pipeline & Conversion Analysis", { contentDir: "ch02/06-project-1-pipeline-and-conversion" }),
      L(7, "project-1-sales-rep-performance", "Sales Rep Performance Analysis", { contentDir: "ch02/07-project-1-sales-rep-performance" }),
      L(8, "project-1-deal-size-and-cycle", "Deal Size & Sales Cycle Analysis", { contentDir: "ch02/08-project-1-deal-size-and-cycle" }),
      L(9, "project-1-wrap-up", "Project 1: Wrap-Up & Presentation", { contentDir: "ch02/09-project-1-wrap-up" }),
    ],
  },
  {
    n: 3,
    title: "Project 2 — Customer Service",
    lessons: [
      L(10, "project-2-kickoff", "Project 2 Kickoff: The Business Questions", { contentDir: "ch03/10-project-2-kickoff" }),
      L(11, "project-2-case-volume-and-resolution-time", "Case Volume & Resolution Time", { contentDir: "ch03/11-project-2-case-volume-and-resolution-time" }),
      L(12, "project-2-sla-and-escalations", "SLA & Escalation Analysis", { contentDir: "ch03/12-project-2-sla-and-escalations" }),
      L(13, "project-2-agent-performance", "Agent Performance Analysis", { contentDir: "ch03/13-project-2-agent-performance" }),
      L(14, "project-2-wrap-up", "Project 2: Wrap-Up & Presentation", { contentDir: "ch03/14-project-2-wrap-up" }),
    ],
  },
  {
    n: 4,
    title: "Project 3 — Executive CRM Analytics",
    lessons: [
      L(15, "project-3-kickoff", "Project 3 Kickoff: Minimal Hand-Holding", { contentDir: "ch04/15-project-3-kickoff" }),
      L(16, "project-3-combining-leads-opportunities-cases", "Combining Leads, Opportunities & Cases", { contentDir: "ch04/16-project-3-combining-leads-opportunities-cases" }),
      L(17, "project-3-data-cleaning-at-scale", "Data Cleaning at Scale", { contentDir: "ch04/17-project-3-data-cleaning-at-scale" }),
      L(18, "project-3-building-the-executive-dashboard", "Building the Executive Dashboard", { contentDir: "ch04/18-project-3-building-the-executive-dashboard" }),
      L(19, "project-3-presenting-to-a-vp-of-sales", "Presenting to a \"VP of Sales\"", { contentDir: "ch04/19-project-3-presenting-to-a-vp-of-sales" }),
      L(20, "project-3-data-storytelling-techniques", "Data Storytelling Techniques", { contentDir: "ch04/20-project-3-data-storytelling-techniques" }),
      L(21, "project-3-wrap-up", "Project 3: Wrap-Up & Presentation", { contentDir: "ch04/21-project-3-wrap-up" }),
    ],
  },
  {
    n: 5,
    title: "Interview Preparation",
    lessons: [
      L(22, "common-salesforce-analyst-interview-questions", "Common Salesforce Analyst Interview Questions", { contentDir: "ch05/22-common-salesforce-analyst-interview-questions" }),
      L(23, "walking-through-your-portfolio", "Walking Through Your Portfolio", { contentDir: "ch05/23-walking-through-your-portfolio" }),
      L(24, "salary-negotiation-basics", "Salary Negotiation Basics", { contentDir: "ch05/24-salary-negotiation-basics" }),
      L(25, "next-steps-toward-analytics-engineering", "Next Steps Toward Analytics Engineering", { contentDir: "ch05/25-next-steps-toward-analytics-engineering" }),
    ],
  },
];
