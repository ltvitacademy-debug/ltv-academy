# Lesson 48 — Resource Monitors: Preventing Runaway Compute Costs

**Chapter 11 · Cost Management · Lesson 48 of 60**

## What you'll learn

- What a `RESOURCE MONITOR` is and the three things it can do when a
  spending threshold is crossed
- The exact `CREATE RESOURCE MONITOR` syntax — quota, frequency, triggers
- How to attach a monitor to a warehouse (or the whole account)
- A complementary, query-level safeguard: statement timeouts

## Credit quotas that actually enforce themselves

Lesson 47 ended on "a few warehouses do all the spending, and nobody's
looked." A **resource monitor** is Snowflake's answer to "nobody's
looked" — a credit budget attached to one or more warehouses (or the
whole account) that watches consumption and takes action automatically
when it crosses thresholds you define, with no human checking a
dashboard required.

```sql
CREATE OR REPLACE RESOURCE MONITOR tb_test_rm
WITH
    CREDIT_QUOTA = 100                 -- credits allowed this period
    FREQUENCY = monthly                -- resets automatically each month
    START_TIMESTAMP = immediately
    TRIGGERS
        ON 75 PERCENT DO NOTIFY               -- email account admins at 75%
        ON 100 PERCENT DO SUSPEND             -- stop new queries, let running ones finish
        ON 110 PERCENT DO SUSPEND_IMMEDIATE;  -- cancel everything right now
```

Run for real, that statement does exactly what it says:

![A Snowsight worksheet: the CREATE OR REPLACE RESOURCE MONITOR statement with CREDIT_QUOTA, FREQUENCY, START_TIMESTAMP, and three TRIGGERS clauses at 75/100/110 percent, with the results panel below showing "Resource monitor TB_TEST_RM successfully created."](/courses/snowflake/ch11/48-resource-monitors-preventing-runaway-compute-costs/create-resource-monitor.png)
*A resource monitor is just DDL — CREATE it once, and Snowflake enforces the thresholds itself from then on.*
Source: [Snowflake Quickstarts — Tasty Bytes: Zero to Snowflake, Cost Management](https://quickstarts.snowflake.com/guide/tasty_bytes_zero_to_snowflake_cost_management/index.html)

## The three trigger actions, and why order matters

| Action | What actually happens |
|---|---|
| `NOTIFY` | Sends an email/webhook alert to account admins — nothing stops running |
| `SUSPEND` | Blocks new queries from starting; queries already running are allowed to finish |
| `SUSPEND_IMMEDIATE` | Blocks new queries **and** cancels everything already running, right now |

The layered pattern in the example — notify early, suspend gracefully
at 100%, suspend immediately as a hard stop past that — is the
standard shape: a warning with no disruption, then a soft stop that
doesn't kill in-flight work, then a true circuit breaker if the soft
stop wasn't enough.

## Attaching a monitor to a warehouse

Creating a resource monitor does nothing on its own until it's
attached. Attach it to one warehouse, several, or the whole account:

```sql
-- One warehouse
ALTER WAREHOUSE tb_test_wh SET RESOURCE_MONITOR = tb_test_rm;

-- The entire account (every warehouse without its own monitor)
ALTER ACCOUNT SET RESOURCE_MONITOR = tb_test_rm;
```

Creating and attaching a resource monitor requires the `ACCOUNTADMIN`
role (or the `CREATE RESOURCE MONITOR` privilege granted explicitly) —
this is intentionally an admin-level control, not something every
developer role can quietly change on their own warehouse.

## A complementary safeguard: statement timeouts

A resource monitor caps total spend across a period. A **statement
timeout** caps a single query's runtime, which catches a different
failure mode — one runaway query (a missing `WHERE` clause, an
accidental cross join) burning credits for hours before a monthly
quota would ever notice:

![A Snowsight result grid: SHOW PARAMETERS LIKE 'STATEMENT%' IN WAREHOUSE output, listing STATEMENT_QUEUED_TIMEOUT_IN_SECONDS and STATEMENT_TIMEOUT_IN_SECONDS with their current value, default, and description columns.](/courses/snowflake/ch11/48-resource-monitors-preventing-runaway-compute-costs/statement-timeout-parameters.png)
*`SHOW PARAMETERS LIKE 'STATEMENT%' IN WAREHOUSE ...` — the per-query safety net underneath the per-period resource monitor.*
Source: [Snowflake Quickstarts — Tasty Bytes: Zero to Snowflake, Cost Management](https://quickstarts.snowflake.com/guide/tasty_bytes_zero_to_snowflake_cost_management/index.html)

```sql
ALTER WAREHOUSE tb_test_wh SET STATEMENT_TIMEOUT_IN_SECONDS = 1800; -- 30 min hard cap per query
```

Resource monitors and statement timeouts aren't competing tools — a
resource monitor is the budget for the whole warehouse over a month;
a statement timeout is the leash on any one query that day.

## Key terms

| Term | Meaning |
|---|---|
| Resource monitor | A credit-quota object attached to warehouse(s)/account that triggers actions at thresholds |
| `CREDIT_QUOTA` | The credit budget for the monitor's period |
| `NOTIFY` / `SUSPEND` / `SUSPEND_IMMEDIATE` | The three trigger actions, from a warning to a hard stop |
| Statement timeout | A per-query runtime cap, independent of the resource monitor's period budget |

## Lab

1. Create a resource monitor with a small `CREDIT_QUOTA` (e.g. 10),
   `FREQUENCY = monthly`, and triggers at 75% NOTIFY, 100% SUSPEND,
   110% SUSPEND_IMMEDIATE.
2. Attach it to one of your warehouses with `ALTER WAREHOUSE ... SET
   RESOURCE_MONITOR = ...`.
3. Run `SHOW RESOURCE MONITORS;` and confirm your monitor and its
   attached warehouse both appear.
4. Set a `STATEMENT_TIMEOUT_IN_SECONDS` on the same warehouse and
   verify it with `SHOW PARAMETERS LIKE 'STATEMENT%' IN WAREHOUSE ...`.

## Check yourself

You're ready for Lesson 49 when you can write a `CREATE RESOURCE
MONITOR` statement with a quota and layered triggers from memory, and
explain the difference between `SUSPEND` and `SUSPEND_IMMEDIATE`
without looking it up.
