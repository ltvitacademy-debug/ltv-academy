# Eval Design Pitfalls

A well-intentioned evaluation can still produce a misleading number. The failure modes that undermine evaluations aren't usually about researchers being careless — they're structural problems that show up even when everyone involved is trying to do this correctly. Knowing the common ones is the only way to read a published eval result with the right amount of skepticism.

## What you'll learn

- What construct validity means for an evaluation, and how it fails
- Why a benchmark that's "solved" can stop being useful even though it looks informative
- How training-data contamination quietly inflates scores
- Why Goodhart's law applies to safety evals just as much as to any other optimization target

## Construct validity: measuring something else by accident

An evaluation has construct validity when it actually measures the thing it claims to measure. A benchmark meant to test "deceptive reasoning" might really just test "willingness to role-play a persona the prompt sets up," which is a related but different thing. This gap is easy to miss because the benchmark still produces a clean number that looks meaningful. The only real check is close examination of individual eval items: do the tasks actually require the capability or behavior being claimed, or do they admit an easier shortcut that gets full credit without it?

## Saturation: when a benchmark stops discriminating

A benchmark saturates when most models being tested score near the maximum, which means it can no longer tell a merely good model apart from a genuinely dangerous one. Saturation isn't a sign the underlying risk has gone away — it's a sign the measurement tool has worn out. This is why dangerous-capability eval suites need regular refresh with harder, previously unseen tasks; a suite that was appropriately difficult two model generations ago may now be measuring nothing useful at all.

## Contamination: the eval leaked into the training data

If eval questions, or close paraphrases of them, end up in a model's pretraining or fine-tuning data — through public benchmark repositories, academic papers, or even discussion forums — the model can score well by having memorized answers rather than by possessing the underlying capability. Contamination is especially dangerous for safety-relevant evals because it inflates confidence exactly where the stakes of being wrong are highest. Held-out, unpublished, and periodically rotated eval sets are the main defense, though no defense is perfect once an eval has existed publicly for long enough.

## Goodhart's law comes for safety evals too

Any measurable target that ends up influencing training, directly or indirectly, becomes something the model might end up optimized against — not because anyone is cheating, but because training processes reward whatever gets rewarded. If a safety eval's pass rate is tracked and models get iterated against it, a model can end up tuned to the specific surface features of that eval's prompts, rather than genuinely safer in the way the eval was meant to indicate. The eval score and the underlying property it was built to track can quietly drift apart.

## Key terms

- **Construct validity** — the degree to which an evaluation actually measures the capability or behavior it claims to measure, rather than something merely correlated with it
- **Saturation** — the point at which most tested models score near the maximum on a benchmark, so it can no longer meaningfully discriminate between them
- **Contamination** — when eval questions or close paraphrases leak into a model's training data, inflating scores through memorization rather than genuine capability
- **Goodhart's law** — the observation that once a measure becomes a target, it stops being a reliable measure, because optimization pressure finds ways to satisfy the measure without satisfying the underlying goal
- **Held-out eval set** — a set of test items kept unpublished and rotated periodically specifically to resist contamination
