// The Data Governance Foundations course outline. Part of the Data Governance
// career path. Content-complete (guide, slides, quiz) as of 2026-10-04; no
// narrated video yet.

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
      L(1, "why-data-governance-matters", "Why Data Governance Matters", { contentDir: "ch01/01-why-data-governance-matters" }),
      L(2, "data-as-a-business-asset", "Data as a Business Asset", { contentDir: "ch01/02-data-as-a-business-asset" }),
      L(3, "data-governance-vs-data-management-vs-data-quality", "Data Governance vs. Data Management vs. Data Quality", { contentDir: "ch01/03-data-governance-vs-data-management-vs-data-quality" }),
      L(4, "the-cost-of-poor-data", "The Cost of Poor Data", { contentDir: "ch01/04-the-cost-of-poor-data" }),
      L(5, "governance-drivers-compliance-trust-and-value", "Governance Drivers: Compliance, Trust and Value", { contentDir: "ch01/05-governance-drivers-compliance-trust-and-value" }),
      L(6, "common-governance-failures", "Common Governance Failures", { contentDir: "ch01/06-common-governance-failures" }),
    ],
  },
  {
    n: 2,
    title: "Frameworks and Models",
    lessons: [
      L(7, "dama-dmbok-overview", "DAMA-DMBOK Overview", { contentDir: "ch02/07-dama-dmbok-overview" }),
      L(8, "data-governance-frameworks-compared", "Data Governance Frameworks Compared", { contentDir: "ch02/08-data-governance-frameworks-compared" }),
      L(9, "data-governance-maturity-models", "Data Governance Maturity Models", { contentDir: "ch02/09-data-governance-maturity-models" }),
      L(10, "governance-operating-models", "Governance Operating Models", { contentDir: "ch02/10-governance-operating-models" }),
      L(11, "centralized-decentralized-and-federated-governance", "Centralized, Decentralized and Federated Governance", { contentDir: "ch02/11-centralized-decentralized-and-federated-governance" }),
      L(12, "choosing-an-operating-model", "Choosing an Operating Model", { contentDir: "ch02/12-choosing-an-operating-model" }),
    ],
  },
  {
    n: 3,
    title: "Roles and Structure",
    lessons: [
      L(13, "data-owners", "Data Owners", { contentDir: "ch03/13-data-owners" }),
      L(14, "data-stewards", "Data Stewards", { contentDir: "ch03/14-data-stewards" }),
      L(15, "data-custodians-and-data-consumers", "Data Custodians and Data Consumers", { contentDir: "ch03/15-data-custodians-and-data-consumers" }),
      L(16, "governance-councils-and-committees", "Governance Councils and Committees", { contentDir: "ch03/16-governance-councils-and-committees" }),
      L(17, "raci-for-data-governance", "RACI for Data Governance", { contentDir: "ch03/17-raci-for-data-governance" }),
      L(18, "executive-sponsorship", "Executive Sponsorship", { contentDir: "ch03/18-executive-sponsorship" }),
    ],
  },
  {
    n: 4,
    title: "Policies and Standards",
    lessons: [
      L(19, "data-policies", "Data Policies", { contentDir: "ch04/19-data-policies" }),
      L(20, "data-standards", "Data Standards", { contentDir: "ch04/20-data-standards" }),
      L(21, "data-definitions-and-naming-standards", "Data Definitions and Naming Standards", { contentDir: "ch04/21-data-definitions-and-naming-standards" }),
      L(22, "policy-lifecycle", "Policy Lifecycle", { contentDir: "ch04/22-policy-lifecycle" }),
      L(23, "policy-enforcement", "Policy Enforcement", { contentDir: "ch04/23-policy-enforcement" }),
      L(24, "the-regulatory-landscape-overview", "The Regulatory Landscape Overview", { contentDir: "ch04/24-the-regulatory-landscape-overview" }),
    ],
  },
  {
    n: 5,
    title: "Getting Started",
    lessons: [
      L(25, "assessing-governance-readiness", "Assessing Governance Readiness", { contentDir: "ch05/25-assessing-governance-readiness" }),
      L(26, "building-the-business-case", "Building the Business Case", { contentDir: "ch05/26-building-the-business-case" }),
      L(27, "starting-small-a-governance-pilot", "Starting Small: A Governance Pilot", { contentDir: "ch05/27-starting-small-a-governance-pilot" }),
      L(28, "governance-roadmaps", "Governance Roadmaps", { contentDir: "ch05/28-governance-roadmaps" }),
      L(29, "communicating-governance-to-the-business", "Communicating Governance to the Business", { contentDir: "ch05/29-communicating-governance-to-the-business" }),
      L(30, "foundations-case-study", "Foundations Case Study", { contentDir: "ch05/30-foundations-case-study" }),
    ],
  },
];
