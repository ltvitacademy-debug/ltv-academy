# Lesson 56 — Lakeflow vs. Traditional ADF Pipelines · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

If you've taken this track's Data Factory course, here's how the
two actually relate — Lakeflow versus traditional A-D-F pipelines.

## S2 · CODE CARD (two centers of gravity)

A-D-F's core unit is activities wired together visually, moving
data between systems. Lakeflow's core unit is a declarative
pipeline — transformation logic, in PySpark and SQL, with order
inferred from the code itself. Two genuinely different centers of
gravity, not competing versions of one tool.

## S3 · CODE CARD (combined pattern)

And it's a real, common pattern to use both together: A-D-F copies
data from a system Databricks can't reach directly — an on-prem
database, say — into a landing zone, then triggers a Lakeflow
pipeline task for the actual bronze to silver to gold
transformation.

## S4 · CODE CARD (when to reach for each)

Reach for A-D-F when you're moving data between many different
systems. Reach for Lakeflow when the real work is complex,
code-based transformation. And in a real organization using both,
the question usually isn't which one — it's which job each one is
actually doing.

## S5 · OUTRO CARD

Two tools, two real jobs, often working together. Next lesson: the
course recap, from storage to orchestrated pipelines.
