# Lesson 67 — Cursors: Declaring and Fetching

**Chapter 7 · Programming with T-SQL · Lesson 6 of 10**

## What you'll learn

- What a cursor is — row-by-row processing of a query's results
- `DECLARE CURSOR`, `OPEN`, `FETCH NEXT`, `CLOSE`, `DEALLOCATE`
- The `@@FETCH_STATUS` loop pattern
- Why cursors are used even more sparingly than `WHILE`

## What is a cursor?

Every query so far returns its entire result set at once. A **cursor**
lets you step through a query's results **one row at a time**, in code —
useful when you genuinely need to perform some action **per row** that
can't be expressed as a single set-based statement.

## The five-step cursor pattern

```sql
USE AdventureWorks2012;
GO

DECLARE @ProductName NVARCHAR(50);

DECLARE product_cursor CURSOR FOR
    SELECT Name FROM Production.Product WHERE Color = 'Red';

OPEN product_cursor;

FETCH NEXT FROM product_cursor INTO @ProductName;

WHILE @@FETCH_STATUS = 0
BEGIN
    PRINT 'Product: ' + @ProductName;
    FETCH NEXT FROM product_cursor INTO @ProductName;
END

CLOSE product_cursor;
DEALLOCATE product_cursor;
```

- **`DECLARE ... CURSOR FOR`** defines the cursor's underlying query.
- **`OPEN`** executes that query and positions the cursor before the
  first row.
- **`FETCH NEXT ... INTO`** retrieves one row's values into variables and
  advances the cursor.
- **`@@FETCH_STATUS`** is a system function that returns `0` if the last
  `FETCH` succeeded, or a nonzero value once there are no more rows — this
  is what drives the `WHILE` loop (Lesson 66), stopping automatically when
  the cursor is exhausted.
- **`CLOSE`** releases the result set; **`DEALLOCATE`** removes the cursor
  definition entirely. Both are required cleanup — skipping them leaves
  resources tied up.

## Why cursors are rare in good T-SQL

Cursors are the **most expensive** row-by-row option in T-SQL — slower
than a `WHILE` loop over a temp table in most cases, and dramatically
slower than an equivalent set-based query. **Reach for a cursor only when
a set-based approach genuinely cannot do the job** — certain administrative
tasks (looping over database names, table names) are the classic
legitimate use case. If you're processing business data row by row with a
cursor, there's almost always a faster `JOIN`, `UPDATE`, or `CASE`-based
alternative.

## Key terms

| Term | Meaning |
|---|---|
| Cursor | A mechanism for stepping through a query's results one row at a time |
| `@@FETCH_STATUS` | `0` while a `FETCH` succeeded; nonzero once rows are exhausted |

## Lab

Run the five-step example above against AdventureWorks2012 and confirm it
prints one line per red product.

## Check yourself

You're ready for Lesson 68 when you can answer, without looking: what do
`OPEN`, `FETCH NEXT`, `CLOSE`, and `DEALLOCATE` each do, and why should
cursors be your last resort, not your first?
