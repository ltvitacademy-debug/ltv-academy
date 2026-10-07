# Transaction Costs & Slippage

This is where the course gets honest. A backtest that ignores trading frictions is measuring a strategy that cannot exist — every real trade costs something beyond the quoted price, and for many strategies, especially higher-turnover ones, those costs consume most or all of the apparent edge. This lesson covers the two biggest frictions — commissions/fees and slippage — and how to model each one so your backtest's numbers mean something.

## What you'll learn

- The difference between commissions, spread cost, and slippage — three distinct frictions often lumped together
- How to model transaction costs as a fraction of trade value
- How to model slippage as a function of volatility and spread, not a fixed guess
- Why high-turnover strategies are disproportionately damaged by frictions
- A worked example showing how much apparent edge frictions can erase

## Three distinct frictions

It's tempting to lump "trading costs" into one number, but three separate things are happening every time an order executes:

1. **Commissions / fees** — the explicit amount a broker or exchange charges per trade. Simple, known in advance, easy to model exactly.
2. **Spread cost** — the gap between the bid price (what you'd receive selling) and the ask price (what you'd pay buying). A market order crossing the spread pays roughly half the bid-ask spread as an implicit cost, even with zero commission.
3. **Slippage** — the difference between the price you expected (e.g. the last quoted price when you decided to trade) and the price you actually got filled at, caused by the market moving between your decision and your fill, or by your own order moving the price (which overlaps with market impact, covered in Lesson 17).

A backtest that models only commissions and ignores spread and slippage will show an edge that is systematically too good — often by an amount larger than the commission itself.

## Modeling transaction costs as a fraction of trade value

The simplest and most common cost model charges a fixed fraction of each trade's dollar value, which bundles commissions and an approximate spread cost into one number:

```python
import pandas as pd

def apply_transaction_costs(position: pd.Series, price: pd.Series, cost_bps: float = 10):
    """
    cost_bps: round-trip cost in basis points of trade value (10 bps = 0.10%).
    Cost is charged only when the position actually CHANGES — holding
    a position overnight is free; changing it is not.
    """
    trade_value = (position.diff().abs() * price).fillna(0)
    cost = trade_value * (cost_bps / 10_000)
    return cost

position = signal.shift(1).fillna(0)       # from Lesson 11's look-ahead guard
daily_ret = price.pct_change().fillna(0)
gross_pnl = position * daily_ret * price.shift(1)     # dollar P&L before costs
costs = apply_transaction_costs(position, price, cost_bps=10)
net_pnl = gross_pnl - costs
```

The critical detail: cost is charged on `position.diff().abs()` — the *change* in position — not on the position itself. A strategy that enters once and holds for a year pays this cost once; a strategy that flips in and out of the market every day pays it every single day, which is exactly why turnover matters so much (below). A realistic `cost_bps` for a liquid, large-cap US stock might be in the 5-15 bps round-trip range for a retail-sized order; for less liquid instruments it can be dramatically higher — this is a number you should source from real brokerage fee schedules and bid-ask spread data for your actual instrument, never assume a textbook value applies universally.

## Modeling slippage as a function of volatility and spread

A fixed slippage assumption (e.g. "always 2 bps") ignores an obvious reality: slippage is worse when markets are volatile or illiquid, and smaller when they're calm and liquid. A more realistic model scales slippage with recent volatility:

```python
def estimate_slippage(price: pd.Series, lookback: int = 20, k: float = 0.1):
    """
    Illustrative volatility-scaled slippage model: slippage (in price terms)
    is a fraction k of recent realized volatility, reflecting that a wider,
    choppier market makes it harder to get filled near the last quoted price.
    k is a calibration constant you'd fit to your own historical fill data.
    """
    daily_vol = price.pct_change().rolling(lookback).std() * price
    slippage_per_share = k * daily_vol
    return slippage_per_share.fillna(0)

slip = estimate_slippage(price)
# Buys fill WORSE (higher) than quoted; sells fill WORSE (lower) than quoted —
# slippage always works against the trader, never in their favor, on average.
fill_price_buy = price + slip
fill_price_sell = price - slip
```

The sign convention matters: slippage should always be modeled as working *against* the trader on average — a buy fills slightly higher than expected, a sell slightly lower — because that is what competitive order execution actually looks like. A backtest where slippage sometimes randomly helps the trader is modeling something other than real market friction.

## Why turnover amplifies the damage

Transaction costs scale with how often a strategy trades, not with how much capital it manages. A strategy that rebalances its entire position every day pays the round-trip cost roughly 252 times a year; one that rebalances monthly pays it about 12 times. If each round-trip costs 10 bps, that's a 25%+ annual cost drag for the daily strategy versus about 1.2% for the monthly one — a difference large enough to turn an apparently profitable daily strategy into a loser once costs are included, even though the *signal* might be identical in both cases. This is precisely why Lesson 11 flagged execution modeling as the place where a backtest's apparent edge most often quietly comes from: a high-turnover strategy backtested with zero costs can look dramatically better than the same strategy backtested honestly.

## Key terms

| Term | Meaning |
|---|---|
| Commission | The explicit, known fee charged per trade by a broker or exchange |
| Spread cost | The implicit cost of crossing the bid-ask spread with a market order |
| Slippage | The difference between the expected trade price and the actual fill price |
| Turnover | How frequently a strategy changes its positions, driving how often it pays trading costs |

## Recap

Honest backtesting means charging a realistic, turnover-driven cost on every position change and modeling slippage as working against the trader and scaling with volatility — not assuming frictionless, free execution. Next, Lesson 17 extends this to market impact and capacity: what happens when your own order size is large enough to move the price against you.
