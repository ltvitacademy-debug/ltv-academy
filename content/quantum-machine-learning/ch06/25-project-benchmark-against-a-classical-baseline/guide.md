# Project: Benchmark Against a Classical Baseline

This is the lesson that makes the whole project honest. Lesson 24 showed the quantum classifier's training mechanism works. This lesson actually measures it against a classical baseline on held-out real data — and reports exactly what happens, including a result that is not flattering to the quantum side.

## What you'll learn

- How to build a trivial but genuinely strong classical baseline for this specific task
- How to evaluate both models on the same held-out real data points, with real computed accuracy numbers
- Why the quantum classifier's measured result here is a demonstration of undertraining, not a verdict on QML generally
- How to report a benchmark result honestly, including a result that doesn't favor your own model

## The classical baseline: deliberately simple, and genuinely strong

For Setosa vs. Versicolor on petal measurements, a single threshold rule on petal length already works extremely well in the real Iris dataset, because these two classes are close to linearly separable on that one feature alone: **predict Versicolor if petal length ≥ 2.5 cm, else Setosa**. This is about as simple as a classical "model" can get — it's not a tuned neural network or an optimized SVM, just a threshold a human could write by hand — and that's precisely the point: per Lesson 4's "fair comparison" standard, if a quantum model can't beat even this trivial baseline, that's a meaningful, honest result, not an unfair fight rigged against the quantum side.

## Held-out evaluation set

Six real Iris measurements (three Setosa, three Versicolor), not used in Lesson 24's training step:

| Sample | Petal length (cm) | Petal width (cm) | True label |
|---|---|---|---|
| Setosa A | 1.4 | 0.2 | 0 |
| Setosa B | 1.3 | 0.2 | 0 |
| Setosa C | 1.5 | 0.2 | 0 |
| Versicolor A | 4.7 | 1.4 | 1 |
| Versicolor B | 4.5 | 1.5 | 1 |
| Versicolor C | 4.9 | 1.5 | 1 |

## Classical baseline results

Applying the 2.5 cm threshold rule to all six samples: every Setosa sample has petal length well under 2.5 cm (correctly predicted 0), and every Versicolor sample has petal length well over 2.5 cm (correctly predicted 1). **Classical baseline accuracy: 6/6 = 100%.**

## Quantum classifier results, using Lesson 24's single-step-trained parameters

Running the same circuit from Lesson 24 (θ₁ ≈ 1.3073, from the one gradient step taken on the Setosa sample; θ₂ = 0.5, never updated) on all six held-out samples, computed exactly via circuit simulation:

| Sample | ⟨Z⟩ | p | Predicted | Correct? |
|---|---|---|---|---|
| Setosa A | −0.1559 | 0.4220 | 0 | ✓ |
| Setosa B | −0.1262 | 0.4369 | 0 | ✓ |
| Setosa C | −0.1855 | 0.4073 | 0 | ✓ |
| Versicolor A | −0.9114 | 0.0443 | 0 | ✗ |
| Versicolor B | −0.8850 | 0.0575 | 0 | ✗ |
| Versicolor C | −0.9344 | 0.0328 | 0 | ✗ |

**Quantum classifier accuracy: 3/6 = 50%.**

## Reporting this honestly

The classical threshold rule (100%) beats the single-step-trained quantum classifier (50%) on this held-out set, decisively. The honest explanation is specific, not vague: Lesson 24's one gradient step was computed using **only the Setosa sample**, so it only ever got pushed in the direction that helps classify Setosa correctly — it had no opportunity to also learn to separate Versicolor, and in fact ended up predicting class 0 for everything, which happens to look fine on Setosa (where 0 is correct) and uniformly wrong on Versicolor (where 1 is correct). This is a real, measured case of a model that hasn't actually been trained on the full dataset, not a statement about quantum circuits being incapable of solving this task in principle. A genuine multi-sample, multi-iteration training run — updating both θ₁ and θ₂ using gradients averaged or iterated across *all* training samples, as flagged at the end of Lesson 24 — would very plausibly close most or all of this gap, since Setosa vs. Versicolor is an easy, near-linearly-separable problem for almost any reasonable classifier, quantum or classical.

## What this benchmark does and doesn't establish

It establishes, with real, computed numbers, exactly how a specific undertrained quantum model performs against a specific trivial classical baseline, on a specific small held-out set — nothing more and nothing less. It does **not** establish that a fully-trained QML model would underperform a classical model on this or any other task, and it does not establish that QML models generally underperform — single small experiments like this one don't license either generalization. What it does demonstrate, honestly, is exactly why Chapter 1's "no proven practical advantage yet" framing exists: building a working quantum pipeline (Lessons 23-24) and having it actually win a fair benchmark against a simple classical baseline are two different, separate achievements, and this project reached only the first one.

## Key terms

| Term | Meaning |
|---|---|
| Held-out evaluation set | Data not used during training, used to measure how well a model actually generalizes |
| Trivial classical baseline | A deliberately simple, un-tuned classical rule used as a strong, fair comparison point |
| Undertraining | A model that hasn't received enough training (iterations, data coverage) to reach its achievable performance |

## Check yourself

The quantum classifier predicted class 0 for every single held-out sample, Setosa and Versicolor alike. Explain specifically why that happened, tracing it back to which sample's gradient was used in Lesson 24's single training step — and what you would need to do differently to prevent this exact failure mode in a real training run.
