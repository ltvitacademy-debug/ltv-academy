// ServiceNow Security & Access Controls course outline. Lessons without a contentDir render as
// "in production". Course 10 of 14 in the ServiceNow Administrator → Developer → Technical
// Architect path: platform security in depth, beyond the administration course's intro-level ACLs.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/servicenow-security-access-controls/
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

export const SERVICENOW_SECURITY_ACCESS_CONTROLS_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "The Platform Security Model",
    lessons: [
      L(1, "defense-in-depth-on-the-now-platform", "Defense in Depth on the Now Platform", { contentDir: "ch01/01-defense-in-depth-on-the-now-platform" }),
      L(2, "roles-contains-roles-and-role-design", "Roles, Contains Roles & Role Design", { contentDir: "ch01/02-roles-contains-roles-and-role-design" }),
      L(3, "security-model-lab", "Security Model Lab", { contentDir: "ch01/03-security-model-lab" }),
    ],
  },
  {
    n: 2,
    title: "Advanced ACL Design",
    lessons: [
      L(4, "acl-evaluation-order-in-depth", "ACL Evaluation Order in Depth", { contentDir: "ch02/04-acl-evaluation-order-in-depth" }),
      L(5, "scripted-acl-conditions", "Scripted ACL Conditions", { contentDir: "ch02/05-scripted-acl-conditions" }),
      L(6, "field-level-security-design-patterns", "Field-Level Security Design Patterns", { contentDir: "ch02/06-field-level-security-design-patterns" }),
      L(7, "advanced-acl-lab", "Advanced ACL Lab", { contentDir: "ch02/07-advanced-acl-lab" }),
    ],
  },
  {
    n: 3,
    title: "Authentication & Single Sign-On",
    lessons: [
      L(8, "local-vs-sso-authentication", "Local vs. SSO Authentication", { contentDir: "ch03/08-local-vs-sso-authentication" }),
      L(9, "saml-based-sso-overview", "SAML-Based SSO: Overview", { contentDir: "ch03/09-saml-based-sso-overview" }),
      L(10, "multi-factor-authentication", "Multi-Factor Authentication", { contentDir: "ch03/10-multi-factor-authentication" }),
      L(11, "authentication-lab", "Authentication Lab", { contentDir: "ch03/11-authentication-lab" }),
    ],
  },
  {
    n: 4,
    title: "Data Protection & Encryption",
    lessons: [
      L(12, "edge-encryption-and-column-level-encryption-overview", "Edge Encryption & Column-Level Encryption: Overview", { contentDir: "ch04/12-edge-encryption-and-column-level-encryption-overview" }),
      L(13, "data-anonymization-and-masking", "Data Anonymization & Masking", { contentDir: "ch04/13-data-anonymization-and-masking" }),
      L(14, "attachment-and-export-controls", "Attachment & Export Controls", { contentDir: "ch04/14-attachment-and-export-controls" }),
    ],
  },
  {
    n: 5,
    title: "Security Operations on the Platform",
    lessons: [
      L(15, "security-incident-response-overview", "Security Incident Response: Overview", { contentDir: "ch05/15-security-incident-response-overview" }),
      L(16, "vulnerability-response-overview", "Vulnerability Response: Overview", { contentDir: "ch05/16-vulnerability-response-overview" }),
      L(17, "security-operations-lab", "Security Operations Lab", { contentDir: "ch05/17-security-operations-lab" }),
    ],
  },
  {
    n: 6,
    title: "Governance, Compliance & Audit",
    lessons: [
      L(18, "the-elevated-privilege-security-admin-role", "The Elevated-Privilege security_admin Role", { contentDir: "ch06/18-the-elevated-privilege-security-admin-role" }),
      L(19, "audit-logging-and-change-tracking", "Audit Logging & Change Tracking", { contentDir: "ch06/19-audit-logging-and-change-tracking" }),
      L(20, "compliance-frameworks-relevant-to-servicenow", "Compliance Frameworks Relevant to ServiceNow", { contentDir: "ch06/20-compliance-frameworks-relevant-to-servicenow" }),
      L(21, "governance-lab", "Governance Lab", { contentDir: "ch06/21-governance-lab" }),
    ],
  },
  {
    n: 7,
    title: "Capstone: Securing a Real Instance",
    lessons: [
      L(22, "capstone-kickoff-security-assessment", "Capstone Kickoff: Security Assessment", { contentDir: "ch07/22-capstone-kickoff-security-assessment" }),
      L(23, "capstone-design-roles-and-acls-for-a-real-org", "Capstone: Design Roles & ACLs for a Real Org", { contentDir: "ch07/23-capstone-design-roles-and-acls-for-a-real-org" }),
      L(24, "capstone-wrap-up-and-security-review-checklist", "Capstone Wrap-Up & Security Review Checklist", { contentDir: "ch07/24-capstone-wrap-up-and-security-review-checklist" }),
    ],
  },
];
