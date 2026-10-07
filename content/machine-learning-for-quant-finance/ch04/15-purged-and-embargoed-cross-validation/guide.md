# Purged & Embargoed Cross-Validation

This is the single most important lesson in this course. `TimeSeriesSplit` (Lesson 14) guarantees that training data comes before test data in calendar time — necessary, but not sufficient. Financial labels are almost never tied to a single instant; a label is typically built from a *window* of future data, such as "the return over the next 5 days." That window means a training observation's label can reach forward in time far enough to overlap the test set, even though the observation's own timestamp sits safely before it. When that happens, the model is effectively trained on information from the test period, and your validation score is lying to you. This problem, and its fix, were formalized by Marcos López de Prado in *Advances in Financial Machine Learning* (Wiley, 2018) as **purging** and **embargoing**.

## What you'll learn

- Why overlapping label windows leak information even through a correctly time-ordered split
- The precise definitions of purging and embargoing, and why they are two separate fixes for two separate leaks
- That scikit-learn does **not** provide this out of the box — and a real, correct sketch of a custom `PurgedKFold`
- How to tell, in your own pipeline, whether you need this

## The leak that time order alone doesn't fix

Suppose a label is "the return from day *t* to day *t+5*" — so the observation at day *t* has a **label window** spanning `[t, t+5]`. Now suppose a walk-forward split puts days 90-100 in the test set. A training observation sitting at day 97 has a label window of `[97, 102]` — it reaches 2 days *into* the test set. Even though day 97 itself is "before" the test period starts (day 100), that observation's label was computed using information from days 100, 101, and 102 — days the model is about to be tested on. Training on it means training on test information, laundered through the label.

This is not a hypothetical edge case. Any label built from a forward-looking window — fixed-horizon returns, triple-barrier labels, volatility-scaled returns — has exactly this overlap problem near every train/test boundary.

## Purging: remove training samples whose label overlaps the test span

**Purging** means dropping, from the training set, every observation whose label window overlaps the test set's time span at all — not just observations inside the test set itself, but any training observation sitting just before it whose label reaches into it.

## Embargoing: remove a buffer immediately after the test set too

**Embargoing** is a separate, additional fix. Even for training observations positioned *right after* the test set — whose own label windows don't reach backward into the test span — leakage can still flow the other way: through serial correlation in returns and through features built from rolling windows (moving averages, rolling volatility, etc.), information from the test period can bleed forward into the samples that immediately follow it. The embargo removes a small buffer of training observations immediately after the test set to cut off that backward leak, even though no label-window overlap is involved.

The two fixes solve two different problems: purging removes training rows whose *labels reach into* the test window (overlap via the label, usually on the side *before* the test block); the embargo removes training rows that merely sit *right after* the test window (removed as a precaution against serial correlation and rolling-window features, not because of label overlap).

## A real sketch: `PurgedKFold`

Scikit-learn has no built-in class for this — `KFold` and `TimeSeriesSplit` know nothing about label windows. In practice you write a small custom splitter, typically by extending `sklearn.model_selection.KFold` and overriding `split()`. Here's a simplified version of the kind described in López de Prado's book:

```python
import numpy as np
from sklearn.model_selection import KFold

class PurgedKFold(KFold):
    """
    KFold extended for overlapping financial labels.

    label_end[i] = the index of the last bar used to compute sample i's
    label (its label window is [i, label_end[i]]). For a 5-day-forward
    return label, label_end[i] == i + 5.
    """
    def __init__(self, n_splits=5, label_end=None, embargo_frac=0.01):
        super().__init__(n_splits=n_splits, shuffle=False)
        self.label_end = label_end
        self.embargo_frac = embargo_frac

    def split(self, X, y=None, groups=None):
        n = len(X)
        embargo = int(n * self.embargo_frac)
        indices = np.arange(n)

        for test_start, test_stop in self._test_ranges(n):
            test_idx = indices[test_start:test_stop]

            before = indices[indices < test_start]
            after = indices[indices >= test_stop]

            # PURGE: keep only "before" rows whose label resolves
            # before the test set starts (no overlap into test span).
            before = before[self.label_end[before] < test_start]

            # EMBARGO: drop a further buffer of rows immediately after
            # the test set, regardless of their own label window.
            after = after[after >= test_stop + embargo]

            train_idx = np.concatenate([before, after])
            yield train_idx, test_idx

    def _test_ranges(self, n):
        fold_sizes = np.full(self.n_splits, n // self.n_splits)
        fold_sizes[: n % self.n_splits] += 1
        current = 0
        for size in fold_sizes:
            yield current, current + size
            current += size
```

Notice the two separate filters: the `before` branch is purging (filtered by `label_end`, i.e. by where each label actually resolves), and the `after` branch is embargoing (filtered by raw position only, with no reference to `label_end` at all, because the embargo isn't about label overlap — it's a flat-distance buffer).

## When you actually need this

If your labels are tied to a single, instantaneous event with no forward-looking window, `TimeSeriesSplit` alone is fine. The moment a label is built from *any* window extending beyond its own observation's timestamp — which describes most return-prediction labels in this course, including the triple-barrier labels from Lesson 3 — you need purging. Whether you also need an embargo depends on how much serial correlation and rolling-window feature engineering is in your pipeline; López de Prado's own experiments suggest even a small embargo (on the order of 1% of the dataset) meaningfully tightens the fix.

## Key terms

| Term | Meaning |
|---|---|
| Label window | The span of future data a label is computed from (e.g. `[t, t+5]` for a 5-day return) |
| Purging | Removing training observations whose label window overlaps the test set's time span |
| Embargo | Removing a further buffer of training observations immediately after the test set, as a precaution against serial correlation and rolling-window feature leakage |
| `PurgedKFold` | A custom cross-validator (not built into scikit-learn) implementing both purging and embargoing |
| Serial correlation | Correlation between a time series and its own past values — the mechanism the embargo guards against |

## Recap

Overlapping label windows mean that even a correctly time-ordered split can train on disguised test-period information; purging removes training rows whose labels reach into the test span, and embargoing separately removes a buffer right after the test set to block leakage through serial correlation and rolling features — and scikit-learn provides neither out of the box. Next, Lesson 16: Combinatorial Cross-Validation, which applies purging and embargoing not to one train/test split but to every possible combination of groups at once.
