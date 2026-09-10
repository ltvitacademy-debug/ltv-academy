# Lesson 5 — Fabric Lakehouse vs. Databricks Lakehouse · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Two products share the same name — let's untangle that. Fabric
lakehouse versus Databricks lakehouse.

## S2 · CODE CARD (same word, two products)

Lakehouse is both a generic architecture idea and, in Fabric
specifically, the literal name of the item you created last
lesson. Two vendors converged on the same underlying idea, and
largely the same file format.

## S3 · CODE CARD (identical underneath)

And that file format really is identical underneath — Fabric's
load to tables and Databricks' write dot format delta both produce
Parquet files plus a delta log folder. The exact same transaction
log Databricks Lesson 17 opened up directly.

## S4 · STEPS CARD (what's different)

What's genuinely different is compute — Databricks configures
clusters, Fabric only assigns a capacity. Governance — Unity
Catalog versus workspace roles. And the engines each one leans on.

## S5 · OUTRO CARD

Same format underneath, different platform around it — which
means a Databricks cluster can genuinely read a table Fabric
wrote. Next lesson: Fabric notebooks, back to real PySpark, in
Fabric's own UI.
