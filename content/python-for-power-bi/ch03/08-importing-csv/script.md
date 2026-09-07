# Lesson 8 — Importing CSV Data with Python · Voiceover script

Segments map 1:1 to slides. Target: 2-3 minutes — aim for 320-360 words at
this voice's ~120 words/min pace.

---

## S1 · TITLE CARD

Every DataFrame so far in this course was built by hand, from a
dictionary. Real work almost never starts that way — it starts with an
actual file, and one function handles the entire thing.

## S2 · CODE: df = pd.read_csv("sales_sample.csv")

Read csv underscore csv turns a file straight into a DataFrame in one
line. Pandas reads the header row as column names automatically, and
figures out each column's type from the actual values — the same dtypes
check from Lesson 7.

## S3 · CODE: df.shape -> df.head(2)

Before trusting a freshly loaded file, check its shape and peek at the
first few rows with dot head. If the row count looks wrong, or a column
that should be numbers shows up as object instead, that's your signal to
stop and investigate right there — not after you've already built
measures and visuals on top of bad data.

## S4 · IMAGE: python-scripts-1.png

The exact same script runs inside Power BI itself. Home ribbon, Get Data,
Other, Python script — sitting right next to R script in that same
category.

## S5 · IMAGE: python-scripts-6.png

Paste your script in — including the import pandas line — exactly as you
already tested it on your own machine. Nothing gets rewritten for Power
BI specifically.

## S6 · IMAGE: python-scripts-5.png

If it runs without error, the Navigator lists every DataFrame your script
created, ready to load. Select it, and Power BI imports it exactly like
any other data source, ready for relationships and DAX.

## S7 · OUTRO CARD

That closes Chapter Three — DataFrames, from a dictionary you built by
hand, to a real file on disk, all the way into Power BI itself. Chapter
Four turns to actually cleaning that data: selecting specific columns and
filtering down to the rows that matter.
