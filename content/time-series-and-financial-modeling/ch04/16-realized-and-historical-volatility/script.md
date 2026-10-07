# Script — Realized & Historical Volatility

## Segment 1 (title)

Chapter three modeled where a series is headed next. Chapter four turns to something arguably more important in finance: how much a series moves, its volatility. Before building ARCH and GARCH models, this lesson covers how volatility is actually measured from data.

## Segment 2 (steps)

Asset returns themselves are famously hard to predict. Their volatility, though, clusters strongly — large moves tend to follow large moves, and calm periods tend to follow calm ones. That asymmetry, where volatility is forecastable even when returns aren't, is why volatility modeling is its own discipline, underlying option pricing, position sizing, and risk measures like value at risk.

## Segment 3 (code)

The simplest estimator is historical, or rolling, volatility: the standard deviation of returns over a trailing window, like twenty days. It's easy to compute by calling rolling and std on a returns series, then annualizing by multiplying by the square root of two hundred fifty two for daily data. The tradeoff is that every observation in the window counts equally, so it can jump when an old value drops out.

## Segment 4 (code)

Realized volatility improves on that by using higher frequency intraday returns within each day instead of one close-to-close number. It's the square root of the sum of squared intraday returns for that day, computed here by squaring five-minute returns, grouping by date, summing, and taking the square root. More observations per day means a statistically more efficient, less noisy estimate of that day's true volatility.

## Segment 5 (outro)

Historical volatility is the simple, equally weighted rolling estimator; realized volatility sharpens it with intraday data when that's available. Both just measure volatility after the fact. Next, lesson seventeen introduces ARCH and GARCH, which model volatility as something that evolves and can actually be forecast forward.
