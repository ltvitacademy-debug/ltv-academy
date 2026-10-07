# Script — The Capital Asset Pricing Model

## Segment 1 (title)

Mean-variance optimization tells you how to build the best portfolio from given inputs. CAPM asks a different question: in an equilibrium where everyone does that, what should any individual asset's expected return actually be? The answer depends on exactly one number per asset, and it isn't that asset's own volatility.

## Segment 2 (code)

CAPM says expected return equals the risk-free rate, plus beta times the market risk premium — the market's expected return minus the risk-free rate. Beta is the covariance between the asset and the market, scaled by the market's own variance. A beta of one means the asset moves with the market one for one; above one amplifies market moves, below one dampens them.

## Segment 3 (steps)

Here's why beta, specifically, drives expected return. If every investor holds a well-diversified portfolio, which is the optimal thing to do, unsystematic risk has already been diversified away for everyone — so the market doesn't need to pay anyone extra for bearing it, since holding it unhedged was avoidable. Only systematic risk, the risk that doesn't diversify away, earns a premium. An asset's own standard deviation mixes both kinds of risk together; beta isolates just the systematic piece.

## Segment 4 (steps)

Two related lines are easy to confuse. The security market line plots expected return against beta, and it's the direct graph of the CAPM formula — every correctly priced asset, diversified or not, sits exactly on it. The capital market line plots expected return against total risk, but only for efficient portfolios combining the risk-free asset and the market — individual assets generally plot below it.

## Segment 5 (outro)

With a three percent risk-free rate, nine percent market return, and a beta of 1.4, CAPM prices this stock's expected return at 11.4 percent — three percent plus 1.4 times the six-point market premium. Up next, lesson twenty-one: factor models, which extend this single-beta idea to multiple sources of systematic risk at once.
