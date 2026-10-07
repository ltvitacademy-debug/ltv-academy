# Linear Algebra Routines in Practice

Portfolio construction, risk decomposition, and PCA all reduce to a handful of linear algebra operations: solving `Ax = b`, decomposing a matrix into eigenvalues and eigenvectors, and the singular value decomposition that generalizes eigendecomposition to non-square matrices. `numpy.linalg` and `scipy.linalg` provide both; this lesson works through each with a quant portfolio example and covers matrix conditioning — why some systems amplify small errors far more than others.

## What you'll learn

- `numpy.linalg` vs. `scipy.linalg`: when to reach for which
- Solving `Ax = b` correctly (`solve`, not computing an explicit inverse)
- Eigendecomposition of a covariance matrix
- SVD and its connection to PCA
- Covariance and correlation matrices for a small portfolio
- Condition numbers and what an ill-conditioned matrix means practically

## numpy.linalg vs. scipy.linalg

`numpy.linalg` covers the essentials (`solve`, `inv`, `eig`, `svd`, `det`) and has no dependency beyond NumPy itself. `scipy.linalg` is a superset: it includes everything NumPy's version does, plus more specialized decompositions (LU, Schur, matrix functions like `expm`) and, for some operations, better-tested LAPACK bindings. For the operations both provide, results are equivalent; use `scipy.linalg` by default in a codebase that already depends on SciPy, and `numpy.linalg` when you want to avoid the extra dependency.

## Solving Ax = b the right way

Given a linear system `Ax = b`, it's tempting to compute `A`'s inverse and multiply. Don't — `solve` is both faster and more numerically stable, because computing an explicit inverse does unnecessary extra work and amplifies rounding error along the way:

```python
import numpy as np

A = np.array([[3.0, 1.0], [1.0, 2.0]])
b = np.array([9.0, 8.0])

x = np.linalg.solve(A, b)        # correct, fast, stable
print(x)                          # [2. 3.]

x_bad = np.linalg.inv(A) @ b      # works here, but avoid this pattern
```

The difference matters most on larger, less well-behaved systems, where `inv` can introduce meaningfully more error than `solve` for the exact same mathematical problem.

## Eigendecomposition of a covariance matrix

A covariance matrix is square and symmetric, which guarantees real eigenvalues and orthogonal eigenvectors. Eigendecomposition expresses it as `C = V Λ V^T`, where `Λ` is diagonal (the eigenvalues) and the columns of `V` are the eigenvectors — the directions of uncorrelated risk, each with its own variance:

```python
returns = np.random.multivariate_normal(
    mean=[0, 0, 0],
    cov=[[0.04, 0.02, 0.01], [0.02, 0.09, 0.015], [0.01, 0.015, 0.01]],
    size=500,
)
cov_matrix = np.cov(returns, rowvar=False)

eigvals, eigvecs = np.linalg.eigh(cov_matrix)   # eigh: for symmetric matrices
print(eigvals)          # ascending order
print(eigvecs[:, -1])   # eigenvector for the largest eigenvalue = dominant risk factor
```

Use `eigh`, not the general-purpose `eig`, whenever you know the matrix is symmetric (covariance matrices always are) — it's faster and numerically more reliable because it exploits that structure instead of handling the fully general case.

## SVD and its connection to PCA

The singular value decomposition `A = U Σ V^T` generalizes eigendecomposition to any matrix, square or not. For a mean-centered data matrix, SVD and PCA are directly connected: the right singular vectors (`V`) are the principal component directions, and the singular values (`Σ`) relate to the variance explained by each component.

```python
centered = returns - returns.mean(axis=0)
U, S, Vt = np.linalg.svd(centered, full_matrices=False)

explained_variance = (S ** 2) / (len(returns) - 1)
print(explained_variance / explained_variance.sum())   # fraction of variance per component
```

Running PCA via SVD on the data matrix directly (rather than first forming the covariance matrix and eigendecomposing that) is generally the more numerically stable path, since it avoids the extra rounding error introduced by explicitly computing `X^T X`.

## Covariance and correlation for a small portfolio

Correlation is covariance normalized by each asset's own standard deviation, which puts every pairwise relationship on a -1 to 1 scale regardless of each asset's volatility:

```python
import pandas as pd

tickers = ["A", "B", "C"]
returns_df = pd.DataFrame(returns, columns=tickers)
cov = returns_df.cov()
corr = returns_df.corr()
print(corr)
#           A         B         C
# A  1.000000  0.333333  0.500000
# B  0.333333  1.000000  0.500000
# C  0.500000  0.500000  1.000000
```

Portfolio variance for weights `w` is `w^T C w`, where `C` is the covariance matrix — the eigendecomposition above is what tells you *which directions* in weight-space concentrate that risk.

## Condition numbers and ill-conditioning

A matrix's **condition number** measures how much it can amplify a small error in the input when solving `Ax = b`. A condition number near 1 is well-conditioned; a very large one means the system is sensitive to tiny perturbations — including the floating-point rounding error from Lesson 7 itself:

```python
A_good = np.array([[2.0, 0.0], [0.0, 2.0]])
A_bad = np.array([[1.0, 1.0], [1.0, 1.0000001]])

print(np.linalg.cond(A_good))   # ~1.0 -- well-conditioned
print(np.linalg.cond(A_bad))    # very large -- nearly singular, ill-conditioned
```

A near-singular covariance matrix (common when you have more assets than observations, or highly correlated assets) is exactly this situation: small data changes or rounding error can swing the "optimal" portfolio weights dramatically. `np.linalg.cond` is a quick diagnostic before trusting a solved system or an inverted covariance matrix — a very large condition number is a signal to regularize (shrinkage estimators, adding a small multiple of the identity) rather than trust the raw solve.

## Key terms

| Term | Meaning |
|---|---|
| `solve` | Solves `Ax = b` directly; preferred over computing an explicit inverse |
| `eigh` | Eigendecomposition specialized for symmetric matrices (covariance matrices) |
| SVD | `A = U Σ V^T`; generalizes eigendecomposition to any matrix, underlies PCA |
| Correlation matrix | Covariance normalized to a -1 to 1 scale per pair |
| Condition number | How much a matrix amplifies small input errors when solving a linear system |

## Recap

Solve linear systems with `solve`, not an explicit inverse; use `eigh` for symmetric covariance matrices; and SVD on a centered data matrix is both the connection to PCA and the numerically preferred path to it. A matrix's condition number tells you how much it will amplify small errors — including ordinary floating-point rounding — which matters most for near-singular covariance matrices in portfolios with correlated assets. Next lesson: numerical integration and root-finding, with bond yield and implied volatility as the running quant examples.
