# Monte Carlo Methods

This is lesson 9 of the Reinforcement Learning & RL for LLMs course, Chapter 2, Classic RL Algorithms. Lesson 8 showed that Dynamic Programming needs a known model of the environment. Monte Carlo (MC) methods drop that requirement entirely: they estimate value functions purely by running episodes to completion and averaging the actual returns observed — no model of P or R required anywhere.

## What you'll learn

- The core Monte Carlo idea: estimate V(s) by averaging real, observed returns
- First-visit vs. every-visit Monte Carlo
- Why Monte Carlo only works for episodic tasks
- Monte Carlo control: using exploring starts or epsilon-greedy to improve the policy

## The core idea: average what actually happened

Monte Carlo methods are **model-free**: they don't need P(s'|s,a) or R(s,a,s') at all. Instead, they run the policy for a full episode, record the actual sequence of states, actions, and rewards, compute the actual return G_t achieved from each visited state, and estimate V(s) as the **average of the observed returns** from all the times state s was visited:

```
V(s) ≈ average of G_t over every time t where S_t = s
```

This is the most direct possible estimate of V^π(s) = E_π[G_t | S_t = s]: instead of computing the expectation analytically (which requires knowing P and R), Monte Carlo approximates it empirically, by sampling many actual returns and averaging them. By the law of large numbers, this average converges to the true expected value as the number of episodes grows.

## First-visit vs. every-visit Monte Carlo

A single episode can visit the same state more than once (e.g. a random walk that returns to a cell it already passed through). This creates a choice in how to use that episode's data:

- **First-visit MC**: for each episode, only use the return following the *first* time state s is visited in that episode to update the average for V(s).
- **Every-visit MC**: use the return following *every* visit to state s within the episode, even if s is visited multiple times.

Both converge to the correct V^π(s) as the number of episodes grows, though they have slightly different statistical properties (first-visit returns are independent across episodes, which makes its convergence analysis simpler). First-visit MC is the more commonly taught default.

## Why Monte Carlo needs episodic tasks

Because computing a return G_t requires summing reward all the way to the end of the episode, Monte Carlo methods fundamentally need episodes to terminate — this is why Monte Carlo doesn't directly apply to continuing tasks (Lesson 6) without some modification, unlike TD methods (Lesson 10), which can update after every single step.

## Monte Carlo control: improving the policy

Just like Dynamic Programming alternated evaluation and improvement, Monte Carlo methods can be used for **control** — finding a good policy, not just evaluating a fixed one — by alternating:

1. Generate episodes using the current policy, and use the observed returns to estimate Q(s,a) (action-value, not just state-value, since we need per-action information to improve the policy).
2. Improve the policy by acting greedily (or epsilon-greedily) with respect to the updated Q.

A key practical problem: if the policy is purely greedy, it may never try some actions, and Q for those actions never gets evaluated (the exploration problem from Lesson 5, again). Two standard fixes:

- **Exploring starts**: force every episode to begin at a randomly chosen (state, action) pair, guaranteeing every state-action pair eventually gets visited and evaluated.
- **Epsilon-greedy policies**: instead of a purely greedy policy, use an epsilon-greedy policy throughout both data collection and improvement, so every action retains some chance of being tried (this is the more practical and widely used fix, and it's the approach carried forward into Q-learning and SARSA).

## Key terms

| Term | Meaning |
|---|---|
| Model-free | Does not require knowledge of P(s'\|s,a) or R(s,a,s') |
| First-visit MC | Uses only the return from the first visit to a state per episode |
| Every-visit MC | Uses the return from every visit to a state within an episode |
| Exploring starts | Forcing episodes to begin at random (state, action) pairs to guarantee coverage |

## Recap

Monte Carlo methods estimate V and Q by averaging actual observed returns from completed episodes, require no model of the environment, and need episodic tasks because they rely on the full return; Monte Carlo control alternates this evaluation with epsilon-greedy policy improvement. Next up, Lesson 10: Temporal-Difference learning, which keeps the model-free property of Monte Carlo but updates after every step instead of waiting for an episode to end.
