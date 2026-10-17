# Modeling With dbt: Staging to Marts

Raw billing and usage data is now landing in Snowflake, but it's exactly as messy as any raw
source: billing events use `subscriber_id`, usage events use `user_id` for the same person,
amounts are strings, and nothing is deduplicated. This lesson builds the dbt project that turns
that into Driftwood's trusted subscriber and revenue marts.

## What you'll learn

- How the dbt project `driftwood_analytics` is organized across staging, intermediate, and marts
- The specific cleaning each staging model does, and why it happens once instead of in every
  downstream query
- How `ref()` ties models together into Driftwood's actual dependency graph

## The three layers, applied to Driftwood's real data

The dbt course's layering philosophy — staging cleans and renames with no business logic yet,
intermediate joins and applies business rules, marts are the final, consumable tables — maps
directly onto Driftwood's two raw sources:

```
raw.billing_events  --> stg_billing_events  --\
                                                 +--> int_subscriber_activity --> marts.fct_subscriptions
raw.usage_events    --> stg_usage_events    --/                                  marts.dim_subscribers
```

## Staging: clean and rename, nothing clever yet

```sql
-- models/staging/stg_billing_events.sql
select
    subscriber_id                           as subscriber_id,
    event_type                              as event_type,       -- 'signup', 'upgrade', 'cancel'
    try_to_decimal(amount_usd, 10, 2)       as amount_usd,
    try_to_timestamp_ntz(event_timestamp)   as event_timestamp
from {{ source('driftwood_raw', 'billing_events') }}
```

```sql
-- models/staging/stg_usage_events.sql
select
    user_id                                 as subscriber_id,    -- renamed to match billing's grain
    watch_duration_seconds,
    try_to_timestamp_ntz(event_timestamp)   as event_timestamp
from {{ source('driftwood_raw', 'usage_events') }}
```

The `user_id` → `subscriber_id` rename in `stg_usage_events` is a small but deliberate decision:
reconciling the two source systems' different names for the same real-world entity happens once,
here, in staging — not re-derived in every downstream model or, worse, in Power BI itself where
it would be invisible and easy to get wrong differently in different reports. `try_to_decimal`
and `try_to_timestamp_ntz` convert without throwing an error on a malformed source value — a
bad row becomes a visible `NULL` a dbt test can catch, not a failed pipeline run.

## Intermediate: where the joins and business logic live

```sql
-- models/intermediate/int_subscriber_activity.sql
select
    b.subscriber_id,
    b.event_type,
    b.amount_usd,
    b.event_timestamp,
    sum(u.watch_duration_seconds) as watch_seconds_same_day
from {{ ref('stg_billing_events') }} b
left join {{ ref('stg_usage_events') }} u
    on b.subscriber_id = u.subscriber_id
    and date_trunc('day', b.event_timestamp) = date_trunc('day', u.event_timestamp)
group by 1, 2, 3, 4
```

This is the first place billing and usage data actually meet — everything before this point was
cleaning one source at a time. `{{ ref(...) }}` (not a hardcoded schema.table name) is what lets
dbt build this model's dependency graph automatically and run everything in the correct order.

## Marts: the tables Power BI and analysts actually query

```sql
-- models/marts/fct_subscriptions.sql
select
    subscriber_id,
    event_type,
    amount_usd,
    event_timestamp
from {{ ref('int_subscriber_activity') }}
```

```sql
-- models/marts/dim_subscribers.sql
select
    subscriber_id,
    min(event_timestamp) as first_seen_at,
    max(case when event_type = 'cancel' then event_timestamp end) as cancelled_at
from {{ ref('int_subscriber_activity') }}
group by 1
```

`fct_subscriptions` (a fact table — one row per subscription event) and `dim_subscribers` (a
dimension table — one row per subscriber) follow the exact fact/dimension split the dbt and
Power BI courses both already taught; Lesson 8's DAX measures are built directly on top of these
two tables.

## Key terms

| Term | Meaning |
|---|---|
| Staging model | Cleans and renames one raw source, with no business logic or joins yet |
| Intermediate model | Where joins across sources and business logic actually happen |
| Mart | The final, consumable fact/dimension table downstream tools query |
| `ref()` | dbt's function for referencing another model, building the project's dependency graph automatically |

## Check yourself

Why does the `user_id` → `subscriber_id` rename happen in the staging layer specifically, instead
of in the marts models or in Power BI itself?
