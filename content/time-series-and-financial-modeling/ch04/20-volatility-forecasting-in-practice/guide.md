# Volatility Forecasting in Practice

This closing lesson of Chapter 4 ties the whole volatility toolkit together. GARCH, EGARCH, and GJR-GARCH all produce a *forecast* of future variance — the question this lesson answers is how that forecast actually gets used and evaluated in real risk management, which is ultimately the point of modeling volatility at all.

## What you'll learn

- How to generate a multi-step-ahead GARCH variance forecast
- Evaluating a volatility forecast against realized volatility (tying back to Lesson 16)
- Volatility targeting in portfolio and risk management
- Value at Risk (VaR): what it is, and how a GARCH forecast feeds into it

## Forecasting variance forward with GARCH

Once a GARCH-family model is fit (Lessons 17-18), forecasting forward is mechanical — iterate the fitted recursion forward using expected future squared shocks:

```python
from arch import arch_model

am = arch_model(returns, vol="GARCH", p=1, o=1, q=1, dist="t")
res = am.fit(disp="off")

fcast = res.forecast(horizon=10, reindex=False)
print(fcast.variance)   # one row per day, h.1 ... h.10 columns
daily_vol_forecast = fcast.variance.iloc[-1] ** 0.5
```

Because GARCH's conditional variance mean-reverts toward its long-run average (whenever alpha + beta < 1), forecasts further into the future flatten out toward that unconditional level rather than continuing to react to yesterday's specific shock.

## Evaluating the forecast: compare to realized volatility

A GARCH variance forecast is only useful if it tracks what volatility actually turns out to be. The standard check compares the forecast against **realized volatility** (Lesson 16) computed from the days that have since passed, using the same RMSE/MAE-style metrics from Lesson 14:

```python
import numpy as np

forecast_vol = fcast.variance.iloc[-1] ** 0.5         # predicted daily vol, h.1..h.10
# realized_vol: actual realized volatility over the same 10 forecasted days
rmse = np.sqrt(np.mean((forecast_vol.values - realized_vol.values) ** 2))
```

This is exactly the walk-forward discipline from Lesson 14, applied specifically to variance forecasts instead of price-level forecasts — and just as with price forecasts, a volatility model should also be compared against a naive benchmark, such as simply using the current historical (rolling) volatility unchanged as "tomorrow's forecast."

## Volatility targeting

**Volatility targeting** is a portfolio construction technique: instead of holding a fixed dollar or percentage position in an asset, size the position inversely to its forecast volatility, so the position's *risk contribution* stays roughly constant over time. If a GARCH forecast says volatility has doubled, a volatility-targeting strategy cuts the position size roughly in half, keeping expected risk steady even as market conditions shift — it's one of the most direct practical uses of a volatility forecast in active portfolio management.

## Value at Risk (VaR)

**Value at Risk** answers: "over the next period, what's the loss we won't exceed except with some small probability alpha (e.g., 5% or 1%)?" For a position with GARCH-forecast volatility `sigma_(t+1)` and assuming (for simplicity) normally distributed returns:

VaR_alpha = -(mu + z_alpha * sigma_(t+1))

where `z_alpha` is the corresponding standard normal quantile (e.g., `z_0.05 ≈ -1.645`). Feeding a GARCH forecast into VaR, rather than a flat historical standard deviation, lets the risk estimate adapt to current conditions — rising ahead of turbulent periods rather than only reacting after the fact, which is precisely the practical payoff of everything built across this chapter.

## Key terms

| Term | Meaning |
|---|---|
| Multi-step variance forecast | A GARCH forecast iterated forward, mean-reverting toward the long-run variance |
| Volatility targeting | Sizing positions inversely to forecast volatility to hold risk contribution roughly constant |
| Value at Risk (VaR) | The loss level not expected to be exceeded except with probability alpha |
| Naive volatility benchmark | Using the current historical volatility unchanged as next period's forecast |

## Recap

A GARCH forecast is only as good as its track record against realized volatility and a naive benchmark, and its real payoff shows up downstream — in volatility-targeted position sizing and in Value at Risk estimates that adapt to current market conditions. That closes Chapter 4 and the volatility modeling toolkit. Chapter 5 turns to factor models and cross-sectional analysis, starting with Fama-French and factor investing.
