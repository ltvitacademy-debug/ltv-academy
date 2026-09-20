# Function Performance Pitfalls

Lesson 20 flagged scalar UDFs in a `WHERE` clause as an anti-pattern; this lesson goes
deep on exactly why, and gives you the real, better alternative: the inline table-valued
function.

## What you'll learn

- Why a scalar UDF forces row-by-row execution, pre-SQL Server 2019, no matter how it's called
- What an inline table-valued function is, and why it doesn't have this problem
- How to recognize and rewrite the pattern in real code

## Why scalar UDFs are row-by-row in disguise

A **scalar UDF** — a function returning a single value via `RETURNS <type>` with a
`BEGIN...END` body — is, before SQL Server 2019's scalar UDF inlining feature (and even
then, only for functions simple enough to qualify), executed as an opaque black box by the
optimizer. It can't see inside the function body to fold its logic into the surrounding
query's plan, so it falls back to calling the function once per row, exactly like a hidden
cursor.

```sql
CREATE FUNCTION dbo.fn_OrderTotal(@OrderId INT)
RETURNS MONEY
AS
BEGIN
    RETURN (SELECT SUM(LineTotal) FROM dbo.OrderLines WHERE OrderId = @OrderId);
END;
GO

-- Executes fn_OrderTotal separately for every row in Orders —
-- effectively an uncosted, invisible per-row loop
SELECT OrderId, dbo.fn_OrderTotal(OrderId) AS OrderTotal
FROM dbo.Orders;
```

The execution plan for that query looks deceptively simple — a single scan, maybe — but
the actual per-row function calls don't show up as separate operators the way a join or
lookup would. This is one of the few places where the plan itself hides the real cost;
you have to know the pattern to catch it, which is exactly why this lesson exists.

## The real fix: an inline table-valued function

An **inline table-valued function (iTVF)** returns a table via a single `RETURN (SELECT
...)` statement, with no procedural body. Because it's really just a parameterized view,
the optimizer can substitute its definition directly into the surrounding query and
optimize the whole thing as one set-based statement — no per-row black box, no hidden loop.

```sql
CREATE FUNCTION dbo.fn_OrderTotal_iTVF(@OrderId INT)
RETURNS TABLE
AS
RETURN (
    SELECT SUM(LineTotal) AS OrderTotal
    FROM dbo.OrderLines
    WHERE OrderId = @OrderId
);
GO

-- The optimizer expands this like a view/join, not a per-row call
SELECT o.OrderId, t.OrderTotal
FROM dbo.Orders AS o
CROSS APPLY dbo.fn_OrderTotal_iTVF(o.OrderId) AS t;
```

Same result, same reusable, encapsulated logic — but because SQL Server can see and
optimize the query behind the function, it gets folded into a normal set-based plan instead
of executing as an opaque per-row call.

## Recognizing the pattern to rewrite

The signal to watch for: a `CREATE FUNCTION` with a `BEGIN...END` body and a scalar
`RETURNS` type, called against a column in a `WHERE` clause or in the `SELECT` list of a
query touching many rows. The rewrite is almost always the same shape: convert the body
into a single `RETURN (SELECT ...)` returning `TABLE`, and change call sites from a direct
function call to `CROSS APPLY` (or `OUTER APPLY` if the function can return no rows and you
still want the outer row).

## Key terms

| Term | Meaning |
|---|---|
| Scalar UDF | A function returning one value via a procedural body; historically an opaque, row-by-row black box to the optimizer |
| Inline table-valued function (iTVF) | A function returning a table via a single RETURN (SELECT ...); expandable into the calling query like a view |
| APPLY | The operator (CROSS APPLY / OUTER APPLY) used to invoke a table-valued function per outer row within a set-based plan |

## Check yourself

A scalar UDF computes a customer's lifetime order total and is called in the `SELECT` list
of a query returning 50,000 customer rows. Rewrite it as an inline table-valued function
and show the call-site change needed to use it.
