# Lesson 113 — Fact Tables and Dimension Tables · Voiceover script

Segments map 1:1 to slides. Target: ~2 minutes total.

---

## S1 · TITLE CARD

Every warehouse table you've touched this chapter falls into one of
exactly two roles. Time to name them properly: fact tables and dimension
tables.

## S2 · STEPS CARD (two roles)

A fact table holds measurable events — things that happened, with
numbers attached. Mostly foreign keys, plus a handful of measures you'd
sum or average. Narrow, but potentially millions of rows tall. A
dimension table holds the descriptive context around those events — who,
what, when, where. Wide, but relatively few rows.

## S3 · CODE CARD (fact table)

Fact Internet Sales is the textbook fact table. Almost nothing but keys
pointing at dimensions, plus sales amount and order quantity — the
actual numbers worth adding up.

## S4 · CODE CARD (dimension table)

Dim Product is the textbook dimension. Product name, color, size, list
price — rich, descriptive attributes you'd group or filter by, not sum.
Put the two together with a join, and you get real answers: what
happened, and what it actually means.

## S5 · OUTRO CARD

Fact tables narrow and tall, dimension tables wide and short — on
purpose, because of how many rows each one actually holds. Next lesson:
how these two shapes connect together into a schema — the star schema.
See you there.
