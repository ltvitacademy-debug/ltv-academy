# Lesson 9 — Relationship and Pattern Profiling · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Lesson 8 profiled a single table in isolation. But a column can look perfectly healthy alone while the relationship it depends on is actually broken. Today we go across tables, and into the shape of values within one.

## S2 · SCREENSHOT — Object Explorer server tree

Relationship profiling means writing queries that reach across more than one database object at once — here's the broader server tree in Object Explorer: every database, every server-level object you could query against.

## S3 · SCREENSHOT — Database selector

And this toolbar dropdown is what actually determines which database your query runs against — relevant any time a relationship check needs to reach into a specific, non-default database.

## S4 · SCREENSHOT — Connect dialog

Connecting to the right server in the first place is where any of this starts — and recent connections often point straight at the sample databases, like AdventureWorks, this course's examples are built around.

## S5 · CODE — Finding orphaned rows

A foreign key relationship is intact when every value in the child table actually exists in the parent. The standard check is a LEFT JOIN from child to parent, filtered to rows where the parent side came back NULL. In a database with a properly enforced constraint, this should always return zero rows.

## S6 · CODE — Counting orphans

Wrap that same logic in a COUNT for a quick summary instead of a row-by-row list — exactly the number you'd report to a data steward as a referential integrity finding.

## S7 · CODE — Pattern profiling with LIKE

Pattern profiling checks the shape of values within one column. A LIKE pattern like percent underscore at-sign percent dot percent checks for "something, an at sign, something, a dot, something" — not a full email spec, just a fast read on how much of the column plausibly matches the shape you expect.

## S8 · CODE — Summarizing the pattern check

Turn that row-by-row check into a count the same way we summarized orphans. A result like 9,812 looking valid against 188 not matching tells you the scale of the problem immediately — and whether it's worth an automated rule going forward.

## S9 · OUTRO

Orphaned rows and pattern mismatches — two things column profiling alone would never catch. Next up: Lesson 10 pulls together everything Chapter 2 has produced and asks what you actually do with it.
