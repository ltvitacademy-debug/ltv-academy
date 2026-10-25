# Lesson 72 — Scalar User-Defined Functions

**Chapter 7 · Programming with T-SQL · Lesson 11 of 16**

## What you'll learn

- `CREATE FUNCTION` syntax for a scalar user-defined function (UDF)
- Calling a scalar UDF inside a `SELECT`
- The real performance caveat: row-by-row execution and parallelism
- How SQL Server 2019+ "scalar UDF inlining" changes the picture

## Writing a scalar function

A **scalar UDF** takes zero or more parameters and returns a single
value, just like a built-in function such as `GETDATE()` or `LEN()`:

```sql
USE AdventureWorks2012;
GO

CREATE FUNCTION dbo.ProductMargin(@ListPrice money, @StandardCost money)
RETURNS money
AS
BEGIN
    RETURN @ListPrice - @StandardCost;
END;
```

The shape is `CREATE FUNCTION name(@params) RETURNS type AS BEGIN ...
RETURN value; END` — a `BEGIN/END` body (Lesson 65) that computes and
`RETURN`s one value of the declared type.

## Calling it like any other value

Once created, you call a scalar UDF with its schema-qualified name,
anywhere an expression is legal — in a `SELECT` list, a `WHERE` clause,
or a computed column:

```sql
SELECT ProductID, Name, ListPrice, StandardCost,
       dbo.ProductMargin(ListPrice, StandardCost) AS Margin
FROM Production.Product
WHERE ListPrice > 0;
```

That reads cleanly — much more so than repeating `ListPrice -
StandardCost` in every query that needs a margin.

## The real cost: row-by-row execution

Here's the part that matters more than the syntax. SQL Server's query
optimizer treats a scalar UDF as a **black box**. When you call
`dbo.ProductMargin(ListPrice, StandardCost)` in a query against
`Production.Product`, the engine doesn't fold that logic into its normal
set-based plan — it invokes the function **once per row**, like a tiny
separate batch each time.

On a handful of rows that's invisible. On a large table, calling a
scalar UDF per row can:

- prevent the query from using a **parallel** execution plan (the
  optimizer often falls back to a single-threaded plan around a scalar
  UDF call), and
- make the optimizer's **cardinality estimates** less reliable, since it
  can't see inside the function.

This is a genuinely well-known, genuinely painful problem in production
SQL Server code — a scalar UDF that looks perfectly readable can turn a
sub-second query into one that takes minutes once the table is large
enough, for reasons that don't show up by reading the query text.

## SQL Server 2019+: scalar UDF inlining

Starting with SQL Server 2019 (database compatibility level 150 or
higher), the optimizer can automatically rewrite many simple scalar UDFs
into an equivalent set-based expression and fold it directly into the
surrounding query plan — this is called **scalar UDF inlining**. When a
function qualifies, the row-by-row penalty above mostly disappears.

Inlining only applies to functions simple enough to translate safely —
a function using `TRY/CATCH`, calling non-deterministic built-ins, doing
its own error handling, or touching tables typically still runs the old
way. So the caveat above hasn't gone away — it has gotten narrower, and
it's still something you need to verify (with the actual execution plan)
rather than assume.

## Key terms

| Term | Meaning |
|---|---|
| Scalar UDF | A function returning one value, called like `dbo.FnName(args)` |
| Row-by-row execution | The optimizer invokes a scalar UDF once per row instead of in a set-based plan |
| Scalar UDF inlining | SQL Server 2019+ feature that can fold a qualifying scalar UDF into the surrounding query plan |

## Lab

Create `dbo.ProductMargin` above, then run it against
`Production.Product`. Compare the actual execution plan for the query
with the function call against the plan for the equivalent inline
expression `ListPrice - StandardCost` written directly in the `SELECT`
list, and note any difference in plan shape.

## Check yourself

You're ready for Lesson 73 when you can answer, without looking: why can
calling a scalar UDF per row hurt performance on a large table, and what
changed about that story in SQL Server 2019?
