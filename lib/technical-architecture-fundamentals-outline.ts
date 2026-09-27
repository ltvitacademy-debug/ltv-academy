// The Technical Architecture Fundamentals course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Part of the Salesforce Technical Architect career path.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/technical-architecture-fundamentals/
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

export const SFTA_TECHNICAL_ARCHITECTURE_FUNDAMENTALS_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Thinking Like a Technical Architect",
    lessons: [
      L(1, "the-technical-architect-role", "The Technical Architect Role"),
      L(2, "translating-business-requirements", "Translating Business Requirements"),
      L(3, "the-solution-design-process", "The Solution Design Process"),
      L(4, "architecture-domains-overview", "Architecture Domains Overview"),
    ],
  },
  {
    n: 2,
    title: "From Requirements to Blueprint",
    lessons: [
      L(5, "assumptions-and-constraints", "Assumptions and Constraints"),
      L(6, "risk-identification", "Risk Identification"),
      L(7, "communicating-architecture", "Communicating Architecture"),
      L(8, "from-requirements-to-an-architecture-blueprint", "From Requirements to an Architecture Blueprint"),
    ],
  },
];
