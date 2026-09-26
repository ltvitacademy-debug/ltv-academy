# Random Forests

A single decision tree is easy to read but unstable and prone to memorizing its training data. A **random forest** keeps the tree's strengths and fixes its biggest weakness by training hundreds of trees, each a little different, and letting them vote. It is one of the most reliable, low-fuss models for tabular data, and a strong first choice when you want good accuracy without much tuning.

## What you'll learn

- Why averaging many noisy models beats relying on one
- The two sources of randomness in a random forest
- How to fit one, score it, and use the out-of-bag estimate
- How the number of trees affects performance, and the key settings to know

## The idea: the wisdom of many trees

Imagine asking one person to estimate the number of jellybeans in a jar, then asking a hundred people and averaging. Individual guesses are noisy, but their errors point in different directions, so the average is usually much better. Ensembles apply the same principle to models. A deep tree has low bias but high variance: its predictions swing with the data it saw (the bias-variance trade-off from Chapter 1). Averaging many high-variance trees cuts the variance without raising the bias much.

For averaging to help, the trees must not all make the same mistakes, so a random forest injects randomness in two ways:

1. **Bootstrap sampling (bagging).** Each tree trains on a different random sample of the rows, drawn with replacement, so each tree sees a slightly different version of the data.
2. **Random feature subsets.** At every split, a tree may only consider a random subset of the features. In scikit-learn, `RandomForestClassifier` defaults to the square root of the number of features. This stops one dominant feature from making all trees look alike.

To predict, every tree votes and the forest returns the majority class. A regression forest averages the trees' numeric predictions.

## Fit one on a real bundled dataset

scikit-learn ships the Wisconsin diagnostic breast cancer dataset: 569 samples, 30 numeric measurements of cell nuclei, and a benign/malignant label. It's a good, well-behaved test bed, used here only to compare models. We compare a single tree with a forest on a held-out test set.

```python
from sklearn.datasets import load_breast_cancer
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
X, y = load_breast_cancer(return_X_y=True, as_frame=True)
X_tr, X_te, y_tr, y_te = train_test_split(
    X, y, test_size=0.3, random_state=0, stratify=y)
tree = DecisionTreeClassifier(random_state=0).fit(X_tr, y_tr)
rf = RandomForestClassifier(
    n_estimators=200, oob_score=True, random_state=0)
rf.fit(X_tr, y_tr)
print(round(tree.score(X_te, y_te), 3))
print(round(rf.score(X_te, y_te), 3))
print(round(rf.oob_score_, 3))
```

Output:

```
0.906
0.953
0.97
```

The single tree scores 0.906 on the test set and the forest scores 0.953. Both memorize the training set perfectly (a training accuracy of 1.0), yet the forest generalizes better, a clear sign that averaging reduces variance.

## The out-of-bag score for free

Because each tree is trained on a bootstrap sample, roughly a third of the rows are left out for any given tree. Predicting each row using only the trees that never saw it produces the **out-of-bag (OOB) score**, an honest validation estimate with no separate split. Setting `oob_score=True` gives it as `rf.oob_score_`, here 0.97. It is a handy check, but it's a different sample from the test set, so the two numbers won't match exactly. With only 171 test rows, expect some noise in both.

## How many trees?

More trees reduce variance, with diminishing returns, and they don't cause overfitting on their own. We can check with 5-fold cross-validation on the full dataset:

```python
import matplotlib.pyplot as plt
from sklearn.model_selection import cross_val_score
sizes = [1, 5, 10, 25, 50, 100, 200]
scores = []
for k in sizes:
    rf = RandomForestClassifier(n_estimators=k, random_state=0)
    scores.append(cross_val_score(rf, X, y, cv=5).mean())
single = cross_val_score(
    DecisionTreeClassifier(random_state=0), X, y, cv=5).mean()
plt.plot(sizes, scores, marker="o", label="random forest")
plt.axhline(single, color="crimson", linestyle="--", label="single tree")
plt.xscale("log")
plt.xlabel("Number of trees")
plt.ylabel("5-fold CV accuracy")
plt.legend()
plt.show()
```

The single tree averages 0.917. A one-tree "forest" scores 0.900 (a single tree trained on a bootstrap sample with restricted features, so no better than the plain tree), but by 5 trees it's already at 0.956, it peaks around 0.963 with 50 to 100 trees, and then levels off. Past a point, extra trees mostly cost training time.

## Settings worth knowing

- `n_estimators`: number of trees. A few hundred is a common starting point.
- `max_features`: how many features each split considers. Tune it.
- `max_depth`, `min_samples_leaf`: limit individual tree size. Useful when the data are noisy.
- `n_jobs=-1`: train trees in parallel across CPU cores.
- `class_weight="balanced"`: helps with imbalanced classes.

## Trade-offs

Forests are accurate, robust to outliers, need no feature scaling, handle non-linear effects and interactions, and give you an importance score for each feature, the topic of the next lesson. In exchange you lose the single tree's readable path: a hundred trees can't be drawn as one checklist. They are also slower and larger than one tree, and they can't extrapolate beyond the range of the training data, which matters for trends over time.

## Recap

A random forest trains many trees on bootstrap samples with random feature subsets and combines their votes. This averages away individual trees' variance and usually beats a single tree by a wide margin. Use OOB or cross-validation to evaluate it. Next: feature importance, which recovers some of the interpretability that a forest gives up.
