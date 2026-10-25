# Lesson 60 — Capstone: Translate a Real T-SQL Reporting Query Into Three Other Dialects

**Chapter 10 · Migration, Translation & Capstone · Lesson 3 of 5**

## What you'll learn

- One complete, realistic T-SQL reporting query that touches a join, a `GROUP BY` aggregate, a
  window function, and string concatenation — four things this course has covered individually
- A full, decision-by-decision translation of that query into Oracle, MySQL, and PostgreSQL
- Why this is the lesson that proves the whole course's value in a single worked example

## The starting point: one real T-SQL reporting query

This is a genuinely realistic report: total sales by territory per salesperson, ranked within
each territory, against AdventureWorks2012.

```sql
-- T-SQL
USE AdventureWorks2012;
GO

WITH SalesByTerritory AS (
    SELECT
        st.Name AS TerritoryName,
        soh.SalesPersonID,
        SUM(sod.LineTotal) AS TerritoryTotal
    FROM Sales.SalesOrderHeader AS soh
    JOIN Sales.SalesOrderDetail AS sod
        ON sod.SalesOrderID = soh.SalesOrderID
    JOIN Sales.SalesTerritory AS st
        ON st.TerritoryID = soh.TerritoryID
    WHERE soh.SalesPersonID IS NOT NULL
    GROUP BY st.Name, soh.SalesPersonID
)
SELECT
    p.FirstName + ' ' + p.LastName AS SalesPersonName,
    s.TerritoryName,
    s.TerritoryTotal,
    RANK() OVER (PARTITION BY s.TerritoryName ORDER BY s.TerritoryTotal DESC) AS TerritoryRank
FROM SalesByTerritory AS s
JOIN Person.Person AS p
    ON p.BusinessEntityID = s.SalesPersonID
ORDER BY s.TerritoryName, TerritoryRank;
```

Four things are deliberately stacked into this one query: a multi-table **JOIN**, a **`GROUP BY`
with an aggregate** (`SUM`), a **window function** riding on a **CTE** (`RANK() OVER`), and
**string concatenation** (`FirstName + ' ' + LastName`). Each one needs its own decision when you
cross platforms — this is exactly where the three single-dialect translation lessons earlier in
this course (Lessons 42, 47, and 52) each did this for one platform at a time. This lesson pulls
all three together.

## Decision point 1: string concatenation

| Platform | Operator |
|---|---|
| T-SQL | `+` |
| Oracle (PL/SQL) | `\|\|` |
| MySQL | `CONCAT()` function — `\|\|` is a logical OR by default, not concatenation |
| PostgreSQL | `\|\|` |

MySQL is the one genuine outlier here: unless `PIPES_AS_CONCAT` is explicitly turned on in
`sql_mode` (rare, and not something to rely on), `||` means logical OR on MySQL, not string
concatenation. `CONCAT()` is the only safe choice on MySQL for this query.

## Decision point 2: the CTE and window function

All three target platforms support `WITH` CTEs and `RANK() OVER (PARTITION BY ... ORDER BY ...)`
with identical syntax to T-SQL — **with one real version caveat**: MySQL has only supported CTEs
and window functions since **MySQL 8.0**. On anything earlier, this entire query structure would
need rewriting with derived subqueries instead of a CTE, and manual rank calculation instead of
`RANK() OVER`. Always confirm the MySQL version in play before assuming this translates directly —
the exact point Lesson 61 makes next.

## Full translation: Oracle (PL/SQL)

```sql
-- Oracle
WITH sales_by_territory AS (
    SELECT
        st.name AS territory_name,
        soh.salesperson_id,
        SUM(sod.line_total) AS territory_total
    FROM sales_order_header soh
    JOIN sales_order_detail sod
        ON sod.sales_order_id = soh.sales_order_id
    JOIN sales_territory st
        ON st.territory_id = soh.territory_id
    WHERE soh.salesperson_id IS NOT NULL
    GROUP BY st.name, soh.salesperson_id
)
SELECT
    p.first_name || ' ' || p.last_name AS salesperson_name,
    s.territory_name,
    s.territory_total,
    RANK() OVER (PARTITION BY s.territory_name ORDER BY s.territory_total DESC) AS territory_rank
FROM sales_by_territory s
JOIN person p
    ON p.business_entity_id = s.salesperson_id
ORDER BY s.territory_name, territory_rank;
```

