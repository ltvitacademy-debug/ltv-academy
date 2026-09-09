# Lesson 20 — Schema Evolution · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Sometimes a schema genuinely needs to change — schema evolution.

## S2 · CODE CARD (mergeSchema)

Merge schema true tells Delta: I mean it, widen the table's schema
to include this new column, instead of treating it as an error.
Existing rows get the new column filled with null, since they
genuinely have no value for it.

## S3 · CODE CARD (what it still refuses)

But it only allows additive changes — a genuinely new column. It
still refuses a lossy type change, like a double column suddenly
getting string values. That's still a real error, on purpose.
Schema evolution grows a schema safely — it doesn't disable
enforcement.

## S4 · CODE CARD (ALTER TABLE)

Alter table add column is the explicit SQL alternative — a
deliberate, planned change, done as its own step, independent of
any particular write. Real production pipelines often prefer this:
a reviewed migration, not a side effect of some job's merge schema
flag.

## S5 · OUTRO CARD

Additive changes only, and prefer an explicit migration when you
can. Next lesson: time travel, querying historical versions of a
table.
