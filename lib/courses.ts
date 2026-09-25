import fs from "fs";
import path from "path";
import { marked } from "marked";
import { TRACKS } from "./copy";
import { POWERBI_CHAPTERS, type ChapterMeta, type LessonMeta } from "./powerbi-outline";
import { PYTHON_CHAPTERS } from "./python-outline";
import { DATA_FACTORY_CHAPTERS } from "./data-factory-outline";
import { BLOCKCHAIN_CHAPTERS } from "./blockchain-outline";
import { TSQL_CHAPTERS } from "./t-sql-outline";
import { DE_FOUNDATIONS_CHAPTERS } from "./de-foundations-outline";
import { DATABRICKS_DELTA_CHAPTERS } from "./databricks-delta-outline";
import { FABRIC_REALTIME_CHAPTERS } from "./fabric-realtime-outline";
import { CAREER_CAPSTONE_CHAPTERS } from "./career-capstone-outline";
import { TABLEAU_CHAPTERS } from "./tableau-outline";
import { AZURE_DBA_CHAPTERS } from "./azure-dba-outline";
import { SNOWFLAKE_CHAPTERS } from "./snowflake-outline";
import { DBT_CHAPTERS } from "./dbt-outline";
import { GIT_CICD_CHAPTERS } from "./git-cicd-outline";
import { AIRFLOW_CHAPTERS } from "./airflow-outline";
import { TERRAFORM_BICEP_CHAPTERS } from "./terraform-bicep-outline";
import { KAFKA_CHAPTERS } from "./kafka-outline";
import { EXCEL_CHAPTERS } from "./excel-outline";
import { POWERSHELL_CHAPTERS } from "./powershell-outline";
import { AZURE_FUNDAMENTALS_CHAPTERS } from "./azure-fundamentals-outline";
import { ADVANCED_DATABRICKS_CHAPTERS } from "./advanced-databricks-outline";
import { TSQL_FOR_DBAS_CHAPTERS } from "./t-sql-for-dbas-outline";
import { SQL_SERVER_DBA_CHAPTERS } from "./sql-server-dba-outline";
import { SQL_SERVER_PERFORMANCE_TUNING_CHAPTERS } from "./sql-server-performance-tuning-outline";
import { SQL_SERVER_HA_DR_CHAPTERS } from "./sql-server-ha-dr-outline";
import { POWERSHELL_AUTOMATION_DEVOPS_DBAS_CHAPTERS } from "./powershell-automation-devops-dbas-outline";
import { CROSS_PLATFORM_DBA_CHAPTERS } from "./cross-platform-dba-outline";
import { NOSQL_DOCUMENT_GRAPH_CHAPTERS } from "./nosql-document-graph-outline";
import { SALESFORCE_FUNDAMENTALS_CHAPTERS } from "./salesforce-fundamentals-outline";
import { SOQL_DATA_MANAGEMENT_CHAPTERS } from "./soql-data-management-outline";
import { SALESFORCE_REPORTS_DASHBOARDS_CHAPTERS } from "./salesforce-reports-dashboards-outline";
import { CRM_ANALYTICS_TABLEAU_NEXT_CHAPTERS } from "./crm-analytics-tableau-next-outline";
import { SALESFORCE_ANALYTICS_CAPSTONE_CHAPTERS } from "./salesforce-analytics-capstone-outline";
import { AWS_FUNDAMENTALS_CHAPTERS } from "./aws-fundamentals-outline";
import { AWS_DATA_ENGINEERING_CHAPTERS } from "./aws-data-engineering-outline";
import { AWS_CAPSTONE_CHAPTERS } from "./aws-capstone-outline";
import { SSIS_CHAPTERS } from "./ssis-outline";
import { SSRS_CHAPTERS } from "./ssrs-outline";
import { DATA_WAREHOUSING_CHAPTERS } from "./data-warehousing-outline";
import { MICROSOFT_BI_CAPSTONE_CHAPTERS } from "./microsoft-bi-capstone-outline";
import { PYTHON_FOR_AI_CHAPTERS } from "./python-for-ai-outline";
import { GIT_GITHUB_SWE_CHAPTERS } from "./git-github-swe-outline";
import { APIS_JSON_AI_CHAPTERS } from "./apis-json-ai-outline";
import { AI_ML_FOUNDATIONS_CHAPTERS } from "./ai-ml-foundations-outline";
import { GENERATIVE_AI_LLMS_CHAPTERS } from "./generative-ai-llms-outline";
import { PROMPT_CONTEXT_ENGINEERING_CHAPTERS } from "./prompt-context-engineering-outline";
import { RAG_VECTOR_DATABASES_CHAPTERS } from "./rag-vector-databases-outline";
import { AI_AGENTS_CHAPTERS } from "./ai-agents-outline";
import { AZURE_AI_CLOUD_CHAPTERS } from "./azure-ai-cloud-outline";
import { DOCKER_AI_DEPLOYMENT_CHAPTERS } from "./docker-ai-deployment-outline";
import { AI_SECURITY_EVAL_MONITORING_CHAPTERS } from "./ai-security-eval-monitoring-outline";
import { AI_ENGINEERING_CAPSTONES_CHAPTERS } from "./ai-engineering-capstones-outline";
import { JS_TS_BLOCKCHAIN_CHAPTERS } from "./js-ts-blockchain-outline";
import { BLOCKCHAIN_APIS_BACKEND_CHAPTERS } from "./blockchain-apis-backend-outline";
import { DEFI_TOKEN_ENGINEERING_CHAPTERS } from "./defi-token-engineering-outline";
import { BLOCKCHAIN_TESTING_DEVOPS_CHAPTERS } from "./blockchain-testing-devops-outline";
import { BLOCKCHAIN_ENGINEERING_CAPSTONES_CHAPTERS } from "./blockchain-engineering-capstones-outline";
import { PYTHON_FOR_DATA_SCIENCE_CHAPTERS } from "./python-for-data-science-outline";
import { STATISTICS_AND_PROBABILITY_FOR_DATA_SCIENCE_CHAPTERS } from "./statistics-and-probability-for-data-science-outline";
import { DATA_VISUALIZATION_AND_EDA_CHAPTERS } from "./data-visualization-and-eda-outline";
import { MACHINE_LEARNING_FUNDAMENTALS_CHAPTERS } from "./machine-learning-fundamentals-outline";
import { APPLIED_MACHINE_LEARNING_CHAPTERS } from "./applied-machine-learning-outline";
import { ADVANCED_DATA_SCIENCE_CHAPTERS } from "./advanced-data-science-outline";
import { AI_AND_GENERATIVE_AI_FUNDAMENTALS_FOR_DATA_SCIENTISTS_CHAPTERS } from "./ai-and-generative-ai-fundamentals-for-data-scientists-outline";
import { AZURE_DATA_SCIENCE_CHAPTERS } from "./azure-data-science-outline";
import { AWS_DATA_SCIENCE_CHAPTERS } from "./aws-data-science-outline";
import { MLOPS_FOR_DATA_SCIENTISTS_CHAPTERS } from "./mlops-for-data-scientists-outline";
import { DATA_SCIENCE_CAPSTONE_CHAPTERS } from "./data-science-capstone-outline";
import { IT_NETWORKING_AND_CLOUD_FUNDAMENTALS_CHAPTERS } from "./it-networking-and-cloud-fundamentals-outline";
import { LINUX_ADMINISTRATION_CHAPTERS } from "./linux-administration-outline";
import { PYTHON_AND_BASH_AUTOMATION_CHAPTERS } from "./python-and-bash-automation-outline";
import { DOCKER_AND_CONTAINERS_CHAPTERS } from "./docker-and-containers-outline";
import { KUBERNETES_ORCHESTRATION_CHAPTERS } from "./kubernetes-orchestration-outline";
import { INFRASTRUCTURE_AS_CODE_WITH_TERRAFORM_CHAPTERS } from "./infrastructure-as-code-with-terraform-outline";
import { CI_CD_PIPELINES_CHAPTERS } from "./ci-cd-pipelines-outline";
import { MONITORING_LOGGING_AND_OBSERVABILITY_CHAPTERS } from "./monitoring-logging-and-observability-outline";
import { DEVSECOPS_FUNDAMENTALS_CHAPTERS } from "./devsecops-fundamentals-outline";
import { DEVOPS_CAPSTONE_CHAPTERS } from "./devops-capstone-outline";

