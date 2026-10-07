# Script — Survivorship & Other Data Biases

## Segment 1 (title)

The stylized facts from last lesson describe real properties of markets. This lesson covers the opposite problem: distortions that come not from markets, but from flaws in how historical datasets were built — and they're dangerous because they produce clean, statistically significant, completely wrong results.

## Segment 2 (steps)

Four biases show up constantly. Survivorship bias: most databases only include companies or funds that still exist, so delisted or failed ones vanish and historical average returns look better than they really were. Look-ahead bias: using information in a backtest that wasn't actually available at that simulated point in time, like a restated financial statement. Backfill bias: hedge funds often only start reporting to a database once they already have a good track record, then backfill their history — so the database is stacked with winners. And data-snooping: test enough strategies against the same dataset, and some will look profitable by pure chance.

## Segment 3 (code)

Here's survivorship bias concretely. Building today's trading universe from today's S&P 500 constituent list and running it backward silently excludes every company that was removed for underperforming or going bankrupt. The fix is a point-in-time universe: reconstructing exactly who was actually in the index, or actually investable, as of each historical date.

## Segment 4 (steps)

The defense against all four biases is largely the same discipline. Use a point-in-time universe, not today's survivors. Respect realistic reporting lags — nothing in a simulated decision should use information before it was actually published. And keep a genuine held-out validation period that the strategy was never tuned against, so an in-sample Sharpe ratio doesn't fool you.

## Segment 5 (outro)

These four biases are some of the most common reasons an academically great-looking backtest falls apart in live trading. Next lesson turns from diagnosing bad data to actually cleaning it — the practical techniques you need before any model touches real market data.
