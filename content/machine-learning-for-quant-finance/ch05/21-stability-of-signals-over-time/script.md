# Script — Stability of Signals Over Time

## Segment 1 (title)

A feature can pass every test from the last two lessons, ranking highly in permutation importance and showing a clean pattern in a SHAP plot, and still be a bad signal to trade on. It might only have worked during the specific stretch of history you happened to test it on.

## Segment 2 (steps)

Chapter one introduced non-stationarity: financial relationships change regime, and a signal that predicted returns well in one market environment can go flat or reverse in another. Feature importance is normally computed once, over one block of data, which quietly assumes the relationship held steady the whole time. A signal that was powerfully predictive for three of your five years of data and useless for the other two can still show up with a perfectly healthy average importance score.

## Segment 3 (code)

The fix is to stop measuring importance once and measure it repeatedly, in sliding windows across time. Take something like a year-long window, step it forward a quarter at a time, and recompute permutation importance inside each window. Plotting the result turns a single summary number into a time series. A stable feature looks like a reasonably consistent line. An unstable one swings from top-ranked to near zero and back, window over window, which a single full-sample check would completely hide.

## Segment 4 (code)

The standard tool quants use for this is the information coefficient, the rank correlation between a signal's predictions and the actual forward returns, computed period by period. Watching that series over time, what's called information coefficient decay, tells you whether a signal's edge is holding, fading gradually, or has already collapsed or flipped sign in the back half of your data.

## Segment 5 (outro)

A backtest's headline Sharpe ratio is an average, and averages hide exactly this kind of regime-dependent behavior. Checking rolling importance and information coefficient stability is how you catch an unstable signal before deploying capital on it. That closes chapter five. Chapter six opens Modern Topics, starting with lesson twenty-two: sequence models for market data.
