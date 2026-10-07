# Script — Implementing PPO From Scratch

## Segment 1 (title)

The last several lessons built every individual piece of PPO. This lesson assembles them into one working implementation, so there's no mystery left in what a library like Stable-Baselines3 does internally.

## Segment 2 (code)

Most implementations share early layers between actor and critic, since both process the same state. One trunk, two heads — an actor head producing action logits, and a critic head producing a single value estimate.

## Segment 3 (steps)

The training loop has four steps: collect a rollout by running the current model in the environment, compute advantages and returns with GAE's backward recursion, run several epochs of clipped updates over that same rollout in minibatches, then discard it and collect a fresh one with the now-updated model.

## Segment 4 (code)

Inside those epochs, every formula from the last few lessons lands in exactly one place — the ratio and clipping from the objective function lesson, operating on the advantages that GAE just produced, combined with the value loss and entropy bonus into one final loss.

## Segment 5 (outro)

That's a complete, runnable PPO implementation. Up next, lesson 27: what it actually looks like when a training run like this one goes wrong, and how to diagnose it.
