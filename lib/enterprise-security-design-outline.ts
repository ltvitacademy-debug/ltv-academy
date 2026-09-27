// The Enterprise Security Design course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Part of the Salesforce Technical Architect career path.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/enterprise-security-design/
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

export const SFTA_ENTERPRISE_SECURITY_DESIGN_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Designing Security",
    lessons: [
      L(1, "security-boundaries", "Security Boundaries"),
      L(2, "least-privilege", "Least Privilege"),
      L(3, "defense-in-depth", "Defense in Depth"),
      L(4, "auditing-and-monitoring", "Auditing and Monitoring"),
      L(5, "threat-considerations", "Threat Considerations"),
      L(6, "encryption-and-monitoring-concepts", "Encryption and Monitoring Concepts"),
    ],
  },
  {
    n: 2,
    title: "Applying Security Architecture",
    lessons: [
      L(7, "data-protection-platform-encryption-overview", "Data Protection: Platform Encryption Overview"),
      L(8, "event-monitoring-overview", "Event Monitoring Overview"),
      L(9, "secure-development-practices", "Secure Development Practices"),
      L(10, "third-party-and-integration-security", "Third-Party and Integration Security"),
      L(11, "security-architecture-review", "Security Architecture Review"),
      L(12, "security-case-study", "Security Case Study"),
    ],
  },
  {
    n: 3,
    title: "Security Governance",
    lessons: [
      L(13, "security-documentation-and-evidence", "Security Documentation and Evidence"),
      L(14, "incident-response-concepts", "Incident Response Concepts"),
      L(15, "security-design-practice", "Security Design Practice"),
    ],
  },
];
