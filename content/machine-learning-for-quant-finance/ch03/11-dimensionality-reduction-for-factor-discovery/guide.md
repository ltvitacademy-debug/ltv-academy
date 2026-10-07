# Dimensionality Reduction for Factor Discovery

A panel of hundreds of asset returns is highly redundant — most stocks move together to some degree, driven by a much smaller number of underlying forces: the overall market, a value/growth tilt, an interest-rate sensitivity, and so on. Dimensionality reduction tries to recover those underlying forces directly from the return data itself, without being told in advance what they are. This lesson focuses on Principal Component Analysis (PCA), the workhorse tool for this job, and the data-driven cousin of classical factor models like the Arbitrage Pricing Theory (APT).

## What you'll learn

- How PCA on a returns panel approximates a statistical factor model
- How to read `explained_variance_ratio_` and why the first component is usually a "market factor"
- The practical steps: standardizing returns, fitting PCA, and interpreting loadings
- Where ICA and autoencoders fit as alternatives to PCA

## PCA as a statistical factor model

Classical factor models like the APT assume returns are driven by a handful of common factors plus idiosyncratic noise. PCA doesn't assume anything about what those factors *are* — it just finds the directions in return-space that explain the most variance, in order. Applied to a wide panel of returns, those directions often turn out to look a lot like real factors.

```python
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA

# returns: DataFrame, rows = dates, columns = tickers
scaler = StandardScaler()
returns_std = scaler.fit_transform(returns.dropna())

pca = PCA(n_components=10, random_state=0)
factor_scores = pca.fit_transform(returns_std)   # the latent factor time series

loadings = pd.DataFrame(
    pca.components_.T,          # shape: n_assets x n_components
    index=returns.columns,
    columns=[f"PC{i+1}" for i in range(pca.n_components_)],
)
```

Standardizing first matters because PCA is sensitive to scale — without it, a handful of high-volatility names would dominate the variance the components chase, independent of any real common structure.

## Reading `explained_variance_ratio_`

`pca.explained_variance_ratio_` tells you what fraction of total return variance each component accounts for. For a broad equity panel, it's typical to see the first component alone explain 30-50%+ of total variance, with a sharp drop-off after that:

```python
print(pca.explained_variance_ratio_[:5])
# e.g. array([0.41, 0.07, 0.04, 0.03, 0.02])
```

That first component almost always loads positively on nearly every asset — because nearly everything in an equity universe moves with the broad market to some degree. It's standard practice to call PC1 the "market factor" for exactly this reason, even though PCA was never told what "the market" is; it emerged purely from shared variance. Later components are harder to name cleanly, but they often align loosely with known style factors like size or value, or with sector groupings.

## Using the factors

Once you have `factor_scores`, they can be used just like any other feature set: as inputs to a supervised model predicting returns, as a way to risk-decompose a portfolio ("how much of my P&L is just PC1 exposure?"), or as a dimensionality-reduced input that avoids overfitting a model trained on hundreds of raw, correlated return series.

## Alternatives: ICA and autoencoders

PCA finds orthogonal, variance-maximizing directions, but it isn't the only option:

- **ICA** (`sklearn.decomposition.FastICA`) looks for statistically *independent* components rather than merely uncorrelated ones, which can better separate genuinely distinct sources of return variation when they aren't Gaussian.
- **Autoencoders** (a small neural network trained to compress and reconstruct the input) learn a nonlinear latent representation, which can capture factor structure that a linear method like PCA misses — at the cost of being much less interpretable and needing more data to train reliably.

In practice, PCA remains the default first pass because its components are linear, reproducible, and easy to sanity-check; ICA and autoencoders are reached for when PCA's linear factors clearly aren't capturing something structural in the data.

## Key terms

| Term | Meaning |
|---|---|
| Principal Component Analysis (PCA) | Finds orthogonal directions in the data that successively maximize explained variance |
| `explained_variance_ratio_` | Fraction of total variance attributed to each principal component |
| Loadings | How much each original asset contributes to a given principal component |
| Market factor | The informal name for PC1 in an equity returns panel, since it loads broadly across nearly all assets |
| ICA | Independent Component Analysis — finds statistically independent, not just uncorrelated, components |

## Recap

PCA on a return panel recovers latent factors directly from the data, with the first component almost always resembling a broad market factor and `explained_variance_ratio_` telling you how much each one matters; ICA and autoencoders are nonlinear or non-Gaussian alternatives when PCA's linear factors fall short. Next, Lesson 12: Anomaly Detection in Markets, where we shift from describing normal structure to flagging what breaks it.
