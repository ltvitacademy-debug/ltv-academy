# Lesson 9 — Lineage Through Semantic Models · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Lesson 8 ended at the warehouse's gold layer. This lesson covers what sits on top of it — a semantic model, the layer that turns warehouse tables into something a report can actually query.

## S2 · STEPS — WHAT A SEMANTIC MODEL ADDS

A semantic model pulls from warehouse tables, relates them into a model, and defines measures — calculations like Total Sales that don't exist as a column anywhere upstream. That's a genuinely new kind of lineage edge, not just another hop in the same chain.

## S3 · STEPS — IMPORT VS DIRECTQUERY

How the model connects changes what current even means. Import copies data at refresh time — fast, but frozen as of that refresh. DirectQuery queries the warehouse live on every interaction — always current, but it inherits whatever freshness problem already exists upstream.

## S4 · CODE — MEASURE-TO-MEASURE LINEAGE

A warehouse column feeds a base measure, which feeds a second measure built on top of it, which feeds a visual. A single broken column can cascade through every measure built on it — lineage inside the model, distinct from lineage into it.

## S5 · OUTRO

Next lesson: a real product's lineage view — Power BI's own lineage diagram, screen by screen, with actual screenshots.
