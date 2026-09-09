# Lesson 115 — Snowflake Schema

**Chapter 12 · Data Warehouse Concepts · Lesson 9 of 12**

## What you'll learn

- What a **snowflake schema** is, and how it differs from Lesson 114's star
- The real snowflake chain already living inside `AdventureWorksDW2014`
- Why `AdventureWorksDW2014` is actually a **hybrid** — not purely one or
  the other
- The genuine tradeoff: fewer duplicated values vs. more joins per query

## Normalizing the dimensions back

A **snowflake schema** takes Lesson 114's star and normalizes its
dimension tables further — splitting one dimension into several smaller,
related tables, the way Chapter 11 would. Instead of every dimension
sitting exactly one join away from the fact table, a snowflaked dimension
sits **two or more hops** away, chained through sub-dimension tables.
Drawn out, those extra branching chains make the diagram look like a
snowflake instead of a clean star.

## The real snowflake chain in AdventureWorksDW2014

`AdventureWorksDW2014`'s product dimension is **genuinely snowflaked**:
`DimProduct` doesn't store category and subcategory names directly —
instead, it has a foreign key to `DimProductSubcategory`, which in turn
has a foreign key to `DimProductCategory`:

```sql
-- A real two-hop chain: Product -> Subcategory -> Category
SELECT p.EnglishProductName, sc.EnglishProductSubcategoryName, cat.EnglishProductCategoryName
FROM dbo.DimProduct AS p
JOIN dbo.DimProductSubcategory AS sc ON sc.ProductSubcategoryKey = p.ProductSubcategoryKey
JOIN dbo.DimProductCategory AS cat ON cat.ProductCategoryKey = sc.ProductCategoryKey;
```

Getting from `FactInternetSales` to a product's category name now takes
**three joins** total — fact to `DimProduct`, `DimProduct` to
`DimProductSubcategory`, `DimProductSubcategory` to `DimProductCategory`
— not Lesson 114's clean one hop.

## AdventureWorksDW2014 is actually a hybrid

This is worth calling out explicitly: `AdventureWorksDW2014` isn't purely
star *or* purely snowflake — `DimDate` and `DimCustomer` sit one hop from
the fact table (star-shaped), while the product family chains two hops
deep (snowflaked). Most real warehouses look exactly like this: whichever
shape fits each individual dimension's needs, not a single dogmatic
choice applied everywhere.

## The real tradeoff

- **Star** (Lesson 114): fewer joins, faster typical queries, but
  category and subcategory names get duplicated across every product row
- **Snowflake**: category name lives in exactly one place — normalized,
  Chapter-11-style — but every query touching it now pays for an extra
  join or two

Snowflaking wins when a dimension attribute changes often and duplication
would mean updating thousands of rows; star wins when query speed matters
more than that storage/update cost.

## Key terms

| Term | Meaning |
|---|---|
| Snowflake schema | A star with one or more dimensions normalized into sub-dimension tables |
| Sub-dimension | A smaller table a dimension references, adding an extra join hop |

## Lab

Run against `AdventureWorksDW2014`:

```sql
-- Compare join depth: DimDate (star-shaped) vs. DimProduct's family (snowflaked)
SELECT COUNT(*) AS SubcategoryCount FROM dbo.DimProductSubcategory;
SELECT COUNT(*) AS CategoryCount FROM dbo.DimProductCategory;
```

## Check yourself

You're ready for Lesson 116 when you can explain, without looking: what
makes a schema "snowflaked" instead of a pure star, and why is
`AdventureWorksDW2014` actually a hybrid of both?
