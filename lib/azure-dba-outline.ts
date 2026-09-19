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
      L(1, "course-introduction-becoming-an-azure-dba", "Course Introduction: Becoming an Azure Database Administrator", {
        contentDir: "ch01/01-course-introduction-becoming-an-azure-dba",
        // videoUrl/durationLabel pending
      }),
      L(2, "sql-server-on-prem-vs-azure-sql", "SQL Server On-Prem vs. Azure SQL — Understanding the Ecosystem", {
        contentDir: "ch01/02-sql-server-on-prem-vs-azure-sql",
        // videoUrl/durationLabel pending
      }),
      L(3, "azure-sql-database-vs-managed-instance-vs-vm", "Azure SQL Database vs. Managed Instance vs. SQL Server on Azure VM", {
        contentDir: "ch01/03-azure-sql-database-vs-managed-instance-vs-vm",
        // videoUrl/durationLabel pending
      }),
      L(4, "iaas-vs-paas-for-sql-server", "IaaS vs. PaaS for SQL Server", {
        contentDir: "ch01/04-iaas-vs-paas-for-sql-server",
        // videoUrl/durationLabel pending
      }),
      L(5, "azure-portal-ssms-and-azure-data-studio", "Azure Portal, SSMS & Azure Data Studio for DBAs", {
        contentDir: "ch01/05-azure-portal-ssms-and-azure-data-studio",
        // videoUrl/durationLabel pending
      }),
      L(6, "lab-build-your-first-azure-sql-environment", "Lab: Build Your First Azure SQL Environment", {
        contentDir: "ch01/06-lab-build-your-first-azure-sql-environment",
        // videoUrl/durationLabel pending
      }),
    ],
  },
  {
    n: 2,
    title: "Deploying Azure SQL",
    lessons: [
      L(7, "creating-azure-sql-servers-and-databases", "Creating Azure SQL Servers & Databases", {
        contentDir: "ch02/07-creating-azure-sql-servers-and-databases",
        // videoUrl/durationLabel pending
      }),
      L(8, "purchasing-models-service-tiers-compute-options", "Azure SQL Purchasing Models, Service Tiers & Compute Options", {
        contentDir: "ch02/08-purchasing-models-service-tiers-compute-options",
        // videoUrl/durationLabel pending
      }),
      L(9, "dtu-vs-vcore", "DTU vs. vCore & Choosing the Right Database Configuration", {
        contentDir: "ch02/09-dtu-vs-vcore",
        // videoUrl/durationLabel pending
      }),
      L(10, "serverless-provisioned-elastic-pools", "Serverless, Provisioned Compute & Elastic Pools", {
        contentDir: "ch02/10-serverless-provisioned-elastic-pools",
        // videoUrl/durationLabel pending
      }),
      L(11, "storage-compute-scaling-performance-configuration", "Storage, Compute Scaling & Performance Configuration", {
        contentDir: "ch02/11-storage-compute-scaling-performance-configuration",
        // videoUrl/durationLabel pending
      }),
      L(12, "azure-sql-managed-instance-deployment", "Azure SQL Managed Instance Deployment & Configuration", {
        contentDir: "ch02/12-azure-sql-managed-instance-deployment",
        // videoUrl/durationLabel pending
      }),
      L(13, "sql-server-on-azure-vms-and-hybrid-sql", "SQL Server on Azure Virtual Machines & Hybrid SQL", {
        contentDir: "ch02/13-sql-server-on-azure-vms-and-hybrid-sql",
        // videoUrl/durationLabel pending
      }),
    ],
  },
  {
    n: 3,
    title: "Designing & Scaling Database Resources",
    lessons: [
      L(14, "choosing-the-correct-azure-sql-solution", "Choosing the Correct Azure SQL Solution for Business Requirements", {
        contentDir: "ch03/14-choosing-the-correct-azure-sql-solution",
        // videoUrl/durationLabel pending
      }),
      L(15, "table-partitioning-and-large-database-strategies", "Table Partitioning & Large Database Strategies", {
        contentDir: "ch03/15-table-partitioning-and-large-database-strategies",
        // videoUrl/durationLabel pending
      }),
      L(16, "data-compression-and-storage-optimization", "Data Compression & Storage Optimization", {
        contentDir: "ch03/16-data-compression-and-storage-optimization",
        // videoUrl/durationLabel pending
      }),
      L(17, "database-sharding-and-horizontal-scaling", "Database Sharding & Horizontal Scaling", {
        contentDir: "ch03/17-database-sharding-and-horizontal-scaling",
        // videoUrl/durationLabel pending
      }),
      L(18, "azure-arc-hybrid-sql-and-fabric", "Azure Arc, Hybrid SQL & Azure SQL Database in Microsoft Fabric", {
        contentDir: "ch03/18-azure-arc-hybrid-sql-and-fabric",
        // videoUrl/durationLabel pending
      }),
    ],
  },
  {
    n: 4,
    title: "Authentication & Authorization",
    lessons: [
      L(19, "sql-authentication-vs-entra-authentication", "SQL Authentication vs. Microsoft Entra Authentication", {
        contentDir: "ch04/19-sql-authentication-vs-entra-authentication",
        // videoUrl/durationLabel pending
      }),
      L(20, "configuring-entra-id-for-azure-sql", "Configuring Microsoft Entra ID for Azure SQL", {
        contentDir: "ch04/20-configuring-entra-id-for-azure-sql",
        // videoUrl/durationLabel pending
      }),
      L(21, "logins-users-roles-security-principals", "Logins, Users, Roles & Security Principals", {
        contentDir: "ch04/21-logins-users-roles-security-principals",
        // videoUrl/durationLabel pending
      }),
      L(22, "server-roles-database-roles-object-permissions", "Server Roles, Database Roles & Object Permissions", {
        contentDir: "ch04/22-server-roles-database-roles-object-permissions",
        // videoUrl/durationLabel pending
      }),
      L(23, "grant-deny-revoke", "GRANT, DENY & REVOKE", {
        contentDir: "ch04/23-grant-deny-revoke",
        // videoUrl/durationLabel pending
      }),
      L(24, "principle-of-least-privilege", "Principle of Least Privilege", {
        contentDir: "ch04/24-principle-of-least-privilege",
        // videoUrl/durationLabel pending
      }),
      L(25, "troubleshooting-login-auth-permission-problems", "Troubleshooting Login, Authentication & Permission Problems", {
        contentDir: "ch04/25-troubleshooting-login-auth-permission-problems",
        // videoUrl/durationLabel pending
      }),
    ],
  },
  {
    n: 5,
    title: "Azure SQL Network Security",
    lessons: [
      L(26, "azure-sql-firewalls-and-firewall-rules", "Azure SQL Firewalls & Firewall Rules", {
        contentDir: "ch05/26-azure-sql-firewalls-and-firewall-rules",
        // videoUrl/durationLabel pending
      }),
      L(27, "virtual-networks-and-service-endpoints", "Virtual Networks & Service Endpoints", {
        contentDir: "ch05/27-virtual-networks-and-service-endpoints",
        // videoUrl/durationLabel pending
      }),
      L(28, "private-endpoints-and-private-link", "Private Endpoints & Private Link", {
        contentDir: "ch05/28-private-endpoints-and-private-link",
        // videoUrl/durationLabel pending
      }),
      L(29, "public-vs-private-database-connectivity", "Public vs. Private Database Connectivity", {
        contentDir: "ch05/29-public-vs-private-database-connectivity",
        // videoUrl/durationLabel pending
      }),
      L(30, "troubleshooting-azure-sql-connectivity", "Troubleshooting Azure SQL Connectivity", {
        contentDir: "ch05/30-troubleshooting-azure-sql-connectivity",
        // videoUrl/durationLabel pending
      }),
    ],
  },
  {
    n: 6,
    title: "Data Security & Compliance",
    lessons: [
      L(31, "transparent-data-encryption", "Transparent Data Encryption (TDE)", {
        contentDir: "ch06/31-transparent-data-encryption",
        // videoUrl/durationLabel pending
      }),
      L(32, "always-encrypted-and-secure-enclaves", "Always Encrypted & Always Encrypted with Secure Enclaves", {
        contentDir: "ch06/32-always-encrypted-and-secure-enclaves",
        // videoUrl/durationLabel pending
      }),
      L(33, "dynamic-data-masking", "Dynamic Data Masking", {
        contentDir: "ch06/33-dynamic-data-masking",
        // videoUrl/durationLabel pending
      }),
      L(34, "row-level-security", "Row-Level Security", {
        contentDir: "ch06/34-row-level-security",
        // videoUrl/durationLabel pending
      }),
      L(35, "data-discovery-classification-sensitive-data", "Data Discovery, Classification & Sensitive Data", {
        contentDir: "ch06/35-data-discovery-classification-sensitive-data",
        // videoUrl/durationLabel pending
      }),
      L(36, "sql-auditing-and-compliance-monitoring", "SQL Auditing & Compliance Monitoring", {
        contentDir: "ch06/36-sql-auditing-and-compliance-monitoring",
        // videoUrl/durationLabel pending
      }),
      L(37, "ledger-change-tracking-security-compliance-scenarios", "Ledger, Change Tracking & Security/Compliance Scenarios", {
        contentDir: "ch06/37-ledger-change-tracking-security-compliance-scenarios",
        // videoUrl/durationLabel pending
      }),
    ],
  },
  {
    n: 7,
    title: "Monitoring Azure SQL",
    lessons: [
      L(38, "database-monitoring-and-performance-baseline", "Understanding Database Monitoring & Creating a Performance Baseline", {
        contentDir: "ch07/38-database-monitoring-and-performance-baseline",
        // videoUrl/durationLabel pending
      }),
      L(39, "azure-monitor-metrics-and-alerts", "Azure Monitor, Metrics & Alerts", {
        contentDir: "ch07/39-azure-monitor-metrics-and-alerts",
        // videoUrl/durationLabel pending
      }),
      L(40, "database-watcher", "Database Watcher", {
        contentDir: "ch07/40-database-watcher",
        // videoUrl/durationLabel pending
      }),
      L(41, "dmvs-for-dbas", "Dynamic Management Views for DBAs", {
        contentDir: "ch07/41-dmvs-for-dbas",
        // videoUrl/durationLabel pending
      }),
      L(42, "extended-events", "Extended Events", {
        contentDir: "ch07/42-extended-events",
        // videoUrl/durationLabel pending
      }),
      L(43, "monitoring-sessions-cpu-memory-io-storage", "Monitoring Sessions, Connections, CPU, Memory, I/O & Storage", {
        contentDir: "ch07/43-monitoring-sessions-cpu-memory-io-storage",
        // videoUrl/durationLabel pending
      }),
    ],
  },
  {
    n: 8,
    title: "Query Performance Tuning",
    lessons: [
      L(44, "sql-server-performance-troubleshooting-methodology", "SQL Server Performance Troubleshooting Methodology", {
        contentDir: "ch08/44-sql-server-performance-troubleshooting-methodology",
        // videoUrl/durationLabel pending
      }),
      L(45, "reading-execution-plans-for-performance-problems", "Reading Execution Plans for Performance Problems", {
        contentDir: "ch08/45-reading-execution-plans-for-performance-problems",
        // videoUrl/durationLabel pending
      }),
      L(46, "index-seeks-scans-lookups-plan-operators", "Index Seeks, Scans, Lookups & Common Plan Operators", {
        contentDir: "ch08/46-index-seeks-scans-lookups-plan-operators",
        // videoUrl/durationLabel pending
      }),
      L(47, "finding-missing-duplicate-unused-indexes", "Finding Missing, Duplicate & Unused Indexes", {
        contentDir: "ch08/47-finding-missing-duplicate-unused-indexes",
        // videoUrl/durationLabel pending
      }),
      L(48, "query-store-fundamentals", "Query Store Fundamentals", {
        contentDir: "ch08/48-query-store-fundamentals",
        // videoUrl/durationLabel pending
      }),
      L(49, "using-query-store-to-find-regressed-queries", "Using Query Store to Find Regressed Queries", {
        contentDir: "ch08/49-using-query-store-to-find-regressed-queries",
        // videoUrl/durationLabel pending
      }),
      L(50, "blocking-locking-and-deadlocks", "Blocking, Locking & Deadlocks", {
        contentDir: "ch08/50-blocking-locking-and-deadlocks",
        // videoUrl/durationLabel pending
      }),
      L(51, "dmvs-for-query-performance-troubleshooting", "DMVs for Query Performance Troubleshooting", {
        contentDir: "ch08/51-dmvs-for-query-performance-troubleshooting",
        // videoUrl/durationLabel pending
      }),
      L(52, "intelligent-query-processing-and-automatic-tuning", "Intelligent Query Processing & Automatic Tuning", {
        contentDir: "ch08/52-intelligent-query-processing-and-automatic-tuning",
        // videoUrl/durationLabel pending
      }),
    ],
  },
  {
    n: 9,
    title: "Database Performance & Maintenance",
    lessons: [
      L(53, "index-maintenance-and-fragmentation", "Index Maintenance & Fragmentation", {
        contentDir: "ch09/53-index-maintenance-and-fragmentation",
        // videoUrl/durationLabel pending
      }),
      L(54, "statistics-maintenance", "Statistics Maintenance", {
        contentDir: "ch09/54-statistics-maintenance",
        // videoUrl/durationLabel pending
      }),
      L(55, "dbcc-checkdb-and-database-integrity", "DBCC CHECKDB & Database Integrity", {
        contentDir: "ch09/55-dbcc-checkdb-and-database-integrity",
        // videoUrl/durationLabel pending
      }),
      L(56, "database-scoped-configuration-and-server-settings", "Database-Scoped Configuration & Server Settings", {
        contentDir: "ch09/56-database-scoped-configuration-and-server-settings",
        // videoUrl/durationLabel pending
      }),
      L(57, "resource-governor", "Resource Governor", {
        contentDir: "ch09/57-resource-governor",
        // videoUrl/durationLabel pending
      }),
      L(58, "scaling-and-troubleshooting-resource-bottlenecks", "Scaling Compute/Storage & Troubleshooting Resource Bottlenecks", {
        contentDir: "ch09/58-scaling-and-troubleshooting-resource-bottlenecks",
        // videoUrl/durationLabel pending
      }),
    ],
  },
  {
    n: 10,
    title: "SQL Server Agent & Automation",
    lessons: [
      L(59, "sql-server-agent-fundamentals", "SQL Server Agent Fundamentals", {
        contentDir: "ch10/59-sql-server-agent-fundamentals",
        // videoUrl/durationLabel pending
      }),
      L(60, "creating-jobs-steps-and-schedules", "Creating Jobs, Steps & Schedules", {
        contentDir: "ch10/60-creating-jobs-steps-and-schedules",
        // videoUrl/durationLabel pending
      }),
      L(61, "alerts-operators-and-notifications", "Alerts, Operators & Notifications", {
        contentDir: "ch10/61-alerts-operators-and-notifications",
        // videoUrl/durationLabel pending
      }),
      L(62, "troubleshooting-failed-sql-agent-jobs", "Troubleshooting Failed SQL Agent Jobs", {
        contentDir: "ch10/62-troubleshooting-failed-sql-agent-jobs",
        // videoUrl/durationLabel pending
      }),
      L(63, "automating-dba-maintenance", "Automating DBA Maintenance", {
        contentDir: "ch10/63-automating-dba-maintenance",
        // videoUrl/durationLabel pending
      }),
      L(64, "building-a-dba-maintenance-and-monitoring-strategy", "Building a DBA Maintenance & Monitoring Strategy", {
        contentDir: "ch10/64-building-a-dba-maintenance-and-monitoring-strategy",
        // videoUrl/durationLabel pending
      }),
    ],
  },
  {
    n: 11,
    title: "Azure Automation & Infrastructure as Code",
    lessons: [
      L(65, "automating-azure-sql-administration", "Automating Azure SQL Administration", {
        contentDir: "ch11/65-automating-azure-sql-administration",
        // videoUrl/durationLabel pending
      }),
      L(66, "azure-cli-and-powershell-for-dbas", "Azure CLI & PowerShell for Database Administrators", {
        contentDir: "ch11/66-azure-cli-and-powershell-for-dbas",
        // videoUrl/durationLabel pending
      }),
      L(67, "arm-templates-and-bicep-for-azure-sql", "ARM Templates & Bicep for Azure SQL", {
        contentDir: "ch11/67-arm-templates-and-bicep-for-azure-sql",
        // videoUrl/durationLabel pending
      }),
      L(68, "elastic-jobs-and-azure-database-tasks", "Elastic Jobs & Azure Database Tasks", {
        contentDir: "ch11/68-elastic-jobs-and-azure-database-tasks",
        // videoUrl/durationLabel pending
      }),
      L(69, "automated-deployment-alerts-and-troubleshooting", "Automated Deployment, Alerts & Troubleshooting", {
        contentDir: "ch11/69-automated-deployment-alerts-and-troubleshooting",
        // videoUrl/durationLabel pending
      }),
    ],
  },
  {
    n: 12,
    title: "Database Migration to Azure",
    lessons: [
      L(70, "planning-a-sql-server-migration-to-azure", "Planning a SQL Server Migration to Azure", {
        contentDir: "ch12/70-planning-a-sql-server-migration-to-azure",
        // videoUrl/durationLabel pending
      }),
      L(71, "assessing-sql-server-before-migration", "Assessing SQL Server Before Migration", {
        contentDir: "ch12/71-assessing-sql-server-before-migration",
        // videoUrl/durationLabel pending
      }),
      L(72, "online-vs-offline-migration-strategies", "Online vs. Offline Migration Strategies", {
        contentDir: "ch12/72-online-vs-offline-migration-strategies",
        // videoUrl/durationLabel pending
      }),
      L(73, "migrating-to-azure-sql-database", "Migrating SQL Server to Azure SQL Database", {
        contentDir: "ch12/73-migrating-to-azure-sql-database",
        // videoUrl/durationLabel pending
      }),
      L(74, "migrating-to-azure-sql-managed-instance", "Migrating to Azure SQL Managed Instance", {
        contentDir: "ch12/74-migrating-to-azure-sql-managed-instance",
        // videoUrl/durationLabel pending
      }),
      L(75, "migration-troubleshooting-and-post-migration-validation", "Migration Troubleshooting & Post-Migration Validation", {
        contentDir: "ch12/75-migration-troubleshooting-and-post-migration-validation",
        // videoUrl/durationLabel pending
      }),
    ],
  },
  {
    n: 13,
    title: "Backup & Restore",
    lessons: [
      L(76, "backup-fundamentals-full-differential-log", "SQL Server Backup Fundamentals: Full, Differential & Log", {
        contentDir: "ch13/76-backup-fundamentals-full-differential-log",
        // videoUrl/durationLabel pending
      }),
      L(77, "backup-and-restore-with-ssms-and-t-sql", "Backup & Restore with SSMS and T-SQL", {
        contentDir: "ch13/77-backup-and-restore-with-ssms-and-t-sql",
        // videoUrl/durationLabel pending
      }),
      L(78, "azure-sql-automated-backups", "Azure SQL Automated Backups", {
        contentDir: "ch13/78-azure-sql-automated-backups",
        // videoUrl/durationLabel pending
      }),
      L(79, "point-in-time-restore", "Point-in-Time Restore", {
        contentDir: "ch13/79-point-in-time-restore",
        // videoUrl/durationLabel pending
      }),
      L(80, "long-term-retention-and-backup-policies", "Long-Term Retention & Backup Policies", {
        contentDir: "ch13/80-long-term-retention-and-backup-policies",
        // videoUrl/durationLabel pending
      }),
      L(81, "backup-to-azure-storage-and-disaster-recovery-scenarios", "Backup to Azure Storage & Disaster Recovery Scenarios", {
        contentDir: "ch13/81-backup-to-azure-storage-and-disaster-recovery-scenarios",
        // videoUrl/durationLabel pending
      }),
    ],
  },
  {
    n: 14,
    title: "High Availability & Disaster Recovery",
    lessons: [
      L(82, "high-availability-vs-disaster-recovery", "High Availability vs. Disaster Recovery", {
        contentDir: "ch14/82-high-availability-vs-disaster-recovery",
        // videoUrl/durationLabel pending
      }),
      L(83, "rpo-and-rto-designing-from-business-requirements", "RPO & RTO — Designing from Business Requirements", {
        contentDir: "ch14/83-rpo-and-rto-designing-from-business-requirements",
        // videoUrl/durationLabel pending
      }),
      L(84, "always-on-availability-groups", "Always On Availability Groups", {
        contentDir: "ch14/84-always-on-availability-groups",
        // videoUrl/durationLabel pending
      }),
      L(85, "failover-cluster-instances", "Failover Cluster Instances", {
        contentDir: "ch14/85-failover-cluster-instances",
        // videoUrl/durationLabel pending
      }),
      L(86, "active-geo-replication", "Active Geo-Replication", {
        contentDir: "ch14/86-active-geo-replication",
        // videoUrl/durationLabel pending
      }),
      L(87, "azure-sql-failover-groups", "Azure SQL Failover Groups", {
        contentDir: "ch14/87-azure-sql-failover-groups",
        // videoUrl/durationLabel pending
      }),
      L(88, "log-shipping-and-hybrid-ha-dr", "Log Shipping & Hybrid HA/DR", {
        contentDir: "ch14/88-log-shipping-and-hybrid-ha-dr",
        // videoUrl/durationLabel pending
      }),
      L(89, "monitoring-testing-troubleshooting-ha-dr", "Monitoring, Testing & Troubleshooting HA/DR", {
        contentDir: "ch14/89-monitoring-testing-troubleshooting-ha-dr",
        // videoUrl/durationLabel pending
      }),
    ],
  },
  {
    n: 15,
    title: "Real-World Azure DBA Project",
    lessons: [
      L(90, "project-introduction-youre-the-dba", "Project Introduction — You're the DBA", {
        contentDir: "ch15/90-project-introduction-youre-the-dba",
        // videoUrl/durationLabel pending
      }),
      L(91, "project-migrate-and-secure-the-environment", "Project — Migrate & Secure the Environment", {
        contentDir: "ch15/91-project-migrate-and-secure-the-environment",
        // videoUrl/durationLabel pending
      }),
      L(92, "project-performance-and-automation", "Project — Performance & Automation", {
        contentDir: "ch15/92-project-performance-and-automation",
        // videoUrl/durationLabel pending
      }),
      L(93, "project-ha-dr-and-disaster-simulation", "Project — HA/DR & Disaster Simulation", {
        contentDir: "ch15/93-project-ha-dr-and-disaster-simulation",
        // videoUrl/durationLabel pending
      }),
    ],
  },
  {
    n: 16,
    title: "Certification & Interview Preparation",
    lessons: [
      L(94, "dp-300-exam-review-and-practice-assessment", "DP-300 Complete Exam Review & Practice Assessment", {
        contentDir: "ch16/94-dp-300-exam-review-and-practice-assessment",
        // videoUrl/durationLabel pending
      }),
      L(95, "azure-dba-interview-preparation", "Azure DBA Interview Preparation", {
        contentDir: "ch16/95-azure-dba-interview-preparation",
        // videoUrl/durationLabel pending
      }),
    ],
  },
];
