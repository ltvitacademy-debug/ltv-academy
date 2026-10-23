// ServiceNow Technical Architecture course outline. Lessons without a contentDir render as
// "in production". Course 13 of 14 in the ServiceNow Administrator → Developer → Technical
// Architect path: enterprise architecture decisions, aligned with the CTA's real scope of judgment.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/servicenow-technical-architecture/
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

export const SERVICENOW_TECHNICAL_ARCHITECTURE_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "What a Technical Architect Actually Does",
    lessons: [
      L(1, "the-technical-architect-role-vs-admin-and-developer", "The Technical Architect Role vs. Admin & Developer", { contentDir: "ch01/01-the-technical-architect-role-vs-admin-and-developer", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792730884/ltv-servicenow-technical-architecture/the-technical-architect-role-vs-admin-and-developer.mp4", durationLabel: "2 min 18 s" }),
      L(2, "the-cta-exam-a-realistic-view", "The CTA Exam: a Realistic View", { contentDir: "ch01/02-the-cta-exam-a-realistic-view", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792730950/ltv-servicenow-technical-architecture/the-cta-exam-a-realistic-view.mp4", durationLabel: "2 min 31 s" }),
      L(3, "architecture-decision-records-for-servicenow", "Architecture Decision Records for ServiceNow", { contentDir: "ch01/03-architecture-decision-records-for-servicenow", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792731017/ltv-servicenow-technical-architecture/architecture-decision-records-for-servicenow.mp4", durationLabel: "2 min 34 s" }),
    ],
  },
  {
    n: 2,
    title: "Platform Architecture",
    lessons: [
      L(4, "single-instance-vs-multi-instance-strategy", "Single-Instance vs. Multi-Instance Strategy", { contentDir: "ch02/04-single-instance-vs-multi-instance-strategy", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792731085/ltv-servicenow-technical-architecture/single-instance-vs-multi-instance-strategy.mp4", durationLabel: "2 min 32 s" }),
      L(5, "domain-separation", "Domain Separation", { contentDir: "ch02/05-domain-separation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792731148/ltv-servicenow-technical-architecture/domain-separation.mp4", durationLabel: "2 min 26 s" }),
      L(6, "scoped-application-architecture-at-enterprise-scale", "Scoped Application Architecture at Enterprise Scale", { contentDir: "ch02/06-scoped-application-architecture-at-enterprise-scale", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792731204/ltv-servicenow-technical-architecture/scoped-application-architecture-at-enterprise-scale.mp4", durationLabel: "2 min 7 s" }),
      L(7, "platform-architecture-lab", "Platform Architecture Lab", { contentDir: "ch02/07-platform-architecture-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792731269/ltv-servicenow-technical-architecture/platform-architecture-lab.mp4", durationLabel: "2 min 29 s" }),
    ],
  },
  {
    n: 3,
    title: "Data Architecture",
    lessons: [
      L(8, "table-design-for-scale", "Table Design for Scale", { contentDir: "ch03/08-table-design-for-scale", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792731330/ltv-servicenow-technical-architecture/table-design-for-scale.mp4", durationLabel: "2 min 20 s" }),
      L(9, "data-archiving-strategy", "Data Archiving Strategy", { contentDir: "ch03/09-data-archiving-strategy", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792731388/ltv-servicenow-technical-architecture/data-archiving-strategy.mp4", durationLabel: "2 min 15 s" }),
      L(10, "csdm-at-enterprise-scale", "CSDM at Enterprise Scale", { contentDir: "ch03/10-csdm-at-enterprise-scale", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792731445/ltv-servicenow-technical-architecture/csdm-at-enterprise-scale.mp4", durationLabel: "2 min 13 s" }),
      L(11, "data-architecture-lab", "Data Architecture Lab", { contentDir: "ch03/11-data-architecture-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792731513/ltv-servicenow-technical-architecture/data-architecture-lab.mp4", durationLabel: "2 min 40 s" }),
    ],
  },
  {
    n: 4,
    title: "Integration Architecture",
    lessons: [
      L(12, "designing-an-enterprise-integration-strategy", "Designing an Enterprise Integration Strategy", { contentDir: "ch04/12-designing-an-enterprise-integration-strategy", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792731573/ltv-servicenow-technical-architecture/designing-an-enterprise-integration-strategy.mp4", durationLabel: "2 min 20 s" }),
      L(13, "event-driven-vs-request-response-integration-at-scale", "Event-Driven vs. Request-Response Integration at Scale", { contentDir: "ch04/13-event-driven-vs-request-response-integration-at-scale", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792731626/ltv-servicenow-technical-architecture/event-driven-vs-request-response-integration-at-scale.mp4", durationLabel: "2 min 3 s" }),
      L(14, "integration-architecture-lab", "Integration Architecture Lab", { contentDir: "ch04/14-integration-architecture-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792731690/ltv-servicenow-technical-architecture/integration-architecture-lab.mp4", durationLabel: "2 min 29 s" }),
    ],
  },
  {
    n: 5,
    title: "Security Architecture",
    lessons: [
      L(15, "enterprise-security-architecture-decisions", "Enterprise Security Architecture Decisions", { contentDir: "ch05/15-enterprise-security-architecture-decisions", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792731764/ltv-servicenow-technical-architecture/enterprise-security-architecture-decisions.mp4", durationLabel: "2 min 46 s" }),
      L(16, "balancing-security-with-usability-at-scale", "Balancing Security With Usability at Scale", { contentDir: "ch05/16-balancing-security-with-usability-at-scale", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792731837/ltv-servicenow-technical-architecture/balancing-security-with-usability-at-scale.mp4", durationLabel: "2 min 51 s" }),
      L(17, "security-architecture-lab", "Security Architecture Lab", { contentDir: "ch05/17-security-architecture-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792731901/ltv-servicenow-technical-architecture/security-architecture-lab.mp4", durationLabel: "2 min 29 s" }),
    ],
  },
  {
    n: 6,
    title: "Performance & Scalability Architecture",
    lessons: [
      L(18, "architecting-for-performance-at-scale", "Architecting for Performance at Scale", { contentDir: "ch06/18-architecting-for-performance-at-scale", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792731967/ltv-servicenow-technical-architecture/architecting-for-performance-at-scale.mp4", durationLabel: "2 min 34 s" }),
      L(19, "capacity-planning-for-a-growing-instance", "Capacity Planning for a Growing Instance", { contentDir: "ch06/19-capacity-planning-for-a-growing-instance", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792732029/ltv-servicenow-technical-architecture/capacity-planning-for-a-growing-instance.mp4", durationLabel: "2 min 20 s" }),
      L(20, "performance-architecture-lab", "Performance Architecture Lab", { contentDir: "ch06/20-performance-architecture-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792732088/ltv-servicenow-technical-architecture/performance-architecture-lab.mp4", durationLabel: "2 min 16 s" }),
    ],
  },
  {
    n: 7,
    title: "Platform Lifecycle & Release Management",
    lessons: [
      L(21, "upgrade-planning", "Upgrade Planning", { contentDir: "ch07/21-upgrade-planning", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792732160/ltv-servicenow-technical-architecture/upgrade-planning.mp4", durationLabel: "2 min 50 s" }),
      L(22, "release-management-strategy", "Release Management Strategy", { contentDir: "ch07/22-release-management-strategy", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792732232/ltv-servicenow-technical-architecture/release-management-strategy.mp4", durationLabel: "2 min 50 s" }),
      L(23, "technical-debt-on-the-platform", "Technical Debt on the Platform", { contentDir: "ch07/23-technical-debt-on-the-platform", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792732302/ltv-servicenow-technical-architecture/technical-debt-on-the-platform.mp4", durationLabel: "2 min 43 s" }),
      L(24, "lifecycle-management-lab", "Lifecycle Management Lab", { contentDir: "ch07/24-lifecycle-management-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792732382/ltv-servicenow-technical-architecture/lifecycle-management-lab.mp4", durationLabel: "3 min 11 s" }),
    ],
  },
  {
    n: 8,
    title: "Governance & Multi-Department Implementation Strategy",
    lessons: [
      L(25, "platform-governance-models", "Platform Governance Models", { contentDir: "ch08/25-platform-governance-models", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792732447/ltv-servicenow-technical-architecture/platform-governance-models.mp4", durationLabel: "2 min 35 s" }),
      L(26, "multi-department-implementation-strategy", "Multi-Department Implementation Strategy", { contentDir: "ch08/26-multi-department-implementation-strategy", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792732504/ltv-servicenow-technical-architecture/multi-department-implementation-strategy.mp4", durationLabel: "2 min 14 s" }),
      L(27, "implementation-leadership-stakeholder-alignment", "Implementation Leadership: Stakeholder Alignment", { contentDir: "ch08/27-implementation-leadership-stakeholder-alignment", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792732563/ltv-servicenow-technical-architecture/implementation-leadership-stakeholder-alignment.mp4", durationLabel: "2 min 19 s" }),
      L(28, "governance-lab", "Governance Lab", { contentDir: "ch08/28-governance-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792732630/ltv-servicenow-technical-architecture/governance-lab.mp4", durationLabel: "2 min 34 s" }),
    ],
  },
  {
    n: 9,
    title: "Capstone: Enterprise Technical Architecture",
    lessons: [
      L(29, "capstone-kickoff-a-5-000-employee-organization", "Capstone Kickoff: a 5,000-Employee Organization", { contentDir: "ch09/29-capstone-kickoff-a-5-000-employee-organization", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792732704/ltv-servicenow-technical-architecture/capstone-kickoff-a-5-000-employee-organization.mp4", durationLabel: "2 min 54 s" }),
      L(30, "capstone-design-service-workflows-and-integrations", "Capstone: Design Service Workflows & Integrations", { contentDir: "ch09/30-capstone-design-service-workflows-and-integrations", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792732776/ltv-servicenow-technical-architecture/capstone-design-service-workflows-and-integrations.mp4", durationLabel: "2 min 49 s" }),
      L(31, "capstone-produce-architecture-diagrams-and-specs", "Capstone: Produce Architecture Diagrams & Specs", { contentDir: "ch09/31-capstone-produce-architecture-diagrams-and-specs", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792732844/ltv-servicenow-technical-architecture/capstone-produce-architecture-diagrams-and-specs.mp4", durationLabel: "2 min 40 s" }),
      L(32, "capstone-defend-the-architecture-decisions", "Capstone: Defend the Architecture Decisions", { contentDir: "ch09/32-capstone-defend-the-architecture-decisions", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792732907/ltv-servicenow-technical-architecture/capstone-defend-the-architecture-decisions.mp4", durationLabel: "2 min 25 s" }),
    ],
  },
];
