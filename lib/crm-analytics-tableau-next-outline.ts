// The full Salesforce CRM Analytics / Tableau Next course outline. Only
// lessons with a contentDir + videoUrl are playable; everything else
// renders as "in production". Takes the path beyond basic Salesforce
// reporting into the current Salesforce analytics ecosystem — CRM
// Analytics, Data Cloud, Tableau Next, semantic modeling, and enterprise
// governance — the exact combination current Senior Data Analyst postings
// in the Salesforce ecosystem ask for.

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
    title: "Salesforce Data Cloud Fundamentals",
    lessons: [
      L(12, "what-data-cloud-solves", "What Data Cloud Solves"),
      L(13, "data-streams-and-ingestion", "Data Streams & Ingestion"),
      L(14, "identity-resolution", "Identity Resolution"),
      L(15, "calculated-insights", "Calculated Insights"),
      L(16, "segments", "Segments"),
      L(17, "data-cloud-plus-crm-analytics", "Data Cloud + CRM Analytics, Together"),
    ],
  },
  {
    n: 4,
    title: "Tableau Next Fundamentals",
    lessons: [
      L(18, "what-tableau-next-is", "What Tableau Next Is"),
      L(19, "tableau-next-vs-tableau-desktop", "Tableau Next vs. Tableau Desktop"),
      L(20, "connecting-tableau-next-to-salesforce-data", "Connecting Tableau Next to Salesforce Data"),
      L(21, "ai-assisted-analysis-in-tableau-next", "AI-Assisted Analysis in Tableau Next"),
      L(22, "publishing-in-tableau-next", "Publishing in Tableau Next"),
      L(23, "choosing-tableau-next-vs-desktop", "Choosing Tableau Next vs. Tableau Desktop"),
    ],
  },
  {
    n: 5,
    title: "Semantic Modeling & Metrics",
    lessons: [
      L(24, "what-is-a-semantic-layer", "What Is a Semantic Layer?"),
      L(25, "defining-metrics-and-kpis-centrally", "Defining Metrics & KPIs Centrally"),
      L(26, "metric-governance", "Metric Governance"),
      L(27, "semantic-modeling-in-the-salesforce-ecosystem", "Semantic Modeling in the Salesforce Ecosystem"),
      L(28, "avoiding-metric-drift", "Avoiding Metric Drift"),
    ],
  },
  {
    n: 6,
    title: "Salesforce Data Integration",
    lessons: [
      L(29, "integrating-salesforce-with-a-warehouse", "Integrating Salesforce With a Warehouse"),
      L(30, "salesforce-plus-snowflake", "Salesforce + Snowflake"),
      L(31, "salesforce-plus-dbt", "Salesforce + dbt"),
      L(32, "api-based-integration-basics", "API-Based Integration Basics"),
      L(33, "keeping-crm-and-warehouse-data-in-sync", "Keeping CRM & Warehouse Data in Sync"),
    ],
  },
  {
    n: 7,
    title: "Enterprise Analytics Security & Governance",
    lessons: [
      L(34, "row-level-security-in-crm-analytics", "Row-Level Security in CRM Analytics"),
      L(35, "sharing-inheritance-vs-custom-security-predicates", "Sharing Inheritance vs. Custom Security Predicates"),
      L(36, "governance-for-enterprise-analytics", "Governance for Enterprise Analytics"),
      L(37, "auditing-analytics-access", "Auditing Analytics Access"),
      L(38, "data-governance-for-crm-data", "Data Governance for CRM Data"),
    ],
  },
  {
    n: 8,
    title: "Capstone",
    lessons: [
      L(39, "capstone-kickoff", "Capstone Kickoff"),
      L(40, "capstone-build-a-crm-analytics-app", "Capstone: Build a CRM Analytics App"),
      L(41, "capstone-model-a-metric-layer", "Capstone: Model a Metric Layer"),
      L(42, "capstone-connect-data-cloud", "Capstone: Connect Data Cloud"),
      L(43, "capstone-secure-it-properly", "Capstone: Secure It Properly"),
      L(44, "capstone-wrap-up", "Capstone: Wrap-Up & Portfolio Presentation"),
    ],
  },
];
