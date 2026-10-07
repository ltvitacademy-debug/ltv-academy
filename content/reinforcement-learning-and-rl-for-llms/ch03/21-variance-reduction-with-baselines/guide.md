# Variance Reduction With Baselines

This is lesson 21 of the Reinforcement Learning & RL for LLMs course, closing out Chapter 3, Deep RL. Lesson 20 used the TD error, r_t + γV(s_{t+1}) − V(s_t), as a lower-variance replacement for the raw return G_t, without fully explaining why that substitution is allowed. This lesson makes that theory precise: subtracting a state-dependent baseline from the return reduces variance and introduces **zero** bias, which is exactly why every practical policy gradient method — actor-critic, and PPO later in this course — relies on it.

## What you'll learn

- The formal baseline-subtraction trick and why it doesn't change the expected gradient
- A proof sketch for why E[∇_θ log π_θ(a|s) · b(s)] = 0 for any state-dependent baseline b(s)
- The definition of the advantage function A(s, a) = Q(s, a) − V(s), and why it's the natural choice of baseline
- REINFORCE with a learned baseline, as a stepping stone to actor-critic and later, GAE

## The baseline trick

Take the policy gradient theorem from Lesson 18 and subtract any function of state alone, b(s), from the return term:

```
∇_θ J(θ) = E_π[ ∇_θ log π_θ(a|s) · (Q^π(s,a) − b(s)) ]
```

This looks like it should change the gradient, since a term was subtracted. It doesn't — in expectation, the extra term contributes exactly zero, for **any** choice of b(s), as long as b(s) doesn't depend on the action a.

## Why it's unbiased: the proof sketch

The claim to prove is E_π[∇_θ log π_θ(a|s) · b(s)] = 0, for fixed s. Since b(s) doesn't depend on a, it factors out of the expectation over actions:

```
E_{a~π}[ ∇_θ log π_θ(a|s) · b(s) ]
  = b(s) · E_{a~π}[ ∇_θ log π_θ(a|s) ]
  = b(s) · Σ_a π_θ(a|s) · ∇_θ log π_θ(a|s)
  = b(s) · Σ_a ∇_θ π_θ(a|s)                     (since π∇log π = ∇π)
  = b(s) · ∇_θ ( Σ_a π_θ(a|s) )
  = b(s) · ∇_θ (1)                               (probabilities sum to 1, always)
  = 0
```

The key step: π_θ(a|s)·∇_θ log π_θ(a|s) algebraically simplifies to ∇_θ π_θ(a|s) (a standard log-derivative identity), and the sum of π_θ(a|s) over all actions is always exactly 1, no matter what θ is — so its gradient with respect to θ is zero. This is why **any** state-dependent b(s) can be subtracted for free: it adds zero expected gradient, but it can still change the *variance* of each individual sample, and that's the whole point.

## Choosing the baseline: b(s) = V(s)

While any b(s) is unbiased, not every choice reduces variance equally well. The best practical choice is b(s) = V^π(s), the true expected return from state s. Subtracting it gives exactly the **advantage function**:

```
A(s, a) = Q(s, a) − V(s)
```

A(s, a) answers a more precise question than Q(s, a) alone: not "how good is this action in absolute terms," but "how much better or worse is this action than what the policy would get on average from this state anyway." Rewards and returns often share a large common component across all actions from a given state (e.g. a state that's just generally high-value), and that shared component contributes nothing to *which action to prefer* — subtracting V(s) removes exactly that common component, leaving a lower-variance signal that still points in the right direction.

This is precisely what Lesson 20's TD error was doing implicitly: δ_t = r_t + γV(s_{t+1}) − V(s_t) is a one-step, bootstrapped estimate of A(s_t, a_t).

## REINFORCE with a learned baseline

A simple middle ground between pure REINFORCE and full actor-critic: keep using the Monte Carlo return G_t, but subtract a separately-learned V(s) from it before weighting the policy gradient — no bootstrapping, just variance reduction:

```python
advantage = returns - value_net(states).squeeze().detach()
actor_loss = -(log_probs * advantage).sum()
value_loss = (returns - value_net(states).squeeze()).pow(2).mean()
```

This is a direct, practical application of the proof above: `value_net(states)` is any b(s), subtracting it changes nothing in expectation, and in practice it substantially tightens the gradient estimate's variance.

## Key terms

| Term | Meaning |
|---|---|
| Baseline, b(s) | Any function of state alone subtracted from the return in a policy gradient; unbiased for any choice |
| Advantage function, A(s,a) | Q(s,a) − V(s); how much better an action is than the state's average |
| Zero expected gradient | The formal property that makes baseline subtraction safe: it changes variance, never the expected update |

## Recap

Subtracting any state-dependent baseline from the return leaves the policy gradient unbiased, because the baseline's contribution to the expected gradient is provably zero — and choosing b(s) = V(s) gives the advantage function, the lowest-variance practical signal available. That closes Chapter 3. Chapter 4, starting next lesson, moves from "how do we get a good gradient estimate" to "how do we take a safe, well-sized step with it" — starting with trust region methods.
