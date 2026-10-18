# Vector & Matrix Operations in NumPy

Quantum gates are matrices, quantum states are vectors, and "applying a gate" is just matrix-vector multiplication. This lesson covers the small set of NumPy operations — `@`, `.T`, `.conj()`, `np.dot` — that make up essentially all the math in quantum computing code.

## What you'll learn

- How to build vectors and matrices with `np.array` and multiply them correctly with `@`
- The difference between `@` (matrix multiplication) and `*` (element-wise multiplication)
- How `.T` (transpose) and `.conj()` (complex conjugate) combine into the conjugate transpose gates need
- How to apply a gate matrix to a qubit state vector and verify the result
- How to compute an inner product (`np.dot`) between two state vectors and what it means physically

## Building vectors and matrices

A qubit state is a column vector; a single-qubit gate is a 2x2 matrix. Both are just `np.array` calls — a 1D array for a vector, a list-of-lists (or nested array) for a matrix:

```python
import numpy as np

ket0 = np.array([1, 0])          # |0>
ket1 = np.array([0, 1])          # |1>

X = np.array([[0, 1],
              [1, 0]])           # Pauli-X ("bit flip")
Z = np.array([[1, 0],
              [0, -1]])          # Pauli-Z ("phase flip")
H = (1 / np.sqrt(2)) * np.array([[1, 1],
                                  [1, -1]])   # Hadamard
```

## `@` is matrix multiplication; `*` is not

This is the single most important distinction in this lesson. `*` on two NumPy arrays multiplies element-by-element (same shape required); `@` performs real matrix multiplication (rows times columns, shapes must be compatible in the linear-algebra sense):

```python
print(H * H)
# [[0.5  0.5]
#  [0.5  0.5]]   <- just squares each entry, NOT useful here

print(H @ H)
# [[1.  0.]
#  [0.  1.]]     <- real matrix product: the identity matrix
```

`H @ H` giving the identity matrix was verified by hand first: H = (1/sqrt(2))[[1,1],[1,-1]], and multiplying it by itself gives (1/2)[[1+1, 1-1],[1-1, 1+1]] = (1/2)[[2,0],[0,2]] = [[1,0],[0,1]]. This is a real fact about the Hadamard gate: applying it twice does nothing — `H` is its own inverse, confirmed here as exact floating-point output (`[[1,0],[0,1]]`, with the tiny `0.9999999999999998`-style rounding you'll sometimes see from floating point, which `np.allclose` handles — covered in Lesson 9).

## Applying a gate to a state: matrix-vector multiplication

`@` also works between a matrix and a vector — this is literally what "applying a gate" means in code:

```python
print(X @ ket0)
# [0 1]   -> this is |1>

print(X @ ket1)
# [1 0]   -> this is |0>

print(H @ ket0)
# [0.70710678 0.70710678]   -> this is |+>, the equal-superposition state
```

Each of these was hand-verified first: Pauli-X swaps the two basis vectors exactly (`X@|0> = |1>`, `X@|1> = |0>`), and `H @ ket0` gives `[1/sqrt(2), 1/sqrt(2)]` ≈ `[0.7071, 0.7071]` — the standard "plus state" every quantum algorithm starts a qubit in.

## Composing gates: matrix-matrix multiplication

Gates chain by matrix multiplication too, and order matters (`A @ B != B @ A` in general):

```python
print(X @ Z)
# [[ 0 -1]
#  [ 1  0]]

print(Z @ X)
# [[ 0  1]
#  [-1  0]]
```

`X @ Z` and `Z @ X` are negatives of each other — confirmed directly: `X@Z = [[0,-1],[1,0]]` while `Z@X = [[0,1],[-1,0]]`. This is the concrete, numeric face of the fact that Pauli matrices don't commute, which is the algebraic root of the uncertainty principle.

## Transpose and conjugate: building the "dagger"

Quantum mechanics constantly needs the **conjugate transpose** (written U†, pronounced "U dagger"): transpose the matrix, then take the complex conjugate of every entry. In NumPy that's `.T` and `.conj()` chained together:

```python
Y = np.array([[0, -1j],
              [1j, 0]])          # Pauli-Y

print(Y.T)
# [[0.+0.j 0.+1.j]
#  [0.-1.j 0.+0.j]]

print(Y.conj().T)
# [[0.-0.j 0.-1.j]
#  [0.+1.j 0.-0.j]]
```

`Y.conj().T` reconstructs Pauli-Y itself (`[[0,-1j],[1j,0]]`) — this was verified directly: Y's transpose is `[[0,1j],[-1j,0]]`, and conjugating each entry (flipping the sign of the imaginary part) gives back `[[0,-1j],[1j,0]]`, which equals `Y`. A matrix that equals its own conjugate transpose is called **Hermitian** — every valid quantum gate's corresponding observable matrix has this property, and it's exactly why Pauli-Y's eigenvalues come out as plain real numbers in Lesson 7, despite Y itself containing `i`.

## Inner products with `np.dot`

For real vectors, `np.dot(a, b)` is the familiar inner product — multiply matching entries and sum:

```python
print(np.dot(ket0, ket1))
# 0   -> |0> and |1> are orthogonal

plus = np.array([1, 1]) / np.sqrt(2)
minus = np.array([1, -1]) / np.sqrt(2)
print(np.dot(plus, plus))
# 1.0  -> plus is normalized
print(np.dot(plus, minus))
# 0.0  -> plus and minus are orthogonal
```

All three were confirmed numerically: `dot([1,0],[0,1]) = 0`, `dot(plus,plus) = 1.0` (within floating point, since `(1/sqrt2)^2 + (1/sqrt2)^2 = 0.5 + 0.5 = 1`), and `dot(plus,minus) = 0`. Physically, a dot product of zero between two state vectors means the states are **orthogonal** — perfectly distinguishable by measurement; a dot product of 1 between a normalized vector and itself confirms it's a valid probability-conserving state.

## Key terms

| Term | Meaning |
|---|---|
| `@` | NumPy's matrix multiplication operator — applies to matrix@matrix, matrix@vector, and vector@vector |
| `.T` | Transpose: flips a matrix across its diagonal, swapping rows and columns |
| `.conj()` | Complex conjugate: flips the sign of the imaginary part of every entry |
| Conjugate transpose (dagger, U†) | `.conj().T` applied together — the operation quantum mechanics uses to define "adjoint" |
| Hermitian matrix | A matrix equal to its own conjugate transpose (`A == A.conj().T`); its eigenvalues are always real |
| Orthogonal vectors | Two vectors whose dot product is 0 — physically, perfectly distinguishable quantum states |

## Check yourself

You compute `Z @ X` and separately `X @ Z` for the Pauli matrices and notice the two results are not equal — in fact they're exact negatives of each other. What does that numerically confirm about whether quantum gates can be applied "in any order," and why would mixing up gate order in real code silently produce a wrong but still-valid-looking state vector?
