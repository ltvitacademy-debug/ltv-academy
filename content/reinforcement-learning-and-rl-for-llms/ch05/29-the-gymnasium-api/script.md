# Script — The Gymnasium API

## Segment 1 (title)

Welcome to lesson 29 and the start of Chapter 5, RL Environments and Infrastructure. Every algorithm you've studied needs something to act on, and in Python that almost always means the Gymnasium API. This lesson is your tour of that interface.

## Segment 2 (steps)

Every Gymnasium environment follows the same two-method loop. Reset starts a new episode and hands back the first observation. Step takes an action and advances the environment by one timestep. You keep stepping until the episode ends, then reset again for the next one.

## Segment 3 (code)

Here's that loop in code. You create the environment, reset it, then repeatedly sample an action, step forward, and check whether the episode ended. Nothing about this loop changes whether the environment is CartPole, a custom robot sim, or something you write yourself next lesson — that uniformity is the whole point of the API.

## Segment 4 (steps)

Step returns five values, not four, because Gymnasium splits the old "done" flag into two signals. Terminated means the environment itself ended the episode — the pole fell, the goal was reached. Truncated means an external limit cut it off, like a step cap, even though the task could have continued. And info is a plain dictionary for diagnostics and logging — your policy should never use it to decide what to do.

## Segment 5 (outro)

Reset, step, and that terminated-versus-truncated split are the contract every environment honors. Next lesson, you'll write one of these environments yourself from scratch.
