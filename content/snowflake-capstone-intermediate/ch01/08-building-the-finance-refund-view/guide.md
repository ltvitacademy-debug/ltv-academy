# Lesson 8 — Building the Finance Refund View

**Chapter 1 · Intermediate Capstone: Support and Finance, One Shared Model · Lesson 8 of 16**

## What you'll learn

- Building a real `CREATE VIEW` on top of the incrementally-updated `refund_events` table
- Why Finance's view aggregates, instead of exposing raw event rows directly
- Choosing a grain (per-subscriber, per-week) that actually matches how Finance will use it
- Why this view automatically reflects the pipeline's latest data, with no refresh step of its own

## Why a view, not another table

`refund_events` already updates itself — `finance_refund_task` keeps it current every five
minutes. Finance doesn't need a second copy of that data sitting in its own table; it needs a
shaped, readable window onto the same live table. A `CREATE VIEW` is exactly that: a saved query,
re-run every time something selects from it, with no storage of its own and nothing to refresh.
When `refund_events` gets a new row, the view reflects it on the very next query — automatically,
with zero extra work.

## Deciding the grain

Raw `refund_events` rows are too granular for a report page — one row per refund event, with no
aggregation. Finance's real question is closer to "how much are we refunding, by subscriber, by
week" — so the view aggregates up to that grain rather than exposing individual events:

```sql
CREATE OR REPLACE VIEW driftwood_analytics.marts.vw_finance_refunds AS
SELECT
    subscriber_id,
    DATE_TRUNC('week', updated_at)  AS refund_week,
    COUNT(*)                         AS refund_event_count,
    SUM(refund_amount)               AS total_refund_amount
FROM driftwood_analytics.marts.refund_events
GROUP BY subscriber_id, DATE_TRUNC('week', updated_at);
```

Two columns matter beyond the obvious `total_refund_amount`: `refund_event_count` is included
deliberately, not as an afterthought. It's the same kind of sanity-check number Lesson 13 reaches
for — if `refund_event_count` for a subscriber-week ever looks higher than it reasonably should,
that's visible right in the view itself, without digging into the raw table.

## A second, simpler summary view

Power BI's Finance page also needs a plain weekly total, independent of subscriber — useful for a
single headline card:

```sql
CREATE OR REPLACE VIEW driftwood_analytics.marts.vw_finance_refunds_weekly_total AS
SELECT
    DATE_TRUNC('week', updated_at) AS refund_week,
    COUNT(*)                        AS refund_event_count,
    SUM(refund_amount)              AS total_refund_amount
FROM driftwood_analytics.marts.refund_events
GROUP BY DATE_TRUNC('week', updated_at);
```

Same underlying table, same two sanity-check columns, just aggregated to a coarser grain.

## Previewing before handing it to Power BI

```sql
SELECT *
FROM driftwood_analytics.marts.vw_finance_refunds_weekly_total
ORDER BY refund_week DESC;
```

Check that `total_refund_amount` moves sensibly week to week, and that `refund_event_count` is in
a plausible range given how many tickets typically involve a refund. This is worth doing now,
while the pipeline is simple and you have a clear mental picture of what the numbers should
roughly look like — it's the baseline you'll compare against when Lesson 13's numbers stop
matching.

## Key terms

| Term | Meaning |
|---|---|
| View | A saved, re-run-on-query SELECT statement with no storage of its own |
| Grain | The level of detail a row in a report or view represents (e.g. per subscriber, per week) |
| Sanity-check column | A count or secondary metric included in a view specifically to make a wrong total easier to spot |

## Lab

Create both views above against your own `refund_events` table. Run the preview `SELECT` and note
the current `total_refund_amount` and `refund_event_count` for the most recent week — write both
numbers down. You'll come back to compare against them in Lesson 13.

## Check yourself

You're ready for Lesson 9 when you can answer, without looking: why does `vw_finance_refunds`
include `refund_event_count` alongside `total_refund_amount`, when Finance's actual report only
cares about the dollar total?
