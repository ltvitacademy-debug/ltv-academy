# Script — White Noise & Random Walks

## Segment 1 (title)

Lesson six introduced the random walk as the canonical non-stationary, unit-root process. This lesson defines it properly alongside its stationary building block, white noise, and shows exactly how the two relate.

## Segment 2 (code)

White noise has a precise definition: zero mean at every point in time, constant variance at every point in time, and zero correlation between any two different points in time. Notice what it doesn't require — it doesn't require Normality, and it doesn't require full independence, only zero linear correlation. White noise is stationary by construction, trivially satisfying every condition from lesson six.

## Segment 3 (code)

A random walk is defined as today's value equals yesterday's value plus a white noise innovation. Unroll that recursively and a random walk is literally the running total, the cumulative sum, of white noise innovations. That's exactly why its variance grows linearly with time — it's non-stationary by construction, and it's the unit-root case from lesson six.

## Segment 4 (steps)

Here's the payoff. Take the first difference of a random walk — today's value minus yesterday's — and you get back exactly the white noise innovation. Differencing undoes the random walk completely. That's the entire logic behind the I, for integrated, in ARIMA next chapter: a series that needs one difference to become stationary is integrated of order one. And it's why financial prices looking like a random walk isn't a modeling failure — under an efficient market, only genuinely new, unpredictable information should move a price, which is exactly a white noise innovation.

## Segment 5 (outro)

White noise is stationary and structureless; a random walk is its cumulative sum and non-stationary; differencing connects the two. Next lesson takes this further: cointegration, where two non-stationary series can combine into something stationary after all — the foundation of pairs trading.
