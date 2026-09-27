// The Data Governance Foundations course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Part of the Data Governance career path.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/data-governance-foundations/
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

export const GOV_DATA_GOVERNANCE_FOUNDATIONS_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "What Data Governance Is",
    lessons: [
      L(1, "why-data-governance-matters", "Why Data Governance Matters"),
      L(2, "data-as-a-business-asset", "Data as a Business Asset"),
      L(3, "data-governance-vs-data-management-vs-data-quality", "Data Governance vs. Data Management vs. Data Quality"),
      L(4, "the-cost-of-poor-data", "The Cost of Poor Data"),
      L(5, "governance-drivers-compliance-trust-and-value", "Governance Drivers: Compliance, Trust and Value"),
      L(6, "common-governance-failures", "Common Governance Failures"),
    ],
  },
  {
    n: 2,
    title: "Frameworks and Models",
    lessons: [
      L(7, "dama-dmbok-overview", "DAMA-DMBOK Overview"),
      L(8, "data-governance-frameworks-compared", "Data Governance Frameworks Compared"),
      L(9, "data-governance-maturity-models", "Data Governance Maturity Models"),
      L(10, "governance-operating-models", "Governance Operating Models"),
      L(11, "centralized-decentralized-and-federated-governance", "Centralized, Decentralized and Federated Governance"),
      L(12, "choosing-an-operating-model", "Choosing an Operating Model"),
    ],
  },
  {
    n: 3,
    title: "Roles and Structure",
    lessons: [
      L(13, "data-owners", "Data Owners"),
      L(14, "data-stewards", "Data Stewards"),
      L(15, "data-custodians-and-data-consumers", "Data Custodians and Data Consumers"),
      L(16, "governance-councils-and-committees", "Governance Councils and Committees"),
      L(17, "raci-for-data-governance", "RACI for Data Governance"),
      L(18, "executive-sponsorship", "Executive Sponsorship"),
    ],
  },
  {
    n: 4,
    title: "Policies and Standards",
    lessons: [
      L(19, "data-policies", "Data Policies"),
      L(20, "data-standards", "Data Standards"),
      L(21, "data-definitions-and-naming-standards", "Data Definitions and Naming Standards"),
      L(22, "policy-lifecycle", "Policy Lifecycle"),
      L(23, "policy-enforcement", "Policy Enforcement"),
      L(24, "the-regulatory-landscape-overview", "The Regulatory Landscape Overview"),
    ],
  },
  {
    n: 5,
    title: "Getting Started",
    lessons: [
      L(25, "assessing-governance-readiness", "Assessing Governance Readiness"),
      L(26, "building-the-business-case", "Building the Business Case"),
      L(27, "starting-small-a-governance-pilot", "Starting Small: A Governance Pilot"),
      L(28, "governance-roadmaps", "Governance Roadmaps"),
      L(29, "communicating-governance-to-the-business", "Communicating Governance to the Business"),
      L(30, "foundations-case-study", "Foundations Case Study"),
    ],
  },
];
