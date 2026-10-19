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
      L(1, "why-data-governance-matters", "Why Data Governance Matters", { contentDir: "ch01/01-why-data-governance-matters", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792422315/ltv-data-governance-foundations/why-data-governance-matters.mp4", durationLabel: "1 min 48 s" }),
      L(2, "data-as-a-business-asset", "Data as a Business Asset", { contentDir: "ch01/02-data-as-a-business-asset", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792422524/ltv-data-governance-foundations/data-as-a-business-asset.mp4", durationLabel: "1 min 40 s" }),
      L(3, "data-governance-vs-data-management-vs-data-quality", "Data Governance vs. Data Management vs. Data Quality", { contentDir: "ch01/03-data-governance-vs-data-management-vs-data-quality", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792422695/ltv-data-governance-foundations/data-governance-vs-data-management-vs-data-quality.mp4", durationLabel: "1 min 30 s" }),
      L(4, "the-cost-of-poor-data", "The Cost of Poor Data", { contentDir: "ch01/04-the-cost-of-poor-data", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792422902/ltv-data-governance-foundations/the-cost-of-poor-data.mp4", durationLabel: "1 min 44 s" }),
      L(5, "governance-drivers-compliance-trust-and-value", "Governance Drivers: Compliance, Trust and Value", { contentDir: "ch01/05-governance-drivers-compliance-trust-and-value", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792423091/ltv-data-governance-foundations/governance-drivers-compliance-trust-and-value.mp4", durationLabel: "1 min 37 s" }),
      L(6, "common-governance-failures", "Common Governance Failures", { contentDir: "ch01/06-common-governance-failures", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792423274/ltv-data-governance-foundations/common-governance-failures.mp4", durationLabel: "1 min 28 s" }),
    ],
  },
  {
    n: 2,
    title: "Frameworks and Models",
    lessons: [
      L(7, "dama-dmbok-overview", "DAMA-DMBOK Overview", { contentDir: "ch02/07-dama-dmbok-overview", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792423483/ltv-data-governance-foundations/dama-dmbok-overview.mp4", durationLabel: "1 min 40 s" }),
      L(8, "data-governance-frameworks-compared", "Data Governance Frameworks Compared", { contentDir: "ch02/08-data-governance-frameworks-compared", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792423682/ltv-data-governance-foundations/data-governance-frameworks-compared.mp4", durationLabel: "1 min 40 s" }),
      L(9, "data-governance-maturity-models", "Data Governance Maturity Models", { contentDir: "ch02/09-data-governance-maturity-models", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792423893/ltv-data-governance-foundations/data-governance-maturity-models.mp4", durationLabel: "1 min 40 s" }),
      L(10, "governance-operating-models", "Governance Operating Models", { contentDir: "ch02/10-governance-operating-models", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792424090/ltv-data-governance-foundations/governance-operating-models.mp4", durationLabel: "1 min 37 s" }),
      L(11, "centralized-decentralized-and-federated-governance", "Centralized, Decentralized and Federated Governance", { contentDir: "ch02/11-centralized-decentralized-and-federated-governance", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792424243/ltv-data-governance-foundations/centralized-decentralized-and-federated-governance.mp4", durationLabel: "1 min 34 s" }),
      L(12, "choosing-an-operating-model", "Choosing an Operating Model", { contentDir: "ch02/12-choosing-an-operating-model", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792424326/ltv-data-governance-foundations/choosing-an-operating-model.mp4", durationLabel: "1 min 29 s" }),
    ],
  },
  {
    n: 3,
    title: "Roles and Structure",
    lessons: [
      L(13, "data-owners", "Data Owners", { contentDir: "ch03/13-data-owners", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792424415/ltv-data-governance-foundations/data-owners.mp4", durationLabel: "1 min 35 s" }),
      L(14, "data-stewards", "Data Stewards", { contentDir: "ch03/14-data-stewards", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792424490/ltv-data-governance-foundations/data-stewards.mp4", durationLabel: "1 min 29 s" }),
      L(15, "data-custodians-and-data-consumers", "Data Custodians and Data Consumers", { contentDir: "ch03/15-data-custodians-and-data-consumers", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792424575/ltv-data-governance-foundations/data-custodians-and-data-consumers.mp4", durationLabel: "1 min 34 s" }),
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
