# Lesson 26 — Cleaning Data With Python · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Real data always needs cleaning. Pandas has purpose-built tools for
exactly the messiness you'll actually run into.

## S2 · CODE CARD (missing values)

Is N-A marks which values are missing. Fill N-A replaces them with a
default. Drop N-A removes the whole row instead. Which one's correct
depends entirely on the business rule — a missing passenger count
might mean drop the row; a missing tip might genuinely mean zero.

## S3 · CODE CARD (duplicates/filtering)

Drop duplicates removes exact repeats — common when combining
sources, or re-processing a file twice by accident. And boolean
filtering applies Lesson 16's conditions to an entire column at once.
Just remember: use the ampersand and pipe symbols here, not Python's
own AND and OR — those don't work correctly on DataFrames.

## S4 · CODE CARD (astype)

And sometimes a type needs fixing after the file's already loaded,
not just at read time. As type converts an existing column directly,
whenever you need it.

## S5 · OUTRO CARD

Missing values handled, duplicates gone, invalid rows filtered, types
correct. Next lesson: building a simple Python ETL process — every
lesson in this chapter, combined into one real script. See you
there.
