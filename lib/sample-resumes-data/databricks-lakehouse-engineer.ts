import type { PathResumes } from "../sampleResumeTypes";

const CONTACT = ["Atlanta, GA", "(404) 555-0182", "john.doe@example.com", "linkedin.com/in/johndoe-biexample"];

export const RESUMES: PathResumes = {
  "job-ready": {
    levelLabel: "Job Ready",
    name: "John Doe",
    contact: CONTACT,
    summary:
      "Data Engineer trained on the Azure data stack end to end — Python and Apache Spark fundamentals, T-SQL and database " +
      "design, Azure Data Factory pipelines, and Azure Databricks with Delta Lake — through a hands-on apprenticeship " +
      "program. Built a complete medallion-architecture lakehouse pipeline and an orchestrated, production-patterned Data " +
      "Factory pipeline, both working against real data. Bringing that full-stack foundation to a Data Engineer, Databricks " +
      "Data Engineer, or Azure Data Engineer role.",
    skills: [
      "Apache Spark & PySpark (DataFrames, Spark SQL, Joins, Window Functions)",
      "Python for Data Engineering (Pandas, REST APIs, ETL Scripting)",
      "T-SQL Querying & Relational Database Design",
      "Azure Data Lake Storage Gen2 & Data Lake Zoning (Raw/Cleansed/Curated, Bronze/Silver/Gold)",
      "Azure Data Factory (Pipelines, Mapping Data Flows, Triggers, Monitoring)",
      "Azure Databricks & Delta Lake (ACID Transactions, Time Travel, Medallion Architecture, Unity Catalog Basics)",
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
            sub: "Databricks / Lakehouse Engineer Track (Job Ready) · Atlanta, GA",
            bullets: [
              "Completed an intensive, project-based apprenticeship covering IT team workflows, T-SQL database development, Python and Apache Spark fundamentals, Azure Data Factory, and Azure Databricks with Delta Lake, using hands-on assignments built against real data.",
              "Practiced Agile vs. Waterfall delivery, Scrum sprints and user stories, Kanban board management, and the Dev/QA/UAT/Production software delivery lifecycle through a real-world IT project simulation.",
              "Used Git for version control — repositories, commits, branches, remotes, and pull requests — as the everyday workflow behind that simulation's release process.",
              "Wrote T-SQL ranging from joins, grouping/aggregation, and subqueries to CTEs and window/ranking functions (ROW_NUMBER, RANK, DENSE_RANK, NTILE, OVER/PARTITION BY), and applied database design fundamentals — primary/foreign keys, constraints, and normalization (1NF–3NF) — against AdventureWorks2012 and AdventureWorksDW2014.",
              "Tuned T-SQL performance by reading execution plans (scans vs. seeks), choosing clustered vs. nonclustered indexes, and rewriting non-SARGable WHERE clauses.",
              "Designed an Azure Data Lake Storage Gen2 layout — storage accounts, containers, hierarchical namespace, and raw/cleansed/curated (Bronze/Silver/Gold) zoning — and chose between CSV, JSON, Parquet, and Delta for each zone.",
              "Wrote Python for data engineering — variables, loops, functions, exception handling, Pandas DataFrames, REST API calls, and JSON processing — and built a simple Python ETL process end to end.",
              "Built PySpark DataFrames and Spark SQL queries against real NYC Taxi trip data: schema definitions, data type conversion, string/date functions, null handling, deduplication, aggregations, joins, and window functions.",
              "Built Azure Data Factory pipelines — linked services and parameterized datasets, Copy activities with schema-drift handling, ForEach/If Condition/Until control flow, mapping data flows (filter, derived column, join/aggregate, conditional split), and schedule, tumbling-window, and event-based triggers.",
              "Connected Data Factory to an on-premises SQL Server source through a self-hosted integration runtime, secured credentials with managed identities and Key Vault instead of plaintext passwords, and monitored pipeline runs and failures through the Monitor hub and Log Analytics.",
              "Used Data Factory's own Git integration — feature branches and pull requests reviewed before merging into the collaboration branch — as a pipeline-specific version-control workflow on top of general Git skills.",
              "Built Azure Databricks clusters and notebooks, created and queried Delta tables with ACID transactions, schema enforcement/evolution, and time travel, and used UPDATE/DELETE/MERGE plus OPTIMIZE/VACUUM for table maintenance.",
              "Designed and built a full medallion-architecture pipeline — Bronze, Silver, and Gold layers chained into one scheduled job — using Autoloader for incremental ingestion, foreachBatch/MERGE for idempotent cleaning, late-arriving-data correction, and a quarantine table for rejected rows.",
              "Learned Unity Catalog fundamentals — the three-level namespace, managed vs. external tables, and GRANT/REVOKE access control — for governing a lakehouse's catalogs and schemas.",
            ],
          },
        ],
      },
      {
        heading: "Projects",
        entries: [
          {
            left: "Northwind Retail Sales Reporting Pipeline — Data Factory Capstone",
            right: "2026",
            sub: "Lifting the Veil IT Academy, Databricks / Lakehouse Engineer Apprenticeship Program",
            bullets: [
              "Built an Azure Data Factory pipeline moving nightly sales data from an on-premises SQL Server database into Azure through a self-hosted integration runtime, replacing a manual spreadsheet export process.",
              "Built a mapping data flow filtering, joining, and aggregating sales by region and product category before loading a curated Azure SQL Database table.",
              "Added a schedule trigger plus retry/log/alert error handling so the pipeline runs unattended every morning before the 8 AM leadership meeting, with managed identities and Key Vault keeping every credential out of plaintext.",
              "Documented the finished pipeline with an architecture diagram and a requirement-to-feature traceability table, and delivered a five-minute technical walkthrough tying every design decision back to the original stakeholder ask.",
            ],
          },
          {
            left: "NYC Taxi Medallion Lakehouse Pipeline — Databricks & Delta Lake Capstone",
            right: "2026",
            sub: "Lifting the Veil IT Academy, Databricks / Lakehouse Engineer Apprenticeship Program",
            bullets: [
              "Built a three-task Databricks job (nyc_taxi_medallion_pipeline) chaining Bronze ingestion (Autoloader), Silver cleaning (foreachBatch + MERGE with deduplication and quality checks), and Gold aggregation into one scheduled pipeline against real NYC Taxi trip data.",
              "Added a 3-day lookback window to the Silver cleaning step to catch late-arriving records, and a quarantine table to track rejected rows instead of silently dropping them.",
              "Traced a single trip record end to end, from its arrival in a raw CSV file through bronze.trips and silver.trips to its appearance in a gold.daily_revenue aggregate, to verify the pipeline's correctness.",
            ],
          },
        ],
      },
      {
        heading: "GitHub Portfolio",
        entries: [
          {
            left: "github.com/johndoe-biexample/nyc-taxi-medallion-pipeline",
            right: "2026",
            sub: "Public portfolio repository for the Databricks capstone project",
            bullets: [
              "Initialized a Git repository and used git add/commit/push to publish the capstone to GitHub, with feature branches and pull requests for incremental changes and a .gitignore excluding local cluster configuration and credentials.",
              "Wrote a README documenting the medallion architecture end to end, including the job's task structure, with a short recorded walkthrough of the Databricks notebooks since the live cluster and job runs aren't viewable directly in a browser.",
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
      "Databricks / Lakehouse Engineer trained through an advanced, two-stage apprenticeship program — Unity Catalog " +
      "governance at scale, Auto Loader ingestion, Lakeflow declarative pipelines, Databricks Workflows, real-time event " +
      "streaming with Kafka, Airflow orchestration, and infrastructure as code with Terraform and Bicep — on top of a T-SQL, " +
      "Python/Spark, Data Factory, and Databricks/Delta Lake foundation. Built a fully governed lakehouse pipeline spanning " +
      "ingestion through orchestration, performance, and security, and preparing for the Databricks DP-750 certification. " +
      "Targeting Databricks Data Engineer, Senior Data Engineer, or Lakehouse Engineer roles.",
    skills: [
      "Unity Catalog Governance at Scale (Access Control, Lineage, Delta Sharing)",
      "Auto Loader & Ingestion at Scale (Schema Inference/Evolution, File Notification Mode)",
      "Lakeflow Declarative Pipelines & Databricks Jobs/Workflows",
      "Performance Tuning (Photon, Adaptive Query Execution, Cluster Sizing, Cost Optimization)",
      "Event Streaming (Apache Kafka: Topics, Partitions, Producers/Consumers, Dead-Letter Handling)",
      "Pipeline Orchestration (Apache Airflow: DAGs, Sensors, Branching, dbt Integration)",
      "Infrastructure as Code (Terraform & Bicep for Azure Data Resources)",
      "System Design for Data Engineers (Lambda/Kappa Architecture, CAP Theorem, Estimation)",
      "Apache Spark & PySpark, T-SQL Querying & Relational Database Design",
      "Azure Data Factory & Azure Databricks/Delta Lake Foundations",
      "Version Control (Git/GitHub, GitHub Actions)",
    ],
    tools:
      "Databricks Workspace, Unity Catalog, Delta Lake, Azure Data Factory, Apache Kafka/Confluent Cloud, Apache Airflow, " +
      "Terraform, Azure Bicep, SSMS, GitHub Actions, Git",
    sections: [
      {
        heading: "Training & Certifications",
        entries: [
          {
            left: "Lifting the Veil IT Academy — Apprenticeship Program",
            right: "Jan 2026 – Jun 2026",
            sub: "Databricks / Lakehouse Engineer Track (Job Ready + Advanced) · Atlanta, GA",
            bullets: [
              "Completed an intensive, project-based apprenticeship covering the Databricks / Lakehouse Engineer track's full two-stage curriculum — IT team workflows, T-SQL, Python/Spark foundations, and Azure Data Factory and Databricks/Delta Lake, followed by an advanced specialization in Unity Catalog governance, ingestion at scale, orchestration, performance tuning, event streaming, pipeline orchestration, and infrastructure as code.",
              "Wrote T-SQL joins, subqueries, CTEs, and window/ranking functions, and applied database design and normalization against AdventureWorks2012 and AdventureWorksDW2014; practiced Agile/Scrum/Kanban delivery and Git version control (repos, commits, branches, pull requests) through a real-world IT project simulation.",
              "Built Python/PySpark ETL against real NYC Taxi trip data and Azure Data Factory pipelines — Copy activities, mapping data flows, triggers, and self-hosted integration runtime connectivity to an on-premises SQL Server source — secured with managed identities and Key Vault.",
              "Built Delta tables with ACID transactions, schema evolution, and time travel, and a full medallion-architecture pipeline (Bronze/Silver/Gold) with Autoloader ingestion, idempotent MERGE cleaning, late-arriving-data correction, and a quarantine table for rejected rows.",
              "Went deeper on Unity Catalog — catalogs, schemas, and external locations, managed vs. external tables, volumes, data lineage, and access control (GRANT/REVOKE, row- and column-level security) — for governing a production lakehouse at scale.",
              "Configured Auto Loader for ingestion at scale: schema inference and evolution, file notification mode for high-file-count sources, and Auto Loader combined with Structured Streaming.",
              "Built Lakeflow declarative pipelines with @dlt.table definitions and inline data-quality expectations (expect, expect_or_drop), and compared them against traditional notebook-based pipelines.",
              "Orchestrated multi-task Databricks Jobs with explicit task dependencies, chose job clusters vs. all-purpose clusters appropriately, and used the Workflows UI to monitor runs.",
              "Tuned performance with the Photon engine and Adaptive Query Execution, applied caching and cluster-sizing strategies, and practiced cost optimization techniques.",
              "Applied advanced security and governance — row- and column-level security in Unity Catalog, Delta Sharing, and secrets management — and practiced DP-750 exam scenarios.",
              "Learned Apache Kafka event streaming — topics, partitions, producers/consumers, consumer groups, delivery semantics, replication, and Kafka Connect — and built a capstone clickstream pipeline with a sized topic, a dead-letter topic, and an idempotent producer (acks=all, enable.idempotence).",
              "Built Apache Airflow DAGs — PythonOperator/BashOperator tasks, XComs, Connections and hooks, sensors, branching, and dynamic task mapping — including a capstone ELT DAG triggering a dbt run against a Snowflake connection, with retries and failure alerting proven by a deliberate task failure.",
              "Wrote Terraform configurations provisioning Azure data-platform infrastructure — resource groups, Storage Accounts, Event Hubs, and Fabric Capacities — using reusable modules, a remote azurerm state backend, and the plan/apply workflow; also provisioned Azure resources with Bicep.",
              "Practiced system design for data engineers — Lambda vs. Kappa architecture, back-of-the-envelope estimation, partitioning and sharding strategies, and the CAP theorem — against real-time and batch case studies, including a streaming fraud detector.",
            ],
          },
          { left: "Microsoft DP-750: Implementing Data Engineering Solutions Using Azure Databricks", right: "Exam scheduled" },
        ],
      },
      {
        heading: "Projects",
        entries: [
          {
            left: "Governed Retail Lakehouse Pipeline — Advanced Databricks Capstone",
            right: "2026",
            sub: "Lifting the Veil IT Academy, Databricks / Lakehouse Engineer Apprenticeship Program",
            bullets: [
              "Designed a Unity Catalog structure (catalog retail_prod with bronze/silver/gold schemas and a raw_landing volume) before writing any ingestion code, using managed tables throughout since nothing in the project required pointing at pre-existing external files.",
              "Ingested continuously streaming order events with Auto Loader and Structured Streaming, and a daily batch product-catalog export with Auto Loader in trigger-once mode and schema evolution enabled for new optional columns.",
              "Built a Lakeflow declarative pipeline joining orders to products into a query-ready gold layer, enforcing data quality inline with expect_or_drop on invalid order totals and a plain expect on missing customer IDs.",
              "Orchestrated the pipeline with a four-task Databricks Job (batch ingestion, pipeline run, gold-metrics refresh, failure notification), running the continuous streaming ingestion as its own separate job rather than one more task in the scheduled chain.",
              "Applied a column mask hiding customer_email from the analysts group (but not fraud_review), authenticated the job's service principal via managed identity instead of a stored token, enabled catalog audit logging, and used OPTIMIZE with liquid clustering on order_date to keep gold-layer queries fast as volume grows.",
            ],
          },
          {
            left: "Real-Time Clickstream Pipeline — Kafka & Event Streaming Capstone",
            right: "2026",
            sub: "Lifting the Veil IT Academy, Databricks / Lakehouse Engineer Apprenticeship Program",
            bullets: [
              "Sized and created a clickstream topic (8 partitions, 3-day retention) for expected throughput and consumer-group parallelism, plus a single-partition clickstream-dlq dead-letter topic for the rare malformed event.",
              "Built a producer with acks=all and enable.idempotence to avoid losing or duplicating events, and a consumer that routes unprocessable messages to the dead-letter topic instead of stalling the partition, committing offsets either way.",
            ],
          },
          {
            left: "Orchestrated ELT Pipeline — Airflow Capstone",
            right: "2026",
            sub: "Lifting the Veil IT Academy, Databricks / Lakehouse Engineer Apprenticeship Program",
            bullets: [
              "Built a multi-task DAG with real operators and explicit dependencies (extract, then load, then transform), passing a row count between tasks via XCom to drive a downstream branch decision.",
              "Loaded data into a warehouse through a real Connection and hook, triggered a dbt build against that data from Airflow, and configured retries and an on_failure_callback alert, proven by deliberately failing a task.",
            ],
          },
          {
            left: "Data Platform Infrastructure as Code — Terraform & Bicep Capstone",
            right: "2026",
            sub: "Lifting the Veil IT Academy, Databricks / Lakehouse Engineer Apprenticeship Program",
            bullets: [
              "Wrote a Terraform configuration provisioning a resource group, a Fabric Capacity, and a reusable landing-zone module (Storage Account plus Event Hub namespace/Event Hub) behind a remote azurerm state backend.",
              "Reviewed a terraform plan diff naming every resource before running terraform apply, and set up a GitHub Actions workflow that runs terraform plan automatically on every pull request and gates terraform apply behind a required human approval, with Azure credentials stored as GitHub Actions secrets.",
            ],
          },
        ],
      },
      {
        heading: "GitHub Portfolio",
        entries: [
          {
            left: "github.com/johndoe-biexample/databricks-lakehouse-capstone",
            right: "2026",
            sub: "Public portfolio repository for the Advanced Databricks and infrastructure-as-code capstone projects",
            bullets: [
              "Initialized a Git repository and used git add/commit/push to publish the governed lakehouse, Kafka, and Airflow capstones to GitHub, with feature branches and pull requests for incremental changes and a .gitignore excluding local credentials and cluster configuration.",
              "Published the Terraform data-platform capstone alongside its GitHub Actions workflow (plan-on-PR, approval-gated apply), keeping Azure credentials as GitHub Actions secrets rather than in any committed file.",
              "Wrote a README for each repository documenting the architecture, with a short recorded walkthrough of the Databricks notebooks and job runs since the live workspace isn't viewable directly in a browser.",
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
