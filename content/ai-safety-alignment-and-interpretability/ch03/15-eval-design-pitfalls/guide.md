# Eval Design Pitfalls

A well-designed evaluation can still produce a misleading answer, and a lot of published AI safety and capability research over the past two years has been about exactly how that happens. This lesson covers four documented, recurring failure modes in eval design — contamination, prompt sensitivity, saturation, and construct validity — so you can recognize when an evaluation's result shouldn't be trusted at face value.

## What you'll learn

- How contamination quietly inflates scores through memorization rather than capability
- Why small wording changes can flip an evaluation's result, and what that implies about robustness
- What saturation is and why it means an evaluation has stopped being useful
- What construct validity means, and why a high score doesn't always mean what it appears to mean

## Contamination

Contamination happens when test data — the exact questions, tasks, or their solutions — leaks into a model's training data, so a model can score well by recalling an answer it has effectively memorized rather than by exercising the capability the benchmark claims to measure. This is a well-documented problem across widely used benchmarks: models can score unrealistically well simply because evaluation content appeared somewhere in their training corpus, whether through direct inclusion, discussion of the benchmark online, or derivative content built from it. The practical defense is limiting how much of an evaluation's content is published in full, rotating or regenerating tasks over time, and treating a surprisingly high score with suspicion until contamination has been ruled out. There's no way to fully guarantee a benchmark stays uncontaminated once a model has broad internet-scale training data and the benchmark has existed publicly for any length of time — it's a continuous arms race, not a problem that gets solved once.

## Prompt sensitivity

An evaluation's result can flip substantially based on how a task is phrased, even when the underlying capability being tested hasn't changed at all. A model might fail a dangerous-capability task when asked directly, then succeed at the same underlying task under a slightly different framing, a different persona, or a reordering of the same information. This cuts both ways for safety conclusions: a safety evaluation that shows strong refusal behavior under one phrasing says little if a minor rephrasing defeats it, and a capability evaluation that shows low capability under one prompt may be badly underestimating the model if elicitation wasn't thorough. Prompt sensitivity is part of why the "full elicitation" requirement from the last lesson matters so much — a single prompt's score tells you much less than a result that holds up across a reasonable range of phrasings.

## Saturation

Saturation is what happens when an evaluation stops discriminating between models because every model worth testing now scores near the ceiling. A systematic review of widely used benchmarks found that roughly half showed high or very high saturation, with scores compressing near the top as frontier models converge — at that point, the benchmark is no longer telling you anything useful about relative capability or remaining risk, even though it may have been genuinely informative when it was newer and harder. Saturation isn't a sign the underlying problem is solved; it's often a sign the benchmark was too narrow, too predictable in its format, or too easy relative to how fast frontier capability is advancing. The practical implication is that any safety-relevant evaluation needs a plan for retirement and replacement, not an assumption that a fixed benchmark stays meaningful indefinitely.

## Construct validity

Construct validity is the question of whether an evaluation actually measures the real-world property it claims to measure, rather than some easier-to-score proxy that merely correlates with it. A benchmark can have a clean methodology, a large sample size, and reproducible scoring, and still have weak construct validity — for instance, if a "persuasion" evaluation really measures fluency and confidence of tone rather than genuine persuasive effect on real people, or if a "bio-uplift" evaluation measures recall of textbook facts rather than the synthesis and troubleshooting judgment that actually constitutes uplift. Recent methodological work on quantifying construct validity has shown that naive benchmark scores can be unreliable proxies for the underlying capability, shaped as much by measurement error and scale effects as by the ability itself. This is the deepest and hardest pitfall of the four, because it isn't fixed by more data or cleaner methodology alone — it requires going back to first principles and asking what the evaluation is actually supposed to be a stand-in for.

## How these interact

These four pitfalls compound. A benchmark with weak construct validity that's also contaminated gives you a confident, reproducible, and completely wrong signal. A prompt-sensitive evaluation that's also saturated might look stable at the ceiling while hiding huge variance just below it. Treating any single evaluation result as a settled fact, rather than one data point to be checked against these four failure modes, is the single most common mistake in reading eval results — in either direction, overclaiming danger or overclaiming safety.

## Key terms

| Term | Meaning |
|---|---|
| Contamination | Test data or solutions leaking into training data, inflating scores through memorization rather than genuine capability |
| Prompt sensitivity | An evaluation's result changing substantially based on wording or framing alone, without the underlying capability changing |
| Saturation | A state where an evaluation no longer discriminates between models because scores have compressed near the ceiling |
| Construct validity | Whether an evaluation actually measures the real-world property it claims to, rather than an easier-to-score proxy |
| Latent factor model | A statistical approach to extracting underlying capability from benchmark scores, which can conflate capability with model scale if not carefully designed |

## Recap

Contamination, prompt sensitivity, saturation, and weak construct validity are the four recurring ways an evaluation's result can mislead you even when nothing about its execution looks obviously broken. The next lesson, "Sandbagging & Evaluation Gaming," covers a fifth and more deliberate failure mode: a model or its developer actively trying to make an evaluation produce the wrong answer.
