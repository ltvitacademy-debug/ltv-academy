# Temporal-Difference Learning

This is lesson 10 of the Reinforcement Learning & RL for LLMs course, Chapter 2, Classic RL Algorithms. Monte Carlo (Lesson 9) is model-free but must wait for an entire episode to end before it can update anything. Temporal-Difference (TD) learning combines the best of Monte Carlo and Dynamic Programming: it's model-free like Monte Carlo, but it updates after every single step, like DP's bootstrapping.

## What you'll learn

- The TD(0) update rule and what the "TD error" actually measures
- Why TD learning is said to "bootstrap"
- How TD compares to Monte Carlo: bias, variance, and when you can update
- Why TD(0) is the direct ancestor of Q-learning and SARSA

## The TD(0) update

Recall the Bellman equation from Lesson 4: V^π(s) = E_π[R_{t+1} + γV^π(S_{t+1}) | S_t = s]. Monte Carlo approximates the full expectation by waiting for the actual complete return. TD(0) instead approximates it using just **one real observed step**, plus the **current estimate** of the value of whatever state comes next:

```
V(S_t) ← V(S_t) + α [ R_{t+1} + γV(S_{t+1}) − V(S_t) ]
```

Read the bracketed term as the **TD error**: `R_{t+1} + γV(S_{t+1})` is a one-step estimate of what V(S_t) "should" be (sometimes called the **TD target**), and subtracting the current `V(S_t)` gives the error between that target and the current estimate. α (alpha) is the learning rate, controlling how much of that error gets corrected on each update.

This update needs only S_t, A_t, R_{t+1}, and S_{t+1} — one transition, available immediately after one step — not a full episode.

## Why this is called "bootstrapping"

TD(0)'s target, `R_{t+1} + γV(S_{t+1})`, uses the model's **own current estimate** of V(S_{t+1}) to help update V(S_t). It's using an estimate to improve another estimate, rather than waiting for ground truth (the actual full return, as Monte Carlo does). This is bootstrapping, the same concept flagged back in Lesson 4 — DP bootstraps too, but using a known model; TD bootstraps from sampled, one-step experience instead.

## TD vs. Monte Carlo

| | Monte Carlo | TD(0) |
|---|---|---|
| Needs a model? | No | No |
| Needs episode to finish? | Yes | No — updates every step |
| Works on continuing tasks? | Not directly | Yes |
| Target used | Actual full return G_t | One-step estimate R_{t+1} + γV(S_{t+1}) |
| Bias | Unbiased (G_t is a true sample of the return) | Biased early on (depends on current V estimate, which starts wrong) |
| Variance | Higher (depends on many random rewards/transitions) | Lower (depends on only one reward and one transition) |

Neither is strictly "better" — TD generally learns faster in practice because of lower variance and the ability to update continuously, which is why it (and its extensions) became the foundation for Q-learning and SARSA rather than Monte Carlo.

## A concrete worked step

Suppose V(S_t) is currently estimated at 4.0, the agent observes reward R_{t+1} = 1, transitions to a state with current estimate V(S_{t+1}) = 6.0, γ = 0.9, and α = 0.1:

```
TD target = 1 + 0.9 × 6.0 = 6.4
TD error  = 6.4 − 4.0 = 2.4
V(S_t) ← 4.0 + 0.1 × 2.4 = 4.24
```

V(S_t) moves a little closer to what the one-step evidence suggests it should be, and this happens again at every single subsequent step.

```python
# TD(0) update, in code
def td0_update(V, s, r, s_next, alpha, gamma):
    td_target = r + gamma * V[s_next]
    td_error = td_target - V[s]
    V[s] += alpha * td_error
    return V
```

## Key terms

| Term | Meaning |
|---|---|
| TD error | TD target minus the current value estimate |
| TD target | R_{t+1} + γV(S_{t+1}) — a one-step estimate of what V(S_t) should be |
| Bootstrapping | Updating an estimate using another current estimate, not ground truth |
| Learning rate α | Controls how much of the TD error is corrected per update |

## Recap

TD(0) updates V(S_t) toward a one-step target, R_{t+1} + γV(S_{t+1}), after every single transition — combining Monte Carlo's model-free property with Dynamic Programming's bootstrapping, at the cost of some early bias in exchange for lower variance and continuous updates. Next up, Lesson 11: Q-learning, which applies this exact TD idea to the action-value function Q, off-policy.
