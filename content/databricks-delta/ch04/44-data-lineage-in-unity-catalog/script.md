# Lesson 44 — Data Lineage in Unity Catalog · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Now let's trace a table back to where it actually came from —
data lineage.

## S2 · CODE CARD (automatic lineage)

Lineage is automatic, not something you set up yourself.
Databricks builds it by observing every query Chapter 3's actual
pipeline already ran — the exact bronze to silver to gold
structure Lesson 25 described conceptually now shows up as a
real, clickable diagram, with zero extra setup.

## S3 · CODE CARD (column-level)

And column-level lineage goes further — specifically which
upstream columns fed daily revenue's total revenue column?
Straight back through Lesson 28's sum, to silver's fare amount,
and further back through Lesson 27's cast, to bronze's original
fare amount.

## S4 · CODE CARD (what breaks)

That answers a genuinely risky question safely: before dropping
or renaming a column, lineage shows every downstream table that
depends on it — check before you change it, instead of discovering
the breakage after a job starts failing.

## S5 · OUTRO CARD

And this only works because every layer transition ran through
Spark against governed tables — exactly how this course actually
built it. Next lesson: Unity Catalog volumes, governed file
storage, replacing DBFS.
