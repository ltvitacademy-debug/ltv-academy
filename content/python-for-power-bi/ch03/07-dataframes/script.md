# Lesson 7 — Understanding DataFrames · Voiceover script

Segments map 1:1 to slides. Target: 2-3 minutes — aim for 320-360 words at
this voice's ~120 words/min pace.

---

## S1 · TITLE CARD

Every DataFrame you'll ever build or import has exactly four parts, and
once you can name all four from memory, DataFrames stop feeling
mysterious and start feeling like something you actually understand.

## S2 · CODE: Rows -> Columns -> Index -> Values

Rows are records — one product, one customer, one transaction. Columns
are named fields, shared across every row. The index is the row labels
down the left, numbered by default starting at zero. And values are just
the actual data sitting at each intersection.

## S3 · CODE: col = df["Revenue"] -> Series

Pull a single column out with square brackets, and it stops being a
DataFrame — it becomes a Series, Pandas' name for one labeled column on
its own. A DataFrame is really just several Series lined up side by side,
sharing the same index.

## S4 · CODE: The index is NOT a column

Here's what trips people up: those zero, one, two labels down the left
are not a column. They don't count toward your column total, and by
default they're just row position, not meaningful data — though later
lessons will replace them with something that actually means something.

## S5 · CODE: df.shape -> df.columns -> df.dtypes

Three quick checks before touching a real dataset. Shape gives you row
and column counts. Columns lists every column name. And dtypes shows each
column's actual data type — which matters enormously once Lesson 13
covers what happens when that type is wrong.

## S6 · OUTRO CARD

Rows, columns, index, values, and a Series as one column pulled out —
that's the complete anatomy. Lesson 8 finally brings in real data,
importing an actual CSV file with Python for the first time in this
course.
