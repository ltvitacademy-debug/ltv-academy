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
      L(1, "security-boundaries", "Security Boundaries", { contentDir: "ch01/01-security-boundaries" }),
      L(2, "least-privilege", "Least Privilege", { contentDir: "ch01/02-least-privilege" }),
      L(3, "defense-in-depth", "Defense in Depth", { contentDir: "ch01/03-defense-in-depth" }),
      L(4, "auditing-and-monitoring", "Auditing and Monitoring", { contentDir: "ch01/04-auditing-and-monitoring" }),
      L(5, "threat-considerations", "Threat Considerations", { contentDir: "ch01/05-threat-considerations" }),
      L(6, "encryption-and-monitoring-concepts", "Encryption and Monitoring Concepts", { contentDir: "ch01/06-encryption-and-monitoring-concepts" }),
    ],
  },
  {
    n: 2,
    title: "Applying Security Architecture",
    lessons: [
      L(7, "data-protection-platform-encryption-overview", "Data Protection: Platform Encryption Overview", { contentDir: "ch02/07-data-protection-platform-encryption-overview" }),
      L(8, "event-monitoring-overview", "Event Monitoring Overview", { contentDir: "ch02/08-event-monitoring-overview" }),
      L(9, "secure-development-practices", "Secure Development Practices", { contentDir: "ch02/09-secure-development-practices" }),
      L(10, "third-party-and-integration-security", "Third-Party and Integration Security", { contentDir: "ch02/10-third-party-and-integration-security" }),
      L(11, "security-architecture-review", "Security Architecture Review", { contentDir: "ch02/11-security-architecture-review" }),
      L(12, "security-case-study", "Security Case Study", { contentDir: "ch02/12-security-case-study" }),
    ],
  },
  {
    n: 3,
    title: "Security Governance",
    lessons: [
      L(13, "security-documentation-and-evidence", "Security Documentation and Evidence", { contentDir: "ch03/13-security-documentation-and-evidence" }),
      L(14, "incident-response-concepts", "Incident Response Concepts", { contentDir: "ch03/14-incident-response-concepts" }),
      L(15, "security-design-practice", "Security Design Practice", { contentDir: "ch03/15-security-design-practice" }),
    ],
  },
];
