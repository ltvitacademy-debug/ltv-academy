# Script — Reward Shaping

## Segment 1 (title)

Lesson 32, Chapter 5. Some environments give almost no reward until the very end of a long episode. That sparsity makes learning painfully slow, and reward shaping is the standard fix.

## Segment 2 (steps)

Picture a grid-world agent that only gets reward on the single step it reaches the goal. With a near-random policy, it might wander thousands of steps before ever stumbling onto that one reward. Until it does, there's no learning signal at all. Shaping adds a denser auxiliary signal that points toward the sparse true objective, without redefining what the objective actually is.

## Segment 3 (code)

The general formula adds a shaping term, F of s and s prime, onto the true reward. A common, intuitive choice is distance-based: moving closer to the goal gives a small bonus, moving away gives a small penalty. Written this specific way — gamma times the potential of the next state, minus the potential of the current state — it's called potential-based shaping.

## Segment 4 (steps)

That specific form matters because of a 1999 result from Ng, Harada, and Russell: potential-based shaping is provably guaranteed not to change which policy is optimal. It can make the agent find that policy faster, but it can never make a worse policy look better than the true optimum. Shape arbitrarily instead, and you lose that guarantee completely.

## Segment 5 (outro)

Reward shaping densifies a sparse signal; potential-based shaping is the one form proven safe. Shape carelessly, and the agent can start optimizing the shaping term instead of the task — which is exactly what the next lesson, reward hacking in toy environments, is about.
