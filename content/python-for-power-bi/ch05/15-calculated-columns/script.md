# Lesson 15 — Creating Calculated Columns · Voiceover script

Segments map 1:1 to slides. Target: 2-3 minutes — write for 340-380 words
at this voice's ~120 words/min pace.

---

## S1 · TITLE CARD

Chapter Five turns from cleaning existing data over to building
something genuinely new. Calculated columns are the first move here, and
they're honestly simpler than they sound at first.

## S2 · CODE: df["Profit"] = df["Revenue"] - df["Cost"]

Assign an expression to a column name that doesn't exist yet in the
DataFrame, and Pandas creates it for you automatically — the exact same
assignment syntax from Lesson 4, just applied here to a whole column of
values at once instead of a single variable. Pandas does the subtraction
row by row across the entire column automatically, with no manual loop
required from you at all.

## S3 · CODE: df["Profit Margin %"] = (df["Profit"] / df["Revenue"] * 100).round(1)

Calculated columns can reference other calculated columns too, including
one you literally just created a single line earlier in the same script.
Round to one decimal place right here — a small habit worth building
now, since it turns a messy forty one point six six six repeating into a
genuinely clean, readable forty one point seven.

## S4 · CODE: Power Query Custom Column -> DAX calculated column -> Pandas

You've actually built this exact same pattern twice already, in two
completely different tools. Power Query's custom column feature, a DAX
calculated column, and this Pandas approach — all three genuinely
compute a new value for every row, pulling from other columns in that
same row, just using different syntax at a different stage of the
pipeline.

## S5 · OUTRO CARD

One line creates a new column, referencing others as needed, computed
automatically for every single row in the table. Lesson 16 moves from
these per-row calculations to something meaningfully different:
collapsing many rows down into one summary value per group.
