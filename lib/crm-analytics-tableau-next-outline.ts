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
      L(1, "crm-analytics-overview", "CRM Analytics, Overview"),
      L(2, "salesforce-data-cloud-fundamentals", "Salesforce Data Cloud Fundamentals"),
      L(3, "tableau-next-overview", "Tableau Next, Overview"),
      L(4, "how-the-pieces-fit-together", "How the Pieces Fit Together"),
      L(5, "choosing-the-right-tool", "Choosing the Right Tool for a Given Analytics Need"),
    ],
  },
  {
    n: 2,
    title: "CRM Analytics Fundamentals",
    lessons: [
      L(6, "crm-analytics-architecture", "CRM Analytics Architecture"),
      L(7, "datasets-and-dataflows", "Datasets & Dataflows"),
      L(8, "recipes", "Recipes"),
      L(9, "crm-analytics-dashboards", "CRM Analytics Dashboards"),
      L(10, "lenses-and-exploration", "Lenses & Exploration"),
      L(11, "crm-analytics-vs-native-reports", "CRM Analytics vs. Native Reports"),
    ],
  },
  {
    n: 3,
    title: "CRM Analytics Development Skills",
    lessons: [
      L(12, "saql-fundamentals", "SAQL Fundamentals: the CRM Analytics Query Language"),
      L(13, "saql-vs-soql-vs-sql", "SAQL vs. SOQL vs. SQL"),
      L(14, "bindings", "Bindings"),
      L(15, "dashboard-interactions-and-actions", "Dashboard Interactions & Actions"),
      L(16, "performance-tuning-for-crm-analytics", "Performance Tuning for CRM Analytics"),
      L(17, "deploying-crm-analytics-apps-and-templates", "Deploying CRM Analytics Apps & Templates"),
    ],
  },
  {
    n: 4,
    title: "Salesforce Data Cloud Fundamentals",
    lessons: [
      L(18, "what-data-cloud-solves", "What Data Cloud Solves"),
      L(19, "data-streams-and-ingestion", "Data Streams & Ingestion"),
      L(20, "identity-resolution", "Identity Resolution"),
      L(21, "calculated-insights", "Calculated Insights"),
      L(22, "segments", "Segments"),
      L(23, "data-cloud-plus-crm-analytics", "Data Cloud + CRM Analytics, Together"),
    ],
  },
  {
    n: 5,
    title: "Tableau Next Fundamentals",
    lessons: [
      L(24, "what-tableau-next-is", "What Tableau Next Is"),
      L(25, "tableau-next-vs-tableau-desktop", "Tableau Next vs. Tableau Desktop"),
      L(26, "connecting-tableau-next-to-salesforce-data", "Connecting Tableau Next to Salesforce Data"),
      L(27, "ai-assisted-analysis-in-tableau-next", "AI-Assisted Analysis in Tableau Next"),
      L(28, "publishing-in-tableau-next", "Publishing in Tableau Next"),
      L(29, "choosing-tableau-next-vs-desktop", "Choosing Tableau Next vs. Tableau Desktop"),
    ],
  },
  {
    n: 6,
    title: "Semantic Modeling & Metrics",
    lessons: [
      L(30, "what-is-a-semantic-layer", "What Is a Semantic Layer?"),
      L(31, "defining-metrics-and-kpis-centrally", "Defining Metrics & KPIs Centrally"),
      L(32, "metric-governance", "Metric Governance"),
      L(33, "semantic-modeling-in-the-salesforce-ecosystem", "Semantic Modeling in the Salesforce Ecosystem"),
      L(34, "avoiding-metric-drift", "Avoiding Metric Drift"),
    ],
  },
  {
    n: 7,
    title: "Salesforce Data Integration",
    lessons: [
      L(35, "integrating-salesforce-with-a-warehouse", "Integrating Salesforce With a Warehouse"),
      L(36, "salesforce-plus-snowflake", "Salesforce + Snowflake"),
      L(37, "salesforce-plus-dbt", "Salesforce + dbt"),
      L(38, "api-based-integration-basics", "API-Based Integration Basics"),
      L(39, "external-data-in-crm-analytics", "External Data in CRM Analytics"),
      L(40, "keeping-crm-and-warehouse-data-in-sync", "Keeping CRM & Warehouse Data in Sync"),
    ],
  },
  {
    n: 8,
    title: "Enterprise Analytics Security & Governance",
    lessons: [
      L(41, "row-level-security-in-crm-analytics", "Row-Level Security in CRM Analytics"),
      L(42, "sharing-inheritance-vs-custom-security-predicates", "Sharing Inheritance vs. Custom Security Predicates"),
      L(43, "governance-for-enterprise-analytics", "Governance for Enterprise Analytics"),
      L(44, "auditing-analytics-access", "Auditing Analytics Access"),
      L(45, "data-governance-for-crm-data", "Data Governance for CRM Data"),
    ],
  },
  {
    n: 9,
    title: "Capstone",
    lessons: [
      L(46, "capstone-kickoff", "Capstone Kickoff"),
      L(47, "capstone-build-a-crm-analytics-app", "Capstone: Build a CRM Analytics App"),
      L(48, "capstone-model-a-metric-layer", "Capstone: Model a Metric Layer"),
      L(49, "capstone-connect-data-cloud", "Capstone: Connect Data Cloud"),
      L(50, "capstone-secure-it-properly", "Capstone: Secure It Properly"),
      L(51, "capstone-wrap-up", "Capstone: Wrap-Up & Portfolio Presentation"),
    ],
  },
];
