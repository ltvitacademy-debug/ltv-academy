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
      L(1, "the-well-architected-framework-as-a-shared-vocabulary", "The Well-Architected Framework as a Shared Vocabulary", { contentDir: "ch01/01-the-well-architected-framework-as-a-shared-vocabulary" }),
      L(2, "the-five-pillars-applied-to-a-real-design-review", "The Five Pillars Applied to a Real Design Review", { contentDir: "ch01/02-the-five-pillars-applied-to-a-real-design-review" }),
      L(3, "tradeoffs-no-architecture-optimizes-every-pillar-at-once", "Tradeoffs: No Architecture Optimizes Every Pillar at Once", { contentDir: "ch01/03-tradeoffs-no-architecture-optimizes-every-pillar-at-once" }),
      L(4, "reading-an-architecture-diagram-the-way-an-architect-does", "Reading an Architecture Diagram the Way an Architect Does", { contentDir: "ch01/04-reading-an-architecture-diagram-the-way-an-architect-does" }),
    ],
  },
  {
    n: 2,
    title: "Landing Zones and Multi-Account Design",
    lessons: [
      L(5, "what-a-landing-zone-actually-solves", "What a Landing Zone Actually Solves", { contentDir: "ch02/05-what-a-landing-zone-actually-solves" }),
      L(6, "azure-landing-zones-management-groups-and-subscription-vending", "Azure Landing Zones: Management Groups and Subscription Vending", { contentDir: "ch02/06-azure-landing-zones-management-groups-and-subscription-vending" }),
      L(7, "aws-control-tower-and-multi-account-organization-design", "AWS Control Tower and Multi-Account Organization Design", { contentDir: "ch02/07-aws-control-tower-and-multi-account-organization-design" }),
      L(8, "choosing-account-boundaries-by-blast-radius-not-by-org-chart", "Choosing Account Boundaries by Blast Radius, Not by Org Chart", { contentDir: "ch02/08-choosing-account-boundaries-by-blast-radius-not-by-org-chart" }),
    ],
  },
  {
    n: 3,
    title: "Network Architecture at Enterprise Scale",
    lessons: [
      L(9, "hub-and-spoke-vs-transit-gateway-topologies-compared", "Hub-and-Spoke vs. Transit Gateway Topologies Compared", { contentDir: "ch03/09-hub-and-spoke-vs-transit-gateway-topologies-compared" }),
      L(10, "hybrid-connectivity-expressroute-direct-connect-and-vpn", "Hybrid Connectivity: ExpressRoute, Direct Connect, and VPN", { contentDir: "ch03/10-hybrid-connectivity-expressroute-direct-connect-and-vpn" }),
      L(11, "dns-architecture-across-multiple-accounts-and-vnets", "DNS Architecture Across Multiple Accounts and VNets", { contentDir: "ch03/11-dns-architecture-across-multiple-accounts-and-vnets" }),
      L(12, "designing-network-architecture-that-scales-past-one-team", "Designing Network Architecture That Scales Past One Team", { contentDir: "ch03/12-designing-network-architecture-that-scales-past-one-team" }),
    ],
  },
  {
    n: 4,
    title: "Resilience and Disaster Recovery",
    lessons: [
      L(13, "availability-zones-regions-and-the-failure-domains-between-them", "Availability Zones, Regions, and the Failure Domains Between Them", { contentDir: "ch04/13-availability-zones-regions-and-the-failure-domains-between-them" }),
      L(14, "rto-and-rpo-driven-architecture-decisions", "RTO- and RPO-Driven Architecture Decisions", { contentDir: "ch04/14-rto-and-rpo-driven-architecture-decisions" }),
      L(15, "active-active-vs-active-passive-multi-region-patterns", "Active-Active vs. Active-Passive Multi-Region Patterns", { contentDir: "ch04/15-active-active-vs-active-passive-multi-region-patterns" }),
      L(16, "testing-disaster-recovery-for-real-not-just-on-paper", "Testing Disaster Recovery for Real, Not Just on Paper", { contentDir: "ch04/16-testing-disaster-recovery-for-real-not-just-on-paper" }),
    ],
  },
  {
    n: 5,
    title: "Governance at Scale",
    lessons: [
      L(17, "policy-as-code-across-an-entire-organization", "Policy as Code Across an Entire Organization", { contentDir: "ch05/17-policy-as-code-across-an-entire-organization" }),
      L(18, "tagging-and-cost-governance-as-an-architecture-concern", "Tagging and Cost Governance as an Architecture Concern", { contentDir: "ch05/18-tagging-and-cost-governance-as-an-architecture-concern" }),
      L(19, "guardrails-vs-gates-letting-teams-move-fast-safely", "Guardrails vs. Gates: Letting Teams Move Fast Safely", { contentDir: "ch05/19-guardrails-vs-gates-letting-teams-move-fast-safely" }),
      L(20, "a-cloud-center-of-excellence-and-what-it-actually-does", "A Cloud Center of Excellence, and What It Actually Does", { contentDir: "ch05/20-a-cloud-center-of-excellence-and-what-it-actually-does" }),
    ],
  },
  {
    n: 6,
    title: "Architecture Decision Records and Documentation",
    lessons: [
      L(21, "why-architecture-decisions-need-a-written-record", "Why Architecture Decisions Need a Written Record", { contentDir: "ch06/21-why-architecture-decisions-need-a-written-record" }),
      L(22, "writing-a-real-adr-context-options-decision-consequences", "Writing a Real ADR: Context, Options, Decision, Consequences", { contentDir: "ch06/22-writing-a-real-adr-context-options-decision-consequences" }),
      L(23, "diagramming-standards-so-architecture-docs-stay-usable", "Diagramming Standards So Architecture Docs Stay Usable", { contentDir: "ch06/23-diagramming-standards-so-architecture-docs-stay-usable" }),
      L(24, "keeping-architecture-documentation-from-going-stale", "Keeping Architecture Documentation from Going Stale", { contentDir: "ch06/24-keeping-architecture-documentation-from-going-stale" }),
    ],
  },
  {
    n: 7,
    title: "Presenting and Defending an Architecture",
    lessons: [
      L(25, "structuring-an-architecture-review-presentation", "Structuring an Architecture Review Presentation", { contentDir: "ch07/25-structuring-an-architecture-review-presentation" }),
      L(26, "anticipating-the-questions-a-review-board-will-ask", "Anticipating the Questions a Review Board Will Ask", { contentDir: "ch07/26-anticipating-the-questions-a-review-board-will-ask" }),
      L(27, "defending-a-tradeoff-you-made-on-purpose", "Defending a Tradeoff You Made on Purpose", { contentDir: "ch07/27-defending-a-tradeoff-you-made-on-purpose" }),
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
