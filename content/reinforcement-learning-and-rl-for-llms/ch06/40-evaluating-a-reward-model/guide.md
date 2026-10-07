# Evaluating a Reward Model

This is lesson 40 of the Reinforcement Learning & RL for LLMs course, the closing lesson of Chapter 6, Reward Modeling. You've built a reward model and seen how it can go wrong under RL optimization pressure. This lesson covers how to measure a reward model's quality *before* that stage — the diagnostics that tell you whether a reward model is good enough to trust as a stand-in for human judgment at all.

## What you'll learn

- Held-out preference accuracy: the primary metric, and what it actually measures
- Calibration: why a reward model being "usually right" isn't the same as being well-calibrated
- Correlation with independent human judgment, beyond the training distribution
- Why evaluation needs to happen before, not just after, RL training begins

## Held-out preference accuracy

The most direct evaluation metric mirrors how the reward model was trained: take a held-out set of preference pairs (chosen/rejected, from the same annotation process but never seen during training) and check how often the model actually assigns a higher score to the chosen response than the rejected one.

```python
correct = 0
for example in held_out_preferences:
    chosen_score = reward_model(example["prompt"], example["chosen"])
    rejected_score = reward_model(example["prompt"], example["rejected"])
    if chosen_score > rejected_score:
        correct += 1

accuracy = correct / len(held_out_preferences)
```

This number is directly comparable to how well a second human annotator would agree with the first — if your held-out data has multiple annotations per comparison, human-human agreement gives you a natural ceiling to compare the model against. A reward model that's noticeably below typical human-human agreement on the same comparisons is not yet trustworthy as a human stand-in.

## Calibration, not just accuracy

Accuracy alone can hide a real problem: a model might be right 75% of the time but overconfident about *which* 75%, assigning extreme score gaps to comparisons that were actually close calls, or near-zero gaps to comparisons that were actually lopsided. Calibration checks whether the model's predicted preference probability — σ(r(chosen) − r(rejected)) from the Bradley-Terry formula — actually matches the empirical frequency of chosen winning, when you bucket comparisons by predicted probability. A well-calibrated model that says "70% confident" should be right about 70% of the time across all the cases where it said that, not just on average.

## Correlation with independent judgment

Held-out preference accuracy still comes from the same annotation pipeline the training data came from, which means it can share the same blind spots. A stronger check is correlating the reward model's scores with an *independent* signal — a different, stronger judge model, a separate panel of annotators with different instructions, or (where available) downstream outcome measures. Divergence here is an early warning sign for exactly the kind of blind spot that reward model overoptimization (lesson 39) will later exploit under RL pressure — catching it during evaluation is far cheaper than catching it after a training run.

## Evaluate before RL, not just after

A reward model's evaluation isn't a one-time checkbox before deployment — it's a gate before you let an RL algorithm optimize against it at all. Teams typically re-run these same diagnostics (held-out accuracy, calibration, independent correlation) periodically during RL training itself, specifically watching for the proxy-versus-true-quality divergence from lesson 39. Catching a reward model's weakness during evaluation, before heavy RL optimization pressure has a chance to find and exploit it, is the cheapest point in the whole pipeline to fix a problem.

## Key terms

- **Held-out preference accuracy** — the fraction of unseen preference pairs where the reward model scores the chosen response higher
- **Calibration** — whether a model's predicted preference probability matches its actual empirical correctness rate at that confidence level
- **Human-human agreement** — the rate at which two human annotators agree on the same comparisons, used as a natural ceiling for reward model accuracy
- **Independent correlation check** — comparing reward model scores against a judgment source that didn't contribute to the training data

## Recap

Evaluating a reward model means checking held-out preference accuracy against human-human agreement, checking calibration (not just raw accuracy), and correlating with independent judgment sources to catch blind spots before RL training has a chance to exploit them. That closes Chapter 6, Reward Modeling. Chapter 7 begins next lesson by assembling everything so far — environments, reward models, Bradley-Terry training — into the full RLHF pipeline.
