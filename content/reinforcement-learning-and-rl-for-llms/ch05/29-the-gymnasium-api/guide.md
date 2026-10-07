# The Gymnasium API

This is lesson 29 of the Reinforcement Learning & RL for LLMs course, and the opening lesson of Chapter 5, RL Environments & Infrastructure. Every algorithm you've studied so far — value iteration, Q-learning, policy gradients — needs something to act on. That something is an environment, and in the Python RL ecosystem almost every environment speaks the same interface: the Gymnasium API. This lesson is your tour of that interface, because every custom environment and every vectorized environment later in this chapter builds directly on it.

## What you'll learn

- The reset/step/render loop that every Gymnasium environment follows
- What `observation_space` and `action_space` describe, and the common space types
- Why `step()` returns five values, not four — and what `terminated` vs `truncated` actually mean
- How the `info` dict is used for diagnostics that shouldn't affect learning

## The core loop: reset, then step

Gymnasium (the actively maintained fork of OpenAI Gym) standardizes every environment around two methods. `reset()` starts a new episode and returns the first observation. `step(action)` advances the environment by one action and returns what happened. A typical interaction loop looks like this:

```python
import gymnasium as gym

env = gym.make("CartPole-v1")
observation, info = env.reset(seed=42)

for _ in range(1000):
    action = env.action_space.sample()  # replace with your policy
    observation, reward, terminated, truncated, info = env.step(action)

    if terminated or truncated:
        observation, info = env.reset()

env.close()
```

Nothing about your algorithm needs to know whether `CartPole-v1` is a physics simulator or a game or a custom environment you wrote yourself — the loop is identical either way. That uniformity is the entire point of the API.

## Observation and action spaces

Every environment declares two `spaces.Space` objects: `observation_space` describes the shape and type of what the agent sees, and `action_space` describes the shape and type of what the agent can do. The two most common space types are:

- `spaces.Discrete(n)` — one of `n` integers, `0` through `n-1`. Used for things like "push cart left" or "push cart right."
- `spaces.Box(low, high, shape, dtype)` — a continuous array bounded between `low` and `high`, such as a 4-number cart-pole state (position, velocity, angle, angular velocity).

Declaring these spaces up front is what lets generic RL code — a neural network's input layer, an epsilon-greedy action sampler — be written once and reused across completely different environments.

## Why step() returns five values

Older Gym versions returned four values from `step()`: `observation, reward, done, info`. Gymnasium splits `done` into two separate signals, because they mean different things to a learning algorithm:

- **`terminated`** — the episode ended because of something in the environment's own dynamics: the pole fell, the agent reached the goal, the agent died. This should affect how you compute returns (no future reward exists after a true termination).
- **`truncated`** — the episode ended for an external reason, usually a time limit, even though the underlying task could have kept going. A policy shouldn't treat truncation as "there is truly nothing after this," because an identical state reached one step earlier would have kept going fine.

Conflating the two used to be a common source of subtly wrong value estimates near time limits — it's one reason the API changed.

## The info dict

`info` is a plain dictionary for anything useful that isn't part of the formal observation or reward — diagnostic numbers, success flags, raw internal state for logging. Your learning algorithm should never depend on `info` to make decisions; if it did, the environment would effectively be leaking extra observation data through a side channel. Use it for logging and debugging only.

## Key terms

- **Gymnasium** — the maintained standard API for RL environments (successor to OpenAI Gym)
- **`reset()`** — starts a new episode, returns the first observation and an info dict
- **`step(action)`** — advances one timestep, returns `(observation, reward, terminated, truncated, info)`
- **`observation_space` / `action_space`** — `Space` objects declaring the shape/type of observations and valid actions
- **`terminated`** — episode ended due to environment dynamics (true end of episode)
- **`truncated`** — episode ended due to an external limit (e.g., a step cap), not a true end

## Recap

Gymnasium's reset/step loop, its declared observation and action spaces, and its split terminated/truncated signals form the contract every environment in this chapter follows. Next lesson, you'll write one of these environments yourself from scratch.
