# Disaster Recovery With Time Travel and Fail-Safe

AWS Capstone's own disaster-recovery lesson names an honest RPO/RTO for a nightly batch pipeline.
Driftwood's platform needs the same honesty — but Snowflake gives you a genuinely different,
built-in recovery mechanism to reason about instead of restoring from a separate backup.

## What you'll learn

- Why `DRIFTWOOD_ANALYTICS` uses permanent tables, not transient — a real, deliberate choice tied
  directly to this lesson's recovery requirement
- What Time Travel and Fail-safe actually recover, using the Snowflake course's own retention
  numbers
- Driftwood's honest recovery scenarios: a bad dbt model, an accidental `DROP TABLE`, and what
  neither Time Travel nor Fail-safe protects against

## Why the marts are permanent tables, not transient

Lesson 2's architecture didn't specify table types explicitly — this lesson is where that
decision gets made deliberately, following the Snowflake course's own comparison:

| Table type | Fail-safe | Time Travel | Used for in this capstone |
|---|---|---|---|
| Permanent | 7 days | 1–90 days | `raw.*`, `staging.*`, `marts.*` — anything recovering from a mistake matters for |
| Transient | None | 0–1 day | Nothing in this project — Driftwood's data isn't reproducible from a source system on demand the way a cache would be |

Unlike a pure reload-from-source staging table (the classic case for `TRANSIENT`), Driftwood's
raw tables are themselves the only copy of a given day's billing export once the source file is
gone — there's no guaranteed way to re-pull yesterday's exact export from the billing platform a
week later. That single fact is what justifies paying for permanent tables' full recovery window
everywhere in this project, not just on the marts.

## Recovering from a bad dbt model with Time Travel

```sql
-- A dbt model ran with a bug and overwrote marts.dim_subscribers with wrong data.
-- Query the table as it existed 2 hours ago, before the bad run:
SELECT *
FROM driftwood_analytics.marts.dim_subscribers
  AT (OFFSET => -7200);

-- Confirmed good -- restore it:
CREATE OR REPLACE TABLE driftwood_analytics.marts.dim_subscribers
  CLONE driftwood_analytics.marts.dim_subscribers AT (OFFSET => -7200);
```

This is Driftwood's single most likely real incident: not a catastrophic data loss, but a bad
model overwriting a table with wrong-but-plausible-looking data. Time Travel's `AT (OFFSET => ...)`
syntax queries the table as it existed at a past point directly — no separate backup system, no
restore request, just a SQL query against the same table.

## Recovering from an accidental DROP with UNDROP

```sql
-- Someone ran DROP TABLE on the wrong environment
DROP TABLE driftwood_analytics.marts.fct_subscriptions;

-- Within the Time Travel window, this reverses it completely:
UNDROP TABLE driftwood_analytics.marts.fct_subscriptions;
```

`UNDROP` only works inside the Time Travel window — for `DRIFTWOOD_ANALYTICS` with a 1-day
retention (Lesson 11's `data_retention_time_in_days = 1`), that's a same-day recovery only. If
`UNDROP`'s window has already passed, Fail-safe's 7 additional days still hold the data, but
recovering from Fail-safe requires contacting Snowflake support directly — it exists for genuine
disaster recovery, not routine mistake-correction, which is exactly why Time Travel's
self-service window is the thing actually worth tuning (via `data_retention_time_in_days`) rather
than relied-upon Fail-safe as if it were a convenient undo button.

## What neither mechanism protects against

Time Travel and Fail-safe both recover the state of a table — they do nothing for a mistake in
the *source* data itself. If Driftwood's billing platform sends a corrupted export and the
pipeline's own validation (Lesson 3's `VALIDATION_MODE` check) doesn't catch it, Time Travel can
restore the table to exactly how it looked yesterday — which was built from that same corrupted
export. This is why Lesson 3's load validation and Lesson 5's dbt tests exist as a separate layer
of defense: Snowflake's recovery mechanisms protect against a bad *operation* on correct data, not
bad data arriving in the first place.

## Key terms

| Term | Meaning |
|---|---|
| `AT (OFFSET => ...)` | Queries a table as it existed at a specific point in the past, within the Time Travel window |
| `UNDROP TABLE` | Reverses a DROP TABLE, only within the Time Travel window |
| Fail-safe | A 7-day, support-only recovery window after Time Travel ends — for genuine disaster recovery, not routine mistakes |

## Check yourself

Why doesn't Time Travel protect Driftwood against a corrupted billing export that passed through
the pipeline unnoticed — what specifically would it be able to restore, and what wouldn't it fix?
