# Avoiding Common Anti-Patterns

Lessons 18 and 19 each fixed one specific problem shape. This lesson catalogs three more
recurring anti-patterns that show up constantly in real production T-SQL: implicit
conversions, `NOLOCK` misuse, and scalar UDFs called from a `WHERE` clause. None of these
are exotic — they're common enough that recognizing them on sight is a core skill.

## What you'll learn

- How to recognize an implicit conversion problem from its symptoms, not just its syntax
- What `NOLOCK` actually does, and why "it's faster" doesn't make it safe
- Why a scalar UDF in a WHERE clause quietly disables set-based optimization

## Implicit conversions: type mismatches the optimizer resolves for you

When two operands in a comparison have different data types, SQL Server converts one to
match the other using data type precedence rules — and depending on which side has to
convert, that conversion sometimes has to be applied per-row to the *indexed column*,
making the predicate non-sargable (Lesson 18) with no function visibly wrapping anything.

```sql
-- OrderNumber column is nvarchar(20); comparing to an int literal
-- can force a conversion on the column side, defeating a seek
SELECT OrderId FROM dbo.Orders WHERE OrderNumber = 100245;
```

The fix is always the same: make literal and parameter data types match the column's
actual type, and be especially careful with parameters passed from application code,
where a mismatched ADO.NET or ORM type is a frequent, silent cause.

## NOLOCK: reading uncommitted data, not a free performance switch

`WITH (NOLOCK)` (equivalent to `READ UNCOMMITTED` isolation for that table reference) tells
SQL Server to skip taking or honoring locks when reading — it avoids blocking on writers
and being blocked by them. The real cost: it can return uncommitted data that later gets
rolled back, duplicate rows, or skip rows entirely, because the reader can see a table
mid-modification. It is not a general-purpose speed switch; it's a specific correctness
tradeoff that's occasionally acceptable — a rough dashboard count where "close enough"
truly is close enough — and frequently misused as a reflexive fix for blocking that should
instead be diagnosed properly (Chapter 6 covers real concurrency/memory tuning).

```sql
-- Might read a row that gets rolled back a moment later,
-- or double-count a row mid-page-split. Know that tradeoff before using it.
SELECT COUNT(*) FROM dbo.Orders WITH (NOLOCK) WHERE Status = 'Open';
```

## Scalar UDFs in a WHERE clause: row-by-row in disguise

A **scalar user-defined function** returns a single value and, prior to SQL Server 2019's
scalar UDF inlining improvements, executes once per row when called from a `WHERE` clause
or `SELECT` list against every candidate row — the exact row-by-row overhead Lesson 19
warned about, except hidden inside what looks like an ordinary function call.

```sql
CREATE FUNCTION dbo.fn_OrderTotal(@OrderId INT)
RETURNS MONEY AS
BEGIN
    RETURN (SELECT SUM(LineTotal) FROM dbo.OrderLines WHERE OrderId = @OrderId);
END;
GO

-- Calls fn_OrderTotal once per candidate row — non-sargable, and
-- effectively a hidden cursor over the whole table
SELECT OrderId FROM dbo.Orders WHERE dbo.fn_OrderTotal(OrderId) > 1000;
```

Lesson 22 goes deep on this specific problem and its fix (inline table-valued functions);
for now, recognize the shape: any scalar function called against every row of a `WHERE`
clause is a candidate for rewriting as a join or a derived table instead.

## Key terms

| Term | Meaning |
|---|---|
| Implicit conversion | An automatic data-type conversion during comparison, sometimes forcing a per-row conversion on an indexed column |
| NOLOCK / READ UNCOMMITTED | A hint that skips honoring locks on read, trading correctness (dirty/duplicate/skipped reads) for reduced blocking |
| Scalar UDF | A user-defined function returning one value, historically executed row-by-row when called in a WHERE clause |

## Check yourself

A teammate adds `WITH (NOLOCK)` to every query in a financial reporting stored procedure
to "make it faster." What's the actual tradeoff they're making, and where might it go
wrong?
