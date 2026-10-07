# Vectors, Matrices & Linear Maps

Chapter 1 built the calculus of change. Chapter 2 builds the algebra of structure: vectors to represent portfolios and risk factors, matrices to represent the linear relationships between them, and the handful of operations — addition, scalar multiplication, matrix-vector and matrix-matrix multiplication — that every quant model is ultimately assembled from. Nearly everything downstream in this course (covariance, PCA, regression, risk decomposition) is linear algebra wearing a finance costume.

## What you'll learn

- Vectors as ordered lists of numbers, and the operations defined on them (addition, scalar multiplication, dot product)
- Matrices as linear maps: how a matrix transforms a vector, and what matrix-vector multiplication really computes
- The precise rule for matrix-matrix multiplication, including why dimensions must match
- A worked portfolio example: computing portfolio value and portfolio return with vectors and matrices in NumPy

## Vectors

A **vector** in $\mathbb{R}^n$ is an ordered list of $n$ real numbers, $\mathbf{v} = (v_1, v_2, \dots, v_n)$. Two operations define its algebra:

- **Addition**: $(\mathbf{u}+\mathbf{v})_i = u_i + v_i$ (componentwise)
- **Scalar multiplication**: $(c\mathbf{v})_i = c\, v_i$

The **dot product** of two vectors of the same length is $\mathbf{u} \cdot \mathbf{v} = \sum_{i=1}^n u_i v_i$, a single number. In finance, if $\mathbf{w}$ is a vector of portfolio weights and $\mathbf{p}$ is a vector of asset prices, $\mathbf{w} \cdot \mathbf{p}$ — if weights are share counts rather than fractions — gives total portfolio value; if $\mathbf{w}$ are fractional weights and $\mathbf{r}$ is a vector of asset returns, $\mathbf{w} \cdot \mathbf{r}$ is exactly the portfolio's return.

## Matrices as linear maps

An $m \times n$ **matrix** $A$ is a rectangular array of numbers with $m$ rows and $n$ columns. The central fact to internalize: **a matrix is a function that transforms vectors**. Multiplying $A$ (size $m \times n$) by a vector $\mathbf{x}$ (length $n$) produces a new vector $A\mathbf{x}$ (length $m$), defined row by row as a dot product:

$$(A\mathbf{x})_i = \sum_{j=1}^n A_{ij} x_j$$

This is a **linear map**: $A(c_1\mathbf{x} + c_2\mathbf{y}) = c_1 A\mathbf{x} + c_2 A\mathbf{y}$ for any scalars $c_1, c_2$ and vectors $\mathbf{x}, \mathbf{y}$. Every operation that respects addition and scaling this way can be represented by some matrix, and conversely every matrix defines such an operation.

**Worked example.** Suppose a factor model says each asset's return is a linear combination of $k$ common factors (market, size, value, ...): $\mathbf{r} = B\mathbf{f}$, where $B$ is an $n \times k$ matrix of factor loadings, $\mathbf{f}$ is the length-$k$ vector of factor returns, and $\mathbf{r}$ is the length-$n$ vector of asset returns. The matrix $B$ is literally the linear map translating factor moves into asset moves.

## Matrix-matrix multiplication

For matrices $A$ ($m \times n$) and $B$ ($n \times p$) — note the inner dimensions must match — the product $C = AB$ is an $m \times p$ matrix with entries:

$$C_{ij} = \sum_{k=1}^n A_{ik} B_{kj}$$

Each entry $C_{ij}$ is the dot product of row $i$ of $A$ with column $j$ of $B$. Matrix multiplication composes linear maps: if $A$ and $B$ are linear maps, $AB$ (applied as $(AB)\mathbf{x} = A(B\mathbf{x})$) is the linear map "do $B$ first, then $A$." Matrix multiplication is **associative** ($(AB)C = A(BC)$) but, critically, **not commutative** in general ($AB \neq BA$) — dimension mismatches aside, even square matrices rarely commute.

## A portfolio example in NumPy

```python
import numpy as np

# 4 assets, weights sum to 1
weights = np.array([0.30, 0.25, 0.20, 0.25])

# A 4x3 factor-loading matrix B: 4 assets, 3 factors (market, size, value)
B = np.array([
    [1.05, 0.20, -0.10],
    [0.95, -0.30, 0.40],
    [1.20, 0.50, -0.05],
    [0.85, 0.10, 0.30],
])
factor_returns = np.array([0.012, -0.004, 0.006])   # market, size, value moves

asset_returns = B @ factor_returns                  # matrix-vector multiply
portfolio_return = weights @ asset_returns           # dot product

print("asset returns:", np.round(asset_returns, 5))
print("portfolio return:", round(portfolio_return, 6))
# asset returns: [0.0112  0.015   0.0121  0.0116 ]
# portfolio return: 0.01243
```

The `@` operator is NumPy's matrix multiplication operator — `B @ factor_returns` performs exactly the row-by-row dot-product computation defined above, and `weights @ asset_returns` is a dot product collapsing four numbers into one.

## Key terms

| Term | Meaning |
|---|---|
| Vector | An ordered list of numbers; addition and scalar multiplication are componentwise |
| Dot product | $\mathbf{u}\cdot\mathbf{v} = \sum u_i v_i$, a single scalar |
| Matrix | A rectangular array of numbers representing a linear map |
| Linear map | A function respecting $A(c_1\mathbf{x}+c_2\mathbf{y}) = c_1A\mathbf{x}+c_2A\mathbf{y}$ |
| Matrix multiplication | $C_{ij} = \sum_k A_{ik}B_{kj}$; composes two linear maps |

## Recap

A vector is just an ordered list with addition and scaling defined componentwise, and a matrix is best understood not as a grid of numbers but as a linear map that transforms vectors — matrix-vector multiplication applies that map, and matrix-matrix multiplication composes two maps into one. The factor-model example showed this isn't abstract: $B\mathbf{f}$ is literally how factor returns become asset returns. Next up, Lesson 7: Systems of Equations & Matrix Decompositions, where we use this machinery to actually solve for unknowns.
