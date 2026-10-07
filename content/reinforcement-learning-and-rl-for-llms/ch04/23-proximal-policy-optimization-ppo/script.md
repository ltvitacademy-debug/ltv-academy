# Script — Proximal Policy Optimization (PPO)

## Segment 1 (title)

Lesson 22 covered TRPO's trust region and its practical cost. This lesson introduces PPO — the algorithm that replaced TRPO almost everywhere, including the RLHF pipeline that aligns modern LLMs.

## Segment 2 (steps)

PPO keeps the same surrogate objective as TRPO, but instead of solving a constrained optimization problem with conjugate gradients, it just clips the probability ratio so it can't stray too far from 1. That does roughly the same job — discouraging updates that move too far from the old policy — using only ordinary first-order gradient descent.

## Segment 3 (steps)

The training loop has a consistent shape: collect rollouts under the current policy, compute advantages, then run several epochs of minibatch updates on that same collected batch before throwing it away and collecting fresh data. Reusing the batch for multiple epochs is safe specifically because clipping keeps those repeated updates in check, and it's a big part of why PPO is far more sample-efficient than plain REINFORCE.

## Segment 4 (code)

In practice almost nobody hand-writes this. Stable-Baselines3 gives you a tested PPO implementation — pick an environment, set a learning rate, a rollout length, and the clip range, which is exactly the epsilon from next lesson's clipped objective, and call learn.

## Segment 5 (outro)

PPO's robustness to noisy reward signals is exactly why it became the default for RLHF. Up next, lesson 24: the exact clipped objective function, term by term.
