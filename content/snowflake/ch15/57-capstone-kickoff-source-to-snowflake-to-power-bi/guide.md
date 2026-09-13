# Lesson 57 — Capstone Kickoff: SQL Server/CSV/JSON → Snowflake → Power BI

**Chapter 15 · End-to-End Capstone Project · Lesson 57 of 60**

## What you'll build

Everything from this course, applied to a project of your own — not
another walkthrough of a pre-built dataset. This capstone has one
goal: prove you can take three genuinely different raw sources, land
them in Snowflake, shape them into a real warehouse, and connect it to
Power BI, without a lesson walking you through each step.

## Pick your three sources

Real, or realistic practice data — either works, as long as the
*shapes* are genuinely different:

1. **A SQL Server export** — a `.csv`/`.bcp` export of a table or two
   from a database you already have (AdventureWorks2012 or
   AdventureWorksDW2014 from Chapter 4's SQL labs work fine, or your
   own).
2. **A plain CSV** — a separate dataset that doesn't relate 1:1 to the
   SQL Server export (a product catalog, a marketing spend file,
   whatever you can find or generate).
3. **A JSON feed** — nested, semi-structured data: an API export, a
   log file, or a synthetic feed you generate — something that
   actually needs `VARIANT` and `FLATTEN` (Ch. 7), not a JSON file
   that's secretly flat.

Three different shapes matter more than the specific data — the whole
point is practicing the loading and transformation decisions that
change per source type, not repeating the same COPY INTO three times.

## The full deliverable list

This lesson is the brief; Lessons 58-60 are where you build each
piece. The whole capstone, end to end:

1. **Load all three sources into Snowflake** (Ch. 3-4, 7) — internal
   or external stages, `COPY INTO` for the SQL Server export and CSV,
   `VARIANT`/`FLATTEN` for the JSON feed, Snowpipe for at least one of
   them if it fits your data's arrival pattern.
2. **Transform through staging → warehouse → reporting layers**
   (Ch. 5-6) — real ELT: raw landing tables, cleaned staging, a proper
   dimensional model (fact + dimension tables, surrogate keys, at
   least one SCD Type 2 dimension) in the warehouse layer, and
   reporting views on top.
3. **Wire up Streams and Tasks for incremental refresh** (Ch. 8) — at
   least one Stream capturing change on a raw/staging table, feeding
   a Task that keeps a downstream table current without a full reload.
4. **Configure RBAC for the project** (Ch. 9) — at least two roles
   (e.g. a loader role and a read-only analyst role) with grants that
   actually reflect least privilege, not everyone on `ACCOUNTADMIN`.
5. **Apply real performance tuning** (Ch. 10) — check Query Profile on
   at least one real query, and make one deliberate,
   justified decision about clustering, warehouse sizing, or caching.
6. **Connect Power BI** (Ch. 12) — a working connection to your
   reporting layer, with a conscious Import vs. DirectQuery decision,
   not just whichever one happened to work first.
7. **Present it** (Lesson 60) — be ready to walk a stranger through
   the whole thing and explain every decision above.

## What "done" looks like

A Snowflake account where a stranger could open your reporting schema,
read the views, and understand exactly how raw data from three
different sources becomes a queryable star schema that Power BI
connects to — without you explaining anything out loud. Not "I ran the
steps once," but "the objects themselves demonstrate the pattern."

## A realistic order of operations

1. Pick sources and get all three loaded before building anything
   downstream — you can't model what you haven't landed.
2. Build staging and the dimensional model next, and get it correct
   before adding Streams/Tasks — automating a wrong transformation
   just runs the wrong thing faster.
3. Add RBAC once the object structure is stable — granting privileges
   on tables you're about to restructure is wasted work.
4. Tune and connect Power BI last, against a model that already works.

## Key terms

| Term | Meaning |
|---|---|
| Capstone | A project applying this course's full pipeline to sources you choose, not a guided walkthrough |
| Three different shapes | A SQL Server export, a CSV, and a JSON feed — deliberately different loading/transform needs |
| Done | The Snowflake objects themselves demonstrate the pattern, without verbal explanation |

## Lab

1. Choose your three sources today — write down, in one sentence each,
   why each one is genuinely a different shape of data.
2. Sketch (on paper or in a doc) the staging → warehouse → reporting
   layering you plan to build, before writing a single `COPY INTO`.
3. Create the databases/schemas that will hold each layer, so Lesson
   58 has somewhere real to load into.

## Check yourself

You're ready for Lesson 58 when you have three real source files
staged and ready, a rough sketch of your target dimensional model, and
a one-paragraph description of what this project is going to prove you
can do.
