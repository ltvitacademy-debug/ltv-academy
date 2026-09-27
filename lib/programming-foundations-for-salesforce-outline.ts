// The Programming Foundations for Salesforce course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Part of the Salesforce Technical Architect career path.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/programming-foundations-for-salesforce/
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

export const SFTA_PROGRAMMING_FOUNDATIONS_FOR_SALESFORCE_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Programming Concepts",
    lessons: [
      L(1, "what-programming-is", "What Programming Is"),
      L(2, "variables-and-data-types", "Variables and Data Types"),
      L(3, "control-flow", "Control Flow"),
      L(4, "functions", "Functions"),
      L(5, "objects-and-classes", "Objects and Classes"),
      L(6, "debugging-and-thinking-like-a-developer", "Debugging and Thinking Like a Developer"),
    ],
  },
];
