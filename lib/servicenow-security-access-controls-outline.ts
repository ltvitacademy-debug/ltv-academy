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
      L(1, "defense-in-depth-on-the-now-platform", "Defense in Depth on the Now Platform", { contentDir: "ch01/01-defense-in-depth-on-the-now-platform", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792723421/ltv-servicenow-security-access-controls/defense-in-depth-on-the-now-platform.mp4", durationLabel: "2 min 45 s" }),
      L(2, "roles-contains-roles-and-role-design", "Roles, Contains Roles & Role Design", { contentDir: "ch01/02-roles-contains-roles-and-role-design", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792723488/ltv-servicenow-security-access-controls/roles-contains-roles-and-role-design.mp4", durationLabel: "2 min 24 s" }),
      L(3, "security-model-lab", "Security Model Lab", { contentDir: "ch01/03-security-model-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792723554/ltv-servicenow-security-access-controls/security-model-lab.mp4", durationLabel: "2 min 23 s" }),
    ],
  },
  {
    n: 2,
    title: "Advanced ACL Design",
    lessons: [
      L(4, "acl-evaluation-order-in-depth", "ACL Evaluation Order in Depth", { contentDir: "ch02/04-acl-evaluation-order-in-depth", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792723622/ltv-servicenow-security-access-controls/acl-evaluation-order-in-depth.mp4", durationLabel: "2 min 22 s" }),
      L(5, "scripted-acl-conditions", "Scripted ACL Conditions", { contentDir: "ch02/05-scripted-acl-conditions", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792723688/ltv-servicenow-security-access-controls/scripted-acl-conditions.mp4", durationLabel: "2 min 18 s" }),
      L(6, "field-level-security-design-patterns", "Field-Level Security Design Patterns", { contentDir: "ch02/06-field-level-security-design-patterns", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792723753/ltv-servicenow-security-access-controls/field-level-security-design-patterns.mp4", durationLabel: "2 min 19 s" }),
      L(7, "advanced-acl-lab", "Advanced ACL Lab", { contentDir: "ch02/07-advanced-acl-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792723827/ltv-servicenow-security-access-controls/advanced-acl-lab.mp4", durationLabel: "2 min 37 s" }),
    ],
  },
  {
    n: 3,
    title: "Authentication & Single Sign-On",
    lessons: [
      L(8, "local-vs-sso-authentication", "Local vs. SSO Authentication", { contentDir: "ch03/08-local-vs-sso-authentication", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792723915/ltv-servicenow-security-access-controls/local-vs-sso-authentication.mp4", durationLabel: "3 min 22 s" }),
      L(9, "saml-based-sso-overview", "SAML-Based SSO: Overview", { contentDir: "ch03/09-saml-based-sso-overview", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792723994/ltv-servicenow-security-access-controls/saml-based-sso-overview.mp4", durationLabel: "3 min 8 s" }),
      L(10, "multi-factor-authentication", "Multi-Factor Authentication", { contentDir: "ch03/10-multi-factor-authentication", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792724076/ltv-servicenow-security-access-controls/multi-factor-authentication.mp4", durationLabel: "3 min 14 s" }),
      L(11, "authentication-lab", "Authentication Lab", { contentDir: "ch03/11-authentication-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792724166/ltv-servicenow-security-access-controls/authentication-lab.mp4", durationLabel: "3 min 32 s" }),
    ],
  },
  {
    n: 4,
    title: "Data Protection & Encryption",
    lessons: [
      L(12, "edge-encryption-and-column-level-encryption-overview", "Edge Encryption & Column-Level Encryption: Overview", { contentDir: "ch04/12-edge-encryption-and-column-level-encryption-overview", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792724228/ltv-servicenow-security-access-controls/edge-encryption-and-column-level-encryption-overview.mp4", durationLabel: "2 min 20 s" }),
      L(13, "data-anonymization-and-masking", "Data Anonymization & Masking", { contentDir: "ch04/13-data-anonymization-and-masking", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792724290/ltv-servicenow-security-access-controls/data-anonymization-and-masking.mp4", durationLabel: "2 min 19 s" }),
      L(14, "attachment-and-export-controls", "Attachment & Export Controls", { contentDir: "ch04/14-attachment-and-export-controls", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792724349/ltv-servicenow-security-access-controls/attachment-and-export-controls.mp4", durationLabel: "2 min 14 s" }),
    ],
  },
  {
    n: 5,
    title: "Security Operations on the Platform",
    lessons: [
      L(15, "security-incident-response-overview", "Security Incident Response: Overview", { contentDir: "ch05/15-security-incident-response-overview", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792724424/ltv-servicenow-security-access-controls/security-incident-response-overview.mp4", durationLabel: "2 min 56 s" }),
      L(16, "vulnerability-response-overview", "Vulnerability Response: Overview", { contentDir: "ch05/16-vulnerability-response-overview", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792724501/ltv-servicenow-security-access-controls/vulnerability-response-overview.mp4", durationLabel: "2 min 56 s" }),
      L(17, "security-operations-lab", "Security Operations Lab", { contentDir: "ch05/17-security-operations-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792724570/ltv-servicenow-security-access-controls/security-operations-lab.mp4", durationLabel: "2 min 39 s" }),
    ],
  },
  {
    n: 6,
    title: "Governance, Compliance & Audit",
    lessons: [
      L(18, "the-elevated-privilege-security-admin-role", "The Elevated-Privilege security_admin Role", { contentDir: "ch06/18-the-elevated-privilege-security-admin-role", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792724638/ltv-servicenow-security-access-controls/the-elevated-privilege-security-admin-role.mp4", durationLabel: "2 min 34 s" }),
      L(19, "audit-logging-and-change-tracking", "Audit Logging & Change Tracking", { contentDir: "ch06/19-audit-logging-and-change-tracking", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792724702/ltv-servicenow-security-access-controls/audit-logging-and-change-tracking.mp4", durationLabel: "2 min 24 s" }),
      L(20, "compliance-frameworks-relevant-to-servicenow", "Compliance Frameworks Relevant to ServiceNow", { contentDir: "ch06/20-compliance-frameworks-relevant-to-servicenow", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792724771/ltv-servicenow-security-access-controls/compliance-frameworks-relevant-to-servicenow.mp4", durationLabel: "2 min 38 s" }),
      L(21, "governance-lab", "Governance Lab", { contentDir: "ch06/21-governance-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792724841/ltv-servicenow-security-access-controls/governance-lab.mp4", durationLabel: "2 min 40 s" }),
    ],
  },
  {
    n: 7,
    title: "Capstone: Securing a Real Instance",
    lessons: [
      L(22, "capstone-kickoff-security-assessment", "Capstone Kickoff: Security Assessment", { contentDir: "ch07/22-capstone-kickoff-security-assessment", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792724915/ltv-servicenow-security-access-controls/capstone-kickoff-security-assessment.mp4", durationLabel: "2 min 54 s" }),
      L(23, "capstone-design-roles-and-acls-for-a-real-org", "Capstone: Design Roles & ACLs for a Real Org", { contentDir: "ch07/23-capstone-design-roles-and-acls-for-a-real-org", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792725015/ltv-servicenow-security-access-controls/capstone-design-roles-and-acls-for-a-real-org.mp4", durationLabel: "2 min 42 s" }),
      L(24, "capstone-wrap-up-and-security-review-checklist", "Capstone Wrap-Up & Security Review Checklist", { contentDir: "ch07/24-capstone-wrap-up-and-security-review-checklist", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792725091/ltv-servicenow-security-access-controls/capstone-wrap-up-and-security-review-checklist.mp4", durationLabel: "2 min 51 s" }),
    ],
  },
];
