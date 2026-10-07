# Script — Capstone: Write-Up & Next Steps

## Segment 1 (title)

This is the last lesson of the course. The fine-tune is trained, evaluated against a baseline, and the results are in. This lesson is about turning that into a write-up someone else can actually learn from, and about where to point all of this once the capstone is finished.

## Segment 2 (steps)

A credible write-up covers five things in order: the problem statement, one sentence on the behavior you targeted; the model and data choices and why; the training configuration and what happened during the run, including whether you stopped early; the evaluation results, task metric and general-capability delta, both against the named baseline; and known limitations — what wasn't tested, what you'd be nervous about in production.

## Segment 3 (code)

In practice that's a small, honest results summary: the task, the base model, dataset size, the training method and its key settings, the task metric for base versus fine-tuned, and the general-capability delta — even when that delta isn't exactly zero. Leading with the win and burying the delta is the temptation to resist; both numbers together are what make the write-up credible.

## Segment 4 (steps)

For a real project beyond this capstone, the next moves are usually clear: more and better data, almost always the highest-leverage change ahead of hyperparameter tuning; a harder or broader eval set to stress-test the result you now have; and, if the use case warrants it, real serving with vLLM or TGI at a quantization level you've actually validated rather than assumed.

## Segment 5 (outro)

That's the end of Advanced LLM Training and ML Systems. Tokenization, pretraining, supervised fine-tuning and its failure modes, parallelism, evaluation, and serving awareness all converged on this one project, built end to end. The material stops here, but the discipline — justify decisions with evidence, evaluate honestly, know enough about what comes next to hand off well — carries forward into any real training or ML systems work ahead of you.
