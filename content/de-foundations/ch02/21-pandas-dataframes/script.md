# Lesson 21 — Pandas DataFrames · Voiceover script

Segments map 1:1 to slides. Target: ~2 minutes total.

---

## S1 · TITLE CARD

Everything in Lesson 20 — opening files, looping, splitting text by
hand — Pandas replaces with something dramatically better. Today, the
structure everything else in this chapter builds toward: the
DataFrame.

## S2 · CODE CARD (import)

This one line starts almost every data engineering script in
existence, including yours from here forward. P-D is the
near-universal nickname.

## S3 · CODE CARD (list of dicts to DataFrame)

Remember Lesson 15's list of trip dictionaries? Pandas turns that
directly into a real table. Rows, columns, an automatic numbered
index, and real per-column types — all inferred automatically from
the data you handed it.

## S4 · CODE CARD (first four things)

Four things to run on almost any DataFrame before doing anything else.
Head, for the first five rows. Columns, for the names. D-types, for
each column's actual type. And length, for the row count. A quick,
honest look at what you're really working with.

## S5 · OUTRO CARD

One structure, built directly from the list of dictionaries you
already understand. Next lesson: reading a real CSV file — one line,
instead of Lesson 20's manual loop. See you there.
