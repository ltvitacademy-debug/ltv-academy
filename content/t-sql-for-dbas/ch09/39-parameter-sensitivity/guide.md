# Parameter Sensitivity

Lesson 38 found the worst queries by aggregate cost. Some of the worst offenders aren't
badly written at all — they're victims of parameter sniffing, where the exact same cached
plan is a great fit for one parameter value and a terrible fit for another.

## What you'll learn

- What parameter sniffing actually is and why SQL Server does it on purpose
- The real symptom pattern that identifies it versus generic slowness
- Two real fixes: `OPTION (RECOMPILE)` and Parameter Sensitive Plan optimization

## What parameter sniffing actually is

When a parameterized query or stored procedure first compiles, SQL Server "sniffs" the
actual parameter value passed in that first execution and builds a plan optimized for it —
using the statistics histogram to estimate row counts *for that specific value*. That's
usually the right call: a plan built for the real data is better than a generic one.

The problem appears when the same query's optimal plan is genuinely different for different
parameter values — most often on a skewed column, like an order status where 2% of rows are
`'Cancelled'` and 90% are `'Shipped'`. A plan built for `'Cancelled'` (expects few rows, so
picks an index seek) performs badly when reused for `'Shipped'` (actually returns most of
the table, and a seek-plus-lookup for every row is far worse than a scan).

## The real symptom pattern

Parameter sniffing has a specific, recognizable signature — worth distinguishing from
"the query is just slow":

- The exact same stored procedure runs fast for days, then suddenly runs slow — with no
  code change and no data change.
- `sys.dm_exec_query_stats` for that plan shows a huge gap between minimum and maximum
  elapsed time (`min_elapsed_time` vs. `max_elapsed_time`) for the same cached plan.
- Running the query manually with the *slow* parameter value, using a fresh plan, is fast —
  it's specifically the *cached* plan that's wrong for that value, not the query itself.

```sql
SELECT qs.min_elapsed_time, qs.max_elapsed_time, qs.execution_count, st.text
FROM sys.dm_exec_query_stats AS qs
CROSS APPLY sys.dm_exec_sql_text(qs.sql_handle) AS st
WHERE st.text LIKE '%GetOrdersByStatus%'
ORDER BY (qs.max_elapsed_time - qs.min_elapsed_time) DESC;
```

## Two real fixes

1. **`OPTION (RECOMPILE)`** — forces a fresh plan on every execution, sniffed for that
   call's actual parameter value. It trades a small compile-time cost on every run for
   guaranteed-optimal plans, which is the right trade for a procedure called
   infrequently with wildly varying parameter distributions:

```sql
SELECT OrderID, OrderDate, TotalDue
FROM Sales.SalesOrderHeader
WHERE Status = @Status
OPTION (RECOMPILE);
```

2. **Parameter Sensitive Plan (PSP) optimization** — introduced in SQL Server 2022 and
   Azure SQL, lets the optimizer cache *multiple* plans for the same query and pick between
   them based on the incoming parameter value, without a full recompile every time. It's on
   automatically for eligible queries under the 2022+ database compatibility level, and is
   the modern answer for exactly this problem on a database that's already been upgraded.

## Key terms

| Term | Meaning |
|---|---|
| Parameter sniffing | SQL Server's optimizer building a plan based on the parameter value seen at first compilation |
| `OPTION (RECOMPILE)` | Query hint forcing a fresh, freshly-sniffed plan on every execution |
| Parameter Sensitive Plan (PSP) optimization | SQL Server 2022+ feature caching multiple plans per query, chosen by parameter value |

## Check yourself

What symptom in `sys.dm_exec_query_stats` points specifically at parameter sniffing rather
than the query simply being slow?
