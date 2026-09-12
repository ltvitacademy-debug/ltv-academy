# Lesson 22 — Deploying on Merge to Main

**Chapter 5 · Building a CI/CD Pipeline for a Data Project · Lesson 22 of 25**

## What you'll learn

- Why "runs on every PR" and "runs on merge to main" need to be two
  different jobs, not one
- Adding a deploy job to `retail-orders-analytics`'s workflow that only
  fires on push to `main`
- Targeting a different schema for CI checks versus the real production
  build
- What "deploy" actually means for a dbt project — there's no server
  to restart

## One workflow, two different moments

Lesson 20's `ci.yml` triggers on both `pull_request` and `push` to
`main` — but a pull request and an actual merge are different moments
that need different behavior. A PR should run `dbt build` against a
disposable CI schema to check the change is safe. A merge to `main`
should run `dbt build` again — but this time against the real
production schema, because the change is now trusted and live.

Conflating those two would either run untested PR branches against
production (dangerous) or never actually update production at all
(useless). The fix is two separate jobs, gated by two different
conditions on the same trigger.

## Adding the deploy job

```yaml
jobs:
  build-and-test:
    if: github.event_name == 'pull_request'
    runs-on: ubuntu-latest
    steps:
      # ...Lesson 20-21's steps, targeting the ci schema...

  deploy:
    if: github.event_name == 'push' && github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: "3.11"
      - run: pip install dbt-postgres==1.7.4
      - run: dbt deps
      - name: Deploy to production
        env:
          DB_HOST: ${{ secrets.PROD_DB_HOST }}
          DB_PASSWORD: ${{ secrets.PROD_DB_PASSWORD }}
        run: dbt build --profiles-dir . --target prod
```

Two `if:` conditions do the actual separating:

- **`build-and-test`** only runs `if: github.event_name ==
  'pull_request'` — every proposed change, checked before merge.
- **`deploy`** only runs `if: github.event_name == 'push' &&
  github.ref == 'refs/heads/main'` — only a real push landing directly
  on `main`, which is exactly what a merge produces.

## Two targets, one profiles.yml

The `--target prod` flag switches which block of `profiles.yml`
dbt reads, without changing the file's structure at all:

```yaml
retail_orders_analytics:
  target: ci
  outputs:
    ci:
      type: postgres
      host: "{{ env_var('DB_HOST') }}"
      schema: ci
    prod:
      type: postgres
      host: "{{ env_var('DB_HOST') }}"
      schema: analytics
```

Same project, same models, same tests — pointed at a disposable `ci`
schema during review, and the real `analytics` schema once the change
is trusted enough to merge. Lesson 23 covers exactly why `PROD_DB_HOST`
and `DB_HOST` are deliberately separate secrets, not the same value
reused.

## What "deploy" means when there's no server

Deploying a web application usually means restarting a running
process. A dbt "deploy" is different: there's no server to restart —
`dbt build --target prod` *is* the deploy. Running the models and
tests against the real production schema, successfully, is the entire
deployment. The moment that command finishes, the production tables
reflect the new code.

## Key terms

| Term | Meaning |
|---|---|
| `github.event_name` | The event that triggered this run — `pull_request` or `push` |
| `github.ref` | The full ref of the branch or tag being built, e.g. `refs/heads/main` |
| `if:` (job-level) | A condition controlling whether a job runs at all for this trigger |
| `--target` | The dbt flag selecting which `profiles.yml` output block to use |

## Lab

1. Add a second job to your own `ci.yml`, gated with `if:` conditions
   matching the pattern above.
2. Add a second `target` block to your `profiles.yml`, pointed at a
   different schema (or a different local database) than your CI
   target.
3. Push directly to `main` (in a safe practice repo) and confirm only
   the deploy job runs — then open a pull request and confirm only the
   build-and-test job runs.

## Check yourself

You're ready for Lesson 23 when you can explain, in your own words,
why a pull request and a merge to `main` need two separate jobs rather
than one job that just runs on both triggers identically.
