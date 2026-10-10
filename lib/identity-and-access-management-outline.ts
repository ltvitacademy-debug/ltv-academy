// The Identity & Access Management course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Part of the Salesforce Technical Architect career path.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/identity-and-access-management/
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

export const SFTA_IDENTITY_AND_ACCESS_MANAGEMENT_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Identity Foundations",
    lessons: [
      L(1, "authentication-and-authorization", "Authentication and Authorization", { contentDir: "ch01/01-authentication-and-authorization" }),
      L(2, "identity-concepts-and-terminology", "Identity Concepts and Terminology", { contentDir: "ch01/02-identity-concepts-and-terminology" }),
      L(3, "single-sign-on", "Single Sign-On", { contentDir: "ch01/03-single-sign-on" }),
      L(4, "saml", "SAML", { contentDir: "ch01/04-saml" }),
      L(5, "oauth-flows", "OAuth Flows", { contentDir: "ch01/05-oauth-flows" }),
      L(6, "openid-connect", "OpenID Connect", { contentDir: "ch01/06-openid-connect" }),
      L(7, "connected-apps", "Connected Apps", { contentDir: "ch01/07-connected-apps" }),
    ],
  },
  {
    n: 2,
    title: "Enterprise Identity",
    lessons: [
      L(8, "identity-providers", "Identity Providers", { contentDir: "ch02/08-identity-providers" }),
      L(9, "salesforce-as-an-identity-provider", "Salesforce as an Identity Provider", { contentDir: "ch02/09-salesforce-as-an-identity-provider" }),
      L(10, "salesforce-as-a-service-provider", "Salesforce as a Service Provider", { contentDir: "ch02/10-salesforce-as-a-service-provider" }),
      L(11, "multi-factor-authentication", "Multi-Factor Authentication", { contentDir: "ch02/11-multi-factor-authentication" }),
      L(12, "just-in-time-provisioning-and-scim", "Just-in-Time Provisioning and SCIM", { contentDir: "ch02/12-just-in-time-provisioning-and-scim" }),
      L(13, "my-domain-and-login-experience", "My Domain and Login Experience", { contentDir: "ch02/13-my-domain-and-login-experience" }),
    ],
  },
  {
    n: 3,
    title: "Access at Scale",
    lessons: [
      L(14, "enterprise-identity-architecture", "Enterprise Identity Architecture", { contentDir: "ch03/14-enterprise-identity-architecture" }),
      L(15, "customer-and-partner-identity", "Customer and Partner Identity", { contentDir: "ch03/15-customer-and-partner-identity" }),
      L(16, "identity-for-communities-and-experience-cloud", "Identity for Communities and Experience Cloud", { contentDir: "ch03/16-identity-for-communities-and-experience-cloud" }),
      L(17, "federation-and-delegated-authentication", "Federation and Delegated Authentication", { contentDir: "ch03/17-federation-and-delegated-authentication" }),
      L(18, "session-management-and-token-handling", "Session Management and Token Handling", { contentDir: "ch03/18-session-management-and-token-handling" }),
      L(19, "named-credentials-and-identity", "Named Credentials and Identity", { contentDir: "ch03/19-named-credentials-and-identity" }),
    ],
  },
  {
    n: 4,
    title: "Review and Practice",
    lessons: [
      L(20, "identity-architecture-case-study-workforce", "Identity Architecture Case Study: Workforce", { contentDir: "ch04/20-identity-architecture-case-study-workforce" }),
      L(21, "identity-architecture-case-study-customer-portal", "Identity Architecture Case Study: Customer Portal", { contentDir: "ch04/21-identity-architecture-case-study-customer-portal" }),
      L(22, "identity-design-trade-offs", "Identity Design Trade-Offs", { contentDir: "ch04/22-identity-design-trade-offs" }),
      L(23, "exam-style-identity-scenarios", "Exam-Style Identity Scenarios", { contentDir: "ch04/23-exam-style-identity-scenarios" }),
      L(24, "identity-security-best-practices", "Identity Security Best Practices", { contentDir: "ch04/24-identity-security-best-practices" }),
    ],
  },
];
