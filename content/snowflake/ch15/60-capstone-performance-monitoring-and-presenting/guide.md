# Lesson 60 — Capstone: Performance, Monitoring & Presenting Your Project

**Chapter 15 · End-to-End Capstone Project · Lesson 60 of 60 — Final Lesson**

## What you'll learn

- The last milestone: a real performance decision, a working Power BI
  connection, and a walkthrough you can actually give
- What to point at, and in what order, when presenting this project
- The specific questions this project should make you ready to answer
- Where this course's skills fit going forward

## Apply real performance tuning

Not a checklist of every optimization from Chapter 10 — one real,
justified decision, backed by evidence you actually looked at:

```sql
-- Start with evidence, not a guess
SELECT query_id, total_elapsed_time, bytes_scanned, partitions_scanned
FROM TABLE(INFORMATION_SCHEMA.QUERY_HISTORY())
WHERE query_text ILIKE '%fact_orders%'
ORDER BY total_elapsed_time DESC
LIMIT 5;
```

If `partitions_scanned` is high relative to `partitions_total` for a
query that always filters on the same column (a date range, most
commonly), that's your justification for a clustering key (Ch. 45):

```sql
ALTER TABLE warehouse.fact_orders CLUSTER BY (order_date);
```

If the bottleneck is instead warehouse queueing under concurrent load
(Ch. 46, and Lesson 55's `WAREHOUSE_LOAD_HISTORY`), the fix is sizing
or multi-cluster scaling, not clustering — the point of checking
Query Profile first is picking the *right* one of these, not applying
all of them out of habit.

## Connect Power BI, deliberately

Not "whichever mode happened to connect first" — a real choice between
Import and DirectQuery (Ch. 50), against your reporting views (Ch. 51),
not the raw or staging layer:

- **Import** if your reporting tables are a size Power BI can hold
  comfortably and near-real-time freshness doesn't matter — you get
  full DAX performance with no Snowflake compute cost per report open.
- **DirectQuery** if the data changes fast enough (fed by your
  Lesson 59 Streams/Tasks pipeline) that Import's refresh lag would
  show stale numbers, and you're comfortable with per-query Snowflake
  compute cost.

Whichever you choose, be able to say *why* — that one sentence is
worth more in an interview than the connection itself.

## What to actually show

A live Snowflake account and a live Power BI report are more
convincing than a slide deck. Walk through it in this order:

1. **The raw → staging → warehouse layering** — thirty seconds proving
   you know why each layer exists, not just that tables exist.
2. **The dimensional model** — the surrogate key join, and the SCD
   Type 2 dimension, explained in one sentence each.
3. **`TASK_HISTORY` showing real incremental runs** — proof the
   pipeline actually keeps itself current, not a one-time load.
4. **`SHOW GRANTS` on your analyst role** — proof the RBAC boundary is
   real, not just declared.
5. **The Query Profile evidence behind your one performance
   decision** — and the decision itself.
6. **The Power BI report**, with your Import/DirectQuery choice
   explained.

## Questions this project should prepare you for

- "Walk me through what happens when a new file lands, end to end."
  Pipe → Stream → Task → fact table (Lesson 56) — you should answer
  this without looking anything up.
- "Why does your fact table use a surrogate key instead of the
  natural key?" — SCD Type 2 history, from Lesson 59.
- "How do you know your analyst role can't see raw data?" —
  `SHOW GRANTS`, not "I'm pretty sure I set that up right."
- "Why Import or DirectQuery, specifically for this data?" — a direct
  callback to Chapter 12, now answerable about a project you actually
  built and can defend.

## Where this fits going forward

Nothing in this course was really about Snowflake syntax in isolation
— it was about a real workflow: raw data of different shapes arrives,
gets loaded honestly, modeled so history isn't lost, kept current
without manual intervention, secured so the wrong role can't see the
wrong data, and made fast enough and connected well enough that
someone in Power BI trusts the number. That workflow transfers to any
warehouse platform.

If you're on the Analytics Engineer path, the course that follows this
one — **dbt** — takes the transformation layer you just hand-built in
SQL (staging, the star schema, the `MERGE` logic) and shows you how a
real dbt project organizes, tests, and version-controls that exact
same work instead of leaving it in ad hoc scripts.

## Key terms

| Term | Meaning |
|---|---|
| Evidence-backed tuning | One performance decision, justified by Query Profile data you actually looked at |
| Presentation order | Layering → model → TASK_HISTORY → SHOW GRANTS → performance evidence → Power BI |
| What transfers | The workflow (load honestly, model with history, automate, secure, connect) — not just Snowflake's specific syntax |

## Lab

1. Find one real slow or expensive query against your fact table using
   `QUERY_HISTORY`, and make one justified tuning decision — write
   down the evidence and the decision in one sentence each.
2. Connect Power BI to your reporting layer and write one sentence
   explaining your Import/DirectQuery choice for this specific data.
3. Practice the six-step walkthrough above, out loud, against your own
   project, in under five minutes.

## Check yourself

This course is complete when you can walk a stranger through your
capstone account end to end — layering, model, automation, security,
performance, and Power BI — and answer all four interview questions
above without hesitation.
