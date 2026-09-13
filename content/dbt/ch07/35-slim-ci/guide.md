# Lesson 35 — Slim CI: Only Running What Changed

**Chapter 7 · dbt + Git + CI/CD · Lesson 35 of 45**

## What you'll learn

- Why running the *entire* project on every pull request doesn't
  scale as a dbt project grows
- What `state:modified+` actually selects, in plain English
- What "deferral" means, and why it's the other half of Slim CI
- How to read a real dbt Cloud run record that used both

## The problem: your PR touched one model, but CI built two hundred

Lesson 33's CI job runs `dbt build` against the PR's changes. Taken
literally, that means every model, every test, every seed — the whole
project — on every single pull request. For a small project that's
fine. For a two-hundred-model project where a PR changes one staging
model, rebuilding everything else too is slow, expensive, and mostly
pointless: those other 199 models didn't change.

## The fix: `state:modified+`

dbt's node-selection syntax has a `state:` selector family built
exactly for this. `state:modified` selects only the models, tests, and
other resources that are actually different from a previous, known-good
run (compared against that run's `manifest.json`). Adding the `+`
extends the selection to everything *downstream* of those changes too
— because if `stg_orders` changed, every model built on top of it
needs re-testing even though their own SQL didn't change.

```
dbt build --select state:modified+ --defer --state ./prod-manifest
```

Read left to right: build, but only the modified nodes and everything
downstream of them, deferring anything *not* selected to the state of
a prior run, using the manifest found at `./prod-manifest` as the
comparison point.

## The other half: deferral

`state:modified+` only tells dbt *which* models to build. But
`fct_orders` (downstream of the changed `stg_orders`) still needs to
run a query that references `stg_orders` — and if `stg_orders` wasn't
rebuilt in this run's schema, that reference would fail. **Deferral**
solves this: for any model not selected, dbt resolves its `ref()` to
where that model *already exists* — typically production — instead of
requiring it to exist in the current, partial run. This is exactly
what you're seeing in a real dbt Cloud CI run record:

![A real dbt Cloud CI run's summary: "This run executed in deferred mode using a manifest from the job Build and Run from environment Docs Team Production. The specific run deferred to was Run #403283505," plus a step overriding the connection schema to a PR-specific temp schema.](/courses/dbt/ch07/35-slim-ci/using-ci-dbt-cloud.png)
*Deferred mode is what lets a partial, state:modified+ run still resolve every ref() correctly — unselected models are read from that prior production run instead of being rebuilt.*
Source: [dbt Docs — Continuous Integration](https://docs.getdbt.com/docs/deploy/continuous-integration)

## Why this is the right default for CI specifically

Deferral plus `state:modified+` together are exactly what dbt Cloud's
CI job (from Lesson 33) does automatically once you enable it — you
don't hand-write the `--state` path yourself; dbt Cloud already knows
the last successful production run's manifest. The result: a PR that
touches one model builds one model (plus its real downstream
dependents), not two hundred, and every `ref()` still resolves
correctly.

## Key terms

| Term | Meaning |
|---|---|
| `state:modified` | Selects only resources that differ from a comparison manifest |
| `state:modified+` | The above, plus everything downstream of each modified resource |
| Deferral (`--defer`) | Resolves `ref()`s for unselected models against a prior run instead of requiring them to exist in this run |
| `manifest.json` | dbt's compiled representation of a project — the comparison point `state:` selectors diff against |

## Lab

1. In a local dbt project, run `dbt compile` and find the resulting
   `manifest.json` in the `target/` folder — this is what a `state:`
   comparison actually reads.
2. Make a change to one staging model and, using two manifests (before
   and after the change), try `dbt build --select state:modified+
   --state <path-to-old-manifest>` and confirm only the changed model
   and its downstream dependents run.
3. If you have dbt Cloud access, check whether an existing CI job's
   settings show "Defer to a previous run state" enabled.

## Check yourself

You're ready for Lesson 36 when you can explain, in your own words,
why `state:modified+` alone isn't enough — and what deferral adds that
makes a partial CI run actually work.
