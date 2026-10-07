# Training an Agent to Choose Execution Plans

Environment built, reward designed — this lesson runs the actual training. It uses stable-baselines3's PPO implementation, a small `MlpPolicy` sized for a two-feature observation and five discrete actions, and it resolves the exact notebook entry from Lesson 1 about `FORCE ORDER` helping on wide ranges and hurting on narrow ones.

## What you'll learn

- Why PPO with `MlpPolicy` fits this environment's small observation and action space
- The training call, start to finish, against `QueryPlanEnv`
- How this PPO run contrasts with Project 3's TRL `PPOTrainer`
- How training resolves the Lesson 1 notebook entry about `FORCE ORDER`

## Setting up PPO against QueryPlanEnv

```python
from stable_baselines3 import PPO
from stable_baselines3.common.env_util import make_vec_env

env = make_vec_env(lambda: QueryPlanEnv(conn_str, territories), n_envs=4)

model = PPO(
    policy="MlpPolicy",
    env=env,
    learning_rate=3e-4,
    n_steps=256,
    batch_size=64,
    n_epochs=10,
    gamma=0.99,
    verbose=1,
)
model.learn(total_timesteps=100_000)
model.save("query_plan_ppo")
```

`MlpPolicy` is the right choice here because the observation is just two features and the action space is `Discrete(5)` — there's no image or sequence to process, so a small fully-connected network (stable-baselines3's default two-layer 64-unit `MlpPolicy` architecture) has more than enough capacity. `n_envs=4` runs four copies of `QueryPlanEnv` in parallel against separate pyodbc connections, which matters more here than in a typical PPO setup, since every single step involves a real round-trip to SQL Server rather than a cheap simulator step.

## Same algorithm, completely different library and modality

Project 3, elsewhere in this lab, also trains with PPO — but through TRL's `PPOTrainer`, tuning a language model's token-generation policy against an execution-correctness reward. This project's PPO run is the same algorithm family, applied to something almost unrecognizably different:

| | Project 1 (this lesson) | Project 3 |
|---|---|---|
| Library | stable-baselines3 | TRL |
| Policy | small MLP over a 2-feature vector | a full language model's generation policy |
| Action space | `Discrete(5)` — one of five hints | the entire token vocabulary, one token at a time |
| Episode | one query decision | one full generated SQL query |

Worth sitting with: PPO itself doesn't care whether the policy is a two-layer MLP or a multi-billion-parameter transformer — it's a general policy-gradient method, and the two projects are proof that the same optimizer scales from a tabular contextual bandit up to RLHF on a language model without changing its core update rule.

## Resolving the Lesson 1 notebook entry

The dated notebook entry from Lesson 1 described attempt 2: trying `FORCE ORDER` on every episode, expecting uniformly lower reads, and instead finding it worse on narrow date ranges and better on wide ones — with a planned next step of letting the agent condition its hint choice on `date_range_days` instead of hardcoding one hint for every episode.

That's exactly what this training run produces. Once trained, the policy's chosen action correlates clearly with `obs[0]` (`date_range_days`): on wide-range episodes, it learns to pick `FORCE ORDER` — the same hint attempt 2 tried everywhere, but now applied selectively where it actually helps — and on narrow-range episodes, it learns to pick a different hint, typically `HASH JOIN` or no hint at all, where `FORCE ORDER` would have hurt. The fix the notebook called for — conditioning the hint on `date_range_days` rather than applying one hint uniformly — is exactly what a learned policy with that feature in its observation does automatically, without anyone hand-coding a threshold.

```python
# Rough shape of what the trained policy learns, as a lookup intuition —
# the actual policy is a learned function, not an if/else:
# date_range_days small  -> HASH JOIN or no hint
# date_range_days large  -> FORCE ORDER
```

## Key terms

- **`MlpPolicy`** — stable-baselines3's fully-connected network policy, appropriate for low-dimensional, non-image/non-sequence observations
- **Vectorized environment (`n_envs`)** — running multiple environment copies in parallel to collect more experience per wall-clock second
- **Policy-gradient method** — an RL algorithm family (PPO included) that directly optimizes a parameterized policy's action probabilities using sampled rewards
- **Conditioning on a feature** — a trained policy's behavior changing systematically with an observed feature, here `date_range_days`, instead of applying one fixed action everywhere

## Recap

This lesson trains a stable-baselines3 PPO agent with `MlpPolicy` against `QueryPlanEnv`, the same algorithm family as Project 3's TRL `PPOTrainer` but applied to a tabular two-feature observation instead of a language model's generation policy. Training resolves the Lesson 1 notebook entry directly: the policy learns to condition its hint choice on `date_range_days`, picking `FORCE ORDER` on wide ranges and a different hint on narrow ones, instead of the attempt-2 mistake of forcing the same hint on every episode. Next up, Lesson 8: evaluating this trained policy against the optimizer's own choices on a held-out grid.
