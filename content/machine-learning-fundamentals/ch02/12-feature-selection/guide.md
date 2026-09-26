# Feature Selection

After feature engineering you may have dozens or hundreds of columns. It is tempting to throw them all at the model and let it sort things out. Sometimes that works, but more features also mean more noise to overfit, slower training, harder explanations, and more data to collect and maintain in production. **Feature selection** is the discipline of keeping the features that earn their place and dropping the rest.

## What you'll learn

- Why fewer features can be better, and when it isn't
- The three families of selection methods: filter, wrapper, and embedded
- How to run `SelectKBest` and `RFE` in scikit-learn
- How to do selection without leaking information from the test data

## Why drop features at all?

- **Overfitting.** Irrelevant columns give the model extra ways to memorize noise in the training set.
- **Speed and cost.** Fewer columns train and predict faster and are cheaper to store.
- **Interpretability.** Explaining a model with 8 inputs to a stakeholder is far easier than one with 800.
- **Robustness.** Every feature is a data pipeline that can break in production.

Selection is not free, though. It can discard a feature that only helps in combination with others, so treat it like any other modeling choice and measure the result.

## Three families of methods

1. **Filter methods** score each feature on its own using a statistic (correlation, an F-test, variance) and keep the top scorers. They are fast and model-agnostic.
2. **Wrapper methods** repeatedly train a model on different feature subsets and keep the subset that performs best. They are slower but consider features working together. Recursive feature elimination (RFE) is the classic example.
3. **Embedded methods** perform selection as part of training. Lasso regression, coming in lesson 15, shrinks unhelpful coefficients to exactly zero, and tree-based models report feature importance, which we cover in lesson 20.

## A filter example

scikit-learn ships a small bundled dataset of 442 diabetes patients with 10 numeric features and a disease-progression score as the target. It loads with no download.

```python
from sklearn.datasets import load_diabetes
from sklearn.feature_selection import (
    VarianceThreshold, SelectKBest, f_regression, RFE)
from sklearn.linear_model import LinearRegression
X, y = load_diabetes(return_X_y=True, as_frame=True)
print(VarianceThreshold(0.0).fit(X).get_support().sum())
kb = SelectKBest(f_regression, k=4).fit(X, y)
print(list(X.columns[kb.get_support()]))
print(dict(zip(X.columns, kb.scores_.round(1))))
```

Output:

```
10
['bmi', 'bp', 's4', 's5']
{'age': 16.1, 'sex': 0.8, 'bmi': 230.7, 'bp': 106.5, 's1': 20.7, 's2': 13.7, 's3': 81.2, 's4': 100.1, 's5': 207.3, 's6': 75.4}
```

`VarianceThreshold(0.0)` drops columns that never change; here all 10 survive. `SelectKBest` with the `f_regression` score ranks each feature by how strongly it relates to the target: `bmi` and `s5` score highest, while `sex` barely registers.

## A wrapper example

```python
rfe = RFE(LinearRegression(), n_features_to_select=4).fit(X, y)
print(list(X.columns[rfe.support_]))
```

This prints `['bmi', 's1', 's2', 's5']`. RFE trains the model, discards the weakest feature, and repeats until four remain. Notice that it picked a different set than the filter: `s1` and `s2` are strongly related to each other, so a wrapper judges them jointly while a filter scores each alone. Different methods can disagree, and that is normal.

## Do selection without leaking

Selecting features using the whole dataset, then splitting for validation, leaks information from the test rows into your choices. The fix is to put the selector inside a pipeline so it is refit on the training portion of every fold.

```python
from sklearn.model_selection import cross_val_score
from sklearn.pipeline import make_pipeline
pipe = make_pipeline(
    SelectKBest(f_regression, k=4), LinearRegression())
print(cross_val_score(pipe, X, y, cv=5, scoring="r2").mean().round(3))
```

The 5-fold mean R² is 0.46 for four selected features, versus 0.482 for plain linear regression on all ten. Four features recover most of the performance, a useful trade when simplicity matters. Do not assume that is always true: the evidence, not a rule, decides.

## Recap

Feature selection keeps the inputs that earn their place. Filters are fast, wrappers consider combinations, and embedded methods select while training. Always fit selectors on training data only, ideally inside a pipeline, and judge them by validated performance. Next we begin the core algorithms, starting with linear regression.
