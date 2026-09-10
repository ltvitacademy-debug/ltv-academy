// Career path definitions for the /careers selector and per-path pages.
// Each stage lists course slugs (matching COURSES in lib/courses.ts) in the
// order a student should take them. A stage may instead list pathChoiceSlugs
// when the stage is "pick one of these other paths" rather than a flat
// course sequence (used only by the Principal Data Engineer destination path).

export type PathStage = {
  label: string;
  note?: string;
  courseSlugs?: string[];
  pathChoiceSlugs?: string[];
};

export type CareerPath = {
  slug: string;
  title: string;
  targetJobs: string[];
  description: string;
  salaryRange: string;
  certification?: string;
  isDestination?: boolean; // shown as an advanced destination, not a first choice
  stages: PathStage[];
  destinationNote: string;
};

export const CAREER_PATHS: CareerPath[] = [
  {
    slug: "data-analyst-bi-engineer",
    title: "Data Analyst → BI Engineer",
    targetJobs: ["Data Analyst", "BI Analyst", "Senior BI Analyst", "BI Developer", "BI Engineer"],
    description:
      "This is the most direct way into a data career. You'll learn SQL Server fundamentals, then build real dashboards in Power BI and Tableau, add just enough Python to extend what point-and-click tools can't do, and round it out with the advanced Excel skills that still show up in nearly every analyst job posting. It's the easiest path to a first job in data — and, combined with Analytics Engineering later, a realistic route to senior BI and analytics roles.",
    salaryRange: "$60K–$100K to start · $100K–$160K+ at Senior BI Analyst / BI Engineer",
    certification: "PL-300",
    stages: [
      { label: "Beginner", courseSlugs: ["t-sql-development", "power-bi", "python-for-power-bi"] },
      { label: "Job-Ready", courseSlugs: ["tableau", "advanced-excel-for-data-analysts"] },
      { label: "Advanced", note: "Data Factory, selected sections", courseSlugs: ["data-factory", "git-github-cicd-for-data"] },
    ],
    destinationNote:
      "The pure dashboard-developer route gets harder past this point. Branch into Analytics Engineer → Senior/Staff/Principal Analytics Engineer → Data Architect to keep climbing toward $200K+.",
  },
  {
    slug: "analytics-engineer",
    title: "Analytics Engineer",
    targetJobs: ["Junior Analytics Engineer", "Analytics Engineer", "Senior Analytics Engineer", "Staff / Principal Analytics Engineer"],
    description:
      "Analytics Engineering sits between Data Analyst and Data Engineer, and it's one of the fastest-growing, best-paid corners of the field — most students never hear about it. You'll take the SQL and cloud-warehouse fundamentals from T-SQL and Snowflake and add the piece that actually defines the role: dbt. Version-controlled, tested, documented data models are what separate an Analytics Engineer from someone who just writes ad-hoc SQL.",
    salaryRange: "$80K–$140K as an Analytics Engineer · $140K–$200K+ at Senior, with Staff/Principal regularly clearing $200K",
    stages: [
      { label: "Beginner", courseSlugs: ["t-sql-development", "power-bi", "snowflake"] },
      { label: "Job-Ready", courseSlugs: ["dbt-analytics-engineering", "git-github-cicd-for-data"] },
      { label: "Advanced", courseSlugs: ["data-factory", "airflow"] },
    ],
    destinationNote:
      "Analytics Engineer → Senior Analytics Engineer → Staff/Principal Analytics Engineer → Data/Analytics Architect. Worth calling out on the site explicitly — students hear far less about this path than Data Analyst or Data Engineer.",
  },
  {
    slug: "azure-fabric-data-engineer",
    title: "Azure / Fabric Data Engineer",
    targetJobs: ["Data Engineer", "Azure Data Engineer", "Fabric Data Engineer", "Senior Data Engineer", "Lead Data Engineer", "Principal Data Engineer"],
    description:
      "This is the flagship Data Engineering path, and the one with the most built-out backbone already: four courses that take you from Python and Spark fundamentals all the way through Databricks, Microsoft Fabric, real-time streaming, and production engineering practice, capped by a DP-700 certification track and a full portfolio capstone. Layer on version control, infrastructure as code, and orchestration, and this becomes a complete, senior-ready Azure data engineering skill set.",
    salaryRange: "$80K–$140K as a Data Engineer · $140K–$190K+ at Senior · Lead/Staff/Principal roles regularly post at $200K–$280K+",
    certification: "DP-700 — already built into Data Engineering Career & Capstone's Chapter 2",
    stages: [
      { label: "Beginner", courseSlugs: ["t-sql-development", "data-engineering-foundations"] },
      {
        label: "Job-Ready",
        courseSlugs: [
          "data-factory",
          "azure-databricks-and-delta-lake",
          "microsoft-fabric-and-real-time-analytics",
          "data-engineering-career-and-capstone",
        ],
      },
      {
        label: "Advanced",
        courseSlugs: ["git-github-cicd-for-data", "terraform-bicep-for-data-engineers", "airflow", "kafka-event-streaming"],
      },
    ],
    destinationNote:
      "Data Engineer → Senior → Lead → Staff → Principal Data Engineer → Data/Cloud Architect. This path's backbone already exists end to end — the advanced-stage courses are what turn it into a senior-ready skill set.",
  },
  {
    slug: "databricks-lakehouse-engineer",
    title: "Databricks / Lakehouse Engineer",
    targetJobs: ["Databricks Data Engineer", "Senior Data Engineer", "Lakehouse Engineer", "Lead Data Engineer", "Principal Data Engineer"],
    description:
      "For students who want to go deep on one platform instead of broad across three, this path branches off the core Data Engineering track right after Databricks & Delta Lake. You'll go far past the fundamentals — Unity Catalog at scale, Auto Loader, Lakeflow, and Databricks Workflows — and finish aimed squarely at the DP-750 certification and Lakehouse Engineer/Architect roles.",
    salaryRange: "$90K–$150K as a Databricks Data Engineer · $150K–$190K+ at Senior · Principal Databricks Architect roles currently post $190K–$200K+",
    certification: "DP-750",
    stages: [
      { label: "Beginner", courseSlugs: ["t-sql-development", "data-engineering-foundations"] },
      { label: "Job-Ready", courseSlugs: ["data-factory", "azure-databricks-and-delta-lake"] },
      {
        label: "Advanced",
        courseSlugs: [
          "advanced-databricks-specialization",
          "kafka-event-streaming",
          "airflow",
          "terraform-bicep-for-data-engineers",
          "data-engineering-career-and-capstone",
        ],
      },
    ],
    destinationNote:
      "Databricks Data Engineer → Senior → Lead Data Engineer → Principal Databricks Engineer → Databricks/Lakehouse Architect.",
  },
  {
    slug: "snowflake-data-engineer",
    title: "Snowflake Data / Analytics Engineer",
    targetJobs: ["Snowflake Developer", "Analytics Engineer", "Cloud Data Engineer", "Senior Snowflake Engineer", "Principal Data Engineer"],
    description:
      "Snowflake alone isn't a career — Snowflake plus dbt, Python, and orchestration is. This path treats Snowflake as a genuinely short specialization for students who already know SQL, then immediately builds the modern combination current postings actually ask for: dbt for modeling, Airflow for orchestration, and a BI tool on top.",
    salaryRange: "$90K–$150K as a Snowflake Developer / Cloud Data Engineer · $150K–$200K+ at Senior",
    certification: "SnowPro Core",
    stages: [
      { label: "Beginner", courseSlugs: ["t-sql-development", "snowflake"] },
      { label: "Job-Ready", courseSlugs: ["dbt-analytics-engineering", "data-factory", "power-bi"] },
      { label: "Advanced", courseSlugs: ["airflow", "git-github-cicd-for-data", "terraform-bicep-for-data-engineers"] },
    ],
    destinationNote:
      "SQL Developer → Snowflake Developer → Analytics/Data Engineer → Senior Snowflake Engineer → Lead Data Engineer → Principal Data Engineer → Snowflake/Data Architect — converging into the same ceiling as the other engineering paths.",
  },
  {
    slug: "azure-database-engineer",
    title: "Azure Database Engineer",
    targetJobs: ["SQL Developer", "Azure Database Administrator", "Senior DBA", "Database Engineer", "Principal Database Engineer"],
    description:
      "This is the path for someone who loves SQL Server and wants to go deep on it rather than pivot into Python and Spark all day. Starting from T-SQL, you'll build real Azure SQL administration skills — security, performance tuning, automation, and disaster recovery — toward the DP-300 certification, then round it out with the cloud, scripting, and infrastructure-as-code skills that separate a mid-level DBA from a Principal Database Engineer.",
    salaryRange: "$80K–$130K as an Azure Database Administrator · $130K–$180K+ at Senior DBA / Database Engineer",
    certification: "DP-300 — already the spine of Azure Database Administrator",
    stages: [
      { label: "Beginner", courseSlugs: ["t-sql-development", "azure-fundamentals"] },
      { label: "Job-Ready", courseSlugs: ["azure-database-administrator", "data-factory"] },
      { label: "Advanced", courseSlugs: ["powershell-fundamentals", "terraform-bicep-for-data-engineers", "git-github-cicd-for-data"] },
    ],
    destinationNote:
      "SQL Developer/DBA → Azure DBA → Senior DBA → Database Engineer → Senior Database Engineer → Principal Database Engineer → Database Architect. Even this path needs some cloud and scripting skill to reach the highest levels.",
  },
  {
    slug: "bi-to-data-architect",
    title: "BI → Data Architect",
    targetJobs: ["Data Analyst", "BI Developer", "BI Engineer", "Analytics Engineer", "Senior Analytics Engineer", "Data Architect"],
    description:
      "The longest path in the catalog, and not a beginner's first choice — this is for a Data Analyst or BI Developer who wants to see the whole road ahead. It expands reporting into modeling, modeling into engineering, and engineering into cloud architecture and governance, converging everything else in the catalog into a single Data Architect destination.",
    salaryRange: "Realistic only after years of the progression below — Data Architect and Solutions Architect roles currently post $180K–$250K+",
    isDestination: true,
    stages: [
      { label: "Start", courseSlugs: ["t-sql-development", "power-bi", "tableau"] },
      { label: "Expand", courseSlugs: ["data-factory", "snowflake", "dbt-analytics-engineering", "microsoft-fabric-and-real-time-analytics"] },
      { label: "Converge", courseSlugs: ["azure-databricks-and-delta-lake", "data-engineering-career-and-capstone"] },
    ],
    destinationNote:
      "It starts with Power BI. But $200K was never about the best bar chart in America — it's reporting → modeling → engineering → cloud → architecture, in that order.",
  },
  {
    slug: "principal-data-engineer",
    title: "Principal Data Engineer",
    targetJobs: ["Senior Data Engineer", "Lead Data Engineer", "Staff Data Engineer", "Principal Data Engineer", "Data / Principal Architect"],
    description:
      "This isn't a starting point — it's shown to students as where the other paths lead, not something to enroll in directly. Pick a specialty (Fabric, Databricks, or Snowflake), add the senior-engineering layer nearly every $200K+ posting asks for — Git, dbt, Airflow, Kafka, and infrastructure as code — and the leadership layer most students expect to be missing (system design, architecture trade-offs, requirements gathering) is already built into Data Engineering Career & Capstone's first chapter.",
    salaryRange: "$200K–$290K+ base at Principal Data Engineer, per current postings — genuinely real, but typically requiring 5–10+ years of production experience and technical ownership",
    isDestination: true,
    stages: [
      { label: "Foundation", courseSlugs: ["t-sql-development"] },
      {
        label: "Choose a specialty",
        note: "Pick one",
        pathChoiceSlugs: ["azure-fabric-data-engineer", "databricks-lakehouse-engineer", "snowflake-data-engineer"],
      },
      {
        label: "Senior layer",
        courseSlugs: ["git-github-cicd-for-data", "dbt-analytics-engineering", "airflow", "kafka-event-streaming", "terraform-bicep-for-data-engineers"],
      },
      {
        label: "Leadership layer",
        note: "Already built — not a gap",
        courseSlugs: ["data-engineering-career-and-capstone"],
      },
    ],
    destinationNote:
      "Already further along than it looks: Career & Capstone's System Design chapter (requirements, estimation, architecture trade-offs, case studies) already covers a real slice of the technical-leadership layer these postings ask for.",
  },
];

export const getCareerPath = (slug: string) => CAREER_PATHS.find((p) => p.slug === slug);
