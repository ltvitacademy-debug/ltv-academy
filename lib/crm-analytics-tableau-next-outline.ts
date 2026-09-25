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
      L(1, "crm-analytics-overview", "CRM Analytics, Overview", { contentDir: "ch01/01-crm-analytics-overview" }),
      L(2, "salesforce-data-cloud-fundamentals", "Salesforce Data Cloud Fundamentals", { contentDir: "ch01/02-salesforce-data-cloud-fundamentals" }),
      L(3, "tableau-next-overview", "Tableau Next, Overview", { contentDir: "ch01/03-tableau-next-overview" }),
      L(4, "how-the-pieces-fit-together", "How the Pieces Fit Together", { contentDir: "ch01/04-how-the-pieces-fit-together" }),
      L(5, "choosing-the-right-tool", "Choosing the Right Tool for a Given Analytics Need", { contentDir: "ch01/05-choosing-the-right-tool" }),
    ],
  },
  {
    n: 2,
    title: "CRM Analytics Fundamentals",
    lessons: [
      L(6, "crm-analytics-architecture", "CRM Analytics Architecture", { contentDir: "ch02/06-crm-analytics-architecture" }),
      L(7, "datasets-and-dataflows", "Datasets & Dataflows", { contentDir: "ch02/07-datasets-and-dataflows" }),
      L(8, "recipes", "Recipes", { contentDir: "ch02/08-recipes" }),
      L(9, "crm-analytics-dashboards", "CRM Analytics Dashboards", { contentDir: "ch02/09-crm-analytics-dashboards" }),
      L(10, "lenses-and-exploration", "Lenses & Exploration", { contentDir: "ch02/10-lenses-and-exploration" }),
      L(11, "crm-analytics-vs-native-reports", "CRM Analytics vs. Native Reports", { contentDir: "ch02/11-crm-analytics-vs-native-reports" }),
    ],
  },
  {
    n: 3,
    title: "CRM Analytics Development Skills",
    lessons: [
      L(12, "saql-fundamentals", "SAQL Fundamentals: the CRM Analytics Query Language", { contentDir: "ch03/12-saql-fundamentals" }),
      L(13, "saql-vs-soql-vs-sql", "SAQL vs. SOQL vs. SQL", { contentDir: "ch03/13-saql-vs-soql-vs-sql" }),
      L(14, "bindings", "Bindings", { contentDir: "ch03/14-bindings" }),
      L(15, "dashboard-interactions-and-actions", "Dashboard Interactions & Actions", { contentDir: "ch03/15-dashboard-interactions-and-actions" }),
      L(16, "performance-tuning-for-crm-analytics", "Performance Tuning for CRM Analytics", { contentDir: "ch03/16-performance-tuning-for-crm-analytics" }),
      L(17, "deploying-crm-analytics-apps-and-templates", "Deploying CRM Analytics Apps & Templates", { contentDir: "ch03/17-deploying-crm-analytics-apps-and-templates" }),
    ],
  },
  {
    n: 4,
    title: "Salesforce Data Cloud Fundamentals",
    lessons: [
      L(18, "what-data-cloud-solves", "What Data Cloud Solves", { contentDir: "ch04/18-what-data-cloud-solves" }),
      L(19, "data-streams-and-ingestion", "Data Streams & Ingestion", { contentDir: "ch04/19-data-streams-and-ingestion" }),
      L(20, "identity-resolution", "Identity Resolution", { contentDir: "ch04/20-identity-resolution" }),
      L(21, "calculated-insights", "Calculated Insights", { contentDir: "ch04/21-calculated-insights" }),
      L(22, "segments", "Segments", { contentDir: "ch04/22-segments" }),
      L(23, "data-cloud-plus-crm-analytics", "Data Cloud + CRM Analytics, Together", { contentDir: "ch04/23-data-cloud-plus-crm-analytics" }),
    ],
  },
  {
    n: 5,
    title: "Tableau Next Fundamentals",
    lessons: [
      L(24, "what-tableau-next-is", "What Tableau Next Is", { contentDir: "ch05/24-what-tableau-next-is" }),
      L(25, "tableau-next-vs-tableau-desktop", "Tableau Next vs. Tableau Desktop", { contentDir: "ch05/25-tableau-next-vs-tableau-desktop" }),
      L(26, "connecting-tableau-next-to-salesforce-data", "Connecting Tableau Next to Salesforce Data", { contentDir: "ch05/26-connecting-tableau-next-to-salesforce-data" }),
      L(27, "ai-assisted-analysis-in-tableau-next", "AI-Assisted Analysis in Tableau Next", { contentDir: "ch05/27-ai-assisted-analysis-in-tableau-next" }),
      L(28, "publishing-in-tableau-next", "Publishing in Tableau Next", { contentDir: "ch05/28-publishing-in-tableau-next" }),
      L(29, "choosing-tableau-next-vs-desktop", "Choosing Tableau Next vs. Tableau Desktop", { contentDir: "ch05/29-choosing-tableau-next-vs-desktop" }),
    ],
  },
  {
    n: 6,
    title: "Semantic Modeling & Metrics",
    lessons: [
      L(30, "what-is-a-semantic-layer", "What Is a Semantic Layer?", { contentDir: "ch06/30-what-is-a-semantic-layer" }),
      L(31, "defining-metrics-and-kpis-centrally", "Defining Metrics & KPIs Centrally", { contentDir: "ch06/31-defining-metrics-and-kpis-centrally" }),
      L(32, "metric-governance", "Metric Governance", { contentDir: "ch06/32-metric-governance" }),
      L(33, "semantic-modeling-in-the-salesforce-ecosystem", "Semantic Modeling in the Salesforce Ecosystem", { contentDir: "ch06/33-semantic-modeling-in-the-salesforce-ecosystem" }),
      L(34, "avoiding-metric-drift", "Avoiding Metric Drift", { contentDir: "ch06/34-avoiding-metric-drift" }),
    ],
  },
  {
    n: 7,
    title: "Salesforce Data Integration",
    lessons: [
      L(35, "integrating-salesforce-with-a-warehouse", "Integrating Salesforce With a Warehouse", { contentDir: "ch07/35-integrating-salesforce-with-a-warehouse" }),
      L(36, "salesforce-plus-snowflake", "Salesforce + Snowflake", { contentDir: "ch07/36-salesforce-plus-snowflake" }),
      L(37, "salesforce-plus-dbt", "Salesforce + dbt", { contentDir: "ch07/37-salesforce-plus-dbt" }),
      L(38, "api-based-integration-basics", "API-Based Integration Basics", { contentDir: "ch07/38-api-based-integration-basics" }),
      L(39, "external-data-in-crm-analytics", "External Data in CRM Analytics", { contentDir: "ch07/39-external-data-in-crm-analytics" }),
      L(40, "keeping-crm-and-warehouse-data-in-sync", "Keeping CRM & Warehouse Data in Sync", { contentDir: "ch07/40-keeping-crm-and-warehouse-data-in-sync" }),
    ],
  },
  {
    n: 8,
    title: "Enterprise Analytics Security & Governance",
    lessons: [
      L(41, "row-level-security-in-crm-analytics", "Row-Level Security in CRM Analytics", { contentDir: "ch08/41-row-level-security-in-crm-analytics" }),
      L(42, "sharing-inheritance-vs-custom-security-predicates", "Sharing Inheritance vs. Custom Security Predicates", { contentDir: "ch08/42-sharing-inheritance-vs-custom-security-predicates" }),
      L(43, "governance-for-enterprise-analytics", "Governance for Enterprise Analytics", { contentDir: "ch08/43-governance-for-enterprise-analytics" }),
      L(44, "auditing-analytics-access", "Auditing Analytics Access", { contentDir: "ch08/44-auditing-analytics-access" }),
      L(45, "data-governance-for-crm-data", "Data Governance for CRM Data", { contentDir: "ch08/45-data-governance-for-crm-data" }),
    ],
  },
  {
    n: 9,
    title: "Capstone",
    lessons: [
      L(46, "capstone-kickoff", "Capstone Kickoff", { contentDir: "ch09/46-capstone-kickoff" }),
      L(47, "capstone-build-a-crm-analytics-app", "Capstone: Build a CRM Analytics App", { contentDir: "ch09/47-capstone-build-a-crm-analytics-app" }),
      L(48, "capstone-model-a-metric-layer", "Capstone: Model a Metric Layer", { contentDir: "ch09/48-capstone-model-a-metric-layer" }),
      L(49, "capstone-connect-data-cloud", "Capstone: Connect Data Cloud", { contentDir: "ch09/49-capstone-connect-data-cloud" }),
      L(50, "capstone-secure-it-properly", "Capstone: Secure It Properly", { contentDir: "ch09/50-capstone-secure-it-properly" }),
      L(51, "capstone-wrap-up", "Capstone: Wrap-Up & Portfolio Presentation", { contentDir: "ch09/51-capstone-wrap-up" }),
    ],
  },
];
