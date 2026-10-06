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
      L(1, "what-an-object-is", "What an Object Is", { contentDir: "ch01/01-what-an-object-is" }),
      L(2, "standard-objects-overview", "Standard Objects Overview", { contentDir: "ch01/02-standard-objects-overview" }),
      L(3, "accounts-and-contacts", "Accounts and Contacts", { contentDir: "ch01/03-accounts-and-contacts" }),
      L(4, "leads-opportunities-and-cases", "Leads, Opportunities and Cases", { contentDir: "ch01/04-leads-opportunities-and-cases" }),
      L(5, "products-price-books-and-quotes-overview", "Products, Price Books and Quotes Overview", { contentDir: "ch01/05-products-price-books-and-quotes-overview" }),
      L(6, "activities-tasks-and-events", "Activities: Tasks and Events", { contentDir: "ch01/06-activities-tasks-and-events" }),
      L(7, "custom-objects", "Custom Objects", { contentDir: "ch01/07-custom-objects" }),
      L(8, "object-settings-and-object-manager", "Object Settings and Object Manager", { contentDir: "ch01/08-object-settings-and-object-manager" }),
    ],
  },
  {
    n: 2,
    title: "Fields",
    lessons: [
      L(9, "fields-and-field-types", "Fields and Field Types", { contentDir: "ch02/09-fields-and-field-types" }),
      L(10, "text-number-date-and-checkbox-fields", "Text, Number, Date and Checkbox Fields", { contentDir: "ch02/10-text-number-date-and-checkbox-fields" }),
      L(11, "picklists-and-multi-select-picklists", "Picklists and Multi-Select Picklists", { contentDir: "ch02/11-picklists-and-multi-select-picklists" }),
      L(12, "formula-fields", "Formula Fields", { contentDir: "ch02/12-formula-fields" }),
      L(13, "roll-up-summary-fields", "Roll-Up Summary Fields", { contentDir: "ch02/13-roll-up-summary-fields" }),
      L(14, "field-properties-required-unique-and-external-id", "Field Properties: Required, Unique and External ID", { contentDir: "ch02/14-field-properties-required-unique-and-external-id" }),
      L(15, "standard-vs-custom-fields", "Standard vs. Custom Fields", { contentDir: "ch02/15-standard-vs-custom-fields" }),
    ],
  },
  {
    n: 3,
    title: "Relationships and Schema",
    lessons: [
      L(16, "relationships-lookup-and-master-detail", "Relationships: Lookup and Master-Detail", { contentDir: "ch03/16-relationships-lookup-and-master-detail" }),
      L(17, "many-to-many-relationships-and-junction-objects", "Many-to-Many Relationships and Junction Objects", { contentDir: "ch03/17-many-to-many-relationships-and-junction-objects" }),
      L(18, "hierarchical-and-external-lookup-relationships", "Hierarchical and External Lookup Relationships", { contentDir: "ch03/18-hierarchical-and-external-lookup-relationships" }),
      L(19, "record-types", "Record Types", { contentDir: "ch03/19-record-types" }),
      L(20, "schema-design-basics", "Schema Design Basics", { contentDir: "ch03/20-schema-design-basics" }),
      L(21, "schema-builder", "Schema Builder", { contentDir: "ch03/21-schema-builder" }),
      L(22, "salesforce-ids", "Salesforce IDs", { contentDir: "ch03/22-salesforce-ids" }),
      L(23, "designing-a-simple-data-model-from-requirements", "Designing a Simple Data Model From Requirements", { contentDir: "ch03/23-designing-a-simple-data-model-from-requirements" }),
    ],
  },
];
