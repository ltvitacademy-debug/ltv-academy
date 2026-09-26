# Resampling: SMOTE & Undersampling

If a model sees only a handful of positives, it has little to learn from. **Resampling** rebalances the *training* data so the rare class gets more attention. You can throw away majority rows (undersampling), copy minority rows (random oversampling), or invent new minority rows (SMOTE). Resampling is easy to do and just as easy to do wrongly, so most of this lesson is about doing it safely inside cross-validation.

This lesson uses the `imbalanced-learn` package (imported as `imblearn`), installed with `pip install imbalanced-learn`. The numbers below come from imbalanced-learn 0.10.1 with scikit-learn 1.1.2 and the illustrative 5,000-row, 5%-positive dataset from the last lesson.

## What you'll learn

- What undersampling, random oversampling, and SMOTE each do
- Why resampling before cross-validation leaks information
- How to use `imblearn.pipeline.Pipeline` so resampling happens only on training folds
- How to compare strategies honestly on a test set

## 1. What each method does

```python
from collections import Counter
from imblearn.over_sampling import SMOTE
from imblearn.under_sampling import RandomUnderSampler

print("train", Counter(y_tr))
for name, s in [("SMOTE", SMOTE(random_state=42)),
                ("Undersample", RandomUnderSampler(random_state=42))]:
    Xr, yr = s.fit_resample(X_tr, y_tr)
    print(name, Counter(yr), Xr.shape)
```

Output:

```
train Counter({0: 3553, 1: 197})
SMOTE Counter({0: 3553, 1: 3553}) (7106, 8)
Undersample Counter({0: 197, 1: 197}) (394, 8)
```

- **RandomUnderSampler** keeps all 197 positives and randomly drops negatives until 197 remain. Fast, but it discards 3,356 rows of information.
- **RandomOverSampler** duplicates positive rows at random. No information is lost, but the model can memorize exact copies.
- **SMOTE** (Synthetic Minority Over-sampling Technique) creates *new* positives. For a minority row it picks one of its nearest minority neighbours (by default `k_neighbors=5`) and adds a point at a random spot on the line between them.

Every sampler exposes `fit_resample(X, y)`, and `sampling_strategy` sets the target ratio; for example `SMOTE(sampling_strategy=0.5)` grows the minority to half the size of the majority.

## 2. The leakage trap

The tempting workflow is: resample the whole training set, then cross-validate. Here is that (wrong) approach next to the correct one, using a random forest.

```python
from sklearn.model_selection import cross_validate, StratifiedKFold
from sklearn.ensemble import RandomForestClassifier
from imblearn.pipeline import Pipeline

cv = StratifiedKFold(5, shuffle=True, random_state=42)
scoring = ["recall", "precision", "average_precision"]
forest = lambda: RandomForestClassifier(n_estimators=100,
                                        random_state=42)

# WRONG: resample first, then cross-validate
Xs, ys = SMOTE(random_state=42).fit_resample(X_tr, y_tr)
wrong = cross_validate(forest(), Xs, ys, cv=cv, scoring=scoring)

# RIGHT: resample inside each training fold
pipe = Pipeline([("smote", SMOTE(random_state=42)),
                 ("model", forest())])
right = cross_validate(pipe, X_tr, y_tr, cv=cv, scoring=scoring)
```

Mean scores across the five folds:

```
WRONG: SMOTE then CV      recall 0.983  precision 0.995  avg precision 0.999
RIGHT: SMOTE in pipeline  recall 0.888  precision 0.913  avg precision 0.927
no resampling             recall 0.756  precision 1.000  avg precision 0.930
```

The wrong version looks nearly perfect. Why? Synthetic points are built from real ones, so after resampling first, a validation fold contains near-copies of rows the model trained on. The folds are also artificially balanced, and they are scored on invented rows. None of that will exist in production. The right version resamples **only the training part of each fold** and validates on real, untouched, still-imbalanced rows.

An `imblearn.pipeline.Pipeline` is needed because scikit-learn's own `Pipeline` does not allow a step that changes the number of rows. In imblearn's pipeline the sampler acts during `fit` only; `predict` skips it. That also means **you never resample the test set**.

## 3. Compare strategies honestly

Loop over strategies, each inside a pipeline, cross-validate on the training data, then score once on the held-out test set:

```python
from sklearn.metrics import (recall_score, precision_score,
                             average_precision_score)
from imblearn.over_sampling import RandomOverSampler

samplers = {
    "none": None,
    "undersample": RandomUnderSampler(random_state=42),
    "oversample": RandomOverSampler(random_state=42),
    "smote": SMOTE(random_state=42),
    "smote 0.5": SMOTE(sampling_strategy=0.5, random_state=42),
}
for name, s in samplers.items():
    steps = ([] if s is None else [("resample", s)]) \
            + [("model", forest())]
    pipe = Pipeline(steps).fit(X_tr, y_tr)
    pred = pipe.predict(X_te)
    # ... also cross_validate(pipe, X_tr, y_tr, ...) for CV columns
```

Results (CV recall on training data; test-set numbers in the other columns):

```
             cv_recall  test_recall  test_precision  test_avg_prec
none             0.756        0.697           1.000          0.884
undersample      0.919        0.848           0.683          0.863
oversample       0.787        0.697           0.979          0.890
smote            0.888        0.803           0.930          0.885
smote 0.5        0.827        0.758           0.926          0.888
```

Undersampling buys the most recall (0.848) but halves precision to 0.683. SMOTE gives a smaller recall gain (0.803) at a much smaller precision cost. Plain oversampling barely changes anything for a forest. Notice the last column: **average precision is essentially unchanged**. Resampling mostly slides the model along its precision-recall curve rather than making it a better ranker, which is the same effect you get from lowering the decision threshold. Pick the point that matches your costs.

```python
import matplotlib.pyplot as plt
fig, ax = plt.subplots(figsize=(8, 3.8))
out[["test_recall", "test_precision"]].plot.bar(ax=ax, rot=0)
ax.set_title("Held-out test set: random forest, 5 strategies")
ax.set_ylim(0, 1.25)
ax.legend(loc="upper right", ncol=2)
plt.tight_layout()
plt.show()
```

Here `out` is a DataFrame holding the table above, indexed by strategy.

## Practical cautions

- SMOTE interpolates between numeric neighbours, so it needs numeric features. Encode categoricals first; imbalanced-learn also offers `SMOTENC` for mixed data. Scale features before SMOTE if they differ wildly, because it uses distances.
- SMOTE can create points in overlapping or noisy regions and blur the class boundary.
- These results come from one seeded dataset. Repeat on your own data; sometimes class weights (next lesson) or a threshold change work as well with less machinery.

## Recap

- Undersampling drops majority rows, oversampling duplicates minority rows, SMOTE synthesizes new ones.
- Resample **inside** cross-validation using `imblearn.pipeline.Pipeline`; resampling first leaked and inflated recall from 0.888 to 0.983.
- Never resample validation or test data.
- Resampling trades precision for recall; judge it with the metrics and costs from lesson 17.
