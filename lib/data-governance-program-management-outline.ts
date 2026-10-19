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
      L(1, "program-charter-and-scope", "Program Charter and Scope", { contentDir: "ch01/01-program-charter-and-scope", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792418753/ltv-data-governance-program-management/program-charter-and-scope.mp4", durationLabel: "1 min 25 s" }),
      L(2, "stakeholder-identification-and-analysis", "Stakeholder Identification and Analysis", { contentDir: "ch01/02-stakeholder-identification-and-analysis", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792418961/ltv-data-governance-program-management/stakeholder-identification-and-analysis.mp4", durationLabel: "1 min 36 s" }),
      L(3, "governance-councils-in-practice", "Governance Councils in Practice", { contentDir: "ch01/03-governance-councils-in-practice", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792419177/ltv-data-governance-program-management/governance-councils-in-practice.mp4", durationLabel: "1 min 22 s" }),
      L(4, "stewardship-programs", "Stewardship Programs", { contentDir: "ch01/04-stewardship-programs", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792419396/ltv-data-governance-program-management/stewardship-programs.mp4", durationLabel: "1 min 27 s" }),
      L(5, "roles-responsibilities-and-onboarding", "Roles, Responsibilities and Onboarding", { contentDir: "ch01/05-roles-responsibilities-and-onboarding", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792419592/ltv-data-governance-program-management/roles-responsibilities-and-onboarding.mp4", durationLabel: "1 min 26 s" }),
    ],
  },
  {
    n: 2,
    title: "Policies, Standards and Processes",
    lessons: [
      L(6, "writing-governance-policies", "Writing Governance Policies", { contentDir: "ch02/06-writing-governance-policies", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792419820/ltv-data-governance-program-management/writing-governance-policies.mp4", durationLabel: "1 min 15 s" }),
      L(7, "standards-and-procedures", "Standards and Procedures", { contentDir: "ch02/07-standards-and-procedures", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792420106/ltv-data-governance-program-management/standards-and-procedures.mp4", durationLabel: "1 min 19 s" }),
      L(8, "governance-workflows", "Governance Workflows", { contentDir: "ch02/08-governance-workflows", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792420358/ltv-data-governance-program-management/governance-workflows.mp4", durationLabel: "1 min 21 s" }),
      L(9, "issue-management-and-escalation", "Issue Management and Escalation", { contentDir: "ch02/09-issue-management-and-escalation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792420555/ltv-data-governance-program-management/issue-management-and-escalation.mp4", durationLabel: "1 min 24 s" }),
      L(10, "decision-rights", "Decision Rights", { contentDir: "ch02/10-decision-rights", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792420742/ltv-data-governance-program-management/decision-rights.mp4", durationLabel: "1 min 26 s" }),
    ],
  },
  {
    n: 3,
    title: "Measuring Governance",
    lessons: [
      L(11, "governance-kpis", "Governance KPIs", { contentDir: "ch03/11-governance-kpis", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792420923/ltv-data-governance-program-management/governance-kpis.mp4", durationLabel: "1 min 22 s" }),
      L(12, "data-quality-and-adoption-metrics", "Data Quality and Adoption Metrics", { contentDir: "ch03/12-data-quality-and-adoption-metrics", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792421109/ltv-data-governance-program-management/data-quality-and-adoption-metrics.mp4", durationLabel: "1 min 16 s" }),
      L(13, "governance-dashboards", "Governance Dashboards", { contentDir: "ch03/13-governance-dashboards", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792421294/ltv-data-governance-program-management/governance-dashboards.mp4", durationLabel: "1 min 28 s" }),
      L(14, "measuring-governance-success", "Measuring Governance Success", { contentDir: "ch03/14-measuring-governance-success", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792421629/ltv-data-governance-program-management/measuring-governance-success.mp4", durationLabel: "1 min 28 s" }),
      L(15, "reporting-to-executives", "Reporting to Executives", { contentDir: "ch03/15-reporting-to-executives", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792421823/ltv-data-governance-program-management/reporting-to-executives.mp4", durationLabel: "1 min 26 s" }),
    ],
  },
  {
    n: 4,
    title: "Adoption and Change",
    lessons: [
      L(16, "governance-adoption-and-change-management", "Governance Adoption and Change Management", { contentDir: "ch04/16-governance-adoption-and-change-management", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792421997/ltv-data-governance-program-management/governance-adoption-and-change-management.mp4", durationLabel: "1 min 28 s" }),
      L(17, "stakeholder-management", "Stakeholder Management", { contentDir: "ch04/17-stakeholder-management", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792422166/ltv-data-governance-program-management/stakeholder-management.mp4", durationLabel: "1 min 25 s" }),
      L(18, "communication-plans", "Communication Plans", { contentDir: "ch04/18-communication-plans", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792422354/ltv-data-governance-program-management/communication-plans.mp4", durationLabel: "1 min 30 s" }),
      L(19, "training-and-data-literacy", "Training and Data Literacy", { contentDir: "ch04/19-training-and-data-literacy", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792422534/ltv-data-governance-program-management/training-and-data-literacy.mp4", durationLabel: "1 min 27 s" }),
      L(20, "handling-resistance", "Handling Resistance", { contentDir: "ch04/20-handling-resistance", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792422713/ltv-data-governance-program-management/handling-resistance.mp4", durationLabel: "1 min 30 s" }),
    ],
  },
  {
    n: 5,
    title: "Sustaining Governance",
    lessons: [
      L(21, "governance-roadmaps", "Governance Roadmaps", { contentDir: "ch05/21-governance-roadmaps", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792422932/ltv-data-governance-program-management/governance-roadmaps.mp4", durationLabel: "1 min 43 s" }),
      L(22, "funding-and-business-cases", "Funding and Business Cases", { contentDir: "ch05/22-funding-and-business-cases", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792423136/ltv-data-governance-program-management/funding-and-business-cases.mp4", durationLabel: "1 min 39 s" }),
      L(23, "program-maturity-assessment", "Program Maturity Assessment", { contentDir: "ch05/23-program-maturity-assessment", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792423341/ltv-data-governance-program-management/program-maturity-assessment.mp4", durationLabel: "1 min 34 s" }),
      L(24, "program-management-case-study", "Program Management Case Study", { contentDir: "ch05/24-program-management-case-study", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792423572/ltv-data-governance-program-management/program-management-case-study.mp4", durationLabel: "2 min 0 s" }),
      L(25, "program-management-practice-lab", "Program Management Practice Lab", { contentDir: "ch05/25-program-management-practice-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792423793/ltv-data-governance-program-management/program-management-practice-lab.mp4", durationLabel: "1 min 43 s" }),
    ],
  },
];
