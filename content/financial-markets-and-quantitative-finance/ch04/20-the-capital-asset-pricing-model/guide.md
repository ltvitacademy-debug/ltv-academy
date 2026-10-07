# The Capital Asset Pricing Model

Mean-variance optimization tells you how to build the best possible portfolio out of given inputs. The Capital Asset Pricing Model (CAPM) asks a different question: in an equilibrium where everyone is doing that optimization, what should any individual asset's expected return actually be? The answer turns out to depend on exactly one number per asset — and it isn't that asset's own volatility.

## What you'll learn

- The CAPM formula and what beta measures
- How beta is actually calculated
- The Security Market Line vs. the Capital Market Line
- Why CAPM says only systematic risk earns a return premium

## The formula

```
E[Ri] = Rf + beta_i * (E[Rm] - Rf)
```

E[Ri] is asset i's expected return, Rf is the risk-free rate, E[Rm] is the market portfolio's expected return, and (E[Rm] − Rf) is the **market risk premium** — the extra return investors demand for holding risk at all. **Beta** (βi) is the asset-specific multiplier on that premium:

```
beta_i = Cov(Ri, Rm) / Var(Rm)
```

Beta measures how sensitive an asset's returns are to the market's returns — specifically, the covariance between the asset and the market, scaled by the market's own variance. A beta of 1.0 means the asset tends to move with the market one-for-one; a beta of 1.5 means it tends to amplify market moves by 50%; a beta of 0.5 means it tends to move only half as much as the market.

## Why beta, not total volatility

This is the single most important idea in CAPM, and it follows directly from Lesson 18's distinction between systematic and unsystematic risk. In a world where everyone holds a well-diversified portfolio (CAPM assumes they do, since that's the optimal thing to do per Lesson 19), unsystematic risk has already been diversified away in every investor's portfolio — so the market doesn't need to compensate anyone for bearing it; holding it was a voluntary, avoidable choice. **Only systematic risk — the risk that doesn't diversify away — gets a return premium**, and beta is precisely the measure of how much systematic risk an asset carries relative to the market. An asset's own standard deviation σ mixes systematic and unsystematic risk together; beta isolates just the systematic piece, which is why CAPM uses beta instead of σ as the risk measure that determines expected return.

## Security Market Line vs. Capital Market Line

These are two related but distinct lines, and mixing them up is one of the most common CAPM errors:

- **Capital Market Line (CML)**: plots expected return against **total risk (σ)**, for portfolios combining the risk-free asset with the market portfolio. Only efficient portfolios (combinations of the risk-free asset and the market) sit on this line — individual, non-diversified assets generally plot below it.
- **Security Market Line (SML)**: plots expected return against **beta**, and it's the direct graph of the CAPM formula itself. Every correctly priced asset or portfolio — diversified or not — sits exactly on the SML, by construction of the model.

The CML uses total risk and only describes efficient portfolios; the SML uses beta and describes every individual asset under CAPM's equilibrium assumptions.

## Worked example

Suppose the risk-free rate is 3%, the market's expected return is 9%, and a stock has a beta of 1.4.

```python
Rf, Rm, beta = 0.03, 0.09, 1.4
E_Ri = Rf + beta * (Rm - Rf)
# = 0.03 + 1.4 * (0.09 - 0.03) = 0.03 + 1.4*0.06 = 0.03 + 0.084 = 0.114
```

CAPM says this stock's expected return should be **11.4%** — the 3% risk-free rate plus 1.4 times the 6% market risk premium. If the stock's actual historical or forecast return differs meaningfully from 11.4%, that gap is exactly what **Jensen's alpha** (Lesson 22) will measure in the risk-adjusted performance toolkit.

## Key terms

| Term | Meaning |
|---|---|
| CAPM | E[Ri] = Rf + beta_i(E[Rm] − Rf); prices expected return as a function of systematic risk |
| Beta | Cov(Ri, Rm) / Var(Rm); an asset's sensitivity to market-wide moves |
| Market risk premium | E[Rm] − Rf; the extra return demanded for holding any risk at all |
| Security Market Line (SML) | Graph of expected return vs. beta; every correctly priced asset sits on it |
| Capital Market Line (CML) | Graph of expected return vs. total risk (sigma); only efficient portfolios sit on it |

## Recap

CAPM says E[Ri] = Rf + βi(E[Rm] − Rf): expected return is driven entirely by beta, the measure of systematic risk, because unsystematic risk is diversifiable and therefore doesn't earn a premium. The Security Market Line (beta vs. return) is the direct graph of this idea; the Capital Market Line (total risk vs. return) is a related but different concept describing only efficient portfolios. Next up, Lesson 21: factor models, which extend this single-beta idea to multiple sources of systematic risk at once.
