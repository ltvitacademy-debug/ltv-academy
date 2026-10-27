# Lesson 11 — Building the Support Page

**Chapter 1 · Intermediate Capstone: Support and Finance, One Shared Model · Lesson 11 of 16**

## What you'll learn

- Building a real Power BI report page from `vw_support_ticket_trends` and `vw_support_open_tickets`
- Choosing visuals that match Support's actual job: spotting trends and triaging what's open now
- Wiring up slicers for category and priority, the same self-service drill-down pattern this
  catalog's own Support reports use
- Why this page's visuals are bound directly to the view's own columns, with no DAX measures needed yet

## What Support's page actually needs to answer

From Lesson 1: Support wants ticket volume, category, and priority trends, kept current. This page
should let a Support lead answer, in a glance: *is ticket volume going up or down, which
categories are driving it, and what's actually open right now that needs attention.*

## Building the trend visual

1. Add a **line chart** (or clustered column chart) to the canvas.
2. **X-axis**: `ticket_week` from `vw_support_ticket_trends`.
3. **Y-axis**: `ticket_count` (Power BI auto-aggregates as `Sum of ticket_count`, which is correct
   here — the view already pre-aggregated to one row per week/category/priority, so summing those
   rows back up is exactly right, not double-counting).
4. **Legend**: `category`, so the chart shows each category's trend as its own line.

## Building the open-tickets table

1. Add a **table** visual.
2. Columns: `ticket_id`, `subscriber_id`, `category`, `priority`, `status`, `opened_at`, from
   `vw_support_open_tickets`.
3. Sort by `opened_at` ascending, so the oldest still-open tickets surface at the top — the ones
   most likely to need attention first.

## Adding slicers

Add two **slicer** visuals, bound to `category` and `priority` from `vw_support_ticket_trends`.
Set both slicers to also filter the open-tickets table (Power BI does this automatically for
visuals on the same page reading related/matching column names, but confirm it under **Edit
interactions** if it doesn't filter both visuals by default). This is the real self-service
pattern Support asked for back in Lesson 1: a page they can slice themselves, without asking
anyone to re-run a query.

## A headline card

Add a single **card** visual bound to `ticket_count` from `vw_support_ticket_trends`, showing the
total across whatever the current slicer selection covers — a quick top-line number before diving
into the trend chart or the open-tickets table.

## Why no DAX measures yet

Every number on this page so far comes directly from a column already aggregated correctly in the
Snowflake view itself — `COUNT(*) AS ticket_count`, computed once in SQL. There's no need to write
a DAX `CALCULATE` or a custom measure for a straightforward sum of a pre-aggregated column; Power
BI's automatic `Sum of ticket_count` does exactly the right thing. Keep it that way deliberately —
an unnecessary DAX measure here would just be one more place a mistake could hide, for no real
benefit.

## Key terms

| Term | Meaning |
|---|---|
| Self-service drill-down | A page a user can filter and slice themselves, without re-running a query |
| Auto-aggregation | Power BI's default sum/count behavior on a numeric column with no custom measure |
| Edit interactions | Power BI's setting controlling which visuals a slicer or click actually filters |

## Lab

Build this page against your own imported tables: a trend chart, an open-tickets table, category
and priority slicers, and a headline card. Confirm the slicers filter both the trend chart and the
open-tickets table, and that the headline card's total updates when you change the slicer
selection.

## Check yourself

You're ready for Lesson 12 when you can answer, without looking: why is it correct for this page's
headline card to use Power BI's automatic `Sum of ticket_count`, instead of needing a custom DAX
measure, given how `vw_support_ticket_trends` was built back in Lesson 9?
