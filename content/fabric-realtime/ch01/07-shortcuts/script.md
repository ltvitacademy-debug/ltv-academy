# Lesson 7 — Shortcuts · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Let's build the thing previewed back in Lesson 3, for real —
shortcuts.

## S2 · STEPS CARD (creating one)

In a second lakehouse, new shortcut, Microsoft OneLake, browse to
the first lakehouse, select trips, create. It now appears in the
second lakehouse too, marked with a link icon — not a copy, the
exact same underlying files.

## S3 · CODE CARD (internal vs external)

An internal shortcut points to another OneLake location — another
lakehouse or workspace. An external shortcut points outside
Fabric entirely — an existing ADLS Gen2 container, an S3 bucket —
read in place, with nothing physically moved.

## S4 · CODE CARD (parallel to external tables)

And every PySpark method works on it exactly like the original —
the query engine just resolves to wherever the real bytes live.
This is almost exactly Databricks Lesson 41's external table — a
reference to data whose lifecycle lives elsewhere, just with
OneLake's much broader reach.

## S5 · OUTRO CARD

A real table to every query, nothing duplicated. Next lesson:
Fabric Data Factory, moving data, visually.
