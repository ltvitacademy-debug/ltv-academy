# Script — Research Code vs. Production Code Trade-offs

## Segment 1 (title)

We just covered a clean layout and a disciplined config system. It's tempting to think more engineering rigor is always better — it isn't. Research and production code optimize for genuinely different things, and the real skill is knowing which one a given piece of work needs right now.

## Segment 2 (steps)

Production code runs unattended and has to survive weird inputs, so it's optimized for robustness. Research code runs under your direct supervision and gets rewritten constantly as the question changes, so it's optimized for iteration speed — how fast you can go from having an idea to having a number that confirms or refutes it. Neither is the right way to write code in general; they're each right for a different job.

## Segment 3 (steps)

Plenty of debt is genuinely fine to carry in research code. Skipping input validation on functions only you call, since you control every call site. Hard-coded paths and magic numbers during early exploration. Even duplicating a training loop across two experiment variants, because a premature shared abstraction is usually wrong about what the second variant actually needs.

## Segment 4 (code)

Refactor when multiple researchers now depend on the code, when it's feeding the headline result instead of just exploration, when you've run the same script fifteen times with edits, or when the shortcut itself has become the bottleneck — like teammates hand-editing hard-coded paths before every run. Treat this as a judgment call you revisit often, not a decision made once at kickoff.

## Segment 5 (outro)

Match the engineering discipline to the job, not to habit. Up next, lesson fourteen: testing strategies for research code, where that same judgment call decides what's actually worth a unit test.
