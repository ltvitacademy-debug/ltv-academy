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
      L(1, "salesforce-career-paths-and-roles", "Salesforce Career Paths and Roles", { contentDir: "ch01/01-salesforce-career-paths-and-roles", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792600038/ltv-salesforce-career-preparation/salesforce-career-paths-and-roles.mp4", durationLabel: "1 min 10 s" }),
      L(2, "salesforce-resumes", "Salesforce Resumes", { contentDir: "ch01/02-salesforce-resumes", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792600341/ltv-salesforce-career-preparation/salesforce-resumes.mp4", durationLabel: "1 min 15 s" }),
      L(3, "your-trailhead-profile", "Your Trailhead Profile", { contentDir: "ch01/03-your-trailhead-profile", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792600715/ltv-salesforce-career-preparation/your-trailhead-profile.mp4", durationLabel: "1 min 12 s" }),
      L(4, "portfolio-development", "Portfolio Development", { contentDir: "ch01/04-portfolio-development", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792600989/ltv-salesforce-career-preparation/portfolio-development.mp4", durationLabel: "1 min 8 s" }),
      L(5, "github-for-salesforce-developers", "GitHub for Salesforce Developers", { contentDir: "ch01/05-github-for-salesforce-developers", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792601316/ltv-salesforce-career-preparation/github-for-salesforce-developers.mp4", durationLabel: "1 min 23 s" }),
      L(6, "networking-and-the-trailblazer-community", "Networking and the Trailblazer Community", { contentDir: "ch01/06-networking-and-the-trailblazer-community", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792601639/ltv-salesforce-career-preparation/networking-and-the-trailblazer-community.mp4", durationLabel: "1 min 9 s" }),
    ],
  },
  {
    n: 2,
    title: "Certifications",
    lessons: [
      L(7, "certification-strategy", "Certification Strategy", { contentDir: "ch02/07-certification-strategy", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792601886/ltv-salesforce-career-preparation/certification-strategy.mp4", durationLabel: "1 min 8 s" }),
      L(8, "study-plans-for-administrator-and-app-builder", "Study Plans for Administrator and App Builder", { contentDir: "ch02/08-study-plans-for-administrator-and-app-builder", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792602201/ltv-salesforce-career-preparation/study-plans-for-administrator-and-app-builder.mp4", durationLabel: "1 min 9 s" }),
      L(9, "study-plans-for-developer-and-architect-credentials", "Study Plans for Developer and Architect Credentials", { contentDir: "ch02/09-study-plans-for-developer-and-architect-credentials", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792602500/ltv-salesforce-career-preparation/study-plans-for-developer-and-architect-credentials.mp4", durationLabel: "1 min 17 s" }),
      L(10, "verifying-current-certification-requirements", "Verifying Current Certification Requirements", { contentDir: "ch02/10-verifying-current-certification-requirements", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792602777/ltv-salesforce-career-preparation/verifying-current-certification-requirements.mp4", durationLabel: "1 min 5 s" }),
    ],
  },
  {
    n: 3,
    title: "Interviews",
    lessons: [
      L(11, "administrator-interviews", "Administrator Interviews", { contentDir: "ch03/11-administrator-interviews", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792603227/ltv-salesforce-career-preparation/administrator-interviews.mp4", durationLabel: "1 min 35 s" }),
      L(12, "developer-interviews", "Developer Interviews", { contentDir: "ch03/12-developer-interviews", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792603715/ltv-salesforce-career-preparation/developer-interviews.mp4", durationLabel: "1 min 46 s" }),
      L(13, "consultant-interviews", "Consultant Interviews", { contentDir: "ch03/13-consultant-interviews", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792604105/ltv-salesforce-career-preparation/consultant-interviews.mp4", durationLabel: "1 min 28 s" }),
      L(14, "architect-scenario-interviews", "Architect Scenario Interviews", { contentDir: "ch03/14-architect-scenario-interviews", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792604641/ltv-salesforce-career-preparation/architect-scenario-interviews.mp4", durationLabel: "1 min 58 s" }),
      L(15, "architecture-whiteboarding", "Architecture Whiteboarding", { contentDir: "ch03/15-architecture-whiteboarding", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792605111/ltv-salesforce-career-preparation/architecture-whiteboarding.mp4", durationLabel: "1 min 34 s" }),
    ],
  },
  {
    n: 4,
    title: "Presenting Your Work",
    lessons: [
      L(16, "presenting-your-capstones", "Presenting Your Capstones", { contentDir: "ch04/16-presenting-your-capstones", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792605518/ltv-salesforce-career-preparation/presenting-your-capstones.mp4", durationLabel: "1 min 33 s" }),
      L(17, "explaining-architecture-decisions", "Explaining Architecture Decisions", { contentDir: "ch04/17-explaining-architecture-decisions", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792605916/ltv-salesforce-career-preparation/explaining-architecture-decisions.mp4", durationLabel: "1 min 27 s" }),
      L(18, "your-first-90-days-in-a-salesforce-role", "Your First 90 Days in a Salesforce Role", { contentDir: "ch04/18-your-first-90-days-in-a-salesforce-role", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792606247/ltv-salesforce-career-preparation/your-first-90-days-in-a-salesforce-role.mp4", durationLabel: "1 min 22 s" }),
      L(19, "long-term-path-toward-cta", "Long-Term Path Toward CTA", { contentDir: "ch04/19-long-term-path-toward-cta", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792606813/ltv-salesforce-career-preparation/long-term-path-toward-cta.mp4", durationLabel: "2 min 7 s" }),
    ],
  },
];
