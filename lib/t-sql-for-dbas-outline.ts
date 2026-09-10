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
      L(1, "system-databases", "System Databases: master, msdb, model & tempdb"),
      L(2, "sys-catalog-views", "sys Catalog Views"),
      L(3, "dmvs-and-dmfs-overview", "DMVs & DMFs, Overview"),
      L(4, "server-and-database-properties", "Server & Database Properties"),
      L(5, "sessions-and-connections", "Sessions & Connections"),
    ],
  },
  {
    n: 2,
    title: "DBA Monitoring with T-SQL",
    lessons: [
      L(6, "monitoring-cpu-memory-io", "Monitoring CPU, Memory & I/O With T-SQL"),
      L(7, "active-sessions-and-expensive-queries", "Active Sessions & Expensive Queries"),
      L(8, "wait-statistics", "Wait Statistics"),
      L(9, "blocking-chains", "Finding Blocking Chains"),
      L(10, "tempdb-usage-and-database-space", "TempDB Usage & Database Space"),
    ],
  },
  {
    n: 3,
    title: "Index & Statistics Administration",
    lessons: [
      L(11, "inspecting-indexes-and-fragmentation", "Inspecting Indexes & Fragmentation"),
      L(12, "missing-unused-duplicate-indexes", "Missing, Unused & Duplicate Indexes"),
      L(13, "statistics-maintenance", "Statistics: Inspecting & Maintaining"),
      L(14, "when-not-to-rebuild-an-index", "When Not to Rebuild an Index"),
    ],
  },
  {
    n: 4,
    title: "Transactions, Locking & Deadlocks",
    lessons: [
      L(15, "open-transactions", "Finding Open Transactions"),
      L(16, "locks-and-blocking", "Locks & Blocking"),
      L(17, "isolation-levels-in-practice", "Isolation Levels in Practice"),
      L(18, "deadlock-investigation", "Deadlock Investigation"),
    ],
  },
  {
    n: 5,
    title: "Backup & Recovery with T-SQL",
    lessons: [
      L(19, "backup-database-and-backup-log", "BACKUP DATABASE & BACKUP LOG"),
      L(20, "restore-fundamentals", "RESTORE Fundamentals"),
      L(21, "restore-sequences-and-point-in-time-recovery", "Restore Sequences & Point-in-Time Recovery"),
      L(22, "restore-verifyonly", "RESTORE VERIFYONLY"),
      L(23, "backup-history-and-validation", "Backup History & Recovery Validation"),
    ],
  },
  {
    n: 6,
    title: "Security Administration with T-SQL",
    lessons: [
      L(24, "logins-users-roles-permissions", "Logins, Users, Roles & Permissions"),
      L(25, "grant-deny-revoke-in-practice", "GRANT, DENY & REVOKE, in Practice"),
      L(26, "finding-orphaned-users", "Finding Orphaned Users"),
      L(27, "auditing-and-security-queries", "Auditing & Security Queries"),
    ],
  },
  {
    n: 7,
    title: "SQL Server Agent & Automation",
    lessons: [
      L(28, "querying-job-history", "Querying Job History"),
      L(29, "identifying-failed-jobs", "Identifying Failed Jobs"),
      L(30, "creating-and-managing-jobs-with-t-sql", "Creating & Managing Jobs With T-SQL"),
      L(31, "alerts-and-operators", "Alerts & Operators"),
    ],
  },
  {
    n: 8,
    title: "Database Integrity & Maintenance",
    lessons: [
      L(32, "dbcc-checkdb-in-practice", "DBCC CHECKDB, in Practice"),
      L(33, "consistency-errors", "Consistency Errors"),
      L(34, "file-growth-and-autogrowth", "File Growth & Autogrowth"),
      L(35, "capacity-monitoring", "Capacity Monitoring"),
    ],
  },
  {
    n: 9,
    title: "Performance Troubleshooting with T-SQL",
    lessons: [
      L(36, "query-store-queries", "Query Store Queries"),
      L(37, "execution-plans-and-plan-cache", "Execution Plans & the Plan Cache"),
      L(38, "top-resource-consuming-queries", "Top Resource-Consuming Queries"),
      L(39, "parameter-sensitivity", "Parameter Sensitivity"),
      L(40, "recompilation-and-baselines", "Recompilation & Performance Baselines"),
    ],
  },
  {
    n: 10,
    title: "Build Your DBA Toolkit",
    lessons: [
      L(41, "the-toolkit-concept", "The Toolkit Concept: Reusable, Reliable, Documented"),
      L(42, "server-health-check-and-database-space-scripts", "Server Health Check & Database Space Scripts"),
      L(43, "backup-status-and-failed-jobs-scripts", "Backup Status & Failed Jobs Scripts"),
      L(44, "blocking-and-long-running-query-scripts", "Blocking & Long-Running Query Scripts"),
      L(45, "capstone-assembling-the-toolkit", "Capstone: Assembling & Presenting Your DBA Toolkit"),
    ],
  },
];
