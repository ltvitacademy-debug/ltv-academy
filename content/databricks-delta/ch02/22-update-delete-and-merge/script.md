# Lesson 22 — UPDATE, DELETE, and MERGE · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Now for the operations that generate all this history — update,
delete, and merge.

## S2 · CODE CARD (UPDATE/DELETE)

Update and delete give you real, row-level changes — something
plain Parquet has no safe way to do. Delta can, because these are
just more commits: new files for the changed rows, and remove
actions for the old ones, the exact same mechanism from Lesson 17,
now doing real work.

## S3 · CODE CARD (MERGE INTO)

Merge into solves a genuinely common problem: a daily file where
some rows correct existing trips, and some are brand new. When
matched updates the existing row, when not matched inserts the new
one — both handled in one atomic statement.

## S4 · CODE CARD (DataFrame API)

This is the classic upsert pattern, and it's exactly what this
course's Chapter 3 relies on for building a silver layer out of
bronze. Doing it with separate update and insert statements would
mean finding the matches yourself, with no atomicity across the
two.

## S5 · OUTRO CARD

And from Python, delta dot tables gives you a Delta table object
for the exact same merge — genuinely new, since Foundations never
wrote to Delta at all. Next lesson: optimize and file compaction,
cleaning up after a lot of small writes.
