# Lesson 6 — Fabric Notebooks · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Let's get back to real PySpark — Fabric notebooks.

## S2 · CODE CARD (same shape)

Databricks Lesson 6 covered cells, a default language, magic
commands per cell. Fabric notebooks work exactly the same way.
What's different is attachment — instead of a cluster you
configured yourself, a Fabric notebook attaches to a lakehouse,
and Fabric provisions the Spark session automatically.

## S3 · CODE CARD (attaching)

Open a notebook, add lakehouse, choose the one from Lesson 4 — and
its tables and files show up directly in the sidebar, browsable,
with no code required at all.

## S4 · CODE CARD (magic commands)

Fabric's own magic commands are double-percent pyspark and
double-percent sql — the exact same idea as Databricks' single-
percent versions, just a slightly different syntax. And spark dot
read dot table resolves correctly because the notebook already
knows which lakehouse it's attached to.

## S5 · OUTRO CARD

Same cells, same DataFrame API, different attachment. Next
lesson: shortcuts, referencing data without copying it, in full.
