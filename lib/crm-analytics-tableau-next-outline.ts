// The full Salesforce CRM Analytics / Tableau Next course outline. Only
// lessons with a contentDir + videoUrl are playable; everything else
// renders as "in production". Takes the path beyond basic Salesforce
// reporting into the current Salesforce analytics ecosystem — CRM
// Analytics, Data Cloud, Tableau Next, semantic modeling, and enterprise
// governance — the exact combination current Senior Data Analyst postings
// in the Salesforce ecosystem ask for. This is also the course that makes
// "CRM Analytics Developer" a legitimate technical specialization, not
// just a Salesforce Data Analyst who learned one more tool — Chapter 3
// exists specifically for that jump in responsibility: a Data Analyst
// asks "what happened last quarter?"; a CRM Analytics Developer asks "how
// do I build the system that lets 500 people answer that themselves?"

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/crm-analytics-tableau-next/
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

export const CRM_ANALYTICS_TABLEAU_NEXT_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "The Modern Salesforce Analytics Ecosystem",
    lessons: [
      L(1, "crm-analytics-overview", "CRM Analytics, Overview", { contentDir: "ch01/01-crm-analytics-overview", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792506178/ltv-crm-analytics-tableau-next/crm-analytics-overview.mp4", durationLabel: "1 min 42 s" }),
      L(2, "salesforce-data-cloud-fundamentals", "Salesforce Data Cloud Fundamentals", { contentDir: "ch01/02-salesforce-data-cloud-fundamentals", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792506914/ltv-crm-analytics-tableau-next/salesforce-data-cloud-fundamentals.mp4", durationLabel: "1 min 43 s" }),
      L(3, "tableau-next-overview", "Tableau Next, Overview", { contentDir: "ch01/03-tableau-next-overview", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792507682/ltv-crm-analytics-tableau-next/tableau-next-overview.mp4", durationLabel: "1 min 43 s" }),
      L(4, "how-the-pieces-fit-together", "How the Pieces Fit Together", { contentDir: "ch01/04-how-the-pieces-fit-together", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792508539/ltv-crm-analytics-tableau-next/how-the-pieces-fit-together.mp4", durationLabel: "1 min 53 s" }),
      L(5, "choosing-the-right-tool", "Choosing the Right Tool for a Given Analytics Need", { contentDir: "ch01/05-choosing-the-right-tool", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792509209/ltv-crm-analytics-tableau-next/choosing-the-right-tool.mp4", durationLabel: "1 min 46 s" }),
    ],
  },
  {
    n: 2,
    title: "CRM Analytics Fundamentals",
    lessons: [
      L(6, "crm-analytics-architecture", "CRM Analytics Architecture", { contentDir: "ch02/06-crm-analytics-architecture", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792509956/ltv-crm-analytics-tableau-next/crm-analytics-architecture.mp4", durationLabel: "1 min 39 s" }),
      L(7, "datasets-and-dataflows", "Datasets & Dataflows", { contentDir: "ch02/07-datasets-and-dataflows", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792510661/ltv-crm-analytics-tableau-next/datasets-and-dataflows.mp4", durationLabel: "1 min 40 s" }),
      L(8, "recipes", "Recipes", { contentDir: "ch02/08-recipes", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792511297/ltv-crm-analytics-tableau-next/recipes.mp4", durationLabel: "1 min 36 s" }),
      L(9, "crm-analytics-dashboards", "CRM Analytics Dashboards", { contentDir: "ch02/09-crm-analytics-dashboards", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792513528/ltv-crm-analytics-tableau-next/crm-analytics-dashboards.mp4", durationLabel: "1 min 17 s" }),
      L(10, "lenses-and-exploration", "Lenses & Exploration", { contentDir: "ch02/10-lenses-and-exploration", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792512205/ltv-crm-analytics-tableau-next/lenses-and-exploration.mp4", durationLabel: "1 min 47 s" }),
      L(11, "crm-analytics-vs-native-reports", "CRM Analytics vs. Native Reports", { contentDir: "ch02/11-crm-analytics-vs-native-reports", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792512808/ltv-crm-analytics-tableau-next/crm-analytics-vs-native-reports.mp4", durationLabel: "1 min 38 s" }),
    ],
  },
  {
    n: 3,
    title: "CRM Analytics Development Skills",
    lessons: [
      L(12, "saql-fundamentals", "SAQL Fundamentals: the CRM Analytics Query Language", { contentDir: "ch03/12-saql-fundamentals", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792514255/ltv-crm-analytics-tableau-next/saql-fundamentals.mp4", durationLabel: "1 min 34 s" }),
      L(13, "saql-vs-soql-vs-sql", "SAQL vs. SOQL vs. SQL", { contentDir: "ch03/13-saql-vs-soql-vs-sql", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792514861/ltv-crm-analytics-tableau-next/saql-vs-soql-vs-sql.mp4", durationLabel: "1 min 32 s" }),
      L(14, "bindings", "Bindings", { contentDir: "ch03/14-bindings", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792515522/ltv-crm-analytics-tableau-next/bindings.mp4", durationLabel: "1 min 33 s" }),
      L(15, "dashboard-interactions-and-actions", "Dashboard Interactions & Actions", { contentDir: "ch03/15-dashboard-interactions-and-actions", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792516292/ltv-crm-analytics-tableau-next/dashboard-interactions-and-actions.mp4", durationLabel: "1 min 48 s" }),
      L(16, "performance-tuning-for-crm-analytics", "Performance Tuning for CRM Analytics", { contentDir: "ch03/16-performance-tuning-for-crm-analytics", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792516909/ltv-crm-analytics-tableau-next/performance-tuning-for-crm-analytics.mp4", durationLabel: "1 min 35 s" }),
      L(17, "deploying-crm-analytics-apps-and-templates", "Deploying CRM Analytics Apps & Templates", { contentDir: "ch03/17-deploying-crm-analytics-apps-and-templates", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792517617/ltv-crm-analytics-tableau-next/deploying-crm-analytics-apps-and-templates.mp4", durationLabel: "1 min 41 s" }),
    ],
  },
  {
    n: 4,
    title: "Salesforce Data Cloud Fundamentals",
    lessons: [
      L(18, "what-data-cloud-solves", "What Data Cloud Solves", { contentDir: "ch04/18-what-data-cloud-solves", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792518658/ltv-crm-analytics-tableau-next/what-data-cloud-solves.mp4", durationLabel: "1 min 49 s" }),
      L(19, "data-streams-and-ingestion", "Data Streams & Ingestion", { contentDir: "ch04/19-data-streams-and-ingestion", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792519319/ltv-crm-analytics-tableau-next/data-streams-and-ingestion.mp4", durationLabel: "1 min 31 s" }),
      L(20, "identity-resolution", "Identity Resolution", { contentDir: "ch04/20-identity-resolution", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792519982/ltv-crm-analytics-tableau-next/identity-resolution.mp4", durationLabel: "1 min 33 s" }),
      L(21, "calculated-insights", "Calculated Insights", { contentDir: "ch04/21-calculated-insights", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792520607/ltv-crm-analytics-tableau-next/calculated-insights.mp4", durationLabel: "1 min 32 s" }),
      L(22, "segments", "Segments", { contentDir: "ch04/22-segments", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792521224/ltv-crm-analytics-tableau-next/segments.mp4", durationLabel: "1 min 27 s" }),
      L(23, "data-cloud-plus-crm-analytics", "Data Cloud + CRM Analytics, Together", { contentDir: "ch04/23-data-cloud-plus-crm-analytics", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792521843/ltv-crm-analytics-tableau-next/data-cloud-plus-crm-analytics.mp4", durationLabel: "1 min 29 s" }),
    ],
  },
  {
    n: 5,
    title: "Tableau Next Fundamentals",
    lessons: [
      L(24, "what-tableau-next-is", "What Tableau Next Is", { contentDir: "ch05/24-what-tableau-next-is", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792522672/ltv-crm-analytics-tableau-next/what-tableau-next-is.mp4", durationLabel: "1 min 25 s" }),
      L(25, "tableau-next-vs-tableau-desktop", "Tableau Next vs. Tableau Desktop", { contentDir: "ch05/25-tableau-next-vs-tableau-desktop", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792523478/ltv-crm-analytics-tableau-next/tableau-next-vs-tableau-desktop.mp4", durationLabel: "1 min 52 s" }),
      L(26, "connecting-tableau-next-to-salesforce-data", "Connecting Tableau Next to Salesforce Data", { contentDir: "ch05/26-connecting-tableau-next-to-salesforce-data", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792524298/ltv-crm-analytics-tableau-next/connecting-tableau-next-to-salesforce-data.mp4", durationLabel: "1 min 59 s" }),
      L(27, "ai-assisted-analysis-in-tableau-next", "AI-Assisted Analysis in Tableau Next", { contentDir: "ch05/27-ai-assisted-analysis-in-tableau-next", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792525029/ltv-crm-analytics-tableau-next/ai-assisted-analysis-in-tableau-next.mp4", durationLabel: "1 min 48 s" }),
      L(28, "publishing-in-tableau-next", "Publishing in Tableau Next", { contentDir: "ch05/28-publishing-in-tableau-next", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792525649/ltv-crm-analytics-tableau-next/publishing-in-tableau-next.mp4", durationLabel: "1 min 36 s" }),
      L(29, "choosing-tableau-next-vs-desktop", "Choosing Tableau Next vs. Tableau Desktop", { contentDir: "ch05/29-choosing-tableau-next-vs-desktop", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792526250/ltv-crm-analytics-tableau-next/choosing-tableau-next-vs-desktop.mp4", durationLabel: "1 min 34 s" }),
    ],
  },
  {
    n: 6,
    title: "Semantic Modeling & Metrics",
    lessons: [
      L(30, "what-is-a-semantic-layer", "What Is a Semantic Layer?", { contentDir: "ch06/30-what-is-a-semantic-layer", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792527456/ltv-crm-analytics-tableau-next/what-is-a-semantic-layer.mp4", durationLabel: "1 min 53 s" }),
      L(31, "defining-metrics-and-kpis-centrally", "Defining Metrics & KPIs Centrally", { contentDir: "ch06/31-defining-metrics-and-kpis-centrally", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792528129/ltv-crm-analytics-tableau-next/defining-metrics-and-kpis-centrally.mp4", durationLabel: "1 min 45 s" }),
      L(32, "metric-governance", "Metric Governance", { contentDir: "ch06/32-metric-governance", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792528843/ltv-crm-analytics-tableau-next/metric-governance.mp4", durationLabel: "1 min 47 s" }),
      L(33, "semantic-modeling-in-the-salesforce-ecosystem", "Semantic Modeling in the Salesforce Ecosystem", { contentDir: "ch06/33-semantic-modeling-in-the-salesforce-ecosystem", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792529604/ltv-crm-analytics-tableau-next/semantic-modeling-in-the-salesforce-ecosystem.mp4", durationLabel: "1 min 54 s" }),
      L(34, "avoiding-metric-drift", "Avoiding Metric Drift", { contentDir: "ch06/34-avoiding-metric-drift", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792530293/ltv-crm-analytics-tableau-next/avoiding-metric-drift.mp4", durationLabel: "1 min 48 s" }),
    ],
  },
  {
    n: 7,
    title: "Salesforce Data Integration",
    lessons: [
      L(35, "integrating-salesforce-with-a-warehouse", "Integrating Salesforce With a Warehouse", { contentDir: "ch07/35-integrating-salesforce-with-a-warehouse", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792600883/ltv-crm-analytics-tableau-next/integrating-salesforce-with-a-warehouse.mp4", durationLabel: "1 min 54 s" }),
      L(36, "salesforce-plus-snowflake", "Salesforce + Snowflake", { contentDir: "ch07/36-salesforce-plus-snowflake", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792532392/ltv-crm-analytics-tableau-next/salesforce-plus-snowflake.mp4", durationLabel: "1 min 58 s" }),
      L(37, "salesforce-plus-dbt", "Salesforce + dbt", { contentDir: "ch07/37-salesforce-plus-dbt", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792532833/ltv-crm-analytics-tableau-next/salesforce-plus-dbt.mp4", durationLabel: "1 min 42 s" }),
      L(38, "api-based-integration-basics", "API-Based Integration Basics", { contentDir: "ch07/38-api-based-integration-basics", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792533212/ltv-crm-analytics-tableau-next/api-based-integration-basics.mp4", durationLabel: "1 min 55 s" }),
      L(39, "external-data-in-crm-analytics", "External Data in CRM Analytics", { contentDir: "ch07/39-external-data-in-crm-analytics", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792533511/ltv-crm-analytics-tableau-next/external-data-in-crm-analytics.mp4", durationLabel: "1 min 44 s" }),
      L(40, "keeping-crm-and-warehouse-data-in-sync", "Keeping CRM & Warehouse Data in Sync", { contentDir: "ch07/40-keeping-crm-and-warehouse-data-in-sync", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792533671/ltv-crm-analytics-tableau-next/keeping-crm-and-warehouse-data-in-sync.mp4", durationLabel: "1 min 43 s" }),
    ],
  },
  {
    n: 8,
    title: "Enterprise Analytics Security & Governance",
    lessons: [
      L(41, "row-level-security-in-crm-analytics", "Row-Level Security in CRM Analytics", { contentDir: "ch08/41-row-level-security-in-crm-analytics", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792601562/ltv-crm-analytics-tableau-next/row-level-security-in-crm-analytics.mp4", durationLabel: "1 min 47 s" }),
      L(42, "sharing-inheritance-vs-custom-security-predicates", "Sharing Inheritance vs. Custom Security Predicates", { contentDir: "ch08/42-sharing-inheritance-vs-custom-security-predicates", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792601964/ltv-crm-analytics-tableau-next/sharing-inheritance-vs-custom-security-predicates.mp4", durationLabel: "1 min 42 s" }),
      L(43, "governance-for-enterprise-analytics", "Governance for Enterprise Analytics", { contentDir: "ch08/43-governance-for-enterprise-analytics", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792602455/ltv-crm-analytics-tableau-next/governance-for-enterprise-analytics.mp4", durationLabel: "1 min 50 s" }),
      L(44, "auditing-analytics-access", "Auditing Analytics Access", { contentDir: "ch08/44-auditing-analytics-access", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792602916/ltv-crm-analytics-tableau-next/auditing-analytics-access.mp4", durationLabel: "1 min 41 s" }),
      L(45, "data-governance-for-crm-data", "Data Governance for CRM Data", { contentDir: "ch08/45-data-governance-for-crm-data", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792603417/ltv-crm-analytics-tableau-next/data-governance-for-crm-data.mp4", durationLabel: "1 min 51 s" }),
    ],
  },
  {
    n: 9,
    title: "Capstone",
    lessons: [
      L(46, "capstone-kickoff", "Capstone Kickoff", { contentDir: "ch09/46-capstone-kickoff", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792604292/ltv-crm-analytics-tableau-next/capstone-kickoff.mp4", durationLabel: "2 min 33 s" }),
      L(47, "capstone-build-a-crm-analytics-app", "Capstone: Build a CRM Analytics App", { contentDir: "ch09/47-capstone-build-a-crm-analytics-app", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792604983/ltv-crm-analytics-tableau-next/capstone-build-a-crm-analytics-app.mp4", durationLabel: "2 min 24 s" }),
      L(48, "capstone-model-a-metric-layer", "Capstone: Model a Metric Layer", { contentDir: "ch09/48-capstone-model-a-metric-layer", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792605656/ltv-crm-analytics-tableau-next/capstone-model-a-metric-layer.mp4", durationLabel: "2 min 25 s" }),
      L(49, "capstone-connect-data-cloud", "Capstone: Connect Data Cloud", { contentDir: "ch09/49-capstone-connect-data-cloud", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792606427/ltv-crm-analytics-tableau-next/capstone-connect-data-cloud.mp4", durationLabel: "2 min 38 s" }),
      L(50, "capstone-secure-it-properly", "Capstone: Secure It Properly", { contentDir: "ch09/50-capstone-secure-it-properly", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792607167/ltv-crm-analytics-tableau-next/capstone-secure-it-properly.mp4", durationLabel: "2 min 42 s" }),
      L(51, "capstone-wrap-up", "Capstone: Wrap-Up & Portfolio Presentation", { contentDir: "ch09/51-capstone-wrap-up", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792607875/ltv-crm-analytics-tableau-next/capstone-wrap-up.mp4", durationLabel: "2 min 36 s" }),
    ],
  },
];
