# Script — SARSA

## Segment 1 (title)

This is lesson twelve, Chapter Two, Classic RL Algorithms. Q-learning was the off-policy TD control algorithm. SARSA is its on-policy sibling — nearly the same update rule, but one substitution changes what the algorithm actually learns.

## Segment 2 (steps)

The name literally spells out its update: state, action, reward, state, action. All five of those have to actually happen — including that final action, which has to really be chosen by the policy before the update can run.

## Segment 3 (code)

Line them up and the difference is tiny. Q-learning's target uses the max over all possible next actions. SARSA's target uses the Q-value of whichever action the agent's own policy actually takes next. That's the entire gap between off-policy and on-policy.

## Segment 4 (steps)

That gap shows up concretely in something like a cliff-walking grid, where stepping off the edge is heavily penalized. Because SARSA's target accounts for its own ongoing exploration — including the chance of accidentally stumbling into the cliff — it tends to learn a safer path further from the edge. Q-learning's target always assumes the greedy action gets taken, so it learns the objectively shortest path, right along the edge, even while its actual exploratory behavior occasionally falls in.

## Segment 5 (outro)

Same TD skeleton, one substitution, two genuinely different behaviors during training. Next up, lesson thirteen: tabular RL's limitations, which sets up why this chapter closes with function approximation.
