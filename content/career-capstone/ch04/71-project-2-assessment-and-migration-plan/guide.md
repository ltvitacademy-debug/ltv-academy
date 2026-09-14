# Lesson 71 — Project 2: Source Assessment and Migration Plan

**Chapter 4 · Added Projects — Capstones · Lesson 71 of 81**

## What you'll learn

- Assessing three real source schemas for conflicts before writing any pipeline
- Why "different grain, different keys" is the actual migration risk, not volume
- Planning migration order using dependency, not convenience
- Designing the cutover approach and its reconciliation check

## Assessing the three sources

Before any transformation gets designed, each source needs the same
question asked: what's its grain, and what's its key?

```
Source              Grain                      Key
------------------- -------------------------- -------------------------
Legacy SQL Server   one row per order line     order_id (int, source-
(orders)                                       generated, resets yearly)
Cloud CRM           one row per customer       customer_guid (UUID,
(customers)                                                    globally unique)
Inventory system    one row per SKU per        sku (string, vendor-
(inventory)          warehouse, per day         specific format)
```

This is Lesson 8's grain-first principle applied to *existing* schemas
instead of a new one — except here, the grain was already decided by
three different teams, years ago, with no coordination. That mismatch,
not data volume, is the real migration risk.

## The conflict: keys that don't line up

The legacy order system's `order_id` resets each year and was never meant
to be globally unique. The CRM's `customer_guid` is globally unique but
has no relationship to the order system's own customer references (which
are just a text name field, entered inconsistently). Consolidating these
into one warehouse means building a **conformed key** — the same idea
Lesson 8 raised for conformed dimensions, but here the conforming has to
happen across systems that were never designed to agree, not just across
tables in one design.

```sql
-- A crosswalk table, resolving three inconsistent customer
-- references into one conformed customer_key
CREATE TABLE staging.customer_crosswalk (
  conformed_customer_key  BIGINT,
  legacy_order_name_text  STRING,   -- fuzzy-matched, needs review
  crm_customer_guid       STRING,   -- authoritative source
  source_system           STRING
);
```

This crosswalk is the single most important artifact in the whole
migration — every fact table in the new warehouse depends on it existing
and being right before cutover, not after.

## Planning migration order

Lesson 5's processing-model reasoning doesn't apply directly here since
all three sources are batch — the real ordering question is **dependency**:
which source does everything else need first?

```
1. Customers (CRM)     -- other sources reference customers;
                           migrate first so the crosswalk exists
2. Inventory            -- independent of orders/customers,
                           safe to migrate in parallel with step 1
3. Orders (legacy SQL)  -- migrates last; needs the customer
                           crosswalk and inventory keys already in place
```

Migrating orders last isn't arbitrary — it's the source with the most
dependencies on the other two being correct first.

## The cutover approach and reconciliation

Lesson 70 ruled out a big-bang cutover. The plan instead: run both the old
systems and the new warehouse in parallel for a defined period, comparing
totals nightly.

```
Reconciliation check (nightly, during the overlap period):
  SELECT SUM(order_total) FROM legacy_orders WHERE order_date = :d
  vs.
  SELECT SUM(order_total) FROM warehouse.FactOrders WHERE date_key = :d
  -- must match within a defined tolerance before cutover is approved
```

Only once reconciliation holds clean for a full business cycle (a full
month, so month-end processes are exercised too) does the actual cutover
— retiring the legacy system — get scheduled.

## Key terms

| Term | Meaning |
|---|---|
| Conformed key | A single customer/product identity resolved across sources that never agreed on one |
| Crosswalk table | Maps each source system's own key to the new conformed key |
| Reconciliation check | Nightly comparison confirming the new warehouse matches legacy totals before cutover |

## Check yourself

You're ready for Lesson 72 when you can explain, without looking: why does
this migration order customers before orders, rather than migrating
whichever source has the most data first?
