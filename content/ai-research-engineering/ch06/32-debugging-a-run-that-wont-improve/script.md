# Script — Debugging a Run That Won't Improve

## Segment 1 (title)

This is the scenario the chapter has been building toward: nothing crashes, there are no NaNs, every sanity check from last lesson passes — and the metric you care about just refuses to move past a plateau. There's no exception to point at, just a loss curve that's flat when it shouldn't be. This lesson is a systematic process for working through the most common causes, cheapest first.

## Segment 2 (steps)

Work through causes in this order, roughly by how cheap each is to rule out. First, the learning rate — too small looks flat, too large bounces without progress. Second, whether the loss being optimized actually correlates with the metric being watched. Third, data problems like label collapse or accidental deduplication wearing a training-problem costume. Capacity and representation come last, because testing that hypothesis is the most expensive.

## Segment 3 (code)

A short learning-rate sweep across a few orders of magnitude, run for just a couple hundred steps on a small subset, takes minutes and rules out both too-small and too-large learning rates before assuming anything structural is wrong. Look for the rate where the loss separates fastest from its starting value without diverging — that's roughly the right order of magnitude to be training at.

## Segment 4 (code)

A one-line label-distribution check — just counting labels in the dataset — often explains a stubborn plateau better than questioning the architecture. A near-total collapse onto a single label, or far fewer unique labels than expected after some preprocessing step, is a data bug, not an optimization or capacity problem, and it's seconds to check.

## Segment 5 (outro)

That closes Chapter 6 — the full arc from silent bugs, through numerical issues, correctness verification, and sanity checks, to systematically debugging a stuck run. Chapter 7 shifts from debugging code to communicating results, starting with how to structure a technical research report readers can actually trust.
