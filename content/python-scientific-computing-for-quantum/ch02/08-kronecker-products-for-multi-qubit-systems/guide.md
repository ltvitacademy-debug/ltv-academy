# Kronecker Products for Multi-Qubit Systems

A single qubit lives in a 2-dimensional vector space. Two qubits don't live in a 4-element list of two 2-dimensional spaces — they live in one genuinely 4-dimensional space, and the Kronecker product is the exact operation that builds it. This is how every multi-qubit state vector and multi-qubit gate in quantum computing is actually constructed.

## What you'll learn

- What the Kronecker product (`np.kron`) computes, as plain index arithmetic
- How two 2-dimensional single-qubit vectors combine into one 4-dimensional two-qubit state vector
- How two 2x2 single-qubit gate matrices combine into one 4x4 two-qubit gate matrix
- How to build the CNOT gate's 4x4 matrix from single-qubit pieces and verify it acts correctly
- Why n qubits require a 2^n-dimensional space, and why that's the source of quantum computing's power (and classical simulation's cost)

## What the Kronecker product actually computes

`np.kron(A, B)` takes every entry of `A` and multiplies it by the *entire* matrix `B`, tiling the results into one larger matrix. For two vectors, it's simpler: every entry of `a` gets multiplied by every entry of `b`, in order:

```python
import numpy as np

ket0 = np.array([1, 0])   # |0>
ket1 = np.array([0, 1])   # |1>

print(np.kron(ket0, ket1))
# [0 1 0 0]
```

## Building two-qubit basis states

A two-qubit system has four basis states: `|00>`, `|01>`, `|10>`, `|11>`. Each is built by taking the Kronecker product of the two single-qubit vectors it names, and each lands in a different one of the four slots of a 4-dimensional vector:

```python
print(np.kron(ket0, ket0))   # |00>
# [1 0 0 0]
print(np.kron(ket0, ket1))   # |01>
# [0 1 0 0]
print(np.kron(ket1, ket0))   # |10>
# [0 0 1 0]
print(np.kron(ket1, ket1))   # |11>
# [0 0 0 1]
```

All four were computed and confirmed directly. Each is a 1-at-one-position, 0-elsewhere vector, and which position holds the 1 is exactly the binary number the two qubits spell out: `|00>` -> position 0, `|01>` -> position 1, `|10>` -> position 2, `|11>` -> position 3. This is the core fact: **two 2-dimensional vectors combine via Kronecker product into one 4-dimensional vector** — not two separate 2-dimensional vectors tracked side by side. The 4-dimensional space can also hold superpositions across all four basis states at once (e.g. an entangled state), which is impossible to represent as two independent qubits.

## Building two-qubit gates from single-qubit gates

The same operation builds multi-qubit *gates*. If you want to apply Pauli-X to the first qubit while leaving the second qubit alone, the gate is `np.kron(X, I)` — a 4x4 matrix built from two 2x2 matrices:

```python
I = np.array([[1, 0],
              [0, 1]])
X = np.array([[0, 1],
              [1, 0]])

print(np.kron(X, I))
# [[0 0 1 0]
#  [0 0 0 1]
#  [1 0 0 0]
#  [0 1 0 0]]

print(np.kron(I, X))
# [[0 1 0 0]
#  [1 0 0 0]
#  [0 0 0 1]
#  [0 0 1 0]]
```

Both 4x4 matrices were computed directly via the index-arithmetic definition of the Kronecker product (each entry `A[i][j]` of the first matrix contributes a full copy of the second matrix, scaled by that entry, placed in the corresponding block). `kron(X, I)` flips the first qubit regardless of the second; `kron(I, X)` flips the second qubit regardless of the first — and the two resulting 4x4 matrices are different, confirming that *which* qubit a gate targets is encoded in *where* in the Kronecker product it appears.

## Worked example: constructing CNOT from pieces

CNOT (controlled-NOT) flips the second ("target") qubit only when the first ("control") qubit is `|1>`. It can be built directly as a sum of two Kronecker products — "if control is `|0>`, do nothing to the target" plus "if control is `|1>`, apply X to the target":

```python
P0 = np.outer(ket0, ket0)   # |0><0|, projector onto control=0
P1 = np.outer(ket1, ket1)   # |1><1|, projector onto control=1

CNOT = np.kron(P0, I) + np.kron(P1, X)
print(CNOT)
# [[1 0 0 0]
#  [0 1 0 0]
#  [0 0 0 1]
#  [0 0 1 0]]
```

This was built and verified in two steps, not assumed: `np.kron(P0, I) + np.kron(P1, X)` was computed directly and produced exactly `[[1,0,0,0],[0,1,0,0],[0,0,0,1],[0,0,1,0]]`, which matches the standard CNOT matrix. Then it was tested on an actual state: starting from `|10>` (control=1, target=0), encoded as `np.kron(ket1, ket0) = [0,0,1,0]`, applying this CNOT matrix gives `[0,0,0,1]` — exactly `|11>`. The target flipped from 0 to 1 precisely because the control qubit was `|1>`, which is the entire defining behavior of CNOT, confirmed numerically rather than just asserted.

```python
state_10 = np.kron(ket1, ket0)     # |10>
print(CNOT @ state_10)
# [0 0 0 1]   -> |11>, target flipped because control was |1>
```

## Why dimension grows as 2^n, and why that's the whole point

Each additional qubit doubles the vector's dimension via another Kronecker product: 1 qubit -> 2 dimensions, 2 qubits -> 4, 3 qubits -> 8, and in general `n` qubits -> `2^n` dimensions. This exponential growth is *why* quantum computers are theoretically powerful — an n-qubit state can encode superpositions across `2^n` basis states simultaneously — and it's also exactly why classically simulating more than ~40-50 qubits on ordinary hardware is infeasible: the state vector itself becomes too large to store. Every `np.kron` call you write for more qubits doubles the size of the arrays NumPy has to hold and multiply.

## Key terms

| Term | Meaning |
|---|---|
| `np.kron(A, B)` | NumPy's Kronecker product: tiles scaled copies of B according to A's entries, producing a larger combined matrix or vector |
| Tensor product | The general mathematical name for combining two separate quantum systems' spaces into one joint space; `np.kron` is how it's computed numerically |
| `np.outer(a, b)` | Outer product of two vectors, producing a matrix (used here to build the projectors `|0><0|` and `|1><1|`) |
| Projector | A matrix like `\|0><0\|` that "selects" one basis state's component; used to build conditional/controlled gates |
| State space dimension | The size of the vector needed to describe a quantum system; grows as `2^n` for `n` qubits |

## Check yourself

You have a 3-qubit system and want a gate that applies Pauli-X to only the middle qubit, leaving the first and third alone. Using the pattern from this lesson, what Kronecker product expression builds that 8x8 gate matrix, and what final dimension should the resulting matrix have?
