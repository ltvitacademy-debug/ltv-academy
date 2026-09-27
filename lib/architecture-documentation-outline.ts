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
      L(1, "why-architecture-documentation-matters", "Why Architecture Documentation Matters"),
      L(2, "entity-relationship-diagrams", "Entity Relationship Diagrams"),
      L(3, "system-diagrams", "System Diagrams"),
      L(4, "data-flow-diagrams", "Data-Flow Diagrams"),
      L(5, "sequence-diagrams", "Sequence Diagrams"),
      L(6, "architecture-decision-records", "Architecture Decision Records"),
    ],
  },
  {
    n: 2,
    title: "Communicating Architecture",
    lessons: [
      L(7, "technical-documentation", "Technical Documentation"),
      L(8, "diagramming-standards-and-notation", "Diagramming Standards and Notation"),
      L(9, "diagram-tools", "Diagram Tools"),
      L(10, "documenting-for-different-audiences", "Documenting for Different Audiences"),
      L(11, "executive-summaries", "Executive Summaries"),
    ],
  },
  {
    n: 3,
    title: "Practice",
    lessons: [
      L(12, "documenting-a-data-model", "Documenting a Data Model"),
      L(13, "documenting-an-integration", "Documenting an Integration"),
      L(14, "documenting-security-and-sharing", "Documenting Security and Sharing"),
      L(15, "reviewing-documentation", "Reviewing Documentation"),
      L(16, "documentation-templates", "Documentation Templates"),
      L(17, "architecture-documentation-case-study", "Architecture Documentation Case Study"),
    ],
  },
];
