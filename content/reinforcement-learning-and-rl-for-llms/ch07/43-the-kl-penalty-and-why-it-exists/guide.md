# The KL Penalty & Why It Exists

This is lesson 43 of Chapter 7. The last two lessons built the pipeline and wired up the frozen reference model alongside the trainable policy. This lesson explains exactly what that reference model is *for*: the KL penalty, the term that keeps PPO from wandering arbitrarily far from the SFT model while chasing reward.

## What you'll learn

- The exact reward formula RLHF's PPO stage optimizes, including the KL term
- How to compute a per-token KL approximation during generation
- Why an unconstrained reward model objective is dangerous (ties back to lesson 39)
- How adaptive KL control keeps the penalty's strength on target over training

## The actual reward PPO optimizes

RLHF's PPO stage doesn't optimize the reward model's score directly. It optimizes that score minus a penalty for drifting from the reference policy:

```
r_total(x, y) = r_RM(x, y) − β · KL(π_θ(·|x) ‖ π_ref(·|x))
```

Here `r_RM` is the reward model's score (Chapter 6) on prompt `x` and generated response `y`, `π_θ` is the current policy, `π_ref` is the frozen SFT reference model, and `β` is a scalar controlling how strongly drift is penalized. Without the second term, PPO would simply chase whatever the reward model rewards — including the reward model's own blind spots.

## Computing it per token

The full KL divergence between two distributions over all possible sequences is intractable, so RLHF approximates it token-by-token along the actual generated sequence, using the two models' log-probabilities at each generated token:

```python
def approx_kl_penalty(policy_logprobs, ref_logprobs):
    # both: log pi(token_t | context) under policy vs. reference,
    # summed (or averaged) over the generated response's tokens
    return policy_logprobs - ref_logprobs

# per-token reward passed to PPO's advantage computation
token_reward = reward_model_score_for_last_token - beta * approx_kl_penalty(
    policy_logprobs, ref_logprobs
)
```

This is a per-token, per-sample Monte Carlo estimate of the true KL divergence — it's only exact in expectation over many samples, but it's cheap enough to compute at every generation step, which is what RLHF needs.

## Why the penalty exists at all

Without it, PPO has every incentive to exploit exactly the reward model weaknesses covered in lesson 39, reward model overoptimization: push the policy toward any text the reward model over-scores, however far that drifts from fluent, on-distribution language. The KL penalty puts a direct cost on that drift, independent of what the reward model thinks, which keeps the policy's outputs recognizably close to what the SFT model — and by extension, the human demonstrations it was trained on — would produce. It's a second, cheaper check against overoptimization that doesn't depend on the reward model being right.

## Adaptive KL control

A fixed `β` is hard to tune: too small and the policy drifts too far before the penalty bites; too large and PPO barely moves from the SFT model at all, limiting how much the reward model can improve behavior. Adaptive KL control instead targets a specific KL value and adjusts `β` to hit it:

```python
if current_kl > target_kl * 1.5:
    beta *= 1.5     # drifting too fast — strengthen the penalty
elif current_kl < target_kl / 1.5:
    beta /= 1.5     # too conservative — relax it
```

TRL's `PPOTrainer` implements exactly this kind of adaptive controller by default, recomputing the effective `β` throughout training rather than leaving it fixed.

## Key terms

- **KL divergence (KL)** — a measure of how different two probability distributions are; here, how far the current policy has drifted from the reference model
- **β (beta)** — the scalar weight controlling how strongly the KL term is penalized in the total reward
- **Per-token KL approximation** — estimating the sequence-level KL divergence using log-probability differences at each generated token
- **Adaptive KL control** — dynamically adjusting β during training to keep the observed KL near a target value

## Recap

The KL penalty subtracts a β-weighted, per-token-approximated divergence from the reference model out of the reward model's score, giving PPO a direct, reward-model-independent cost for drifting too far from the SFT policy — and adaptive control keeps that cost calibrated throughout training rather than fixed and brittle. Even with this penalty in place, RLHF still fails in characteristic ways — next lesson covers what those failure modes look like in practice.