No `USE`/`GO` — Oracle connects directly to a schema, there's no equivalent statement. Everything
else carries over almost line for line: the CTE, the join structure, `GROUP BY`, and
`RANK() OVER` are all identical in shape to T-SQL. The only real change is `+` becoming `||` for
the name concatenation.

## Full translation: MySQL

```sql
-- MySQL (8.0+ required for this CTE/window function structure)
WITH sales_by_territory AS (
    SELECT
        st.name AS territory_name,
        soh.salesperson_id,
        SUM(sod.line_total) AS territory_total
    FROM sales_order_header soh
    JOIN sales_order_detail sod
        ON sod.sales_order_id = soh.sales_order_id
    JOIN sales_territory st
        ON st.territory_id = soh.territory_id
    WHERE soh.salesperson_id IS NOT NULL
    GROUP BY st.name, soh.salesperson_id
)
SELECT
    CONCAT(p.first_name, ' ', p.last_name) AS salesperson_name,
    s.territory_name,
    s.territory_total,
    RANK() OVER (PARTITION BY s.territory_name ORDER BY s.territory_total DESC) AS territory_rank
FROM sales_by_territory s
JOIN person p
    ON p.business_entity_id = s.salesperson_id
ORDER BY s.territory_name, territory_rank;
```

The only two changes from the Oracle version: `CONCAT()` instead of `||` (the MySQL-specific
decision point above), and the explicit MySQL 8.0+ version note, since this is the one platform
where the whole query's structure — not just one operator — depends on version.

## Full translation: PostgreSQL

```sql
-- PostgreSQL
WITH sales_by_territory AS (
    SELECT
        st.name AS territory_name,
        soh.salesperson_id,
        SUM(sod.line_total) AS territory_total
    FROM sales_order_header soh
    JOIN sales_order_detail sod
        ON sod.sales_order_id = soh.sales_order_id
    JOIN sales_territory st
        ON st.territory_id = soh.territory_id
    WHERE soh.salesperson_id IS NOT NULL
    GROUP BY st.name, soh.salesperson_id
)
SELECT
    p.first_name || ' ' || p.last_name AS salesperson_name,
    s.territory_name,
    s.territory_total,
    RANK() OVER (PARTITION BY s.territory_name ORDER BY s.territory_total DESC) AS territory_rank
FROM sales_by_territory s
JOIN person p
    ON p.business_entity_id = s.salesperson_id
ORDER BY s.territory_name, territory_rank;
```

PostgreSQL needs almost no changes at all from the Oracle version — `||` for concatenation, the
same CTE and window function syntax, and PostgreSQL has supported both natively for a long time.
Of the three targets, PostgreSQL is the closest match to T-SQL's underlying querying model, exactly
as earlier chapters on CTEs and window-function portability (Chapter 4) suggested it would be.

## What this capstone proves

Lay all four queries side by side and the real lesson of this entire course becomes visible in one
place: the **querying structure** — the join graph, the `GROUP BY`, the CTE, the window
function — needed **zero structural changes** across all four platforms. Only the small, specific,
individually-documented differences this course spent nine chapters on (concatenation operators,
identifier casing conventions, and one version gate on MySQL) needed attention at all.

## Key terms

| Term | Meaning |
|---|---|
| `CONCAT()` | MySQL's required string concatenation function — `\|\|` means logical OR there by default |
| `PIPES_AS_CONCAT` | The MySQL sql_mode flag that would make `\|\|` mean concatenation — rarely relied upon |
| Version gate | A feature (like MySQL's CTE/window function support) that only exists from a specific version onward |

## Lab

Take the PostgreSQL translation above and rewrite just the `SELECT` list to also return each
salesperson's rank using `DENSE_RANK()` instead of `RANK()`, and explain in one sentence what
would differ in the output if two salespeople in the same territory tied for the top total.

## Check yourself

You're ready for the next lesson when you can explain, without looking, which single decision
point required the MOST care across all three target platforms, and why the overall join/CTE/
window-function structure needed no real translation at all.
