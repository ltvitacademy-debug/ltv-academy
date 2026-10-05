# Lesson 17 — Lineage in Unity Catalog · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Once you can find a table, the next real question is where its data actually came from — and everywhere it flows downstream.

## S2 · STEPS — Captured automatically

Unity Catalog captures lineage automatically, down to the column level, for every query that runs through Spark or Databricks SQL — no manual diagramming required. It covers impact analysis before a change, root-cause tracing when a report looks wrong, and tracking exactly where regulated data flows for a compliance audit.

## S3 · SCREENSHOT — The lineage graph

This is the real graph in Catalog Explorer. Every upstream and downstream object for the selected table, built with zero manual setup — one level shown by default, with a plus icon to expand further.

## S4 · SCREENSHOT — The details panel

Click an edge instead of a node, and a details panel opens naming exactly what produced that specific connection — which notebook, job, or query — and what consumes it downstream.

## S5 · SCREENSHOT — Column-level lineage

For a wide table, the more useful question is narrower than "what's connected." Clicking one column highlights only the columns that actually fed it — not every column in every upstream table, just the real path.

## S6 · CODE — Querying lineage as SQL

Everything the graph shows is also plain SQL, through system access table lineage and column lineage. That turns "what depends on this SSN column" from a one-time click-through into a repeatable, scheduled compliance query.

## S7 · OUTRO

Next lesson: system tables and auditing — the broader family of tables that lineage, billing, and every other operational signal in your account actually live in.
