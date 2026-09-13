# Lesson 15 — Provider Packages

**Chapter 3 · Connections, Hooks & Providers · Lesson 15 of 30**

## What you'll learn

- Why Snowflake, Postgres, and S3 support isn't built into core Airflow
- What a provider package actually bundles: Hooks, Operators, Sensors, and connection types
- How to install one and where its code ends up living
- How to tell, from an import path, which provider package a class comes from

## Why "Snowflake support" isn't in core Airflow

Core Apache Airflow — the package you get from `pip install
apache-airflow` — knows nothing about Snowflake, Postgres, S3, or
almost any specific external system. That's deliberate: bundling
every possible integration into one package would make it enormous,
and force every user to install dependencies for systems they'll
never touch.

Instead, integrations ship as separate, independently-versioned
**provider packages**. `apache-airflow-providers-snowflake` is one;
`apache-airflow-providers-amazon`, `apache-airflow-providers-postgres`,
and dozens of others follow the same pattern. You install only the
ones you actually need.

## What a provider package bundles

Each provider package is a coherent bundle for one system (or family
of related services):

- **Hooks** — the low-level connection classes from Lesson 14
  (`SnowflakeHook`)
- **Operators** — the task-shaped wrappers (`SnowflakeOperator`)
- **Sensors** — wait-for-a-condition tasks specific to that system
  (covered in Chapter 4)
- **Connection type** — the "Snowflake" option that appears in the
  Connection Type dropdown from Lesson 13's Add Connection form

Installing the package is what makes all four of those things exist
and show up in the UI at once.

## Installing a provider package

```bash
pip install apache-airflow-providers-snowflake
```

That's it — no separate registration step. Airflow discovers
installed providers automatically at startup (via Python's package
entry-point mechanism) and adds their Hooks, Operators, Sensors, and
connection types to what's available.

## Where the code lives, and how to spot it

Provider code lives under a predictable import path:
`airflow.providers.<name>.<component_type>.<module>`:

```python
from airflow.providers.snowflake.hooks.snowflake import SnowflakeHook
from airflow.providers.snowflake.operators.snowflake import SnowflakeOperator
from airflow.providers.amazon.aws.hooks.s3 import S3Hook
from airflow.providers.postgres.hooks.postgres import PostgresHook
```

Any time you see `airflow.providers.<something>` in an import, you're
looking at code that came from a provider package, not core Airflow —
and if that import fails, the fix is almost always "install the
matching provider package," not a bug in your DAG.

## Checking what's installed

Airflow's Admin menu includes a Providers page listing every provider
package currently installed and its version — useful for confirming
a package actually installed correctly, or for troubleshooting an
import error by checking whether the version you expect is really
there.

## Key terms

| Term | Meaning |
|---|---|
| Provider package | A separate, installable package bundling Hooks, Operators, Sensors, and connection types for one system |
| apache-airflow-providers-snowflake | The provider package that adds Snowflake support to Airflow |
| Entry point | The mechanism Airflow uses to auto-discover installed providers at startup |
| airflow.providers.* | The import path prefix for any code that came from a provider package |

## Lab

1. Check which provider packages are already installed in your
   Airflow environment (`pip list \| grep apache-airflow-providers`
   or the Admin > Providers page in the UI).
2. If `apache-airflow-providers-snowflake` isn't already installed,
   install it, then restart the scheduler/webserver so it's
   discovered.
3. Confirm the "Snowflake" option now appears in the Connection Type
   dropdown from Lesson 13's Add Connection form.

## Check yourself

You're ready for Lesson 16 when you can explain, in one sentence,
why installing `apache-airflow-providers-snowflake` is what makes a
"Snowflake" connection type and `SnowflakeOperator` both available.
