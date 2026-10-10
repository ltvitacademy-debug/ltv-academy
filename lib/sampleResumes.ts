// Sample resumes shown on a career path page — a fictional graduate ("John Doe")
// demonstrating what a student can credibly claim after finishing that path's
// stages. Rendered in-site (see components/careers/ResumeView.tsx), not as a
// downloadable file. Add a path by adding a key to SAMPLE_RESUMES below; the
// career path page picks it up automatically (see getSampleResumeLevels).

export type ResumeEntry = {
  lead?: string;
  left?: string;
  right?: string;
  sub?: string;
  bullets?: string[];
};

export type ResumeSection = {
  heading: string;
  entries: ResumeEntry[];
};

export type ResumeData = {
  name: string;
  contact: string[];
  summary: string;
  skills: string[];
  tools?: string;
  sections: ResumeSection[];
};

export type SampleResumeLevel = "job-ready" | "advanced";

export const RESUME_LEVEL_LABELS: Record<SampleResumeLevel, string> = {
  "job-ready": "Job Ready",
  advanced: "Advanced",
};

const CONTACT = ["Atlanta, GA", "(404) 555-0182", "john.doe@example.com", "linkedin.com/in/johndoe-biexample"];

export const SAMPLE_RESUMES: Record<string, Partial<Record<SampleResumeLevel, ResumeData>>> = {
  "microsoft-data-bi-developer": {
    "job-ready": {
      name: "John Doe",
      contact: CONTACT,
      summary:
        "Entry-level BI Developer trained in SQL Server, SSIS, SSRS, and Power BI through a hands-on apprenticeship program. " +
        "Built a complete reporting pipeline end to end — raw source data through SSIS into a dimensional warehouse, served by " +
        "both an SSRS paginated report and a Power BI dashboard. Looking to bring that same full-stack approach to a Junior BI " +
        "Developer, SQL Developer, or Report Developer role.",
      skills: [
        "ETL Development (SSIS)",
        "Dimensional Modeling & Data Warehousing",
        "Paginated Reporting (SSRS)",
        "Data Visualization & DAX (Power BI)",
        "T-SQL Querying & Database Design",
        "Requirements Gathering & Stakeholder Communication",
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
                "Used Git and GitHub for source control on SQL scripts, SSIS packages, and project documentation.",
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
          heading: "Education",
          entries: [{ left: "High School Diploma — Washington High School", right: "Atlanta, GA · 2020" }],
        },
      ],
    },
    advanced: {
      name: "John Doe",
      contact: CONTACT,
      summary:
        "BI Developer with 3+ years of experience building and maintaining Microsoft BI solutions — SQL Server, SSIS, SSRS, " +
        "and Power BI — and extending them with Power Automate to remove manual reporting and approval work. Comfortable " +
        "owning a project from source system to finished dashboard, and increasingly the automation layer that keeps it " +
        "running without someone babysitting it.",
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
      ],
      tools: "SSMS, SSDT/Visual Studio, Power BI Desktop & Service, Power Automate, Dataverse, SharePoint, Microsoft Teams, Outlook, Git",
      sections: [
        {
          heading: "Professional Experience",
          entries: [
            {
              lead: "Build and maintain 11 production Power Automate flows covering scheduled reporting, approval routing, and data-quality monitoring across the BI team's reporting suite.",
            },
            {
              left: "BI Developer (Promoted) — Oakmont Grocery",
              right: "Aug 2028 – Present",
              sub: "Atlanta, GA",
              bullets: [
                "Designed an approval workflow in Power Automate for late schema-change requests from source teams, routing each request to the data team lead before anything touches production ETL — replacing an informal, easy-to-miss email chain.",
                "Monitor dataflow refresh failures with a dedicated Power Automate trigger and branched notification logic, cutting the average time to catch a failed nightly refresh from “whenever someone notices a stale report” to under 15 minutes.",
                "Built a custom connector and a small Dataverse-backed intake app so non-technical stakeholders can submit new report requests without opening a ticket in the data team's queue.",
                "Repackaged the team's growing set of flows into solutions and set up a dev-to-test-to-production promotion path with environment variables and connection references, so a flow no longer has to be rebuilt by hand in each environment.",
                "Set a Data Loss Prevention policy separating business connectors (SharePoint, Outlook, Power BI) from non-business ones after a near-miss where a test flow combined SQL Server with a personal email connector.",
                "Secured flow-to-database connections with a dedicated service account and connection references instead of personal credentials, closing a gap flagged during an internal security review.",
                "Mentored two apprenticeship-program graduates joining the team, including walking them through the same manufacturing work order pipeline this role originally started from.",
              ],
            },
            {
              left: "Associate BI Developer — Oakmont Grocery",
              right: "Jul 2026 – Aug 2028",
              sub: "Atlanta, GA",
              bullets: [
                "Took ownership of the end-to-end SQL Server → SSIS → dimensional warehouse → SSRS/Power BI pipeline for the manufacturing and inventory reporting suite, extending it from a single capstone project into a production system supporting multiple business units.",
                "Replaced three manually distributed SSRS reports with a Power Automate scheduled flow that generates and emails parameter-driven report snapshots to regional managers every Monday morning, eliminating a recurring manual task.",
                "Built a Power BI data alert and a connected Power Automate flow that posts to Microsoft Teams when on-time production rate drops below a set threshold, so operations leads find out the same day instead of during a weekly review.",
                "Built a scheduled flow against SQL Server that flags rows failing basic data-quality checks (nulls in required fields, out-of-range dates) and routes them to a Teams channel before they reach the warehouse, instead of being caught downstream in a report.",
                "Split a sprawling single flow into smaller child flows for request validation, data lookup, and notification, making each piece independently testable and far easier to debug than the original monolithic version.",
                "Added an HTTP action to pull shipment status from a carrier's REST API and parse the JSON response into the warehouse's staging table overnight, replacing a manual status lookup someone had been doing by hand every morning.",
              ],
            },
          ],
        },
        {
          heading: "Selected Projects",
          entries: [
            {
              left: "Manufacturing Work Order Reporting Pipeline — Capstone Project",
              right: "2026",
              sub: "Lifting the Veil IT Academy, Microsoft Data & BI Developer Apprenticeship Program",
              bullets: [
                "Built the original end-to-end SQL Server/SSIS/SSRS/Power BI pipeline — including a FactWorkOrder accumulating snapshot fact table and a scrap-rate-by-location Power BI dashboard — that became the direct foundation for the production reporting system above.",
              ],
            },
          ],
        },
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
                "Used Git and GitHub for source control on SQL scripts, SSIS packages, and project documentation.",
                "Built a complete, end-to-end capstone project — raw source data through SQL Server and SSIS into a dimensional warehouse, served by both an SSRS paginated report and a Power BI dashboard — simulating the full scope of a Microsoft BI Developer role.",
              ],
            },
            { left: "Microsoft PL-300: Power BI Data Analyst", right: "Exam scheduled" },
          ],
        },
        {
          heading: "Professional Development",
          entries: [
            {
              lead: "Keep up with Power Platform release waves twice a year and bring relevant changes back to the team — most recently reviewing updates to dataflow refresh triggers and solution-aware environment variables.",
            },
          ],
        },
        {
          heading: "Education",
          entries: [{ left: "High School Diploma — Washington High School", right: "Atlanta, GA · 2020" }],
        },
      ],
    },
  },
};

export function getSampleResume(pathSlug: string, level: SampleResumeLevel): ResumeData | undefined {
  return SAMPLE_RESUMES[pathSlug]?.[level];
}

export function getSampleResumeLevels(pathSlug: string): SampleResumeLevel[] {
  const entry = SAMPLE_RESUMES[pathSlug];
  if (!entry) return [];
  return (Object.keys(entry) as SampleResumeLevel[]).filter((level) => entry[level]);
}

export function getAllSampleResumeParams(): { slug: string; level: SampleResumeLevel }[] {
  return Object.entries(SAMPLE_RESUMES).flatMap(([slug, levels]) =>
    (Object.keys(levels) as SampleResumeLevel[]).map((level) => ({ slug, level }))
  );
}
