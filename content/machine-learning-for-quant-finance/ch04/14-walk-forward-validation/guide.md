# Walk-Forward Validation

Welcome to Chapter 4, Validation Done Right — the chapter this whole course treats as non-negotiable. Everything you've built so far, from regularized regressions to HRP portfolios, is worthless if you can't honestly measure how it would have performed on data it never saw. In finance, "honestly" is a much higher bar than it sounds, because the most common validation method taught in general ML courses — ordinary k-fold cross-validation — quietly leaks the future into the past. This lesson lays the foundation: training strictly before testing, in time order, every single time.

## What you'll learn

- Why ordinary `KFold` cross-validation leaks future information into training, even without shuffling
- How `sklearn.model_selection.TimeSeriesSplit` enforces time order, and exactly what it does and doesn't guarantee
- The difference between an expanding window and a rolling window
- Why "walk-forward" is a necessary first step, but — as the next lesson shows — not sufficient on its own for financial labels

## Why plain KFold leaks the future

`KFold` cross-validation splits your dataset into `k` equal folds and, in each round, holds one fold out as the test set while training on the rest. The problem is symmetry: every fold gets a turn as the test set, which means for every fold except the very first, the training set contains observations from *after* the test period in time. That's true whether or not `shuffle=True` — shuffling makes it worse by also destroying any remaining temporal structure, but the leak exists even with `shuffle=False`, purely because of the fold rotation itself.

```python
from sklearn.model_selection import KFold

kf = KFold(n_splits=5, shuffle=False)
for train_idx, test_idx in kf.split(X):
    # BAD for time series: for most folds, train_idx contains rows
    # from AFTER test_idx in calendar time.
    ...
```

A model trained partly on the future and tested on the past will look better than it has any right to — it has effectively seen a preview of what happens next.

## `TimeSeriesSplit`: enforcing order

`sklearn.model_selection.TimeSeriesSplit` fixes the ordering problem directly. Given data sorted by time, it produces successive train/test splits where every test fold comes strictly after its corresponding training fold — never before, never overlapping.

```python
from sklearn.model_selection import TimeSeriesSplit

tscv = TimeSeriesSplit(n_splits=5)
for train_idx, test_idx in tscv.split(X):
    # train_idx is always entirely before test_idx in time
    X_train, X_test = X.iloc[train_idx], X.iloc[test_idx]
    y_train, y_test = y.iloc[train_idx], y.iloc[test_idx]
```

By default, `TimeSeriesSplit` uses an **expanding window**: the training set for split 2 is a superset of the training set for split 1, plus the data that was split 1's test fold. Each subsequent test fold is the next contiguous chunk of time immediately following the (growing) training set. You can instead get a **rolling window** of fixed size by passing `max_train_size`, which caps how much history each training set keeps, dropping the oldest data as the window moves forward instead of accumulating it. `TimeSeriesSplit` also accepts a `gap` parameter, which inserts a buffer of excluded samples between the end of training and the start of test — a feature that becomes directly relevant in the next lesson.

## Expanding vs. rolling: which to use

An expanding window uses all available history, which is attractive when you want the model to benefit from as much data as possible and you don't expect the underlying relationship to drift much. A rolling window deliberately forgets old data, which is preferable when you suspect the market relationship you're modeling is non-stationary (Lesson 1) and that stale data could actively hurt the model rather than just adding noise. Neither is universally "correct" — it's a modeling decision tied to how much you trust old data to still be relevant.

## Why this alone isn't the end of the story

`TimeSeriesSplit` guarantees that train comes before test in calendar time. That sounds like it should be enough to prevent leakage — and for data where each row's label depends only on information available exactly at that row's timestamp, it is. But financial labels are rarely built that way: a label is often "the return over the *next* 5 days," which means a single training observation's label depends on information up to 5 days *after* its own timestamp. The next lesson, Purged & Embargoed Cross-Validation, shows exactly how that overlap reopens a leak that `TimeSeriesSplit` alone cannot close.

## Key terms

| Term | Meaning |
|---|---|
| `KFold` | Standard cross-validation; leaks future-into-past on time series because every fold takes a turn as test |
| `TimeSeriesSplit` | sklearn's time-ordered cross-validator; guarantees train always precedes test in time |
| Expanding window | Training set grows over successive splits, keeping all prior history |
| Rolling window | Training set has a fixed size (`max_train_size`), dropping old data as it moves forward |
| `gap` | A `TimeSeriesSplit` parameter inserting a buffer between train and test |

## Recap

Ordinary k-fold cross-validation leaks the future into training simply because every fold takes a turn as the test set; `TimeSeriesSplit` fixes that by guaranteeing train always comes before test, in either an expanding or rolling window. But time order alone isn't enough once labels are built from overlapping future windows — which is exactly the problem Lesson 15, Purged & Embargoed Cross-Validation, tackles next.
