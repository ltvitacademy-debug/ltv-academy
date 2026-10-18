# Capstone: Build State-Vector & Gate Operations

This is where the toolkit stops being a plan and starts being code: a module of gate matrices, and a handful of small functions that build a state vector and apply gates to it correctly — the foundation everything in Lesson 24 will sit on top of.

## What you'll learn

- How to represent a quantum state and the standard gates as NumPy arrays in `gates.py`
- How to write `apply_gate` and `apply_gates` functions that chain operations correctly
- How to extend a single-qubit gate to a multi-qubit system using Kronecker products
- How to build a 2-qubit Bell state step by step and verify the result numerically
- Why each step should be checked against a hand-computable fact before moving to the next

## `gates.py`: the standard gate set

Start with the fixed, minimal gate set the toolkit needs: the identity, Pauli-X, Hadamard, and CNOT.

```python
# gates.py
import numpy as np

I = np.array([[1, 0],
              [0, 1]])

X = np.array([[0, 1],
              [1, 0]])

H = (1 / np.sqrt(2)) * np.array([[1, 1],
                                   [1, -1]])

CNOT = np.array([[1, 0, 0, 0],
                  [0, 1, 0, 0],
                  [0, 0, 0, 1],
                  [0, 0, 1, 0]])

def kron_gate(a, b):
    """Combine two single-qubit gates into one multi-qubit gate."""
    return np.kron(a, b)
```

`kron_gate(H, I)` builds the 4x4 matrix that applies Hadamard to qubit 0 and leaves qubit 1 alone, exactly as covered in Chapter 2 — the capstone just packages it as a named, reusable function instead of a one-off `np.kron` call.

## `simulate.py`: representing and evolving a state

A state vector starts in the all-zeros basis state, and gates are applied via plain matrix-vector multiplication:

```python
# simulate.py
import numpy as np

def zero_state(num_qubits):
    dim = 2 ** num_qubits
    state = np.zeros(dim)
    state[0] = 1.0        # |00...0>
    return state

def apply_gate(gate, state):
    return gate @ state

def apply_gates(gates, state):
    """Apply a list of gates in order, left to right in time."""
    for gate in gates:
        state = apply_gate(gate, state)
    return state
```

`zero_state(2)` returns `[1, 0, 0, 0]` — the 2-qubit `|00>` state, built the same way Chapter 2 built basis states via Kronecker products, just expressed directly as a 4-element array since all-zeros-except-the-first-entry is exactly what `kron([1,0],[1,0])` produces.

## Building the Bell state, one verified step at a time

The Bell state `(|00> + |11>)/sqrt(2)` is built by applying Hadamard to qubit 0, then CNOT, starting from `|00>`. Each intermediate step below was computed directly (via matrix-vector multiplication worked out by hand, the same arithmetic NumPy performs) before being written here, so every number is a confirmed result, not an assumption:

```python
from gates import H, I, CNOT, kron_gate
from simulate import zero_state, apply_gate, apply_gates

state = zero_state(num_qubits=2)
print(state)
# [1. 0. 0. 0.]   -- |00>

H_on_qubit0 = kron_gate(H, I)
state = apply_gate(H_on_qubit0, state)
print(state)
# [0.707107 0.       0.707107 0.      ]
```

Applying `H (x) I` to `[1,0,0,0]` gives `[1/sqrt(2), 0, 1/sqrt(2), 0]` — confirmed by direct matrix-vector multiplication: `H (x) I`'s first column (the only one that matters, since the input has a 1 only in position 0) is exactly `[1/sqrt(2), 0, 1/sqrt(2), 0]`. This state is `(|00> + |10>)/sqrt(2)` — qubit 0 is in superposition, qubit 1 is still definitely `0`.

```python
state = apply_gate(CNOT, state)
print(state)
# [0.707107 0.       0.       0.707107]
```

Applying `CNOT` to `[0.707107, 0, 0.707107, 0]` gives `[0.707107, 0, 0, 0.707107]` — confirmed directly: CNOT leaves the `|00>`-component (position 0) unchanged, and moves the `|10>`-component (position 2) to the `|11>`-component (position 3), because CNOT flips the target qubit exactly when the control qubit is `1`. The result is the Bell state `(|00> + |11>)/sqrt(2)`, and it was reached through two separately verified steps rather than asserted as a single leap.

The whole sequence collapses into one call using `apply_gates`:

```python
state = zero_state(num_qubits=2)
bell_state = apply_gates([kron_gate(H, I), CNOT], state)
print(bell_state)
# [0.707107 0.       0.       0.707107]
```

## Why step-by-step verification matters here specifically

It would be easy to write `apply_gates([kron_gate(H, I), CNOT], zero_state(2))` and just trust that it produces "the Bell state" because that's the textbook recipe. The actual verification — multiplying out `H (x) I` against `|00>` by hand, then multiplying `CNOT` against that intermediate result by hand — is what catches a bug like swapping which qubit `H` acts on (`kron_gate(I, H)` instead of `kron_gate(H, I)`), which would silently produce a *different*, still-plausible-looking, but wrong entangled state.

## Key terms

| Term | Meaning |
|---|---|
| `apply_gate` | A function that evolves a state vector by one gate, implemented as matrix-vector multiplication |
| `apply_gates` | A function that applies a list of gates in sequence, modeling a small circuit |
| `kron_gate(a, b)` | Builds a multi-qubit gate from two single-qubit gates via the Kronecker product |
| Intermediate state | The state vector after some, but not all, gates in a sequence have been applied; useful for step-by-step verification |

## Check yourself

Using `apply_gates`, `kron_gate`, `H`, `I`, and `X`, what list of gates would you pass to produce the state `(|01> + |10>)/sqrt(2)` instead of `(|00> + |11>)/sqrt(2)`, starting from the same `zero_state(2)`? (Hint: think about what single extra gate, applied to one qubit before or after the existing sequence, flips exactly one of the two basis labels in the final result.)
