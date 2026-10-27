# Lesson 3 — Why a Full Reload No Longer Works

**Chapter 1 · Data Engineering Capstone — Intermediate Project · Lesson 3 of 16**

## What you'll learn
- Why runtime and cost in a full-reload pipeline scale with total accumulated history, not with what's actually new
- A concrete way to reason about this tradeoff without needing real benchmark numbers
- Why the problem gets worse every month, even if the business itself isn't growing
- The one-sentence principle that explains why this specific redesign is worth doing

## Reprocessing everything to get one new day

Here's the uncomfortable shape of the Beginner project's pipeline, stated plainly: every night, it
reads the *entire* accumulated history in `bronze.sales_raw`, rebuilds *all* of `silver.sales_clean`
from that history, and rebuilds *all* of Gold from that. All of that work happens just to answer one
new day's worth of questions — yesterday's transactions, which are the only rows that are actually
new since last night's run.

That's not a bug. It was the right call for a pipeline that had only been running a few weeks. The
problem is what happens as time passes and nothing about the *design* changes.

## Reasoning about the shape of the problem

You don't need a real benchmark to see where this goes — the shape of the problem is enough. Picture
a job that, today, reprocesses six months of accumulated sales history every night to add one new
day's worth of transactions. That job's nightly runtime is dominated by data it already processed
correctly the previous 179 nights. Only a tiny fraction of the work it does tonight is new.

Now fast-forward. The business keeps running, more days accumulate, and that same nightly job is now
reprocessing closer to a year of history to add the same one new day. The *new* work — one more day of
transactions — hasn't changed size at all. But the job now has roughly twice as much old history to
chew through to get there. The runtime isn't growing because the business got busier day to day; it's
growing because the pipeline insists on redoing work it already finished.

## Runtime and cost scale with the wrong thing

Say that principle out loud, because it's the core idea of this whole lesson: **in a full-reload
design, runtime and compute cost scale with total accumulated history, not with what's actually new.**
Every month that passes without changing the design, the nightly job gets a little more expensive and
takes a little longer, purely because history got a little longer — regardless of whether yesterday
was a slow Tuesday or the busiest day of the year.

That has two real consequences:

- **The batch window gets harder to hit.** If the nightly job needs to finish before stores open, a
  design whose runtime keeps creeping upward eventually misses that window, even with zero change in
  actual daily transaction volume.
- **Cost keeps rising with no new value delivered.** Every extra minute of compute spent re-reading
  six-months-old transactions that haven't changed produces exactly the same Gold table as before. It's
  pure overhead, and it compounds the longer the design stays unchanged.

## Why incremental fixes this specifically

An incremental design breaks the link between "total history" and "nightly cost." Once Bronze only
reads files newer than the watermark, and Silver only merges in the rows that are actually new, the
nightly job's cost tracks the size of *yesterday's* data, not the size of the whole table. A year from
now, under the incremental design, the nightly run looks almost exactly like it does today — because
it's still only processing one new day's worth of rows. That's the entire point of the redesign this
chapter is building: not clever code for its own sake, but breaking the dependency between pipeline
cost and accumulated history.

## Key terms

| Term | Meaning |
|---|---|
| Full reload | Reprocessing the entire accumulated history of a table on every pipeline run |
| Scales with history | A cost or runtime that grows as accumulated data grows, even when new daily volume is flat |
| Batch window | The time available for a nightly job to finish before downstream consumers need the result |
| Overhead | Work a pipeline does that produces no new value — here, re-reading unchanged historical data |

## Lab

Without doing any real benchmarking, sketch a simple two-line table by hand: one column for "months
of accumulated history," one column for "relative nightly runtime," using the six-months-of-history
example above as your starting point. Fill in three more rows going forward in time, reasoning only
from the principle in this lesson (runtime scales with total history, not with what's new). Don't
label any of your numbers as real measurements — this is an illustrative exercise, not a benchmark.

## Check yourself

Without looking back: state, in one sentence, why a full-reload pipeline's nightly runtime keeps
growing even if the business's day-to-day transaction volume is completely flat. Then explain why an
incremental design doesn't have that problem.
