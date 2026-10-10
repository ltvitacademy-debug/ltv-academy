import type { PathResumes } from "../sampleResumeTypes";

const CONTACT = ["Atlanta, GA", "(404) 555-0182", "john.doe@example.com", "linkedin.com/in/johndoe-biexample"];

export const RESUMES: PathResumes = {
  "job-ready": {
    levelLabel: "Job Ready",
    name: "John Doe",
    contact: CONTACT,
    summary:
      "SQL Server Database Administrator trained through a hands-on apprenticeship that moved from writing T-SQL to " +
      "using it like a DBA — diagnosing, monitoring, and fixing SQL Server — before building real on-prem " +
      "administration skills: installation and configuration, security, backup and recovery, maintenance automation, " +
      "and production support. Bringing a full diagnostic toolkit and a real server-remediation project to a " +
      "Database Administrator or SQL Developer role.",
    skills: [
      "T-SQL Development & Advanced Querying",
      "SQL Server Installation, Configuration & Architecture",
      "DBA Diagnostics (DMVs, Wait Statistics, Blocking & Deadlocks)",
      "Backup, Restore & Point-in-Time Recovery",
      "Security Administration (Logins, Roles, Permissions, Auditing)",
      "SQL Server Agent Automation & Maintenance Jobs",
      "Database Design & Data Warehousing Concepts",
      "Production Support & Incident Response",
      "Version Control (Git/GitHub)",
    ],
    sections: [
      {
        heading: "Training",
        entries: [
          {
            left: "Lifting the Veil IT Academy — Apprenticeship Program",
            right: "Jan 2026 – Jun 2026",
            sub: "SQL Server Database Administrator Track (Job Ready) · Atlanta, GA",
            bullets: [
              "Completed an intensive, project-based apprenticeship moving from writing T-SQL to administering SQL Server as a DBA — advanced querying, database design and data warehousing concepts, DBA diagnostics, and real on-prem SQL Server administration.",
              "Wrote T-SQL across the full range used on the job: joins (inner, outer, cross, self, APPLY), grouping and aggregation, subqueries and correlated subqueries, CTEs (including recursive), views, PIVOT/UNPIVOT, stored procedures, dynamic SQL, the MERGE statement, transactions with TRY/CATCH, and window/ranking functions (ROW_NUMBER, RANK, DENSE_RANK, NTILE, OVER/PARTITION BY).",
              "Designed relational schemas — primary/foreign keys, constraints, one-to-one/one-to-many/many-to-many relationships, and normalization through 3NF — and learned data warehousing fundamentals: OLTP vs. OLAP, star and snowflake schemas, slowly changing dimensions, and surrogate vs. natural keys.",
              "Tuned T-SQL for performance by reading execution plans (scans vs. seeks), rewriting non-SARGable WHERE clauses, choosing clustered vs. nonclustered indexes with included and filtered columns, and avoiding common query anti-patterns.",
              "Diagnosed SQL Server the way a DBA does rather than a developer: queried system catalog views and DMVs/DMFs to monitor CPU, memory, and I/O; found blocking chains and investigated deadlocks; and identified missing, unused, and duplicate indexes.",
              "Took, verified, and restored backups — BACKUP DATABASE/BACKUP LOG, full/differential/point-in-time restore sequences, and RESTORE VERIFYONLY — and ran DBCC CHECKDB to catch consistency errors before they became incidents.",
              "Administered SQL Server security end to end — logins, users, roles, and permissions; GRANT/DENY/REVOKE; finding orphaned users; and auditing access — plus SQL Server Agent job creation, scheduling, alerts, and troubleshooting failed jobs.",
              "Installed, configured, and secured SQL Server on-prem — storage engine and memory architecture, instance and server-level settings, collations, service accounts, file/filegroup design, recovery models, and TempDB configuration — and automated maintenance (index, statistics, backup, and integrity-check jobs) using the Ola Hallengren scripts that are the industry standard.",
              "Practiced production-support skills — triage methodology, escalation and communication, on-call basics, and incident documentation — plus version control and deployment practices for database objects, including recovering from schema drift and rolling back a bad deployment.",
              "Built a reusable, version-controlled DBA diagnostic toolkit (server health check, backup/job status, and blocking/long-running query scripts) and completed a capstone remediating an inherited, unmanaged production SQL Server environment.",
              "Practiced the shared professional foundation every IT role needs — Agile/Scrum/Kanban, the SDLC (Dev/QA/UAT/Production), release and CI/CD concepts, and version control with Git (repositories, commits, branches, remotes, pull requests, .gitignore) — through a full project simulation from business request to release.",
            ],
          },
        ],
      },
      {
        heading: "Projects",
        entries: [
          {
            left: "Production SQL Server Remediation — Capstone Project",
            right: "2026",
            sub: "Lifting the Veil IT Academy, SQL Server Database Administrator Apprenticeship Program",
            bullets: [
              "Inherited a six-year-old, unmanaged production SQL Server instance (MERSQL01) running a regional trucking company's dispatch database (DispatchDB), and ran a first-week discovery pass instead of guessing — querying sys.databases, sys.master_files, sys.dm_os_sys_info, and msdb.dbo.sysjobs to document the server's actual state.",
              "Found and documented critical gaps: a shared sa login used in plaintext by the application, a 210 GB transaction log with no log backups ever run despite the database being in FULL recovery, a single 8 MB tempdb file, zero maintenance jobs, and no change history for schema edits made directly against production.",
              "Closed the backup exposure first — implementing full and transaction log backups aligned to the database's recovery model so point-in-time recovery actually became possible — then replaced the shared sa login with least-privilege accounts and stood up SQL Server Agent maintenance jobs where none had existed.",
              "Documented the remediation as a prioritized plan — stabilizing architecture and configuration first, then security, then maintenance automation — and presented it the way a real handoff to a manager would require.",
            ],
          },
        ],
      },
      {
        heading: "GitHub Portfolio",
        entries: [
          {
            left: "github.com/johndoe-biexample/sql-server-dba-toolkit",
            right: "2026",
            sub: "Public portfolio repository for the DBA diagnostic toolkit and capstone remediation plan",
            bullets: [
              "Initialized a Git repository for the DBA toolkit, organizing scripts into health/, backups-and-jobs/, and incident-response/ folders with a README indexing what each script does and when to run it.",
              "Used git add/commit/push with descriptive commit messages — noting why a script changed, not just what changed — and a \"Last verified\" convention so the commit history records exactly when each script was re-tested against a SQL Server version.",
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
  "advanced-sql-server": {
    levelLabel: "Advanced SQL Server",
    name: "John Doe",
    contact: CONTACT,
    summary:
      "SQL Server Database Administrator trained through an advanced, multi-stage apprenticeship covering on-prem " +
      "administration, performance tuning as its own discipline, high availability and disaster recovery, Azure SQL " +
      "administration toward the DP-300, and PowerShell/DevOps automation for databases. Comfortable owning a SQL " +
      "Server estate end to end — installed and secured on-prem, tuned under real load, protected by HA/DR, migrated " +
      "to Azure, and automated with CI/CD instead of manual scripts and emailed change requests. Bringing that full " +
      "range to a Database Administrator, Azure Database Administrator, or Database Engineer role.",
    skills: [
      "T-SQL Development & SQL Server Administration",
      "Performance Tuning (Execution Plans, Index Design, Wait Statistics, Query Store)",
      "High Availability & Disaster Recovery (Always On AGs, FCI, Log Shipping, Replication)",
      "Azure SQL Administration (Managed Instance, SQL Database, DP-300 scope)",
      "Azure SQL Security (Entra ID, TDE, Always Encrypted, Dynamic Data Masking, Row-Level Security)",
      "PowerShell & dbatools Automation",
      "CI/CD & Version Control for Databases (SSDT, Git, Azure DevOps Pipelines)",
      "Infrastructure as Code (ARM/Bicep)",
      "Monitoring, Alerting & Incident Response",
    ],
    tools:
      "SSMS, Azure Data Studio, Azure Portal, Azure CLI, PowerShell & dbatools, SSDT, Query Store, Always On " +
      "Availability Groups, Azure DevOps (Repos & Pipelines), Git",
    sections: [
      {
        heading: "Training & Certifications",
        entries: [
          {
            left: "Lifting the Veil IT Academy — Apprenticeship Program",
            right: "Jan 2026 – Feb 2027",
            sub: "SQL Server Database Administrator Track (Job Ready + Advanced SQL Server) · Atlanta, GA",
            bullets: [
              "Completed an intensive, project-based apprenticeship moving from writing T-SQL to administering SQL Server as a DBA — advanced querying, database design and data warehousing concepts, DBA diagnostics, and real on-prem SQL Server administration.",
              "Wrote T-SQL across the full range used on the job: joins, subqueries and CTEs (including recursive), views, stored procedures, dynamic SQL, transactions with TRY/CATCH, and window/ranking functions (ROW_NUMBER, RANK, DENSE_RANK, NTILE, OVER/PARTITION BY).",
              "Designed relational schemas (keys, constraints, 1NF–3NF normalization, table relationships) and dimensional warehouses (star/snowflake schema, slowly changing dimensions, surrogate keys, OLTP vs. OLAP).",
              "Diagnosed SQL Server using system catalog views and DMVs/DMFs — monitoring CPU/memory/I/O, finding blocking chains and deadlocks, and identifying missing/unused/duplicate indexes — then took, verified, and restored backups (BACKUP DATABASE/LOG, point-in-time recovery, RESTORE VERIFYONLY) and ran DBCC CHECKDB.",
              "Administered SQL Server security (logins, roles, GRANT/DENY/REVOKE, orphaned-user audits) and SQL Server Agent jobs end to end, and installed/configured/secured SQL Server on-prem — storage engine and memory architecture, instance settings, recovery models, TempDB, encryption basics, and the Ola Hallengren maintenance scripts.",
              "Practiced production-support skills (triage methodology, escalation, on-call, incident documentation) and database version control/deployment practices, including recovering from schema drift and rolling back a bad deployment.",
              "Built a reusable, version-controlled DBA diagnostic toolkit and completed a capstone remediating an inherited, unmanaged production SQL Server environment with real security, backup, and maintenance gaps.",
              "Practiced the shared professional foundation every IT role needs — Agile/Scrum/Kanban, the SDLC, release/CI-CD concepts, and Git version control (repositories, commits, branches, remotes, pull requests) — through a full project simulation.",
              "Took performance tuning further as its own discipline — parameter sniffing and plan cache internals, covering/filtered/columnstore indexes, wait-statistics methodology (CPU, I/O, memory, and tempdb contention), memory grants, and Query Store (regressed-query workflows, plan forcing, automatic plan correction).",
              "Tuned server-level configuration (MAXDOP, cost threshold for parallelism, instance settings) and built monitoring baselines and alerting for performance degradation.",
              "Diagnosed and fixed a real slow-production-database scenario end to end — gathering a performance baseline, reading the actual execution plan, identifying a Key-Lookup bottleneck on a 14-million-row table, designing and deploying a single covering index to fix it, retiring the now-redundant index it replaced, and validating and documenting the result.",
              "Designed on-prem high availability and disaster recovery — Always On Availability Groups (synchronous/asynchronous replicas, listener configuration, manual/automatic failover), Failover Cluster Instances, log shipping, and transactional replication — choosing the right technology against stated RPO/RTO numbers rather than by default.",
              "Built a complete HA/DR solution for a real scenario: a single Always On Availability Group with a synchronous local replica (the HA leg) and an asynchronous remote replica (the DR leg) meeting a stated 5-minute RPO and a 15-minute local / 4-hour site-loss RTO, then simulated a failover and a full disaster recovery and documented the runbook.",
              "Administered SQL Server in Azure toward the DP-300 — Azure SQL Database vs. Managed Instance vs. SQL Server on an Azure VM, DTU vs. vCore sizing, Microsoft Entra ID authentication, and Azure SQL security (TDE, Always Encrypted, Dynamic Data Masking, Row-Level Security, SQL Auditing).",
              "Monitored and tuned Azure SQL with Azure Monitor, DMVs, Extended Events, and Query Store; automated Azure SQL administration with Azure CLI, PowerShell, and ARM/Bicep templates; and planned an online SQL Server-to-Azure migration with post-migration row-count/checksum validation.",
              "Completed a real-world Azure DBA project — choosing different deployment targets for different workloads on the same inherited server (Managed Instance for cross-database/Agent-dependent databases, Hyperscale for a single fast-growing table), replacing a shared login with least-privilege Entra ID roles plus Always Encrypted on sensitive columns, migrating online during a no-downtime window, and designing Auto-Failover Groups to meet a stated 15-minute RPO / 1-hour RTO.",
              "Automated DBA work with PowerShell and dbatools — scripting backups, health checks, and index/statistics maintenance with proper error handling — and scheduled those scripts instead of running them by hand.",
              "Applied real version control and CI/CD practices to database code specifically: trunk-based vs. feature-branch strategies for schema changes, database projects and schema comparison, code review for database changes, and a full CI/CD pipeline (build → deploy to test → gated deploy to production) using SSDT, .dacpac packages, and SqlPackage.exe.",
              "Built a complete DevOps capstone automating a DBA's entire manual routine — PowerShell backup/health-check/maintenance scripts, a Git-based source-controlled database project with pull requests and an approval-gated Azure Pipelines deployment, and severity-routed alerting tuned to stop paging for conditions that resolve themselves.",
            ],
          },
          { left: "Microsoft DP-300: Administering Microsoft Azure SQL Solutions", right: "Exam scheduled" },
        ],
      },
      {
        heading: "Projects",
        entries: [
          {
            left: "Production SQL Server Remediation — Capstone Project",
            right: "2026",
            sub: "Lifting the Veil IT Academy, SQL Server Database Administrator Apprenticeship Program",
            bullets: [
              "Inherited a six-year-old, unmanaged production SQL Server instance (MERSQL01) and ran a discovery pass that found a plaintext shared sa login, a 210 GB transaction log with no log backups ever run, zero maintenance jobs, and no schema change history.",
              "Closed the backup exposure first, replaced the shared login with least-privilege accounts, stood up SQL Server Agent maintenance jobs, and documented the remediation as a prioritized, presentable plan.",
            ],
          },
          {
            left: "Production Performance Tuning — Capstone Project",
            right: "2026",
            sub: "Lifting the Veil IT Academy, SQL Server Performance Tuning Course",
            bullets: [
              "Diagnosed an intermittent timeout on a customer-service lookup screen backed by a 14-million-row Orders table, gathering a real baseline instead of guessing at a fix.",
              "Read the actual execution plan to isolate a Key Lookup scaling with order count, designed a single covering nonclustered index (key columns matching the filter and sort, INCLUDE columns for the rest of the SELECT) to eliminate it, and dropped the narrower index it superseded so writes weren't taxed by a redundant index.",
              "Validated the fix against the original baseline and documented the before/after findings the way a real production incident report would require.",
            ],
          },
          {
            left: "High Availability & Disaster Recovery Design — Capstone Project",
            right: "2026",
            sub: "Lifting the Veil IT Academy, SQL Server HA, Backup & Disaster Recovery Course",
            bullets: [
              "Designed an HA/DR architecture for a regional logistics company's dispatch and billing database against business-stated numbers: no more than 5 minutes of data loss, 15 minutes of downtime for a local failure, and 4 hours for a full site loss.",
              "Specified a single Always On Availability Group with a synchronous-commit, automatic-failover local replica and an asynchronous-commit, manual-failover remote replica — ruling out a Failover Cluster Instance (no shared storage spanning sites) and log shipping alone (lag too high for the local RTO).",
              "Implemented the backup strategy underneath the Availability Group, simulated a local failover and a full regional disaster recovery, and wrote the resulting runbook.",
            ],
          },
          {
            left: "Azure SQL Migration, Security & HA/DR — Real-World DBA Project",
            right: "2026",
            sub: "Lifting the Veil IT Academy, Azure Database Administrator Course",
            bullets: [
              "Took over a fictional logistics company's single on-prem SQL Server hosting three databases with no HA/DR, a years-unreviewed shared login guarding driver SSNs and license numbers, and a dispatch query that timed out every morning during peak hours.",
              "Migrated two cross-database/Agent-dependent databases to Azure SQL Managed Instance and a single fast-growing telemetry table to Azure SQL Database Hyperscale, justifying each target by its actual workload rather than a single default choice.",
              "Replaced the shared login with Microsoft Entra ID authentication and least-privilege roles, applied Always Encrypted to SSN/license columns and Dynamic Data Masking for support staff, and moved both databases behind a private endpoint with SQL Auditing enabled.",
              "Migrated the dispatch database online, with no maintenance-window downtime, and designed Auto-Failover Groups to meet a stated 15-minute RPO and 1-hour RTO for a full regional outage.",
            ],
          },
          {
            left: "DBA Automation & CI/CD Pipeline — Capstone Project",
            right: "2026",
            sub: "Lifting the Veil IT Academy, PowerShell, Automation & DevOps for DBAs Course",
            bullets: [
              "Automated a single-DBA e-commerce company's three riskiest manual habits — nightly backups done by hand, a 40-minute manual morning health check, and schema changes deployed by email.",
              "Built a PowerShell/dbatools automation suite (automated backup-and-verify, health check, and index/statistics maintenance scripts, each with error handling and alerting on failure) and scheduled it to replace the manual routine entirely.",
              "Moved schema changes into a Git-backed SSDT database project with pull requests and code review, and built an Azure Pipelines CI/CD pipeline that builds a .dacpac, deploys it to test automatically, and only reaches production after a human approves the change.",
              "Added severity-routed alerting (Teams for warnings, phone paging only for sustained critical conditions) that cut nightly false pages from an almost-nightly occurrence to roughly one real page every couple of weeks.",
            ],
          },
        ],
      },
      {
        heading: "GitHub Portfolio",
        entries: [
          {
            left: "github.com/johndoe-biexample/sql-server-dba-toolkit",
            right: "2026",
            sub: "Public portfolio repository for the DBA diagnostic toolkit and capstone remediation plan",
            bullets: [
              "Initialized a Git repository for the DBA toolkit, organizing scripts into health/, backups-and-jobs/, and incident-response/ folders with a README indexing what each script does and when to run it.",
              "Used git add/commit/push with descriptive commit messages and a \"Last verified\" convention so the commit history records exactly when each script was re-tested against a SQL Server version.",
            ],
          },
          {
            left: "github.com/johndoe-biexample/dba-automation-pipeline",
            right: "2026",
            sub: "Public portfolio repository for the DBA automation suite and CI/CD pipeline",
            bullets: [
              "Published the PowerShell automation suite alongside an SSDT database project (.sqlproj) and an azure-pipelines.yml file, so the backup/health-check/maintenance scripts and the schema-change pipeline both live as readable, reviewable code.",
              "Used trunk-based development with short-lived feature branches and pull requests for schema changes, and documented the build → deploy-to-test → approval-gated deploy-to-production flow in the README so a reviewer can follow the pipeline without running it.",
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
  "multi-platform-databases": {
    levelLabel: "Multi-Platform Databases",
    name: "John Doe",
    contact: CONTACT,
    summary:
      "SQL Server Database Administrator with the full senior DBA skill set — on-prem administration, performance " +
      "tuning, high availability and disaster recovery, Azure SQL administration toward the DP-300, and PowerShell/" +
      "DevOps automation — plus real, hands-on exposure to the other database platforms every senior DBA eventually " +
      "runs into: Oracle, MySQL, and PostgreSQL on the relational side, and MongoDB, Azure Cosmos DB, and Neo4j on " +
      "the NoSQL side. Bringing that cross-platform judgment to a Database Administrator, Database Engineer, or " +
      "Principal Database Engineer role.",
    skills: [
      "T-SQL Development & SQL Server Administration",
      "Performance Tuning (Execution Plans, Index Design, Wait Statistics, Query Store)",
      "High Availability & Disaster Recovery (Always On AGs, FCI, Log Shipping, Replication)",
      "Azure SQL Administration & Security (DP-300 scope)",
      "PowerShell/dbatools Automation & CI/CD for Databases",
      "Cross-Platform RDBMS Administration (Oracle, MySQL, PostgreSQL)",
      "NoSQL & Graph Databases (MongoDB, Azure Cosmos DB, Neo4j)",
      "Polyglot Persistence & Data Platform Selection",
    ],
    tools:
      "SSMS, Azure Data Studio, Azure Portal, PowerShell & dbatools, SSDT, Azure DevOps, Git, Oracle SQL*Plus/SQL " +
      "Developer & RMAN, MySQL Workbench & Percona XtraBackup, psql/pgAdmin & pg_basebackup, MongoDB Compass/" +
      "mongosh, Neo4j Browser & Cypher, Azure Cosmos DB SDK",
    sections: [
      {
        heading: "Training & Certifications",
        entries: [
          {
            left: "Lifting the Veil IT Academy — Apprenticeship Program",
            right: "Jan 2026 – Jun 2027",
            sub: "SQL Server Database Administrator Track (all stages) · Atlanta, GA",
            bullets: [
              "Completed a full, project-based apprenticeship covering T-SQL development, on-prem SQL Server administration, performance tuning, high availability and disaster recovery, Azure SQL administration toward the DP-300, PowerShell/DevOps automation for databases, and multi-platform database administration.",
              "Administered SQL Server end to end on-prem — installation, configuration, security, backup/restore, maintenance automation, production support, and incident response — and diagnosed it like a DBA using DMVs, wait statistics, and blocking/deadlock analysis.",
              "Tuned SQL Server performance as its own discipline (execution plans, covering/filtered/columnstore indexes, wait-stat methodology, Query Store) and fixed a real Key-Lookup bottleneck on a 14-million-row production table with a single, validated index change.",
              "Designed and implemented on-prem high availability and disaster recovery (Always On Availability Groups, Failover Cluster Instances, log shipping, replication) against stated RPO/RTO numbers, including a simulated failover and a documented disaster-recovery runbook.",
              "Administered and secured SQL Server in Azure toward the DP-300 (Managed Instance, SQL Database, Entra ID authentication, TDE, Always Encrypted, Dynamic Data Masking) and completed a real-world Azure DBA project covering migration, security remediation, and Auto-Failover Groups.",
              "Automated DBA work with PowerShell and dbatools, and applied real CI/CD practices to database schema changes — Git-based source control, pull requests, and an SSDT/.dacpac pipeline gated by human approval before production.",
              "Built a reusable, version-controlled DBA diagnostic toolkit and a separate DBA automation/CI/CD pipeline, both published as GitHub portfolio repositories.",
              "Applied SQL Server DBA instincts to three additional relational platforms: Oracle (instance/SGA/PGA architecture, RMAN backups, AWR/ASH diagnostics, Data Guard, GoldenGate replication), MySQL (InnoDB vs. MyISAM, mysqldump and Percona XtraBackup, source-replica replication and InnoDB Cluster), and PostgreSQL (roles and row-level security, pg_dump/pg_basebackup and WAL archiving, VACUUM/autovacuum, streaming and logical replication).",
              "Completed a real multi-platform project standing up Oracle, MySQL, and PostgreSQL side by side in a Docker lab, securing each with a least-privilege role scoped to its actual application, and implementing a distinct, appropriate backup strategy per platform (RMAN, mysqldump plus XtraBackup, pg_dump plus pg_basebackup/WAL archiving).",
              "Diagnosed slow-performance incidents on all three platforms using the same measure-identify-change-verify discipline learned on SQL Server, adapted to each platform's own tools — Oracle execution plans and the cost-based optimizer, MySQL EXPLAIN and the Performance Schema, PostgreSQL EXPLAIN ANALYZE and pg_stat_statements.",
              "Learned NoSQL and graph data modeling beyond the relational world — MongoDB documents, collections, and the aggregation pipeline; Azure Cosmos DB's multi-model APIs, partitioning, and consistency levels; and Neo4j's Cypher query language and graph data science algorithms (shortest path, PageRank, community detection).",
              "Matched real business problems to the right non-relational platform rather than defaulting to SQL Server — modeling an uneven, 40,000-SKU product catalog in MongoDB, a \"customers who bought this\" recommendation and fraud-ring-detection graph in Neo4j, and multi-region cart/session state in Cosmos DB under session consistency.",
              "Designed a polyglot-persistence architecture connecting MongoDB, Cosmos DB, and Neo4j in one production request path via event-driven sync rather than live cross-platform queries, and weighed its real operational cost against its performance benefit.",
            ],
          },
          { left: "Microsoft DP-300: Administering Microsoft Azure SQL Solutions", right: "Exam scheduled" },
        ],
      },
      {
        heading: "Projects",
        entries: [
          {
            left: "Production SQL Server Remediation — Capstone Project",
            right: "2026",
            sub: "Lifting the Veil IT Academy, SQL Server Database Administrator Apprenticeship Program",
            bullets: [
              "Inherited a six-year-old, unmanaged production SQL Server instance and ran a discovery pass that found a plaintext shared login, a 210 GB transaction log with no log backups ever run, and zero maintenance automation.",
              "Closed the backup exposure first, replaced the shared login with least-privilege accounts, and documented the remediation as a prioritized, presentable plan.",
            ],
          },
          {
            left: "Performance Tuning & HA/DR — Capstone Projects",
            right: "2026",
            sub: "Lifting the Veil IT Academy, SQL Server Performance Tuning + HA, Backup & Disaster Recovery Courses",
            bullets: [
              "Fixed an intermittent timeout on a 14-million-row Orders table by reading the execution plan, designing a single covering index to eliminate a scaling Key Lookup, and dropping the redundant index it replaced.",
              "Designed and implemented a single Always On Availability Group — a synchronous local replica for HA and an asynchronous remote replica for DR — meeting a stated 5-minute RPO and 15-minute/4-hour RTOs, then simulated a failover and a full disaster recovery.",
            ],
          },
          {
            left: "Azure SQL Migration, Security & HA/DR — Real-World DBA Project",
            right: "2026",
            sub: "Lifting the Veil IT Academy, Azure Database Administrator Course",
            bullets: [
              "Migrated a fictional logistics company's on-prem databases to Azure SQL Managed Instance and Azure SQL Database Hyperscale, matching each database's deployment target to its actual workload.",
              "Replaced a years-unreviewed shared login with Microsoft Entra ID least-privilege roles and Always Encrypted sensitive columns, migrated online with no downtime, and designed Auto-Failover Groups to meet a stated 15-minute RPO / 1-hour RTO.",
            ],
          },
          {
            left: "DBA Automation & CI/CD Pipeline — Capstone Project",
            right: "2026",
            sub: "Lifting the Veil IT Academy, PowerShell, Automation & DevOps for DBAs Course",
            bullets: [
              "Built a PowerShell/dbatools automation suite replacing manual nightly backups and a 40-minute manual morning health check, scheduled with error handling and alerting on failure.",
              "Moved schema changes into a Git-backed SSDT database project with pull requests and an approval-gated Azure Pipelines CI/CD pipeline, and tuned alerting to cut false nightly pages to roughly one real page every couple of weeks.",
            ],
          },
          {
            left: "Multi-Platform Database Standup — Oracle, MySQL & PostgreSQL",
            right: "2027",
            sub: "Lifting the Veil IT Academy, Cross-Platform Relational Database Administration Course",
            bullets: [
              "Stood up Oracle (finance system), MySQL (e-commerce storefront), and PostgreSQL (analytics/BI) side by side in a Docker lab for a fictional mid-size retailer, each configured for its actual role.",
              "Secured each platform with a least-privilege role scoped to its application — an Oracle role limited to the finance schema's own tables, a MySQL role restricted to the storefront schema from one host range, and a read-only PostgreSQL role for the BI team with a separate, narrower ETL role for the nightly load.",
              "Implemented a distinct, appropriate backup strategy on each platform — RMAN full-weekly-plus-incremental with ARCHIVELOG for Oracle, mysqldump nightly plus Percona XtraBackup and binary logs for MySQL, and pg_dump plus pg_basebackup/WAL archiving for PostgreSQL — and diagnosed a slow-performance incident on each using that platform's own execution-plan tooling.",
            ],
          },
          {
            left: "Polyglot NoSQL Architecture — MongoDB, Cosmos DB & Neo4j",
            right: "2027",
            sub: "Lifting the Veil IT Academy, NoSQL, Document & Graph Databases Course",
            bullets: [
              "Matched three real business problems for a fictional outdoor-gear retailer to the non-relational platform that actually fit each one: an uneven, 40,000-SKU product catalog to MongoDB's document model, a multi-hop \"customers who bought this\" recommendation and fraud-ring-detection problem to Neo4j's graph model, and multi-region cart/session state to Azure Cosmos DB under session consistency.",
              "Designed the production request path connecting all three platforms via an event-driven sync job — a purchase event published at checkout and consumed to update the recommendation graph — rather than a live cross-platform query, keeping the checkout path from depending on a fourth system's uptime.",
              "Assessed the real operational cost of running three additional platforms (three backup strategies, three security surfaces, three monitoring setups) against the performance and scalability benefit of using the right data model for each problem.",
            ],
          },
        ],
      },
      {
        heading: "GitHub Portfolio",
        entries: [
          {
            left: "github.com/johndoe-biexample/sql-server-dba-toolkit",
            right: "2026",
            sub: "Public portfolio repository for the DBA diagnostic toolkit and capstone remediation plan",
            bullets: [
              "Initialized a Git repository for the DBA toolkit, organizing scripts into health/, backups-and-jobs/, and incident-response/ folders with a README indexing what each script does and when to run it, and used commit messages and a \"Last verified\" convention to keep the history an honest record of what's actually been tested.",
            ],
          },
          {
            left: "github.com/johndoe-biexample/dba-automation-pipeline",
            right: "2026",
            sub: "Public portfolio repository for the DBA automation suite and CI/CD pipeline",
            bullets: [
              "Published the PowerShell automation suite alongside an SSDT database project and an azure-pipelines.yml file, using trunk-based development with short-lived feature branches and pull requests for schema changes, with the build → test → approval-gated production flow documented in the README.",
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
