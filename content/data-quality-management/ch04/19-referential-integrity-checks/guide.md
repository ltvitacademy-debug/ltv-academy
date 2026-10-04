# Lesson 19 — Referential Integrity Checks

**Chapter 4 · Rules and Checks · Lesson 19 of 30**

## What you'll learn

- What referential integrity means and how it differs from a foreign
  key *constraint*
- The standard `LEFT JOIN ... WHERE ... IS NULL` pattern for finding
  orphaned rows
- How to check multiple relationships in one combined report
- Three real-world reasons referential integrity breaks even when a
  `FOREIGN KEY` constraint exists

## What referential integrity means

**Referential integrity** means every row that references another row
— through a foreign key value — actually points to a row that exists.
An `Orders` row with `CustomerId = 4821` is only valid if a customer
with `CustomerId = 4821` genuinely exists in `Customers`. If it
doesn't, that order is an **orphaned row**.

This is closely related to consistency (Lesson 13), but specific
enough to deserve its own lesson: it's always about a *key*
relationship between two tables, and the question is always the same —
does the thing this row points to still exist?

![SQL Server Management Studio's Object Explorer showing a connected server, the AdventureWorks database expanded with Tables and Database Diagrams nodes visible — where foreign key relationships between tables actually live.](/courses/data-quality-management/ch04/19-referential-integrity-checks/ssms.png)
*Object Explorer — table relationships (and the Database Diagrams node that visualizes them) live right here, in the same tree you already use to connect and query.*

## Finding orphaned rows with `LEFT JOIN`

The standard pattern: `LEFT JOIN` the child table to the parent table
on the foreign key, then filter for rows where the join found nothing:

```sql
SELECT o.OrderId, o.CustomerId
FROM dbo.Orders AS o
LEFT JOIN dbo.Customers AS c
    ON o.CustomerId = c.CustomerId
WHERE c.CustomerId IS NULL
  AND o.CustomerId IS NOT NULL;
```

Read it right to left: start from every order, attempt to find its
customer, and keep only the orders where that attempt came back empty.
The `AND o.CustomerId IS NOT NULL` matters — a `NULL` foreign key
usually means "no customer, intentionally" (a guest checkout, say),
which is a completeness question, not an orphan.

## Running it and checking multiple relationships

The exact same `Execute` step from Lesson 18 runs this query — nothing
changes about how you run a referential integrity check versus any
other check.

Real schemas have dozens of foreign key relationships. Checking them
one at a time doesn't scale — combine them with the `UNION ALL`
failures-report pattern from Lesson 18:

```sql
SELECT 'Orders -> Customers' AS Relationship,
       CAST(o.OrderId AS VARCHAR(20)) AS OrphanedKey
FROM dbo.Orders AS o
LEFT JOIN dbo.Customers AS c ON o.CustomerId = c.CustomerId
WHERE c.CustomerId IS NULL AND o.CustomerId IS NOT NULL

UNION ALL

SELECT 'OrderLines -> Orders',
       CAST(ol.OrderLineId AS VARCHAR(20))
FROM dbo.OrderLines AS ol
LEFT JOIN dbo.Orders AS o ON ol.OrderId = o.OrderId
WHERE o.OrderId IS NULL

UNION ALL

SELECT 'OrderLines -> Products',
       CAST(ol.OrderLineId AS VARCHAR(20))
FROM dbo.OrderLines AS ol
LEFT JOIN dbo.Products AS p ON ol.ProductId = p.ProductId
WHERE p.ProductId IS NULL;
```

Run that once and you get every orphaned row across every relationship
you care about, labeled by which relationship broke.

## Why referential integrity breaks even with a `FOREIGN KEY` constraint

If a `FOREIGN KEY` constraint exists, how can orphans happen at all?
In practice, three ways:

1. **No constraint was ever defined.** Plenty of production schemas,
   especially data warehouses and staging tables, deliberately skip
   `FOREIGN KEY` constraints for load performance — which means
   nothing stops an orphan from being written.
2. **The parent was deleted without cascading.** If `ON DELETE
   CASCADE` isn't set, deleting a customer who still has orders either
   fails outright (constraint present) or — if the constraint was
   disabled or doesn't exist — silently leaves orphaned orders behind.
3. **Cross-system or cross-database references.** A `FOREIGN KEY`
   constraint can only reference a table in the *same* database.
   Orders referencing customers in a separate CRM database have no
   database-enforced integrity at all — only what your checks catch.

## Key terms

| Term | Meaning |
|---|---|
| Referential integrity | Every foreign key value points to a row that actually exists |
| Orphaned row | A row whose foreign key value has no matching parent row |
| Cascading delete | A parent-row delete that automatically removes dependent child rows |

## Lab

1. Create two small test tables, `Orders` (with a `CustomerId` column)
   and `Customers`, with a handful of rows — including at least one
   `Orders` row whose `CustomerId` doesn't exist in `Customers`.
2. Write the `LEFT JOIN ... WHERE ... IS NULL` query to find it.
3. Add a second relationship (any two tables you have, or create a
   third test table) and combine both checks into one `UNION ALL`
   report, labeled by relationship name.
4. In a comment, explain which of the three "why constraints don't
   always prevent this" reasons would apply to your test setup.

## Check yourself

- Why does the orphan-finding query need `AND o.CustomerId IS NOT
  NULL` in addition to `c.CustomerId IS NULL`?
- Name one legitimate reason a `FOREIGN KEY` constraint might not
  exist on a relationship, even in a well-run production system.
- How is a referential integrity check related to, but distinct from,
  a general consistency check from Lesson 13?
