// The Integration Security course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Part of the Salesforce Technical Architect career path.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/integration-security/
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

export const SFTA_INTEGRATION_SECURITY_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Securing Integrations",
    lessons: [
      L(1, "integration-threat-model", "Integration Threat Model"),
      L(2, "oauth-for-integrations", "OAuth for Integrations"),
      L(3, "certificates-and-mutual-tls", "Certificates and Mutual TLS"),
      L(4, "named-credentials", "Named Credentials"),
      L(5, "api-security", "API Security"),
      L(6, "service-accounts-and-integration-users", "Service Accounts and Integration Users"),
    ],
  },
  {
    n: 2,
    title: "Operating Securely",
    lessons: [
      L(7, "secrets-management", "Secrets Management"),
      L(8, "ip-restrictions-and-network-controls", "IP Restrictions and Network Controls"),
      L(9, "logging-and-auditing-integrations", "Logging and Auditing Integrations"),
      L(10, "integration-security-review", "Integration Security Review"),
    ],
  },
  {
    n: 3,
    title: "Practice",
    lessons: [
      L(11, "integration-security-case-study", "Integration Security Case Study"),
      L(12, "exam-style-integration-security-scenarios", "Exam-Style Integration Security Scenarios"),
      L(13, "integration-security-checklist", "Integration Security Checklist"),
    ],
  },
];
