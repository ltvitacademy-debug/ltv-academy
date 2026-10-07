# Market Impact & Capacity

Lesson 16 modeled slippage as a cost that happens *to* you, driven by market conditions. Market impact is different and more uncomfortable: it's a cost you *cause*, by trading large enough to move the price against yourself. This lesson covers how to estimate it, and introduces capacity — the uncomfortable fact that most backtested edges only exist up to a certain size, and shrink or vanish above it.

## What you'll learn

- The difference between slippage (what the market does to you) and market impact (what your own order does to the price)
- The square-root market impact model, a standard real-world approximation
- Why strategies that look great backtested at small size often can't scale
- What "capacity" means and how to estimate it

## Market impact: the cost you create

When you place an order large enough relative to the available liquidity, you yourself move the price while filling it — buying pushes the price up as you consume the available sell orders at each price level, selling pushes it down. This is distinct from slippage, which is driven by the market moving between your decision and your fill regardless of your own size; market impact exists *because* of your own size, and it gets worse the larger your order is relative to the market's typical trading volume.

A backtest run only at a small, "illustrative" position size will never see this cost, because a small order doesn't move the market. This is precisely why a strategy's backtested Sharpe ratio at $100,000 of capital tells you almost nothing about what that same strategy would achieve at $100 million — the signal might be identical, but the execution cost structure is completely different.

## The square-root market impact model

There is no single universally exact formula for market impact — it depends on the instrument, the venue, and current market conditions — but a widely used approximation in real quantitative finance is the **square-root model**, which says impact cost grows roughly with the square root of the fraction of average daily volume (ADV) you're trading:

```
impact_cost ≈ sigma * sqrt(Q / ADV)
```

Where `sigma` is the asset's daily volatility, `Q` is the size of your order, and `ADV` is the average daily trading volume for that instrument. This is an approximation, not an exact law — real market impact depends on order type, venue microstructure, and how the order is worked over time — but the square-root *shape* is well supported empirically: doubling your order size roughly 1.4x's (not 2x's) the impact cost, because larger orders can draw on progressively deeper, if less favorably priced, liquidity.

```python
import numpy as np

def square_root_impact(order_size: float, adv: float, daily_vol: float, c: float = 1.0):
    """
    Illustrative square-root market impact cost (as a fraction of trade price).
    order_size, adv: same units (e.g. shares or notional dollars)
    daily_vol: the asset's daily return volatility (e.g. 0.02 for 2%)
    c: a calibration constant fit to real historical fills — NOT universal
    """
    participation = order_size / adv
    return c * daily_vol * np.sqrt(participation)

# Trading 1% of ADV vs. trading 10% of ADV — NOT a 10x impact difference:
impact_1pct = square_root_impact(order_size=0.01, adv=1.0, daily_vol=0.02)
impact_10pct = square_root_impact(order_size=0.10, adv=1.0, daily_vol=0.02)
print(impact_1pct, impact_10pct, impact_10pct / impact_1pct)   # ratio ≈ sqrt(10) ≈ 3.16
```

The key practical lesson from the square-root shape: impact cost rises faster than linearly as you trade a bigger share of ADV, so there's a real, mathematically unavoidable limit to how much capital a given strategy can absorb before impact costs overwhelm the edge — this limit is what "capacity" means.

## Capacity: the size at which an edge stops working

**Capacity** is the maximum amount of capital a strategy can deploy before its net-of-cost performance degrades below being worth trading. Every real strategy has one, even if a backtest run at a convenient small size never reveals it. A rough way to estimate capacity:

1. Estimate the strategy's gross edge (return before costs) at your target trade size.
2. Estimate transaction costs (Lesson 16) and market impact (square-root model above) at that same size, as a function of how large your order is relative to ADV for the instruments traded.
3. Find the capital level at which modeled impact cost grows large enough to erode the gross edge to roughly zero (or below your required hurdle rate) — that's your approximate capacity ceiling.

Strategies trading highly liquid instruments (large-cap equities, major FX pairs, liquid futures) with modest turnover can often scale to very large capital before impact bites. Strategies trading illiquid small-caps, requiring large daily turnover relative to ADV, or depending on a short-lived statistical edge, often have capacity measured in the single-digit millions of dollars or less — which is a completely different business than a strategy that can run at $500 million. A backtest that never reports this is incomplete, not just optimistic.

## Why this matters even for a backtest you'll never trade at scale

Even a student strategy you have no intention of running with real institutional capital benefits from this discipline, because thinking about capacity forces an honest answer to the question "how much of my backtested edge exists only because I tested it at a size small enough to never see my own footprint?" That question is a sharper, more specific version of the broader honesty this chapter is building toward.

## Key terms

| Term | Meaning |
|---|---|
| Market impact | The cost caused by your own order moving the price against you while it fills |
| ADV (average daily volume) | The typical dollar or share volume traded in an instrument per day |
| Square-root impact model | An approximation where impact cost scales with the square root of the fraction of ADV traded |
| Capacity | The maximum capital a strategy can deploy before net performance degrades below being worth trading |

## Recap

Market impact is the cost you cause, not the cost the market imposes on you, and it scales (approximately) with the square root of how much of a day's volume you're consuming — meaning it rises faster than linearly as size increases. Every strategy has a capacity ceiling, and a backtest run only at a convenient small size will never reveal it. Next, Lesson 18 turns to a different class of realism problem entirely: look-ahead bias and survivorship bias, the ways a backtest's *data* itself can quietly lie.
