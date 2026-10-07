# Costs, Slippage & Realism

A gross backtest flatters every strategy — it assumes trades happen at the quoted price, for free, in unlimited size. This lesson adds a realistic cost model to SR-5 and shows, in exact numbers, how much of its edge survives contact with a real market.

## What you'll learn

- The five cost components modeled, and the one deliberately ignored
- The square-root market impact model and the participation-rate cap
- The exact gross-vs-net comparison, and why ~44x annualized turnover is what drives the gap
- The capacity estimate: how much AUM SR-5 could actually run

## The cost model

- **Commission** — $0.005 per share
- **Half bid-ask spread** — about 2 basis points, widening to **3bps for the lower-ADV names, XLC and XLRE**
- **Market impact** — a square-root model: `impact = 0.1 × daily volatility × sqrt(participation rate)`, with participation capped at **5% of 20-day average daily volume (ADV)**
- **Short borrow fee** — 25 basis points per year, accrued daily on the short leg
- **Cash drag / margin interest** — noted as immaterial, and deliberately **ignored**. Not every cost is worth modeling; this one doesn't move the needle enough to justify the complexity.

```python
def trade_cost(delta_w, adv_dollars, price_vol, aum):
    spread_cost = abs(delta_w) * 0.0002  # ~2bps half-spread
    participation = (abs(delta_w) * aum) / adv_dollars
    impact = 0.1 * price_vol * (participation ** 0.5)
    return spread_cost + impact
```

`trade_cost` is applied to `delta_w` — only the *change* in a position's weight at each rebalance, not the whole book — so a sector that's barely traded that week costs almost nothing, and one that's fully flipped from long to short costs the most.

## Gross vs. net: costs roughly halve the Sharpe

Measured over the same 2012–2025 out-of-sample window:

| Metric | Gross | Net of costs |
|---|---|---|
| CAGR | 5.2% | 2.9% |
| Annualized vol | 6.8% | 6.9% |
| Sharpe | 0.76 | 0.42 |
| Sortino | 1.05 | 0.58 |
| Calmar | 0.58 | 0.27 |
| Max drawdown | -8.9% | -10.6% |

Costs don't just shave the return — they cut the risk-adjusted Sharpe roughly in half. The reason is turnover: weekly gross turnover runs about **85% of notional**, which annualizes to roughly **44x per year**. A strategy that re-trades nearly its entire book every week accumulates small per-trade costs into a large annual drag, which is exactly what's happening here.

## Capacity: how big can this actually run

Pushing more AUM through the same signal increases each trade's participation rate relative to ADV, which increases market impact nonlinearly (the square-root term). The estimate: SR-5 can run roughly **$150M of AUM** before market impact erodes net Sharpe below about **0.2**. The binding constraint is the **lower-ADV names, XLC and XLRE** — they hit the 5%-of-ADV participation cap first, and widen the impact term for the whole book well before the other nine sectors would.

## Key terms

| Term | Meaning |
|---|---|
| Slippage | The gap between a trade's assumed and actual execution cost, from spread and impact |
| Market impact | The price-moving effect of a trade's own size, modeled here as scaling with sqrt(participation) |
| Participation rate | A trade's size as a fraction of that name's average daily volume |
| Capacity | The AUM level beyond which costs erode a strategy's net risk-adjusted return past usefulness |

## Recap

Five real costs — commission, half-spread, square-root market impact, short borrow, with cash drag ignored — cut SR-5's net Sharpe from 0.76 to 0.42 and its CAGR from 5.2% to 2.9%, driven by roughly 44x annualized turnover. Capacity tops out around $150M AUM before the lower-ADV names push net Sharpe below 0.2. Next, Lesson 12 looks at the risk behind these net numbers.
