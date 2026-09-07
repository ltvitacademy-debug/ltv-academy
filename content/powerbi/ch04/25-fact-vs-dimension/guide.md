# Lesson 25 — Fact Tables vs. Dimension Tables

**Chapter 4 · Data Modeling · Lesson 2 of 8**

## What you'll learn

- How to tell a fact table from a dimension table at a glance
- Why normalized data is the right shape for a Power BI model
- What "granularity" means for a fact table
- Why dimension tables usually stay small while fact tables grow

## Two kinds of tables

Star schema design asks you to sort every table in your model into one of
two roles.

**Dimension tables** describe the *things* your business deals with —
products, customers, dates, salespeople, regions. They contain a unique
identifier column plus descriptive columns you use to filter and group.

**Fact tables** store *events* — sales, orders, stock movements, sign-ins.
They contain key columns that point to your dimension tables, plus numeric
measure columns like quantity or amount.

A useful shortcut: if a column answers "what happened, how much, how
many," it belongs in a fact table. If it answers "what is this thing
called, what category is it in," it belongs in a dimension table.

## Normalize: don't repeat yourself

Getting fact and dimension tables right depends on **normalizing** your
data — storing each piece of information exactly once, referenced by key,
instead of repeated on every row.

![Screenshot of a normalized table with columns OrderNumber, OrderDate, ProductKey, ResellerKey, and SalesAmount — only the ProductKey identifies the product.](/courses/power-bi/ch04/25-fact-vs-dimension/normalized-data-example.svg)
*Normalized: the sales table stores only ProductKey — a reference, not the product's details.*

Compare that to a **denormalized** table, where product details ride along
on every single sales row:

![Screenshot of a denormalized table with the same columns plus Product, Category, Color, and Size repeated on every row alongside ProductKey.](/courses/power-bi/ch04/25-fact-vs-dimension/denormalized-data-example.svg)
*Denormalized: Product, Category, Color, and Size repeat on every row that shares a product — wasted space, and no dimension table to filter by.*

If you've ever exported a report to Excel or CSV, this is almost always
what you got: one wide, denormalized table. Part of your job in Power
Query is splitting that back into normalized fact and dimension tables —
exactly the kind of transformation you practiced in Chapter 3.

## Granularity: what one row means

A fact table's **granularity** is the level of detail one row represents.
Two dimension key columns don't tell you the granularity by themselves —
you have to look at what values those keys actually hold. A fact table
keyed by `Date` and `ProductKey` could be one row per sale, or — if every
`Date` value is the first of the month — one row per product, per month.
Always know your fact table's granularity before you build measures
against it; it determines what a `SUM` or `COUNT` is actually adding up.

## Why the split matters

Recall the star schema shape from Lesson 24:

![Diagram of a star schema showing a Sales fact table connected to Product, Date, Sales Territory, Employee, and Reseller dimension tables.](/courses/power-bi/ch04/25-fact-vs-dimension/star-schema-example-1.svg)
*Sales is the fact table — it summarizes. Everything around it is a dimension table — each one filters and groups.*

Dimension tables are typically small: a product list, a calendar, a set of
regions. Fact tables are typically large, and keep growing as new events
happen. Keeping them separate — rather than one denormalized table — keeps
your model efficient: Power BI only has to store each product's details
once, no matter how many thousands of sales reference that product.

## Key terms

| Term | Meaning |
|---|---|
| Dimension table | Describes a business entity — used for filtering and grouping |
| Fact table | Stores events — contains dimension keys and numeric measures |
| Normalization | Storing each piece of information once, referenced by key |
| Denormalization | Repeating descriptive data on every row instead of referencing it |
| Granularity | The level of detail one fact table row represents |

## Lab

Connect Power BI to your SQL Server instance and import
**AdventureWorksDW2014** — Microsoft's own data warehouse, already
split into exactly this shape.

1. Import `FactInternetSales` and `DimProduct`. Look at each table's
   columns: `FactInternetSales` holds order quantities and sales
   amounts (events); `DimProduct` holds product names, colors, and
   categories (things).
2. In Power Query, identify which columns in each table are keys versus
   descriptive attributes.
3. Sketch — on paper or in a notes app — why `FactInternetSales` counts
   as the fact table here and `DimProduct` counts as the dimension,
   using the definitions from this lesson.

## Check yourself

You're ready for Lesson 26 when you can look at any table and say, within
a few seconds, whether it belongs in your model as a fact table or a
dimension table — and why.
