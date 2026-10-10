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
      L(1, "why-architecture-documentation-matters", "Why Architecture Documentation Matters", { contentDir: "ch01/01-why-architecture-documentation-matters" }),
      L(2, "entity-relationship-diagrams", "Entity Relationship Diagrams", { contentDir: "ch01/02-entity-relationship-diagrams" }),
      L(3, "system-diagrams", "System Diagrams", { contentDir: "ch01/03-system-diagrams" }),
      L(4, "data-flow-diagrams", "Data-Flow Diagrams", { contentDir: "ch01/04-data-flow-diagrams" }),
      L(5, "sequence-diagrams", "Sequence Diagrams", { contentDir: "ch01/05-sequence-diagrams" }),
      L(6, "architecture-decision-records", "Architecture Decision Records", { contentDir: "ch01/06-architecture-decision-records" }),
    ],
  },
  {
    n: 2,
    title: "Communicating Architecture",
    lessons: [
      L(7, "technical-documentation", "Technical Documentation", { contentDir: "ch02/07-technical-documentation" }),
      L(8, "diagramming-standards-and-notation", "Diagramming Standards and Notation", { contentDir: "ch02/08-diagramming-standards-and-notation" }),
      L(9, "diagram-tools", "Diagram Tools", { contentDir: "ch02/09-diagram-tools" }),
      L(10, "documenting-for-different-audiences", "Documenting for Different Audiences", { contentDir: "ch02/10-documenting-for-different-audiences" }),
      L(11, "executive-summaries", "Executive Summaries", { contentDir: "ch02/11-executive-summaries" }),
    ],
  },
  {
    n: 3,
    title: "Practice",
    lessons: [
      L(12, "documenting-a-data-model", "Documenting a Data Model", { contentDir: "ch03/12-documenting-a-data-model" }),
      L(13, "documenting-an-integration", "Documenting an Integration", { contentDir: "ch03/13-documenting-an-integration" }),
      L(14, "documenting-security-and-sharing", "Documenting Security and Sharing", { contentDir: "ch03/14-documenting-security-and-sharing" }),
      L(15, "reviewing-documentation", "Reviewing Documentation", { contentDir: "ch03/15-reviewing-documentation" }),
      L(16, "documentation-templates", "Documentation Templates", { contentDir: "ch03/16-documentation-templates" }),
      L(17, "architecture-documentation-case-study", "Architecture Documentation Case Study", { contentDir: "ch03/17-architecture-documentation-case-study" }),
    ],
  },
];
