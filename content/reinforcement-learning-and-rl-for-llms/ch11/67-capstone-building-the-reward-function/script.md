# Script — Capstone: Building the Reward Function

## Segment 1 (title)

Lesson 67, continuing the Capstone. You picked a task last lesson; now you write the piece that actually checks it — the reward function PPO calls on every generated response. A PPO run only ever optimizes exactly what this function measures, so getting it wrong undermines everything downstream.

## Segment 2 (code)

A generated solution ends with a final-answer line, so the reward function's first job is pulling that number out reliably, matching the dataset's own answer format so ground truth and generation parse the same way. For a code task, the equivalent step runs the generated function against a fixed set of unit tests.

## Segment 3 (code)

Three choices matter in the scoring itself. An unparseable response gets a real negative reward, not zero, because zero would look identical to a parseable-but-wrong answer. Correct and incorrect are separated by a wide margin so PPO has a clear signal to climb. And a small length penalty discourages padding without punishing genuinely necessary reasoning.

## Segment 4 (steps)

This exact function is vulnerable to reward hacking — a model could learn to spam a fake answer tag to exploit the regex. Guard against it by validating structure, not just presence, and by testing the reward function against intentionally adversarial strings before training starts. It's far cheaper to catch an exploit now than after thousands of PPO updates have already found it.

## Segment 5 (outro)

Parse the answer, score it with a clear margin, penalize unparseable output explicitly, and stress-test it first. Next lesson, this function plugs directly into TRL's PPOTrainer for the actual training run.
