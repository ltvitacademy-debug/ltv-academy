# Reward Shaping

This is lesson 32 of the Reinforcement Learning & RL for LLMs course, continuing Chapter 5, RL Environments & Infrastructure. Some environments give almost no reward signal until the very end of a long episode — a maze that only rewards reaching the exit, a game that only rewards winning. That sparsity makes learning painfully slow, because early in training an agent almost never stumbles onto the one sequence of actions that earns anything. Reward shaping is the standard fix: add a denser, auxiliary signal that points the agent toward the sparse true objective, without changing what "doing well" actually means.

## What you'll learn

- Why sparse rewards slow learning down, concretely
- The general shaping formula: r' = r + F(s, s')
- Potential-based shaping, and why it's the one form of shaping that provably preserves the optimal policy
- The practical risk of shaping done carelessly: creating new behaviors that exploit the shaping term

## The sparse reward problem

Imagine a grid-world agent that gets reward +1 only on the single step it reaches the goal, and 0 every other step. Early in training, with a near-random policy, the agent might need thousands of random steps before it ever stumbles into the goal even once. Until it does, there is no gradient signal at all — every trajectory looks equally (un)rewarding. The true objective (reach the goal) is correct and simple, but it's uninformative as a training signal on its own.

## The shaping formula

Reward shaping adds a shaping term F(s, s') to the environment's true reward r, producing the reward the agent actually learns from:

```
r'(s, a, s') = r(s, a, s') + F(s, s')
```

A common, intuitive choice for the grid-world example is "negative distance to the goal" — moving closer gives a small positive bonus, moving away gives a small penalty. That turns a nearly flat reward landscape into one with a gradient almost everywhere, which is exactly what makes learning faster.

## Potential-based shaping: the safe form

The danger with an arbitrary F(s, s') is that it can change what the optimal policy actually is — the agent starts optimizing the shaping bonus instead of the real task. Potential-based shaping avoids this by defining F in terms of a potential function Φ over states:

```
F(s, s') = γ·Φ(s') − Φ(s)
```

where γ is the same discount factor used elsewhere in the MDP. This specific form has a guarantee behind it (from Ng, Harada, and Russell's 1999 shaping theorem): adding a potential-based F never changes which policy is optimal under the original reward r. It can still change how fast the agent gets there — faster, if Φ is well chosen — but it cannot make a worse policy look better than the true optimum.

## A worked example

Using Φ(s) = −distance_to_goal(s) as the potential:

```python
def shaped_reward(reward, state, next_state, gamma=0.99):
    phi_s = -distance_to_goal(state)
    phi_s_next = -distance_to_goal(next_state)
    shaping = gamma * phi_s_next - phi_s
    return reward + shaping
```

Every step that moves closer to the goal adds a small positive shaping term; every step that moves away subtracts one. Because this is potential-based, the agent is still, provably, being pushed toward the same optimal policy — just faster.

## The risk: shaping that isn't potential-based

Hand-picked shaping terms that are *not* derived from a potential function carry no such guarantee. A classic failure mode: reward an agent for "distance traveled" to encourage exploration in a racing task, and the agent learns to drive in circles racking up distance instead of finishing the race — the shaping term became the objective. This is the same failure mode you'll see in the next lesson under its proper name, reward hacking — reward shaping done carelessly is one of the easiest ways to cause it.

## Key terms

- **Sparse reward** — a reward signal that is zero (or uninformative) almost everywhere, nonzero only at rare events
- **Reward shaping** — adding an auxiliary term F(s, s') to a sparse true reward to make learning faster
- **Potential-based shaping** — F(s, s') = γΦ(s') − Φ(s); provably preserves the optimal policy
- **Potential function Φ** — a scalar function of state used to construct a safe shaping term

## Recap

Reward shaping densifies a sparse reward signal by adding F(s, s') to it; potential-based shaping, F(s,s')=γΦ(s')−Φ(s), is the one form guaranteed not to change the optimal policy. Shape carelessly, and you risk the agent optimizing the shaping term instead of the task — which is exactly what the next lesson covers under the name reward hacking.
