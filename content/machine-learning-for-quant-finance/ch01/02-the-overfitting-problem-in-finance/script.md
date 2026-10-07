# Script — The Overfitting Problem in Finance

## Segment 1 (title)

The last lesson established that financial signal is faint and the market keeps shifting under you. This lesson looks at the direct consequence: it's remarkably easy to convince yourself a strategy works when it doesn't. Backtest overfitting is widely considered the single biggest reason quant strategies that look brilliant on paper fail once real money is involved.

## Segment 2 (code)

Here's a simulation of one thousand trading strategies that are all pure noise, with literally zero real skill built in. We score each by its historical sharpe ratio. Because of basic probability, a handful of these pure noise strategies will clear a sharpe ratio of one and a half to two just by chance, the same way flipping a thousand coins produces a few runs of ten heads in a row. Researchers call this data dredging, or multiple testing bias.

## Segment 3 (steps)

Two more biases compound the problem. Look ahead bias means using information in a backtest that wasn't actually available at that point in time, like testing against an index's current members ten years in the past. Survivorship bias means your universe only includes companies or funds that are still around today, quietly leaving out every failure, which flatters the results because the failures were often the ones most likely to expose a strategy's real weakness.

## Segment 4 (steps)

Combine faint signal, cheap repeated testing, and subtle biases that are easy to miss, and you get a strategy that looks fantastic historically and then does nothing, or loses money, once it's live. Chapter four of this course builds the full defense: walk forward validation, the deflated sharpe ratio, which discounts apparent skill by how many trials it took to find the strategy, and formal methods for detecting backtest overfitting.

## Segment 5 (outro)

A beautiful backtest can be beautiful for reasons that have nothing to do with real skill. Up next, lesson three: labeling financial data, where we ask an even more basic question — what should the model actually be predicting?
