# Lesson 44 — select() · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Now let's choose exactly the columns we actually want — select.

## S2 · CODE CARD (select)

Select on a DataFrame returns a new DataFrame with only the columns
you name. This is the PySpark version of Lesson 24's Pandas
double-bracket selection — same idea, different syntax. And since
the source here is Parquet, this genuinely reads less off disk than
pulling every column would.

## S3 · CODE CARD (three ways)

There are three ways to reference the same column: a plain string,
dot notation, or the col function. All three give the same result
here — but col becomes necessary the moment you want to actually do
something to a column, which later lessons rely on constantly.

## S4 · CODE CARD (alias)

Case in point: alias, for renaming a column. It only works on a
col-style reference, not a plain string — one more reason to get
comfortable with col now.

## S5 · OUTRO CARD

Select for the columns you want, col for anything more. Next
lesson: filter and where, keeping only the rows you actually want.
