# Script — Capstone: Evaluation Against a Baseline

## Segment 1 (title)

The fine-tune ran, the adapter is saved — and none of that tells you whether it actually worked. This lesson applies Chapter 7's evaluation methodology for real, comparing the fine-tuned model against the pre-fine-tune baseline on both the target task and general capability. Stopping at "training completed without errors" skips the only step that answers the question the project was for.

## Segment 2 (steps)

This lesson runs two checks on purpose, because they answer different questions: did the fine-tune actually improve the target behavior, and did it cost you anything elsewhere. Evaluating only the first is exactly the blind spot the catastrophic forgetting lesson warned about — both checks run against the base model, never in isolation.

## Segment 3 (code)

In practice: load the base model and wrap it with the saved adapter using PeftModel, then score both on your held-out split — perplexity is one signal, but a direct check against your task's own criteria is usually more informative. For general capability, run the same benchmark subset, like MMLU or GSM8K via the lm-evaluation-harness, against both the base checkpoint and the adapter-equipped one.

## Segment 4 (steps)

Reading the two results together is what matters. A fine-tune that wins clearly on the task metric with a negligible general-capability delta is an unambiguous success. One that wins on the task metric but regresses meaningfully elsewhere is still a valid result — a trade-off to report honestly, not a failure to bury.

## Segment 5 (outro)

That comparison — task metric and general-capability delta, both against baseline — is exactly what goes into the write-up, and it's the only honest answer to whether this fine-tune was actually worth doing. Next up: the final lesson of the entire course, pulling these results together.
