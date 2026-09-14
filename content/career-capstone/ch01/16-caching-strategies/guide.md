# Lesson 16 — Caching Strategies for Analytics

**Chapter 1 · System Design for Data Engineers · Lesson 16 of 81**

## What you'll learn

- What's actually being cached in an analytics system, concretely
- Materialized views and pre-aggregation as a caching strategy
- Result-set caching vs. pre-aggregation — a real distinction
- Why invalidation, not storage, is the genuinely hard part

## What's actually being cached

Lesson 15 listed cache as one of four serving layer options. A
**cache**, here, means storing the *result* of expensive work
somewhere fast to read, so a repeat request doesn't redo that work.
Fabric Lesson 12's Import mode is a form of this: Power BI's own
compressed copy is a cache of gold, refreshed on a schedule rather
than recomputed on every report open. Caching isn't a separate
technology bolted on top of a serving layer — it's a property some
serving choices already have built in.

## Materialized views and pre-aggregation as caching

```sql
-- A gold table IS a cache, in exactly this sense
CREATE TABLE gold.daily_revenue AS
SELECT order_date, SUM(total_amount) AS daily_total
FROM FactOrders
GROUP BY order_date;
-- Querying gold.daily_revenue is fast BECAUSE the aggregation
-- already ran once, at write time -- not on every read
```

Databricks & Delta Lake Lesson 30's gold-layer `overwrite` pattern
is, functionally, a caching strategy: the expensive aggregation
(scanning all of `FactOrders`) runs once, on a schedule, and every
read afterward is cheap. A **materialized view** (or a plain gold
table used the same way) is pre-aggregation as caching — trading
write-time compute for read-time speed, the same trade Lesson 15
already framed as the serving layer's whole point.

## Result-set caching vs. pre-aggregation

```text
Pre-aggregation:     compute the answer to a KNOWN, recurring
                       question ahead of time -- "daily revenue by
                       vendor," built into gold itself
Result-set caching:   store the answer to whatever query just ran,
                       keyed by the query itself, for reuse if the
                       SAME query runs again soon
```

These solve different problems. Pre-aggregation (a gold table)
only helps if you knew the question in advance — it's built into
the transformation layer, not bolted onto serving. Result-set
caching helps with genuinely ad hoc queries, at the cost of only
paying off if the *exact same* query (or one close enough) actually
repeats — a dashboard with five people looking at the same filters
benefits; a data scientist running one-off exploratory queries
mostly doesn't.

## Invalidation — the genuinely hard part

```text
Question that actually matters:
  "Gold refreshed 6 hours ago. Is the cached dashboard answer
   still correct, or now stale?"
```

Storing a cached result is the easy half. **Invalidation** —
knowing when a cached answer has gone stale and needs recomputing
— is where real caching designs actually fail. A cache that's
never invalidated serves confidently wrong numbers forever; a cache
invalidated too aggressively defeats its own purpose by
recomputing constantly. This is exactly why Lesson 14's
transformation-layer refresh cadence (how often gold itself
updates) and the cache's own invalidation policy have to be
designed together, not separately.

## Staleness tolerance vs. freshness SLA

```text
"This dashboard's numbers can be up to 1 hour stale" -- a real,
explicit staleness tolerance, not an accident
"This alert needs data within 30 seconds" -- a real freshness SLA
that a cache refreshed hourly cannot possibly satisfy
```

Every caching decision is really a bet on how much staleness a
consumer will actually tolerate — a bet that has to be made
explicitly, as a number, not left implicit. Lesson 18 covers
designing for freshness SLAs directly; this lesson's real takeaway
is that caching strategy and freshness requirements are the same
design decision viewed from two different layers, and getting one
wrong without checking the other is how a dashboard ends up
confidently showing yesterday's numbers as today's.

## Key terms

| Term | Meaning |
|---|---|
| Cache (in analytics) | Storing an expensive result somewhere fast to read, so it isn't redone |
| Pre-aggregation | Computing a known, recurring answer ahead of time — a gold table, functionally |
| Result-set caching | Storing a specific query's answer, keyed by the query, for reuse if it repeats |
| Invalidation | Knowing when a cached answer has gone stale — the genuinely hard part |

## Check yourself

You're ready for Lesson 17 when you can explain, without looking: why
is a gold table itself a form of caching, in the same sense as a
Power BI Import-mode refresh?
