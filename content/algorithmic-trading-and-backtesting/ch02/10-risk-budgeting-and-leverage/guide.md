# Risk Budgeting & Leverage

Lesson 9 sized a single bet. This lesson zooms out to the whole portfolio: how much risk is each position actually contributing, is that allocation intentional, and what does leverage really do to all of it when something goes wrong. This closes out Chapter 2 — from here, Chapter 3 starts building the engine that actually runs all of this against history.

## What you'll learn

- The difference between allocating capital and allocating risk
- How to compute each position's marginal and total risk contribution
- What leverage actually is, and how it amplifies both returns and drawdowns
- Gross exposure, net exposure, and why they matter for different reasons
- Why leverage on an uncertain Kelly-style estimate is a specific, realistic way to blow up

## Risk contribution, not capital allocation

Two positions can have the same dollar size and very different risk contributions if their volatilities or correlations differ. **Risk budgeting** means deciding, deliberately, how much of the portfolio's total risk each position should carry — then sizing dollar positions to match, rather than treating equal dollars as automatically fair.

For a portfolio with weights `w` and covariance matrix `Sigma`, total portfolio volatility is:

```
sigma_p = sqrt(w' Sigma w)
```

Each position's **marginal contribution to risk** and **risk contribution** (the two multiply back out to total risk) are:

```python
import numpy as np

# w: weight vector, cov: covariance matrix of asset returns
portfolio_var = w @ cov @ w
portfolio_vol = np.sqrt(portfolio_var)

marginal_contrib = (cov @ w) / portfolio_vol      # d(sigma_p)/d(w_i)
risk_contrib = w * marginal_contrib               # sums to portfolio_vol
risk_contrib_pct = risk_contrib / portfolio_vol   # sums to 1.0
```

If one position's `risk_contrib_pct` is far larger than the others despite a modest dollar weight, that position — often a volatile or highly correlated one — is quietly dominating the portfolio's risk, which is exactly the problem inverse-volatility and risk-parity construction (Lesson 8) are designed to prevent.

## What leverage actually does

Leverage means controlling more notional exposure than your equity — a 2x levered portfolio with $1M of equity holds $2M of notional positions. Leverage does not change the underlying strategy's Sharpe ratio (it scales both return and volatility by the same factor), but it directly changes the dollar magnitude of drawdowns and the risk of a margin call forcing you out of a position at the worst possible time.

```python
leverage_ratio = gross_notional / equity
levered_returns = leverage_ratio * unlevered_returns
# Sharpe is unchanged (both mean and std scale by leverage_ratio);
# but a -20% unlevered drawdown becomes -40% at 2x leverage,
# and leverage can be forcibly reduced by a margin call
# at the worst possible time, locking in losses.
```

## Gross exposure vs. net exposure

**Gross exposure** is the sum of the absolute value of all positions (long and short); **net exposure** is the sum with sign, long minus short. A long-short portfolio can have very high gross exposure (100% long, 100% short — 200% gross) while being net-neutral (0% net) to the market. Gross exposure matters for margin requirements, financing costs, and how much could go wrong if correlations between your longs and shorts break down; net exposure matters for how exposed you are to the market's overall direction.

## Where Kelly and leverage meet — and where they can blow up

Lesson 9's warning applies directly here: a Kelly-style sizing estimate derived from a noisy historical `mu` and `sigma^2`, scaled up with leverage rather than scaled down fractionally, compounds the original estimation-error risk with real borrowed exposure. Over-levering an edge that was never as large as the backtest's point estimate suggested is one of the most common, well-documented ways a quantitatively "correct-looking" strategy produces a real, account-ending loss — not because the research was wrong in direction, but because the sizing didn't respect how uncertain the estimate actually was.

## Key terms

| Term | Meaning |
|---|---|
| Risk budgeting | Deliberately allocating how much of total portfolio risk each position carries |
| Risk contribution | `w_i * marginal_contrib_i`; each position's share of total portfolio volatility |
| Leverage ratio | Gross notional exposure divided by equity |
| Gross exposure | Sum of absolute position sizes (long + short) |
| Net exposure | Sum of signed position sizes (long - short); exposure to overall market direction |

## Recap

Risk budgeting makes position sizes answer to a deliberate risk allocation rather than arbitrary dollar amounts, and leverage amplifies whatever that allocation produces — including any uncertainty baked into the original edge estimate. That closes out Chapter 2. Chapter 3 starts with Lesson 11, Backtesting Fundamentals — building the actual engine that will run everything you've designed here against real historical data.
