# Lesson 26 — Star Schema

**Chapter 4 · Data Modeling · Lesson 3 of 8**

## What you'll learn

- What makes a model's shape a "star schema" specifically
- Why this shape is what Power BI's query engine works best with
- What a hierarchy inside a dimension table buys you
- Why you should avoid mixing fact and dimension columns in one table

## Naming the shape

Lessons 24 and 25 already showed you the pieces — fact tables that
summarize, dimension tables that filter and group. **Star schema** is
simply the name for what happens when you connect them the recommended
way: one fact table at the center, with dimension tables around it, each
one connected directly to the fact table by its own relationship.

Look at a real Power BI model built this way, and the shape is obvious
even in the tool itself:

![Screenshot of Power BI Model view showing a Sales fact table in the center connected to Product, Customer, Sales Territory, Reseller, and Date dimension tables around it.](/courses/power-bi/ch04/26-star-schema/relationships-options-03.png)
*This is Model view — Power BI's own diagram of your relationships. Notice the shape: one table in the middle, everything else pointing into it.*

## Why the shape matters to the query engine

It's not just aesthetics. When a report visual asks a question that spans
two dimension tables — "how does sales by region compare to sales by
product?" — the query has to travel *through* the fact table to connect
them:

![Diagram showing cross-filtering flow in a star schema, with filters flowing from surrounding dimension tables into a central table.](/courses/power-bi/ch04/26-star-schema/candmrel_crossfilterstarschema.png)
*Filters flow inward from every dimension table to the fact table at the center — a single, predictable path.*

Compare that to a model with tables chained together in a loop or a long
sequence. There, a filter might have two different paths to reach the
same table, and Power BI can't always tell which path you mean. A star
schema avoids that entirely: every dimension has exactly one, direct route
to the fact table.

## Hierarchies live in dimension tables

Because a dimension table holds everything about one kind of entity, it's
also the natural place to build a **hierarchy** — a drill-down path from a
broad category down to a specific detail:

![Diagram of a hierarchy inside a dimension table with levels for Category, Subcategory, and Product.](/courses/power-bi/ch04/26-star-schema/hierarchy.svg)
*Category → Subcategory → Product, all columns of the same dimension table — letting report visuals drill down through them.*

This only works cleanly when the levels of the hierarchy live in a single
table. If you split Category and Product across two separate tables
instead (a design called a *snowflake*), you lose the ability to build one
hierarchy spanning both.

## The rule to hold onto

A well-structured model keeps every table clearly one type or the other —
dimension or fact, never both mixed together. Star schema isn't a rule
imposed for its own sake; it's the shape that gives Power BI's query
engine an unambiguous, single path to follow for every question a report
asks. The remaining lessons in this chapter — relationships, cardinality,
filter direction — are all about building that path correctly.

## Key terms

| Term | Meaning |
|---|---|
| Star schema | A fact table at the center, with dimension tables connected directly to it |
| Model view | Power BI's diagram of your tables and their relationships |
| Hierarchy | A drill-down path (like Category → Subcategory → Product) built from columns in one dimension table |
| Snowflake | A dimension split across multiple related tables instead of one |

## Lab

1. Connect to your SQL Server instance and import **AdventureWorksDW2014**'s
   `FactInternetSales`, `DimProduct`, `DimCustomer`, `DimDate`, and
   `DimSalesTerritory` — five tables, already shaped as a real star schema.
2. Open Model view (**View** → **Model view**, or the Model icon on the
   left rail) and arrange the tables with `FactInternetSales` in the
   center and the four `Dim` tables around it — the shape should already
   look familiar.
3. Note that AdventureWorksDW2014 actually stores `DimProductCategory`,
   `DimProductSubcategory`, and `DimProduct` as three separate related
   tables — a real-world snowflake dimension. You'll build a
   single-table hierarchy for real later in the course; for now, just
   identify the three tables and how they chain together.

## Check yourself

You're ready for Lesson 27 when you can explain why a star-shaped model
gives Power BI's query engine an easier job than a model where tables
chain together in a loop.
