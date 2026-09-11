# Lesson 2 — What Is Dimensional Modeling?

**Chapter 1 · Dimensional Modeling Fundamentals · Lesson 2 of 39**

## What you'll learn

- The actual definition of dimensional modeling — a design *technique*,
  not a specific diagram shape
- The two, and only two, types of tables it ever produces: fact tables
  and dimension tables
- Why the discipline exists at all — what it optimizes for, and what
  it deliberately gives up to get there
- Where dimensional modeling sits relative to a physical warehouse, a
  Power BI semantic model, and the ETL process that loads either one

## A design technique, not a diagram

**Dimensional modeling** is a data modeling technique for structuring
data so it's fast and intuitive to query for analysis. That's the whole
definition. It's easy to jump straight to "star schema" because that's
the shape dimensional modeling most often produces, but the technique
itself is the discipline of classifying every table in your model as
one of exactly two types — a **fact table** or a **dimension table** —
and designing each type according to its own set of rules. The
resulting shape (star, snowflake, or a mix) is a downstream decision,
covered next lesson. This lesson is about the classification itself.

## The two building blocks

**Dimension tables** describe the *things* your business cares about
— products, customers, salespeople, stores, dates. A dimension table
has a key column that uniquely identifies each row, plus descriptive
attribute columns used to filter and group data. Dimension tables are
usually narrow in row count (a few thousand products, a few hundred
salespeople) but can be wide in column count.

**Fact tables** store the *measurements* — the events and
observations. A sales fact table stores one row per sale (or sale
line); an inventory fact table stores a stock count at some interval.
A fact table holds dimension keys (which relate it to its dimension
tables) and numeric measure columns (which get summed, averaged, or
counted). Fact tables are narrow in column count but can grow to
billions of rows.

Every single table in a dimensional model is one of these two types.
Never both. A table that mixes descriptive attributes and
transactional measures together is a design smell this course will
teach you to spot and fix.

## Why model this way at all

Lesson 1 established the *problem*: normalized OLTP schemas are slow
and awkward for the kind of aggregate, multi-dimensional questions
analytics asks. Dimensional modeling is the *answer* — a technique
built specifically around three goals:

- **Query performance.** Filtering and grouping through a handful of
  dimension tables, then summarizing a fact table, requires far fewer
  joins than reconstructing the same answer from a fully normalized
  schema.
- **Business intuitiveness.** "Sales by product by region by
  quarter" maps almost directly onto fact and dimension tables named
  the same way business users already think and talk. Analysts and
  report authors can navigate the model without a data dictionary.
- **Conformance.** Once a dimension (like `Date` or `Product`) is
  built correctly, every fact table in the warehouse can reuse it,
  guaranteeing that "revenue by quarter" means the same quarter
  everywhere it's used.

## What dimensional modeling gives up

Nothing is free. Dimensional models are deliberately **denormalized**
compared to an OLTP schema — the same descriptive value (a product's
category name, say) is often repeated across many rows rather than
stored once and joined. That trades storage space and write-time
complexity for read-time simplicity and speed — exactly the right
trade for a system whose entire job is being read by analytical
queries, not written to by a live application.

## Where this fits

Microsoft's own guidance treats dimensional modeling as a prerequisite
skill for building a well-performing Fabric Warehouse *and* for
building a well-performing Power BI semantic model — the same fact and
dimension vocabulary applies whether the model physically lives in a
warehouse loaded by ETL, or is assembled directly with Power Query for
self-service analysis. This course builds it the first way: real
tables, in a real warehouse, loaded by a real ETL process (Chapters
5-7), because that's the only approach that can properly track
historical change (Slowly Changing Dimensions, Chapters 3-4) — a Power
Query-only model can't.

## Key terms

| Term | Meaning |
|---|---|
| Dimensional modeling | A data modeling technique that structures data as fact and dimension tables for fast, intuitive analytical queries |
| Dimension table | Describes a business entity (product, customer, date); has a key plus descriptive attributes |
| Fact table | Stores measurements/events; has dimension keys plus numeric measures |
| Denormalization | Deliberately storing redundant descriptive data to reduce joins and speed up reads |

## Lab

1. Look at AdventureWorksDW2014's table list in SSMS. Sort the tables
   into two piles by name prefix alone — everything starting `Dim`
   and everything starting `Fact`. Confirm every table you see fits
   one of the two types with no exceptions.
2. Open `DimProduct` and `FactInternetSales`. For each, name one
   column that could never belong in the other table, and explain why
   (in terms of "descriptive attribute" vs. "numeric measure").

## Check yourself

You're ready for Lesson 3 when you can explain, without looking: the
two table types dimensional modeling ever produces, one concrete thing
each type optimizes for, and one thing the technique deliberately
gives up to get there.
