# Lesson 4 — Sentinel Pricing and Data Retention Concepts

**Chapter 1 · Microsoft Sentinel Architecture · Lesson 4 of 32**

## What you'll learn

- How Sentinel is actually priced, day to day, at the workspace level
- Why commitment tiers exist, and when they make more sense than pay-as-you-go
- The difference between a workspace's free retention window and paid long-term retention
- What the archive tier is for, and why it's cheap but not instantly queryable

## Pay-as-you-go: billed on what you ingest

Lesson 1 described Sentinel's economics as "pay for what you ingest and retain, not for
hardware you had to buy up front." Here's what that actually looks like in practice. Sentinel's
default pricing model is **pay-as-you-go**, billed per **gigabyte (GB) of data ingested per
day** into the Log Analytics workspace. Every connector from Lesson 3 that's turned on
contributes to that daily ingestion volume, which is why connector choices and pricing aren't
really separate conversations — turning on a high-volume source, like raw Windows Security
Events from every server in a large environment, is a direct, predictable cost decision, not
just a data decision.

## Commitment tiers: a discount for predictable volume

For organizations whose daily ingestion volume is large and fairly consistent, Microsoft offers
**commitment tiers** (sometimes called capacity reservations) — fixed daily volume levels like
100 GB/day or 200 GB/day, billed at a discounted rate compared to pure pay-as-you-go, in
exchange for committing to that level. The trade-off is straightforward: pay-as-you-go is more
flexible and better for unpredictable or low volume, while a commitment tier is cheaper per GB
once an organization's actual ingestion settles into a steady, high-volume pattern. Choosing
between them is a real operational decision a Sentinel administrator makes, not a one-time
setup checkbox.

## Retention: what's free, and what costs more

**Retention** is how long ingested data stays queryable in the workspace. A Sentinel-enabled
Log Analytics workspace includes a free **interactive retention** window at no additional
ingestion cost, letting analysts run normal queries and detections against that data without
extra charge. Keeping data queryable for longer than that free window costs additional storage
per GB per month. This is exactly why retention isn't a "set it to maximum and forget it"
setting: an organization has to weigh how long it genuinely needs to query data quickly against
what that extra retention costs every month, table by table if needed.

## Archive: cheap storage for data you rarely need to touch

For data that has to be kept for compliance or audit purposes far longer than anyone expects to
actively query it — think years, not months — Sentinel supports an **archive tier**. Archived
data is stored far more cheaply than data in interactive retention, but it isn't instantly
queryable the normal way; getting back to it requires running a **search job** or a **restore**
operation first, which takes time and isn't meant for day-to-day detection work. Archive exists
specifically for the "we're legally required to keep this, but we'll almost never look at it"
category of data, which is a very different use case from the data a SOC is actively hunting
through right now.

## Putting it together: a real cost decision

Put Lessons 3 and 4 together and a real administrative question comes into focus: for each data
source, is it valuable enough for active detection to justify its ingestion cost and interactive
retention, or is it something that mostly needs to exist for compliance, where archive is the
right (and far cheaper) home for it once it ages out of active use? That's not a hypothetical —
it's one of the first real decisions every Sentinel deployment has to make, and it closes out
this chapter's architecture picture before Chapter 2 turns to actually querying this data with
KQL.

## Key terms

| Term | Meaning |
|---|---|
| Pay-as-you-go | Default pricing: billed per GB of data ingested per day |
| Commitment tier | A fixed daily volume level billed at a discount vs. pay-as-you-go, for predictable high volume |
| Interactive retention | The default, free window during which ingested data stays normally queryable |
| Archive tier | Cheap long-term storage for data rarely queried; requires a search job or restore to access |

## Check yourself

A log source is valuable for compliance but almost never used for active hunting. Which
retention/storage concept from this lesson fits it best, and why would interactive retention be
the wrong (expensive) choice for it?
