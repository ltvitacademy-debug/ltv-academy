import type { PathResumes } from "../sampleResumeTypes";

const CONTACT = ["Atlanta, GA", "(404) 555-0182", "john.doe@example.com", "linkedin.com/in/johndoe-biexample"];

export const RESUMES: PathResumes = {
  foundations: {
    levelLabel: "Foundations",
    name: "John Doe",
    contact: CONTACT,
    summary:
      "Data Governance Analyst trained in data governance foundations, data quality management, and metadata management & " +
      "business glossary development — plus the T-SQL and data engineering foundations those disciplines run on. Comfortable " +
      "profiling data for quality problems, writing SQL data quality checks, defining business terms against a repeatable " +
      "four-part clarity test, and documenting data owners and stewards in a RACI matrix. Bringing that foundation to a Data " +
      "Governance Analyst or Data Quality Analyst role.",
    skills: [
      "Data Governance Frameworks (DAMA-DMBOK, Operating Models, RACI)",
      "Data Quality Profiling, Dimensions & SQL Checks",
      "Metadata Management, Business Glossary & Data Dictionaries",
      "Critical Data Elements & Data Catalogs",
      "T-SQL Querying & Database Fundamentals",
      "Data Engineering Foundations (Azure Storage, Data Lake Zones, Python, PySpark)",
      "Agile/Scrum/Kanban & the Software Delivery Lifecycle",
      "Version Control (Git/GitHub)",
    ],
    sections: [
      {
        heading: "Training",
        entries: [
          {
            left: "Lifting the Veil IT Academy — Apprenticeship Program",
            right: "Jan 2026 – Jun 2026",
            sub: "Data Governance Engineer Track (Foundations) · Atlanta, GA",
            bullets: [
              "Completed an intensive, project-based apprenticeship covering IT delivery fundamentals, T-SQL, data engineering foundations, and the core disciplines of data governance — governance principles, data quality, and metadata/business glossary — through hands-on labs built against realistic datasets and scenarios.",
              "Practiced the full software delivery lifecycle — Agile vs. Waterfall, Scrum sprints and user stories, Kanban boards, Dev/QA/UAT/Production environments, and version control with Git (repositories, commits, branches, pull requests) — through a real-world IT project simulation.",
              "Wrote T-SQL ranging from basic filtering and joins to CTEs, window functions, and stored procedures, including INFORMATION_SCHEMA-based structural queries used to build a data dictionary from a real schema rather than a blank template.",
              "Worked hands-on with Azure Data Lake storage concepts — containers, hierarchical namespace, RBAC vs. ACLs, raw/cleansed/curated and bronze/silver/gold zone design — plus Python fundamentals and Spark/PySpark DataFrame basics, the data engineering layer governance sits on top of.",
              "Applied DAMA-DMBOK framework concepts to compare centralized, decentralized, and federated governance operating models, and wrote RACI lines distinguishing data owner, data steward, and executive sponsor accountability for a given data domain.",
              "Profiled data with SQL — row-count checks against business expectations, uniqueness profiling, and pattern profiling — to diagnose realistic data quality problems before writing a single fix.",
              "Wrote SQL data quality checks, including referential integrity checks, combined into a single UNION ALL failures report, following the discipline of writing every WHERE clause to select the failure condition rather than the success condition.",
              "Ran root-cause analysis and designed remediation workflows and data quality scorecards for recurring quality problems, covering the six standard quality dimensions — accuracy, completeness, consistency, validity, uniqueness, and timeliness.",
              "Wrote business glossary definitions that pass a four-part clarity test (what a term is, what it explicitly excludes, how it's measured, who approved it), and identified and prioritized critical data elements (CDEs) for data-dictionary and regulatory-reporting purposes.",
              "Published glossary and dictionary entries into a data catalog and practiced catalog-adoption tactics — embedding a catalog link directly into an existing operational report or dashboard instead of a separate destination nobody visits.",
            ],
          },
        ],
      },
      {
        heading: "Projects",
        entries: [
          {
            left: "Governance & Data Quality Case Study Labs",
            right: "2026",
            sub: "Lifting the Veil IT Academy, Data Governance Engineer Apprenticeship — Data Quality Management, Metadata Management & Business Glossary, and Data Governance Foundations courses",
            bullets: [
              "Diagnosed a duplicate-customer-record case study (a loyalty file showing 1.4 million members against roughly 600,000 actual households) by profiling for a row-count mismatch and 35%-plus duplicate emails, then tracing the pattern to two source systems recording the same person under slightly different formatting with no shared identifier.",
              "Resolved a cross-team \"which number is right\" metadata case study by writing one four-part-test glossary definition for a disputed business term, naming its source system of record, and publishing it to a catalog entry embedded directly in the dashboard three teams were already using.",
              "Worked a data-governance-readiness case study from assessment through a scoped pilot and roadmap, naming a single accountable data owner for a field that three different source systems had each separately claimed, with no governance driver behind the decision until the exercise.",
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
  specialist: {
    levelLabel: "Specialist",
    name: "John Doe",
    contact: CONTACT,
    summary:
      "Data Governance Specialist trained across data lineage and impact analysis, master and reference data management, data " +
      "security, privacy and classification, and governance on Microsoft Purview, Microsoft Fabric, Power BI, and Azure — with " +
      "additional specialization in Databricks Unity Catalog, Snowflake, and AI/ML governance. Comfortable tracing a number from " +
      "an executive dashboard back to its source system, classifying and protecting sensitive data, and applying the same " +
      "governance model consistently across SQL Server, cloud, and lakehouse platforms. Bringing that breadth to a Data Steward " +
      "or Data Governance Specialist role.",
    skills: [
      "Data Lineage & Impact Analysis (Source-to-Report, Column-Level)",
      "Master & Reference Data Management (Matching, Golden Records)",
      "Data Security, Privacy & Classification (PII, RBAC, Masking, Retention)",
      "Microsoft Purview (Data Map, Classification, Catalog, Lineage)",
      "Microsoft Fabric Governance (Domains, OneLake Security, Lineage)",
      "Power BI Governance (RLS/OLS, Certified Datasets, Deployment Pipelines)",
      "Cloud Data Governance: Azure & AWS (Entra ID, RBAC, IAM, Catalogs)",
      "Databricks Unity Catalog & Snowflake Governance",
      "AI & Machine Learning Governance (Model Cards, AI Lineage, Risk Tiers)",
      "T-SQL Querying & Data Profiling",
      "Version Control (Git/GitHub)",
    ],
    tools:
      "Microsoft Purview, Microsoft Fabric, Power BI Desktop & Service, Azure (Entra ID, RBAC, ADLS), Databricks Unity Catalog, Snowflake, SSMS, Git",
    sections: [
      {
        heading: "Training",
        entries: [
          {
            left: "Lifting the Veil IT Academy — Apprenticeship Program",
            right: "Jan 2026 – Jun 2026",
            sub: "Data Governance Engineer Track (Foundations + Specialist) · Atlanta, GA",
            bullets: [
              "Completed the Data Governance Engineer apprenticeship's foundations sequence (IT delivery fundamentals, T-SQL, data engineering foundations, governance principles, data quality, and metadata/business glossary) before specializing in lineage, master data, security, and platform-specific governance.",
              "Traced data lineage column by column from a source system through ETL/ELT, a data lake or warehouse, a semantic model, and into a Power BI executive dashboard, and ran impact analysis to identify every downstream report or calculation a proposed change would break before it shipped.",
              "Applied master data management concepts — deterministic vs. probabilistic matching, deduplication, survivorship rules, and golden records — to reconcile conflicting customer, product, and vendor records across source systems into one authoritative record per entity.",
              "Classified data into a four-tier sensitivity scheme (Public, Internal, Confidential, Restricted), designed least-privilege, role-based access models scoped to Confidential and Restricted data, and applied data masking, encryption, and retention/deletion policies aligned to data-minimization principles.",
              "Worked in Microsoft Purview: registered and scanned data sources, built scan rule sets, applied system and custom classifications and sensitivity labels, published glossary terms and data products to the catalog, and traced lineage from Azure Data Factory and Power BI into the Data Map.",
              "Worked in Microsoft Fabric: governed domains and workspace roles, applied row-level and column-level security and sensitivity labels, used the OneLake catalog for discovery, and traced lineage and impact analysis across lakehouse and warehouse items.",
              "Governed Power BI at the tenant and workspace level: tenant settings, row-level and object-level security, certified/promoted endorsement, the lineage and impact-analysis view, deployment pipelines across Dev/Test/Prod workspaces, and usage-metrics auditing.",
              "Applied the same governance model to Azure and AWS: Microsoft Entra ID and Azure RBAC for identity and access, Azure Data Lake Storage and Amazon S3 governance patterns, and cloud catalogs (Purview, the AWS Glue Data Catalog, Lake Formation) for a consistent multi-cloud approach.",
              "Extended governance into the lakehouse and AI/ML layers: Databricks Unity Catalog privileges, row filters, and column masks; Snowflake RBAC, masking and row-access policies, and object tagging; and AI governance model cards covering data provenance, bias, and risk tier for a generative-AI and an ML use case.",
            ],
          },
        ],
      },
      {
        heading: "Projects",
        entries: [
          {
            left: "Applied Governance Case Study Labs — Lineage, Purview & Security",
            right: "2026",
            sub: "Lifting the Veil IT Academy, Data Governance Engineer Apprenticeship — Data Lineage & Impact Analysis, Microsoft Purview, and Data Security, Privacy & Classification courses",
            bullets: [
              "Root-caused a six-figure revenue discrepancy case study by walking column-level lineage hop by hop from a point-of-sale source table through a staging transformation to an executive dashboard, finding that a source-system relabeling had silently excluded legitimate sales alongside voided transactions, and corrected both the transformation logic and the lineage documentation itself.",
              "Worked a multi-region Microsoft Purview rollout case study end to end — provisioning collections per region, registering and scanning Azure SQL Database, Azure Data Lake Storage, and Fabric sources, applying consistent classifications and sensitivity labels, and publishing one governed glossary term and data product in place of four competing regional definitions.",
              "Analyzed a compounding access-control incident case study (an offboarded contractor's database login left active for three months) and designed the fix across four controls at once: a named offboarding owner, quarterly access recertification, reclassification of the exposed table, and row-level security limiting reporting logins to aggregated data only.",
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
      "Data Governance professional trained through the full Data Governance Engineer apprenticeship — governance foundations " +
      "and specialization in lineage, master data, security, Microsoft Purview, Fabric, Power BI, and Azure/AWS — capped by a " +
      "complete capstone governance program for a multinational company spanning an ERP, a CRM, an e-commerce platform, a " +
      "warehouse system, and a cloud analytics layer. Comfortable taking a governance program from a triggering incident through " +
      "named ownership, a business glossary, SQL quality checks, documented lineage, access and retention policy, an operating " +
      "model, an AI governance strategy, a target-state architecture, and an executive presentation. Bringing that end-to-end " +
      "scope to a Data Governance Specialist or Data Governance Consultant role.",
    skills: [
      "Data Governance Program Management (Councils, KPIs, Executive Reporting)",
      "Data Governance Architecture (Operating Models, Metadata & Catalog Architecture)",
      "Enterprise Governance Program Design (Charter, RACI, Policy, Roadmap)",
      "Data Lineage & Impact Analysis",
      "Master & Reference Data Management",
      "Data Security, Privacy & Classification",
      "Microsoft Purview, Fabric & Power BI Governance",
      "Cloud & Lakehouse Governance (Azure, AWS, Databricks, Snowflake)",
      "AI & Machine Learning Governance",
      "T-SQL Data Quality Rules & SQL Checks",
      "Version Control (Git/GitHub)",
    ],
    tools:
      "Microsoft Purview, Microsoft Fabric, Power BI Desktop & Service, Azure (Entra ID, RBAC, ADLS), Databricks Unity Catalog, Snowflake, SSMS, Git",
    sections: [
      {
        heading: "Training",
        entries: [
          {
            left: "Lifting the Veil IT Academy — Apprenticeship Program",
            right: "Jan 2026 – Jun 2026",
            sub: "Data Governance Engineer Track (Complete: Foundations + Specialist + Advanced) · Atlanta, GA",
            bullets: [
              "Completed the full Data Governance Engineer apprenticeship — IT fundamentals and T-SQL through data governance foundations, data quality, metadata, lineage, master data, security, Microsoft Purview/Fabric/Power BI/Azure governance, and the Databricks, Snowflake, and AI/ML governance specializations — closing with a program management, architecture, and full capstone sequence.",
              "Ran a governance program launch end to end in Data Governance Program Management: wrote a program charter and scope, ran stakeholder identification and analysis, stood up a governance council and stewardship program, and built governance KPIs, adoption metrics, and executive-facing dashboards.",
              "Designed governance architecture: compared centralized, federated, decentralized, and data-mesh operating models and chose a fit-for-purpose shape; designed enterprise metadata, catalog, and lineage architecture; and mapped security and platform architecture across Purview, Fabric, Databricks, and Snowflake.",
              "Practiced governance change management and stakeholder communication — training and data-literacy planning, handling resistance, funding and business-case development, and reporting program maturity and success metrics to an executive audience.",
            ],
          },
        ],
      },
      {
        heading: "Projects",
        entries: [
          {
            left: "LTV Global Data Governance Program — Capstone Project",
            right: "2026",
            sub: "Lifting the Veil IT Academy, Data Governance Engineer Apprenticeship — Data Governance Career & Capstone course (training capstone; LTV Global is a fictional company)",
            bullets: [
              "Built a complete governance program for a fictional multinational consumer-products company spread across five systems (a SQL Server ERP, a cloud CRM, an e-commerce platform, a warehouse management system, and a Snowflake analytics layer), triggered by a GDPR data subject access request that took six weeks to answer because no one could say with confidence where a customer's data actually lived.",
              "Scored and documented four critical data elements end to end: named a data owner and data steward for each with a RACI line distinguishing routine data-quality accountability from regulatory-escalation accountability, wrote four-part-test business glossary definitions, and built a data dictionary pulled from real INFORMATION_SCHEMA metadata rather than a blank template.",
              "Classified data into a four-tier sensitivity scheme and designed a least-privilege, role-based access model and a retention schedule tied directly to it — giving the most restricted element (a tokenized payment-card reference) the shortest retention window in the program, on the principle that sensitivity and retention move together.",
              "Wrote four real T-SQL data quality rules, including a referential-integrity check between an orders table and its order-line detail table, combined them into a single UNION ALL failures report, then documented a four-hop lineage trace for a revenue figure from its source system through a nightly load and a curated transformation into an executive Power BI dashboard, and used that lineage to run an impact analysis before a proposed schema change.",
              "Resolved a three-way system-of-record conflict by declaring an authoritative source per domain and designing a golden-record approach for the one domain that couldn't resolve to a single source — a documented match key and field-level survivorship rules reconciling three disagreeing copies of the same customer into one record.",
              "Chose and documented a federated-hybrid governance operating model (a central governance office plus domain-level ownership) with a monthly governance council, then extended it into an AI governance strategy — applying a five-point checklist (risk tier, data provenance, bias, model documentation, monitoring plan) to a demand-forecasting model and a generative-AI support assistant, correctly flagging the second as blocked from production pending a named owner, training-data scrubbing, and human-in-the-loop review.",
              "Designed a target-state governance architecture (raw, conformed, and golden data zones feeding a governance catalog and governed BI/AI consumption) and assembled all fourteen program deliverables into one consistency-checked package, then compressed it into a five-beat executive presentation translating a compliance incident into time and dollar risk for a board-level funding and headcount ask.",
            ],
          },
        ],
      },
      {
        heading: "Governance Portfolio",
        entries: [
          {
            left: "Governance portfolio document + capstone SQL repository",
            right: "2026",
            sub: "Built per this course's own portfolio-development lessons — a governance portfolio centers on documents and diagrams, not a code repository",
            bullets: [
              "Assembled a governance portfolio document presenting excerpts of the real capstone deliverables — the business glossary and critical-data-element register, the access and retention policy, the lineage diagram, and the executive presentation — following this path's own guidance that a governance portfolio centers on documents and diagrams rather than forcing a code-repository format that doesn't fit the work.",
              "Published the capstone's T-SQL data quality checks (the UNION ALL failures report and its underlying rules) to a small public GitHub repository using Git fundamentals from How IT Teams Work (repositories, commits, branches, pull requests), and labeled every document \"training capstone, fictional organization\" per this course's disclosure guidance.",
              "Wrote a LinkedIn headline and About section naming specific deliverables built (a four-CDE governance program, a UNION ALL SQL failures report, a four-hop lineage trace) instead of vague role titles, and rehearsed the follow-up question each artifact needs to survive — for example, explaining line by line which rows a quality check's WHERE clause actually catches.",
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
