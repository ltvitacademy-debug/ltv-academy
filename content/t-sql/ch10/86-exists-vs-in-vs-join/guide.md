# Lesson 86 — EXISTS vs. IN vs. JOIN for Existence Checks

**Chapter 10 · Performance Tuning · Lesson 4 of 12**

## What you'll learn

- Three ways to write the same "does a related row exist?" question
- Why `EXISTS` usually wins for pure existence checks
- The real risk `JOIN` introduces here: accidental duplicates
- Choosing correctly, not just quickly

## The same question, three ways

"Which products have at least one sales order?" — three genuinely
different-looking queries, same intended result:

```sql
-- EXISTS
SELECT p.Name FROM Production.Product AS p
WHERE EXISTS (SELECT 1 FROM Sales.SalesOrderDetail AS sod WHERE sod.ProductID = p.ProductID);

-- IN
SELECT p.Name FROM Production.Product AS p
WHERE p.ProductID IN (SELECT sod.ProductID FROM Sales.SalesOrderDetail AS sod);

-- JOIN with DISTINCT
SELECT DISTINCT p.Name FROM Production.Product AS p
INNER JOIN Sales.SalesOrderDetail AS sod ON p.ProductID = sod.ProductID;
```

## Why EXISTS usually wins here

`EXISTS` (Lesson 55) stops scanning the moment it finds **one** matching
row — it never needs to know **how many** matches exist, only **whether**
any do. `IN` behaves similarly for this case and is often optimized
identically by SQL Server. **`JOIN`**, however, is doing a fundamentally
different job here: a product with **5** matching order-detail rows
produces **5** joined rows, not 1 — which is why the `JOIN` version
**needs** `DISTINCT` (Lesson 9) just to get back to the right answer, and
that deduplication step is real, avoidable work.

## The real risk: forgetting DISTINCT

The single most common bug in this pattern is writing the `JOIN` version
and **forgetting** `DISTINCT` — the query still runs, still returns real
product names, but with **duplicates** for every product that has
multiple matching orders. This is a **correctness** bug disguised as
harmless: the results *look* reasonable at a glance.

## When JOIN is still the right tool

If you need columns **from the related table** — not just "does it
exist," but "what were the order details" — `JOIN` is the correct choice,
not `EXISTS`/`IN`, because `EXISTS`/`IN` can only test for presence; they
can't pull back the matched row's own columns. Match the tool to the
actual question: **"does a match exist?"** vs. **"give me the matched
data too."**

## Key terms

| Term | Meaning |
|---|---|
| Existence check | A query that only needs to know whether a related row exists, not its data |

## Lab

Run all three versions above against AdventureWorks2012 and confirm
they return the same set of product names (ignoring row order).

## Check yourself

You're ready for Lesson 87 when you can answer, without looking: why
does the `JOIN` version of an existence check need `DISTINCT`, and when
should you reach for `JOIN` instead of `EXISTS`?
