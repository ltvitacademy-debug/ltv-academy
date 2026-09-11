# Lesson 8 — Periodic Snapshot Facts

**Chapter 2 · Fact Tables · Lesson 8 of 39**

## What you'll learn

- What a periodic snapshot fact table is, and the specific problem it
  solves that a transaction fact table doesn't
- Why its measures are semi-additive, not fully additive — and exactly
  which sums are valid and which aren't
- How to design one in T-SQL, using Microsoft's inventory example as
  the model
- When to reach for a periodic snapshot instead of just aggregating a
  transaction table yourself

## The problem transaction facts don't solve

A transaction fact table only has a row when something happens. That's
fine for sales orders, but it breaks down for a question like "what was
every product's stock level at the end of each day?" Nothing
necessarily "happens" to a product that just sits on a shelf — there's
no event to record, yet you still need a number for it every single
day. A **periodic snapshot fact table** solves this directly: it stores
one row per entity, per fixed time interval, loaded on a schedule
whether or not anything changed. Microsoft's own guidance uses exactly
this example — an inventory fact table loaded every day with the
end-of-day stock balance of every product.

Periodic snapshots are also a deliberate performance choice. There
might be millions of individual stock movements in a day — each one
could theoretically be its own transaction fact row — but if your
analysis only cares about trends in the end-of-day balance, storing
every movement is expensive and unnecessary. The snapshot gives you the
answer you actually need at a fraction of the row count.

## Designing one in T-SQL

```sql
CREATE TABLE f_InventorySnapshot
(
    -- Dimension keys
    SnapshotDate_Date_FK   INT NOT NULL,
    Product_FK              INT NOT NULL,
    Warehouse_FK            INT NOT NULL,

    -- Measures
    QuantityOnHand           INT NOT NULL,
    UnitCost                 DECIMAL(10,2) NOT NULL,

    -- Audit attributes
    AuditCreatedDate          DATE NOT NULL
);
```

The grain, stated the way Lesson 4 requires: *"one row per product per
warehouse per snapshot date."* Every product-warehouse combination gets
a row every single day, whether its `QuantityOnHand` changed or not —
that's what distinguishes the load pattern from a transaction table's
"only insert when something happens."

## Semi-additive: the rule that trips people up

`QuantityOnHand` looks like a normal numeric measure, and in one
direction it behaves like one: you can sum it across products or
across warehouses on a *given day* and get a real total on-hand
quantity. That's a valid additive direction.

But summing it across **snapshot dates** is wrong. Adding Monday's
balance to Tuesday's balance doesn't represent two days' worth of
anything — it's the same stock being counted twice, just because it
happened to still be sitting there on both days. That's exactly what
Microsoft's guidance means by *semi-additive*: valid across some
dimensions, invalid across others, and time is almost always the
dimension where it breaks. If you need a trend over time, you take the
*average* balance or the *last* balance in the period — you never
`SUM()` across dates.

## Key terms

| Term | Meaning |
|---|---|
| Periodic snapshot fact table | One row per entity per fixed time interval, loaded on a schedule |
| Semi-additive measure | Valid to sum across some dimensions (e.g. products) but not others (e.g. time) |
| Snapshot date | The dimension key that identifies which interval a snapshot row belongs to |

## Lab

Design the grain statement and column list for a periodic snapshot
fact table that captures every customer's loyalty-points balance at
the end of each month. Then write, in plain English, one valid sum
(across a dimension it's safe to add) and one invalid sum (across time)
for your table's measure.

## Check yourself

You're ready for Lesson 9 when you can explain, without looking, why a
periodic snapshot measure like an inventory balance is semi-additive,
and name the one dimension you should never sum it across.
