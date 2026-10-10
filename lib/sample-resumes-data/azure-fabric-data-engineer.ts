import type { PathResumes } from "../sampleResumeTypes";

const CONTACT = ["Atlanta, GA", "(404) 555-0182", "john.doe@example.com", "linkedin.com/in/johndoe-biexample"];

export const RESUMES: PathResumes = {
  "job-ready": {
    levelLabel: "Job Ready",
    name: "John Doe",
    contact: CONTACT,
    summary:
      "Data Engineer trained end to end on Microsoft's Azure and Fabric data stack — from Python and Spark fundamentals " +
      "through Azure Data Factory, Azure Databricks & Delta Lake, and Microsoft Fabric's real-time analytics, capped by " +
      "production engineering practice and Microsoft DP-700 certification prep. Built a real medallion data platform and " +
      "a real-time streaming dashboard against live NYC Taxi trip data, plus a scheduled, secured Data Factory pipeline " +
      "for a retail sales reporting system. Bringing that full-stack Azure data engineering skill set to a Data " +
      "Engineer, Azure Data Engineer, or Fabric Data Engineer role.",
    skills: [
      "Azure Data Lake Storage (ADLS Gen2) & Medallion Architecture",
      "Python & PySpark for Data Engineering",
      "Azure Data Factory — Pipelines, Mapping Data Flows & Triggers",
      "Azure Databricks & Delta Lake (ACID, Time Travel, Unity Catalog)",
      "Microsoft Fabric — OneLake, Lakehouse & Warehouse",
      "Real-Time Analytics — Eventstreams, KQL & Activator Alerting",
      "T-SQL Querying & Dimensional Data Warehouse Design",
      "System Design for Data Platforms (Lambda/Kappa, SLAs)",
      "Agile/Scrum Delivery & Version Control (Git)",
    ],
    tools:
      "Azure Portal, ADLS Gen2, Azure Data Factory, Azure Databricks, Microsoft Fabric (OneLake, Lakehouse, Warehouse, Eventstreams, KQL), SQL Server Management Studio, Python/PySpark, Git/GitHub",
    sections: [
      {
        heading: "Training & Certifications",
        entries: [
          {
            left: "Lifting the Veil IT Academy — Apprenticeship Program",
            right: "Jan 2026 – Jun 2026",
            sub: "Azure / Fabric Data Engineer Track · Atlanta, GA",
            bullets: [
              "Practiced the full software delivery lifecycle — Agile vs. Waterfall, Scrum sprints and user stories, Kanban boards, and Dev/QA/UAT/Production environments — plus version control with Git (repositories, commits, branches, pull requests) — through a real-world IT project simulation.",
              "Wrote T-SQL ranging from joins, grouping, and subqueries to window and ranking functions (ROW_NUMBER, RANK, DENSE_RANK, NTILE, OVER/PARTITION BY), then applied database normalization and dimensional modeling to design star-schema data warehouses.",
              "Tuned T-SQL performance by reading execution plans and choosing clustered vs. nonclustered indexes, and used Common Table Expressions, temporary tables, and views for complex reporting queries.",
              "Designed Azure Data Lake storage using ADLS Gen2 containers and a hierarchical namespace, securing access with RBAC, ACLs, managed identities, and SAS tokens, and organized a lake into raw/cleansed/curated and bronze/silver/gold zones.",
              "Built Python ETL scripts — reading CSV/JSON, calling REST APIs, cleaning data with pandas DataFrames, and connecting Python to SQL — to move and reshape raw data before it reaches a warehouse.",
              "Learned Spark's distributed architecture (driver, executors, partitions, lazy evaluation) and wrote PySpark DataFrame transformations — select/filter/withColumn, joins, window functions, and groupBy aggregations — reading and writing CSV, JSON, and Parquet.",
              "Built Azure Data Factory pipelines with Copy activities and parameterized If Condition, ForEach, and Until control flow, connecting to an on-premises SQL Server source through a self-hosted integration runtime.",
              "Built Mapping Data Flows with filter, derived column, join, aggregate, and pivot transformations, scheduled with tumbling-window and event-based triggers, and secured with managed identities and Key Vault instead of plaintext credentials.",
              "Compared Azure Data Factory to Fabric Data Factory's Dataflow Gen2 and OneLake destinations, and set up Git integration and ARM-template-based CI/CD for pipeline deployments across Dev/Test/Prod.",
              "Worked in Azure Databricks clusters and notebooks, then built and queried Delta Lake tables — ACID transactions, schema enforcement and evolution, time travel, UPDATE/DELETE/MERGE, and OPTIMIZE/VACUUM file compaction.",
              "Designed a Bronze/Silver/Gold medallion pipeline with Autoloader incremental ingestion and Structured Streaming, handling late-arriving data and running data quality checks between layers.",
              "Governed a Unity Catalog three-level namespace with managed vs. external tables, GRANT/REVOKE access control, row- and column-level security, and data lineage tracking, and built declarative Lakeflow pipelines with expectations-based data quality.",
              "Built Microsoft Fabric Lakehouses and Warehouses on OneLake, compared Direct Lake mode to import/DirectQuery semantic models, and used Fabric's Git integration and deployment pipelines across environments.",
              "Built a real-time pipeline with Eventstreams ingesting from Event Hubs, wrote KQL queries (where, project, summarize, joins, time series functions) against a KQL Database, and designed tumbling, hopping, and session windows.",
              "Built Real-Time Dashboards and Activator alerting rules, and applied production practices — CI/CD for pipelines, observability (logs, metrics, traces), incident response, and root cause analysis — to keep a data platform running.",
              "Applied system design patterns for data platforms — Lambda vs. Kappa architecture, partitioning/sharding, idempotency, and freshness SLAs — across real case studies, including a real-time fraud detection system and a retail inventory platform.",
              "Used Microsoft Copilot in Fabric to generate and fix notebook and KQL code, and practiced AI-assisted data documentation and retrieval-augmented generation (RAG) over a data catalog.",
              "Prepared for the Microsoft DP-700 (Fabric Data Engineer Associate) certification across all three exam domains — implementing and managing an analytics solution, ingesting and transforming data, and monitoring and optimizing a solution — working through full-length practice exams.",
            ],
          },
          { left: "Microsoft DP-700: Fabric Data Engineer Associate", right: "Exam scheduled" },
        ],
      },
      {
        heading: "Projects",
        entries: [
          {
            left: "NYC Taxi Data Platform — Medallion Architecture & Real-Time Dashboard",
            right: "2026",
            sub: "Lifting the Veil IT Academy, Azure/Fabric Data Engineer Track",
            bullets: [
              "Built a Bronze/Silver/Gold medallion pipeline (nyc_taxi_medallion_pipeline) in Azure Databricks against real NYC Taxi trip data, using Autoloader for continuous ingestion, a foreachBatch/MERGE pattern for idempotent cleaning into silver.trips, and a scheduled aggregation job rolling results up into gold.daily_revenue.",
              "Added a three-day reprocessing window to catch late-arriving trip records and a quarantine table to track data-quality rejection rates, instead of letting bad rows silently corrupt the daily revenue aggregate.",
              "Extended the same trip data into a real-time path in Microsoft Fabric: an Eventstream ingesting simulated trip events from an Event Hub, a sliding window computing rolling trip counts and average fare, and a KQL Database serving a Real-Time Dashboard.",
              "Configured an Activator rule to post an alert whenever a trip's fare crossed $200, firing once per qualifying trip rather than repeatedly.",
            ],
          },
          {
            left: "Northwind Retail Sales Reporting Pipeline — Data Factory Capstone",
            right: "2026",
            sub: "Lifting the Veil IT Academy, Azure/Fabric Data Engineer Track",
            bullets: [
              "Translated a stakeholder's plain-language ask — same-day sales totals by region and category, running unattended, with no passwords stored in plain text — into a five-stage Data Factory architecture.",
              "Built a Copy activity moving nightly sales data from an on-premises SQL Server database into an ADLS Gen2 raw zone through a self-hosted integration runtime, with error handling for a missing source table or a transient connection failure.",
              "Built a mapping data flow aggregating sales by region and product category into an Azure SQL Database curated table, feeding a Power BI report refreshed every morning before an 8 a.m. leadership meeting.",
              "Secured the pipeline with a managed identity and Azure Key Vault instead of stored credentials, and scheduled it with a trigger so it runs without manual intervention.",
            ],
          },
          {
            left: "Data Engineering Career Capstones — Retail Analytics, Warehouse Migration & Fraud Detection",
            right: "2026",
            sub: "Lifting the Veil IT Academy, Data Engineering Career & Capstone",
            bullets: [
              "Scoped a real-time retail analytics platform handling both nightly in-store POS exports and continuous online order events, choosing a hybrid ingestion design unified at a lakehouse bronze layer to meet a same-day freshness requirement.",
              "Designed a migration consolidating three legacy systems — an on-prem SQL Server orders database, a cloud CRM, and a third-party inventory system — into one Fabric Data Warehouse, planning a phased cutover with reconciliation checks instead of a big-bang replacement.",
              "Designed an end-to-end streaming fraud detector scoring every transaction against a sub-second latency budget, choosing a Kappa architecture with a durable, replayable event log instead of a separate batch layer.",
            ],
          },
        ],
      },
      {
        heading: "GitHub Portfolio",
        entries: [
          {
            left: "github.com/johndoe-biexample/nyc-taxi-data-platform",
            right: "2026",
            sub: "Public portfolio repository for the capstone project",
            bullets: [
              "Used Git (repositories, commits, branches, pull requests) to version-control the Databricks notebooks, Data Factory pipeline definitions, and Fabric real-time configuration behind these projects, publishing the result to GitHub.",
              "Structured the README around what a reviewer actually reads first — a one-paragraph system summary, an architecture diagram showing the Eventstream-to-dashboard flow, and the real trade-offs behind choosing a hybrid ingestion design — rather than a full narrated walkthrough.",
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
  advanced: {
    levelLabel: "Advanced",
    name: "John Doe",
    contact: CONTACT,
    summary:
      "Data Engineer trained through an advanced, two-stage Azure/Fabric apprenticeship — the core Job-Ready data " +
      "platform skill set (T-SQL, Python/Spark, Data Factory, Databricks & Delta Lake, Microsoft Fabric), plus a " +
      "specialization in version control and CI/CD, infrastructure as code, pipeline orchestration, and event " +
      "streaming. Comfortable taking a data pipeline from a Terraform-provisioned resource group through an " +
      "orchestrated Airflow DAG and a Kafka event stream, with every change going through a real pull request and a " +
      "real CI/CD pipeline before it reaches production. Looking to bring that full-stack approach to a " +
      "Data Engineer role.",
    skills: [
      "Azure Data Lake Storage (ADLS Gen2) & Medallion Architecture",
      "Python & PySpark for Data Engineering",
      "Azure Data Factory — Pipelines, Mapping Data Flows & Triggers",
      "Azure Databricks & Delta Lake (ACID, Time Travel, Unity Catalog)",
      "Microsoft Fabric — OneLake, Lakehouse & Warehouse",
      "Real-Time Analytics — Eventstreams, KQL & Activator Alerting",
      "T-SQL Querying & Dimensional Data Warehouse Design",
      "System Design for Data Platforms (Lambda/Kappa, SLAs)",
      "Version Control & CI/CD (Git, GitHub Actions)",
      "Infrastructure as Code (Terraform, Bicep)",
      "Pipeline Orchestration (Apache Airflow)",
      "Event Streaming (Apache Kafka, Kafka Connect)",
    ],
    tools:
      "Azure Portal, ADLS Gen2, Azure Data Factory, Azure Databricks, Microsoft Fabric, SQL Server Management Studio, Python/PySpark, Git, GitHub & GitHub Actions, Terraform, Bicep, Apache Airflow, Apache Kafka / Confluent Cloud, Snowflake, dbt",
    sections: [
      {
        heading: "Training & Certifications",
        entries: [
          {
            left: "Lifting the Veil IT Academy — Apprenticeship Program",
            right: "Jan 2026 – Jun 2026",
            sub: "Azure/Fabric Data Engineer Track (Job Ready) + Version Control, IaC, Orchestration & Streaming Specialization (Advanced) · Atlanta, GA",
            bullets: [
              "Practiced the full software delivery lifecycle — Agile vs. Waterfall, Scrum sprints and user stories, Kanban boards, and Dev/QA/UAT/Production environments — through a real-world IT project simulation.",
              "Wrote T-SQL ranging from joins, grouping, and subqueries to window and ranking functions (ROW_NUMBER, RANK, DENSE_RANK, NTILE, OVER/PARTITION BY), then applied database normalization and dimensional modeling to design star-schema data warehouses, tuning performance with execution plans and indexing.",
              "Designed Azure Data Lake storage using ADLS Gen2 containers and a hierarchical namespace, securing access with RBAC, ACLs, managed identities, and SAS tokens, and organized a lake into bronze/silver/gold zones.",
              "Built Python ETL scripts and PySpark DataFrame transformations — reading CSV/JSON/Parquet, joins, window functions, and groupBy aggregations — on top of Spark's distributed architecture (driver, executors, partitions, lazy evaluation).",
              "Built Azure Data Factory pipelines with Copy activities, parameterized control flow, and Mapping Data Flows, connecting to on-premises SQL Server through a self-hosted integration runtime and securing credentials with managed identities and Key Vault.",
              "Worked in Azure Databricks clusters and notebooks, built and queried Delta Lake tables (ACID transactions, time travel, MERGE, OPTIMIZE/VACUUM), and designed Bronze/Silver/Gold medallion pipelines with Autoloader and Structured Streaming.",
              "Governed a Unity Catalog three-level namespace with GRANT/REVOKE access control, row- and column-level security, and data lineage, and built declarative Lakeflow pipelines with expectations-based data quality.",
              "Built Microsoft Fabric Lakehouses and Warehouses on OneLake, a real-time Eventstream-to-KQL-Database pipeline with tumbling/hopping/session windows, Real-Time Dashboards, and Activator alerting.",
              "Applied production data engineering practices — CI/CD for pipelines, observability, incident response, and root cause analysis — and system design patterns (Lambda vs. Kappa, partitioning, idempotency, freshness SLAs) across real case studies.",
              "Learned Git branching, merging, and rebase conflict resolution, then used GitHub pull requests, code review, and Issues/Project boards as the standard way changes reach a shared main branch.",
              "Versioned dbt projects and notebooks in Git, handling the notebook diff problem and large files with Git LFS, instead of treating data projects as exempt from normal source control.",
              "Built a GitHub Actions CI/CD pipeline — a test job running dbt build on every pull request, and a separate deploy job gated to pushes on main — with secrets referenced from GitHub rather than committed to the repository.",
              "Provisioned Azure data-platform infrastructure as code with Terraform — resource groups, storage accounts, Fabric capacities, and Event Hubs — using modules, remote state, and a plan-then-apply workflow, and wrote equivalent Bicep templates for Azure SQL and resource group deployments.",
              "Built Airflow DAGs with PythonOperator and BashOperator tasks, XComs, sensors, branching, and dynamic task mapping, connecting to Snowflake through Airflow Connections and hooks.",
              "Orchestrated a real ELT pipeline in Airflow that loads data into Snowflake and triggers a dbt run, with retries and failure alerting proven by deliberately failing a task.",
              "Learned Kafka's architecture — topics, partitions, offsets, brokers, replication, and delivery semantics (at-most/at-least/exactly-once) — and built producer and consumer applications with consumer groups and Kafka Connect.",
              "Prepared for the Microsoft DP-700 (Fabric Data Engineer Associate) certification across all three exam domains — implementing and managing an analytics solution, ingesting and transforming data, and monitoring and optimizing a solution — working through full-length practice exams.",
            ],
          },
          { left: "Microsoft DP-700: Fabric Data Engineer Associate", right: "Exam scheduled" },
        ],
      },
      {
        heading: "Projects",
        entries: [
          {
            left: "NYC Taxi Data Platform — Medallion Architecture & Real-Time Dashboard",
            right: "2026",
            sub: "Lifting the Veil IT Academy, Azure/Fabric Data Engineer Track",
            bullets: [
              "Built a Bronze/Silver/Gold medallion pipeline in Azure Databricks against real NYC Taxi trip data, using Autoloader ingestion, idempotent MERGE-based cleaning, and a scheduled aggregation job, with a quarantine table tracking data-quality rejection rates.",
              "Extended the same trip data into a real-time Microsoft Fabric path — an Eventstream, a sliding-window aggregation, a KQL Database, a Real-Time Dashboard, and an Activator alert on high fares.",
            ],
          },
          {
            left: "Clickstream Event Pipeline — Kafka Capstone",
            right: "2026",
            sub: "Lifting the Veil IT Academy, Kafka & Event Streaming",
            bullets: [
              "Built a clickstream Kafka pipeline with an eight-partition, three-day-retention topic sized for its consumer group's parallelism and replay needs, paired with a single-partition dead-letter topic for the rare malformed event.",
              "Configured an idempotent producer (acks=all, enable.idempotence) and a consumer group that commits offsets after routing failures to the dead-letter topic instead of stalling the partition — the same shape used by the Career & Capstone course's streaming fraud detector design.",
            ],
          },
          {
            left: "Orchestrated ELT Pipeline — Airflow Capstone",
            right: "2026",
            sub: "Lifting the Veil IT Academy, Airflow",
            bullets: [
              "Designed a multi-task Airflow DAG — extract, load to Snowflake, branch on a data-quality condition, then trigger a dbt build — with explicit task dependencies and an XCom passing a row count into the branching decision.",
              "Added retries and an on-failure alerting hook to the tasks touching external systems, and proved the alert actually fires by deliberately failing a task.",
            ],
          },
          {
            left: "Data Platform Infrastructure — Terraform Capstone",
            right: "2026",
            sub: "Lifting the Veil IT Academy, Terraform & Bicep for Data Engineers",
            bullets: [
              "Provisioned a data platform's infrastructure — a resource group, a Fabric Capacity, and a reusable landing-zone module provisioning a storage account and an Event Hub together — from one Terraform configuration behind a remote azurerm state backend.",
              "Reviewed a terraform plan diff naming every resource before applying, matching the infrastructure a warehouse-migration or streaming-fraud-detector project needs standing before any pipeline logic can run.",
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
              "Built retail-orders-analytics with real Git hygiene: a .gitignore covering target/, dbt_packages/, logs/, and .env, every feature merged through a pull request with at least one real review comment, and a commit history with meaningful messages instead of direct pushes to main.",
              "Wired a .github/workflows/ci.yml running dbt build on every pull request against main, including one deliberately broken commit to prove the pipeline actually catches a failure, plus a separate deploy job gated to pushes on main using its own scoped secrets.",
              "Can walk through the repository end to end — the .gitignore, a real pull request and review, the workflow file's trigger/job/steps, a failed-then-passing run, and the deploy job's separate credentials — in the same order used to present it in an interview.",
            ],
          },
          {
            left: "github.com/johndoe-biexample/nyc-taxi-data-platform",
            right: "2026",
            sub: "Public portfolio repository for the Job-Ready capstone project",
            bullets: [
              "Version-controlled the Databricks notebooks, Data Factory pipeline definitions, and Fabric real-time configuration behind the NYC Taxi Data Platform project, with a README structured around a one-paragraph summary and an architecture diagram.",
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
