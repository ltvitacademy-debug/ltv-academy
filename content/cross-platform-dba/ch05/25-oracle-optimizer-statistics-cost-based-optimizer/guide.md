# Oracle Optimizer Statistics & the Cost-Based Optimizer

Reading Oracle Execution Plans showed you the output of a decision the optimizer already
made — which join, which access path, in what order. That decision comes from Oracle's
**Cost-Based Optimizer (CBO)**, and the CBO's decisions are only as good as the statistics
it's working from. Stale or missing statistics are one of the single most common causes of
a plan going bad, on any relational database — but the mechanism for keeping Oracle's
statistics fresh is Oracle's own.

## What you'll learn

- What the CBO actually estimates cost from, and why it needs statistics to do it
- The `DBMS_STATS` package: how statistics get gathered manually
- Oracle's automatic statistics-gathering job, and when it isn't enough
- Why stale statistics produce specifically bad plans, not just slow ones

## The Cost-Based Optimizer: cost is an estimate, not a fact

The CBO picks an execution plan by estimating the **cost** — a unit representing estimated
resource usage (I/O, CPU) — of the candidate plans it considers, then choosing the cheapest
one. That estimate depends entirely on knowing things like: how many rows are in this table,
how many distinct values does this column have, is the data skewed toward a few common
values, how tall is this index. All of that comes from **optimizer statistics** stored in
the data dictionary, not computed live at parse time. Wrong statistics don't just produce a
slower plan — they can produce a fundamentally wrong one, like choosing a nested loop join
for what turns out to be a million-row input, because the statistics said it would be ten
rows.

## DBMS_STATS: gathering statistics on purpose

The `DBMS_STATS` package is the supported way to gather statistics — never `ANALYZE TABLE`
for optimizer statistics in modern Oracle, which is legacy and can produce values the CBO
doesn't fully trust. Common calls:

```sql
-- Gather stats for one table (and its indexes)
EXEC DBMS_STATS.GATHER_TABLE_STATS('HR', 'EMPLOYEES');

-- Gather stats for an entire schema
EXEC DBMS_STATS.GATHER_SCHEMA_STATS('HR');

-- Preserve current stats before a risky bulk load, so you can restore them
EXEC DBMS_STATS.GATHER_TABLE_STATS(
  'HR', 'EMPLOYEES',
  method_opt => 'FOR ALL COLUMNS SIZE AUTO'
);
```

`METHOD_OPT => 'FOR ALL COLUMNS SIZE AUTO'` lets Oracle decide which columns need a
**histogram** — extra detail about the distribution of values, essential for a skewed
column (like a `STATUS` column that's 95% `'CLOSED'`) where a simple average doesn't
represent reality. `DBMS_STATS` also supports pending statistics you can test before
publishing, and the ability to lock statistics on a table you don't want auto-gathered
changing out from under you.

## The automatic statistics-gathering job

Oracle doesn't leave statistics freshness entirely to a DBA remembering to run a job. A
scheduled task — historically `GATHER_STATS_JOB`, and in modern releases the **Auto
Optimizer Stats Collection** task managed through `DBMS_AUTO_TASK_ADMIN` — runs by default
in the nightly maintenance window and refreshes statistics for tables whose data has changed
enough to matter (tracked via `DBA_TAB_MODIFICATIONS`). This handles routine drift well, but
it isn't a substitute for gathering statistics deliberately right after a large one-time
load, a truncate-and-reload, or a partition exchange — situations where you want fresh
statistics *before* the next query runs, not whenever the nightly window gets to it.

## Key terms

| Term | Meaning |
|---|---|
| Cost-Based Optimizer (CBO) | Oracle component that picks a plan by estimating and comparing plan costs |
| Optimizer statistics | Stored metadata (row counts, distinct values, histograms) the CBO uses to estimate cost |
| DBMS_STATS | Supported package for gathering optimizer statistics |
| Histogram | Extra statistics detail capturing a skewed data distribution |
| Auto Optimizer Stats Collection | Default nightly job that refreshes statistics for tables with significant data changes |

## Check yourself

A batch job just loaded 5 million new rows into a table that had 10,000 rows this morning.
Should you wait for the nightly automatic stats job, or act sooner — and what specifically
goes wrong if you don't?
