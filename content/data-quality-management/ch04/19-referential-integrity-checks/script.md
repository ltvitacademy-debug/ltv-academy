# Lesson 19 — Referential Integrity Checks · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

A specific, high-value check pattern: does every row that points to
another row actually point at something real?

## S2 · SCREENSHOT — Object Explorer

Table relationships live right here, in the same Object Explorer tree
you already use to connect and query — Tables, and the Database
Diagrams node that visualizes how they connect.

## S3 · STEPS — Referential integrity, defined

An order with a customer ID is only valid if that customer actually
exists. If it doesn't, that's an orphaned row. It's closely related to
consistency, but specific enough to earn its own lesson — it's always
about a key relationship, and the question is always the same: does
the thing this row points to still exist?

## S4 · CODE — Finding orphans with LEFT JOIN

The standard pattern. Left join the child to the parent on the foreign
key, then keep only the rows where that join came back empty. Read it
right to left: start from every order, try to find its customer, keep
the ones that came up with nothing.

## S5 · SCREENSHOT — Run it

Same Execute step as always — nothing changes about how you run a
referential integrity check versus any other check.

## S6 · CODE — Checking multiple relationships at once

Real schemas have dozens of foreign key relationships. Combine them
with the same UNION ALL failures-report pattern from last lesson, and
one run surfaces every orphaned row across every relationship you
care about.

## S7 · SCREENSHOT — Reading orphan results

The output lands exactly like any other check result — one row per
orphan, labeled by which relationship broke.

## S8 · STEPS — Why this happens even with a constraint

Three real reasons: no constraint was ever defined, often on purpose
for load performance. A parent got deleted without cascading. Or the
two tables live in different databases entirely — a foreign key
constraint can't reach across that boundary at all.

## S9 · OUTRO

Referential integrity is one relationship at a time. Next up:
cross-system reconciliation — the same idea, scaled up to entire
tables and entire systems.
