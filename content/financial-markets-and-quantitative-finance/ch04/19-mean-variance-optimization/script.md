# Script — Mean-Variance Optimization

## Segment 1 (title)

Combining imperfectly correlated assets can produce a portfolio less risky than its parts. So which combination of weights is actually best? Harry Markowitz answered that in 1952, with a framework that's still the starting point for portfolio construction today.

## Segment 2 (code)

The problem is: minimize portfolio variance, subject to hitting a target expected return, with weights summing to one. In plain language, find the portfolio weights that produce the lowest possible risk among every portfolio that achieves a given target return. The variance term is just the matrix version of the two-asset formula from the last lesson, generalized to however many assets you're holding, with every pairwise covariance included.

## Segment 3 (steps)

Solve that problem once for every possible target return, and plot the resulting risk and return pairs — that's the efficient frontier, the set of portfolios offering the best possible tradeoff. Any portfolio not on the frontier is dominated: something exists with the same return and less risk, or the same risk and more return, so no rational investor would hold it. One special point needs no return target at all — the minimum-variance portfolio, sitting at the frontier's leftmost tip.

## Segment 4 (code)

The minimum-variance weights have a clean closed form: the inverse of the covariance matrix times a vector of ones, normalized so the weights sum to one. But this whole framework is only as good as its inputs — every asset's expected return, plus every pairwise covariance. For N assets, the number of covariance terms grows roughly with the square of N, and expected returns in particular are notoriously hard to estimate — small errors can swing the optimal weights dramatically.

## Segment 5 (outro)

Markowitz gives you the best possible risk-return tradeoff, mechanically, from a covariance matrix and expected returns. Up next, lesson twenty: the capital asset pricing model, which builds directly on this framework to explain how risk gets priced in equilibrium.
