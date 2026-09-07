# Lesson 12 — Removing Duplicate Data · Voiceover script

Segments map 1:1 to slides. Target: 2-3 minutes — write for 340-380 words
at this voice's ~120 words/min pace.

---

## S1 · TITLE CARD

A duplicate row doesn't just look untidy sitting in a table — it
silently inflates every single total built on top of it, which makes
catching these before Power BI ever sees them genuinely important, not
just cosmetic.

## S2 · CODE: df.duplicated()

Duplicated returns true or false for every row in the DataFrame, true
landing exactly where a row is an exact repeat of an earlier one further
up. Notice carefully that the very first occurrence of a repeated row is
never flagged as true — only the repeats that come after it, later in
the table, get marked.

## S3 · CODE: df.drop_duplicates()

Drop duplicates removes every single row that duplicated would have
flagged as true, keeping only the first occurrence of each one and
discarding the rest entirely. Same underlying logic as the check before
it, but this time it actually changes the data itself instead of just
reporting on where the problem is.

## S4 · CODE: df.drop_duplicates(subset=["Product"])

By default, both of these methods compare the entire row, every single
column, to decide what counts as a duplicate. Pass a subset of column
names instead, and the check narrows down to just those specific
columns — genuinely useful when two rows sharing the same product should
count as duplicates in your mind, even if something else about them,
like the exact revenue figure, actually differs slightly between them.

## S5 · OUTRO CARD

Check first with duplicated before changing anything, remove
deliberately with drop duplicates once you're sure, and narrow the check
with subset whenever a whole-row match genuinely isn't what you actually
mean by duplicate. Lesson 13 moves to a different kind of data problem
entirely: columns that load as the wrong type from the very start.
