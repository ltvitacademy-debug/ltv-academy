# Project — Performance Tuning Across Platforms

Three tickets land in the same week: finance says the month-end report is timing out, the web team
says checkout is lagging during a sale, and the BI team says a dashboard that used to load in
seconds now takes minutes. Same discipline every time — measure, identify, change, verify — but a
completely different toolset on each platform, because that's what Chapters 5, 10, and 15 each
built toward.

## What you'll learn

- The same four-step tuning discipline applied to three architecturally different systems
- A specific, plausible incident and fix on Oracle, MySQL, and PostgreSQL
- Why the same symptom — "it's slow" — has a different root cause and a different tool on each platform
- How to talk through a before/after performance fix, which Lesson 95 will turn into interview material

## Oracle: the month-end trial balance report

**Measure.** The finance team's trial balance report joins `GL_JOURNAL_LINES` against the chart of
accounts and used to finish in under a minute; this month it ran for twenty. Chapter 5's AWR report
for the period shows the query at the top of the SQL ordered by elapsed time, and
`DBMS_XPLAN.DISPLAY_CURSOR` shows the optimizer doing a full table scan on `GL_JOURNAL_LINES`.

**Identify.** Two candidates: no index supports the query's filter on `journal_date`, and the table
has grown all quarter without a statistics refresh, so the cost-based optimizer's row estimates are
stale.

**Change.** Both get fixed:

```
CREATE INDEX gl_journal_lines_date_ix ON finapp.gl_journal_lines(journal_date);
EXEC DBMS_STATS.GATHER_TABLE_STATS('FINAPP', 'GL_JOURNAL_LINES');
```

**Verify.** Re-running `DBMS_XPLAN.DISPLAY_CURSOR` shows an index range scan instead of a full
table scan, and the report finishes in under a minute again.

## MySQL: checkout lag under load

**Measure.** During a flash sale, checkout queries against `storefront.orders` slow down badly.
Chapter 10's `EXPLAIN` on the query that looks up a customer's recent orders by email shows `type:
ALL` — a full table scan — against a table now holding millions of rows.

```
EXPLAIN SELECT * FROM orders WHERE customer_email = 'name@example.com';
```

**Identify.** There's no index on `customer_email`, so every lookup scans the whole `orders` table,
and under sale-day concurrency that's the bottleneck.

**Change.**

```
CREATE INDEX orders_customer_email_ix ON orders(customer_email);
```

**Verify.** `EXPLAIN` now shows `type: ref` using the new index instead of `type: ALL`, and query
time drops from seconds to milliseconds. Chapter 10's Performance Schema confirms wait time on this
query pattern dropped sharply after the change.

## PostgreSQL: the bloated sales_fact table

**Measure.** The BI dashboard built on `sales_fact` has slowed steadily over weeks, not suddenly.
Chapter 15's `pg_stat_user_tables` shows `n_dead_tup` (dead tuples) far higher than `n_live_tup` for
`sales_fact`.

```
SELECT relname, n_live_tup, n_dead_tup
FROM pg_stat_user_tables WHERE relname = 'sales_fact';
```

**Identify.** The nightly ETL job upserts into `sales_fact` heavily — lots of `UPDATE`s under
PostgreSQL's MVCC model, each one leaving a dead row version behind. Autovacuum is running, but its
default `autovacuum_vacuum_scale_factor` threshold means it waits until 20% of the table is dead
rows before it kicks in — too infrequent for a table this update-heavy.

**Change.** Tighten autovacuum specifically for this table, rather than globally:

```
ALTER TABLE sales_fact SET (autovacuum_vacuum_scale_factor = 0.02);
VACUUM ANALYZE sales_fact;
```

**Verify.** `pg_stat_user_tables` shows `n_dead_tup` staying low going forward, and the dashboard's
`EXPLAIN ANALYZE` shows less time spent scanning past dead rows.

## Key terms

| Term | Meaning |
|---|---|
| AWR | Oracle's Automatic Workload Repository, used here to find the top elapsed-time query |
| EXPLAIN (MySQL) | Shows MySQL's query execution plan, including scan type (`ALL` vs `ref`, etc.) |
| Dead tuple | A PostgreSQL row version left behind by an UPDATE or DELETE under MVCC, reclaimed by VACUUM |
| autovacuum_vacuum_scale_factor | The fraction of dead rows that triggers autovacuum on a table; can be tuned per table |

## Check yourself

For each of the three incidents in this lesson, state the specific command used to measure the
problem and the specific command used to verify the fix worked.
