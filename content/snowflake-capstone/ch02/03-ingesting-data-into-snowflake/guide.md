# Ingesting Data Into Snowflake

Driftwood Media's billing and usage data doesn't live in Snowflake yet — this lesson gets it
there, reliably, every day, using the pattern that actually fits a once-daily refresh requirement.

## What you'll learn

- Why this capstone uses scheduled batch loading, not Snowpipe, and how that decision follows
  directly from the business requirement in Lesson 1
- The real stage, file format, and `COPY INTO` pattern this pipeline uses
- How load errors get caught instead of silently corrupting the raw tables

## Batch load, not Snowpipe — and why that's the right call here

Chapter 4 of the Snowflake course covers Snowpipe, which loads files continuously, within
seconds of landing in a stage. Driftwood's actual requirement, stated plainly in Lesson 1, is a
**daily** refresh — leadership wants yesterday's numbers each morning, not sub-minute freshness.
Standing up Snowpipe's continuous-loading infrastructure for a once-a-day batch would be solving
a problem Driftwood doesn't have, the same reasoning the AWS Capstone course applies when it
chooses a nightly export over AWS DMS's continuous change-data-capture for a similarly
once-daily requirement. A scheduled `COPY INTO`, triggered once a day by the Airflow DAG
(Lesson 6), is the right-sized tool — simpler to operate, and Snowpipe remains the documented
upgrade path if Driftwood's freshness requirement ever actually changes.

## The stage and file format

Both source exports (billing events, product usage events) land as CSV files in Driftwood's
internal stage, defined once:

```sql
CREATE STAGE driftwood_analytics.raw.driftwood_raw_stage
  FILE_FORMAT = (TYPE = CSV FIELD_OPTIONALLY_ENCLOSED_BY = '"' SKIP_HEADER = 1);
```

Each day's export lands under a date-partitioned path inside the stage, the same date-partitioning
discipline used throughout this catalog's other capstones:

```
@driftwood_raw_stage/billing/dt=2026-10-17/billing_events_2026-10-17.csv
@driftwood_raw_stage/usage/dt=2026-10-17/usage_events_2026-10-17.csv
```

## Loading with COPY INTO

```sql
COPY INTO driftwood_analytics.raw.billing_events
FROM @driftwood_analytics.raw.driftwood_raw_stage/billing/dt=2026-10-17/
FILE_FORMAT = (FORMAT_NAME = driftwood_analytics.raw.csv_format)
ON_ERROR = 'ABORT_STATEMENT';
```

`ON_ERROR = 'ABORT_STATEMENT'` is a deliberate choice: if even one row in the day's file fails to
parse, the whole load is rejected rather than silently loading a partial, inconsistent day's
data into the raw table. For a daily financial/subscriber dataset, a load that fails loudly and
gets investigated is better than one that loads 99% of a file and quietly under-counts that day's
revenue.

## Catching load errors before they become a bad dashboard

```sql
COPY INTO driftwood_analytics.raw.billing_events
FROM @driftwood_analytics.raw.driftwood_raw_stage/billing/dt=2026-10-17/
FILE_FORMAT = (FORMAT_NAME = driftwood_analytics.raw.csv_format)
VALIDATION_MODE = 'RETURN_ERRORS';
```

Running a load in `VALIDATION_MODE` first — a pattern worth knowing from Snowflake's own load
monitoring tooling (Chapter 4) — reports exactly which rows would fail and why, without actually
loading anything. The Airflow DAG in Lesson 6 uses this as a pre-check before the real load, so a
malformed source file surfaces as a specific, early failure instead of a confusing downstream dbt
test failure hours later.

## Key terms

| Term | Meaning |
|---|---|
| Internal stage | Snowflake-managed storage a file lands in before `COPY INTO` loads it into a table |
| `ON_ERROR = 'ABORT_STATEMENT'` | Rejects an entire load if any row fails to parse, rather than loading a partial result |
| `VALIDATION_MODE = 'RETURN_ERRORS'` | Reports what would fail in a load without actually loading any data |

## Check yourself

Why would standing up Snowpipe for Driftwood's daily refresh be solving a problem the business
doesn't actually have — and what's the real cost of defaulting to the more sophisticated tool
anyway?
