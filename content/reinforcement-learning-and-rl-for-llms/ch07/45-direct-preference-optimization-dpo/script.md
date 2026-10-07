# Script — Direct Preference Optimization (DPO)

## Segment 1 (title)

Lesson 45. Several of last lesson's failure modes trace back to how complex the full RLHF pipeline is. This lesson introduces DPO, which gets a comparable result from the same preference data without a separate reward model or RL rollouts at all.

## Segment 2 (code)

The key insight is that under a KL-constrained reward-maximization objective, the optimal policy and the reward function are linked by a closed form. That means you can define an "implicit reward" directly from the policy's own log-probabilities relative to the frozen reference model — no separate reward network needed at all.

## Segment 3 (code)

Substituting that implicit reward back into the same Bradley-Terry preference loss from Chapter 6 gives DPO's objective directly on prompt, chosen, and rejected triples. It's a supervised-style loss: increase the policy's relative log-probability of the chosen response, decrease it for the rejected one, exactly as hard as the sigmoid term says is needed.

## Segment 4 (steps)

That removes a lot of machinery. No separate reward model checkpoint. No PPO rollout loop sampling new generations during training. The dataset is identical to what trained the reward model in Chapter 6 — the same preference pairs, just consumed by a different, simpler loss.

## Segment 5 (outro)

One supervised-style training run on fixed preference data, instead of a three-stage RL pipeline. Next lesson compares DPO and PPO-based RLHF directly, including where each one's tradeoffs actually matter.
