import type { PathResumes } from "../sampleResumeTypes";

const CONTACT = ["Atlanta, GA", "(404) 555-0182", "john.doe@example.com", "linkedin.com/in/johndoe-biexample"];

export const RESUMES: PathResumes = {
  "bi-developer": {
    levelLabel: "BI Developer",
    name: "John Doe",
    contact: CONTACT,
    summary:
      "BI Developer trained in T-SQL, Power BI, and Tableau — the Start stage of the BI → Data Architect road map, the " +
      "longest program in the catalog. Built a published, row-level-secured Power BI dashboard on a real star-schema " +
      "data model against AdventureWorksDW2014, plus three portfolio-grade Tableau dashboards covering executive " +
      "reporting, customer segmentation, and enterprise performance. Bringing that reporting-and-dashboarding " +
      "foundation to a Data Analyst, BI Developer, or BI Engineer role.",
    skills: [
      "T-SQL Querying & Database Design (Joins, Subqueries, CTEs)",
      "Window & Ranking Functions (ROW_NUMBER, RANK, DENSE_RANK, NTILE)",
      "Stored Procedures, Transactions & Error Handling (TRY/CATCH)",
      "T-SQL Performance Tuning (Execution Plans, Indexing)",
      "Database Normalization & Dimensional Modeling (Star Schema, SCD)",
      "Power BI Data Modeling & Power Query",
      "DAX Measures & Time Intelligence (CALCULATE, Filter Context, YTD/MTD/QTD)",
      "Power BI Report Design (Drill-Through, Bookmarks, Row-Level Security)",
      "Power BI Service Publishing & Scheduled Refresh",
      "Tableau Data Connection & Preparation",
      "Tableau Calculated Fields & Table Calculations",
      "Tableau Level of Detail (LOD) Expressions",
      "Tableau Parameters, Groups, Sets & Hierarchies",
      "Tableau Dashboard Actions (Filter, Highlight, URL, Parameter)",
      "Tableau Server, Cloud & Public Publishing",
      "Dashboard Design & Storytelling",
      "Requirements Gathering & Stakeholder Communication",
    ],
    tools: "SSMS, Power BI Desktop & Service, Tableau Desktop & Public",
    sections: [
      {
        heading: "Training",
        entries: [
          {
            left: "Lifting the Veil IT Academy — Apprenticeship Program",
            right: "Jan 2026 – Jun 2026",
            sub: "BI → Data Architect Destination — Start Stage (BI Developer) · Atlanta, GA",
            bullets: [
              "Completed the Start stage of the BI → Data Architect destination — the longest road map in the catalog — covering T-SQL, Power BI, and Tableau as the reporting foundation everything later in the destination builds on.",
              "Wrote T-SQL ranging from joins (inner, outer, cross, self) and GROUP BY/HAVING aggregation to advanced patterns — correlated and multi-value subqueries, Common Table Expressions including recursive CTEs, window and ranking functions (ROW_NUMBER, RANK, DENSE_RANK, NTILE, OVER/PARTITION BY), and parameterized stored procedures with TRY/CATCH error handling and explicit transactions — then applied database normalization (1NF–3NF) and dimensional modeling (star schema, fact and dimension tables, slowly changing dimensions) and tuned query performance by reading execution plans and choosing clustered vs. nonclustered indexes.",
              "Built a complete Power BI capstone for a simulated company, Adventure Works Cycles: turned a vague stakeholder ask into four written requirements, imported AdventureWorksDW2014's FactInternetSales, FactResellerSales, and date/product/territory dimension tables, built a star-schema data model with Power Query transformations, and wrote DAX measures (CALCULATE, filter context, YTD/MTD/QTD time intelligence) covering regional sales performance, product-line profitability, reseller fulfillment, and year-over-year trend — then published the finished report to the Power BI Service as a row-level-secured app with a scheduled refresh and checked it back against the original four requirements.",
              "Worked through Tableau beginner to advanced across connecting and preparing data, visualization fundamentals, calculated fields and table calculations, data modeling, maps, groups/sets/bins/hierarchies, parameters, and Level of Detail (LOD) expressions, then built three portfolio-grade dashboards against the Sample Superstore dataset — an Executive Sales Dashboard with a KPI header, a sales-by-region map, and cross-chart filter actions; a Customer Segmentation Dashboard using FIXED-LOD Recency/Frequency/Monetary calculated fields to bucket customers into business-readable segments; and an Enterprise Performance Dashboard combining what-if parameters, LOD expressions, and table calculations with a dedicated mobile layout — and published all three to Tableau Public.",
            ],
          },
        ],
      },
      {
        heading: "Projects",
        entries: [
          {
            left: "Adventure Works Cycles Sales Performance Dashboard — Power BI Capstone",
            right: "2026",
            sub: "BI → Data Architect Destination — Start Stage",
            bullets: [
              "Built a star-schema data model in Power BI from AdventureWorksDW2014's fact and dimension tables, and wrote DAX measures covering regional sales performance, product-line profitability, reseller fulfillment, and year-over-year trend.",
              "Designed a multi-page report with drill-through and cross-filtering, and published it to the Power BI Service as a secured app with row-level security and a scheduled refresh.",
              "Checked the finished dashboard against the original four written requirements, line by line, before calling the project complete — rather than treating 'more features' as the finish line.",
            ],
          },
          {
            left: "Tableau Analytics Portfolio — Three Dashboards",
            right: "2026",
            sub: "BI → Data Architect Destination — Start Stage",
            bullets: [
              "Executive Sales Dashboard: a single-screen view with a KPI header, a Profit-Ratio-colored regional map, a profit trend line with a reference line, a Top-10-products chart, and a working filter action tying all four together.",
              "Customer Segmentation Dashboard: FIXED-LOD Recency/Frequency/Monetary calculated fields driving a parameter-controlled scatter plot and a business-readable segment model (Champions, Loyal, At Risk, Lost, New), with a click-through customer detail table.",
              "Enterprise Performance Dashboard: combined what-if parameters, LOD expressions, and table calculations into one multi-sheet dashboard with a dedicated mobile layout, published to Tableau Public.",
            ],
          },
        ],
      },
      {
        heading: "Education",
        entries: [{ left: "High School Diploma — Washington High School", right: "Atlanta, GA · 2020" }],
      },
    ],
  },
  "analytics-engineer": {
    levelLabel: "Analytics Engineer",
    name: "John Doe",
    contact: CONTACT,
    summary:
      "Analytics Engineer trained through the Start and Expand stages of the BI → Data Architect road map — T-SQL, " +
      "Power BI, and Tableau reporting, then Azure Data Factory pipelines, Snowflake cloud warehousing, dbt analytics " +
      "engineering, and Microsoft Fabric's real-time analytics. Built a three-source Snowflake-to-dbt pipeline with " +
      "real tests and documentation, a scheduled Data Factory pipeline, and a real-time Fabric dashboard with " +
      "sub-minute alerting. Bringing that reporting-into-modeling-into-engineering progression to an Analytics " +
      "Engineer, BI Engineer, or Data Engineer role.",
    skills: [
      "T-SQL Querying & Database Design",
      "Power BI Data Modeling, DAX & Publishing",
      "Tableau Dashboarding & LOD Expressions",
      "ELT Pipeline Development (Azure Data Factory)",
      "Mapping Data Flows, Triggers & Monitoring (ADF)",
      "Cloud Data Warehousing (Snowflake) — Stages, COPY INTO, Snowpipe",
      "Snowflake Streams, Tasks & Least-Privilege RBAC",
      "Analytics Engineering & Data Modeling (dbt staging/marts, ref())",
      "dbt Testing, Documentation & Snapshots (SCD Type 2)",
      "Microsoft Fabric — OneLake, Lakehouse & Warehouse",
      "Real-Time Analytics (Eventstreams, KQL, Windowing, Activator Alerting)",
      "Dimensional Modeling, SCD & Incremental Loading",
      "Version Control & CI/CD (Git, GitHub Actions, dbt Cloud, ADF/Fabric Git Integration)",
      "Requirements Gathering & Stakeholder Communication",
    ],
    tools:
      "SSMS, Power BI Desktop & Service, Tableau Desktop & Public, Azure Data Factory, Snowflake/Snowsight, dbt " +
      "Cloud, Microsoft Fabric (OneLake, Eventstreams, KQL Database), Git, GitHub Actions",
    sections: [
      {
        heading: "Training",
        entries: [
          {
            left: "Lifting the Veil IT Academy — Apprenticeship Program",
            right: "Jan 2026 – Mar 2027",
            sub: "BI → Data Architect Destination — Start + Expand Stages (Analytics Engineer) · Atlanta, GA",
            bullets: [
              "Completed the Start stage (T-SQL, Power BI, Tableau) first, then this destination's Expand stage — Azure Data Factory, Snowflake, dbt, and Microsoft Fabric's real-time analytics — turning a reporting foundation into real data-engineering and analytics-engineering practice.",
              "Wrote T-SQL across joins, subqueries, recursive CTEs, window/ranking functions, and parameterized stored procedures, and applied dimensional modeling and performance tuning to both transactional schemas and star-schema designs.",
              "Built a published, row-level-secured Power BI capstone dashboard on a star-schema AdventureWorksDW2014 model with DAX time-intelligence measures, and three portfolio Tableau dashboards (Executive Sales, FIXED-LOD Customer Segmentation, and Enterprise Performance) published to Tableau Public.",
              "Built Azure Data Factory pipelines — linked services and parameterized datasets, Copy activities, mapping data flows (filter, derived column, join, aggregate, conditional split), and control flow (ForEach, If Condition, Execute Pipeline Activity) — connecting to an on-premises SQL Server source through a self-hosted integration runtime, and scheduled, secured (managed identities, Key Vault), and monitored them through the Monitor hub.",
              "Worked directly in Snowflake's separated storage/compute/cloud-services architecture — sizing and auto-suspending virtual warehouses, loading data through internal/external stages and COPY INTO, and building Snowpipe continuous ingestion — then modeled star-schema fact and dimension tables with surrogate keys and SCD Type 1/Type 2 history kept current through Streams and Tasks instead of full reloads.",
              "Configured least-privilege Snowflake RBAC (roles, GRANT, SHOW GRANTS verification) and tuned performance with Query Profile and clustering, then built a layered dbt project — sources, staging, intermediate, and marts models connected with ref() — enforced with generic and singular tests, documented into a generated dbt Docs lineage graph, with snapshots for SCD Type 2 history and a dedicated reporting-layer view behind a least-privilege role, documented as a dbt exposure.",
              "Version-controlled the dbt project in Git and ran it from dbt Cloud's IDE with per-developer branches and pull requests, and built a GitHub Actions workflow running dbt build on every pull request plus a separate deploy job gated to merges on main, using GitHub secrets instead of committed credentials.",
              "Built Microsoft Fabric Lakehouses and Warehouses on OneLake, compared Direct Lake mode to import/DirectQuery semantic models, and used Fabric's own Git integration and deployment pipelines for versioned environment promotion.",
              "Built a real-time pipeline end to end on simulated NYC Taxi trip events: an Eventstream ingesting from an Event Hub, a filter-and-reshape transformation, a five-minute sliding window computing rolling trip counts and average fare, a KQL Database destination queried with where/project/summarize/joins, a Real-Time Dashboard tile refreshing every minute, and an Activator rule alerting on a fare crossing $200 exactly once per qualifying trip rather than repeatedly.",
            ],
          },
        ],
      },
      {
        heading: "Projects",
        entries: [
          {
            left: "Adventure Works Cycles Sales Performance Dashboard — Power BI Capstone",
            right: "2026",
            sub: "BI → Data Architect Destination — Start Stage",
            bullets: [
              "Built a star-schema data model in Power BI from AdventureWorksDW2014's fact and dimension tables, and wrote DAX measures covering regional sales performance, product-line profitability, reseller fulfillment, and year-over-year trend, published to the Power BI Service as a row-level-secured, scheduled-refresh app.",
            ],
          },
          {
            left: "Tableau Analytics Portfolio — Three Dashboards",
            right: "2026",
            sub: "BI → Data Architect Destination — Start Stage",
            bullets: [
              "Published an Executive Sales Dashboard, a FIXED-LOD RFM Customer Segmentation Dashboard, and a parameter-and-LOD-driven Enterprise Performance Dashboard with a mobile layout, all to Tableau Public.",
            ],
          },
          {
            left: "Northwind Retail Sales Automation Pipeline — Azure Data Factory Capstone",
            right: "2026",
            sub: "BI → Data Architect Destination — Expand Stage",
            bullets: [
              "Translated a stakeholder's plain-language ask — yesterday's sales, cleaned and totaled by region and product category, ready before the 8 AM leadership meeting, with no exposed passwords — into a five-stage pipeline architecture.",
              "Built a self-hosted integration runtime bridging Northwind's on-premises SQL Server into a Copy activity landing raw sales data in ADLS Gen2, then a mapping data flow filtering, joining, and aggregating it into a curated Azure SQL Database table.",
              "Added three-layer error handling (retry, log, alert), replaced embedded credentials with managed identities and Key Vault, and scheduled the pipeline to run unattended every morning with a schedule trigger.",
            ],
          },
          {
            left: "Retail Orders Analytics Pipeline — Snowflake & dbt Capstone",
            right: "2026",
            sub: "BI → Data Architect Destination — Expand Stage",
            bullets: [
              "Landed three genuinely different raw sources — a SQL Server export, a separate product-catalog CSV, and a nested JSON event feed — into Snowflake using internal stages, COPY INTO, and VARIANT/FLATTEN for the JSON.",
              "Modeled a Snowflake star schema (fact_orders joined to a surrogate-keyed, SCD Type 2 dim_customer) kept current by a Stream-triggered Task, backed by least-privilege loader and analyst roles verified with SHOW GRANTS.",
              "Rebuilt the same transformation as a version-controlled dbt project — staging, intermediate, and marts models, with fct_orders materialized as incremental and dim_customers built on a snapshot for real SCD Type 2 history — enforced with tests and a generated dbt Docs lineage graph, and a dedicated reporting view documented as a dbt exposure.",
            ],
          },
          {
            left: "Real-Time NYC Taxi Dashboard — Microsoft Fabric Capstone",
            right: "2026",
            sub: "BI → Data Architect Destination — Expand Stage",
            bullets: [
              "Built the full real-time path end to end — an Event Hub source of simulated trip events, an Eventstream with a filter-and-manage-fields transformation, a five-minute sliding window rolling up trip count and average fare, and a KQL Database destination.",
              "Wrote the dashboard's core KQL tile query (a rolling 15-minute view binned into 1-minute intervals) and configured an Activator rule that notifies a Teams channel once per trip whose fare crosses $200, rather than repeatedly while it stays above the line.",
            ],
          },
        ],
      },
      {
        heading: "GitHub Portfolio",
        entries: [
          {
            left: "github.com/johndoe-biexample/retail-orders-analytics",
            right: "2026",
            sub: "Public portfolio repository — dbt project with a real CI/CD pipeline",
            bullets: [
              "Built retail-orders-analytics with real Git hygiene: a .gitignore covering target/, dbt_packages/, logs/, and .env, feature branches merged through reviewed pull requests, and a commit history of specific, descriptive messages instead of \"fix\"/\"stuff\".",
              "Wrote a .github/workflows/ci.yml that runs dbt build on every pull request against main, including one deliberately broken commit that produced a real failing check before the fix passed, plus a second, separately gated deploy job that only runs on a push to main using its own GitHub Actions secrets.",
            ],
          },
          {
            left: "Data Factory & Fabric Git Integration — Northwind Pipelines",
            right: "2026",
            sub: "Version-controlled pipeline and real-time resources",
            bullets: [
              "Connected the Northwind Azure Data Factory instance to a Git repository using Data Factory's own Git integration, publishing pipeline, dataset, and linked-service definitions as versioned JSON files instead of unsaved changes living only in the Studio UI.",
              "Used Microsoft Fabric's Git integration and deployment pipelines to version and promote the Eventstream and KQL Database configuration behind the real-time NYC Taxi dashboard across environments.",
            ],
          },
        ],
      },
      {
        heading: "Education",
        entries: [{ left: "High School Diploma — Washington High School", right: "Atlanta, GA · 2020" }],
      },
    ],
  },
  "data-architect": {
    levelLabel: "Data Architect",
    name: "John Doe",
    contact: CONTACT,
    summary:
      "Trained through the entire BI → Data Architect road map — the longest program in the catalog — converging " +
      "reporting into modeling, modeling into engineering, and engineering into cloud architecture: T-SQL, Power BI, " +
      "and Tableau; Azure Data Factory, Snowflake, dbt, and Microsoft Fabric's real-time analytics; and Azure " +
      "Databricks & Delta Lake plus a system-design and three-capstone Data Engineering Career & Capstone close. " +
      "Scoped and built a governed medallion lakehouse feeding a real-time dashboard, a tested dbt analytics " +
      "pipeline, a scheduled cloud ETL pipeline, and three architecture-level capstone designs — a hybrid real-time " +
      "retail platform, a multi-source warehouse migration, and a sub-second streaming fraud detector. Bringing that " +
      "full reporting-to-architecture progression to a Data Architect, Analytics Engineer, or Data Engineer role.",
    skills: [
      "T-SQL Querying & Dimensional Data Warehouse Design",
      "Power BI Data Modeling, DAX & Publishing",
      "Tableau Dashboarding & LOD Expressions",
      "ELT Pipeline Development (Azure Data Factory)",
      "Cloud Data Warehousing (Snowflake) — Stages, Streams & Tasks, RBAC",
      "Analytics Engineering & Data Modeling (dbt — Tests, Docs, Snapshots, Exposures)",
      "Microsoft Fabric — OneLake, Lakehouse & Warehouse",
      "Real-Time Analytics (Eventstreams, KQL, Windowing, Activator Alerting)",
      "Azure Databricks & Delta Lake (ACID Transactions, Time Travel, MERGE/OPTIMIZE)",
      "Medallion Architecture (Bronze/Silver/Gold, Autoloader, Idempotent MERGE)",
      "Unity Catalog Fundamentals (Managed/External Tables, GRANT/REVOKE)",
      "Lakeflow Declarative Pipelines & Data-Quality Expectations",
      "System Design for Data Platforms (Lambda vs. Kappa, Freshness SLAs, Estimation)",
      "Microsoft DP-700 Certification Scope",
      "AI-Assisted Data Engineering (Copilot, RAG Over a Data Catalog)",
      "Version Control & CI/CD (Git, GitHub Actions, ADF/Fabric Git Integration)",
      "Requirements Gathering & Stakeholder Communication",
    ],
    tools:
      "SSMS, Power BI Desktop & Service, Tableau Desktop & Public, Azure Data Factory, Snowflake/Snowsight, dbt " +
      "Cloud, Microsoft Fabric (OneLake, Eventstreams, KQL Database), Azure Databricks, Delta Lake, Unity Catalog, " +
      "Git, GitHub Actions",
    sections: [
      {
        heading: "Training",
        entries: [
          {
            left: "Lifting the Veil IT Academy — Apprenticeship Program",
            right: "Jan 2026 – Dec 2027",
            sub: "BI → Data Architect Destination — Start + Expand + Converge (Data Architect) · Atlanta, GA",
            bullets: [
              "Completed the Start stage (T-SQL, Power BI, Tableau) and the Expand stage (Azure Data Factory, Snowflake, dbt, Microsoft Fabric real-time analytics) first, then this destination's Converge stage — Azure Databricks & Delta Lake and Data Engineering Career & Capstone — the cloud-architecture layer the whole road map converges toward.",
              "Wrote T-SQL across joins, subqueries, recursive CTEs, window/ranking functions, and parameterized stored procedures, and applied dimensional modeling and execution-plan-driven performance tuning to both transactional schemas and star-schema warehouse designs.",
              "Built a published, row-level-secured Power BI capstone dashboard on a star-schema AdventureWorksDW2014 model with DAX time-intelligence measures, and three portfolio Tableau dashboards (Executive Sales, FIXED-LOD Customer Segmentation, and Enterprise Performance) published to Tableau Public.",
              "Built Azure Data Factory pipelines — Copy activities, mapping data flows, and parameterized control flow — connecting an on-premises SQL Server source through a self-hosted integration runtime, secured with managed identities and Key Vault and monitored through the Monitor hub.",
              "Worked in Snowflake's separated storage/compute architecture, loaded data through stages/COPY INTO/Snowpipe, modeled SCD Type 1/2 star schemas kept current with Streams and Tasks, and configured least-privilege RBAC verified with SHOW GRANTS.",
              "Built a layered dbt project (staging/intermediate/marts with ref()) enforced with tests and a generated dbt Docs lineage graph, version-controlled in Git with pull requests, and deployed through a GitHub Actions workflow running dbt build on every pull request with a separately gated deploy job.",
              "Built Microsoft Fabric Lakehouses and Warehouses on OneLake and a real-time pipeline against simulated NYC Taxi trip events — Eventstream ingestion, a five-minute sliding window, a KQL Database, a Real-Time Dashboard refreshing every minute, and an Activator rule alerting on fares over $200 exactly once per qualifying trip.",
              "Worked in Azure Databricks clusters and notebooks, built and queried Delta Lake tables — ACID transactions, schema enforcement and evolution, time travel, UPDATE/DELETE/MERGE, and OPTIMIZE/VACUUM file compaction — and designed a Bronze/Silver/Gold medallion pipeline with Autoloader incremental ingestion, idempotent foreachBatch/MERGE cleaning, late-arriving-data handling, and a quarantine table for rejected rows.",
              "Learned Unity Catalog fundamentals — the three-level namespace, managed vs. external tables, and GRANT/REVOKE access control — and built declarative Lakeflow pipelines with inline data-quality expectations.",
              "Practiced system design for data platforms — Lambda vs. Kappa architecture, back-of-the-envelope estimation, partitioning, idempotency, and freshness SLAs — and prepared for the Microsoft DP-700 (Fabric Data Engineer Associate) exam domains across implementing, ingesting/transforming, and monitoring/optimizing an analytics solution.",
              "Used Microsoft Copilot in Fabric to generate and fix notebook and KQL code, and practiced AI-assisted data documentation and retrieval-augmented generation (RAG) over a data catalog.",
              "Scoped three architecture-level capstone systems from stakeholder requirements through to design, each applying a different piece of the system-design toolkit: a real-time retail analytics platform needing a hybrid Lambda design unified at a bronze layer because its non-functional requirements (same-day freshness, Black-Friday-scale spikes, no lost events) ruled out pure nightly batch; a multi-source Fabric Data Warehouse migration consolidating a legacy on-prem orders database, a cloud CRM, and a third-party inventory system with no big-bang cutover, reconciling totals during the coexistence period; and a payments-platform fraud detector sized against real back-of-the-envelope numbers (roughly 2,000 transactions/second at peak, a sub-300-millisecond p99 scoring budget, and 90 days of replayable retention) — a clean fit for Kappa architecture since no separate batch layer could ever replace a live fraud score.",
            ],
          },
          { left: "Microsoft DP-700: Fabric Data Engineer Associate", right: "Exam scheduled" },
        ],
      },
      {
        heading: "Projects",
        entries: [
          {
            left: "Adventure Works Cycles Sales Performance Dashboard — Power BI Capstone",
            right: "2026",
            sub: "BI → Data Architect Destination — Start Stage",
            bullets: [
              "Built a star-schema data model in Power BI from AdventureWorksDW2014's fact and dimension tables, with DAX measures covering regional sales performance, product-line profitability, reseller fulfillment, and year-over-year trend, published to the Power BI Service as a row-level-secured, scheduled-refresh app.",
            ],
          },
          {
            left: "Tableau Analytics Portfolio — Three Dashboards",
            right: "2026",
            sub: "BI → Data Architect Destination — Start Stage",
            bullets: [
              "Published an Executive Sales Dashboard, a FIXED-LOD RFM Customer Segmentation Dashboard, and a parameter-and-LOD-driven Enterprise Performance Dashboard with a mobile layout, all to Tableau Public.",
            ],
          },
          {
            left: "Northwind Retail Sales Automation Pipeline — Azure Data Factory Capstone",
            right: "2026",
            sub: "BI → Data Architect Destination — Expand Stage",
            bullets: [
              "Built a self-hosted integration runtime connection to on-premises SQL Server, a Copy activity landing raw sales data in ADLS Gen2, and a mapping data flow (filter → join → aggregate) producing sales totals by region and category, scheduled to run unattended every morning with managed-identity and Key Vault security.",
            ],
          },
          {
            left: "Retail Orders Analytics Pipeline — Snowflake & dbt Capstone",
            right: "2026",
            sub: "BI → Data Architect Destination — Expand Stage",
            bullets: [
              "Landed three differently-shaped raw sources into a Snowflake star schema with SCD Type 2 history kept current by a Stream-triggered Task, then rebuilt the same transformation as a tested, documented dbt project with a dedicated reporting layer exposed to Power BI.",
            ],
          },
          {
            left: "NYC Taxi Data Platform — Medallion Architecture & Real-Time Dashboard",
            right: "2027",
            sub: "BI → Data Architect Destination — Converge Stage",
            bullets: [
              "Built a Bronze/Silver/Gold medallion pipeline in Azure Databricks against real NYC Taxi trip data, using Autoloader for continuous ingestion, a foreachBatch/MERGE pattern for idempotent cleaning into silver.trips, and a scheduled aggregation job rolling results up into gold.daily_revenue.",
              "Added a three-day reprocessing window to catch late-arriving trip records and a quarantine table to track data-quality rejection rates, instead of letting bad rows silently corrupt the daily revenue aggregate.",
              "Extended the same trip data into a real-time path in Microsoft Fabric: an Eventstream ingesting simulated trip events from an Event Hub, a sliding window computing rolling trip counts and average fare, and a KQL Database serving a Real-Time Dashboard.",
              "Configured an Activator rule to post an alert whenever a trip's fare crossed $200, firing once per qualifying trip rather than repeatedly.",
            ],
          },
          {
            left: "Data Engineering Career Capstones — Retail Analytics, Warehouse Migration & Fraud Detection",
            right: "2027",
            sub: "BI → Data Architect Destination — Converge Stage, Data Engineering Career & Capstone",
            bullets: [
              "Scoped a real-time retail analytics platform handling both nightly in-store POS exports and continuous online order events, choosing a hybrid Lambda ingestion design unified at a lakehouse bronze layer to meet a same-day freshness requirement without losing an event even under Black-Friday-scale traffic.",
              "Designed a migration consolidating three legacy systems — an on-prem SQL Server orders database, a cloud CRM, and a third-party inventory system — into one Fabric Data Warehouse, planning a phased cutover with reconciliation checks during the coexistence period instead of a big-bang replacement.",
              "Designed an end-to-end streaming fraud detector scoring every transaction against a sub-second latency budget (roughly 2,000 transactions/second at peak, a sub-300-millisecond p99 scoring window, 90 days of replayable retention), choosing a Kappa architecture with a durable, replayable event log since no separate batch layer could ever stand in for a live fraud score.",
            ],
          },
        ],
      },
      {
        heading: "GitHub Portfolio",
        entries: [
          {
            left: "github.com/johndoe-biexample/retail-orders-analytics",
            right: "2026",
            sub: "Public portfolio repository — dbt project with a real CI/CD pipeline",
            bullets: [
              "Built retail-orders-analytics with real Git hygiene — a .gitignore covering target/, dbt_packages/, logs/, and .env, feature branches merged through reviewed pull requests — and a .github/workflows/ci.yml running dbt build on every pull request, including one deliberately broken commit proving the check actually fails, plus a separately gated deploy job using GitHub Actions secrets.",
            ],
          },
          {
            left: "github.com/johndoe-biexample/nyc-taxi-data-platform",
            right: "2027",
            sub: "Public portfolio repository for the Converge-stage capstone project",
            bullets: [
              "Used Git (repositories, commits, branches, pull requests) to version-control the Databricks notebooks, Data Factory pipeline definitions, and Fabric real-time configuration behind the NYC Taxi Data Platform project, publishing the result to GitHub.",
              "Structured the README around what a reviewer actually reads first — a one-paragraph system summary, an architecture diagram showing the Eventstream-to-dashboard flow, and the real trade-off behind choosing a hybrid ingestion design — rather than a full narrated walkthrough.",
            ],
          },
        ],
      },
      {
        heading: "Education",
        entries: [{ left: "High School Diploma — Washington High School", right: "Atlanta, GA · 2020" }],
      },
    ],
  },
};
