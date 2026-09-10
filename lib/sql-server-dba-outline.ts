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
      L(1, "the-database-engine", "The Database Engine"),
      L(2, "storage-engine-internals", "Storage Engine Internals"),
      L(3, "memory-architecture", "Memory Architecture"),
      L(4, "sqlos", "SQLOS"),
      L(5, "editions-and-versions", "Editions & Versions"),
      L(6, "system-databases-deep-dive", "System Databases, Deep Dive"),
    ],
  },
  {
    n: 2,
    title: "Installing & Configuring SQL Server",
    lessons: [
      L(7, "installation-planning", "Installation Planning"),
      L(8, "installing-sql-server", "Installing SQL Server"),
      L(9, "post-install-configuration", "Post-Install Configuration"),
      L(10, "instance-configuration", "Instance Configuration"),
      L(11, "server-level-settings", "Server-Level Settings"),
      L(12, "collations", "Collations"),
      L(13, "service-accounts-and-configuration-manager", "Service Accounts & Configuration Manager"),
    ],
  },
  {
    n: 3,
    title: "Database Creation & Configuration",
    lessons: [
      L(14, "creating-databases", "Creating Databases"),
      L(15, "file-and-filegroup-design", "File & Filegroup Design"),
      L(16, "database-options", "Database Options"),
      L(17, "recovery-models", "Recovery Models"),
      L(18, "database-scoped-configuration", "Database-Scoped Configuration"),
      L(19, "auto-settings", "AUTO Settings"),
      L(20, "extended-database-properties", "Extended Database Properties"),
    ],
  },
  {
    n: 4,
    title: "Storage & Files",
    lessons: [
      L(21, "data-file-and-log-file-management", "Data File & Log File Management"),
      L(22, "tempdb-configuration", "TempDB Configuration"),
      L(23, "file-growth-strategy", "File Growth Strategy"),
      L(24, "storage-best-practices", "Storage Best Practices"),
      L(25, "disk-layout-for-sql-server", "Disk Layout for SQL Server"),
    ],
  },
  {
    n: 5,
    title: "Security Fundamentals for SQL Server",
    lessons: [
      L(26, "authentication-modes", "Authentication Modes"),
      L(27, "server-principals-and-logins", "Server Principals & Logins"),
      L(28, "database-principals-and-users", "Database Principals & Users"),
      L(29, "fixed-roles", "Fixed Roles"),
      L(30, "custom-roles-and-permissions", "Custom Roles & Permissions"),
      L(31, "encryption-overview", "Encryption Overview"),
      L(32, "auditing-setup", "Auditing Setup"),
    ],
  },
  {
    n: 6,
    title: "Maintenance Plans & Routine Administration",
    lessons: [
      L(33, "maintenance-plan-basics", "Maintenance Plan Basics"),
      L(34, "index-maintenance-jobs", "Index Maintenance Jobs"),
      L(35, "statistics-jobs", "Statistics Jobs"),
      L(36, "backup-jobs", "Backup Jobs"),
      L(37, "integrity-check-jobs", "Integrity Check Jobs"),
      L(38, "ola-hallengrens-scripts", "Ola Hallengren's Maintenance Scripts, the Industry Standard"),
    ],
  },
  {
    n: 7,
    title: "SQL Server Agent Administration",
    lessons: [
      L(39, "agent-architecture", "Agent Architecture"),
      L(40, "job-creation", "Job Creation"),
      L(41, "schedules", "Schedules"),
      L(42, "alerts-and-operators", "Alerts & Operators"),
      L(43, "proxies-and-credentials", "Proxies & Credentials"),
      L(44, "agent-troubleshooting", "Agent Troubleshooting"),
    ],
  },
  {
    n: 8,
    title: "Linked Servers & Connectivity",
    lessons: [
      L(45, "linked-server-setup", "Linked Server Setup"),
      L(46, "remote-queries", "Remote Queries"),
      L(47, "connectivity-troubleshooting", "Connectivity Troubleshooting"),
      L(48, "network-configuration", "Network Configuration"),
    ],
  },
  {
    n: 9,
    title: "Change Management",
    lessons: [
      L(49, "version-control-for-database-objects", "Version Control for Database Objects"),
      L(50, "deployment-strategies", "Deployment Strategies"),
      L(51, "change-tracking", "Change Tracking"),
      L(52, "database-documentation", "Database Documentation"),
      L(53, "managing-schema-drift", "Managing Schema Drift"),
      L(54, "rolling-back-a-bad-deployment", "Rolling Back a Bad Deployment"),
    ],
  },
  {
    n: 10,
    title: "Production Support Fundamentals",
    lessons: [
      L(55, "triage-methodology", "Triage Methodology"),
      L(56, "common-production-issues", "Common Production Issues"),
      L(57, "escalation-and-communication", "Escalation & Communication"),
      L(58, "on-call-basics", "On-Call Basics"),
      L(59, "incident-documentation", "Incident Documentation"),
    ],
  },
  {
    n: 11,
    title: "Upgrades & Patching",
    lessons: [
      L(60, "sql-server-upgrade-planning", "SQL Server Upgrade Planning"),
      L(61, "patching-strategy", "Patching Strategy"),
      L(62, "testing-upgrades", "Testing Upgrades"),
      L(63, "rollback-planning", "Rollback Planning"),
    ],
  },
  {
    n: 12,
    title: "Capstone",
    lessons: [
      L(64, "capstone-kickoff", "Capstone Kickoff: You Inherit a Production Server"),
      L(65, "capstone-install-and-configure", "Capstone: Install & Configure"),
      L(66, "capstone-secure-and-maintain", "Capstone: Secure & Maintain"),
      L(67, "capstone-production-support-scenario", "Capstone: A Production Support Scenario"),
      L(68, "capstone-change-management-scenario", "Capstone: A Change Management Scenario"),
      L(69, "capstone-presenting-your-work", "Capstone: Presenting Your Work"),
      L(70, "capstone-wrap-up", "Capstone: Wrap-Up & Portfolio Presentation"),
    ],
  },
];
