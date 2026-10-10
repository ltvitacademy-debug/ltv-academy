import type { PathResumes } from "../sampleResumeTypes";

const CONTACT = ["Atlanta, GA", "(404) 555-0182", "john.doe@example.com", "linkedin.com/in/johndoe-biexample"];

export const RESUMES: PathResumes = {
  "job-ready": {
    levelLabel: "Job Ready",
    name: "John Doe",
    contact: CONTACT,
    summary:
      "Azure Database Administrator trained in T-SQL, Azure SQL deployment and security, performance tuning, backup/HA/DR, " +
      "and Azure Data Factory through a hands-on apprenticeship program. Took a real production environment — three " +
      "databases with no disaster recovery, unaudited security, and a recurring performance problem — through a " +
      "migration, security, and automation plan justified against the business's own stated requirements. Bringing " +
      "that reasoning to an Azure Database Administrator, SQL Developer, or Database Engineer role.",
    skills: [
      "T-SQL Querying & Database Design",
      "Azure SQL Deployment (Database, Managed Instance, VM)",
      "Database Security (Entra ID, TDE, Always Encrypted, Row-Level Security)",
      "Performance Tuning & Query Optimization",
      "Monitoring & Automation (Azure Monitor, DMVs, SQL Server Agent)",
      "Backup, High Availability & Disaster Recovery",
      "Azure Data Factory (ETL/ELT Pipelines)",
      "Agile/Scrum, Kanban & the SDLC",
      "Version Control (Git/GitHub)",
    ],
    sections: [
      {
        heading: "Training",
        entries: [
          {
            left: "Lifting the Veil IT Academy — Apprenticeship Program",
            right: "Jan 2026 – Jun 2026",
            sub: "Azure Database Engineer Track (Job Ready) · Atlanta, GA",
            bullets: [
              "Completed an intensive, project-based apprenticeship covering T-SQL development, Azure cloud fundamentals, Azure SQL database administration, and Azure Data Factory, using hands-on assignments built against a real relational database and real Azure resources.",
              "Wrote T-SQL ranging from filtering, sorting, and multi-table joins (INNER, LEFT, RIGHT, FULL OUTER, CROSS, SELF, CROSS/OUTER APPLY) to advanced patterns — correlated and multi-value subqueries, Common Table Expressions (CTEs) including recursive CTEs, PIVOT/UNPIVOT, window and ranking functions (ROW_NUMBER, RANK, DENSE_RANK, NTILE, OVER/PARTITION BY), and the MERGE statement.",
              "Built stored procedures, views, and dynamic SQL, and used transactions (BEGIN/COMMIT/ROLLBACK), TRY/CATCH error handling, and an understanding of locking, blocking, and ACID properties to write concurrency-safe T-SQL.",
              "Applied database design fundamentals — primary/foreign keys, constraints, one-to-one/one-to-many/many-to-many relationships, and normalization (1NF–3NF) — and tuned query performance by reading execution plans (scans vs. seeks), writing SARGable WHERE clauses, and choosing clustered vs. nonclustered and filtered indexes.",
              "Learned core Azure concepts — IaaS/PaaS/SaaS, regions and availability zones, subscriptions and resource groups, Microsoft Entra ID, Azure Monitor, governance (policies, tags, management groups), and cost management — and used the Azure Portal, Azure CLI, and an introduction to ARM/Bicep, toward the AZ-900 exam.",
              "Deployed and configured Azure SQL across all three real-world topologies — Azure SQL Database, Azure SQL Managed Instance, and SQL Server on an Azure VM — choosing between DTU and vCore purchasing models, serverless vs. provisioned compute, and elastic pools based on the workload.",
              "Secured Azure SQL environments end to end: Microsoft Entra ID authentication alongside SQL authentication, logins/users/roles and the principle of least privilege, GRANT/DENY/REVOKE, firewalls, virtual networks, and private endpoints, plus Transparent Data Encryption, Always Encrypted, Dynamic Data Masking, Row-Level Security, and SQL Auditing.",
              "Monitored and tuned live Azure SQL databases with Azure Monitor metrics and alerts, dynamic management views (DMVs), Extended Events, and Query Store's regressed-queries view, and used index/statistics maintenance and DBCC CHECKDB to keep databases healthy.",
              "Built a backup and recovery strategy — full/differential/log backups, Azure SQL automated backups, point-in-time restore, and long-term retention — and designed high-availability/disaster-recovery architectures (Always On Availability Groups, Auto-Failover Groups, geo-replication) starting from business-stated RPO/RTO targets rather than picking a technology first.",
              "Automated routine DBA maintenance with SQL Server Agent jobs, alerts, and operators, and used Azure CLI/PowerShell and ARM/Bicep to administer and provision Azure SQL resources instead of relying on manual Portal clicks.",
              "Built and secured Azure Data Factory pipelines — linked services and parameterized datasets, the Copy Activity with schema-drift handling, control-flow activities (ForEach, Until, If Condition, Execute Pipeline), and mapping data flows (filter, join, aggregate, conditional split) — with managed identities, Key Vault, RBAC, and Git integration, scheduled with triggers and monitored through the Monitor hub and Log Analytics.",
              "Completed a real-world capstone project — inheriting three production databases for a fictional regional trucking and dispatch company with no disaster recovery, unaudited security, and a recurring morning performance problem — and justified a migration, security, performance, and HA/DR plan against the business's own stated requirements, the same reasoning the course's DP-300 exam review and interview preparation then tested directly.",
              "Practiced the full software delivery lifecycle — Agile/Scrum sprints, Kanban boards, Dev/QA/UAT/Production environments, and release notes — through a Scrum/Kanban-based project simulation, and learned version control with Git (repositories, commits, branches, remotes, pull requests, .gitignore) as part of how a real IT team ships a change.",
            ],
          },
          { left: "Microsoft DP-300: Administering Microsoft Azure SQL Solutions", right: "Exam scheduled" },
        ],
      },
      {
        heading: "Projects",
        entries: [
          {
            left: "Meridian Fleet Logistics — Azure SQL Migration & Modernization Project",
            right: "2026",
            sub: "Lifting the Veil IT Academy, Azure Database Engineer Apprenticeship Program",
            bullets: [
              "Inherited a single on-prem SQL Server 2016 instance running three production databases for a 2,200-truck trucking and dispatch operation, with no HA/DR of any kind and a dispatch query that timed out every morning during the 7-9 AM route-planning window.",
              "Selected Azure SQL Managed Instance for the two databases that depended on cross-database queries and SQL Server Agent jobs, and Azure SQL Database (Hyperscale) for the single fast-growing, append-heavy telemetry database — choosing two different deployment targets for two different workloads instead of a one-size-fits-all migration.",
              "Replaced a single shared SQL login exposing driver SSNs and license numbers with Microsoft Entra ID authentication and least-privilege database roles, applied Always Encrypted to the sensitive columns and Dynamic Data Masking for support staff, moved both databases onto a private endpoint inside a VNET, and turned on SQL Auditing.",
              "Planned an online migration using Azure Database Migration Service to keep the 7-9 AM dispatch window serving traffic throughout the cutover, and validated the result with row-count/checksum comparisons and a smoke test of the specific query that had been timing out.",
              "Diagnosed the recurring dispatch timeout using a performance baseline and Query Store's regressed-queries view to tell a query-plan regression apart from a compute-capacity ceiling, and designed a date-partitioning and data-compression strategy for the fast-growing telemetry table before it became a much larger problem.",
              "Designed a disaster-recovery architecture — Auto-Failover Groups and geo-redundant backup storage — directly from a stated 15-minute RPO and 1-hour RTO, and defined a post-failover validation checklist (DBCC CHECKDB, row-count/checksum comparison, listener-endpoint connectivity, end-to-end timing) instead of assuming a successful reconnect meant the system was actually recovered.",
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
      "Azure Database Engineer trained through an advanced, two-stage apprenticeship covering T-SQL, Azure SQL " +
      "administration, and Azure Data Factory, plus PowerShell automation, Infrastructure as Code, and Git/GitHub/CI-CD " +
      "on top of them. Comfortable scripting routine DBA maintenance across a fleet of servers, provisioning Azure SQL " +
      "environments as reviewable code instead of Portal clicks, and shipping an infrastructure change through a real " +
      "pull request and CI/CD gate. Looking to bring that administration-plus-automation approach to a Database " +
      "Engineer, Senior DBA, or Azure Database Engineer role.",
    skills: [
      "T-SQL Querying & Database Design",
      "Azure SQL Deployment (Database, Managed Instance, VM)",
      "Database Security (Entra ID, TDE, Always Encrypted, Row-Level Security)",
      "Performance Tuning & Query Optimization",
      "Monitoring & Automation (Azure Monitor, DMVs, SQL Server Agent)",
      "Backup, High Availability & Disaster Recovery",
      "Azure Data Factory (ETL/ELT Pipelines)",
      "PowerShell Scripting & Automation (dbatools)",
      "Infrastructure as Code (Terraform, Bicep, ARM)",
      "Git/GitHub Version Control & Code Review",
      "CI/CD Pipelines (GitHub Actions)",
      "Agile/Scrum, Kanban & the SDLC",
    ],
    tools: "SSMS, Azure Data Studio, Azure Portal, Azure CLI, PowerShell & dbatools, Terraform, Bicep, GitHub Actions, Git",
    sections: [
      {
        heading: "Training & Certifications",
        entries: [
          {
            left: "Lifting the Veil IT Academy — Apprenticeship Program",
            right: "Jan 2026 – Jun 2026",
            sub: "Azure Database Engineer Track (Job Ready) + PowerShell, IaC & Git/CI-CD Specialization (Advanced) · Atlanta, GA",
            bullets: [
              "Completed an intensive, project-based apprenticeship covering T-SQL development, Azure cloud fundamentals, Azure SQL database administration, Azure Data Factory, PowerShell automation, Infrastructure as Code, and Git/GitHub/CI-CD, using hands-on assignments built against a real relational database and real Azure resources.",
              "Wrote T-SQL ranging from filtering, sorting, and multi-table joins to advanced patterns — correlated and multi-value subqueries, CTEs including recursive CTEs, PIVOT/UNPIVOT, window and ranking functions (ROW_NUMBER, RANK, DENSE_RANK, NTILE, OVER/PARTITION BY), and the MERGE statement — plus stored procedures, dynamic SQL, transactions, and TRY/CATCH error handling.",
              "Applied database design fundamentals and normalization, and tuned query performance by reading execution plans, writing SARGable WHERE clauses, and choosing clustered vs. nonclustered and filtered indexes.",
              "Deployed and configured Azure SQL across Azure SQL Database, Azure SQL Managed Instance, and SQL Server on an Azure VM, and secured those environments with Microsoft Entra ID authentication, least-privilege roles, firewalls, private endpoints, Transparent Data Encryption, Always Encrypted, Dynamic Data Masking, Row-Level Security, and SQL Auditing.",
              "Monitored and tuned live Azure SQL databases with Azure Monitor, DMVs, Extended Events, and Query Store, built a backup and recovery strategy (automated backups, point-in-time restore, long-term retention), and designed HA/DR architectures (Always On Availability Groups, Auto-Failover Groups, geo-replication) from stated RPO/RTO targets.",
              "Built and secured Azure Data Factory pipelines — linked services, the Copy Activity, control-flow activities, and mapping data flows — with managed identities, Key Vault, RBAC, and Git integration, scheduled and monitored in production.",
              "Wrote PowerShell scripts using variables, the pipeline, Where-Object/Select-Object/ForEach-Object, functions, and loops, and used the dbatools module's Invoke-DbaQuery cmdlet to run real T-SQL against multiple SQL Server instances from one script instead of opening SSMS against each one by hand.",
              "Built a realistic backup-age-checking script (Test-BackupAge) combining a function, dbatools, and foreach loops to flag databases with no recent backup across a list of servers, then safely read and modified an existing script — adding Try/Catch error handling so one unreachable server didn't stop the rest, plus file logging — without breaking what already worked.",
              "Connected to Azure from PowerShell with Connect-AzAccount and used Azure Cloud Shell, and combined Azure CLI/PowerShell with ARM templates and Bicep to automate Azure SQL administration and provisioning tasks that used to be manual Portal clicks.",
              "Declared Azure resources — including a complete Azure SQL logical server and database, with admin credentials passed as a secure parameter and never hardcoded — as Terraform and Bicep code, used a remote Terraform state backend from the start, reviewed a terraform plan diff before every apply, and provisioned a resource group, storage account, event hub, and Fabric capacity together through a reusable Terraform module in a capstone project.",
              "Used Git for version control — repositories, branches, pull requests, code review, and a committed .gitignore — and built a real GitHub Actions CI/CD pipeline: an automated check on every pull request, a required human-approval gate before a production deploy job, and cloud credentials stored as GitHub Actions secrets instead of in code; applied that same pattern to running terraform plan automatically on every infrastructure pull request.",
              "Practiced the full software delivery lifecycle — Agile/Scrum sprints, Kanban boards, Dev/QA/UAT/Production environments, and release notes — through a Scrum/Kanban-based project simulation, from a business request through requirements, build, test, and release.",
            ],
          },
          { left: "Microsoft DP-300: Administering Microsoft Azure SQL Solutions", right: "Exam scheduled" },
        ],
      },
      {
        heading: "Projects",
        entries: [
          {
            left: "Meridian Fleet Logistics — Azure SQL Migration & Modernization Project",
            right: "2026",
            sub: "Lifting the Veil IT Academy, Azure Database Engineer Apprenticeship Program",
            bullets: [
              "Inherited a single on-prem SQL Server 2016 instance running three production databases for a 2,200-truck trucking and dispatch operation, with no HA/DR of any kind and a dispatch query that timed out every morning during the 7-9 AM route-planning window.",
              "Selected Azure SQL Managed Instance for the two databases that depended on cross-database queries and SQL Server Agent jobs, and Azure SQL Database (Hyperscale) for the single fast-growing, append-heavy telemetry database.",
              "Replaced a single shared SQL login exposing driver SSNs and license numbers with Microsoft Entra ID authentication, Always Encrypted on the sensitive columns, Dynamic Data Masking for support staff, a private endpoint inside a VNET, and SQL Auditing.",
              "Diagnosed the recurring dispatch timeout with a performance baseline and Query Store, designed a date-partitioning and data-compression strategy for the telemetry table, and matched a disaster-recovery architecture (Auto-Failover Groups, geo-redundant backups) to a stated 15-minute RPO and 1-hour RTO.",
              "Replaced years of unaudited manual maintenance with scheduled SQL Server Agent/Elastic Jobs, alerts and operators, and defined the environment's configuration as Bicep infrastructure-as-code, so it could be rebuilt or audited from a file instead of manual Portal clicks.",
            ],
          },
        ],
      },
      {
        heading: "GitHub Portfolio",
        entries: [
          {
            left: "github.com/johndoe-biexample/azure-sql-iac-pipeline",
            right: "2026",
            sub: "Public portfolio repository — Azure SQL infrastructure as code with a real CI/CD gate",
            bullets: [
              "Committed a Bicep configuration deploying an Azure SQL logical server and database — admin credentials passed as a secure parameter, never hardcoded — alongside a Terraform configuration using a remote state backend, to a Git repository with a .gitignore excluding local state and credentials.",
              "Built a GitHub Actions workflow that runs terraform plan automatically on every pull request so the computed diff is visible in review, gated a second deploy job to run only on a push to main behind a required human-approval environment, and stored the Azure credentials as GitHub Actions secrets instead of in the repository.",
              "Wrote a README documenting the two deployment paths, and opened at least one pull request with real review comments before merging — walking through the repository in the order config → pull request/review → workflow file → plan output → gated deploy, the same order used to present it in an interview.",
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
