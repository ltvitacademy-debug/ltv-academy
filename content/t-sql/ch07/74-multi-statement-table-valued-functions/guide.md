# Lesson 74 — Multi-Statement Table-Valued Functions

**Chapter 7 · Programming with T-SQL · Lesson 13 of 16**

## What you'll learn

- `CREATE FUNCTION ... RETURNS @Table TABLE (...) AS BEGIN ... END` syntax
- How a multi-statement TVF (MSTVF) differs from an inline TVF
- The real tradeoff: more flexibility, worse cardinality estimation
- When to prefer an inline TVF instead

## Writing a multi-statement table-valued function

An inline TVF (Lesson 73) can only be one `SELECT`. A **multi-statement
table-valued function (MSTVF)** can contain real procedural logic — but
you have to declare the shape of the table it returns up front, and fill
it yourself with `INSERT`:

```sql
USE AdventureWorks2012;
GO

CREATE FUNCTION dbo.ProductPriceHistory(@ProductID int)
RETURNS @Result TABLE
(
    ProductID   int,
    ListPrice   money,
    PriceTier   varchar(10)
)
AS
BEGIN
    INSERT INTO @Result (ProductID, ListPrice, PriceTier)
    SELECT ProductID, ListPrice,
           CASE WHEN ListPrice > 1000 THEN 'High'
                WHEN ListPrice > 100  THEN 'Mid'
                ELSE 'Low'
           END
    FROM Production.Product
    WHERE ProductID = @ProductID;

    RETURN;
END;
```

The signature is `RETURNS @ReturnTable TABLE (col type, ...)` — a named,
typed table variable — followed by a `BEGIN/END` body that populates it
with one or more `INSERT` statements, then ends with a bare `RETURN;`.

## Calling it — looks the same as an iTVF

From the caller's side, an MSTVF looks identical to an inline TVF — you
still call it in `FROM`, like a table:

```sql
SELECT * FROM dbo.ProductPriceHistory(680);
```

The difference is entirely inside the function, not in how you call it.

## Why you'd want this: real procedural logic

An iTVF is locked to one `SELECT`. An MSTVF can do things a single
`SELECT` can't — multiple `INSERT` statements building up the result in
stages, a loop, conditional branches that fill the table differently
depending on a parameter, intermediate temp tables, and so on. If the
logic genuinely needs more than one statement, an MSTVF is the tool that
can express it while still being callable like a table.

## The real tradeoff: cardinality estimation

Here's what you're giving up for that flexibility. Because `@Result` is
declared with a fixed shape but no row-count information, SQL Server
historically had to **guess** how many rows an MSTVF would return when
building the plan for the query that calls it — and that guess has
often been a single, poorly-informed fixed estimate (in practice this
has frequently meant SQL Server assumes a small, flat row count
regardless of how many rows the function actually produces). A bad row
estimate can lead the optimizer to a bad join strategy for everything
downstream of the function call, in a way an inline TVF — which the
optimizer can see straight through — doesn't suffer from.

## The rule of thumb

**Prefer an inline TVF whenever a single `SELECT` can do the job.**
Reach for a multi-statement TVF only when the logic genuinely needs more
than one statement — and when you do, keep an eye on execution plans
that call it, since the row estimate going in may not match the row
count coming out.

## Key terms

| Term | Meaning |
|---|---|
| MSTVF | `RETURNS @T TABLE (cols) AS BEGIN ... END` — a table-valued function with a procedural body |
| `@ReturnTable` | The named, typed table variable the function fills with `INSERT` and hands back |
| Cardinality estimation | How many rows the optimizer expects a step to produce — historically unreliable for MSTVFs |

## Lab

Create `dbo.ProductPriceHistory` above and call it for a few different
`@ProductID` values. Then rewrite it as an inline TVF (a single
`SELECT` using the same `CASE` expression) and compare the two
execution plans.

## Check yourself

You're ready for Lesson 75 when you can answer, without looking: what
can an MSTVF do that an iTVF can't, and what's the real cost of that
extra flexibility?
