# Lesson 33 — Running dbt in Continuous Integration

**Chapter 7 · dbt + Git + CI/CD · Lesson 33 of 45**

## What you'll learn

- What actually happens when a pull request against a dbt project
  opens, whether you're using dbt Cloud's built-in CI or GitHub
  Actions
- Why dbt CI builds into a temporary schema instead of touching
  development or production
- How this connects to Lesson 21 of the Git/GitHub/CI-CD course, which
  already covered hand-rolling this in a GitHub Actions workflow
- Why `dbt build`, not separate `dbt run` + `dbt test`, is the right
  command for a CI check

## Two ways to get here — same underlying idea

The Git/GitHub/CI-CD course's Lesson 21, "Running dbt Models & Tests
in CI," already showed you one path: a GitHub Actions workflow that
writes its own `profiles.yml` from environment variables and runs
`dbt build --profiles-dir .` as a workflow step. That's a completely
valid, real way to run dbt in CI, and nothing about it changes here.

dbt Cloud offers a second path that gets you the same result without
writing that YAML at all: a CI job you configure once, that runs
automatically whenever a pull request opens or updates against your
repo — no runner to configure, no `profiles.yml` template to write, no
GitHub Secrets to wire up (dbt Cloud already has the warehouse
connection).

## What actually happens on a PR

Either way, the goal is identical: run `dbt build` against the
changed code *before* it merges, so a broken model or a failing test
shows up as a red check on the PR, not as a broken table in
production the next morning.

![dbt's own Continuous Integration Workflow diagram: feature branches and pull requests in the Git repository flow into a temporary schema in the Staging Database, built from the same Raw Sources the Development and Production databases read from.](/courses/dbt/ch07/33-dbt-in-ci/ci-workflow.png)
*Every PR gets its own temp_schema — the CI run never writes to the tables your dashboards actually query.*
Source: [dbt Docs — Continuous Integration](https://docs.getdbt.com/docs/deploy/continuous-integration)

That temporary schema is the key difference from just running `dbt
build` on your own laptop: dbt Cloud creates a schema scoped to that
specific PR (something like `dbt_cloud_pr_<job>_<pr_number>`), builds
everything the PR touches into it, runs the tests, and then — whether
the PR passes or fails — that temp schema gets cleaned up. Nothing
about a CI run ever touches your real dev or prod schemas.

## Why `dbt build`, specifically

Exactly as Lesson 21 explained, `dbt build` runs seeds, models, tests,
and snapshots together, in dependency order, stopping downstream work
as soon as an upstream test fails. In a CI check specifically, that
matters even more than it does locally: you want the PR's red X to
mean "something is actually broken," not "here are forty unrelated
models that happened to build fine on top of one broken test you
haven't seen yet."

## Key terms

| Term | Meaning |
|---|---|
| CI job (dbt Cloud) | A job configured to run automatically on new/updated pull requests, no GitHub Actions YAML required |
| Temporary schema | A schema scoped to one PR, built fresh and discarded, so a CI run never touches dev or prod |
| `dbt build` | Runs seeds, models, tests, and snapshots together in dependency order — the right command for a CI check |

## Lab

1. If you have a dbt Cloud account, find the "Continuous Integration"
   setting on an existing job (or create a new job) and enable "Run on
   Pull Requests."
2. Open a small pull request against your dbt project and watch the
   CI check appear on the PR — note the temporary schema name it
   builds into.
3. Compare that to Lesson 21's hand-rolled GitHub Actions approach:
   write down, in one sentence each, what dbt Cloud's CI job does for
   you that the GitHub Actions workflow had to do manually.

## Check yourself

You're ready for Lesson 34 when you can explain what a dbt CI run
actually builds into, and why that answer is the reason a CI check
failing is safe, while a production run failing isn't.
