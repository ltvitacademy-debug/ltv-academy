# Project Wrap-Up: Honest Results Reporting

This closing lesson is about the skill that matters most from this entire course: writing up what you actually found, accurately, in a way that neither oversells nor undersells a real result. It directly closes the loop back to Chapter 1's framing, using your own Chapter 6 project as the worked example.

## What you'll learn

- A concrete template for reporting a QML experiment's results honestly
- How to apply this course's own "fair comparison" checklist (Lesson 4) to your own project, including its weaknesses
- How to distinguish "what I measured" from "what I can conclude," using your Lesson 25 numbers as the example
- Why writing an honest negative or mixed result is a more valuable skill than writing an enthusiastic one

## A template for honest reporting

A trustworthy write-up of a QML experiment — yours or anyone else's — should include, explicitly:

1. **Exact setup**: dataset (and whether it's real or synthetic, per Lesson 23), feature count, qubit count, encoding choice, ansatz structure, number of training iterations and samples actually used.
2. **Exact classical baseline** used, and how it was chosen (per Lesson 25: was it genuinely strong, or a strawman?).
3. **Exact measured numbers**, not rounded-up or cherry-picked subsets of a larger run.
4. **What varied between runs** that could explain the result (random initialization, which samples were used for gradient updates, shot noise if applicable).
5. **An explicit statement of what does and doesn't generalize** from this specific result.

## Applying this to your own Chapter 6 project

**Setup**: real Iris data (Setosa vs. Versicolor), 2 features (petal length, petal width), 2 qubits, angle encoding with a fixed 0.3 scaling factor, a 1-layer RY+CNOT ansatz, and — honestly — only **one** gradient-descent step on **one** training sample (Lesson 24), evaluated on a 6-sample held-out set (Lesson 25).

**Classical baseline**: a single petal-length threshold rule at 2.5 cm — genuinely simple, not artificially weakened, and it happens to work extremely well on this particular pair of classes because they're close to linearly separable on that one feature.

**Exact measured numbers**: classical baseline 100% (6/6); quantum classifier 50% (3/6), with the specific, traced failure mode of predicting class 0 for every sample because training only ever saw one Setosa example.

**What varied and matters**: if training had instead started with a different random initialization for θ₁/θ₂, or used the Versicolor sample for the one gradient step instead of Setosa, the specific 50% number would likely change — meaning this exact number is not a stable, reproducible measurement of "the quantum classifier's accuracy," but a measurement of one specific, minimal, acknowledged-incomplete training run.

**What does and doesn't generalize**: this result says, accurately, "a quantum classifier trained on one sample for one step underperforms a trivial classical rule on this task" — which is close to self-evident and not a surprising or interesting finding about quantum computing. It does **not** say "quantum classifiers underperform classical ones on Iris-like tasks in general" (a properly multi-sample-trained version very plausibly closes most of the gap, as Lesson 25 noted) and it absolutely does not say anything about QML's practical advantage on real-world problems generally — that would require the kind of large-scale, independently-reproduced evidence Chapter 1 and Lesson 4 described as currently absent.

## Why an honest mixed/negative result is valuable

A report that says "our quantum model matched the classical baseline on a toy problem" is unremarkable and easy to overstate into something it isn't. A report that says "here's exactly what we tried, here's exactly what happened, here's exactly why, and here's exactly what would need to change before drawing a stronger conclusion" is a genuinely useful piece of work — it's reproducible, it's falsifiable, and it respects the reader's ability to check your reasoning. This is, concretely, the skill Chapter 1 asked you to value over "quantum computing will revolutionize ML": the ability to produce and report a result precisely enough that someone else could verify, extend, or correct it.

## Closing the loop back to Lesson 1

This course opened by calling QML "an open research question" and asked you to hold calibrated uncertainty rather than hype or dismissal. Your own Chapter 6 project is a small, honest instance of exactly that posture in practice: you built something real, you measured it against a fair baseline, you got a result that didn't flatter the quantum approach, and you reported why — precisely, specifically, and without either excusing it away or overgeneralizing it into a verdict on the whole field. That is the actual, transferable skill this course was built to teach.

## Key terms

| Term | Meaning |
|---|---|
| Honest results reporting | Documenting exact setup, baseline, measured numbers, sources of variation, and the explicit scope of what a result does and doesn't generalize to |
| Reproducibility | The property that another person, given your exact setup, could run the same experiment and get a consistent result |
| Calibrated uncertainty (revisited) | Holding a conclusion in proportion to the actual evidence measured, neither overselling nor dismissing a result |

## Check yourself

Write, in 3-4 sentences, an honest one-paragraph summary of this project's result that a skeptical reader — one who has read this entire course — would find both accurate and genuinely informative. Make sure it distinguishes what you measured from what you can conclude.
