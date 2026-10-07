# Covariance Matrices & Principal Components

Every risk model in quant finance starts from the same object: the covariance matrix of asset returns. This lesson defines it precisely, proves it is always symmetric positive semi-definite (so everything from Lessons 7-9 applies to it directly), and then builds Principal Component Analysis (PCA) — the technique that uses its eigendecomposition to find the small number of "risk factors" that explain almost all of a portfolio's variance.

## What you'll learn

- The precise definition of the covariance matrix, $\Sigma = E[(X-\mu)(X-\mu)^T]$, and why it is always symmetric PSD
- Portfolio variance as a quadratic form, $\mathbf{w}^T\Sigma\mathbf{w}$
- How PCA uses $\Sigma$'s eigendecomposition to find uncorrelated risk factors, ranked by variance explained
- A worked 3-asset PCA example in NumPy, including the explained-variance ratio

## The covariance matrix

For a random vector $X = (X_1, \dots, X_n)^T$ (e.g. the returns of $n$ assets) with mean vector $\mu = E[X]$, the **covariance matrix** is:

$$\Sigma = E\big[(X-\mu)(X-\mu)^T\big], \qquad \Sigma_{ij} = \text{Cov}(X_i, X_j)$$

The diagonal entries $\Sigma_{ii} = \text{Var}(X_i)$ are each asset's own variance; the off-diagonal entries measure how pairs of assets move together. $\Sigma$ is always **symmetric** ($\Sigma_{ij}=\Sigma_{ji}$ since covariance is symmetric in its arguments) and always **positive semi-definite**: for any weight vector $\mathbf{w}$,

$$\mathbf{w}^T \Sigma \mathbf{w} = \text{Var}(\mathbf{w}^T X) \geq 0$$

because a variance can never be negative. This single fact is why every tool from Lessons 7-9 — Cholesky decomposition, real eigenvalues, orthogonal eigenvectors — applies automatically to any covariance matrix.

## Portfolio variance as a quadratic form

If $\mathbf{w}$ is a vector of portfolio weights, the portfolio's variance is exactly the quadratic form above:

$$\sigma_p^2 = \mathbf{w}^T \Sigma \mathbf{w} = \sum_{i=1}^n \sum_{j=1}^n w_i w_j \Sigma_{ij}$$

This single formula is the foundation of Markowitz mean-variance portfolio theory: minimizing $\mathbf{w}^T\Sigma\mathbf{w}$ subject to a target return is literally a constrained quadratic-form minimization problem, solved using exactly the linear algebra from Lesson 7.

## Principal Component Analysis

PCA asks: can we re-express the $n$ correlated assets as a smaller number of **uncorrelated** combinations that still capture most of the variance? The answer comes directly from $\Sigma$'s eigendecomposition $\Sigma = Q\Lambda Q^T$ (Lesson 8):

1. Each **eigenvector** $\mathbf{q}_i$ (a column of $Q$) is a **principal component direction**: a portfolio of the original assets.
2. Each corresponding **eigenvalue** $\lambda_i$ is exactly the variance of that portfolio: $\mathbf{q}_i^T \Sigma \mathbf{q}_i = \lambda_i$.
3. Sorting eigenvalues in decreasing order ranks the components by how much variance they explain; the **explained variance ratio** of component $i$ is $\lambda_i / \sum_j \lambda_j = \lambda_i / \text{trace}(\Sigma)$.
4. Because eigenvectors of a symmetric matrix are orthogonal, the principal components are, by construction, **uncorrelated** with each other.

This is why PCA on a large equity covariance matrix typically finds that the first component (loading positively on nearly every stock) behaves like "the market," explaining the bulk of total variance — a structural fact about equity markets, not an artifact of the math.

## A worked 3-asset example

```python
import numpy as np
np.set_printoptions(precision=5, suppress=True)

Sigma = np.array([
    [0.040, 0.018, 0.012],
    [0.018, 0.090, 0.030],
    [0.012, 0.030, 0.025],
])

eigenvalues, eigenvectors = np.linalg.eigh(Sigma)   # eigh: for symmetric matrices
order = np.argsort(eigenvalues)[::-1]               # sort descending
eigenvalues, eigenvectors = eigenvalues[order], eigenvectors[:, order]

explained_ratio = eigenvalues / np.trace(Sigma)
print("eigenvalues (PC variances):", eigenvalues)
# [0.10829 0.03438 0.01233]
print("explained variance ratio:", explained_ratio)
# [0.69865 0.22181 0.07954]

pc1 = eigenvectors[:, 0]
print("PC1 weights:", pc1)
# [-0.29649 -0.88411 -0.36116]
print("variance of PC1 portfolio:", pc1 @ Sigma @ pc1)   # equals eigenvalues[0]
```

`np.linalg.eigh` (not the general `eig` from Lesson 8) is the right tool here: it is written specifically for symmetric matrices, guaranteeing real eigenvalues and orthonormal eigenvectors directly. The first principal component alone explains about 70% of total variance in this toy example — in real multi-asset equity data, the first few components routinely explain 80-95%, which is exactly why risk managers compress hundreds of assets down to a handful of factors.

## Key terms

| Term | Meaning |
|---|---|
| Covariance matrix $\Sigma$ | $E[(X-\mu)(X-\mu)^T]$; always symmetric positive semi-definite |
| Quadratic form | $\mathbf{w}^T\Sigma\mathbf{w}$, the variance of a weighted combination |
| Principal component | An eigenvector of $\Sigma$; an uncorrelated portfolio direction |
| Explained variance ratio | $\lambda_i / \text{trace}(\Sigma)$, the share of total variance in component $i$ |
| `eigh` | NumPy's symmetric-matrix eigensolver, used instead of general `eig` |

## Recap

The covariance matrix $\Sigma$ is always symmetric positive semi-definite, which is exactly why portfolio variance is the quadratic form $\mathbf{w}^T\Sigma\mathbf{w}$ and why PCA can decompose it into uncorrelated principal components ranked by explained variance. In the worked example, three eigenvalues captured roughly 70%, 22%, and 8% of total variance respectively — the kind of concentration real risk models rely on to reduce dimensionality. Next up, the final lesson of this chapter, Lesson 11: Linear Algebra in NumPy, consolidating every operation from this chapter into one fluent toolkit.
