# Lesson 55 — Monitoring Pipeline Runs · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Where does all of this actually show up? Monitoring pipeline
runs.

## S2 · CODE CARD (graph view)

Every pipeline has a graph view — each table or view as a node,
with arrows for the exact same dependencies inferred back in
Lesson 50. It's Lesson 44's lineage idea, scoped specifically to
one pipeline's own live execution.

## S3 · CODE CARD (per-table metrics)

And per-table metrics show rows processed this run, plus
expectation pass and fail counts, right alongside each other —
Lesson 36's separate quality table and Lesson 11's separate run
history, now shown together, with nothing to query by hand.

## S4 · CODE CARD (event log)

The event log goes further — a real, queryable Delta table
recording every event across every run. That turns did something
break, and where, into a real SQL query, exactly like any other
table this course has worked with.

## S5 · OUTRO CARD

Graph view first, then per-table metrics, then the actual error
in the event log. Next lesson: Lakeflow versus traditional A-D-F
pipelines, comparing this to the Data Factory course.
