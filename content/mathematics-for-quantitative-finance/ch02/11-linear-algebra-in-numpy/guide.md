# Linear Algebra in NumPy

This closing lesson of Chapter 2 is deliberately a consolidation, not a new concept: every operation from Lessons 6-10 — vectors and matrices, solving systems, LU and Cholesky, eigendecomposition, SVD, and covariance/PCA — has a direct, well-tested NumPy or SciPy call. The goal here is fluency: knowing which function to reach for, what it returns, and the gotchas (array shape, `eig` versus `eigh`, row versus column vectors) that trip people up in practice.

## What you'll learn

- NumPy's core array operations for vectors and matrices, and how `@` differs from `*`
- `np.linalg.solve`, `det`, `inv`, `norm` — the everyday system-solving toolkit, and why `solve` beats `inv`
- The three decompositions (`eig`/`eigh`, `svd`, `cholesky`) in one place, with their correct use cases
- A short, correct checklist for choosing the right NumPy/SciPy function for a given linear-algebra task

## Vectors and matrices: the basics

```python
import numpy as np

v = np.array([1.0, 2.0, 3.0])          # a vector (1-D array)
A = np.array([[4.0, 2.0], [2.0, 3.0]])  # a 2x2 matrix (2-D array)

dot = v[:2] @ v[:2]        # dot product via @ on 1-D arrays: 1*1 + 2*2 = 5
elementwise = v * v        # * is ELEMENTWISE: [1, 4, 9], not a dot product
matvec = A @ np.array([1.0, 1.0])   # matrix-vector multiply via @
```

**The single most common NumPy mistake**: `*` between two arrays is *elementwise* multiplication, not matrix or dot-product multiplication. Matrix and matrix-vector multiplication always use `@` (or `np.matmul` / `np.dot` for older code).

## Solving systems: `solve`, not `inv`

```python
A = np.array([[4.0, 2.0], [2.0, 3.0]])
b = np.array([1.0, 2.0])

x = np.linalg.solve(A, b)
print(x)   # [-0.125  0.75]

# Equivalent but WORSE in practice:
x_slow = np.linalg.inv(A) @ b
print(x_slow)   # [-0.125  0.75]  (same answer, here)
```

Both lines give the same answer, but `solve` uses Gaussian-elimination-style factorization internally (Lesson 7) and is both **faster and more numerically stable** than explicitly computing $A^{-1}$ and multiplying. Explicitly inverting a matrix amplifies rounding error unnecessarily — reach for `solve` whenever the actual goal is "solve $A\mathbf{x}=\mathbf{b}$," and reserve `inv` for when you genuinely need the inverse matrix itself.

Other everyday tools:

```python
np.linalg.det(A)            # determinant: 8.0
np.linalg.norm(np.array([3.0, 4.0]))   # Euclidean length: 5.0
np.trace(A)                 # sum of diagonal entries: 7.0
A.T                          # transpose
```

## The three decompositions, side by side

```python
# 1. Eigendecomposition — use eigh for SYMMETRIC matrices (Lesson 8, 10)
eigenvalues, eigenvectors = np.linalg.eigh(A)
print(eigenvalues)   # [1.43845 5.56155]   (ascending order, guaranteed real)

# For a general, possibly non-symmetric matrix, use eig instead (may return complex results)
# eigenvalues, eigenvectors = np.linalg.eig(A)

# 2. Singular Value Decomposition — works on ANY matrix, square or not (Lesson 9)
U, S, Vt = np.linalg.svd(A)
print(S)   # [5.56155 1.43845]   (descending order, always non-negative)

# 3. Cholesky — requires SYMMETRIC POSITIVE DEFINITE (Lesson 7); covariance matrices qualify
from scipy.linalg import cholesky
L = cholesky(A, lower=True)
print(np.allclose(L @ L.T, A))   # True
```

Notice `eigh`'s eigenvalues (ascending: 1.43845, 5.56155) and `svd`'s singular values (descending: 5.56155, 1.43845) are the *same two numbers* in opposite order — expected, since $A$ here is symmetric positive definite, so its eigenvalues and singular values coincide exactly.

## A function-choice checklist

| You want to... | Use |
|---|---|
| Solve $A\mathbf{x}=\mathbf{b}$ | `np.linalg.solve(A, b)` — never `inv` unless you need $A^{-1}$ itself |
| Matrix or matrix-vector multiply | `@`, never `*` |
| Eigenvalues of a symmetric matrix (e.g. covariance) | `np.linalg.eigh(A)` |
| Eigenvalues of a general (possibly asymmetric) matrix | `np.linalg.eig(A)` |
| Decompose *any* matrix, square or not | `np.linalg.svd(A)` |
| Factor a symmetric positive definite matrix fast | `scipy.linalg.cholesky(A, lower=True)` |
| Check two arrays are numerically equal | `np.allclose(a, b)`, never `a == b` on floats |

## Key terms

| Term | Meaning |
|---|---|
| `@` | Matrix/matrix-vector/dot-product multiplication operator in NumPy |
| `np.linalg.solve` | Solves $A\mathbf{x}=\mathbf{b}$ directly, faster and more stable than inverting |
| `eigh` vs `eig` | Symmetric-only (real, orthonormal) vs general (possibly complex) eigensolver |
| `np.linalg.svd` | Singular value decomposition; works for any matrix shape |
| `np.allclose` | Tolerance-based equality check for floating-point arrays |

## Recap

Every piece of linear algebra from this chapter reduces to a short, specific NumPy or SciPy call: `@` for multiplication, `solve` (not `inv`) for systems, `eigh` for symmetric eigendecomposition, `svd` for any matrix at all, and `cholesky` for symmetric positive definite matrices like covariance. This closes Chapter 2 on Linear Algebra. Next up, Chapter 3 begins with Lesson 12: Probability Spaces & Random Variables, where the expectation integral from Lesson 3 gets a fully rigorous probabilistic foundation.
