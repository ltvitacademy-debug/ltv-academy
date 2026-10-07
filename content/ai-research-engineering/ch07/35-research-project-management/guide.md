# Research Project Management

Research timelines break the assumptions most project-management practice is built on. A typical software task has a known shape — implement this feature, in roughly this much time. A research task often doesn't: "does this approach work" can take a day or three weeks, and the honest estimate going in is genuinely wide. Managing research projects well means tracking different things than a typical sprint board tracks, and being explicit about uncertainty instead of pretending a research timeline is a software timeline wearing a disguise.

## What you'll learn

- Why story points and sprint velocity map poorly onto open-ended research questions
- Tracking hypotheses and what would falsify them, instead of tracking tasks
- Setting and respecting a compute budget as the actual timeline constraint
- Time-boxing a research direction with an explicit decision point, not an open-ended "keep trying"

## Why standard sprint tracking doesn't fit

A software ticket is well-defined because the work itself is well-understood before it starts: implement the known algorithm, wire up the known API. A research question is often open precisely because the answer isn't known — "will a sparsity penalty help" doesn't decompose into sub-tasks with known effort the way "add a login page" does. Forcing a research question into a two-week sprint with story points tends to produce one of two bad outcomes: the estimate is fiction and gets quietly blown through, or the actual research gets truncated to fit the estimate regardless of whether that's the right point to stop.

## Track hypotheses, not just tasks

A more honest unit of research progress is the hypothesis: a specific, falsifiable claim, together with the experiment that would falsify it and the compute budget allocated to testing it. A lightweight tracker looks less like a kanban board of tasks and more like a running log:

```
Hypothesis: sparsity penalty (λ sweep 0.01-1.0) improves val perplexity
  Falsified by: no λ in the sweep beats the dense baseline by >1 std
  Budget: 8 GPU-days
  Status: 5/8 GPU-days used, 2 of 5 λ values swept, no improvement yet

Hypothesis: the lack of improvement traces to insufficient LR tuning for sparse variant
  Falsified by: LR sweep for sparse variant alone still underperforms dense
  Budget: 1 GPU-day
  Status: not started
```

This format makes two things visible that a task list hides: what specific evidence would change the team's mind, and how much budget is actually left before a decision has to be made regardless of the outcome so far.

## Compute budget as the real timeline constraint

In most research settings, compute budget is a harder constraint than calendar time — a GPU-day spent on one experiment is a GPU-day not available for another, in a way that two weeks of a researcher's calendar time isn't necessarily fungible the same way. Tracking "GPU-days spent" and "GPU-days remaining" against a hypothesis, the way the example above does, is often more informative for planning than tracking calendar days against a task, because it ties directly to the actual scarce resource.

## Time-box with an explicit decision point

The single most useful project-management habit for an open-ended research direction is deciding, before starting, what evidence at what point will trigger a decision to continue, pivot, or stop — and writing it down somewhere the whole team can see it, not just carrying it as an unstated intuition. "We'll have swept 5 values of λ by Friday; if none beats the baseline by more than 1 std, we move to the next hypothesis" is a concrete, checkable commitment. Without it, a research direction that isn't working can quietly consume weeks past the point where the evidence already justified stopping, simply because no one set an explicit checkpoint to force the decision.

## Key terms

- **Hypothesis tracking** — logging research progress as falsifiable claims with an explicit falsification condition and budget, rather than as a list of tasks
- **Falsification condition** — the specific evidence that would show a hypothesis is false, stated in advance so a negative result is recognized as such
- **Compute budget** — the GPU-time (or similar) allocation treated as the real scarce resource constraining a research direction, often more binding than calendar time
- **Time-boxed decision point** — a pre-committed point at which a research direction will be evaluated to continue, pivot, or stop, set before the work begins
