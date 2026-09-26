# Supervised vs. Unsupervised Learning

Almost every machine-learning problem falls into one of two families, and the dividing line is a single question: **do you have the answers?** If your historical data includes the outcome you want to predict, you are doing supervised learning. If it does not, and you are hoping the algorithm will reveal structure by itself, you are doing unsupervised learning. Knowing which family you are in decides which algorithms, metrics and pitfalls apply.

## What you'll learn

- What supervised learning is, and the difference between regression and classification
- What unsupervised learning is, with clustering as the main example
- How to run one example of each on the same dataset
- Why cluster numbers are arbitrary and how to check them
- A simple question that tells you which family a problem belongs to

## Supervised learning: learning with answers

In supervised learning every training example has a **label**, the known answer. The model learns the mapping from features to label, then predicts labels for new rows. There are two flavors:

- **Regression** predicts a number: the price of a house, next month's sales, delivery time.
- **Classification** predicts a category: will this customer churn (yes/no), which species is this flower, is this transaction fraud.

The presence of a label is what lets us *grade* the model. We hold some labeled rows back, ask the model to predict them, and compare with the truth.

## Unsupervised learning: no answers

In unsupervised learning there is no label column. The algorithm looks only at the features and finds structure: **clustering** groups similar rows together (customer segments), and **dimensionality reduction** squeezes many columns into a few (you will meet PCA later in this course). Because there is no truth to compare against, the results need human interpretation.

## Same data, both ways

We will use scikit-learn's bundled iris dataset (150 flowers, three species). To keep it easy to plot we use two features, petal length and width.

```python
import pandas as pd
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.cluster import KMeans

iris = load_iris(as_frame=True)
X, y = iris.data, iris.target
X2 = X[["petal length (cm)", "petal width (cm)"]]

# Supervised: features AND labels
X_tr, X_te, y_tr, y_te = train_test_split(
    X2, y, test_size=0.3, random_state=0)
clf = LogisticRegression(max_iter=200).fit(X_tr, y_tr)
print("supervised accuracy on unseen flowers:",
      round(clf.score(X_te, y_te), 3))

# Unsupervised: features only, no labels
km = KMeans(n_clusters=3, n_init=10, random_state=0).fit(X2)
print("cluster sizes:",
      pd.Series(km.labels_).value_counts().sort_index().tolist())
print(pd.crosstab(y, km.labels_,
                  rownames=["true species"], colnames=["cluster"]))
```

Output:

```
supervised accuracy on unseen flowers: 0.978
cluster sizes: [50, 48, 52]
cluster        0   1   2
true species            
0             50   0   0
1              0   2  48
2              0  46   4
```

The supervised classifier was given the species and scored 97.8% on flowers it had never seen. The clustering algorithm never saw a species column, yet it found three groups of nearly the same sizes as the real species, and the table shows how closely they line up: species 0 was found perfectly, species 1 and 2 overlap a little where their petals are similar.

Notice something important about the table: the cluster numbers (0, 1, 2) are **arbitrary names**. Cluster 2 happens to match species 1 here. Running again with a different seed could number them differently. Only the grouping carries meaning.

## The picture

The chart below is the output of this code, with the left panel coloured by true label and the right by discovered cluster (styling omitted). The colours on the right are simply the cluster IDs.

```python
import matplotlib.pyplot as plt
fig, axes = plt.subplots(1, 2, figsize=(10, 4), sharey=True)
for ax, labs in [(axes[0], y), (axes[1], km.labels_)]:
    ax.scatter(X2.iloc[:, 0], X2.iloc[:, 1], c=labs)
    ax.set_xlabel("petal length (cm)")
plt.show()
```

## Which family is my problem?

Ask: *"Is there a column in my historical data that holds the answer I want to predict?"*

- Yes, and it is a number: supervised **regression**.
- Yes, and it is a category: supervised **classification**.
- No, I want to explore or segment: **unsupervised**.

You will also hear about semi-supervised learning (a few labels, many unlabeled rows), self-supervised learning (labels created from the data itself, common in language models) and reinforcement learning (learning by trial and reward). This course focuses on the two core families: chapters 3 and 4 are supervised, chapter 5 is unsupervised.

## Recap

Supervised learning learns from labeled examples and can be graded against the truth; unsupervised learning finds structure without labels and needs human judgment. Regression predicts numbers, classification predicts categories, clustering groups similar rows. Next up, lesson 3: the ML workflow that ties everything together.
