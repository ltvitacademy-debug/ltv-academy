# k-Nearest Neighbors & Naive Bayes Overview

You have now met linear models, decision trees, and forests. Two more classic algorithms round out the toolbox, and both are worth knowing because they think about the problem in a completely different way. k-nearest neighbors (k-NN) predicts by looking at similar examples. Naive Bayes predicts by multiplying probabilities. Neither is usually the final model in a serious project, but both make excellent fast baselines, and each teaches an idea you will use again.

## What you'll learn

- How k-NN classifies a point by a vote among its closest training examples
- Why k-NN depends on distance, and why feature scaling is mandatory for it
- How the choice of k moves a model between overfitting and underfitting
- How naive Bayes turns Bayes' rule into a fast probabilistic classifier
- When each one is a reasonable first choice

## k-NN: predict by similarity

k-NN has almost no training step. It memorizes the training data. To predict for a new row, it finds the k training rows closest to it and lets them vote. If k is 5 and four of the five nearest customers churned, the prediction is "churn". For regression, it averages the neighbors' values instead.

"Closest" means smallest distance, usually Euclidean distance computed across every feature. That single fact has a big consequence: a feature measured in the thousands will drown out one measured in single digits. We will see that on real numbers below.

## The scaling trap

The example uses a seeded illustrative dataset from `make_classification`, with the first feature multiplied by 1000 to mimic something like annual income beside something like a rating score.

```python
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import make_pipeline

X, y = make_classification(n_samples=600,
    n_features=5, n_informative=3,
    n_redundant=0, random_state=42)
X[:, 0] *= 1000
X_tr, X_te, y_tr, y_te = train_test_split(
    X, y, test_size=0.25,
    random_state=42, stratify=y)

knn = KNeighborsClassifier(n_neighbors=5)
print(knn.fit(X_tr, y_tr).score(X_te, y_te))
```

That prints `0.453`, no better than a coin flip. Scaling the features inside a pipeline changes everything:

```python
knn_s = make_pipeline(StandardScaler(),
    KNeighborsClassifier(n_neighbors=5))
print(knn_s.fit(X_tr, y_tr).score(X_te, y_te))
```

That prints `0.9`. Same algorithm, same data, same k. Only the scale changed. Putting the scaler inside the pipeline also keeps the test data from leaking into the scaling statistics, which you learned in the data leakage lesson.

## Choosing k

Small k means a jagged, flexible boundary that chases noise. Large k means a smooth, blunt boundary that ignores local detail. On this dataset, scaled, k of 1 scores 1.000 on the training set and 0.900 on the test set, a classic overfit gap. k of 15 scores 0.913 on training and 0.927 on test, a much smaller gap. At k of 51 both sit near 0.89 to 0.90 and accuracy starts to slip. You pick k the same way you tune anything: compare validation scores across several values.

## Naive Bayes: multiply the evidence

Naive Bayes applies Bayes' rule: the probability of a class given the features is proportional to the prior probability of the class times the probability of seeing those features within the class. The "naive" part is the assumption that features are independent of each other given the class. That is rarely true, but the shortcut makes the math simple and training nearly instant.

```python
from sklearn.naive_bayes import GaussianNB

nb = GaussianNB().fit(X_tr, y_tr)
print(nb.score(X_te, y_te))
print(nb.predict_proba(X_te[:2]).round(3))
```

The score is `0.913`, and `predict_proba` returns a probability for each class per row, for example `[0.131, 0.869]` for the first test row. Scikit-learn offers several variants: `GaussianNB` for numeric features, and `MultinomialNB` for counts such as word frequencies, which is why naive Bayes is a long-standing favorite for spam filtering and text classification.

## When to reach for each

- k-NN: small to medium datasets, few features, meaningful distances; slow at prediction time on large data because it compares against stored rows.
- Naive Bayes: very fast, works with little data, gives probabilities, strong baseline for text.

## Recap

k-NN votes among the closest training rows, so scale your features and tune k. Naive Bayes multiplies class probabilities under an independence assumption and is fast and simple. Both make quick baselines you can compare against the richer models you have built. Next, we leave supervised learning and start finding structure in data with no labels at all: clustering.
