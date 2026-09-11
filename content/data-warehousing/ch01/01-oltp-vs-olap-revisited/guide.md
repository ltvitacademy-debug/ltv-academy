# Lesson 1 — OLTP vs. OLAP, Revisited

**Chapter 1 · Dimensional Modeling Fundamentals · Lesson 1 of 39**

## What you'll learn

- A quick refresher on OLTP vs. OLAP — and why this course revisits it
  before going any further
- The specific design goals a data warehouse optimizes for, that an
  OLTP system deliberately does not
- Why "just query the OLTP database directly for reporting" breaks
  down at real scale
- What this course actually adds on top of what T-SQL Development
  already covered

## Why revisit this at all

T-SQL Development's final chapter introduced OLTP vs. OLAP, star
schemas, and surrogate keys as a preview — enough to recognize the
vocabulary. This course is where that preview becomes a real skill:
designing a dimensional model yourself, from a business process down to
physical tables, not just recognizing one when you see it. Before
building anything, it's worth being precise about exactly what problem
a data warehouse solves that an OLTP system doesn't.

## Two systems, two different jobs

**OLTP (Online Transaction Processing)** systems — the SQL Server
database behind an order-entry app, a CRM, a billing system — are
optimized for **fast, safe writes** of small, individual transactions:
insert one order, update one customer's address, record one payment.
Their schemas are normalized (3NF and beyond) specifically to make
those writes fast and consistent, and to avoid storing the same fact
twice.

**OLAP (Online Analytical Processing)** systems — the warehouse this
course teaches you to build — are optimized for the opposite workload:
**reading large amounts of historical data**, aggregated across many
dimensions at once. "Total revenue by region, by quarter, by product
category, for the last three years" is an OLAP question. A normalized
OLTP schema answers that question by joining a dozen tables; a
dimensional model answers it by joining a handful.

## Why not just report off the OLTP database directly?

It's tempting, and it works for a while, until it doesn't:

- **Normalized schemas are slow for aggregate queries.** Getting a
  clean "revenue by region by quarter" number out of a fully
  normalized OLTP schema often means joining 8-10 tables — every one of
  those joins costs real query time at scale.
- **Reporting queries compete with production transactions.** A
  heavy analytical query scanning millions of rows can slow down or
  block the same tables the live application needs for fast writes.
- **OLTP schemas don't preserve history the way analysis needs.**
  A customer's address in an OLTP system holds one current value — it's
  not designed to answer "which region was this order actually shipped
  from, historically, at the time it happened," which is exactly the
  kind of question a dimensional model is built to answer (Chapter 4
  covers this directly, via Slowly Changing Dimensions).
- **Business definitions live in twenty different places.** Without
  one governed, conformed model, "revenue" quietly means something
  slightly different in every report someone builds against the raw
  OLTP tables.

## What this course adds

T-SQL Development told you *that* star schemas, facts, dimensions, and
surrogate keys exist. This course is where you learn to actually
**design** one: choosing the grain of a fact table before writing a
single CREATE TABLE statement (Lesson 4), classifying fact tables by
type (Chapter 2), designing dimensions properly — including the SCD
problem of tracking change over time (Chapters 3-4) — and building the
staging layer and physical warehouse that make the whole thing real
(Chapters 5-7), before a capstone that puts it all together (Chapter 8).

## Key terms

| Term | Meaning |
|---|---|
| OLTP | Online Transaction Processing — normalized schemas optimized for fast, individual writes |
| OLAP | Online Analytical Processing — dimensional schemas optimized for large, aggregated historical reads |
| Dimensional model | A warehouse schema (star or snowflake) designed specifically for analytical queries |
| Conformed | A shared, governed definition (of a dimension or a metric) used consistently across the whole warehouse |

## Lab

1. Open AdventureWorks2012 (OLTP) in SSMS and write a query that
   answers: "total SalesOrderDetail line revenue, by year, by product
   subcategory." Count how many tables you had to join.
2. Open AdventureWorksDW2014 (the warehouse version) and answer the
   same question against `FactInternetSales`, `DimDate`, `DimProduct`,
   and `DimProductSubcategory`. Compare the join count and, if you can,
   the query's actual execution time.

## Check yourself

You're ready for Lesson 2 when you can explain, without looking: name
two concrete reasons reporting directly off a normalized OLTP schema
breaks down at scale, and what a dimensional model does differently to
solve them.
