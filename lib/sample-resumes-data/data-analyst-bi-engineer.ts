import type { PathResumes } from "../sampleResumeTypes";

const CONTACT = ["Atlanta, GA", "(404) 555-0182", "john.doe@example.com", "linkedin.com/in/johndoe-biexample"];

export const RESUMES: PathResumes = {
  "job-ready": {
    levelLabel: "Job Ready",
    name: "John Doe",
    contact: CONTACT,
    summary:
      "Data Analyst trained in T-SQL, Power BI, Tableau, Python, and advanced Excel through a hands-on apprenticeship " +
      "program. Built a published, secured Power BI dashboard on a real star-schema data model, three portfolio-grade " +
      "Tableau dashboards, and practiced the Agile/Kanban project workflow a real analyst works inside every day. " +
      "Bringing that dashboard-to-delivery skill set to a Data Analyst or BI Analyst role.",
    skills: [
      "T-SQL Querying & Database Design",
      "Data Modeling & DAX (Power BI)",
      "Business Intelligence Dashboards (Power BI & Tableau)",
      "Dashboard Design & Storytelling",
      "Python for Data Analysis (Pandas, Matplotlib)",
      "Advanced Excel (PivotTables, Power Query, Dynamic Arrays)",
      "Agile/Scrum & Kanban Project Practices",
      "Version Control (Git/GitHub)",
      "Requirements Gathering & Stakeholder Communication",
    ],
    sections: [
      {
        heading: "Training",
        entries: [
          {
            left: "Lifting the Veil IT Academy — Apprenticeship Program",
            right: "Jan 2026 – Jun 2026",
            sub: "Data Analyst → BI Engineer Track (Job Ready) · Atlanta, GA",
            bullets: [
              "Practiced Agile vs. Waterfall, Scrum sprints and user stories, and Kanban board management, then applied all of it to a simulated business request end to end — writing user stories, building a Kanban board, simulating QA and UAT sign-off, writing release notes, and responding to a simulated production incident.",
              "Practiced the Dev/QA/UAT/Production release lifecycle and version control with Git — repositories, commits, branches, remotes, and pull requests — as the shared workflow underneath every project in the rest of the apprenticeship.",
              "Wrote T-SQL ranging from filtering, joins, and aggregation to advanced patterns — correlated and multi-value subqueries, Common Table Expressions (CTEs) including recursive CTEs, window and ranking functions (ROW_NUMBER, RANK, DENSE_RANK, NTILE, OVER/PARTITION BY), and PIVOT/UNPIVOT — against real AdventureWorks2012 and AdventureWorksDW2014 databases in SQL Server Management Studio.",
              "Applied database design fundamentals (primary/foreign keys, constraints, normalization through 3NF) and dimensional modeling concepts — star schema, fact and dimension tables, slowly changing dimensions — that carried directly into the Power BI data model.",
              "Tuned T-SQL query performance by reading execution plans (scans vs. seeks), choosing clustered vs. nonclustered indexes, and rewriting non-SARGable WHERE clauses.",
              "Built a complete Power BI capstone project for a simulated company, Adventure Works Cycles: imported AdventureWorksDW2014's FactInternetSales, FactResellerSales, and date/product/territory dimension tables, built a star-schema data model, and wrote DAX measures (CALCULATE, filter context, time intelligence) to track regional sales performance, product-line profitability, and reseller fulfillment.",
              "Translated a deliberately vague stakeholder ask (\"something that shows how we're doing\") into four scoped, written requirements before building anything, then published the finished dashboard to the Power BI Service as an app with row-level security and a scheduled refresh.",
              "Designed report pages with slicers, drill-through, bookmarks, and cross-filtering, applying dashboard storytelling principles — audience, KPIs, visual hierarchy — rather than defaulting to whatever chart Power BI suggests first.",
              "Used Python (pandas) inside Power Query and a Python visual (Matplotlib) to clean, filter, and transform data and build a chart type Power Query and DAX don't cover on their own, including handling NULLs, fixing data types, and joining data with pandas DataFrames.",
              "Built three portfolio-grade Tableau dashboards against the Sample Superstore dataset: an Executive Sales Dashboard with a KPI header, a sales-by-region map, and cross-chart filter actions; a Customer Segmentation Dashboard using FIXED-LOD RFM (Recency/Frequency/Monetary) calculated fields to bucket customers into business-readable segments; and an Enterprise Performance Dashboard combining what-if parameters, LOD expressions, and table calculations with a dedicated mobile layout.",
              "Practiced Tableau's calculated fields, table calculations, LOD expressions, parameters, groups/sets, and dashboard actions, then published all three dashboards to Tableau Public.",
              "Applied advanced Excel techniques that still show up in analyst job postings — XLOOKUP and INDEX/MATCH, SUMIFS/COUNTIFS/AVERAGEIFS, PivotTables with calculated fields and slicers, dynamic array functions (FILTER, SORT, UNIQUE, LET), and Power Query for cleaning and combining data inside Excel.",
            ],
          },
        ],
      },
      {
        heading: "Projects",
        entries: [
          {
            left: "Adventure Works Cycles Sales Performance Dashboard — Power BI Capstone",
            right: "2026",
            sub: "Lifting the Veil IT Academy, Data Analyst → BI Engineer Apprenticeship Program",
            bullets: [
              "Built a star-schema data model in Power BI from AdventureWorksDW2014's fact and dimension tables, and wrote DAX measures covering regional sales performance, product-line profitability, reseller fulfillment, and year-over-year trend.",
              "Designed a multi-page report with drill-through and cross-filtering, and published it to the Power BI Service as a secured app with row-level security and a scheduled refresh.",
              "Checked the finished dashboard against the original four written requirements, line by line, before calling the project complete — rather than treating 'more features' as the finish line.",
            ],
          },
          {
            left: "Tableau Analytics Portfolio — Three Dashboards",
            right: "2026",
            sub: "Lifting the Veil IT Academy, Data Analyst → BI Engineer Apprenticeship Program",
            bullets: [
              "Executive Sales Dashboard: a single-screen view with a KPI header, a Profit-Ratio-colored regional map, a profit trend line with a reference line, a Top-10-products chart, and a working filter action tying all four together.",
              "Customer Segmentation Dashboard: FIXED-LOD Recency/Frequency/Monetary calculated fields driving a parameter-controlled scatter plot and a business-readable segment model (Champions, Loyal, At Risk, Lost, New), with a click-through customer detail table.",
              "Enterprise Performance Dashboard: combined what-if parameters, LOD expressions, and table calculations into one multi-sheet dashboard with a dedicated mobile layout, published to Tableau Public.",
            ],
          },
        ],
      },
      {
        heading: "GitHub Portfolio",
        entries: [
          {
            left: "github.com/johndoe-biexample/bi-analyst-portfolio",
            right: "2026",
            sub: "Public portfolio repository for the Power BI and Tableau capstone projects",
            bullets: [
              "Initialized a Git repository and used the clone → branch → commit → push → pull request workflow to publish the finished capstone work, instead of pushing directly to main.",
              "Committed the Power BI capstone's DAX measure documentation and the Tableau dashboards' calculated-field definitions as readable text, alongside the .pbix/.twbx files, dashboard screenshots, and links to the published Tableau Public dashboards.",
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
      "BI professional trained through an advanced, two-stage apprenticeship program covering T-SQL, Power BI, Tableau, " +
      "and advanced Excel, plus Azure Data Factory pipelines, Git/GitHub/CI-CD discipline, and Power Automate for the " +
      "business-process layer around a BI platform. Comfortable owning a dashboard from source system to published " +
      "report, the pipeline that feeds it, and the version-controlled, tested workflow that ships changes to all of it " +
      "safely. Looking to bring that full-stack BI-engineering approach to a BI Developer, BI Engineer, or Senior BI " +
      "Analyst role.",
    skills: [
      "T-SQL Querying & Database Design",
      "Data Modeling & DAX (Power BI)",
      "Business Intelligence Dashboards (Power BI & Tableau)",
      "Dashboard Design & Storytelling",
      "Python for Data Analysis (Pandas, Matplotlib)",
      "Advanced Excel (PivotTables, Power Query, Dynamic Arrays)",
      "ETL Pipeline Development (Azure Data Factory)",
      "Git, GitHub & CI/CD for Data Projects (GitHub Actions)",
      "Business Process Automation (Power Automate, Dataverse)",
      "Agile/Scrum & Kanban Project Practices",
      "Requirements Gathering & Stakeholder Communication",
    ],
    tools:
      "SSMS, Power BI Desktop & Service, Tableau Desktop & Public, Python (pandas, Matplotlib), Excel, Azure Data " +
      "Factory, Git, GitHub, GitHub Actions, Power Automate, Dataverse",
    sections: [
      {
        heading: "Training & Certifications",
        entries: [
          {
            left: "Lifting the Veil IT Academy — Apprenticeship Program",
            right: "Jan 2026 – Jun 2026",
            sub: "Data Analyst → BI Engineer Track (Job Ready) + Data Factory, Git/GitHub/CI-CD & Power Automate (Advanced) · Atlanta, GA",
            bullets: [
              "Completed the full Job-Ready stage: Agile/Kanban project practices and Git fundamentals; T-SQL from joins through window functions, CTEs, and performance tuning against AdventureWorks2012/AdventureWorksDW2014; a published, row-level-secured Power BI capstone dashboard on a star-schema model; Python (pandas/Matplotlib) extending Power BI's Power Query and visuals; three portfolio Tableau dashboards; and advanced Excel for analyst work.",
              "Built and ran Azure Data Factory pipelines end to end — linked services and parameterized datasets, Copy activities, mapping data flows (filter, derived column, join, aggregate, conditional split), and control flow (ForEach, If Condition, Execute Pipeline Activity) — then scheduled, secured, and monitored them with triggers, managed identities and Key Vault, and the Monitor hub.",
              "Completed a full Data Factory capstone for a simulated company, Northwind Retail: moved nightly sales data from an on-premises SQL Server source into Azure through a self-hosted integration runtime, transformed and aggregated it by region and product category in a mapping data flow, and landed it in a curated Azure SQL table on an unattended morning schedule — with retry/log/alert error handling and no credentials stored in plain text, verified against the four original stakeholder requirements.",
              "Compared Azure Data Factory to Fabric Data Factory (Dataflow Gen2, OneLake as a destination) and to SSIS, and practiced Git integration and Dev/Test/Prod promotion for pipeline deployments.",
              "Completed a dedicated Git, GitHub & CI/CD for Data course: branching and merge vs. rebase, resolving merge conflicts, pull requests and code review, .gitignore and large-file handling for notebooks/SQL/dbt projects, and building a real CI/CD pipeline with GitHub Actions.",
              "Built a capstone data project (retail-orders-analytics) with real Git hygiene — feature branches merged through reviewed pull requests, and a .gitignore covering build output and credentials — plus a GitHub Actions workflow with a CI job that runs dbt build on every pull request and a separately gated deploy job that only runs on a merge to main, using secrets referenced from GitHub rather than committed to the repository.",
              "Deliberately broke a commit to confirm the CI pipeline actually failed on a real problem, then fixed it and watched the pipeline pass, before presenting the finished repository — .gitignore, pull request, workflow file, failed-then-passing run, and deploy job — end to end.",
              "Built Power Automate flows with triggers, conditions, loops, and variables; automated Outlook, Microsoft Teams, Excel, and SharePoint tasks; and built approval workflows with Configure Run After error handling and scheduled recurring flows.",
              "Connected a Power BI data alert to a Power Automate flow — the pattern taught against the course's own Power BI tile example — so a KPI threshold crossing on my Adventure Works Cycles capstone dashboard would trigger an automatic notification instead of relying on someone to watch it.",
              "Connected flows to Dataverse and SQL Server, called REST APIs with HTTP actions and parsed JSON responses, and practiced governance basics — environment strategy, Data Loss Prevention (DLP) policies, and packaging flows into solutions for deployment across environments.",
            ],
          },
          { left: "Microsoft PL-300: Power BI Data Analyst", right: "Exam scheduled" },
        ],
      },
      {
        heading: "Projects",
        entries: [
          {
            left: "Northwind Retail Sales Pipeline — Azure Data Factory Capstone",
            right: "2026",
            sub: "Lifting the Veil IT Academy, Data Analyst → BI Engineer Apprenticeship Program",
            bullets: [
              "Designed an end-to-end pipeline moving nightly sales data from an on-premises SQL Server database into Azure through a self-hosted integration runtime, eliminating a manual next-morning spreadsheet export.",
              "Built a mapping data flow that filters, joins, and aggregates raw sales records into totals by region and product category, landing the result in a curated Azure SQL table.",
              "Scheduled the pipeline to run unattended every morning ahead of an 8 AM leadership meeting, with retry/log/alert error handling and managed-identity/Key Vault authentication so no credentials are stored in plain text.",
              "Verified the finished pipeline against each of the four original stakeholder requirements and presented it end to end in under five minutes, naming the one deliberate design decision (filter-before-join ordering) worth defending in an interview.",
            ],
          },
          {
            left: "Adventure Works Cycles Sales Performance Dashboard — Power BI Capstone",
            right: "2026",
            sub: "Lifting the Veil IT Academy, Data Analyst → BI Engineer Apprenticeship Program",
            bullets: [
              "Built a star-schema data model in Power BI from AdventureWorksDW2014's fact and dimension tables, with DAX measures covering regional sales performance, product-line profitability, reseller fulfillment, and year-over-year trend.",
              "Published the dashboard to the Power BI Service as a secured, scheduled-refresh app, then connected a Power BI data alert to a Power Automate flow so a KPI threshold crossing notifies the team automatically.",
            ],
          },
          {
            left: "Tableau Analytics Portfolio — Three Dashboards",
            right: "2026",
            sub: "Lifting the Veil IT Academy, Data Analyst → BI Engineer Apprenticeship Program",
            bullets: [
              "Published an Executive Sales Dashboard, a FIXED-LOD RFM Customer Segmentation Dashboard, and a parameter-and-LOD-driven Enterprise Performance Dashboard with a mobile layout, all to Tableau Public.",
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
            sub: "Public repository demonstrating a real CI/CD pipeline for a data project",
            bullets: [
              "Built a small dbt project with proper Git hygiene: a .gitignore covering target/, dbt_packages/, logs/, and .env; feature work on its own branch; and a commit history with real, specific messages instead of \"fix\"/\"stuff\".",
              "Opened a pull request with at least one real review comment and suggestion, demonstrating the code-review habit rather than just the existence of a PR.",
              "Wrote a .github/workflows/ci.yml that runs dbt build on every pull request against main, including one deliberately broken commit that produced a real failing check before the fix passed.",
              "Added a second, separately gated deploy job that only runs on a push to main, using a distinct target and secrets referenced via GitHub Actions secrets rather than committed to the repository.",
              "Wrote a README documenting the architecture so a stranger could clone the repository and understand exactly how a change gets proposed, tested, reviewed, and deployed without a verbal walkthrough.",
            ],
          },
          {
            left: "github.com/johndoe-biexample/bi-analyst-portfolio",
            right: "2026",
            sub: "Public portfolio repository for the Power BI and Tableau capstone projects",
            bullets: [
              "Initialized a Git repository and used the clone → branch → commit → push → pull request workflow to publish the finished capstone work, instead of pushing directly to main.",
              "Committed the Power BI capstone's DAX measure documentation and the Tableau dashboards' calculated-field definitions as readable text, alongside the .pbix/.twbx files, dashboard screenshots, and links to the published Tableau Public dashboards.",
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
