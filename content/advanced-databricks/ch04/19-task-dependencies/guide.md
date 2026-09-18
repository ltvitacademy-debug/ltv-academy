# Lesson 19 — Task Dependencies

**Chapter 4 · Jobs, Workflows & Orchestration · Lesson 19 of 34**

## What you'll learn

- `depends_on` — the actual field connecting one task to another
- `Run if` conditions: the six real options beyond "runs after success"
- Fan-out and fan-in — one task feeding several, or several feeding one
- Why "Excluded" is a genuinely different outcome from "Failed"

## `depends_on`, plainly

Lesson 18's dragged line between two task boxes sets one field:
`depends_on`, naming the upstream task. By default, a task with a
`depends_on` entry only runs once every task it depends on has
**succeeded** — the same assumption Lesson 11's simple task chain and
Lesson 54's Pipeline task both made, without ever needing to say so
explicitly.

## The six real `Run if` conditions

That default is just one of six options a task's `Run if` setting can
actually be:

```
All succeeded          -- default: every dependency succeeded
At least one succeeded -- only one dependency needs to have succeeded
None failed             -- no dependency failed (skips are fine)
All done                -- runs regardless of dependency outcome
At least one failed     -- runs only if something upstream broke
All failed               -- runs only if everything upstream broke
```

"At least one failed" and "All failed" are exactly how a real
cleanup-or-alert task gets built: a task that's supposed to run *because*
something else broke, not despite it — a pattern a simple "runs after
success" chain can't express at all.

## Fan-out, fan-in

```
        -> transform_customers ->
ingest                              -> load_gold
        -> transform_orders    ->
```

**Fan-out**: one upstream task (`ingest`) feeds multiple downstream tasks
that can run in parallel. **Fan-in**: multiple upstream tasks
(`transform_customers`, `transform_orders`) must all finish before one
downstream task (`load_gold`) starts. Both patterns use the exact same
`depends_on` field — `load_gold` simply lists two dependencies instead of
one, and the default "All succeeded" condition means both have to finish
successfully first.

## "Excluded" is not "Failed"

A task whose `Run if` condition isn't met is marked **Excluded** — skipped,
not failed. This matters for anything downstream of it: an excluded task's
own dependents are, by default, excluded too, cascading down a chain. A
genuinely failed task instead marks its dependents "Upstream failed" — a
different status, meaning something actually broke, rather than a
condition simply not being met.

## Key terms

| Term | Meaning |
|---|---|
| `depends_on` | The field naming which task(s) an upstream task must complete before this one runs |
| `Run if` | The condition evaluated against dependencies' outcomes to decide whether a task runs |
| Fan-out / fan-in | One task feeding several in parallel / several tasks required before one downstream task |

## Check yourself

You're ready for Lesson 20 when you can explain, without looking: what's the
real difference between a task marked "Excluded" and one marked "Upstream
failed"?
