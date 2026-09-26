# Dimensionality Reduction With PCA

Clustering groups rows. Dimensionality reduction does something complementary: it shrinks columns. Real datasets often carry dozens or hundreds of features, many of them saying nearly the same thing. Principal component analysis (PCA) finds a smaller set of new features, called components, that capture as much of the original variation as possible. Analysts use it to visualize high-dimensional data in 2D, to remove redundancy before modeling, and to speed up algorithms that struggle with many columns.

## What you'll learn

- The idea behind principal components
- Why PCA needs scaled data
- How to read explained variance and choose how many components to keep
- How to interpret components through their loadings
- What PCA costs you: interpretability

## The idea

Imagine two features that move together, like a customer's app sessions and email opens. Instead of tracking both, you could draw one line through the cloud of points and describe each customer by their position along it. PCA does this in general: the first component is the direction along which the data varies the most, the second is the direction of the most remaining variation at a right angle to the first, and so on. Each component is a weighted blend of the original columns.

## An illustrative dataset with redundancy

We generate 400 seeded customers with six features that are really driven by two hidden factors: engagement (visits, app sessions, email opens) and value (annual spend, basket size, items bought).

```python
import numpy as np, pandas as pd

rng = np.random.default_rng(42)
n = 400
engagement = rng.normal(0, 1, n)
value = rng.normal(0, 1, n)
df = pd.DataFrame({
  "visits": 5 + 2.0*engagement
            + rng.normal(0, 0.6, n),
  "app_sessions": 12 + 5.0*engagement
            + rng.normal(0, 1.5, n),
  "email_opens": 8 + 3.0*engagement
            + rng.normal(0, 1.2, n),
  "annual_spend": 900 + 300*value
            + rng.normal(0, 60, n),
  "basket_size": 60 + 20*value
            + rng.normal(0, 5, n),
  "items_bought": 25 + 8*value + 0.3*engagement
            + rng.normal(0, 2, n)})

print(round(df.visits.corr(df.app_sessions), 2),
      round(df.annual_spend.corr(df.basket_size), 2),
      round(df.visits.corr(df.annual_spend), 2))
```

The printed correlations are `0.9 0.95 -0.04`. Within each group the features are highly correlated, and across groups they are essentially unrelated. Six columns, but only about two real ideas.

## Fit PCA on scaled data

PCA maximizes variance, so a column measured in thousands would dominate one measured in single digits. Standardize first.

```python
from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler

Xs = StandardScaler().fit_transform(df)
pca = PCA(random_state=42).fit(Xs)
print(pca.explained_variance_ratio_.round(3))
print(pca.explained_variance_ratio_.cumsum().round(3))
```

The ratios are `[0.485 0.46 0.023 0.016 0.009 0.007]` and the running totals are `[0.485 0.945 0.968 0.984 0.993 1.]`. The first two components explain 94.5 percent of all the variance, and the other four add almost nothing. That is a scree pattern: a steep cliff, then a flat tail. The cliff tells you how many components to keep.

You can also ask scikit-learn to choose for you by passing a fraction to `n_components`:

```python
p90 = PCA(n_components=0.90).fit(Xs)
print(p90.n_components_)
```

This prints `2`: the smallest number of components that explains at least 90 percent of the variance.

## Interpreting components with loadings

Each row of `components_` lists how much each original feature contributes to a component.

```python
load = pd.DataFrame(pca.components_[:2].T,
    index=df.columns,
    columns=["PC1", "PC2"]).round(2)
print(load)
```

```
               PC1   PC2
visits       -0.11 -0.57
app_sessions -0.09 -0.57
email_opens  -0.08 -0.57
annual_spend  0.57 -0.09
basket_size   0.57 -0.09
items_bought  0.57 -0.11
```

PC1 is essentially a "value" axis, weighted equally on spend, basket size, and items. PC2 is essentially an "engagement" axis, weighted equally on visits, app sessions, and email opens. PCA rediscovered the two hidden factors we built in. The overall sign of a component is arbitrary, which is why PC2 shows negative weights here; what matters is the pattern.

## Project, plot, and reconstruct

```python
p2 = PCA(n_components=2)
Z = p2.fit_transform(Xs)
print(Z.shape)
rec = p2.inverse_transform(Z)
print(round(((Xs - rec) ** 2).mean(), 3))
```

`Z` has shape `(400, 2)`: every customer described by two numbers instead of six. Mapping back with `inverse_transform` and comparing to the original scaled data gives a mean squared reconstruction error of `0.055`, so very little was lost.

```python
import matplotlib.pyplot as plt

ratios = pca.explained_variance_ratio_
fig, (a, b) = plt.subplots(1, 2, figsize=(10, 4))
a.bar(range(1, 7), ratios, color="#8E1C1C")
a.plot(range(1, 7), ratios.cumsum(), marker="o",
       color="#2F6B8A")
a.set_title("Scree: bars = each, line = cumulative")
a.set_xlabel("component")
a.set_ylabel("share of variance")
sc = b.scatter(Z[:, 0], Z[:, 1], s=14,
               c=df.annual_spend, cmap="viridis")
b.set_title("Customers in PC1 and PC2")
b.set_xlabel("PC1 (value)")
b.set_ylabel("PC2 (engagement)")
fig.colorbar(sc, ax=b, label="annual_spend")
fig.tight_layout()
fig.savefig("pca-scree-and-projection.png", dpi=150)
```

## The trade-off

PCA is a rotation plus a discard. What you gain is fewer, uncorrelated features and a picture you can look at. What you lose is easy interpretation: "PC2" is a blend, not a column your stakeholders know. PCA is also linear, so it captures straight-line structure only. Use it for visualization, for taming correlated features, and as a preprocessing step before k-means on wide data. Fit it on training data only, as with any transform, to avoid leakage.

## Recap

PCA builds ordered, uncorrelated components that capture the most variance. Scale first, read the explained-variance curve to decide how many to keep, and use loadings to name them. Next, the Capstone: you will use these tools, together with everything from earlier chapters, to build your first models end to end.
