import type { PathResumes } from "../sampleResumeTypes";

const CONTACT = ["Atlanta, GA", "(404) 555-0182", "john.doe@example.com", "linkedin.com/in/johndoe-biexample"];

export const RESUMES: PathResumes = {
  "data-engineer": {
    levelLabel: "Data Engineer",
    name: "John Doe",
    contact: CONTACT,
    summary:
      "Data Engineer with a T-SQL database-development foundation and a full Databricks / Lakehouse Engineer " +
      "specialization — Unity Catalog governance, Auto Loader ingestion at scale, Lakeflow declarative pipelines, " +
      "Databricks Workflows, and a governed, column-masked, liquid-clustered retail lakehouse capstone built end to " +
      "end on top of it. Bringing that T-SQL-through-lakehouse foundation to a Data Engineer role.",
    skills: [
      "T-SQL Querying & Relational Database Design (Joins, CTEs, Window Functions, Normalization)",
      "Apache Spark & PySpark, Azure Data Factory, Azure Databricks & Delta Lake",
      "Unity Catalog Governance (Access Control, Lineage, Managed vs. External Tables)",
      "Auto Loader & Ingestion at Scale (Schema Inference/Evolution, Structured Streaming)",
      "Lakeflow Declarative Pipelines & Databricks Jobs/Workflows",
      "Performance Tuning (Photon, Adaptive Query Execution, Liquid Clustering)",
      "Version Control (Git/GitHub)",
    ],
    sections: [
      {
        heading: "Training",
        entries: [
          {
            left: "Lifting the Veil IT Academy — Apprenticeship Program",
            right: "Jul 2026 – Dec 2026",
            sub: "Data Engineer / Data Architect Track — Foundation + Specialty · Atlanta, GA",
            bullets: [
              "Completed the T-SQL Development course first — joins, subqueries, CTEs, window/ranking functions, and normalization against AdventureWorks2012 and AdventureWorksDW2014 — then a full Databricks / Lakehouse Engineer specialization on top of it (detailed on this program's Databricks / Lakehouse Engineer resume): Python/Spark and Data Factory foundations, Databricks and Delta Lake, and the advanced Unity Catalog governance, Auto Loader, Lakeflow, Workflows, performance-tuning, and security coursework from that track's Advanced stage.",
              "That specialization's own governed retail lakehouse capstone — Unity Catalog structure, streaming and batch Auto Loader ingestion, a Lakeflow pipeline with inline data-quality expectations, a four-task orchestrated Databricks Job, column masking, and liquid clustering — is the project foundation this level of the Data Engineer / Data Architect track stands on; see that resume for the full build.",
            ],
          },
        ],
      },
      {
        heading: "Projects",
        entries: [
          {
            left: "Governed Retail Lakehouse Pipeline — Databricks / Lakehouse Engineer Capstone",
            right: "2026",
            sub: "Carried forward from the Databricks / Lakehouse Engineer specialization",
            bullets: [
              "Designed a Unity Catalog structure, ingested streaming and batch retail data with Auto Loader, and built a Lakeflow pipeline enforcing data quality inline — full detail on the Databricks / Lakehouse Engineer resume.",
              "Orchestrated it with a four-task Databricks Job and applied column-level masking, managed-identity authentication, and liquid clustering for production readiness.",
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
      "Data Architect who has carried a Databricks lakehouse foundation (Unity Catalog, Auto Loader, Lakeflow, " +
      "Workflows) up through the full advanced-engineering layer nearly every top-tier data-engineering posting " +
      "asks for — a dbt analytics-engineering layer with tested, documented models; Git/GitHub CI/CD gating every " +
      "merge; Kafka event streaming; Airflow orchestration; and Terraform/Bicep infrastructure as code — and then " +
      "into the system-design and architecture-trade-off layer: requirements gathering, back-of-the-envelope " +
      "estimation, Lambda vs. Kappa architecture, and three capstone systems designed and built end to end — a " +
      "hybrid-ingestion retail analytics platform, a three-source data warehouse migration with a validated cutover " +
      "plan, and a sub-300ms streaming fraud detector with idempotent, exactly-once-effect alerting. Bringing that " +
      "full specialty-through-architecture pipeline to a Data Engineer or Data Architect role.",
    skills: [
      "System Design for Data Engineers (Requirements, Estimation, Lambda/Kappa Architecture, Trade-Offs)",
      "Analytics Engineering & Data Modeling (dbt: Staging/Intermediate/Marts, Tests, Docs, Incremental Models)",
      "Git/GitHub Version Control & Code Review, CI/CD Pipelines (GitHub Actions, Slim CI)",
      "Pipeline Orchestration (Apache Airflow: DAGs, Sensors, Branching, dbt Integration)",
      "Event Streaming (Apache Kafka: Topics, Partitions, Consumer Groups, Delivery Semantics, Schema Registry)",
      "Infrastructure as Code (Terraform & Bicep for Azure Data Resources, Remote State, Plan/Apply)",
      "Requirements Gathering & Functional/Non-Functional Scoping",
      "Back-of-the-Envelope Estimation & Capacity Planning",
      "Storage & Processing-Model Trade-Offs (OLTP/OLAP/Object Storage, Batch/Streaming/Hybrid)",
      "Multi-Source Migration Design (Conformed Dimensions, Reconciliation, Phased Cutover, Rollback Planning)",
      "Idempotent & Exactly-Once-Effect Pipeline Design (Keyed MERGE, Dead-Letter Handling)",
      "Unity Catalog Governance, Auto Loader, Lakeflow Declarative Pipelines (Databricks foundation)",
      "T-SQL Querying & Relational Database Design",
      "Whiteboarding & Presenting a System Design",
    ],
    tools:
      "Databricks Workspace, Unity Catalog, Delta Lake, dbt Cloud, Apache Kafka/Confluent Cloud, Apache Airflow, " +
      "Terraform, Azure Bicep, Microsoft Fabric (Eventstreams, Activator, Direct Lake), GitHub Actions, Git, SSMS",
    sections: [
      {
        heading: "Training",
        entries: [
          {
            left: "Lifting the Veil IT Academy — Apprenticeship Program",
            right: "Jul 2026 – Dec 2026",
            sub: "Data Engineer / Data Architect Track — Advanced Engineering & Leadership Layer · Atlanta, GA",
            bullets: [
              "Completed the T-SQL Development course and a full Databricks / Lakehouse Engineer specialization beforehand (Unity Catalog governance, Auto Loader, Lakeflow declarative pipelines, Databricks Workflows, performance tuning — detailed on that specialization's own resume), then added the advanced-engineering and system-design layer below on top of that foundation.",
              "Built a layered dbt project — sources, staging, intermediate, and marts models connected with ref(), materialized as views, tables, and incremental models — enforced with generic tests (not_null, unique, relationships) and custom singular tests, documented every mart-layer model and column in schema.yml with a generated dbt Docs lineage graph, and version-controlled it with per-developer branches and pull requests run through dbt Cloud.",
              "Worked Git branching strategies (merge vs. rebase, resolving conflicts) and the full GitHub workflow — remotes, push/pull/fetch, pull requests, code review, Issues/Project boards — plus data-specific Git practices (.gitignore for data projects, Git LFS for large files, versioning SQL/dbt projects and notebooks); learned CI/CD concepts and pipelines-as-code, then built GitHub Actions workflows running dbt models and tests automatically on every pull request, with Slim CI only re-running what changed and a separate deploy job gated to a push on main using GitHub-managed secrets.",
              "Learned Apache Kafka event streaming end to end — topics, partitions, offsets, producers/consumers, consumer groups, at-most/at-least/exactly-once delivery semantics, replication and fault tolerance, partitioning strategy, Schema Registry, and Kafka Connect source/sink connectors — and built a capstone real-time producer-to-consumer pipeline with deliberate error handling for malformed messages.",
              "Built Apache Airflow DAGs with PythonOperator/BashOperator tasks, explicit dependencies, and XComs passing data between tasks; used Connections and provider hooks to load and query a warehouse from a DAG; added sensors, branching, and dynamic task mapping; and built a capstone ELT DAG triggering a dbt run with retries and an alerting step proven by a deliberate task failure.",
              "Wrote Terraform configurations provisioning Azure data-platform infrastructure — resource blocks, variables/outputs, a reusable module provisioning a Storage Account and Event Hub together, and remote state — reviewing a terraform plan before every apply; deployed Azure SQL and a resource group with Bicep; and built a capstone data-platform infrastructure project gated behind a GitHub Actions plan-on-PR, approval-gated-apply workflow.",
              "Completed Data Engineering Career & Capstone's System Design for Data Engineers chapter — functional vs. non-functional requirements gathering, back-of-the-envelope estimation, choosing storage (OLTP vs. OLAP vs. object storage) and a processing model (batch/streaming/hybrid), the Lambda and Kappa architectures, partitioning and multi-tenancy design, and four real-system case studies (a ride-sharing analytics platform, a real-time fraud detection system, a retail inventory data platform, a social media analytics pipeline) — closing with a lesson on presenting a system design the way a technical interview actually asks for it.",
            ],
          },
        ],
      },
      {
        heading: "Projects",
        entries: [
          {
            left: "A Real-Time Retail Analytics Platform — System Design Capstone 1",
            right: "2026",
            sub: "Data Engineering Career & Capstone — Added Projects, Project 1",
            bullets: [
              "Scoped a deliberately vague stakeholder ask (\"same-day sales by region and category, survive Black Friday-scale spikes, never lose a sale event\") into functional and non-functional requirement lists, fixed the grain at one row per line item before any schema work, and showed why the non-functional list ruled out a pure nightly-batch design outright.",
              "Chose a hybrid Lambda-style ingestion design — batch for nightly in-store POS exports, streaming for online orders — unified at a lakehouse bronze layer so downstream transforms never need to know which path a row came from, then set and monitored a concrete freshness SLO (99% of online-order events visible in gold within 15 minutes) with an alert threshold set ahead of the SLO.",
              "Served the finished gold.FactSales table through a Direct Lake semantic model rather than standing up a redundant warehouse for simple aggregations, and hardened the pipeline for production with a dead-letter table for malformed events, idempotent MERGE ingestion that makes retries safe, and dashboards/metrics/traces observability on dead-letter growth and job duration.",
            ],
          },
          {
            left: "A Multi-Source Data Warehouse Migration — System Design Capstone 2",
            right: "2026",
            sub: "Data Engineering Career & Capstone — Added Projects, Project 2",
            bullets: [
              "Designed a consolidation of three disagreeing legacy systems — an on-prem SQL Server order database, a cloud CRM, and a third-party inventory system — into one target Fabric Data Warehouse, choosing a T-SQL warehouse over a lakehouse specifically because the project's query pattern was complex cross-source joins for one BI team, not simple aggregation.",
              "Built conformed DimCustomer and DimProduct dimensions from a crosswalk table (never from either raw source directly) and loaded FactOrders last, as a hard dependency, so every fact row's foreign keys resolved only to conformed keys.",
              "Chose a phased, parallel-run cutover over a big-bang switch for lower blast radius, and wrote a reconciliation query diffing the old and new warehouses' daily totals automatically, run every day of the parallel-run window, as the actual go/no-go gate for migrating each report — not a one-time eyeball check.",
              "Wrote a rollback plan answering its trigger, mechanism, and how-long-to-keep-the-old-source-alive questions before cutover started, rather than improvising a rollback plan under pressure.",
            ],
          },
          {
            left: "An End-to-End Streaming Fraud Detector — System Design Capstone 3",
            right: "2026",
            sub: "Data Engineering Career & Capstone — Added Projects, Project 3",
            bullets: [
              "Scoped a payments fraud detector against a sub-300ms p99 scoring-latency budget and ~2,000 transactions/sec peak throughput with back-of-the-envelope estimation, and chose Kappa over Lambda architecture because the system has no exact, slower batch answer that would ever replace the real-time one — only one streaming codepath that also serves reprocessing/backtesting by replaying a 90-day retained event log.",
              "Built a threshold-rule risk-scoring step (rolling transaction count, rolling amount, distance-since-last) over feature records, wired the fraud-review alert through Fabric's Activator so a streaming condition fires a real action once per qualifying event, and reported fraud alerts through a MERGE keyed on transaction ID so an at-least-once-delivered duplicate event produces one alert, not two.",
              "Treated exactly-once-effect alerting as a first-class requirement decided at kickoff, not an afterthought bolted onto scoring logic after the fact.",
            ],
          },
        ],
      },
      {
        heading: "GitHub Portfolio",
        entries: [
          {
            left: "github.com/johndoe-biexample/data-architect-capstones",
            right: "2026",
            sub: "Public portfolio repository — dbt project with CI/CD, plus the three System Design capstones",
            bullets: [
              "Set up proper Git hygiene on the dbt project from the start — a .gitignore covering target/, dbt_packages/, logs/, and .env — used feature branches instead of direct pushes to main, and opened and reviewed real pull requests (at least one line comment and one suggestion) before merging a new model.",
              "Wrote a GitHub Actions CI workflow running dbt build and tests on every pull request, proved it actually catches problems with a deliberately broken commit, and added a separate deploy job gated to a push on main using GitHub-managed secrets rather than anything committed to the repository.",
              "Published the Terraform data-platform capstone alongside its own plan-on-PR, approval-gated-apply GitHub Actions workflow, and documented all three System Design capstones' architecture decisions (storage/processing-model choice, Lambda vs. Kappa, migration cutover plan) in each project's README, since the live Databricks workspace and Fabric items aren't viewable directly in a plain GitHub browse.",
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
