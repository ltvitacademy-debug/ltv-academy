# Lesson 41 — Capstone Kickoff: Raw Data to Reporting

**Chapter 9 · Capstone · Lesson 41 of 45**

## What you'll build

Everything from this course, applied to a project of your own — not
another walkthrough of a pre-built dataset. This capstone has one
goal: prove you can take raw, already-landed data and turn it into a
version-controlled, tested, documented dbt project that a BI tool can
trust, without a lesson walking you through each step.

If you took the Snowflake course immediately before this one, you
already have exactly the raw material this capstone wants: the three
sources you loaded in that course's own capstone (a SQL Server export,
a CSV, and a JSON feed, sitting in a `raw` schema). This project picks
up right where that one left off — except this time, the
staging-to-warehouse transformation you hand-wrote in SQL gets rebuilt
as a real dbt project instead. If you didn't take that course, land
three sources of similarly different shapes into a warehouse first;
the specific data matters less than the layering decisions dbt makes
you formalize.

## The full deliverable list

This lesson is the brief; Lessons 42-44 are where you build each
piece. The whole capstone, end to end:

1. **Define sources** (Ch. 2) — a `sources.yml` pointing at your raw
   schema, one entry per raw table, with a freshness check on at least
   one of them.
2. **Build a staging model per source** (Ch. 2-3) — typed, cleaned,
   one-to-one with each raw table, following the naming conventions
   Chapter 3 laid out.
3. **Build at least one intermediate model** (Ch. 3) — combining two
   or more staging models into something neither one is alone, before
   anything reaches the marts layer.
4. **Build the marts layer** (Ch. 3) — at least one fact model and at
   least one dimension model, the final thing anything downstream is
   allowed to query.
5. **Test it** (Ch. 4) — generic tests (`not_null`, `unique`,
   `relationships`) on your key columns, plus at least one singular
   test encoding a business rule generic tests can't express.
6. **Document it** (Ch. 4) — real descriptions in `schema.yml` for
   every mart-layer model and its columns, and a generated dbt Docs
   site with the lineage graph.
7. **Add history and incremental refresh** (Ch. 5) — a snapshot
   capturing slowly changing history on at least one dimension, and at
   least one mart materialized as `incremental` instead of a full
   rebuild every run.
8. **Use at least one macro** (Ch. 6) — a `dbt_utils` macro (surrogate
   keys are the natural fit here) or one you write yourself.
9. **Put it in Git** (Ch. 7) — a real repository with meaningful
   commits. This exact project is what the Git/GitHub/CI-CD course's
   own capstone picks up afterward and wires into a real CI/CD
   pipeline — worth building it like it's going to be reused, because
   it is.
10. **Connect it to Power BI** (Lesson 44) — through views tuned for
    BI consumption, not the raw marts tables handed over as-is.
11. **Present it** (Lesson 45) — be ready to walk a stranger through
    the whole thing and explain every decision above.

A nod to Chapter 8: if you have time, define one metric on top of your
marts layer using the semantic layer concepts from that chapter. It's
not required for "done," but it's the most direct way to prove you
understood why that chapter exists.

## What "done" looks like

A dbt project where a stranger could clone the repository, run
`dbt build`, open the generated docs site, and understand exactly how
raw data becomes a tested, documented mart — without you explaining
anything out loud. Not "I ran the steps once," but "the project itself
demonstrates the pattern."

## A realistic order of operations

1. Get your sources defined and staging models built before touching
   anything else — you can't build an intermediate model on staging
   models that don't exist yet.
2. Build the intermediate and marts layers next, and get the
   *transformation logic* correct before adding tests — testing wrong
   logic just confirms the wrong thing consistently.
3. Add tests and docs once the models are stable — writing a
   `not_null` test against a column you're about to rename is wasted
   work.
4. Add the snapshot and incremental model once the plain-table version
   of each already works — incremental logic is much easier to debug
   against a materialization you already trust.
5. Connect Power BI last, against a marts layer that's already tested
   and documented.

## Key terms

| Term | Meaning |
|---|---|
| Capstone | A project applying this course's full pipeline to sources you choose, not a guided walkthrough |
| Raw schema | Already-landed data (from the Snowflake capstone, or your own) — this project's starting point, not something it re-loads |
| Done | The project itself demonstrates the pattern — sources, staging, marts, tests, docs, history — without verbal explanation |

## Lab

1. Confirm your three raw sources are actually queryable in your
   warehouse (reuse the Snowflake capstone's `raw` schema, or land
   three sources of similarly different shapes now).
2. Initialize a real Git repository for this project — this is the
   `retail-orders-analytics`-style project the rest of this chapter
   builds out, one milestone at a time.
3. Write down, in one sentence each, what your fact model's grain will
   be and which two staging sources your intermediate model will
   combine — before writing a single `.sql` file.

## Check yourself

You're ready for Lesson 42 when you have a real Git repository, three
raw sources confirmed queryable, and a one-sentence plan for your fact
model's grain and your intermediate model's join.
