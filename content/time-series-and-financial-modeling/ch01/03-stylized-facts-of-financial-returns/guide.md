# Stylized Facts of Financial Returns

With clean, correctly-adjusted log returns in hand, a natural question is: what do they actually look like? Decades of empirical research across equities, FX, and commodities have found the same handful of statistical patterns over and over, regardless of asset class or time period. These patterns are called the **stylized facts** of financial returns, and every model later in this course — GARCH in Chapter 4, factor models in Chapter 5 — exists specifically to capture one or more of them. A model that ignores the stylized facts (like assuming returns are i.i.d. Normal) will systematically underestimate risk.

## What you'll learn

- Fat tails and excess kurtosis: why extreme moves happen far more often than a Normal distribution predicts
- Volatility clustering: why calm and turbulent periods come in runs
- The leverage effect and negative skew
- Why returns show almost no autocorrelation, but squared/absolute returns show plenty
- Aggregational Gaussianity: how returns look less non-Normal as you lower sampling frequency

## Fat tails and excess kurtosis

If daily stock returns were truly Normally distributed, moves of 5 or more standard deviations would be almost impossibly rare. In reality, they happen regularly — stock market history is full of single days that a Normal model says should occur once every few thousand years. This is described as **fat tails**: the distribution has more probability mass in its extreme tails than a Normal distribution. It's measured by **excess kurtosis** — kurtosis above the Normal distribution's value of 3 (equivalently, "kurtosis - 3 > 0"). Virtually every financial return series, at daily or higher frequency, has significant excess kurtosis.

## Volatility clustering

Large moves tend to be followed by more large moves (of either sign), and calm periods tend to be followed by more calm periods. This is **volatility clustering**: volatility is not constant through time, it comes in persistent regimes. It's the single most important stylized fact for Chapter 4 — it's exactly what ARCH/GARCH models are built to capture, by letting today's variance depend on yesterday's squared return and yesterday's variance.

## Negative skew and the leverage effect

Equity returns are typically **negatively skewed** — large down moves are more common/extreme than large up moves of equal probability. One explanation is the **leverage effect**: when a company's stock price falls, its debt-to-equity ratio (financial leverage) rises mechanically, making the remaining equity riskier and pushing volatility up further — so price drops and volatility increases tend to move together, reinforcing the downside.

## Near-zero return autocorrelation, but not squared returns

The returns themselves show little to no linear autocorrelation at any lag beyond the very shortest (consistent with weak-form market efficiency — you can't easily predict tomorrow's *direction* from today's return). But **squared returns** or **absolute returns** — proxies for volatility — show strong, slowly-decaying positive autocorrelation. This is the statistical fingerprint of volatility clustering, and it's precisely why a model can't predict returns well but can predict volatility reasonably well.

```python
import numpy as np
from statsmodels.graphics.tsaplots import plot_acf

log_returns = np.log(prices).diff().dropna()

plot_acf(log_returns, lags=20)        # near-zero at all lags beyond lag 1
plot_acf(log_returns**2, lags=20)     # strong, slowly decaying autocorrelation
```

## Aggregational Gaussianity

As you aggregate returns over longer and longer horizons — daily to weekly to monthly — the distribution looks progressively closer to Normal (lower excess kurtosis). This is called **aggregational Gaussianity**. It doesn't mean monthly returns are actually Normal, just that the departure from Normality shrinks as the central limit theorem's averaging effect kicks in over more sub-periods.

## Quick diagnostics in Python

```python
from scipy import stats

skewness = stats.skew(log_returns)
excess_kurt = stats.kurtosis(log_returns)       # scipy's kurtosis() already subtracts 3 by default
jb_stat, jb_pvalue = stats.jarque_bera(log_returns)  # tests departure from Normality
```

A significant Jarque-Bera test (low p-value) formally confirms what the skew and kurtosis numbers usually already show for raw financial returns: they are not Normally distributed.

## Key terms

| Term | Meaning |
|---|---|
| Fat tails / excess kurtosis | More extreme moves than a Normal distribution predicts; kurtosis above 3 |
| Volatility clustering | Periods of high/low volatility persist, rather than volatility being constant |
| Negative skew | Large down moves more extreme/likely than large up moves |
| Leverage effect | Falling prices raise financial leverage, which raises risk/volatility further |
| Aggregational Gaussianity | Returns look closer to Normal as the sampling horizon lengthens |

## Recap

Financial returns reliably show fat tails, volatility clustering, negative skew with a leverage effect, near-zero return autocorrelation but strong autocorrelation in squared returns, and aggregational Gaussianity at longer horizons. These aren't curiosities — they are the reason GARCH, fat-tailed distributions, and regime-aware models exist. Next, Lesson 4 looks at a different kind of distortion: biases introduced not by markets, but by how the historical data itself was collected.
