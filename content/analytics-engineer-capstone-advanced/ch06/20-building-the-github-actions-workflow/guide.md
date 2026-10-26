# Lesson 20 — Building the GitHub Actions Workflow

**Chapter 6 · CI/CD for the dbt Project · Lesson 20 of 26**

## What you'll learn

- The real GitHub Actions workflow pattern this path's own
  Git/CI-CD course already taught, adapted to this platform's real
  models
- Every step of `.github/workflows/ci.yml`, top to bottom, for the
  Jaffle Shop dbt project, from checkout through a real `dbt build`
- The real connection problem a fresh CI runner has, and the
  `profiles.yml`-via-`env_var()` pattern that solves it
- Why this workflow runs `dbt build` against its own disposable `ci`
  schema, never `dev` or `prod`
- Where this workflow actually runs once it's committed and pushed

## Reusing a proven real pattern

This isn't a new pattern invented for this platform — it's the exact
`.github/workflows/ci.yml` shape this path's own Git/CI-CD course
already built for a different dbt project (`retail-orders-analytics`),
adapted here to Jaffle Shop's real models.

```yaml
# .github/workflows/ci.yml
name: CI

on:
  pull_request:
    branches: [main]
  push:
    branches: [main]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - name: Check out the repo
        uses: actions/checkout@v4

      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: "3.11"

      - name: Install dbt
        run: pip install dbt-snowflake==1.7.4

      - name: Install dbt packages
        run: dbt deps
```

## Reading each step for this project specifically

- **`on:`** — this workflow runs on every pull request targeting
  `main`, and every push directly to `main`. A pull request is exactly
  where this matters most: this is the check that has to pass *before*
  a change reaches `main` at all.
- **`actions/checkout@v4`** — clones the Jaffle Shop dbt project repo
  onto the runner; without it, there's no code to build anything from.
- **`actions/setup-python@v5`**, pinned to `"3.11"` — same reasoning
  as the Git/CI-CD course: a pinned version means this workflow
  behaves identically today and a year from now.
- **`pip install dbt-snowflake==1.7.4`** — the Snowflake-specific dbt
  adapter, swapped in for `dbt-postgres` since this platform's
  warehouse is Snowflake, not Postgres. Otherwise the same install
  pattern.
- **`dbt deps`** — installs this project's packages, including
  `dbt_utils` (Lesson 11's macro library depends on it).

## Finishing the workflow: the connection problem

A fresh GitHub Actions runner has no `~/.dbt/profiles.yml` — no home
directory full of personal config files, and definitely no real
Snowflake password sitting on disk. The workflow has to generate that
file itself, every run, from values that are never hardcoded in the
repo — the exact real pattern this path's own Git/CI-CD course already
taught, reused here without inventing a different one:

```yaml
      - name: Create profiles.yml
        run: |
          mkdir -p ~/.dbt
          cat <<EOF > ~/.dbt/profiles.yml
          jaffle_shop:
            target: ci
            outputs:
              ci:
                type: snowflake
                account: "{{ env_var('SNOWFLAKE_ACCOUNT') }}"
                user: "{{ env_var('SNOWFLAKE_CI_USER') }}"
                password: "{{ env_var('SNOWFLAKE_CI_PASSWORD') }}"
                role: transformer
                database: jaffle_shop_db
                warehouse: transforming_wh
                schema: ci
                threads: 4
          EOF

      - name: Run dbt build
        env:
          SNOWFLAKE_ACCOUNT: ${{ secrets.SNOWFLAKE_ACCOUNT }}
          SNOWFLAKE_CI_USER: ${{ secrets.SNOWFLAKE_CI_USER }}
          SNOWFLAKE_CI_PASSWORD: ${{ secrets.SNOWFLAKE_CI_PASSWORD }}
        run: dbt build --profiles-dir ~/.dbt
```

Every value that matters — account, user, password — comes from
`env_var(...)` inside the generated `profiles.yml`, fed at run time by
step-level `env:` reading from `${{ secrets.* }}`. Nothing sensitive is
ever written as literal text anywhere in this file or the repo.

## Why dbt build, not dbt run + dbt test

This step runs `dbt build`, not `dbt run` followed by a separate `dbt
test` — the same reasoning Chapter 4 already established: `dbt build`
runs models and tests together in dependency order, so if
`stg_jaffle_shop__orders` fails a test, CI never proceeds to build
`customers` on top of it in the same run. Running `dbt run` and `dbt
test` as two separate commands would build everything first regardless
of test results — a meaningfully worse default here too.

## A real CI schema, separate from dev and prod

Notice `schema: ci` — a fourth schema, distinct from `dev` and `prod`
(Lesson 5). CI builds into its own disposable schema, using a
narrowly-scoped `SNOWFLAKE_CI_USER` credential that can't touch real
production data even if a CI run somehow misbehaved — the same
least-privilege reasoning this path's own Git/CI-CD course applied to
separating CI and production secrets.

## Watching it run

Once this file is committed and pushed to `.github/workflows/`,
GitHub picks it up with no separate registration step — open the
repository's **Actions** tab to see it listed and watch a live,
streaming log of every step on each run, the same real GitHub UI this
path's Git/CI-CD course already walked through.

## Key terms

| Term | Meaning |
|---|---|
| `dbt-snowflake` | The Snowflake-specific dbt adapter package, installed instead of `dbt-postgres` |
| `on: pull_request` | The trigger that runs this workflow before a change can merge |
| `dbt deps` | Installs a dbt project's package dependencies, including `dbt_utils` |
| `profiles.yml` generated at CI time | Never committed; built fresh on every run from `env_var(...)` values |
| `schema: ci` | A fourth, disposable schema CI builds into — never `dev`, never `prod` |

## Lab

1. Write the complete `.github/workflows/ci.yml` exactly as shown,
   including the `Create profiles.yml` and `Run dbt build` steps, for
   this platform's real repository.
2. Commit and push it, then open the Actions tab and confirm it runs
   end to end.
3. Explain, in one sentence, why `SNOWFLAKE_CI_USER` is a different
   credential from the one a developer uses locally, and why that
   separation matters.

## Check yourself

You're ready for Lesson 21 when you can write this complete workflow
file from memory and explain where its Snowflake connection details
actually come from at run time.
