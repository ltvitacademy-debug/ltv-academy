# CI/CD for the dbt Project

Without CI/CD, a mistake in a dbt model reaches production the same way a correct one does: by
someone running `dbt run` against prod and finding out afterward. This lesson adds the GitHub
Actions workflow that tests every change to `driftwood-analytics-platform` before it can.

## What you'll learn

- The real GitHub Actions workflow that runs on every pull request to this repo
- Why it runs against a separate CI schema, not prod, and what that actually protects
- Slim CI: running only the models a change actually affects, not the whole project every time

## The workflow, start to finish

```yaml
# .github/workflows/dbt-ci.yml
name: dbt CI

on:
  pull_request:
    paths: ["dbt/driftwood_analytics/**"]

jobs:
  dbt-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Install dbt
        run: pip install dbt-snowflake

      - name: dbt deps
        run: dbt deps --project-dir dbt/driftwood_analytics

      - name: dbt build (CI schema, state-based selection)
        env:
          SNOWFLAKE_ACCOUNT: ${{ secrets.DRIFTWOOD_SNOWFLAKE_ACCOUNT }}
          SNOWFLAKE_USER: ${{ secrets.DRIFTWOOD_SNOWFLAKE_CI_USER }}
          SNOWFLAKE_PASSWORD: ${{ secrets.DRIFTWOOD_SNOWFLAKE_CI_PASSWORD }}
        run: |
          dbt build \
            --project-dir dbt/driftwood_analytics \
            --target ci \
            --select state:modified+ \
            --state ./prod-manifest
```

This follows the git-cicd course's own "Running dbt Models & Tests in CI" pattern directly:
`actions/checkout`, install, then `dbt build` (which runs both models and tests in dependency
order) rather than separate `dbt run` and `dbt test` steps, since CI only needs one pass/fail
signal per PR.

## Why a separate CI schema, not prod

`--target ci` points this run at a Snowflake schema that exists only for CI runs, built and torn
down fresh for each one — never the `prod` schema Lesson 6's Airflow DAG writes to. This is the
actual thing CI/CD protects here: a bad model in a pull request can run, fail its tests, and even
fail loudly, without ever touching the data leadership's dashboard is reading from. Without this
separation, "testing in CI" would mean running untested code against the real production marts,
which defeats the entire purpose.

## Slim CI: testing what changed, not the whole project

`--select state:modified+` is the detail that makes this practical at Driftwood's actual project
size: it tells dbt to run only the models that changed in this PR, plus everything downstream of
them (the `+`) — not every model in the project, every single time. The dbt course's own "Slim
CI" lesson explains why this matters beyond just speed: as `driftwood_analytics` grows past its
current handful of models, a CI run that re-tests everything on every PR gets slower and slower
until people start skipping it; a CI run scoped to what actually changed stays fast regardless of
project size, which is what keeps it something the team actually waits for instead of something
they learn to ignore.

## Key terms

| Term | Meaning |
|---|---|
| `dbt build` | Runs models and tests together, in dependency order, as one pass/fail signal |
| CI schema | A separate Snowflake schema used only for CI runs, isolated from prod |
| `state:modified+` | Slim CI selection: only changed models plus everything downstream of them |

## Check yourself

What would actually go wrong if this CI workflow pointed `--target` at the same prod schema
Lesson 6's Airflow DAG writes to, instead of a dedicated CI schema?
