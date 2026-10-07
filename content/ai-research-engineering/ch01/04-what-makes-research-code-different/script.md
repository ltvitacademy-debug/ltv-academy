# Script — What Makes Research Code Different

## Segment 1 (title)

This lesson closes the chapter by looking directly at the code. We've covered the role, the boundary with product engineering, and the daily rhythm. Now: what does research code actually look like on screen, and why is it scrappier in some places and stricter in others than new hires expect?

## Segment 2 (steps)

A huge share of research code exists to answer one question and then gets thrown away. A researcher wants to know whether a new initialization scheme changes the loss curve's shape in the first thousand steps. That script doesn't need a config system or to handle any dataset but the one it was pointed at — it needs one correct plot, today. Labs are explicit in their public engineering writing that making every such script production-quality would slow research down for no benefit.

## Segment 3 (code)

That's why notebooks and shared libraries coexist in the same codebase. Exploratory code lives in a notebook cell, optimized for running a cell, checking a number, and changing one line, and it dies once the question is answered. Shared library code — the training loop, the data pipeline, the eval harness — gets tested and reviewed like a product codebase, because a bug there doesn't invalidate one experiment, it can silently invalidate every experiment that touched it that week.

## Segment 4 (steps)

Research teams trade away robustness for speed, but never correctness of the specific result being reported. A fast script that silently computes the wrong metric is worse than no script at all, because it produces false confidence instead of an honest "I don't know yet." So even the scrappiest script still sanity-checks its number against a known baseline, prints intermediate values instead of trusting a black box, and scrappiness never extends to hot-patching the shared infrastructure everyone else depends on.

## Segment 5 (outro)

That closes out the role itself — the boundaries, the rhythm, and now the code. Up next, chapter two begins with lesson five: how to read an ML paper.
