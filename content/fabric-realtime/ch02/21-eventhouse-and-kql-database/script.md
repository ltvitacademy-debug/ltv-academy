# Lesson 21 — Eventhouse and KQL Database · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Now let's give these events a real home — Eventhouse and KQL
Database.

## S2 · CODE CARD (Eventhouse)

An Eventhouse holds one or more KQL databases — the same
containing relationship a workspace has to its items, just scoped
to real-time data. New item, Eventhouse, name it — the same shape
as every other item so far.

## S3 · CODE CARD (why optimized differently)

And it's genuinely optimized differently from a Delta table. Delta
is built around versioned, transactional writes. A KQL database is
built for extreme ingestion rates, queryable within seconds —
neither one is better, they solve different problems, exactly like
last chapter's lakehouse versus warehouse decision.

## S4 · CODE CARD (connecting a destination)

And this is the real connection point back to Lesson 19 — an
eventstream's eventhouse destination actually targets one specific
KQL database and table. Events flow from a source, through
transformations, and land here as real, queryable rows.

## S5 · OUTRO CARD

A container, a real storage engine, purpose-built for streaming.
Next lesson: what is KQL, the language that actually queries it.
