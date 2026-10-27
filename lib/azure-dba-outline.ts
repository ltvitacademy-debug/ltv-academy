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
      L(1, "course-introduction-becoming-an-azure-dba", "Course Introduction: Becoming an Azure Database Administrator", { contentDir: "ch01/01-course-introduction-becoming-an-azure-dba", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba/course-introduction-becoming-an-azure-dba.mp4", durationLabel: "59 s" }),
      L(2, "sql-server-on-prem-vs-azure-sql", "SQL Server On-Prem vs. Azure SQL — Understanding the Ecosystem", { contentDir: "ch01/02-sql-server-on-prem-vs-azure-sql", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba/sql-server-on-prem-vs-azure-sql.mp4", durationLabel: "59 s" }),
      L(3, "azure-sql-database-vs-managed-instance-vs-vm", "Azure SQL Database vs. Managed Instance vs. SQL Server on Azure VM", { contentDir: "ch01/03-azure-sql-database-vs-managed-instance-vs-vm", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba/azure-sql-database-vs-managed-instance-vs-vm.mp4", durationLabel: "1 min 12 s" }),
      L(4, "iaas-vs-paas-for-sql-server", "IaaS vs. PaaS for SQL Server", { contentDir: "ch01/04-iaas-vs-paas-for-sql-server", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba/iaas-vs-paas-for-sql-server.mp4", durationLabel: "1 min 1 s" }),
      L(5, "azure-portal-ssms-and-azure-data-studio", "Azure Portal, SSMS & Azure Data Studio for DBAs", { contentDir: "ch01/05-azure-portal-ssms-and-azure-data-studio", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba/azure-portal-ssms-and-azure-data-studio.mp4", durationLabel: "1 min 4 s" }),
      L(6, "lab-build-your-first-azure-sql-environment", "Lab: Build Your First Azure SQL Environment", { contentDir: "ch01/06-lab-build-your-first-azure-sql-environment", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba/lab-build-your-first-azure-sql-environment.mp4", durationLabel: "1 min 15 s" }),
    ],
  },
  {
    n: 2,
    title: "Deploying Azure SQL",
    lessons: [
      L(7, "creating-azure-sql-servers-and-databases", "Creating Azure SQL Servers & Databases", { contentDir: "ch02/07-creating-azure-sql-servers-and-databases", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba/creating-azure-sql-servers-and-databases.mp4", durationLabel: "1 min 5 s" }),
      L(8, "purchasing-models-service-tiers-compute-options", "Azure SQL Purchasing Models, Service Tiers & Compute Options", { contentDir: "ch02/08-purchasing-models-service-tiers-compute-options", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba/purchasing-models-service-tiers-compute-options.mp4", durationLabel: "58 s" }),
      L(9, "dtu-vs-vcore", "DTU vs. vCore & Choosing the Right Database Configuration", { contentDir: "ch02/09-dtu-vs-vcore", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba/dtu-vs-vcore.mp4", durationLabel: "1 min 2 s" }),
      L(10, "serverless-provisioned-elastic-pools", "Serverless, Provisioned Compute & Elastic Pools", { contentDir: "ch02/10-serverless-provisioned-elastic-pools", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba/serverless-provisioned-elastic-pools.mp4", durationLabel: "1 min 5 s" }),
      L(11, "storage-compute-scaling-performance-configuration", "Storage, Compute Scaling & Performance Configuration", { contentDir: "ch02/11-storage-compute-scaling-performance-configuration", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba/storage-compute-scaling-performance-configuration.mp4", durationLabel: "1 min 10 s" }),
      L(12, "azure-sql-managed-instance-deployment", "Azure SQL Managed Instance Deployment & Configuration", { contentDir: "ch02/12-azure-sql-managed-instance-deployment", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba/azure-sql-managed-instance-deployment.mp4", durationLabel: "1 min 25 s" }),
      L(13, "sql-server-on-azure-vms-and-hybrid-sql", "SQL Server on Azure Virtual Machines & Hybrid SQL", { contentDir: "ch02/13-sql-server-on-azure-vms-and-hybrid-sql", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba/sql-server-on-azure-vms-and-hybrid-sql.mp4", durationLabel: "1 min 33 s" }),
    ],
  },
  {
    n: 3,
    title: "Designing & Scaling Database Resources",
    lessons: [
      L(14, "choosing-the-correct-azure-sql-solution", "Choosing the Correct Azure SQL Solution for Business Requirements", { contentDir: "ch03/14-choosing-the-correct-azure-sql-solution", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba/choosing-the-correct-azure-sql-solution.mp4", durationLabel: "1 min 14 s" }),
      L(15, "table-partitioning-and-large-database-strategies", "Table Partitioning & Large Database Strategies", { contentDir: "ch03/15-table-partitioning-and-large-database-strategies", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba/table-partitioning-and-large-database-strategies.mp4", durationLabel: "1 min 9 s" }),
      L(16, "data-compression-and-storage-optimization", "Data Compression & Storage Optimization", { contentDir: "ch03/16-data-compression-and-storage-optimization", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba/data-compression-and-storage-optimization.mp4", durationLabel: "1 min 18 s" }),
      L(17, "database-sharding-and-horizontal-scaling", "Database Sharding & Horizontal Scaling", { contentDir: "ch03/17-database-sharding-and-horizontal-scaling", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba/database-sharding-and-horizontal-scaling.mp4", durationLabel: "1 min 14 s" }),
      L(18, "azure-arc-hybrid-sql-and-fabric", "Azure Arc, Hybrid SQL & Azure SQL Database in Microsoft Fabric", { contentDir: "ch03/18-azure-arc-hybrid-sql-and-fabric", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba/azure-arc-hybrid-sql-and-fabric.mp4", durationLabel: "1 min 42 s" }),
    ],
  },
  {
    n: 4,
    title: "Authentication & Authorization",
    lessons: [
      L(19, "sql-authentication-vs-entra-authentication", "SQL Authentication vs. Microsoft Entra Authentication", { contentDir: "ch04/19-sql-authentication-vs-entra-authentication", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba/sql-authentication-vs-entra-authentication.mp4", durationLabel: "1 min 15 s" }),
      L(20, "configuring-entra-id-for-azure-sql", "Configuring Microsoft Entra ID for Azure SQL", { contentDir: "ch04/20-configuring-entra-id-for-azure-sql", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba/configuring-entra-id-for-azure-sql.mp4", durationLabel: "1 min 15 s" }),
      L(21, "logins-users-roles-security-principals", "Logins, Users, Roles & Security Principals", { contentDir: "ch04/21-logins-users-roles-security-principals", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba/logins-users-roles-security-principals.mp4", durationLabel: "1 min 16 s" }),
      L(22, "server-roles-database-roles-object-permissions", "Server Roles, Database Roles & Object Permissions", { contentDir: "ch04/22-server-roles-database-roles-object-permissions", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba/server-roles-database-roles-object-permissions.mp4", durationLabel: "1 min 13 s" }),
      L(23, "grant-deny-revoke", "GRANT, DENY & REVOKE", { contentDir: "ch04/23-grant-deny-revoke", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba/grant-deny-revoke.mp4", durationLabel: "1 min 7 s" }),
      L(24, "principle-of-least-privilege", "Principle of Least Privilege", { contentDir: "ch04/24-principle-of-least-privilege", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba/principle-of-least-privilege.mp4", durationLabel: "1 min 11 s" }),
      L(25, "troubleshooting-login-auth-permission-problems", "Troubleshooting Login, Authentication & Permission Problems", { contentDir: "ch04/25-troubleshooting-login-auth-permission-problems", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba/troubleshooting-login-auth-permission-problems.mp4", durationLabel: "1 min 30 s" }),
    ],
  },
  {
    n: 5,
    title: "Azure SQL Network Security",
    lessons: [
      L(26, "azure-sql-firewalls-and-firewall-rules", "Azure SQL Firewalls & Firewall Rules", { contentDir: "ch05/26-azure-sql-firewalls-and-firewall-rules", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba/azure-sql-firewalls-and-firewall-rules.mp4", durationLabel: "1 min 9 s" }),
      L(27, "virtual-networks-and-service-endpoints", "Virtual Networks & Service Endpoints", { contentDir: "ch05/27-virtual-networks-and-service-endpoints", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba/virtual-networks-and-service-endpoints.mp4", durationLabel: "1 min 2 s" }),
      L(28, "private-endpoints-and-private-link", "Private Endpoints & Private Link", { contentDir: "ch05/28-private-endpoints-and-private-link", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba/private-endpoints-and-private-link.mp4", durationLabel: "1 min 8 s" }),
      L(29, "public-vs-private-database-connectivity", "Public vs. Private Database Connectivity", { contentDir: "ch05/29-public-vs-private-database-connectivity", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba/public-vs-private-database-connectivity.mp4", durationLabel: "1 min 13 s" }),
      L(30, "troubleshooting-azure-sql-connectivity", "Troubleshooting Azure SQL Connectivity", { contentDir: "ch05/30-troubleshooting-azure-sql-connectivity", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba/troubleshooting-azure-sql-connectivity.mp4", durationLabel: "1 min 9 s" }),
    ],
  },
  {
    n: 6,
    title: "Data Security & Compliance",
    lessons: [
      L(31, "transparent-data-encryption", "Transparent Data Encryption (TDE)", { contentDir: "ch06/31-transparent-data-encryption", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba/transparent-data-encryption.mp4", durationLabel: "1 min 11 s" }),
      L(32, "always-encrypted-and-secure-enclaves", "Always Encrypted & Always Encrypted with Secure Enclaves", { contentDir: "ch06/32-always-encrypted-and-secure-enclaves", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba/always-encrypted-and-secure-enclaves.mp4", durationLabel: "1 min 21 s" }),
      L(33, "dynamic-data-masking", "Dynamic Data Masking", { contentDir: "ch06/33-dynamic-data-masking", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba/dynamic-data-masking.mp4", durationLabel: "1 min 9 s" }),
      L(34, "row-level-security", "Row-Level Security", { contentDir: "ch06/34-row-level-security", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba/row-level-security.mp4", durationLabel: "1 min 9 s" }),
      L(35, "data-discovery-classification-sensitive-data", "Data Discovery, Classification & Sensitive Data", { contentDir: "ch06/35-data-discovery-classification-sensitive-data", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba/data-discovery-classification-sensitive-data.mp4", durationLabel: "1 min 9 s" }),
      L(36, "sql-auditing-and-compliance-monitoring", "SQL Auditing & Compliance Monitoring", { contentDir: "ch06/36-sql-auditing-and-compliance-monitoring", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba/sql-auditing-and-compliance-monitoring.mp4", durationLabel: "1 min 11 s" }),
      L(37, "ledger-change-tracking-security-compliance-scenarios", "Ledger, Change Tracking & Security/Compliance Scenarios", { contentDir: "ch06/37-ledger-change-tracking-security-compliance-scenarios", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba/ledger-change-tracking-security-compliance-scenarios.mp4", durationLabel: "1 min 9 s" }),
    ],
  },
  {
    n: 7,
    title: "Monitoring Azure SQL",
    lessons: [
      L(38, "database-monitoring-and-performance-baseline", "Understanding Database Monitoring & Creating a Performance Baseline", { contentDir: "ch07/38-database-monitoring-and-performance-baseline", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba/database-monitoring-and-performance-baseline.mp4", durationLabel: "1 min 23 s" }),
      L(39, "azure-monitor-metrics-and-alerts", "Azure Monitor, Metrics & Alerts", { contentDir: "ch07/39-azure-monitor-metrics-and-alerts", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba/azure-monitor-metrics-and-alerts.mp4", durationLabel: "1 min 44 s" }),
      L(40, "database-watcher", "Database Watcher", { contentDir: "ch07/40-database-watcher", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba/database-watcher.mp4", durationLabel: "1 min 37 s" }),
      L(41, "dmvs-for-dbas", "Dynamic Management Views for DBAs", { contentDir: "ch07/41-dmvs-for-dbas", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba/dmvs-for-dbas.mp4", durationLabel: "1 min 43 s" }),
      L(42, "extended-events", "Extended Events", { contentDir: "ch07/42-extended-events", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba/extended-events.mp4", durationLabel: "1 min 56 s" }),
      L(43, "monitoring-sessions-cpu-memory-io-storage", "Monitoring Sessions, Connections, CPU, Memory, I/O & Storage", { contentDir: "ch07/43-monitoring-sessions-cpu-memory-io-storage", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba/monitoring-sessions-cpu-memory-io-storage.mp4", durationLabel: "1 min 41 s" }),
    ],
  },
  {
    n: 8,
    title: "Query Performance Tuning",
    lessons: [
      L(44, "sql-server-performance-troubleshooting-methodology", "SQL Server Performance Troubleshooting Methodology", { contentDir: "ch08/44-sql-server-performance-troubleshooting-methodology", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba/sql-server-performance-troubleshooting-methodology.mp4", durationLabel: "1 min 22 s" }),
      L(45, "reading-execution-plans-for-performance-problems", "Reading Execution Plans for Performance Problems", { contentDir: "ch08/45-reading-execution-plans-for-performance-problems", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba/reading-execution-plans-for-performance-problems.mp4", durationLabel: "1 min 17 s" }),
      L(46, "index-seeks-scans-lookups-plan-operators", "Index Seeks, Scans, Lookups & Common Plan Operators", { contentDir: "ch08/46-index-seeks-scans-lookups-plan-operators", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba/index-seeks-scans-lookups-plan-operators.mp4", durationLabel: "1 min 15 s" }),
      L(47, "finding-missing-duplicate-unused-indexes", "Finding Missing, Duplicate & Unused Indexes", { contentDir: "ch08/47-finding-missing-duplicate-unused-indexes", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba/finding-missing-duplicate-unused-indexes.mp4", durationLabel: "1 min 24 s" }),
      L(48, "query-store-fundamentals", "Query Store Fundamentals", { contentDir: "ch08/48-query-store-fundamentals", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba/query-store-fundamentals.mp4", durationLabel: "1 min 11 s" }),
      L(49, "using-query-store-to-find-regressed-queries", "Using Query Store to Find Regressed Queries", { contentDir: "ch08/49-using-query-store-to-find-regressed-queries", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba/using-query-store-to-find-regressed-queries.mp4", durationLabel: "1 min 31 s" }),
      L(50, "blocking-locking-and-deadlocks", "Blocking, Locking & Deadlocks", { contentDir: "ch08/50-blocking-locking-and-deadlocks", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba/blocking-locking-and-deadlocks.mp4", durationLabel: "1 min 26 s" }),
      L(51, "dmvs-for-query-performance-troubleshooting", "DMVs for Query Performance Troubleshooting", { contentDir: "ch08/51-dmvs-for-query-performance-troubleshooting", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba/dmvs-for-query-performance-troubleshooting.mp4", durationLabel: "1 min 21 s" }),
      L(52, "intelligent-query-processing-and-automatic-tuning", "Intelligent Query Processing & Automatic Tuning", { contentDir: "ch08/52-intelligent-query-processing-and-automatic-tuning", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba/intelligent-query-processing-and-automatic-tuning.mp4", durationLabel: "1 min 12 s" }),
    ],
  },
  {
    n: 9,
    title: "Database Performance & Maintenance",
    lessons: [
      L(53, "index-maintenance-and-fragmentation", "Index Maintenance & Fragmentation", { contentDir: "ch09/53-index-maintenance-and-fragmentation", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba/index-maintenance-and-fragmentation.mp4", durationLabel: "1 min 3 s" }),
      L(54, "statistics-maintenance", "Statistics Maintenance", { contentDir: "ch09/54-statistics-maintenance", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba/statistics-maintenance.mp4", durationLabel: "1 min 1 s" }),
      L(55, "dbcc-checkdb-and-database-integrity", "DBCC CHECKDB & Database Integrity", { contentDir: "ch09/55-dbcc-checkdb-and-database-integrity", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba/dbcc-checkdb-and-database-integrity.mp4", durationLabel: "1 min 11 s" }),
      L(56, "database-scoped-configuration-and-server-settings", "Database-Scoped Configuration & Server Settings", { contentDir: "ch09/56-database-scoped-configuration-and-server-settings", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba/database-scoped-configuration-and-server-settings.mp4", durationLabel: "1 min 3 s" }),
      L(57, "resource-governor", "Resource Governor", { contentDir: "ch09/57-resource-governor", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba/resource-governor.mp4", durationLabel: "1 min 4 s" }),
      L(58, "scaling-and-troubleshooting-resource-bottlenecks", "Scaling Compute/Storage & Troubleshooting Resource Bottlenecks", { contentDir: "ch09/58-scaling-and-troubleshooting-resource-bottlenecks", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba/scaling-and-troubleshooting-resource-bottlenecks.mp4", durationLabel: "1 min 13 s" }),
    ],
  },
  {
    n: 10,
    title: "SQL Server Agent & Automation",
    lessons: [
      L(59, "sql-server-agent-fundamentals", "SQL Server Agent Fundamentals", { contentDir: "ch10/59-sql-server-agent-fundamentals", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba/sql-server-agent-fundamentals.mp4", durationLabel: "59 s" }),
      L(60, "creating-jobs-steps-and-schedules", "Creating Jobs, Steps & Schedules", { contentDir: "ch10/60-creating-jobs-steps-and-schedules", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba/creating-jobs-steps-and-schedules.mp4", durationLabel: "1 min 10 s" }),
      L(61, "alerts-operators-and-notifications", "Alerts, Operators & Notifications", { contentDir: "ch10/61-alerts-operators-and-notifications", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba/alerts-operators-and-notifications.mp4", durationLabel: "1 min 5 s" }),
      L(62, "troubleshooting-failed-sql-agent-jobs", "Troubleshooting Failed SQL Agent Jobs", { contentDir: "ch10/62-troubleshooting-failed-sql-agent-jobs", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba/troubleshooting-failed-sql-agent-jobs.mp4", durationLabel: "1 min 8 s" }),
      L(63, "automating-dba-maintenance", "Automating DBA Maintenance", { contentDir: "ch10/63-automating-dba-maintenance", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba/automating-dba-maintenance.mp4", durationLabel: "1 min 17 s" }),
      L(64, "building-a-dba-maintenance-and-monitoring-strategy", "Building a DBA Maintenance & Monitoring Strategy", { contentDir: "ch10/64-building-a-dba-maintenance-and-monitoring-strategy", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba/building-a-dba-maintenance-and-monitoring-strategy.mp4", durationLabel: "54 s" }),
    ],
  },
  {
    n: 11,
    title: "Azure Automation & Infrastructure as Code",
    lessons: [
      L(65, "automating-azure-sql-administration", "Automating Azure SQL Administration", { contentDir: "ch11/65-automating-azure-sql-administration", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba/automating-azure-sql-administration.mp4", durationLabel: "1 min 10 s" }),
      L(66, "azure-cli-and-powershell-for-dbas", "Azure CLI & PowerShell for Database Administrators", { contentDir: "ch11/66-azure-cli-and-powershell-for-dbas", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba/azure-cli-and-powershell-for-dbas.mp4", durationLabel: "1 min 16 s" }),
      L(67, "arm-templates-and-bicep-for-azure-sql", "ARM Templates & Bicep for Azure SQL", { contentDir: "ch11/67-arm-templates-and-bicep-for-azure-sql", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba/arm-templates-and-bicep-for-azure-sql.mp4", durationLabel: "1 min 11 s" }),
      L(68, "elastic-jobs-and-azure-database-tasks", "Elastic Jobs & Azure Database Tasks", { contentDir: "ch11/68-elastic-jobs-and-azure-database-tasks", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba/elastic-jobs-and-azure-database-tasks.mp4", durationLabel: "1 min 16 s" }),
      L(69, "automated-deployment-alerts-and-troubleshooting", "Automated Deployment, Alerts & Troubleshooting", { contentDir: "ch11/69-automated-deployment-alerts-and-troubleshooting", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba/automated-deployment-alerts-and-troubleshooting.mp4", durationLabel: "1 min 15 s" }),
    ],
  },
  {
    n: 12,
    title: "Database Migration to Azure",
    lessons: [
      L(70, "planning-a-sql-server-migration-to-azure", "Planning a SQL Server Migration to Azure", { contentDir: "ch12/70-planning-a-sql-server-migration-to-azure", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba/planning-a-sql-server-migration-to-azure.mp4", durationLabel: "1 min 8 s" }),
      L(71, "assessing-sql-server-before-migration", "Assessing SQL Server Before Migration", { contentDir: "ch12/71-assessing-sql-server-before-migration", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba/assessing-sql-server-before-migration.mp4", durationLabel: "1 min 13 s" }),
      L(72, "online-vs-offline-migration-strategies", "Online vs. Offline Migration Strategies", { contentDir: "ch12/72-online-vs-offline-migration-strategies", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba/online-vs-offline-migration-strategies.mp4", durationLabel: "1 min 18 s" }),
      L(73, "migrating-to-azure-sql-database", "Migrating SQL Server to Azure SQL Database", { contentDir: "ch12/73-migrating-to-azure-sql-database", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba/migrating-to-azure-sql-database.mp4", durationLabel: "1 min 20 s" }),
      L(74, "migrating-to-azure-sql-managed-instance", "Migrating to Azure SQL Managed Instance", { contentDir: "ch12/74-migrating-to-azure-sql-managed-instance", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba/migrating-to-azure-sql-managed-instance.mp4", durationLabel: "1 min 24 s" }),
      L(75, "migration-troubleshooting-and-post-migration-validation", "Migration Troubleshooting & Post-Migration Validation", { contentDir: "ch12/75-migration-troubleshooting-and-post-migration-validation", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba/migration-troubleshooting-and-post-migration-validation.mp4", durationLabel: "1 min 29 s" }),
    ],
  },
  {
    n: 13,
    title: "Backup & Restore",
    lessons: [
      L(76, "backup-fundamentals-full-differential-log", "SQL Server Backup Fundamentals: Full, Differential & Log", { contentDir: "ch13/76-backup-fundamentals-full-differential-log", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba/backup-fundamentals-full-differential-log.mp4", durationLabel: "60 s" }),
      L(77, "backup-and-restore-with-ssms-and-t-sql", "Backup & Restore with SSMS and T-SQL", { contentDir: "ch13/77-backup-and-restore-with-ssms-and-t-sql", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba/backup-and-restore-with-ssms-and-t-sql.mp4", durationLabel: "1 min 8 s" }),
      L(78, "azure-sql-automated-backups", "Azure SQL Automated Backups", { contentDir: "ch13/78-azure-sql-automated-backups", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba/azure-sql-automated-backups.mp4", durationLabel: "55 s" }),
      L(79, "point-in-time-restore", "Point-in-Time Restore", { contentDir: "ch13/79-point-in-time-restore", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba/point-in-time-restore.mp4", durationLabel: "1 min 11 s" }),
      L(80, "long-term-retention-and-backup-policies", "Long-Term Retention & Backup Policies", { contentDir: "ch13/80-long-term-retention-and-backup-policies", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba/long-term-retention-and-backup-policies.mp4", durationLabel: "60 s" }),
      L(81, "backup-to-azure-storage-and-disaster-recovery-scenarios", "Backup to Azure Storage & Disaster Recovery Scenarios", { contentDir: "ch13/81-backup-to-azure-storage-and-disaster-recovery-scenarios", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba/backup-to-azure-storage-and-disaster-recovery-scenarios.mp4", durationLabel: "1 min 24 s" }),
    ],
  },
  {
    n: 14,
    title: "High Availability & Disaster Recovery",
    lessons: [
      L(82, "high-availability-vs-disaster-recovery", "High Availability vs. Disaster Recovery", { contentDir: "ch14/82-high-availability-vs-disaster-recovery", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba/high-availability-vs-disaster-recovery.mp4", durationLabel: "1 min 19 s" }),
      L(83, "rpo-and-rto-designing-from-business-requirements", "RPO & RTO — Designing from Business Requirements", { contentDir: "ch14/83-rpo-and-rto-designing-from-business-requirements", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba/rpo-and-rto-designing-from-business-requirements.mp4", durationLabel: "1 min 1 s" }),
      L(84, "always-on-availability-groups", "Always On Availability Groups", { contentDir: "ch14/84-always-on-availability-groups", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba/always-on-availability-groups.mp4", durationLabel: "1 min 14 s" }),
      L(85, "failover-cluster-instances", "Failover Cluster Instances", { contentDir: "ch14/85-failover-cluster-instances", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba/failover-cluster-instances.mp4", durationLabel: "59 s" }),
      L(86, "active-geo-replication", "Active Geo-Replication", { contentDir: "ch14/86-active-geo-replication", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba/active-geo-replication.mp4", durationLabel: "1 min 13 s" }),
      L(87, "azure-sql-failover-groups", "Azure SQL Failover Groups", { contentDir: "ch14/87-azure-sql-failover-groups", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba/azure-sql-failover-groups.mp4", durationLabel: "1 min 11 s" }),
      L(88, "log-shipping-and-hybrid-ha-dr", "Log Shipping & Hybrid HA/DR", { contentDir: "ch14/88-log-shipping-and-hybrid-ha-dr", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba/log-shipping-and-hybrid-ha-dr.mp4", durationLabel: "1 min 20 s" }),
      L(89, "monitoring-testing-troubleshooting-ha-dr", "Monitoring, Testing & Troubleshooting HA/DR", { contentDir: "ch14/89-monitoring-testing-troubleshooting-ha-dr", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba/monitoring-testing-troubleshooting-ha-dr.mp4", durationLabel: "1 min 1 s" }),
    ],
  },
  {
    n: 15,
    title: "Real-World Azure DBA Project",
    lessons: [
      L(90, "project-introduction-youre-the-dba", "Project Introduction — You're the DBA", { contentDir: "ch15/90-project-introduction-youre-the-dba", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba/project-introduction-youre-the-dba.mp4", durationLabel: "1 min 15 s" }),
      L(91, "project-migrate-and-secure-the-environment", "Project — Migrate & Secure the Environment", { contentDir: "ch15/91-project-migrate-and-secure-the-environment", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba/project-migrate-and-secure-the-environment.mp4", durationLabel: "1 min 29 s" }),
      L(92, "project-performance-and-automation", "Project — Performance & Automation", { contentDir: "ch15/92-project-performance-and-automation", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba/project-performance-and-automation.mp4", durationLabel: "1 min 23 s" }),
      L(93, "project-ha-dr-and-disaster-simulation", "Project — HA/DR & Disaster Simulation", { contentDir: "ch15/93-project-ha-dr-and-disaster-simulation", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba/project-ha-dr-and-disaster-simulation.mp4", durationLabel: "1 min 31 s" }),
    ],
  },
  {
    n: 16,
    title: "Certification & Interview Preparation",
    lessons: [
      L(94, "dp-300-exam-review-and-practice-assessment", "DP-300 Complete Exam Review & Practice Assessment", { contentDir: "ch16/94-dp-300-exam-review-and-practice-assessment", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba/dp-300-exam-review-and-practice-assessment.mp4", durationLabel: "1 min 3 s" }),
      L(95, "azure-dba-interview-preparation", "Azure DBA Interview Preparation", { contentDir: "ch16/95-azure-dba-interview-preparation", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba/azure-dba-interview-preparation.mp4", durationLabel: "1 min 5 s" }),
    ],
  },
];
