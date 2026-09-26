# Choosing the Number of Clusters

k-means makes you commit to k before it starts, and nothing in the data announces the right answer. Pick too few and different customers get lumped together; pick too many and you split natural groups into hair-thin slices nobody can act on. This lesson gives you two standard diagnostics, the elbow method and the silhouette score, and a third, more important check: does the answer make business sense?

## What you'll learn

- Why inertia alone can never choose k
- How to read an elbow plot
- How to compute and compare silhouette scores across k
- How to combine the numbers with judgment
- What to do when the evidence is ambiguous

## Why inertia keeps falling

Inertia is the total squared distance from rows to their centroids. Add more centroids and every row can only get closer to one, so inertia decreases as k rises, all the way to zero when k equals the number of rows. You cannot simply pick the k with the lowest inertia. Instead you look for the point of diminishing returns.

## Sweep k and record both numbers

We reuse the seeded illustrative customers from the previous lessons, with three real groups built in. The loop fits k-means for k from 2 to 8 and records inertia and silhouette score each time.

```python
import numpy as np, pandas as pd
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import silhouette_score

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

ks, inertias, sils = [], [], []
for k in range(2, 9):
    m = KMeans(n_clusters=k, n_init=10,
               random_state=42).fit(Xs)
    ks.append(k)
    inertias.append(m.inertia_)
    sils.append(silhouette_score(Xs, m.labels_))

print(pd.DataFrame({"k": ks,
    "inertia": np.round(inertias, 1),
    "silhouette": np.round(sils, 3)}))
```

The output:

```
   k  inertia  silhouette
0  2    304.6       0.552
1  3     52.4       0.773
2  4     42.3       0.642
3  5     33.0       0.515
4  6     28.5       0.514
5  7     24.1       0.526
6  8     21.7       0.523
```

## The elbow method

Look at the inertia column. Going from k = 2 to k = 3 drops inertia from 304.6 to 52.4, a huge improvement. From 3 to 4 the drop is only about 10, and every step after that shaves off even less. The curve bends sharply at k = 3, like an elbow, and that bend is your candidate. With messy real data the elbow is often gentle and debatable, which is why we add a second opinion.

## The silhouette score

The silhouette score for a point compares its average distance to its own cluster with its average distance to the nearest other cluster. It runs from -1 to 1, and the overall score is the mean across points. Look at the last column: it peaks at 0.773 for k = 3 and then falls to 0.642 at k = 4 and to about 0.51 to 0.53 beyond. Unlike inertia, silhouette can go down as k rises, so it can name a maximum directly. Here both methods agree on k = 3, which matches the three groups we built in.

## Plotting both

```python
import matplotlib.pyplot as plt

fig, (a, b) = plt.subplots(1, 2, figsize=(10, 4))
a.plot(ks, inertias, marker="o", color="#8E1C1C")
a.axvline(3, color="#6B6259", linestyle="--")
a.set_title("Elbow: inertia vs. k")
a.set_xlabel("k")
a.set_ylabel("inertia")
b.plot(ks, sils, marker="o", color="#2F6B8A")
b.axvline(3, color="#6B6259", linestyle="--")
b.set_title("Silhouette vs. k")
b.set_xlabel("k")
b.set_ylabel("mean silhouette score")
fig.tight_layout()
fig.savefig("choosing-k.png", dpi=150)
```

## When the evidence is ambiguous

Real customer data rarely gives a clean answer. Some practical rules:

- If the elbow is vague, trust the silhouette, and if both are vague, compare a few candidate values of k by profiling the clusters.
- Prefer the smaller k when scores are close. Fewer segments are easier to explain and act on.
- Ask whether each cluster is large enough to matter and different enough to treat differently. A marketing team may only be able to run four campaigns, which is a legitimate constraint on k.
- Check stability: rerun with different seeds or on a bootstrap sample. If the groups keep changing, they are not solid.

## Recap

Inertia always falls with k, so look for the elbow; silhouette gives a direct peak; and business usefulness has the final say. Here both metrics pointed to k = 3. Next lesson: hierarchical clustering, which lets you avoid committing to k up front by building a tree of merges.
