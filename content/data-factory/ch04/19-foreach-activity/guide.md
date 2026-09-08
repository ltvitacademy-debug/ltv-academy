# Lesson 19 — ForEach Activity

**Chapter 4 · Control Flow & Orchestration · Lesson 3 of 6**

## What you'll learn

- What ForEach actually iterates over
- The exact steps to configure one against an array
- `@item()`, and how activities inside the loop reference the current value
- `isSequential` and `batchCount` — running one at a time, or many at once

## Repeating a set of activities, once per item

The **ForEach** activity defines a repeating control flow — exactly
like a `foreach` loop in any programming language. Give it a
collection, and it runs its child activities once for every item in
that collection.

## Setting up the collection to iterate over

ForEach needs an array to iterate over — often an **array-type
variable** defined on the pipeline:

![Screenshot of a pipeline's Variables tab with an array-type variable being added.](/courses/data-factory/ch04/19-foreach-activity/pipeline-array-variable.png)
*An array variable — or the output of a Lookup activity with `firstRowOnly: false` (Lesson 14) — both work as ForEach's input.*

## Configuring the activity

Drag **ForEach** onto the canvas, then configure its **Settings**:

![Screenshot of the ForEach activity's Settings tab, showing Sequential checkbox, Batch count field, and Items field referencing an array variable.](/courses/data-factory/ch04/19-foreach-activity/for-each-activity.png)

Select the **Items** field, choose **Add dynamic content**, and
reference your array — the variable from the last step, or a Lookup
activity's `value` output.

## `@item()`: referencing the current value

Inside any activity nested inside the ForEach, reference whatever the
loop is currently iterating over with **`@item()`**:

![Screenshot of the dynamic content editor with the ForEach iterator option selected, showing @item() available as an expression.](/courses/data-factory/ch04/19-foreach-activity/for-each-iterator.png)
*If Items is `[1, 2, 3]`, `@item()` returns 1 on the first pass, 2 on the second, 3 on the third.*

This is exactly the pattern from Lesson 14's Lookup example: a
ForEach iterating over a Lookup's `value` array, with a Copy activity
inside referencing `@item().table` as the name of whichever table
that particular iteration is handling.

## Sequential or parallel

Two settings control how the loop actually runs:

- **`isSequential`** — `true` runs iterations one at a time, in
  order; `false` (the default) runs them in parallel.
- **`batchCount`** — the upper limit on how many iterations run
  concurrently when parallel, up to a maximum of **50**.

Parallel is faster, but use it with real caution: if two concurrent
iterations write to the exact same file or the exact same variable
(recall Lesson 17's warning), you can end up with a genuine write
conflict. Sequential is the safer default whenever iterations aren't
truly independent of each other.

## Two real limits

- **No nesting** — a ForEach can't contain another ForEach (or an
  Until) directly. The workaround: a two-level pipeline, where the
  outer ForEach calls an **Execute Pipeline** activity (Lesson 21)
  containing the inner loop.
- **Maximum 100,000 items**, with a maximum `batchCount` of 50 for
  parallel runs.

## Key terms

| Term | Meaning |
|---|---|
| Items | The array a ForEach activity iterates over |
| `@item()` | The expression referencing the current value inside a ForEach's child activities |
| isSequential | Whether iterations run one at a time (true) or in parallel (false) |
| batchCount | The upper concurrency limit for parallel iterations, maximum 50 |

## Lab

1. Add an array variable to a pipeline, and build a ForEach activity
   that iterates over it.
2. Inside the loop, add a Wait activity referencing `@item()` in some
   way you can verify in Debug output.
3. Toggle `isSequential` from true to false, rerun, and note any
   difference in run order.

## Check yourself

You're ready for Lesson 20 when you can explain, in your own words,
why writing to the same file from two parallel ForEach iterations is
risky, and what setting would make it safe again.
