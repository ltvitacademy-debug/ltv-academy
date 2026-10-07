# Singular Value Decomposition

Eigenvalues and eigenvectors are only defined for square matrices. Real data rarely comes square — a returns dataset might have 1,000 trading days and 50 assets. The **Singular Value Decomposition (SVD)** generalizes the eigen-idea to *any* matrix, square or not, and is the single most versatile decomposition in applied linear algebra: it underlies PCA, low-rank compression, and the pseudo-inverse used in regression.

## What you'll learn

- The SVD factorization $A = U\Sigma V^T$ and what each piece ($U$, $\Sigma$, $V^T$) represents
- Why singular values are always real and non-negative, unlike eigenvalues
- The relationship between the SVD of $A$ and the eigendecomposition of $A^TA$
- How to build a low-rank (compressed/denoised) approximation of a matrix by truncating the SVD, in NumPy

## The SVD factorization

Any real $m \times n$ matrix $A$ can be factored as:

$$A = U \Sigma V^T$$

where:

- $U$ is $m \times m$ and **orthogonal** ($U^TU = I$); its columns are the **left singular vectors**
- $\Sigma$ is $m \times n$ and **diagonal** (zero off the main diagonal), with entries $\sigma_1 \geq \sigma_2 \geq \dots \geq 0$, the **singular values**
- $V$ is $n \times n$ and **orthogonal**; its columns are the **right singular vectors**

Unlike eigendecomposition, **the SVD exists for every matrix**, with no requirement that $A$ be square, symmetric, or even invertible. Geometrically, $A$ maps the unit sphere in $\mathbb{R}^n$ to an ellipsoid in $\mathbb{R}^m$: $V$'s columns are the orthogonal input directions, $U$'s columns are the orthogonal output directions those map to, and the singular values are exactly the ellipsoid's semi-axis lengths.

## Connection to eigendecomposition

The SVD and the eigendecomposition of Lesson 8 are not separate ideas — they are the same idea applied to a related matrix. Because $A^TA$ is always symmetric and positive semi-definite:

$$A^TA = V\Sigma^T U^T U \Sigma V^T = V \Sigma^T\Sigma V^T$$

So the columns of $V$ are the eigenvectors of $A^TA$, and the singular values are the square roots of its eigenvalues: $\sigma_i = \sqrt{\lambda_i(A^TA)}$. This is exactly why singular values are always real and non-negative, even when $A$ itself is not square or symmetric: they are square roots of eigenvalues of a matrix ($A^TA$) that is guaranteed symmetric positive semi-definite.

## A worked numerical example

Consider a small matrix of centered daily returns for two assets over four days, $X$ (4 rows = days, 2 columns = assets):

```python
import numpy as np
np.set_printoptions(precision=5, suppress=True)

X = np.array([
    [ 0.010, -0.005],
    [-0.002,  0.008],
    [ 0.015,  0.004],
    [-0.023, -0.007],
])

U, S, Vt = np.linalg.svd(X, full_matrices=False)
print("singular values:", S)
# singular values: [0.02984 0.01102]

print("V^T (right singular vectors as rows):\n", Vt)
# [[-0.97857 -0.20591]
#  [ 0.20591 -0.97857]]

reconstruction = U @ np.diag(S) @ Vt
print("matches X:", np.allclose(reconstruction, X))   # True
```

The first right singular vector, $(-0.979, -0.206)$, is the direction in "asset return space" carrying the most variance across these four days — this is exactly the first principal component you will compute directly in Lesson 10, approached from a different decomposition.

## Low-rank approximation

Truncating the SVD to its largest $k$ singular values and the corresponding singular vectors gives the **best possible rank-$k$ approximation** of $A$ in the least-squares sense (the Eckart-Young theorem):

$$A_k = \sum_{i=1}^{k} \sigma_i \, \mathbf{u}_i \mathbf{v}_i^T$$

```python
rank1_approx = S[0] * np.outer(U[:, 0], Vt[0, :])
print(rank1_approx)
# [[ 0.00857  0.0018 ]
#  [-0.0003  -0.00006]
#  [ 0.01517  0.00319]
#  [-0.02344 -0.00493]]
```

This single rank-1 term already captures most of the structure in $X$ (its singular value, 0.02984, is nearly three times the second one, 0.01102) — the same mechanism used to denoise a large covariance matrix by keeping only its dominant singular/eigen directions and discarding the rest as noise.

## Key terms

| Term | Meaning |
|---|---|
| SVD | $A=U\Sigma V^T$, a factorization that exists for any matrix |
| Singular value | Diagonal entry of $\Sigma$; always real and non-negative |
| Left/right singular vectors | Orthogonal columns of $U$ / $V$ |
| $A^TA$ connection | $V$'s columns are $A^TA$'s eigenvectors; $\sigma_i=\sqrt{\lambda_i(A^TA)}$ |
| Low-rank approximation | Best rank-$k$ approximation of $A$, built from its top $k$ singular triplets |

## Recap

The SVD $A=U\Sigma V^T$ generalizes eigendecomposition to any matrix, with singular values that are always real and non-negative because they come from the eigenvalues of the symmetric matrix $A^TA$. Truncating the SVD to its largest few singular values gives the provably best low-rank approximation of the original matrix — the same move you will use directly to perform PCA in Lesson 10. Next up, Lesson 10: Covariance Matrices & Principal Components.
