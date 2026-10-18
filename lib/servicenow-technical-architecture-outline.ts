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
      L(1, "the-technical-architect-role-vs-admin-and-developer", "The Technical Architect Role vs. Admin & Developer"),
      L(2, "the-cta-exam-a-realistic-view", "The CTA Exam: a Realistic View"),
      L(3, "architecture-decision-records-for-servicenow", "Architecture Decision Records for ServiceNow"),
    ],
  },
  {
    n: 2,
    title: "Platform Architecture",
    lessons: [
      L(4, "single-instance-vs-multi-instance-strategy", "Single-Instance vs. Multi-Instance Strategy"),
      L(5, "domain-separation", "Domain Separation"),
      L(6, "scoped-application-architecture-at-enterprise-scale", "Scoped Application Architecture at Enterprise Scale"),
      L(7, "platform-architecture-lab", "Platform Architecture Lab"),
    ],
  },
  {
    n: 3,
    title: "Data Architecture",
    lessons: [
      L(8, "table-design-for-scale", "Table Design for Scale"),
      L(9, "data-archiving-strategy", "Data Archiving Strategy"),
      L(10, "csdm-at-enterprise-scale", "CSDM at Enterprise Scale"),
      L(11, "data-architecture-lab", "Data Architecture Lab"),
    ],
  },
  {
    n: 4,
    title: "Integration Architecture",
    lessons: [
      L(12, "designing-an-enterprise-integration-strategy", "Designing an Enterprise Integration Strategy"),
      L(13, "event-driven-vs-request-response-integration-at-scale", "Event-Driven vs. Request-Response Integration at Scale"),
      L(14, "integration-architecture-lab", "Integration Architecture Lab"),
    ],
  },
  {
    n: 5,
    title: "Security Architecture",
    lessons: [
      L(15, "enterprise-security-architecture-decisions", "Enterprise Security Architecture Decisions"),
      L(16, "balancing-security-with-usability-at-scale", "Balancing Security With Usability at Scale"),
      L(17, "security-architecture-lab", "Security Architecture Lab"),
    ],
  },
  {
    n: 6,
    title: "Performance & Scalability Architecture",
    lessons: [
      L(18, "architecting-for-performance-at-scale", "Architecting for Performance at Scale"),
      L(19, "capacity-planning-for-a-growing-instance", "Capacity Planning for a Growing Instance"),
      L(20, "performance-architecture-lab", "Performance Architecture Lab"),
    ],
  },
  {
    n: 7,
    title: "Platform Lifecycle & Release Management",
    lessons: [
      L(21, "upgrade-planning", "Upgrade Planning"),
      L(22, "release-management-strategy", "Release Management Strategy"),
      L(23, "technical-debt-on-the-platform", "Technical Debt on the Platform"),
      L(24, "lifecycle-management-lab", "Lifecycle Management Lab"),
    ],
  },
  {
    n: 8,
    title: "Governance & Multi-Department Implementation Strategy",
    lessons: [
      L(25, "platform-governance-models", "Platform Governance Models"),
      L(26, "multi-department-implementation-strategy", "Multi-Department Implementation Strategy"),
      L(27, "implementation-leadership-stakeholder-alignment", "Implementation Leadership: Stakeholder Alignment"),
      L(28, "governance-lab", "Governance Lab"),
    ],
  },
  {
    n: 9,
    title: "Capstone: Enterprise Technical Architecture",
    lessons: [
      L(29, "capstone-kickoff-a-5-000-employee-organization", "Capstone Kickoff: a 5,000-Employee Organization"),
      L(30, "capstone-design-service-workflows-and-integrations", "Capstone: Design Service Workflows & Integrations"),
      L(31, "capstone-produce-architecture-diagrams-and-specs", "Capstone: Produce Architecture Diagrams & Specs"),
      L(32, "capstone-defend-the-architecture-decisions", "Capstone: Defend the Architecture Decisions"),
    ],
  },
];
