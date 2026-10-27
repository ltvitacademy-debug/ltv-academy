# Lesson 8 — Connecting Power BI to the View

**Chapter 1 · Beginner Capstone: The First Support Ticket Report · Lesson 8 of 10**

## What you'll learn

- How to connect Power BI Desktop to a Snowflake view using the Snowflake connector
- The Import vs. DirectQuery choice, and why Import is the right call for this project's size
- Why pointing Power BI at the view, not the raw table, is what makes all of Lessons 6-7's work
  actually pay off

## Getting the connection details

Power BI needs three things to connect: the Snowflake account identifier (the same one you use
to log into Snowflake's web UI), the warehouse (`SUPPORT_WH`), and the database and schema
(`DRIFTWOOD_ANALYTICS.SUPPORT`). All three come straight from the plan this project has been
following since Lesson 2 — nothing new to invent here.

## Connecting, step by step

1. In Power BI Desktop: **Get Data → More... → Snowflake**.
2. Enter the Snowflake **server** (account identifier) and the **warehouse**, `SUPPORT_WH`.
3. Choose **Import** or **DirectQuery** (covered below).
4. Sign in using the credentials for a user that holds the `DRIFTWOOD_SUPPORT_ANALYST` role —
   the same role Lesson 6 and 7 built and granted `SELECT` to. Never connect Power BI with an
   admin account just because it's convenient.
5. In the Navigator pane, expand `DRIFTWOOD_ANALYTICS → SUPPORT`, and select
   `VW_DAILY_TICKET_SUMMARY` — not `RAW_TICKETS`.
6. Click **Load**.

## Why the view, and not the raw table

This is the moment Lessons 6 and 7 were building toward. Power BI connects to
`VW_DAILY_TICKET_SUMMARY`, which already has the right grain (one row per day and priority) and
the right scope (this month only) baked in. If Power BI connected to `RAW_TICKETS` instead,
every visual in the report would need its own `GROUP BY` logic written in DAX, duplicating work
that's already correct and tested in the view. One source of truth, read in one place.

## Import vs. DirectQuery

- **Import** copies the view's current result into Power BI's own in-memory model. Fast to
  interact with, but it's a snapshot — it only updates on a manual or scheduled refresh.
- **DirectQuery** sends a live query to Snowflake every time a visual changes. Always current,
  but slower, and it keeps `SUPPORT_WH` running more often.

For this project — a small daily summary a VP checks once before a Monday meeting, not a
dashboard dozens of people hit continuously — **Import** is the right choice. The data volume is
tiny, and a refresh before Monday's meeting is more than current enough. DirectQuery becomes
worth its cost once a report needs true minute-by-minute freshness or the underlying data is too
large to copy — neither is true here.

## Key terms

| Term | Meaning |
|---|---|
| Import mode | Power BI copies a query's result into its own model; fast, but a snapshot until refreshed |
| DirectQuery | Power BI sends a live query to the source on every interaction; always current, but slower |
| Snowflake connector | Power BI's built-in connector for querying a Snowflake account directly |

## Lab

Connect Power BI Desktop to `VW_DAILY_TICKET_SUMMARY` using the `DRIFTWOOD_SUPPORT_ANALYST`
role, in Import mode. Confirm the loaded table matches the row count you'd expect from Lesson 5's
sanity check.

## Check yourself

Why does connecting to the view instead of the raw table save real DAX work in Power BI, and why
is Import the right mode for this specific report rather than DirectQuery?
