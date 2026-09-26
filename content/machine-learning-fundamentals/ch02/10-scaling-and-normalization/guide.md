# Scaling & Normalization

Look at any real dataset and the columns live on wildly different scales: alcohol content near 13, cholesterol in the hundreds, income in the tens of thousands. Many algorithms treat numbers as numbers, so a column with big values can drown out one with small values, even if the small one is more useful. **Feature scaling** puts columns on a comparable footing. It is one of the simplest steps in data preparation, and one of the easiest to get wrong.

## What you'll learn

- Which algorithms need scaling and which do not
- Standardization, min-max scaling and robust scaling, and how they differ
- How to fit a scaler on training data only, and why
- A worked example showing accuracy jump from 72% to 96% after scaling
- How outliers change your choice of scaler

## Why scale at all?

Scaling matters when an algorithm compares magnitudes:

- **Distance-based models** (k-nearest neighbors, k-means, support vector machines) compute distances between rows. A feature measured in hundreds contributes far more to the distance than one measured in single digits.
- **Gradient-based and regularized models** (linear and logistic regression, neural networks) converge faster and penalize coefficients fairly when features are on similar scales. You saw in lesson 6 that we standardized before running gradient descent.
- **Tree-based models** (decision trees, random forests) only ask "is this value above a threshold?", which is unaffected by scaling. They do not need it.

## The three common scalers

- **StandardScaler** (standardization, z-scores): subtracts the mean and divides by the standard deviation, so each column ends up with mean 0 and standard deviation 1. The usual default.
- **MinMaxScaler** (normalization): squeezes each column into the range 0 to 1 using its minimum and maximum. Good when you need a bounded range, but sensitive to outliers.
- **RobustScaler**: subtracts the median and divides by the interquartile range, so extreme values have little influence on the scale.

"Normalization" is used loosely, sometimes meaning min-max scaling and sometimes rescaling to unit length; always check which is meant.

## A worked example

scikit-learn's bundled wine dataset has 178 wines described by 13 chemical measurements. Look at the range of four of them:

```python
import numpy as np
import pandas as pd
from sklearn.datasets import load_wine
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.preprocessing import StandardScaler, MinMaxScaler, RobustScaler

wine = load_wine(as_frame=True)
X, y = wine.data, wine.target
cols = ["alcohol", "malic_acid", "magnesium", "proline"]
print(X[cols].describe().loc[["min", "max", "std"]].round(1))
```

```
     alcohol  malic_acid  magnesium  proline
min     11.0         0.7       70.0    278.0
max     14.8         5.8      162.0   1680.0
std      0.8         1.1       14.3    314.9
```

Proline varies by over a thousand, while alcohol and malic acid vary by a few units. In a distance calculation, proline would decide almost everything.

## Fit on training data only

A scaler learns statistics (mean and standard deviation) from data, so lesson 8's rule applies: split first, `fit` on the training set, then `transform` both sets with those training statistics.

```python
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.3, stratify=y, random_state=0)

scaler = StandardScaler().fit(X_tr)             # learn mean and std from TRAIN only
X_tr_s, X_te_s = scaler.transform(X_tr), scaler.transform(X_te)
print("train column means ~0:", np.abs(X_tr_s.mean(axis=0)).max().round(6))
print("test  column means   :", np.round(X_te_s.mean(axis=0)[:3], 3), "(not exactly 0, and that is fine)")
```

```
train column means ~0: 0.0
test  column means   : [-0.132 -0.049 -0.226] (not exactly 0, and that is fine)
```

The training columns have mean zero, as designed. The test columns do not, and should not: they are measured with the *training* yardstick, just as new data will be in production. If you re-fitted a scaler on the test set you would be peeking at it.

Now compare a k-nearest-neighbors classifier and a decision tree, each on raw and on scaled features:

```python
knn_raw = KNeighborsClassifier().fit(X_tr, y_tr)
knn_scaled = KNeighborsClassifier().fit(X_tr_s, y_tr)
print("kNN raw      :", round(knn_raw.score(X_te, y_te), 3))
print("kNN scaled   :", round(knn_scaled.score(X_te_s, y_te), 3))
tree_raw = DecisionTreeClassifier(random_state=0).fit(X_tr, y_tr)
tree_scaled = DecisionTreeClassifier(random_state=0).fit(X_tr_s, y_tr)
print("tree raw     :", round(tree_raw.score(X_te, y_te), 3))
print("tree scaled  :", round(tree_scaled.score(X_te_s, y_te), 3))
```

```
kNN raw      : 0.722
kNN scaled   : 0.963
tree raw     : 0.944
tree scaled  : 0.944
```

Scaling took kNN from 72.2% to 96.3% on the same test wines, while the tree, which ignores magnitudes, is identical either way. (With only 54 test wines each row is worth almost two points, so treat exact figures with care; the size of the jump is the point.)

The boxplots show the effect: on the left proline dwarfs everything, on the right all four columns share a common scale. The chart is the output of this code (styling omitted; newer matplotlib versions rename `labels` to `tick_labels`):

```python
import matplotlib.pyplot as plt
fig, axes = plt.subplots(1, 2)
idx = [list(X.columns).index(c) for c in cols]
axes[0].boxplot([X_tr[c] for c in cols], labels=cols)
axes[1].boxplot([X_tr_s[:, i] for i in idx], labels=cols)
plt.show()
```

## Choosing a scaler with outliers in play

Take six values where one is a wild outlier, and apply all three scalers:

```python
v = np.array([[10.0], [12.0], [11.0], [13.0], [9.0], [300.0]])
out = pd.DataFrame({
    "value": v.ravel(),
    "standard": StandardScaler().fit_transform(v).ravel(),
    "minmax": MinMaxScaler().fit_transform(v).ravel(),
    "robust": RobustScaler().fit_transform(v).ravel(),
}).round(2)
print(out)
```

```
   value  standard  minmax  robust
0   10.0     -0.46    0.00    -0.6
1   12.0     -0.44    0.01     0.2
2   11.0     -0.45    0.01    -0.2
3   13.0     -0.43    0.01     0.6
4    9.0     -0.47    0.00    -1.0
5  300.0      2.24    1.00   115.4
```

With standard and min-max scaling the five ordinary values are crushed into a sliver (about -0.47 to -0.43, or 0.00 to 0.01) because the outlier stretched the scale. Robust scaling keeps the ordinary values well spread (-1.0 to 0.6) and lets the outlier stay large. So: default to standardization; use min-max when you need a bounded range; use robust scaling when outliers are present and you have chosen to keep them.

## Recap

Scale for distance-based, gradient-based and regularized models; skip it for trees. Fit scalers on training data only and reuse them on everything else. Watch outliers when choosing between standard, min-max and robust scaling. That completes the core data-preparation steps; next up, lesson 11: creating new features.
