# Eigenvalues & Eigenvectors With numpy.linalg

Every measurement outcome in quantum mechanics is an eigenvalue, and every "definite state" a measurement can collapse into is an eigenvector. `numpy.linalg.eig` and `eigvalsh` compute both directly from a gate or observable matrix — this lesson connects the math to the NumPy calls you'll actually use.

## What you'll learn

- What an eigenvalue/eigenvector pair means for a matrix, in plain algebraic terms
- How to solve a 2x2 eigenvalue problem by hand using trace and determinant, then confirm it with NumPy
- Why the Pauli matrices' eigenvalues (±1) are exactly the possible measurement outcomes in quantum mechanics
- The difference between `np.linalg.eig` (general matrices) and `np.linalg.eigvalsh` (Hermitian matrices)
- How to verify an eigenvector satisfies `A @ v == lambda * v` numerically

## What an eigenvector/eigenvalue pair means

A vector `v` is an eigenvector of matrix `A` with eigenvalue `λ` (lambda) if applying `A` to `v` doesn't rotate or reshape `v` at all — it only scales it: `A @ v = λ * v`. Everywhere else, matrix multiplication changes a vector's direction; eigenvectors are the special directions a matrix leaves alone.

## Solving a 2x2 eigenvalue problem by hand

For a 2x2 matrix `[[a, b], [c, d]]`, the two eigenvalues always equal `(trace ± sqrt(trace^2 - 4*det)) / 2`, where `trace = a + d` and `det = a*d - b*c`. Apply this to Pauli-Z, `[[1, 0], [0, -1]]`: trace = 1 + (-1) = 0, det = (1)(-1) - (0)(0) = -1. Eigenvalues = `(0 ± sqrt(0 - 4*(-1)))/2 = (0 ± sqrt(4))/2 = (0 ± 2)/2 = +1, -1`.

This was confirmed by direct computation: Pauli-Z's eigenvalues are exactly **+1 and -1**. Its eigenvectors are the standard basis vectors themselves — `Z @ [1,0] = [1,0]` (eigenvalue +1) and `Z @ [0,1] = -[0,1]` (eigenvalue -1) — because Z is already diagonal.

Pauli-X, `[[0, 1], [1, 0]]`, is less obvious since it isn't diagonal: trace = 0, det = (0)(0) - (1)(1) = -1, giving the same eigenvalues **+1 and -1**. But its eigenvectors are not the standard basis — they're `[1,1]/sqrt(2)` and `[1,-1]/sqrt(2)`. This was verified directly: `X @ [0.7071, 0.7071] = [0.7071, 0.7071]` (unchanged, confirming eigenvalue +1), and `X @ [0.7071, -0.7071] = [-0.7071, 0.7071]`, which equals `-1 * [0.7071, -0.7071]` (confirming eigenvalue -1).

## Confirming it with `np.linalg.eig`

```python
import numpy as np

X = np.array([[0, 1],
              [1, 0]])

eigenvalues, eigenvectors = np.linalg.eig(X)
print(eigenvalues)
# [ 1. -1.]

print(eigenvectors)
# [[ 0.70710678 -0.70710678]
#  [ 0.70710678  0.70710678]]
```

`np.linalg.eig` returns eigenvalues as a 1D array and eigenvectors as a matrix whose **columns** (not rows) are the eigenvectors — `eigenvectors[:, 0]` is the eigenvector for `eigenvalues[0]`. The values printed here exactly match the by-hand result above: `+1` paired with `[0.7071, 0.7071]`, `-1` paired with `[-0.7071, 0.7071]` (the sign of a whole eigenvector is arbitrary — NumPy may flip it, but it still satisfies `X @ v = -1 * v`).

## Why this matters physically: eigenvalues are measurement outcomes

In quantum mechanics, measuring a qubit along a given axis (X, Y, or Z) can only ever produce one of that observable's eigenvalues — never anything in between. Pauli-Z's eigenvalues `{+1, -1}` are exactly the two outcomes of a Z-basis measurement ("0" and "1"); Pauli-X's eigenvalues are also `{+1, -1}`, but along a different physical axis, with different eigenvectors (`|+>` and `|->` instead of `|0>` and `|1>`). This is why eigenvalues aren't just a math exercise here — `np.linalg.eig` is directly computing "what readings this measurement can produce."

## A non-diagonal Hermitian example, worked and verified

Take `M = [[2, 1], [1, 2]]` — symmetric (Hermitian, since it's real and equal to its own transpose), but not diagonal. By hand: trace = 4, det = 4 - 1 = 3. Eigenvalues = `(4 ± sqrt(16-12))/2 = (4 ± 2)/2 = 3, 1`.

This was confirmed two ways: the formula gives **3 and 1**, and plugging in candidate eigenvectors confirms it — `M @ [0.7071, 0.7071] = [2.1213, 2.1213]`, which is exactly `3 * [0.7071, 0.7071]` (since `3 * 0.7071 = 2.1213`), and `M @ [0.7071, -0.7071] = [0.7071, -0.7071]` unchanged, confirming eigenvalue `1`.

```python
M = np.array([[2, 1],
              [1, 2]])
eigenvalues = np.linalg.eigvalsh(M)
print(eigenvalues)
# [1. 3.]
```

## `eig` vs. `eigvalsh`: pick based on whether the matrix is Hermitian

`np.linalg.eig` works on any square matrix and can return complex eigenvalues for non-Hermitian input. `np.linalg.eigvalsh` is specialized for **Hermitian** (or real symmetric) matrices — exactly the kind quantum observables and gate generators always are — and guarantees real eigenvalues back, sorted in ascending order, using a more numerically stable algorithm than the general-purpose `eig`. Every Pauli matrix and every Hamiltonian you'll encounter in this course is Hermitian, so `eigvalsh` (or `eigh` if you also want the eigenvectors) is usually the right, faster choice.

## Key terms

| Term | Meaning |
|---|---|
| Eigenvector | A vector that a matrix only scales, never rotates: `A @ v = λ * v` |
| Eigenvalue (λ) | The scaling factor applied to an eigenvector; in quantum mechanics, a possible measurement outcome |
| Trace | The sum of a matrix's diagonal entries, used in the 2x2 eigenvalue formula |
| Determinant | `a*d - b*c` for a 2x2 matrix `[[a,b],[c,d]]`, also used in the eigenvalue formula |
| `np.linalg.eig` | General eigenvalue/eigenvector solver; may return complex results for non-Hermitian matrices |
| `np.linalg.eigvalsh` | Specialized solver for Hermitian/symmetric matrices; guarantees real, sorted eigenvalues |

## Check yourself

Pauli-X and Pauli-Z both have eigenvalues {+1, -1}, yet they represent physically different measurements with different possible outcome states. Using what you now know about eigenvectors, explain concretely what actually distinguishes an X-measurement from a Z-measurement if the eigenvalues themselves are identical.
