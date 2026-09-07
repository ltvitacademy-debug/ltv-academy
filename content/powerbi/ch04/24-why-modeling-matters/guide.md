# Lesson 24 — Why Data Modeling Matters

**Chapter 4 · Data Modeling · Lesson 1 of 8**

## What you'll learn

- Why loading tables into Power BI isn't enough on its own
- What a data model actually is, and what job it does
- Why star schema is the design Microsoft recommends for Power BI
- How this chapter builds toward a complete, working model

## Loading data isn't the same as modeling it

Every lesson in Chapter 3 was about getting data clean, one query at a
time. But Power BI reports rarely run off a single table. Real analysis —
sales by region, hours by project priority, revenue by product category —
means pulling numbers from one table and slicing them by labels that live
in another. Without something connecting those tables, Power BI has no way
to know that a row in one belongs with a row in another.

That "something" is a **relationship**, and the overall shape formed by
your tables and their relationships is your **data model**. Chapter 4 is
entirely about building one well.

## What a data model does

Every visual you drop onto a Power BI report generates a query behind the
scenes — one that filters, groups, and summarizes your model's data. A
well-designed model gives that query two kinds of tables to work with:

- Tables that **filter and group** — categories, dates, regions, customers
- Tables that **summarize** — orders, transactions, measurements

Microsoft's guidance for structuring these tables is called **star
schema**, and it's the design this chapter builds toward:

![Diagram of a star schema: a Sales fact table in the center connected to Product, Date, Sales Territory, Employee, and Reseller dimension tables arranged around it like points of a star.](/courses/power-bi/ch04/24-why-modeling-matters/star-schema-example-1.svg)
*One fact table at the center, surrounded by dimension tables — the shape gives the design its name.*

The table in the middle stores the events you're measuring — sales, in
this example. The tables around it describe the *things* involved in each
event: which product, which date, which salesperson. You'll formally meet
fact and dimension tables in the next lesson.

## What a finished model looks like

A real Power BI model can grow to a dozen or more tables, all connected by
relationships that Power BI uses to answer questions that span multiple
tables at once:

![Screenshot of a Power BI model with six related tables — Time, Sales, Customer, Product, Purchases, and Vendor — connected by relationship lines showing cardinality.](/courses/power-bi/ch04/24-why-modeling-matters/create-manage-relationships-01.png)
*Every line is a relationship. Each one tells Power BI how to carry a filter from one table into another.*

Without these relationships, each table is an island. Filter by
**Product**, and nothing happens to the numbers in **Sales** — Power BI has
no path connecting them. That's the exact problem this chapter solves.

## Where this chapter is headed

Over the next seven lessons, you'll build this understanding step by step:

| Lesson | What it covers |
|---|---|
| 25 | Fact tables vs. dimension tables — telling the two apart |
| 26 | Star schema — the recommended shape for a Power BI model |
| 27 | Creating relationships — connecting your tables |
| 28 | Cardinality — one-to-many, one-to-one, and many-to-many |
| 29 | Filter direction — controlling how filters travel |
| 30 | Active vs. inactive relationships — when a table needs more than one connection |
| 31 | Building a complete data model — putting it all together |

By the end, filtering by any table in your model will correctly ripple
through to every table that depends on it — which is the entire point of
building a model in the first place.

## Key terms

| Term | Meaning |
|---|---|
| Data model | The set of tables in your report and the relationships connecting them |
| Relationship | A connection between two tables that lets a filter in one affect the other |
| Star schema | A model design with fact tables at the center and dimension tables around them |

## Lab

You already have SQL Server access with **AdventureWorks2012** and
**Northwind** installed, and you've been writing T-SQL against them.
Time to point Power BI at the same server (the SQL Server connector from
Chapter 2, Lesson 9).

1. In Power BI Desktop, connect to your SQL Server instance and import
   two **AdventureWorks2012** tables that don't share an obviously
   matching column name — `Person.Person` and `Sales.SalesOrderHeader`
   work well, since nothing about their columns tells Power BI they're
   related.
2. Try building a visual that uses a column from each table. Notice what
   happens — or doesn't — without a relationship connecting them.
3. Keep this file open. You'll use it again in Lesson 27 to create the
   relationship for real.

## Check yourself

You're ready for Lesson 25 when you can explain, in one sentence, why a
Power BI report with multiple unrelated tables can't correctly filter one
table by a column in another.
