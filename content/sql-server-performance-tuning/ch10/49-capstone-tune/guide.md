# Capstone: Tune

Lesson 48 named the bottleneck precisely: `IX_Orders_CustomerID` doesn't cover
`dbo.usp_CustomerOrderHistory`, so every row triggers a Key Lookup, and the cost scales
with a customer's order count. Chapter 3 covered exactly this class of fix. This lesson
applies it — one deliberate, targeted change, informed by what Lesson 48 actually
measured.

## What you'll learn

- Why a covering index is the right tool for a Key-Lookup-at-scale problem
- The exact `CREATE INDEX` statement that fixes `usp_CustomerOrderHistory`
- Why the old index should be retired, not just left in place alongside the new one

## Designing the covering index

`dbo.usp_CustomerOrderHistory` filters on `CustomerID`, orders by `OrderDate DESC`, and
selects `OrderStatus`, `OrderTotal`, and `ShipDate`. Chapter 3's covering-index and
included-columns lessons give the exact recipe: equality/filter columns go in the key,
columns needed only for output go in `INCLUDE`, and — where the query's `ORDER BY`
matches — the sort column can go in the key too, so the engine doesn't need a separate
Sort operator:

```sql
CREATE NONCLUSTERED INDEX IX_Orders_CustomerID_OrderDate
ON dbo.Orders (CustomerID, OrderDate DESC)
INCLUDE (OrderStatus, OrderTotal, ShipDate);
```

`CustomerID` stays the seek predicate. `OrderDate DESC` in the key means the index is
already sorted the way the query needs it — no separate Sort operator, and the trailing-
12-months filter narrows the seek range directly. `OrderStatus`, `OrderTotal`, and
`ShipDate` ride along in `INCLUDE` so every column the `SELECT` needs is available right
at the leaf level. There is no longer any reason for a Key Lookup: the index itself now
covers the query completely.

## Retiring the old index

Chapter 3's index-tuning workflow lesson was explicit about this: adding a covering index
without removing the narrow one it replaces just means paying maintenance cost on two
overlapping indexes instead of one. `IX_Orders_CustomerID` (key: `CustomerID` only) is now
redundant — anything it could seek on, the new index seeks on too, plus it covers the
query outright:

```sql
DROP INDEX IX_Orders_CustomerID ON dbo.Orders;
```

Dropping it isn't optional cleanup — it's part of the deliberate change. Every `INSERT`
into `dbo.Orders` (Meridian ships thousands of orders a day) maintains every nonclustered
index on the table. Leaving a superseded index in place is a permanent tax on every write,
for zero remaining benefit.

## Why this is "one deliberate change," not a shotgun fix

Notice what this lesson does *not* do: it doesn't touch `MAXDOP`, doesn't rebuild unrelated
indexes, doesn't add a `NOLOCK` hint to make the symptom "go away" without addressing the
cause. Lesson 48 measured a specific operator, at a specific scale, on a specific
procedure. This lesson makes the one change that operator's diagnosis calls for. That
discipline is what Lesson 50 will be able to verify against — a before/after picture with
exactly one variable that changed.

## Key terms

| Term | Meaning |
|---|---|
| Covering index | An index whose key + INCLUDE columns satisfy every column a query touches, eliminating Key Lookups |
| INCLUDE columns | Non-key columns stored at a nonclustered index's leaf level, added purely to avoid lookups (Chapter 3) |
| Key-ordered index | An index whose key column order matches a query's ORDER BY, avoiding a separate Sort operator |
| Redundant index | An index made obsolete by a newer, broader index — should be dropped, not left to tax every write |

## Check yourself

Why does putting `OrderDate DESC` as the second key column (rather than only in `INCLUDE`)
matter for this specific query's plan, beyond just avoiding the Key Lookup?
