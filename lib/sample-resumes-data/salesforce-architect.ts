import type { PathResumes } from "../sampleResumeTypes";

const CONTACT = ["Atlanta, GA", "(404) 555-0182", "john.doe@example.com", "linkedin.com/in/johndoe-biexample"];

export const RESUMES: PathResumes = {
  "platform-developer": {
    levelLabel: "Salesforce Platform Developer",
    name: "John Doe",
    contact: CONTACT,
    summary:
      "Salesforce Platform Developer trained on Apex, SOQL/SOSL, Apex testing, and Lightning Web Components, then on " +
      "professional-level REST/SOAP/Bulk API integration, asynchronous Apex, and governor-limit-aware performance work — " +
      "built directly on a prior Salesforce Administrator and Platform App Builder foundation. Comfortable writing a " +
      "bulkified trigger with a handler class and full test coverage, building a Lightning Web Component that calls Apex " +
      "through the wire service, and integrating Salesforce with an external system through a Named Credential and a " +
      "tested REST callout. Bringing that programmatic development foundation to a Salesforce Platform Developer role.",
    skills: [
      "Apex Programming (OOP, Collections, Control Flow, Exception Handling)",
      "SOQL & SOSL (Relationship Queries, Aggregates, Dynamic SOQL, Query Optimization)",
      "Apex Triggers & Trigger Handler Frameworks (Bulkification, One-Trigger-per-Object)",
      "Governor Limits & Performance-Aware Apex",
      "Apex Design Patterns (Selector & Service Layer, Custom Metadata/Settings)",
      "Apex Security (Sharing, CRUD/FLS)",
      "Apex Unit Testing (Test Factories, @TestSetup, System.runAs, Mocked Callouts)",
      "Lightning Web Components (Properties, Events, Lifecycle Hooks, Slots)",
      "Lightning Data Service & the Wire Service",
      "LWC Testing With Jest & Accessibility Basics",
      "Salesforce Lightning Design System (SLDS)",
      "REST, SOAP, Bulk & Composite APIs",
      "API Authentication, JSON Payloads & Postman",
      "Outbound/Inbound Integration (Callouts, Named Credentials, Apex REST Web Services)",
      "Platform Events & Change Data Capture Basics",
      "Asynchronous Apex (Future, Queueable, Batch, Scheduled)",
      "Performance Tuning & Debug Log Analysis",
      "General Programming Foundations (Control Flow, Functions, OOP Concepts, Debugging)",
    ],
    tools:
      "Salesforce Developer Console, VS Code with Salesforce Extensions, Trailhead Playground & Developer Edition orgs, " +
      "Postman, Jest",
    sections: [
      {
        heading: "Training",
        entries: [
          {
            left: "Lifting the Veil IT Academy — Apprenticeship Program",
            right: "Jul 2026 – Dec 2026",
            sub: "Salesforce Architect Destination — Salesforce Development & Professional Salesforce Development · Atlanta, GA",
            bullets: [
              "Completed the Salesforce Administrator path (Administrator and Platform App Builder) beforehand; this destination adds the programmatic-development coursework below on top of that declarative foundation.",
              "Bridged from declarative configuration into code with a general programming foundations course — variables, control flow, functions, object-oriented concepts, arrays/collections, error handling, debugging, and reading documentation — using the Developer Console and VS Code before writing a single line of Apex.",
              "Learned Apex from fundamentals through design patterns: variables, collections (Lists, Sets, Maps), control flow, classes and object-oriented concepts, access modifiers, interfaces and inheritance, SOQL and DML in Apex, exception handling, and transactions/rollbacks, then wrote triggers with context variables, before/after logic, handler classes and frameworks, one-trigger-per-object discipline, and bulkification practiced through an Opportunity-automation, a Case-routing, and a data-cleanup practice project.",
              "Worked within governor limits deliberately — SOQL/DML limit awareness, selector- and service-layer design patterns, custom metadata and custom settings, Apex security (sharing rules and CRUD/field-level security from Apex), and Apex REST, invocable methods for Flow, wrapper classes, and JSON handling.",
              "Wrote SOQL and SOSL beyond basic filtering: parent-to-child and child-to-parent relationship queries, aggregate functions with GROUP BY/HAVING, semi-joins and anti-joins, polymorphic relationships, SOSL multi-object search, dynamic SOQL with bind variables to prevent SOQL injection, and query optimization — selective queries, indexes, and the Query Plan tool — including how SOQL behaves differently in large-data-volume orgs.",
              "Tested Apex to a real coverage and reliability standard: test data factories, assertions, @TestSetup, positive and negative test cases, testing trigger bulk behavior, testing as different users with System.runAs, mocking callouts, testing asynchronous Apex, and avoiding common test-writing mistakes that pass coverage without actually proving correctness.",
              "Built Lightning Web Components from setup through delivery: modern JavaScript and HTML templates, properties and reactivity, conditional rendering, events (parent-to-child, child-to-parent, and the Lightning Message Service for components that don't share a DOM), lifecycle hooks, calling Apex through both the wire service and imperative calls, Lightning Data Service, navigation, base Lightning components, SLDS styling, and Jest-based component testing — applied in a Case Dashboard and a Record Search Tool practice project.",
              "Moved into professional-level integration and performance work: the REST, SOAP, and Bulk APIs plus Composite, GraphQL, and Streaming API concepts, authenticating and calling them through Postman; outbound callouts secured with Named Credentials, mocked for testing, and exposed inbound through Apex REST web services, practiced on an Order-Sync and an Address-Validation integration project; asynchronous Apex beyond the basics — Queueable job chaining, Batch Apex scope and state, Scheduled Apex, and monitoring jobs in Setup; and performance work diagnosing governor-limit risk with debug logs, Event Monitoring, and caching strategies before it becomes a production incident.",
            ],
          },
        ],
      },
      {
        heading: "Projects",
        entries: [
          {
            left: "Opportunity Automation, Case Routing & Data Cleanup — Apex Practice Projects",
            right: "2026",
            sub: "Apex Programming — practice projects",
            bullets: [
              "Built a bulkified trigger-and-handler pair automating Opportunity field updates on save, a Case auto-routing trigger assigning records based on criteria rather than manual triage, and a batch-style data-cleanup routine — each with governor-limit-safe bulk logic instead of row-by-row processing.",
            ],
          },
          {
            left: "Case Dashboard & Record Search Tool — Lightning Web Components Practice Projects",
            right: "2026",
            sub: "Lightning Web Components — practice projects",
            bullets: [
              "Built a Case Dashboard LWC pulling live record data through the wire service and a Record Search Tool LWC combining an imperative Apex call with parent-to-child and child-to-parent component communication, both covered by Jest tests and exposed to App Builder.",
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

  "solution-architect": {
    levelLabel: "Salesforce Solution Architect",
    name: "John Doe",
    contact: CONTACT,
    summary:
      "Salesforce Solution Architect who carried the full Technical Architect ladder end to end: programmatic development, " +
      "enterprise data architecture, security and identity architecture, integration architecture, DevOps and the " +
      "application lifecycle, and Application/System/Technical Architect-level design — proved on two connected " +
      "capstones, a programmatic service-and-sales platform for a fictional appliance company and a full enterprise " +
      "transformation design defended before a mock Architecture Review Board for a fictional 10,000-user multinational. " +
      "Built on a prior Salesforce Administrator and Platform Developer foundation. Bringing that foundation to a " +
      "Salesforce Solution Architect, Salesforce Application Architect / System Architect, or Salesforce Technical " +
      "Architect role.",
    skills: [
      "Apex, SOQL/SOSL, Apex Testing & Lightning Web Components (Full Platform Developer Core)",
      "REST/SOAP/Bulk APIs, Integration Development & Asynchronous Apex",
      "Enterprise Data Modeling & Master Data Management",
      "Large Data Volumes (Skew, Indexing, Archiving, Big Objects)",
      "Data Migration Architecture (Mapping, Sequencing, Reconciliation, Cutover)",
      "Data Governance (Ownership, Stewardship, Quality, Classification)",
      "Sharing & Visibility Architecture (OWD, Role Hierarchy, Apex Managed Sharing, Territory Management)",
      "Identity & Access Management (SSO, SAML, OAuth, OpenID Connect, Connected Apps, MFA)",
      "Enterprise Security Design (Least Privilege, Defense in Depth, Platform Encryption)",
      "Integration Architecture & Enterprise Integration Patterns",
      "Event-Driven Architecture (Platform Events, Change Data Capture, Pub/Sub)",
      "Integration Security (OAuth, Mutual TLS, Secrets Management)",
      "Salesforce DX, Scratch Orgs & Source-Driven Development",
      "Git/GitHub Version Control & Salesforce Branching Strategies",
      "CI/CD for Salesforce (GitHub Actions, Delta Deployments, Quality Gates)",
      "Environment Strategy & Release/Governance Architecture",
      "Application & System Architecture (Design Patterns, Distributed Systems Concepts)",
      "Technical Architecture, Nonfunctional Requirements & Architecture Tradeoff Analysis",
      "Architecture Review Board Presentation & Decision Defense",
    ],
    tools:
      "Salesforce Setup, Developer Console, VS Code with Salesforce Extensions, Salesforce CLI (sf), Git/GitHub, " +
      "GitHub Actions, Postman, Trailhead Playground & Developer Edition orgs",
    sections: [
      {
        heading: "Training",
        entries: [
          {
            left: "Lifting the Veil IT Academy — Apprenticeship Program",
            right: "Jul 2026 – Dec 2026",
            sub: "Salesforce Architect Destination — Technical Architect Ladder (Full) · Atlanta, GA",
            bullets: [
              "Completed the Salesforce Administrator path beforehand, then this destination's full Technical Architect ladder: programmatic development (Apex, SOQL/SOSL, Apex testing, Lightning Web Components), professional development (APIs, integration development, asynchronous Apex, performance and governor limits), enterprise data architecture, enterprise security architecture, enterprise integration architecture, DevOps and the application lifecycle, and Application Architect, System Architect, and Technical Architect-level design, closing with two capstones and a shared career-preparation course.",
              "Built the Apex, SOQL, testing, and Lightning Web Components foundation covered in the Platform Developer stage of this same destination — triggers and trigger-handler frameworks, bulkification, Apex design patterns, test factories and mocked callouts, and LWC built on the wire service and Lightning Data Service — then the professional-level REST/SOAP/Bulk API integration, asynchronous Apex (Queueable, Batch, Scheduled), and governor-limit-aware performance tuning that follows it.",
              "Designed enterprise Salesforce data architecture: conceptual/logical/physical data models, Master-Detail vs. Lookup tradeoffs, denormalization and roll-ups, Big Objects and external objects, master data management, data lineage, and multi-org vs. single-org data strategy — then handled scale directly with large-data-volume techniques (selective queries, skinny tables, data skew, record-locking contention, Big Objects for archiving) and planned real migrations (source analysis, data profiling, mapping, sequencing, trial migrations, cutover, and rollback planning) grounded in data governance (ownership, stewardship, quality dimensions, classification, and a governance framework).",
              "Designed Salesforce's security model at enterprise scale: sharing architecture beyond the Administrator basics — Apex managed sharing, sharing reasons and share objects, territory management, implicit sharing, restriction/scoping rules, and sharing recalculation at volume — identity and access management (SSO, SAML, OAuth flows, OpenID Connect, Connected Apps, Salesforce as an identity provider and service provider, MFA, JIT provisioning and SCIM), and enterprise security design (security boundaries, least privilege, defense in depth, Platform Encryption, and incident-response concepts), each closed out with a case study and mock review-board practice.",
              "Designed integration architecture end to end: why integrations fail, point-to-point vs. middleware/iPaaS vs. ESB/API gateway patterns, synchronous vs. asynchronous and event-driven architecture, enterprise integration patterns, Salesforce Connect and data virtualization, retry/backoff/dead-letter handling, and API management/versioning — then went deeper on events specifically (Platform Events, Change Data Capture, the Streaming API/CometD, the Pub/Sub API, event schema design, and ordering/idempotency) and on integration security (OAuth for integrations, mutual TLS, Named Credentials, service accounts, and secrets management), closing on five real integration case studies (ERP, a financial system, a data warehouse, external applications, a marketing platform).",
              "Built the DevOps and application-lifecycle skillset this ladder's own architecture work depends on: Salesforce DX (the CLI, Dev Hub, scratch orgs, source-driven development, unlocked and second-generation managed packages), Git and source control (branches, merges, pull requests, code review, branch protection, Salesforce-specific branching strategies and metadata-conflict handling), CI/CD for Salesforce (GitHub Actions pipelines, authenticating pipelines to orgs, delta deployments, quality gates, static code analysis), environment strategy (sandboxes, scratch orgs, data masking in non-production), and release/governance architecture (release cadence around Salesforce's seasonal releases, change advisory boards, rollback planning, and technical-debt management).",
              "Practiced Application Architect-level design: requirements analysis and domain modeling, choosing declarative vs. programmatic solutions, design patterns on the platform, scalability/maintainability/reuse, packaging and modularity, and eight real application-architecture case studies (a sales-org redesign, customer service case management, a partner/customer portal, multi-business-unit CRM, field service scheduling, subscription billing, nonprofit program management, and financial services onboarding) — each reviewed through a mock Application Architecture Review Board.",
              "Practiced System Architect-level design: Salesforce in the enterprise landscape, systems of record vs. systems of engagement, multi-org architecture, enterprise identity and monitoring, availability and disaster-recovery concepts, and distributed-systems fundamentals (availability, scalability, reliability, the CAP theorem, message queues, idempotency and retries, backpressure, and observability) — then Technical Architect-level design itself: translating business requirements into an architecture blueprint across every domain (system, identity, security/sharing, data, integration, solution, and delivery), nonfunctional requirements (performance, security, scalability, reliability, compliance, and NFR conflict prioritization), explicit architecture tradeoffs (security vs. usability, build vs. buy, declarative vs. programmatic, governance vs. agility), and how to present, defend, and recover from a mistake in front of an Architecture Review Board — practiced across seven more technical-architecture case studies and two full mock review boards before the capstones below.",
              "Closed the destination with the shared career-preparation course: Salesforce-specific resume and Trailhead-profile strategy, portfolio development, certification strategy across the Administrator-through-CTA journey, and separate interview tracks for Administrator, Developer, Consultant, and Architect-scenario interviews, including live architecture whiteboarding practice.",
            ],
          },
        ],
      },
      {
        heading: "Projects",
        entries: [
          {
            left: "Solstice Appliance Group — Service and Sales Platform (Capstone II)",
            right: "2026",
            sub: "Capstone II — Salesforce Developer capstone",
            bullets: [
              "Extended a Salesforce Administrator's declarative baseline for a fictional 210-employee appliance retailer with a custom data model connecting the sales side (Opportunities, Assets) to the service side (Cases, Installation Jobs, Warranty Claims), plus a security model mixing Organization-Wide Defaults, role hierarchy, sharing rules, and permission sets across four distinct user types.",
              "Built a complex, multi-path record-triggered Flow alongside programmatic automation: Apex classes, a trigger with a dedicated handler class, and a test class meeting the org's code-coverage requirement, plus at least one asynchronous Apex job (Queueable or Batch).",
              "Built Lightning Web Components using `@api`, `@wire`, and custom events, and a REST callout to an external system secured with a Named Credential — the same programmatic-plus-declarative mix this ladder expects a Platform Developer to carry into Solution Architect-level work.",
              "Delivered reports, dashboards, a deployment pipeline, and finished documentation, then recorded a demo and presented the completed platform — a service-and-sales data model, not two separate systems that happen to share a login — to a mock project sponsor.",
            ],
          },
          {
            left: "LTV Global Industries — Final Enterprise Architect Capstone",
            right: "2026",
            sub: "Final Enterprise Architect Capstone — Technical Architect ladder final capstone",
            bullets: [
              "Designed a complete Salesforce transformation for a fictional multinational industrial-equipment manufacturer with roughly 10,000 internal users across three regions (North America, EMEA under GDPR, and APAC) and four business units, millions of end-customer records, thousands of dealer accounts, multiple legacy systems, and high-volume integrations that have to keep running every day.",
              "Designed all thirteen required areas end to end: Salesforce application architecture, data architecture and data model, large-data-volume strategy, security/sharing and identity architecture, integration/API architecture (including ERP, financial-system, data warehouse, and customer-portal integration), nonfunctional requirements, environment and DevOps strategy, CI/CD and release design, migration strategy, backup/recovery/monitoring strategy, and a governance model.",
              "Produced the full deliverable set a real engagement requires — an executive architecture diagram, system-context and data-flow diagrams, an integration diagram, a security model, an identity design, an environment strategy, a CI/CD design, a migration plan, a risk register, architecture decision records, an implementation roadmap, and a complete technical architecture document with an executive presentation.",
              "Defended the design in a staged final defense before a mock Architecture Review Board — two prior mock defenses focused on data/security and integration/scale — fielding challenges on security, scalability, integration, performance, data, identity, deployment, failure scenarios, and the specific tradeoffs behind every rejected alternative, then completed a post-defense retrospective.",
            ],
          },
        ],
      },
      {
        heading: "GitHub Portfolio",
        entries: [
          {
            left: "github.com/johndoe-biexample/ltv-global-sfdx-pipeline",
            right: "2026",
            sub: "Public portfolio repository for the capstone's source-driven metadata and CI/CD pipeline",
            bullets: [
              "Generated a source-driven Salesforce DX project with the Salesforce CLI (`sf`), developed against scratch orgs instead of a shared sandbox, and used `sf project retrieve start` / `sf project deploy start` to move the Solstice and LTV Global capstone metadata between orgs and local source control.",
              "Version-controlled the project in Git with a Salesforce-appropriate branching strategy and `.gitignore`, opened pull requests for code review, and resolved metadata-level merge conflicts rather than overwriting a teammate's changes.",
              "Built a GitHub Actions CI/CD pipeline authenticating to a target org, running delta deployments and automated Apex tests as a quality gate, and failing the pipeline on a coverage or static-analysis violation instead of deploying anyway — the same pipeline discipline this ladder's DevOps & Application Lifecycle stage teaches before a candidate reaches Architect-level work.",
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

  "crm-analytics-developer": {
    levelLabel: "CRM Analytics Developer",
    name: "John Doe",
    contact: CONTACT,
    summary:
      "CRM Analytics Developer trained on the SQL-to-Salesforce analytics bridge — T-SQL, the Salesforce data model built " +
      "for analysts, SOQL and Salesforce data management, and native Salesforce reporting — then Tableau, advanced " +
      "Excel, Python, statistics, and data visualization/EDA, on top of a prior Salesforce Administrator foundation. " +
      "Proved it building two real Salesforce dashboards for a fictional industrial distributor and two independent " +
      "Python data-cleaning and exploratory-analysis capstones. Bringing that foundation to a Salesforce Data Analyst or " +
      "CRM Analytics Developer role.",
    skills: [
      "T-SQL (Joins, Subqueries, CTEs, Window Functions, Performance Tuning)",
      "The Salesforce Data Model for Analysts (Objects, Fields, Relationships, Security Basics)",
      "SOQL & SOSL for Analysts (Relationship Queries, Aggregation, Search)",
      "Salesforce Data Management (Data Loader, Workbench, Import Wizard, Data Quality)",
      "Salesforce Data Migration (Mapping, Sequencing, Validation)",
      "Native Salesforce Reporting (Report Types, Filters, Bucketing, Summary Formulas)",
      "Salesforce Dashboards (Components, Dynamic Dashboards, Subscriptions)",
      "Sales, Service & Campaign Analytics",
      "Tableau (Calculated Fields, LOD Expressions, Parameters, Dashboard Actions)",
      "Tableau Publishing (Desktop, Public, Cloud, Server)",
      "Advanced Excel (XLOOKUP/INDEX-MATCH, PivotTables, Dynamic Arrays, Power Query)",
      "Python for Data Analysis (NumPy, pandas, Data Cleaning)",
      "Statistics & Probability (Distributions, Hypothesis Testing, A/B Testing)",
      "Exploratory Data Analysis (Univariate/Bivariate/Multivariate, Correlation)",
      "Data Visualization (matplotlib, seaborn, Plotly)",
      "Data Storytelling & Stakeholder Communication",
    ],
    tools:
      "Salesforce Setup, Data Loader, Workbench, SSMS, Tableau Desktop & Tableau Public, Excel (Power Query), " +
      "Python (pandas, NumPy, matplotlib, seaborn, Plotly), Jupyter",
    sections: [
      {
        heading: "Training",
        entries: [
          {
            left: "Lifting the Veil IT Academy — Apprenticeship Program",
            right: "Jul 2026 – Dec 2026",
            sub: "Salesforce Architect Destination — Data Analyst Foundations & Analytics/Visualization · Atlanta, GA",
            bullets: [
              "Completed the Salesforce Administrator path beforehand, then this destination's Data & Analytics Architect ladder's first two stages: SQL and the Salesforce data model for analysts, SOQL and Salesforce data management, native Salesforce reporting, then Tableau, advanced Excel, Python, statistics, and data visualization/EDA.",
              "Wrote T-SQL against real AdventureWorks2012 and AdventureWorksDW2014 databases in SQL Server Management Studio — filtering, joins, GROUP BY/HAVING, subqueries and correlated subqueries, Common Table Expressions including recursive CTEs, window and ranking functions (ROW_NUMBER, RANK, DENSE_RANK, NTILE), stored procedures, transactions, and query-performance tuning (execution plans, SARGable WHERE clauses, index choice) — the general-purpose SQL foundation this track's own SOQL course builds on.",
              "Learned what a Salesforce analyst specifically needs, not a full admin curriculum: the Sales Cloud and Service Cloud object model (Leads, Accounts, Contacts, Opportunities, Campaigns, Activities, Cases and the case lifecycle), standard vs. custom objects and fields, Lookup vs. Master-Detail relationships, junction objects, Schema Builder, and enough of the security model (roles, profiles, permission sets, sharing rules, and field-level security) to read a real org's data model instead of querying it blind.",
              "Bridged T-SQL into SOQL and SOSL — what's actually different about SOQL vs. SQL, relationship queries (parent-to-child and child-to-parent), aggregate functions, GROUP BY/HAVING, and SOSL multi-object search — then managed Salesforce data directly with Data Loader (export, insert/update/upsert, safe deletes), Workbench, and the Import Wizard, diagnosed CRM-specific data-quality problems (deduplication, standardization, Salesforce ID formats), and planned a data migration (field mapping, parent-before-children sequencing, post-migration validation) finished with a hands-on extract-clean-load capstone.",
              "Built native Salesforce reports and dashboards end to end: tabular/summary/matrix/joined report types, standard and cross filters, bucketing, summary and row-level formulas, report charts, dashboard components and filters, dynamic dashboards, and scheduled subscriptions — applied to sales analytics (pipeline, forecast, lead-conversion, win/loss) and service/campaign analytics (case analytics, ROI reporting) — then learned the limits of native reporting and when to go external, closing with a two-dashboard capstone for a fictional industrial distributor.",
              "Learned Tableau from installation through publishing: connecting to Excel/CSV/SQL Server data, live connections vs. extracts, every core chart type and the Marks card, filters and Tableau's order of operations, calculated fields (string/date/IF-THEN-ELSE/aggregate), table calculations and time-series analysis, joins/unions/relationships/blending, maps, groups/sets/bins, parameters, Level of Detail expressions (FIXED/INCLUDE/EXCLUDE), dashboard actions and mobile-aware layout, and publishing to Tableau Server, Cloud, and Public — built against the real Sample Superstore dataset across three portfolio dashboards.",
              "Built advanced Excel skills aimed squarely at analyst work: XLOOKUP and INDEX/MATCH, SUMIFS/COUNTIFS/AVERAGEIFS, PivotTables and PivotCharts with slicers, dynamic array functions (FILTER, SORT, UNIQUE, LET), and Power Query for cleaning and combining data without a single manual copy-paste step.",
              "Learned Python for data work — NumPy arrays and vectorization, pandas Series/DataFrames, data cleaning (missing data, duplicates, type problems, outliers), reading/writing CSV/Excel/JSON, querying SQL from Python, and testable/reproducible notebook code — then statistics and probability (descriptive statistics, distributions, the Central Limit Theorem, confidence intervals, hypothesis testing, t-tests/chi-square/ANOVA, correlation vs. causation, and A/B test design), and visualization/EDA (matplotlib/seaborn/Plotly, the univariate-through-multivariate EDA workflow, and connecting Power BI to Python- and SQL-sourced data) — each closed with its own real-dataset capstone.",
            ],
          },
        ],
      },
      {
        heading: "Projects",
        entries: [
          {
            left: "Harborline Supply Company — Sales & Service Dashboards",
            right: "2026",
            sub: "Salesforce Reports & Dashboards — capstone",
            bullets: [
              "Built a sales dashboard for a fictional 180-employee industrial distributor answering five business questions — quota pace against a $6.0M quarterly target, open-pipeline coverage of the remaining gap, revenue split across three regions, win rate and average deal size, and stalled deals — reconciling every number to a source report before presenting it.",
              "Built a second dashboard for the 12-person support team answering five service questions — opened vs. closed case volume, backlog trend, aged/escalated high-priority cases, case origin mix, and workload spread across agents — then presented both dashboards the way an analyst would to a VP of Revenue Operations.",
            ],
          },
          {
            left: "Retail Orders Data-Cleaning Pipeline — Python Capstone",
            right: "2026",
            sub: "Python for Data Science — capstone",
            bullets: [
              "Audited a deliberately messy 1,530-row retail orders file — 30 duplicate rows, mixed date formats, dollar-formatted prices stored as text, inconsistent region/status casing, and six physically impossible quantity values (999, 500, 250, -2, -1, 0) — before writing a single cleaning decision.",
              "Converted the audit into a written cleaning plan (deduplicate, standardize text, parse both date formats, enforce a sane quantity range, treat missing discounts explicitly) and executed it as reusable, tested cleaning code rather than one-off notebook edits.",
            ],
          },
          {
            left: "Customer Churn Exploratory Analysis — Data Visualization & EDA Capstone",
            right: "2026",
            sub: "Data Visualization & EDA — capstone",
            bullets: [
              "Framed a vague \"who's going to churn\" request into a specific, decision-tied question, established an 800-customer baseline churn rate of 19.6% before looking for patterns, and ran it through the full univariate-through-multivariate EDA workflow.",
              "Produced one clear supporting figure and a written finding for a non-technical stakeholder instead of a dump of every chart the dataset could produce.",
            ],
          },
        ],
      },
      {
        heading: "Tableau Public Portfolio",
        entries: [
          {
            left: "public.tableau.com/app/profile/johndoe.biexample",
            right: "2026",
            sub: "Three published Sample Superstore dashboards",
            bullets: [
              "Published an Executive Sales Dashboard with a KPI header, a regional sales map, and cross-chart filter actions; a Customer Segmentation Dashboard using FIXED-LOD RFM (Recency/Frequency/Monetary) calculated fields to bucket customers into business-readable segments; and an Enterprise Performance Dashboard combining what-if parameters, LOD expressions, and table calculations with a dedicated mobile layout — all three to Tableau Public, following the course's own publishing and refresh/subscription lessons.",
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

  "data-analytics-architect": {
    levelLabel: "Salesforce Data / Analytics Architect",
    name: "John Doe",
    contact: CONTACT,
    summary:
      "Salesforce Data / Analytics Architect who carried the full Analytics ladder end to end: the SQL-to-Salesforce " +
      "analytics core, Tableau/Excel/Python/statistics, a three-project CRM analytics portfolio for a fictional " +
      "mid-market software company, CRM Analytics, Data Cloud, and Tableau Next with a governed metric layer for a " +
      "fictional B2B software company's revenue reporting, and the modern enterprise data stack — Snowflake, dbt, " +
      "Airflow, dimensional modeling, and Git/GitHub CI/CD — closed out with a data engineering systems-design " +
      "capstone. Built on a prior Salesforce Administrator foundation. Bringing that foundation to a Salesforce Data / " +
      "Analytics Architect, Salesforce Analytics Engineer, or Salesforce Consultant role.",
    skills: [
      "Full CRM Analytics Developer Core (T-SQL, SOQL, Native Reporting, Tableau, Python, Statistics, EDA)",
      "Salesforce CRM Analytics (Datasets, Dataflows, Recipes, Lenses, SAQL)",
      "Salesforce Data Cloud (Data Streams, Identity Resolution, Calculated Insights, Segments)",
      "Tableau Next (AI-Assisted Analysis, Publishing, vs. Tableau Desktop)",
      "Semantic Modeling & Centralized Metric Governance",
      "CRM Analytics Security (Row-Level Security, Sharing Inheritance, Security Predicates)",
      "Snowflake (Architecture, Virtual Warehouses, Snowpipe, Streams & Tasks)",
      "Snowflake SQL, RBAC & Performance/Cost Optimization",
      "dbt / Analytics Engineering (Staging/Intermediate/Marts, Testing, Documentation)",
      "dbt Incremental Models, Snapshots & the Semantic Layer",
      "Dimensional Modeling & Data Warehousing (Star Schema, SCD Types 0-3, Fact Table Types)",
      "Apache Airflow (DAGs, Operators, Sensors, Dynamic Task Mapping)",
      "Orchestrating Snowflake + dbt + Airflow Pipelines",
      "Git/GitHub for Data Projects & CI/CD Pipelines (GitHub Actions)",
      "System Design for Data Platforms (Lambda/Kappa Architecture, CAP Theorem, SLAs)",
      "Data Storytelling & Executive Presentation",
    ],
    tools:
      "Salesforce CRM Analytics Studio, Data Cloud, Tableau Next & Tableau Desktop, SSMS, Snowflake, dbt Cloud, " +
      "Apache Airflow, Git/GitHub, GitHub Actions, Python (pandas, NumPy), Power BI",
    sections: [
      {
        heading: "Training",
        entries: [
          {
            left: "Lifting the Veil IT Academy — Apprenticeship Program",
            right: "Jul 2026 – Dec 2026",
            sub: "Salesforce Architect Destination — Data & Analytics Architect Ladder (Full) · Atlanta, GA",
            bullets: [
              "Completed the Salesforce Administrator path beforehand, then this destination's full Data & Analytics Architect ladder: the SQL-to-Salesforce analytics core and Tableau/Excel/Python/statistics/EDA foundation covered in the CRM Analytics Developer stage of this same destination, followed by the analytics capstone and career-prep course, enterprise analytics (CRM Analytics, Data Cloud, Tableau Next, and the modern data stack), a data/analytics architecture capstone, and the shared career-preparation close.",
              "Built a three-project CRM analytics portfolio of increasing independence for a fictional mid-market B2B software company, Alder & Vale Systems: a fully guided sales-pipeline analysis, a thinner-scaffolded customer-service analysis, and a minimal-hand-holding executive dashboard combining Leads, Opportunities, and Cases — then practiced Salesforce-analyst interview questions and portfolio walkthroughs.",
              "Learned how Salesforce's modern analytics stack fits together and when to use each piece: CRM Analytics architecture (datasets, dataflows, recipes, lenses, SAQL vs. SOQL vs. SQL, bindings, dashboard interactions), Salesforce Data Cloud (data streams and ingestion, identity resolution, calculated insights, segments), and Tableau Next (what it is, how it differs from Tableau Desktop, connecting it to Salesforce data, and AI-assisted analysis) — then a semantic layer discipline for defining metrics and KPIs centrally and avoiding metric drift, integrating Salesforce with a warehouse (Snowflake, dbt, external data in CRM Analytics), and enterprise analytics security and governance (row-level security, sharing inheritance vs. custom security predicates, and auditing analytics access).",
              "Worked directly in Snowflake's separated storage/compute/cloud-services architecture — databases, schemas, virtual warehouses with auto-suspend/resume, internal and external stages, COPY INTO and Snowpipe continuous ingestion, the ELT pattern with CTAS and incremental loading, star-schema fact/dimension tables with surrogate keys and SCD Type 1/2 history, the VARIANT data type and FLATTEN for semi-structured JSON, Streams and Tasks for change-tracked incremental pipelines, least-privilege RBAC and dynamic data masking, query-performance tuning (Query Profile, micro-partition pruning, clustering), and cost control with resource monitors — closed with an end-to-end SQL Server/CSV/JSON-to-Snowflake-to-Power BI capstone.",
              "Built a layered dbt project on top of that warehouse: sources and the `ref()` function, staging/intermediate/marts models materialized as views, tables, and incremental models, generic and singular tests, `schema.yml` documentation and a generated dbt Docs lineage graph, seeds and snapshots for slowly changing dimensions, custom Jinja macros and `dbt_utils`, version-controlling a dbt project in Git and running it in CI, and semantic-layer metric definitions — closed with a raw-data-to-reporting capstone connected to Power BI.",
              "Learned dimensional modeling as its own discipline rather than a side note in a SQL course: star vs. snowflake schema, choosing the grain, fact table types (transaction, periodic/accumulating snapshot, factless), surrogate vs. natural keys, conformed and degenerate dimensions, every Slowly Changing Dimension type (0 through 3) and hybrid patterns, junk and role-playing dimensions, bridge tables, late-arriving dimensions, and physical warehouse design (indexing, partitioning large fact tables) — closed with a capstone modeling a real business process end to end.",
              "Orchestrated pipelines with Apache Airflow: the DAG concept, operators (Python/Bash), task dependencies, scheduling, XComs, connections/hooks/provider packages (including connecting to Snowflake), sensors, branching, trigger rules, dynamic task mapping, building an ELT DAG that chains Airflow with dbt and Snowflake's own COPY INTO, error handling/retries/alerting, and deployment/monitoring/troubleshooting — closed with an orchestrated ELT pipeline capstone.",
              "Version-controlled and automated that same pipeline work the way a data team actually does: Git fundamentals for data projects (branches, merge vs. rebase, resolving conflicts), GitHub essentials (pull requests, code review, issues/project boards), the specific headaches of versioning notebooks, SQL, and dbt projects, and CI/CD concepts (pipelines as code, GitHub Actions running tests and dbt models automatically on every commit, deploying on merge to main, and environment variables/secrets in CI/CD) — closed with a capstone building a real CI/CD pipeline for a data project.",
              "Closed the technical side of the ladder with a data-engineering-focused systems-design and capstone course: requirements gathering and estimation, choosing storage and a processing model, Lambda vs. Kappa architecture, partitioning/sharding, idempotency and exactly-once vs. at-least-once delivery, and designing ingestion/transformation/serving layers for four real-shaped system-design case studies, then three full capstone projects scoping a real-time retail analytics platform, a multi-source data-warehouse migration, and an end-to-end streaming fraud detector, before building a portfolio and practicing how to tell a project's story in an interview.",
              "Closed the destination with the shared career-preparation course: Salesforce-specific resume and Trailhead-profile strategy, GitHub for Salesforce developers, portfolio development, certification strategy, and Consultant- and Architect-scenario interview practice, including live architecture whiteboarding.",
            ],
          },
        ],
      },
      {
        heading: "Projects",
        entries: [
          {
            left: "Alder & Vale Systems — CRM Analytics Portfolio (Three Projects)",
            right: "2026",
            sub: "Salesforce Analytics Career & Capstone",
            bullets: [
              "Project 1 — Sales Pipeline: built a guided pipeline analysis for a six-rep team against a $9.0M annual quota, reporting Q3 Closed Won of $1.71M across 38 deals (76% of a $2.25M quarterly quota), $4.8M of total open pipeline across 96 opportunities (2.5x coverage of the remaining gap), a trailing-four-quarter win rate of 35%, and 21 stalled deals worth $0.9M.",
              "Project 2 — Customer Service: converted a support manager's informal worries (\"the queue feels like it's growing,\" \"answers take too long\") into precisely defined, measurable questions — backlog, first-response time, resolution time, and CSAT — explicitly flagging which measures the org's data couldn't actually support rather than inventing a number for them.",
              "Project 3 — Executive CRM Analytics: built a single one-page executive dashboard from a two-sentence VP brief with no prescribed reports or fields, crossing Leads, Opportunities, and Cases to answer whether the pipeline covers quota and whether service problems are putting deals at risk, with every number reconciled to a source report or SOQL query.",
            ],
          },
          {
            left: "Cobalt Ridge Software — CRM Analytics, Data Cloud & Tableau Next Capstone",
            right: "2026",
            sub: "Salesforce CRM Analytics & Tableau Next — capstone",
            bullets: [
              "Built a CRM Analytics app and dashboard for a fictional 1,200-employee B2B software company tracking a $8.0M quarterly new-business target, reporting Closed Won of $5.2M across 64 deals (65% of target) and pipeline coverage of about 2.1x against the remaining gap, split across the Americas, EMEA, and APAC.",
              "Defined a central semantic metric layer so the CRO, regional VPs, and every rep saw the same five headline numbers with one owner and one definition each, instead of three teams each computing \"pipeline coverage\" a different way.",
              "Connected Salesforce Data Cloud to bring in product usage data from 3,200 customer accounts, computed seat-activation rates, and surfaced that 17 accounts renewing in the next 90 days — holding $2.3M of the $12.4M in upcoming renewals — showed adoption under 40%, then secured the whole app with row-level security so each viewer saw only their own region's numbers.",
            ],
          },
          {
            left: "CRM-to-Warehouse Analytics Pipeline — Snowflake, dbt & Airflow Capstones",
            right: "2026",
            sub: "Snowflake, dbt / Analytics Engineering & Airflow — capstones",
            bullets: [
              "Landed Salesforce-shaped order and account data alongside a separate CSV and a nested JSON event feed into Snowflake using internal stages, COPY INTO, and VARIANT/FLATTEN, then modeled a star schema with a surrogate-keyed, SCD Type 2 customer dimension kept current by a Stream-triggered Task.",
              "Rebuilt that same transformation as a version-controlled dbt project — staging, intermediate, and marts models connected with `ref()`, generic and singular tests, and a generated dbt Docs lineage graph from raw source to mart — then orchestrated the whole load-transform sequence with an Airflow DAG chaining Snowflake's COPY INTO and dbt runs on a schedule instead of a manually triggered process.",
              "Connected the finished marts to Power BI through a dedicated reporting-layer view behind a least-privilege role, deliberately choosing Import vs. DirectQuery rather than pointing the report at raw marts tables directly.",
            ],
          },
          {
            left: "Data Engineering Career Capstones — Retail Analytics, Warehouse Migration & Fraud Detection",
            right: "2026",
            sub: "Data Engineering Career & Capstone",
            bullets: [
              "Scoped a real-time retail analytics platform handling both nightly batch exports and continuous online order events, choosing a hybrid ingestion design unified at a bronze layer to meet a same-day freshness requirement.",
              "Designed a migration consolidating three legacy systems — an on-prem orders database, a CRM, and a third-party inventory system — into one target warehouse, planning a phased cutover with reconciliation checks instead of a big-bang replacement.",
              "Designed an end-to-end streaming fraud detector scoring every transaction against a sub-second latency budget, choosing a Kappa architecture with a durable, replayable event log instead of a separate batch layer.",
            ],
          },
        ],
      },
      {
        heading: "GitHub Portfolio",
        entries: [
          {
            left: "github.com/johndoe-biexample/crm-warehouse-pipeline",
            right: "2026",
            sub: "Public portfolio repository for the Snowflake/dbt/Airflow capstone pipeline",
            bullets: [
              "Initialized a Git repository for the capstone pipeline with a `.gitignore` excluding dbt's `target/` directory, logs, and environment files, committing every staging/intermediate/marts model, the Airflow DAG definition, and the `schema.yml` documentation as readable files.",
              "Built a GitHub Actions CI/CD pipeline running the dbt test suite automatically on every commit and deploying the merged pipeline on merge to main, with secrets and connection strings handled through CI environment variables rather than hard-coded credentials — the same discipline this ladder's Git/GitHub/CI-CD course and its own capstone teach before a candidate reaches Architect-level work.",
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
