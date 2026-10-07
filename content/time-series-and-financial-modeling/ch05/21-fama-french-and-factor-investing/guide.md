# Fama-French & Factor Investing

Chapters 1-4 built tools for modeling a single return series over time — its mean, its autocorrelation, its volatility. This chapter turns the question sideways: instead of asking "how does this one asset behave through time," it asks "why do *different* assets earn different average returns *at the same time*?" The answer quant finance settled on is factor models: a stock's return decomposes into exposures to a handful of common, economy-wide risk factors, plus something left over that's specific to that stock. This lesson introduces the idea through its most famous implementation, the Fama-French model.

## What you'll learn

- Why CAPM's single market factor leaves a lot of the cross-section of returns unexplained
- The Fama-French three-factor model: market, size (SMB), and value (HML)
- The five-factor extension: adding profitability (RMW) and investment (CMA)
- What a factor "loading" (beta) means and how it's estimated
- How to recover loadings and alpha from a time-series regression with statsmodels

## From CAPM to multi-factor models

The Capital Asset Pricing Model (CAPM) says a stock's expected excess return is explained entirely by its exposure to one thing: the market as a whole.

```
E[R_i] - R_f = beta_i * (E[R_m] - R_f)
```

`R_i` is the asset's return, `R_f` the risk-free rate, `R_m` the market return, and `beta_i` the asset's sensitivity to market moves. CAPM is elegant, but decades of empirical work found it systematically mispriced certain groups of stocks: small-cap stocks earned more than their market beta alone predicted, and "cheap" stocks (high book value relative to market value) also outperformed what CAPM implied. Those two anomalies — size and value — are exactly what Fama and French built into a model in 1993.

## The Fama-French three-factor model

The three-factor model adds two more factors to the market factor:

```
R_i - R_f = alpha_i + beta_mkt*(R_m - R_f) + beta_smb*SMB + beta_hml*HML + eps_i
```

- **Market (Mkt-RF)** — the same market factor as CAPM
- **SMB ("Small Minus Big")** — the return of a portfolio long small-cap stocks and short large-cap stocks; captures the historical size premium
- **HML ("High Minus Low")** — the return of a portfolio long high book-to-market ("value") stocks and short low book-to-market ("growth") stocks; captures the value premium

`alpha_i` is whatever average return is left over after accounting for all three exposures — the part of performance factor exposure alone doesn't explain. A persistently large, statistically significant alpha is what every active manager claims to deliver and what the factor model is specifically built to test.

## The five-factor extension

In 2015, Fama and French extended the model with two more factors built the same long-short way:

- **RMW ("Robust Minus Weak")** — long firms with high operating profitability, short firms with low profitability
- **CMA ("Conservative Minus Aggressive")** — long firms that invest conservatively (low asset growth), short firms that invest aggressively (high asset growth)

```
R_i - R_f = alpha_i + beta_mkt*(R_m-R_f) + beta_smb*SMB + beta_hml*HML + beta_rmw*RMW + beta_cma*CMA + eps_i
```

The five-factor model explains more of the cross-section of average returns than the three-factor version, largely because RMW and CMA pick up return patterns that HML alone used to get credited (or blamed) for.

## What a factor loading means

A factor loading (`beta_smb`, `beta_hml`, etc.) is just a regression coefficient: how much the asset's return moves, on average, for a one-unit move in that factor, holding the other factors fixed. A stock with `beta_smb = 0.4` behaves somewhat like a small-cap stock even if it technically isn't one; a stock with `beta_hml = -0.25` leans growth-like. Loadings are estimated the same way CAPM's beta always was — ordinary least squares, regressing the asset's excess return on the factor returns over some historical window.

## Worked example: recovering loadings via OLS

The code below builds a synthetic asset whose excess return is *generated* from known factor exposures (`beta_mkt=1.15`, `beta_smb=0.40`, `beta_hml=-0.25`, `alpha=0.0002`) plus noise, then uses `statsmodels` to recover those exposures from the data alone — exactly the exercise you'd run on real returns and real Fama-French factor data.

```python
import numpy as np
import statsmodels.api as sm

rng = np.random.default_rng(3)
n = 500  # trading days

# synthetic daily factor returns, in decimal form
mkt = rng.normal(0.0004, 0.010, n)
smb = rng.normal(0.0001, 0.005, n)
hml = rng.normal(0.0001, 0.004, n)

# true (unknown-to-the-regression) loadings for a synthetic stock
true_alpha = 0.0002
beta_mkt, beta_smb, beta_hml = 1.15, 0.40, -0.25
noise = rng.normal(0, 0.006, n)

asset_excess = true_alpha + beta_mkt*mkt + beta_smb*smb + beta_hml*hml + noise

X = sm.add_constant(np.column_stack([mkt, smb, hml]))
model = sm.OLS(asset_excess, X).fit()
print(model.params)
print("R-squared:", model.rsquared)
```

Running this recovers:

```
const (alpha)   0.000234   (true: 0.0002)
beta_mkt        1.147      (true: 1.15)
beta_smb        0.402      (true: 0.40)
beta_hml       -0.201      (true: -0.25)
R-squared:      0.774
```

The recovered loadings land close to the true values used to generate the data, and the estimated alpha (0.000234, t-stat 0.84, p=0.40) is statistically indistinguishable from zero — exactly as it should be, since this synthetic asset was built with essentially no true skill beyond its factor exposures. In practice, that's the headline use of a factor model: most of what looks like manager "skill" in a raw return series turns out to be nothing more than exposure to SMB, HML, or the market, and the three-factor regression is how you find that out.

## Key terms

| Term | Meaning |
|---|---|
| CAPM | Single-factor model: excess return explained only by market beta |
| SMB | "Small Minus Big" — long-short size factor; small caps minus large caps |
| HML | "High Minus Low" — long-short value factor; high book-to-market minus low |
| RMW / CMA | Five-factor extensions capturing profitability and investment patterns |
| Factor loading (beta) | Regression coefficient measuring sensitivity to a given factor |
| Alpha | Average return left unexplained by factor exposures |

## Recap

CAPM's single market factor leaves systematic patterns in average returns unexplained; the Fama-French three- and five-factor models add size, value, profitability, and investment factors built as long-short portfolios, and a simple OLS regression recovers an asset's loadings and alpha against them. Next, Lesson 22 goes one level deeper and shows how factors like SMB and HML are actually constructed from raw stock data in the first place.
