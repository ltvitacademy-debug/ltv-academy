# Lesson 10 — Designing a Data Lake

**Chapter 1 · Azure Data Lake & Storage · Lesson 10 of 62**

## What you'll learn

- How Lessons 1–9 combine into one real, practical design
- The five decisions every data lake design actually comes down to
- A complete, real path for this course's NYC Taxi data, start to finish

## Everything so far, in one path

Here's a single real path, using every decision this chapter has
covered, for this course's NYC Taxi data:

```text
https://ltvacademydatalake.dfs.core.windows.net/
  taxi-data/                          <- ONE container (Lesson 3)
    raw/                               <- zone: original, untouched (Lesson 11)
      yellow-taxi/                     <- source/entity
        year=2024/month=01/            <- Hive-style partition (Lesson 9)
          yellow_tripdata_2024-01.csv  <- original format, as received (Lesson 8)
    processed/                         <- zone: cleaned, ready for analysis (Lesson 11)
      yellow-taxi/
        year=2024/month=01/
          part-0000.parquet            <- converted to Parquet (Lesson 8)
```

Everything in that path is a decision this chapter already taught you to
make deliberately.

## The five decisions

1. **How many containers?** (Lesson 3) Usually few — sometimes just one.
   Directories do almost all the real organizing; containers are a
   heavier, more fixed unit you don't want to multiply unnecessarily.
2. **What directory structure?** Zone first (Lesson 11's raw/cleansed/
   curated, or Lesson 12's Bronze/Silver/Gold), then source or entity
   name, then a Hive-style partition (Lesson 9) matching how you'll
   actually query it.
3. **What file format, per zone?** (Lesson 8) Raw data usually stays in
   whatever format it arrived in — CSV, JSON, whatever the source
   produced. Anything meant for real analysis gets converted to Parquet
   or Delta.
4. **Who can access what?** (Lesson 5) Broad RBAC roles for your data
   engineering team on the whole account; ACLs only for genuine
   exceptions — one directory only one team should touch.
5. **How do things authenticate?** (Lessons 6–7) A managed identity for
   pipelines and services you control with standing access; a SAS token
   for anything temporary or external.

## Why hierarchical namespace was worth Lesson 4's whole discussion

Every one of those five decisions assumes real directories exist to
organize around — which is exactly why Lesson 2 and 4's hierarchical
namespace decision has to happen first, before any of this design work
even starts.

## Key terms

| Term | Meaning |
|---|---|
| Zone | A directory-level stage a file moves through — raw, cleansed, curated (Lesson 11) |
| Source/entity directory | The directory naming the specific dataset within a zone |

## Lab

Sketch your own full path (on paper, no Azure account needed) for a
different, second dataset — reusing the same `taxi-data` container but a
different source directory, e.g. `green-taxi/` or `for-hire-vehicle/` —
applying all five decisions above.

## Check yourself

You're ready for Lesson 11 when you can explain, without looking: name
the five decisions a data lake design comes down to, and why the
container-vs-directory choice from Lesson 3 usually favors fewer
containers.
