import type { PathResumes } from "../sampleResumeTypes";

const CONTACT = ["Atlanta, GA", "(404) 555-0182", "john.doe@example.com", "linkedin.com/in/johndoe-biexample"];

export const RESUMES: PathResumes = {
  "job-ready": {
    levelLabel: "Job Ready",
    name: "John Doe",
    contact: CONTACT,
    summary:
      "AWS Data Engineer trained in T-SQL, Python, Apache Spark, and the core AWS data services — S3, Glue, Athena, " +
      "Redshift, Lambda, Step Functions, DMS, EMR, Kinesis, and CloudWatch — through a hands-on apprenticeship. Built " +
      "and orchestrated real multi-service AWS pipelines, from a Kinesis clickstream feed to an orchestrated Glue ETL " +
      "and Step Functions workflow. Bringing that foundation to an AWS Data Engineer or Data Engineer role.",
    skills: [
      "T-SQL Querying & Relational Database Design",
      "Python for Data Engineering (Pandas, REST APIs, ETL Scripting)",
      "Apache Spark & PySpark (DataFrames, Spark SQL, Window Functions)",
      "Data Lake Design Patterns (Raw/Cleansed/Curated Zones, Parquet, Partitioning)",
      "AWS Core Services & IAM (EC2, Lambda, S3, VPC, Shared Responsibility Model)",
      "AWS Data Services (S3, Glue, Athena, Redshift, Lambda, Step Functions, DMS, EMR, Kinesis, CloudWatch)",
      "Pipeline Orchestration & Monitoring (Step Functions, CloudWatch Alarms)",
      "Agile/Scrum Delivery, Kanban & the SDLC",
      "Version Control (Git/GitHub)",
    ],
    sections: [
      {
        heading: "Training",
        entries: [
          {
            left: "Lifting the Veil IT Academy — Apprenticeship Program",
            right: "Jan 2026 – Jun 2026",
            sub: "AWS Data Engineer Track · Atlanta, GA",
            bullets: [
              "Completed an intensive, project-based apprenticeship covering T-SQL, Python, Apache Spark, and AWS data engineering services, using hands-on assignments built against real database, Python, and AWS environments.",
              "Wrote T-SQL ranging from joins, grouping, and aggregation to correlated and multi-value subqueries, Common Table Expressions (CTEs), temporary tables, window and ranking functions (ROW_NUMBER, RANK, DENSE_RANK, NTILE, OVER/PARTITION BY), and parameterized stored procedures.",
              "Built Python ETL scripts — reading CSV and JSON, calling REST APIs, cleaning data with pandas DataFrames, and connecting Python to SQL — then scaled the same logic to Apache Spark with PySpark DataFrames, Spark SQL, joins, window functions, null handling, and partitioned Parquet output.",
              "Practiced data lake design patterns — raw/cleansed/curated zones and Bronze/Silver/Gold architecture, choosing among CSV, JSON, Parquet, and Delta file formats, and partitioning strategy for query performance.",
              "Learned core AWS concepts — regions and availability zones, the shared responsibility model, IAM users/groups/roles/policies, and least-privilege access patterns for data pipelines — plus the AWS CLI and SDK.",
              "Built on Amazon S3 as a data lake foundation: bucket and object design, storage classes, partitioning strategy, and S3 event notifications.",
              "Cataloged and transformed data with AWS Glue — crawlers, the Glue Data Catalog, Python/Scala Spark ETL jobs, job bookmarks, and Glue triggers and workflows — then queried it with Amazon Athena, including partition design and cost optimization.",
              "Loaded and queried an Amazon Redshift data warehouse — cluster vs. Serverless, the COPY command, distribution and sort keys, Redshift Spectrum, and workload management.",
              "Built event-driven processing with AWS Lambda (S3 triggers, and Lambda's limitations for data workloads) and orchestrated multi-step pipelines with AWS Step Functions — state machines, retries, and Catch-based error handling.",
              "Migrated and replicated data with AWS Database Migration Service (DMS), including change data capture (CDC), and ran big-data Spark workloads on Amazon EMR.",
              "Built real-time streaming pipelines with Kinesis Data Streams, Kinesis Data Firehose, and Kinesis Data Analytics, and monitored pipeline services end to end with CloudWatch alarms and dashboards.",
              "Practiced the full software delivery lifecycle — Agile/Scrum sprints and user stories, Kanban boards, the Dev/QA/UAT/Production chain, and version control with Git (repositories, commits, branches, pull requests) — by taking a real business request (a Castlebridge Retail sales dashboard) through user stories, a QA test plan, a UAT sign-off, release notes, and a simulated production incident.",
            ],
          },
        ],
      },
      {
        heading: "Projects",
        entries: [
          {
            left: "Real-Time Clickstream Analytics Pipeline",
            right: "2026",
            sub: "Lifting the Veil IT Academy, AWS Data Engineer Apprenticeship Program",
            bullets: [
              "Built a streaming ingestion pipeline with a Kinesis Data Stream as the write target and a Kinesis Data Firehose delivery stream reading directly from it, landing clickstream events in S3 partitioned by ingestion time (year/month/day/hour).",
              "Cataloged the landed event data with a Glue crawler and queried it in Amazon Athena, separating durable real-time stream handling from cheap, ad hoc analysis of the archived events.",
            ],
          },
          {
            left: "Orchestrated Glue ETL Pipeline",
            right: "2026",
            sub: "Lifting the Veil IT Academy, AWS Data Engineer Apprenticeship Program",
            bullets: [
              "Built a three-stage AWS Step Functions state machine chaining a Glue crawler, a Glue ETL job, and a Lambda completion notification, with retry/backoff on the crawler step and a shared Catch state routing either stage's failure to one failure-notification path.",
              "Used the Step Functions console's execution view to trace exactly where a run succeeded or failed, state by state, instead of relying on scattered logic spread across separate Lambda functions.",
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
      "AWS Data Engineer trained through an advanced, two-stage apprenticeship covering the core AWS data engineering " +
      "stack plus Databricks and Delta Lake, infrastructure as code with Terraform, and a real Git/GitHub/CI-CD " +
      "workflow. Built a complete, production-grade AWS data platform end to end — ingestion through cataloging, " +
      "transformation, warehousing, and orchestration — then hardened it with monitoring, least-privilege IAM, CI/CD, " +
      "cost optimization, and a documented disaster-recovery plan. Bringing that full build-and-operate approach to " +
      "an AWS Data Engineer, Data Engineer, or Cloud Data Platform Engineer role.",
    skills: [
      "T-SQL Querying & Relational Database Design",
      "Python for Data Engineering (Pandas, REST APIs, ETL Scripting)",
      "Apache Spark & PySpark (DataFrames, Spark SQL, Window Functions)",
      "AWS Data Services (S3, Glue, Athena, Redshift, Lambda, Step Functions, DMS, EMR, Kinesis, CloudWatch)",
      "Pipeline Orchestration, Monitoring & Alerting (Step Functions, CloudWatch)",
      "Databricks & Delta Lake (Clusters, Notebooks, ACID Transactions, Time Travel, Schema Evolution)",
      "Medallion Architecture & Unity Catalog (Bronze/Silver/Gold, Access Control, Data Lineage)",
      "Infrastructure as Code (Terraform: Resource Blocks, Modules, State, Plan/Apply Workflow)",
      "Git, GitHub & CI/CD for Data (Branching, Pull Requests, Code Review, GitHub Actions)",
      "Production Practices: Least-Privilege IAM, Cost Optimization, Disaster Recovery (RTO/RPO)",
      "Agile/Scrum Delivery, Kanban & the SDLC",
    ],
    tools:
      "AWS Console & CLI, S3, Glue, Athena, Redshift, Lambda, Step Functions, DMS, EMR, Kinesis, CloudWatch, Databricks, Delta Lake, Terraform, Git, GitHub Actions, SSMS",
    sections: [
      {
        heading: "Training & Certifications",
        entries: [
          {
            left: "Lifting the Veil IT Academy — Apprenticeship Program",
            right: "Jan 2026 – Jun 2026",
            sub: "AWS Data Engineer Track (Job Ready) + Databricks, Terraform & Git/CI-CD Specialization (Advanced) · Atlanta, GA",
            bullets: [
              "Completed an intensive, project-based apprenticeship covering T-SQL, Python, Apache Spark, the full AWS data engineering service stack, Databricks/Delta Lake, infrastructure as code, and Git/GitHub/CI-CD, using hands-on assignments built against real database, Python, AWS, and Databricks environments.",
              "Wrote T-SQL ranging from joins and aggregation to CTEs, window/ranking functions, and parameterized stored procedures, and built Python/PySpark ETL logic — DataFrames, Spark SQL, joins, window functions, and partitioned Parquet output.",
              "Worked across the full AWS data engineering stack: S3 as a data lake foundation, IAM least-privilege patterns, Glue crawlers/catalog/ETL jobs, Athena, Redshift (COPY, distribution/sort keys, Serverless vs. cluster), Lambda, Step Functions state machines, DMS/CDC, EMR, Kinesis streaming, and CloudWatch monitoring.",
              "Built Databricks clusters and notebooks, and worked directly with Delta Lake tables — ACID transactions and the transaction log, schema enforcement and evolution, time travel, UPDATE/DELETE/MERGE, and file compaction with OPTIMIZE and VACUUM.",
              "Designed Medallion-architecture pipelines (Bronze raw ingestion, Silver cleaned/conformed data, Gold business-level aggregates), including Autoloader-based incremental ingestion, Structured Streaming from Bronze to Silver, and data-quality checks across the flow.",
              "Applied Unity Catalog governance — the three-level namespace, managed vs. external tables, GRANT/REVOKE access control, and data lineage — and built declarative Lakeflow pipelines with expectations-based data-quality checks.",
              "Wrote Terraform configurations — providers, resource blocks, variables and outputs, and modules — to provision cloud infrastructure as code with a plan-then-apply workflow instead of manual console changes, including remote state management and importing existing resources into state.",
              "Set up Git repositories with proper hygiene (.gitignore, feature branches, meaningful commit messages), opened and reviewed pull requests with real review comments, and built GitHub Actions CI/CD workflows — a test job triggered on every pull request and a separate, more narrowly-scoped deploy job gated to merges on main, with secrets passed through GitHub Secrets rather than committed to the repository.",
              "Practiced the full software delivery lifecycle — Agile/Scrum sprints and user stories, Kanban boards, the Dev/QA/UAT/Production chain, and Git-based version control — by taking a real business request through user stories, a QA test plan, a UAT sign-off, release notes, and a simulated production incident.",
              "Built a complete, end-to-end AWS data platform capstone — ingesting a retailer's order and inventory data into S3, cataloging and transforming it with Glue, loading it into Redshift Serverless, exposing it to ad hoc SQL through Athena, and orchestrating the nightly run with Step Functions — then production-hardened it with CloudWatch monitoring, least-privilege IAM, CI/CD deployment, a cost-optimization pass, and a documented disaster-recovery plan.",
            ],
          },
          { left: "AWS Certified Data Engineer – Associate", right: "Exam scheduled" },
        ],
      },
      {
        heading: "Projects",
        entries: [
          {
            left: "Northfield Outdoor Supply AWS Data Platform — Capstone Project",
            right: "2026",
            sub: "Lifting the Veil IT Academy, AWS Data Engineer Apprenticeship Program",
            bullets: [
              "Designed and built a serverless-first AWS data pipeline for a simulated mid-size retailer, replacing a nightly manual spreadsheet export with an automated platform delivering same-day sales and inventory visibility.",
              "Ingested nightly order and inventory exports into a date-partitioned S3 raw zone with a _SUCCESS completion marker and server-side encryption, then cataloged both prefixes with a Glue crawler into a shared Glue Data Catalog.",
              "Wrote a PySpark Glue ETL job to type-correct, normalize, and deduplicate the raw orders data, computing an order_total column and writing partitioned, Snappy-compressed Parquet to a curated zone, with job bookmarks keeping nightly runs incremental.",
              "Loaded curated data into a Redshift Serverless warehouse via the COPY command into a star schema (fact_orders plus product, customer, and date dimensions), choosing Serverless over a provisioned cluster to match the retailer's bursty, month-end-heavy query pattern.",
              "Exposed ad hoc querying through a dedicated Athena workgroup with a per-query scanned-bytes guardrail, and orchestrated the full crawler-to-ETL-to-Redshift chain nightly with an AWS Step Functions state machine, triggered by EventBridge and backed by a Catch-based failure path.",
              "Added two independent CloudWatch alarms (Glue job failure, Step Functions execution failure) feeding a single pipeline health dashboard; three least-privilege IAM roles scoped to exact resource ARNs; an S3 lifecycle policy tiering aging raw data to Standard-IA and Glacier Instant Retrieval; and a documented disaster-recovery plan with a stated RTO/RPO per failure scenario.",
              "Deployed the Glue ETL script and Step Functions state machine definition through a GitHub Actions workflow that assumes an IAM role via OIDC on every merge to main, with no long-lived AWS credentials stored in the repository.",
            ],
          },
        ],
      },
      {
        heading: "GitHub Portfolio",
        entries: [
          {
            left: "github.com/johndoe-biexample/northfield-data-platform",
            right: "2026",
            sub: "Public portfolio repository for the AWS Capstone project",
            bullets: [
              "Version-controlled the capstone's deployable artifacts — the Glue ETL script and the Step Functions state machine's Amazon States Language definition — with a GitHub Actions deploy workflow (.github/workflows/deploy.yml) triggered on merge to main.",
              "Applied the same Git/GitHub workflow practiced in the dedicated Git, GitHub & CI/CD for Data course — feature branches, pull requests with real review comments, and a CI job that runs on every pull request before a separate, more narrowly-scoped job deploys on merge — to this project's own repository.",
              "Wrote a README documenting the architecture (business problem, pipeline diagram, build, production practices, results) so a reviewer can read the actual PySpark transform and state machine definition directly, not just a description of them.",
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
