# Hierarchical Risk Parity

Mean-variance (Markowitz) optimization asks for a weight vector that maximizes return for a given risk, and to do that it needs to invert the covariance matrix. That inversion is the model's Achilles' heel: with many correlated assets and noisy covariance estimates, the inverse becomes numerically unstable, and small estimation errors get amplified into wild, concentrated, and often nonsensical weights. Hierarchical Risk Parity (HRP), introduced by Marcos López de Prado, sidesteps the inversion entirely by using the *clustering structure* of the correlation matrix itself to allocate weights.

## What you'll learn

- Why matrix inversion makes mean-variance optimization unstable in practice
- The three steps of HRP: tree clustering, quasi-diagonalization, recursive bisection
- A real code sketch using `scipy.cluster.hierarchy.linkage` plus a recursive weight-allocation function
- Why HRP tends to produce more stable, better-diversified out-of-sample weights

## Why Markowitz optimization breaks down

Markowitz's optimal weights come from a formula involving the inverse of the covariance matrix, `Σ⁻¹`. When assets are highly correlated (a common state in equity markets), `Σ` is close to singular, and its inverse is extremely sensitive to small errors in the estimated correlations — which is exactly where real-world covariance estimates are weakest. The practical result is notorious: Markowitz portfolios frequently load up heavily on one or two assets whose estimated covariance happened to look slightly favorable, and those weights can flip wildly with a tiny change in the input data.

## The three steps of HRP

**1. Tree clustering.** Convert the correlation matrix into a distance matrix (as in Lesson 10) and run hierarchical clustering with `scipy.cluster.hierarchy.linkage` to build a tree that groups similar assets together.

**2. Quasi-diagonalization.** Reorder the assets according to the clustering tree's leaf order, so that similar assets sit next to each other in the correlation matrix. This doesn't change any values — it just reorganizes rows/columns so the matrix is approximately block-diagonal, which is what makes the next step sensible.

**3. Recursive bisection.** Starting from the full, reordered list of assets, repeatedly split each group in half and allocate weight *between* the two halves inversely proportional to each half's variance (so the lower-variance half gets more weight), then recurse into each half until every asset has a weight.

```python
import numpy as np
import pandas as pd
from scipy.cluster.hierarchy import linkage, dendrogram
from scipy.spatial.distance import squareform

def correlation_distance(corr):
    return np.sqrt(0.5 * (1 - corr))

# Step 1: tree clustering
dist = correlation_distance(corr)
link = linkage(squareform(dist.values, checks=False), method="single")

# Step 2: quasi-diagonalization — the dendrogram's leaf order groups
# similar assets together without changing any correlation values
leaf_order = dendrogram(link, no_plot=True)["leaves"]
sorted_tickers = corr.columns[leaf_order].tolist()

# Step 3: recursive bisection
def cluster_variance(cov, items):
    cov_slice = cov.loc[items, items]
    ivp = 1 / np.diag(cov_slice)      # inverse-variance weights within the cluster
    ivp /= ivp.sum()
    return ivp @ cov_slice @ ivp

def recursive_bisection(cov, sorted_items):
    weights = pd.Series(1.0, index=sorted_items)
    clusters = [sorted_items]
    while clusters:
        clusters = [
            c[start:stop]
            for c in clusters if len(c) > 1
            for start, stop in ((0, len(c) // 2), (len(c) // 2, len(c)))
        ]
        for i in range(0, len(clusters), 2):
            left, right = clusters[i], clusters[i + 1]
            var_left = cluster_variance(cov, left)
            var_right = cluster_variance(cov, right)
            alloc_left = 1 - var_left / (var_left + var_right)
            weights[left] *= alloc_left
            weights[right] *= (1 - alloc_left)
    return weights

hrp_weights = recursive_bisection(cov, sorted_tickers)
```

No matrix inversion appears anywhere in this process — every allocation decision only ever compares the variance of one sub-cluster to another.

## Why HRP tends to be more stable

Because HRP only ever asks "which of these two groups is riskier" using simple variance ratios, a noisy estimate in one corner of the correlation matrix doesn't blow up the whole allocation the way an unstable matrix inverse can. In backtests from López de Prado's original research, HRP portfolios didn't always have the highest in-sample Sharpe ratio, but they were noticeably more robust out-of-sample — exactly the trade-off that matters once you remember (Lesson 2) that in-sample performance in finance is cheap to buy and expensive to trust.

## Key terms

| Term | Meaning |
|---|---|
| Mean-variance optimization | Markowitz's classic framework; requires inverting the covariance matrix |
| Tree clustering | Hierarchical clustering of the correlation/distance matrix via `scipy.cluster.hierarchy.linkage` |
| Quasi-diagonalization | Reordering assets by cluster so the correlation matrix becomes approximately block-diagonal |
| Recursive bisection | Allocating weight between sibling clusters inversely to their variance, recursively down to single assets |
| Hierarchical Risk Parity (HRP) | López de Prado's matrix-inversion-free portfolio construction method using these three steps |

## Recap

HRP replaces Markowitz's unstable matrix inversion with a three-step, purely comparative process — cluster assets, reorder them so the correlation matrix is quasi-diagonal, then recursively split weight between sibling clusters by variance — producing allocations that tend to hold up better out-of-sample. That closes out Chapter 3 on unsupervised learning. Next, Lesson 14: Walk-Forward Validation, where Chapter 4 begins the single most important topic in this course — validating financial ML models without letting the future leak into the past.
