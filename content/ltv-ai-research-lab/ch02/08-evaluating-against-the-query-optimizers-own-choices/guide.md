# Evaluating Against the Query Optimizer's Own Choices

A trained policy isn't evidence of anything until it's checked on episodes it never saw during training. This lesson builds that held-out grid, runs the trained PPO policy against it, compares it to SQL Server's own default plan on the exact same episodes, and reports a real number — plus a real failure mode the agent still has.

## What you'll learn

- How the held-out grid of (date_range_days, territory) combinations is built
- The exact comparison: agent's chosen hint vs. the optimizer's own default plan
- This project's actual held-out numbers
- The boundary-case failure mode, and why it matters for the write-up

## Building the held-out grid

The grid has to cover combinations the policy never trained on, so evaluation uses date ranges and territories sampled independently of the training run's random seed, spanning the same space: date ranges from 1 day to 3 years, across all available territories.

```python
import numpy as np

rng = np.random.default_rng(seed=999)  # a seed never used during training
held_out = [
    (int(rng.integers(1, 1095)), territories[rng.integers(0, len(territories))][0])
    for _ in range(240)
]
```

This project's held-out grid uses 240 (date_range_days, territory) combinations — enough to see a real pattern across the narrow-to-wide spectrum without needing an exhaustive sweep.

## The comparison

For every held-out combination, two things get measured against the *same* sampled parameters: the agent's chosen-hint logical reads, and the optimizer's own default-plan (action 0) logical reads.

```python
results = []
for range_days, territory_id in held_out:
    obs = build_obs(range_days, territory_id)
    action, _ = model.predict(obs, deterministic=True)
    agent_reads = run_hinted(action, range_days, territory_id)
    optimizer_reads = run_hinted(0, range_days, territory_id)  # action 0, no hint
    results.append((range_days, territory_id, action, agent_reads, optimizer_reads))
```

`deterministic=True` matters here — evaluation should check what the policy actually settled on, not a stochastic sample from its action distribution.

## The result

Across the 240 held-out episodes, the agent's chosen hint matched or beat the optimizer's own default plan on 78% of them (187 of 240) — a clear majority. On the episodes where it won outright, the average logical-read reduction was 34% relative to the optimizer's default. That's the headline number for Project 1: a trained policy that, more often than not, picks a hint that measurably helps, using nothing but two context features at decision time.

## The boundary-case failure mode

The result isn't clean everywhere. Looking at where the agent still loses to the optimizer's default plan, the losses cluster in one place: date ranges roughly between 10 and 18 days — right at the narrow/wide transition the Lesson 1 notebook entry was originally probing. In that boundary zone, the agent still picks `FORCE ORDER` on a meaningful share of episodes and loses to the optimizer's default plan when it does.

This is a real, reportable failure mode, not a rounding error: the policy learned the *general* pattern — `FORCE ORDER` for wide ranges, something else for narrow ones — but the transition between those two regimes isn't a clean threshold the policy nailed exactly. A handful of pixels-wide region of the `date_range_days` feature space still gets misclassified. Call it what it is: a **boundary-case regression**, and it belongs directly in Lesson 9's write-up, not buried in a footnote.

## Why this comparison, not a synthetic benchmark

Comparing against the optimizer's own default plan — rather than against some fixed "worst-case" hint or a synthetic cost model — keeps the evaluation honest about what actually matters: SQL Server's optimizer is already good. Beating it isn't a low bar. A 78% win-or-tie rate against a competent, cost-based optimizer, with a real average improvement on the wins, is a genuinely interesting result precisely because the baseline it's measured against isn't a strawman.

## Key terms

- **Held-out grid** — a set of (date_range_days, territory) combinations sampled independently of training, used only for evaluation
- **`deterministic=True`** — evaluating the policy's most-likely action rather than a stochastic sample, to measure what it actually settled on
- **Boundary-case regression** — this project's named failure mode: the agent still loses to the optimizer's default on a share of episodes near the narrow/wide date-range transition
- **Win-or-tie rate** — the fraction of held-out episodes where the agent's chosen hint matched or beat the optimizer's default-plan logical reads

## Recap

On a held-out grid of 240 (date_range_days, territory) combinations never seen during training, the trained agent matched or beat the optimizer's own default plan on 78% of episodes, with a 34% average logical-read reduction on the episodes it won — but it still loses to the default plan on a share of boundary-case episodes with date ranges roughly between 10 and 18 days, where it sometimes picks FORCE ORDER incorrectly. Next up, Lesson 9: writing this up as Project 1's claim, method, result, and limitation.
