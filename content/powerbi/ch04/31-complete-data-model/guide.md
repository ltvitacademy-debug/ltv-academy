# Lesson 31 — Building a Complete Power BI Data Model

**Chapter 4 · Data Modeling · Lesson 8 of 8**

## What you'll learn

- How the six ideas from this chapter combine into one checklist
- What to check, in order, when assembling a real model
- How to read a finished model in Model view with fresh eyes
- Where data modeling connects to the next chapter, DAX

## Six lessons, one skill

Every lesson in this chapter added one piece:

| Lesson | Piece |
|---|---|
| 24 | Why a model — and relationships — are necessary at all |
| 25 | Telling fact tables and dimension tables apart |
| 26 | Star schema: the shape that makes filtering predictable |
| 27 | Creating a relationship between two tables |
| 28 | Cardinality: how values match up across a relationship |
| 29 | Cross filter direction: how far a filter travels |
| 30 | Active vs. inactive: resolving conflicts when tables connect more than one way |

Building a complete model is simply applying all six, table by table,
until every relationship you need exists and behaves the way you expect.

## A working checklist

When you sit down with a fresh set of tables, work through them in this
order:

1. **Sort tables into fact and dimension** (Lesson 25). Which tables store
   events? Which describe things?
2. **Arrange them as a star**, if you can (Lesson 26) — one fact table,
   dimension tables directly around it, nothing looping back on itself.
3. **Create every relationship** you need (Lesson 27), letting autodetect
   handle the obvious ones and building the rest manually.
4. **Check cardinality on each one** (Lesson 28) — many-to-one, pointing
   from fact to dimension, is what you'll see most.
5. **Set cross filter direction deliberately** (Lesson 29) — Both for a
   clean star, Single where reaching further would create ambiguity.
6. **Resolve any table connected more than one way** (Lesson 30) by
   picking one active relationship and leaving the rest available for
   `USERELATIONSHIP`.

## Reading a finished model

Here's a real model, seen in Model view, with six tables and every
relationship visible at once:

![Screenshot of a Power BI model with Product, Customer, Sales Territory, Reseller, Sales, and Date tables connected by relationship lines, viewed in Model view.](/courses/power-bi/ch04/31-complete-data-model/relationships-options-03.png)
*Sales sits at the center. Every other table connects to it directly — a textbook star.*

Practice reading it the way this chapter taught you to: find the fact
table (the one everything else points at), confirm each relationship's
cardinality makes sense, and check that no two tables share more than one
active path between them.

Not every real-world model stays this clean — sometimes a business
genuinely needs more tables than one fact and its dimensions:

![Screenshot of a Power BI model with six related tables — Time, Sales, Customer, Product, Purchases, and Vendor — connected by relationship lines.](/courses/power-bi/ch04/31-complete-data-model/create-manage-relationships-01.png)
*Two fact-like tables here — Sales and Purchases — both connected through shared dimensions. Read it the same way: trace each line, confirm the cardinality, and watch for loops.*

## The shape to keep returning to

Whatever else grows more complex, the underlying goal from Lesson 24 never
changes:

![Diagram of a star schema with a Sales fact table at the center connected to five dimension tables.](/courses/power-bi/ch04/31-complete-data-model/star-schema-example-1.svg)
*One fact table doing the summarizing. Dimension tables doing the filtering. Everything else in this chapter exists to build and maintain that shape correctly.*

## Where this leads next

A correct data model is what makes the next chapter possible. **DAX** —
the formula language for calculations in Power BI — depends entirely on
your relationships to know which rows a measure should sum, count, or
average. A `SUM` written against a broken or ambiguous model gives you a
wrong number with total confidence. Everything you just practiced is what
makes DAX trustworthy once you get there.

## Key terms

| Term | Meaning |
|---|---|
| Data model | The complete set of tables and relationships in your report |
| Model view | Where you see and verify your entire model's shape at once |
| Star schema | The target shape: one fact table, dimension tables around it |

## Lab

1. Take any two or three raw tables — your own, or ones from earlier
   chapters — and build a complete model from scratch using the six-step
   checklist above.
2. Open Model view and confirm the shape looks like a star, not a chain
   or a loop.
3. Test it: build one visual that combines a measure from your fact table
   with a filter from each dimension table, and confirm every number
   changes the way you expect.

## Check yourself

Chapter 4 is complete when you can take an unfamiliar set of tables, sort
them into facts and dimensions, connect them correctly, and explain every
relationship's cardinality and filter direction — without needing to
re-read this chapter to do it.
