# Script — DPO vs. PPO-Based RLHF

## Segment 1 (title)

Lesson 46. Last lesson derived DPO as a reparameterization of the reward model objective from Chapter 6. This lesson compares the two approaches directly — not as one replacing the other, but as tools with real tradeoffs.

## Segment 2 (steps)

DPO's appeal is mostly about what it removes. No reward model to train and host. No rollout loop generating samples during training. No value head, no advantage estimation, fewer hyperparameters overall. It trains like ordinary supervised fine-tuning, which makes stable, reproducible runs a lot easier to get.

## Segment 3 (steps)

The central tradeoff is offline versus online. DPO trains entirely on a fixed, already-collected preference dataset and never generates new samples during training. PPO-based RLHF is online — the policy generates fresh completions during training that get scored immediately, which gives it room to improve beyond anything in the original preference data, at the cost of being more exposed to exactly the reward hacking covered last lesson.

## Segment 4 (code)

The original DPO paper reported it matching or beating PPO-based RLHF on summarization and dialogue while being far simpler. Later work complicates that — carefully tuned PPO, with reward model ensembling and careful KL control, has been shown to outperform DPO on some benchmarks. The comparison is genuinely sensitive to implementation quality on both sides.

## Segment 5 (outro)

Neither approach is strictly better — it depends on whether you need PPO's online exploration or DPO's simplicity more. Next lesson puts a small version of this pipeline into practice end-to-end with Hugging Face TRL.
