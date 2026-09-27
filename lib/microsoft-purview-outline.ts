// The Microsoft Purview course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Part of the Data Governance career path.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/microsoft-purview/
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

export const GOV_MICROSOFT_PURVIEW_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Purview Foundations",
    lessons: [
      L(1, "what-microsoft-purview-is", "What Microsoft Purview Is"),
      L(2, "the-purview-portal-and-architecture", "The Purview Portal and Architecture"),
      L(3, "purview-licensing-and-environments", "Purview Licensing and Environments"),
      L(4, "roles-and-permissions-in-purview", "Roles and Permissions in Purview"),
      L(5, "setting-up-a-purview-account", "Setting Up a Purview Account"),
      L(6, "collections-and-domains", "Collections and Domains"),
    ],
  },
  {
    n: 2,
    title: "The Data Map",
    lessons: [
      L(7, "the-purview-data-map", "The Purview Data Map"),
      L(8, "registering-data-sources", "Registering Data Sources"),
      L(9, "scanning-sources", "Scanning Sources"),
      L(10, "scan-rule-sets", "Scan Rule Sets"),
      L(11, "scheduling-scans", "Scheduling Scans"),
      L(12, "scan-troubleshooting", "Scan Troubleshooting"),
    ],
  },
  {
    n: 3,
    title: "Classification and Labels",
    lessons: [
      L(13, "classifications-in-purview", "Classifications in Purview"),
      L(14, "system-vs-custom-classifications", "System vs. Custom Classifications"),
      L(15, "sensitivity-labels", "Sensitivity Labels"),
      L(16, "applying-labels-to-data", "Applying Labels to Data"),
    ],
  },
  {
    n: 4,
    title: "Catalog and Glossary",
    lessons: [
      L(17, "the-purview-data-catalog-and-unified-catalog-overview", "The Purview Data Catalog and Unified Catalog Overview"),
      L(18, "data-discovery-and-search", "Data Discovery and Search"),
      L(19, "glossary-terms", "Glossary Terms"),
      L(20, "data-products-and-data-assets", "Data Products and Data Assets"),
      L(21, "curating-assets", "Curating Assets"),
      L(22, "business-domains", "Business Domains"),
    ],
  },
  {
    n: 5,
    title: "Lineage and Insights",
    lessons: [
      L(23, "lineage-in-purview", "Lineage in Purview"),
      L(24, "lineage-from-azure-data-factory-and-synapse", "Lineage From Azure Data Factory and Synapse"),
      L(25, "lineage-from-fabric-and-power-bi", "Lineage From Fabric and Power BI"),
      L(26, "data-estate-insights", "Data Estate Insights"),
      L(27, "reports-and-dashboards", "Reports and Dashboards"),
    ],
  },
  {
    n: 6,
    title: "Governance Workflows",
    lessons: [
      L(28, "governance-policies-in-purview", "Governance Policies in Purview"),
      L(29, "access-policies", "Access Policies"),
      L(30, "data-quality-in-purview", "Data Quality in Purview"),
      L(31, "governance-workflows-and-approvals", "Governance Workflows and Approvals"),
      L(32, "purview-and-compliance-features-overview", "Purview and Compliance Features Overview"),
    ],
  },
  {
    n: 7,
    title: "Purview in Practice",
    lessons: [
      L(33, "purview-case-study-enterprise-rollout", "Purview Case Study: Enterprise Rollout"),
      L(34, "purview-practice-lab", "Purview Practice Lab"),
      L(35, "purview-best-practices", "Purview Best Practices"),
    ],
  },
];
