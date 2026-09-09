# Lesson 114 — Star Schema · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Fact tables and dimension tables are the vocabulary. A star schema is
the actual SHAPE they get arranged into — and it's the shape almost every
warehouse you'll ever touch is built on.

## S2 · CODE CARD (real star)

Here's the real star, right inside AdventureWorks D-W. Fact Internet
Sales in the center. Four joins out to four different dimensions — date,
product, customer, sales territory. And notice: every single join goes
from the fact table OUT to a dimension. Never dimension to dimension.

## S3 · STEPS CARD (why it's a star)

That's the whole definition. One fact table at the center, dimension
tables radiating outward like points on a star, and every one of them
exactly ONE hop away. Draw it out, and it genuinely looks like a star.

## S4 · CODE CARD (denormalized)

Here's the part that would look wrong back in Chapter 11. Dim Product
doesn't split category and subcategory into their own separate
normalized tables. It flattens that right onto the product row. That's
a deliberate violation of Third Normal Form — on purpose, because fewer
joins means faster aggregate queries, and dimension tables are small
enough that the extra duplication barely costs anything.

## S5 · OUTRO CARD

One hop, every time, and denormalized dimensions on purpose — that's why
BI tools are built to expect exactly this shape. Next lesson: what
happens when you normalize those dimensions back — the snowflake schema.
See you there.
