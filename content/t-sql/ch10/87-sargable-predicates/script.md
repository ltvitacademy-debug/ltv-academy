# Lesson 87 — SARGable vs. Non-SARGable WHERE Clauses · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Here's a word that sounds intimidating but describes something simple:
SARGable, short for search-argument-able. It just means a WHERE
condition that SQL Server can actually use an index to satisfy, instead
of checking every single row one by one.

## S2 · CODE CARD (non-SARGable example)

Where the YEAR of sell start date equals 2013. Even if sell start date
has a perfectly good index, wrapping it in this YEAR function forces
SQL Server to compute that function for every single row before it can
compare against 2013. The index stores actual dates, not
year-extracted numbers, so it becomes completely useless here.

## S3 · CODE CARD (the SARGable rewrite)

Here's the fix, asking the exact same logical question: was this in
2013? Sell start date greater than or equal to January first, 2013, and
less than January first, 2014. Same answer, but now the column itself
is completely untouched in the comparison — which means SQL Server CAN
use an index on it to jump straight to the matching range, instead of
scanning everything.

## S4 · STEPS CARD (transform the value, not the column)

And that's the common thread across every non-SARGable pattern:
anything that transforms the COLUMN itself before comparing — a
function call, a leading wildcard in a LIKE pattern — blocks the index.
Transform the comparison VALUE instead, like we just did with the date
range, and the column stays SARGable.

## S5 · OUTRO CARD

On a small table, this barely matters — a full scan of 500 rows is
instant either way. On a table with millions of rows, that exact same
wrapped column can turn a sub-second query into one that takes minutes.
Next lesson: clustered versus nonclustered indexes, and choosing wisely
between them. See you there.
