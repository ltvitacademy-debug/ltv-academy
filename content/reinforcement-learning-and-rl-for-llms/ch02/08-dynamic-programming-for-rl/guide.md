# Dynamic Programming for RL

This is lesson 8 of the Reinforcement Learning & RL for LLMs course, opening Chapter 2, Classic RL Algorithms. Chapter 1 gave you the Bellman equation as a recursive definition of V and Q. Dynamic Programming (DP) is the first concrete algorithm family that turns that recursion into a procedure for actually computing V and Q — provided you know the MDP's transition function P and reward function R exactly.

## What you'll learn

- The "model-based" assumption DP relies on: knowing P and R exactly
- Policy evaluation: computing V^π for a fixed policy via iterative updates
- Policy improvement and policy iteration: alternating evaluation with greedy improvement
- Value iteration: folding evaluation and improvement into a single update
- Why DP doesn't scale to most real problems, setting up the need for Monte Carlo and TD methods

## The DP assumption: a known model

Dynamic Programming methods assume you have a **perfect model** of the environment — you know P(s'|s,a) and R(s,a,s') exactly, for every state and action. This is a strong assumption; most interesting environments don't give you this. But DP is still worth learning first, because it's the cleanest demonstration of the Bellman equation actually being used to compute something, and every later method (Monte Carlo, TD, Q-learning) is best understood as "what do we do when we don't have this model."

## Policy evaluation: computing V^π

Given a fixed policy π, **policy evaluation** computes V^π(s) for every state by repeatedly applying the Bellman equation for V^π as an update rule:

```
for every state s:
    V(s) ← Σ_a π(a|s) Σ_{s',r} p(s',r|s,a) [ r + γV(s') ]
```

Start with an arbitrary V (often all zeros), and sweep through every state, applying this update using the *current* estimates of V(s') on the right-hand side. Repeat this sweep over and over. Because the Bellman equation is a contraction mapping under standard conditions, V converges to the true V^π as the number of sweeps goes to infinity (in practice, you stop once updates change V by less than some small threshold).

## Policy improvement

Once you have V^π, you can ask: is there a better policy than π? **Policy improvement** answers this by, for every state, checking whether switching to the greedy action with respect to V^π does better than π's current choice:

```
π'(s) = argmax_a Σ_{s',r} p(s',r|s,a) [ r + γV^π(s') ]
```

If π' differs from π anywhere, it's guaranteed to be at least as good (this is the **policy improvement theorem**), and usually strictly better.

## Policy iteration: alternate the two

**Policy iteration** alternates policy evaluation and policy improvement until the policy stops changing:

1. Evaluate: compute V^π for the current policy (full sweep to convergence).
2. Improve: compute the greedy policy π' with respect to V^π.
3. If π' = π, stop — you've found the optimal policy π*. Otherwise, set π ← π' and go back to step 1.

Because each improvement step either finds a strictly better policy or confirms the current one is already optimal, and there are only finitely many policies in a finite MDP, policy iteration is guaranteed to terminate at π*.

## Value iteration: a faster shortcut

Running policy evaluation to full convergence inside every single iteration of policy iteration is expensive. **Value iteration** instead takes just **one** sweep of evaluation, using the Bellman *optimality* equation directly (which already bakes in the max over actions) rather than a fixed policy's Bellman equation:

```
for every state s:
    V(s) ← max_a Σ_{s',r} p(s',r|s,a) [ r + γV(s') ]
```

Repeat this sweep until V converges, then extract the final greedy policy once at the end. Value iteration converges to the same V* as policy iteration, usually with much less computation per iteration.

```python
# Pseudocode: value iteration over a known MDP
V = {s: 0.0 for s in states}
theta = 1e-6
while True:
    delta = 0
    for s in states:
        v_old = V[s]
        V[s] = max(
            sum(p * (r + gamma * V[s_next]) for (s_next, r, p) in transitions(s, a))
            for a in actions(s)
        )
        delta = max(delta, abs(v_old - V[s]))
    if delta < theta:
        break
```

## Why DP alone isn't enough

DP requires the full model (P and R) and sweeps over every state at every iteration — this is the **curse of dimensionality**: the number of states grows exponentially with the number of state variables, and most real environments don't hand you P and R anyway (you only get to interact with them, step by step). The next two lessons, Monte Carlo methods and Temporal-Difference learning, drop the "known model" assumption entirely and learn V and Q directly from sampled experience instead.

## Key terms

| Term | Meaning |
|---|---|
| Model-based | Assumes P(s'\|s,a) and R(s,a,s') are known exactly |
| Policy evaluation | Iteratively computing V^π for a fixed policy |
| Policy improvement | Deriving a better policy by acting greedily w.r.t. V^π |
| Policy iteration | Alternating evaluation and improvement until the policy stops changing |
| Value iteration | One-sweep evaluation using the Bellman optimality equation directly |

## Recap

Dynamic Programming turns the Bellman equation into a working algorithm — policy iteration alternates full evaluation with greedy improvement, while value iteration folds both into a single sweep using the Bellman optimality equation — but it requires a fully known model and doesn't scale to large state spaces. Next up, Lesson 9: Monte Carlo methods, the first family of algorithms that learns from experience instead of a known model.
