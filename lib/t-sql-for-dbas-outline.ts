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
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792163875/ltv-t-sql-for-dbas/system-databases.mp4",
        durationLabel: "1 min 26 s",
      }),
      L(2, "sys-catalog-views", "sys Catalog Views", { contentDir: "ch01/02-sys-catalog-views",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792163959/ltv-t-sql-for-dbas/sys-catalog-views.mp4",
        durationLabel: "1 min 54 s",
      }),
      L(3, "dmvs-and-dmfs-overview", "DMVs & DMFs, Overview", { contentDir: "ch01/03-dmvs-and-dmfs-overview",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792164034/ltv-t-sql-for-dbas/dmvs-and-dmfs-overview.mp4",
        durationLabel: "2 min 5 s",
      }),
      L(4, "server-and-database-properties", "Server & Database Properties", { contentDir: "ch01/04-server-and-database-properties",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792164105/ltv-t-sql-for-dbas/server-and-database-properties.mp4",
        durationLabel: "1 min 52 s",
      }),
      L(5, "sessions-and-connections", "Sessions & Connections", { contentDir: "ch01/05-sessions-and-connections",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792164167/ltv-t-sql-for-dbas/sessions-and-connections.mp4",
        durationLabel: "1 min 45 s",
      }),
    ],
  },
  {
    n: 2,
    title: "DBA Monitoring with T-SQL",
    lessons: [
      L(6, "monitoring-cpu-memory-io", "Monitoring CPU, Memory & I/O With T-SQL", { contentDir: "ch02/06-monitoring-cpu-memory-io",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792164225/ltv-t-sql-for-dbas/monitoring-cpu-memory-io.mp4",
        durationLabel: "1 min 47 s",
      }),
      L(7, "active-sessions-and-expensive-queries", "Active Sessions & Expensive Queries", { contentDir: "ch02/07-active-sessions-and-expensive-queries",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792164299/ltv-t-sql-for-dbas/active-sessions-and-expensive-queries.mp4",
        durationLabel: "1 min 57 s",
      }),
      L(8, "wait-statistics", "Wait Statistics", { contentDir: "ch02/08-wait-statistics",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792164372/ltv-t-sql-for-dbas/wait-statistics.mp4",
        durationLabel: "2 min 4 s",
      }),
      L(9, "blocking-chains", "Finding Blocking Chains", { contentDir: "ch02/09-blocking-chains",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792164430/ltv-t-sql-for-dbas/blocking-chains.mp4",
        durationLabel: "1 min 40 s",
      }),
      L(10, "tempdb-usage-and-database-space", "TempDB Usage & Database Space", { contentDir: "ch02/10-tempdb-usage-and-database-space",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792164492/ltv-t-sql-for-dbas/tempdb-usage-and-database-space.mp4",
        durationLabel: "1 min 47 s",
      }),
    ],
  },
  {
    n: 3,
    title: "Index & Statistics Administration",
    lessons: [
      L(11, "inspecting-indexes-and-fragmentation", "Inspecting Indexes & Fragmentation", { contentDir: "ch03/11-inspecting-indexes-and-fragmentation",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792164549/ltv-t-sql-for-dbas/inspecting-indexes-and-fragmentation.mp4",
        durationLabel: "1 min 34 s",
      }),
      L(12, "missing-unused-duplicate-indexes", "Missing, Unused & Duplicate Indexes", { contentDir: "ch03/12-missing-unused-duplicate-indexes",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792164614/ltv-t-sql-for-dbas/missing-unused-duplicate-indexes.mp4",
        durationLabel: "1 min 50 s",
      }),
      L(13, "statistics-maintenance", "Statistics: Inspecting & Maintaining", { contentDir: "ch03/13-statistics-maintenance",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792164679/ltv-t-sql-for-dbas/statistics-maintenance.mp4",
        durationLabel: "1 min 48 s",
      }),
      L(14, "when-not-to-rebuild-an-index", "When Not to Rebuild an Index", { contentDir: "ch03/14-when-not-to-rebuild-an-index",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792164743/ltv-t-sql-for-dbas/when-not-to-rebuild-an-index.mp4",
        durationLabel: "1 min 45 s",
      }),
    ],
  },
  {
    n: 4,
    title: "Transactions, Locking & Deadlocks",
    lessons: [
      L(15, "open-transactions", "Finding Open Transactions", { contentDir: "ch04/15-open-transactions",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792164811/ltv-t-sql-for-dbas/open-transactions.mp4",
        durationLabel: "1 min 52 s",
      }),
      L(16, "locks-and-blocking", "Locks & Blocking", { contentDir: "ch04/16-locks-and-blocking",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792164881/ltv-t-sql-for-dbas/locks-and-blocking.mp4",
        durationLabel: "1 min 53 s",
      }),
      L(17, "isolation-levels-in-practice", "Isolation Levels in Practice", { contentDir: "ch04/17-isolation-levels-in-practice",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792164952/ltv-t-sql-for-dbas/isolation-levels-in-practice.mp4",
        durationLabel: "1 min 56 s",
      }),
      L(18, "deadlock-investigation", "Deadlock Investigation", { contentDir: "ch04/18-deadlock-investigation",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792165017/ltv-t-sql-for-dbas/deadlock-investigation.mp4",
        durationLabel: "1 min 48 s",
      }),
    ],
  },
  {
    n: 5,
    title: "Backup & Recovery with T-SQL",
    lessons: [
      L(19, "backup-database-and-backup-log", "BACKUP DATABASE & BACKUP LOG", { contentDir: "ch05/19-backup-database-and-backup-log",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792165078/ltv-t-sql-for-dbas/backup-database-and-backup-log.mp4",
        durationLabel: "1 min 38 s",
      }),
      L(20, "restore-fundamentals", "RESTORE Fundamentals", { contentDir: "ch05/20-restore-fundamentals",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792165147/ltv-t-sql-for-dbas/restore-fundamentals.mp4",
        durationLabel: "1 min 51 s",
      }),
      L(21, "restore-sequences-and-point-in-time-recovery", "Restore Sequences & Point-in-Time Recovery", { contentDir: "ch05/21-restore-sequences-and-point-in-time-recovery",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792165223/ltv-t-sql-for-dbas/restore-sequences-and-point-in-time-recovery.mp4",
        durationLabel: "2 min 5 s",
      }),
      L(22, "restore-verifyonly", "RESTORE VERIFYONLY", { contentDir: "ch05/22-restore-verifyonly",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792165288/ltv-t-sql-for-dbas/restore-verifyonly.mp4",
        durationLabel: "1 min 47 s",
      }),
      L(23, "backup-history-and-validation", "Backup History & Recovery Validation", { contentDir: "ch05/23-backup-history-and-validation",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792165360/ltv-t-sql-for-dbas/backup-history-and-validation.mp4",
        durationLabel: "1 min 57 s",
      }),
    ],
  },
  {
    n: 6,
    title: "Security Administration with T-SQL",
    lessons: [
      L(24, "logins-users-roles-permissions", "Logins, Users, Roles & Permissions", { contentDir: "ch06/24-logins-users-roles-permissions",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792165430/ltv-t-sql-for-dbas/logins-users-roles-permissions.mp4",
        durationLabel: "1 min 56 s",
      }),
      L(25, "grant-deny-revoke-in-practice", "GRANT, DENY & REVOKE, in Practice", { contentDir: "ch06/25-grant-deny-revoke-in-practice",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792165500/ltv-t-sql-for-dbas/grant-deny-revoke-in-practice.mp4",
        durationLabel: "1 min 55 s",
      }),
      L(26, "finding-orphaned-users", "Finding Orphaned Users", { contentDir: "ch06/26-finding-orphaned-users",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792165565/ltv-t-sql-for-dbas/finding-orphaned-users.mp4",
        durationLabel: "1 min 47 s",
      }),
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
