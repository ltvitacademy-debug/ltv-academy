# Script — Provider Packages

## Segment 1 (title)

Core Airflow knows nothing about Snowflake, Postgres, or S3 — that's deliberate. Bundling every integration in would make it enormous. Instead, integrations ship as separate, independently-versioned provider packages, and you install only the ones you need.

## Segment 2 (steps: what a provider package bundles)

Each provider package bundles four things for one system: Hooks, the low-level connection classes; Operators, the task-shaped wrappers; Sensors, wait-for-a-condition tasks; and a Connection type — the option that shows up in the Add Connection dropdown.

## Segment 3 (code: installing a provider)

Installing one is a single pip install — apache-airflow-providers-snowflake. No separate registration step. Airflow discovers installed providers automatically at startup and adds their Hooks, Operators, Sensors, and connection types to what's available.

## Segment 4 (code: import paths)

Provider code lives under a predictable path: airflow.providers, then the name, then the component type. Any time you see that prefix in an import, you're looking at provider code, not core Airflow — and if it fails to import, the fix is almost always installing the matching package.

## Segment 5 (steps: checking what's installed)

Airflow's Admin menu includes a Providers page listing every installed provider package and its version — useful for confirming a package installed correctly, or troubleshooting an import error.

## Segment 6 (outro)

Next lesson: connecting to Snowflake specifically — putting Connections, Hooks, and this provider package together into one real, working example.
