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
      L(1, "what-microsoft-purview-is", "What Microsoft Purview Is", { contentDir: "ch01/01-what-microsoft-purview-is" }),
      L(2, "the-purview-portal-and-architecture", "The Purview Portal and Architecture", { contentDir: "ch01/02-the-purview-portal-and-architecture" }),
      L(3, "purview-licensing-and-environments", "Purview Licensing and Environments", { contentDir: "ch01/03-purview-licensing-and-environments" }),
      L(4, "roles-and-permissions-in-purview", "Roles and Permissions in Purview", { contentDir: "ch01/04-roles-and-permissions-in-purview" }),
      L(5, "setting-up-a-purview-account", "Setting Up a Purview Account", { contentDir: "ch01/05-setting-up-a-purview-account" }),
      L(6, "collections-and-domains", "Collections and Domains", { contentDir: "ch02/06-collections-and-domains" }),
    ],
  },
  {
    n: 2,
    title: "The Data Map",
    lessons: [
      L(7, "the-purview-data-map", "The Purview Data Map", { contentDir: "ch02/07-the-purview-data-map" }),
      L(8, "registering-data-sources", "Registering Data Sources", { contentDir: "ch02/08-registering-data-sources" }),
      L(9, "scanning-sources", "Scanning Sources", { contentDir: "ch02/09-scanning-sources" }),
      L(10, "scan-rule-sets", "Scan Rule Sets", { contentDir: "ch02/10-scan-rule-sets" }),
      L(11, "scheduling-scans", "Scheduling Scans", { contentDir: "ch02/11-scheduling-scans" }),
      L(12, "scan-troubleshooting", "Scan Troubleshooting", { contentDir: "ch02/12-scan-troubleshooting" }),
    ],
  },
  {
    n: 3,
    title: "Classification and Labels",
    lessons: [
      L(13, "classifications-in-purview", "Classifications in Purview", { contentDir: "ch03/13-classifications-in-purview" }),
      L(14, "system-vs-custom-classifications", "System vs. Custom Classifications", { contentDir: "ch03/14-system-vs-custom-classifications" }),
      L(15, "sensitivity-labels", "Sensitivity Labels", { contentDir: "ch03/15-sensitivity-labels" }),
      L(16, "applying-labels-to-data", "Applying Labels to Data", { contentDir: "ch03/16-applying-labels-to-data" }),
    ],
  },
  {
    n: 4,
    title: "Catalog and Glossary",
    lessons: [
      L(17, "the-purview-data-catalog-and-unified-catalog-overview", "The Purview Data Catalog and Unified Catalog Overview", { contentDir: "ch04/17-the-purview-data-catalog-and-unified-catalog-overview" }),
      L(18, "data-discovery-and-search", "Data Discovery and Search", { contentDir: "ch04/18-data-discovery-and-search" }),
      L(19, "glossary-terms", "Glossary Terms", { contentDir: "ch04/19-glossary-terms" }),
      L(20, "data-products-and-data-assets", "Data Products and Data Assets", { contentDir: "ch04/20-data-products-and-data-assets" }),
      L(21, "curating-assets", "Curating Assets", { contentDir: "ch04/21-curating-assets" }),
      L(22, "business-domains", "Business Domains", { contentDir: "ch04/22-business-domains" }),
    ],
  },
  {
    n: 5,
    title: "Lineage and Insights",
    lessons: [
      L(23, "lineage-in-purview", "Lineage in Purview", { contentDir: "ch05/23-lineage-in-purview" }),
      L(24, "lineage-from-azure-data-factory-and-synapse", "Lineage From Azure Data Factory and Synapse", { contentDir: "ch05/24-lineage-from-azure-data-factory-and-synapse" }),
      L(25, "lineage-from-fabric-and-power-bi", "Lineage From Fabric and Power BI", { contentDir: "ch05/25-lineage-from-fabric-and-power-bi" }),
      L(26, "data-estate-insights", "Data Estate Insights", { contentDir: "ch05/26-data-estate-insights" }),
      L(27, "reports-and-dashboards", "Reports and Dashboards", { contentDir: "ch05/27-reports-and-dashboards" }),
    ],
  },
  {
    n: 6,
    title: "Governance Workflows",
    lessons: [
      L(28, "governance-policies-in-purview", "Governance Policies in Purview", { contentDir: "ch06/28-governance-policies-in-purview" }),
      L(29, "access-policies", "Access Policies", { contentDir: "ch06/29-access-policies" }),
      L(30, "data-quality-in-purview", "Data Quality in Purview", { contentDir: "ch06/30-data-quality-in-purview" }),
      L(31, "governance-workflows-and-approvals", "Governance Workflows and Approvals", { contentDir: "ch06/31-governance-workflows-and-approvals" }),
      L(32, "purview-and-compliance-features-overview", "Purview and Compliance Features Overview", { contentDir: "ch06/32-purview-and-compliance-features-overview" }),
    ],
  },
  {
    n: 7,
    title: "Purview in Practice",
    lessons: [
      L(33, "purview-case-study-enterprise-rollout", "Purview Case Study: Enterprise Rollout", { contentDir: "ch07/33-purview-case-study-enterprise-rollout" }),
      L(34, "purview-practice-lab", "Purview Practice Lab", { contentDir: "ch07/34-purview-practice-lab" }),
      L(35, "purview-best-practices", "Purview Best Practices", { contentDir: "ch07/35-purview-best-practices" }),
    ],
  },
];
