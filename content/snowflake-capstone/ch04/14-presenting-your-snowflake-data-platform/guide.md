# Presenting Your Snowflake Data Platform

Building the Driftwood Media platform was the hard part. Presenting it well in an interview is a
separate skill, and the same five-beat structure this catalog's AWS Capstone teaches applies
here, built around what you actually have: a Snowflake + dbt + Airflow + Power BI platform, not
an AWS one.

## What you'll learn

- The five-beat story arc this project fits, applied to Driftwood specifically
- What to demo live versus describe — and why that answer is different for a BI-heavy project
  than for an infrastructure-heavy one
- How to handle "what would you do differently at scale?" with Driftwood's own honest answers

## The story arc

```
1. Business problem   Driftwood's subscriber/revenue numbers scattered across three systems,
                       reconciled by hand before every leadership meeting
2. Architecture        Snowflake (raw -> marts) -> dbt (staging/intermediate/marts) ->
                       Airflow (daily orchestration) -> Power BI (Import, scheduled refresh)
3. Build                Real dbt models with ref()-based lineage, a real Airflow DAG with
                        task dependencies, real DAX measures handling the actual grain
4. Production practices RBAC + masking for subscriber PII, CI/CD testing every dbt change,
                        Terraform-provisioned infrastructure, resource monitors, Time Travel
5. Results               One trusted MRR/churn number, refreshed daily, with zero manual
                        spreadsheet work
```

Most candidates stop at step 3 — a working pipeline with no production practices around it. Steps
4 and 5 are what show you'd survive on a real data team, not just finish a tutorial.

## What to show live versus describe

A BI-heavy capstone like this one has a genuine advantage over a pure-infrastructure project: the
dashboard itself is both the most impressive thing to show and the fastest thing to demo.

- **Show live, if you can:** the Power BI dashboard itself — the MRR card, the churn trend. It's
  immediately legible to a non-technical interviewer, and it's the actual deliverable leadership
  asked for in Lesson 1. A quick Snowflake query against `marts.fct_subscriptions` is a strong,
  fast second demo.
- **Describe from a diagram or slide instead:** the full Airflow DAG graph, the dbt lineage graph
  from `dbt docs generate`, and the Terraform plan output. These are dense and easy to
  misread quickly on a shared screen — walk through them verbally against Lesson 2's architecture
  diagram rather than scrolling live.

## Handling "what would you do differently at scale?"

This capstone already has honest, specific answers, named along the way rather than invented on
the spot:

- **Ingestion:** move from scheduled batch `COPY INTO` to Snowpipe, if Driftwood's freshness
  requirement ever became closer to real-time (named in Lesson 3).
- **Warehouse sizing:** `DRIFTWOOD_ETL_WH` is sized `SMALL` for today's data volume — the first
  thing to resize if the daily transform started taking meaningfully longer as Driftwood's
  subscriber base grew.
- **Recovery:** the current 1-day Time Travel retention (Lesson 13) is honest for a project this
  size — at scale, with more people able to accidentally break a production table, that number is
  the first thing worth increasing, understanding the storage-cost trade-off that comes with it.

Answering with specifics you already built reasoning for, during the project itself, lands better
than a generic "we'd add more monitoring" — it shows the trade-offs were real decisions.

## Key terms

| Term | Meaning |
|---|---|
| Story arc | The problem → architecture → build → production → results narrative structure |
| BI-heavy demo advantage | A dashboard is both the most impressive and the fastest thing to show live, compared to infrastructure diagrams |

## Check yourself

Why does this lesson recommend showing the Power BI dashboard live but describing the Airflow DAG
graph and dbt lineage graph from a diagram instead?
