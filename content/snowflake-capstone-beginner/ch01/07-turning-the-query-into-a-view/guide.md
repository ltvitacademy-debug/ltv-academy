# Lesson 7 — Turning the Query Into a View

**Chapter 1 · Beginner Capstone: The First Support Ticket Report · Lesson 7 of 10**

## What you'll learn

- How to wrap the summary query from Lesson 5 in `CREATE VIEW`, and why that matters for
  Power BI specifically
- How to finish the RBAC grant chain from Lesson 6 now that the object it points to exists
- Why a view, and not a materialized table, is the right choice for this project

## Why a view, not a table

A table would need to be refreshed — re-run and overwritten — every time new tickets load. A
view has no stored data of its own; it re-runs its underlying query every time something reads
it, so it's always current with whatever's in `RAW_TICKETS` at that moment, with zero extra
refresh logic to maintain. For a project this size, that's strictly simpler, and "simpler" wins
when nothing demands otherwise.

## Creating the view

```sql
CREATE OR REPLACE VIEW DRIFTWOOD_ANALYTICS.SUPPORT.VW_DAILY_TICKET_SUMMARY AS
SELECT
  DATE_TRUNC('DAY', CREATED_AT)::DATE AS TICKET_DATE,
  PRIORITY,
  COUNT(*) AS TICKET_COUNT
FROM DRIFTWOOD_ANALYTICS.SUPPORT.RAW_TICKETS
WHERE DATE_TRUNC('MONTH', CREATED_AT) = DATE_TRUNC('MONTH', CURRENT_DATE())
GROUP BY TICKET_DATE, PRIORITY
ORDER BY TICKET_DATE, PRIORITY;
```

`CREATE OR REPLACE` means re-running this statement later, after a tweak to the query, just
updates the view in place — nobody has to drop it first or re-point anything that already
queries it.

## Finishing the grant chain

Lesson 6 set up every grant this role needed *except* the one that couldn't exist yet: access
to this specific view. Now that it's real:

```sql
GRANT SELECT ON VIEW DRIFTWOOD_ANALYTICS.SUPPORT.VW_DAILY_TICKET_SUMMARY
  TO ROLE DRIFTWOOD_SUPPORT_ANALYST;
```

With this grant in place, `DRIFTWOOD_SUPPORT_ANALYST` can finally query
`VW_DAILY_TICKET_SUMMARY` end to end: warehouse, database, schema, and now the object itself.

## Proving it works

```sql
USE ROLE DRIFTWOOD_SUPPORT_ANALYST;
USE WAREHOUSE SUPPORT_WH;
SELECT * FROM DRIFTWOOD_ANALYTICS.SUPPORT.VW_DAILY_TICKET_SUMMARY;
```

Switching into the role and querying the view directly is the real test — not "did the GRANT
statement run without an error," but "can this specific role actually see this specific data."
If this returns rows, Power BI (Lesson 8) will too, once it connects with the same role.

## Key terms

| Term | Meaning |
|---|---|
| View | A saved query with no stored data of its own — it re-runs against current data every time it's read |
| `CREATE OR REPLACE VIEW` | Updates an existing view's definition in place, without needing to drop it first |
| `USE ROLE` | Switches the current session to act as a specific role, for testing exactly what that role can see |

## Lab

Create the view, run the grant, then switch to `DRIFTWOOD_SUPPORT_ANALYST` and query the view
directly. Then try querying `RAW_TICKETS` directly while still in that role — confirm it fails.

## Check yourself

Why does testing access by actually switching roles and querying matter more than just checking
that every `GRANT` statement ran without an error?
