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
      L(1, "program-charter-and-scope", "Program Charter and Scope"),
      L(2, "stakeholder-identification-and-analysis", "Stakeholder Identification and Analysis"),
      L(3, "governance-councils-in-practice", "Governance Councils in Practice"),
      L(4, "stewardship-programs", "Stewardship Programs"),
      L(5, "roles-responsibilities-and-onboarding", "Roles, Responsibilities and Onboarding"),
    ],
  },
  {
    n: 2,
    title: "Policies, Standards and Processes",
    lessons: [
      L(6, "writing-governance-policies", "Writing Governance Policies"),
      L(7, "standards-and-procedures", "Standards and Procedures"),
      L(8, "governance-workflows", "Governance Workflows"),
      L(9, "issue-management-and-escalation", "Issue Management and Escalation"),
      L(10, "decision-rights", "Decision Rights"),
    ],
  },
  {
    n: 3,
    title: "Measuring Governance",
    lessons: [
      L(11, "governance-kpis", "Governance KPIs"),
      L(12, "data-quality-and-adoption-metrics", "Data Quality and Adoption Metrics"),
      L(13, "governance-dashboards", "Governance Dashboards"),
      L(14, "measuring-governance-success", "Measuring Governance Success"),
      L(15, "reporting-to-executives", "Reporting to Executives"),
    ],
  },
  {
    n: 4,
    title: "Adoption and Change",
    lessons: [
      L(16, "governance-adoption-and-change-management", "Governance Adoption and Change Management"),
      L(17, "stakeholder-management", "Stakeholder Management"),
      L(18, "communication-plans", "Communication Plans"),
      L(19, "training-and-data-literacy", "Training and Data Literacy"),
      L(20, "handling-resistance", "Handling Resistance"),
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
