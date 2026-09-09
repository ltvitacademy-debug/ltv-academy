# Lesson 6 — Notebooks, Cells, and Languages

**Chapter 1 · Databricks Fundamentals · Lesson 6 of 57**

## What you'll learn

- A Databricks notebook: cells you run independently, in any order
- Multi-language notebooks — Python, SQL, Scala, and R, mixed in one file
- Magic commands: `%python`, `%sql`, `%md`, `%fs`
- Why cell order on the page isn't the same as execution order

## A notebook is a sequence of independently-runnable cells

A cell holds one chunk of code (or Markdown text), and you run it
on demand — not automatically, top to bottom, the way a plain
`.py` script executes. Each cell's output appears directly beneath
it, so you can see the result of one step before writing the next —
the exact "run a cell, check the output, adjust" workflow Lesson 5
described for all-purpose clusters.

## One notebook, multiple languages

```python
# Cell 1 (Python, the notebook's default language)
trips = spark.read.parquet("/data/nyc_taxi/yellow_tripdata_2024-01.parquet")
trips.createOrReplaceTempView("trips")
```

```sql
-- Cell 2 (SQL, via a magic command)
%sql
SELECT VendorID, COUNT(*) AS trip_count FROM trips GROUP BY VendorID
```

A notebook has one default language, but a magic command at the top
of any cell overrides it for that cell only. This is exactly Lesson
59 of Foundations' point about the DataFrame API and Spark SQL being
interchangeable — here it's made literal: Cell 1's Python DataFrame,
registered as a temp view (Foundations Lesson 58), is immediately
queryable from a SQL cell right below it, in the same notebook.

## The magic commands worth knowing now

| Magic command | What it does |
|---|---|
| `%python` | Run this cell as Python, regardless of the notebook's default |
| `%sql` | Run this cell as SQL |
| `%md` | Render this cell as formatted Markdown text, not code |
| `%fs` | Run a DBFS filesystem command (Lesson 8) |

`%md` cells are how a real notebook stays readable — narrating what
a section does, not just showing code with no context.

## Cell order on the page ≠ execution order

Cells run in whatever order **you** run them — clicking "Run" on
cell 5 before cell 2 executes cell 5 first, using whatever state
already exists. This is a real, common source of confusing bugs:
a notebook that looks correct top-to-bottom on the page can still
be broken if it was actually run out of order. **Run All** (running
every cell top-to-bottom, in page order) is the way to confirm a
notebook actually works as written, not just as it happened to run
during development.

## Key terms

| Term | Meaning |
|---|---|
| Cell | One independently-runnable chunk of code or Markdown |
| Magic command | `%sql`, `%md`, etc. — overrides a cell's language or rendering |
| Run All | Executes every cell top-to-bottom, confirming real page-order correctness |

## Check yourself

You're ready for Lesson 7 when you can explain, without looking: why
can a notebook that looks correct top-to-bottom still be broken if
its cells were run out of order?
