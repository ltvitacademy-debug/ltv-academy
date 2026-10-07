# Script — Vectorized Environments

## Segment 1 (title)

Lesson 31, Chapter 5. Modern RL training rarely runs one environment at a time — it runs dozens or hundreds in parallel, because collecting experience, not the gradient update, is usually the bottleneck. Vectorized environments give you that parallelism without changing the API you already know.

## Segment 2 (code)

make_vec creates N copies of a named environment and wraps them behind the same reset and step calls — except now observations, rewards, and the termination flags all come back batched, one row per sub-environment, with a single action array going in.

## Segment 3 (steps)

The reason to bother: a single environment leaves most of your hardware idle while it waits on environment stepping. Run N copies and batch the call, and you get N transitions per step instead of one — more throughput, and a more diverse, lower-variance batch for the learning algorithm.

## Segment 4 (steps)

There are two ways to run that batch. SyncVectorEnv steps every sub-environment in the same process, one after another — simple, no overhead, the right default for lightweight environments. AsyncVectorEnv runs each sub-environment in its own subprocess, which pays off once each environment step is itself expensive. And watch for autoreset: a finished sub-environment resets automatically, usually reflected on the next step call, so always read terminations per index rather than assuming every row in the batch is mid-episode.

## Segment 5 (outro)

Vectorized environments trade a little bookkeeping for a large jump in data-collection throughput. Next lesson: shaping rewards to make learning faster without changing what the agent is ultimately optimizing for.
