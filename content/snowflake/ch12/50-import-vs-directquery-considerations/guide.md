# Lesson 50 — Import vs. DirectQuery Considerations

**Chapter 12 · Power BI + Snowflake · Lesson 50 of 60**

## What you'll learn

- What actually happens, query-wise, in Import mode vs. DirectQuery mode
- Why DirectQuery against Snowflake specifically has a cost dimension that DirectQuery against an always-on database doesn't
- How the 60-second minimum billing from Lesson 47 interacts badly with bursty DirectQuery traffic
- A practical default for choosing between them

## Two fundamentally different query patterns

Both modes were on the table back in Lesson 49's connection dialog.
The difference isn't cosmetic — it's when and how often Power BI talks
to Snowflake at all:

- **Import** — Power BI pulls a copy of the data into its own
  in-memory model on a schedule you control. Every visual, filter, and
  slicer interaction after that queries Power BI's own engine, not
  Snowflake. Snowflake only sees traffic during scheduled refreshes.
- **DirectQuery** — Power BI stores no data. Every visual render,
  filter change, slicer click, and cross-highlight sends a live SQL
  query straight to Snowflake, translated on the fly from the report
  interaction.

## Why this matters more against Snowflake than most sources

Against an always-on, dedicated SQL Server box, DirectQuery's downside
is mostly latency and query load — the server is running regardless.
Against Snowflake, DirectQuery's downside is **credits**, directly,
because of two facts from earlier chapters:

1. Every query against Snowflake runs on a **warehouse**, and every
   second that warehouse is active consumes credits (Lesson 47).
2. A suspended warehouse resuming to serve a query bills a
   **60-second minimum**, every time (Lesson 47).

A dashboard in DirectQuery mode with active users clicking slicers all
day keeps a warehouse resuming and running in short, frequent bursts —
exactly the billing pattern that racks up 60-second minimums instead
of one clean, predictable batch of usage.

## Side by side

| | Import | DirectQuery |
|---|---|---|
| Where data lives | Copied into Power BI's model | Stays in Snowflake, queried live |
| Freshness | As fresh as the last scheduled refresh | Live, every interaction |
| Snowflake traffic pattern | One burst per refresh | Continuous, per user interaction |
| Cost risk | Concentrated, predictable refresh windows | Spread across the day; can rack up 60-second minimums repeatedly |
| Report responsiveness | Fast — queries hit Power BI's own engine | Depends on Snowflake query speed and warehouse size |
| Data volume ceiling | Limited by Power BI model size | Effectively unlimited — Snowflake does the work |

## A practical default

If the data can tolerate being an hour (or even five minutes) stale,
**Import** is usually the right call — it turns Snowflake cost into a
predictable, schedulable line item instead of a function of how many
people are clicking around a dashboard. Reach for **DirectQuery** only
when genuine near-real-time freshness is a real requirement, not just
a nice-to-have, and when that requirement is worth the less
predictable credit spend.

When DirectQuery is the right call, pairing it with a dedicated,
appropriately-sized **reporting warehouse** — separate from ETL/ELT
warehouses, with its own resource monitor from Lesson 48 — keeps BI
query traffic from either starving other workloads or silently
becoming the biggest line on the bill.

## Key terms

| Term | Meaning |
|---|---|
| Import mode | Power BI copies data into its own model on a refresh schedule |
| DirectQuery mode | Power BI sends a live query to Snowflake for every report interaction |
| Refresh | The scheduled event where Import mode pulls fresh data from Snowflake |
| Reporting warehouse | A warehouse dedicated to BI query traffic, sized and monitored separately from ETL |

## Lab

1. In a Power BI report connected to Snowflake, note whether it's
   currently set to Import or DirectQuery (File > Options and settings,
   or the connection properties).
2. If DirectQuery, interact with a few slicers/filters and then check
   `ACCOUNT_USAGE.WAREHOUSE_METERING_HISTORY` (Lesson 47) for that
   warehouse around that time window — look for short, repeated
   activity bursts.
3. Sketch out, in one sentence per scenario, whether Import or
   DirectQuery fits better for: (a) an executive dashboard refreshed
   each morning, (b) an operations dashboard that needs to reflect
   orders placed minutes ago.

## Check yourself

You're ready for Lesson 51 when you can explain, in one sentence, why
DirectQuery's cost risk against Snowflake specifically comes from the
combination of per-second billing and the 60-second resume minimum —
not just "DirectQuery is slower."
