# Combining Human & AI Feedback

This is lesson 52, the closing lesson of Chapter 8. The last lesson treated RLHF and RLAIF as a choice between two options. In practice, most production alignment pipelines don't pick one exclusively — they combine both signal sources, each covering what the other is weaker at. This lesson covers the concrete ways teams do that.

## What you'll learn

- Mixing human- and AI-labeled preference data in a single reward model's training set
- Using human labels specifically to validate and calibrate an AI judge, not just to train on
- Routing by difficulty: human attention on hard cases, AI judging on routine volume
- How this connects back to the reward model evaluation diagnostics from lesson 40

## Mixed preference datasets

The simplest combination trains one reward model on a single dataset that blends human-labeled and AI-labeled comparisons, in whatever ratio the data availability and task allow. Nothing about reward model training (lesson 38) needs to change — `RewardTrainer` doesn't know or care whether a given `(prompt, chosen, rejected)` row came from a human annotator or an AI judge, as long as both are formatted the same way.

```python
from datasets import concatenate_datasets

human_labeled = load_dataset("human_preferences", split="train")
ai_labeled = load_dataset("ai_judged_preferences", split="train")
combined = concatenate_datasets([human_labeled, ai_labeled]).shuffle(seed=42)

reward_trainer = RewardTrainer(model=rm, train_dataset=combined, args=reward_config)
```

This gets the AI judge's scale without depending on it exclusively — the human-labeled portion anchors the dataset even if it's a small fraction of the total volume.

## Using human labels to validate the judge

A separate, more targeted use of human labeling: instead of (or in addition to) blending it into training data, keep a held-out set of human preference labels specifically to check the AI judge's agreement rate with humans on the same comparisons — exactly the independent-correlation check from lesson 40, applied to the judge itself rather than to a trained reward model.

```python
agreement = 0
for example in human_vs_ai_check_set:
    ai_label = judge_model_label(example["prompt"], example["response_a"], example["response_b"])
    if ai_label == example["human_label"]:
        agreement += 1
judge_human_agreement = agreement / len(human_vs_ai_check_set)
```

A low agreement rate is a direct signal the AI judge isn't ready to be trusted at scale on this task yet — worth catching before training a reward model on thousands of its labels.

## Routing by difficulty

A third pattern sends easy, high-volume, routine comparisons to the AI judge, and routes the comparisons where the judge itself reports low confidence, or where two independent AI judges disagree, to human annotators instead. This spends the scarce, expensive resource (human attention) specifically where it has the most value, rather than spreading it thin across every comparison, including the easy majority an AI judge handles reliably.

## Why this connects back to Chapter 6's diagnostics

All three patterns are variations on the same idea from lesson 40: don't trust a judgment source — human, AI, or a trained reward model — without checking it against an independent one. Mixing data sources, validating judge agreement, and difficulty-based routing are all ways of using one feedback source to catch the other's blind spots, rather than picking a single source and hoping its blind spots never matter.

## Key terms

- **Mixed preference dataset** — a single training set blending human-labeled and AI-labeled comparisons, consumed identically by reward model training
- **Judge-human agreement rate** — the fraction of comparisons where an AI judge's label matches an independent human label on the same pair
- **Difficulty-based routing** — sending low-confidence or disputed comparisons to human annotators, routine ones to an AI judge
- **Cross-validation between sources** — using one feedback source to check another's blind spots, extending lesson 40's independent-correlation check

## Recap

Combining human and AI feedback — mixed datasets, judge-agreement validation, and difficulty-based routing — lets teams get RLAIF's scale without losing RLHF's grounding, by using each source to catch what the other misses. That closes Chapter 8, RLAIF & Constitutional AI, and with it the human-and-AI feedback half of this course's alignment pipeline. Chapter 9 begins next lesson with RL for Reasoning, where the reward signal shifts again — this time to verifiable correctness on math and code, rather than any learned preference judgment at all.
