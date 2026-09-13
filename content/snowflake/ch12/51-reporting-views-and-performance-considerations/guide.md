# Lesson 51 — Building Reporting Views & Performance Considerations

**Chapter 12 · Power BI + Snowflake · Lesson 51 of 60**

## What you'll learn

- Why Power BI shouldn't query raw fact tables directly
- How to build a pre-aggregated reporting view, and secure it with `CREATE SECURE VIEW`
- Where Snowflake's materialized views help — and where their limits mean you need a Task instead
- The performance levers that matter most for BI query patterns specifically

## Don't point Power BI at the fact table

A raw fact table is built for flexibility — every grain, every column,
every join path a future analyst might need. A Power BI report needs
none of that: it needs a small number of pre-shaped, pre-aggregated
results, queried the same way over and over by dashboard filters and
slicers. Exposing the fact table directly means every refresh or
DirectQuery interaction re-does the same joins and aggregations from
scratch, and every column on the fact table becomes something a report
author could accidentally expose.

The fix is a **reporting layer**: views built specifically for what
Power BI needs, sitting between the warehouse layer's fact/dimension
tables (Chapter 6) and the report.

```sql
CREATE OR REPLACE SECURE VIEW rpt.sales_daily_summary AS
SELECT
    order_date,
    region,
    SUM(sales_amount)        AS total_sales,
    COUNT(DISTINCT order_id) AS order_count
FROM analytics.fact_sales
GROUP BY order_date, region;
```

## Why `SECURE`, specifically

An ordinary view's query text and execution plan details can leak
through Snowflake's query profile and optimizer to a sufficiently
curious user with access to the underlying tables. `SECURE` closes
that: it hides the view's definition from anyone without privileges on
it, and disables certain optimizer behaviors that could otherwise leak
information about the underlying data through query plans. Any view
exposed to a BI tool — where the intent is "you can see the summary,
not the raw rows behind it" — should be `SECURE` by default, the same
way you'd default to least-privilege roles in Chapter 9.

## Materialized views help — with a real limitation

Snowflake also supports **materialized views**, which physically store
and automatically maintain their result set instead of recomputing it
on every query — genuinely useful for an expensive aggregation queried
constantly by a dashboard. The limitation that matters here: Snowflake
materialized views only support a **single underlying table** — no
joins. That rules them out for most fact-plus-dimension reporting
views like the one above.

```sql
CREATE MATERIALIZED VIEW mv_daily_order_totals AS
SELECT order_date, SUM(sales_amount) AS total_sales
FROM analytics.fact_sales
GROUP BY order_date;
```

When the reporting view genuinely needs to join fact and dimension
tables — the normal case — the real-world pattern is a scheduled
**Task** (Chapter 8) that runs on a cadence and writes the join's
pre-aggregated result into a physical summary table, which the view
(or Power BI directly) then reads from. That trades some freshness for
a query that costs almost nothing to serve, however many times Power
BI asks for it that day.

## Performance levers that matter for BI query patterns

- **Clustering keys** (`ALTER TABLE ... CLUSTER BY (order_date)`) —
  keep a large fact table's micro-partitions organized around the
  columns dashboards filter on most (usually a date), so Snowflake can
  prune to the relevant partitions instead of scanning everything.
- **Result caching** — Snowflake automatically caches a query's exact
  results for 24 hours. Identical dashboard queries (the same filter
  state, hit by more than one viewer) can be served from cache at
  effectively zero compute cost — one more reason DirectQuery cost
  depends heavily on how *varied* the interactions actually are, not
  just how many there are.
- **Right-sized reporting warehouse** (Lesson 50) — a warehouse tuned
  for many small, similar queries (the BI pattern) rather than the
  large batch transforms an ELT warehouse handles.

## Key terms

| Term | Meaning |
|---|---|
| Reporting view | A view purpose-built for BI consumption, pre-aggregated and often secured |
| `SECURE VIEW` | A view that hides its definition and limits optimizer info leakage |
| Materialized view | A view whose result is physically stored and auto-maintained — single table only |
| Clustering key | The column(s) Snowflake organizes a large table's micro-partitions around |
| Result cache | Snowflake's automatic 24-hour cache of identical query results |

## Lab

1. Create a `SECURE VIEW` over a fact table in your environment that
   aggregates to a coarser grain than the raw table (e.g. daily
   instead of per-transaction).
2. Run `SELECT GET_DDL('VIEW', 'rpt.sales_daily_summary');` as a
   privileged role, then try it as a role with only `SELECT` on the
   view — confirm the definition isn't visible to the second role.
3. Try `CREATE MATERIALIZED VIEW` against a single fact table with a
   simple aggregation, and note the error Snowflake returns if you try
   to add a join to it.

## Check yourself

You're ready for Lesson 52 when you can explain why a materialized
view isn't always the answer for a reporting view that joins fact and
dimension tables, and what the real alternative is when it isn't.
