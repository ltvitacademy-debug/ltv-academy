# Lesson 12 — Upstream and Downstream Dependencies · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

Chapter 2 traced how data physically moves — through ETL and ELT, into
lakes and warehouses, through semantic models, and out to Power BI
dashboards. Chapter 3 is about the relationships that movement
creates: upstream and downstream dependencies, and why the direction
you walk a lineage graph changes the question you're actually
answering.

## S2 · STEPS CARD (upstream/downstream defined)

Every lineage arrow has a direction, and that direction is what the
rest of this chapter depends on. Upstream of a dataset is everything
that feeds it — sources, transformations, systems data passed through.
Downstream is everything that consumes it — reports, models, other
tables built on top. These terms are relative, not absolute: a staging
table is downstream of a source and upstream of a fact table, at the
same time — upstream and downstream only make sense once you've fixed
a reference point.

## S3 · CODE CARD (dependency chain)

Here's a simple chain: SourceTable, to StagingView, to FactTable, to
Report. Reading left to right is reading downstream — SourceTable is
upstream of everything after it. Reading right to left is reading
upstream — to understand what feeds the Report, you walk the arrows
backward, hop by hop.

## S4 · STEPS CARD (graph, not chain)

Real systems rarely form a single straight line. A FactTable usually
has multiple upstream StagingViews feeding it, and one StagingView
often feeds multiple downstream FactTables and Reports. That's why
lineage is drawn as a graph, not a list — a dataset can have many
upstream dependencies and many downstream dependents at once, and
Lesson 14's impact analysis has to account for all of them, not just
the most obvious path.

## S5 · STEPS CARD (why direction matters)

You'll walk this exact chain in both directions this chapter, for two
different purposes. Walking downstream, in Lessons 14 and 15: a change
is proposed upstream — what breaks? Walking upstream, in Lesson 16:
something's already wrong downstream — where did it start? Confusing
the two is a common, costly mistake — asking what feeds a report when
you need what it feeds gets you looking at the wrong half of the graph
entirely.

## S6 · OUTRO CARD

Next lesson: transformations and business rules. The arrows in this
chain aren't just "connects to" — they carry real logic: filters,
joins, calculations, mappings. Documenting that a connection exists
without documenting what it does leaves half the picture missing, and
that gap is exactly what Lesson 13 closes.
