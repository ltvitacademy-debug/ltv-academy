# Lesson 21 — Running dbt Models & Tests in CI

**Chapter 5 · Building a CI/CD Pipeline for a Data Project · Lesson 21 of 25**

## What you'll learn

- How dbt actually connects to a real database from inside a GitHub
  Actions runner, where nothing is pre-configured
- The real `profiles.yml` pattern that reads credentials from
  environment variables instead of a hardcoded file
- What `dbt build` does that `dbt run` and `dbt test` separately don't
- How to read a failing dbt test's output in a CI log and know exactly
  which row broke it

## Picking up where Lesson 20 left off

Lesson 20's `ci.yml` for `retail-orders-analytics` stopped right after
`dbt deps`. The runner now has Python, dbt, and dbt's packages
installed — but dbt still can't do anything useful yet, because it
has no idea what database to connect to. That's today's problem.

## The connection problem: no `~/.dbt/profiles.yml`

On your own laptop, dbt reads connection details from
`~/.dbt/profiles.yml` — a file that lives outside the repo and is
never committed, because it contains a real database password. A
fresh GitHub Actions runner has no home directory full of your
personal config files. So the workflow has to create that file itself,
every single run, from values that aren't hardcoded anywhere in the
repo:

```yaml
# profiles.yml — generated at CI time, not committed to the repo
retail_orders_analytics:
  target: ci
  outputs:
    ci:
      type: postgres
      host: "{{ env_var('DB_HOST') }}"
      user: "{{ env_var('DB_USER') }}"
      password: "{{ env_var('DB_PASSWORD') }}"
      dbname: "{{ env_var('DB_NAME') }}"
      schema: ci
      threads: 4
```

Every value that matters — host, user, password, database name — comes
from `env_var(...)`, dbt's built-in function for reading environment
variables at run time. Nothing sensitive is written into this file as
literal text; it's a template that gets filled in fresh on every CI
run. Lesson 23 covers exactly where those environment variables
themselves come from (spoiler: GitHub Secrets) — for now, treat them
as already available.

## The steps that actually run dbt

Here's what gets added to `ci.yml`, right after `dbt deps`:

```yaml
      - name: Run dbt build
        env:
          DB_HOST: ${{ secrets.DB_HOST }}
          DB_USER: ${{ secrets.DB_USER }}
          DB_PASSWORD: ${{ secrets.DB_PASSWORD }}
          DB_NAME: ${{ secrets.DB_NAME }}
        run: dbt build --profiles-dir .
```

Two things worth slowing down on:

- **`env:`** on a single step injects those variables only for that
  step's process — exactly what `env_var('DB_HOST')` reads inside
  `profiles.yml` at run time.
- **`dbt build`**, not `dbt run` then `dbt test` as two commands.
  `dbt build` runs models, tests, seeds, and snapshots together *in
  dependency order* — so if `stg_orders`' tests fail, dbt build stops
  before it ever tries to build `fct_orders` on top of broken data.
  Running `dbt run` and `dbt test` as two separate commands would
  build every model first regardless of test failures upstream — a
  meaningfully worse default for CI.

## Reading a real test failure in the log

When `dbt build` hits a failing test, the CI log shows exactly which
test failed and how many rows violated it — for example, a
`not_null_stg_orders_order_id` failure reports the count of null
`order_id` rows it found. This is the same output dbt would print
locally; CI just captures it and turns the whole step red so the pull
request shows a failing check instead of a green one. The fix is
always the same motion: read which test failed, read which model it
was testing, then go look at that model's SQL or the raw source data
it's built from.

## Why this matters more than it looks like

Before this workflow existed, "does this dbt change break anything"
depended on someone remembering to run `dbt test` locally before
opening a pull request. Now it's not optional — every PR against
`retail-orders-analytics` gets `dbt build` run against it automatically,
and a broken model shows up as a red X on the PR itself, before a
reviewer even opens the diff.

## Key terms

| Term | Meaning |
|---|---|
| `profiles.yml` | dbt's connection-details file; generated at CI time here, never committed |
| `env_var(...)` | dbt's Jinja function for reading an environment variable inside a profile or model |
| `dbt build` | Runs seeds, models, and tests together in dependency order, stopping on upstream failures |
| Step-level `env:` | Environment variables scoped to one workflow step's process |

## Lab

1. In `retail-orders-analytics` (or your own small dbt project), write
   a `profiles.yml` template that reads every connection value via
   `env_var(...)`, matching the pattern above.
2. Add a `dbt build --profiles-dir .` step to your `ci.yml`, with the
   matching `env:` block referencing `${{ secrets.* }}` placeholders
   (you'll wire up the real secrets in Lesson 23).
3. Intentionally break a dbt test — remove a `not_null` guarantee from
   your seed data — and read exactly how the failure shows up in a
   local `dbt build` run, so you recognize the same shape in a CI log.

## Check yourself

You're ready for Lesson 22 when you can explain why `dbt build` is
generally the better CI choice over separate `dbt run` and `dbt test`
commands, and you can describe, in your own words, how a CI runner
that starts with no config at all ends up with a working database
connection.
