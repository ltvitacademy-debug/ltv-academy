# Estimators, Transformers & Predictors

Lesson 1 showed the `fit` / `predict` / `score` pattern on a model. But `fit` is not only for models. Scalers, imputers, and encoders also learn from data, and they follow the same interface. scikit-learn organizes everything into three roles: **estimators**, **transformers**, and **predictors**. Once you see the roles, the rest of the library, including pipelines in a couple of lessons, stops feeling like a pile of unrelated classes.

## What you'll learn

- The three roles and the methods each one offers
- How to fit a transformer on training data and apply it to any data
- Why "fit on train, transform both" is the rule that prevents leakage
- How `get_params`, `set_params`, and `clone` let you treat objects as configurable building blocks

## Three roles, one base idea

- An **estimator** is any object that learns something from data by calling `fit`. Everything below is an estimator.
- A **transformer** is an estimator that also has `transform`: it takes a table and returns a changed table. Examples: `StandardScaler`, `SimpleImputer`, `OneHotEncoder`.
- A **predictor** is an estimator that also has `predict` (and usually `score`): it turns features into answers. Examples: `LogisticRegression`, `RandomForestClassifier`.

A transformer learns properties of the data (a median, a mean and spread, a list of categories) and applies them. A predictor learns a mapping from features to a target. Transformers do not need `y`; predictors do.

## A transformer in action: imputing

We use four numeric columns of the illustrative customer table from Lesson 1 (`from customers import make_customers`). `age` and `monthly_spend` contain missing values.

```python
from customers import make_customers
from sklearn.model_selection import train_test_split
from sklearn.impute import SimpleImputer

df = make_customers()
cols = ["age", "tenure_months", "monthly_spend", "support_calls"]
X, y = df[cols], df["churned"]
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.25, stratify=y, random_state=0)

imp = SimpleImputer(strategy="median")
imp.fit(X_train)
print(imp.statistics_)
X_train_i = imp.transform(X_train)
print(X_train_i.shape, X_train_i.dtype)
```

Output:

```
[44.   36.   76.26  1.  ]
(750, 4) float64
```

`fit` learned one median per column and stored them in `statistics_` (note the trailing underscore). `transform` used them to fill the gaps. In scikit-learn 1.1 the result is a plain NumPy array, so the column names are gone; keep track of the order yourself, or wait until `ColumnTransformer` in the next lesson.

## Chain transformers, then a predictor

A scaler is another transformer. Here we impute, scale, and train a model by hand, calling each step ourselves:

```python
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression

scaler = StandardScaler()
X_train_s = scaler.fit_transform(X_train_i)
X_test_s = scaler.transform(imp.transform(X_test))

clf = LogisticRegression().fit(X_train_s, y_train)
print(round(clf.score(X_test_s, y_test), 3))
```

```
0.772
```

`fit_transform` is a convenience that fits and transforms in one call. Notice the asymmetry, which is the most important habit in this lesson:

- **Training data:** `fit` (or `fit_transform`), because the transformer must learn its numbers from it.
- **Test data (and any future data):** `transform` only, reusing what was learned from training.

If you fitted the scaler on the test set, the test rows would influence their own preprocessing. That is the train-test contamination form of data leakage from Machine Learning Fundamentals. You can see the effect of doing it right:

```python
print(X_train_s.mean(axis=0).round(2))
print(X_test_s.mean(axis=0).round(2))
```

```
[ 0. -0.  0. -0.]
[ 0.12  0.02 -0.05  0.02]
```

Training columns average exactly zero because the scaler was fitted on them. Test columns do not, and they should not: the test set is a stand-in for future data, which will never be perfectly centered on the training mean. Forcing it to be would hide the very variation you want to measure.

## Objects are configurable building blocks

Every estimator can describe and modify its own settings:

```python
from sklearn.base import clone

print(LogisticRegression().get_params()["C"])
clf.set_params(C=0.1)
fresh = clone(clf)
print(fresh.C, hasattr(fresh, "coef_"), hasattr(clf, "coef_"))
```

```
1.0
0.1 False True
```

- `get_params()` returns the constructor settings as a dictionary.
- `set_params(...)` changes them in place.
- `clone(est)` builds a **new, unfitted** copy with the same settings. The clone has `C=0.1` but no `coef_`, while the original still holds what it learned.

These three methods look mundane, but they are what make cross-validation and hyperparameter search possible: the tools clone your estimator for every fold and every setting so that no state leaks between runs.

## Recap

Estimators learn with `fit`. Transformers add `transform` and reshape data; predictors add `predict` and produce answers. Fit transformers on training data only, then `transform` everything else. Learned values end in an underscore, settings are readable through `get_params`, and `clone` produces a clean unfitted copy. Doing all of this by hand for several columns of different types gets tedious and risky, which is exactly what the next lesson, `ColumnTransformer`, solves.
