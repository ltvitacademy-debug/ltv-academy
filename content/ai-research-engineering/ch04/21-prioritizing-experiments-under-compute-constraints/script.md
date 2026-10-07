# Script — Prioritizing Experiments Under Compute Constraints

## Segment 1 (title)

Scheduling policy decides whose queued job runs next. It says nothing about whether that job should have been queued at all. The real constraint most research teams hit is more experiment ideas than GPU-hours, which is a prioritization problem, not an infrastructure problem.

## Segment 2 (code)

A useful ranking heuristic is expected information gain divided by cost — how much does this experiment change what the team believes, relative to how many GPU-hours it costs to find out. It's not a formula to compute precisely; it's a framing question to ask before submitting a job.

## Segment 3 (steps)

Before committing a full training budget to an idea, run a cheap proxy — a scaled-down model, a data subset, a short partial run — checked against known scaling trends. A clear break at small scale is strong evidence not to scale up; a non-effect at small scale is weaker evidence either way.

## Segment 4 (code)

The same judgment that drives sweep early-termination applies to a single long run outside a sweep: if validation loss has clearly diverged from a comparable baseline partway through, continuing rarely changes the conclusion. Checking in on long runs beats launching and forgetting them until a dead end finishes on its own.

## Segment 5 (outro)

That's how to decide which experiments earn their compute budget in the first place. Next, closing Chapter 4: ablation study design — the experiment type that most directly answers whether a component actually matters.
