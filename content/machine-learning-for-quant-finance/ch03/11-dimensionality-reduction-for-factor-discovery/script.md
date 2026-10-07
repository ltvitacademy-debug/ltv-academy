# Script — Dimensionality Reduction for Factor Discovery

## Segment 1 (title)

A panel of hundreds of asset returns is highly redundant. Most stocks move together to some degree, driven by a much smaller number of underlying forces — the overall market, a value or growth tilt, rate sensitivity. Dimensionality reduction tries to recover those forces directly from the data, without being told in advance what they are.

## Segment 2 (steps)

Classical factor models like the arbitrage pricing theory assume returns are driven by a handful of common factors plus noise. Principal component analysis doesn't assume what those factors are — it just finds the directions in return space that explain the most variance, in order. Applied to a wide panel of returns, those directions often end up looking a lot like real factors. One practical detail matters a lot here: you standardize the returns first, or a handful of high-volatility names will dominate the variance the components chase for reasons that have nothing to do with real common structure.

## Segment 3 (code)

Fitting it is a few lines: scale the returns, fit a PCA with some number of components, and transform to get the latent factor time series. The explained variance ratio is what you read afterward — for a broad equity panel it's typical to see the first component alone explain thirty to fifty percent or more of total variance, with a sharp drop-off after that. That first component almost always loads positively on nearly every asset, which is exactly why it gets called the market factor, even though PCA was never told what the market is.

## Segment 4 (steps)

PCA isn't the only option. Independent component analysis looks for components that are statistically independent, not merely uncorrelated, which can separate distinct sources of variation when they aren't Gaussian. Autoencoders, small neural networks trained to compress and reconstruct the input, learn nonlinear latent factors that PCA's straight lines can miss, at the cost of being far less interpretable and needing more data. In practice PCA stays the default first pass because its components are linear, reproducible, and easy to sanity-check.

## Segment 5 (outro)

PCA on a returns panel recovers latent factors straight from the data, with the first component almost always resembling a broad market factor. Next, lesson twelve: anomaly detection in markets, where we shift from describing normal structure to flagging what breaks it.
