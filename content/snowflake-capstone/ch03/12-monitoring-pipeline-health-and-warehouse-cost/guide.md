# Monitoring Pipeline Health and Warehouse Cost

A pipeline that works today and a pipeline someone can trust next month are different things. This
lesson adds the two kinds of monitoring Driftwood's platform actually needs: knowing when the
daily run breaks, and knowing before the warehouse bill becomes a surprise.

## What you'll learn

- A real Snowflake resource monitor guarding `DRIFTWOOD_ETL_WH` against runaway cost
- How Airflow alerting surfaces a failed `driftwood_daily_elt` run the same morning it happens
- Where to actually look first when the dashboard shows a number that looks wrong

## A resource monitor on the ETL warehouse

```sql
CREATE RESOURCE MONITOR driftwood_etl_monitor
  WITH CREDIT_QUOTA = 50
  FREQUENCY = MONTHLY
  START_TIMESTAMP = IMMEDIATELY
  TRIGGERS
    ON 75 PERCENT DO NOTIFY
    ON 100 PERCENT DO SUSPEND;

ALTER WAREHOUSE driftwood_etl_wh
  SET RESOURCE_MONITOR = driftwood_etl_monitor;
```

A 50-credit monthly quota is a deliberately generous ceiling for a once-daily batch job — the
point isn't to constrain normal operation, it's to catch the specific failure mode of a runaway
query (a bad join that explodes row counts, a warehouse left auto-resumed by a debugging session
and forgotten) before it turns into a cost surprise at month-end. `ON 75 PERCENT DO NOTIFY` warns
early; `ON 100 PERCENT DO SUSPEND` is the real guardrail — the warehouse stops accepting new
queries rather than silently running past the budget.

## Alerting when the DAG itself fails

```python
with DAG(
    dag_id="driftwood_daily_elt",
    schedule="0 6 * * *",
    start_date=datetime(2026, 1, 1),
    catchup=False,
    default_args={
        "on_failure_callback": notify_data_team_slack,
        "retries": 1,
        "retry_delay": timedelta(minutes=10),
    },
) as dag:
    ...
```

`retries=1` with a 10-minute delay handles a real, common failure shape — a transient Snowflake
connection hiccup that succeeds on a second attempt — without paging anyone. `on_failure_callback`
is what actually matters for trust in the dashboard: if the DAG fails after retries are exhausted,
the data team gets a Slack notification that morning, before leadership opens a dashboard built on
yesterday's stale (or worse, half-built) data without anyone knowing it's stale.

## Where to actually look first when a number looks wrong

When someone reports "the MRR number looks off," the troubleshooting sequence follows the
pipeline's own dependency order, not a guess:

1. **Did the DAG run succeed?** Airflow's own run history (Lesson 6) answers this in seconds —
   if it failed, that's the whole answer.
2. **Did `dbt_test` pass?** If the DAG succeeded but a test failed, Lesson 5's tests already name
   exactly which assumption broke (a null subscriber_id, a duplicate dimension row).
3. **Query history for the actual query Power BI ran.** Snowflake's query history shows exactly
   what SQL executed against the warehouse and when — confirming the report queried the marts
   after the day's refresh completed, not against a stale cache or an earlier failed run.

Checking in this order — pipeline run, then tests, then the actual query — finds the real cause
far faster than guessing at the DAX measure first, since the measure logic from Lesson 8 is
usually the least likely place a "wrong number" actually originates once the pipeline's own
correctness is confirmed.

## Key terms

| Term | Meaning |
|---|---|
| Resource monitor | A Snowflake object that notifies or suspends a warehouse when its credit usage crosses a threshold |
| `on_failure_callback` | An Airflow DAG argument that fires a notification when a task ultimately fails |
| Troubleshooting order | Pipeline run status, then dbt test results, then query history — before suspecting the report's own logic |

## Check yourself

Why does this lesson recommend checking the Airflow run history and dbt test results before
looking at the DAX measure itself, when a stakeholder reports a number "looks wrong"?
