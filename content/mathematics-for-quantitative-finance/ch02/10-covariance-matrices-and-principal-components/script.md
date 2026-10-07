# Script — Covariance Matrices & Principal Components

## Segment 1 (title)

Every risk model in quant finance starts from the same object, the covariance matrix of asset returns. This lesson defines it precisely, shows it's always symmetric and positive semi-definite, and builds principal component analysis, which uses its eigendecomposition to find a handful of risk factors that explain almost all of a portfolio's variance.

## Segment 2 (code)

The covariance matrix's diagonal holds each asset's own variance, and the off-diagonal entries measure how pairs of assets move together. For any set of portfolio weights, the weighted combination's variance can never be negative, and that single fact guarantees the matrix is always symmetric positive semi-definite.

## Segment 3 (steps)

That matters because portfolio variance is exactly that quadratic form, w transpose sigma w. Minimizing it subject to a target return is the entire Markowitz mean-variance problem, and it's solved with the same linear algebra from a few lessons back.

## Segment 4 (steps)

PCA takes the covariance matrix's eigendecomposition and reinterprets it: each eigenvector is a portfolio, each eigenvalue is that portfolio's variance, and because eigenvectors of a symmetric matrix are orthogonal, these portfolios are automatically uncorrelated with each other.

## Segment 5 (code)

Run it on a small three-asset example and the three eigenvalues explain roughly seventy, twenty-two, and eight percent of total variance. In real equity data the first few components routinely explain the vast majority, which is why risk managers compress hundreds of assets down to a handful of factors.

## Segment 6 (outro)

A covariance matrix is always symmetric positive semi-definite, portfolio variance is its quadratic form, and PCA ranks its eigenvectors by how much variance each uncorrelated portfolio explains. Up next, the final lesson of this chapter, lesson eleven: linear algebra in NumPy, consolidating everything into one toolkit.
