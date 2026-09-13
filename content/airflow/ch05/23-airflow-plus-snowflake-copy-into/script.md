# Script — Airflow + Snowflake COPY INTO

## Segment 1 (title)

You already know COPY INTO from the Snowflake course — the statement that loads staged files into a table. The only thing that changes here is what runs it: an Airflow task, on a schedule, instead of a worksheet you run by hand.

## Segment 2 (code: the operator)

Airflow's Snowflake provider used to ship a dedicated SnowflakeOperator. Its own current docs have replaced that page with SQLExecuteQueryOperator — the same general-purpose SQL operator used for any database, pointed at a Snowflake connection. If a tutorial still shows SnowflakeOperator, it's outdated.

## Segment 3 (steps: Airflow vs Snowpipe)

This sits next to Snowpipe, which you already know. Snowpipe: files arrive unpredictably, loaded within seconds automatically, no scheduler involved. Airflow plus scheduled COPY INTO: predictable batches, and the load is one coordinated step in a larger pipeline — check, load, then trigger dbt.

## Segment 4 (code: the DAG)

copy_into_orders, a SQLExecuteQueryOperator, with a Snowflake conn_id and a sql file pointing at the real COPY INTO statement, on an hourly schedule. Nothing new mechanically — a real COPY INTO instead of a placeholder.

## Segment 5 (outro)

Next lesson: error handling and retries — what happens, and what should happen, when a task like this one fails.
