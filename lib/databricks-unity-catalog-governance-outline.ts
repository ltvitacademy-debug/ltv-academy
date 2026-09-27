// The Databricks Unity Catalog Governance course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Part of the Data Governance career path.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/databricks-unity-catalog-governance/
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

export const GOV_DATABRICKS_UNITY_CATALOG_GOVERNANCE_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Unity Catalog Foundations",
    lessons: [
      L(1, "what-unity-catalog-is", "What Unity Catalog Is"),
      L(2, "metastores", "Metastores"),
      L(3, "catalogs-and-schemas", "Catalogs and Schemas"),
      L(4, "tables-volumes-and-models", "Tables, Volumes and Models"),
      L(5, "managed-vs-external-storage-governance", "Managed vs. External Storage Governance"),
    ],
  },
  {
    n: 2,
    title: "Permissions",
    lessons: [
      L(6, "principals-users-groups-and-service-principals", "Principals: Users, Groups and Service Principals"),
      L(7, "privileges-and-grant", "Privileges and GRANT"),
      L(8, "ownership", "Ownership"),
      L(9, "inheritance-of-permissions", "Inheritance of Permissions"),
      L(10, "access-control-best-practices", "Access Control Best Practices"),
    ],
  },
  {
    n: 3,
    title: "Fine-Grained Security",
    lessons: [
      L(11, "row-filters", "Row Filters"),
      L(12, "column-masks", "Column Masks"),
      L(13, "dynamic-views", "Dynamic Views"),
      L(14, "attribute-based-access-control-and-governed-tags", "Attribute-Based Access Control and Governed Tags"),
      L(15, "sensitive-data-governance", "Sensitive Data Governance"),
    ],
  },
  {
    n: 4,
    title: "Discovery, Lineage and Auditing",
    lessons: [
      L(16, "data-discovery-in-unity-catalog", "Data Discovery in Unity Catalog"),
      L(17, "lineage-in-unity-catalog", "Lineage in Unity Catalog"),
      L(18, "system-tables-and-auditing", "System Tables and Auditing"),
      L(19, "audit-logs", "Audit Logs"),
      L(20, "monitoring-and-compliance", "Monitoring and Compliance"),
    ],
  },
  {
    n: 5,
    title: "Lakehouse Governance",
    lessons: [
      L(21, "delta-sharing-and-governance", "Delta Sharing and Governance"),
      L(22, "governing-machine-learning-assets", "Governing Machine Learning Assets"),
      L(23, "migrating-to-unity-catalog", "Migrating to Unity Catalog"),
      L(24, "unity-catalog-case-study", "Unity Catalog Case Study"),
      L(25, "unity-catalog-practice-lab", "Unity Catalog Practice Lab"),
    ],
  },
];