// Every external link in a lesson guide should open in a new tab, so a
// student never loses their place in the course. Applied once, here, so
// guide.md files just use normal markdown links — no per-lesson HTML needed.
// Self-hosted sample-data downloads (see LessonBuilder skill / ATTRIBUTION.md)
// get a "download-link" class so CSS can call them out visually (bold, in
// addition to every link's underline) — students kept missing plain-text
// links entirely.
marked.use({
  renderer: {
    link({ href, title, tokens }) {
      const text = this.parser.parseInline(tokens);
      const isExternal = /^https?:\/\//i.test(href);
      const isDownload = href.startsWith("/downloads/");
      const titleAttr = title ? ` title="${title}"` : "";
      const targetAttr = isExternal ? ` target="_blank" rel="noopener noreferrer"` : "";
      const classAttr = isDownload ? ` class="download-link"` : "";
      return `<a href="${href}"${titleAttr}${targetAttr}${classAttr}>${text}</a>`;
    },
  },
});

export type CourseMeta = {
  slug: string;
  title: string;
  tagline: string;
  status: "available" | "coming-soon";
  chapters?: ChapterMeta[];
  // Folder name under content/ and public/courses/. Defaults to slug —
  // only power-bi overrides this, since its content folder predates the
  // slug-matching convention (content/powerbi/, not content/power-bi/).
  contentBase?: string;
};

