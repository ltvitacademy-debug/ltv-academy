# Preprocessing With ColumnTransformer

Real tables mix column types. Our customer data has numeric columns with gaps (`age`, `monthly_spend`), a count (`support_calls`), and text categories (`plan`, `region`) that also have gaps. Each type needs a different treatment: numbers get imputed and scaled, categories get imputed and one-hot encoded. Doing that by slicing columns, transforming each, and gluing the pieces back together by hand is slow and error-prone. **`ColumnTransformer`** does it in one object: you declare which recipe applies to which columns, and it handles the rest.

## What you'll learn

- How to declare per-column preprocessing recipes with `ColumnTransformer`
- How to chain steps within a recipe using `make_pipeline`
- How to read the output and recover column names with `get_feature_names_out`
- How to handle unseen categories, leftover columns, and selection by data type

## Two recipes

We define column lists and one small recipe for each kind. `make_pipeline` chains transformers so the output of one feeds the next (Lesson 4 covers pipelines properly; for now, read it as "do these in order").

```python
from customers import make_customers
from sklearn.model_selection import train_test_split
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import make_pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler, OneHotEncoder

df = make_customers()
X = df.drop(columns="churned")
y = df["churned"]
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.25, stratify=y, random_state=0)

num_cols = ["age", "tenure_months", "monthly_spend", "support_calls"]
cat_cols = ["plan", "region"]

num_pipe = make_pipeline(SimpleImputer(strategy="median"),
                         StandardScaler())
cat_pipe = make_pipeline(
    SimpleImputer(strategy="most_frequent"),
    OneHotEncoder(handle_unknown="ignore"))
```

Now the `ColumnTransformer` takes a list of `(name, transformer, columns)` triples:

```python
pre = ColumnTransformer([
    ("num", num_pipe, num_cols),
    ("cat", cat_pipe, cat_cols),
])
Xt = pre.fit_transform(X_train)
print(Xt.shape)
print(pre.transform(X_test).shape)
```

Output:

```
(750, 11)
(250, 11)
```

We started with 6 feature columns and now have 11: 4 numeric plus 3 one-hot columns for `plan` plus 4 for `region`. Just like any transformer, `fit_transform` runs on the training set and `transform` on everything else, so the medians, the scaling numbers, and the category lists all come from training data only.

## Get the column names back

The output is a NumPy array. `get_feature_names_out()` tells you what each column means (the prefix is the recipe name you chose):

```python
import pandas as pd
names = pre.get_feature_names_out()
out = pd.DataFrame(Xt, columns=names, index=X_train.index)
print(out.round(2).head(3).T)
```

```
                     518   410   258
num__age           -0.04 -1.12 -1.12
num__tenure_months  0.01 -1.48  0.16
num__monthly_spend -1.08  0.97  0.14
num__support_calls -0.35  0.47 -0.35
cat__plan_basic     0.00  1.00  0.00
cat__plan_premium   1.00  0.00  0.00
cat__plan_standard  0.00  0.00  1.00
cat__region_east    0.00  0.00  0.00
cat__region_north   1.00  1.00  0.00
cat__region_south   0.00  0.00  1.00
cat__region_west    0.00  0.00  0.00
```

Compare with the raw rows: customer 518 is on the premium plan in the north, and its `cat__plan_premium` and `cat__region_north` columns are 1. This naming is essential later for interpreting coefficients and feature importances.

## Unseen categories

What if production data contains a region the training set never had? A default `OneHotEncoder` raises an error, which would crash a live scoring job. Setting `handle_unknown="ignore"` (as we did) encodes an unknown category as all zeros instead:

```python
new = X_test.head(2).copy()
new.iloc[0, new.columns.get_loc("region")] = "central"
print(pre.transform(new)[0][-4:])
```

```
[0. 0. 0. 0.]
```

The four region columns are all zero for the "central" customer, and everything else is unaffected.

## Columns you did not mention

By default `ColumnTransformer` **drops** any column not listed. Our recipes above covered every feature, but if you list only the categorical recipe, the numeric columns vanish:

```python
only_cat = [("cat", cat_pipe, cat_cols)]
print(ColumnTransformer(only_cat).fit_transform(X_train).shape)
print(ColumnTransformer(only_cat, remainder="passthrough")
      .fit_transform(X_train).shape)
```

```
(750, 7)
(750, 11)
```

With `remainder="passthrough"` the untouched columns are appended at the end, unchanged (including any missing values, which most models will reject). Prefer to list every column explicitly so nothing is dropped or passed through by accident.

## Selecting columns by type

Hard-coded name lists are fine, but `make_column_selector` picks columns by data type, which is handy for wide tables:

```python
import numpy as np
from sklearn.compose import make_column_selector as selector

pre2 = ColumnTransformer([
    ("num", num_pipe, selector(dtype_include=np.number)),
    ("cat", cat_pipe, selector(dtype_include=object)),
])
print(pre2.fit_transform(X_train).shape)
```

```
(750, 11)
```

Same result, no lists. The trade-off is that a numeric column stored as text, or a code like `region_id=3` stored as a number, is silently treated by its dtype, not by what it means. Check the output names.

## Recap

`ColumnTransformer` applies a different preprocessing recipe to each group of columns and reassembles the result, learning everything from the training data only. Chain steps inside a recipe with `make_pipeline`, use `handle_unknown="ignore"` for categories, choose an explicit `remainder`, and read column meanings with `get_feature_names_out`. We now have a preprocessor and a model, but still two separate objects to keep in sync. The next lesson joins them into a single Pipeline.
