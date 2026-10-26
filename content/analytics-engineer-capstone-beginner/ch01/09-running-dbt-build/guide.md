# Lesson 9 — Running dbt build and Reading the Results

**Chapter 1 · Beginner Capstone: First dbt Model on Snowflake · Lesson 9 of 10**

## What you'll learn

- The real `dbt build` command — running every model and every test together, in one pass
- How to read a real, complete `dbt build` output for this exact project, line by line
- What a real failing test would have looked like at this final stage, and why catching
  it here still beats catching it later
- How this one command is the final proof that Lesson 1's ask was actually met

## One command, the whole project

Every piece has been built and run individually so far: the staging model (Lesson 6), its
tests (Lesson 7), the mart model (Lesson 8). `dbt build` runs all of it together, in
dependency order, models and tests interleaved — exactly the command a real analytics
engineer reaches for once a project reaches this point, instead of running `dbt run` and
`dbt test` as two separate steps forever.

```bash
dbt build
```

## Reading this project's real output

```
Found 2 models, 3 data tests, 1 source, 0 exposures, 0 metrics

Concurrency: 4 threads (target='dev')

1 of 4 START sql table model dbt_yourname.stg_jaffle_shop__customers ... [RUN]
1 of 4 OK created sql table model dbt_yourname.stg_jaffle_shop__customers ... [SUCCESS 1 in 1.42s]
2 of 4 START test not_null_stg_jaffle_shop__customers_customer_id ......... [RUN]
2 of 4 PASS not_null_stg_jaffle_shop__customers_customer_id ............... [PASS in 0.61s]
3 of 4 START test unique_stg_jaffle_shop__customers_customer_id ........... [RUN]
3 of 4 PASS unique_stg_jaffle_shop__customers_customer_id .................. [PASS in 0.58s]
4 of 4 START sql table model dbt_yourname.customers ........................ [RUN]
4 of 4 OK created sql table model dbt_yourname.customers ................... [SUCCESS 1 in 1.19s]

Finished running 2 table models, 2 tests in 0 hours 0 minutes and 4.80 seconds (4.80s).

Completed successfully

Done. PASS=4 WARN=0 ERROR=0 SKIP=0 TOTAL=4
```

Read it top to bottom, exactly the habit the prerequisite dbt course taught:

- **`Found 2 models, 3 data tests, 1 source`** — dbt's parse pass: the two real models
  from Lessons 6 and 8, the `not_null` and `unique` tests from Lesson 7, and the one
  source from Lesson 5. (Three data tests is correct — `not_null` and `unique` are two of
  the three generic tests any `.yml` file can declare; this project attaches exactly
  those two.)
- **The order** — staging model first, then its two tests, then the mart model last.
  That's the dependency graph deciding order, not file order: tests run as soon as the
  model they check is built, and the mart waits until staging (and its tests) succeed.
- **`Done. PASS=4 WARN=0 ERROR=0 SKIP=0 TOTAL=4`** — the line to check first, always.
  Four things ran: two models, two tests, all four `PASS`.

## What a failure would have looked like here

If the `unique` test had failed, the line would read `FAIL 1` instead of `PASS`, and —
critically — **the `customers` mart model would have been `SKIP`ped**, not built on top
of data already known to be broken. That's the dependency graph protecting the final
deliverable: dbt would rather hand back no mart table than a mart table built on
duplicate customer IDs.

## Why this command is the real finish line

Lesson 1 asked for one thing: a customer list someone could trust. `dbt build`'s
`Done. PASS=4 ... ERROR=0` line is the literal, checkable proof that the project met that
ask — not a claim, a passing automated check anyone at Jaffle Shop could rerun themselves.

## Key terms

| Term | Meaning |
|---|---|
| `dbt build` | Runs every model and every test together, in dependency order, in one command |
| `SUCCESS` / `PASS` / `FAIL` / `SKIP` | Per-step outcomes in a `dbt build` run |
| Skip-on-failure | A model is skipped if something it depends on failed, protecting it from building on bad data |
| `Done. PASS=... ERROR=...` | The summary line to check first, always |

## Lab

1. Run `dbt build` against your own project and confirm you see
   `Done. PASS=4 WARN=0 ERROR=0 SKIP=0 TOTAL=4` (or close to it, depending on your own
   setup).
2. Deliberately break something — insert a duplicate `customer_id` into `raw_customers`
   in Snowflake — and rerun `dbt build`. Confirm you see a real `FAIL` on the `unique`
   test and a real `SKIP` on the `customers` model. Then undo the change and confirm a
   clean run again.
3. Write, in your own words, one sentence connecting this `PASS=4` output back to Lesson
   1's original ask.

## Check yourself

You're ready for Lesson 10 when `dbt build` runs clean against your own project, and you
can explain exactly what would get skipped, and why, if one of the two tests failed.
