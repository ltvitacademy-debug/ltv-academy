# Debugging a PPO Training Run

This is lesson 27 of the Reinforcement Learning & RL for LLMs course, continuing Chapter 4, Policy Optimization Methods. Lesson 26 built a working PPO implementation; this lesson covers what happens when a run like that one — or a Stable-Baselines3 run, or the RLHF pipeline this course reaches in Chapter 7 — goes wrong, and which logged metrics tell you why.

## What you'll learn

- The handful of metrics every serious PPO implementation logs, and what each one is actually measuring
- Four common failure signatures and how to read them from those metrics
- Why most PPO failures trace back to the advantage estimate, the clipping range, or the learning rate — not the algorithm itself
- A practical mental checklist for a training run that looks unhealthy

## The metrics that matter

Stable-Baselines3 (and most other implementations) logs several diagnostic values every update. Reading a healthy PPO run means watching these together, not any single one in isolation:

- **approx_kl** — an estimate of how much the policy actually changed this update, measured as the average KL-divergence between the old and new policy. This is the practical echo of TRPO's trust region (Lesson 22): PPO doesn't enforce a hard KL limit, but a healthy run should still show small, stable approx_kl values, not wild swings.
- **clip_fraction** — the fraction of samples in a batch where the probability ratio actually got clipped. If this is consistently near 0, the policy barely needs the trust-region mechanism at all, which usually means the learning rate is too conservative. If it's consistently near 1, almost every sample is being clipped, meaning updates are trying to move the policy much further than the trust region allows.
- **explained_variance** — how well the critic's value predictions explain the actual observed returns, from 0 (no better than predicting the mean) to 1 (perfect). A critic that isn't learning shows explained_variance stuck near 0 or negative.
- **entropy_loss** — tracks the policy distribution's entropy (Lesson 24's entropy bonus). A sharp, early drop toward a very low value signals the policy has collapsed to near-deterministic behavior before it explored enough.

## Four common failure signatures

| Symptom | Likely cause | What to check or try |
|---|---|---|
| Reward suddenly collapses to near-zero mid-training | A too-large learning rate or too-wide clip_range let a few bad batches destroy the policy | Lower the learning rate; confirm clip_range is near the standard 0.2; check approx_kl for a spike right before the collapse |
| Reward plateaus very early, policy looks "frozen" | clip_fraction near 0 (barely any updates are hitting the clip boundary at all) | Learning rate may be too small, or advantages may be near-zero because the critic has already converged on a near-constant value estimate |
| Entropy crashes to near-zero in the first few updates | Policy collapsed to a deterministic choice before meaningful exploration happened | Increase the entropy bonus coefficient c2; check that the advantage estimates aren't being computed with a buggy or inverted sign |
| explained_variance stays near 0 or goes negative throughout training | The critic isn't learning a useful value function | Check the value-loss coefficient c1, confirm GAE's `returns = advantages + values` wiring is correct, check for a mismatched gamma/lambda between rollout collection and the update step |

## Why most failures trace back to a small set of causes

A striking fact about PPO debugging: the overwhelming majority of real-world failures are not bugs in the clipped objective itself (it's a short, well-tested formula) — they're bugs in the *advantage estimate feeding into it* (a sign error in GAE, a `values`/`next_values` off-by-one, a `done` mask applied incorrectly across an episode boundary) or in **hyperparameters that are simply mismatched to the problem** (a learning rate too high for a small, easy environment; a clip_range too permissive for an especially noisy reward signal). This is why the checklist order above always starts with the metrics rather than re-deriving the math from scratch — the formulas from Lessons 24 and 25 are rarely where the actual bug lives.

## Key terms

| Term | Meaning |
|---|---|
| approx_kl | The average measured KL-divergence between old and new policy after an update; the practical echo of TRPO's trust region |
| clip_fraction | The fraction of samples whose probability ratio was clipped; near 0 or near 1 both signal a problem |
| explained_variance | How well the critic's predictions match actual returns; near 0 means the critic isn't learning |
| Entropy collapse | The policy becoming near-deterministic too early, losing the exploration needed to keep improving |

## Recap

Diagnosing a broken PPO run starts with approx_kl, clip_fraction, explained_variance, and entropy, read together — and most real failures trace back to a bug in the advantage computation or a mismatched hyperparameter, not the clipped objective itself. Next up, Lesson 28: a closer look at exactly which PPO hyperparameters matter most, and how to set them sensibly.
