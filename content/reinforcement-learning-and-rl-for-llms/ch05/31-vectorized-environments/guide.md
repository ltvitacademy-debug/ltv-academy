# Vectorized Environments

This is lesson 31 of the Reinforcement Learning & RL for LLMs course, continuing Chapter 5, RL Environments & Infrastructure. Modern RL training rarely runs one environment at a time — it runs dozens or hundreds of copies in parallel, because collecting experience is usually the bottleneck, not the gradient update. Gymnasium's vectorized environments give you that parallelism without changing the reset/step contract you already know.

## What you'll learn

- Why training throughput depends on running many environment copies at once
- How `gym.make_vec()` and `gym.vector.SyncVectorEnv` batch the reset/step API
- The difference between synchronous and asynchronous vectorization
- How autoreset behavior changes what a batched `step()` call returns

## Why vectorize

A single environment, stepped one action at a time, leaves most of a modern CPU or GPU idle while it waits on environment physics or rendering. If you instead run N independent copies of the same environment and step all of them together, you turn N sequential environment calls into one batched call — and you get N transitions per step instead of one, which both speeds up data collection and gives algorithms like PPO a lower-variance, more diverse batch to learn from.

## Creating a vectorized environment

The simplest entry point is `gym.make_vec()`, which creates and wraps N copies of a named environment:

```python
import gymnasium as gym

envs = gym.make_vec("CartPole-v1", num_envs=8, vectorization_mode="sync")

observations, infos = envs.reset(seed=42)
actions = envs.action_space.sample()  # one action per sub-environment
observations, rewards, terminations, truncations, infos = envs.step(actions)
```

You can also build one explicitly from a list of environment constructors using `gym.vector.SyncVectorEnv`:

```python
from gymnasium.vector import SyncVectorEnv

def make_env():
    return gym.make("CartPole-v1")

envs = SyncVectorEnv([make_env for _ in range(8)])
```

Either way, `observation_space` and `action_space` on the vectorized wrapper describe a single sub-environment's space with a leading batch dimension added — `step()` and `reset()` now operate on batches of 8 observations, actions, and rewards instead of one.

## Sync vs. async vectorization

`vectorization_mode="sync"` (or `SyncVectorEnv`) steps every sub-environment in the same process, one after another, and returns once all of them finish. It's simple and has no multiprocessing overhead, which makes it the right default for fast, lightweight environments like CartPole. `AsyncVectorEnv` instead runs each sub-environment in its own subprocess, so slow environments (ones with real physics simulation, rendering, or external calls) can step genuinely in parallel across CPU cores — at the cost of process-communication overhead that only pays off when each environment step is itself expensive.

## Autoreset: the behavior that trips people up

In a single environment, you check `terminated or truncated` yourself and call `reset()`. A vectorized environment automatically resets any sub-environment that finished, usually on the *next* call to `step()` — so the observation batch you get back can mix a "first observation of a new episode" for one sub-environment with a genuine next-step observation for another. Always read `terminations`/`truncations` per-index so your training code credits returns to the correct episode boundary for each sub-environment, rather than assuming every row in the batch is mid-episode.

## Key terms

- **Vectorized environment** — a wrapper that steps N sub-environments together, batching observations/actions/rewards along a leading dimension
- **`gym.make_vec()`** — the high-level constructor for a vectorized environment by name
- **`SyncVectorEnv`** — steps sub-environments sequentially in one process
- **`AsyncVectorEnv`** — steps sub-environments in parallel subprocesses
- **Autoreset** — a finished sub-environment is automatically reset, typically reflected on the following `step()` call

## Recap

Vectorized environments batch the same reset/step contract across N copies, trading a little bookkeeping (per-index terminations, autoreset timing) for a large increase in data-collection throughput. Next lesson: shaping rewards to make learning in these environments faster without changing what the agent is ultimately being asked to optimize.
