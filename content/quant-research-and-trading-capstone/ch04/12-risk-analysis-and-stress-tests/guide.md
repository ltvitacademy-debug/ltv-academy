# Risk Analysis & Stress Tests

Lesson 11 gave us net returns. This lesson asks the harder question: what risk did it take to earn them, and — just as important — how did SR-5 actually behave when real markets broke? Chapter 4 closes here, before Phase 4 turns all of it into a written report.

## What you'll learn

- Risk metrics beyond Sharpe: Sortino, Calmar, VaR and CVaR at 95% and 99%, and beta to SPY
- How VaR and CVaR are computed, and why CVaR matters more than VaR alone
- The exact performance of SR-5 in four named historical stress windows, net of costs
- Why a dollar-neutral book isn't automatically a market-neutral book during a crisis

## Risk metrics, net of costs (full OOS period)

- **Sortino 0.58** — like Sharpe, but only penalizes downside volatility, not upside swings
- **Calmar 0.27** — annualized return divided by max drawdown, rewarding smoother equity curves
- **VaR95 ≈ -0.62%, CVaR95 ≈ -0.95%** — the 95th-percentile daily loss threshold, and the average loss beyond it
- **VaR99 ≈ -1.15%, CVaR99 ≈ -1.6%** — the same, further into the tail
- **Beta to SPY ≈ 0.04** — normally almost no persistent market exposure, as expected from a dollar-neutral book

```python
def max_drawdown(equity_curve):
    peak = equity_curve.cummax()
    dd = equity_curve / peak - 1
    return dd.min()

sharpe = (daily_ret.mean() / daily_ret.std()) * (252 ** 0.5)
var_95 = daily_ret.quantile(0.05)
cvar_95 = daily_ret[daily_ret <= var_95].mean()
```

`max_drawdown` tracks the running peak of the equity curve and reports the worst peak-to-trough decline. `var_95` is just the 5th percentile of the daily return distribution — but `cvar_95` goes further, averaging *everything worse than that cutoff*. That distinction matters: VaR tells you the threshold, CVaR tells you how bad it typically is once you're past it.

## Four real stress tests

| Window | SR-5 | SPY |
|---|---|---|
| COVID crash (Feb 20 – Mar 23, 2020) | -6.1% | -33.9% |
| Q4 2018 selloff (Oct 1 – Dec 24, 2018) | +1.8% | -19.4% |
| 2022 rate-hike bear market (Jan 3 – Oct 12, 2022) | -3.4% | -24.5% |
| Aug 2024 VIX spike (Aug 1 – Aug 8, 2024) | +0.9% | -6.0% |

In every one of these four windows, SR-5 lost dramatically less than SPY — in two of the four, it was actually positive while SPY fell sharply.

## Correlation-to-one: dollar-neutral isn't crisis-proof

Beta to SPY normally sits near 0.04 — essentially flat. But during the COVID crash specifically, that beta **spiked to roughly 0.25**. This is the **correlation-to-one effect**: when every sector sells off together in a panic, the diversification between the long leg and the short leg breaks down, because the two legs stop moving independently. The strategy still outperformed SPY by a wide margin in that window — but the beta spike is a real reminder that dollar-neutral construction reduces market exposure *most of the time*, not *all of the time*.

## Key terms

| Term | Meaning |
|---|---|
| VaR (Value at Risk) | A percentile threshold on the loss distribution (e.g., the 5th-percentile daily loss) |
| CVaR (Conditional VaR) | The average loss in the tail beyond the VaR threshold — captures how bad the tail actually is |
| Sortino ratio | Like Sharpe, but penalizes only downside volatility |
| Calmar ratio | Annualized return divided by maximum drawdown |
| Correlation-to-one | The breakdown of cross-sectional diversification when every name sells off together in a crisis |

## Recap

Net of costs, SR-5 shows a Sortino of 0.58, Calmar of 0.27, VaR95/CVaR95 of about -0.62%/-0.95%, VaR99/CVaR99 of about -1.15%/-1.6%, and a beta to SPY near 0.04 that spikes to about 0.25 in a correlation-to-one crisis like COVID. Across four real stress windows — COVID, the Q4 2018 selloff, the 2022 bear market, and the August 2024 VIX spike — SR-5 meaningfully outperformed SPY every time. Next, Lesson 13 writes all of this into the performance report.
