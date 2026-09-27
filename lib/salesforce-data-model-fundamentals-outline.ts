// The Salesforce Data Model Fundamentals course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Part of the Salesforce Technical Architect career path.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/salesforce-data-model-fundamentals/
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

export const SFTA_SALESFORCE_DATA_MODEL_FUNDAMENTALS_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Objects and Fields",
    lessons: [
      L(1, "standard-objects", "Standard Objects"),
      L(2, "custom-objects", "Custom Objects"),
      L(3, "fields-and-field-types", "Fields and Field Types"),
      L(4, "relationships-lookup-and-master-detail", "Relationships: Lookup and Master-Detail"),
    ],
  },
  {
    n: 2,
    title: "Designing the Schema",
    lessons: [
      L(5, "record-types", "Record Types"),
      L(6, "schema-design-basics", "Schema Design Basics"),
      L(7, "schema-builder", "Schema Builder"),
      L(8, "salesforce-ids", "Salesforce IDs"),
    ],
  },
];
