# Markov Decision Processes

This is lesson 2 of the Reinforcement Learning & RL for LLMs course, still in Chapter 1, RL Foundations. Lesson 1 gave you the agent-environment loop in plain English. This lesson gives it a rigorous mathematical skeleton: the Markov Decision Process, or MDP. Nearly every equation in the rest of this course is written in terms of an MDP's pieces, so getting comfortable with this notation now pays off for the whole course.

## What you'll learn

- The five pieces that formally define an MDP
- The Markov property, and why it's the assumption that makes RL math tractable
- How a transition probability function captures a stochastic environment
- A worked MDP example you can hold in your head

## The five pieces of an MDP

A Markov Decision Process is formally a tuple (S, A, P, R, γ):

- **S** — the set of possible **states** the environment can be in.
- **A** — the set of possible **actions** the agent can take.
- **P(s' | s, a)** — the **transition probability** of landing in state s' given that the agent took action a in state s. This encodes the environment's dynamics, including randomness.
- **R(s, a, s')** — the **reward function**, giving the expected reward for a given transition.
- **γ** (gamma) — the **discount factor**, a number between 0 and 1 that controls how much the agent values future reward versus immediate reward. γ close to 0 makes the agent short-sighted; γ close to 1 makes it value long-term reward almost as much as immediate reward.

Together, these five pieces fully specify an RL problem. Every algorithm in this course is, in some sense, a different strategy for finding good behavior inside an MDP defined this way.

## The Markov property

The word "Markov" refers to a specific, load-bearing assumption: the **Markov property** states that the probability of the next state depends only on the current state and action — not on any state or action that came before it.

```
P(S_{t+1} | S_t, A_t) = P(S_{t+1} | S_1, A_1, S_2, A_2, ..., S_t, A_t)
```

In words: the current state must contain everything relevant for predicting what happens next. The history that led to this state doesn't matter once you already know the state itself. This is why state design matters so much in practice — if your state representation leaves out something that affects the future (like velocity, not just position), the Markov property is violated and the math built on top of it degrades.

## A worked example: a 1D grid world

Imagine a 5-cell grid: positions 0, 1, 2, 3, 4. The agent starts at position 2. Actions are "left" and "right." Reaching position 4 gives a reward of +1 and ends the episode; reaching position 0 gives a reward of −1 and ends the episode; every other move gives reward 0.

- S = {0, 1, 2, 3, 4}
- A = {left, right}
- P(s' | s, a) = 1 for the deterministic move in the chosen direction (0 for all others) — this environment happens to be deterministic, but P is general enough to describe a stochastic one too, e.g. a slippery floor where "right" only succeeds 80% of the time
- R(s, a, s') = +1 for transitioning into state 4, −1 for transitioning into state 0, 0 otherwise
- γ — a design choice, e.g. 0.9

This tiny example already has everything a far more complex MDP has, just at a scale you can write out by hand. A Gymnasium environment like `FrozenLake-v1` or `CartPole-v1` is the same five-tuple, just with a much larger or continuous state space.

```python
import gymnasium as gym

env = gym.make("FrozenLake-v1", is_slippery=True)
print("States:", env.observation_space.n)   # |S|
print("Actions:", env.action_space.n)       # |A|
obs, info = env.reset(seed=42)
```

`is_slippery=True` is exactly the stochastic transition function P in action — the agent's chosen action doesn't always produce the intended transition.

## Key terms

| Term | Meaning |
|---|---|
| MDP | The tuple (S, A, P, R, γ) that formally defines an RL problem |
| Markov property | The next state depends only on the current state and action, not on history |
| Transition probability P(s'\|s,a) | Probability of reaching s' given state s and action a |
| Discount factor γ | Weight (0 to 1) applied to future reward relative to immediate reward |

## Recap

An MDP is the formal (S, A, P, R, γ) structure underlying every RL problem in this course, built on the Markov property: the future depends only on the present state and action. Next up, Lesson 3: reward, policy, and value functions — the three concepts you use to actually describe and evaluate behavior inside an MDP.
