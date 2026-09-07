# Lesson 11 — NULLs & Missing Data · Voiceover script

Segments map 1:1 to slides. Target: 2-3 minutes — write for 340-380 words
at this voice's ~120 words/min pace.

---

## S1 · TITLE CARD

Missing data is one of the single most common problems in any real
dataset you'll ever load, and Pandas has one consistent way of marking
it, no matter what type of column it's sitting in.

## S2 · CODE: NaN — Pandas' marker for missing data

A missing value shows up as NaN, short for Not a Number, whether the
column actually holds text or numbers underneath. It's genuinely not the
same thing as an empty string, and it's not the same as a zero either —
it's Pandas' explicit, deliberate way of saying no value was ever
recorded here at all, as opposed to a value that happens to be blank or
nothing.

## S3 · CODE: df.isna() -> df.isna().sum()

isna returns true or false for every single cell in the DataFrame, true
landing exactly where a value is missing. Chain on dot sum instead of
just printing isna directly, and you get a per-column count of missing
values instead — a genuinely fast way to see how bad a real dataset's
gaps actually are, before you commit to deciding what to do about any of
them.

## S4 · CODE: df.fillna(0)

fillna replaces every missing value in a column with something you
choose deliberately. Filling with zero is common for revenue-style
columns specifically, but think carefully about whether that's actually
correct first — a missing revenue value might genuinely mean zero sales
happened, or it might mean we simply don't actually know what happened,
and those are two very different stories to tell in a report.

## S5 · CODE: df.dropna()

dropna removes any row that has at least one missing value anywhere in
it, entirely. Use dropna specifically when a missing value makes that
row genuinely unusable for your purposes. Use fillna instead when a
sensible, defensible default value actually exists. Neither one is
universally more correct than the other — the right choice always
depends on what that particular missing value actually means for that
specific column.

## S6 · OUTRO CARD

Find the gaps first with isna, then decide deliberately whether to fill
them or drop them entirely. Lesson 12 covers a closely related kind of
mess: rows that turn out to be exact duplicates of each other.
