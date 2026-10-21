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
      L(1, "the-salesforce-analytics-career-ladder", "The Salesforce Analytics Career Ladder", { contentDir: "ch01/01-the-salesforce-analytics-career-ladder", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792537278/ltv-salesforce-analytics-capstone/the-salesforce-analytics-career-ladder.mp4", durationLabel: "2 min 9 s" }),
      L(2, "target-job-titles-and-what-they-do", "Target Job Titles & What They Actually Do", { contentDir: "ch01/02-target-job-titles-and-what-they-do", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792537333/ltv-salesforce-analytics-capstone/target-job-titles-and-what-they-do.mp4", durationLabel: "2 min 7 s" }),
      L(3, "building-a-portfolio-strategy", "Building a Portfolio Strategy", { contentDir: "ch01/03-building-a-portfolio-strategy", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792537383/ltv-salesforce-analytics-capstone/building-a-portfolio-strategy.mp4", durationLabel: "1 min 56 s" }),
    ],
  },
  {
    n: 2,
    title: "Project 1 — Sales Pipeline",
    lessons: [
      L(4, "project-1-kickoff", "Project 1 Kickoff: The Business Questions", { contentDir: "ch02/04-project-1-kickoff", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792537441/ltv-salesforce-analytics-capstone/project-1-kickoff.mp4", durationLabel: "2 min 13 s" }),
      L(5, "project-1-connecting-the-objects", "Connecting Leads, Accounts, Contacts & Opportunities", { contentDir: "ch02/05-project-1-connecting-the-objects", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792537497/ltv-salesforce-analytics-capstone/project-1-connecting-the-objects.mp4", durationLabel: "2 min 6 s" }),
      L(6, "project-1-pipeline-and-conversion", "Pipeline & Conversion Analysis", { contentDir: "ch02/06-project-1-pipeline-and-conversion", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792537555/ltv-salesforce-analytics-capstone/project-1-pipeline-and-conversion.mp4", durationLabel: "2 min 16 s" }),
      L(7, "project-1-sales-rep-performance", "Sales Rep Performance Analysis", { contentDir: "ch02/07-project-1-sales-rep-performance", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792537609/ltv-salesforce-analytics-capstone/project-1-sales-rep-performance.mp4", durationLabel: "2 min 4 s" }),
      L(8, "project-1-deal-size-and-cycle", "Deal Size & Sales Cycle Analysis", { contentDir: "ch02/08-project-1-deal-size-and-cycle", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792537662/ltv-salesforce-analytics-capstone/project-1-deal-size-and-cycle.mp4", durationLabel: "2 min 3 s" }),
      L(9, "project-1-wrap-up", "Project 1: Wrap-Up & Presentation", { contentDir: "ch02/09-project-1-wrap-up", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792537714/ltv-salesforce-analytics-capstone/project-1-wrap-up.mp4", durationLabel: "2 min 0 s" }),
    ],
  },
  {
    n: 3,
    title: "Project 2 — Customer Service",
    lessons: [
      L(10, "project-2-kickoff", "Project 2 Kickoff: The Business Questions", { contentDir: "ch03/10-project-2-kickoff", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792537764/ltv-salesforce-analytics-capstone/project-2-kickoff.mp4", durationLabel: "1 min 57 s" }),
      L(11, "project-2-case-volume-and-resolution-time", "Case Volume & Resolution Time", { contentDir: "ch03/11-project-2-case-volume-and-resolution-time", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792537819/ltv-salesforce-analytics-capstone/project-2-case-volume-and-resolution-time.mp4", durationLabel: "2 min 6 s" }),
      L(12, "project-2-sla-and-escalations", "SLA & Escalation Analysis", { contentDir: "ch03/12-project-2-sla-and-escalations", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792537882/ltv-salesforce-analytics-capstone/project-2-sla-and-escalations.mp4", durationLabel: "2 min 25 s" }),
      L(13, "project-2-agent-performance", "Agent Performance Analysis", { contentDir: "ch03/13-project-2-agent-performance", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792537936/ltv-salesforce-analytics-capstone/project-2-agent-performance.mp4", durationLabel: "2 min 7 s" }),
      L(14, "project-2-wrap-up", "Project 2: Wrap-Up & Presentation", { contentDir: "ch03/14-project-2-wrap-up", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792537999/ltv-salesforce-analytics-capstone/project-2-wrap-up.mp4", durationLabel: "2 min 29 s" }),
    ],
  },
  {
    n: 4,
    title: "Project 3 — Executive CRM Analytics",
    lessons: [
      L(15, "project-3-kickoff", "Project 3 Kickoff: Minimal Hand-Holding", { contentDir: "ch04/15-project-3-kickoff", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792538053/ltv-salesforce-analytics-capstone/project-3-kickoff.mp4", durationLabel: "2 min 5 s" }),
      L(16, "project-3-combining-leads-opportunities-cases", "Combining Leads, Opportunities & Cases", { contentDir: "ch04/16-project-3-combining-leads-opportunities-cases", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792538118/ltv-salesforce-analytics-capstone/project-3-combining-leads-opportunities-cases.mp4", durationLabel: "2 min 32 s" }),
      L(17, "project-3-data-cleaning-at-scale", "Data Cleaning at Scale", { contentDir: "ch04/17-project-3-data-cleaning-at-scale", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792538182/ltv-salesforce-analytics-capstone/project-3-data-cleaning-at-scale.mp4", durationLabel: "2 min 26 s" }),
      L(18, "project-3-building-the-executive-dashboard", "Building the Executive Dashboard", { contentDir: "ch04/18-project-3-building-the-executive-dashboard", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792538238/ltv-salesforce-analytics-capstone/project-3-building-the-executive-dashboard.mp4", durationLabel: "2 min 8 s" }),
      L(19, "project-3-presenting-to-a-vp-of-sales", "Presenting to a \"VP of Sales\"", { contentDir: "ch04/19-project-3-presenting-to-a-vp-of-sales", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792538289/ltv-salesforce-analytics-capstone/project-3-presenting-to-a-vp-of-sales.mp4", durationLabel: "1 min 57 s" }),
      L(20, "project-3-data-storytelling-techniques", "Data Storytelling Techniques", { contentDir: "ch04/20-project-3-data-storytelling-techniques", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792538346/ltv-salesforce-analytics-capstone/project-3-data-storytelling-techniques.mp4", durationLabel: "2 min 13 s" }),
      L(21, "project-3-wrap-up", "Project 3: Wrap-Up & Presentation", { contentDir: "ch04/21-project-3-wrap-up", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792538405/ltv-salesforce-analytics-capstone/project-3-wrap-up.mp4", durationLabel: "2 min 13 s" }),
    ],
  },
  {
    n: 5,
    title: "Interview Preparation",
    lessons: [
      L(22, "common-salesforce-analyst-interview-questions", "Common Salesforce Analyst Interview Questions", { contentDir: "ch05/22-common-salesforce-analyst-interview-questions", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792538460/ltv-salesforce-analytics-capstone/common-salesforce-analyst-interview-questions.mp4", durationLabel: "2 min 9 s" }),
      L(23, "walking-through-your-portfolio", "Walking Through Your Portfolio", { contentDir: "ch05/23-walking-through-your-portfolio", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792538510/ltv-salesforce-analytics-capstone/walking-through-your-portfolio.mp4", durationLabel: "1 min 58 s" }),
      L(24, "salary-negotiation-basics", "Salary Negotiation Basics", { contentDir: "ch05/24-salary-negotiation-basics", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792538561/ltv-salesforce-analytics-capstone/salary-negotiation-basics.mp4", durationLabel: "1 min 57 s" }),
      L(25, "next-steps-toward-analytics-engineering", "Next Steps Toward Analytics Engineering", { contentDir: "ch05/25-next-steps-toward-analytics-engineering", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792538617/ltv-salesforce-analytics-capstone/next-steps-toward-analytics-engineering.mp4", durationLabel: "2 min 12 s" }),
    ],
  },
];
