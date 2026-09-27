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
      L(1, "what-an-architecture-review-board-is", "What an Architecture Review Board Is"),
      L(2, "presenting-architecture", "Presenting Architecture"),
      L(3, "structuring-a-presentation", "Structuring a Presentation"),
      L(4, "defending-decisions", "Defending Decisions"),
      L(5, "responding-to-technical-objections", "Responding to Technical Objections"),
    ],
  },
  {
    n: 2,
    title: "Performing Under Pressure",
    lessons: [
      L(6, "handling-ambiguity-under-questioning", "Handling Ambiguity Under Questioning"),
      L(7, "whiteboarding-an-architecture", "Whiteboarding an Architecture"),
      L(8, "managing-time-in-a-review-board", "Managing Time in a Review Board"),
      L(9, "recovering-from-a-mistake", "Recovering From a Mistake"),
      L(10, "reading-the-room", "Reading the Room"),
    ],
  },
  {
    n: 3,
    title: "Practice",
    lessons: [
      L(11, "review-board-simulation", "Review Board Simulation"),
      L(12, "review-board-simulation-security-focus", "Review Board Simulation: Security Focus"),
      L(13, "review-board-simulation-integration-focus", "Review Board Simulation: Integration Focus"),
      L(14, "review-board-feedback-and-iteration", "Review Board Feedback and Iteration"),
    ],
  },
];
