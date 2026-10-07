# Script — Building a Simple Backtester

## Segment 1 (title)

Last lesson described vectorized and event-driven backtests conceptually. This time we build one of each, for the same moving-average crossover strategy, so you can see exactly where they agree, where they diverge, and why.

## Segment 2 (code)

The vectorized version is maybe twenty lines: compute a fast and slow moving average, compare them for a signal, shift that signal forward a bar, multiply by returns, and compound into an equity curve. Fill the NaNs from the warm-up period so they don't poison the curve. That's the whole engine, and it runs years of data almost instantly.

## Segment 3 (code)

The event-driven version does the same thing with an explicit loop and a portfolio object tracking cash and shares. At each step, the decision uses yesterday's completed bar — not today's — and the trade fills at today's open. The loop structure itself enforces that only already-known information drives the trade, the same guarantee the vectorized version gets from shifting.

## Segment 4 (steps)

Run both on the same data and you'll get close but not identical numbers, and the gap is informative. The vectorized version assumes a continuous position earning the full close-to-close return; the event-driven version fills at the next open and buys whole shares, leaving leftover cash. Warm-up handling can differ too. None of that is a bug — it's a reminder that the assumptions baked into your code are themselves part of what you're measuring, and it's worth running both versions side by side at least once so you internalize exactly where they diverge.

## Segment 5 (outro)

Whatever engine you build, report more than a final return — the equity curve, CAGR, volatility, Sharpe, trade count, and drawdown. Next, lesson 14: letting a real open-source framework handle these mechanics for you, consistently.
