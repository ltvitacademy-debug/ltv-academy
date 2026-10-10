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
      L(1, "integration-threat-model", "Integration Threat Model", { contentDir: "ch01/01-integration-threat-model" }),
      L(2, "oauth-for-integrations", "OAuth for Integrations", { contentDir: "ch01/02-oauth-for-integrations" }),
      L(3, "certificates-and-mutual-tls", "Certificates and Mutual TLS", { contentDir: "ch01/03-certificates-and-mutual-tls" }),
      L(4, "named-credentials", "Named Credentials", { contentDir: "ch01/04-named-credentials" }),
      L(5, "api-security", "API Security", { contentDir: "ch01/05-api-security" }),
      L(6, "service-accounts-and-integration-users", "Service Accounts and Integration Users", { contentDir: "ch01/06-service-accounts-and-integration-users" }),
    ],
  },
  {
    n: 2,
    title: "Operating Securely",
    lessons: [
      L(7, "secrets-management", "Secrets Management", { contentDir: "ch02/07-secrets-management" }),
      L(8, "ip-restrictions-and-network-controls", "IP Restrictions and Network Controls", { contentDir: "ch02/08-ip-restrictions-and-network-controls" }),
      L(9, "logging-and-auditing-integrations", "Logging and Auditing Integrations", { contentDir: "ch02/09-logging-and-auditing-integrations" }),
      L(10, "integration-security-review", "Integration Security Review", { contentDir: "ch02/10-integration-security-review" }),
    ],
  },
  {
    n: 3,
    title: "Practice",
    lessons: [
      L(11, "integration-security-case-study", "Integration Security Case Study", { contentDir: "ch03/11-integration-security-case-study" }),
      L(12, "exam-style-integration-security-scenarios", "Exam-Style Integration Security Scenarios", { contentDir: "ch03/12-exam-style-integration-security-scenarios" }),
      L(13, "integration-security-checklist", "Integration Security Checklist", { contentDir: "ch03/13-integration-security-checklist" }),
    ],
  },
];
