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
      L(1, "what-an-architecture-review-board-is", "What an Architecture Review Board Is", { contentDir: "ch01/01-what-an-architecture-review-board-is" }),
      L(2, "presenting-architecture", "Presenting Architecture", { contentDir: "ch01/02-presenting-architecture" }),
      L(3, "structuring-a-presentation", "Structuring a Presentation", { contentDir: "ch01/03-structuring-a-presentation" }),
      L(4, "defending-decisions", "Defending Decisions", { contentDir: "ch01/04-defending-decisions" }),
      L(5, "responding-to-technical-objections", "Responding to Technical Objections", { contentDir: "ch01/05-responding-to-technical-objections" }),
    ],
  },
  {
    n: 2,
    title: "Performing Under Pressure",
    lessons: [
      L(6, "handling-ambiguity-under-questioning", "Handling Ambiguity Under Questioning", { contentDir: "ch02/06-handling-ambiguity-under-questioning" }),
      L(7, "whiteboarding-an-architecture", "Whiteboarding an Architecture", { contentDir: "ch02/07-whiteboarding-an-architecture" }),
      L(8, "managing-time-in-a-review-board", "Managing Time in a Review Board", { contentDir: "ch02/08-managing-time-in-a-review-board" }),
      L(9, "recovering-from-a-mistake", "Recovering From a Mistake", { contentDir: "ch02/09-recovering-from-a-mistake" }),
      L(10, "reading-the-room", "Reading the Room", { contentDir: "ch02/10-reading-the-room" }),
    ],
  },
  {
    n: 3,
    title: "Practice",
    lessons: [
      L(11, "review-board-simulation", "Review Board Simulation", { contentDir: "ch03/11-review-board-simulation" }),
      L(12, "review-board-simulation-security-focus", "Review Board Simulation: Security Focus", { contentDir: "ch03/12-review-board-simulation-security-focus" }),
      L(13, "review-board-simulation-integration-focus", "Review Board Simulation: Integration Focus", { contentDir: "ch03/13-review-board-simulation-integration-focus" }),
      L(14, "review-board-feedback-and-iteration", "Review Board Feedback and Iteration", { contentDir: "ch03/14-review-board-feedback-and-iteration" }),
    ],
  },
];
