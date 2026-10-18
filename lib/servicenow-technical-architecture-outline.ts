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
      L(1, "the-technical-architect-role-vs-admin-and-developer", "The Technical Architect Role vs. Admin & Developer", { contentDir: "ch01/01-the-technical-architect-role-vs-admin-and-developer" }),
      L(2, "the-cta-exam-a-realistic-view", "The CTA Exam: a Realistic View", { contentDir: "ch01/02-the-cta-exam-a-realistic-view" }),
      L(3, "architecture-decision-records-for-servicenow", "Architecture Decision Records for ServiceNow", { contentDir: "ch01/03-architecture-decision-records-for-servicenow" }),
    ],
  },
  {
    n: 2,
    title: "Platform Architecture",
    lessons: [
      L(4, "single-instance-vs-multi-instance-strategy", "Single-Instance vs. Multi-Instance Strategy", { contentDir: "ch02/04-single-instance-vs-multi-instance-strategy" }),
      L(5, "domain-separation", "Domain Separation", { contentDir: "ch02/05-domain-separation" }),
      L(6, "scoped-application-architecture-at-enterprise-scale", "Scoped Application Architecture at Enterprise Scale", { contentDir: "ch02/06-scoped-application-architecture-at-enterprise-scale" }),
      L(7, "platform-architecture-lab", "Platform Architecture Lab", { contentDir: "ch02/07-platform-architecture-lab" }),
    ],
  },
  {
    n: 3,
    title: "Data Architecture",
    lessons: [
      L(8, "table-design-for-scale", "Table Design for Scale", { contentDir: "ch03/08-table-design-for-scale" }),
      L(9, "data-archiving-strategy", "Data Archiving Strategy", { contentDir: "ch03/09-data-archiving-strategy" }),
      L(10, "csdm-at-enterprise-scale", "CSDM at Enterprise Scale", { contentDir: "ch03/10-csdm-at-enterprise-scale" }),
      L(11, "data-architecture-lab", "Data Architecture Lab", { contentDir: "ch03/11-data-architecture-lab" }),
    ],
  },
  {
    n: 4,
    title: "Integration Architecture",
    lessons: [
      L(12, "designing-an-enterprise-integration-strategy", "Designing an Enterprise Integration Strategy", { contentDir: "ch04/12-designing-an-enterprise-integration-strategy" }),
      L(13, "event-driven-vs-request-response-integration-at-scale", "Event-Driven vs. Request-Response Integration at Scale", { contentDir: "ch04/13-event-driven-vs-request-response-integration-at-scale" }),
      L(14, "integration-architecture-lab", "Integration Architecture Lab", { contentDir: "ch04/14-integration-architecture-lab" }),
    ],
  },
  {
    n: 5,
    title: "Security Architecture",
    lessons: [
      L(15, "enterprise-security-architecture-decisions", "Enterprise Security Architecture Decisions", { contentDir: "ch05/15-enterprise-security-architecture-decisions" }),
      L(16, "balancing-security-with-usability-at-scale", "Balancing Security With Usability at Scale", { contentDir: "ch05/16-balancing-security-with-usability-at-scale" }),
      L(17, "security-architecture-lab", "Security Architecture Lab", { contentDir: "ch05/17-security-architecture-lab" }),
    ],
  },
  {
    n: 6,
    title: "Performance & Scalability Architecture",
    lessons: [
      L(18, "architecting-for-performance-at-scale", "Architecting for Performance at Scale", { contentDir: "ch06/18-architecting-for-performance-at-scale" }),
      L(19, "capacity-planning-for-a-growing-instance", "Capacity Planning for a Growing Instance", { contentDir: "ch06/19-capacity-planning-for-a-growing-instance" }),
      L(20, "performance-architecture-lab", "Performance Architecture Lab", { contentDir: "ch06/20-performance-architecture-lab" }),
    ],
  },
  {
    n: 7,
    title: "Platform Lifecycle & Release Management",
    lessons: [
      L(21, "upgrade-planning", "Upgrade Planning", { contentDir: "ch07/21-upgrade-planning" }),
      L(22, "release-management-strategy", "Release Management Strategy", { contentDir: "ch07/22-release-management-strategy" }),
      L(23, "technical-debt-on-the-platform", "Technical Debt on the Platform", { contentDir: "ch07/23-technical-debt-on-the-platform" }),
      L(24, "lifecycle-management-lab", "Lifecycle Management Lab", { contentDir: "ch07/24-lifecycle-management-lab" }),
    ],
  },
  {
    n: 8,
    title: "Governance & Multi-Department Implementation Strategy",
    lessons: [
      L(25, "platform-governance-models", "Platform Governance Models", { contentDir: "ch08/25-platform-governance-models" }),
      L(26, "multi-department-implementation-strategy", "Multi-Department Implementation Strategy", { contentDir: "ch08/26-multi-department-implementation-strategy" }),
      L(27, "implementation-leadership-stakeholder-alignment", "Implementation Leadership: Stakeholder Alignment", { contentDir: "ch08/27-implementation-leadership-stakeholder-alignment" }),
      L(28, "governance-lab", "Governance Lab", { contentDir: "ch08/28-governance-lab" }),
    ],
  },
  {
    n: 9,
    title: "Capstone: Enterprise Technical Architecture",
    lessons: [
      L(29, "capstone-kickoff-a-5-000-employee-organization", "Capstone Kickoff: a 5,000-Employee Organization", { contentDir: "ch09/29-capstone-kickoff-a-5-000-employee-organization" }),
      L(30, "capstone-design-service-workflows-and-integrations", "Capstone: Design Service Workflows & Integrations", { contentDir: "ch09/30-capstone-design-service-workflows-and-integrations" }),
      L(31, "capstone-produce-architecture-diagrams-and-specs", "Capstone: Produce Architecture Diagrams & Specs", { contentDir: "ch09/31-capstone-produce-architecture-diagrams-and-specs" }),
      L(32, "capstone-defend-the-architecture-decisions", "Capstone: Defend the Architecture Decisions", { contentDir: "ch09/32-capstone-defend-the-architecture-decisions" }),
    ],
  },
];
