# Complex Matrix Computation Lab

This lab is where Lessons 10 through 12 come together into practice: you'll verify two real quantum gates and compute the eigenvalues of a genuinely complex Hermitian matrix, using exactly the tools — `.conj()`, `.T`, `@`, `np.allclose`, `np.linalg.eigvals` — introduced so far.

## What you'll learn

- How to run a complete unitary check on a gate from scratch, end to end
- How to run a complete Hermitian check, including a case that *fails* it on purpose
- How to compute eigenvalues of a 2x2 Hermitian matrix by hand and confirm them with `np.linalg.eigvalsh`
- Why a Hermitian matrix's eigenvalues always come out real, even when the matrix itself contains complex entries

## Setup: the two check functions

Carry over the two helper functions from Lesson 11 — every task below reuses them:

```python
import numpy as np

def is_unitary(U, tol=1e-10):
    n = U.shape[0]
    return np.allclose(U @ U.conj().T, np.eye(n), atol=tol)

def is_hermitian(A, tol=1e-10):
    return np.allclose(A, A.conj().T, atol=tol)
```

## Task 1: verify Pauli-Y is unitary

Build Pauli-Y and run it through `is_unitary`:

```python
Y = np.array([[0, -1j],
              [1j, 0]])

print(Y @ Y.conj().T)
# [[1.+0.j 0.+0.j]
#  [0.+0.j 1.+0.j]]

print(is_unitary(Y))
# True
```

This reproduces the Lesson 11 result directly: `Y @ Y.conj().T` is the identity matrix, confirmed by hand multiplication (`(-j)(j) = 1` and `(j)(-j) = 1` on the diagonal, `0` elsewhere), so `is_unitary(Y)` returns `True`.

## Task 2: verify the S-gate is unitary but not Hermitian

```python
S = np.array([[1, 0],
              [0, 1j]])

print(is_unitary(S))
# True

print(is_hermitian(S))
# False
```

Both results were confirmed in Lesson 11: `S @ S.conj().T` gives the identity matrix (`(j)(-j) = 1` on the diagonal), so `is_unitary(S)` is `True`. But `S` itself has `j` in its bottom-right corner while `S.conj().T` has `-j` there, so the two are not equal and `is_hermitian(S)` correctly returns `False`. This is your working proof, in code, that a gate being a valid unitary operation says nothing about whether it's also Hermitian.

## Task 3: eigenvalues of a complex Hermitian matrix

Here's a 2x2 matrix with genuinely complex off-diagonal entries:

```python
A = np.array([[2,    1+1j],
              [1-1j, 3   ]])

print(is_hermitian(A))
# True
```

`A` is Hermitian because its off-diagonal entries are conjugates of each other (`1+1j` and `1-1j`) and its diagonal entries (`2` and `3`) are real — exactly the pattern `A == A.conj().T` requires. Before letting NumPy compute the eigenvalues, work them out by hand using the trace/determinant shortcut for 2x2 matrices: `trace = 2 + 3 = 5`, and `det = (2)(3) - (1+1j)(1-1j) = 6 - (1^2 + 1^2) = 6 - 2 = 4` (since `(1+1j)(1-1j) = 1 - j^2 = 1+1 = 2`, a real number — this always happens for a Hermitian matrix's off-diagonal product). The eigenvalues solve `lambda^2 - 5*lambda + 4 = 0`, which factors as `(lambda-4)(lambda-1) = 0`, giving `lambda = 4` and `lambda = 1`.

Now confirm with NumPy's dedicated Hermitian eigenvalue solver:

```python
eigenvalues = np.linalg.eigvalsh(A)
print(eigenvalues)
# [1. 4.]
```

`np.linalg.eigvalsh` (the `h` is for Hermitian) returns `[1.0, 4.0]`, in ascending order — exactly matching the by-hand factoring above. Both eigenvalues are plain real numbers (no `+0j` residue at all), which is not a coincidence: **every Hermitian matrix has entirely real eigenvalues**, regardless of how many complex entries it contains off the diagonal. This is precisely why physicists use Hermitian matrices to represent observables — a measurement has to produce a real-numbered outcome (an energy, a spin value), and Hermitian matrices are the mathematical object that guarantees that by construction.

## Putting it together: why `eigvalsh` instead of `eigvals`

NumPy has two eigenvalue functions: the general-purpose `np.linalg.eigvals` works on any square matrix, while `np.linalg.eigvalsh` assumes the matrix is Hermitian and both runs faster and guarantees a real-valued result array (no stray `+0j` imaginary parts from rounding):

```python
print(np.linalg.eigvals(A))
# [1.+0.j 4.+0.j]   <- general-purpose version, returns complex dtype

print(np.linalg.eigvalsh(A))
# [1. 4.]           <- Hermitian-specific version, returns real dtype
```

Both return the same two numbers, `1` and `4` — the only difference is the general version's output carries complex dtype with a `+0j` tag (since it can't assume the imaginary part is exactly zero for an arbitrary matrix), while the Hermitian-specific version returns a plain real array directly. For code that already knows it's working with an observable or a density matrix, always reach for `eigvalsh` — it's both the faster and the more semantically correct choice.

## Key terms

| Term | Meaning |
|---|---|
| `np.linalg.eigvalsh` | Eigenvalue solver specialized for Hermitian matrices; returns real-valued eigenvalues directly |
| `np.linalg.eigvals` | General-purpose eigenvalue solver for any square matrix; returns complex-dtype results |
| Trace | The sum of a matrix's diagonal entries; equals the sum of its eigenvalues |
| Determinant (2x2) | `ad - bc` for `[[a,b],[c,d]]`; equals the product of a matrix's eigenvalues |
| Observable | A measurable physical quantity (energy, spin) represented in quantum mechanics by a Hermitian matrix, guaranteeing real-valued measurement outcomes |

## Check yourself

Using the same trace/determinant method from Task 3, work out the eigenvalues of the Hermitian matrix `B = [[0, 2-2j], [2+2j, 0]]` by hand (trace, determinant, then solve the quadratic). What are the two eigenvalues, and does the result confirm they're real, as the lesson's rule predicts?
