# Lesson 2 — Why Lineage Matters · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

Lineage isn't bookkeeping for its own sake. Beyond "it's good practice,"
this lesson covers four concrete business reasons organizations invest
in lineage, and what specifically breaks, in practical terms, when it
doesn't exist or isn't trusted.

## S2 · STEPS CARD (four reasons, part one — trust, impact analysis)

Trust first: when a number on a report looks wrong, the first question
is always where did this actually come from. Without lineage the honest
answer is often nobody fully knows — the report was built by someone
who left, against a pipeline nobody documented. Impact analysis second:
before changing a column name, a data type, or a transformation rule,
lineage tells you exactly what else depends on it — this column feeds
these six downstream tables and these three reports.

## S3 · STEPS CARD (four reasons, part two — root cause, audit)

Root cause analysis: when a number is wrong, lineage lets you walk
backward from the broken report to the exact hop where things diverged,
instead of re-checking every system from scratch — a missing row might
trace back to one filter added two transformations upstream. Audit and
regulation: financial services, healthcare, and insurance must
demonstrate exactly how a reported figure was calculated, from source to
final number, for audit purposes.

## S4 · STEPS CARD (mechanical vs. exploratory)

Picture a quarterly revenue number that drops unexpectedly. Without
lineage, three different people independently start checking three
different systems, duplicating effort, because nobody has a map of which
systems actually feed that number. The fix, once found, might be as
small as one incorrectly-joined table — but finding it took days instead
of minutes. With lineage in place, the team instead opens the record for
that figure, sees every hop, and checks each one in order — mechanical
instead of exploratory.

## S5 · STEPS CARD (identity to movement)

The Metadata Management course closed on giving every concept one
definition and one home, rather than scattering it across spreadsheets
that never agree. Lineage extends that idea from identity to movement —
once a concept has one definition and one home, lineage proves every
report pulling that concept is pulling it from that home, correctly,
through every hop in between, rather than silently drifting onto a stale
copy somewhere else.

## S6 · OUTRO CARD

Next up: business lineage versus technical lineage — the difference
between a readable summary built for stakeholders and the detailed map
engineers actually use to debug a broken column.
