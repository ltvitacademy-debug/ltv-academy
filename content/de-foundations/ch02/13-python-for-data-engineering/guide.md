# Lesson 13 — Python for Data Engineering

**Chapter 2 · Python for Data Engineers · Lesson 13 of 62**

## What you'll learn

- Why Python specifically, out of every programming language, became
  data engineering's default
- The four places Python actually shows up in a real data engineering
  job
- What this 15-lesson chapter will and won't try to teach you
- The tools you'll use: Python itself, a code editor, and `pip`

## Why Python, specifically

Data engineering could theoretically be done in almost any language —
but Python won for a few concrete reasons that compound on each other:
it's readable enough that a data engineer, a data scientist, and an
analyst can all read the same script; it has a genuinely enormous
library ecosystem for exactly this kind of work (Lesson 21's Pandas,
Chapter 4's PySpark); and — this is the big one — **Spark itself exposes
a first-class Python API**. You're not learning Python *and then
separately* learning a Spark-specific language; PySpark, which this
course spends 24 lessons on, **is** Python.

## Four places Python actually shows up

1. **ETL scripts** — reading a file, cleaning it, writing it somewhere
   else (Lessons 22–27 build toward exactly this)
2. **Talking to APIs** — pulling data out of a REST API that has no
   other export option (Lesson 23)
3. **Orchestration glue code** — the custom logic inside a Data Factory
   activity, a Databricks notebook cell, or an Airflow task
4. **PySpark itself** — every DataFrame operation in Chapter 4 is
   Python code calling into Spark's engine

## What this chapter will and won't teach

This is **not** a general-purpose "learn to program" course — it's
deliberately scoped to exactly the Python a data engineer actually uses.
Fourteen more lessons cover: variables and types, lists and
dictionaries, control flow (conditions, loops), functions, error
handling, working with files, Pandas DataFrames, reading CSV/JSON,
talking to REST APIs, processing JSON, connecting to SQL, cleaning
data — ending in Lesson 27, where you build one real, small ETL script
combining everything. Software-engineering topics like classes, testing
frameworks, and packaging are deliberately out of scope; this chapter
gets you to *fluent enough* for the Spark and PySpark chapters that
follow, not to professional software development.

## Your tools

- **Python itself** — version 3.10 or later is fine for everything in
  this course
- **A code editor** — Visual Studio Code is the industry-standard
  choice, free, and what every code screenshot in this chapter uses
- **`pip`** — Python's package installer, how you'll get `pandas` and
  `requests` (Lessons 21 and 23) onto your machine

## A preview of where this is going

```python
# This is roughly what Lesson 27's mini ETL script looks like —
# don't worry about understanding all of it yet
import pandas as pd

df = pd.read_csv("yellow_tripdata_2024-01.csv")
df = df[df["fare_amount"] > 0]          # Lesson 16: conditions
df.to_parquet("cleansed/yellow_tripdata_2024-01.parquet")
```

Every piece of that — the import, the function call, the filter, the
write — gets its own lesson before you see this exact pattern again in
Lesson 27.

## Key terms

| Term | Meaning |
|---|---|
| ETL script | Code that reads, transforms, and writes data |
| pip | Python's package installer |
| PySpark | Spark's Python API — Python code that runs on Spark's engine |

## Lab

Install Python 3.10+ and Visual Studio Code if you haven't already,
then open a terminal and run:

```bash
python --version
pip --version
```

Confirm both commands return a version number before Lesson 14.

## Check yourself

You're ready for Lesson 14 when you can name, without looking, the four
places Python shows up in real data engineering work, and explain why
PySpark isn't "a separate language to learn."
