/* =====================================================================
   AZURE DBA COURSE — PERFORMANCE TRIAGE SCRIPT
   =====================================================================
   A compiled, ordered sequence of the real DMV/Query Store queries
   taught across Chapters 7-9 (Monitoring, Query Performance Tuning,
   Database Performance & Maintenance), arranged in the order you'd
   actually run them during a real "this is slow" investigation — the
   same sequence used in the Chapter 15 Meridian Fleet Logistics
   capstone to diagnose OrderManagement's 7-9am dispatch timeout.

   Run each section against the database you're triaging. Read the
   STOP AND DECIDE comments before moving to the next section — this
   script is a decision tree, not a top-to-bottom batch.
   ===================================================================== */


/* ---------------------------------------------------------------------
   STEP 1 — Is this a QUERY problem or a CAPACITY problem?
   Query Store's regressed-queries signal (Lesson 49) is the fastest
   way to tell the two apart before touching anything.
   --------------------------------------------------------------------- */

-- Queries whose average duration/CPU/reads got meaningfully worse
-- recently vs. an earlier baseline window (requires Query Store ON,
-- Lesson 48). A hit here = query problem. No hit here = keep going.
SELECT
    qsq.query_id,
    qsqt.query_sql_text,
    rs.avg_duration / 1000.0 AS avg_duration_ms,
    rs.avg_cpu_time / 1000.0 AS avg_cpu_ms,
    rs.avg_logical_io_reads,
    rsi.start_time,
    rsi.end_time
FROM sys.query_store_query qsq
JOIN sys.query_store_query_text qsqt ON qsq.query_text_id = qsqt.query_text_id
JOIN sys.query_store_plan qsp ON qsq.query_id = qsp.query_id
JOIN sys.query_store_runtime_stats rs ON qsp.plan_id = rs.plan_id
JOIN sys.query_store_runtime_stats_interval rsi ON rs.runtime_stats_interval_id = rsi.runtime_stats_interval_id
WHERE rsi.start_time >= DATEADD(DAY, -7, SYSDATETIME())
ORDER BY rs.avg_duration DESC;

-- STOP AND DECIDE:
--   Same query, worse plan, every time it runs regardless of load
--     --> QUERY PROBLEM. Go to Step 2.
--   Normal/unchanged plans, but the whole tier is maxed on CPU/IO
--   specifically during the bad window (check Azure Monitor + wait
--   stats below) --> CAPACITY PROBLEM. Go to Step 4.


/* ---------------------------------------------------------------------
   STEP 2 — Query problem: find the missing/duplicate/unused indexes
   (Lesson 47). Always confirm against a real execution plan
   (Lesson 45) before creating or dropping anything.
   --------------------------------------------------------------------- */

-- Missing indexes the optimizer wanted but didn't have
SELECT
    d.statement AS table_name,
    d.equality_columns,
    d.inequality_columns,
    d.included_columns,
    s.avg_total_user_cost,
    s.avg_user_impact,
    s.user_seeks + s.user_scans AS times_this_would_have_helped
FROM sys.dm_db_missing_index_details d
JOIN sys.dm_db_missing_index_groups g ON d.index_handle = g.index_handle
JOIN sys.dm_db_missing_index_group_stats s ON g.index_group_handle = s.group_handle
ORDER BY s.avg_user_impact * (s.user_seeks + s.user_scans) DESC;

-- Duplicate indexes (same leading key column, redundant write overhead)
SELECT
    t.name AS table_name,
    i.name AS index_name,
    c.name AS leading_column,
    i.type_desc
FROM sys.indexes i
JOIN sys.index_columns ic ON ic.object_id = i.object_id AND ic.index_id = i.index_id AND ic.key_ordinal = 1
JOIN sys.columns c ON c.object_id = ic.object_id AND c.column_id = ic.column_id
JOIN sys.tables t ON t.object_id = i.object_id
WHERE i.type_desc = 'NONCLUSTERED'
ORDER BY t.name, c.name;

-- Unused indexes (zero seeks/scans/lookups, but absorbing write cost)
SELECT
    t.name AS table_name,
    i.name AS index_name,
    s.user_seeks,
    s.user_scans,
    s.user_lookups,
    s.user_updates AS writes_this_index_absorbed
FROM sys.indexes i
JOIN sys.tables t ON t.object_id = i.object_id
LEFT JOIN sys.dm_db_index_usage_stats s
    ON s.object_id = i.object_id AND s.index_id = i.index_id AND s.database_id = DB_ID()
WHERE i.type_desc = 'NONCLUSTERED'
  AND ISNULL(s.user_seeks, 0) = 0
  AND ISNULL(s.user_scans, 0) = 0
  AND ISNULL(s.user_lookups, 0) = 0
ORDER BY ISNULL(s.user_updates, 0) DESC;


/* ---------------------------------------------------------------------
   STEP 3 — Query problem: check fragmentation before deciding
   REBUILD vs. REORGANIZE (Lesson 53). On Azure, a REBUILD competes
   with live traffic for the same metered compute — schedule it in a
   real maintenance window, not mid-incident, unless the regression
   is severe enough to justify it.
   --------------------------------------------------------------------- */

SELECT
    OBJECT_NAME(ips.object_id) AS table_name,
    i.name AS index_name,
    ips.avg_fragmentation_in_percent,
    ips.page_count
FROM sys.dm_db_index_physical_stats(DB_ID(), NULL, NULL, NULL, 'LIMITED') AS ips
JOIN sys.indexes AS i
    ON ips.object_id = i.object_id AND ips.index_id = i.index_id
WHERE ips.page_count > 500
ORDER BY ips.avg_fragmentation_in_percent DESC;

-- Rule of thumb: REORGANIZE ~5-30% fragmented, REBUILD above ~30% --
-- but only on indexes with page_count large enough to matter.


/* ---------------------------------------------------------------------
   STEP 4 — Capacity problem: confirm it with wait statistics and
   blocking (Lessons 43, 50, 51) instead of assuming from Azure
   Monitor alone.
   --------------------------------------------------------------------- */

-- Top wait types right now, by accumulated wait time
SELECT TOP 20
    wait_type,
    waiting_tasks_count,
    wait_time_ms,
    signal_wait_time_ms,
    wait_time_ms - signal_wait_time_ms AS resource_wait_time_ms
FROM sys.dm_os_wait_stats
WHERE wait_type NOT IN (
    'CLR_SEMAPHORE','LAZYWRITER_SLEEP','RESOURCE_QUEUE','SLEEP_TASK',
    'SLEEP_SYSTEMTASK','WAITFOR','XE_DISPATCHER_WAIT','BROKER_TO_FLUSH'
)
ORDER BY wait_time_ms DESC;

-- Who is blocking whom, right now
SELECT
    blocking.session_id   AS blocking_session_id,
    blocked.session_id    AS blocked_session_id,
    blocked.wait_type,
    blocked.wait_time,
    blocked.wait_resource
FROM sys.dm_exec_requests blocked
JOIN sys.dm_exec_sessions blocking ON blocked.blocking_session_id = blocking.session_id
WHERE blocked.blocking_session_id <> 0;

-- STOP AND DECIDE:
--   High CXPACKET/CXCONSUMER/RESOURCE_SEMAPHORE/PAGEIOLATCH waits
--   concentrated in the bad window, with no blocking and no
--   regressed plans --> genuine capacity problem. Scale the tier, or
--   spread the load. Do NOT spend time tuning a query that isn't
--   actually the cause.
--   Heavy blocking chains --> that's a locking problem, not a
--   capacity one — go to Lesson 50's blocking/deadlock playbook
--   instead of scaling compute.
