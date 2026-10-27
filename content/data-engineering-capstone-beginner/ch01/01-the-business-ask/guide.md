# Lesson 1 — The Business Ask: One Clean Daily Sales Table

**Chapter 1 · Beginner Capstone: First Medallion Pipeline · Lesson 1 of 10**

## What you'll learn

- Why "can you tell me how we did yesterday?" is a request for a repeatable table, not a one-time answer
- The four things to pin down before writing a single line of PySpark: source, grain, definition of "sales," and refresh cadence
- How this requirement maps onto the Bronze, Silver, and Gold layers you'll start building in Lesson 3

## The ask

The retail chain has stores and an online storefront, same as you'd expect from any multi-channel
retailer. The Store Operations lead stops by with a question that sounds almost too simple to be a
project:

> "Can you tell me how we did yesterday?"

No ticket, no spec, nothing to extend. Just a sentence. This is exactly how the smallest real data
engineering work starts — someone wants one number, reliably, every day, not a one-time spreadsheet
pull.

## Why "how we did" is a trap

Three words in that sentence are each hiding a decision you have to make before touching a keyboard:

- **"How we did"** — total sales dollars? Number of orders? Both? Compared to anything, or just the
  raw number?
- **"Yesterday"** — the full previous calendar day, in-store and online combined, or just one channel?
- **Which systems count** — in-store POS terminals produce one kind of record, the online storefront
  produces another. Does "how we did" mean both, combined into one number?

None of these are hard to answer. They're just questions nobody has answered yet, and guessing wrong
means rebuilding the pipeline after it's already running.

## Turning it into a specific requirement

A short clarifying conversation gets you four concrete answers:

- **Source**: both channels — the in-store POS daily export and the online storefront's order
  records — combined into one number, because "how we did" means the whole business, not one channel.
- **Grain**: one row per calendar day. Not per store, not per line item yet. This is deliberately the
  *smallest* version of this pipeline — later projects in this track narrow the grain down to one row
  per line item per sale, the same grain the Advanced capstone builds toward. Lesson 1 of a first
  pipeline should produce one honest number, not twelve partially-correct ones.
- **Definition of "sales"**: the sum of completed order line totals for the day. Returns and refunds
  are a real complication this project deliberately leaves out — flag it as a known limitation, don't
  silently ignore it.
- **Refresh cadence**: once a day, every morning, covering the full previous day. Not real-time, not
  hourly — "yesterday" is a daily question, so a daily batch job is the right-sized answer.

Written down, the real requirement becomes:

> *"Build a Delta table with one row per calendar day, holding total completed sales amount across
> both in-store and online channels for that day, refreshed every morning for the previous day's
> data, for the Store Operations lead to check first thing."*

## What you're NOT building (yet)

- Real-time streaming ingestion — the online storefront's order events get picked up as a daily batch
  file here, not a live stream. That hybrid, same-day design is a later, Advanced-tier topic.
- Returns, refunds, or any sales adjustment logic.
- Per-store or per-product breakdowns — this version answers "how did the whole business do," full
  stop.
- Incremental merge logic — each day's pipeline run rebuilds the Gold table from scratch. That's fine
  at this size; incremental loading is explicitly a topic for the next project in this track.

## Where this is headed

Every one of those four answers becomes one layer of the pipeline you'll build starting next lesson:
raw files land untouched in **Bronze**, get cleaned and deduplicated in **Silver**, and get aggregated
into the one-row-per-day answer in **Gold**. That's the whole shape of this course, and it starts with
the requirement you just wrote, not with code.

## Key terms

| Term | Meaning |
|---|---|
| Requirements clarification | Turning a vague request into a specific, answerable one before building anything |
| Grain | The level of detail one row represents — here, one row per calendar day |
| Refresh cadence | How often the pipeline re-runs and what time window each run covers |
| Known limitation | Something deliberately left out of scope, named out loud rather than silently skipped |

## Lab

Write your own one-paragraph requirement for "can you tell me how we did yesterday?" covering: which
systems count, what grain, what "sales" means, and how often it refreshes. Compare it against the
version above — did you land on the same answers?

## Check yourself

You're ready for Lesson 2 when you can state, from memory, the four questions this lesson asks before
writing any code: which sources, what grain, what definition of the metric, and what refresh cadence
— and why "one row per day" is the right grain for this *first* pipeline, not a permanent limitation.
