# Connecting Power BI to the Marts

The Snowflake course's own Chapter 12 already taught you how to connect Power BI to Snowflake in
general, and how to choose between Import and DirectQuery. This lesson applies that decision to
Driftwood specifically — not in the abstract, but against the real constraint this project
actually has.

## What you'll learn

- Why Driftwood's dashboard uses Import mode, not DirectQuery, and the specific reasoning behind
  that choice
- Which Snowflake objects Power BI actually connects to — the marts, never the raw or
  intermediate layers
- How the daily refresh schedule lines up with Lesson 6's Airflow DAG, so the dashboard never
  shows a half-updated day

## Import vs. DirectQuery, applied to Driftwood's actual requirement

Chapter 12's "Import vs. DirectQuery Considerations" lesson lays out the general trade-off:
DirectQuery always shows the current state of the warehouse but re-runs a Snowflake query on
every interaction, while Import loads a snapshot that's fast to interact with but only as fresh as
its last refresh. Driftwood's requirement from Lesson 1 is a **daily** number, not a live one —
leadership checking the dashboard at 9 AM and 4 PM should see the exact same number both times,
reflecting yesterday's complete, dbt-tested data. That's Import mode's entire value proposition,
and it's the right call here specifically because the freshness requirement is daily, not because
Import is generally "better" than DirectQuery.

```
DirectQuery -- right choice when: users need up-to-the-second numbers,
               and can tolerate a warehouse query on every click
Import      -- right choice when: a daily (or similarly periodic) refresh
               is the actual requirement, and query performance in the
               report itself matters more than live freshness
```

## Connecting to the marts, never the raw layer

Power BI connects to exactly two tables: `driftwood_analytics.marts.fct_subscriptions` and
`driftwood_analytics.marts.dim_subscribers` — the tested, documented, grain-labeled tables from
Lesson 5, never `raw.*` or the `int_subscriber_activity` intermediate model. This isn't an
arbitrary restriction: the marts are the layer dbt's tests actually run against before anything
downstream sees them, and the layer whose grain is documented in `schema.yml`. Connecting a
report directly to `raw.billing_events` would bypass every test and every piece of documentation
this project built specifically to prevent a wrong number reaching leadership.

```
Power BI connects here:  driftwood_analytics.marts.fct_subscriptions
                          driftwood_analytics.marts.dim_subscribers

Power BI never connects
directly to:              driftwood_analytics.raw.*
                           int_subscriber_activity
```

## Lining up the refresh schedule with the Airflow DAG

Driftwood's Power BI dataset is configured for a scheduled refresh at 7 AM — one hour after the
`driftwood_daily_elt` DAG's 6 AM start, giving the full load → transform → test sequence time to
finish before Power BI pulls a snapshot. This ordering matters: if Power BI refreshed at 6:05 AM,
it would risk capturing the marts mid-build, partway through `dbt_run`, showing leadership an
incomplete or inconsistent number with no indication anything was wrong. The one-hour buffer is a
deliberate, named decision — not an arbitrary schedule — based on how long the DAG's full sequence
typically takes to complete.

## Key terms

| Term | Meaning |
|---|---|
| Import mode | Power BI loads a snapshot of the data, refreshed on a schedule |
| DirectQuery | Power BI queries Snowflake live on every report interaction |
| Marts-only connection | The report connects only to tested, documented mart tables, never raw or intermediate models |

## Check yourself

Why would connecting Power BI directly to `raw.billing_events`, instead of
`marts.fct_subscriptions`, undermine the entire point of Lesson 5's testing and documentation
work?
