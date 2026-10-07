# Script — Evaluating Reasoning Improvements

## Segment 1 (title)

Lesson 59, closing Chapter 9. You've trained reasoning with RLVR, applied it to math and code, watched it get gamed, and boosted it further at inference time. This lesson asks the question that should have been nagging at you the whole way: how do you know a score increase means better reasoning, not a gamed benchmark or an unfair comparison?

## Segment 2 (code)

Lesson 58 showed that sampling more and searching harder improves scores on a fixed policy with zero training change. So a reported improvement is uninterpretable unless the baseline and the new model were evaluated with the same inference budget. The fair comparison holds that budget fixed and reports pass-at-one — single-sample accuracy — as the cleanest read on what actually changed in the policy itself.

## Segment 3 (steps)

Three things can hide inside a leaderboard number. Benchmark contamination — problems or close variants leaking into pretraining, SFT data, or a reused verifier set — inflates scores through memorization, not generalization. Mismatched compute budgets, from lesson 58, inflate scores with no training change at all. And unfaithful traces, from lesson 57, mean a correct answer doesn't guarantee the displayed reasoning actually produced it.

## Segment 4 (steps)

The stronger standard combines three defenses: evaluate on genuinely fresh problems sourced after the training cutoff, hold the inference budget fixed and report pass-at-one, and spot-check a sample of correct traces for faithfulness — by truncating or corrupting a step and checking whether the final answer changes as it should. None of this is a perfect guarantee, but it's far stronger than a single leaderboard number.

## Segment 5 (outro)

No contamination, compute-matched comparison at pass-at-one, and a faithfulness audit — that's what separates a real reasoning gain from a benchmark score. That closes Chapter 9. Chapter 10, Agents & Multi-Step RL, starts next lesson by extending this to multi-step, tool-using agents.
