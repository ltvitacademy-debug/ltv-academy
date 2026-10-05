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
      L(1, "what-unity-catalog-is", "What Unity Catalog Is", { contentDir: "ch01/01-what-unity-catalog-is" }),
      L(2, "metastores", "Metastores", { contentDir: "ch01/02-metastores" }),
      L(3, "catalogs-and-schemas", "Catalogs and Schemas", { contentDir: "ch01/03-catalogs-and-schemas" }),
      L(4, "tables-volumes-and-models", "Tables, Volumes and Models", { contentDir: "ch01/04-tables-volumes-and-models" }),
      L(5, "managed-vs-external-storage-governance", "Managed vs. External Storage Governance", { contentDir: "ch01/05-managed-vs-external-storage-governance" }),
    ],
  },
  {
    n: 2,
    title: "Permissions",
    lessons: [
      L(6, "principals-users-groups-and-service-principals", "Principals: Users, Groups and Service Principals", { contentDir: "ch02/06-principals-users-groups-and-service-principals" }),
      L(7, "privileges-and-grant", "Privileges and GRANT", { contentDir: "ch02/07-privileges-and-grant" }),
      L(8, "ownership", "Ownership", { contentDir: "ch02/08-ownership" }),
      L(9, "inheritance-of-permissions", "Inheritance of Permissions", { contentDir: "ch02/09-inheritance-of-permissions" }),
      L(10, "access-control-best-practices", "Access Control Best Practices", { contentDir: "ch02/10-access-control-best-practices" }),
    ],
  },
  {
    n: 3,
    title: "Fine-Grained Security",
    lessons: [
      L(11, "row-filters", "Row Filters", { contentDir: "ch03/11-row-filters" }),
      L(12, "column-masks", "Column Masks", { contentDir: "ch03/12-column-masks" }),
      L(13, "dynamic-views", "Dynamic Views", { contentDir: "ch03/13-dynamic-views" }),
      L(14, "attribute-based-access-control-and-governed-tags", "Attribute-Based Access Control and Governed Tags", { contentDir: "ch03/14-attribute-based-access-control-and-governed-tags" }),
      L(15, "sensitive-data-governance", "Sensitive Data Governance", { contentDir: "ch03/15-sensitive-data-governance" }),
    ],
  },
  {
    n: 4,
    title: "Discovery, Lineage and Auditing",
    lessons: [
      L(16, "data-discovery-in-unity-catalog", "Data Discovery in Unity Catalog", { contentDir: "ch04/16-data-discovery-in-unity-catalog" }),
      L(17, "lineage-in-unity-catalog", "Lineage in Unity Catalog", { contentDir: "ch04/17-lineage-in-unity-catalog" }),
      L(18, "system-tables-and-auditing", "System Tables and Auditing", { contentDir: "ch04/18-system-tables-and-auditing" }),
      L(19, "audit-logs", "Audit Logs", { contentDir: "ch04/19-audit-logs" }),
      L(20, "monitoring-and-compliance", "Monitoring and Compliance", { contentDir: "ch04/20-monitoring-and-compliance" }),
    ],
  },
  {
    n: 5,
    title: "Lakehouse Governance",
    lessons: [
      L(21, "delta-sharing-and-governance", "Delta Sharing and Governance", { contentDir: "ch05/21-delta-sharing-and-governance" }),
      L(22, "governing-machine-learning-assets", "Governing Machine Learning Assets", { contentDir: "ch05/22-governing-machine-learning-assets" }),
      L(23, "migrating-to-unity-catalog", "Migrating to Unity Catalog", { contentDir: "ch05/23-migrating-to-unity-catalog" }),
      L(24, "unity-catalog-case-study", "Unity Catalog Case Study", { contentDir: "ch05/24-unity-catalog-case-study" }),
      L(25, "unity-catalog-practice-lab", "Unity Catalog Practice Lab", { contentDir: "ch05/25-unity-catalog-practice-lab" }),
    ],
  },
];
