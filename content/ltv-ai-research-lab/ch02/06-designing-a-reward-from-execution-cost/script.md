# Script — Designing a Reward From Execution Cost

## Segment 1 (title)

QueryPlanEnv can already execute a hinted query and capture its logical reads. Turning that number directly into a reward would train an agent that only ever cares about the biggest queries in the sample — this lesson explains why, and builds the reward that actually works.

## Segment 2 (steps)

Logical reads vary enormously with the sampled date range. A narrow window in a quiet territory might read around fifty pages. A multi-year window in a busy territory can read fifty thousand or more. A raw reward built from that number would be completely dominated by the wide-range episodes, and the agent would learn almost nothing from the narrow ones.

## Segment 3 (code)

The fix is to reward relative improvement instead of absolute cost. The environment also runs the no-hint version of the same query once per episode, captures its logical reads as the baseline, and computes the reward as baseline reads minus agent reads, divided by baseline reads.

## Segment 4 (steps)

That ratio is scale-invariant. A win on a fifty-read episode and a win on a fifty-thousand-read episode of the same relative size produce the same reward value. Positive means the agent's hint beat the optimizer's own default plan, zero means picking action zero itself, which is neutral rather than punished, and negative means the hint made things worse.

## Segment 5 (outro)

Raw logical reads make a bad reward because of their huge range across episodes, so this project measures the optimizer's own no-hint baseline once per episode and rewards relative improvement over it instead. Up next, Lesson 7: training a stable-baselines3 PPO agent against this exact reward.
