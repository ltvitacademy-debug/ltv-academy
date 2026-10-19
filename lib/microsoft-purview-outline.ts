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
      L(1, "what-microsoft-purview-is", "What Microsoft Purview Is", { contentDir: "ch01/01-what-microsoft-purview-is", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792407839/ltv-microsoft-purview/what-microsoft-purview-is.mp4", durationLabel: "1 min 58 s" }),
      L(2, "the-purview-portal-and-architecture", "The Purview Portal and Architecture", { contentDir: "ch01/02-the-purview-portal-and-architecture", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792407966/ltv-microsoft-purview/the-purview-portal-and-architecture.mp4", durationLabel: "1 min 55 s" }),
      L(3, "purview-licensing-and-environments", "Purview Licensing and Environments", { contentDir: "ch01/03-purview-licensing-and-environments", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792408111/ltv-microsoft-purview/purview-licensing-and-environments.mp4", durationLabel: "1 min 57 s" }),
      L(4, "roles-and-permissions-in-purview", "Roles and Permissions in Purview", { contentDir: "ch01/04-roles-and-permissions-in-purview", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792408282/ltv-microsoft-purview/roles-and-permissions-in-purview.mp4", durationLabel: "1 min 42 s" }),
      L(5, "setting-up-a-purview-account", "Setting Up a Purview Account", { contentDir: "ch01/05-setting-up-a-purview-account", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792408476/ltv-microsoft-purview/setting-up-a-purview-account.mp4", durationLabel: "1 min 51 s" }),
      L(6, "collections-and-domains", "Collections and Domains", { contentDir: "ch02/06-collections-and-domains", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792408640/ltv-microsoft-purview/collections-and-domains.mp4", durationLabel: "1 min 45 s" }),
    ],
  },
  {
    n: 2,
    title: "The Data Map",
    lessons: [
      L(7, "the-purview-data-map", "The Purview Data Map", { contentDir: "ch02/07-the-purview-data-map", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792408877/ltv-microsoft-purview/the-purview-data-map.mp4", durationLabel: "1 min 56 s" }),
      L(8, "registering-data-sources", "Registering Data Sources", { contentDir: "ch02/08-registering-data-sources", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792409045/ltv-microsoft-purview/registering-data-sources.mp4", durationLabel: "1 min 37 s" }),
      L(9, "scanning-sources", "Scanning Sources", { contentDir: "ch02/09-scanning-sources", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792409239/ltv-microsoft-purview/scanning-sources.mp4", durationLabel: "1 min 44 s" }),
      L(10, "scan-rule-sets", "Scan Rule Sets", { contentDir: "ch02/10-scan-rule-sets", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792409445/ltv-microsoft-purview/scan-rule-sets.mp4", durationLabel: "1 min 33 s" }),
      L(11, "scheduling-scans", "Scheduling Scans", { contentDir: "ch02/11-scheduling-scans", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792409586/ltv-microsoft-purview/scheduling-scans.mp4", durationLabel: "1 min 19 s" }),
      L(12, "scan-troubleshooting", "Scan Troubleshooting", { contentDir: "ch02/12-scan-troubleshooting", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792409781/ltv-microsoft-purview/scan-troubleshooting.mp4", durationLabel: "1 min 32 s" }),
    ],
  },
  {
    n: 3,
    title: "Classification and Labels",
    lessons: [
      L(13, "classifications-in-purview", "Classifications in Purview", { contentDir: "ch03/13-classifications-in-purview", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792409948/ltv-microsoft-purview/classifications-in-purview.mp4", durationLabel: "1 min 26 s" }),
      L(14, "system-vs-custom-classifications", "System vs. Custom Classifications", { contentDir: "ch03/14-system-vs-custom-classifications", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792410137/ltv-microsoft-purview/system-vs-custom-classifications.mp4", durationLabel: "1 min 43 s" }),
      L(15, "sensitivity-labels", "Sensitivity Labels", { contentDir: "ch03/15-sensitivity-labels", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792410316/ltv-microsoft-purview/sensitivity-labels.mp4", durationLabel: "1 min 30 s" }),
      L(16, "applying-labels-to-data", "Applying Labels to Data", { contentDir: "ch03/16-applying-labels-to-data", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792410494/ltv-microsoft-purview/applying-labels-to-data.mp4", durationLabel: "1 min 41 s" }),
    ],
  },
  {
    n: 4,
    title: "Catalog and Glossary",
    lessons: [
      L(17, "the-purview-data-catalog-and-unified-catalog-overview", "The Purview Data Catalog and Unified Catalog Overview", { contentDir: "ch04/17-the-purview-data-catalog-and-unified-catalog-overview", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792410711/ltv-microsoft-purview/the-purview-data-catalog-and-unified-catalog-overview.mp4", durationLabel: "1 min 52 s" }),
      L(18, "data-discovery-and-search", "Data Discovery and Search", { contentDir: "ch04/18-data-discovery-and-search", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792410928/ltv-microsoft-purview/data-discovery-and-search.mp4", durationLabel: "1 min 52 s" }),
      L(19, "glossary-terms", "Glossary Terms", { contentDir: "ch04/19-glossary-terms", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792411137/ltv-microsoft-purview/glossary-terms.mp4", durationLabel: "1 min 50 s" }),
      L(20, "data-products-and-data-assets", "Data Products and Data Assets", { contentDir: "ch04/20-data-products-and-data-assets", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792411347/ltv-microsoft-purview/data-products-and-data-assets.mp4", durationLabel: "1 min 50 s" }),
      L(21, "curating-assets", "Curating Assets", { contentDir: "ch04/21-curating-assets", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792411576/ltv-microsoft-purview/curating-assets.mp4", durationLabel: "1 min 56 s" }),
      L(22, "business-domains", "Business Domains", { contentDir: "ch04/22-business-domains", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792411871/ltv-microsoft-purview/business-domains.mp4", durationLabel: "2 min 36 s" }),
    ],
  },
  {
    n: 5,
    title: "Lineage and Insights",
    lessons: [
      L(23, "lineage-in-purview", "Lineage in Purview", { contentDir: "ch05/23-lineage-in-purview", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792412123/ltv-microsoft-purview/lineage-in-purview.mp4", durationLabel: "2 min 17 s" }),
      L(24, "lineage-from-azure-data-factory-and-synapse", "Lineage From Azure Data Factory and Synapse", { contentDir: "ch05/24-lineage-from-azure-data-factory-and-synapse", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792412432/ltv-microsoft-purview/lineage-from-azure-data-factory-and-synapse.mp4", durationLabel: "2 min 41 s" }),
      L(25, "lineage-from-fabric-and-power-bi", "Lineage From Fabric and Power BI", { contentDir: "ch05/25-lineage-from-fabric-and-power-bi", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792412713/ltv-microsoft-purview/lineage-from-fabric-and-power-bi.mp4", durationLabel: "2 min 40 s" }),
      L(26, "data-estate-insights", "Data Estate Insights", { contentDir: "ch05/26-data-estate-insights", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792412982/ltv-microsoft-purview/data-estate-insights.mp4", durationLabel: "2 min 35 s" }),
      L(27, "reports-and-dashboards", "Reports and Dashboards", { contentDir: "ch05/27-reports-and-dashboards", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792413233/ltv-microsoft-purview/reports-and-dashboards.mp4", durationLabel: "2 min 26 s" }),
    ],
  },
  {
    n: 6,
    title: "Governance Workflows",
    lessons: [
      L(28, "governance-policies-in-purview", "Governance Policies in Purview", { contentDir: "ch06/28-governance-policies-in-purview", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792413396/ltv-microsoft-purview/governance-policies-in-purview.mp4", durationLabel: "1 min 25 s" }),
      L(29, "access-policies", "Access Policies", { contentDir: "ch06/29-access-policies", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792413547/ltv-microsoft-purview/access-policies.mp4", durationLabel: "1 min 20 s" }),
      L(30, "data-quality-in-purview", "Data Quality in Purview", { contentDir: "ch06/30-data-quality-in-purview", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792413688/ltv-microsoft-purview/data-quality-in-purview.mp4", durationLabel: "1 min 22 s" }),
      L(31, "governance-workflows-and-approvals", "Governance Workflows and Approvals", { contentDir: "ch06/31-governance-workflows-and-approvals", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792413842/ltv-microsoft-purview/governance-workflows-and-approvals.mp4", durationLabel: "1 min 19 s" }),
      L(32, "purview-and-compliance-features-overview", "Purview and Compliance Features Overview", { contentDir: "ch06/32-purview-and-compliance-features-overview", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792413993/ltv-microsoft-purview/purview-and-compliance-features-overview.mp4", durationLabel: "1 min 27 s" }),
    ],
  },
  {
    n: 7,
    title: "Purview in Practice",
    lessons: [
      L(33, "purview-case-study-enterprise-rollout", "Purview Case Study: Enterprise Rollout", { contentDir: "ch07/33-purview-case-study-enterprise-rollout", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792414163/ltv-microsoft-purview/purview-case-study-enterprise-rollout.mp4", durationLabel: "1 min 36 s" }),
      L(34, "purview-practice-lab", "Purview Practice Lab", { contentDir: "ch07/34-purview-practice-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792414308/ltv-microsoft-purview/purview-practice-lab.mp4", durationLabel: "1 min 17 s" }),
      L(35, "purview-best-practices", "Purview Best Practices", { contentDir: "ch07/35-purview-best-practices", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792414444/ltv-microsoft-purview/purview-best-practices.mp4", durationLabel: "1 min 16 s" }),
    ],
  },
];
