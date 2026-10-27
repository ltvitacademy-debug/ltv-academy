// The full SQL Server Database Administration course outline. Only lessons
// with a contentDir + videoUrl are playable; everything else renders as
// "in production". Assumes T-SQL Development and T-SQL for Database
// Administrators — this course is general, on-prem-flavored SQL Server
// administration: installation, configuration, architecture, security,
// maintenance, Agent, and production support, before Azure enters the
// picture at all.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/sql-server-dba/
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

export const SQL_SERVER_DBA_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "SQL Server Architecture",
    lessons: [
      L(1, "the-database-engine", "The Database Engine", { contentDir: "ch01/01-the-database-engine", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-server-dba/the-database-engine.mp4", durationLabel: "1 min 1 s" }),
      L(2, "storage-engine-internals", "Storage Engine Internals", { contentDir: "ch01/02-storage-engine-internals", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-server-dba/storage-engine-internals.mp4", durationLabel: "1 min 30 s" }),
      L(3, "memory-architecture", "Memory Architecture", { contentDir: "ch01/03-memory-architecture", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-server-dba/memory-architecture.mp4", durationLabel: "1 min 37 s" }),
      L(4, "sqlos", "SQLOS", { contentDir: "ch01/04-sqlos", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-server-dba/sqlos.mp4", durationLabel: "1 min 4 s" }),
      L(5, "editions-and-versions", "Editions & Versions", { contentDir: "ch01/05-editions-and-versions", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-server-dba/editions-and-versions.mp4", durationLabel: "1 min 12 s" }),
      L(6, "system-databases-deep-dive", "System Databases, Deep Dive", { contentDir: "ch01/06-system-databases-deep-dive", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-server-dba/system-databases-deep-dive.mp4", durationLabel: "1 min 17 s" }),
    ],
  },
  {
    n: 2,
    title: "Installing & Configuring SQL Server",
    lessons: [
      L(7, "installation-planning", "Installation Planning", { contentDir: "ch02/07-installation-planning", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-server-dba/installation-planning.mp4", durationLabel: "1 min 9 s" }),
      L(8, "installing-sql-server", "Installing SQL Server", { contentDir: "ch02/08-installing-sql-server", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-server-dba/installing-sql-server.mp4", durationLabel: "1 min 15 s" }),
      L(9, "post-install-configuration", "Post-Install Configuration", { contentDir: "ch02/09-post-install-configuration", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-server-dba/post-install-configuration.mp4", durationLabel: "1 min 25 s" }),
      L(10, "instance-configuration", "Instance Configuration", { contentDir: "ch02/10-instance-configuration", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-server-dba/instance-configuration.mp4", durationLabel: "1 min 13 s" }),
      L(11, "server-level-settings", "Server-Level Settings", { contentDir: "ch02/11-server-level-settings", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-server-dba/server-level-settings.mp4", durationLabel: "1 min 18 s" }),
      L(12, "collations", "Collations", { contentDir: "ch02/12-collations", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-server-dba/collations.mp4", durationLabel: "1 min 27 s" }),
      L(13, "service-accounts-and-configuration-manager", "Service Accounts & Configuration Manager", { contentDir: "ch02/13-service-accounts-and-configuration-manager", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-server-dba/service-accounts-and-configuration-manager.mp4", durationLabel: "1 min 20 s" }),
    ],
  },
  {
    n: 3,
    title: "Database Creation & Configuration",
    lessons: [
      L(14, "creating-databases", "Creating Databases", { contentDir: "ch03/14-creating-databases", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-server-dba/creating-databases.mp4", durationLabel: "1 min 0 s" }),
      L(15, "file-and-filegroup-design", "File & Filegroup Design", { contentDir: "ch03/15-file-and-filegroup-design", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-server-dba/file-and-filegroup-design.mp4", durationLabel: "1 min 9 s" }),
      L(16, "database-options", "Database Options", { contentDir: "ch03/16-database-options", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-server-dba/database-options.mp4", durationLabel: "1 min 9 s" }),
      L(17, "recovery-models", "Recovery Models", { contentDir: "ch03/17-recovery-models", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-server-dba/recovery-models.mp4", durationLabel: "1 min 4 s" }),
      L(18, "database-scoped-configuration", "Database-Scoped Configuration", { contentDir: "ch03/18-database-scoped-configuration", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-server-dba/database-scoped-configuration.mp4", durationLabel: "1 min 3 s" }),
      L(19, "auto-settings", "AUTO Settings", { contentDir: "ch03/19-auto-settings", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-server-dba/auto-settings.mp4", durationLabel: "1 min 18 s" }),
      L(20, "extended-database-properties", "Extended Database Properties", { contentDir: "ch03/20-extended-database-properties", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-server-dba/extended-database-properties.mp4", durationLabel: "59 s" }),
    ],
  },
  {
    n: 4,
    title: "Storage & Files",
    lessons: [
      L(21, "data-file-and-log-file-management", "Data File & Log File Management", { contentDir: "ch04/21-data-file-and-log-file-management", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-server-dba/data-file-and-log-file-management.mp4", durationLabel: "1 min 11 s" }),
      L(22, "tempdb-configuration", "TempDB Configuration", { contentDir: "ch04/22-tempdb-configuration", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-server-dba/tempdb-configuration.mp4", durationLabel: "1 min 15 s" }),
      L(23, "file-growth-strategy", "File Growth Strategy", { contentDir: "ch04/23-file-growth-strategy", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-server-dba/file-growth-strategy.mp4", durationLabel: "1 min 13 s" }),
      L(24, "storage-best-practices", "Storage Best Practices", { contentDir: "ch04/24-storage-best-practices", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-server-dba/storage-best-practices.mp4", durationLabel: "1 min 4 s" }),
      L(25, "disk-layout-for-sql-server", "Disk Layout for SQL Server", { contentDir: "ch04/25-disk-layout-for-sql-server", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-server-dba/disk-layout-for-sql-server.mp4", durationLabel: "1 min 4 s" }),
    ],
  },
  {
    n: 5,
    title: "Security Fundamentals for SQL Server",
    lessons: [
      L(26, "authentication-modes", "Authentication Modes", { contentDir: "ch05/26-authentication-modes", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-server-dba/authentication-modes.mp4", durationLabel: "1 min 28 s" }),
      L(27, "server-principals-and-logins", "Server Principals & Logins", { contentDir: "ch05/27-server-principals-and-logins", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-server-dba/server-principals-and-logins.mp4", durationLabel: "1 min 13 s" }),
      L(28, "database-principals-and-users", "Database Principals & Users", { contentDir: "ch05/28-database-principals-and-users", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-server-dba/database-principals-and-users.mp4", durationLabel: "1 min 24 s" }),
      L(29, "fixed-roles", "Fixed Roles", { contentDir: "ch05/29-fixed-roles", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-server-dba/fixed-roles.mp4", durationLabel: "1 min 27 s" }),
      L(30, "custom-roles-and-permissions", "Custom Roles & Permissions", { contentDir: "ch05/30-custom-roles-and-permissions", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-server-dba/custom-roles-and-permissions.mp4", durationLabel: "1 min 11 s" }),
      L(31, "encryption-overview", "Encryption Overview", { contentDir: "ch05/31-encryption-overview", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-server-dba/encryption-overview.mp4", durationLabel: "1 min 19 s" }),
      L(32, "auditing-setup", "Auditing Setup", { contentDir: "ch05/32-auditing-setup", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-server-dba/auditing-setup.mp4", durationLabel: "1 min 20 s" }),
    ],
  },
  {
    n: 6,
    title: "Maintenance Plans & Routine Administration",
    lessons: [
      L(33, "maintenance-plan-basics", "Maintenance Plan Basics", { contentDir: "ch06/33-maintenance-plan-basics", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-server-dba/maintenance-plan-basics.mp4", durationLabel: "1 min 25 s" }),
      L(34, "index-maintenance-jobs", "Index Maintenance Jobs", { contentDir: "ch06/34-index-maintenance-jobs", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-server-dba/index-maintenance-jobs.mp4", durationLabel: "1 min 13 s" }),
      L(35, "statistics-jobs", "Statistics Jobs", { contentDir: "ch06/35-statistics-jobs", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-server-dba/statistics-jobs.mp4", durationLabel: "1 min 16 s" }),
      L(36, "backup-jobs", "Backup Jobs", { contentDir: "ch06/36-backup-jobs", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-server-dba/backup-jobs.mp4", durationLabel: "1 min 23 s" }),
      L(37, "integrity-check-jobs", "Integrity Check Jobs", { contentDir: "ch06/37-integrity-check-jobs", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-server-dba/integrity-check-jobs.mp4", durationLabel: "1 min 18 s" }),
      L(38, "ola-hallengrens-scripts", "Ola Hallengren's Maintenance Scripts, the Industry Standard", { contentDir: "ch06/38-ola-hallengrens-scripts", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-server-dba/ola-hallengrens-scripts.mp4", durationLabel: "1 min 24 s" }),
    ],
  },
  {
    n: 7,
    title: "SQL Server Agent Administration",
    lessons: [
      L(39, "agent-architecture", "Agent Architecture", { contentDir: "ch07/39-agent-architecture", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-server-dba/agent-architecture.mp4", durationLabel: "1 min 7 s" }),
      L(40, "job-creation", "Job Creation", { contentDir: "ch07/40-job-creation", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-server-dba/job-creation.mp4", durationLabel: "1 min 18 s" }),
      L(41, "schedules", "Schedules", { contentDir: "ch07/41-schedules", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-server-dba/schedules.mp4", durationLabel: "1 min 19 s" }),
      L(42, "alerts-and-operators", "Alerts & Operators", { contentDir: "ch07/42-alerts-and-operators", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-server-dba/alerts-and-operators.mp4", durationLabel: "1 min 15 s" }),
      L(43, "proxies-and-credentials", "Proxies & Credentials", { contentDir: "ch07/43-proxies-and-credentials", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-server-dba/proxies-and-credentials.mp4", durationLabel: "1 min 21 s" }),
      L(44, "agent-troubleshooting", "Agent Troubleshooting", { contentDir: "ch07/44-agent-troubleshooting", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-server-dba/agent-troubleshooting.mp4", durationLabel: "1 min 16 s" }),
    ],
  },
  {
    n: 8,
    title: "Linked Servers & Connectivity",
    lessons: [
      L(45, "linked-server-setup", "Linked Server Setup", { contentDir: "ch08/45-linked-server-setup", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-server-dba/linked-server-setup.mp4", durationLabel: "1 min 19 s" }),
      L(46, "remote-queries", "Remote Queries", { contentDir: "ch08/46-remote-queries", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-server-dba/remote-queries.mp4", durationLabel: "1 min 13 s" }),
      L(47, "connectivity-troubleshooting", "Connectivity Troubleshooting", { contentDir: "ch08/47-connectivity-troubleshooting", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-server-dba/connectivity-troubleshooting.mp4", durationLabel: "1 min 27 s" }),
      L(48, "network-configuration", "Network Configuration", { contentDir: "ch08/48-network-configuration", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-server-dba/network-configuration.mp4", durationLabel: "1 min 28 s" }),
    ],
  },
  {
    n: 9,
    title: "Change Management",
    lessons: [
      L(49, "version-control-for-database-objects", "Version Control for Database Objects", { contentDir: "ch09/49-version-control-for-database-objects", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-server-dba/version-control-for-database-objects.mp4", durationLabel: "57 s" }),
      L(50, "deployment-strategies", "Deployment Strategies", { contentDir: "ch09/50-deployment-strategies", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-server-dba/deployment-strategies.mp4", durationLabel: "1 min 2 s" }),
      L(51, "change-tracking", "Change Tracking", { contentDir: "ch09/51-change-tracking", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-server-dba/change-tracking.mp4", durationLabel: "54 s" }),
      L(52, "database-documentation", "Database Documentation", { contentDir: "ch09/52-database-documentation", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-server-dba/database-documentation.mp4", durationLabel: "60 s" }),
      L(53, "managing-schema-drift", "Managing Schema Drift", { contentDir: "ch09/53-managing-schema-drift", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-server-dba/managing-schema-drift.mp4", durationLabel: "54 s" }),
      L(54, "rolling-back-a-bad-deployment", "Rolling Back a Bad Deployment", { contentDir: "ch09/54-rolling-back-a-bad-deployment", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-server-dba/rolling-back-a-bad-deployment.mp4", durationLabel: "1 min 1 s" }),
    ],
  },
  {
    n: 10,
    title: "Production Support Fundamentals",
    lessons: [
      L(55, "triage-methodology", "Triage Methodology", { contentDir: "ch10/55-triage-methodology", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-server-dba/triage-methodology.mp4", durationLabel: "58 s" }),
      L(56, "common-production-issues", "Common Production Issues", { contentDir: "ch10/56-common-production-issues", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-server-dba/common-production-issues.mp4", durationLabel: "1 min 6 s" }),
      L(57, "escalation-and-communication", "Escalation & Communication", { contentDir: "ch10/57-escalation-and-communication", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-server-dba/escalation-and-communication.mp4", durationLabel: "58 s" }),
      L(58, "on-call-basics", "On-Call Basics", { contentDir: "ch10/58-on-call-basics", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-server-dba/on-call-basics.mp4", durationLabel: "58 s" }),
      L(59, "incident-documentation", "Incident Documentation", { contentDir: "ch10/59-incident-documentation", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-server-dba/incident-documentation.mp4", durationLabel: "52 s" }),
    ],
  },
  {
    n: 11,
    title: "Upgrades & Patching",
    lessons: [
      L(60, "sql-server-upgrade-planning", "SQL Server Upgrade Planning", { contentDir: "ch11/60-sql-server-upgrade-planning", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-server-dba/sql-server-upgrade-planning.mp4", durationLabel: "1 min 10 s" }),
      L(61, "patching-strategy", "Patching Strategy", { contentDir: "ch11/61-patching-strategy", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-server-dba/patching-strategy.mp4", durationLabel: "1 min 4 s" }),
      L(62, "testing-upgrades", "Testing Upgrades", { contentDir: "ch11/62-testing-upgrades", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-server-dba/testing-upgrades.mp4", durationLabel: "1 min 1 s" }),
      L(63, "rollback-planning", "Rollback Planning", { contentDir: "ch11/63-rollback-planning", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-server-dba/rollback-planning.mp4", durationLabel: "1 min 1 s" }),
    ],
  },
  {
    n: 12,
    title: "Capstone",
    lessons: [
      L(64, "capstone-kickoff", "Capstone Kickoff: You Inherit a Production Server", { contentDir: "ch12/64-capstone-kickoff", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-server-dba/capstone-kickoff.mp4", durationLabel: "1 min 29 s" }),
      L(65, "capstone-install-and-configure", "Capstone: Install & Configure", { contentDir: "ch12/65-capstone-install-and-configure", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-server-dba/capstone-install-and-configure.mp4", durationLabel: "1 min 11 s" }),
      L(66, "capstone-secure-and-maintain", "Capstone: Secure & Maintain", { contentDir: "ch12/66-capstone-secure-and-maintain", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-server-dba/capstone-secure-and-maintain.mp4", durationLabel: "1 min 12 s" }),
      L(67, "capstone-production-support-scenario", "Capstone: A Production Support Scenario", { contentDir: "ch12/67-capstone-production-support-scenario", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-server-dba/capstone-production-support-scenario.mp4", durationLabel: "1 min 15 s" }),
      L(68, "capstone-change-management-scenario", "Capstone: A Change Management Scenario", { contentDir: "ch12/68-capstone-change-management-scenario", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-server-dba/capstone-change-management-scenario.mp4", durationLabel: "1 min 2 s" }),
      L(69, "capstone-presenting-your-work", "Capstone: Presenting Your Work", { contentDir: "ch12/69-capstone-presenting-your-work", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-server-dba/capstone-presenting-your-work.mp4", durationLabel: "1 min 13 s" }),
      L(70, "capstone-wrap-up", "Capstone: Wrap-Up & Portfolio Presentation", { contentDir: "ch12/70-capstone-wrap-up", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-server-dba/capstone-wrap-up.mp4", durationLabel: "1 min 11 s" }),
    ],
  },
];
