# Lesson 6 — Introduction to Pandas · Voiceover script

Segments map 1:1 to slides. Target: 2-3 minutes — aim for 320-360 words at
this voice's ~120 words/min pace.

---

## S1 · TITLE CARD

Power BI can only import one specific shape of Python data. Pandas is the
library that produces exactly that shape, and it's genuinely the whole
reason this course exists in the first place.

## S2 · CODE: import pandas as pd

Pandas is a library — code someone already wrote, that you load instead
of writing yourself — built specifically for tabular, row-and-column
data. Every single script in this course that touches data starts with
this exact line, loading Pandas under the near-universal nickname p-d.

## S3 · CODE: data = {"Product": [...], "Units Sold": [...]}

Recall Lesson 5: a dictionary of lists is exactly the shape Pandas
expects. Each key becomes a column header. Each list becomes that
column's actual values. This dictionary-of-lists pattern is worth
recognizing on sight, because it's everywhere in real Pandas code.

## S4 · CODE: df = pd.DataFrame(data) -> print(df)

Hand that dictionary to p-d dot DataFrame, and it becomes a real,
table-shaped structure. Print it, and Pandas adds something the original
dictionary never had — numbered rows down the left side, starting at
zero. Lesson 7 covers exactly what that numbering is called and why it
matters.

## S5 · CODE: Reading files -> cleaning -> filtering -> grouping -> joining

Pandas is a genuinely large library — real data scientists spend entire
careers inside it. This course doesn't try to cover all of it. It's
scoped deliberately to the operations that show up constantly in real
Power BI work, in the exact order Lessons 8 through 17 will walk through
them.

## S6 · OUTRO CARD

One import line, one function, and a dictionary of lists becomes a real
table, ready to work with. Lesson 7 takes that same table apart piece by
piece and names every part of it properly, starting with the row labels
you already noticed down the left side.
