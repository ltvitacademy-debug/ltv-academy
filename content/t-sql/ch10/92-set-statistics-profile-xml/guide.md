# Lesson 92 — SET STATISTICS PROFILE and XML

**Chapter 10 · Performance Tuning · Lesson 10 of 12**

## What you'll learn

- What `SET STATISTICS PROFILE` shows, and why it's now considered legacy
- What `SET STATISTICS XML` gives you instead — the actual plan as data
- How to save a plan to a `.sqlplan` file and reopen it graphically
- Why capturing a plan as XML matters for comparing "before" and "after"

## SET STATISTICS PROFILE — the older, text-based option

Before SSMS could draw a graphical plan tree, `SET STATISTICS PROFILE` was
how you got plan details: it interleaves the query's normal results with an
extra result set listing every operator, its estimated vs. actual row
counts, and its estimated cost — all as plain rows and columns.

```sql
SET STATISTICS PROFILE ON;

SELECT ProductID, Name, ListPrice
FROM Production.Product
WHERE Name = N'Chainring Bolts';

SET STATISTICS PROFILE OFF;
```

It still works, but Microsoft has marked it **deprecated** — it's kept
around for backward compatibility with old scripts, not something to build
new tooling around. The graphical Ctrl+M plan from Lesson 90 already shows
everything this gives you, more clearly.

## SET STATISTICS XML — the modern replacement

`SET STATISTICS XML ON` does something Ctrl+M can't: it returns the actual
execution plan as an **XML value in the results grid**, alongside your
normal query results. Click that XML link and SSMS opens it as the exact
same graphical plan tree you already know from Lesson 90 — but now it's
also *data* you can save, store, or query.

```sql
SET STATISTICS XML ON;

SELECT ProductID, Name, ListPrice
FROM Production.Product
WHERE Name = N'Chainring Bolts';

SET STATISTICS XML OFF;
```

Right-click the XML result and choose **Save Results As** to write it to a
`.sqlplan` file — a portable snapshot of exactly what SQL Server did, at
that moment, that you can email to a teammate or reopen later in SSMS by
double-clicking it, without ever needing to re-run the original query.

## Why this matters for tuning

A graphical Ctrl+M plan is great for reading in the moment, but it disappears
when you close the tab. Capturing the plan as XML gives you something
durable: a "before" snapshot you can set aside, make your index or query
change, capture an "after" snapshot the same way, and compare the two side
by side — or even store both in a table for a permanent record of the
change you made and why.

## Key terms

| Term | Meaning |
|---|---|
| SET STATISTICS PROFILE | Legacy, text-based row/cost breakdown per operator (deprecated) |
| SET STATISTICS XML | Returns the actual execution plan as XML data, alongside results |
| .sqlplan file | A saved execution plan you can reopen graphically without re-running the query |

## Lab

Run against AdventureWorks2012:

```sql
SET STATISTICS XML ON;

SELECT ProductID, Name, ListPrice
FROM Production.Product
WHERE Name = N'Chainring Bolts';

SET STATISTICS XML OFF;
```

1. Click the XML value in the results grid — SSMS opens the graphical plan.
2. Right-click the plan and choose **Save Execution Plan As**, saving it as
   `before.sqlplan`.
3. Create `IX_Product_Name` from Lesson 90, re-run the same `SET STATISTICS
   XML ON` block, and save the new plan as `after.sqlplan`.
4. Double-click each `.sqlplan` file to reopen it — compare the operators
   without re-running either query.

```sql
DROP INDEX IX_Product_Name ON Production.Product;
```

## Check yourself

You're ready for Lesson 93 when you can explain, without looking: what can
`SET STATISTICS XML` do that the Ctrl+M graphical plan alone cannot?
