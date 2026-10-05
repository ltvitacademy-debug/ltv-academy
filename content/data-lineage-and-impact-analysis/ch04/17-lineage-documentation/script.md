# Lesson 17 — Lineage Documentation · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

Chapter 3 assumed lineage was already traced and available to walk.
Lineage documentation is what makes that walk possible in the first
place — the recorded version of the dependency graph, instead of one
engineer's memory.

## S2 · STEPS CARD (three things to record)

Three things, for every dependency. Nodes — the datasets, fields, and
reports themselves, each with a stable name. Edges — which node feeds
which, and the transformation that happens at that hop. Ownership —
who's responsible for each side, so there's someone to contact.

## S3 · STEPS CARD (where it lives)

It typically lives in one of three places. A wiki page — easy to
write, but goes stale fast. A metadata repository or data catalog —
centralized and searchable. A dedicated lineage tool — can
auto-generate and stay current. Most organizations use more than one
at once.

## S4 · STEPS CARD (structure and rules, both)

Lesson 13 made the case that an arrow alone is only half the picture.
Documentation needs the structural graph and the transformation logic
behind each edge. Capturing only one or the other is incomplete in a
way that shows up the first time someone actually needs to use it.

## S5 · OUTRO CARD

Next lesson: lineage diagrams — the visual format most people actually
picture when they hear "lineage documentation," and the conventions
that make one readable instead of a tangle of boxes and lines.