// The catalog the learning center renders. Power BI is the first live course;
// the nine LTV tracks appear as coming soon until their content is produced.
export const COURSES: CourseMeta[] = [
  {
    slug: "power-bi",
    title: "Power BI",
    tagline:
      "From raw data to published, secured dashboards — twelve chapters ending in a full capstone project.",
    status: "available",
    chapters: POWERBI_CHAPTERS,
    contentBase: "powerbi",
  },
  {
    slug: "python-for-power-bi",
    title: "Python for Power BI",
    tagline:
      "Twenty micro-lessons, three minutes or less each — the Python skills that actually move a Power BI project forward.",
    status: "available",
    chapters: PYTHON_CHAPTERS,
  },
  {
    slug: "data-factory",
    title: "Data Factory",
    tagline:
      "Move and transform data at scale — from Azure Data Factory pipelines to Fabric Data Factory, ending in a full capstone pipeline.",
    status: "available",
    chapters: DATA_FACTORY_CHAPTERS,
  },
  {
    slug: "blockchain",
    title: "Blockchain Development",
    tagline:
      "Ethereum, Solidity, and decentralized applications — plus the uses for blockchain beyond cryptocurrency.",
    status: "available",
    chapters: BLOCKCHAIN_CHAPTERS,
  },
  {
    slug: "t-sql-development",
    title: "T-SQL Development",
    tagline:
      "From your first SELECT to performance tuning and data warehousing — 118 lessons in real SQL Server Management Studio, working against AdventureWorks2012 and AdventureWorksDW2014.",
    status: "available",
    chapters: TSQL_CHAPTERS,
    contentBase: "t-sql",
  },
  {
    slug: "data-engineering-foundations",
    title: "Data Engineering Foundations",
    tagline:
      "Storage, Python, and Spark — the 62-lesson foundation for Azure data engineering, working hands-on with real NYC Taxi trip data.",
    status: "available",
    chapters: DE_FOUNDATIONS_CHAPTERS,
    contentBase: "de-foundations",
  },
  {
    slug: "azure-databricks-and-delta-lake",
    title: "Azure Databricks & Delta Lake",
    tagline:
      "Clusters, notebooks, Delta tables, medallion pipelines, Unity Catalog, and Lakeflow — 57 lessons continuing straight from Data Engineering Foundations.",
    status: "available",
    chapters: DATABRICKS_DELTA_CHAPTERS,
    contentBase: "databricks-delta",
  },
  {
    slug: "microsoft-fabric-and-real-time-analytics",
    title: "Microsoft Fabric & Real-Time Analytics",
    tagline:
      "OneLake, lakehouses and warehouses, real-time Eventstreams and KQL, and the production practices that keep a data platform running — 70 lessons continuing straight from Azure Databricks & Delta Lake.",
    status: "available",
    chapters: FABRIC_REALTIME_CHAPTERS,
    contentBase: "fabric-realtime",
  },
  {
    slug: "data-engineering-career-and-capstone",
    title: "Data Engineering Career & Capstone",
    tagline:
      "System design, DP-700 certification prep, AI for data engineers, and three full capstone projects — 81 lessons closing out the Data Engineering track.",
    status: "available",
    chapters: CAREER_CAPSTONE_CHAPTERS,
    contentBase: "career-capstone",
  },
  {
    slug: "tableau",
    title: "Tableau",
    tagline:
      "Beginner to advanced in 95 hands-on videos — connecting, modeling, calculating, and dashboarding, assuming the SQL you already know from T-SQL Development.",
    status: "available",
    chapters: TABLEAU_CHAPTERS,
    contentBase: "tableau",
  },
  {
    slug: "azure-database-administrator",
    title: "Azure Database Administrator",
    tagline:
      "DP-300 + real-world Azure SQL administration — security, performance tuning, automation, and HA/DR, in 95 videos built on the T-SQL you already know.",
    status: "available",
    chapters: AZURE_DBA_CHAPTERS,
    contentBase: "azure-dba",
  },
  {
    slug: "snowflake",
    title: "Snowflake",
    tagline:
      "A focused specialization, not a mega-course — loading, transforming, modeling, securing, tuning, and connecting Snowflake to Power BI, built on the SQL you already know.",
    status: "available",
    chapters: SNOWFLAKE_CHAPTERS,
    contentBase: "snowflake",
  },
  {
    slug: "dbt-analytics-engineering",
    title: "dbt / Analytics Engineering",
    tagline:
      "Sources, staging, marts, tests, snapshots, and CI/CD — the modeling layer that turns a warehouse into a governed, documented, testable analytics product.",
    status: "available",
    chapters: DBT_CHAPTERS,
    contentBase: "dbt",
  },
  {
    slug: "git-github-cicd-for-data",
    title: "Git, GitHub & CI/CD for Data",
    tagline:
      "Version control and automated pipelines for people whose daily work is SQL, dbt, and notebooks — not a generic software-engineering course.",
    status: "available",
    chapters: GIT_CICD_CHAPTERS,
    contentBase: "git-cicd",
  },
  {
    slug: "airflow",
    title: "Airflow",
    tagline:
      "DAGs, operators, sensors, and real ELT pipelines — the orchestration tool that shows up constantly outside Microsoft-only shops.",
    status: "available",
    chapters: AIRFLOW_CHAPTERS,
    contentBase: "airflow",
  },
  {
    slug: "terraform-bicep-for-data-engineers",
    title: "Terraform & Bicep for Data Engineers",
    tagline:
      "Provisioning the Azure resources behind a data platform as code, instead of clicking through the portal every time.",
    status: "available",
    chapters: TERRAFORM_BICEP_CHAPTERS,
    contentBase: "terraform-bicep",
  },
  {
    slug: "kafka-event-streaming",
    title: "Kafka & Event Streaming",
    tagline:
      "Topics, partitions, producers, consumers, and Kafka Connect — the real-time platform skill senior data engineering roles ask for beside Fabric and Databricks streaming.",
    status: "available",
    chapters: KAFKA_CHAPTERS,
    contentBase: "kafka",
  },
  {
    slug: "advanced-excel-for-data-analysts",
    title: "Advanced Excel for Data Analysts",
    tagline:
      "PivotTables, XLOOKUP, dynamic arrays, and Power Query — a focused module, not a 100-video Excel course, aimed squarely at analyst work.",
    status: "available",
    chapters: EXCEL_CHAPTERS,
    contentBase: "excel",
  },
  {
    slug: "powershell-fundamentals",
    title: "PowerShell Fundamentals",
    tagline:
      "Enough PowerShell to read, modify, and run the automation scripts a DBA or data engineer actually encounters on the job.",
    status: "available",
    chapters: POWERSHELL_CHAPTERS,
    contentBase: "powershell",
  },
  {
    slug: "azure-fundamentals",
    title: "Azure Fundamentals",
    tagline:
      "A short, AZ-900-aligned primer on cloud and Azure concepts for anyone starting an Azure-flavored path from zero.",
    status: "available",
    chapters: AZURE_FUNDAMENTALS_CHAPTERS,
    contentBase: "azure-fundamentals",
  },
  {
    slug: "advanced-databricks-specialization",
    title: "Advanced Databricks Specialization",
    tagline:
      "Unity Catalog depth, Auto Loader, Lakeflow, Workflows, and DP-750 prep — continuing straight from Azure Databricks & Delta Lake.",
    status: "available",
    chapters: ADVANCED_DATABRICKS_CHAPTERS,
    contentBase: "advanced-databricks",
  },
  {
    slug: "t-sql-for-database-administrators",
    title: "T-SQL for Database Administrators",
    tagline:
      "Not \"how do I write SQL to work with data\" — \"how do I use T-SQL to figure out what's wrong with SQL Server and fix it.\" DMVs, blocking, backups, security, and a real DBA diagnostic toolkit.",
    status: "available",
    chapters: TSQL_FOR_DBAS_CHAPTERS,
    contentBase: "t-sql-for-dbas",
  },
  {
    slug: "sql-server-database-administration",
    title: "SQL Server Database Administration",
    tagline:
      "General, on-prem-flavored SQL Server administration — installation, configuration, architecture, security, maintenance, Agent, and production support — before Azure enters the picture at all.",
    status: "available",
    chapters: SQL_SERVER_DBA_CHAPTERS,
    contentBase: "sql-server-dba",
  },
  {
    slug: "sql-server-performance-tuning",
    title: "SQL Server Performance Tuning",
    tagline:
      "Performance tuning as its own discipline — execution plans, index tuning, wait-based methodology, Query Store, and configuration tuning, well beyond a single troubleshooting chapter.",
    status: "available",
    chapters: SQL_SERVER_PERFORMANCE_TUNING_CHAPTERS,
    contentBase: "sql-server-performance-tuning",
  },
  {
    slug: "sql-server-ha-backup-and-disaster-recovery",
    title: "SQL Server HA, Backup & Disaster Recovery",
    tagline:
      "Always On Availability Groups, failover clustering, log shipping, replication, and real disaster recovery planning — the on-prem HA/DR depth a cloud-only course only touches at a high level.",
    status: "available",
    chapters: SQL_SERVER_HA_DR_CHAPTERS,
    contentBase: "sql-server-ha-dr",
  },
  {
    slug: "powershell-automation-and-devops-for-dbas",
    title: "PowerShell, Automation & DevOps for DBAs",
    tagline:
      "dbatools, CI/CD for databases, infrastructure as code, and DevOps culture — for DBAs who already know basic PowerShell and are ready to automate the whole job.",
    status: "available",
    chapters: POWERSHELL_AUTOMATION_DEVOPS_DBAS_CHAPTERS,
    contentBase: "powershell-automation-devops-dbas",
  },
  {
    slug: "cross-platform-relational-database-administration",
    title: "Cross-Platform Relational Database Administration",
    tagline:
      "Apply your SQL Server DBA knowledge to Oracle, MySQL, and PostgreSQL — architecture, security, backup, recovery, performance, replication, and migration, in 96 videos.",
    status: "available",
    chapters: CROSS_PLATFORM_DBA_CHAPTERS,
    contentBase: "cross-platform-dba",
  },
  {
    slug: "nosql-document-and-graph-databases",
    title: "NoSQL, Document & Graph Databases",
    tagline:
      "How MongoDB, Azure Cosmos DB, and Neo4j store, distribute, secure, and query data when traditional relational modeling isn't the best fit — 80 videos.",
    status: "available",
    chapters: NOSQL_DOCUMENT_GRAPH_CHAPTERS,
    contentBase: "nosql-document-graph",
  },
  {
    slug: "salesforce-fundamentals-for-data-analysts",
    title: "Salesforce Fundamentals for Data Analysts",
    tagline:
      "Not a Salesforce Administrator mega-course — exactly what a data analyst needs to understand what Salesforce data means before analyzing it.",
    status: "available",
    chapters: SALESFORCE_FUNDAMENTALS_CHAPTERS,
    contentBase: "salesforce-fundamentals",
  },
  {
    slug: "soql-and-salesforce-data-management",
    title: "SOQL & Salesforce Data Management",
    tagline:
      "The T-SQL-to-Salesforce bridge: SOQL, SOSL, Data Loader, Workbench, data quality, and data migration — assuming the SQL you already know.",
    status: "available",
    chapters: SOQL_DATA_MANAGEMENT_CHAPTERS,
    contentBase: "soql-data-management",
  },
  {
    slug: "salesforce-reports-and-dashboards",
    title: "Salesforce Reports & Dashboards",
    tagline:
      "Native Salesforce analytics first — reports, formulas, dashboards, and sales/service analytics — so you know when Salesforce's own reporting is enough, and when it isn't.",
    status: "available",
    chapters: SALESFORCE_REPORTS_DASHBOARDS_CHAPTERS,
    contentBase: "salesforce-reports-dashboards",
  },
  {
    slug: "salesforce-crm-analytics-and-tableau-next",
    title: "Salesforce CRM Analytics & Tableau Next",
    tagline:
      "SAQL, bindings, dashboard interactions, and deployment — the real technical jump from analyzing Salesforce data to building the analytics system 500 people rely on, plus Data Cloud, Tableau Next, semantic modeling, and governance.",
    status: "available",
    chapters: CRM_ANALYTICS_TABLEAU_NEXT_CHAPTERS,
    contentBase: "crm-analytics-tableau-next",
  },
  {
    slug: "salesforce-analytics-career-and-capstone",
    title: "Salesforce Analytics Career & Capstone",
    tagline:
      "Three portfolio projects of increasing independence — Sales Pipeline, Customer Service, Executive CRM Analytics — plus interview preparation.",
    status: "available",
    chapters: SALESFORCE_ANALYTICS_CAPSTONE_CHAPTERS,
    contentBase: "salesforce-analytics-capstone",
  },
  {
    slug: "aws-fundamentals-for-data-engineers",
    title: "AWS Fundamentals for Data Engineers",
    tagline:
      "A short primer on cloud and AWS concepts — regions, IAM, core services, and the shared responsibility model — for anyone starting an AWS-flavored path from zero.",
    status: "available",
    chapters: AWS_FUNDAMENTALS_CHAPTERS,
    contentBase: "aws-fundamentals",
  },
  {
    slug: "aws-data-engineering",
    title: "AWS Data Engineering",
    tagline:
      "S3, Glue, Athena, Redshift, Lambda, Step Functions, DMS, EMR, Kinesis, and CloudWatch — the exact combination current AWS data engineering postings ask for.",
    status: "available",
    chapters: AWS_DATA_ENGINEERING_CHAPTERS,
    contentBase: "aws-data-engineering",
  },
  {
    slug: "aws-capstone",
    title: "AWS Capstone",
    tagline:
      "Every AWS service from AWS Data Engineering, tied into one working platform, with the monitoring, security, CI/CD, and cost practices that make it job-ready.",
    status: "available",
    chapters: AWS_CAPSTONE_CHAPTERS,
    contentBase: "aws-capstone",
  },
  {
    slug: "ssis-development",
    title: "SSIS Development",
    tagline:
      "Control flow, data flow, transformations, error handling, and deployment — the ETL platform behind the Microsoft Data & BI Developer program.",
    status: "available",
    chapters: SSIS_CHAPTERS,
    contentBase: "ssis",
  },
  {
    slug: "ssrs-development",
    title: "SSRS Development",
    tagline:
      "Paginated reporting, parameters, expressions, drilldowns, and subscriptions — real report design and delivery, not just Power BI.",
    status: "available",
    chapters: SSRS_CHAPTERS,
    contentBase: "ssrs",
  },
  {
    slug: "data-modeling-and-data-warehousing",
    title: "Data Modeling & Data Warehousing",
    tagline:
      "Star schemas, facts, dimensions, grain, surrogate keys, and slowly changing dimensions — dimensional modeling as its own discipline, not a side note in a SQL course.",
    status: "available",
    chapters: DATA_WAREHOUSING_CHAPTERS,
    contentBase: "data-warehousing",
  },
  {
    slug: "microsoft-bi-capstone",
    title: "Microsoft Data & BI Capstone + Job Preparation",
    tagline:
      "SQL Server, SSIS, SSRS, Power BI, and data warehousing, tied into one real stack — then resume, portfolio, and interview preparation for your first Microsoft BI Developer role.",
    status: "available",
    chapters: MICROSOFT_BI_CAPSTONE_CHAPTERS,
    contentBase: "microsoft-bi-capstone",
  },
  {
    slug: "python-for-ai-engineering",
    title: "Python for AI Engineering",
    tagline:
      "No prior programming assumed — Python fundamentals, data structures, OOP, environments, and API/async basics, aimed squarely at building AI applications.",
    status: "available",
    chapters: PYTHON_FOR_AI_CHAPTERS,
    contentBase: "python-for-ai",
  },
  {
    slug: "git-github-for-software-engineers",
    title: "Git & GitHub for Software Engineers",
    tagline:
      "Version control, collaborative workflows, and CI/CD basics for anyone building real software — the general-engineering counterpart to this catalog's data-flavored Git course.",
    status: "available",
    chapters: GIT_GITHUB_SWE_CHAPTERS,
    contentBase: "git-github-swe",
  },
  {
    slug: "apis-json-for-ai-applications",
    title: "APIs & JSON for AI Applications",
    tagline:
      "REST fundamentals, JSON deep dive, and the specific shapes AI provider APIs use — streaming, function calling, structured output — plus building a reusable client wrapper.",
    status: "available",
    chapters: APIS_JSON_AI_CHAPTERS,
    contentBase: "apis-json-ai",
  },
  {
    slug: "ai-ml-foundations",
    title: "AI/ML Foundations",
    tagline:
      "Genuine ML literacy, not math-heavy theory — what's actually happening under an LLM API call, before the rest of the AI Engineer path builds on top of it.",
    status: "available",
    chapters: AI_ML_FOUNDATIONS_CHAPTERS,
    contentBase: "ai-ml-foundations",
  },
  {
    slug: "generative-ai-and-llms",
    title: "Generative AI & LLMs",
    tagline:
      "How large language models actually work, the current model landscape, and working with LLM APIs directly — chat completions, streaming, tool calling, fine-tuning, and multimodal models.",
    status: "available",
    chapters: GENERATIVE_AI_LLMS_CHAPTERS,
    contentBase: "generative-ai-llms",
  },
  {
    slug: "prompt-and-context-engineering",
    title: "Prompt & Context Engineering",
    tagline:
      "Prompt design and context management as an engineering discipline with its own testing and evaluation practice, not guesswork.",
    status: "available",
    chapters: PROMPT_CONTEXT_ENGINEERING_CHAPTERS,
    contentBase: "prompt-context-engineering",
  },
  {
    slug: "rag-and-vector-databases",
    title: "RAG & Vector Databases",
    tagline:
      "Embeddings, vector databases, chunking, retrieval, re-ranking, and evaluation — the real retrieval-augmented generation pipeline, ending in a production RAG knowledge assistant.",
    status: "available",
    chapters: RAG_VECTOR_DATABASES_CHAPTERS,
    contentBase: "rag-vector-databases",
  },
  {
    slug: "ai-agents",
    title: "AI Agents",
    tagline:
      "Tool calling, agent architectures, human-in-the-loop approval, and safety guardrails — moving from a system that answers questions to one that takes actions, safely.",
    status: "available",
    chapters: AI_AGENTS_CHAPTERS,
    contentBase: "ai-agents",
  },
  {
    slug: "azure-ai-and-cloud-for-ai-engineers",
    title: "Azure AI & Cloud for AI Engineers",
    tagline:
      "Deploying, securing, and monitoring AI services in Azure — Azure AI Foundry, Azure OpenAI, Azure AI Search — with a deliberate glance at AWS Bedrock and Vertex AI.",
    status: "available",
    chapters: AZURE_AI_CLOUD_CHAPTERS,
    contentBase: "azure-ai-cloud",
  },
  {
    slug: "docker-and-deployment-for-ai-applications",
    title: "Docker & Deployment for AI Applications",
    tagline:
      "Packaging and shipping an AI application like a real production system — containers, deployment patterns, autoscaling, and reliability.",
    status: "available",
    chapters: DOCKER_AI_DEPLOYMENT_CHAPTERS,
    contentBase: "docker-ai-deployment",
  },
  {
    slug: "ai-security-evaluation-and-monitoring",
    title: "AI Security, Evaluation & Monitoring",
    tagline:
      "The production-readiness layer for AI specifically — prompt injection, eval datasets, drift detection, hallucination monitoring, and responsible AI governance.",
    status: "available",
    chapters: AI_SECURITY_EVAL_MONITORING_CHAPTERS,
    contentBase: "ai-security-eval-monitoring",
  },
  {
    slug: "ai-engineering-capstones",
    title: "AI Engineering Capstones",
    tagline:
      "Three flagship portfolio projects — a production RAG knowledge assistant, an AI data analyst working with SQL and APIs, and a tool-using agent with human approval — plus job preparation.",
    status: "available",
    chapters: AI_ENGINEERING_CAPSTONES_CHAPTERS,
    contentBase: "ai-engineering-capstones",
  },
  {
    slug: "js-ts-blockchain",
    title: "JavaScript & TypeScript for Blockchain Developers",
    tagline:
      "Programming fundamentals through JavaScript, then TypeScript and Node.js — no prior course assumed, built for the code every dApp runs on.",
    status: "available",
    chapters: JS_TS_BLOCKCHAIN_CHAPTERS,
    contentBase: "js-ts-blockchain",
  },
  {
    slug: "blockchain-apis-backend",
    title: "Blockchain APIs & Backend Development",
    tagline:
      "The off-chain half of a dApp — RPC providers, event listening, subgraphs, oracles, and wallet/session integration on the server side.",
    status: "available",
    chapters: BLOCKCHAIN_APIS_BACKEND_CHAPTERS,
    contentBase: "blockchain-apis-backend",
  },
  {
    slug: "defi-token-engineering",
    title: "DeFi & Token Engineering",
    tagline:
      "The mechanics behind real protocols — AMMs, lending and liquidations, staking and yield, tokenomics design, and DAO governance.",
    status: "available",
    chapters: DEFI_TOKEN_ENGINEERING_CHAPTERS,
    contentBase: "defi-token-engineering",
  },
  {
    slug: "blockchain-testing-devops",
    title: "Blockchain Testing, DevOps & Deployment",
    tagline:
      "Fuzz and invariant testing, CI/CD for smart contracts, multisig-controlled multi-chain deployments, monitoring, and a real mainnet-launch runbook.",
    status: "available",
    chapters: BLOCKCHAIN_TESTING_DEVOPS_CHAPTERS,
    contentBase: "blockchain-testing-devops",
  },
  {
    slug: "blockchain-engineering-capstones",
    title: "Blockchain Engineering Capstones",
    tagline:
      "Three flagship portfolio projects — a full DeFi protocol, an NFT marketplace, and a DAO governance system — plus job preparation.",
    status: "available",
    chapters: BLOCKCHAIN_ENGINEERING_CAPSTONES_CHAPTERS,
    contentBase: "blockchain-engineering-capstones",
  },
  {
    slug: "python-for-data-science",
    title: "Python for Data Science",
    tagline:
      "Python fundamentals, NumPy, pandas, data cleaning, files and APIs, and Jupyter — the working toolkit for every hands-on data science task.",
    status: "available",
    chapters: PYTHON_FOR_DATA_SCIENCE_CHAPTERS,
    contentBase: "python-for-data-science",
  },
  {
    slug: "statistics-and-probability-for-data-science",
    title: "Statistics & Probability for Data Science",
    tagline:
      "Descriptive statistics, probability, distributions, sampling, confidence intervals, hypothesis testing, and correlation vs. causation — the reasoning every model rests on.",
    status: "available",
    chapters: STATISTICS_AND_PROBABILITY_FOR_DATA_SCIENCE_CHAPTERS,
    contentBase: "statistics-and-probability-for-data-science",
  },
  {
    slug: "data-visualization-and-eda",
    title: "Data Visualization & Exploratory Data Analysis",
    tagline:
      "Matplotlib, Plotly, Power BI, and the EDA workflow — finding what's in a dataset and communicating it clearly.",
    status: "available",
    chapters: DATA_VISUALIZATION_AND_EDA_CHAPTERS,
    contentBase: "data-visualization-and-eda",
  },
  {
    slug: "machine-learning-fundamentals",
    title: "Machine Learning Fundamentals",
    tagline:
      "Supervised vs. unsupervised learning, linear and logistic regression, decision trees, random forests, k-means, feature engineering, and train/test splitting.",
    status: "available",
    chapters: MACHINE_LEARNING_FUNDAMENTALS_CHAPTERS,
    contentBase: "machine-learning-fundamentals",
  },
  {
    slug: "applied-machine-learning",
    title: "Applied Machine Learning",
    tagline:
      "scikit-learn, pipelines, cross-validation, hyperparameter tuning, classification and regression metrics, and imbalanced datasets — building models the way practitioners do.",
    status: "available",
    chapters: APPLIED_MACHINE_LEARNING_CHAPTERS,
    contentBase: "applied-machine-learning",
  },
  {
    slug: "advanced-data-science",
    title: "Advanced Data Science",
    tagline:
      "XGBoost and boosting, time-series forecasting, NLP fundamentals, recommendation systems, and model explainability.",
    status: "available",
    chapters: ADVANCED_DATA_SCIENCE_CHAPTERS,
    contentBase: "advanced-data-science",
  },
  {
    slug: "ai-and-generative-ai-fundamentals-for-data-scientists",
    title: "AI & Generative AI Fundamentals for Data Scientists",
    tagline:
      "Neural-network concepts, transformers, LLM fundamentals, embeddings, vector databases, RAG, and using AI APIs — the modern AI toolkit from a data scientist's seat.",
    status: "available",
    chapters: AI_AND_GENERATIVE_AI_FUNDAMENTALS_FOR_DATA_SCIENTISTS_CHAPTERS,
    contentBase: "ai-and-generative-ai-fundamentals-for-data-scientists",
  },
  {
    slug: "azure-data-science",
    title: "Azure Data Science",
    tagline:
      "Azure Machine Learning, MLflow, Databricks, Fabric, model deployment, and monitoring — running data science on Microsoft's cloud.",
    status: "available",
    chapters: AZURE_DATA_SCIENCE_CHAPTERS,
    contentBase: "azure-data-science",
  },
  {
    slug: "aws-data-science",
    title: "AWS Data Science",
    tagline:
      "S3, Glue, Athena, Redshift, SageMaker, and model deployment — running data science on AWS.",
    status: "available",
    chapters: AWS_DATA_SCIENCE_CHAPTERS,
    contentBase: "aws-data-science",
  },
  {
    slug: "mlops-for-data-scientists",
    title: "MLOps for Data Scientists",
    tagline:
      "Git/GitHub, Docker, CI/CD, model versioning, MLflow, model monitoring, and automated retraining — taking a model from a notebook to reliable production.",
    status: "available",
    chapters: MLOPS_FOR_DATA_SCIENTISTS_CHAPTERS,
    contentBase: "mlops-for-data-scientists",
  },
  {
    slug: "data-science-capstone",
    title: "Data Science Capstone",
    tagline:
      "A messy business dataset, taken from business problem to SQL, Python, EDA, a model, evaluation, deployment, and a stakeholder presentation — plus career preparation.",
    status: "available",
    chapters: DATA_SCIENCE_CAPSTONE_CHAPTERS,
    contentBase: "data-science-capstone",
  },
  {
    slug: "it-networking-and-cloud-fundamentals",
    title: "IT, Networking & Cloud Fundamentals",
    tagline:
      "Operating systems, TCP/IP, DNS, HTTP/HTTPS, firewalls, virtual machines, and cloud fundamentals — the ground floor every DevOps job assumes.",
    status: "available",
    chapters: IT_NETWORKING_AND_CLOUD_FUNDAMENTALS_CHAPTERS,
    contentBase: "it-networking-and-cloud-fundamentals",
  },
  {
    slug: "linux-administration",
    title: "Linux Administration",
    tagline:
      "The Linux CLI, files and directories, permissions, users and groups, processes, services, SSH, and Bash scripting.",
    status: "available",
    chapters: LINUX_ADMINISTRATION_CHAPTERS,
    contentBase: "linux-administration",
  },
  {
    slug: "python-and-bash-automation",
    title: "Python & Bash Automation",
    tagline:
      "Bash scripts, Python automation, APIs, JSON/YAML, environment variables, and automating repetitive administration.",
    status: "available",
    chapters: PYTHON_AND_BASH_AUTOMATION_CHAPTERS,
    contentBase: "python-and-bash-automation",
  },
  {
    slug: "docker-and-containers",
    title: "Docker",
    tagline:
      "Images, containers, Dockerfiles, registries, volumes, networking, and Docker Compose — containers from first principles to production habits.",
    status: "available",
    chapters: DOCKER_AND_CONTAINERS_CHAPTERS,
    contentBase: "docker-and-containers",
  },
  {
    slug: "kubernetes-orchestration",
    title: "Kubernetes",
    tagline:
      "Pods, Deployments, Services, ConfigMaps, Secrets, Ingress, scaling, and running on AKS and EKS.",
    status: "available",
    chapters: KUBERNETES_ORCHESTRATION_CHAPTERS,
    contentBase: "kubernetes-orchestration",
  },
  {
    slug: "infrastructure-as-code-with-terraform",
    title: "Infrastructure as Code",
    tagline:
      "Terraform variables, modules, state, and providers — deploying real Azure and AWS infrastructure declaratively and repeatably.",
    status: "available",
    chapters: INFRASTRUCTURE_AS_CODE_WITH_TERRAFORM_CHAPTERS,
    contentBase: "infrastructure-as-code-with-terraform",
  },
  {
    slug: "ci-cd-pipelines",
    title: "CI/CD",
    tagline:
      "GitHub Actions, Azure DevOps, build and release pipelines, testing, artifacts, and environment promotion — automating the path from commit to production.",
    status: "available",
    chapters: CI_CD_PIPELINES_CHAPTERS,
    contentBase: "ci-cd-pipelines",
  },
  {
    slug: "monitoring-logging-and-observability",
    title: "Monitoring & Observability",
    tagline:
      "Azure Monitor, Application Insights, AWS CloudWatch, Prometheus, Grafana, logs, alerts, and troubleshooting.",
    status: "available",
    chapters: MONITORING_LOGGING_AND_OBSERVABILITY_CHAPTERS,
    contentBase: "monitoring-logging-and-observability",
  },
  {
    slug: "devsecops-fundamentals",
    title: "DevSecOps",
    tagline:
      "Secrets management, IAM, RBAC, vulnerability scanning, container security, pipeline security, Key Vault, and AWS Secrets Manager.",
    status: "available",
    chapters: DEVSECOPS_FUNDAMENTALS_CHAPTERS,
    contentBase: "devsecops-fundamentals",
  },
  {
    slug: "devops-capstone",
    title: "DevOps Capstone",
    tagline:
      "GitHub → Application → Docker → Terraform → Azure/AWS → Kubernetes → CI/CD → Monitoring: push a code change and watch the pipeline build, test, package, and deploy it — plus career preparation.",
    status: "available",
    chapters: DEVOPS_CAPSTONE_CHAPTERS,
    contentBase: "devops-capstone",
  },
  ...TRACKS.filter((t) => t.slug !== "blockchain").map((t) => ({
    slug: t.slug,
    title: t.title,
    tagline: t.line,
    status: "coming-soon" as const,
  })),
];

