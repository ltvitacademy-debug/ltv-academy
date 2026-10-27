# Lesson 10 — Connecting Power BI to Both Views

**Chapter 1 · Intermediate Capstone: Support and Finance, One Shared Model · Lesson 10 of 16**

## What you'll learn

- Connecting Power BI Desktop to Snowflake using the real native connector
- Why this connection uses the `DRIFTWOOD_ANALYST` role, matching the Advanced capstone's own RBAC
- Importing both views into one Power BI file as two separate tables
- The real choice between Import and DirectQuery, and why Import fits this chapter's refresh pattern

## The real Snowflake connector

Power BI Desktop ships with a native Snowflake connector — **Get Data → More → Database →
Snowflake**. It asks for:

- **Server** — your Snowflake account's hostname, e.g. `xy12345.us-east-1.snowflakecomputing.com`
- **Warehouse** — `DRIFTWOOD_WH`, the same warehouse this chapter's Tasks already use
- **Role** (under Advanced options) — `DRIFTWOOD_ANALYST`

That role matters for a reason that isn't just cosmetic. The Advanced capstone's own RBAC lessons
set up `DRIFTWOOD_ANALYST` specifically as the read-only role meant for exactly this: human
analysts and Power BI connecting to marts, with no ability to modify the underlying tables, Tasks,
or Streams. Connecting as a more privileged role would technically work, but it breaks the whole
point of least-privilege access — Power BI only ever needs to read two views, never to touch the
pipeline behind them.

## Importing both views

After authenticating, Power BI's Navigator shows `driftwood_analytics.marts` and its objects.
Check both:

- `vw_finance_refunds` (and `vw_finance_refunds_weekly_total`)
- `vw_support_ticket_trends` (and `vw_support_open_tickets`)

Click **Load** to bring all four into the Power BI data model as separate tables — Finance's and
Support's data lives in the same `.pbix` file, but as distinct tables, each feeding its own
report page later.

## Import vs. DirectQuery, and why Import fits here

Power BI offers two connection modes. **DirectQuery** sends a live query to Snowflake every time a
visual renders — always current, but slower and more expensive on the warehouse. **Import** pulls
a snapshot into Power BI's own in-memory model, refreshed on a schedule you control. Given this
pipeline already refreshes `ticket_facts` and `refund_events` every five minutes via Snowflake's
own Tasks, Import with a scheduled refresh (say, every 15-30 minutes in the Power BI Service) gives
both teams data that's current enough for weekly reporting, without hitting the warehouse on every
single page load. Use **Import** for this project.

## A quick sanity check before building pages

Before moving to page design, open Power BI's **Data** view and spot-check both tables:

- `vw_finance_refunds_weekly_total` — confirm `total_refund_amount` and `refund_event_count`
  roughly match what you wrote down in Lesson 8.
- `vw_support_ticket_trends` — confirm `ticket_count` sums to a plausible total across all weeks.

Catching a connection or import mistake now, with four flat tables and no visuals yet, is far
simpler than noticing something's off once two full report pages are built on top of them.

## Key terms

| Term | Meaning |
|---|---|
| Native connector | Power BI's built-in Get Data option for a specific source, here Snowflake |
| Import mode | Pulls a snapshot into Power BI's own model, refreshed on a schedule |
| DirectQuery mode | Queries the source live on every visual render, no local snapshot |

## Lab

Connect Power BI Desktop to your own Snowflake trial account using the native connector, the
`DRIFTWOOD_WH` warehouse, and the `DRIFTWOOD_ANALYST` role. Import all four views. In the Data
view, spot-check both summary views against the baseline numbers you recorded in Lesson 8.

## Check yourself

You're ready for Lesson 11 when you can answer, without looking: why does this chapter connect
Power BI as `DRIFTWOOD_ANALYST` specifically, instead of a role with write access to the
underlying tables, and why is Import the better fit here than DirectQuery?
