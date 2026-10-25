# Lesson 108 — Lock Granularity: Row, Page, and Table Locks

**Chapter 9 · Transactions, Locking, and Isolation Levels · Lesson 9 of 30**

## What you'll learn

- The three main lock granularities: row, page, table
- The real trade-off between concurrency and overhead at each level
- Why SQL Server's optimizer picks the granularity for you
- How this sets up Lesson 109's lock escalation

## Granularity: how big is the thing being locked?

Every lock discussed so far — shared, exclusive, update — has to be taken
on *something*. That something can be at different levels of size, or
**granularity**:

- **Row**: a single row. The most granular option.
- **Page**: an 8KB page, which typically holds several rows together.
- **Table**: the entire table, every row at once. The least granular
  option.

## The trade-off: concurrency vs. overhead

These three levels trade off against each other in opposite directions:

- **Row locks** give the **best concurrency** — two transactions touching
  different rows never conflict, even in the same table, even on the same
  page. But if a single statement touches thousands of rows, that's
  thousands of individual lock entries to create, track, and release — real
  memory and CPU overhead.
- **Table locks** have the **least overhead** — one lock entry, full
  stop, no matter how many rows are affected. But they give the **worst
  concurrency**: while a table lock is held, nothing else can touch
  *any* row in that table, even rows the holder never actually looked at.
- **Page locks** sit in between: fewer lock entries than row-level
  locking on a big operation, but coarser than strictly necessary — a page
  lock on an 8KB page blocks other transactions from *any* row that
  happens to share that page, even unrelated ones.

```sql
USE AdventureWorks2012;
GO

-- A single-row UPDATE: SQL Server will typically take a row lock --
-- cheap to track, and it only affects the one row anyone cares about.
UPDATE Production.Product
SET ListPrice = 25.00
WHERE ProductID = 680;

-- A bulk UPDATE touching a large fraction of the table: SQL Server's
-- optimizer may instead choose page or table-level locking, trading
-- some concurrency for far less lock-tracking overhead.
UPDATE Production.Product
SET ListPrice = ListPrice * 1.05
WHERE ProductLine = 'R';
```

## Who decides — and when

You don't choose the granularity directly in ordinary T-SQL. SQL Server's
**query optimizer** picks it automatically, based on cost estimates — how
many rows a statement is expected to touch, the table and index
structure, and current system conditions. A statement estimated to touch a
handful of rows typically gets row locks; a statement estimated to touch a
very large portion of a table may get table locks from the start, because
the overhead of tracking enormous numbers of row locks would outweigh the
concurrency benefit.

## This isn't the only way granularity can change mid-statement

The optimizer's up-front choice isn't the end of the story. A statement
that *starts* with row-level locks can still end up escalating to a table
lock partway through if it crosses a certain threshold of locks held at
once — that mechanism, and its real operational consequences, is exactly
the subject of the next lesson.

## Key terms

| Term | Meaning |
|---|---|
| Row lock | Locks one row; best concurrency, most overhead at scale |
| Page lock | Locks an 8KB page (several rows); a middle ground |
| Table lock | Locks the entire table; least overhead, worst concurrency |

## Lab

Open two SSMS windows against AdventureWorks2012. In the first, run
`BEGIN TRANSACTION; UPDATE Production.Product SET ListPrice = ListPrice
WHERE ProductID = 680;` and leave it open. In the second, confirm a query
against a *different* `ProductID` is unaffected. Then, in a third window
with the first still open, query `sys.dm_tran_locks` and note the
`resource_type` column — it reads `KEY` (row-level, for an indexed table)
for this single-row update.

## Check yourself

You're ready for Lesson 109 when you can answer, without looking: what are
the three main lock granularities, and what does each one trade away to
get what it gains?
