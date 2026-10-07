# Generalized Advantage Estimation (GAE)

This is lesson 25 of the Reinforcement Learning & RL for LLMs course, continuing Chapter 4, Policy Optimization Methods. Lesson 24 built PPO's objective around an advantage estimate Â_t, without specifying exactly how to compute it. This lesson covers the method almost every modern PPO implementation actually uses: Generalized Advantage Estimation, which gives a tunable knob to trade off bias against variance.

## What you'll learn

- Why the single-step TD error and the full Monte Carlo return are two extremes of the same idea
- The GAE formula, and what the λ parameter actually controls
- Why GAE is computed backward through a rollout, just like the Monte Carlo returns in Lesson 19
- How to implement GAE in Python

## Two extremes, one spectrum

Lesson 20 used the one-step TD error as an advantage estimate:

```
δ_t = r_t + γ·V(s_{t+1}) − V(s_t)
```

This is low variance (it only depends on one reward and one value estimate) but biased by however wrong V currently is. At the other extreme, Lesson 19's Monte Carlo return G_t gives an unbiased advantage estimate (A_t = G_t − V(s_t)) but with high variance, since it accumulates randomness from every future timestep in the episode.

GAE's insight is that there's no reason to pick one extreme or the other — you can blend every n-step advantage estimate together, weighted so that short horizons (low variance, more bias) count more or less than long horizons (low bias, more variance), controlled by a single parameter.

## The GAE formula

First, compute the one-step TD error at every timestep, exactly as before:

```
δ_t = r_t + γ·V(s_{t+1}) − V(s_t)
```

Then the GAE advantage estimate is an exponentially-weighted sum of these TD errors, looking forward from t:

```
Â_t^{GAE(γ,λ)} = Σ_{l=0}^∞ (γλ)^l · δ_{t+l}
                = δ_t + (γλ)·δ_{t+1} + (γλ)²·δ_{t+2} + ...
```

The new parameter λ (lambda) ∈ [0, 1] controls the bias-variance tradeoff directly:

- **λ = 0** collapses the sum to just `δ_t` — the pure one-step TD advantage. Lowest variance, most bias.
- **λ = 1** recovers the full Monte Carlo advantage estimate (equivalent to G_t − V(s_t)). Zero bias, highest variance.
- Values in between, commonly λ = 0.95, blend many n-step estimates together, trading a controlled amount of bias for a substantial reduction in variance — in practice, usually the best of both worlds.

## Computing GAE backward

Just like the Monte Carlo return in Lesson 19, computing this sum naively for every t would be O(T²). It has the same backward recursive structure:

```
Â_t = δ_t + γλ · Â_{t+1}
```

```python
def compute_gae(rewards, values, next_values, dones, gamma=0.99, lam=0.95):
    advantages = [0.0] * len(rewards)
    gae = 0.0
    for t in reversed(range(len(rewards))):
        mask = 1.0 - dones[t]                               # zero out across episode boundaries
        delta = rewards[t] + gamma * next_values[t] * mask - values[t]
        gae = delta + gamma * lam * mask * gae
        advantages[t] = gae
    return advantages
```

`values` and `next_values` come from the critic network, computed once per rollout before this backward pass. The resulting `advantages` list is exactly the Â_t that feeds PPO's clipped surrogate objective from Lesson 24. The value-function training target used for L^VF is typically `advantages[t] + values[t]`, reconstructing the n-step return each advantage was built from.

## Key terms

| Term | Meaning |
|---|---|
| δ_t | r_t + γV(s_{t+1}) − V(s_t); the one-step TD error at timestep t |
| λ (lambda) | GAE's bias-variance tradeoff parameter; 0 gives pure TD, 1 gives full Monte Carlo |
| GAE(γ, λ) | The exponentially-weighted sum of TD errors used as a tunable advantage estimate |
| Backward recursion | Computing Â_t from Â_{t+1}, exactly like the Monte Carlo return calculation in Lesson 19 |

## Recap

GAE unifies the one-step TD advantage and the full Monte Carlo advantage into a single formula, with λ as a tunable dial between low variance and low bias, computed efficiently with a backward pass. With advantage estimation now fully specified, Lesson 26 assembles everything from Chapter 3 and 4 into a complete PPO implementation from scratch.
