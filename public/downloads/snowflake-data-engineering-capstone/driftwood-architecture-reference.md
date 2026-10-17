# Driftwood Architecture & Naming Reference

> Pulled from Lesson 2 (Architecture Planning). Keep this open while you
> build your own version of the capstone — reuse the naming pattern even
> if you don't keep the name "Driftwood."

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

Orchestration: the `driftwood_daily_elt` Airflow DAG runs the whole sequence daily — validate,
load, transform, test — and Power BI's own scheduled refresh picks up the result an hour later.

## Resource naming table

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
| Resource monitor | `driftwood_etl_monitor` | Snowflake resource monitor |
| dbt project | `driftwood_analytics` | dbt project name |
| Airflow DAG | `driftwood_daily_elt` | DAG ID |
| Git repository | `driftwood-analytics-platform` | GitHub repo |

## The naming pattern, generalized

1. **Pick one short project prefix** and use it everywhere — the database, both warehouses, both
   custom roles, the DAG, the repo. In a shared account, this is what lets you (or a teammate)
   tell at a glance which resources belong to which project.
2. **Respect each service's own naming rules.** Snowflake database/schema/table/warehouse names
   don't allow hyphens, so they use `DRIFTWOOD_` (underscored); the Git repo and DAG ID can use
   hyphens or underscores more freely. This split isn't inconsistency — it's each service's own
   constraint, reflected honestly in the naming table.
3. **Separate workloads get separate warehouses, named for the workload, not the tool.**
   `DRIFTWOOD_ETL_WH` and `DRIFTWOOD_BI_WH` are named for what runs on them, which makes their
   different `auto_suspend` settings self-explanatory to anyone reading the Terraform config.
4. **Give every role a name that states its scope, not just its user type.**
   `DRIFTWOOD_ANALYST` (read-only, marts-only) and `DRIFTWOOD_COMPLIANCE` (the small group with a
   real need to see unmasked PII) are named for what they're allowed to do, which makes an
   over-broad grant easier to spot in review than a generically-named role would be.
