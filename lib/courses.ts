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
import { MATHEMATICS_FOR_QUANTITATIVE_FINANCE_CHAPTERS } from "./mathematics-for-quantitative-finance-outline";
import { ADVANCED_PYTHON_FOR_QUANT_RESEARCH_CHAPTERS } from "./advanced-python-for-quant-research-outline";
import { CPP_FOR_QUANTITATIVE_DEVELOPERS_CHAPTERS } from "./cpp-for-quantitative-developers-outline";
import { FINANCIAL_MARKETS_AND_QUANTITATIVE_FINANCE_CHAPTERS } from "./financial-markets-and-quantitative-finance-outline";
import { TIME_SERIES_AND_FINANCIAL_MODELING_CHAPTERS } from "./time-series-and-financial-modeling-outline";
import { MACHINE_LEARNING_FOR_QUANT_FINANCE_CHAPTERS } from "./machine-learning-for-quant-finance-outline";
import { ALGORITHMIC_TRADING_AND_BACKTESTING_CHAPTERS } from "./algorithmic-trading-and-backtesting-outline";
import { QUANT_RESEARCH_AND_TRADING_CAPSTONE_CHAPTERS } from "./quant-research-and-trading-capstone-outline";
import { DEVOPS_CAPSTONE_CHAPTERS } from "./devops-capstone-outline";
import { ORACLE_FUSION_CLOUD_AND_ERP_FOUNDATIONS_CHAPTERS } from "./oracle-fusion-cloud-and-erp-foundations-outline";
import { ACCOUNTING_FUNDAMENTALS_FOR_ORACLE_PROFESSIONALS_CHAPTERS } from "./accounting-fundamentals-for-oracle-professionals-outline";
import { ORACLE_FUSION_ENTERPRISE_STRUCTURES_AND_CHART_OF_ACCOUNTS_CHAPTERS } from "./oracle-fusion-enterprise-structures-and-chart-of-accounts-outline";
import { ORACLE_FUSION_GENERAL_LEDGER_CHAPTERS } from "./oracle-fusion-general-ledger-outline";
import { ORACLE_FUSION_ACCOUNTS_PAYABLE_CHAPTERS } from "./oracle-fusion-accounts-payable-outline";
import { ORACLE_FUSION_ACCOUNTS_RECEIVABLE_CHAPTERS } from "./oracle-fusion-accounts-receivable-outline";
import { ORACLE_FUSION_CASH_MANAGEMENT_CHAPTERS } from "./oracle-fusion-cash-management-outline";
import { ORACLE_FUSION_FIXED_ASSETS_CHAPTERS } from "./oracle-fusion-fixed-assets-outline";
import { ORACLE_FUSION_EXPENSES_CHAPTERS } from "./oracle-fusion-expenses-outline";
import { ORACLE_FUSION_PROCURE_TO_PAY_CHAPTERS } from "./oracle-fusion-procure-to-pay-outline";
import { ORACLE_FUSION_ORDER_TO_CASH_CHAPTERS } from "./oracle-fusion-order-to-cash-outline";
import { ORACLE_FUSION_SUBLEDGER_ACCOUNTING_CHAPTERS } from "./oracle-fusion-subledger-accounting-outline";
import { ORACLE_FINANCIAL_REPORTING_CHAPTERS } from "./oracle-financial-reporting-outline";
import { ORACLE_FINANCIALS_DATA_CHAPTERS } from "./oracle-financials-data-outline";
import { SQL_FOR_ORACLE_FINANCIALS_CHAPTERS } from "./sql-for-oracle-financials-outline";
import { FBDI_AND_ADFDI_CHAPTERS } from "./fbdi-and-adfdi-outline";
import { REST_APIS_AND_INTEGRATION_FUNDAMENTALS_CHAPTERS } from "./rest-apis-and-integration-fundamentals-outline";
import { ORACLE_FUSION_SECURITY_CHAPTERS } from "./oracle-fusion-security-outline";
import { ORACLE_FUSION_IMPLEMENTATION_LIFECYCLE_CHAPTERS } from "./oracle-fusion-implementation-lifecycle-outline";
import { TROUBLESHOOTING_ORACLE_FINANCIALS_CHAPTERS } from "./troubleshooting-oracle-financials-outline";
import { LTV_MANUFACTURING_CORPORATION_CAPSTONE_CHAPTERS } from "./ltv-manufacturing-corporation-capstone-outline";
import { ORACLE_FINANCIALS_CAREER_AND_INTERVIEW_PREPARATION_CHAPTERS } from "./oracle-financials-career-and-interview-preparation-outline";
import { SFTA_SALESFORCE_AND_CRM_FOUNDATIONS_CHAPTERS } from "./salesforce-and-crm-foundations-outline";
import { SFTA_SALESFORCE_HANDS_ON_ENVIRONMENT_CHAPTERS } from "./salesforce-hands-on-environment-outline";
import { SFTA_SALESFORCE_DATA_MODEL_FUNDAMENTALS_CHAPTERS } from "./salesforce-data-model-fundamentals-outline";
import { SFTA_SALESFORCE_ADMINISTRATION_CHAPTERS } from "./salesforce-administration-outline";
import { SFTA_SALESFORCE_SECURITY_AND_ACCESS_FUNDAMENTALS_CHAPTERS } from "./salesforce-security-and-access-fundamentals-outline";
import { SFTA_SALESFORCE_DATA_MANAGEMENT_CHAPTERS } from "./salesforce-data-management-outline";
import { SFTA_SALESFORCE_ADMIN_REPORTS_AND_DASHBOARDS_CHAPTERS } from "./salesforce-admin-reports-and-dashboards-outline";
import { SFTA_SALESFORCE_PLATFORM_APP_BUILDER_CHAPTERS } from "./salesforce-platform-app-builder-outline";
import { SFTA_SALESFORCE_FLOW_AUTOMATION_CHAPTERS } from "./salesforce-flow-automation-outline";
import { SFTA_SALESFORCE_BUSINESS_PROCESS_AUTOMATION_CHAPTERS } from "./salesforce-business-process-automation-outline";
import { SFTA_PROGRAMMING_FOUNDATIONS_FOR_SALESFORCE_CHAPTERS } from "./programming-foundations-for-salesforce-outline";
import { SFTA_APEX_PROGRAMMING_CHAPTERS } from "./apex-programming-outline";
import { SFTA_SOQL_AND_SOSL_CHAPTERS } from "./soql-and-sosl-outline";
import { SFTA_APEX_TESTING_CHAPTERS } from "./apex-testing-outline";
import { SFTA_LIGHTNING_WEB_COMPONENTS_CHAPTERS } from "./lightning-web-components-outline";
import { SFTA_SALESFORCE_APIS_CHAPTERS } from "./salesforce-apis-outline";
import { SFTA_SALESFORCE_INTEGRATION_DEVELOPMENT_CHAPTERS } from "./salesforce-integration-development-outline";
import { SFTA_ASYNCHRONOUS_APEX_CHAPTERS } from "./asynchronous-apex-outline";
import { SFTA_PERFORMANCE_AND_GOVERNOR_LIMITS_CHAPTERS } from "./performance-and-governor-limits-outline";
import { SFTA_ENTERPRISE_SALESFORCE_DATA_ARCHITECTURE_CHAPTERS } from "./enterprise-salesforce-data-architecture-outline";
import { SFTA_LARGE_DATA_VOLUMES_CHAPTERS } from "./large-data-volumes-outline";
import { SFTA_DATA_MIGRATION_ARCHITECTURE_CHAPTERS } from "./data-migration-architecture-outline";
import { SFTA_DATA_GOVERNANCE_CHAPTERS } from "./data-governance-outline";
import { SFTA_SHARING_AND_VISIBILITY_ARCHITECTURE_CHAPTERS } from "./sharing-and-visibility-architecture-outline";
import { SFTA_IDENTITY_AND_ACCESS_MANAGEMENT_CHAPTERS } from "./identity-and-access-management-outline";
import { SFTA_ENTERPRISE_SECURITY_DESIGN_CHAPTERS } from "./enterprise-security-design-outline";
import { SFTA_INTEGRATION_ARCHITECTURE_CHAPTERS } from "./integration-architecture-outline";
import { SFTA_EVENT_DRIVEN_SALESFORCE_CHAPTERS } from "./event-driven-salesforce-outline";
import { SFTA_INTEGRATION_SECURITY_CHAPTERS } from "./integration-security-outline";
import { SFTA_INTEGRATION_ARCHITECTURE_CASE_STUDIES_CHAPTERS } from "./integration-architecture-case-studies-outline";
import { SFTA_SALESFORCE_DX_CHAPTERS } from "./salesforce-dx-outline";
import { SFTA_GIT_AND_SOURCE_CONTROL_CHAPTERS } from "./git-and-source-control-outline";
import { SFTA_CICD_FOR_SALESFORCE_CHAPTERS } from "./cicd-for-salesforce-outline";
import { SFTA_SALESFORCE_ENVIRONMENT_STRATEGY_CHAPTERS } from "./salesforce-environment-strategy-outline";
import { SFTA_RELEASE_AND_GOVERNANCE_ARCHITECTURE_CHAPTERS } from "./release-and-governance-architecture-outline";
import { SFTA_ENTERPRISE_APPLICATION_ARCHITECTURE_CHAPTERS } from "./enterprise-application-architecture-outline";
import { SFTA_APPLICATION_ARCHITECTURE_CASE_STUDIES_CHAPTERS } from "./application-architecture-case-studies-outline";
import { SFTA_ARCHITECTURE_DOCUMENTATION_CHAPTERS } from "./architecture-documentation-outline";
import { SFTA_ENTERPRISE_SYSTEMS_ARCHITECTURE_CHAPTERS } from "./enterprise-systems-architecture-outline";
import { SFTA_DISTRIBUTED_SYSTEMS_CONCEPTS_CHAPTERS } from "./distributed-systems-concepts-outline";
import { SFTA_ENTERPRISE_INTEGRATION_CASE_STUDIES_CHAPTERS } from "./enterprise-integration-case-studies-outline";
import { SFTA_TECHNICAL_ARCHITECTURE_FUNDAMENTALS_CHAPTERS } from "./technical-architecture-fundamentals-outline";
import { SFTA_ARCHITECTURE_TRADEOFFS_CHAPTERS } from "./architecture-tradeoffs-outline";
import { SFTA_ARCHITECTURE_REVIEW_BOARDS_CHAPTERS } from "./architecture-review-boards-outline";
import { SFTA_NONFUNCTIONAL_REQUIREMENTS_CHAPTERS } from "./nonfunctional-requirements-outline";
import { SFTA_TECHNICAL_ARCHITECT_CASE_STUDIES_CHAPTERS } from "./technical-architect-case-studies-outline";
import { SFTA_LTV_CUSTOMER_MANAGEMENT_SYSTEM_CHAPTERS } from "./ltv-customer-management-system-outline";
import { SFTA_LTV_SERVICE_AND_SALES_PLATFORM_CHAPTERS } from "./ltv-service-and-sales-platform-outline";
import { SFTA_LTV_GLOBAL_ENTERPRISE_TRANSFORMATION_CHAPTERS } from "./ltv-global-enterprise-transformation-outline";
import { SFTA_SALESFORCE_CAREER_PREPARATION_CHAPTERS } from "./salesforce-career-preparation-outline";
import { GOV_DATA_GOVERNANCE_FOUNDATIONS_CHAPTERS } from "./data-governance-foundations-outline";
import { GOV_DATA_QUALITY_MANAGEMENT_CHAPTERS } from "./data-quality-management-outline";
import { GOV_METADATA_MANAGEMENT_AND_BUSINESS_GLOSSARY_CHAPTERS } from "./metadata-management-and-business-glossary-outline";
import { GOV_DATA_LINEAGE_AND_IMPACT_ANALYSIS_CHAPTERS } from "./data-lineage-and-impact-analysis-outline";
import { GOV_MASTER_AND_REFERENCE_DATA_MANAGEMENT_CHAPTERS } from "./master-and-reference-data-management-outline";
import { GOV_DATA_SECURITY_PRIVACY_AND_CLASSIFICATION_CHAPTERS } from "./data-security-privacy-and-classification-outline";
import { GOV_MICROSOFT_PURVIEW_CHAPTERS } from "./microsoft-purview-outline";
import { GOV_MICROSOFT_FABRIC_DATA_GOVERNANCE_CHAPTERS } from "./microsoft-fabric-data-governance-outline";
import { GOV_DATABRICKS_UNITY_CATALOG_GOVERNANCE_CHAPTERS } from "./databricks-unity-catalog-governance-outline";
import { GOV_SNOWFLAKE_DATA_GOVERNANCE_CHAPTERS } from "./snowflake-data-governance-outline";
import { GOV_POWER_BI_GOVERNANCE_CHAPTERS } from "./power-bi-governance-outline";
import { GOV_CLOUD_DATA_GOVERNANCE_AZURE_AND_AWS_CHAPTERS } from "./cloud-data-governance-azure-and-aws-outline";
import { GOV_AI_AND_MACHINE_LEARNING_GOVERNANCE_CHAPTERS } from "./ai-and-machine-learning-governance-outline";
import { GOV_DATA_GOVERNANCE_PROGRAM_MANAGEMENT_CHAPTERS } from "./data-governance-program-management-outline";
import { GOV_DATA_GOVERNANCE_ARCHITECTURE_CHAPTERS } from "./data-governance-architecture-outline";
import { GOV_DATA_GOVERNANCE_CAREER_AND_CAPSTONE_CHAPTERS } from "./data-governance-career-and-capstone-outline";

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
    title: "Artificial Intelligence (AI) & Generative AI Fundamentals for Data Scientists",
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
    title: "Machine Learning Operations (MLOps) for Data Scientists",
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
    title: "Docker Containers for DevOps",
    tagline:
      "Images, containers, Dockerfiles, registries, volumes, networking, and Docker Compose — containers from first principles to production habits.",
    status: "available",
    chapters: DOCKER_AND_CONTAINERS_CHAPTERS,
    contentBase: "docker-and-containers",
  },
  {
    slug: "kubernetes-orchestration",
    title: "Kubernetes Container Orchestration for DevOps",
    tagline:
      "Pods, Deployments, Services, ConfigMaps, Secrets, Ingress, scaling, and running on AKS and EKS.",
    status: "available",
    chapters: KUBERNETES_ORCHESTRATION_CHAPTERS,
    contentBase: "kubernetes-orchestration",
  },
  {
    slug: "infrastructure-as-code-with-terraform",
    title: "Infrastructure as Code with Terraform for DevOps",
    tagline:
      "Terraform variables, modules, state, and providers — deploying real Azure and AWS infrastructure declaratively and repeatably.",
    status: "available",
    chapters: INFRASTRUCTURE_AS_CODE_WITH_TERRAFORM_CHAPTERS,
    contentBase: "infrastructure-as-code-with-terraform",
  },
  {
    slug: "ci-cd-pipelines",
    title: "Continuous Integration & Continuous Delivery (CI/CD) for DevOps",
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
    title: "Security in DevOps (DevSecOps)",
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
  {
    slug: "mathematics-for-quantitative-finance",
    title: "Mathematics for Quantitative Finance",
    tagline:
      "Probability, advanced statistics, linear algebra, calculus, optimization, and stochastic processes — the mathematical language every quantitative model is written in.",
    status: "available",
    chapters: MATHEMATICS_FOR_QUANTITATIVE_FINANCE_CHAPTERS,
    contentBase: "mathematics-for-quantitative-finance",
  },
  {
    slug: "advanced-python-for-quant-research",
    title: "Advanced Python for Quantitative Research",
    tagline:
      "NumPy and pandas at scale, vectorization, numerical computing, optimization, profiling, and research frameworks — writing fast, correct, reproducible research code.",
    status: "available",
    chapters: ADVANCED_PYTHON_FOR_QUANT_RESEARCH_CHAPTERS,
    contentBase: "advanced-python-for-quant-research",
  },
  {
    slug: "cpp-for-quantitative-developers",
    title: "C++ for Quantitative Developers",
    tagline:
      "Memory, pointers, object-oriented design, the STL, multithreading, performance optimization, and Python/C++ integration — the language of production trading systems.",
    status: "available",
    chapters: CPP_FOR_QUANTITATIVE_DEVELOPERS_CHAPTERS,
    contentBase: "cpp-for-quantitative-developers",
  },
  {
    slug: "financial-markets-and-quantitative-finance",
    title: "Financial Markets & Quantitative Finance",
    tagline:
      "Equities, bonds, options, futures, market structure, portfolio theory, risk, and derivatives pricing — how markets work and how quants model them.",
    status: "available",
    chapters: FINANCIAL_MARKETS_AND_QUANTITATIVE_FINANCE_CHAPTERS,
    contentBase: "financial-markets-and-quantitative-finance",
  },
  {
    slug: "time-series-and-financial-modeling",
    title: "Time Series & Financial Modeling",
    tagline:
      "Returns, volatility, stationarity, ARIMA, GARCH, factor models, forecasting, and financial feature engineering.",
    status: "available",
    chapters: TIME_SERIES_AND_FINANCIAL_MODELING_CHAPTERS,
    contentBase: "time-series-and-financial-modeling",
  },
  {
    slug: "machine-learning-for-quant-finance",
    title: "Machine Learning for Quantitative Finance",
    tagline:
      "Regression and classification, trees and boosting, clustering, feature engineering, model validation, and overfitting control — ML applied to noisy financial data.",
    status: "available",
    chapters: MACHINE_LEARNING_FOR_QUANT_FINANCE_CHAPTERS,
    contentBase: "machine-learning-for-quant-finance",
  },
  {
    slug: "algorithmic-trading-and-backtesting",
    title: "Algorithmic Trading & Backtesting",
    tagline:
      "Strategy design, signals, backtesting, transaction costs, slippage, position sizing, the Sharpe ratio, drawdown, and avoiding look-ahead bias.",
    status: "available",
    chapters: ALGORITHMIC_TRADING_AND_BACKTESTING_CHAPTERS,
    contentBase: "algorithmic-trading-and-backtesting",
  },
  {
    slug: "quant-research-and-trading-capstone",
    title: "Quantitative Research & Trading Capstone",
    tagline:
      "Start with raw market data and build a complete research project: research question, statistical analysis, feature engineering, model, trading signal, backtest, risk analysis, performance report, and presentation — plus career preparation.",
    status: "available",
    chapters: QUANT_RESEARCH_AND_TRADING_CAPSTONE_CHAPTERS,
    contentBase: "quant-research-and-trading-capstone",
  },
  {
    slug: "oracle-fusion-cloud-and-erp-foundations",
    title: "Oracle Fusion Cloud & ERP Foundations",
    tagline:
      "ERP fundamentals, Oracle Fusion Cloud architecture, SaaS, navigation, environments, implementation terminology, and functional versus technical Oracle careers.",
    status: "available",
    chapters: ORACLE_FUSION_CLOUD_AND_ERP_FOUNDATIONS_CHAPTERS,
    contentBase: "oracle-fusion-cloud-and-erp-foundations",
  },
  {
    slug: "accounting-fundamentals-for-oracle-professionals",
    title: "Accounting Fundamentals for Oracle Professionals",
    tagline:
      "Debits and credits, assets, liabilities, equity, revenue, expenses, journal entries, trial balance, financial statements, accounting periods, ledgers and subledgers.",
    status: "available",
    chapters: ACCOUNTING_FUNDAMENTALS_FOR_ORACLE_PROFESSIONALS_CHAPTERS,
    contentBase: "accounting-fundamentals-for-oracle-professionals",
  },
  {
    slug: "oracle-fusion-enterprise-structures-and-chart-of-accounts",
    title: "Enterprise Structures & Chart of Accounts",
    tagline:
      "Legal entities, business units, ledgers, chart of accounts, accounting calendars, currencies and reference data.",
    status: "available",
    chapters: ORACLE_FUSION_ENTERPRISE_STRUCTURES_AND_CHART_OF_ACCOUNTS_CHAPTERS,
    contentBase: "oracle-fusion-enterprise-structures-and-chart-of-accounts",
  },
  {
    slug: "oracle-fusion-general-ledger",
    title: "General Ledger",
    tagline:
      "Ledgers, journals, sources, categories, posting, recurring journals, allocations, balances, inquiries and accounting periods.",
    status: "available",
    chapters: ORACLE_FUSION_GENERAL_LEDGER_CHAPTERS,
    contentBase: "oracle-fusion-general-ledger",
  },
  {
    slug: "oracle-fusion-accounts-payable",
    title: "Accounts Payable",
    tagline:
      "Suppliers, invoices, invoice validation, holds, approvals, matching, payment terms, payments and accounting.",
    status: "available",
    chapters: ORACLE_FUSION_ACCOUNTS_PAYABLE_CHAPTERS,
    contentBase: "oracle-fusion-accounts-payable",
  },
  {
    slug: "oracle-fusion-accounts-receivable",
    title: "Accounts Receivable",
    tagline:
      "Customers, transactions, invoices, credit memos, adjustments, receipts, collections and accounting.",
    status: "available",
    chapters: ORACLE_FUSION_ACCOUNTS_RECEIVABLE_CHAPTERS,
    contentBase: "oracle-fusion-accounts-receivable",
  },
  {
    slug: "oracle-fusion-cash-management",
    title: "Cash Management",
    tagline:
      "Bank accounts, bank statements, transaction matching, reconciliation and cash positioning.",
    status: "available",
    chapters: ORACLE_FUSION_CASH_MANAGEMENT_CHAPTERS,
    contentBase: "oracle-fusion-cash-management",
  },
  {
    slug: "oracle-fusion-fixed-assets",
    title: "Fixed Assets",
    tagline:
      "Asset books, categories, additions, capitalization, depreciation, transfers and retirements.",
    status: "available",
    chapters: ORACLE_FUSION_FIXED_ASSETS_CHAPTERS,
    contentBase: "oracle-fusion-fixed-assets",
  },
  {
    slug: "oracle-fusion-expenses",
    title: "Expenses",
    tagline:
      "Employee expenses, expense reports, corporate cards, approvals, reimbursements and expense accounting.",
    status: "available",
    chapters: ORACLE_FUSION_EXPENSES_CHAPTERS,
    contentBase: "oracle-fusion-expenses",
  },
  {
    slug: "oracle-fusion-procure-to-pay",
    title: "Procure-to-Pay",
    tagline:
      "Requisition → Purchase Order → Receipt → AP Invoice → Payment → Accounting → General Ledger.",
    status: "available",
    chapters: ORACLE_FUSION_PROCURE_TO_PAY_CHAPTERS,
    contentBase: "oracle-fusion-procure-to-pay",
  },
  {
    slug: "oracle-fusion-order-to-cash",
    title: "Order-to-Cash",
    tagline:
      "Customer → Order → Invoice → Receivable → Receipt → Accounting → General Ledger.",
    status: "available",
    chapters: ORACLE_FUSION_ORDER_TO_CASH_CHAPTERS,
    contentBase: "oracle-fusion-order-to-cash",
  },
  {
    slug: "oracle-fusion-subledger-accounting",
    title: "Subledger Accounting",
    tagline:
      "Accounting events, journal lines, account derivation, subledger entries, transfers to General Ledger and reconciliation.",
    status: "available",
    chapters: ORACLE_FUSION_SUBLEDGER_ACCOUNTING_CHAPTERS,
    contentBase: "oracle-fusion-subledger-accounting",
  },
  {
    slug: "oracle-financial-reporting",
    title: "Oracle Financial Reporting",
    tagline:
      "Financial Reporting Center, OTBI, BI Publisher, Smart View, financial statements, operational reports and dashboards.",
    status: "available",
    chapters: ORACLE_FINANCIAL_REPORTING_CHAPTERS,
    contentBase: "oracle-financial-reporting",
  },
  {
    slug: "oracle-financials-data",
    title: "Oracle Financials Data",
    tagline:
      "Understand how suppliers, customers, invoices, payments, journals, ledgers and accounting transactions are represented and related.",
    status: "available",
    chapters: ORACLE_FINANCIALS_DATA_CHAPTERS,
    contentBase: "oracle-financials-data",
  },
  {
    slug: "sql-for-oracle-financials",
    title: "SQL for Oracle Financials",
    tagline:
      "Use SQL concepts to investigate financial data, reconcile transactions, identify exceptions and answer business questions. Example challenge: Finance needs all unpaid supplier invoices over $10,000 that are more than 30 days old.",
    status: "available",
    chapters: SQL_FOR_ORACLE_FINANCIALS_CHAPTERS,
    contentBase: "sql-for-oracle-financials",
  },
  {
    slug: "fbdi-and-adfdi",
    title: "FBDI & ADFdi",
    tagline:
      "File-Based Data Import (FBDI), Application Development Framework desktop integration (ADFdi), spreadsheet uploads, templates, CSV/ZIP processing, validation, failed imports and scheduled processes.",
    status: "available",
    chapters: FBDI_AND_ADFDI_CHAPTERS,
    contentBase: "fbdi-and-adfdi",
  },
  {
    slug: "rest-apis-and-integration-fundamentals",
    title: "REST APIs & Integration Fundamentals",
    tagline:
      "REST APIs, JSON, authentication concepts, integrations and exchanging financial data between Oracle Fusion and external applications.",
    status: "available",
    chapters: REST_APIS_AND_INTEGRATION_FUNDAMENTALS_CHAPTERS,
    contentBase: "rest-apis-and-integration-fundamentals",
  },
  {
    slug: "oracle-fusion-security",
    title: "Oracle Fusion Security",
    tagline:
      "Users, job roles, duty roles, privileges, data access, segregation of duties and Financials security.",
    status: "available",
    chapters: ORACLE_FUSION_SECURITY_CHAPTERS,
    contentBase: "oracle-fusion-security",
  },
  {
    slug: "oracle-fusion-implementation-lifecycle",
    title: "Oracle Fusion Implementation Lifecycle",
    tagline:
      "Requirements gathering, fit-gap analysis, configuration workbooks, DEV/TEST/PROD concepts, data migration, SIT, UAT, deployment and production support.",
    status: "available",
    chapters: ORACLE_FUSION_IMPLEMENTATION_LIFECYCLE_CHAPTERS,
    contentBase: "oracle-fusion-implementation-lifecycle",
  },
  {
    slug: "troubleshooting-oracle-financials",
    title: "Troubleshooting Oracle Financials",
    tagline:
      "Students work realistic support tickets such as: AP invoice will not validate, journal will not post, user cannot access a business unit, payment is missing from GL, supplier was configured incorrectly, FBDI import failed, AR does not reconcile with GL, and accounting period will not close.",
    status: "available",
    chapters: TROUBLESHOOTING_ORACLE_FINANCIALS_CHAPTERS,
    contentBase: "troubleshooting-oracle-financials",
  },
  {
    slug: "ltv-manufacturing-corporation-capstone",
    title: "LTV Manufacturing Corporation",
    tagline:
      "An end-to-end simulated Oracle Fusion Financials implementation: configure the enterprise, run purchasing through General Ledger posting, then investigate and correct a January 31 month-end close.",
    status: "available",
    chapters: LTV_MANUFACTURING_CORPORATION_CAPSTONE_CHAPTERS,
    contentBase: "ltv-manufacturing-corporation-capstone",
  },
  {
    slug: "oracle-financials-career-and-interview-preparation",
    title: "Oracle Financials Career & Interview Preparation",
    tagline:
      "Oracle Financials terminology, functional, scenario-based, troubleshooting and implementation interview questions, resume project descriptions, how to explain the LTV Manufacturing capstone, and Oracle certification preparation guidance.",
    status: "available",
    chapters: ORACLE_FINANCIALS_CAREER_AND_INTERVIEW_PREPARATION_CHAPTERS,
    contentBase: "oracle-financials-career-and-interview-preparation",
  },
  {
    slug: "salesforce-and-crm-foundations",
    title: "Salesforce & CRM Foundations",
    tagline:
      "CRM fundamentals, Salesforce ecosystem, clouds, multitenancy, organizations, records, objects, fields, applications, Lightning Experience and Salesforce terminology.",
    status: "available",
    chapters: SFTA_SALESFORCE_AND_CRM_FOUNDATIONS_CHAPTERS,
    contentBase: "salesforce-and-crm-foundations",
  },
  {
    slug: "salesforce-hands-on-environment",
    title: "Hands-On Salesforce Environment",
    tagline:
      "Create a Trailhead account, create Trailhead Playgrounds, understand Developer Edition, navigate Setup and prepare the student's permanent training environment.",
    status: "available",
    chapters: SFTA_SALESFORCE_HANDS_ON_ENVIRONMENT_CHAPTERS,
    contentBase: "salesforce-hands-on-environment",
  },
  {
    slug: "salesforce-data-model-fundamentals",
    title: "Salesforce Data Model Fundamentals",
    tagline:
      "Standard objects, custom objects, fields, relationships, record types, schema design and Salesforce IDs.",
    status: "available",
    chapters: SFTA_SALESFORCE_DATA_MODEL_FUNDAMENTALS_CHAPTERS,
    contentBase: "salesforce-data-model-fundamentals",
  },
  {
    slug: "salesforce-administration",
    title: "Salesforce Administration",
    tagline:
      "Users, licenses, profiles, permission sets, organization settings, applications, tabs, page layouts, record types and administration.",
    status: "available",
    chapters: SFTA_SALESFORCE_ADMINISTRATION_CHAPTERS,
    contentBase: "salesforce-administration",
  },
  {
    slug: "salesforce-security-and-access-fundamentals",
    title: "Security & Access Fundamentals",
    tagline:
      "Profiles, permission sets, roles, organization-wide defaults, sharing rules, role hierarchy and field-level security.",
    status: "available",
    chapters: SFTA_SALESFORCE_SECURITY_AND_ACCESS_FUNDAMENTALS_CHAPTERS,
    contentBase: "salesforce-security-and-access-fundamentals",
  },
  {
    slug: "salesforce-data-management",
    title: "Data Management",
    tagline:
      "Import Wizard, Data Loader concepts, duplicate management, validation, data quality, exports and bulk data operations.",
    status: "available",
    chapters: SFTA_SALESFORCE_DATA_MANAGEMENT_CHAPTERS,
    contentBase: "salesforce-data-management",
  },
  {
    slug: "salesforce-admin-reports-and-dashboards",
    title: "Reports & Dashboards",
    tagline:
      "Report types, filters, grouping, summary reports, matrix reports, joined reports, dashboards and business analytics.",
    status: "available",
    chapters: SFTA_SALESFORCE_ADMIN_REPORTS_AND_DASHBOARDS_CHAPTERS,
    contentBase: "salesforce-admin-reports-and-dashboards",
  },
  {
    slug: "salesforce-platform-app-builder",
    title: "Salesforce Platform App Builder",
    tagline:
      "Custom applications, objects, relationships, page layouts, Lightning pages, business logic and application design.",
    status: "available",
    chapters: SFTA_SALESFORCE_PLATFORM_APP_BUILDER_CHAPTERS,
    contentBase: "salesforce-platform-app-builder",
  },
  {
    slug: "salesforce-flow-automation",
    title: "Flow Automation",
    tagline:
      "Record-triggered flows, screen flows, scheduled flows, subflows, decisions, loops, collections, fault handling and automation architecture.",
    status: "available",
    chapters: SFTA_SALESFORCE_FLOW_AUTOMATION_CHAPTERS,
    contentBase: "salesforce-flow-automation",
  },
  {
    slug: "salesforce-business-process-automation",
    title: "Business Process Automation",
    tagline:
      "Approval processes, validation rules, formulas, notifications and choosing between declarative and programmatic solutions.",
    status: "available",
    chapters: SFTA_SALESFORCE_BUSINESS_PROCESS_AUTOMATION_CHAPTERS,
    contentBase: "salesforce-business-process-automation",
  },
  {
    slug: "programming-foundations-for-salesforce",
    title: "Programming Foundations for Salesforce",
    tagline:
      "Programming concepts for students without a software development background.",
    status: "available",
    chapters: SFTA_PROGRAMMING_FOUNDATIONS_FOR_SALESFORCE_CHAPTERS,
    contentBase: "programming-foundations-for-salesforce",
  },
  {
    slug: "apex-programming",
    title: "Apex Programming",
    tagline:
      "Variables, collections, classes, methods, SOQL, DML, exceptions, triggers, bulkification and governor limits.",
    status: "available",
    chapters: SFTA_APEX_PROGRAMMING_CHAPTERS,
    contentBase: "apex-programming",
  },
  {
    slug: "soql-and-sosl",
    title: "SOQL & SOSL",
    tagline:
      "Query Salesforce data, relationships, aggregate queries, filtering, searching and query optimization.",
    status: "available",
    chapters: SFTA_SOQL_AND_SOSL_CHAPTERS,
    contentBase: "soql-and-sosl",
  },
  {
    slug: "apex-testing",
    title: "Apex Testing",
    tagline:
      "Unit testing, test data, assertions, code coverage, positive and negative tests and deployment requirements.",
    status: "available",
    chapters: SFTA_APEX_TESTING_CHAPTERS,
    contentBase: "apex-testing",
  },
  {
    slug: "lightning-web-components",
    title: "Lightning Web Components",
    tagline:
      "HTML, JavaScript fundamentals, components, properties, events, Apex communication, Lightning Data Service and reusable UI components.",
    status: "available",
    chapters: SFTA_LIGHTNING_WEB_COMPONENTS_CHAPTERS,
    contentBase: "lightning-web-components",
  },
  {
    slug: "salesforce-apis",
    title: "Salesforce APIs",
    tagline:
      "REST API, SOAP concepts, Bulk API, authentication, JSON and external applications.",
    status: "available",
    chapters: SFTA_SALESFORCE_APIS_CHAPTERS,
    contentBase: "salesforce-apis",
  },
  {
    slug: "salesforce-integration-development",
    title: "Integration Development",
    tagline:
      "Callouts, Named Credentials, web services, asynchronous integration, Platform Events and integration patterns.",
    status: "available",
    chapters: SFTA_SALESFORCE_INTEGRATION_DEVELOPMENT_CHAPTERS,
    contentBase: "salesforce-integration-development",
  },
  {
    slug: "asynchronous-apex",
    title: "Asynchronous Apex",
    tagline:
      "Future methods, Queueable Apex, Batch Apex and Scheduled Apex.",
    status: "available",
    chapters: SFTA_ASYNCHRONOUS_APEX_CHAPTERS,
    contentBase: "asynchronous-apex",
  },
  {
    slug: "performance-and-governor-limits",
    title: "Performance & Governor Limits",
    tagline:
      "Bulk processing, query optimization, transaction limits, scalability and performance troubleshooting.",
    status: "available",
    chapters: SFTA_PERFORMANCE_AND_GOVERNOR_LIMITS_CHAPTERS,
    contentBase: "performance-and-governor-limits",
  },
  {
    slug: "enterprise-salesforce-data-architecture",
    title: "Enterprise Salesforce Data Architecture",
    tagline:
      "Enterprise data modeling, relationship design, large data volumes, data ownership, master data and scalability.",
    status: "available",
    chapters: SFTA_ENTERPRISE_SALESFORCE_DATA_ARCHITECTURE_CHAPTERS,
    contentBase: "enterprise-salesforce-data-architecture",
  },
  {
    slug: "large-data-volumes",
    title: "Large Data Volumes",
    tagline:
      "Indexing concepts, selective queries, data skew, archiving and performance.",
    status: "available",
    chapters: SFTA_LARGE_DATA_VOLUMES_CHAPTERS,
    contentBase: "large-data-volumes",
  },
  {
    slug: "data-migration-architecture",
    title: "Data Migration Architecture",
    tagline:
      "Source analysis, mappings, transformation, migration sequencing, validation, reconciliation and cutover.",
    status: "available",
    chapters: SFTA_DATA_MIGRATION_ARCHITECTURE_CHAPTERS,
    contentBase: "data-migration-architecture",
  },
  {
    slug: "data-governance",
    title: "Data Governance",
    tagline:
      "Data ownership, quality, retention, compliance and governance.",
    status: "available",
    chapters: SFTA_DATA_GOVERNANCE_CHAPTERS,
    contentBase: "data-governance",
  },
  {
    slug: "sharing-and-visibility-architecture",
    title: "Sharing & Visibility Architecture",
    tagline:
      "OWD, role hierarchy, sharing rules, teams, manual sharing, Apex sharing and enterprise sharing architecture.",
    status: "available",
    chapters: SFTA_SHARING_AND_VISIBILITY_ARCHITECTURE_CHAPTERS,
    contentBase: "sharing-and-visibility-architecture",
  },
  {
    slug: "identity-and-access-management",
    title: "Identity & Access Management",
    tagline:
      "Authentication, authorization, SSO, OAuth, connected apps, identity providers, MFA and enterprise identity architecture.",
    status: "available",
    chapters: SFTA_IDENTITY_AND_ACCESS_MANAGEMENT_CHAPTERS,
    contentBase: "identity-and-access-management",
  },
  {
    slug: "enterprise-security-design",
    title: "Enterprise Security Design",
    tagline:
      "Security boundaries, least privilege, auditing, threat considerations and security architecture.",
    status: "available",
    chapters: SFTA_ENTERPRISE_SECURITY_DESIGN_CHAPTERS,
    contentBase: "enterprise-security-design",
  },
  {
    slug: "integration-architecture",
    title: "Integration Architecture",
    tagline:
      "Point-to-point integration, middleware, synchronous and asynchronous communication, event-driven architecture, APIs and enterprise integration patterns.",
    status: "available",
    chapters: SFTA_INTEGRATION_ARCHITECTURE_CHAPTERS,
    contentBase: "integration-architecture",
  },
  {
    slug: "event-driven-salesforce",
    title: "Event-Driven Salesforce",
    tagline:
      "Platform Events, Change Data Capture, event-driven integration and decoupled architectures.",
    status: "available",
    chapters: SFTA_EVENT_DRIVEN_SALESFORCE_CHAPTERS,
    contentBase: "event-driven-salesforce",
  },
  {
    slug: "integration-security",
    title: "Integration Security",
    tagline:
      "OAuth, certificates, Named Credentials, API security and service accounts.",
    status: "available",
    chapters: SFTA_INTEGRATION_SECURITY_CHAPTERS,
    contentBase: "integration-security",
  },
  {
    slug: "integration-architecture-case-studies",
    title: "Integration Architecture Case Studies",
    tagline:
      "Students design solutions connecting Salesforce with ERP, financial, data warehouse and external applications.",
    status: "available",
    chapters: SFTA_INTEGRATION_ARCHITECTURE_CASE_STUDIES_CHAPTERS,
    contentBase: "integration-architecture-case-studies",
  },
  {
    slug: "salesforce-dx",
    title: "Salesforce DX",
    tagline:
      "Salesforce CLI, source-driven development, Dev Hub, scratch orgs, project structure and metadata.",
    status: "available",
    chapters: SFTA_SALESFORCE_DX_CHAPTERS,
    contentBase: "salesforce-dx",
  },
  {
    slug: "git-and-source-control",
    title: "Git & Source Control",
    tagline:
      "Git fundamentals, branches, pull requests, merge conflicts and Salesforce development workflows.",
    status: "available",
    chapters: SFTA_GIT_AND_SOURCE_CONTROL_CHAPTERS,
    contentBase: "git-and-source-control",
  },
  {
    slug: "cicd-for-salesforce",
    title: "CI/CD for Salesforce",
    tagline:
      "Automated testing, validation, deployment pipelines and release automation.",
    status: "available",
    chapters: SFTA_CICD_FOR_SALESFORCE_CHAPTERS,
    contentBase: "cicd-for-salesforce",
  },
  {
    slug: "salesforce-environment-strategy",
    title: "Environment Strategy",
    tagline:
      "Development environments, sandboxes, scratch orgs, testing environments, staging and production.",
    status: "available",
    chapters: SFTA_SALESFORCE_ENVIRONMENT_STRATEGY_CHAPTERS,
    contentBase: "salesforce-environment-strategy",
  },
  {
    slug: "release-and-governance-architecture",
    title: "Release & Governance Architecture",
    tagline:
      "Release strategy, governance, change control, rollback and enterprise deployment planning.",
    status: "available",
    chapters: SFTA_RELEASE_AND_GOVERNANCE_ARCHITECTURE_CHAPTERS,
    contentBase: "release-and-governance-architecture",
  },
  {
    slug: "enterprise-application-architecture",
    title: "Enterprise Application Architecture",
    tagline:
      "Requirements analysis, domain modeling, application boundaries, declarative versus programmatic solutions, scalability and maintainability.",
    status: "available",
    chapters: SFTA_ENTERPRISE_APPLICATION_ARCHITECTURE_CHAPTERS,
    contentBase: "enterprise-application-architecture",
  },
  {
    slug: "application-architecture-case-studies",
    title: "Application Architecture Case Studies",
    tagline:
      "Students receive business requirements and design complete Salesforce solutions.",
    status: "available",
    chapters: SFTA_APPLICATION_ARCHITECTURE_CASE_STUDIES_CHAPTERS,
    contentBase: "application-architecture-case-studies",
  },
  {
    slug: "architecture-documentation",
    title: "Architecture Documentation",
    tagline:
      "ERDs, system diagrams, data-flow diagrams, sequence diagrams, decision records and technical documentation.",
    status: "available",
    chapters: SFTA_ARCHITECTURE_DOCUMENTATION_CHAPTERS,
    contentBase: "architecture-documentation",
  },
  {
    slug: "enterprise-systems-architecture",
    title: "Enterprise Systems Architecture",
    tagline:
      "Salesforce within larger enterprise environments, external systems, integration boundaries, security and governance.",
    status: "available",
    chapters: SFTA_ENTERPRISE_SYSTEMS_ARCHITECTURE_CHAPTERS,
    contentBase: "enterprise-systems-architecture",
  },
  {
    slug: "distributed-systems-concepts",
    title: "Distributed Systems Concepts",
    tagline:
      "Availability, scalability, reliability, asynchronous systems, eventual consistency and failure handling.",
    status: "available",
    chapters: SFTA_DISTRIBUTED_SYSTEMS_CONCEPTS_CHAPTERS,
    contentBase: "distributed-systems-concepts",
  },
  {
    slug: "enterprise-integration-case-studies",
    title: "Enterprise Integration Case Studies",
    tagline:
      "CRM + ERP, CRM + Data Warehouse, CRM + Identity Provider, CRM + Customer Portal, CRM + External APIs.",
    status: "available",
    chapters: SFTA_ENTERPRISE_INTEGRATION_CASE_STUDIES_CHAPTERS,
    contentBase: "enterprise-integration-case-studies",
  },
  {
    slug: "technical-architecture-fundamentals",
    title: "Technical Architecture Fundamentals",
    tagline:
      "Translate business requirements into enterprise technical architecture.",
    status: "available",
    chapters: SFTA_TECHNICAL_ARCHITECTURE_FUNDAMENTALS_CHAPTERS,
    contentBase: "technical-architecture-fundamentals",
  },
  {
    slug: "architecture-tradeoffs",
    title: "Architecture Tradeoffs",
    tagline:
      "Security vs. usability, performance vs. complexity, build vs. buy, synchronous vs. asynchronous, declarative vs. programmatic, and real-time vs. batch.",
    status: "available",
    chapters: SFTA_ARCHITECTURE_TRADEOFFS_CHAPTERS,
    contentBase: "architecture-tradeoffs",
  },
  {
    slug: "architecture-review-boards",
    title: "Architecture Review Boards",
    tagline:
      "Present architecture, defend decisions, respond to technical objections and document tradeoffs.",
    status: "available",
    chapters: SFTA_ARCHITECTURE_REVIEW_BOARDS_CHAPTERS,
    contentBase: "architecture-review-boards",
  },
  {
    slug: "nonfunctional-requirements",
    title: "Nonfunctional Requirements",
    tagline:
      "Performance, security, scalability, reliability, maintainability, recoverability and compliance.",
    status: "available",
    chapters: SFTA_NONFUNCTIONAL_REQUIREMENTS_CHAPTERS,
    contentBase: "nonfunctional-requirements",
  },
  {
    slug: "technical-architect-case-studies",
    title: "Technical Architect Case Studies",
    tagline:
      "Students receive ambiguous enterprise requirements and must design complete solutions.",
    status: "available",
    chapters: SFTA_TECHNICAL_ARCHITECT_CASE_STUDIES_CHAPTERS,
    contentBase: "technical-architect-case-studies",
  },
  {
    slug: "ltv-customer-management-system",
    title: "LTV Customer Management System",
    tagline:
      "Student builds a Salesforce solution for a fictional company — suitable for an entry-level Salesforce portfolio.",
    status: "available",
    chapters: SFTA_LTV_CUSTOMER_MANAGEMENT_SYSTEM_CHAPTERS,
    contentBase: "ltv-customer-management-system",
  },
  {
    slug: "ltv-service-and-sales-platform",
    title: "LTV Service & Sales Platform",
    tagline:
      "Build a more advanced application, then document and present it.",
    status: "available",
    chapters: SFTA_LTV_SERVICE_AND_SALES_PLATFORM_CHAPTERS,
    contentBase: "ltv-service-and-sales-platform",
  },
  {
    slug: "ltv-global-enterprise-transformation",
    title: "LTV Global Enterprise Transformation",
    tagline:
      "A fictional multinational replaces disconnected CRM applications with Salesforce; students design, document and defend the enterprise architecture before an Architecture Review Board.",
    status: "available",
    chapters: SFTA_LTV_GLOBAL_ENTERPRISE_TRANSFORMATION_CHAPTERS,
    contentBase: "ltv-global-enterprise-transformation",
  },
  {
    slug: "salesforce-career-preparation",
    title: "Salesforce Career Preparation",
    tagline:
      "Salesforce resumes, Trailhead profile, portfolio development, GitHub, certification strategy, Administrator, Developer, Consultant and Architect scenario interviews, architecture whiteboarding, presenting capstones and explaining architecture decisions.",
    status: "available",
    chapters: SFTA_SALESFORCE_CAREER_PREPARATION_CHAPTERS,
    contentBase: "salesforce-career-preparation",
  },
  {
    slug: "data-governance-foundations",
    title: "Data Governance Foundations",
    tagline:
      "Data governance principles, governance frameworks, operating models, policies, standards, governance councils, data ownership, and stewardship.",
    status: "available",
    chapters: GOV_DATA_GOVERNANCE_FOUNDATIONS_CHAPTERS,
    contentBase: "data-governance-foundations",
  },
  {
    slug: "data-quality-management",
    title: "Data Quality Management",
    tagline:
      "Data profiling, accuracy, completeness, consistency, validity, uniqueness, timeliness, quality rules, remediation, monitoring, and SQL-based quality checks.",
    status: "available",
    chapters: GOV_DATA_QUALITY_MANAGEMENT_CHAPTERS,
    contentBase: "data-quality-management",
  },
  {
    slug: "metadata-management-and-business-glossary",
    title: "Metadata Management & Business Glossary",
    tagline:
      "Business metadata, technical metadata, data dictionaries, business glossaries, critical data elements, data catalogs, definitions, and metadata standards.",
    status: "available",
    chapters: GOV_METADATA_MANAGEMENT_AND_BUSINESS_GLOSSARY_CHAPTERS,
    contentBase: "metadata-management-and-business-glossary",
  },
  {
    slug: "data-lineage-and-impact-analysis",
    title: "Data Lineage & Impact Analysis",
    tagline:
      "Source-to-report lineage, upstream and downstream dependencies, transformations, data flows, impact analysis, and lineage documentation.",
    status: "available",
    chapters: GOV_DATA_LINEAGE_AND_IMPACT_ANALYSIS_CHAPTERS,
    contentBase: "data-lineage-and-impact-analysis",
  },
  {
    slug: "master-and-reference-data-management",
    title: "Master & Reference Data Management",
    tagline:
      "Master Data Management, reference data, golden records, matching, deduplication, survivorship, customer master, product master, vendor master, and enterprise data consistency.",
    status: "available",
    chapters: GOV_MASTER_AND_REFERENCE_DATA_MANAGEMENT_CHAPTERS,
    contentBase: "master-and-reference-data-management",
  },
  {
    slug: "data-security-privacy-and-classification",
    title: "Data Security, Privacy & Classification",
    tagline:
      "PII, sensitive data, data classification, RBAC, least privilege, masking, encryption, retention, deletion, privacy, auditing, and access governance.",
    status: "available",
    chapters: GOV_DATA_SECURITY_PRIVACY_AND_CLASSIFICATION_CHAPTERS,
    contentBase: "data-security-privacy-and-classification",
  },
  {
    slug: "microsoft-purview",
    title: "Microsoft Purview",
    tagline:
      "Microsoft Purview Data Map, Data Catalog, scanning, classifications, glossary, lineage, discovery, governance workflows, and enterprise governance.",
    status: "available",
    chapters: GOV_MICROSOFT_PURVIEW_CHAPTERS,
    contentBase: "microsoft-purview",
  },
  {
    slug: "microsoft-fabric-data-governance",
    title: "Microsoft Fabric Data Governance",
    tagline:
      "OneLake governance, Fabric domains, workspaces, security, lineage, data discovery, semantic models, and governed analytics.",
    status: "available",
    chapters: GOV_MICROSOFT_FABRIC_DATA_GOVERNANCE_CHAPTERS,
    contentBase: "microsoft-fabric-data-governance",
  },
  {
    slug: "databricks-unity-catalog-governance",
    title: "Databricks Unity Catalog Governance",
    tagline:
      "Unity Catalog, catalogs, schemas, permissions, lineage, discovery, auditing, access control, and Lakehouse governance.",
    status: "available",
    chapters: GOV_DATABRICKS_UNITY_CATALOG_GOVERNANCE_CHAPTERS,
    contentBase: "databricks-unity-catalog-governance",
  },
  {
    slug: "snowflake-data-governance",
    title: "Snowflake Data Governance",
    tagline:
      "Snowflake RBAC, masking policies, row access policies, tags, classification, auditing, monitoring, and enterprise governance.",
    status: "available",
    chapters: GOV_SNOWFLAKE_DATA_GOVERNANCE_CHAPTERS,
    contentBase: "snowflake-data-governance",
  },
  {
    slug: "power-bi-governance",
    title: "Power BI Governance",
    tagline:
      "Workspaces, semantic models, RLS, OLS, endorsements, certified datasets, lineage, deployment pipelines, security, and enterprise BI governance.",
    status: "available",
    chapters: GOV_POWER_BI_GOVERNANCE_CHAPTERS,
    contentBase: "power-bi-governance",
  },
  {
    slug: "cloud-data-governance-azure-and-aws",
    title: "Cloud Data Governance: Azure & AWS",
    tagline:
      "Cloud governance architecture, identity and access management, cloud storage governance, catalogs, security, compliance, auditing, and multi-cloud governance.",
    status: "available",
    chapters: GOV_CLOUD_DATA_GOVERNANCE_AZURE_AND_AWS_CHAPTERS,
    contentBase: "cloud-data-governance-azure-and-aws",
  },
  {
    slug: "ai-and-machine-learning-governance",
    title: "AI & Machine Learning Governance",
    tagline:
      "AI data governance, training data, model documentation, AI lineage, security, access, monitoring, responsible AI, risk management, and AI governance frameworks.",
    status: "available",
    chapters: GOV_AI_AND_MACHINE_LEARNING_GOVERNANCE_CHAPTERS,
    contentBase: "ai-and-machine-learning-governance",
  },
  {
    slug: "data-governance-program-management",
    title: "Data Governance Program Management",
    tagline:
      "Governance councils, stewardship programs, policies, standards, KPIs, issue management, governance adoption, stakeholder management, and measuring governance success.",
    status: "available",
    chapters: GOV_DATA_GOVERNANCE_PROGRAM_MANAGEMENT_CHAPTERS,
    contentBase: "data-governance-program-management",
  },
  {
    slug: "data-governance-architecture",
    title: "Data Governance Architecture",
    tagline:
      "Enterprise governance architecture, centralized vs. federated governance, data mesh governance, catalogs, enterprise metadata, security architecture, platform architecture, and governance strategy.",
    status: "available",
    chapters: GOV_DATA_GOVERNANCE_ARCHITECTURE_CHAPTERS,
    contentBase: "data-governance-architecture",
  },
  {
    slug: "data-governance-career-and-capstone",
    title: "Data Governance Career & Capstone",
    tagline:
      "Resume preparation, portfolio development, interviews, scenario-based governance questions, stakeholder presentations, and enterprise governance implementation.",
    status: "available",
    chapters: GOV_DATA_GOVERNANCE_CAREER_AND_CAPSTONE_CHAPTERS,
    contentBase: "data-governance-career-and-capstone",
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
  const guideMd = fs.existsSync(guidePath)
    ? fs.readFileSync(guidePath, "utf8")
    : null;
  const guideHtml = guideMd ? (marked.parse(guideMd) as string) : null;
  const quiz: Quiz | null = fs.existsSync(quizPath)
    ? JSON.parse(fs.readFileSync(quizPath, "utf8"))
    : null;
  return { guideHtml, guideMd, quiz };
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
