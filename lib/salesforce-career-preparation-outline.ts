// The Salesforce Career Preparation course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Part of the Salesforce Technical Architect career path.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/salesforce-career-preparation/
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

export const SFTA_SALESFORCE_CAREER_PREPARATION_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Building Your Presence",
    lessons: [
      L(1, "salesforce-career-paths-and-roles", "Salesforce Career Paths and Roles", { contentDir: "ch01/01-salesforce-career-paths-and-roles" }),
      L(2, "salesforce-resumes", "Salesforce Resumes", { contentDir: "ch01/02-salesforce-resumes" }),
      L(3, "your-trailhead-profile", "Your Trailhead Profile", { contentDir: "ch01/03-your-trailhead-profile" }),
      L(4, "portfolio-development", "Portfolio Development", { contentDir: "ch01/04-portfolio-development" }),
      L(5, "github-for-salesforce-developers", "GitHub for Salesforce Developers", { contentDir: "ch01/05-github-for-salesforce-developers" }),
      L(6, "networking-and-the-trailblazer-community", "Networking and the Trailblazer Community", { contentDir: "ch01/06-networking-and-the-trailblazer-community" }),
    ],
  },
  {
    n: 2,
    title: "Certifications",
    lessons: [
      L(7, "certification-strategy", "Certification Strategy", { contentDir: "ch02/07-certification-strategy" }),
      L(8, "study-plans-for-administrator-and-app-builder", "Study Plans for Administrator and App Builder", { contentDir: "ch02/08-study-plans-for-administrator-and-app-builder" }),
      L(9, "study-plans-for-developer-and-architect-credentials", "Study Plans for Developer and Architect Credentials", { contentDir: "ch02/09-study-plans-for-developer-and-architect-credentials" }),
      L(10, "verifying-current-certification-requirements", "Verifying Current Certification Requirements", { contentDir: "ch02/10-verifying-current-certification-requirements" }),
    ],
  },
  {
    n: 3,
    title: "Interviews",
    lessons: [
      L(11, "administrator-interviews", "Administrator Interviews"),
      L(12, "developer-interviews", "Developer Interviews"),
      L(13, "consultant-interviews", "Consultant Interviews"),
      L(14, "architect-scenario-interviews", "Architect Scenario Interviews"),
      L(15, "architecture-whiteboarding", "Architecture Whiteboarding"),
    ],
  },
  {
    n: 4,
    title: "Presenting Your Work",
    lessons: [
      L(16, "presenting-your-capstones", "Presenting Your Capstones"),
      L(17, "explaining-architecture-decisions", "Explaining Architecture Decisions"),
      L(18, "your-first-90-days-in-a-salesforce-role", "Your First 90 Days in a Salesforce Role"),
      L(19, "long-term-path-toward-cta", "Long-Term Path Toward CTA"),
    ],
  },
];
