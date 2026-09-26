# Hierarchical Clustering

k-means asks you to choose k first. Hierarchical clustering flips that around: it builds a complete family tree of your data, from every row alone up to a single group containing everything, and you decide afterward where to cut the tree. That makes it a great exploration tool, and because its shapes are not limited to round blobs, some variants handle cases where k-means fails.

## What you'll learn

- How agglomerative (bottom-up) clustering builds a tree
- How to read a dendrogram and cut it to get clusters
- What linkage means and how the common choices differ
- How to run it in scikit-learn and in SciPy
- Its costs and when to prefer it over k-means

## The bottom-up idea

Agglomerative clustering starts with every row as its own cluster. At each step it merges the two closest clusters, and it repeats until only one remains. With 300 customers that produces 299 merges. The result is a dendrogram, a tree whose leaves are rows and whose branch heights show how far apart the merged groups were at the moment they joined.

Tall jumps mean you merged two groups that were very different. A good place to cut is right before a big jump.

## Linkage: what counts as "closest"

Distance between two single points is clear, but distance between two clusters needs a rule, called the linkage.

- `ward`: merge the pair that increases total within-cluster variance the least. Produces compact, even groups, similar in spirit to k-means. It is the scikit-learn default and works with Euclidean distance only.
- `complete`: the distance between the two farthest members. Tight, round-ish groups.
- `average`: the mean distance between all pairs of members.
- `single`: the distance between the two closest members. It can follow long, thin, chained shapes, but is sensitive to noise bridges.

## Build the tree with SciPy

We use the same seeded, illustrative customers as the last three lessons, with three groups built in.

```python
import numpy as np, pandas as pd
from scipy.cluster.hierarchy import linkage, fcluster
from sklearn.preprocessing import StandardScaler

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
Xs = StandardScaler().fit_transform(df)

Z = linkage(Xs, method="ward")
print(Z.shape)
print(Z[-3:, 2].round(2))
```

`Z.shape` is `(299, 4)`: one row per merge. The third column holds the merge distances, and the last three are 4.31, 22.46, and 24.31. The last two merges join big, distant groups, and they are much taller than the 4.31 merge before them. That jump is the tree telling you there are three natural groups.

## Cutting the tree

```python
labels = fcluster(Z, t=3, criterion="maxclust")
print(np.bincount(labels)[1:])
```

This prints `[100 100 100]`. `fcluster` labels start at 1, which is why we drop the empty first slot of `bincount`. You can also cut at a height with `criterion="distance"`.

## The scikit-learn version

If you only want labels, `AgglomerativeClustering` fits into the same workflow as other estimators.

```python
from sklearn.cluster import AgglomerativeClustering
from sklearn.metrics import silhouette_score

ag = AgglomerativeClustering(n_clusters=3,
                             linkage="ward").fit(Xs)
print(np.bincount(ag.labels_))
print(round(silhouette_score(Xs, ag.labels_), 3))
```

The counts are `[100 100 100]` and the silhouette is `0.773`, identical to k-means here because these blobs are clean. On this data, all four linkages recover the same three groups.

## Drawing the dendrogram

With 300 rows, a full dendrogram is unreadable, so we show only the last 12 merges (`truncate_mode="lastp"`), and beside it, a case where linkage matters: two interlocking crescents, where `single` linkage succeeds and `ward` fails.

```python
import matplotlib.pyplot as plt
from scipy.cluster.hierarchy import dendrogram
from sklearn.datasets import make_moons

Xm, _ = make_moons(n_samples=300, noise=0.06,
                   random_state=42)
sm = AgglomerativeClustering(n_clusters=2,
        linkage="single").fit_predict(Xm)
wd = AgglomerativeClustering(n_clusters=2,
        linkage="ward").fit_predict(Xm)
print(np.bincount(sm), np.bincount(wd))

fig, (a, b) = plt.subplots(1, 2, figsize=(10, 4))
dendrogram(Z, truncate_mode="lastp", p=12,
           color_threshold=10, ax=a)
a.axhline(10, color="#6B6259", linestyle="--")
a.set_title("Ward dendrogram (last 12 merges)")
a.set_xlabel("cluster size in parentheses")
a.set_ylabel("merge distance")
colors = np.array(["#8E1C1C", "#2F6B8A"])
b.scatter(Xm[:, 0], Xm[:, 1], s=14, color=colors[sm])
b.set_title("Single linkage on crescents")
fig.tight_layout()
fig.savefig("dendrogram-and-single.png", dpi=150)
```

Single linkage splits the crescents 150 and 150, exactly right, while `ward` gives 184 and 116, cutting across them just as k-means did.

## Costs and trade-offs

Hierarchical clustering compares many pairs of rows, so it needs memory and time that grow quickly with the number of rows. It is comfortable for thousands of rows and painful for millions. It also cannot undo a merge. Use it for exploration on modest data, for when you want to see the structure at several levels, and when cluster shapes are irregular. Use k-means when the dataset is large.

## Recap

Agglomerative clustering merges the closest groups again and again into a dendrogram, and you cut the tree to get clusters. The linkage rule defines "closest": ward for compact groups, single for chained shapes. Next, a different kind of unsupervised learning: shrinking many columns into a few with PCA.
