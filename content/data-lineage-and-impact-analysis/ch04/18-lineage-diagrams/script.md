# Lesson 18 — Lineage Diagrams · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

Lineage diagrams vary in polish across tools, but almost all of them
follow the same basic visual grammar. A diagram is a view into
Lesson 17's documentation, not a separate source of truth.

## S2 · STEPS CARD (conventions)

Three conventions. Boxes represent datasets — one box per node. Arrows
represent direction of flow, always upstream to downstream. Labels on
arrows represent the transformation or rule at that hop — where
Lesson 13's business logic becomes visible instead of hidden.

## S3 · CODE CARD (the chain as a diagram)

This chapter's chain, as an actual diagram: four boxes in a row,
three arrows, each pointing right. If a hop applies a specific
business rule — say, the Discount logic from Lesson 13 — that rule
gets written right on the arrow, not buried in a separate document.

## S4 · STEPS CARD (match detail to audience)

Not every diagram should show everything. An executive sign-off
meeting needs a handful of major systems, no column detail. An
engineer making the change needs every table and column affected.
One diagram rarely serves both well.

## S5 · OUTRO CARD

Next lesson: automated versus manual lineage — how diagrams and
documentation like this actually get built and kept current, and the
real trade-offs between doing it by hand and letting a tool do it.
