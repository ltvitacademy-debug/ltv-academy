# Lesson 30 — Capstone: Wrap-Up & Portfolio Presentation

**Chapter 6 · Capstone · Lesson 30 of 30**

## What you'll learn

- A one-pass recap of the whole course, chapter by chapter
- How to structure this capstone as a portfolio piece
- What to disclose honestly — the same standard lesson 26 applied to model cards
- A few concrete next steps if you want to go further with this project
- Where this course leads next

## The course, in one pass

Six chapters, one throughline: understand what a model is actually doing,
then do it yourself.

- **Chapters 1–2** — what supervised learning is, what training/inference
  means, features and labels, overfitting, and the first real
  models: linear regression and classification.
- **Chapter 3** — working with real data: cleaning, encoding, missing
  values, and data leakage — the exact mistake this capstone's scaler step
  avoided in lesson 28.
- **Chapter 4** — what's inside a neural network: layers, activations,
  backpropagation, and why transformers changed the field.
- **Chapter 5** — using models other people already trained: the Hugging
  Face Hub, loading a model, fine-tuning versus using as-is, and reading a
  model card honestly instead of taking its numbers at face value.
- **Chapter 6** — this capstone: one real dataset, split and scaled
  correctly, a trained baseline, and an honest evaluation.

## Writing it up

A capstone only works as a portfolio piece if someone else can read it in
two minutes and trust what it says. A short README covers it:

```
# Breast Cancer Classification — Baseline Model

## Problem
Binary classification: malignant vs. benign, from 30
real tumor measurements.

## Data
scikit-learn's built-in Breast Cancer Wisconsin
(Diagnostic) dataset. 569 samples, 30 features.

## Method
80/20 stratified split, StandardScaler fit on train
only, LogisticRegression baseline (max_iter=5000).

## Results (test set, n=114)
Accuracy 0.982. Confusion matrix: 41/1/1/71.
Precision/recall ~0.98 for both classes.

## Limitations
One 80/20 split, not cross-validated. One model
family tried. A clean, well-studied research dataset,
not messy real-world data.
```

That's the same five pieces every real model card in chapter 5 had: what
the model does, what it was trained on, how it was built, how it performed
— with numbers, not adjectives — and what it doesn't prove.

## Disclose the same way lesson 26 taught you to read

Lesson 26 taught you to treat a model card's `model-index` results as
**self-reported** — a strong signal, not an independent audit. The same
standard applies to your own work:

- State the exact test set size (114 samples) next to every metric — a
  score without its sample size is close to meaningless.
- Say plainly that this is one train/test split, not cross-validated — a
  different `random_state` would move these numbers slightly.
- Name the dataset's real limitation: it's small, clean, and well-studied.
  A production screening model would need far more validation before
  anyone trusted it with real decisions.

A portfolio piece that admits its own limits reads as more credible, not
less — the same lesson chapter 5 drew from the Hub's own `self-reported`
tags.

## If you want to go further

None of this is required to call the capstone done, but each is a natural
next step: run `cross_val_score` instead of one split, to see how much the
numbers move; try a second model (`RandomForestClassifier` is a natural
comparison) and report both, the way lesson 26's checklist compared
options; or plot the two coefficients with the largest magnitude against
each other to see how cleanly they separate the classes.

## Recap — and what's next

This course started with the difference between supervised, unsupervised,
and reinforcement learning, and ends with you training, evaluating, and
honestly writing up a real classifier on a real dataset. That's genuine ML
literacy — not math-heavy theory, but a working understanding of what
happens under the hood before an API call, which is exactly what the next
course in this path builds on. **Generative AI & LLMs** picks up from here:
how large language models actually work, the current model landscape, and
working directly with LLM APIs. Congratulations on finishing AI/ML
Foundations.
