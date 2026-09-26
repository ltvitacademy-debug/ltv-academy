# k-Means

k-means is the most widely used clustering algorithm, and for good reason: the idea fits in one sentence and it scales to large datasets. You tell it how many clusters you want, k, and it finds k center points so that every row is close to the center of its own group. In this lesson we open it up, run it on the illustrative customer data from the last lesson, read its outputs, and learn exactly where it breaks.

## What you'll learn

- The four-step loop k-means repeats until it settles
- What `inertia_`, `cluster_centers_`, and `predict` give you
- Why `n_init` and k-means++ exist, and what a bad start looks like
- How to turn scaled centers back into business units
- Where k-means fails: non-round clusters

## The algorithm in four steps

1. Choose k starting centers (centroids).
2. Assign every row to its nearest centroid.
3. Move each centroid to the mean of the rows assigned to it.
4. Repeat steps 2 and 3 until assignments stop changing.

Each pass can only lower the total squared distance from rows to their centroids, so the loop always settles. That total is called inertia, and it is what k-means minimizes. Notice the catch: the loop settles at a good answer, but not necessarily the best one, because the result depends on where the centroids started.

## Running it

Rebuild the illustrative customers (seeded, three built-in groups) and fit on scaled data, keeping the scaler so we can undo it later.

```python
import numpy as np, pandas as pd
from sklearn.cluster import KMeans
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
scaler = StandardScaler().fit(df)
Xs = scaler.transform(df)

km = KMeans(n_clusters=3, init="k-means++",
            n_init=10, random_state=42).fit(Xs)
print(round(km.inertia_, 2), km.n_iter_)
```

This prints `52.37 2`: inertia of 52.37, and the best run settled in just 2 iterations. Inertia by itself has no meaning; it is useful for comparing runs on the same data and, in the next lesson, for choosing k.

## Centers and predictions

The centers are in scaled units, which are unreadable. Use the scaler to convert them back.

```python
centers = pd.DataFrame(
    scaler.inverse_transform(km.cluster_centers_),
    columns=df.columns).round(1)
print(centers)

new = pd.DataFrame([[650, 8], [250, 1]],
                   columns=df.columns)
print(km.predict(scaler.transform(new)))
```

The centers are (1190.6, 3.1), (694.6, 8.9), and (297.0, 2.0), which are the group profiles you saw before. `predict` assigns new customers to the nearest center: a customer spending 650 with 8 visits lands in cluster 1, and one spending 250 with 1 visit lands in cluster 2. Always apply the same fitted scaler to new data, never a fresh one.

## Why n_init and k-means++ matter

A bad start can trap the loop in a poor solution. Here we force purely random starts with a single attempt each, across four seeds:

```python
for seed in range(4):
    k1 = KMeans(n_clusters=3, init="random",
                n_init=1, random_state=seed).fit(Xs)
    print(seed, round(k1.inertia_, 2))
```

Three seeds reach 52.37, but seed 1 gets stuck at 334.76, six times worse. Scikit-learn's defaults protect you: `init="k-means++"` spreads the starting centroids out, and `n_init` reruns the whole algorithm several times and keeps the lowest inertia. In scikit-learn 1.1 the default `n_init` is 10, but setting it explicitly makes your code's intent, and its behavior across versions, clear.

## Where k-means fails

k-means draws straight boundaries between round, similarly sized blobs. Give it two interlocking crescents and it cuts them in half instead.

```python
import matplotlib.pyplot as plt
from sklearn.datasets import make_moons

lab = km.labels_
Xm, _ = make_moons(n_samples=300, noise=0.06,
                   random_state=42)
lm = KMeans(n_clusters=2, n_init=10,
            random_state=42).fit_predict(Xm)

colors = np.array(["#8E1C1C", "#2F6B8A", "#C4952E"])
fig, (a, b) = plt.subplots(1, 2, figsize=(10, 4))
a.scatter(df.annual_spend, df.visits_per_month,
          s=14, color=colors[lab])
a.scatter(centers.annual_spend,
          centers.visits_per_month, marker="*",
          s=350, color="black", label="centroid")
a.set_title("k-means on customers: works")
a.set_xlabel("annual_spend ($)")
a.set_ylabel("visits_per_month")
a.legend()
b.scatter(Xm[:, 0], Xm[:, 1], s=14, color=colors[lm])
b.set_title("k-means on crescents: fails")
fig.tight_layout()
fig.savefig("kmeans-works-and-fails.png", dpi=150)
```

The left panel is the success case, with black stars marking the centroids. The right panel shows the failure: each crescent is split across the two clusters. For shapes like these, DBSCAN or hierarchical clustering is a better fit.

## Recap

k-means assigns rows to the nearest centroid, moves centroids to the group means, and repeats. It minimizes inertia, needs scaled features and a chosen k, and is sensitive to starting points, which `k-means++` and `n_init` address. It assumes round, similar-sized groups. Next: how do you choose k in the first place?
