# Script — Connecting to Snowflake & Other Databases

## Segment 1 (title)

Connections, Hooks, and provider packages are three separate pieces. Connecting Airflow to Snowflake is just those three used together — nothing new conceptually, only the specific fields Snowflake needs.

## Segment 2 (steps: what goes in a Snowflake Connection)

You already know Snowflake's own vocabulary — account, warehouse, database, role — from the Snowflake course. Airflow's Snowflake Connection asks for that same information: login and password in the standard fields, account, warehouse, database, and role in the Extra JSON field.

## Segment 3 (code: SnowflakeOperator DAG)

Here's a real DAG: every day at six AM, this task connects using snowflake_default and rebuilds a summary table with plain SQL — the same CREATE OR REPLACE TABLE AS SELECT you'd run by hand, now scheduled and tracked by Airflow.

## Segment 4 (code: SnowflakeHook for custom logic)

SnowflakeOperator covers "run this SQL." When a task needs to check a result before deciding what happens next, drop down to SnowflakeHook directly — same Connection, same account, just more control: here, failing the task early if no orders landed today.

## Segment 5 (steps: what's the same, what's new)

The SQL doesn't change — it's the exact account, warehouse, and role model you already learned. What's new is referencing it by conn_id and letting Airflow schedule and retry it, instead of running it by hand or from a separate cron job.

## Segment 6 (outro)

Next lesson: Sensors — a special kind of task that waits for a condition before continuing, rather than running immediately.
