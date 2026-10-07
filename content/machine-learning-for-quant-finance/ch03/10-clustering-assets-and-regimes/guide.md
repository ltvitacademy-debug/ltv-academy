# Clustering Assets & Regimes

Unsupervised learning looks for structure in data with no target variable to predict. In finance that structure shows up in two very practical places: grouping assets that behave alike, and labeling which "regime" the market is currently in. Both problems are a natural fit for clustering, because nobody hands you a ground-truth list of "which stocks are really the same trade" or "today is a high-volatility day" — you have to discover it from the data.

## What you'll learn

- Why asset grouping and regime detection are both unsupervised, not supervised, problems
- How to turn a return-correlation matrix into a distance metric that `AgglomerativeClustering` and `KMeans` can use
- How `GaussianMixture` differs from `KMeans` — soft, probabilistic regime membership instead of one hard label
- Why the "right" number of clusters is itself a modeling choice, not a fact

## Clustering assets by correlation structure

A common first feature set is simply the pairwise correlation of asset returns. Correlation isn't a distance — it's largest (1.0) for identical behavior — so it needs to be converted before most clustering algorithms can use it:

```python
import numpy as np
import pandas as pd
from sklearn.cluster import KMeans, AgglomerativeClustering

# returns: DataFrame of daily returns, one column per ticker
corr = returns.corr()

# A standard correlation-to-distance transform: 0 for perfectly correlated
# assets, 2 for perfectly anti-correlated assets.
dist = np.sqrt(0.5 * (1 - corr))

agg = AgglomerativeClustering(
    n_clusters=5,
    metric="precomputed",   # we're handing it a distance matrix directly
    linkage="average",
)
asset_clusters = agg.fit_predict(dist.values)

clusters = pd.Series(asset_clusters, index=corr.columns, name="cluster")
```

`AgglomerativeClustering` with `metric="precomputed"` is useful here because it lets you plug in a domain-specific distance (correlation distance) instead of being limited to Euclidean distance on raw features. `KMeans`, by contrast, needs actual feature vectors — it's commonly run instead on something like each asset's rolling volatility, momentum, and sector dummies, rather than directly on a correlation matrix.

Either way, the output is the same shape: a label per asset. Traders use these clusters for diversification (don't hold five names from the same cluster thinking you're diversified) and for pair selection in relative-value strategies.

## From asset clusters to market regimes

The same toolbox applies to a completely different axis: instead of clustering *assets*, you cluster *time periods* to find market regimes — bull/bear, high-vol/low-vol, risk-on/risk-off.

```python
from sklearn.mixture import GaussianMixture

features = pd.DataFrame({
    "ret_20d": market_returns.rolling(20).mean(),
    "vol_20d": market_returns.rolling(20).std(),
}).dropna()

gmm = GaussianMixture(n_components=4, covariance_type="full", random_state=0)
gmm.fit(features)

regime = gmm.predict(features)            # hard label per day, 0-3
regime_proba = gmm.predict_proba(features)  # soft probabilities per regime
```

`GaussianMixture` is often preferred over `KMeans` for regimes because it's a genuine probabilistic model: `predict_proba` tells you the market is "70% high-vol regime, 30% transitioning," rather than forcing a single hard label on a day that's genuinely ambiguous. `KMeans` assumes spherical, equal-size clusters; `GaussianMixture` with `covariance_type="full"` allows each regime to have its own shape and variance, which fits volatility clustering much better.

## Choosing the number of clusters

Nothing in the data tells you the "true" number of regimes or asset groups — `n_clusters` and `n_components` are hyperparameters you choose. The usual diagnostics are the elbow method (plot within-cluster variance against `k` and look for a kink) and the silhouette score (`sklearn.metrics.silhouette_score`, which rewards tight, well-separated clusters). Treat the final choice as a modeling decision guided by these diagnostics plus domain sense — four volatility regimes is a common, interpretable choice; there's no formula that proves it's correct.

## Key terms

| Term | Meaning |
|---|---|
| Correlation distance | A transform of a correlation matrix (e.g. `sqrt(0.5 * (1 - corr))`) into a true distance metric for clustering |
| `AgglomerativeClustering` | Hierarchical clustering that can accept a precomputed distance matrix |
| `GaussianMixture` | A probabilistic clustering model giving soft, per-cluster membership probabilities |
| Regime | A persistent market state (e.g. high-vol vs. low-vol) inferred by clustering, not directly observed |
| Silhouette score | A diagnostic for how well-separated and tight a clustering's clusters are, used to help pick `k` |

## Recap

Clustering turns an unlabeled pile of return data into usable structure twice over: grouping assets by correlation for diversification, and grouping time periods by return/volatility features into market regimes, with `GaussianMixture` giving you soft regime probabilities instead of a single hard call. Next, Lesson 11: Dimensionality Reduction for Factor Discovery, where we'll use PCA on the same kind of return panel to find the latent factors driving all of it at once.
