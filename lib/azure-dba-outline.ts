// The full Azure Database Administrator course outline (DP-300 + Real-World
// Azure SQL Administration). Only lessons with a contentDir + videoUrl are
// playable; everything else renders as "in production". Assumes prior SQL
// knowledge from the T-SQL Development course elsewhere in the catalog —
// SELECT, JOINs, stored procedures, PK/FK, and indexes aren't retaught from
// scratch; they're reused immediately for administration, security,
// performance, automation, and troubleshooting.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/azure-dba/
  videoUrl?: string;
  durationLabel?: string;
};

export type ChapterMeta = { n: number; title: string; lessons: LessonMeta[] };

const L = (n: number, slug: string, title: string, extra?: Partial<LessonMeta>): LessonMeta => ({
  n,
  slug,
  title,
  ...extra,
});

export const AZURE_DBA_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Azure SQL & DBA Foundations",
    lessons: [
      L(1, "course-introduction-becoming-an-azure-dba", "Course Introduction: Becoming an Azure Database Administrator"),
      L(2, "sql-server-on-prem-vs-azure-sql", "SQL Server On-Prem vs. Azure SQL — Understanding the Ecosystem"),
      L(3, "azure-sql-database-vs-managed-instance-vs-vm", "Azure SQL Database vs. Managed Instance vs. SQL Server on Azure VM"),
      L(4, "iaas-vs-paas-for-sql-server", "IaaS vs. PaaS for SQL Server"),
      L(5, "azure-portal-ssms-and-azure-data-studio", "Azure Portal, SSMS & Azure Data Studio for DBAs"),
      L(6, "lab-build-your-first-azure-sql-environment", "Lab: Build Your First Azure SQL Environment"),
    ],
  },
  {
    n: 2,
    title: "Deploying Azure SQL",
    lessons: [
      L(7, "creating-azure-sql-servers-and-databases", "Creating Azure SQL Servers & Databases"),
      L(8, "purchasing-models-service-tiers-compute-options", "Azure SQL Purchasing Models, Service Tiers & Compute Options"),
      L(9, "dtu-vs-vcore", "DTU vs. vCore & Choosing the Right Database Configuration"),
      L(10, "serverless-provisioned-elastic-pools", "Serverless, Provisioned Compute & Elastic Pools"),
      L(11, "storage-compute-scaling-performance-configuration", "Storage, Compute Scaling & Performance Configuration"),
      L(12, "azure-sql-managed-instance-deployment", "Azure SQL Managed Instance Deployment & Configuration"),
      L(13, "sql-server-on-azure-vms-and-hybrid-sql", "SQL Server on Azure Virtual Machines & Hybrid SQL"),
    ],
  },
  {
    n: 3,
    title: "Designing & Scaling Database Resources",
    lessons: [
      L(14, "choosing-the-correct-azure-sql-solution", "Choosing the Correct Azure SQL Solution for Business Requirements"),
      L(15, "table-partitioning-and-large-database-strategies", "Table Partitioning & Large Database Strategies"),
      L(16, "data-compression-and-storage-optimization", "Data Compression & Storage Optimization"),
      L(17, "database-sharding-and-horizontal-scaling", "Database Sharding & Horizontal Scaling"),
      L(18, "azure-arc-hybrid-sql-and-fabric", "Azure Arc, Hybrid SQL & Azure SQL Database in Microsoft Fabric"),
    ],
  },
  {
    n: 4,
    title: "Authentication & Authorization",
    lessons: [
      L(19, "sql-authentication-vs-entra-authentication", "SQL Authentication vs. Microsoft Entra Authentication"),
      L(20, "configuring-entra-id-for-azure-sql", "Configuring Microsoft Entra ID for Azure SQL"),
      L(21, "logins-users-roles-security-principals", "Logins, Users, Roles & Security Principals"),
      L(22, "server-roles-database-roles-object-permissions", "Server Roles, Database Roles & Object Permissions"),
      L(23, "grant-deny-revoke", "GRANT, DENY & REVOKE"),
      L(24, "principle-of-least-privilege", "Principle of Least Privilege"),
      L(25, "troubleshooting-login-auth-permission-problems", "Troubleshooting Login, Authentication & Permission Problems"),
    ],
  },
  {
    n: 5,
    title: "Azure SQL Network Security",
    lessons: [
      L(26, "azure-sql-firewalls-and-firewall-rules", "Azure SQL Firewalls & Firewall Rules"),
      L(27, "virtual-networks-and-service-endpoints", "Virtual Networks & Service Endpoints"),
      L(28, "private-endpoints-and-private-link", "Private Endpoints & Private Link"),
      L(29, "public-vs-private-database-connectivity", "Public vs. Private Database Connectivity"),
      L(30, "troubleshooting-azure-sql-connectivity", "Troubleshooting Azure SQL Connectivity"),
    ],
  },
  {
    n: 6,
    title: "Data Security & Compliance",
    lessons: [
      L(31, "transparent-data-encryption", "Transparent Data Encryption (TDE)"),
      L(32, "always-encrypted-and-secure-enclaves", "Always Encrypted & Always Encrypted with Secure Enclaves"),
      L(33, "dynamic-data-masking", "Dynamic Data Masking"),
      L(34, "row-level-security", "Row-Level Security"),
      L(35, "data-discovery-classification-sensitive-data", "Data Discovery, Classification & Sensitive Data"),
      L(36, "sql-auditing-and-compliance-monitoring", "SQL Auditing & Compliance Monitoring"),
      L(37, "ledger-change-tracking-security-compliance-scenarios", "Ledger, Change Tracking & Security/Compliance Scenarios"),
    ],
  },
  {
    n: 7,
    title: "Monitoring Azure SQL",
    lessons: [
      L(38, "database-monitoring-and-performance-baseline", "Understanding Database Monitoring & Creating a Performance Baseline"),
      L(39, "azure-monitor-metrics-and-alerts", "Azure Monitor, Metrics & Alerts"),
      L(40, "database-watcher", "Database Watcher"),
      L(41, "dmvs-for-dbas", "Dynamic Management Views for DBAs"),
      L(42, "extended-events", "Extended Events"),
      L(43, "monitoring-sessions-cpu-memory-io-storage", "Monitoring Sessions, Connections, CPU, Memory, I/O & Storage"),
    ],
  },
  {
    n: 8,
    title: "Query Performance Tuning",
    lessons: [
      L(44, "sql-server-performance-troubleshooting-methodology", "SQL Server Performance Troubleshooting Methodology"),
      L(45, "reading-execution-plans-for-performance-problems", "Reading Execution Plans for Performance Problems"),
      L(46, "index-seeks-scans-lookups-plan-operators", "Index Seeks, Scans, Lookups & Common Plan Operators"),
      L(47, "finding-missing-duplicate-unused-indexes", "Finding Missing, Duplicate & Unused Indexes"),
      L(48, "query-store-fundamentals", "Query Store Fundamentals"),
      L(49, "using-query-store-to-find-regressed-queries", "Using Query Store to Find Regressed Queries"),
      L(50, "blocking-locking-and-deadlocks", "Blocking, Locking & Deadlocks"),
      L(51, "dmvs-for-query-performance-troubleshooting", "DMVs for Query Performance Troubleshooting"),
      L(52, "intelligent-query-processing-and-automatic-tuning", "Intelligent Query Processing & Automatic Tuning"),
    ],
  },
  {
    n: 9,
    title: "Database Performance & Maintenance",
    lessons: [
      L(53, "index-maintenance-and-fragmentation", "Index Maintenance & Fragmentation"),
      L(54, "statistics-maintenance", "Statistics Maintenance"),
      L(55, "dbcc-checkdb-and-database-integrity", "DBCC CHECKDB & Database Integrity"),
      L(56, "database-scoped-configuration-and-server-settings", "Database-Scoped Configuration & Server Settings"),
      L(57, "resource-governor", "Resource Governor"),
      L(58, "scaling-and-troubleshooting-resource-bottlenecks", "Scaling Compute/Storage & Troubleshooting Resource Bottlenecks"),
    ],
  },
  {
    n: 10,
    title: "SQL Server Agent & Automation",
    lessons: [
      L(59, "sql-server-agent-fundamentals", "SQL Server Agent Fundamentals"),
      L(60, "creating-jobs-steps-and-schedules", "Creating Jobs, Steps & Schedules"),
      L(61, "alerts-operators-and-notifications", "Alerts, Operators & Notifications"),
      L(62, "troubleshooting-failed-sql-agent-jobs", "Troubleshooting Failed SQL Agent Jobs"),
      L(63, "automating-dba-maintenance", "Automating DBA Maintenance"),
      L(64, "building-a-dba-maintenance-and-monitoring-strategy", "Building a DBA Maintenance & Monitoring Strategy"),
    ],
  },
  {
    n: 11,
    title: "Azure Automation & Infrastructure as Code",
    lessons: [
      L(65, "automating-azure-sql-administration", "Automating Azure SQL Administration"),
      L(66, "azure-cli-and-powershell-for-dbas", "Azure CLI & PowerShell for Database Administrators"),
      L(67, "arm-templates-and-bicep-for-azure-sql", "ARM Templates & Bicep for Azure SQL"),
      L(68, "elastic-jobs-and-azure-database-tasks", "Elastic Jobs & Azure Database Tasks"),
      L(69, "automated-deployment-alerts-and-troubleshooting", "Automated Deployment, Alerts & Troubleshooting"),
    ],
  },
  {
    n: 12,
    title: "Database Migration to Azure",
    lessons: [
      L(70, "planning-a-sql-server-migration-to-azure", "Planning a SQL Server Migration to Azure"),
      L(71, "assessing-sql-server-before-migration", "Assessing SQL Server Before Migration"),
      L(72, "online-vs-offline-migration-strategies", "Online vs. Offline Migration Strategies"),
      L(73, "migrating-to-azure-sql-database", "Migrating SQL Server to Azure SQL Database"),
      L(74, "migrating-to-azure-sql-managed-instance", "Migrating to Azure SQL Managed Instance"),
      L(75, "migration-troubleshooting-and-post-migration-validation", "Migration Troubleshooting & Post-Migration Validation"),
    ],
  },
  {
    n: 13,
    title: "Backup & Restore",
    lessons: [
      L(76, "backup-fundamentals-full-differential-log", "SQL Server Backup Fundamentals: Full, Differential & Log"),
      L(77, "backup-and-restore-with-ssms-and-t-sql", "Backup & Restore with SSMS and T-SQL"),
      L(78, "azure-sql-automated-backups", "Azure SQL Automated Backups"),
      L(79, "point-in-time-restore", "Point-in-Time Restore"),
      L(80, "long-term-retention-and-backup-policies", "Long-Term Retention & Backup Policies"),
      L(81, "backup-to-azure-storage-and-disaster-recovery-scenarios", "Backup to Azure Storage & Disaster Recovery Scenarios"),
    ],
  },
  {
    n: 14,
    title: "High Availability & Disaster Recovery",
    lessons: [
      L(82, "high-availability-vs-disaster-recovery", "High Availability vs. Disaster Recovery"),
      L(83, "rpo-and-rto-designing-from-business-requirements", "RPO & RTO — Designing from Business Requirements"),
      L(84, "always-on-availability-groups", "Always On Availability Groups"),
      L(85, "failover-cluster-instances", "Failover Cluster Instances"),
      L(86, "active-geo-replication", "Active Geo-Replication"),
      L(87, "azure-sql-failover-groups", "Azure SQL Failover Groups"),
      L(88, "log-shipping-and-hybrid-ha-dr", "Log Shipping & Hybrid HA/DR"),
      L(89, "monitoring-testing-troubleshooting-ha-dr", "Monitoring, Testing & Troubleshooting HA/DR"),
    ],
  },
  {
    n: 15,
    title: "Real-World Azure DBA Project",
    lessons: [
      L(90, "project-introduction-youre-the-dba", "Project Introduction — You're the DBA"),
      L(91, "project-migrate-and-secure-the-environment", "Project — Migrate & Secure the Environment"),
      L(92, "project-performance-and-automation", "Project — Performance & Automation"),
      L(93, "project-ha-dr-and-disaster-simulation", "Project — HA/DR & Disaster Simulation"),
    ],
  },
  {
    n: 16,
    title: "Certification & Interview Preparation",
    lessons: [
      L(94, "dp-300-exam-review-and-practice-assessment", "DP-300 Complete Exam Review & Practice Assessment"),
      L(95, "azure-dba-interview-preparation", "Azure DBA Interview Preparation"),
    ],
  },
];
