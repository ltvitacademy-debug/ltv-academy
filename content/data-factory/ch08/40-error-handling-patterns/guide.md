# Lesson 40 — Error Handling Patterns

**Chapter 8 · Monitoring & Error Handling · Lesson 3 of 4**

## What you'll learn

- The four conditional paths every activity actually offers
- The Try-Catch-Proceed pattern, and why it matters
- Generic error handling for sequential pipelines
- How Data Factory actually decides if a pipeline "succeeded"

## Four paths out of every activity

Every activity in a pipeline offers four genuinely distinct outgoing
paths, not just one:

![Four small path icons on an activity's edge: a grey loop, a green checkmark, a red X, and a blue arrow.](/courses/data-factory/ch08/40-error-handling-patterns/pipeline-error-1-four-branches.png)
*Upon Success (green), Upon Failure (red), Upon Completion (blue), and Upon Skip (grey) — each one a different real path out of the same activity.*

| Path | Fires when |
|---|---|
| Upon Success | The activity succeeded |
| Upon Failure | The activity failed |
| Upon Completion | The activity finished at all, success or failure |
| Upon Skip | The activity itself never ran |

One real constraint: **Upon Completion can't coexist** with Upon
Success or Upon Failure on the same activity — you choose either the
success/failure split, or the single completion path.

## Try-Catch-Proceed: error handling that doesn't block

The single most useful pattern in this lesson. An activity might
fail partway through — a Copy job that dies mid-transfer, leaving a
partial file behind. You want to clean that up, but you don't want
one activity's failure to halt the entire rest of the pipeline:

![Pipeline diagram: FirstActivity's failure path connects to ErrorHandling; both ErrorHandling's success path and FirstActivity's skip path connect into NextActivity.](/courses/data-factory/ch08/40-error-handling-patterns/error-handling-1-try-catch.png)
*ErrorHandling runs only if FirstActivity fails. NextActivity runs either way — connected from both ErrorHandling's Upon Success path and FirstActivity's Upon Skip path.*

To build it:

1. Add your first activity.
2. Connect its **Upon Failure** path to an error-handling activity.
3. Add the next activity in your real sequence, but don't connect it
   to the first activity directly.
4. Connect **both** the error-handling activity's Upon Success path
   *and* the first activity's Upon Skip path into that next activity.

The Upon Skip connection is the trick that makes this work: if the
first activity succeeds, the error-handling activity is skipped, and
that skip itself satisfies the Upon Skip condition feeding the next
activity.

## Generic error handling for a sequential pipeline

For a straightforward chain of activities — Copy, then Copy, then
Copy — you often just want one shared handler at the end:

![Pipeline diagram: four sequential Web activities, with the last one's success and failure paths both feeding into a GenericErrorHandler activity.](/courses/data-factory/ch08/40-error-handling-patterns/error-handling-3-generic-no-branching.png)
*Connect both the Upon Failure and Upon Skip paths of the last activity in the chain to one shared error handler — it fires if anything upstream failed, silently does nothing if everything succeeded.*

## Try-Catch vs. Do-If-Else: does the pipeline actually fail?

This is the detail that trips people up: **defining an Upon Failure
path doesn't automatically make the overall pipeline "fail."**
Data Factory evaluates only the pipeline's leaf activities (the ones
with nothing downstream of them) to decide overall success.

| Pattern | You define | Activity fails → pipeline shows |
|---|---|---|
| Try-Catch | Only Upon Failure | **Success** (if the handler succeeds) |
| Do-If-Else | Upon Failure *and* Upon Success | **Failure** |
| Do-If-Skip-Else | Upon Failure, Upon Success, plus a dummy Upon Skip step | **Success** |

If you actually want a failed activity to make the whole pipeline
show red — say, so a downstream alert fires — use Do-If-Else, not
Try-Catch. If you want the pipeline to absorb the failure and
continue reporting green, Try-Catch is correct.

## Key terms

| Term | Meaning |
|---|---|
| Leaf activity | An activity with no activities connected downstream of it |
| Try-Catch-Proceed | A pattern where a failure is handled but doesn't block the rest of the pipeline |
| `@activity('Name').Status` | Expression reading a specific activity's outcome, used in If Condition logic for "or" scenarios |

## Lab

1. In one of your existing pipelines, add an Upon Failure path from a
   Copy activity to a new Wait activity.
2. Connect both the Upon Skip path of the Copy activity and the Upon
   Success path of the Wait activity into whatever activity comes
   next.
3. Write one sentence explaining why this pipeline still shows
   "Succeeded" even if the Copy activity fails.

## Check yourself

You're ready for Lesson 41 when you can explain, in one sentence, the
real difference between the Try-Catch and Do-If-Else patterns in
terms of what the overall pipeline status actually shows.
