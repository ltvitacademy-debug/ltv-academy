# Lesson 72 — Project 2: Building the Target Warehouse

**Chapter 4 · Added Projects — Capstones · Lesson 72 of 81**

## What you'll learn

- Designing the target star schema for three consolidated sources
- Building conformed dimensions on top of Lesson 71's crosswalk table
- Loading order: customers, then inventory, then orders — now as actual DDL
- Why this is the same star schema idea as Project 1, at a different grain

## The target schema, star-shaped again

Lesson 8's star schema principle doesn't change because the source count
changed from one project to three — it's still one fact table, grain
fixed first, surrounded by conformed dimensions. The grain here: **one row
per order line**, matching the legacy order system's natural grain, since
that's the finest-grained fact this warehouse needs to support.

```sql
-- gold.DimCustomer: built FROM the crosswalk, not from either
-- source directly — this IS the conformed dimension
CREATE TABLE gold.DimCustomer (
  customer_key      BIGINT,   -- conformed_customer_key from crosswalk
  customer_guid     STRING,   -- from CRM, authoritative
  customer_name     STRING,
  segment           STRING
) USING DELTA;

-- gold.DimProduct: conformed from the inventory system's SKUs
CREATE TABLE gold.DimProduct (
  product_key       BIGINT,
  sku               STRING,
  product_name      STRING,
  category          STRING
) USING DELTA;

-- gold.FactOrders: the fact table, referencing conformed keys only
CREATE TABLE gold.FactOrders (
  order_line_id     BIGINT,
  order_id          BIGINT,
  customer_key      BIGINT,   -- FK to DimCustomer, NOT the legacy
                              -- order system's raw name field
  product_key       BIGINT,   -- FK to DimProduct, NOT the raw sku
  date_key          INT,
  quantity          INT,
  order_total       DECIMAL(10,2)
) USING DELTA;
```

Every foreign key in `FactOrders` points at a *conformed* key, never at a
raw source identifier. That's the entire point of Lesson 71's crosswalk —
by the time data reaches this table, the three-system disagreement about
what a "customer" or a "product" is has already been resolved upstream.

## Loading in dependency order, as DDL becomes reality

Lesson 71 planned the order; this is where it actually gets executed.

```
1. Load DimCustomer   -- from CRM + crosswalk (customers first)
2. Load DimProduct    -- from inventory system (parallel-safe)
3. Load FactOrders    -- from legacy SQL Server, resolving every
                          raw reference through DimCustomer/DimProduct
                          via the crosswalk before the row is written
```

Loading `FactOrders` last isn't just about timing — it's a hard
dependency. Writing an order-line row requires a valid `customer_key` and
`product_key`, and those only exist once the dimension loads (steps 1 and
2) have already run and the crosswalk has resolved every reference.

## The same idea, a harder version

Project 1's `FactSales` and this project's `FactOrders` are the same
modeling idea from Lesson 8 — a fact table, a fixed grain, conformed
dimensions. What's different is *where the conforming work happens*:
Project 1 conformed two feeds from the same organization in silver.
Project 2 conforms three systems that were never designed to talk to each
other, and that conforming work (the crosswalk) has to be trustworthy
*before* a single fact row gets loaded, not fixed up afterward.

## Verifying against the reconciliation check

Lesson 71's nightly reconciliation query now has something real to run
against: `SUM(order_total)` from `gold.FactOrders` should match the legacy
system's total for the same date, within the agreed tolerance, every night
during the coexistence period — the first real signal that this warehouse
is trustworthy enough to eventually replace what it's consolidating.

## Key terms

| Term | Meaning |
|---|---|
| Conformed dimension | A dimension built from the crosswalk, not copied from either source directly |
| Hard load dependency | `FactOrders` cannot load correctly until both dimension loads have resolved every reference |
| Trustworthy before load | The crosswalk must be correct before facts load, not corrected afterward |

## Check yourself

You're ready for Lesson 73 when you can explain, without looking: why must
`DimCustomer` and `DimProduct` finish loading before a single row of
`FactOrders` can be written correctly?
