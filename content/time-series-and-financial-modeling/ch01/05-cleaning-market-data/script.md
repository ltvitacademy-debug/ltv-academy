# Script — Cleaning Market Data

## Segment 1 (title)

Chapter one has covered what to compute, what to compute it from, what real returns should look like, and how datasets can be biased. This lesson closes the chapter with the hands-on part: the practical checks every quant runs on a raw data file before any model is allowed near it.

## Segment 2 (steps)

Real market data feeds have predictable problems. Gaps: missing rows on days the market was actually open. Duplicates: the same timestamp appearing twice, sometimes with conflicting values. Stale prices: the same price repeated for days running, which usually means the instrument wasn't actually trading, not that it was genuinely flat. And bad ticks: a single implausible print, like a price with a misplaced decimal.

## Segment 3 (code)

Before you flag anything as a gap, check it against the real exchange trading calendar rather than assuming every calendar day needs a row. Pandas market calendars gives you the NYSE's actual schedule, and comparing that against your price index tells you exactly which missing dates are real gaps, not holidays or weekends.

## Segment 4 (code)

For bad ticks, remember chapter one, lesson three: real returns have fat tails, so a big move by itself isn't the problem. A rolling median and median absolute deviation, or MAD, gives a robust threshold that's much harder for the outliers themselves to distort than a rolling mean and standard deviation would be. Flag anything with a robust z-score beyond about eight, then review it by hand — sometimes that outlier is real news, not bad data.

## Segment 5 (outro)

Align to the trading calendar, resolve duplicates, flag bad ticks robustly, review before dropping, and forward-fill only short gaps with an explicit limit. That closes chapter one's full pipeline from raw price to trustworthy return. Chapter two starts the actual time series toolkit, beginning with stationarity and the Augmented Dickey-Fuller test.
