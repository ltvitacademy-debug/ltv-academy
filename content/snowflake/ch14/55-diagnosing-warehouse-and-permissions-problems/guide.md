# Lesson 55 — Diagnosing Warehouse & Permissions Problems

**Chapter 14 · Monitoring & Troubleshooting · Lesson 55 of 60**

## What you'll learn

- Three real failure modes that account for most "it just doesn't
  work" tickets: a suspended/queued warehouse, a missing privilege,
  and a resource monitor shutdown
- The exact diagnostic SQL for each, not just where to click
- How these connect back to warehouses (Ch. 1), RBAC (Ch. 9), and
  resource monitors (Ch. 11)

## Failure mode 1: the warehouse is suspended or queued

A query that just sits there, with no error, is almost always a
warehouse problem, not a SQL problem. Two different symptoms look
identical from the user's chair:

- **Suspended**: the warehouse auto-suspended (Ch. 1) and is now
  spinning back up — a few seconds of "starting" delay, then it runs.
- **Queued**: the warehouse is already busy and single-cluster (or at
  its max-cluster limit), so your query is waiting in line.

```sql
SHOW WAREHOUSES LIKE 'ANALYTICS_WH';
-- look at the "state" column: STARTED, SUSPENDED, RESIZING

SELECT start_time, avg_running, avg_queued_load,
       avg_queued_provisioning, avg_blocked
FROM TABLE(INFORMATION_SCHEMA.WAREHOUSE_LOAD_HISTORY(
  warehouse_name => 'ANALYTICS_WH',
  date_range_start => DATEADD(hours, -6, CURRENT_TIMESTAMP())
))
ORDER BY start_time DESC;
```

`WAREHOUSE_LOAD_HISTORY` is the tell: a nonzero `avg_queued_load` means
queries were genuinely waiting on compute, not failing — the fix is
either a bigger warehouse, multi-cluster scaling, or spreading the
workload out, not rewriting the query.

## Failure mode 2: the role doesn't have the privilege

Snowflake's error for this is usually blunt and specific: `SQL access
control error: Insufficient privileges to operate on table 'ORDERS'`.
The fix is never "grant everything" — check exactly what the role
has, and exactly what the object requires:

```sql
-- What can this role currently do?
SHOW GRANTS TO ROLE analyst_role;

-- Who currently has access to this specific object?
SHOW GRANTS ON TABLE reporting.orders;

-- Confirm which role you're actually running as right now
SELECT CURRENT_ROLE();
```

The most common real cause isn't a missing `GRANT` at all — it's the
user running as the **wrong role** for the session (Ch. 9's role
hierarchy means a user can hold a role without it being their
*current* one). Always check `CURRENT_ROLE()` before touching grants.

## Failure mode 3: a resource monitor shut it down

If a warehouse that was working fine yesterday suddenly won't start
today, with no auto-suspend/resize change, check whether it hit a
resource monitor's credit quota (Ch. 11):

```sql
SHOW RESOURCE MONITORS;
-- look at "credit_quota" vs "used_credits", and "suspend_at"/"suspend_immediate_at" actions

SHOW WAREHOUSES LIKE 'LOAD_WH';
-- "state" will show SUSPENDED if a monitor's suspend threshold fired
```

A resource monitor firing isn't a bug — it did its job. The real fix
is deciding whether to raise the quota, wait for the monthly reset, or
split the workload onto a warehouse with its own monitor, not just
turning it off.

## Key terms

| Term | Meaning |
|---|---|
| Queued | A query waiting for warehouse compute to free up, not failing |
| `WAREHOUSE_LOAD_HISTORY` | Table function showing running vs. queued query load over time for a warehouse |
| `SHOW GRANTS TO ROLE` | Lists every privilege a role currently holds |
| Resource monitor shutdown | A warehouse suspended because it hit a configured credit quota, working as designed |

## Lab

1. Run `SHOW WAREHOUSES` and `WAREHOUSE_LOAD_HISTORY` against your own
   warehouse and confirm you can read the `state` and queueing columns.
2. Create a role with no grants on a test table, switch to it, and
   confirm you get the "Insufficient privileges" error — then use
   `SHOW GRANTS ON TABLE` to see what's missing and grant exactly that.
3. Review the resource monitor(s) on your account (or create one from
   Chapter 11's lab) and confirm you can read its quota vs. used
   credits.

## Check yourself

You're ready for Lesson 56 when, given a stalled query, you can tell
within a minute or two whether it's a warehouse queueing problem, a
missing grant, or a resource monitor shutdown — using SQL, not
guesswork.
