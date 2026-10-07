# Script — Actor-Critic Methods

## Segment 1 (title)

REINFORCE works but it's noisy, and it has to wait for a whole episode to finish before updating. This lesson brings in a learned critic to fix both problems: actor-critic methods.

## Segment 2 (steps)

The actor is REINFORCE's policy network, choosing actions. The critic is a new network that learns a state-value function, judging how good states are. They train together — the critic's judgment shapes the actor's updates, and the actor's behavior shapes what states the critic sees.

## Segment 3 (code)

Instead of the noisy Monte Carlo return, the actor uses the TD error — reward plus discounted next-state value, minus current state value — as its advantage signal. That's available after a single step, not a whole episode, and it plugs into exactly the same update shape REINFORCE used, just with G_t swapped for delta_t. The critic trains itself with ordinary TD learning, minimizing the squared TD error.

## Segment 4 (code)

In a training step, the critic estimates the current and next state values, forms the TD target and error, and then the actor's loss is just the negative log-probability times that error — detached, so the actor doesn't try to backprop into the critic's own training.

## Segment 5 (outro)

Trading a noisy full-episode return for a fast, bootstrapped one-step error is a huge variance win, at the cost of some bias from the critic's current inaccuracy. Up next, lesson 21 makes the theory behind this precise: why subtracting a baseline doesn't introduce bias at all.
