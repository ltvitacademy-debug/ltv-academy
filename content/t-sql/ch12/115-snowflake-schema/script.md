# Lesson 115 — Snowflake Schema · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Last lesson's star kept every dimension exactly one join away, on
purpose. A snowflake schema takes that same idea and normalizes the
dimensions back — the way Chapter 11 would.

## S2 · CODE CARD (real chain)

AdventureWorks D-W actually has a genuine snowflake chain built in. Dim
Product doesn't store category and subcategory names directly — it
points to Dim Product Subcategory, which points to Dim Product Category.
Getting from the fact table to a category name now takes THREE joins,
not one.

## S3 · STEPS CARD (hybrid)

And here's the honest, real detail worth knowing: AdventureWorks D-W
isn't purely star or purely snowflake. Dim Date and Dim Customer sit one
hop away, star-shaped. The product family chains two hops deep,
snowflaked. Most real warehouses look exactly like this — a mix, not a
dogmatic single choice.

## S4 · CODE CARD (tradeoff)

So here's the actual tradeoff. Star: fewer joins, but category name gets
duplicated across every single product row. Snowflake: category name
lives in exactly one normalized place, but every query touching it pays
for an extra join or two. Snowflaking wins when an attribute changes
often; star wins when query speed matters more.

## S5 · OUTRO CARD

A star for speed, a snowflake for a single source of truth — and real
warehouses mix both. Next lesson: what happens when a dimension's
attributes actually CHANGE over time — slowly changing dimensions. See
you there.
