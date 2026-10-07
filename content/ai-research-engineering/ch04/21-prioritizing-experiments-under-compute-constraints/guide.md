# Prioritizing Experiments Under Compute Constraints

Scheduling policy (Lesson 20) decides whose queued job runs next. It says nothing about whether that job should have been queued at all. With a fixed compute budget, the actual constraint most research teams hit isn't "the scheduler is unfair" — it's "we have more experiment ideas than GPU-hours," which is a prioritization problem, not an infrastructure problem.

## What you'll learn

- Why "run everything, see what sticks" doesn't scale even on large clusters
- A framework for ranking candidate experiments by expected information gain per GPU-hour
- Using cheap proxies (small-scale runs, partial training) before committing full budget
- When to kill a running experiment early vs. let it finish

## Expected information gain per GPU-hour

Not every experiment that could answer a question is equally worth running. A useful ranking heuristic is expected information gain divided by cost: how much does this experiment change what the team believes, relative to how many GPU-hours it costs to find out? A cheap ablation that could falsify your main hypothesis (removing the proposed component and checking if performance actually drops) is high information-gain per hour. A hyperparameter tweak with a well-established prior (nudging weight decay by 2x when the paper's own ablations already answered this) is usually low information-gain per hour — it's answering a question that's already mostly answered.

```
priority_score = expected_information_gain / estimated_gpu_hours
```

This isn't a formula to compute precisely — it's a framing question to ask explicitly before submitting a job: "what will I actually learn from this that I don't already know, and is that worth the compute?"

## Cheap proxies before full-scale commitment

Before committing a full training budget to an idea, run a cheap proxy that correlates with the real answer: a scaled-down model, a subset of the data, or a short partial-training run checked against known scaling trends. If a change to the attention mechanism doesn't show any effect at a 10M-parameter scale over a few thousand steps, that's weak evidence either way at full scale — but if it clearly breaks training even at small scale, that's strong evidence not to spend a full budget finding out at scale. Scaling laws research (Kaplan et al., Chinchilla) exists partly because teams need principled ways to extrapolate small-scale signal to large-scale decisions, rather than guessing.

## Killing a run early vs. letting it finish

The early-termination policies from Lesson 17 (Hyperband, ASHA) automate this for sweeps, but the same judgment applies to a single long-running experiment outside a sweep: if a run's validation loss curve has clearly plateaued or diverged relative to a comparable baseline by, say, 20% of the way through training, continuing to completion rarely changes the conclusion and costs real GPU-hours that a different experiment could use instead.

```python
# A simple manual early-kill heuristic, checked periodically against a baseline curve
if current_val_loss > baseline_val_loss_at_this_step * 1.15:
    print("Diverging from baseline trajectory -- consider killing this run")
```

The discipline that matters is checking in on long runs rather than launching and forgetting them until completion — a run left unattended for days can burn a week's compute budget on a result that was visibly a dead end after the first few hours.

## Key terms

- **Expected information gain per GPU-hour** — a prioritization heuristic weighing how much an experiment would change current understanding against its compute cost
- **Cheap proxy** — a small-scale or short-duration run used to get directional signal before committing a full training budget
- **Scaling laws** — empirical relationships (model size, data size, compute) used to extrapolate small-scale experimental signal to large-scale decisions
- **Early kill** — manually or automatically stopping a run whose trajectory has already diverged from a useful outcome, before it reaches completion
