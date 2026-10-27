# Lesson 2 — Planning the Snowflake Setup

**Chapter 1 · Beginner Capstone: The First Support Ticket Report · Lesson 2 of 10**

## What you'll learn

- How to turn the requirement from Lesson 1 into a plain-English list of Snowflake objects
  before creating any of them
- The six pieces every small Snowflake project like this one needs: warehouse, stage, raw table,
  summary query, view, and one read-only role
- Why planning the object names and flow on paper first prevents rework later

## From requirement to plan

Lesson 1 ended with one sentence: a report showing the count of support tickets created each
day this month, broken out by priority, refreshable on demand, for the VP of Support. Before
writing a single `CREATE` statement, it's worth sketching exactly what that sentence requires
inside Snowflake, in order:

1. **A warehouse** to run the compute — small, because this is one table and one summary query,
   not a company-wide workload.
2. **A stage** — a place for the daily ticket export (a CSV file from Driftwood's support
   ticketing tool) to land before it's loaded.
3. **A raw table** — `RAW_TICKETS`, holding one row per support ticket exactly as exported, no
   transformation yet.
4. **A summary query** — the actual answer to the VP's question: ticket count, grouped by day
   and priority.
5. **A view** — wrapping that summary query so Power BI (Lesson 8) connects to one stable object
   instead of a raw query every time.
6. **One role** — a read-only analyst role that can query the view and nothing else.

## Naming things before building them

Driftwood's data team already uses the `DRIFTWOOD_ANALYTICS` database for the billing and usage
pipeline in the Advanced capstone. This project reuses that same database — there's no reason to
spin up a second one for one more data domain — but adds its own schema, `SUPPORT`, so ticket
data stays clearly separated from billing and usage:

```
DRIFTWOOD_ANALYTICS.SUPPORT.RAW_TICKETS                 -- raw table
DRIFTWOOD_ANALYTICS.SUPPORT.TICKETS_STAGE                -- internal stage
DRIFTWOOD_ANALYTICS.SUPPORT.VW_DAILY_TICKET_SUMMARY      -- the view Power BI connects to
SUPPORT_WH                                                -- the warehouse
DRIFTWOOD_SUPPORT_ANALYST                                 -- the read-only role
```

Writing these five names down now means every later lesson just fills in SQL against a plan
that already exists — nobody is improvising table names mid-build.

## Why a small warehouse is the right call

This project's entire workload is: load one CSV a day, run one summary query, let Power BI read
one view. That's a trivial amount of compute next to anything a real data platform runs. An
`XS` (extra-small) warehouse, set to auto-suspend after a short idle period, matches the actual
size of this job — the same "right-sized tool" reasoning the Advanced capstone uses when it picks
scheduled batch loading over Snowpipe for a daily refresh. Lesson 3 creates it.

## What stays out of this plan

No transformation layer beyond one `CREATE VIEW`, no orchestrator triggering the load (a person
runs `COPY INTO` manually for this project — Streams & Tasks for real automation is an
Intermediate-project topic), and no second role for a second stakeholder, because there's only
one stakeholder so far.

## Key terms

| Term | Meaning |
|---|---|
| Virtual warehouse | The compute Snowflake uses to run queries and loads — sized independently of storage |
| Internal stage | Snowflake-managed storage a file lands in before `COPY INTO` loads it into a table |
| Raw table | A table holding source data exactly as loaded, before any transformation |

## Lab

Write out the six-item plan above in your own words, using your own object names if you'd
rather — then check that each name tells you, just by reading it, which of the six pieces it is.

## Check yourself

Without looking back, list the six Snowflake objects this project needs and the order they get
built in. Why does the raw table get created before the summary query, and the view before the
role's `GRANT`?
