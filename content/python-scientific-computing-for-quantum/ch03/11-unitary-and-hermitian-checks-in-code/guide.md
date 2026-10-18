# Unitary & Hermitian Checks in Code

Not every 2x2 matrix of numbers is a valid quantum gate, and not every Hermitian-looking matrix actually is Hermitian. This lesson turns the two defining properties of quantum gates and observables — **unitary** and **Hermitian** — into a few lines of NumPy you can run against any matrix to find out which category it belongs to.

## What you'll learn

- The formal definitions of unitary (`U @ U.conj().T == I`) and Hermitian (`A == A.conj().T`)
- How to write a small, reusable `is_unitary()` / `is_hermitian()` check in NumPy
- Why Pauli-Y is both unitary and Hermitian, verified with real matrix multiplication
- Why the S-gate (phase gate) is unitary but *not* Hermitian — the two properties are independent
- Why a gate that is unitary must preserve a state vector's norm when applied to it

## Two different questions about a matrix

**Unitary** asks: "does this matrix preserve length?" Formally, `U` is unitary if `U @ U.conj().T` equals the identity matrix `I`. Every valid quantum gate must be unitary — that's the mathematical reason quantum computation never loses or creates probability.

**Hermitian** asks a different question: "is this matrix equal to its own conjugate transpose?" Formally, `A` is Hermitian if `A == A.conj().T`. Hermitian matrices represent *observables* (measurable quantities like energy or spin), not gates — though, as you'll see below, a matrix can happen to be both at once.

These are independent properties. A matrix can be unitary without being Hermitian, Hermitian without being unitary, both, or neither.

## Pauli-Y: unitary *and* Hermitian

Pauli-Y is `[[0, -j], [j, 0]]`. Build it and its conjugate transpose:

```python
import numpy as np

Y = np.array([[0, -1j],
              [1j, 0]])

Y_dagger = Y.conj().T
print(Y_dagger)
# [[0.-0.j 0.-1.j]
#  [0.+1.j 0.-0.j]]
```

Note that `Y_dagger` printed out is numerically identical to `Y` itself (the `-0.j` is just floating-point's signed zero, not a different value) — a first sign that Y is Hermitian. Now check the unitary condition directly:

```python
product = Y @ Y_dagger
print(product)
# [[1.+0.j 0.+0.j]
#  [0.+0.j 1.+0.j]]
```

`Y @ Y_dagger` gives the identity matrix exactly — this was hand-verified first with plain complex arithmetic: multiplying out `Y @ Y.conj().T` entry by entry gives `[[(-j)(j), 0], [0, (j)(-j)]] = [[1, 0], [0, 1]]`, since `(-j)(j) = -j**2 = 1`. So Y is unitary. And because `Y_dagger` printed identically to `Y` above, Y is also Hermitian: `Y == Y.conj().T`. Pauli-Y is one of the rare matrices that is genuinely both at once.

## The S-gate: unitary but *not* Hermitian

The **S-gate** (also called the phase gate) is `diag(1, j)` — it leaves `|0>` alone and multiplies `|1>` by `j`:

```python
S = np.array([[1, 0],
              [0, 1j]])

S_dagger = S.conj().T
print(S_dagger)
# [[1.-0.j 0.-0.j]
#  [0.-0.j 0.-1.j]]

print(S @ S_dagger)
# [[1.+0.j 0.+0.j]
#  [0.+0.j 1.+0.j]]
```

`S @ S_dagger` is the identity matrix — hand-verified: the only nontrivial entry is `(j)(-j) = -j**2 = 1`. So S is unitary, same as Y. But look at `S_dagger` compared to `S`: `S` has `j` in the bottom-right corner, while `S_dagger` has `-j` there. They are not equal:

```python
print(np.array_equal(S, S_dagger))
# False
```

S is unitary but **not** Hermitian — direct proof that the two properties don't imply each other. This matters practically: S is a perfectly legal quantum gate (it preserves probability), but it does *not* correspond to a measurable physical observable the way a Hermitian matrix would.

## Writing reusable checks

Rather than eyeballing printed matrices, wrap both checks into functions that return a plain boolean, using `np.allclose` instead of exact equality (the reason for `allclose` over `==` is the whole subject of Lesson 12):

```python
def is_unitary(U, tol=1e-10):
    n = U.shape[0]
    return np.allclose(U @ U.conj().T, np.eye(n), atol=tol)

def is_hermitian(A, tol=1e-10):
    return np.allclose(A, A.conj().T, atol=tol)

print(is_unitary(Y), is_hermitian(Y))   # True True
print(is_unitary(S), is_hermitian(S))   # True False
```

These two functions are the entire lesson distilled into eight lines — and they're exactly what you'll reuse in Lesson 13's lab and in every later gate-building exercise in this course.

## Why unitary gates preserve a state's norm

A unitary gate applied to a normalized state must produce another normalized state — that's what "preserves length" means concretely. Take the state `|psi> = (|0> + j|1>) / sqrt(2)` from Lesson 10 and apply Y to it:

```python
s = 1 / np.sqrt(2)
psi = np.array([s, 1j * s])

print(Y @ psi)
# [0.70710678+0.j         0.        +0.70710678j]
print(psi)
# [0.70710678+0.j         0.        +0.70710678j]
```

`Y @ psi` comes back *exactly* equal to `psi` itself — this state happens to be an eigenvector of Y with eigenvalue `+1`, confirmed directly via complex matrix-vector multiplication: row 0 gives `(-j)(j*s) = -j**2 * s = s`, and row 1 gives `(j)(s) = j*s`, reproducing `[s, j*s]` unchanged. Whether a unitary gate changes a state's direction or not, it cannot change its norm — `abs(Y @ psi)` has the same total probability as `abs(psi)`, which is the entire physical point of requiring gates to be unitary in the first place.

## Key terms

| Term | Meaning |
|---|---|
| Unitary matrix | A matrix `U` satisfying `U @ U.conj().T == I`; every valid quantum gate is unitary |
| Hermitian matrix | A matrix `A` satisfying `A == A.conj().T`; represents measurable observables, not gates |
| S-gate (phase gate) | `diag(1, j)`; unitary but not Hermitian — proof the two properties are independent |
| `np.array_equal` | Exact element-wise equality check between two NumPy arrays; returns a single boolean |
| Eigenvector | A vector that a matrix maps to a scalar multiple of itself; `Y @ psi == psi` here means `psi` is an eigenvector of Y with eigenvalue `+1` |

## Check yourself

Pauli-X (`[[0,1],[1,0]]`) and Pauli-Z (`[[1,0],[0,-1]]`) both contain only real numbers. Without running code, explain why `is_hermitian(X)` and `is_hermitian(Z)` must both return `True` — what does "conjugate transpose" reduce to for a matrix that has no imaginary parts at all?
