# Lesson 15 — Categorical Encoding

**Chapter 3 · Working With Data for ML · Lesson 15 of 30**

## What you'll learn

- Why most ML algorithms can't use a text category directly
- One-hot encoding, and the trap it sets if you're not careful
- Ordinal encoding, and when it's actually the right (or wrong) choice
- How to decide which encoding fits a given categorical column

## Why categories need converting at all

Lesson 3 introduced categorical features like `plan` (basic/standard/premium). The problem: nearly every ML algorithm's internals — the weighted sums in linear regression and neural networks, the distance calculations in nearest-neighbor methods — are built entirely on numbers. A column full of the strings `"basic"`, `"standard"`, `"premium"` has no numeric meaning a model can use directly. Encoding is the step that turns category labels into numbers, and *which* encoding you choose has real consequences.

## One-hot encoding: one column per category

The most common approach creates a new binary (0/1) column for every possible category, with exactly one of them set to 1 per row:

```
plan       ->   plan_basic | plan_standard | plan_premium
basic      ->   1          | 0             | 0
standard   ->   0          | 1             | 0
premium    ->   0          | 0             | 1
```

```python
import pandas as pd
pd.get_dummies(df["plan"], prefix="plan")
```

This avoids implying any order or numeric relationship between categories — `"standard"` isn't mathematically "more" than `"basic"` just because you encoded it that way, which matters a lot, since a model like linear regression would otherwise treat a plain numeric encoding (basic=0, standard=1, premium=2) as meaning premium is literally "three times" basic.

**The trap:** fit the encoder on the full dataset (or separately on train and test) and you can end up with a different number of columns in each — or a category in test that the encoder never saw during training. Fit the encoder on the training set only, then use that exact same fitted encoder to transform the test set, the same pattern from Lessons 12 and 14.

## Ordinal encoding: when order is real

Some categories genuinely have an order: `low < medium < high`, or `freshman < sophomore < junior < senior`. For those, a single numeric column that preserves the order is often more useful than one-hot encoding, because it doesn't throw away the real ordering information:

```python
from sklearn.preprocessing import OrdinalEncoder
order = [["low", "medium", "high"]]
OrdinalEncoder(categories=order).fit_transform(df[["risk_level"]])
# low -> 0, medium -> 1, high -> 2
```

Using ordinal encoding on a column with **no** real order — like `plan` or `region` — is the opposite mistake: it invents a false numeric relationship (implying `region=2` is somehow "between" `region=1` and `region=3`) that doesn't exist in reality, and a model may learn spurious patterns from it.

## Choosing between them

- **Order exists and matters** (risk level, education tier, satisfaction rating) → ordinal encoding.
- **No real order** (plan, region, color, product category) → one-hot encoding.
- **Very high cardinality** (thousands of distinct values, like zip code or user ID) → one-hot encoding explodes into thousands of columns; other techniques exist for this (like target encoding), which fall outside this course's scope but are worth knowing exist.

## Recap

Most ML algorithms need numbers, not category labels, so categorical columns must be encoded before training. One-hot encoding creates one binary column per category and avoids implying a false order; ordinal encoding compresses categories into a single numeric column and is appropriate only when a real order exists. Whichever you use, fit the encoder on the training data only. Next, we close out this chapter — and this course's first 16 lessons — with the problem that connects back to nearly every "fit on train only" rule you've seen so far: data leakage.
