# Script — Airflow + dbt

## Segment 1 (title)

dbt already has its own dependency graph — every ref() call builds it. Airflow's DAG here isn't replacing that; it's the outer layer deciding when the whole dbt project runs. This lesson covers the two real ways to trigger it.

## Segment 2 (steps: two DAGs)

Two DAGs, not one. dbt's own DAG is built from ref() calls and already runs models in the right order. Airflow's DAG decides when that whole thing kicks off, what runs before it, and what happens if it fails. Different graphs, different jobs.

## Segment 3 (code: BashOperator)

Option one: BashOperator, running the dbt CLI directly — cd into the project, dbt build. To Airflow this is one task, one box. Inside it, dbt runs its entire internal DAG. Simple, and the right default for most teams — but Airflow can't see inside that one task if a single model fails.

## Segment 4 (code: Cosmos)

Option two: astronomer-cosmos. Its DbtDag object reads the dbt project's own manifest and generates one real Airflow task per dbt model, wired with the same dependencies ref() already defines. Now a single failed model shows up as its own red box, not one big task.

## Segment 5 (outro)

Next lesson: Airflow plus Snowflake COPY INTO — the load step that feeds into everything you just triggered here.
