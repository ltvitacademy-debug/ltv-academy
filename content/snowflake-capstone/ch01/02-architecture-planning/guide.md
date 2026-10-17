# Architecture Planning

Before writing a single `CREATE TABLE`, this lesson lays out the full shape of Driftwood Media's
platform and the resource-naming convention every later lesson follows — exactly like a real
project's architecture review, before any code gets written.

## What you'll learn

- The end-to-end architecture, from raw source data to the dashboard leadership opens
- Why two separate warehouses, not one, is the right call here
- The resource-naming convention this capstone uses consistently from here forward

## The pipeline, end to end

```
Billing platform events          Product app usage events
        |                                |
        |  Daily export to stage          |  Daily export to stage
        v                                v
   @driftwood_raw_stage (Snowflake internal stage)
        |
        |  COPY INTO raw tables (Lesson 3)
        v
driftwood_analytics.raw.*   (raw, untouched landing tables)
        |
        |  dbt: staging -> intermediate -> marts (Lessons 4-5)
        v
driftwood_analytics.marts.*   (clean, tested, documented models)
        |
        +----------------------------------+
        |                                  |
        v                                  v
  Power BI (Import mode,              Ad hoc analyst queries
  scheduled refresh)                  (DRIFTWOOD_ANALYST role)
        |
        v
  Executive dashboard: MRR, churn, active subscribers
```

Orchestration: an Airflow DAG (Lesson 6) runs the whole sequence daily — load, transform, test —
and Power BI's own scheduled refresh picks up the result afterward.

## Two warehouses, not one

Driftwood's platform uses two separate Snowflake virtual warehouses, deliberately:

| Warehouse | Used by | Why separate |
|---|---|---|
| `DRIFTWOOD_ETL_WH` | dbt runs (via Airflow) | Transformation workloads spike during the daily run, then sit idle — auto-suspend matters here |
| `DRIFTWOOD_BI_WH` | Power BI refresh + ad hoc analyst queries | Reporting queries shouldn't queue behind a dbt run, and their cost should be visible separately from transformation cost |

This isn't over-engineering for a project this size — it's the same principle Chapter 11's cost
management material covers: separating workloads onto their own warehouses means each one's
auto-suspend and sizing can be tuned independently, and the monthly bill can actually tell you
which workload is expensive, instead of one warehouse's cost hiding both.

## Resource naming convention

Every resource shares a `driftwood` prefix — hyphenated where the service allows it, underscored
where Snowflake's own object-naming rules require it (database, schema, table, and warehouse
names don't take hyphens):

| Resource | Name | Type |
|---|---|---|
| Database | `DRIFTWOOD_ANALYTICS` | Snowflake database |
| Raw schema | `DRIFTWOOD_ANALYTICS.RAW` | Schema |
| Marts schema | `DRIFTWOOD_ANALYTICS.MARTS` | Schema |
| Internal stage | `@driftwood_raw_stage` | Snowflake stage |
| ETL warehouse | `DRIFTWOOD_ETL_WH` | Virtual warehouse |
| BI warehouse | `DRIFTWOOD_BI_WH` | Virtual warehouse |
| Transformer role | `DRIFTWOOD_TRANSFORMER` | Role (dbt/Airflow) |
| Analyst role | `DRIFTWOOD_ANALYST` | Role (BI consumers) |
| Compliance role | `DRIFTWOOD_COMPLIANCE` | Role (PII access) |
| dbt project | `driftwood_analytics` | dbt project name |
| Airflow DAG | `driftwood_daily_elt` | DAG ID |
| Git repository | `driftwood-analytics-platform` | GitHub repo |

The point of the convention isn't the specific word "driftwood" — it's that every object in a
shared account is identifiable as part of this project at a glance, the same naming discipline
the AWS Capstone course applies to its own resources, just adapted to Snowflake's identifier
rules instead of AWS's.

## Key terms

| Term | Meaning |
|---|---|
| Internal stage | A Snowflake-managed storage location files are uploaded to before loading into a table |
| ETL warehouse / BI warehouse split | Separating transformation and reporting workloads onto independently-sized, independently-billed warehouses |
| DAG | Directed Acyclic Graph — Airflow's term for an orchestrated sequence of tasks |

## Check yourself

Why does Driftwood's architecture use two separate warehouses instead of running both the dbt
transformations and the Power BI refresh against one shared warehouse?
