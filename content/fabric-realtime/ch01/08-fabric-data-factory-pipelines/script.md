# Lesson 8 — Fabric Data Factory — Pipelines · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Now let's move data without writing a line of code — Fabric Data
Factory pipelines.

## S2 · CODE CARD (activities visually)

A Fabric pipeline is activities wired together on a visual
canvas — the exact same orchestration shape as Azure Data Factory,
covered in depth in this track's separate Data Factory course.
Nothing new invented, just running inside Fabric's own workspace.

## S3 · STEPS CARD (copy activity)

New pipeline, add a copy data activity, configure a source,
configure a destination — this course's lakehouse — and run it.
The copy activity moves bytes, with no PySpark or SQL written at
all.

## S4 · CODE CARD (chaining notebook)

And a notebook activity chains right after it — the copy activity
lands the file, the notebook activity does the real
transformation. The exact same idea as Databricks Lesson 54's
pipeline task chained after a notebook task, just the two swapped
in order and name.

## S5 · OUTRO CARD

Movement, then transformation, scheduled on a trigger — the same
underlying idea as a Databricks job schedule. Next lesson:
Dataflows Gen2, a different way to shape data, visually.
