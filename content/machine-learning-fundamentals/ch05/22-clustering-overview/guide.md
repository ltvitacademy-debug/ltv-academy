# Clustering Overview

Everything you have built so far in this course was supervised: every training row came with a label, and the model learned to predict it. Now the labels disappear. Clustering asks a different question: given a table of rows and no target column, which rows naturally belong together? Retailers use it to find customer segments, banks to group similar accounts, and analysts to explore a dataset before deciding what to model. In this chapter you will learn the main clustering algorithms, how to pick the number of groups, and how to shrink wide tables with PCA.

## What you'll learn

- What clustering is and how it differs from classification
- The three main families: centroid-based, hierarchical, and density-based
- Why you scale features before clustering
- How to read a cluster with group averages and a silhouette score
- Why there is no "correct answer" to check against

## An illustrative customer dataset

Throughout this chapter we use seeded, illustrative retail customers with two features, annual spend and visits per month. There are three built-in groups, so we know what a good result should look like. Real data is never this tidy, but a known answer lets you see how each method behaves.

```python
import numpy as np, pandas as pd

rng = np.random.default_rng(42)
def blob(n, spend, visits):
    return np.column_stack([
        rng.normal(spend[0], spend[1], n),
        rng.normal(visits[0], visits[1], n)])

X = np.vstack([blob(100, (300, 60), (2, 0.6)),
               blob(100, (1200, 150), (3, 0.8)),
               blob(100, (700, 120), (9, 1.2))])
df = pd.DataFrame(X, columns=["annual_spend",
                              "visits_per_month"])
```

That gives 300 customers. Annual spend runs from about 183 to 1,636, while visits per month run from about 0.7 to 11.9. The two features live on very different scales.

## Scale first, then cluster

Clustering algorithms judge similarity by distance, just like k-NN. A feature in the hundreds would dominate one in single digits, so we standardize first. The steps are `StandardScaler`, then an algorithm; here, k-means with three clusters (the next lesson explains how it works).

```python
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import silhouette_score

Xs = StandardScaler().fit_transform(df)
km = KMeans(n_clusters=3, n_init=10,
            random_state=42).fit(Xs)
print(pd.Series(km.labels_).value_counts())
print(silhouette_score(Xs, km.labels_))
```

The three clusters hold 100 customers each, and the silhouette score is `0.773`. The silhouette score runs from -1 to 1 and measures how much closer each point is to its own cluster than to the next nearest one. Higher is better, and values near 0.7 or above suggest well-separated groups.

## Reading a cluster

A cluster label is just a number. To make it useful you profile it: group the original, unscaled data by label and compare averages.

```python
df["cluster"] = km.labels_
print(df.groupby("cluster").mean().round(1))
```

In our run, cluster 0 averages 1,190.6 in spend with 3.1 visits, cluster 1 averages 694.6 with 8.9 visits, and cluster 2 averages 297.0 with 2.0 visits. You could name these "big spenders who visit rarely", "frequent mid-spenders", and "occasional low spenders". The numbers 0, 1, 2 are arbitrary and can change between runs or library versions, so always name clusters by their profile, never by their number.

## Seeing the result

```python
import matplotlib.pyplot as plt

colors = np.array(["#8E1C1C", "#2F6B8A", "#C4952E"])
fig, (a, b) = plt.subplots(1, 2, figsize=(10, 4),
                           sharey=True)
a.scatter(df.annual_spend, df.visits_per_month,
          s=14, color="#6B6259")
b.scatter(df.annual_spend, df.visits_per_month,
          s=14, color=colors[km.labels_])
a.set_title("What we have: no labels")
b.set_title("What clustering finds: 3 groups")
for ax in (a, b):
    ax.set_xlabel("annual_spend ($)")
a.set_ylabel("visits_per_month")
fig.tight_layout()
fig.savefig("clusters-overview.png", dpi=150)
```

The left panel is what you start with: an unlabeled cloud. The right panel is what clustering returns.

## Three families of algorithms

- Centroid-based (k-means): each cluster is summarized by a center point. Fast and simple, best for round, similar-sized groups.
- Hierarchical (agglomerative): repeatedly merge the closest points or groups into a tree you can cut at any height.
- Density-based (DBSCAN): a cluster is a dense region; sparse points are labeled noise with the label -1. It needs no cluster count but does need `eps` and `min_samples`. With `eps=0.4` and `min_samples=5` on our scaled data it finds three groups plus one noise point.

## No answer key

Because there are no labels, nothing tells you the clustering is "right". You judge it by whether the groups are compact and separated (silhouette), and above all whether they are useful and describable to the business. Recap: clustering finds structure without labels; scale first; profile the groups; and remember that the algorithm you choose shapes the groups you get. Next up: k-means in detail.
