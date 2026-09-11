# Lesson 11 — Dimension Table Design

**Chapter 3 · Dimension Tables · Lesson 11 of 39**

## What you'll learn

- The four kinds of columns a well-designed dimension table actually has
- Why dimension tables are deliberately **denormalized** — and why that's
  cheap to do
- Why dimension tables tend to be wide (many columns) but short (few rows)
- A practical trick for figuring out which attributes a dimension needs

## Four kinds of columns, one dimension table

Chapter 2 treated a fact table's shape as settled business: mostly keys and
measures. A dimension table's shape has more moving parts, but a
well-designed one always sorts its columns into the same four groups:

- **Surrogate key** — the table's own system-generated identifier
  (Lesson 12 covers this in depth)
- **Natural key** — the identifier the row had back in the source system
  (Lesson 13 compares the two directly)
- **Descriptive attributes** — the text columns you actually filter and
  group by: name, category, color, region
- **Foreign keys** — columns pointing at *other* dimension tables, when
  this dimension is itself related to something else (a snowflaked or
  outrigger dimension)

Most dimension tables you build will have all four groups except the last,
which only shows up when a dimension genuinely relates to another
dimension.

## Denormalize on purpose

A **normalized** schema stores each fact exactly once and avoids
repetition — the right call for an OLTP system. A dimension table
deliberately breaks that rule. If a product belongs to a subcategory,
which belongs to a category, a properly denormalized `DimProduct` stores
**all three levels as columns on the same row** — `ProductName`,
`SubcategoryName`, `CategoryName` — instead of normalizing them into three
separate tables the way AdventureWorks2012's OLTP schema does.

That's redundant data, and it's fine. A product dimension might have a
few thousand rows; storing "Bikes" on every one of them costs almost
nothing. What you get in return is a query that filters or groups by
category without a single extra join — exactly the aggregate-query
performance Lesson 1 identified as the whole point of a warehouse.

## Descriptive attributes: the columns you filter and group by

A dimension's attribute columns exist to answer questions shaped like
"sales **by** region, **by** month, **by** product category." That word —
**by** — is the tell. Whenever a stakeholder says they need to analyze
something *by* some attribute, they're naming a column your dimension
table needs. Attributes are almost always text or low-cardinality values;
they're never the things you'd `SUM()` — that's a fact table's job.

## Why dimensions end up wide but short

Fact tables are narrow and tall — few columns, potentially billions of
rows. Dimension tables are the mirror image: **wide but short**. A
`DimProduct` table might carry dozens of descriptive attributes (name,
color, size, category, subcategory, list price, launch date), but only as
many rows as there are actual products — a few thousand, not millions.
That size difference is exactly why the denormalization tradeoff above
works out so favorably: the cost of extra columns is multiplied by row
count, and a dimension table's row count stays small.

## Key terms

| Term | Meaning |
|---|---|
| Denormalization | Deliberately storing redundant, precomputed data (like flattened hierarchy levels) to avoid joins |
| Dimension attribute | A descriptive column used to filter or group facts — not aggregated itself |
| Wide but short | The typical dimension table shape: many columns, relatively few rows |

## Lab

Run against `AdventureWorksDW2014`:

```sql
-- Count DimProduct's columns and rows to see "wide but short" for real
SELECT
    (SELECT COUNT(*) FROM sys.columns
     WHERE object_id = OBJECT_ID('dbo.DimProduct')) AS ColumnCount,
    (SELECT COUNT(*) FROM dbo.DimProduct) AS RowCount;
```

Then compare it to `FactInternetSales`'s own column and row count from
Chapter 2's labs. Confirm the shapes really are mirror images of each
other.

## Check yourself

You're ready for Lesson 12 when you can name the four column categories a
dimension table sorts into, and explain — using an actual number of
columns versus rows — why denormalizing a dimension table is a cheap
trade to make.
