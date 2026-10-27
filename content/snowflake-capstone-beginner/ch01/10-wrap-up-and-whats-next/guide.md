# Lesson 10 — Wrap-Up: What You Built, and What's Next

**Chapter 1 · Beginner Capstone: The First Support Ticket Report · Lesson 10 of 10**

## What you'll learn

- A full recap of the nine real objects and decisions this project produced, start to finish
- Why every choice in this project was deliberately the simplest one that still worked
- What changes, concretely, once Driftwood has more than one stakeholder — the bridge to the
  Intermediate project

## What you actually built

Nine lessons, one continuous thread, no detours:

1. **A clarified requirement** — one sentence, turned from a vague Slack message into something
   buildable.
2. **A plan** — six named Snowflake objects, decided before any SQL was written.
3. **A warehouse and a load** — `SUPPORT_WH` (XS, auto-suspending), a stage, and a `COPY INTO`
   that loads ticket data with `ON_ERROR = 'ABORT_STATEMENT'`.
4. **Three real Snowflake-vs-T-SQL differences** — `LIMIT`, `DATE_TRUNC`, and `QUALIFY`.
5. **A summary query** — `GROUP BY` at the right grain, filtered in `WHERE`, not `HAVING`.
6. **A role** — `DRIFTWOOD_SUPPORT_ANALYST`, built with least privilege from the start.
7. **A view** — `VW_DAILY_TICKET_SUMMARY`, the stable object everything downstream reads.
8. **A Power BI connection** — Import mode, against the view, under the analyst role.
9. **A presentation** — two visuals, no more, walked through in two minutes.

## The thread running through all of it

Every one of those nine decisions was the simplest option that still actually solved the
problem: an XS warehouse because the workload is tiny, a view instead of a materialized table
because nothing demanded the extra complexity, Import mode instead of DirectQuery because
nothing needed real-time freshness, one role instead of a governance framework because there was
only one stakeholder. None of those were shortcuts — they were the correctly-sized answer for
this specific ask.

## What changes with the next stakeholder

The Intermediate project picks up exactly where "one stakeholder" stops being true. Once a
second stakeholder — say, someone in Product, asking a related but different question — needs
access to overlapping data, several of this project's simplifications stop being enough:

- **One role becomes several roles**, each scoped to what that specific stakeholder needs — the
  same least-privilege principle from Lesson 6, just applied twice instead of once.
- **A manual `COPY INTO` becomes a Streams-and-Tasks pipeline** — once more than one person is
  relying on fresh data landing automatically, "someone remembers to run the load" stops being
  good enough.
- **A flat CSV becomes semi-structured data** — richer source systems export JSON, not a flat
  CSV, and Snowflake's `VARIANT` type and `FLATTEN` function (covered in the main Snowflake
  course's Chapter 7) are how you turn that into something a view can summarize.

## What doesn't change

The core discipline does not change at all: clarify the real ask before building, name your
objects before creating them, grant only what's needed, and build the smallest thing that
actually answers the question. That discipline is the real skill this project taught — the SQL
syntax is just where it got applied this time.

## Key terms

| Term | Meaning |
|---|---|
| Right-sizing | Choosing the simplest tool or object that still fully solves the actual problem |
| Streams | A Snowflake object that tracks row-level changes to a table, enabling incremental, automated pipelines |
| `VARIANT` | Snowflake's data type for storing semi-structured data like JSON inside a relational table |

## Lab

Write a one-paragraph summary of this project you could give in a job interview — the business
problem, the nine steps, and the one or two decisions you'd defend if someone pushed back on
them.

## Check yourself

Name the nine objects or decisions this project produced, in order, without looking back — and
explain, in one sentence each, why a second stakeholder would break at least two of this
project's simplifications.
