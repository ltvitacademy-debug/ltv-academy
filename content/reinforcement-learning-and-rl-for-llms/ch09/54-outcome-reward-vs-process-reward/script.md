# Script — Outcome Reward vs. Process Reward

## Segment 1 (title)

Lesson 54, Chapter 9. Last lesson named three places a reward can attach to a reasoning trace. This lesson works through two of them in depth: outcome reward models and process reward models — the two dominant strategies for scoring reasoning, and the real trade-off between them.

## Segment 2 (code)

An outcome reward model looks only at the final answer — match the ground truth, get full reward, regardless of whether the reasoning in between was sound. A process reward model instead scores every intermediate step on its own logical validity. That's a much denser signal, but it means scoring the whole path, not just the destination.

## Segment 3 (steps)

OpenAI's "Let's Verify Step by Step" trained both on the same math problems and found the process reward model meaningfully better — it ranked candidate solutions better and generalized further, because it rewards sound reasoning, not just a matching answer string. The cost is supervision: their PRM800K dataset needed roughly eight hundred thousand hand-labeled steps. Math-Shepherd automates that by sampling continuations from a step and checking how often they still succeed.

## Segment 4 (steps)

Most systems don't pick one exclusively. Outcome reward is cheap and dominates large-scale RL training, where millions of rollouts make per-step labeling expensive at that volume. Process reward earns its cost where it's reused many times — most prominently to guide search rather than train the policy directly.

## Segment 5 (outro)

Outcome reward checks the destination; process reward checks the path, at a real labeling cost automated methods are starting to shrink. Both still need something to supply the score. Next, lesson 55: RLVR, where that something is a rule-based verifier instead of any learned model at all.
