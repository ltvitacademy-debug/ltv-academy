# Script — Capstone: Evaluation Against Baseline

## Segment 1 (title)

Lesson 69, continuing the Capstone. Training finished last lesson with a reward curve that hopefully climbed — but that's not the evaluation. This lesson covers the separate, rigorous check: did the model actually get better at the task, measured honestly against the baseline it started from.

## Segment 2 (steps)

The training reward curve is measured on training data, using the exact reward function the policy is being optimized against — of course it tends to rise. It confirms optimization is working, not that the model generalized. The real question needs a dataset the model never saw during training, which is exactly why lesson 66 told you to carve out a held-out set before training even started.

## Segment 3 (code)

The core comparison is pass rate: run both the untouched baseline and the PPO-trained model on the held-out set, with greedy decoding on both so any gap in the numbers comes from the policy change, not random sampling differences between runs.

## Segment 4 (steps)

A pass-rate improvement alone can still hide a problem. Read a sample of the actual generations, not just the scores — compare response-length distributions between baseline and PPO model, and spot-check a handful of "correct" responses by eye. A real improvement comes with reasoning that still looks coherent, not a gamed shortcut exploiting the verifier.

## Segment 5 (outro)

Compare pass rate on a truly held-out set with greedy decoding, then back that number up by eyeballing real generations for reward hacking. Final lesson next: writing up these results, and where to go from here in RL for LLMs.
