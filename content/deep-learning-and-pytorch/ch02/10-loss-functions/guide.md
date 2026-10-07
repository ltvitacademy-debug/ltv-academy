# Loss Functions

A loss function is the single number that training is trying to minimize — it measures how far a model's predictions are from the truth, and `.backward()` (Lesson 2) computes gradients with respect to exactly that number. Picking the right loss for your task is one of the most consequential modeling decisions you'll make, and it's almost entirely determined by what kind of prediction you're making. This lesson covers the two losses you'll reach for constantly.

## What you'll learn

- `nn.MSELoss`, for regression tasks with continuous targets
- `nn.CrossEntropyLoss`, for multi-class classification, and what shapes it expects
- Why `CrossEntropyLoss` takes raw logits, not probabilities
- The `reduction` argument and what `'mean'` vs. `'sum'` changes
- How to pick the right loss for a task

## Mean Squared Error, for regression

```python
import torch
import torch.nn as nn

criterion = nn.MSELoss()

predictions = torch.tensor([2.5, 0.1, 4.0])
targets = torch.tensor([3.0, 0.0, 3.5])

loss = criterion(predictions, targets)
# mean((2.5-3.0)^2 + (0.1-0.0)^2 + (4.0-3.5)^2) / 3
```

`nn.MSELoss` computes the mean of the squared difference between predictions and targets, elementwise. It's the standard choice whenever your target is a continuous number — price, temperature, the `w * x + b` regression from Chapter 1. Squaring the error penalizes large mistakes disproportionately more than small ones, which is usually what you want.

## Cross-Entropy, for classification

```python
criterion = nn.CrossEntropyLoss()

logits = torch.randn(8, 5)          # batch of 8, 5 classes -- raw scores
labels = torch.tensor([0, 2, 1, 4, 3, 0, 2, 1])  # integer class index per example

loss = criterion(logits, labels)
```

`nn.CrossEntropyLoss` is the standard loss for multi-class classification. It expects `logits` of shape `(batch_size, num_classes)` — raw, unnormalized scores, one per class — and `labels` of shape `(batch_size,)`, containing the *integer index* of the correct class for each example (not one-hot vectors).

## Why CrossEntropyLoss wants logits, not probabilities

This trips up almost everyone the first time: **do not** apply `nn.Softmax` to your model's output before passing it to `nn.CrossEntropyLoss`.

```python
# Wrong -- don't do this
probs = torch.softmax(logits, dim=1)
loss = criterion(probs, labels)   # mathematically incorrect

# Correct -- pass raw logits directly
loss = criterion(logits, labels)
```

`nn.CrossEntropyLoss` internally combines a log-softmax and a negative-log-likelihood loss in a single, numerically stable operation. Applying softmax yourself first and then handing it probabilities double-applies the transformation and produces incorrect gradients. Your model's final layer, for classification, should just be a plain `nn.Linear` producing raw logits — no activation on top.

## The reduction argument

```python
criterion_mean = nn.MSELoss(reduction="mean")  # default -- average over the batch
criterion_sum = nn.MSELoss(reduction="sum")    # total over the batch
criterion_none = nn.MSELoss(reduction="none")  # per-element loss, no reduction
```

`reduction="mean"` (the default for both losses) divides by the number of elements, so the loss's scale doesn't change when you change the batch size — this is almost always what you want, since it keeps your learning rate's effective behavior consistent across batch sizes. `reduction="sum"` adds everything up instead, and `reduction="none"` returns the per-element loss unreduced, useful when you want to weight or inspect individual losses before combining them yourself.

## Choosing the right loss

| Task | Target shape | Loss |
|---|---|---|
| Regression (continuous value) | Same shape as prediction | `nn.MSELoss` |
| Multi-class classification | Integer class index per example | `nn.CrossEntropyLoss` |
| Binary classification (single logit) | 0/1 float per example | `nn.BCEWithLogitsLoss` |

`nn.BCEWithLogitsLoss` is `CrossEntropyLoss`'s sibling for binary classification with a single output logit — like `CrossEntropyLoss`, it also expects raw logits, combining a sigmoid and binary cross-entropy into one numerically stable operation, for the exact same reason.

## Key terms

| Term | Meaning |
|---|---|
| Loss function | A scalar measuring how wrong predictions are, minimized during training |
| `nn.MSELoss` | Mean squared error, for regression tasks |
| `nn.CrossEntropyLoss` | Standard multi-class classification loss; expects raw logits and integer labels |
| Logits | Raw, unnormalized model outputs before any softmax/sigmoid is applied |
| `reduction` | Controls how per-element losses are combined: `'mean'`, `'sum'`, or `'none'` |

## Recap

`nn.MSELoss` handles regression, `nn.CrossEntropyLoss` handles multi-class classification, and both expect raw values from your model — never pre-apply softmax or sigmoid before `CrossEntropyLoss` or `BCEWithLogitsLoss`. The `reduction` argument controls how per-example losses combine into the single scalar `.backward()` needs. Next up, Lesson 11: optimizers, which use the gradients from that scalar to actually update your model's parameters.
