# Factor Models & Multi-Factor Investing

CAPM compresses every source of systematic risk into one number: beta against the overall market. That's elegant, but decades of empirical research have found it doesn't fully explain real-world returns — some categories of stocks have persistently earned more than their market beta alone would predict. Factor models are the response: instead of one systematic risk source, allow several, each with its own risk premium.

## What you'll learn

- The single-index model as the simplest factor model (a reminder of CAPM's structure)
- The Fama-French three-factor model: market, size (SMB), and value (HML)
- The general multi-factor form and what "factor exposure" means
- Why factor models are a practical response to CAPM's empirical shortcomings

## The single-index model

CAPM's own structure is already a one-factor model. Written in regression form:

```
Ri = alpha_i + beta_i * Rm + epsilon_i
```

Ri is the asset's return, Rm is the market's return, βi is the sensitivity (slope) to that one factor, αi captures any return not explained by the market factor, and εi is idiosyncratic noise. This is literally how beta is estimated in practice — running a regression of an asset's historical returns against the market's historical returns.

## The Fama-French three-factor model

Eugene Fama and Kenneth French found that market beta alone leaves systematic patterns unexplained: small-cap stocks have tended to outperform large-cap stocks beyond what their market beta predicts, and "value" stocks (cheap relative to book value) have tended to outperform "growth" stocks beyond what their beta predicts. They added two more factors to capture this:

```
Ri - Rf = alpha_i + b_i*(Rm - Rf) + s_i*SMB + h_i*HML + epsilon_i
```

- **Market factor** (Rm − Rf): the same market risk premium as CAPM.
- **SMB** ("Small Minus Big"): the historical return spread between small-cap and large-cap portfolios — the **size** factor.
- **HML** ("High Minus Low"): the historical return spread between high book-to-market (value) and low book-to-market (growth) portfolios — the **value** factor.

Each coefficient (b, s, h) is a **factor loading** or **factor exposure** — how sensitive that particular asset's returns are to that particular factor, estimated the same way beta is: by regression. A small-cap value stock would typically show a high s (loading on SMB) and a high h (loading on HML), on top of whatever market beta b it carries.

## The general multi-factor form

Beyond Fama-French specifically, the general structure of any multi-factor model is:

```
E[Ri] = Rf + sum over k of [ beta_i,k * (factor risk premium)_k ]
```

Each factor k has its own risk premium, and each asset has its own exposure (βi,k) to that factor. CAPM is the special case with exactly one factor (the market); Fama-French three-factor is the case with three. Other well-known factors practitioners have added over the years include momentum (stocks that have recently outperformed tend to keep outperforming over short horizons), quality (profitability and low leverage), and low-volatility (lower-risk stocks sometimes earning returns disproportionate to their beta) — each one is, in principle, a candidate additional term in the same sum.

## Why this matters

Factor models serve two practical purposes at once. First, they give a richer, more empirically grounded explanation of *why* different assets earn different average returns than CAPM's single beta can offer. Second — and this is the connection back to Lesson 19 — they give a practical shortcut for estimating the covariance matrix Σ that mean-variance optimization needs. Instead of estimating every pairwise covariance between hundreds of individual stocks directly (which, as Lesson 19 noted, grows roughly with the square of the number of assets), you estimate each stock's exposure to a small number of common factors, and most of the covariance structure falls out of those shared exposures. This is exactly the kind of practical simplification Lesson 22's performance attribution builds on, since it needs to separate "return from factor exposure" from "return from genuine skill."

## Worked example

Suppose a small-cap value fund has estimated loadings b = 1.1, s = 0.6, h = 0.8 against a market risk premium of 6%, an SMB premium of 2.5%, and an HML premium of 3.5%, with Rf = 3%.

```python
Rf = 0.03
mkt_premium, smb_premium, hml_premium = 0.06, 0.025, 0.035
b, s, h = 1.1, 0.6, 0.8

E_Ri = Rf + b*mkt_premium + s*smb_premium + h*hml_premium
# = 0.03 + 1.1*0.06 + 0.6*0.025 + 0.8*0.035
# = 0.03 + 0.066 + 0.015 + 0.028 = 0.139
```

The three-factor model implies an expected return of **13.9%** for this fund — noticeably higher than a CAPM estimate using only the market factor (0.03 + 1.1×0.06 = 9.6%) would suggest, because the fund's size and value tilts each carry their own compensated risk premium on top of market beta.

## Key terms

| Term | Meaning |
|---|---|
| Single-index model | CAPM's regression structure: one factor, the market |
| Fama-French three-factor model | Adds SMB (size) and HML (value) factors to the market factor |
| Factor loading / exposure | An asset's sensitivity (regression coefficient) to a given factor |
| SMB | Small-cap minus large-cap return spread |
| HML | High book-to-market (value) minus low book-to-market (growth) return spread |

## Recap

Factor models generalize CAPM's single market beta into multiple sources of compensated systematic risk, each with its own premium and its own asset-specific loading; Fama-French's three-factor model (market, SMB, HML) is the canonical example, with momentum, quality, and low-volatility as commonly added extensions. Beyond explaining returns, factor structure also gives a practical shortcut for estimating the covariance matrix mean-variance optimization needs. Next up, Lesson 22: performance attribution, where you'll separate how much of a portfolio's return came from risk exposure versus genuine skill.
