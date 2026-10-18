# Tensor Products Problem-Solving Lab

This lab closes the chapter with four worked problems pulling together everything from lessons 26-29: computing tensor products of vectors and matrices, building multi-qubit basis states, and testing whether a state is a product state or entangled.

## What you'll learn

- How to compute the tensor product of a non-basis vector with a basis vector
- How to build a 3-qubit basis state by iterating the tensor product
- A fresh worked example testing a state for entanglement using the ac/ad/bc/bd method
- How a 2x2 gate tensored with identity acts on a 2-qubit state

## Problem 1: Tensor a general qubit state with a basis state

Compute `(0.6|0⟩ + 0.8|1⟩) ⊗ |0⟩`. Using the Kronecker formula from lesson 27 — multiply every entry of the first vector by every entry of the second, in order:

```python
import numpy as np

psi = np.array([0.6, 0.8])
ket0 = np.array([1, 0])

result = np.kron(psi, ket0)
print(result)
```

```
[0.6 0.  0.8 0. ]
```

This matches the pattern directly: the first vector's entries (0.6, 0.8) land in the positions where the second vector's `|0⟩` lands (position 0 of each pair), with 0 in between — exactly `0.6|00⟩ + 0.8|10⟩`.

## Problem 2: Build the 3-qubit basis state |101⟩

A 3-qubit state space requires two tensor products chained together. Build `|1⟩ ⊗ |0⟩ ⊗ |1⟩` step by step:

```python
ket1 = np.array([0, 1])

step1 = np.kron(ket1, ket0)   # |1> tensor |0> = |10>
step2 = np.kron(step1, ket1)  # |10> tensor |1> = |101>
print(step2)
```

```
[0 0 0 0 0 1 0 0]
```

An 8-dimensional vector (2³ = 8, for 3 qubits) with a single 1 in position 5 — the binary number 101 is exactly 5, confirming this is the `|101⟩` basis state in the standard ordering.

## Problem 3: Is this state a product state or entangled?

Test `[1/√3, 1/√3, 1/√3, 0]` using the same ac/ad/bc/bd matching method from lesson 29. First confirm it's normalized:

```python
s = np.array([1/np.sqrt(3), 1/np.sqrt(3), 1/np.sqrt(3), 0])
print((s**2).sum())
```

```
1.0000000000000002
```

Normalized (the tiny deviation from 1.0 is floating-point rounding). Now match against `[ac, ad, bc, bd]`: `ac = 1/√3`, `ad = 1/√3`, `bc = 1/√3`, `bd = 0`. From `bd = 0`: either `b = 0` or `d = 0`.

- **If `b = 0`:** then `bc = 0 · c = 0`, but the equation requires `bc = 1/√3 ≈ 0.577`. `0 = 0.577` is false. Contradiction.
- **If `d = 0`:** then `ad = a · 0 = 0`, but the equation requires `ad = 1/√3 ≈ 0.577`. `0 = 0.577` is false. Contradiction.

Both branches contradict — this state is **entangled**, by the exact same proof structure as the Bell state in lesson 29.

## Problem 4: Apply X ⊗ I to a 2-qubit state

Tensor the Pauli-X gate with the identity matrix, then apply the resulting 4x4 matrix to `|01⟩`:

```python
X = np.array([[0, 1], [1, 0]])
I = np.eye(2)
XI = np.kron(X, I)
print(XI)

ket01 = np.array([0, 1, 0, 0])
print(XI @ ket01)
```

```
[[0. 0. 1. 0.]
 [0. 0. 0. 1.]
 [1. 0. 0. 0.]
 [0. 1. 0. 0.]]
[0. 0. 0. 1.]
```

`X ⊗ I` applied to `|01⟩` gives `|11⟩` — exactly what you'd expect: `X ⊗ I` means "apply X to the first qubit, leave the second qubit alone," and `X` flips `|0⟩` on the first qubit to `|1⟩`, turning `|01⟩` into `|11⟩` while the second qubit's `1` stays untouched.

## Key terms

| Term | Meaning |
|---|---|
| `np.kron` | NumPy's function for computing the Kronecker (tensor) product of two arrays |
| Gate tensored with identity | `G ⊗ I` applies gate `G` to one qubit while leaving the other qubit unchanged, in a multi-qubit circuit |

## Check yourself

Why does `X ⊗ I` applied to `|01⟩` give `|11⟩` rather than `|10⟩` — what would have to be different about the tensor expression for the gate to act on the *second* qubit instead of the first?
