# Script — Clustering Assets & Regimes

## Segment 1 (title)

Unsupervised learning looks for structure with no target variable to predict. In finance, that shows up in two very practical places: grouping assets that behave alike, and figuring out which market regime we're currently in. Nobody hands you the ground truth for either one — you have to discover it.

## Segment 2 (steps)

Clustering does two different jobs here. First, clustering assets: group tickers that move together so you can see when you're not actually diversified, just holding five names from the same cluster. Second, clustering time periods: group days or weeks by their return and volatility behavior into regimes like bull, bear, high volatility, or low volatility. Both are unsupervised, because nothing in the data comes pre-labeled as "this is a bear regime."

## Segment 3 (code)

To cluster assets, a common starting feature is the pairwise correlation of returns. But correlation itself isn't a distance — it's largest for identical behavior — so it gets transformed into a true distance first, something like the square root of one minus the correlation, scaled by a half. That distance matrix feeds directly into agglomerative clustering, which can accept a precomputed distance matrix and group assets into, say, five clusters using average linkage.

## Segment 4 (steps)

For regimes, a Gaussian mixture model usually beats plain k-means, because it's a genuine probabilistic model built on features like twenty-day rolling return and volatility. Instead of forcing a hard label on every day, it gives you predict-proba: a day can be seventy percent high-volatility regime and thirty percent transitioning, which matches how markets actually behave. And in both cases, the number of clusters isn't something the data proves — it's a choice you guide with diagnostics like the elbow method or the silhouette score.

## Segment 5 (outro)

Clustering turns an unlabeled pile of return data into structure twice over — grouping assets for diversification, and grouping time into regimes with real probabilities attached. Next, lesson eleven: dimensionality reduction for factor discovery, where PCA finds the latent factors driving all of those returns at once.
