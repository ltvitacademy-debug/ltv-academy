// The Architecture Documentation course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Part of the Salesforce Technical Architect career path.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/architecture-documentation/
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

export const SFTA_ARCHITECTURE_DOCUMENTATION_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Documenting Architecture",
    lessons: [
      L(1, "entity-relationship-diagrams", "Entity Relationship Diagrams"),
      L(2, "system-diagrams", "System Diagrams"),
      L(3, "data-flow-diagrams", "Data-Flow Diagrams"),
      L(4, "sequence-diagrams", "Sequence Diagrams"),
      L(5, "architecture-decision-records", "Architecture Decision Records"),
      L(6, "technical-documentation", "Technical Documentation"),
    ],
  },
];
