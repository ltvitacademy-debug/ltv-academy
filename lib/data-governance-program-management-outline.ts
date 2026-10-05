// The Data Governance Program Management course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Part of the Data Governance career path.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/data-governance-program-management/
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

export const GOV_DATA_GOVERNANCE_PROGRAM_MANAGEMENT_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Launching the Program",
    lessons: [
      L(1, "program-charter-and-scope", "Program Charter and Scope", { contentDir: "ch01/01-program-charter-and-scope" }),
      L(2, "stakeholder-identification-and-analysis", "Stakeholder Identification and Analysis", { contentDir: "ch01/02-stakeholder-identification-and-analysis" }),
      L(3, "governance-councils-in-practice", "Governance Councils in Practice", { contentDir: "ch01/03-governance-councils-in-practice" }),
      L(4, "stewardship-programs", "Stewardship Programs", { contentDir: "ch01/04-stewardship-programs" }),
      L(5, "roles-responsibilities-and-onboarding", "Roles, Responsibilities and Onboarding", { contentDir: "ch01/05-roles-responsibilities-and-onboarding" }),
    ],
  },
  {
    n: 2,
    title: "Policies, Standards and Processes",
    lessons: [
      L(6, "writing-governance-policies", "Writing Governance Policies", { contentDir: "ch02/06-writing-governance-policies" }),
      L(7, "standards-and-procedures", "Standards and Procedures", { contentDir: "ch02/07-standards-and-procedures" }),
      L(8, "governance-workflows", "Governance Workflows", { contentDir: "ch02/08-governance-workflows" }),
      L(9, "issue-management-and-escalation", "Issue Management and Escalation", { contentDir: "ch02/09-issue-management-and-escalation" }),
      L(10, "decision-rights", "Decision Rights", { contentDir: "ch02/10-decision-rights" }),
    ],
  },
  {
    n: 3,
    title: "Measuring Governance",
    lessons: [
      L(11, "governance-kpis", "Governance KPIs", { contentDir: "ch03/11-governance-kpis" }),
      L(12, "data-quality-and-adoption-metrics", "Data Quality and Adoption Metrics", { contentDir: "ch03/12-data-quality-and-adoption-metrics" }),
      L(13, "governance-dashboards", "Governance Dashboards", { contentDir: "ch03/13-governance-dashboards" }),
      L(14, "measuring-governance-success", "Measuring Governance Success", { contentDir: "ch03/14-measuring-governance-success" }),
      L(15, "reporting-to-executives", "Reporting to Executives", { contentDir: "ch03/15-reporting-to-executives" }),
    ],
  },
  {
    n: 4,
    title: "Adoption and Change",
    lessons: [
      L(16, "governance-adoption-and-change-management", "Governance Adoption and Change Management", { contentDir: "ch04/16-governance-adoption-and-change-management" }),
      L(17, "stakeholder-management", "Stakeholder Management", { contentDir: "ch04/17-stakeholder-management" }),
      L(18, "communication-plans", "Communication Plans", { contentDir: "ch04/18-communication-plans" }),
      L(19, "training-and-data-literacy", "Training and Data Literacy", { contentDir: "ch04/19-training-and-data-literacy" }),
      L(20, "handling-resistance", "Handling Resistance", { contentDir: "ch04/20-handling-resistance" }),
    ],
  },
  {
    n: 5,
    title: "Sustaining Governance",
    lessons: [
      L(21, "governance-roadmaps", "Governance Roadmaps", { contentDir: "ch05/21-governance-roadmaps" }),
      L(22, "funding-and-business-cases", "Funding and Business Cases", { contentDir: "ch05/22-funding-and-business-cases" }),
      L(23, "program-maturity-assessment", "Program Maturity Assessment", { contentDir: "ch05/23-program-maturity-assessment" }),
      L(24, "program-management-case-study", "Program Management Case Study", { contentDir: "ch05/24-program-management-case-study" }),
      L(25, "program-management-practice-lab", "Program Management Practice Lab", { contentDir: "ch05/25-program-management-practice-lab" }),
    ],
  },
];
