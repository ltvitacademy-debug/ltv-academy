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
      L(1, "what-unity-catalog-is", "What Unity Catalog Is", { contentDir: "ch01/01-what-unity-catalog-is", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792424176/ltv-databricks-unity-catalog-governance/what-unity-catalog-is.mp4", durationLabel: "2:06" }),
      L(2, "metastores", "Metastores", { contentDir: "ch01/02-metastores", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792424291/ltv-databricks-unity-catalog-governance/metastores.mp4", durationLabel: "1:50" }),
      L(3, "catalogs-and-schemas", "Catalogs and Schemas", { contentDir: "ch01/03-catalogs-and-schemas", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792424387/ltv-databricks-unity-catalog-governance/catalogs-and-schemas.mp4", durationLabel: "1:44" }),
      L(4, "tables-volumes-and-models", "Tables, Volumes and Models", { contentDir: "ch01/04-tables-volumes-and-models", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792424489/ltv-databricks-unity-catalog-governance/tables-volumes-and-models.mp4", durationLabel: "1:49" }),
      L(5, "managed-vs-external-storage-governance", "Managed vs. External Storage Governance", { contentDir: "ch01/05-managed-vs-external-storage-governance", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792424591/ltv-databricks-unity-catalog-governance/managed-vs-external-storage-governance.mp4", durationLabel: "1:46" }),
    ],
  },
  {
    n: 2,
    title: "Permissions",
    lessons: [
      L(6, "principals-users-groups-and-service-principals", "Principals: Users, Groups and Service Principals", { contentDir: "ch02/06-principals-users-groups-and-service-principals", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792424703/ltv-databricks-unity-catalog-governance/principals-users-groups-and-service-principals.mp4", durationLabel: "1:46" }),
      L(7, "privileges-and-grant", "Privileges and GRANT", { contentDir: "ch02/07-privileges-and-grant", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792424901/ltv-databricks-unity-catalog-governance/privileges-and-grant.mp4", durationLabel: "1:39" }),
      L(8, "ownership", "Ownership", { contentDir: "ch02/08-ownership", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792425155/ltv-databricks-unity-catalog-governance/ownership.mp4", durationLabel: "1:35" }),
      L(9, "inheritance-of-permissions", "Inheritance of Permissions", { contentDir: "ch02/09-inheritance-of-permissions", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792425547/ltv-databricks-unity-catalog-governance/inheritance-of-permissions.mp4", durationLabel: "1:32" }),
      L(10, "access-control-best-practices", "Access Control Best Practices", { contentDir: "ch02/10-access-control-best-practices", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792426082/ltv-databricks-unity-catalog-governance/access-control-best-practices.mp4", durationLabel: "1:27" }),
    ],
  },
  {
    n: 3,
    title: "Fine-Grained Security",
    lessons: [
      L(11, "row-filters", "Row Filters", { contentDir: "ch03/11-row-filters", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792426637/ltv-databricks-unity-catalog-governance/row-filters.mp4", durationLabel: "1:37" }),
      L(12, "column-masks", "Column Masks", { contentDir: "ch03/12-column-masks", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792427226/ltv-databricks-unity-catalog-governance/column-masks.mp4", durationLabel: "1:44" }),
      L(13, "dynamic-views", "Dynamic Views", { contentDir: "ch03/13-dynamic-views", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792427806/ltv-databricks-unity-catalog-governance/dynamic-views.mp4", durationLabel: "1:47" }),
      L(14, "attribute-based-access-control-and-governed-tags", "Attribute-Based Access Control and Governed Tags", { contentDir: "ch03/14-attribute-based-access-control-and-governed-tags", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792428449/ltv-databricks-unity-catalog-governance/attribute-based-access-control-and-governed-tags.mp4", durationLabel: "1:54" }),
      L(15, "sensitive-data-governance", "Sensitive Data Governance", { contentDir: "ch03/15-sensitive-data-governance", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792429025/ltv-databricks-unity-catalog-governance/sensitive-data-governance.mp4", durationLabel: "1:55" }),
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
      L(21, "delta-sharing-and-governance", "Delta Sharing and Governance", { contentDir: "ch05/21-delta-sharing-and-governance", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792428619/ltv-databricks-unity-catalog-governance/delta-sharing-and-governance.mp4", durationLabel: "1:56" }),
      L(22, "governing-machine-learning-assets", "Governing Machine Learning Assets", { contentDir: "ch05/22-governing-machine-learning-assets", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792427860/ltv-databricks-unity-catalog-governance/governing-machine-learning-assets.mp4", durationLabel: "2:07" }),
      L(23, "migrating-to-unity-catalog", "Migrating to Unity Catalog", { contentDir: "ch05/23-migrating-to-unity-catalog", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792427016/ltv-databricks-unity-catalog-governance/migrating-to-unity-catalog.mp4", durationLabel: "2:02" }),
      L(24, "unity-catalog-case-study", "Unity Catalog Case Study", { contentDir: "ch05/24-unity-catalog-case-study", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792426199/ltv-databricks-unity-catalog-governance/unity-catalog-case-study.mp4", durationLabel: "1:47" }),
      L(25, "unity-catalog-practice-lab", "Unity Catalog Practice Lab", { contentDir: "ch05/25-unity-catalog-practice-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792425440/ltv-databricks-unity-catalog-governance/unity-catalog-practice-lab.mp4", durationLabel: "1:53" }),
    ],
  },
];
