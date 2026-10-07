# Evaluating Reasoning Improvements

This is lesson 59, the closing lesson of Chapter 9, RL for Reasoning. You've now seen how to train reasoning with RLVR (lesson 55), apply it to math and code (lesson 56), watch it get gamed (lesson 57), and boost it further at inference time (lesson 58). This lesson asks the question that should have been nagging at you throughout: how do you actually know a benchmark score increase means the model reasons better, rather than meaning the benchmark got gamed or the comparison was unfair?

## What you'll learn

- Benchmark contamination: why a high score can mean memorization, not reasoning
- Why test-time compute must be matched between systems before comparing them
- Process-level checks: auditing whether the reasoning trace actually drove the answer
- Held-out and fresh-problem evaluation as the strongest available signal

## Benchmark contamination

The most basic threat to any reported improvement: if a benchmark's problems (or close variants of them) leaked into training data — pretraining, SFT data, or even an RLVR verifier's problem set reused across checkpoints — a high score reflects memorization of that specific problem set, not a generalizable reasoning improvement. This isn't hypothetical; several widely-used math and code benchmarks have had documented contamination incidents across different model releases. The practical defense is evaluating on benchmarks released, or problem variants generated, *after* the training data's cutoff, and checking for near-duplicate matches between benchmark problems and training corpora.

## Matching test-time compute between comparisons

Lesson 58 showed that sampling more and searching harder improves scores on a fixed policy, with no training change at all. That means a reported "+12 points" from a new RL recipe is uninterpretable unless you know whether the baseline and the new model were evaluated with the same number of samples, the same search budget, and the same scorer.

```python
# A meaningless comparison: different compute budgets hidden inside the score
baseline_score = evaluate(baseline_model, benchmark, n_samples=1)
new_score = evaluate(new_model, benchmark, n_samples=32, use_prm_search=True)
# new_score being higher tells you almost nothing about new_model's training

# The fair comparison: hold inference-time compute fixed
baseline_score = evaluate(baseline_model, benchmark, n_samples=1)
new_score = evaluate(new_model, benchmark, n_samples=1)
```

Any paper or report claiming an RL-training improvement should state the inference budget for every number it reports, and ideally report pass@1 (single-sample accuracy) as the cleanest comparison of what actually changed in the policy itself, with any best-of-n or search numbers reported separately and labeled as such.

## Checking whether the trace actually drove the answer

A benchmark score, even an uncontaminated and compute-matched one, only checks the final answer — exactly the outcome-reward blind spot from lesson 54, and exactly the gap unfaithful chain-of-thought (lesson 57) can exploit. A deeper evaluation samples some fraction of correct traces and checks, by human review or a strong independent judge model, whether the stated reasoning is actually sound and actually necessary to reach the answer (e.g. by truncating or corrupting a step and checking whether the final answer changes as it should). This is more expensive than a benchmark score, which is exactly why it's done on a sample rather than the full test set — but it's the only check in this lesson that distinguishes "reasons correctly" from "lands on the right number."

## Held-out and fresh-problem evaluation

The strongest practical signal combines the previous three defenses: evaluate on genuinely fresh problems (written or sourced after training data collection, ideally from a different distribution than the training set, like a newly-released competition), hold the inference budget fixed and report pass@1, and spot-check a sample of traces for faithfulness. None of this is a perfect guarantee — a model could still have absorbed problem-solving *strategies* that transfer suspiciously well to a benchmark's specific style even without direct contamination — but it's a meaningfully stronger standard than a single leaderboard number, and it's the standard this course's earlier evaluation lessons (Chapter 6's reward model evaluation, lesson 40) were already building toward: never trust a single aggregate metric without checking what it can hide.

## Key terms

- **Benchmark contamination** — benchmark problems or close variants having leaked into training data, inflating scores without reflecting generalizable improvement
- **Compute-matched comparison** — evaluating two systems with the same inference-time sampling/search budget so a score difference reflects the policy, not extra test-time compute
- **pass@1** — accuracy from a single sample per problem, the cleanest measure of what changed in the trained policy itself
- **Trace faithfulness audit** — manually or automatically checking whether a correct trace's stated reasoning actually drove its final answer

## Recap

A real reasoning improvement survives three checks a raw benchmark score doesn't: no contamination, a compute-matched comparison reported at pass@1, and a faithfulness audit on a sample of traces. That closes Chapter 9, RL for Reasoning. Chapter 10, Agents & Multi-Step RL, begins next lesson by extending everything from single-turn reasoning to multi-step, tool-using agents — where the credit-assignment and reward-design problems from this chapter get even harder.
