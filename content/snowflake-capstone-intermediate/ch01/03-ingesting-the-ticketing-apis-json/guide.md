# Lesson 3 — Ingesting the Ticketing API's JSON

**Chapter 1 · Intermediate Capstone: Support and Finance, One Shared Model · Lesson 3 of 16**

## What you'll learn

- The real shape of the ticketing API's JSON export
- Creating a table with a `VARIANT` column to hold semi-structured data untouched
- The real `COPY INTO ... FILE_FORMAT = (TYPE = JSON)` loading syntax
- Why you land raw JSON exactly as-is before extracting a single field from it

## What the ticketing API actually exports

Unlike the Beginner project's flat CSV, the ticketing API exports one JSON document per ticket
event — a ticket being opened, or later updated with a new status or a refund. A single export
file looks like this, one JSON object per line:

```json
{"ticket_id": "T-10482", "subscriber_id": 55231, "category": "billing", "priority": "high", "status": "resolved", "opened_at": "2026-03-02T14:08:00Z", "updated_at": "2026-03-04T09:15:00Z", "refund_amount": 12.99}
{"ticket_id": "T-10483", "subscriber_id": 55309, "category": "playback", "priority": "low", "status": "open", "opened_at": "2026-03-02T15:40:00Z", "updated_at": null, "refund_amount": null}
```

Notice `refund_amount` is `null` on most rows — most tickets never involve a refund at all. That's
expected and important: Finance's view (Lesson 8) only cares about the rows where it isn't.

## Why land it raw first, instead of parsing on the way in

It's tempting to try to extract fields the moment the file lands. Don't. The standard, reliable
Snowflake pattern is to land semi-structured data exactly as the source sent it, in a `VARIANT`
column, and parse it afterward with ordinary `SELECT` statements. That separation means a change
in the source JSON's shape — a renamed field, a new one added — never breaks the load step itself;
it only affects the parsing step, which is easy to fix and re-run without touching how data gets
into Snowflake in the first place.

## Creating the raw table

```sql
CREATE OR REPLACE TABLE driftwood_analytics.raw.tickets_api_raw (
    raw_payload  VARIANT,
    loaded_at    TIMESTAMP_NTZ DEFAULT CURRENT_TIMESTAMP()
);
```

One column, `raw_payload`, typed `VARIANT` — Snowflake's native type for JSON, Avro, and other
semi-structured data. `loaded_at` is an ordinary timestamp, useful later for troubleshooting when
something landed.

## Loading the JSON with COPY INTO

```sql
COPY INTO driftwood_analytics.raw.tickets_api_raw (raw_payload)
FROM @driftwood_raw_stage/tickets_api/
FILE_FORMAT = (TYPE = JSON)
ON_ERROR = 'ABORT_STATEMENT';
```

This is the same real `COPY INTO` command this capstone's Advanced tier uses to load billing and
usage events — the only difference is `FILE_FORMAT = (TYPE = JSON)` instead of `TYPE = CSV`.
Snowflake reads each JSON object in the stage and inserts it as one row's `raw_payload` value,
with no flattening or guessing about structure. `ON_ERROR = 'ABORT_STATEMENT'` means a single
malformed line fails the whole load loudly, instead of silently skipping a bad row and leaving you
to discover it's missing later.

## Checking what actually landed

```sql
SELECT raw_payload, loaded_at
FROM driftwood_analytics.raw.tickets_api_raw
ORDER BY loaded_at DESC
LIMIT 10;
```

Snowsight renders a `VARIANT` column as readable JSON in the results grid — worth a look before
moving on, to confirm the fields you expect (`ticket_id`, `refund_amount`, and the rest) are
actually present in what landed, not just assumed from the sample above.

## Key terms

| Term | Meaning |
|---|---|
| VARIANT | Snowflake's native type for holding semi-structured data (JSON, Avro, XML) untouched |
| Land raw, parse later | Loading source data exactly as received, then extracting fields in a separate step |
| `ON_ERROR = 'ABORT_STATEMENT'` | A COPY INTO option that fails the whole load on any bad row, rather than skipping it silently |

## Lab

Write the `CREATE TABLE` and `COPY INTO` statements above against your own Snowflake trial account,
substituting a stage and file location you control (or a small JSON file you upload directly).
Run the `SELECT` to confirm the raw JSON landed, and note which fields are `null` on which rows —
you'll need that same observation again in Lesson 4.

## Check yourself

You're ready for Lesson 4 when you can answer, without looking: why does this pipeline land the
ticketing API's JSON untouched in a `VARIANT` column, instead of trying to extract `ticket_id` and
`refund_amount` into their own columns during the `COPY INTO` step itself?
