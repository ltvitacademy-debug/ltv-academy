// Enterprise Cloud Architecture & Advanced Capstone course outline. Lessons without a contentDir
// render as "in production". Course 11 of the Cloud Engineer → Cloud Architect path — the fourth
// and final course of the Advanced Specialization stage: an enterprise architecture synthesis
// that pulls together IaC (course 8), containers (course 9), and observability/FinOps (course
// 10) into one enterprise design-and-defend capstone.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/enterprise-cloud-architecture-capstone/
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

export const ENTERPRISE_CLOUD_ARCHITECTURE_CAPSTONE_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Enterprise Cloud Architecture Principles",
    lessons: [
      L(1, "the-well-architected-framework-as-a-shared-vocabulary", "The Well-Architected Framework as a Shared Vocabulary", { contentDir: "ch01/01-the-well-architected-framework-as-a-shared-vocabulary", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-enterprise-cloud-architecture-capstone/the-well-architected-framework-as-a-shared-vocabulary.mp4", durationLabel: "2 min 36 s" }),
      L(2, "the-five-pillars-applied-to-a-real-design-review", "The Five Pillars Applied to a Real Design Review", { contentDir: "ch01/02-the-five-pillars-applied-to-a-real-design-review", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-enterprise-cloud-architecture-capstone/the-five-pillars-applied-to-a-real-design-review.mp4", durationLabel: "2 min 12 s" }),
      L(3, "tradeoffs-no-architecture-optimizes-every-pillar-at-once", "Tradeoffs: No Architecture Optimizes Every Pillar at Once", { contentDir: "ch01/03-tradeoffs-no-architecture-optimizes-every-pillar-at-once", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-enterprise-cloud-architecture-capstone/tradeoffs-no-architecture-optimizes-every-pillar-at-once.mp4", durationLabel: "2 min 11 s" }),
      L(4, "reading-an-architecture-diagram-the-way-an-architect-does", "Reading an Architecture Diagram the Way an Architect Does", { contentDir: "ch01/04-reading-an-architecture-diagram-the-way-an-architect-does", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-enterprise-cloud-architecture-capstone/reading-an-architecture-diagram-the-way-an-architect-does.mp4", durationLabel: "2 min 26 s" }),
    ],
  },
  {
    n: 2,
    title: "Landing Zones and Multi-Account Design",
    lessons: [
      L(5, "what-a-landing-zone-actually-solves", "What a Landing Zone Actually Solves", { contentDir: "ch02/05-what-a-landing-zone-actually-solves", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-enterprise-cloud-architecture-capstone/what-a-landing-zone-actually-solves.mp4", durationLabel: "2 min 44 s" }),
      L(6, "azure-landing-zones-management-groups-and-subscription-vending", "Azure Landing Zones: Management Groups and Subscription Vending", { contentDir: "ch02/06-azure-landing-zones-management-groups-and-subscription-vending", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-enterprise-cloud-architecture-capstone/azure-landing-zones-management-groups-and-subscription-vending.mp4", durationLabel: "2 min 49 s" }),
      L(7, "aws-control-tower-and-multi-account-organization-design", "AWS Control Tower and Multi-Account Organization Design", { contentDir: "ch02/07-aws-control-tower-and-multi-account-organization-design", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-enterprise-cloud-architecture-capstone/aws-control-tower-and-multi-account-organization-design.mp4", durationLabel: "2 min 53 s" }),
      L(8, "choosing-account-boundaries-by-blast-radius-not-by-org-chart", "Choosing Account Boundaries by Blast Radius, Not by Org Chart", { contentDir: "ch02/08-choosing-account-boundaries-by-blast-radius-not-by-org-chart", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-enterprise-cloud-architecture-capstone/choosing-account-boundaries-by-blast-radius-not-by-org-chart.mp4", durationLabel: "2 min 23 s" }),
    ],
  },
  {
    n: 3,
    title: "Network Architecture at Enterprise Scale",
    lessons: [
      L(9, "hub-and-spoke-vs-transit-gateway-topologies-compared", "Hub-and-Spoke vs. Transit Gateway Topologies Compared", { contentDir: "ch03/09-hub-and-spoke-vs-transit-gateway-topologies-compared", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-enterprise-cloud-architecture-capstone/hub-and-spoke-vs-transit-gateway-topologies-compared.mp4", durationLabel: "2 min 42 s" }),
      L(10, "hybrid-connectivity-expressroute-direct-connect-and-vpn", "Hybrid Connectivity: ExpressRoute, Direct Connect, and VPN", { contentDir: "ch03/10-hybrid-connectivity-expressroute-direct-connect-and-vpn", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-enterprise-cloud-architecture-capstone/hybrid-connectivity-expressroute-direct-connect-and-vpn.mp4", durationLabel: "2 min 36 s" }),
      L(11, "dns-architecture-across-multiple-accounts-and-vnets", "DNS Architecture Across Multiple Accounts and VNets", { contentDir: "ch03/11-dns-architecture-across-multiple-accounts-and-vnets", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-enterprise-cloud-architecture-capstone/dns-architecture-across-multiple-accounts-and-vnets.mp4", durationLabel: "2 min 34 s" }),
      L(12, "designing-network-architecture-that-scales-past-one-team", "Designing Network Architecture That Scales Past One Team", { contentDir: "ch03/12-designing-network-architecture-that-scales-past-one-team", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-enterprise-cloud-architecture-capstone/designing-network-architecture-that-scales-past-one-team.mp4", durationLabel: "2 min 29 s" }),
    ],
  },
  {
    n: 4,
    title: "Resilience and Disaster Recovery",
    lessons: [
      L(13, "availability-zones-regions-and-the-failure-domains-between-them", "Availability Zones, Regions, and the Failure Domains Between Them", { contentDir: "ch04/13-availability-zones-regions-and-the-failure-domains-between-them", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-enterprise-cloud-architecture-capstone/availability-zones-regions-and-the-failure-domains-between-them.mp4", durationLabel: "2 min 50 s" }),
      L(14, "rto-and-rpo-driven-architecture-decisions", "RTO- and RPO-Driven Architecture Decisions", { contentDir: "ch04/14-rto-and-rpo-driven-architecture-decisions", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-enterprise-cloud-architecture-capstone/rto-and-rpo-driven-architecture-decisions.mp4", durationLabel: "2 min 41 s" }),
      L(15, "active-active-vs-active-passive-multi-region-patterns", "Active-Active vs. Active-Passive Multi-Region Patterns", { contentDir: "ch04/15-active-active-vs-active-passive-multi-region-patterns", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-enterprise-cloud-architecture-capstone/active-active-vs-active-passive-multi-region-patterns.mp4", durationLabel: "2 min 55 s" }),
      L(16, "testing-disaster-recovery-for-real-not-just-on-paper", "Testing Disaster Recovery for Real, Not Just on Paper", { contentDir: "ch04/16-testing-disaster-recovery-for-real-not-just-on-paper", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-enterprise-cloud-architecture-capstone/testing-disaster-recovery-for-real-not-just-on-paper.mp4", durationLabel: "2 min 46 s" }),
    ],
  },
  {
    n: 5,
    title: "Governance at Scale",
    lessons: [
      L(17, "policy-as-code-across-an-entire-organization", "Policy as Code Across an Entire Organization", { contentDir: "ch05/17-policy-as-code-across-an-entire-organization", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-enterprise-cloud-architecture-capstone/policy-as-code-across-an-entire-organization.mp4", durationLabel: "2 min 31 s" }),
      L(18, "tagging-and-cost-governance-as-an-architecture-concern", "Tagging and Cost Governance as an Architecture Concern", { contentDir: "ch05/18-tagging-and-cost-governance-as-an-architecture-concern", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-enterprise-cloud-architecture-capstone/tagging-and-cost-governance-as-an-architecture-concern.mp4", durationLabel: "2 min 49 s" }),
      L(19, "guardrails-vs-gates-letting-teams-move-fast-safely", "Guardrails vs. Gates: Letting Teams Move Fast Safely", { contentDir: "ch05/19-guardrails-vs-gates-letting-teams-move-fast-safely", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-enterprise-cloud-architecture-capstone/guardrails-vs-gates-letting-teams-move-fast-safely.mp4", durationLabel: "2 min 25 s" }),
      L(20, "a-cloud-center-of-excellence-and-what-it-actually-does", "A Cloud Center of Excellence, and What It Actually Does", { contentDir: "ch05/20-a-cloud-center-of-excellence-and-what-it-actually-does", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-enterprise-cloud-architecture-capstone/a-cloud-center-of-excellence-and-what-it-actually-does.mp4", durationLabel: "2 min 32 s" }),
    ],
  },
  {
    n: 6,
    title: "Architecture Decision Records and Documentation",
    lessons: [
      L(21, "why-architecture-decisions-need-a-written-record", "Why Architecture Decisions Need a Written Record", { contentDir: "ch06/21-why-architecture-decisions-need-a-written-record", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-enterprise-cloud-architecture-capstone/why-architecture-decisions-need-a-written-record.mp4", durationLabel: "2 min 7 s" }),
      L(22, "writing-a-real-adr-context-options-decision-consequences", "Writing a Real ADR: Context, Options, Decision, Consequences", { contentDir: "ch06/22-writing-a-real-adr-context-options-decision-consequences", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-enterprise-cloud-architecture-capstone/writing-a-real-adr-context-options-decision-consequences.mp4", durationLabel: "2 min 15 s" }),
      L(23, "diagramming-standards-so-architecture-docs-stay-usable", "Diagramming Standards So Architecture Docs Stay Usable", { contentDir: "ch06/23-diagramming-standards-so-architecture-docs-stay-usable", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-enterprise-cloud-architecture-capstone/diagramming-standards-so-architecture-docs-stay-usable.mp4", durationLabel: "2 min 15 s" }),
      L(24, "keeping-architecture-documentation-from-going-stale", "Keeping Architecture Documentation from Going Stale", { contentDir: "ch06/24-keeping-architecture-documentation-from-going-stale" }),
    ],
  },
  {
    n: 7,
    title: "Presenting and Defending an Architecture",
    lessons: [
      L(25, "structuring-an-architecture-review-presentation", "Structuring an Architecture Review Presentation", { contentDir: "ch07/25-structuring-an-architecture-review-presentation", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-enterprise-cloud-architecture-capstone/structuring-an-architecture-review-presentation.mp4", durationLabel: "2 min 40 s" }),
      L(26, "anticipating-the-questions-a-review-board-will-ask", "Anticipating the Questions a Review Board Will Ask", { contentDir: "ch07/26-anticipating-the-questions-a-review-board-will-ask", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-enterprise-cloud-architecture-capstone/anticipating-the-questions-a-review-board-will-ask.mp4", durationLabel: "2 min 18 s" }),
      L(27, "defending-a-tradeoff-you-made-on-purpose", "Defending a Tradeoff You Made on Purpose", { contentDir: "ch07/27-defending-a-tradeoff-you-made-on-purpose", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-enterprise-cloud-architecture-capstone/defending-a-tradeoff-you-made-on-purpose.mp4", durationLabel: "2 min 28 s" }),
      L(28, "what-changes-after-the-review-revising-a-design-under-feedback", "What Changes After the Review: Revising a Design Under Feedback", { contentDir: "ch07/28-what-changes-after-the-review-revising-a-design-under-feedback" }),
    ],
  },
  {
    n: 8,
    title: "Capstone: Designing and Defending an Enterprise Cloud Architecture",
    lessons: [
      L(29, "lab-designing-a-landing-zone-and-network-for-a-multi-team-org", "Lab: Designing a Landing Zone and Network for a Multi-Team Org", { contentDir: "ch08/29-lab-designing-a-landing-zone-and-network-for-a-multi-team-org" }),
      L(30, "lab-writing-the-adrs-and-dr-plan-for-your-design", "Lab: Writing the ADRs and DR Plan for Your Design", { contentDir: "ch08/30-lab-writing-the-adrs-and-dr-plan-for-your-design" }),
      L(31, "case-study-an-architecture-that-passed-review-and-failed-in-production", "Case Study: An Architecture That Passed Review and Failed in Production", { contentDir: "ch08/31-case-study-an-architecture-that-passed-review-and-failed-in-production" }),
      L(32, "chapter-capstone-advanced-specialization-review-and-whats-next", "Chapter Capstone: Advanced Specialization Review and What's Next", { contentDir: "ch08/32-chapter-capstone-advanced-specialization-review-and-whats-next" }),
    ],
  },
];
