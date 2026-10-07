# Script — Eval Design Pitfalls

## Segment 1 (title)

A well-intentioned evaluation can still produce a misleading number. These failure modes aren't usually about carelessness — they're structural problems that show up even when everyone involved is trying to do this correctly.

## Segment 2 (steps)

An evaluation has construct validity when it actually measures what it claims to measure. A benchmark meant to test deceptive reasoning might really just test willingness to role-play a persona the prompt sets up — a related but different thing. That gap is easy to miss, because the benchmark still produces a clean-looking number. The only real check is close inspection of individual items: does the task actually require the claimed capability, or does it admit an easier shortcut that earns full credit without it?

## Segment 3 (steps)

A benchmark saturates when most models score near the maximum, which means it can no longer tell a merely good model apart from a genuinely dangerous one — not because risk went away, but because the measuring tool wore out. Contamination is a related problem: if eval questions leak into pretraining data through public repositories or papers, a model can score well through memorization rather than genuine capability, inflating confidence exactly where the stakes of being wrong are highest.

## Segment 4 (steps)

And any measurable target that ends up influencing training becomes something optimization pressure can satisfy without satisfying the underlying goal — that's Goodhart's law, and it applies to safety evals as much as anything else. Track a pass rate and iterate models against it, and you can end up with a model tuned to the eval's surface features rather than genuinely safer in the way the eval was meant to indicate.

## Segment 5 (outro)

All of these pitfalls assume the model itself isn't actively working against the test. Next lesson covers what happens when it is: sandbagging and evaluation gaming.
