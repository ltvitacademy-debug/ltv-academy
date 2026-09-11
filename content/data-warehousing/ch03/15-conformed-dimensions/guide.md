# Lesson 15 — Conformed Dimensions

**Chapter 3 · Dimension Tables · Lesson 15 of 39**

## What you'll learn

- What a **conformed dimension** is, and why it's the thing that makes a
  warehouse feel like *one* system instead of many
- The real example every warehouse has: a shared `Date` dimension
- Why conformed dimensions enable "drill-across" queries between
  unrelated fact tables
- What breaks when a dimension isn't actually conformed

## One dimension, shared on purpose

Every dimension you've built in this chapter so far has quietly assumed
one fact table uses it. A **conformed dimension** breaks that
assumption: it's a single, governed dimension table that multiple fact
tables — often from entirely different business processes — all
reference.

![Diagram showing a Sales fact table and an Inventory fact table, both relating to the same shared Date dimension and Product dimension, which are conformed dimensions used across both stars.](/courses/data-warehousing/ch03/15-conformed-dimensions/conformed-dimensions.svg)
*Sales and Inventory are entirely different business processes — but they both reference the exact same Date and Product dimensions.*
Source: [Microsoft Fabric — Modeling Dimension Tables](https://learn.microsoft.com/en-us/fabric/data-warehouse/dimensional-modeling-dimension-tables#conformed-dimensions)

The most universal example is the **date dimension**. Nearly every fact
table in a warehouse records *when* something happened, so almost every
fact table references the same one `DimDate` table — the sales star, the
inventory star, the shipping star, all of it.

## Why bother conforming a dimension at all?

Without a conformed dimension, it's easy to end up with a slightly
different `DimProduct` built separately for the sales team and another
one for the inventory team — same idea, different column names, subtly
different category groupings. That's exactly the "revenue means
something different in every report" problem Lesson 1 flagged back in
Chapter 1. Conforming a dimension fixes it structurally:

- **One governed definition.** "Product" means exactly the same thing —
  same attributes, same category hierarchy — everywhere it's used.
- **Drill-across queries become possible.** Because Sales and Inventory
  both key off the *same* `DimProduct` and `DimDate`, you can compare
  sales and inventory levels for the same product, on the same date,
  across two completely different fact tables.
- **Less to build and maintain.** One `DimDate` table serves the whole
  warehouse instead of five near-duplicates that all drift out of sync
  over time.

## What breaks when a dimension isn't actually conformed

If the sales team's product categories don't match the inventory team's
— even slightly — a query that tries to compare the two by category
silently produces numbers that don't actually line up. There's no error
message; the join still works, it just quietly answers a different
question than the one someone asked. Conforming dimensions up front, as
part of the design (not as a fix afterward), is what prevents this.

## Key terms

| Term | Meaning |
|---|---|
| Conformed dimension | A single, shared dimension table referenced by multiple fact tables |
| Drill-across | A query comparing measures from two different fact tables via a dimension they both share |

## Lab

Run against `AdventureWorksDW2014`:

```sql
-- DimDate and DimProduct are conformed: both are referenced by multiple
-- fact tables. Confirm it directly.
SELECT DISTINCT t.name AS FactTableName
FROM sys.foreign_key_columns fkc
JOIN sys.tables t ON t.object_id = fkc.parent_object_id
JOIN sys.columns c ON c.object_id = fkc.parent_object_id AND c.column_id = fkc.parent_column_id
WHERE c.name = 'ProductKey';
```

Confirm more than one fact table shows up — that's the conformed
dimension in action.

## Check yourself

You're ready for Lesson 16 (Chapter 4's first lesson) when you can
explain, without looking: what makes a dimension "conformed," why the
date dimension is the most universal example, and what a drill-across
query needs from two fact tables in order to work.
