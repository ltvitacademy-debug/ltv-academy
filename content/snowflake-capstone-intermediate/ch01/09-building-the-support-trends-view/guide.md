# Lesson 9 — Building the Support Trends View

**Chapter 1 · Intermediate Capstone: Support and Finance, One Shared Model · Lesson 9 of 16**

## What you'll learn

- Building Support's view on `ticket_facts`, the current-state table from Lesson 6
- Why this view counts tickets by their *current* status, not by every historical change
- Shaping one view for trend-over-time, and a second for "what's open right now"
- How this view and Finance's view genuinely share one foundation, despite looking nothing alike

## Support's real question is different in kind, not just in topic

Finance's question (Lesson 8) was "how much, summed over events, over time." Support's question is
"what does the current caseload look like, and how is it trending." That's why Support's view
reads from `ticket_facts` — the upserted, current-state table — rather than anything event-based.
Querying it is simpler in one real sense: there's no risk of double-counting a ticket that's been
updated multiple times, because `ticket_facts` only ever holds its one latest row per ticket.

## A weekly trend view

```sql
CREATE OR REPLACE VIEW driftwood_analytics.marts.vw_support_ticket_trends AS
SELECT
    DATE_TRUNC('week', opened_at)  AS ticket_week,
    category,
    priority,
    COUNT(*)                        AS ticket_count
FROM driftwood_analytics.marts.ticket_facts
GROUP BY DATE_TRUNC('week', opened_at), category, priority;
```

Grouped by week, category, and priority — the three dimensions a Support lead actually filters and
slices by, matching the real self-service drill-down pattern this catalog's own Support reports
already use.

## A "right now" status view

Trends alone don't answer "what's actually open today" — a second, simpler view covers that:

```sql
CREATE OR REPLACE VIEW driftwood_analytics.marts.vw_support_open_tickets AS
SELECT
    ticket_id,
    subscriber_id,
    category,
    priority,
    status,
    opened_at
FROM driftwood_analytics.marts.ticket_facts
WHERE status NOT IN ('resolved', 'closed');
```

Because `ticket_facts` is current-state, this `WHERE` clause just works — there's no need to find
"the latest row for each ticket" with a window function, the way you'd have to if this were built
on an event log instead. That's the real, practical payoff of the design decision made back in
Lesson 2.

## The same foundation, two very different-looking views

It's worth pausing on something easy to miss: `vw_support_ticket_trends` and
`vw_finance_refunds` look like they belong to two unrelated pipelines — different tables,
different grains, different shapes entirely. But both ultimately trace back to the exact same
source: the same `tickets_api_raw` JSON, flowing through the exact same `tickets_stream`. That
shared root is precisely why, when the two teams eventually compare notes, they have every right
to expect their numbers to make sense together — and precisely why, when they don't, the problem
has to live somewhere in that shared pipeline, not in either view's own SQL.

## Key terms

| Term | Meaning |
|---|---|
| Current-state query | A query that can rely on exactly one row per entity existing, with no deduplication needed |
| Trend view | A view aggregated across a time dimension, built for spotting patterns over time |
| Shared root | The single upstream source two otherwise-different-looking views both ultimately depend on |

## Lab

Create both views above against your own `ticket_facts` table. Run `vw_support_open_tickets` and
confirm it returns only tickets whose `status` isn't `resolved` or `closed`. Run
`vw_support_ticket_trends` grouped by week and confirm the `ticket_count` totals look plausible
against how many sample rows you've loaded so far.

## Check yourself

You're ready for Lesson 10 when you can answer, without looking: why does `vw_support_open_tickets`
not need a window function or a "most recent row" trick to show each ticket's current status,
when `vw_finance_refunds` (Lesson 8) genuinely does need to sum across multiple rows per
subscriber?
