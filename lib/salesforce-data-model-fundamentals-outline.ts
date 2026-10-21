// The Salesforce Data Model Fundamentals course outline. All lessons
// have real guide.md content (the header here previously, incorrectly,
// called this "framework only" — fixed 2026-10-17). Lessons without a
// contentDir render as "in production". Part of the Salesforce
// Administrator path's "Salesforce Foundations" stage (not the
// Technical Architect path, as a prior version of this comment said).

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
      L(1, "what-an-object-is", "What an Object Is", { contentDir: "ch01/01-what-an-object-is", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792535719/ltv-salesforce-data-model-fundamentals/01-what-an-object-is.mp4", durationLabel: "1 min 29 s" }),
      L(2, "standard-objects-overview", "Standard Objects Overview", { contentDir: "ch01/02-standard-objects-overview", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792535803/ltv-salesforce-data-model-fundamentals/02-standard-objects-overview.mp4", durationLabel: "1 min 32 s" }),
      L(3, "accounts-and-contacts", "Accounts and Contacts", { contentDir: "ch01/03-accounts-and-contacts", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792535880/ltv-salesforce-data-model-fundamentals/03-accounts-and-contacts.mp4", durationLabel: "1 min 24 s" }),
      L(4, "leads-opportunities-and-cases", "Leads, Opportunities and Cases", { contentDir: "ch01/04-leads-opportunities-and-cases", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792535951/ltv-salesforce-data-model-fundamentals/04-leads-opportunities-and-cases.mp4", durationLabel: "1 min 38 s" }),
      L(5, "products-price-books-and-quotes-overview", "Products, Price Books and Quotes Overview", { contentDir: "ch01/05-products-price-books-and-quotes-overview", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792536016/ltv-salesforce-data-model-fundamentals/05-products-price-books-and-quotes-overview.mp4", durationLabel: "1 min 26 s" }),
      L(6, "activities-tasks-and-events", "Activities: Tasks and Events", { contentDir: "ch01/06-activities-tasks-and-events", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792536074/ltv-salesforce-data-model-fundamentals/06-activities-tasks-and-events.mp4", durationLabel: "1 min 20 s" }),
      L(7, "custom-objects", "Custom Objects", { contentDir: "ch01/07-custom-objects", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792536136/ltv-salesforce-data-model-fundamentals/07-custom-objects.mp4", durationLabel: "1 min 38 s" }),
      L(8, "object-settings-and-object-manager", "Object Settings and Object Manager", { contentDir: "ch01/08-object-settings-and-object-manager", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792536195/ltv-salesforce-data-model-fundamentals/08-object-settings-and-object-manager.mp4", durationLabel: "1 min 31 s" }),
    ],
  },
  {
    n: 2,
    title: "Fields",
    lessons: [
      L(9, "fields-and-field-types", "Fields and Field Types", { contentDir: "ch02/09-fields-and-field-types", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792536252/ltv-salesforce-data-model-fundamentals/09-fields-and-field-types.mp4", durationLabel: "1 min 31 s" }),
      L(10, "text-number-date-and-checkbox-fields", "Text, Number, Date and Checkbox Fields", { contentDir: "ch02/10-text-number-date-and-checkbox-fields", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792536310/ltv-salesforce-data-model-fundamentals/10-text-number-date-and-checkbox-fields.mp4", durationLabel: "1 min 30 s" }),
      L(11, "picklists-and-multi-select-picklists", "Picklists and Multi-Select Picklists", { contentDir: "ch02/11-picklists-and-multi-select-picklists", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792536373/ltv-salesforce-data-model-fundamentals/11-picklists-and-multi-select-picklists.mp4", durationLabel: "1 min 33 s" }),
      L(12, "formula-fields", "Formula Fields", { contentDir: "ch02/12-formula-fields", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792536442/ltv-salesforce-data-model-fundamentals/12-formula-fields.mp4", durationLabel: "1 min 40 s" }),
      L(13, "roll-up-summary-fields", "Roll-Up Summary Fields", { contentDir: "ch02/13-roll-up-summary-fields", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792536496/ltv-salesforce-data-model-fundamentals/13-roll-up-summary-fields.mp4", durationLabel: "1 min 21 s" }),
      L(14, "field-properties-required-unique-and-external-id", "Field Properties: Required, Unique and External ID", { contentDir: "ch02/14-field-properties-required-unique-and-external-id", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792536552/ltv-salesforce-data-model-fundamentals/14-field-properties-required-unique-and-external-id.mp4", durationLabel: "1 min 23 s" }),
      L(15, "standard-vs-custom-fields", "Standard vs. Custom Fields", { contentDir: "ch02/15-standard-vs-custom-fields", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792536615/ltv-salesforce-data-model-fundamentals/15-standard-vs-custom-fields.mp4", durationLabel: "1 min 34 s" }),
    ],
  },
  {
    n: 3,
    title: "Relationships and Schema",
    lessons: [
      L(16, "relationships-lookup-and-master-detail", "Relationships: Lookup and Master-Detail", { contentDir: "ch03/16-relationships-lookup-and-master-detail", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792536692/ltv-salesforce-data-model-fundamentals/16-relationships-lookup-and-master-detail.mp4", durationLabel: "1 min 56 s" }),
      L(17, "many-to-many-relationships-and-junction-objects", "Many-to-Many Relationships and Junction Objects", { contentDir: "ch03/17-many-to-many-relationships-and-junction-objects", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792536762/ltv-salesforce-data-model-fundamentals/17-many-to-many-relationships-and-junction-objects.mp4", durationLabel: "1 min 40 s" }),
      L(18, "hierarchical-and-external-lookup-relationships", "Hierarchical and External Lookup Relationships", { contentDir: "ch03/18-hierarchical-and-external-lookup-relationships", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792536839/ltv-salesforce-data-model-fundamentals/18-hierarchical-and-external-lookup-relationships.mp4", durationLabel: "2 min 8 s" }),
      L(19, "record-types", "Record Types", { contentDir: "ch03/19-record-types", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792536900/ltv-salesforce-data-model-fundamentals/19-record-types.mp4", durationLabel: "1 min 45 s" }),
      L(20, "schema-design-basics", "Schema Design Basics", { contentDir: "ch03/20-schema-design-basics", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792536962/ltv-salesforce-data-model-fundamentals/20-schema-design-basics.mp4", durationLabel: "1 min 52 s" }),
      L(21, "schema-builder", "Schema Builder", { contentDir: "ch03/21-schema-builder", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792537017/ltv-salesforce-data-model-fundamentals/21-schema-builder.mp4", durationLabel: "1 min 35 s" }),
      L(22, "salesforce-ids", "Salesforce IDs", { contentDir: "ch03/22-salesforce-ids", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792537085/ltv-salesforce-data-model-fundamentals/22-salesforce-ids.mp4", durationLabel: "2 min 5 s" }),
      L(23, "designing-a-simple-data-model-from-requirements", "Designing a Simple Data Model From Requirements", { contentDir: "ch03/23-designing-a-simple-data-model-from-requirements", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792537153/ltv-salesforce-data-model-fundamentals/23-designing-a-simple-data-model-from-requirements.mp4", durationLabel: "2 min 9 s" }),
    ],
  },
];
