# Script — PPO Clipping & the Objective Function

## Segment 1 (title)

Last lesson mentioned clipping as PPO's mechanism for controlling updates. This lesson derives the exact clipped objective, term by term, plus the two extra terms the full loss actually uses.

## Segment 2 (code)

The probability ratio r sub t of theta compares the current policy's probability of an action to the probability the data-collecting policy assigned to it. It equals one right when nothing's changed yet, and drifts away from one as training epochs accumulate on the same batch.

## Segment 3 (code)

The clipped objective takes the minimum of the unclipped ratio times advantage, and that same ratio clipped into a narrow band around one, times advantage. For a positive advantage, once the ratio pushes past the top of that band, the clipped term is smaller, so the min picks it — removing any incentive to keep inflating that action's probability. The same logic protects against pushing a bad action's probability down too aggressively.

## Segment 4 (code)

In practice the loss that actually gets minimized adds two more pieces: a value function loss that trains the critic producing the advantage estimates, and a small entropy bonus that keeps the policy from collapsing into a deterministic choice before it's explored enough.

## Segment 5 (outro)

Clip the ratio, take the pessimistic estimate, add a value loss and an entropy bonus — that's the complete PPO objective. Up next, lesson 25: Generalized Advantage Estimation, which actually produces the A_t this objective depends on.
