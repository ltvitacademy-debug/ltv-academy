# Missing Data in Pipelines

Real datasets have gaps: a customer skipped a form field, a sensor dropped out, a join found no match. Most scikit-learn models raise an error the moment they see a `NaN`. The question is not just how to fill the gap but where in your workflow to do it. Done inside a pipeline, imputation is repeatable and leak-free.

## What you'll learn

- How to measure and reason about missingness
- How to impute inside a `ColumnTransformer` pipeline
- Why `add_indicator=True` can be worth a lot
- How to compare imputation strategies fairly with cross-validation

## Look before you fill

We build 1,500 illustrative customers with gaps in three columns. One gap is deliberately informative: `monthly_charge` goes missing far more often for customers who churn.

```python
import numpy as np
import pandas as pd

rng = np.random.default_rng(42)
n = 1500
tenure = rng.integers(1, 72, n).astype(float)
monthly = rng.normal(70, 20, n).round(2)
plan = rng.choice(["basic", "plus", "pro"], n, p=[0.5, 0.3, 0.2])
logit = (-1.0 - 0.04 * (tenure - 30) + 0.03 * (monthly - 70)
         + 0.5 * (plan == "basic"))
churn = (rng.random(n) < 1 / (1 + np.exp(-logit))).astype(int)
df = pd.DataFrame({"tenure": tenure, "monthly_charge": monthly,
                   "plan": plan, "churn": churn})
miss_m = rng.random(n) < np.where(churn == 1, 0.35, 0.10)
df.loc[miss_m, "monthly_charge"] = np.nan
df.loc[rng.random(n) < 0.08, "tenure"] = np.nan
df.loc[rng.random(n) < 0.05, "plan"] = np.nan

print(df.isna().mean().round(3))
print(df.groupby(df.monthly_charge.isna()).churn.mean().round(3))
```

Output:

```
tenure            0.077
monthly_charge    0.179
plan              0.052
churn             0.000

monthly_charge
False    0.254
True     0.571
```

About 18% of monthly charges are missing, and those customers churn at 57% versus 25% for everyone else. The fact that a value is missing carries signal. Dropping every row with a gap would also discard 423 of the 1,500 customers.

## Impute inside the pipeline

`SimpleImputer` fills gaps with the median, mean, most frequent value, or a constant. The key rule is the same as for scaling: learn the fill values from **training data only**. If you impute the whole dataset first, the fill values come partly from rows the model will later be tested on, which is a mild form of leakage. Placing the imputer inside a `Pipeline` means each cross-validation fold learns its own medians from its own training rows.

```python
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer, KNNImputer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import cross_val_score

X, y = df.drop(columns="churn"), df["churn"]
num, cat = ["tenure", "monthly_charge"], ["plan"]

def make(num_imp):
    pre = ColumnTransformer([
        ("num", Pipeline([("imp", num_imp),
                          ("sc", StandardScaler())]), num),
        ("cat", Pipeline([
            ("imp", SimpleImputer(strategy="most_frequent")),
            ("oh", OneHotEncoder(handle_unknown="ignore"))]), cat),
    ])
    return Pipeline([("pre", pre),
                     ("model", LogisticRegression(max_iter=1000))])
```

Numeric columns get a numeric imputer then scaling; the categorical column gets its most frequent value, then one-hot encoding.

## Compare strategies fairly

```python
cands = {
    "median": make(SimpleImputer(strategy="median")),
    "median + indicator": make(
        SimpleImputer(strategy="median", add_indicator=True)),
    "KNN imputer": make(KNNImputer(n_neighbors=5)),
}
means, stds = {}, {}
for name, p in cands.items():
    s = cross_val_score(p, X, y, cv=5, scoring="roc_auc")
    means[name], stds[name] = s.mean(), s.std()
    print(f"{name:20s} {s.mean():.3f} +/- {s.std():.3f}")
```

Output:

```
median               0.760 +/- 0.027
median + indicator   0.798 +/- 0.019
KNN imputer          0.760 +/- 0.025
```

Filling with a median or with nearest neighbors performs the same. Adding **missing-value indicator columns** lifts AUC from 0.760 to 0.798, because the model can now see the "was missing" flag that carried the churn signal. `add_indicator=True` appends one 0/1 column per feature that had missing values in training. Fitted, the pipeline's features include `num__missingindicator_tenure` and `num__missingindicator_monthly_charge`.

Plot the three scores with their spread:

```python
import matplotlib.pyplot as plt
fig, ax = plt.subplots(figsize=(6.5, 3.2))
ax.barh(list(means), list(means.values()),
        xerr=list(stds.values()), color="#8E1C1C")
ax.set_xlim(0.6, 0.85)
ax.set_xlabel("5-fold ROC AUC")
ax.set_title("Imputation strategy comparison (illustrative)")
plt.tight_layout()
plt.show()
```

## Two more options

- **Dropping rows** looks tempting, but the score is not comparable: our version scored 0.796 on only 1,077 surviving rows, a different and easier test set, and it would throw away every future row with a gap.
- **Native support:** `HistGradientBoostingClassifier` accepts `NaN` directly, learning a best direction for missing values at each split. It scored 0.761 on the same data (with `plan` mapped to numbers first). Some tree-based models let you skip imputation entirely.

`IterativeImputer` (model-based imputation) also exists but is experimental; it requires `from sklearn.experimental import enable_iterative_imputer` first.

## Recap

- Measure missingness first; ask whether "missing" itself means something.
- Impute inside a pipeline so every fold learns its fill values from training rows only.
- Try `add_indicator=True`; it can recover signal that plain filling hides.
- Compare strategies with the same cross-validation, and do not compare scores across different row sets.
