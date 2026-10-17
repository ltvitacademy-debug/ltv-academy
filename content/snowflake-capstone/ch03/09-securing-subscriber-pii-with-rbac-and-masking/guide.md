# Securing Subscriber PII With RBAC and Masking

Driftwood's raw billing data includes subscriber email addresses — genuine PII that most people
with access to this platform have no legitimate reason to see in plain text. This lesson applies
the Snowflake course's own RBAC and masking lessons to that real column, not a hypothetical one.

## What you'll learn

- The role hierarchy this capstone actually uses, and who gets what
- A real masking policy protecting `dim_subscribers.email`, following the Snowflake course's own
  pattern
- Why masking, not just restricting table access outright, is the right tool here

## The role hierarchy

```
DRIFTWOOD_TRANSFORMER   -- dbt/Airflow service account. Read raw, write staging/intermediate/marts.
                            Sees email in plain text (it needs to, to build the pipeline) but is
                            a service account, not a person browsing data casually.

DRIFTWOOD_ANALYST       -- human analysts and Power BI's service account. Read-only on marts only.
                            Sees email MASKED.

DRIFTWOOD_COMPLIANCE    -- a small group with a real, specific need to see unmasked subscriber
                            contact info (e.g. responding to a data-deletion request). Sees email
                            UNMASKED.
```

This mirrors the Snowflake course's own least-privilege RBAC lessons: each role gets exactly what
its function requires, not broad access "to be safe" or out of convenience.

## A real masking policy on `dim_subscribers.email`

```sql
CREATE MASKING POLICY driftwood_analytics.marts.email_mask
  AS (val STRING) RETURNS STRING ->
  CASE
    WHEN CURRENT_ROLE() IN ('DRIFTWOOD_COMPLIANCE', 'DRIFTWOOD_TRANSFORMER') THEN val
    ELSE REGEXP_REPLACE(val, '^(.)[^@]*(@.*)$', '\\1***\\2')
  END;

ALTER TABLE driftwood_analytics.marts.dim_subscribers
  MODIFY COLUMN email
  SET MASKING POLICY driftwood_analytics.marts.email_mask;
```

`DRIFTWOOD_COMPLIANCE` and `DRIFTWOOD_TRANSFORMER` see the real address; every other role —
including `DRIFTWOOD_ANALYST`, which is the role Power BI's own service account connects as —
sees `j***@example.com` instead of `jane.doe@example.com`. The masking happens at query time,
following the same `CASE ... CURRENT_ROLE() ...` pattern the Snowflake course's masking lesson
teaches: the stored value never changes, and the exact same `SELECT email FROM dim_subscribers`
returns a different result depending purely on who's running it.

## Why masking, not just blocking table access entirely

A simpler-sounding approach — just don't grant `DRIFTWOOD_ANALYST` any access to the `email`
column at all — would also "protect" the data, but it breaks differently and worse: any report or
query that happens to `SELECT *` instead of naming columns explicitly would error out entirely for
that role, rather than quietly returning a masked value and continuing to work. Masking lets the
column exist in every query's result set — Power BI can still show "contactable: yes/no" logic
derived from whether the field is populated, for instance — while the actual sensitive value
itself never reaches an unauthorized viewer. It's a materially different failure mode: a query
that breaks loudly versus a dashboard that keeps working with the sensitive value correctly
hidden.

## Key terms

| Term | Meaning |
|---|---|
| `DRIFTWOOD_COMPLIANCE` | The role with a real, specific need to see unmasked subscriber PII |
| Masking vs. access restriction | Masking lets a query succeed with a hidden value; restricting access entirely breaks any query referencing that column |
| Query-time masking | The stored email value never changes; Snowflake substitutes the masked version only as results return |

## Check yourself

Why does masking the `email` column behave more gracefully for a broad `SELECT *` report than
simply not granting `DRIFTWOOD_ANALYST` any privilege on that column at all?
