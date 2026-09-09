# Lesson 28 — The Gold Layer · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

The final layer, and the one everyone actually queries — gold.

## S2 · CODE CARD (aggregation applied)

This is exactly Foundations' group by and agg pattern, aimed at
silver's clean data instead of raw DataFrame. Gold's whole purpose
is answering one specific business question directly, cheaply, on
every future read.

## S3 · CODE CARD (why gold is small)

And gold tables are small on purpose — silver might have millions
of rows, gold aggregated down might have a few thousand. That size
difference is the entire point: the expensive aggregation already
happened once, so a dashboard query against gold is fast.

## S4 · CODE CARD (multiple gold tables)

One gold table answers one question well. It's a poor fit for a
totally different question — and that's not a flaw, that's the
design. Real pipelines build multiple gold tables from the same
silver source, each shaped for a specific need.

## S5 · OUTRO CARD

Same silver, different shapes, however many gold tables the
business actually needs. Next lesson: designing a bronze-to-silver
pipeline, turning this into a real, repeatable process.
