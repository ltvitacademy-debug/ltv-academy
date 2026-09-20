# Set-Based vs. Procedural Thinking

The rewrites in Lesson 18 fixed the shape of individual predicates. This lesson steps back
further, to the shape of the whole operation: whether you tell SQL Server to process rows
one at a time, or to process the whole set at once. That choice usually matters more than
almost any single predicate rewrite.

## What you'll learn

- The real contrast between a cursor loop and a single set-based statement
- Why SQL Server's engine is built around, and optimized for, set-based operations
- When a cursor is genuinely the right tool anyway

## Procedural thinking: a cursor, row by row

A **cursor** lets you iterate through a result set one row at a time, running logic for
each row in turn — the same mental model as a loop in a general-purpose programming
language. It's a natural instinct if you learned to program before you learned SQL.

```sql
DECLARE @CustomerId INT;
DECLARE cust_cursor CURSOR FOR
    SELECT CustomerId FROM dbo.Customers WHERE Region = 'West';

OPEN cust_cursor;
FETCH NEXT FROM cust_cursor INTO @CustomerId;

WHILE @@FETCH_STATUS = 0
BEGIN
    UPDATE dbo.Customers
    SET LoyaltyTier = 'Gold'
    WHERE CustomerId = @CustomerId;

    FETCH NEXT FROM cust_cursor INTO @CustomerId;
END;

CLOSE cust_cursor;
DEALLOCATE cust_cursor;
```

Every iteration of that loop is a separate statement execution, with its own overhead: a
plan lookup, a transaction log entry, lock acquisition, context switching between the
cursor engine and the storage engine. For ten rows, nobody notices. For a hundred thousand
rows, that per-row overhead compounds into minutes of runtime for work the engine could
have done in one pass.

## Set-based thinking: the same result, one statement

```sql
UPDATE dbo.Customers
SET LoyaltyTier = 'Gold'
WHERE Region = 'West';
```

Same outcome, computed as a single set operation. SQL Server's query optimizer evaluates
this once, builds one execution plan, and processes all matching rows in one coordinated
operation — no per-row loop overhead, no repeated round trips between engines. This isn't
a minor implementation detail; it's the model the entire relational engine, and the
optimizer that sits on top of it, was built around. Every technique earlier in this
course — index seeks, covering indexes, execution plans — assumes set-based operations as
the unit of work being optimized.

## When a cursor is genuinely the right call

Set-based is the right default, not an absolute rule. A cursor (or a similar row-by-row
approach) earns its place when the logic per row is genuinely sequential and can't be
expressed as a set operation — administrative scripts that call a system stored procedure
once per database, for instance, where the "rows" are database names and each call has
side effects that must happen one at a time in order. The test is whether the per-row work
is inherently procedural, not whether a cursor happens to be the first tool that comes to
mind.

## Key terms

| Term | Meaning |
|---|---|
| Cursor | A T-SQL construct for iterating a result set one row at a time |
| Set-based operation | A single statement processing all matching rows together in one execution plan |
| Row-by-row overhead | The per-iteration cost (plan lookup, logging, locking) that compounds across a cursor loop |

## Check yourself

A junior developer writes a cursor that loops through every row in a 500,000-row table,
running an `UPDATE` statement per row. What's the set-based rewrite, and why will it almost
always outperform the cursor version in SQL Server?
