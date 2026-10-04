# Lesson 9 — Relationship and Pattern Profiling

**Chapter 2 · Profiling · Lesson 9 of 30**

## What you'll learn

- How to profile whether a foreign key relationship is actually intact
- How to find orphaned rows with a `LEFT JOIN ... IS NULL` query
- How to profile the *shape* of values using `LIKE` pattern matching
- Why relationship and pattern profiling catch problems column profiling
  alone misses

## Beyond one table

Lesson 8 profiled a single table in isolation. Real databases are made
of tables that reference each other — an order references a customer,
a line item references a product — and a column can look perfectly
healthy in isolation while the *relationship* it depends on is broken.
This lesson covers the two remaining levels from Lesson 6: relationship
profiling (across tables) and pattern profiling (within a column).

## Navigating to related objects

Before writing relationship queries, it helps to see where SSMS exposes
server and database structure beyond a single table — the broader
Object Explorer tree shows every database, and every server-level
object, available to query.

![SQL Server Management Studio's Object Explorer showing a connected server's root node expanded, listing Databases, Security, Server Objects, Replication, PolyBase, Always On High Availability, Management, Integration Services Catalogs, SQL Server Agent, and XEvent Profiler.](/courses/data-quality-management/ch02/09-relationship-and-pattern-profiling/object-explorer-tree.png)
*Object Explorer's full server tree — relationship profiling means writing queries that reach across more than one of these database objects at once.*

The database context selector in the toolbar is what determines which
database your query actually runs against when you're checking
relationships that might span schemas:

![SQL Server Management Studio's toolbar database-selector dropdown, open, showing master, model, msdb, tempdb, and TutorialDB, with TutorialDB highlighted.](/courses/data-quality-management/ch02/09-relationship-and-pattern-profiling/change-db.png)
*Switching database context — relevant any time a relationship or reconciliation check needs to run against a specific, non-default database.*

And connecting to the right server in the first place is where any of
this starts:

![SQL Server Management Studio's Connect (Preview) dialog, showing Recent Connections including a local AdventureWorks database, server name field, authentication mode, and database name fields.](/courses/data-quality-management/ch02/09-relationship-and-pattern-profiling/connect-dialog.png)
*SSMS's connection dialog — recent connections like this one often point straight at the sample databases (AdventureWorks, here) this course's examples are built around.*

## Finding orphaned rows with LEFT JOIN

A foreign key relationship is "intact" when every value in the child
table's foreign key column actually exists in the parent table. The
standard way to profile this with T-SQL is a `LEFT JOIN` from child to
parent, filtered to rows where the parent side came back `NULL`:

```sql
SELECT
    soh.SalesOrderID,
    soh.CustomerID
FROM Sales.SalesOrderHeader soh
LEFT JOIN Sales.Customer c
    ON soh.CustomerID = c.CustomerID
WHERE c.CustomerID IS NULL;
```

Every row this query returns is an order pointing at a `CustomerID`
that doesn't exist in the `Customer` table — an **orphaned row**. In a
database with a properly enforced foreign key constraint this query
should always return zero rows; finding any at all usually means the
constraint is missing, disabled, or was bypassed by a bulk load.

## Counting orphans across the whole table

For a quick summary instead of a row-by-row list, wrap the same logic
in a `COUNT`:

```sql
SELECT COUNT(*) AS orphaned_orders
FROM Sales.SalesOrderHeader soh
LEFT JOIN Sales.Customer c
    ON soh.CustomerID = c.CustomerID
WHERE c.CustomerID IS NULL;
```

This single number is exactly what you'd report to a data steward
(Lesson 4) as a referential integrity finding — and exactly the kind of
check Lesson 19 turns into a formal, repeatable rule.

## Pattern profiling with LIKE

Relationship profiling checks *across* tables; pattern profiling checks
the *shape* of values *within* one column. T-SQL's `LIKE` operator with
wildcards is the simplest way to check whether values conform to an
expected pattern:

```sql
SELECT
    EmailAddress,
    CASE
        WHEN EmailAddress LIKE '%_@_%._%' THEN 'Looks valid'
        ELSE 'Does not match expected pattern'
    END AS pattern_check
FROM Sales.Customer
WHERE EmailAddress IS NOT NULL;
```

That `LIKE` pattern is deliberately simple — it checks for "something,
an @ sign, something, a dot, something" — not a full email
specification. Pattern profiling at this stage isn't about writing a
perfect validation rule (Lesson 14 covers formal validity rules); it's
about getting a fast read on how much of the column plausibly matches
the shape you expect, before deciding whether a stricter rule is worth
building.

## Summarizing a pattern check

Turn the row-by-row check into a count, the same way the orphan check
was summarized:

```sql
SELECT
    pattern_check,
    COUNT(*) AS row_count
FROM (
    SELECT
        CASE
            WHEN EmailAddress LIKE '%_@_%._%' THEN 'Looks valid'
            ELSE 'Does not match expected pattern'
        END AS pattern_check
    FROM Sales.Customer
    WHERE EmailAddress IS NOT NULL
) t
GROUP BY pattern_check;
```

A result like `9,812` "Looks valid" against `188` "Does not match"
immediately tells you the rough scale of the problem — and whether it's
worth chasing down individual rows or building an automated rule
(Chapter 4) to catch new bad values going forward.

## Key terms

| Term | Meaning |
|---|---|
| Orphaned row | A child-table row whose foreign key value has no matching parent row |
| Referential integrity | The guarantee that foreign key relationships are actually intact |
| `LEFT JOIN ... IS NULL` | The standard T-SQL pattern for finding orphaned/unmatched rows |
| `LIKE` pattern matching | Checking whether a value's shape matches a wildcard pattern |

## Lab

1. Pick two related tables you have access to (or AdventureWorks' own
   `Sales.SalesOrderHeader` / `Sales.Customer`) and run the
   `LEFT JOIN ... IS NULL` orphan check above.
2. Pick a text column that's supposed to follow a pattern (an email,
   a phone number, a product code) and write a `LIKE`-based pattern
   check for it.
3. Summarize your pattern check with `GROUP BY` / `COUNT(*)` and note
   the rough percentage that doesn't match.

## Check yourself

Can you write the `LEFT JOIN ... WHERE <parent key> IS NULL` orphan
pattern from memory, and explain why it's a different kind of check
than anything in Lesson 8? If yes, you're ready for Lesson 10's look at
interpreting everything Chapter 2 has produced so far.