export const getCourse = (slug: string) => COURSES.find((c) => c.slug === slug);

export function findLesson(course: CourseMeta, lessonSlug: string) {
  for (const ch of course.chapters ?? []) {
    const lesson = ch.lessons.find((l) => l.slug === lessonSlug);
    if (lesson) return { chapter: ch, lesson };
  }
  return null;
}

export function lessonCount(course: CourseMeta) {
  return (course.chapters ?? []).reduce((n, ch) => n + ch.lessons.length, 0);
}

export type Quiz = {
  questions: { q: string; options: string[]; answer: number; explain: string }[];
};

// Lesson content lives on disk under content/<contentBase>/ (moves to the
// database when the backend lands). Only lessons with a contentDir have content.
export function loadLessonContent(lesson: LessonMeta, contentBase: string) {
  if (!lesson.contentDir) return null;
  const dir = path.join(process.cwd(), "content", contentBase, lesson.contentDir);
  const guidePath = path.join(dir, "guide.md");
  const quizPath = path.join(dir, "quiz.json");
  const guideHtml = fs.existsSync(guidePath)
    ? (marked.parse(fs.readFileSync(guidePath, "utf8")) as string)
    : null;
  const quiz: Quiz | null = fs.existsSync(quizPath)
    ? JSON.parse(fs.readFileSync(quizPath, "utf8"))
    : null;
  return { guideHtml, quiz };
}

// A course's final test — 20 questions covering the whole course, 90% (18/20)
// required to pass. Lives at content/<contentBase>/course-test.json, a sibling
// of the per-lesson content folders. Reuses the Quiz shape; only lessons get
// contentDir-scoped folders, a course test sits at the course's content root.
export function loadCourseTest(course: CourseMeta): Quiz | null {
  const testPath = path.join(
    process.cwd(),
    "content",
    course.contentBase ?? course.slug,
    "course-test.json"
  );
  return fs.existsSync(testPath) ? JSON.parse(fs.readFileSync(testPath, "utf8")) : null;
}
