# Systems of Equations & Matrix Decompositions

A system of linear equations is the same object as a matrix equation $A\mathbf{x} = \mathbf{b}$, and solving it is one of the most common operations in quant finance: calibrating a model to market prices, computing hedge ratios, or finding portfolio weights that replicate a target cash-flow profile. This lesson covers Gaussian elimination (how solving actually works), then the two decompositions — LU and Cholesky — that make solving fast and numerically stable in practice.

## What you'll learn

- How a system of linear equations becomes the matrix equation $A\mathbf{x}=\mathbf{b}$
- Gaussian elimination: the row-reduction algorithm that solves any solvable system
- LU decomposition: factoring $A = LU$ so the same system can be re-solved cheaply for new right-hand sides
- Cholesky decomposition: the special, faster factorization available when $A$ is symmetric positive definite — exactly the case for covariance matrices

## From equations to a matrix equation

A system like

$$2x_1 + 3x_2 = 8, \qquad 5x_1 - x_2 = 1$$

is exactly $A\mathbf{x} = \mathbf{b}$ with $A = \begin{pmatrix}2 & 3\\5 & -1\end{pmatrix}$, $\mathbf{x} = \begin{pmatrix}x_1\\x_2\end{pmatrix}$, $\mathbf{b} = \begin{pmatrix}8\\1\end{pmatrix}$. A **unique solution** exists exactly when $A$ is invertible, equivalently when $\det(A) \neq 0$.

**Finance framing.** If $A$ holds the cash flows of a set of bonds at various future dates and $\mathbf{b}$ is a target liability stream, $\mathbf{x}$ is the vector of bond holdings that replicates that liability exactly — a bond-portfolio immunization problem is literally $A\mathbf{x}=\mathbf{b}$.

## Gaussian elimination

**Gaussian elimination** solves $A\mathbf{x}=\mathbf{b}$ by performing row operations (swap two rows, scale a row, add a multiple of one row to another — none of which change the solution set) to reduce $[A \mid \mathbf{b}]$ to **row-echelon form**, then **back-substituting** from the last equation upward.

**Worked example.** For the system above: eliminate $x_1$ from the second equation by subtracting $\frac{5}{2}$ times row 1 from row 2:

Row 2 becomes $\left(5 - \frac{5}{2}\cdot 2\right)x_1 + \left(-1 - \frac{5}{2}\cdot 3\right)x_2 = 1 - \frac{5}{2}\cdot 8 \;\Rightarrow\; -\frac{17}{2}x_2 = -19$, so $x_2 = \frac{38}{17}$. Back-substituting into row 1: $2x_1 = 8 - 3\cdot\frac{38}{17} = \frac{136-114}{17}=\frac{22}{17}$, so $x_1 = \frac{11}{17}$.

## LU decomposition

Gaussian elimination is itself a factorization in disguise: it expresses $A = LU$, where $L$ is **lower triangular** (with 1's on the diagonal) recording the row-elimination multipliers, and $U$ is **upper triangular**, the row-echelon result. Once you have $L$ and $U$, solving $A\mathbf{x}=\mathbf{b}$ becomes two cheap triangular solves instead of one expensive elimination:

1. Solve $L\mathbf{y} = \mathbf{b}$ by forward substitution.
2. Solve $U\mathbf{x} = \mathbf{y}$ by back substitution.

This matters enormously in practice: if you need to solve $A\mathbf{x} = \mathbf{b}_1, A\mathbf{x}=\mathbf{b}_2, \dots$ for many right-hand sides with the *same* $A$ (for example, repricing a book against many scenario shocks), you factor $A$ once and reuse $L, U$ for every $\mathbf{b}_i$, which is dramatically cheaper than re-running elimination from scratch each time.

## Cholesky decomposition

When $A$ is **symmetric** ($A = A^T$) and **positive definite** (all eigenvalues strictly positive, equivalently $\mathbf{x}^T A \mathbf{x} > 0$ for all nonzero $\mathbf{x}$), there is a faster, numerically nicer factorization:

$$A = LL^T$$

where $L$ is lower triangular with positive diagonal entries. This is the **Cholesky decomposition**, and it exists if and only if $A$ is symmetric positive definite. **A covariance matrix is exactly this kind of object** (symmetric by construction, and positive semi-definite always, positive definite when no asset is a perfect linear combination of the others) — which is precisely why Cholesky is the standard tool for simulating correlated asset returns: given independent standard normal draws $\mathbf{z}$, the vector $L\mathbf{z}$ has covariance matrix exactly $LL^T = \Sigma$.

## Solving systems and factoring in NumPy/SciPy

```python
import numpy as np
from scipy.linalg import lu, cholesky, solve

A = np.array([[2.0, 3.0], [5.0, -1.0]])
b = np.array([8.0, 1.0])

x = solve(A, b)
print("solution x:", x)
# solution x: [0.64705882 2.23529412]   (matches 11/17, 38/17)

Sigma = np.array([[0.04, 0.012], [0.012, 0.09]])   # a 2-asset covariance matrix
L = cholesky(Sigma, lower=True)
print("Cholesky L:\n", L)
# [[0.2        0.       ]
#  [0.06       0.29393877]]   -- and L @ L.T reproduces Sigma exactly

z = np.random.default_rng(0).standard_normal(2)
correlated_shock = L @ z   # has covariance Sigma
```

## Key terms

| Term | Meaning |
|---|---|
| Matrix equation $A\mathbf{x}=\mathbf{b}$ | The matrix form of a linear system; uniquely solvable iff $A$ is invertible |
| Gaussian elimination | Row-reduction algorithm that solves $A\mathbf{x}=\mathbf{b}$ |
| LU decomposition | $A=LU$, triangular factors enabling cheap repeated solves |
| Cholesky decomposition | $A=LL^T$, for symmetric positive definite $A$ (e.g. covariance matrices) |
| Positive definite | $\mathbf{x}^TA\mathbf{x}>0$ for all nonzero $\mathbf{x}$ |

## Recap

A linear system is a matrix equation, solved exactly by Gaussian elimination, which secretly factors $A$ into $L$ and $U$ so repeated solves against new right-hand sides become cheap triangular substitutions. When $A$ is symmetric positive definite — as every covariance matrix is — the even cheaper Cholesky factorization $A=LL^T$ applies, and it is the standard tool for simulating correlated returns. Next up, Lesson 8: Eigenvalues & Eigenvectors, the decomposition that reveals a matrix's own natural directions.
