// The Architecture Review Boards course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Part of the Salesforce Technical Architect career path.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/architecture-review-boards/
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

export const SFTA_ARCHITECTURE_REVIEW_BOARDS_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "The Review Board",
    lessons: [
      L(1, "presenting-architecture", "Presenting Architecture"),
      L(2, "defending-decisions", "Defending Decisions"),
      L(3, "responding-to-technical-objections", "Responding to Technical Objections"),
      L(4, "handling-ambiguity-under-questioning", "Handling Ambiguity Under Questioning"),
      L(5, "review-board-simulation", "Review Board Simulation"),
    ],
  },
];
