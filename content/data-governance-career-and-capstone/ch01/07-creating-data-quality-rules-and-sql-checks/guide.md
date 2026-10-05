# Lesson 7 — Creating Data Quality Rules and SQL Checks

**Chapter 1 · Capstone: LTV Global Data Governance Program · Lesson 7 of 35**

## What you'll learn

- How to turn the glossary definitions and classifications from
  Lessons 5-6 into real, runnable data quality rules
- Real T-SQL checks against LTV Global's Atlas schema for each of the
  four critical data elements
- How to combine every rule into one `UNION ALL` failures report
- A referential integrity check between `Orders` and `OrderLines`

**Reminder:** LTV Global and its Atlas schema below are fictional and
illustrative, invented for this capstone — the T-SQL itself is real,
correct, and runnable against any SQL Server database with matching
tables.

## From definition to rule

Every rule below exists because of a decision made earlier in this
chapter: `OrderTotal`'s rule exists because Lesson 3 scored it as a
CDE and Lesson 5 defined it; the `Email` rule exists because Lesson 6
classified it Confidential. A rule with no definition or owner behind
it is just a guess at what "bad" means — these aren't.

## Rule 1 — OrderTotal must be positive

```sql
-- RULE: ORD-001 — OrderTotal must be positive
SELECT OrderId, CustomerId, OrderTotal
FROM dbo.Orders
WHERE OrderTotal <= 0
ORDER BY OrderTotal ASC;
```

Steward Sam Okonjo owns this check. A zero or negative `OrderTotal`
almost always means a failed discount calculation or a cancelled
order that was never fully voided in Atlas.

## Rule 2 — Email must be present and well-formed

```sql
-- RULE: CUST-001 — Email must be present and well-formed
SELECT CustomerId, Email
FROM dbo.Customers
WHERE Email IS NULL
   OR Email NOT LIKE '%_@_%._%';
```

Steward Priya Anand owns this one. A missing or malformed email means
LTV Global can't send an order confirmation — and, per Lesson 1, it
also means a future access request against that record will be harder
to fulfill correctly.

## Rule 3 — SKU must be unique

```sql
-- RULE: PROD-001 — SKU must be unique
SELECT SKU, COUNT(*) AS RecordCount
FROM dbo.Products
GROUP BY SKU
HAVING COUNT(*) > 1;
```

Steward Diego Marsh owns this one. Lesson 5's glossary entry defined
`SKU` as never reused — a duplicate here means that rule has already
been broken somewhere upstream in Atlas.

## Rule 4 — referential integrity between Orders and OrderLines

```sql
-- RULE: ORD-002 — every OrderLine must belong to a real Order
SELECT ol.OrderLineId, ol.OrderId
FROM dbo.OrderLines AS ol
WHERE NOT EXISTS (
    SELECT 1 FROM dbo.Orders AS o
    WHERE o.OrderId = ol.OrderId
);
```

An orphaned order line — one whose `OrderId` doesn't exist in
`dbo.Orders` — usually means a delete happened in the wrong order
during a batch job, and it will quietly break any report that joins
the two tables.

## Combining every rule into one failures report

```sql
SELECT 'ORD-001: OrderTotal must be positive' AS RuleName,
       CAST(OrderId AS VARCHAR(20)) AS RecordKey
FROM dbo.Orders
WHERE OrderTotal <= 0

UNION ALL

SELECT 'CUST-001: Email must be present and well-formed',
       CAST(CustomerId AS VARCHAR(20))
FROM dbo.Customers
WHERE Email IS NULL OR Email NOT LIKE '%_@_%._%'

UNION ALL

SELECT 'PROD-001: SKU must be unique',
       SKU
FROM dbo.Products
GROUP BY SKU
HAVING COUNT(*) > 1

UNION ALL

SELECT 'ORD-002: OrderLine must belong to a real Order',
       CAST(ol.OrderLineId AS VARCHAR(20))
FROM dbo.OrderLines AS ol
WHERE NOT EXISTS (
    SELECT 1 FROM dbo.Orders AS o WHERE o.OrderId = ol.OrderId
);
```

This single query, run on a schedule, is LTV Global's first real
data quality dashboard input — one row per violation, labeled by
which rule fired, exactly the pattern this career path's Data Quality
Management course taught.

## Key terms

| Term | Meaning |
|---|---|
| Data quality rule | A specific, testable statement of what makes a value valid, derived from a glossary definition |
| Failures report | A single result set combining multiple rules' violations via UNION ALL |
| Orphaned row | A row whose foreign key references a parent row that no longer exists |

## Lab

Write one additional T-SQL check against the Atlas schema described in
this lesson — for example, a rule that `Payments.CardToken` must never
be `NULL` for a completed order. Add it as a fifth branch to the
`UNION ALL` failures report above, keeping the `RuleName` and
`RecordKey` columns consistent with the existing branches.

## Check yourself

- Why does Rule 1 check for `OrderTotal <= 0` instead of `OrderTotal <
  0`?
- What does Rule 4 actually detect, and why does it matter for
  reporting?
- Why does every `UNION ALL` branch cast its key column to the same
  type?
