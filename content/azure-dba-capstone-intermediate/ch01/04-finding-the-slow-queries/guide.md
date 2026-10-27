# Lesson 4 — Finding the Slow Queries

**Chapter 1 · Intermediate Capstone: Two Departments, One Performance Problem · Lesson 4 of 16**

## What you'll learn

- Step 2 of the investigation plan: turning long-running requests into specific, readable queries
- `sys.dm_exec_query_stats` for cumulative, per-plan resource statistics
- `sys.dm_exec_sql_text` for turning an opaque handle into the actual query text
- What this step actually finds for `OverlookClinicalDB`

## From session IDs to actual query text

Lesson 3 found specific `session_id` values with unusually high
`total_elapsed_time`. That's a start, but a session ID alone doesn't
tell you *what query* ran. `sys.dm_exec_query_stats` has the answer —
cumulative execution statistics for every plan currently sitting in
the plan cache, accumulated since that plan was compiled.

## Ranking by resource cost

```sql
SELECT TOP 10
    qs.total_worker_time / qs.execution_count AS avg_cpu_time,
    qs.total_logical_reads / qs.execution_count AS avg_logical_reads,
    qs.execution_count,
    qs.total_elapsed_time / qs.execution_count AS avg_elapsed_time,
    qs.plan_handle,
    qs.sql_handle
FROM sys.dm_exec_query_stats qs
ORDER BY qs.total_worker_time DESC;
```

This ranks every cached plan by total CPU time consumed — the same
kind of "worst offenders" list a Query Store report would give you,
sourced live from the plan cache instead of persisted history.
`plan_handle` and `sql_handle` are opaque binary identifiers, not
useful on their own yet.

## Turning a handle into readable text

```sql
SELECT
    qs.total_worker_time / qs.execution_count AS avg_cpu_time,
    qs.execution_count,
    st.text AS query_text
FROM sys.dm_exec_query_stats qs
CROSS APPLY sys.dm_exec_sql_text(qs.sql_handle) st
ORDER BY qs.total_worker_time DESC;
```

`CROSS APPLY` calls `sys.dm_exec_sql_text` once per row, passing in
that row's own `sql_handle`, and returns the actual T-SQL text that
produced the plan. Run this during (or just after) the mid-morning
window from Lesson 3, and one query rises to the top of the list by a
wide margin:

```sql
SELECT InvoiceID, PatientID, ProviderID, InvoiceDate, Amount, Status
FROM dbo.Invoices
WHERE PatientID = @PatientID
ORDER BY InvoiceDate DESC;
```

This is Billing's invoice-lookup query — the exact screen the Billing
team described as "crawling all week." High `execution_count` (it
runs every time a billing clerk opens a patient record) combined with
a high `avg_logical_reads` per execution is the specific signature of
a query reading far more data than it needs to for a single patient's
invoices.

## One finding, one open question

Finding this query confirms Billing's complaint has a specific,
identifiable cause — not just "the database feels slow" in general.
It does **not** yet explain Scheduling's complaint. Nothing in this
query touches `dbo.Appointments` at all, which is the first real
evidence that this investigation may turn up more than one root
cause, exactly as Lesson 2 anticipated.

## Key terms

| Term | Meaning |
|---|---|
| `sys.dm_exec_query_stats` | Cumulative execution statistics per cached plan since compilation |
| `sys.dm_exec_sql_text` | Converts a `sql_handle` into the actual, readable query text |
| `avg_logical_reads` | Average number of data pages read per execution — a key cost signal |

## Lab

Run the `CROSS APPLY` query above against your own practice database
and identify the single highest `total_worker_time` query. Note its
`execution_count` and `avg_logical_reads` — you'll carry this exact
query into Lesson 5 to read its execution plan.

## Check yourself

You're ready for Lesson 5 when you can explain, without looking: what
does `CROSS APPLY sys.dm_exec_sql_text(qs.sql_handle)` actually do,
and why does finding Billing's invoice query not automatically explain
Scheduling's complaint too?
