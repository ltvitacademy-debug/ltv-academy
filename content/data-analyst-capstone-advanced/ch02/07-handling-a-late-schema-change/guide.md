# Lesson 7 — Handling a Late Schema Change

**Chapter 2 · Building the T-SQL Warehouse Layer · Lesson 7 of 26**

## What you'll learn

- The scenario: marketing asks why orders happen, after this
  warehouse is already built and loaded
- Why `Sales.SalesReason` can't be added as a simple foreign key on
  `dw.FactProductSales`, the way earlier lessons added dimensions
- What a **bridge table** is, and why a many-to-many relationship
  forces a genuinely different pattern than a normal dimension
- Why this change is additive, and doesn't break anything Chapters
  3 through 6 are about to build on top of this warehouse

## The scenario

The warehouse built in Lessons 3 through 6 is already running.
Marketing comes back with a new question: *why* do customers place
orders? AdventureWorks2012 already has a real answer sitting in two
tables that haven't been touched yet:

```sql
SELECT TOP 5 * FROM Sales.SalesReason;
SELECT TOP 5 * FROM Sales.SalesOrderHeaderSalesReason;
```

`Sales.SalesReason` is a small reference table (`SalesReasonID`,
`Name`, `ReasonType` — values like "Price," "On Promotion," "Quality").
`Sales.SalesOrderHeaderSalesReason` is a **bridge table**: just two
columns, `SalesOrderID` and `SalesReasonID`, with no primary key of its
own other than the pair together.

## Why this isn't a normal new dimension

Every dimension this warehouse built so far has a clean one-to-many
relationship to the fact table: one product sells on many order lines,
one territory covers many order lines. Sales reasons don't work that
way. **A single order can have more than one reason attached to it at
once** — a customer might place an order both because of a promotion
*and* because they wanted a specific color. That's a genuine
**many-to-many** relationship between orders and reasons, and it
cannot be modeled with a single `SalesReasonKey` column added to
`dw.FactProductSales`, because a single column can only ever hold one
value per row.

```sql
SELECT SalesOrderID, COUNT(*) AS ReasonCount
FROM Sales.SalesOrderHeaderSalesReason
GROUP BY SalesOrderID
HAVING COUNT(*) > 1;
```

Running this against the real data proves the point — plenty of real
orders have more than one row here, confirming a single-column FK
would have to arbitrarily pick one reason and discard the rest.

## The real fix: a dimension plus a bridge table

```sql
CREATE TABLE dw.DimSalesReason (
    SalesReasonKey          INT IDENTITY(1,1) PRIMARY KEY,
    SalesReasonAlternateKey INT          NOT NULL,   -- Sales.SalesReason.SalesReasonID
    ReasonName                NVARCHAR(50) NOT NULL,
    ReasonType                NVARCHAR(50) NOT NULL
);

INSERT INTO dw.DimSalesReason (SalesReasonAlternateKey, ReasonName, ReasonType)
SELECT SalesReasonID, Name, ReasonType
FROM Sales.SalesReason;

CREATE TABLE dw.BridgeOrderSalesReason (
    SalesOrderID    INT NOT NULL,
    SalesReasonKey  INT NOT NULL REFERENCES dw.DimSalesReason(SalesReasonKey),
    PRIMARY KEY (SalesOrderID, SalesReasonKey)
);

INSERT INTO dw.BridgeOrderSalesReason (SalesOrderID, SalesReasonKey)
SELECT sohsr.SalesOrderID, dsr.SalesReasonKey
FROM Sales.SalesOrderHeaderSalesReason sohsr
JOIN dw.DimSalesReason dsr
    ON sohsr.SalesReasonID = dsr.SalesReasonAlternateKey;
```

`dw.BridgeOrderSalesReason` joins to `dw.FactProductSales` through
`SalesOrderID` — the degenerate dimension Lesson 4 already kept on the
fact table for exactly this reason. No new column goes on the fact
table at all; the bridge table is how multiple reasons connect to one
order without forcing a single-value column to hold them.

```sql
SELECT fps.SalesOrderID, dr.ReasonName
FROM dw.FactProductSales fps
JOIN dw.BridgeOrderSalesReason b ON fps.SalesOrderID = b.SalesOrderID
JOIN dw.DimSalesReason dr ON b.SalesReasonKey = dr.SalesReasonKey;
```

This query legitimately returns **more rows than
`dw.FactProductSales`** for an order with multiple reasons — that's
expected and correct for a bridge table, not a bug. Any front-end
using this join for counting or summing has to be built with that
fan-out in mind, which is exactly why a bridge table is reached for
only when the relationship genuinely is many-to-many, not by default.

## Why nothing already built breaks

`dw.DimSalesReason` and `dw.BridgeOrderSalesReason` are both brand new
objects — nothing about `dw.FactProductSales` or its four existing
dimensions changes at all. Every query, report, or model built against
this warehouse before today keeps working exactly as it did, because
nothing it already depends on moved. That's the same additive-change
principle you'll see reused, under pressure, when Finance's own
discrepancy surfaces in Chapter 7.

## Key terms

| Term | Meaning |
|---|---|
| Many-to-many relationship | A relationship where either side can legitimately have more than one match on the other side at once |
| Bridge table | A table of key pairs that resolves a many-to-many relationship, joined to the fact through a degenerate dimension or shared key |
| Fan-out | Extra rows produced by a join against a bridge table, one per matching pair, which must be accounted for in any aggregation |

## Lab

1. Run the `COUNT(*) ... HAVING COUNT(*) > 1` query above and note
   how many real orders have more than one sales reason.
2. Build `dw.DimSalesReason` and `dw.BridgeOrderSalesReason` against
   your scratch database and run the final join query above.
3. Write, in one sentence, why a single `SalesReasonKey` column on
   `dw.FactProductSales` would have been the wrong modeling choice
   here, even though it's exactly the pattern used for every other
   dimension in this warehouse.

## Check yourself

You're ready for Chapter 3 when you can explain what makes the
order-to-reason relationship many-to-many instead of one-to-many, why
that forces a bridge table instead of a simple foreign key, and why
joining through it can legitimately produce more rows than
`dw.FactProductSales` has.
