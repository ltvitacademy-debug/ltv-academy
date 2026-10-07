# Script — Reinforcement Learning From AI Feedback

## Segment 1 (title)

Lesson 48, opening Chapter 8. Chapter 7 built the full RLHF pipeline on human preference labels. This lesson introduces RLAIF — the same pipeline, with an AI model generating those labels instead.

## Segment 2 (steps)

RLAIF changes exactly one thing: where the preference label comes from. A human annotator's comparison gets replaced by an AI judge's comparison, using the same rubric. Everything downstream — reward model training, evaluation, PPO or DPO — stays completely unchanged.

## Segment 3 (code)

The judge model gets the prompt, both candidate responses, and a rubric for what to prefer, and picks a winner. That produces the exact same chosen-and-rejected shape that trained the reward model back in Chapter 6 — the rest of the pipeline genuinely cannot tell the difference between this and a human-labeled pair.

## Segment 4 (steps)

RLAIF exists because human labeling is expensive and slow at the scale frontier models need, and it's inconsistent across annotators. An AI judge can label continuously and cheaply, applying the same criteria every time — at the cost of inheriting whatever blind spots that judge model itself has.

## Segment 5 (outro)

One component swapped, the rest of the pipeline identical. Next lesson covers Constitutional AI, Anthropic's specific approach to generating that AI feedback from a written set of principles rather than an unconstrained judge prompt.
