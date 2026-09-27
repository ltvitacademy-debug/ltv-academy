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
      L(1, "authentication-and-authorization", "Authentication and Authorization"),
      L(2, "identity-concepts-and-terminology", "Identity Concepts and Terminology"),
      L(3, "single-sign-on", "Single Sign-On"),
      L(4, "saml", "SAML"),
      L(5, "oauth-flows", "OAuth Flows"),
      L(6, "openid-connect", "OpenID Connect"),
      L(7, "connected-apps", "Connected Apps"),
    ],
  },
  {
    n: 2,
    title: "Enterprise Identity",
    lessons: [
      L(8, "identity-providers", "Identity Providers"),
      L(9, "salesforce-as-an-identity-provider", "Salesforce as an Identity Provider"),
      L(10, "salesforce-as-a-service-provider", "Salesforce as a Service Provider"),
      L(11, "multi-factor-authentication", "Multi-Factor Authentication"),
      L(12, "just-in-time-provisioning-and-scim", "Just-in-Time Provisioning and SCIM"),
      L(13, "my-domain-and-login-experience", "My Domain and Login Experience"),
    ],
  },
  {
    n: 3,
    title: "Access at Scale",
    lessons: [
      L(14, "enterprise-identity-architecture", "Enterprise Identity Architecture"),
      L(15, "customer-and-partner-identity", "Customer and Partner Identity"),
      L(16, "identity-for-communities-and-experience-cloud", "Identity for Communities and Experience Cloud"),
      L(17, "federation-and-delegated-authentication", "Federation and Delegated Authentication"),
      L(18, "session-management-and-token-handling", "Session Management and Token Handling"),
      L(19, "named-credentials-and-identity", "Named Credentials and Identity"),
    ],
  },
  {
    n: 4,
    title: "Review and Practice",
    lessons: [
      L(20, "identity-architecture-case-study-workforce", "Identity Architecture Case Study: Workforce"),
      L(21, "identity-architecture-case-study-customer-portal", "Identity Architecture Case Study: Customer Portal"),
      L(22, "identity-design-trade-offs", "Identity Design Trade-Offs"),
      L(23, "exam-style-identity-scenarios", "Exam-Style Identity Scenarios"),
      L(24, "identity-security-best-practices", "Identity Security Best Practices"),
    ],
  },
];
