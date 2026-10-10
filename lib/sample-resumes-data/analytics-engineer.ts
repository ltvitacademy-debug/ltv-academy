import type { PathResumes } from "../sampleResumeTypes";

const CONTACT = ["Atlanta, GA", "(404) 555-0182", "john.doe@example.com", "linkedin.com/in/johndoe-biexample"];

export const RESUMES: PathResumes = {
  "job-ready": {
    levelLabel: "Job Ready",
    name: "John Doe",
    contact: CONTACT,
    summary:
      "Analytics Engineer trained in T-SQL, Snowflake, dbt, and Power BI through a hands-on, project-based program. Built " +
      "a complete analytics pipeline end to end — three differently-shaped raw sources loaded into Snowflake, modeled and " +
      "tested as a version-controlled dbt project, and served through a Power BI report connected to a least-privilege " +
      "reporting layer, all deployed through a real GitHub Actions CI/CD pipeline. Bringing that full modern-data-stack " +
      "approach to an Analytics Engineer, Data/Analytics Engineer, or SQL/BI Developer role.",
    skills: [
      "SQL Development & Database Design (T-SQL)",
      "Cloud Data Warehousing (Snowflake)",
      "Analytics Engineering & Data Modeling (dbt)",
      "Data Visualization & DAX (Power BI)",
      "ELT Pipeline Design (Staging → Marts)",
      "Data Testing & Documentation (dbt tests, docs, exposures)",
      "Version Control & CI/CD (Git, GitHub Actions)",
      "Requirements Gathering & Stakeholder Communication",
    ],
    sections: [
      {
        heading: "Training",
        entries: [
          {
            left: "Lifting the Veil IT Academy — Apprenticeship Program",
            right: "Jan 2026 – Jun 2026",
            sub: "Analytics Engineer Track · Atlanta, GA",
            bullets: [
              "Completed an intensive, project-based program covering T-SQL development, cloud data warehousing in Snowflake, analytics engineering with dbt, Power BI, and Git/GitHub version control and CI/CD, through hands-on labs built against real relational and cloud warehouse data.",
              "Wrote T-SQL across the full range — multi-table joins (INNER/LEFT/RIGHT/FULL OUTER/CROSS/SELF), GROUP BY/HAVING aggregation, correlated and multi-value subqueries, Common Table Expressions including recursive CTEs, and window/ranking functions (ROW_NUMBER, RANK, DENSE_RANK, NTILE, OVER/PARTITION BY).",
              "Created parameterized stored procedures with TRY/CATCH error handling and explicit transactions (BEGIN/COMMIT/ROLLBACK), and tuned query performance by reading execution plans, choosing clustered vs. nonclustered indexes, and rewriting non-SARGable WHERE clauses.",
              "Applied database normalization (1NF–3NF) and dimensional modeling — fact and dimension tables, star and snowflake schemas, slowly changing dimensions, surrogate vs. natural keys — to design both transactional schemas and warehouse models.",
              "Built Power BI data models and reports: Power Query transformations, star-schema relationships, DAX measures (CALCULATE, filter/row context, iterator functions), YTD/MTD/QTD time intelligence, row-level security, and a capstone dashboard published and scheduled in the Power BI Service.",
              "Stood up Snowflake virtual warehouses and loaded data from internal/external stages with COPY INTO and Snowpipe, including semi-structured JSON parsed with the VARIANT type and FLATTEN.",
              "Modeled Snowflake warehouses with surrogate keys and SCD Type 1/Type 2 dimensions, kept current through Streams and Tasks instead of full reloads, and configured least-privilege RBAC roles verified with SHOW GRANTS.",
              "Applied evidence-based Snowflake performance tuning using Query Profile, clustering keys, and warehouse sizing, and connected Power BI to Snowflake with a deliberate Import vs. DirectQuery decision.",
              "Built dbt projects layered into staging, intermediate, and marts models using sources.yml and ref(), with generic tests (not_null, unique, relationships), singular tests encoding business rules, and documentation generated into a dbt Docs lineage graph.",
              "Built dbt snapshots for SCD Type 2 dimension history and incremental fact models with merge/delete+insert strategies, wrote custom Jinja macros, and used dbt_utils packages for tasks like surrogate-key generation.",
              "Built a dedicated dbt reporting layer and a least-privilege role for the Power BI connection, and documented that downstream report as a dbt exposure so the generated lineage graph didn't stop at the last model.",
              "Used Git for version control — init/add/commit, branching, merge vs. rebase, resolving conflicts — and GitHub for remotes, pull requests, code review, and issue/project boards.",
              "Applied Git practices specific to data projects — .gitignore patterns for dbt and notebook projects, the notebook diff problem, and Git LFS for large files.",
              "Built a GitHub Actions CI/CD pipeline for a dbt project: a workflow running dbt build and tests on every pull request, a separate deploy job gated to merges on main, and environment secrets instead of committed credentials.",
              "Practiced the full software delivery lifecycle — Agile/Scrum/Kanban, Dev/QA/UAT/Production environments, and release planning — through a project simulation, from a business request through requirements, build, test, and release.",
              "Built a complete, end-to-end capstone project — raw SQL Server, CSV, and JSON sources loaded into Snowflake, modeled with dbt into tested and documented marts, connected to Power BI through a least-privilege reporting layer, and version-controlled with a real CI/CD pipeline — simulating the full scope of an Analytics Engineer role.",
            ],
          },
        ],
      },
      {
        heading: "Projects",
        entries: [
          {
            left: "Retail Orders Analytics Pipeline — Capstone Project",
            right: "2026",
            sub: "Lifting the Veil IT Academy, Analytics Engineer Apprenticeship Program",
            bullets: [
              "Loaded three genuinely different raw sources — a SQL Server export, a standalone product CSV, and a nested JSON feed — into a Snowflake raw schema, using COPY INTO and VARIANT/FLATTEN to turn the JSON feed into relational tables.",
              "Modeled a Snowflake star schema (fact_orders, dim_customer) with a surrogate key and SCD Type 2 customer history, refreshed automatically through a Stream-and-Task pipeline instead of a manual reload.",
              "Configured least-privilege Snowflake roles (a loader role and a read-only analyst role) and proved the access boundary with SHOW GRANTS rather than assuming it was correct.",
              "Rebuilt the same staging-to-warehouse transformation as a version-controlled dbt project (retail-orders-analytics) — staging models, an intermediate model, and a fct_orders/dim_customers marts layer — backed by generic and singular tests and a generated dbt Docs lineage graph.",
              "Added a snapshot-backed SCD Type 2 dim_customers and an incremental fct_orders model, plus a dedicated reporting layer (rpt_orders_by_customer) and a least-privilege bi_reader_role so Power BI never queried the marts tables directly, and documented the connection as a dbt exposure.",
              "Put the dbt project in Git with meaningful commit history and feature branches merged through reviewed pull requests, then built a GitHub Actions workflow that runs dbt build on every pull request and a separate job that deploys only on a merge to main using GitHub secrets instead of committed credentials.",
              "Proved the CI pipeline actually catches failures by opening a deliberately broken pull request and watching the check fail, before merging a corrected version.",
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
            sub: "Public portfolio repository for the capstone project",
            bullets: [
              "Published the capstone dbt project to GitHub with a .gitignore excluding target/, dbt_packages/, logs/, and .env, and a commit history with meaningful messages instead of placeholder \"fix\"/\"stuff\" commits.",
              "Included the .github/workflows/ci.yml GitHub Actions workflow and a README documenting the architecture and key design decisions, so a reviewer can see exactly how a change is proposed, tested, reviewed, and deployed without a live walkthrough.",
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
      "Analytics Engineer trained through an advanced, two-stage program adding Azure Data Factory and Apache Airflow " +
      "orchestration on top of a T-SQL, Snowflake, dbt, and Power BI foundation. Comfortable owning a pipeline end to " +
      "end — from an on-premises source through cloud orchestration, a tested dbt warehouse, and into a report someone " +
      "trusts — and automating the scheduling, retries, and alerting that keep it running unattended. Bringing that " +
      "full pipeline-ownership approach to an Analytics Engineer or Data/Analytics " +
      "Architect role.",
    skills: [
      "SQL Development & Database Design (T-SQL)",
      "Cloud Data Warehousing (Snowflake)",
      "Analytics Engineering & Data Modeling (dbt)",
      "Data Visualization & DAX (Power BI)",
      "Cloud & Hybrid Pipeline Orchestration (Azure Data Factory, Apache Airflow)",
      "Workflow Automation & DAGs (Python)",
      "Data Testing & Documentation (dbt tests, docs, exposures)",
      "Version Control & CI/CD (Git, GitHub Actions, ADF Git Integration)",
      "Secrets & Access Management (Managed Identities, Key Vault, Snowflake RBAC)",
      "Requirements Gathering & Stakeholder Communication",
    ],
    tools:
      "SSMS, Snowsight, dbt Cloud/Core, Power BI Desktop & Service, Azure Data Factory, Apache Airflow, Git, GitHub, GitHub Actions, VS Code",
    sections: [
      {
        heading: "Training & Certifications",
        entries: [
          {
            left: "Lifting the Veil IT Academy — Apprenticeship Program",
            right: "Jan 2026 – Jun 2026",
            sub: "Analytics Engineer Track (Job Ready) + Pipeline Orchestration Specialization (Advanced) · Atlanta, GA",
            bullets: [
              "Completed an intensive, project-based program covering T-SQL development, cloud data warehousing in Snowflake, analytics engineering with dbt, Power BI, Git/GitHub version control and CI/CD, Azure Data Factory, and Apache Airflow, through hands-on labs built against real relational, cloud warehouse, and orchestrated pipeline scenarios.",
              "Wrote T-SQL across the full range — multi-table joins (INNER/LEFT/RIGHT/FULL OUTER/CROSS/SELF), GROUP BY/HAVING aggregation, correlated and multi-value subqueries, Common Table Expressions including recursive CTEs, and window/ranking functions (ROW_NUMBER, RANK, DENSE_RANK, NTILE, OVER/PARTITION BY).",
              "Created parameterized stored procedures with TRY/CATCH error handling and explicit transactions (BEGIN/COMMIT/ROLLBACK), and tuned query performance by reading execution plans, choosing clustered vs. nonclustered indexes, and rewriting non-SARGable WHERE clauses.",
              "Applied database normalization (1NF–3NF) and dimensional modeling — fact and dimension tables, star and snowflake schemas, slowly changing dimensions, surrogate vs. natural keys — to design both transactional schemas and warehouse models.",
              "Built Power BI data models and reports: Power Query transformations, star-schema relationships, DAX measures (CALCULATE, filter/row context, iterator functions), YTD/MTD/QTD time intelligence, row-level security, and a capstone dashboard published and scheduled in the Power BI Service.",
              "Stood up Snowflake virtual warehouses and loaded data from internal/external stages with COPY INTO and Snowpipe, including semi-structured JSON parsed with the VARIANT type and FLATTEN.",
              "Modeled Snowflake warehouses with surrogate keys and SCD Type 1/Type 2 dimensions, kept current through Streams and Tasks instead of full reloads, and configured least-privilege RBAC roles verified with SHOW GRANTS.",
              "Built dbt projects layered into staging, intermediate, and marts models using sources.yml and ref(), with generic and singular tests, documentation generated into a dbt Docs lineage graph, snapshots for SCD Type 2 history, incremental models, custom Jinja macros, and dbt_utils packages.",
              "Built a dedicated dbt reporting layer and least-privilege role for the Power BI connection, and documented that downstream report as a dbt exposure so lineage didn't stop at the last model.",
              "Used Git for version control — branching, merge vs. rebase, resolving conflicts — and GitHub for pull requests, code review, and issue/project boards; applied .gitignore patterns and Git LFS specific to data projects; and built a GitHub Actions CI/CD pipeline running dbt build and tests on every pull request, with a separate deploy job gated to merges on main and environment secrets instead of committed credentials.",
              "Built Azure Data Factory pipelines connecting on-premises SQL Server (via a self-hosted integration runtime) and Azure Blob Storage, using Copy Activity, Lookup/Stored Procedure/Web/Wait/Set Variable activities, and parameterized linked services and datasets.",
              "Built Data Factory control-flow logic with If Condition, Switch, ForEach, Until, and Execute Pipeline activities and the pipeline expression language, and built mapping data flows with filter, derived column, join, aggregate, and conditional split/pivot transformations, tuned for performance.",
              "Scheduled Data Factory pipelines with schedule, tumbling-window, and event-based triggers with chained dependencies; secured connections with managed identities and Key Vault instead of plaintext credentials; and monitored runs through the Monitor hub, Log Analytics, alerts, and layered retry/log/alert error handling.",
              "Compared Azure Data Factory to Fabric Data Factory (Dataflow Gen2, OneLake as a destination), and version-controlled and deployed Data Factory pipelines using built-in Git integration and ARM templates/Azure DevOps pipelines.",
              "Built Apache Airflow DAGs with PythonOperator/BashOperator tasks, explicit dependencies, and XComs passing data between tasks, using Connections and hooks instead of hardcoded credentials.",
              "Used sensors and BranchPythonOperator branching so a DAG's path depended on real data or state, and triggered dbt build runs from Airflow against a Snowflake warehouse.",
              "Configured retries, retry_delay, and failure-alerting callbacks on tasks touching external systems, and proved the alerting worked by deliberately failing a task and watching the retry and alert fire.",
              "Practiced the full software delivery lifecycle — Agile/Scrum/Kanban, Dev/QA/UAT/Production environments, and release planning — through a project simulation, from a business request through requirements, build, test, and release.",
              "Built a complete, end-to-end capstone project chain — raw SQL Server, CSV, and JSON sources loaded into Snowflake, modeled with dbt into tested and documented marts, orchestrated and monitored with Airflow, connected to Power BI through a least-privilege reporting layer, and version-controlled with a real CI/CD pipeline — simulating the full scope of an Analytics Engineer role across the modern data stack.",
            ],
          },
        ],
      },
      {
        heading: "Projects",
        entries: [
          {
            left: "Retail Orders Analytics Pipeline — Capstone Project",
            right: "2026",
            sub: "Lifting the Veil IT Academy, Analytics Engineer Apprenticeship Program",
            bullets: [
              "Loaded three genuinely different raw sources — a SQL Server export, a standalone product CSV, and a nested JSON feed — into a Snowflake raw schema, using COPY INTO and VARIANT/FLATTEN to turn the JSON feed into relational tables.",
              "Modeled a Snowflake star schema (fact_orders, dim_customer) with a surrogate key and SCD Type 2 customer history, refreshed automatically through a Stream-and-Task pipeline instead of a manual reload, and configured least-privilege Snowflake roles verified with SHOW GRANTS.",
              "Rebuilt the same staging-to-warehouse transformation as a version-controlled dbt project (retail-orders-analytics) — staging models, an intermediate model, and a fct_orders/dim_customers marts layer with a snapshot-backed SCD Type 2 dimension and an incremental fact model — backed by generic and singular tests and a generated dbt Docs lineage graph.",
              "Built a dedicated reporting layer (rpt_orders_by_customer) and a least-privilege bi_reader_role so Power BI never queried the marts tables directly, and documented the connection as a dbt exposure.",
              "Put the dbt project in Git with meaningful commit history and feature branches merged through reviewed pull requests, then built a GitHub Actions workflow that runs dbt build on every pull request and a separate job that deploys only on a merge to main using GitHub secrets instead of committed credentials, proving the pipeline catches failures with a deliberately broken pull request.",
              "Orchestrated the retail-orders-analytics dbt project from an Airflow DAG — a Snowflake extract/load task, a branch driven by real data, and a triggered dbt build against Snowflake — with retries and failure alerting on the external-facing tasks, proven by deliberately failing a task and watching the retry and alert fire.",
            ],
          },
          {
            left: "Northwind Retail Sales Automation Pipeline — Azure Data Factory Capstone Project",
            right: "2026",
            sub: "Lifting the Veil IT Academy, Azure Data Factory Course Capstone",
            bullets: [
              "Translated a stakeholder's plain-language request — yesterday's sales cleaned up and totaled by region and product category, ready before an 8 AM leadership meeting, with no exposed passwords — into a five-stage pipeline architecture spanning an on-premises database through a curated Azure SQL table.",
              "Built a self-hosted integration runtime connection to on-premises SQL Server, a Copy Activity landing raw sales data in an ADLS Gen2 raw zone, and a mapping data flow (filter → join → aggregate) producing accurate sales totals by region and category.",
              "Scheduled the pipeline to run unattended every morning with a schedule trigger, added layered retry/log/alert error handling for a missing source table or a transient connection failure, and secured every credential with managed identities and Key Vault.",
              "Monitored the finished pipeline through the Monitor hub and a Log Analytics query, and presented the finished architecture back against each of the four original stakeholder requirements.",
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
            sub: "Public portfolio repository for the capstone project",
            bullets: [
              "Published the capstone dbt project to GitHub with a .gitignore excluding target/, dbt_packages/, logs/, and .env, and a commit history with meaningful messages instead of placeholder \"fix\"/\"stuff\" commits.",
              "Included the .github/workflows/ci.yml GitHub Actions workflow and a README documenting the architecture and key design decisions, so a reviewer can see exactly how a change is proposed, tested, reviewed, and deployed without a live walkthrough.",
            ],
          },
          {
            left: "Data Factory Git Integration — Northwind Retail Pipeline",
            right: "2026",
            sub: "Version-controlled factory resources",
            bullets: [
              "Connected the Northwind Retail Data Factory instance to a Git repository using Data Factory's built-in Git integration, publishing pipeline, dataset, and linked service definitions as versioned JSON/ARM template files instead of unsaved changes living only in the Studio UI.",
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
