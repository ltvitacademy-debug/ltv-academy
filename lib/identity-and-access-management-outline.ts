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
      L(2, "single-sign-on", "Single Sign-On"),
      L(3, "saml", "SAML"),
      L(4, "oauth-flows", "OAuth Flows"),
      L(5, "connected-apps", "Connected Apps"),
    ],
  },
  {
    n: 2,
    title: "Enterprise Identity",
    lessons: [
      L(6, "identity-providers", "Identity Providers"),
      L(7, "multi-factor-authentication", "Multi-Factor Authentication"),
      L(8, "my-domain-and-login-experience", "My Domain and Login Experience"),
      L(9, "enterprise-identity-architecture", "Enterprise Identity Architecture"),
      L(10, "identity-architecture-case-study", "Identity Architecture Case Study"),
    ],
  },
];
