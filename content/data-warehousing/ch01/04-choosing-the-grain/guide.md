# Lesson 4 — Choosing the Grain

**Chapter 1 · Dimensional Modeling Fundamentals · Lesson 4 of 39**

## What you'll learn

- The precise definition of **grain**: what one single row in a fact
  table represents
- Why grain has to be declared in plain English *before* you write a
  single column, let alone a `CREATE TABLE` statement
- The tradeoff between atomic (fine) grain and summarized (coarse)
  grain, and why Kimball's advice is almost always "go atomic"
- The single most common fact-table design mistake: mixing two grains
  in one table

## What "grain" actually means

The **grain** of a fact table is a one-sentence statement of exactly
what a single row represents. Not the columns. Not the data types.
Just: what does one row mean? Two grain statements for the same sales
process, stated precisely, might be:

```
GRAIN: one row per order
GRAIN: one row per order line
```

Those look similar, but they are two entirely different fact tables.
The first row-per-order table can answer "how many orders did we take
in March," but it cannot tell you which products were on any of those
orders, because product doesn't exist at that grain. The second table
can answer both questions, because a product key is meaningful at the
line level.

## Why grain comes before columns

Every dimension key and every measure a fact table can legitimately
hold is *determined* by its grain. If the grain is "one row per order
line," a `ProductKey` belongs in the table, because every line has
exactly one product. A `ShipDate` might not belong yet — if a single
order ships as one shipment, ship date is an order-level fact, not a
line-level one, and forcing it onto the line grain means repeating the
same date on every line of that order for no analytical benefit.

This is why Kimball's design process puts **declare the grain**
before **identify the dimensions** and **identify the facts** — you
cannot correctly answer either of those questions until the grain is
locked down first. Lesson 5 covers where grain fits in that full
four-step process; this lesson is about getting the grain statement
itself right.

## Atomic grain vs. summarized grain

An **atomic-grain** fact table stores data at the lowest level of
detail the source system captures — one row per order line, one row
per scanned item, one row per click. A **summarized-grain** (or
aggregate) fact table pre-rolls that detail up to a coarser level —
one row per order, one row per product per day.

```
ATOMIC:      one row per order line
SUMMARIZED:  one row per product, per day
```

Kimball's standing advice is to build the **atomic grain first**,
almost without exception:

- Atomic data answers questions you haven't thought to ask yet.
  Summarized data can only answer questions that fit the level it was
  summarized to — ask for a lower level later, and you have to
  reprocess from the source all over again.
- Aggregate fact tables absolutely have a place (Chapter 2 covers
  them directly), but as an addition built *on top of* an atomic fact
  table for performance, never as a replacement for it.

## The most common mistake: mixing grains

The single most frequent fact-table design error is a table that
silently mixes two grains — some rows at the order level, others at
the line level, distinguished only by which columns happen to be
populated or null. This breaks additivity: summing a measure column
across all rows now double-counts or under-counts, because not every
row represents the same "thing." If you find yourself describing a
table's grain with an "and" or an "or," stop — that's two fact tables
wearing one table's clothes, and it needs to be split before a single
column gets added.

## Key terms

| Term | Meaning |
|---|---|
| Grain | A one-sentence statement of what a single fact table row represents |
| Atomic grain | The lowest level of detail the source system captures |
| Summarized (aggregate) grain | Fact data pre-rolled up to a coarser level than atomic |
| Mixed grain | A design error where a single fact table silently holds rows at two different grains |

## Lab

1. Write the grain statement, in one sentence, for
   `FactInternetSales` in AdventureWorksDW2014. Confirm it by checking
   whether `OrderQuantity` and `ProductKey` make sense at that grain.
2. Now write a grain statement for a *different* fact table that
   summarizes the same sales data to one row per product per month.
   List one question the atomic table can answer that the summarized
   one cannot.

## Check yourself

You're ready for Lesson 5 when you can explain, without looking: why
grain must be declared before dimensions or facts are chosen, why
atomic grain is the default recommendation, and what "mixed grain"
looks like as a warning sign in a real fact table.
