# Episodic vs. Continuing Tasks

This is lesson 6 of the Reinforcement Learning & RL for LLMs course, Chapter 1, RL Foundations, and the last foundational distinction before this chapter turns to on-policy vs. off-policy learning. So far the return G_t has been written as an infinite sum. Many real RL problems don't actually run forever — they end. This lesson separates tasks that naturally terminate from tasks that don't, and shows how each is handled.

## What you'll learn

- The difference between episodic tasks and continuing tasks
- The terminal state, and how it naturally caps the return
- Why continuing tasks need γ < 1 for the return to stay well-defined
- How Gymnasium represents both cases through `terminated` and `truncated`

## Episodic tasks

An **episodic task** is one that is guaranteed to end, reaching a special **terminal state** after a finite number of steps. A chess game ends in checkmate, stalemate, or resignation. A maze-navigation task ends when the agent reaches the exit. A round of an Atari game ends when the player loses their last life.

For an episodic task, the return is simply a finite sum up to the terminal time step T:

```
G_t = R_{t+1} + γR_{t+2} + ... + γ^{T-t-1}R_T
```

Because the sum is finite, it's always well-defined even if γ = 1 — episodic tasks don't strictly need discounting for the math to work, though discounting is still often used for other reasons (like encouraging faster solutions).

Once an episode ends, the environment is **reset** to a new starting state and a fresh episode begins. Training usually involves running many episodes and improving the policy across them.

## Continuing tasks

A **continuing task** has no natural endpoint — it just keeps running. A thermostat continuously regulating a building's temperature, or a stock-trading agent operating indefinitely, are continuing tasks. There's no terminal state and no reset.

For continuing tasks, the return as written, G_t = Σ_{k=0}^∞ γ^k R_{t+k+1}, is an infinite sum. For this sum to converge to a finite number, we need **γ < 1** and bounded rewards. This is exactly why the discount factor from Lesson 2 isn't just a modeling convenience — for continuing tasks, it's mathematically required.

## How Gymnasium represents this distinction

The modern Gymnasium API splits "episode is over" into two separate signals, returned from `env.step()`:

```python
import gymnasium as gym

env = gym.make("CartPole-v1")
obs, info = env.reset(seed=42)
for _ in range(1000):
    action = env.action_space.sample()
    obs, reward, terminated, truncated, info = env.step(action)
    if terminated or truncated:
        obs, info = env.reset()
env.close()
```

- `terminated=True` means the episode ended because the agent reached a genuine terminal state defined by the task itself (e.g. the pole fell over in CartPole) — this is the episodic case from above.
- `truncated=True` means the episode was cut off for an external reason unrelated to the task's own dynamics, most commonly a time limit (e.g. CartPole-v1 caps episodes at 500 steps even though, in principle, balancing could continue indefinitely). This lets you run a continuing-style task in practice with a fixed training budget, while still knowing the cutoff wasn't a "real" ending.

This distinction matters for correctness: when bootstrapping a value estimate (Lesson 4's V(s')), you should **not** treat a truncated step the same as a terminated one — a truncated episode's "next state" still has real future value that a terminated one doesn't.

## Key terms

| Term | Meaning |
|---|---|
| Episodic task | A task guaranteed to reach a terminal state after finitely many steps |
| Terminal state | The special state that ends an episode |
| Continuing task | A task with no natural endpoint; runs indefinitely |
| terminated vs. truncated | Gymnasium's split between a genuine task-ending state and an external cutoff like a time limit |

## Recap

Episodic tasks end at a terminal state, giving a finite return even without discounting; continuing tasks never end, requiring γ < 1 for the return to converge; and Gymnasium's `terminated`/`truncated` split lets you tell a real ending apart from an artificial one. Next up, Lesson 7: on-policy vs. off-policy learning, the last foundational distinction before Chapter 2's algorithms.
