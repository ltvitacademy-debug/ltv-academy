# Lesson 15 — Enforcing Tests as a Governance Gate

**Chapter 4 · Testing, Documentation & Governance · Lesson 15 of 26**

## What you'll learn

- Why `dbt build` — not `dbt run` and `dbt test` as two separate
  commands — is the real production pattern
- What actually happens, in dependency order, when a test fails inside
  a `dbt build`
- Why failing tests should block downstream consumption, not just get
  logged somewhere
- How this lesson's gate is the same mechanism Chapter 6 wires into CI

## dbt run + dbt test vs. dbt build

```
dbt run              # builds every model, regardless of any test result
dbt test             # tests every model, after they're all already built

dbt build            # builds seeds, models, snapshots, and tests together,
                      # in dependency order, stopping before building on
                      # top of anything that just failed a test
```

Running `dbt run` then `dbt test` as two separate commands builds
every model first, no matter what — including a mart built directly
on top of a staging model that's about to fail a test. `dbt build`
interleaves tests into the dependency order itself: if
`stg_jaffle_shop__orders`'s `not_null` test on `order_id` fails, `dbt
build` stops before ever building `orders` or `customers` on top of
that bad data.

## Walking through a real failure

Say Lesson 13's `non_negative` test on `orders.amount` fails because a
payment record briefly had a negative value during a source system
glitch. Inside `dbt build`:

1. `stg_jaffle_shop__payments` builds and passes its own tests.
2. `int_orders__payment_summary` builds on top of it.
3. `orders` builds — then its `non_negative` test on `amount` runs and
   **fails**.
4. `customers`, which depends on `orders` via `ref()`, **never gets
   built this run** — `dbt build` stops the branch of the dependency
   graph downstream of the failure.

Nothing silently ships. The business never sees a `customers` mart
built on top of data that just failed a real, named test.

## Why this has to block, not just log

A test that only logs a warning (dbt does support `severity: warn` for
exactly this case, used sparingly) still lets the bad data flow
downstream unchanged — the test becomes a note, not a gate. For a
check like `non_negative` on a money column, this platform uses the
default `severity: error`, deliberately: a negative payment amount
reaching `customers.lifetime_value` and then Power BI is a worse
outcome than a `dbt build` stopping and asking a human to look at it.

## Setting up Chapter 6's real payoff

This lesson's gate — `dbt build` stopping on a failed test — is a
useful safety net on a developer's own laptop. It becomes a real
governance control only once it runs automatically on every proposed
change, before that change can merge: that's exactly what Chapter 6's
CI/CD pipeline wires up, running this same `dbt build` command inside
GitHub Actions, on every pull request, with no developer action
required to trigger it.

## Key terms

| Term | Meaning |
|---|---|
| `dbt build` | Runs seeds, models, snapshots, and tests together in dependency order |
| Blocking the branch | When a model's test fails, every model downstream of it (via `ref()`) doesn't get built that run |
| `severity: error` vs `severity: warn` | Controls whether a failing test stops the build or only logs a warning |

## Lab

1. Write out, in order, what `dbt build` does differently from running
   `dbt run` then `dbt test` separately.
2. Walk through the four-step failure trace above for a `non_negative`
   test failure on `orders.amount`, in your own words.
3. Explain, in one sentence, why this platform uses the default
   `severity: error` on `non_negative` instead of `severity: warn`.

## Check yourself

You're ready for Chapter 5 when you can explain why `dbt build` is the
right production default over separate `run`/`test` commands, and why
a test that only warns doesn't actually function as a governance gate.
