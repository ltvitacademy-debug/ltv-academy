# Proximal Policy Optimization (PPO)

This is lesson 23 of the Reinforcement Learning & RL for LLMs course, continuing Chapter 4, Policy Optimization Methods. Lesson 22 covered TRPO's conceptual approach — a surrogate objective constrained by a KL-divergence trust region — and its practical cost: expensive, intricate second-order optimization. This lesson introduces PPO, the algorithm that replaced TRPO almost everywhere, including as the backbone of the RLHF pipeline that aligns modern LLMs, which this course reaches in Chapter 7.

## What you'll learn

- Why PPO exists: TRPO's safety guarantees, without conjugate gradients or curvature approximations
- The overall shape of the PPO training loop: collect, compute advantages, update for multiple epochs
- How PPO enforces its trust region with simple clipping instead of a hard constraint (full detail in Lesson 24)
- How to run PPO in practice using Stable-Baselines3

## PPO's core idea

PPO keeps TRPO's surrogate objective — the probability ratio between new and old policy, weighted by advantage — but replaces the hard KL-divergence constraint with something dramatically simpler: **clip the ratio itself** so it can't move too far from 1 in either direction. Lesson 24 covers the exact clipped objective in full; for now, the key point is that this clipping does, approximately, the same job as TRPO's trust region — discouraging updates that would push the new policy too far from the old one — using only first-order gradient methods that any deep learning framework already supports well. No conjugate gradient solver, no Fisher-information matrix, no line search.

## The PPO training loop, at a glance

Every PPO iteration follows the same shape:

1. **Collect rollouts** — run the current policy in the environment for a fixed number of steps (or episodes), storing states, actions, rewards, log-probabilities, and value estimates.
2. **Compute advantages** — typically using Generalized Advantage Estimation, covered in Lesson 25.
3. **Update for multiple epochs** — unlike a single policy gradient step per batch of data, PPO reuses the same collected rollout for several epochs of minibatch gradient updates on the clipped objective, because the clipping keeps those repeated updates from straying too far from the policy that generated the data.
4. **Repeat** — discard the rollout (it was collected on-policy, under the policy before this update) and collect a fresh one with the newly updated policy.

That "reuse the same batch for multiple epochs" step is a major reason PPO is so much more sample-efficient than REINFORCE or vanilla actor-critic: each expensive round of environment interaction gets squeezed for several gradient updates instead of just one, because the clipping mechanism makes that safe.

## Running PPO with Stable-Baselines3

In practice, almost nobody hand-writes PPO's full training loop for standard use cases — Stable-Baselines3 provides a tested, production-quality implementation:

```python
from stable_baselines3 import PPO
from stable_baselines3.common.env_util import make_vec_env

env = make_vec_env("CartPole-v1", n_envs=4)
model = PPO(
    "MlpPolicy",
    env,
    verbose=1,
    learning_rate=3e-4,
    n_steps=2048,       # rollout length per environment, before each update
    clip_range=0.2,     # the clipping parameter epsilon (Lesson 24)
)
model.learn(total_timesteps=200_000)
model.save("ppo_cartpole")
```

`n_envs=4` runs four copies of the environment in parallel, collecting rollouts faster; `n_steps` is how many steps each one runs before an update; `clip_range` is exactly the ε from the clipped objective in Lesson 24. Lesson 26 builds a version of this loop from scratch, to see what SB3 is doing under the hood.

## Why this matters beyond classic RL

PPO's popularity isn't an accident of classic RL benchmarks — it became the default optimizer for RLHF specifically because it's robust to the noisy, expensive-to-evaluate reward signals that come from a learned reward model scoring LLM outputs (Chapter 6 and 7 of this course), and its clipping mechanism prevents a single bad batch of human-preference-derived reward from catastrophically derailing a large pretrained model's behavior.

## Key terms

| Term | Meaning |
|---|---|
| Clipped surrogate objective | PPO's replacement for TRPO's KL constraint; limits the probability ratio directly instead of constraining KL-divergence |
| Rollout | A batch of collected (state, action, reward, log-prob, value) data from running the current policy |
| Multiple epochs per rollout | Reusing one batch of collected experience for several gradient updates, made safe by clipping |
| Stable-Baselines3 | A widely-used, production-quality library with tested implementations of PPO and other RL algorithms |

## Recap

PPO keeps TRPO's probability-ratio surrogate but replaces its expensive KL constraint with simple clipping, enabling a training loop that reuses each rollout for multiple epochs of ordinary gradient-based updates. Next up, Lesson 24: the exact clipped objective function, term by term.
