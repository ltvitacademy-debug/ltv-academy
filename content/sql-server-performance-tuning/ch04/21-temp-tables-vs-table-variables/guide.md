# Temp Tables vs. Table Variables

Complex queries and stored procedures often need somewhere to stage intermediate results.
SQL Server gives you two options that look almost interchangeable — `#temp` tables and
`@table` variables — but they behave differently in exactly the way that matters for
performance: how the optimizer estimates row counts against them.

## What you'll learn

- The real syntax and scoping differences between #temp tables and @table variables
- Why statistics exist for #temp tables but not, in most versions, for @table variables
- A practical rule for choosing between them based on row count

## The syntax looks similar; the behavior doesn't

```sql
-- Local temp table: lives in tempdb, visible to the current session
-- (and nested procedure calls), dropped at session end or explicit DROP
CREATE TABLE #StagingOrders (
    OrderId INT PRIMARY KEY,
    TotalDue MONEY
);
INSERT INTO #StagingOrders SELECT OrderId, TotalDue FROM dbo.Orders WHERE Status = 'Open';

-- Table variable: scoped to the current batch/procedure only,
-- also backed by tempdb storage under the hood
DECLARE @StagingOrders TABLE (
    OrderId INT PRIMARY KEY,
    TotalDue MONEY
);
INSERT INTO @StagingOrders SELECT OrderId, TotalDue FROM dbo.Orders WHERE Status = 'Open';
```

Both are physically backed by tempdb — the difference isn't "memory vs. disk," a common
misconception. The difference that actually matters is statistics.

## Statistics: the optimizer's blind spot with table variables

SQL Server maintains column statistics — histograms of value distribution — for `#temp`
tables, just like for permanent tables, and can even trigger automatic statistics updates
as the temp table's data changes. For `@table` variables, in the great majority of
supported versions and configurations, the optimizer has **no statistics at all** and
falls back to a fixed, low-row-count estimate regardless of how many rows the variable
actually holds.

That estimate mismatch has a real consequence: the optimizer might choose a plan built for
"a handful of rows" — a Nested Loops join, say — against a table variable that actually
holds a hundred thousand rows, because it never measured the real count. The same query
against an equivalent `#temp` table gets a plan built on accurate cardinality estimates,
because the optimizer has real statistics to consult.

(SQL Server 2019+ under certain compatibility levels introduced deferred compilation for
table variables that narrows this gap in some cases, but the safe, general rule below still
holds unless you've specifically verified your version and settings behave otherwise.)

## The practical rule: row count and scope

- **Small, short-lived, low row counts** (a handful to a few hundred rows) inside a single
  batch or procedure: a table variable is fine, and its narrower scope and slightly lower
  overhead for tiny data sets are a genuine, if modest, advantage.
- **Larger row counts, or anything an inaccurate cardinality estimate could meaningfully
  hurt**: use a `#temp` table so the optimizer has real statistics to build a plan around.
- **Needs an index beyond what a PRIMARY KEY/UNIQUE constraint gives you**, or benefits
  from explicit statistics maintenance: `#temp` table — you can `CREATE INDEX` on it after
  the fact, which you cannot do on a table variable.

This is the same principle as every measurement-driven decision in this course: don't pick
based on habit, pick based on what the optimizer can actually see.

## Key terms

| Term | Meaning |
|---|---|
| #temp table | A session-scoped table in tempdb with real, maintained column statistics |
| @table variable | A batch/procedure-scoped table construct, backed by tempdb, with no reliable statistics in most versions |
| Cardinality estimate | The optimizer's guess at how many rows an operation will produce, driving plan choice |
| Deferred compilation | A SQL Server 2019+ feature narrowing (not eliminating) the table-variable statistics gap in some scenarios |

## Check yourself

A stored procedure stages 200,000 rows into a `@table` variable and then joins it to a
large permanent table. What's the likely problem with the resulting execution plan, and
what's the straightforward fix?
