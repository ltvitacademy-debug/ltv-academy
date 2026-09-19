# A Cost Optimization Pass

The pipeline works, is monitored, is secured, and deploys through CI/CD. Now it's worth a pass
looking specifically at cost — not because anything is broken, but because a job-ready project
should show you thought about spend the way a real team has to, every month, forever.

## What you'll learn

- A lifecycle policy that moves aging raw data to cheaper storage automatically
- Why Redshift Serverless (chosen in Lesson 6) is already this pipeline's biggest cost lever
- Glue DPU sizing and Athena's Parquet conversion as the remaining two levers

## Lever 1: S3 storage class lifecycle

Northfield's raw zone accumulates daily partitions forever, but analysts almost never query raw
data older than a quarter — Athena and Redshift both read from the curated zone. A lifecycle
policy moves aging raw objects to cheaper storage automatically:

```json
{
  "Rules": [
    {
      "ID": "northfield-raw-zone-tiering",
      "Status": "Enabled",
      "Filter": { "Prefix": "orders/" },
      "Transitions": [
        { "Days": 30, "StorageClass": "STANDARD_IA" },
        { "Days": 90, "StorageClass": "GLACIER_IR" }
      ]
    }
  ]
}
```

Days 0-30 stay in S3 Standard, since that's the window a re-run or backfill might need. After 30
days, objects move to Standard-IA (cheaper storage, same millisecond retrieval, just a per-GB
retrieval fee). After 90 days, they move to Glacier Instant Retrieval — still instantly
readable, at a fraction of Standard's storage cost, which matters once the raw zone holds a
year-plus of history nobody queries directly.

## Lever 2: Redshift Serverless was already the biggest lever

Lesson 6 chose Redshift Serverless over a provisioned cluster specifically because Northfield's
query pattern is bursty — heavy at month-end, quiet the rest of the month. A provisioned
`ra3.xlplus` cluster running 24/7 bills for idle hours every single day; Serverless's
auto-pause means `northfield-analytics` costs nothing between queries. For a workload shaped
like Northfield's, that one architectural decision back in Lesson 6 is worth more than any
tuning pass could add on top of a cluster.

## Lever 3: Glue DPU sizing

`northfield-orders-etl` runs 5 G.1X workers (from Lesson 5) — sized for one night's incremental
partition, not a full historical reprocess. Right-sizing DPUs matters because Glue bills per
DPU-hour: over-provisioning workers for a job that only ever processes one day's data burns
budget on idle capacity. The dashboard from Lesson 9 tracks DPU-hours per run specifically so
this can be revisited if data volume grows — the sizing decision isn't permanent, it's monitored.

## Lever 4: Athena's Parquet conversion, already paying off

Lesson 7 already put this lever in place without calling it a cost decision explicitly: querying
`northfield_orders_curated` (Parquet) instead of the raw CSV tables routinely scans 70-90% fewer
bytes for the same question, and Athena bills per byte scanned. Encouraging analysts toward the
curated tables — and keeping the per-query 5 GB scan guardrail from Lesson 7 — is itself a cost
control, not just a performance one.

## Key terms

| Term | Meaning |
|---|---|
| S3 Lifecycle policy | Rule that automatically transitions objects to cheaper storage classes over time |
| Standard-IA | Infrequent Access storage class — cheaper storage, per-GB retrieval fee |
| Glacier Instant Retrieval | Archive-tier storage, still millisecond-readable, cheapest of the three used here |
| DPU-hour | Glue's billing unit — Data Processing Unit capacity consumed per hour |

## Check yourself

Why does the lesson call Redshift Serverless "already the biggest cost lever" for this pipeline,
given that decision was actually made back in Lesson 6, not in this lesson?
