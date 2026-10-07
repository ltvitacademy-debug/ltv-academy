# PPO Clipping & the Objective Function

This is lesson 24 of the Reinforcement Learning & RL for LLMs course, continuing Chapter 4, Policy Optimization Methods. Lesson 23 described PPO's loop and mentioned clipping as the mechanism that replaces TRPO's KL constraint. This lesson derives the exact clipped objective, term by term, plus the two additional terms — a value loss and an entropy bonus — that the full PPO loss actually optimizes in practice.

## What you'll learn

- The exact formula for the probability ratio r_t(θ) and the clipped surrogate objective L^CLIP
- Why the min() in the objective makes clipping asymmetric and conservative by construction
- The two extra terms in the full PPO loss: the value function loss and the entropy bonus
- How to implement this loss in PyTorch, line by line

## The probability ratio

For a transition (s_t, a_t) collected under the policy that was active at collection time (π_θ_old), define:

```
r_t(θ) = π_θ(a_t|s_t) / π_θ_old(a_t|s_t)
```

r_t(θ) = 1 exactly when the current policy θ hasn't changed from the data-collecting policy θ_old. As θ is updated across epochs, r_t drifts away from 1 — and PPO's whole mechanism exists to control how far it's allowed to drift.

## The clipped surrogate objective

```
L^CLIP(θ) = E_t[ min( r_t(θ)·Â_t, clip(r_t(θ), 1−ε, 1+ε)·Â_t ) ]
```

with a typical ε = 0.2. Unpack this by cases, for a positive advantage (Â_t > 0, meaning the action was better than expected):

- If r_t(θ) grows past 1+ε, the clip term caps it at (1+ε)·Â_t, which is *less* than the unclipped r_t(θ)·Â_t — so the min() picks the clipped, smaller value. This removes the incentive to keep pushing the ratio even higher once it's already past the trust region.
- If r_t(θ) is still inside [1−ε, 1+ε], clipping does nothing, and both terms inside the min() are equal — the objective behaves like the plain (unclipped) surrogate.

For a negative advantage (Â_t < 0, the action was worse than expected), the same min() logic flips the direction: it caps how negative the objective can get as r_t(θ) shrinks, again preventing an overly aggressive update, this time in the direction of pushing the action's probability down.

The min() is the key design choice: it always picks the **more pessimistic** (lower) of the clipped and unclipped estimates, which is why this is sometimes described as a pessimistic lower bound on the true, unconstrained surrogate objective. It only ever removes *incentive to over-update* — it never rewards moving further once you're already in the clipped region.

```python
ratio = torch.exp(new_log_probs - old_log_probs.detach())  # pi_theta / pi_theta_old
unclipped = ratio * advantages
clipped = torch.clamp(ratio, 1 - epsilon, 1 + epsilon) * advantages
policy_loss = -torch.min(unclipped, clipped).mean()  # negative: we minimize, but want to maximize L^CLIP
```

Computing the ratio as `exp(new_log_probs - old_log_probs)` rather than dividing raw probabilities is standard practice — it's numerically stable and matches how log-probabilities are already stored from rollout collection.

## The full PPO loss

The objective actually optimized in practice adds two more terms:

```
L(θ) = L^CLIP(θ) − c1 · L^VF(θ) + c2 · S[π_θ]
```

- **L^VF(θ)**, the value function loss — typically `(V_θ(s_t) − V_t^target)²` — trains the critic that produces the advantage estimates (Lesson 25 covers how those targets are built via GAE). Subtracted with coefficient c1 because it's a loss being *minimized* while L^CLIP is being *maximized*.
- **S[π_θ]**, an entropy bonus — the policy distribution's entropy, encouraged with a small positive coefficient c2 to keep the policy from collapsing to a deterministic choice too early and losing exploration.

```python
value_loss = (values - returns).pow(2).mean()
entropy_bonus = dist.entropy().mean()

loss = policy_loss + c1 * value_loss - c2 * entropy_bonus  # minimizing, so signs flip vs. the maximization form
```

(When writing code that minimizes a loss, the signs on the value and entropy terms flip relative to the "maximize L(θ)" formula above — `policy_loss` is already negated, `+ c1 * value_loss` minimizes the value error, and `- c2 * entropy_bonus` maximizes entropy by minimizing its negative.)

## Key terms

| Term | Meaning |
|---|---|
| Probability ratio, r_t(θ) | π_θ(a_t\|s_t) / π_θ_old(a_t\|s_t); how much the current policy has drifted from the data-collecting policy |
| Clip(·, 1−ε, 1+ε) | Caps the ratio to the range [1−ε, 1+ε], typically ε = 0.2 |
| L^CLIP | The pessimistic min() of the clipped and unclipped surrogate objective |
| Entropy bonus | A small reward for policy randomness, preventing premature convergence to a deterministic policy |

## Recap

PPO's clipped objective caps the probability ratio within [1−ε, 1+ε] and takes the more pessimistic of the clipped and unclipped surrogate, discouraging over-aggressive updates without any KL-divergence machinery; the full loss adds a value-function term and an entropy bonus on top. Next up, Lesson 25: Generalized Advantage Estimation, which supplies the Â_t this whole objective depends on.
