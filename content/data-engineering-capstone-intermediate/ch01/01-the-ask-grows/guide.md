# Lesson 1 — The Ask Grows: Two Stakeholders, One Pipeline

**Chapter 1 · Data Engineering Capstone — Intermediate Project · Lesson 1 of 16**

## What you'll learn
- Where the Beginner project left off: one Gold table, one stakeholder, a nightly full reload
- The Regional Manager's new ask: a category-breakdown view the current pipeline can't answer
- The second, unrelated problem showing up at the same time: the nightly full reload is starting to take too long
- Why this course treats "new requirement" and "pipeline no longer scales" as two separate problems, not one

## Where the Beginner project left off

In the Beginner capstone, the retail chain had one real question: *how did we do yesterday?* You
built a single medallion pipeline to answer it — raw sales files landing untouched in Bronze, cleaned
and deduplicated in Silver, aggregated into one Gold table for the Store Operations lead:
`gold.daily_sales_summary`, one row per store per day, holding `total_sales` and `total_transactions`.

That pipeline ran the same way every night: drop everything, reprocess every file that had ever
landed in Bronze, rebuild Silver from scratch, rebuild Gold from scratch. At the data volumes that
project worked with, a full rebuild every night was simple, correct, and fast enough. It was the
right-sized answer for a first pipeline, and it's still running in production today.

Two things are now changing at once.

## New stakeholder, new question

A Regional Manager — someone who oversees multiple stores, not just one — has a different question
than Store Operations ever asked:

> "I don't just want total sales per store per day. I want to see which *categories* are driving
> that number — and whether that's different store to store."

`gold.daily_sales_summary` can't answer this. It was deliberately built at the store/day grain, with
no category dimension at all. This isn't a bug in the existing table — it's a new requirement that
needs a new Gold table, built from the same underlying Silver data, broken out by category instead
of collapsed across all of them. That table will be `gold.category_breakdown`: one row per store, per
category, per day, holding `total_sales` and `total_quantity`.

## A second problem, showing up at the same time

Independently of the Regional Manager's request, the data engineering team has noticed something
else: the nightly job is taking longer than it used to. `bronze.sales_raw` has been accumulating
every day since the Beginner project went live, and the nightly pipeline still reprocesses *all* of
it — every file, every night — just to pick up the one new day's worth of transactions. As the table
grows, that nightly run grows with it, and the overnight batch window isn't getting any longer.

This is not a correctness problem. The numbers coming out of the existing pipeline are still right.
It's a *scale* problem: the design that was simple and fast at small volume is now the thing standing
between the team and a batch window that reliably finishes before the stores open.

## Two problems, one redesign

It would be easy to treat these as one big ball of work, but they're genuinely separate:

- **Problem 1 — new requirement.** The Regional Manager wants a view the current Gold layer doesn't
  provide. Solving this means adding a new Gold table, not fixing anything that's broken.
- **Problem 2 — doesn't scale.** The nightly full reload re-processes accumulated history it already
  processed correctly last night. Solving this means changing *how* Bronze and Silver get built, not
  what they contain.

The reason this course bundles them into one project is that they share a solution. Once the pipeline
moves from "reprocess everything" to "process only what's new," both problems get easier: adding a
second Gold table is simple once Silver is reliably incremental, and the nightly runtime stops
growing with total history. The rest of this chapter plans that redesign before writing a line of new
PySpark.

## Key terms

| Term | Meaning |
|---|---|
| Full reload | A pipeline run that reprocesses the entire accumulated history of a table, every run |
| Grain | The level of detail one row represents — store/day for the existing Gold table, store/category/day for the new one |
| Stakeholder | A person or team who consumes a specific Gold table for a specific business question |
| Scale problem | A design that stays correct but gets slower or costlier purely because the data volume grew |

## Lab

Write two one-sentence problem statements of your own — one for the Regional Manager's new
requirement, one for the nightly-runtime problem — without using the word "and" to connect them.
If you can't keep them separate, go back and reread "Two problems, one redesign" above.

## Check yourself

Without looking back at the lesson: name the two problems this chapter solves, say which one is a
brand-new requirement and which one is an existing pipeline running out of room to scale, and name
the one new Gold table this course adds (its name and its grain).
