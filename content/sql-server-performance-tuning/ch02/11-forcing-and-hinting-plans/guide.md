# Forcing & Hinting Plans

Lessons 9 and 10 covered why a cached plan misbehaves and where plans actually live. This
lesson covers the last resort: taking direct control over which plan SQL Server uses, when
you need certainty rather than trusting the optimizer's next guess.

## What you'll learn

- Query hints that constrain the optimizer's choices without rewriting the query:
  `FORCESEEK` and `OPTION (MAXDOP n)`
- `USE PLAN` — pinning an exact plan by its XML shape, and why it's so brittle
- Why `sp_query_store_force_plan` is a more surgical, reversible alternative to a
  hard-coded hint

## Query hints: steering the optimizer, not replacing it

A **query hint** constrains the choices the optimizer is allowed to make for one specific
query, without changing what the query returns. `FORCESEEK` tells the optimizer it must
produce a seek against a given index rather than a scan — useful when cost estimates keep
talking the optimizer into a scan that you've measured performs worse for this workload's
actual data distribution.

```sql
SELECT OrderId, OrderDate
FROM Sales.SalesOrderHeader WITH (FORCESEEK)
WHERE CustomerID = @CustomerID;

-- Force a seek against a specific named index
SELECT OrderId, OrderDate
FROM Sales.SalesOrderHeader WITH (FORCESEEK, INDEX(IX_SalesOrderHeader_CustomerID))
WHERE CustomerID = @CustomerID;
```

`OPTION (MAXDOP n)` overrides the instance-level `max degree of parallelism` setting
(Lesson 38) for one query only, capping — or, with `MAXDOP 1`, eliminating — parallelism
without touching the server-wide configuration every other query still uses.

```sql
SELECT CustomerId, SUM(TotalDue)
FROM Sales.SalesOrderHeader
GROUP BY CustomerId
OPTION (MAXDOP 1);
```

Both hints are narrow and targeted: they change one decision for one query, and that
decision is visible right in the query text every time someone reads it.

## USE PLAN: pinning the exact shape

`OPTION (USE PLAN N'<xml>')` goes further than steering — it hands the optimizer a
complete plan, captured earlier as XML from an actual or estimated plan, and asks it to
reproduce that exact shape.

```sql
SELECT OrderId, OrderDate
FROM Sales.SalesOrderHeader
WHERE CustomerID = @CustomerID
OPTION (USE PLAN N'<ShowPlanXML xmlns="http://schemas.microsoft.com/sqlserver/2004/07/showplan">
  ...
</ShowPlanXML>');
```

This guarantees a specific plan the way nothing short of it can — but it's also the most
brittle hint in this lesson. The XML is tied to the exact schema and statistics that
existed when it was captured; add a column, rebuild an index, or let statistics drift
meaningfully, and the pinned shape can quietly stop being achievable, at which point SQL
Server falls back to compiling normally anyway. Embedding a large literal XML blob
directly in application code is also awkward to maintain and easy to leave stale long
after the underlying tables have changed. It exists for narrow situations — a known-good
plan you must guarantee during a migration window, for example — not as routine practice.

## A more surgical, reversible alternative: sp_query_store_force_plan

Query Store (Chapter 7 goes deep on it) offers a fundamentally different way to force a
plan: instead of a literal hint baked into the query text, you force a *previously
captured, already-executed* plan by its plan ID, entirely outside the application code.

```sql
-- Find candidate plan_ids for a query_id from Query Store's own history
SELECT plan_id, query_id, is_forced_plan, last_execution_time
FROM sys.query_store_plan
WHERE query_id = 42;

EXEC sys.sp_query_store_force_plan @query_id = 42, @plan_id = 117;

-- Reversible at any time, with no code change either way
EXEC sys.sp_query_store_unforce_plan @query_id = 42, @plan_id = 117;
```

This is more surgical than `USE PLAN` in every practical way: no XML to author or embed,
no application deployment required to apply or remove it, and the forced state is visible
and auditable directly in Query Store's own views — anyone can see a plan is being forced
and undo it in one statement. Lesson 34 (Chapter 7) goes deep on forcing plans through
Query Store; this lesson is the introduction to why it's generally the preferred option
over a hard-coded hint.

## Key terms

| Term | Meaning |
|---|---|
| Query hint | A directive constraining the optimizer's choices for one query, without changing results |
| FORCESEEK | Hint forcing an index seek (optionally on a named index) instead of a scan |
| OPTION (MAXDOP n) | Query-level override of the degree of parallelism, without changing server configuration |
| USE PLAN | Hint pinning an exact plan via literal XML; guarantees a shape but breaks silently on schema/stat drift |
| sp_query_store_force_plan | Query Store procedure forcing a captured plan by plan_id; reversible, requires no code change |

## Check yourself

A query occasionally reverts to a slow scan-based plan after a statistics update, and a
known-good seek-based plan already exists in its history. Why might forcing that plan
through `sp_query_store_force_plan` be preferable here to hard-coding a `FORCESEEK` or
`USE PLAN` hint directly into the application's query text?
