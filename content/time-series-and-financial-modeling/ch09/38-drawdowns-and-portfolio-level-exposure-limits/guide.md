# Drawdowns and Portfolio-Level Exposure Limits

Lessons 36 and 37 both built portfolios from volatility and covariance — a single number per asset, assumed stable. Volatility is a useful summary, but it hides the thing that actually ends careers and blows up accounts: a long, painful stretch where the portfolio's value falls and keeps falling before it recovers. This lesson covers **drawdown**, the metric that captures that experience directly, and how real portfolios use it to set exposure limits that volatility alone never would.

## What you'll learn

- What a drawdown is, and why it's a fundamentally different risk measure than volatility
- How to compute maximum drawdown from an equity curve, in code
- Why two portfolios with identical volatility can have very different drawdown experiences
- How real risk management uses drawdown limits to force de-risking, not just measure risk after the fact

## Drawdown: the decline from a prior peak

A **drawdown** at any point in time is the percentage decline from the highest value the portfolio has reached so far, down to its current value. **Maximum drawdown** is the single worst such decline across the entire history being examined — the deepest peak-to-trough fall a real investor in that portfolio would actually have lived through.

```python
import numpy as np

def max_drawdown(equity_curve):
    running_peak = np.maximum.accumulate(equity_curve)
    drawdown = (equity_curve - running_peak) / running_peak
    max_dd = drawdown.min()
    max_dd_idx = drawdown.argmin()
    return max_dd, max_dd_idx

rng = np.random.default_rng(940)
n = 500
daily_returns = rng.normal(0.0005, 0.012, n)   # slight positive drift, realistic daily vol
equity_curve = 1000 * np.cumprod(1 + daily_returns)

max_dd, max_dd_idx = max_drawdown(equity_curve)
print(f"Final equity: {equity_curve[-1]:.2f}")
print(f"Max drawdown: {max_dd:.2%}")
print(f"Max drawdown occurred at index: {max_dd_idx} of {n}")
```

```
Final equity: 1135.94
Max drawdown: -22.23%
Max drawdown occurred at index: 109 of 500
```

Notice what this simulation shows: a portfolio that **ended up profitable** (1135.94 vs. a starting 1000) still experienced a 22.23% peak-to-trough decline along the way, with only modest positive drift and realistic daily volatility — no unusual event required. This is the gap volatility alone doesn't communicate: an investor living through day 109 of this simulation saw their account down over a fifth from its peak, with no guarantee at the time that the eventual recovery (and further gain) was coming.

## Why drawdown is a genuinely different risk measure than volatility

Volatility treats an up day and a down day of equal size as identical in magnitude — it has no memory of direction or sequence. Drawdown is explicitly about the *sequence*: a long, uninterrupted losing streak produces a much deeper drawdown than the same total losses spread out and interrupted by gains, even though both scenarios can produce identical volatility. Two portfolios with the exact same standard deviation of returns can have very different maximum drawdowns, depending purely on how their losses happen to cluster in time — which is precisely why professional risk management tracks drawdown as its own metric, not just a derived afterthought of volatility.

## From measurement to action: drawdown-based exposure limits

Measuring drawdown after the fact is necessary but not sufficient — real portfolios use **drawdown limits** as an active risk-management rule, not just a retrospective report card. A common structure:

- **Soft limit** (e.g., -10% drawdown): triggers a review — no automatic action, but risk is reassessed and the strategy or position sizing is scrutinized.
- **Hard limit** (e.g., -20% drawdown): triggers automatic de-risking — cutting position sizes by a pre-specified amount, or pulling capital from the strategy entirely, with no discretion involved at the moment it's hit.
- **Kill switch** (e.g., -30% drawdown): the strategy or desk is shut down outright, capital preserved, and only a deliberate, separate decision process can restart it.

The specific thresholds vary by mandate and risk tolerance, but the structural idea is consistent across real trading desks and funds: **drawdown limits are decided in advance, while calm, and enforced mechanically in the moment**, specifically because the moment a portfolio is deep in a drawdown is the worst possible time to trust your own in-the-moment judgment about whether "it'll turn around." This is the same discipline Lesson 19's leaky-strategy exercise taught in a different guise — a rule decided and locked in ahead of time, rather than improvised under pressure, is what actually protects a portfolio when it matters.

## Key terms

| Term | Meaning |
|---|---|
| Drawdown | The percentage decline from a prior peak value to the current value |
| Maximum drawdown | The single worst peak-to-trough decline across a given history |
| Drawdown limit | A pre-specified drawdown threshold that triggers automatic de-risking or shutdown |

## Check yourself

Why can two portfolios with identical volatility have very different maximum drawdowns, and what does that imply about using volatility alone to size a position?
