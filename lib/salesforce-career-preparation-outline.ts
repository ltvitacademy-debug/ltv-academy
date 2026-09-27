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
    title: "Career Preparation",
    lessons: [
      L(1, "salesforce-resumes-and-your-trailhead-profile", "Salesforce Resumes and Your Trailhead Profile"),
      L(2, "portfolio-development-and-github", "Portfolio Development and GitHub"),
      L(3, "certification-strategy", "Certification Strategy"),
      L(4, "administrator-and-developer-interviews", "Administrator and Developer Interviews"),
      L(5, "consultant-interviews", "Consultant Interviews"),
      L(6, "architect-scenario-interviews-and-whiteboarding", "Architect Scenario Interviews and Whiteboarding"),
      L(7, "presenting-your-capstones", "Presenting Your Capstones"),
      L(8, "explaining-architecture-decisions", "Explaining Architecture Decisions"),
    ],
  },
];
