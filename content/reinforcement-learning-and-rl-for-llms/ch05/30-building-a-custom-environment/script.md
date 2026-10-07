# Script — Building a Custom Environment

## Segment 1 (title)

Lesson 30, still in Chapter 5. Last lesson covered the Gymnasium contract. This lesson puts it to work by writing a complete custom environment from scratch.

## Segment 2 (code)

Every custom environment starts the same way: subclass gym.Env, declare your observation and action spaces in init, then implement reset and step. This skeleton is tiny, but it's already a complete, valid Gymnasium environment — everything you add from here builds on it.

## Segment 3 (steps)

Four things matter most. Declare both spaces up front. Make reset reseed the generator and return a valid starting state. Keep step's terminated and truncated signals honestly separate — a pole falling over is terminated, hitting a step cap you added yourself is truncated. And run the environment checker before you trust any of it.

## Segment 4 (code)

Gymnasium ships check_env specifically to catch the common contract violations — mismatched shapes, wrong dtypes, bad seeding — automatically. Once it passes, register your environment with an ID and entry point, and gym.make can create it by name exactly like a built-in.

## Segment 5 (outro)

A correct custom environment is a gym.Env subclass with declared spaces, a correct reset, a correct step, and a clean bill of health from check_env. Next lesson: running many copies of an environment at once with vectorized environments.
