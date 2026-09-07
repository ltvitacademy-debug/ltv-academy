# Lesson 9 — Selecting & Filtering Data · Voiceover script

Segments map 1:1 to slides. Target: 2-3 minutes — write for 320-360 words
at this voice's ~120 words/min pace. Earlier drafts of this script kept
landing at 175-230 words and coming in under 2 minutes; write generously.

---

## S1 · TITLE CARD

Chapter Four starts with the two moves you'll genuinely use in nearly
every real cleaning script you ever write: selecting exactly the columns
you want, and filtering down to only the rows that actually matter.

## S2 · CODE: df[["Product", "Revenue"]]

Lesson 7 pulled one column out with single brackets, using
df bracket-quote-Revenue. Selecting several columns at once uses a list
instead — double brackets total, where the outer pair means select
columns from this DataFrame, and the inner pair is the actual Python
list of column names you want back.

## S3 · CODE: df[df["Revenue"] > 1500]

Filtering uses that exact same bracket syntax, but with a condition
written inside instead of column names. Pandas checks that condition
against every single row in the DataFrame, one at a time, and keeps only
the rows where the condition comes back true. This is the precise Pandas
equivalent of clicking a column's filter arrow inside Power Query and
typing in a condition like greater than fifteen hundred — same end
result, just written as code instead of clicked through a dialog box.

## S4 · CODE: (df["Region"] == "West") & (df["Units Sold"] > 100)

Combining multiple conditions uses the ampersand symbol for and, or the
pipe character for or — never Python's regular and and or keywords,
which don't actually work here. Each individual condition needs its own
set of parentheses around it. This genuinely trips people up the first
few times, because Pandas is evaluating the comparison row by row across
the whole column, not as one single combined true or false value the
way regular Python expects.

## S5 · OUTRO CARD

Select columns with a list in double brackets, filter rows with a
condition in single brackets, and combine multiple conditions with
ampersand and pipe. Lesson 10 turns to a different kind of mess
entirely: cleaning up text data that arrives inconsistently capitalized
or padded with extra invisible spaces.
