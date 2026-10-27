# Presenting the Answer

**Chapter 1 · Beginner Capstone: First Look at the Files · Lesson 9 of 10**

## What you'll learn

- Why the answer has to lead, not the method used to get it
- How to present a result with two valid "winners" without confusing the stakeholder
- The honest caveats this result actually has, and why naming them builds trust

## Lead with the answer, not the journey

The Operations Manager doesn't care about Glue Crawlers, partition pruning, or `GROUP BY`
clauses — they asked one question and want one clear answer first. The wrong way to open
this conversation is a walkthrough of the pipeline. The right way opens with the number:

> "For August, Camp Kitchen sold the most units — 1,842 — but Tents & Shelters actually
> brought in the most revenue, over $183,000, because tents cost far more per unit than a
> camp stove."

That's the entire answer in two sentences, and it directly tells the Operations Manager
something actionable: restocking decisions driven by unit volume and decisions driven by
revenue point to two different categories, and which one matters depends on what Northfield
is actually trying to protect — shelf availability of fast movers, or revenue from
high-ticket items.

## Showing two winners without confusing anyone

A simple table, sorted by whichever metric the stakeholder cares about most, says this
better than prose does:

| Product Category | Units Sold | Revenue |
|---|---|---|
| **Camp Kitchen** | **1,842** | $63,410.50 |
| Footwear | 1,510 | $118,920.00 |
| **Tents & Shelters** | 967 | **$183,480.65** |
| Apparel | 1,340 | $51,260.00 |
| Climbing & Safety | 402 | $28,940.10 |

Bolding both leaders — Camp Kitchen's unit count, Tents & Shelters' revenue — makes the
nuance visible at a glance instead of requiring the Operations Manager to scan every row
and compare mentally.

## Naming the real caveats, briefly

Presenting an honest answer means naming what it does and doesn't cover, in one or two
sentences, not a disclaimer paragraph:

- This covers **August 2026 only** — one month, not a seasonal trend. A single busy or
  slow month could shift which category looks strongest.
- These are **raw order lines**, with no returns or cancellations backed out — a few
  canceled orders in a high-ticket category like Tents & Shelters could move its revenue
  number more than the same cancellations would move a cheaper category's.
- This is a **one-time snapshot**, not a live dashboard — if the Operations Manager wants
  this updated monthly, that's a different, bigger project (the Intermediate tier covers
  exactly that shift).

Naming these limits isn't hedging — it's what separates a trustworthy answer from a
confident-sounding guess.

## Key terms

| Term | Meaning |
|---|---|
| Lead with the answer | Opening a presentation with the conclusion, not the process used to reach it |
| Caveat | A stated limit on what a result does or doesn't account for |
| Snapshot | A one-time result, as opposed to a dashboard that updates automatically |

## Check yourself

Why does leading with "Camp Kitchen sold the most units, but Tents & Shelters earned the
most revenue" serve the Operations Manager better than starting with how the Glue Crawler
and Athena query were built — and what's the real risk of not mentioning that returns
aren't backed out of this result?
