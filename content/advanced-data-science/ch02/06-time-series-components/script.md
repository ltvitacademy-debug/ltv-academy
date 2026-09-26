# Script — Time Series Components

## Segment 1 (title)

A time series is measurements in time order: monthly sales, daily visits, hourly power use. The order matters, so the habits from ordinary tables need rethinking. Before forecasting anything, we need to see what a series is made of.

## Segment 2 (steps)

Most series combine four components. Trend is the long-run direction. Seasonality is a pattern that repeats at a fixed, known period, like a December peak. Cycles rise and fall without a fixed length, like business cycles. And noise is whatever is left over.

## Segment 3 (code)

Here's an illustrative series: five years of monthly sales. We build in a trend of one point five units a month, a seasonal pattern that peaks in November and December, and random noise. Because we built it, we can check what decomposition recovers. Notice the date index with monthly frequency.

## Segment 4 (code)

We call seasonal decompose with period twelve. The recovered trend slope is one point five six, close to the true one point five. The seasonal pattern has the right shape, with the big December peak. The trend has twelve missing values, because the classical method can't compute a centered average near the ends.

## Segment 5 (screenshot)

This is the output of the code above. Observed on top, then the trend, the seasonal pattern repeating every year, and the residual. The residual should look random, and here it does.

## Segment 6 (code)

Seasonality can be additive or multiplicative. In an additive series the swing stays the same size. In a multiplicative series it grows with the level. In our second series, the yearly swing grew from about one hundred in year one to about one eighty-nine in year five, so we use the multiplicative model, and the seasonal output becomes factors around one.

## Segment 7 (steps)

Remember: decomposition is a diagnostic, not a forecast. Pick the right period. Check whether peaks grow with the level. Try STL for seasonality that drifts. And if the residual still shows structure, something was missed.

## Segment 8 (outro)

Next, stationarity and autocorrelation.
