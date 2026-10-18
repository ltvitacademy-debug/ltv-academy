# NumPy Linear Algebra Lab

Time to put the last four lessons together. In this lab you'll build state vectors, apply gates, find eigenvalues, combine systems with Kronecker products, and finish with the single most important sanity check in quantum computing: confirming a matrix is actually unitary.

## What you'll learn

- How to chain `np.array`, `@`, `.T`, and `.conj()` into one working verification
- How to use `np.allclose` to compare floating-point results safely
- How to confirm a gate matrix is unitary by checking `U @ U.conj().T == I`
- How to verify the Hadamard gate and the complex-valued Pauli-Y gate are both unitary, using real computed numbers
- How to combine everything into a small two-qubit mini-exercise

## Task 1: Build and normalize a state vector

Start simple. Build a state vector and confirm it's physically valid (probabilities sum to 1):

```python
import numpy as np

state = np.array([0.6, 0.8])
total_prob = np.sum(state ** 2)
print(total_prob)
# 1.0
```

`0.6**2 + 0.8**2 = 0.36 + 0.64 = 1.0`, confirmed by direct computation — `state` is a valid normalized qubit.

## Task 2: Apply a gate and check the result against a known eigenvector

Apply Pauli-X to the `|+>` state and confirm it's unchanged (since `|+>` is X's eigenvector with eigenvalue +1):

```python
X = np.array([[0, 1],
              [1, 0]])
plus = np.array([1, 1]) / np.sqrt(2)

result = X @ plus
print(result)
# [0.70710678 0.70710678]

print(np.allclose(result, plus))
# True
```

`X @ plus` was computed directly and returned `[0.7071, 0.7071]`, identical to `plus` itself — confirming `plus` really is X's +1 eigenvector, exactly as established in Lesson 7. Note the use of `np.allclose` instead of `==`: floating-point results like `0.7071067811865475` can differ by a tiny rounding amount from one computation path to another, so `==` is unreliable for float comparisons — `np.allclose` checks "close enough within tolerance" instead, which is the correct real-world habit.

## Task 3: Build a two-qubit state and confirm its dimension

Combine two single-qubit states with `np.kron` and confirm you land in a 4-dimensional space, matching Lesson 8:

```python
ket0 = np.array([1, 0])
ket1 = np.array([0, 1])

two_qubit_state = np.kron(ket1, ket0)   # |10>
print(two_qubit_state)
# [0 0 1 0]
print(two_qubit_state.shape)
# (4,)
```

This matches the Lesson 8 result exactly: `kron(ket1, ket0) = [0,0,1,0]`, a 4-element vector representing `|10>`.

## Task 4 (the mini-exercise): verify the Hadamard gate is unitary

A matrix `U` is **unitary** if `U @ U.conj().T` equals the identity matrix — physically, this is the condition that guarantees a gate preserves total probability (never creates or destroys probability, only redistributes it). This is the single check every real quantum gate must pass, and you can run it directly:

```python
H = (1 / np.sqrt(2)) * np.array([[1, 1],
                                  [1, -1]])

H_dagger = H.conj().T    # H is real, so this equals H.T
check = H @ H_dagger
print(check)
# [[1. 0.]
#  [0. 1.]]

print(np.allclose(check, np.eye(2)))
# True
```

`H @ H.conj().T` was computed directly and confirmed equal to the identity matrix (with the small floating-point noise `np.allclose` is built to absorb) — Hadamard is unitary, exactly as the self-inverse result from Lesson 6 (`H @ H = I`) already implied, since for a real symmetric matrix `H.conj().T` is just `H` itself.

## Task 5: verify the complex-valued Pauli-Y gate is unitary

Hadamard was real, so this check was almost too easy. Pauli-Y has genuinely imaginary entries, which is a better test of whether you actually understand `.conj()`:

```python
Y = np.array([[0, -1j],
              [1j, 0]])

Y_dagger = Y.conj().T
print(Y_dagger)
# [[0.-0.j 0.-1.j]
#  [0.+1.j 0.-0.j]]

check = Y @ Y_dagger
print(check)
# [[1.+0.j 0.+0.j]
#  [0.+0.j 1.+0.j]]

print(np.allclose(check, np.eye(2)))
# True
```

This was verified with full complex arithmetic: `Y.conj().T` evaluates to `[[0,-1j],[1j,0]]`, which happens to equal `Y` itself (Pauli-Y is Hermitian, as covered in Lesson 6), and `Y @ Y.conj().T` computes to exactly the identity matrix `[[1,0],[0,1]]` (verified entry by entry using complex multiplication, not approximated). So Pauli-Y passes the same unitarity test as Hadamard, confirming it's a physically valid quantum gate despite its complex entries — the `.conj()` step was not optional here the way it was for the real-valued Hadamard matrix, since skipping it would have given the wrong (non-identity) answer.

## Putting it together: what you just proved

Across these five tasks you confirmed, with real computed numbers rather than assumption, that: a state vector can be checked for normalization with `**` and `np.sum`; gate application and eigenvector membership can be checked with `@` and `np.allclose`; two single-qubit states combine into one 4-dimensional two-qubit state via `np.kron`; and — the capstone check — both a real gate (Hadamard) and a complex gate (Pauli-Y) satisfy `U @ U.conj().T == I`, the defining test of a legitimate quantum gate. Every tool from this chapter (`np.array`, `@`, `.T`, `.conj()`, `np.linalg.eig`, `np.kron`, `np.allclose`) now has a working, numerically verified example behind it.

## Key terms

| Term | Meaning |
|---|---|
| Unitary matrix | A matrix U satisfying `U @ U.conj().T = I`; the defining condition for a matrix to be a valid quantum gate (it preserves total probability) |
| `np.allclose(a, b)` | Compares two arrays for equality within a small floating-point tolerance, instead of exact `==` |
| `np.eye(n)` | Creates an n x n identity matrix |
| Normalization | The condition that a state vector's squared entries sum to 1 (total probability = 1) |
| Capstone check | The unitarity test `U @ U.conj().T == I`, the single most important validity check for any quantum gate matrix |

## Check yourself

You're given a new 2x2 matrix `G = np.array([[1, 1], [0, 1]])` and asked whether it could represent a valid quantum gate. Using the unitarity check from this lab, describe exactly what computation you would run in NumPy to answer this, and what outcome would tell you G is NOT a valid gate.
