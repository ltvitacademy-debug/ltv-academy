# Script — Evaluating a Reward Model

## Segment 1 (title)

Lesson 40, closing out Chapter 6. You've built a reward model and seen how it can go wrong under RL pressure. This lesson covers how to measure its quality before that stage even starts.

## Segment 2 (code)

The most direct check mirrors how the model was trained: take a held-out set of preference pairs it never saw, and measure how often it scores the chosen response above the rejected one. That accuracy number is directly comparable to how often two human annotators agree with each other on the same comparisons — which gives you a natural ceiling to judge the model against.

## Segment 3 (steps)

Accuracy alone can hide a real problem. A model can be right most of the time while being badly overconfident about which cases it's right on. Calibration checks whether the model's predicted preference probability actually matches how often it's correct at that confidence level — if it says seventy percent confident, it should be right about seventy percent of the time, not just on average.

## Segment 4 (steps)

Held-out accuracy still comes from the same pipeline the training data came from, so it can share the same blind spots. A stronger check correlates the reward model's scores against an independent source — a different, stronger judge model, or a separate annotator panel. Divergence there is an early warning sign for exactly the kind of blind spot that overoptimization will later exploit under RL pressure, and it's far cheaper to catch now.

## Segment 5 (outro)

Held-out accuracy against human agreement, calibration, and independent correlation — run these before RL starts, and keep re-running them during it. That closes Chapter 6. Chapter 7 starts next lesson by assembling everything so far into the full RLHF pipeline.
