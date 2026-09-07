# Lesson 17 — Joining Data with Pandas · Voiceover script

Segments map 1:1 to slides. Target: 2-3 minutes — write for 340-380 words
at this voice's ~120 words/min pace.

---

## S1 · TITLE CARD

Real data almost never lives in just one table. This lesson closes out
Chapter Five with the last genuinely major operation this course needs:
combining two separate tables into one.

## S2 · CODE: pd.merge(sales, products, on="Product", how="left")

Merge combines two DataFrames together using a column they both share —
exactly the relationship concept the main Power BI course spent an
entire chapter covering, just written here in Python instead of a
drag-and-drop line inside model view. The on parameter, set to Product,
tells Pandas specifically which column both tables actually have in
common.

## S3 · CODE: pd.merge() = SQL JOIN

If you've already written T-SQL against AdventureWorks or Northwind in
the parallel course, this is genuinely the exact same operation wearing
different clothes. Pandas merge is precisely what SQL calls JOIN — same
underlying relationship, same resulting data, just completely different
syntax to express it.

## S4 · CODE: how="left" -> keep every row | how="inner" -> only matches

The how argument controls specifically what happens to rows that don't
find a match on the other side. Left keeps every single row from the
first table regardless of whether it matched anything. Inner keeps only
the rows that actually found a match in both tables. Left is the safer
default choice when you want to keep every sales row even if a
product's category happens to be missing; inner is the right call when a
missing match genuinely means that row shouldn't be included at all.

## S5 · OUTRO CARD

That closes Chapter Five entirely — calculated columns, grouping, and
now joining, three genuinely core operations you'll use constantly.
Chapter Six turns to using Python directly inside Power BI itself,
starting with Power Query.
