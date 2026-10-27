# Lesson 12 — Building the Finance Page

**Chapter 1 · Intermediate Capstone: Support and Finance, One Shared Model · Lesson 12 of 16**

## What you'll learn

- Building Finance's report page from `vw_finance_refunds` and `vw_finance_refunds_weekly_total`
- Designing a page around a dollar total first, trend second — the opposite emphasis from Support's page
- Surfacing `refund_event_count` visibly on the page, not just in the underlying view
- Why this page, built correctly, still won't protect Finance from Lesson 13's bug — and why that's expected

## What Finance's page actually needs to answer

From Lesson 1: Finance wants a living refund total tied to support tickets. Unlike Support's page,
which leads with a trend, Finance's page leads with a number: *how much are we refunding, right
now, this week* — with enough supporting detail to explain that number if someone asks.

## A headline refund total

1. Add a **card** visual bound to `total_refund_amount` from `vw_finance_refunds_weekly_total`,
   filtered to the current week by default.
2. Format it as currency — Power BI's column formatting (not a DAX measure) handles this, since
   `total_refund_amount` already arrives as a clean `NUMBER(10,2)` from the Snowflake view.

## A weekly trend chart

1. Add a **line chart** (or column chart).
2. **X-axis**: `refund_week` from `vw_finance_refunds_weekly_total`.
3. **Y-axis**: `total_refund_amount`.

This mirrors Support's trend chart in shape, but reads from a completely different table — exactly
the "different shapes, same shared root" relationship covered back in Lesson 9.

## Surfacing refund_event_count, deliberately, not buried

1. Add a second, smaller **card** visual bound to `refund_event_count`, placed right beside the
   dollar-total card.
2. Add a **table** visual from `vw_finance_refunds`, showing `subscriber_id`, `refund_week`,
   `refund_event_count`, and `total_refund_amount` per subscriber.

This isn't decoration. `refund_event_count` was built into the Snowflake view in Lesson 8
specifically as a sanity-check number, and putting it visibly on the page — not just in the
underlying SQL — means anyone looking at this page, not just someone who goes digging in
Snowflake, has a fighting chance of noticing if that count ever looks structurally wrong.

## A subscriber slicer

Add a **slicer** bound to `subscriber_id`, so Finance can drill into one subscriber's refund
history specifically — useful when investigating an individual account, not just a weekly total.

## An honest note before moving on

This page, built exactly as described, is correct. It accurately reflects whatever is in
`refund_events` at the moment Power BI refreshes. That's an important distinction to sit with
before the next three lessons: a report page being built correctly doesn't guarantee the data
feeding it is correct — and that gap is exactly what Lesson 13 surfaces.

## Key terms

| Term | Meaning |
|---|---|
| Headline-first design | A page built to lead with one number, with supporting detail available, not the reverse |
| Visible sanity-check | A metric surfaced directly on a page specifically so a problem is noticeable without deeper digging |
| Correct page, wrong data | A report can be built flawlessly and still show a wrong number if its underlying data is wrong |

## Lab

Build this page against your own imported tables: a currency-formatted total card, a
refund-event-count card beside it, a weekly trend chart, a per-subscriber table, and a subscriber
slicer. Confirm the total card's number matches the baseline you recorded back in Lesson 8.

## Check yourself

You're ready for Lesson 13 when you can answer, without looking: why does this lesson say a
correctly-built Finance page still can't protect Finance from a wrong number, and where does that
responsibility actually sit instead?
