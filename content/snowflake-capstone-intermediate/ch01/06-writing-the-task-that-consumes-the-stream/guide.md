# Lesson 6 — Writing the Task That Consumes the Stream

**Chapter 1 · Intermediate Capstone: Support and Finance, One Shared Model · Lesson 6 of 16**

## What you'll learn

- The real `CREATE TASK ... WHEN SYSTEM$STREAM_HAS_DATA(...) AS MERGE INTO ...` pattern
- Why this chapter writes **two** Tasks against the same Stream, each with a different job
- The important difference between an UPDATE-based MERGE and an INSERT-only MERGE
- Why Tasks are created suspended, and what that means before Lesson 7

## The general Task pattern

```sql
CREATE OR REPLACE TASK <task_name>
    WAREHOUSE = DRIFTWOOD_WH
    SCHEDULE = '5 MINUTE'
    WHEN SYSTEM$STREAM_HAS_DATA('raw.tickets_stream')
AS
    MERGE INTO <target_table> ...
```

A Task is just a scheduled wrapper around one SQL statement. The `WHEN` clause is what makes it
efficient: the Task's warehouse only wakes up and the `MERGE` only runs when the Stream actually
has unconsumed data — on a quiet day with no new tickets, the Task's scheduled tick does nothing
at all, and nothing gets billed for it.

## Task 1 — keeping ticket_facts current (Support's table)

```sql
CREATE OR REPLACE TASK driftwood_analytics.raw.ticket_facts_sync_task
    WAREHOUSE = DRIFTWOOD_WH
    SCHEDULE = '5 MINUTE'
    WHEN SYSTEM$STREAM_HAS_DATA('driftwood_analytics.raw.tickets_stream')
AS
    MERGE INTO driftwood_analytics.marts.ticket_facts AS tgt
    USING driftwood_analytics.raw.tickets_stream AS src
        ON tgt.ticket_id = src.raw_payload:ticket_id::STRING
    WHEN MATCHED THEN UPDATE SET
        tgt.status       = src.raw_payload:status::STRING,
        tgt.priority     = src.raw_payload:priority::STRING,
        tgt.category     = src.raw_payload:category::STRING,
        tgt.updated_at   = src.raw_payload:updated_at::TIMESTAMP_NTZ
    WHEN NOT MATCHED THEN INSERT (
        ticket_id, subscriber_id, category, priority, status, opened_at, updated_at
    ) VALUES (
        src.raw_payload:ticket_id::STRING,
        src.raw_payload:subscriber_id::NUMBER,
        src.raw_payload:category::STRING,
        src.raw_payload:priority::STRING,
        src.raw_payload:status::STRING,
        src.raw_payload:opened_at::TIMESTAMP_NTZ,
        src.raw_payload:updated_at::TIMESTAMP_NTZ
    );
```

This is a true **upsert**: `ticket_facts` keeps exactly one row per ticket, always reflecting its
latest known state. If this same `MERGE` happened to run twice against the same change rows, the
`UPDATE SET` branch would just set each column to the same value a second time — the result is
identical either way. That property has a name: this `MERGE` is **idempotent**. Hold onto that
word; it matters in two lessons.

## Task 2 — appending refund events (Finance's table)

```sql
CREATE OR REPLACE TASK driftwood_analytics.raw.finance_refund_task
    WAREHOUSE = DRIFTWOOD_WH
    SCHEDULE = '5 MINUTE'
    WHEN SYSTEM$STREAM_HAS_DATA('driftwood_analytics.raw.tickets_stream')
AS
    MERGE INTO driftwood_analytics.marts.refund_events AS tgt
    USING driftwood_analytics.raw.tickets_stream AS src
        ON tgt.ticket_id = src.raw_payload:ticket_id::STRING
        AND tgt.updated_at = src.raw_payload:updated_at::TIMESTAMP_NTZ
    WHEN NOT MATCHED AND src.raw_payload:refund_amount::NUMBER(10,2) IS NOT NULL THEN INSERT (
        ticket_id, subscriber_id, refund_amount, updated_at
    ) VALUES (
        src.raw_payload:ticket_id::STRING,
        src.raw_payload:subscriber_id::NUMBER,
        src.raw_payload:refund_amount::NUMBER(10,2),
        src.raw_payload:updated_at::TIMESTAMP_NTZ
    );
```

Notice this one has **no `WHEN MATCHED` branch at all** — only `WHEN NOT MATCHED ... THEN INSERT`.
That's deliberate: `refund_events` is append-only by design (Lesson 2), logging each distinct
refund event rather than overwriting a row in place. But that design choice has a real cost: this
`MERGE` is **not idempotent**. If the exact same stream rows somehow got fed into it twice before
either run's `WHEN NOT MATCHED` check could see the other's newly-inserted row, both runs could
each insert a matching event — and the ledger would hold two rows for what was really one refund.

## Why both Tasks query the same Stream

Both Tasks share `tickets_stream` as their source — one Stream, two independent consumers, each
doing its own job on its own copy of "what's new." Snowflake does support this; a Stream's offset
tracks what *that specific querying transaction* has and hasn't seen, and multiple DML statements
can reference the same Stream. What it does **not** protect you from is two Tasks both trying to
read the same not-yet-advanced data in overlapping windows — which is exactly the scenario Lesson
13 surfaces.

## Tasks start suspended

A newly created Task does not run on its schedule immediately — it's created in a `SUSPENDED`
state by default, as a deliberate safety default. Confirm this:

```sql
SHOW TASKS LIKE '%ticket%' IN SCHEMA driftwood_analytics.raw;
```

Both Tasks above will show `state = suspended`. Lesson 7 resumes them.

## Key terms

| Term | Meaning |
|---|---|
| Idempotent | Running the same operation twice produces the same result as running it once |
| Upsert | A MERGE with both a MATCHED (update) and NOT MATCHED (insert) branch |
| Append-only MERGE | A MERGE with only a NOT MATCHED (insert) branch, no update branch |

## Lab

Write both `CREATE TASK` statements above against your own Snowflake trial account (create
`ticket_facts` and `refund_events` as empty target tables first, matching the columns referenced).
Run `SHOW TASKS` and confirm both show `state = suspended`. In your own words, write one sentence
explaining why `ticket_facts_sync_task`'s MERGE is idempotent and `finance_refund_task`'s is not.

## Check yourself

You're ready for Lesson 7 when you can answer, without looking: which of this lesson's two Tasks
would silently tolerate being accidentally run twice against the same Stream data, and which one
would not — and why?
