# Designing a Reward From Execution Cost

`QueryPlanEnv` can already execute a hinted query and capture its logical reads. Turning that number directly into a reward would train an agent that only ever cares about the biggest queries in the sample — this lesson explains why, and builds the scale-invariant reward that actually goes into `step()`.

## What you'll learn

- Why raw logical reads make a bad reward as-is
- The baseline-relative reward formula this project actually uses
- How the baseline is measured without wasting a second environment
- What a positive vs. negative reward means for the agent's choice

## The problem with raw logical reads

Logical reads for this join vary enormously depending on the sampled date range. A narrow, few-day window in a quiet territory might read on the order of 50 pages. A multi-year window in a busy territory can read 50,000 or more. If the reward were just `-reads` (lower is better, so negate it), the agent's training signal would be completely dominated by the wide-range episodes — a 40,000-read swing on one episode outweighs a 200-read swing on another by two orders of magnitude, even if the agent made the objectively better relative choice on the narrow one. PPO would learn almost nothing from narrow-range episodes; its policy gradient would be saturated by the handful of enormous numbers in the batch.

```python
# What NOT to do:
reward = -reads  # dominated by whichever episode happened to be wide-range
```

## The fix: reward relative to the optimizer's own default

Instead of rewarding absolute cost, this project rewards *relative* improvement over what the optimizer itself would have done with no hint at all — action 0. For every episode, the environment also runs the no-hint version of the same query once, captures its logical reads as `baseline_reads`, and computes:

```python
def _compute_reward(self, action, agent_reads, baseline_reads):
    return (baseline_reads - agent_reads) / baseline_reads
```

- If the agent's hint reduces reads below the baseline, the numerator is positive — the agent beat the optimizer's own default plan, and the magnitude of the reward reflects by how much, as a fraction.
- If the agent's hint makes things worse, the numerator is negative — a penalty scaled the same way.
- If the agent picks action 0 itself, `agent_reads == baseline_reads` and the reward is exactly `0.0` — doing what the optimizer would have done anyway is neutral, not rewarded or punished.

Because this reward is a ratio, a win on a 50-read episode and a win on a 50,000-read episode of the same *relative* size produce the same reward value. That's what makes it scale-invariant: the agent is being trained to find hints that reliably beat the optimizer's own plan in relative terms, regardless of how big any individual query happens to be.

## Measuring the baseline without a second environment

The baseline has to come from actually running the no-hint query, not from estimating it — but running it doesn't require a second `Env` or a second connection. `step()` just executes the no-hint query once per episode in addition to the hinted one, before computing the reward:

```python
def step(self, action):
    hint = HINTS[action]
    sql_hinted = self._build_sql(hint)
    agent_reads = self._run_and_capture_reads(sql_hinted)

    if action == 0:
        baseline_reads = agent_reads
    else:
        sql_baseline = self._build_sql(HINTS[0])
        baseline_reads = self._run_and_capture_reads(sql_baseline)

    reward = self._compute_reward(action, agent_reads, baseline_reads)
    ...
```

Skipping the redundant baseline run when `action == 0` avoids running the identical query twice in the same episode — a small efficiency detail, but one that matters once training runs into the thousands of episodes PPO needs.

## What this reward actually teaches

A reward of `0.0` isn't failure — it's "no worse than doing nothing," which is itself useful information for the agent to receive on episodes where no hint actually beats the optimizer's plan. The agent only gets a strong positive signal on episodes where a specific hint provably helps, which is exactly the behavior Lesson 7's training run is trying to produce: a policy that's selective about when it overrides the optimizer, not one that always reaches for the same hint.

## Key terms

- **Baseline-relative reward** — a reward computed as improvement over a reference value (here, the optimizer's own no-hint plan), rather than an absolute cost
- **Scale invariance** — a reward design property where episodes of very different absolute magnitude produce comparable reward values for comparable relative improvement
- **`baseline_reads`** — the logical reads from running the same query with action 0 (no hint), measured once per episode
- **Policy gradient saturation** — when a few large-magnitude samples in a batch dominate the training signal, drowning out smaller but equally meaningful samples

## Recap

Raw logical reads make a bad reward because they range from roughly 50 to over 50,000 depending on the sampled date range, so this project instead measures the optimizer's own no-hint baseline once per episode and rewards `(baseline_reads - agent_reads) / baseline_reads` — positive when the agent beats the optimizer's default plan, negative when it loses, and scale-invariant across episodes of any size. Next up, Lesson 7: training a PPO agent against this reward.
