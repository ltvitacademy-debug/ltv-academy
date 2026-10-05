# Lesson 12 — Upstream and Downstream Dependencies · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

Chapter 2 traced how data physically moves. Chapter 3 is about the
relationships that movement creates — specifically, upstream and
downstream dependencies, and why the direction you walk the graph
changes the question you're actually answering.

## S2 · STEPS CARD (upstream/downstream defined)

Upstream of a dataset is everything that feeds it — sources,
transformations, systems data passed through. Downstream is everything
that consumes it — reports, models, other tables built on top. These
terms are relative, not absolute: a staging table is downstream of a
source and upstream of a fact table, at the same time.

## S3 · CODE CARD (dependency chain)

Here's a simple chain: SourceTable, to StagingView, to FactTable, to
Report. Reading left to right is reading downstream. Reading right to
left is reading upstream — to understand what feeds the report, you
walk the arrows backward.

## S4 · STEPS CARD (why direction matters)

You'll walk this exact chain both directions in this chapter. Walking
downstream, in Lessons 14 and 15: a change is proposed upstream — what
breaks? Walking upstream, in Lesson 16: something's already wrong
downstream — where did it start? Confusing the two gets you looking at
the wrong half of the graph entirely.

## S5 · OUTRO CARD

Next lesson: transformations and business rules — because the arrows
in that chain aren't just "connects to," they carry real logic, and
documenting the connection without the logic leaves half the picture
missing.
