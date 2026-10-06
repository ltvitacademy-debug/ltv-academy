# Lesson 3 — Features & Labels

**Chapter 1 · What Machine Learning Actually Is · Lesson 3 of 30**

## What you'll learn

- What a "feature" is, and what a "label" is, in plain terms
- How a dataset turns into the `X` and `y` a model actually trains on
- The different kinds of features you'll run into
- Why a label only exists in training data — never at inference time

## The vocabulary, from a plain table

Picture a spreadsheet of past customers, one row per customer. Every column except the last describes that customer in some way — their tenure, how many support calls they've made, which plan they're on. The last column records what actually happened: did they cancel or not. In ML terms:

- A **feature** is one input column — a piece of information about the example that the model is allowed to use to make its prediction.
- The **label** (also called the target) is the column holding the correct answer — the thing the model is trying to predict.

```
tenure_months | support_calls | plan     | churned   <- label
------------- | -------------- | -------- | -------
24            | 1              | standard | no
3             | 5              | basic    | yes
41            | 0              | premium  | no
```

Here `tenure_months`, `support_calls`, and `plan` are features. `churned` is the label. A row's full set of feature values is called a **feature vector** — it's literally the row, minus the label.

## From a table to `X` and `y`

In practice you split the table into two pieces before training: `X`, a 2-D table holding every row's feature columns, and `y`, a 1-D column holding every row's label.

```python
X = df[["tenure_months", "support_calls", "plan"]]
y = df["churned"]

model.fit(X, y)   # learns the mapping from features to label
```

This is the exact split you'll see in almost every ML codebase, library, and tutorial — `X` for "the inputs," `y` for "the answer." Keeping that convention in mind makes unfamiliar code much easier to read.

## Kinds of features

Not all features look the same, and the difference matters for later lessons:

- **Numeric, continuous** — can take any value in a range, like `monthly_spend` ($47.32, $112.80, ...).
- **Numeric, discrete** — whole-number counts, like `support_calls` (0, 1, 2, ...).
- **Categorical** — a fixed set of named options, like `plan` (basic/standard/premium). Most algorithms need these converted to numbers before training — Chapter 3 covers exactly how.

## The label only exists in training data

This is the detail that trips people up: the label is only available for the historical data you train on, because that's the data where you already know the outcome. The whole reason you're building a model is that, for a brand-new customer, you don't yet know if they'll churn — so at inference time you have the features (`X`) but not the label (`y`). The model's entire job is to fill in a plausible value for the label you don't have, using only the features you do have.

```
Training row:   tenure=3, calls=5, plan=basic, churned=yes   (label known)
Inference row:  tenure=3, calls=5, plan=basic, churned=?     (label unknown — predict it)
```

## Recap

A feature is an input column the model is allowed to use; a label is the answer column it's trying to predict. Splitting a dataset into `X` (features) and `y` (labels) is the near-universal first step of supervised learning. Features come in different flavors — numeric continuous, numeric discrete, categorical — and only training data has labels attached; inference data never does. Next, we'll look at what happens when a model learns the training data's quirks too well: overfitting and underfitting.
