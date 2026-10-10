import type { PathResumes } from "../sampleResumeTypes";

const CONTACT = ["Atlanta, GA", "(404) 555-0182", "john.doe@example.com", "linkedin.com/in/johndoe-biexample"];

export const RESUMES: PathResumes = {
  "job-ready": {
    levelLabel: "Job Ready",
    name: "John Doe",
    contact: CONTACT,
    summary:
      "Snowflake Data / Analytics Engineer trained in Snowflake, dbt, Azure Data Factory, and Power BI through a hands-on " +
      "apprenticeship program. Built a complete modern-data-stack pipeline — three differently shaped raw sources landed " +
      "and modeled in Snowflake, rebuilt as a tested, documented dbt project, and connected to Power BI — plus a second " +
      "pipeline moving on-premises retail sales data into the cloud on a schedule with Data Factory. Bringing that full " +
      "pipeline-to-report approach to a Snowflake Developer, Analytics Engineer, or Cloud Data Engineer role.",
    skills: [
      "Cloud Data Warehousing (Snowflake)",
      "Analytics Engineering & Data Modeling (dbt)",
      "ELT Pipeline Development (Snowflake, Azure Data Factory)",
      "Dimensional Modeling, SCD & Incremental Loading",
      "Data Testing & Documentation (dbt tests, dbt Docs)",
      "T-SQL Querying & Database Design",
      "Data Visualization & DAX (Power BI)",
      "RBAC & Least-Privilege Security",
      "Requirements Gathering & Stakeholder Communication",
      "Version Control (Git/GitHub)",
    ],
    sections: [
      {
        heading: "Training",
        entries: [
          {
            left: "Lifting the Veil IT Academy — Apprenticeship Program",
            right: "Jan 2026 – Jun 2026",
            sub: "Snowflake Data / Analytics Engineer Track · Atlanta, GA",
            bullets: [
              "Completed an intensive, project-based apprenticeship covering cloud data warehousing, analytics engineering, pipeline development, and business intelligence, using hands-on assignments built against real, multi-source data.",
              "Wrote T-SQL ranging from joins and filtering to advanced patterns — Common Table Expressions (CTEs) including recursive CTEs, window and ranking functions (ROW_NUMBER, RANK, DENSE_RANK, OVER/PARTITION BY), subqueries, and parameterized stored procedures — and applied database normalization and dimensional modeling to transactional and star-schema designs.",
              "Worked directly in Snowflake's architecture of separated storage, compute, and cloud services — creating databases, schemas, and tables, and sizing, scaling, and auto-suspending/resuming virtual warehouses to control compute cost.",
              "Loaded data into Snowflake through internal and external stages and COPY INTO across CSV, JSON, and Parquet file formats, and built Snowpipe continuous ingestion with monitoring for failed loads.",
              "Built ELT transformations with CTAS, incremental loading, and deduplication patterns, and modeled star-schema fact and dimension tables in Snowflake with surrogate keys and both SCD Type 1 and SCD Type 2 history.",
              "Queried and flattened nested JSON with Snowflake's VARIANT data type and FLATTEN, and built incremental pipelines using Streams for change tracking and Tasks for scheduled, dependency-aware processing.",
              "Configured least-privilege RBAC in Snowflake (users, roles, GRANT), secure views, and dynamic data masking; tuned query performance with Query Profile, micro-partition pruning, and clustering; and controlled spend with resource monitors.",
              "Built a layered dbt project — sources, staging, intermediate, and marts models connected with ref() — materialized as views, tables, and incremental models, with seeds for static reference data and snapshots capturing SCD Type 2 history.",
              "Enforced data quality with dbt's generic tests (not_null, unique, relationships) and custom singular tests, documented every mart-layer model and column in schema.yml, and generated a dbt Docs site with a real lineage graph; wrote custom Jinja macros and used dbt_utils for surrogate keys.",
              "Version-controlled a dbt project in Git and ran it from dbt Cloud's IDE, using per-developer branches and pull requests the way the course teaches, and used dbt Cloud jobs for scheduled runs across dev, staging, and prod environments.",
              "Built Azure Data Factory pipelines with linked services, datasets, and Copy, Lookup, Web, If Condition, ForEach, and Until activities; built mapping data flows with filter, join, aggregate, and pivot transformations; and connected on-premises SQL Server through a self-hosted integration runtime.",
              "Scheduled Data Factory pipelines with schedule, tumbling-window, and event-based triggers, secured credentials with managed identities and Key Vault instead of embedded passwords, and monitored runs and configured retry policies and alerts through the Monitor hub.",
              "Built Power BI data models on a star schema with Power Query transformations, wrote DAX measures using CALCULATE, row/filter context, and iterator functions, and built date-intelligence calculations (YTD/MTD/QTD); built interactive reports with drill-through, bookmarks, and row-level security, and published them to the Power BI Service with scheduled refresh.",
              "Practiced the full software delivery lifecycle — Dev/QA/UAT/Production environments, Agile/Scrum/Kanban work management, and version control with Git (repositories, commits, branches, pull requests, .gitignore) — through a Scrum/Kanban-based project simulation, from a business request through requirements, build, test, and release.",
              "Built two complete end-to-end projects: a three-source (SQL Server, CSV, JSON) Snowflake-to-dbt-to-Power BI analytics pipeline, and a scheduled Azure Data Factory pipeline moving on-premises retail sales data into the cloud for next-morning reporting.",
            ],
          },
        ],
      },
      {
        heading: "Projects",
        entries: [
          {
            left: "Retail Orders Analytics Pipeline — Snowflake & dbt Capstone Project",
            right: "2026",
            sub: "Lifting the Veil IT Academy, Snowflake Data / Analytics Engineer Apprenticeship Program",
            bullets: [
              "Landed three genuinely different raw sources — a SQL Server export, a separate product-catalog CSV, and a nested JSON event feed — into Snowflake using internal stages, COPY INTO, and VARIANT/FLATTEN for the JSON.",
              "Modeled a Snowflake star schema (fact_orders joined to a surrogate-keyed, SCD Type 2 dim_customer) kept current by a Stream-triggered Task instead of a manual reload, backed by least-privilege loader and analyst roles verified with SHOW GRANTS.",
              "Rebuilt the same staging-to-warehouse transformation as a version-controlled dbt project — stg_orders/stg_products/stg_events staging models, an int_orders_enriched intermediate model, and dim_customers/fct_orders marts, with fct_orders materialized as incremental and dim_customers built on a snapshot for real SCD Type 2 history.",
              "Enforced data quality with dbt generic and singular tests, documented every mart column in schema.yml, and generated a dbt Docs site showing the full lineage graph from raw source to mart.",
              "Built a dedicated reporting-layer view (rpt_orders_by_customer) behind a least-privilege bi_reader_role and documented the downstream report as a dbt exposure, then connected Power BI to that view with a deliberate Import vs. DirectQuery decision — never pointing the report at the raw marts tables directly.",
            ],
          },
          {
            left: "Northwind Retail Sales Automation Pipeline — Azure Data Factory Capstone Project",
            right: "2026",
            sub: "Lifting the Veil IT Academy, Snowflake Data / Analytics Engineer Apprenticeship Program",
            bullets: [
              "Translated a stakeholder's plain-language ask — yesterday's sales, cleaned and totaled by region and product category, ready before the 8 AM leadership meeting, with no exposed passwords — into a five-stage pipeline architecture.",
              "Built a self-hosted integration runtime bridging Northwind's on-premises SQL Server into a Copy activity landing raw sales data in ADLS Gen2, then a mapping data flow filtering, joining, and aggregating it into a curated Azure SQL Database table.",
              "Added three-layer error handling (retry, log, alert) so a missing source table or a transient connection failure doesn't silently lose data, and scheduled the pipeline to run unattended every morning with a schedule trigger.",
              "Replaced embedded credentials with managed identities and Key Vault on both the source and sink connections, and made the pipeline's health queryable through Log Analytics instead of something anyone had to guess at.",
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
            sub: "Public portfolio repository for the capstone dbt project",
            bullets: [
              "Initialized a Git repository for the capstone dbt project and used git add/commit/push to publish it to GitHub, with a .gitignore excluding target/, logs, and environment files — every staging, intermediate, and marts model, plus the schema.yml documentation, committed as readable files.",
              "Worked on a feature branch for each new model instead of committing directly to main, following the per-developer-branch habit dbt Cloud builds in, and opened pull requests to merge finished models back.",
              "Wrote a README documenting the pipeline architecture (three raw sources → staging → marts → Power BI) and linked the generated dbt Docs lineage-graph site, since the warehouse objects themselves aren't viewable directly in a plain GitHub browse.",
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
      "Snowflake / Analytics Engineer trained through an advanced, two-stage apprenticeship program covering Snowflake, " +
      "dbt, Azure Data Factory, and Power BI, plus Apache Airflow orchestration, Git/GitHub CI/CD, and Terraform/Bicep " +
      "infrastructure-as-code for the pipeline layer around them. Comfortable owning a pipeline from raw source through " +
      "a tested, documented warehouse model to a scheduled, version-controlled, infrastructure-as-code-provisioned " +
      "production run. Looking to bring that full-stack-plus-orchestration approach to a Snowflake Engineer, " +
      "Analytics Engineer, or Cloud Data Engineer role.",
    skills: [
      "Cloud Data Warehousing (Snowflake)",
      "Analytics Engineering & Data Modeling (dbt)",
      "ELT Pipeline Development (Snowflake, Azure Data Factory)",
      "Pipeline Orchestration (Apache Airflow)",
      "Dimensional Modeling, SCD & Incremental Loading",
      "Data Testing & Documentation (dbt tests, dbt Docs)",
      "T-SQL Querying & Database Design",
      "Data Visualization & DAX (Power BI)",
      "Git/GitHub Version Control & Code Review",
      "CI/CD Pipelines (GitHub Actions)",
      "Infrastructure as Code (Terraform, Bicep)",
      "RBAC & Least-Privilege Security",
      "Requirements Gathering & Stakeholder Communication",
    ],
    tools: "Snowflake, dbt Cloud, SSMS, Power BI Desktop & Service, Azure Data Factory, Apache Airflow, Git, GitHub (Actions, Pull Requests), Terraform, Bicep, Azure Key Vault",
    sections: [
      {
        heading: "Training & Certifications",
        entries: [
          {
            left: "Lifting the Veil IT Academy — Apprenticeship Program",
            right: "Jan 2026 – Jun 2026",
            sub: "Snowflake Data / Analytics Engineer Track (Job Ready) + Orchestration, CI/CD & Infrastructure-as-Code Specialization (Advanced) · Atlanta, GA",
            bullets: [
              "Completed an intensive, project-based apprenticeship covering cloud data warehousing, analytics engineering, pipeline development, orchestration, CI/CD, and infrastructure-as-code, using hands-on assignments built against real, multi-source data.",
              "Wrote T-SQL ranging from joins and filtering to advanced patterns — CTEs including recursive CTEs, window and ranking functions, subqueries, and parameterized stored procedures — and applied database normalization and dimensional modeling to transactional and star-schema designs.",
              "Worked directly in Snowflake's architecture of separated storage, compute, and cloud services; loaded data through internal/external stages, COPY INTO, and Snowpipe; and built ELT transformations with CTAS, incremental loading, and deduplication.",
              "Modeled star-schema fact and dimension tables in Snowflake with surrogate keys and SCD Type 1/2 history, queried and flattened nested JSON with VARIANT/FLATTEN, and built incremental pipelines with Streams and Tasks.",
              "Configured least-privilege RBAC in Snowflake (users, roles, GRANT), secure views, and dynamic data masking; tuned performance with Query Profile, micro-partition pruning, and clustering; and controlled spend with resource monitors.",
              "Built a layered dbt project — sources, staging, intermediate, and marts models connected with ref() — enforced with generic and singular tests, documented in schema.yml and a generated dbt Docs site, and version-controlled with per-developer branches and pull requests.",
              "Built Azure Data Factory pipelines with linked services, Copy/Lookup/Web/If Condition/ForEach/Until activities, and mapping data flows, connecting on-premises SQL Server through a self-hosted integration runtime and securing credentials with managed identities and Key Vault.",
              "Scheduled Data Factory pipelines with schedule, tumbling-window, and event-based triggers, and monitored runs with retry policies, alerts, and the Monitor hub.",
              "Built Power BI data models on a star schema with Power Query, wrote DAX measures (CALCULATE, filter context, iterator functions, date intelligence), and built interactive reports with drill-through, row-level security, and scheduled refresh in the Power BI Service.",
              "Built Airflow DAGs with PythonOperator/BashOperator tasks, explicit dependencies, and XComs passing data between tasks, and used Connections and provider hooks to load and query Snowflake from a DAG instead of hardcoding credentials.",
              "Added a sensor/branch step to a DAG driven by real data conditions, triggered a dbt build from Airflow against data the DAG had just loaded, and configured retries and an on-failure alert — proven by deliberately failing a task and watching the retry and alert actually fire.",
              "Worked with Git branching strategies (merge vs. rebase, resolving conflicts) and the GitHub workflow (remotes, push/pull/fetch, pull requests, code review, Issues/Project boards), plus data-specific Git practices — .gitignore for data projects, Git LFS for large files, and versioning SQL/dbt projects and notebooks.",
              "Learned CI/CD concepts and pipelines-as-code, and built GitHub Actions workflows running dbt models and tests automatically on every pull request, with a separate deploy job gated to a push on main and secrets managed through GitHub instead of the repository.",
              "Provisioned Azure data-platform infrastructure as code with Terraform — resource blocks, variables/outputs, and a reusable landing-zone module provisioning a Storage Account and Event Hub together behind a remote state backend — and deployed a resource group and Azure SQL with Bicep, reviewing a terraform plan before every apply.",
              "Practiced the full software delivery lifecycle — Dev/QA/UAT/Production environments, Agile/Scrum/Kanban work management, and version control with Git — through a Scrum/Kanban-based project simulation, from a business request through requirements, build, test, and release.",
              "Built four complete end-to-end projects: a three-source Snowflake-to-dbt-to-Power BI analytics pipeline; a scheduled Azure Data Factory pipeline; an Airflow DAG orchestrating extraction, a Snowflake load, and a dbt run with retries and alerting; and a CI/CD-gated version of the dbt project with GitHub Actions running tests on every pull request.",
            ],
          },
          { left: "SnowPro Core Certification", right: "Exam scheduled" },
        ],
      },
      {
        heading: "Projects",
        entries: [
          {
            left: "Retail Orders Analytics Pipeline — Snowflake & dbt Capstone Project",
            right: "2026",
            sub: "Lifting the Veil IT Academy, Snowflake Data / Analytics Engineer Apprenticeship Program",
            bullets: [
              "Landed three genuinely different raw sources — a SQL Server export, a separate product-catalog CSV, and a nested JSON event feed — into Snowflake using internal stages, COPY INTO, and VARIANT/FLATTEN for the JSON.",
              "Modeled a Snowflake star schema (fact_orders joined to a surrogate-keyed, SCD Type 2 dim_customer) kept current by a Stream-triggered Task, backed by least-privilege loader and analyst roles verified with SHOW GRANTS.",
              "Rebuilt the same staging-to-warehouse transformation as a version-controlled dbt project — staging, intermediate, and marts models, with fct_orders materialized as incremental and dim_customers built on a snapshot for real SCD Type 2 history — enforced with generic and singular tests and a generated dbt Docs lineage graph.",
              "Built a dedicated reporting-layer view behind a least-privilege bi_reader_role, documented as a dbt exposure, and connected Power BI to that view with a deliberate Import vs. DirectQuery decision.",
            ],
          },
          {
            left: "Orchestrated ELT Pipeline — Airflow Capstone Project",
            right: "2026",
            sub: "Lifting the Veil IT Academy, Snowflake Data / Analytics Engineer Apprenticeship Program",
            bullets: [
              "Designed a multi-task Airflow DAG with real extract, load, and transform tasks connected by explicit dependencies, passing a row count between tasks with an XCom to drive a downstream decision.",
              "Configured a real Snowflake Connection used by a provider hook to load data, with a sensor/branch step whose condition is driven by that data rather than a hardcoded value.",
              "Wired a task to trigger a dbt build against the data the DAG had just loaded, tying orchestration directly to the retail-orders-analytics transformation layer.",
              "Configured retries and an on-failure alert on the tasks that touch external systems, and proved both actually fire by deliberately failing a task once.",
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
              "Set up proper Git hygiene on the retail-orders-analytics dbt project from the start: a .gitignore covering target/, dbt_packages/, logs/, and .env, feature branches instead of direct pushes to main, and a commit history of real, descriptive messages.",
              "Opened and reviewed a real pull request — at least one line comment and one suggestion — before merging a new model into main, instead of merging on trust.",
              "Wrote a .github/workflows/ci.yml GitHub Actions workflow that runs dbt build on every pull request against main, and proved it actually catches problems by opening a deliberately broken commit as a PR and watching it fail before fixing it.",
              "Added a second, separate deploy job gated to only run on a push to main, using its own target and GitHub-managed secrets referenced via ${{ secrets.* }} instead of anything committed to the repository.",
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
