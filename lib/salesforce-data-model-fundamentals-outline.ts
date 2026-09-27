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
    title: "Objects",
    lessons: [
      L(1, "what-an-object-is", "What an Object Is"),
      L(2, "standard-objects-overview", "Standard Objects Overview"),
      L(3, "accounts-and-contacts", "Accounts and Contacts"),
      L(4, "leads-opportunities-and-cases", "Leads, Opportunities and Cases"),
      L(5, "products-price-books-and-quotes-overview", "Products, Price Books and Quotes Overview"),
      L(6, "activities-tasks-and-events", "Activities: Tasks and Events"),
      L(7, "custom-objects", "Custom Objects"),
      L(8, "object-settings-and-object-manager", "Object Settings and Object Manager"),
    ],
  },
  {
    n: 2,
    title: "Fields",
    lessons: [
      L(9, "fields-and-field-types", "Fields and Field Types"),
      L(10, "text-number-date-and-checkbox-fields", "Text, Number, Date and Checkbox Fields"),
      L(11, "picklists-and-multi-select-picklists", "Picklists and Multi-Select Picklists"),
      L(12, "formula-fields", "Formula Fields"),
      L(13, "roll-up-summary-fields", "Roll-Up Summary Fields"),
      L(14, "field-properties-required-unique-and-external-id", "Field Properties: Required, Unique and External ID"),
      L(15, "standard-vs-custom-fields", "Standard vs. Custom Fields"),
    ],
  },
  {
    n: 3,
    title: "Relationships and Schema",
    lessons: [
      L(16, "relationships-lookup-and-master-detail", "Relationships: Lookup and Master-Detail"),
      L(17, "many-to-many-relationships-and-junction-objects", "Many-to-Many Relationships and Junction Objects"),
      L(18, "hierarchical-and-external-lookup-relationships", "Hierarchical and External Lookup Relationships"),
      L(19, "record-types", "Record Types"),
      L(20, "schema-design-basics", "Schema Design Basics"),
      L(21, "schema-builder", "Schema Builder"),
      L(22, "salesforce-ids", "Salesforce IDs"),
      L(23, "designing-a-simple-data-model-from-requirements", "Designing a Simple Data Model From Requirements"),
    ],
  },
];
