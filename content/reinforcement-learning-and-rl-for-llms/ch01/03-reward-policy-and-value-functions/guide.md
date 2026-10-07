# Reward, Policy & Value Functions

This is lesson 3 of the Reinforcement Learning & RL for LLMs course, Chapter 1, RL Foundations. You now know what an MDP is. This lesson introduces the three concepts you use to describe and judge an agent's behavior inside one: the policy (how the agent acts), the return (how we sum up reward over time), and the value function (how good a state or action actually is in the long run).

## What you'll learn

- What a policy is, and the difference between deterministic and stochastic policies
- The return G_t, and why we discount future reward
- The state-value function V(s) and the action-value function Q(s,a)
- How value functions let us compare policies without re-running an entire episode

## The policy: how the agent behaves

A **policy**, written π, is the agent's strategy — a mapping from states to actions. There are two forms:

- **Deterministic policy**: π(s) = a. Given state s, always take action a.
- **Stochastic policy**: π(a|s), a probability distribution over actions given state s. Given state s, take action a with probability π(a|s).

Stochastic policies matter a lot in practice — they're what let an agent explore (Lesson 5), and they're exactly the form a language model's output distribution over next tokens takes when the LLM itself is framed as a policy in RLHF.

## The return: summing reward over time

A single reward R_t only tells you what happened at one step. What the agent actually wants to maximize is the **return** G_t, the discounted sum of all future reward from time t onward:

```
G_t = R_{t+1} + γR_{t+2} + γ²R_{t+3} + ...
    = Σ_{k=0}^∞ γ^k R_{t+k+1}
```

The discount factor γ (introduced in Lesson 2) does two jobs here: it makes the infinite sum converge to a finite number for continuing tasks (as long as γ < 1 and rewards are bounded), and it encodes a preference for reward sooner rather than later, which is often exactly what we want — a reward of +1 next step is usually worth more than a reward of +1 a thousand steps from now.

## Value functions: how good is a state, or a state-action pair?

Reward and return describe a single trajectory. A **value function** answers a more useful question: starting from this state (or state-action pair) and following policy π, how much return should I expect **on average**?

- **State-value function**:
  ```
  V^π(s) = E_π[ G_t | S_t = s ]
  ```
  "If I'm in state s and follow policy π from here on, what's my expected return?"

- **Action-value function** (the "Q-function"):
  ```
  Q^π(s, a) = E_π[ G_t | S_t = s, A_t = a ]
  ```
  "If I'm in state s, take action a right now, then follow policy π afterward, what's my expected return?"

Q is more directly useful for choosing actions, because you can compare Q^π(s, a1) against Q^π(s, a2) without needing to simulate anything — whichever is higher is the better action in that state, under that policy. This is the quantity Q-learning (Lesson 11) and SARSA (Lesson 12) are built entirely around estimating.

## Why value functions matter

Without a value function, judging whether a policy is good would mean running it to completion many times and averaging the outcomes — slow and high-variance. A value function compresses all of that simulation into a single number per state (or state-action pair), estimated once and reused. Nearly every algorithm from Chapter 2 onward is, at its core, a method for estimating V or Q more accurately with less data.

## Key terms

| Term | Meaning |
|---|---|
| Policy π | The agent's action-selection strategy, deterministic π(s) or stochastic π(a\|s) |
| Return G_t | The discounted sum of future reward from time t onward |
| State-value function V^π(s) | Expected return starting in state s, following policy π |
| Action-value function Q^π(s,a) | Expected return starting in state s, taking action a, then following policy π |

## Recap

A policy decides how the agent acts, the return discounts and sums reward over a trajectory, and value functions (V and Q) summarize the expected return of states and state-action pairs under a given policy. Next up, Lesson 4: the Bellman equation, which gives V and Q a recursive definition that every algorithm in this course exploits.
