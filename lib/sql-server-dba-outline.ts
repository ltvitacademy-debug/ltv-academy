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
      L(1, "the-database-engine", "The Database Engine", {
        contentDir: "ch01/01-the-database-engine",
        // videoUrl/durationLabel pending
      }),
      L(2, "storage-engine-internals", "Storage Engine Internals", { contentDir: "ch01/02-storage-engine-internals" }),
      L(3, "memory-architecture", "Memory Architecture", { contentDir: "ch01/03-memory-architecture" }),
      L(4, "sqlos", "SQLOS", { contentDir: "ch01/04-sqlos" }),
      L(5, "editions-and-versions", "Editions & Versions", { contentDir: "ch01/05-editions-and-versions" }),
      L(6, "system-databases-deep-dive", "System Databases, Deep Dive", { contentDir: "ch01/06-system-databases-deep-dive" }),
    ],
  },
  {
    n: 2,
    title: "Installing & Configuring SQL Server",
    lessons: [
      L(7, "installation-planning", "Installation Planning", { contentDir: "ch02/07-installation-planning" }),
      L(8, "installing-sql-server", "Installing SQL Server", { contentDir: "ch02/08-installing-sql-server" }),
      L(9, "post-install-configuration", "Post-Install Configuration", { contentDir: "ch02/09-post-install-configuration" }),
      L(10, "instance-configuration", "Instance Configuration", { contentDir: "ch02/10-instance-configuration" }),
      L(11, "server-level-settings", "Server-Level Settings", { contentDir: "ch02/11-server-level-settings" }),
      L(12, "collations", "Collations", { contentDir: "ch02/12-collations" }),
      L(13, "service-accounts-and-configuration-manager", "Service Accounts & Configuration Manager", { contentDir: "ch02/13-service-accounts-and-configuration-manager" }),
    ],
  },
  {
    n: 3,
    title: "Database Creation & Configuration",
    lessons: [
      L(14, "creating-databases", "Creating Databases", { contentDir: "ch03/14-creating-databases" }),
      L(15, "file-and-filegroup-design", "File & Filegroup Design", { contentDir: "ch03/15-file-and-filegroup-design" }),
      L(16, "database-options", "Database Options", { contentDir: "ch03/16-database-options" }),
      L(17, "recovery-models", "Recovery Models", { contentDir: "ch03/17-recovery-models" }),
      L(18, "database-scoped-configuration", "Database-Scoped Configuration", { contentDir: "ch03/18-database-scoped-configuration" }),
      L(19, "auto-settings", "AUTO Settings", { contentDir: "ch03/19-auto-settings" }),
      L(20, "extended-database-properties", "Extended Database Properties", { contentDir: "ch03/20-extended-database-properties" }),
    ],
  },
  {
    n: 4,
    title: "Storage & Files",
    lessons: [
      L(21, "data-file-and-log-file-management", "Data File & Log File Management", { contentDir: "ch04/21-data-file-and-log-file-management" }),
      L(22, "tempdb-configuration", "TempDB Configuration", { contentDir: "ch04/22-tempdb-configuration" }),
      L(23, "file-growth-strategy", "File Growth Strategy", { contentDir: "ch04/23-file-growth-strategy" }),
      L(24, "storage-best-practices", "Storage Best Practices", { contentDir: "ch04/24-storage-best-practices" }),
      L(25, "disk-layout-for-sql-server", "Disk Layout for SQL Server", { contentDir: "ch04/25-disk-layout-for-sql-server" }),
    ],
  },
  {
    n: 5,
    title: "Security Fundamentals for SQL Server",
    lessons: [
      L(26, "authentication-modes", "Authentication Modes", { contentDir: "ch05/26-authentication-modes" }),
      L(27, "server-principals-and-logins", "Server Principals & Logins", { contentDir: "ch05/27-server-principals-and-logins" }),
      L(28, "database-principals-and-users", "Database Principals & Users", { contentDir: "ch05/28-database-principals-and-users" }),
      L(29, "fixed-roles", "Fixed Roles", { contentDir: "ch05/29-fixed-roles" }),
      L(30, "custom-roles-and-permissions", "Custom Roles & Permissions", { contentDir: "ch05/30-custom-roles-and-permissions" }),
      L(31, "encryption-overview", "Encryption Overview", { contentDir: "ch05/31-encryption-overview" }),
      L(32, "auditing-setup", "Auditing Setup", { contentDir: "ch05/32-auditing-setup" }),
    ],
  },
  {
    n: 6,
    title: "Maintenance Plans & Routine Administration",
    lessons: [
      L(33, "maintenance-plan-basics", "Maintenance Plan Basics", { contentDir: "ch06/33-maintenance-plan-basics" }),
      L(34, "index-maintenance-jobs", "Index Maintenance Jobs", { contentDir: "ch06/34-index-maintenance-jobs" }),
      L(35, "statistics-jobs", "Statistics Jobs", { contentDir: "ch06/35-statistics-jobs" }),
      L(36, "backup-jobs", "Backup Jobs", { contentDir: "ch06/36-backup-jobs" }),
      L(37, "integrity-check-jobs", "Integrity Check Jobs", { contentDir: "ch06/37-integrity-check-jobs" }),
      L(38, "ola-hallengrens-scripts", "Ola Hallengren's Maintenance Scripts, the Industry Standard", { contentDir: "ch06/38-ola-hallengrens-scripts" }),
    ],
  },
  {
    n: 7,
    title: "SQL Server Agent Administration",
    lessons: [
      L(39, "agent-architecture", "Agent Architecture", { contentDir: "ch07/39-agent-architecture" }),
      L(40, "job-creation", "Job Creation", { contentDir: "ch07/40-job-creation" }),
      L(41, "schedules", "Schedules", { contentDir: "ch07/41-schedules" }),
      L(42, "alerts-and-operators", "Alerts & Operators", { contentDir: "ch07/42-alerts-and-operators" }),
      L(43, "proxies-and-credentials", "Proxies & Credentials", { contentDir: "ch07/43-proxies-and-credentials" }),
      L(44, "agent-troubleshooting", "Agent Troubleshooting", { contentDir: "ch07/44-agent-troubleshooting" }),
    ],
  },
  {
    n: 8,
    title: "Linked Servers & Connectivity",
    lessons: [
      L(45, "linked-server-setup", "Linked Server Setup", { contentDir: "ch08/45-linked-server-setup" }),
      L(46, "remote-queries", "Remote Queries", { contentDir: "ch08/46-remote-queries" }),
      L(47, "connectivity-troubleshooting", "Connectivity Troubleshooting", { contentDir: "ch08/47-connectivity-troubleshooting" }),
      L(48, "network-configuration", "Network Configuration", { contentDir: "ch08/48-network-configuration" }),
    ],
  },
  {
    n: 9,
    title: "Change Management",
    lessons: [
      L(49, "version-control-for-database-objects", "Version Control for Database Objects", { contentDir: "ch09/49-version-control-for-database-objects" }),
      L(50, "deployment-strategies", "Deployment Strategies", { contentDir: "ch09/50-deployment-strategies" }),
      L(51, "change-tracking", "Change Tracking", { contentDir: "ch09/51-change-tracking" }),
      L(52, "database-documentation", "Database Documentation", { contentDir: "ch09/52-database-documentation" }),
      L(53, "managing-schema-drift", "Managing Schema Drift", { contentDir: "ch09/53-managing-schema-drift" }),
      L(54, "rolling-back-a-bad-deployment", "Rolling Back a Bad Deployment", { contentDir: "ch09/54-rolling-back-a-bad-deployment" }),
    ],
  },
  {
    n: 10,
    title: "Production Support Fundamentals",
    lessons: [
      L(55, "triage-methodology", "Triage Methodology", { contentDir: "ch10/55-triage-methodology" }),
      L(56, "common-production-issues", "Common Production Issues", { contentDir: "ch10/56-common-production-issues" }),
      L(57, "escalation-and-communication", "Escalation & Communication", { contentDir: "ch10/57-escalation-and-communication" }),
      L(58, "on-call-basics", "On-Call Basics", { contentDir: "ch10/58-on-call-basics" }),
      L(59, "incident-documentation", "Incident Documentation", { contentDir: "ch10/59-incident-documentation" }),
    ],
  },
  {
    n: 11,
    title: "Upgrades & Patching",
    lessons: [
      L(60, "sql-server-upgrade-planning", "SQL Server Upgrade Planning", { contentDir: "ch11/60-sql-server-upgrade-planning" }),
      L(61, "patching-strategy", "Patching Strategy", { contentDir: "ch11/61-patching-strategy" }),
      L(62, "testing-upgrades", "Testing Upgrades", { contentDir: "ch11/62-testing-upgrades" }),
      L(63, "rollback-planning", "Rollback Planning", { contentDir: "ch11/63-rollback-planning" }),
    ],
  },
  {
    n: 12,
    title: "Capstone",
    lessons: [
      L(64, "capstone-kickoff", "Capstone Kickoff: You Inherit a Production Server", { contentDir: "ch12/64-capstone-kickoff" }),
      L(65, "capstone-install-and-configure", "Capstone: Install & Configure", { contentDir: "ch12/65-capstone-install-and-configure" }),
      L(66, "capstone-secure-and-maintain", "Capstone: Secure & Maintain", { contentDir: "ch12/66-capstone-secure-and-maintain" }),
      L(67, "capstone-production-support-scenario", "Capstone: A Production Support Scenario", { contentDir: "ch12/67-capstone-production-support-scenario" }),
      L(68, "capstone-change-management-scenario", "Capstone: A Change Management Scenario", { contentDir: "ch12/68-capstone-change-management-scenario" }),
      L(69, "capstone-presenting-your-work", "Capstone: Presenting Your Work", { contentDir: "ch12/69-capstone-presenting-your-work" }),
      L(70, "capstone-wrap-up", "Capstone: Wrap-Up & Portfolio Presentation", { contentDir: "ch12/70-capstone-wrap-up" }),
    ],
  },
];
