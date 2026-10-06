# Lesson 27 — Capstone Kickoff

**Chapter 6 · Capstone · Lesson 27 of 30**

## What you'll learn

- What this capstone actually is, and why it's deliberately small
- The real dataset the project uses, and why it was chosen
- The five-step project plan the next three lessons follow
- The ground rules that keep the result honest
- How to get the environment ready before lesson 28

## Why a capstone, and why now

Chapters 1 through 5 built understanding one piece at a time: what supervised
learning is, how a model trains, how to handle real data, what a neural
network is doing underneath, and how to load and judge someone else's
pretrained model. This capstone doesn't introduce anything new. It's the
same handful of ideas — features and labels, a train/test split, a model
that fits the data, honest evaluation — run start to finish on one real
dataset, by you, in three lessons.

"Simple" is doing real work in this chapter's title. This project uses one
dataset, one baseline model, and shows every step. There's no hidden
preprocessing, no cherry-picked metric, and no claim bigger than what the
numbers actually support — the same standard lesson 26 applied to judging
someone else's model card applies here to judging your own project.

## The dataset: Breast Cancer Wisconsin (Diagnostic)

This capstone uses a real, well-known dataset that ships inside
scikit-learn itself, so there's nothing to download: the **Breast Cancer
Wisconsin (Diagnostic)** dataset. It's 569 tumor samples, each described by
30 numeric measurements taken from a digitized image of a fine needle
aspirate (things like radius, texture, and concavity), labeled by
pathologists as malignant or benign.

```
from sklearn.datasets import load_breast_cancer
data = load_breast_cancer(as_frame=True)
X, y = data.data, data.target
print(X.shape)            # (569, 30)
print(data.target_names)  # ['malignant' 'benign']
print(y.value_counts().to_dict())  # {1: 357, 0: 212}
```

It's a genuinely good capstone dataset: real measurements, a real binary
classification task, no missing values to clean up, and small enough to
train in seconds — so the lesson time goes to the ML decisions, not data
wrangling chapter 3 already covered.

## The project plan

| Step | Lesson | What happens |
|---|---|---|
| 1. Load & split | 27 (this one) | Load the data, understand the target |
| 2. Scale & train | 28 | Fit a `StandardScaler`, train a `LogisticRegression` baseline |
| 3. Predict | 28 | Run the trained model on data it has never seen |
| 4. Evaluate | 29 | Accuracy, confusion matrix, precision/recall — read honestly |
| 5. Present | 30 | Write it up the way you'd show it in a portfolio |

Every step maps back to a chapter you already finished: step 1 is features
and labels (lesson 3), step 2 is train/validation/test discipline (lesson
11) plus the regression-to-classification jump (lessons 6–7), step 4 is
evaluation metrics (lesson 5), and step 5 is model-card-style honesty
(lesson 26).

## Ground rules, before any code runs

- **No peeking.** The `StandardScaler` in lesson 28 is fit on the training
  split only, then applied to the test split — never the other way around.
  Fitting it on the full dataset before splitting is data leakage, the
  exact failure mode lesson 16 named.
- **No cherry-picking.** Lesson 29 reports accuracy, the full confusion
  matrix, and precision/recall for both classes — not just the one number
  that looks best.
- **One honest baseline.** The goal isn't the fanciest model; it's a
  correctly built, correctly evaluated one. `LogisticRegression` is chosen
  on purpose, the same way lesson 7 introduced classification: a simple,
  interpretable starting point, not a last resort.

## Getting set up

Everything this capstone needs is `pandas` and `scikit-learn`:

```
pip install scikit-learn pandas
```

If you already worked through lessons 22–26, you have both installed
already — the Hub lessons used the same base Python environment.

## Recap

This capstone is one real dataset — Breast Cancer Wisconsin (Diagnostic),
569 samples, 30 features, built into scikit-learn — run through a five-step
plan: load and split, scale and train, predict, evaluate honestly, and
present. Lesson 28 starts the real code: splitting the data and training
the first model.
