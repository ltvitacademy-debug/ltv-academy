# Script — Transaction Costs & Slippage

## Segment 1 (title)

This is where the course gets honest. A backtest that ignores trading frictions is measuring a strategy that cannot exist — every real trade costs something beyond the quoted price, and for many strategies that cost eats most of the apparent edge. Let's model it properly.

## Segment 2 (steps)

Three separate things get lumped into "trading costs." Commissions are the explicit, known fee a broker charges. Spread cost is the implicit cost of crossing the bid-ask spread with a market order — real even at zero commission. And slippage is the gap between the price you expected when you decided to trade and the price you actually got filled at. A backtest that only models commissions is still missing most of the real friction.

## Segment 3 (code)

The standard way to charge cost is a fraction of trade value, applied only when the position actually changes — holding overnight is free, changing the position is not. That detail matters enormously, because it means cost scales with how often a strategy trades, not with how much capital it manages.

## Segment 4 (code)

A fixed slippage number ignores that slippage gets worse in volatile, illiquid markets. A better model scales slippage with recent realized volatility, and critically, it always works against the trader — buys fill a little higher, sells fill a little lower, never the reverse on average. That's what competitive execution actually looks like.

## Segment 5 (outro)

A daily-rebalancing strategy pays its round-trip cost about 252 times a year; a monthly one pays it about 12 times — the exact same signal can be a winner or a loser purely based on that turnover difference once costs are honest. Next, lesson 17: what happens when your own order is large enough to move the price against you.
