# Lesson 71 — The MERGE Statement

**Chapter 7 · Programming with T-SQL · Lesson 10 of 10**

## What you'll learn

- What `MERGE` does — insert, update, and delete in one statement
- `WHEN MATCHED`, `WHEN NOT MATCHED`, and their variants
- A real synchronization example
- Wrapping up Chapter 7

## The problem MERGE solves

Keeping one table in sync with another — updating rows that already
exist, inserting rows that are new, sometimes removing rows that no
longer belong — normally takes **three separate statements**: an
`UPDATE`, an `INSERT`, and possibly a `DELETE`, each with its own
matching logic. `MERGE` combines all three into **one** statement.

## A MERGE example

```sql
USE AdventureWorks2012;
GO

MERGE Production.Product AS target
USING (
    SELECT ProductID, Name, ListPrice
    FROM Production.Product
    WHERE ProductSubcategoryID = 1
) AS source
    ON target.ProductID = source.ProductID
WHEN MATCHED THEN
    UPDATE SET target.ListPrice = source.ListPrice * 1.05
WHEN NOT MATCHED BY TARGET THEN
    INSERT (ProductID, Name, ListPrice)
    VALUES (source.ProductID, source.Name, source.ListPrice)
WHEN NOT MATCHED BY SOURCE AND target.ProductSubcategoryID = 1 THEN
    DELETE;
```

(This example illustrates `MERGE`'s full shape against the same table for
clarity — in practice, `source` is almost always a genuinely different
table, like a staging table being synced into a permanent one.)

## The three WHEN clauses

- **`WHEN MATCHED`** — the row exists in **both** target and source (this
  mirrors `INNER JOIN`, Lesson 22): update it.
- **`WHEN NOT MATCHED BY TARGET`** — the row exists in **source** but not
  **target**: insert it.
- **`WHEN NOT MATCHED BY SOURCE`** — the row exists in **target** but not
  **source**: optionally, delete it.

This directly parallels the `INNER`/`LEFT`/`RIGHT JOIN` match logic from
Chapter 3 — `MERGE` is essentially "do something different depending on
which side of the join a row falls on," instead of just filtering.

## Why this matters for data warehousing

`MERGE` is the standard tool for **loading a data warehouse** (previewed
here, covered properly in Chapter 12) — syncing a staging table's fresh
data into a permanent fact or dimension table, updating what changed,
inserting what's new, all in a single, atomic statement.

## Chapter 7 recap

You can now write T-SQL as a real programming language: variables,
batches, branching, loops, cursors, stored procedures with parameters,
safe dynamic SQL, and multi-action synchronization with `MERGE`.
Chapter 8 moves into transactions and error handling — making sure your
scripts behave correctly (and recoverably) when something goes wrong.

## Key terms

| Term | Meaning |
|---|---|
| `MERGE` | Combines insert, update, and delete into one statement based on a join |
| `WHEN MATCHED` / `WHEN NOT MATCHED BY TARGET` / `WHEN NOT MATCHED BY SOURCE` | The three sync scenarios `MERGE` handles |

## Lab

Read through the `MERGE` example above and, for each `WHEN` clause,
identify which real-world scenario ("existing product," "new product,"
"discontinued product") it addresses.

## Check yourself

You're ready for Chapter 8 when you can answer, without looking: what do
`WHEN MATCHED`, `WHEN NOT MATCHED BY TARGET`, and
`WHEN NOT MATCHED BY SOURCE` each correspond to, and how does that relate
to `INNER`/`LEFT`/`RIGHT JOIN`?
