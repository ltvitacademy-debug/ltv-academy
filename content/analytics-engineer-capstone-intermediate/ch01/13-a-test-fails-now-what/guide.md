# Lesson 13 — A Test Fails — Now What?

**Chapter 1 · Intermediate Capstone: The Orders Analytics Layer · Lesson 13 of 16**

## What you'll learn

- Reproducing a test failure reliably before touching any model
- Why isolating one variable at a time is the first real diagnostic
  step, the same method this capstone's own earlier chapter already
  used for a Power BI bug
- What a real `dbt test` failure actually tells you, and what it
  doesn't yet
- The specific tell that narrows this failure down before you open a
  single model file

## The scheduled job reports red

A few days after this chapter's models went live, the nightly
`dbt build` job's test step fails:

```
Failure in test unique_fct_orders_order_id (models/marts/schema.yml)
  Got 14 results, configured to fail if != 0
```

That's a real `unique` test failure on `fct_orders.order_id` — exactly
the test Lesson 8 added, and exactly the test this chapter told you to
keep in mind back in Lessons 6 and 12. A number alone — "14 results"
— isn't enough to act on yet. The first job isn't fixing anything.
It's reproducing the problem reliably, on your own screen, before you
touch a single model.

## Step 1: reproduce it exactly

```sql
select order_id, count(*)
from fct_orders
group by 1
having count(*) > 1
```

Run this directly in Snowflake against the current `fct_orders`. If
it returns rows, you've confirmed the failure is real and
reproducible — not a flaky test run — and you now have a concrete list
of duplicated `order_id` values to work from instead of a vague "14
results."

## Step 2: isolate the variable — did it fail before?

Check whether this same test passed cleanly back in Lesson 8, right
after this model was first built. It did. That's the single most
useful fact in this whole investigation: something changed *between*
Lesson 8 and now — most likely new rows that landed through this
model's incremental runs since then, since nothing about the model's
SQL itself has changed.

## That pattern is the real tell

A `unique` test that passed on a smaller, earlier version of the data
and now fails on a larger one, with no code changes in between, is a
specific kind of lead: whatever is wrong is tied to *which rows* exist
now that didn't before — not a logic error that would have failed
from day one. Recall Lesson 6's own note: this model's payments join
was flagged as worth watching, specifically because a join that isn't
one-row-per-order can duplicate order rows. That's not an accusation
yet. It's a lead, and the next lesson follows it.

## What NOT to do yet

Don't rewrite the join, don't delete duplicate rows by hand, and
don't guess which specific orders are the problem ones. You have a
reproducible symptom and a strong lead. Lesson 14 confirms the actual
cause before anything gets changed.

## Key terms

| Term | Meaning |
|---|---|
| Reproduce | Confirm a reported failure by triggering it yourself, under known conditions |
| Isolate the variable | Change one thing at a time (here: compare data-over-time, not code) to see what it affects |
| Symptom | An observed failure (duplicate order_ids) — not yet the cause |

## Lab

Run the `group by ... having count(*) > 1` query above against your
own `fct_orders`. Record how many distinct `order_id` values come back
duplicated, and for one of them, note its row count.

## Check yourself

You're ready for Lesson 14 when you can answer, without looking: what
specific fact — not just "the test fails" — tells you this is a
*new* data problem rather than a problem that's always existed?
