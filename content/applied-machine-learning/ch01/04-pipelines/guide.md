# Pipelines

By now you have a preprocessor and a model, and a rule to follow: fit on training data, transform everything else. Keeping those two objects in sync by hand is where mistakes creep in. Someone refits the scaler on the test set, or forgets to apply the encoder to new data, or saves the model but not the preprocessing. A scikit-learn **Pipeline** removes the whole category of mistake by chaining the steps into a single estimator that you fit, score, cross-validate, tune, and save as one unit.

## What you'll learn

- How to combine a `ColumnTransformer` and a model into one `Pipeline`
- How to reach inside a pipeline, and how the `step__parameter` naming works
- How to cross-validate a whole pipeline so preprocessing is re-fitted inside every fold
- A demonstration of the data leakage a pipeline prevents

## Build one

We reuse the `pre` preprocessor from Lesson 3 (numeric recipe plus categorical recipe, on the illustrative customer data). A pipeline is a list of `(name, estimator)` pairs; every step but the last must be a transformer, and the last can be anything, usually a predictor.

```python
from sklearn.pipeline import Pipeline
from sklearn.linear_model import LogisticRegression

model = Pipeline([
    ("prep", pre),
    ("clf", LogisticRegression(max_iter=1000)),
])
model.fit(X_train, y_train)
print(model.predict(X_test.head(5)))
print(round(model.score(X_test, y_test), 3))
print(model.predict_proba(X_test.head(2)).round(3))
```

Output:

```
[1 0 0 0 1]
0.768
[[0.399 0.601]
 [0.941 0.059]]
```

A pipeline has the interface of its final step. `fit` fits every transformer in order, passing each one's output to the next, then fits the model. `predict` pushes raw rows through the fitted transformers and into the model. You hand it the **raw DataFrame**, missing values and text columns included, and it does all the preprocessing itself. This is exactly what you need in production: new customers arrive as raw rows.

`make_pipeline(pre, LogisticRegression())` is a shortcut that names the steps for you (lowercased class names). Writing names explicitly, as above, is clearer when you tune later.

## Look inside

```python
print(list(model.named_steps))
print(model.named_steps["clf"].coef_.shape)
print(model[-1])
```

```
['prep', 'clf']
(1, 11)
LogisticRegression(max_iter=1000)
```

`named_steps` gives access by name, and slicing works too: `model[-1]` is the model and `model[:-1]` is everything before it. A useful combination is pairing coefficient values with the column names from the preprocessor:

```python
import pandas as pd
names = model[:-1].get_feature_names_out()
coefs = pd.Series(model[-1].coef_[0], index=names).sort_values()
print(coefs.round(2))
```

```
num__tenure_months   -0.99
cat__plan_premium    -0.57
cat__plan_standard   -0.25
cat__region_south    -0.20
num__age             -0.06
cat__region_west      0.04
cat__region_east      0.05
cat__region_north     0.11
num__monthly_spend    0.42
num__support_calls    0.64
cat__plan_basic       0.82
dtype: float64
```

Longer tenure and the premium plan lower churn risk; more support calls and the basic plan raise it. Because the illustrative data was generated with exactly those relationships, this is a comforting sanity check that the pipeline is wired correctly.

## The double-underscore convention

Every setting inside a pipeline is reachable through `get_params` and `set_params` using **step name, two underscores, parameter name**:

```python
print("clf__C" in model.get_params())
model.set_params(clf__C=0.1)
print(model.get_params()["clf__C"])
model.set_params(clf__C=1.0)
```

```
True
0.1
```

Nested objects chain the pattern, for example `prep__num__simpleimputer__strategy`. This is how hyperparameter search (Chapter 3) tunes preprocessing choices and model settings together.

## Cross-validate the whole thing

`cross_val_score` clones the pipeline for each fold, so the imputer medians, scaler statistics, and category lists are learned from that fold's training rows only. We pass the **raw** `X` and `y`:

```python
from sklearn.model_selection import cross_val_score
from sklearn.ensemble import RandomForestClassifier

scores = cross_val_score(model, X, y, cv=5, scoring="roc_auc")
print(scores.round(3), scores.mean().round(3))

rf = Pipeline([("prep", pre),
    ("clf", RandomForestClassifier(n_estimators=200, random_state=0))])
scores = cross_val_score(rf, X, y, cv=5, scoring="roc_auc")
print(scores.round(3), scores.mean().round(3))
```

```
[0.819 0.821 0.729 0.768 0.778] 0.783
[0.767 0.764 0.654 0.751 0.738] 0.735
```

(`roc_auc` is a metric introduced in Lesson 7; read it as "higher is better, 0.5 is guessing".) Swapping the model is a one-word change, and both are evaluated with identical, leak-free preprocessing. On this table, the simpler logistic regression wins.

## What a pipeline protects you from

For simple imputers and scalers, fitting on all the data before cross-validating barely changes the score; on our table it gave the same 0.783. The danger grows with steps that use the labels, such as feature selection. Here is a classic demonstration on pure noise: 500 random features and random labels, so the true accuracy is 50%.

```python
import numpy as np
from sklearn.feature_selection import SelectKBest, f_classif
from sklearn.pipeline import make_pipeline

rng = np.random.default_rng(0)
Xn = rng.normal(size=(100, 500))
yn = rng.integers(0, 2, 100)

Xsel = SelectKBest(f_classif, k=10).fit_transform(Xn, yn)   # leaks
print(cross_val_score(LogisticRegression(), Xsel, yn, cv=5).mean().round(2))

pipe = make_pipeline(SelectKBest(f_classif, k=10), LogisticRegression())
print(cross_val_score(pipe, Xn, yn, cv=5).mean().round(2))
```

```
0.7
0.5
```

Selecting the ten "best" features using all the labels first lets the winners peek at the answers, and cross-validation reports a fantasy 70%. Inside a pipeline, the selection is redone within each training fold, and the honest score, 50%, exposes the model as worthless. The same protection applies to imputation, scaling, encoding, and anything else you might add.

## Recap

A `Pipeline` chains transformers and a final estimator into one object with the familiar `fit`, `predict`, and `score`. It accepts raw rows, exposes its parts through `named_steps` and slicing, and lets you set nested parameters with `step__param`. Passing it to `cross_val_score` refits the preprocessing inside each fold, which prevents leakage automatically. Because everything is now one object, saving the trained model, preprocessing included, is a single call. That is the next lesson.
