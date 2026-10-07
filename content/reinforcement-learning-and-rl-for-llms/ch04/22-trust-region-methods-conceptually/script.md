# Script — Trust Region Methods, Conceptually

## Segment 1 (title)

Chapter 3 solved how to get a good gradient estimate. This chapter asks a different question: once you have it, how big a step should you actually take? Trust region methods were the first serious answer.

## Segment 2 (steps)

In supervised learning, too large a step usually just costs you one bad epoch. In policy optimization it's more dangerous: an oversized update can shift the policy so far that it starts collecting qualitatively worse experience, with no path back. The real risk isn't how far the parameters moved — it's how much the policy's actual behavior changed.

## Segment 3 (code)

TRPO optimizes a surrogate objective instead of return directly: a probability ratio between the new and old policy, times the advantage. That ratio says how much more or less likely the new policy is to take an action the old policy already took, and it's cheap to evaluate from data already collected under the old policy.

## Segment 4 (code)

But that surrogate is only trustworthy near the old policy, so TRPO maximizes it subject to a constraint: the KL divergence between old and new action distributions, averaged over visited states, has to stay under a small delta. That's the trust region — the zone where the approximation is safe to optimize.

## Segment 5 (outro)

Solving that constrained problem exactly needs conjugate gradients and curvature approximations — powerful, but expensive and fiddly to implement. Up next, lesson 23, Proximal Policy Optimization, which gets most of the same safety from a far simpler mechanism.
