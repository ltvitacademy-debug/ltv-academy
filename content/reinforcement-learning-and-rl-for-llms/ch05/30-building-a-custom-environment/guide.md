# Building a Custom Environment

This is lesson 30 of the Reinforcement Learning & RL for LLMs course, continuing Chapter 5, RL Environments & Infrastructure. Last lesson you learned the shape of the Gymnasium contract: reset, step, declared spaces, and the terminated/truncated split. This lesson puts that contract to work by writing a complete custom environment from scratch — the same pattern you'd use for any task that doesn't already exist as a built-in Gymnasium environment.

## What you'll learn

- How to subclass `gym.Env` and declare `observation_space` and `action_space`
- How to implement `reset()` and `step()` correctly, including seeding
- Common mistakes that break the Gymnasium contract (and the automated checker that catches them)
- How registration lets `gym.make()` find your environment by name

## Subclassing gym.Env

Every custom environment starts the same way: subclass `gym.Env`, set a `metadata` dict (used by renderers), and declare both spaces in `__init__`.

```python
import gymnasium as gym
from gymnasium import spaces
import numpy as np

class MyEnv(gym.Env):
    metadata = {"render_modes": ["human"]}

    def __init__(self):
        super().__init__()
        self.observation_space = spaces.Box(low=-1.0, high=1.0, shape=(4,), dtype=np.float32)
        self.action_space = spaces.Discrete(2)

    def reset(self, seed=None, options=None):
        super().reset(seed=seed)
        self.state = np.zeros(4, dtype=np.float32)
        return self.state, {}

    def step(self, action):
        reward = 1.0 if action == 1 else -1.0
        terminated = False
        truncated = False
        return self.state, reward, terminated, truncated, {}
```

That's a complete, valid Gymnasium environment — minimal, but it satisfies every part of the API contract. Everything you add from here (real dynamics, termination conditions, rendering) builds on this skeleton.

## Getting reset() right

`reset()` has two jobs: reseed the environment's own random number generator by calling `super().reset(seed=seed)`, and put the environment back into a valid starting state. The `seed` parameter matters for reproducibility — if a caller passes the same seed twice, they should see the same initial state and (if they also replay the same actions) the same trajectory. `options` is a dict for anything else the caller wants to configure about the reset (e.g. "start near the goal" for curriculum learning). Always return `(observation, info)`.

## Getting step() right

`step(action)` must validate nothing it doesn't need to, compute the next state from the current state and the action, compute a reward, decide `terminated` and `truncated`, and return the five-tuple in that exact order. A frequent bug is returning a `done` flag that conflates the two: a pole falling over should set `terminated=True`, while hitting a max-steps counter you added yourself should set `truncated=True`. Getting this wrong corrupts how downstream algorithms bootstrap value estimates at episode boundaries.

## The environment checker

Gymnasium ships a checker that catches the most common contract violations automatically — mismatched space shapes, wrong dtypes, missing info dicts, non-reproducible seeding:

```python
from gymnasium.utils.env_checker import check_env

env = MyEnv()
check_env(env)
```

Running this on every custom environment before training anything on it is cheap insurance against hours of debugging a learning algorithm that was never actually broken — the environment was.

## Registering your environment

Once your class is solid, registering it lets you (and any training script) create it by name through `gym.make()`, exactly like a built-in environment:

```python
from gymnasium.envs.registration import register

register(id="MyEnv-v0", entry_point="my_module:MyEnv")

env = gym.make("MyEnv-v0")
```

## Key terms

- **`gym.Env`** — the base class every Gymnasium environment subclasses
- **`metadata`** — class dict describing supported render modes
- **`check_env()`** — Gymnasium's automated contract-compliance checker
- **`register()` / `gym.make()`** — the mechanism for creating environments by string ID

## Recap

A custom environment is a `gym.Env` subclass with declared spaces, a correct `reset()`, and a correct `step()` that keeps `terminated` and `truncated` meaningfully separate. Run `check_env()` before trusting it, and register it so it's creatable by name. Next lesson: running many copies of an environment at once with vectorized environments.
