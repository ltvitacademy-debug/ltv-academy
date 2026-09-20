// The full T-SQL for Database Administrators course outline. Only lessons
// with a contentDir + videoUrl are playable; everything else renders as
// "in production". Assumes T-SQL Development's SQL language foundation —
// SELECT/JOIN/GROUP BY/CTEs/stored procedures are NOT retaught. This course
// asks a different question: not "how do I write SQL to work with data,"
// but "how do I use T-SQL to figure out what's wrong with SQL Server and
// fix it?"

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/t-sql-for-dbas/
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

export const TSQL_FOR_DBAS_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "SQL Server Internals Through T-SQL",
    lessons: [
      L(1, "system-databases", "System Databases: master, msdb, model & tempdb", {
        contentDir: "ch01/01-system-databases",
        // videoUrl/durationLabel pending
      }),
      L(2, "sys-catalog-views", "sys Catalog Views", { contentDir: "ch01/02-sys-catalog-views" }),
      L(3, "dmvs-and-dmfs-overview", "DMVs & DMFs, Overview", { contentDir: "ch01/03-dmvs-and-dmfs-overview" }),
      L(4, "server-and-database-properties", "Server & Database Properties", { contentDir: "ch01/04-server-and-database-properties" }),
      L(5, "sessions-and-connections", "Sessions & Connections", { contentDir: "ch01/05-sessions-and-connections" }),
    ],
  },
  {
    n: 2,
    title: "DBA Monitoring with T-SQL",
    lessons: [
      L(6, "monitoring-cpu-memory-io", "Monitoring CPU, Memory & I/O With T-SQL", { contentDir: "ch02/06-monitoring-cpu-memory-io" }),
      L(7, "active-sessions-and-expensive-queries", "Active Sessions & Expensive Queries", { contentDir: "ch02/07-active-sessions-and-expensive-queries" }),
      L(8, "wait-statistics", "Wait Statistics", { contentDir: "ch02/08-wait-statistics" }),
      L(9, "blocking-chains", "Finding Blocking Chains", { contentDir: "ch02/09-blocking-chains" }),
      L(10, "tempdb-usage-and-database-space", "TempDB Usage & Database Space", { contentDir: "ch02/10-tempdb-usage-and-database-space" }),
    ],
  },
  {
    n: 3,
    title: "Index & Statistics Administration",
    lessons: [
      L(11, "inspecting-indexes-and-fragmentation", "Inspecting Indexes & Fragmentation", { contentDir: "ch03/11-inspecting-indexes-and-fragmentation" }),
      L(12, "missing-unused-duplicate-indexes", "Missing, Unused & Duplicate Indexes", { contentDir: "ch03/12-missing-unused-duplicate-indexes" }),
      L(13, "statistics-maintenance", "Statistics: Inspecting & Maintaining", { contentDir: "ch03/13-statistics-maintenance" }),
      L(14, "when-not-to-rebuild-an-index", "When Not to Rebuild an Index", { contentDir: "ch03/14-when-not-to-rebuild-an-index" }),
    ],
  },
  {
    n: 4,
    title: "Transactions, Locking & Deadlocks",
    lessons: [
      L(15, "open-transactions", "Finding Open Transactions", { contentDir: "ch04/15-open-transactions" }),
      L(16, "locks-and-blocking", "Locks & Blocking", { contentDir: "ch04/16-locks-and-blocking" }),
      L(17, "isolation-levels-in-practice", "Isolation Levels in Practice", { contentDir: "ch04/17-isolation-levels-in-practice" }),
      L(18, "deadlock-investigation", "Deadlock Investigation", { contentDir: "ch04/18-deadlock-investigation" }),
    ],
  },
  {
    n: 5,
    title: "Backup & Recovery with T-SQL",
    lessons: [
      L(19, "backup-database-and-backup-log", "BACKUP DATABASE & BACKUP LOG", { contentDir: "ch05/19-backup-database-and-backup-log" }),
      L(20, "restore-fundamentals", "RESTORE Fundamentals", { contentDir: "ch05/20-restore-fundamentals" }),
      L(21, "restore-sequences-and-point-in-time-recovery", "Restore Sequences & Point-in-Time Recovery", { contentDir: "ch05/21-restore-sequences-and-point-in-time-recovery" }),
      L(22, "restore-verifyonly", "RESTORE VERIFYONLY", { contentDir: "ch05/22-restore-verifyonly" }),
      L(23, "backup-history-and-validation", "Backup History & Recovery Validation", { contentDir: "ch05/23-backup-history-and-validation" }),
    ],
  },
  {
    n: 6,
    title: "Security Administration with T-SQL",
    lessons: [
      L(24, "logins-users-roles-permissions", "Logins, Users, Roles & Permissions", { contentDir: "ch06/24-logins-users-roles-permissions" }),
      L(25, "grant-deny-revoke-in-practice", "GRANT, DENY & REVOKE, in Practice", { contentDir: "ch06/25-grant-deny-revoke-in-practice" }),
      L(26, "finding-orphaned-users", "Finding Orphaned Users", { contentDir: "ch06/26-finding-orphaned-users" }),
      L(27, "auditing-and-security-queries", "Auditing & Security Queries", { contentDir: "ch06/27-auditing-and-security-queries" }),
    ],
  },
  {
    n: 7,
    title: "SQL Server Agent & Automation",
    lessons: [
      L(28, "querying-job-history", "Querying Job History", { contentDir: "ch07/28-querying-job-history" }),
      L(29, "identifying-failed-jobs", "Identifying Failed Jobs", { contentDir: "ch07/29-identifying-failed-jobs" }),
      L(30, "creating-and-managing-jobs-with-t-sql", "Creating & Managing Jobs With T-SQL", { contentDir: "ch07/30-creating-and-managing-jobs-with-t-sql" }),
      L(31, "alerts-and-operators", "Alerts & Operators", { contentDir: "ch07/31-alerts-and-operators" }),
    ],
  },
  {
    n: 8,
    title: "Database Integrity & Maintenance",
    lessons: [
      L(32, "dbcc-checkdb-in-practice", "DBCC CHECKDB, in Practice", { contentDir: "ch08/32-dbcc-checkdb-in-practice" }),
      L(33, "consistency-errors", "Consistency Errors", { contentDir: "ch08/33-consistency-errors" }),
      L(34, "file-growth-and-autogrowth", "File Growth & Autogrowth", { contentDir: "ch08/34-file-growth-and-autogrowth" }),
      L(35, "capacity-monitoring", "Capacity Monitoring", { contentDir: "ch08/35-capacity-monitoring" }),
    ],
  },
  {
    n: 9,
    title: "Performance Troubleshooting with T-SQL",
    lessons: [
      L(36, "query-store-queries", "Query Store Queries", { contentDir: "ch09/36-query-store-queries" }),
      L(37, "execution-plans-and-plan-cache", "Execution Plans & the Plan Cache", { contentDir: "ch09/37-execution-plans-and-plan-cache" }),
      L(38, "top-resource-consuming-queries", "Top Resource-Consuming Queries", { contentDir: "ch09/38-top-resource-consuming-queries" }),
      L(39, "parameter-sensitivity", "Parameter Sensitivity", { contentDir: "ch09/39-parameter-sensitivity" }),
      L(40, "recompilation-and-baselines", "Recompilation & Performance Baselines", { contentDir: "ch09/40-recompilation-and-baselines" }),
    ],
  },
  {
    n: 10,
    title: "Build Your DBA Toolkit",
    lessons: [
      L(41, "the-toolkit-concept", "The Toolkit Concept: Reusable, Reliable, Documented", { contentDir: "ch10/41-the-toolkit-concept" }),
      L(42, "server-health-check-and-database-space-scripts", "Server Health Check & Database Space Scripts", { contentDir: "ch10/42-server-health-check-and-database-space-scripts" }),
      L(43, "backup-status-and-failed-jobs-scripts", "Backup Status & Failed Jobs Scripts", { contentDir: "ch10/43-backup-status-and-failed-jobs-scripts" }),
      L(44, "blocking-and-long-running-query-scripts", "Blocking & Long-Running Query Scripts", { contentDir: "ch10/44-blocking-and-long-running-query-scripts" }),
      L(45, "capstone-assembling-the-toolkit", "Capstone: Assembling & Presenting Your DBA Toolkit", { contentDir: "ch10/45-capstone-assembling-the-toolkit" }),
    ],
  },
];
