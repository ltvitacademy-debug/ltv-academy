# Lesson 8 — CSV vs. JSON vs. Parquet vs. Delta · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Four file formats you'll read and write constantly in this course. The
real question isn't which one is best — it's which tradeoffs actually
matter for what you're doing.

## S2 · CODE CARD (CSV)

CSV: every row is a full line of plain text. Simple to read, simple to
write. But there's no schema, no compression, and no way to read just
one column without reading every character of every row.

## S3 · CODE CARD (JSON)

JSON adds real structure — objects can nest inside other objects,
arrays inside arrays, genuinely hierarchical data CSV simply can't
express. Still text though. Still row by row. Still no built-in
compression.

## S4 · STEPS CARD (Parquet)

Parquet flips the entire layout. Instead of row by row, it stores
column by column, compressed, with the schema built right in. That
single change unlocks two things row-based formats structurally cannot
do: column pruning, skipping columns a query doesn't even need, and
predicate pushdown, skipping whole chunks of data a filter couldn't
possibly match, using statistics stored right in the file.

## S5 · CODE CARD (Delta)

And Delta takes Parquet one step further. It's still Parquet files
underneath — but alongside them sits a transaction log, tracking every
change ever made. That log is what makes ACID transactions and time
travel possible — genuinely useful, and the entire subject of this
track's Databricks course.

## S6 · OUTRO CARD

CSV for quick exports, JSON for nested data, Parquet for anything
analytics-heavy from Chapter 3 onward, Delta when you need
transactional safety on top. Next lesson: partitioning — organizing
files on disk so queries skip most of them entirely. See you there.
