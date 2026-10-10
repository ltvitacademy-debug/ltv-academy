import type { PathResumes } from "../sampleResumeTypes";

const CONTACT = ["Atlanta, GA", "(404) 555-0182", "john.doe@example.com", "linkedin.com/in/johndoe-biexample"];

export const RESUMES: PathResumes = {
  "job-ready": {
    levelLabel: "Job Ready",
    name: "John Doe",
    contact: CONTACT,
    summary:
      "BI Developer trained in SQL Server, SSIS, SSRS, and Power BI through a hands-on apprenticeship program. Built a " +
      "complete reporting pipeline end to end — raw source data through SSIS into a dimensional warehouse, served by " +
      "both an SSRS paginated report and a Power BI dashboard. Bringing that full-stack approach to a BI Developer, SQL " +
      "Developer, or Report Developer role.",
    skills: [
      "ETL Development (SSIS)",
      "Dimensional Modeling & Data Warehousing",
      "Paginated Reporting (SSRS)",
      "Data Visualization & DAX (Power BI)",
      "T-SQL Querying & Database Design",
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
            sub: "Microsoft Data & BI Developer Track · Atlanta, GA",
            bullets: [
              "Completed an intensive, project-based apprenticeship covering SQL Server database development, T-SQL, ETL development, paginated reporting, and business intelligence, using hands-on assignments built against a real relational database.",
              "Designed and queried SQL Server relational databases, including primary and foreign keys, constraints, table relationships, and views.",
              "Wrote T-SQL ranging from basic filtering and joins to advanced patterns — correlated and multi-value subqueries, Common Table Expressions (CTEs) including recursive CTEs, temporary tables, window and ranking functions (ROW_NUMBER, RANK, DENSE_RANK, NTILE, OVER/PARTITION BY), and UNION/UNION ALL set operations.",
              "Created and parameterized stored procedures to encapsulate reusable business logic and reporting queries.",
              "Applied database normalization (1NF–3NF) and dimensional modeling to design both transactional schemas and star-schema data warehouses with fact and dimension tables.",
              "Tuned T-SQL query performance by reading execution plans (scans vs. seeks), choosing clustered vs. nonclustered indexes, applying filtered indexes, and rewriting non-SARGable WHERE clauses.",
              "Designed and built SSIS ETL packages to extract data from flat files and relational sources, apply derived-column transformations and lookups, and load it into staging and warehouse tables.",
              "Implemented SSIS error handling and logging — error outputs on data flow components and logging providers — so pipeline failures are caught and recorded instead of failing silently.",
              "Built SSRS paginated reports with report and cascading/multi-value parameters, grouping and sorting, drilldown and drillthrough navigation, and data-driven subscriptions for scheduled delivery.",
              "Built Power BI data models and reports: Power Query transformations and data cleaning, DAX measures (including CALCULATE and filter context), KPIs, slicers, and drill-down/drill-through navigation.",
              "Practiced translating business requirements into database, ETL, and reporting designs, then documenting and presenting the finished solution to a non-technical audience.",
              "Practiced the full software delivery lifecycle — Dev/QA/UAT/Production environments, release and deployment planning, and version control with Git (repositories, commits, branches, pull requests) — through a Scrum/Kanban-based project simulation, from a business request through requirements, build, test, and release.",
              "Built a complete, end-to-end capstone project — raw source data through SQL Server and SSIS into a dimensional warehouse, served by both an SSRS paginated report and a Power BI dashboard — simulating the full scope of a Microsoft BI Developer role.",
            ],
          },
        ],
      },
      {
        heading: "Projects",
        entries: [
          {
            left: "Manufacturing Work Order Reporting Pipeline — Capstone Project",
            right: "2026",
            sub: "Lifting the Veil IT Academy, Microsoft Data & BI Developer Apprenticeship Program",
            bullets: [
              "Designed and built an SSIS ETL package to move manufacturing work order data from a SQL Server source system into a staging and warehouse environment, eliminating manual CSV handoffs between production and reporting.",
              "Modeled an accumulating snapshot fact table (FactWorkOrder) with three role-playing date dimensions for order start, end, and due dates, enabling on-time-vs-late production reporting that didn't exist before.",
              "Built an SSRS paginated report (WorkOrderProductionSummary) with parameter-driven filtering by date range and product, giving production managers a self-service view instead of an ad hoc SQL request.",
              "Built a Power BI dashboard on the same warehouse tables surfacing scrap rate by product and location, identifying where quality issues concentrate.",
              "Documented the finished pipeline and set up a scheduled refresh so reports stay current without manual intervention.",
            ],
          },
        ],
      },
      {
        heading: "GitHub Portfolio",
        entries: [
          {
            left: "github.com/johndoe-biexample/work-order-bi-pipeline",
            right: "2026",
            sub: "Public portfolio repository for the capstone project",
            bullets: [
              "Initialized a Git repository for the capstone project and used git add/commit/push to publish it to GitHub, with a .gitignore excluding local settings and test data — the SSIS package (WorkOrderETL.dtsx), T-SQL warehouse DDL, and SSRS report definition all committed as readable files.",
              "Wrote a README documenting the architecture, and included report and dashboard screenshots plus a short recorded walkthrough for the SSRS and Power BI pieces that aren't viewable directly in a browser.",
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
      "BI professional trained through an advanced, two-stage apprenticeship program covering SQL Server, SSIS, SSRS, " +
      "and Power BI, plus Power Automate for the business process automation layer around them. Comfortable owning a " +
      "reporting pipeline from source system to finished dashboard, and the flows, approvals, and alerts that keep it " +
      "running without someone babysitting it. Looking to bring that full-stack-plus-automation approach to a BI " +
      "Developer, SQL/Power BI Developer, or Data Automation Analyst role.",
    skills: [
      "ETL Development (SSIS)",
      "Dimensional Modeling & Data Warehousing",
      "Paginated Reporting (SSRS)",
      "Data Visualization & DAX (Power BI)",
      "T-SQL Querying & Database Design",
      "Business Process Automation (Power Automate, Dataverse)",
      "Approval Workflows & Notification Systems",
      "REST APIs, Custom Connectors & JSON",
      "Environment Strategy, DLP Policies & Application Lifecycle Management",
      "Requirements Gathering & Stakeholder Communication",
      "Version Control (Git/GitHub)",
    ],
    tools: "SSMS, SSDT/Visual Studio, Power BI Desktop & Service, Power Automate, Dataverse, SharePoint, Microsoft Teams, Outlook, Git",
    sections: [
      {
        heading: "Training & Certifications",
        entries: [
          {
            left: "Lifting the Veil IT Academy — Apprenticeship Program",
            right: "Jan 2026 – Jun 2026",
            sub: "Microsoft Data & BI Developer Track (Job Ready) + Power Automate Specialization (Advanced) · Atlanta, GA",
            bullets: [
              "Completed an intensive, project-based apprenticeship covering SQL Server database development, T-SQL, ETL development, paginated reporting, business intelligence, and business process automation, using hands-on assignments built against a real relational database.",
              "Designed and queried SQL Server relational databases, including primary and foreign keys, constraints, table relationships, and views.",
              "Wrote T-SQL ranging from basic filtering and joins to advanced patterns — correlated and multi-value subqueries, Common Table Expressions (CTEs) including recursive CTEs, temporary tables, window and ranking functions (ROW_NUMBER, RANK, DENSE_RANK, NTILE, OVER/PARTITION BY), and UNION/UNION ALL set operations.",
              "Created and parameterized stored procedures to encapsulate reusable business logic and reporting queries.",
              "Applied database normalization (1NF–3NF) and dimensional modeling to design both transactional schemas and star-schema data warehouses with fact and dimension tables.",
              "Tuned T-SQL query performance by reading execution plans (scans vs. seeks), choosing clustered vs. nonclustered indexes, applying filtered indexes, and rewriting non-SARGable WHERE clauses.",
              "Designed and built SSIS ETL packages to extract data from flat files and relational sources, apply derived-column transformations and lookups, and load it into staging and warehouse tables, with error outputs and logging providers to catch failures instead of letting a package fail silently.",
              "Built SSRS paginated reports with report and cascading/multi-value parameters, grouping and sorting, drilldown and drillthrough navigation, and data-driven subscriptions for scheduled delivery.",
              "Built Power BI data models and reports: Power Query transformations and data cleaning, DAX measures (including CALCULATE and filter context), KPIs, slicers, and drill-down/drill-through navigation.",
              "Built Power Automate flows with triggers, actions, conditions, loops, and variables, and automated Outlook, Microsoft Teams, Excel, and SharePoint tasks.",
              "Connected Power BI data alerts to Power Automate flows to turn a threshold crossing or a refresh failure into an email or Teams notification without anyone watching the dashboard.",
              "Built approval workflows, added error handling to flows, and scheduled recurring flows for jobs that previously had to be kicked off by hand.",
              "Connected flows to Dataverse and SQL Server, called external REST APIs with HTTP actions, and parsed JSON responses; built a custom connector for a system with no pre-built connector available.",
              "Organized related flows into child flows for modular, independently testable design, and packaged flows into solutions for deployment across environments using environment variables and connection references.",
              "Applied governance practices — environment strategy, Data Loss Prevention (DLP) policies, and the Power Platform admin center — and practiced application lifecycle management (ALM) and flow troubleshooting.",
              "Practiced the full software delivery lifecycle — Dev/QA/UAT/Production environments, release and deployment planning, and version control with Git (repositories, commits, branches, pull requests) — through a Scrum/Kanban-based project simulation, from a business request through requirements, build, test, and release.",
              "Built a complete, end-to-end capstone project — raw source data through SQL Server and SSIS into a dimensional warehouse, served by both an SSRS paginated report and a Power BI dashboard — simulating the full scope of a Microsoft BI Developer role.",
            ],
          },
          { left: "Microsoft PL-300: Power BI Data Analyst", right: "Exam scheduled" },
        ],
      },
      {
        heading: "Projects",
        entries: [
          {
            left: "Manufacturing Work Order Reporting Pipeline — Capstone Project",
            right: "2026",
            sub: "Lifting the Veil IT Academy, Microsoft Data & BI Developer Apprenticeship Program",
            bullets: [
              "Designed and built an SSIS ETL package to move manufacturing work order data from a SQL Server source system into a staging and warehouse environment, eliminating manual CSV handoffs between production and reporting.",
              "Modeled an accumulating snapshot fact table (FactWorkOrder) with three role-playing date dimensions for order start, end, and due dates, enabling on-time-vs-late production reporting that didn't exist before.",
              "Built an SSRS paginated report (WorkOrderProductionSummary) with parameter-driven filtering by date range and product, giving production managers a self-service view instead of an ad hoc SQL request.",
              "Built a Power BI dashboard on the same warehouse tables surfacing scrap rate by product and location, identifying where quality issues concentrate.",
              "Connected a Power BI data alert to a Power Automate flow so a scrap-rate threshold crossing posts to Microsoft Teams automatically, instead of waiting for someone to check the dashboard.",
              "Documented the finished pipeline and set up a scheduled refresh so reports stay current without manual intervention.",
            ],
          },
        ],
      },
      {
        heading: "GitHub Portfolio",
        entries: [
          {
            left: "github.com/johndoe-biexample/work-order-bi-pipeline",
            right: "2026",
            sub: "Public portfolio repository for the capstone project",
            bullets: [
              "Initialized a Git repository for the capstone project and used git add/commit/push to publish it to GitHub, with a .gitignore excluding local settings and test data — the SSIS package (WorkOrderETL.dtsx), T-SQL warehouse DDL, and SSRS report definition all committed as readable files.",
              "Wrote a README documenting the architecture, and included report and dashboard screenshots plus a short recorded walkthrough for the SSRS and Power BI pieces that aren't viewable directly in a browser.",
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
