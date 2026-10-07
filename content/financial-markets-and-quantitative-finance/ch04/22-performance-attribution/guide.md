# Performance Attribution

A portfolio manager beat the market by 3% last year. Is that skill, or was it just a high-beta portfolio riding a strong market? This lesson closes out the chapter with the toolkit for answering that question properly: a handful of ratios that each adjust return for a different notion of risk, plus the vocabulary for separating "how we allocated across assets" from "how we picked within each allocation."

## What you'll learn

- Sharpe ratio, Treynor ratio, and Jensen's alpha — what each measures and how they differ
- The information ratio, for comparing a portfolio against a specific benchmark
- Allocation effect vs. selection effect
- Why picking the wrong ratio can make a mediocre manager look skilled

## Sharpe ratio: reward per unit of total risk

```
Sharpe ratio = (Rp - Rf) / sigma_p
```

The Sharpe ratio divides excess return (over the risk-free rate) by the portfolio's **total** risk, σp — standard deviation, encompassing both systematic and unsystematic risk. It's the right tool when you're evaluating a portfolio on a standalone basis, especially one that isn't necessarily well-diversified, since it penalizes total volatility regardless of its source.

## Treynor ratio: reward per unit of systematic risk

```
Treynor ratio = (Rp - Rf) / beta_p
```

The Treynor ratio divides excess return by **beta** instead of total standard deviation. This is the right tool when evaluating a portfolio that's one piece of a larger, already-diversified holding — in that context, only the portfolio's systematic risk contribution matters, because any unsystematic risk it carries gets diversified away at the larger portfolio level anyway (exactly the CAPM logic from Lesson 20).

## Jensen's alpha: excess return vs. what CAPM predicted

```
Jensen's alpha = Rp - [Rf + beta_p * (Rm - Rf)]
```

Jensen's alpha takes the portfolio's actual return and subtracts the return CAPM would have predicted given the portfolio's beta. A positive alpha means the portfolio outperformed what its systematic risk exposure alone would justify — this is the number that most directly answers "was there skill beyond just taking on market risk?" A portfolio with a high beta that simply rode a rising market will show close to zero alpha, even with an impressive raw return, because CAPM already expected that return given the beta taken.

## Information ratio: reward per unit of tracking error

```
Information ratio = (Rp - R_benchmark) / tracking_error
```

The information ratio is close in spirit to the Sharpe ratio, but benchmarked against a specific comparison portfolio rather than the risk-free rate: it divides **active return** (the portfolio's return minus a chosen benchmark's return) by **tracking error** (the standard deviation of that return difference). It answers a narrower, more practical question for an active manager: how much excess return are you generating per unit of risk taken *relative to the benchmark you're actually being measured against* — not relative to cash, and not relative to the whole market necessarily.

## Allocation effect vs. selection effect

Performance attribution also breaks a portfolio's excess return down by *where* it came from, not just by how much risk-adjusted excess return there was in total:

- **Allocation effect** — return earned (or lost) from over- or under-weighting entire asset classes or sectors relative to the benchmark's weights, independent of which specific securities were picked within each one.
- **Selection effect** — return earned (or lost) from which specific securities were picked *within* a given sector or asset class, holding the sector weighting itself fixed.

A manager who overweighted technology stocks in a year tech rallied gets credit via the allocation effect, regardless of which specific tech names they picked. A manager who picked the single best-performing stock within an underweighted sector gets credit via the selection effect even though the overall sector bet was a drag. Separating the two tells you *which decision* — the top-down weighting call or the bottom-up stock-picking call — actually drove performance, which matters enormously for deciding what a manager is actually good at.

## Worked example

A portfolio returned 12%, the risk-free rate is 3%, the portfolio's standard deviation is 18%, and its beta is 1.3. The market returned 9%.

```python
Rp, Rf, sigma_p, beta_p, Rm = 0.12, 0.03, 0.18, 1.3, 0.09

sharpe = (Rp - Rf) / sigma_p                     # (0.12-0.03)/0.18 = 0.50
treynor = (Rp - Rf) / beta_p                      # (0.12-0.03)/1.3 = 0.069
capm_expected = Rf + beta_p*(Rm - Rf)             # 0.03 + 1.3*0.06 = 0.108
jensens_alpha = Rp - capm_expected                # 0.12 - 0.108 = 0.012
```

The Sharpe ratio is 0.50, the Treynor ratio is about 0.069, and Jensen's alpha is **1.2%** — the portfolio beat its CAPM-predicted return of 10.8% by 1.2 percentage points, which is the most direct quantitative signal of genuine, risk-adjusted skill in this example.

## Key terms

| Term | Meaning |
|---|---|
| Sharpe ratio | (Rp − Rf) / sigma_p — excess return per unit of total risk |
| Treynor ratio | (Rp − Rf) / beta_p — excess return per unit of systematic risk |
| Jensen's alpha | Rp − [Rf + beta_p(Rm − Rf)] — excess return beyond what CAPM predicts |
| Information ratio | Active return / tracking error — excess return per unit of risk vs. a specific benchmark |
| Allocation effect | Return from over/underweighting sectors or asset classes vs. the benchmark |
| Selection effect | Return from security picks within a sector, holding the sector weight fixed |

## Recap

Sharpe, Treynor, Jensen's alpha, and the information ratio each adjust return for risk differently — total risk, systematic risk, CAPM-predicted return, and benchmark tracking error, respectively — and picking the wrong one can make an unskilled, high-beta manager look good. Allocation and selection effects further separate performance into the top-down weighting decision versus the bottom-up stock-picking decision. This closes Chapter 4 on portfolio theory. Up next, Lesson 23 opens Chapter 5: Value at Risk and Expected Shortfall, moving from measuring past performance to quantifying forward-looking risk.
