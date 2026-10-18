# The Hadamard Gate

If the Pauli gates are the alphabet, the Hadamard gate is the first word that actually does something uniquely quantum: it turns a definite classical-looking state into an equal superposition. Nearly every quantum circuit you'll see from here on opens with an H gate.

## What you'll learn

- The explicit Hadamard matrix and the states |+⟩ and |−⟩ it produces
- Direct computation of H|0⟩ and H|1⟩, with their measurement probabilities
- Why H is self-inverse (H² = I), confirmed by applying it twice in sequence
- Why H is the standard way to generate superposition from a classical starting point
- How H sets up the Bell-state construction you'll meet in Chapter 3

## The Hadamard matrix

The Hadamard gate's matrix is:

```
H = (1/√2) [ 1   1 ]
           [ 1  -1 ]
```

Every entry has the same magnitude, 1/√2, and the normalization factor out front keeps the gate unitary. Unlike Z, which only changes phase, H genuinely redistributes amplitude between the two basis states — that redistribution is exactly what creates superposition.

## H|0⟩ and H|1⟩: the |+⟩ and |−⟩ states

Multiplying the matrix out directly in `node -e`:

```
H|0⟩ = (1/√2)[1  1][1] = [0.70710678]  =  (1/√2)|0⟩ + (1/√2)|1⟩   ≡  |+⟩
             [1 -1][0]   [0.70710678]

H|1⟩ = (1/√2)[1  1][0] = [ 0.70710678]  =  (1/√2)|0⟩ − (1/√2)|1⟩  ≡  |−⟩
             [1 -1][1]   [-0.70710678]
```

Both results check out numerically to six decimal places as [0.707107, 0.707107] and [0.707107, −0.707107]. Squaring each amplitude's magnitude — computed directly, not assumed — gives measurement probabilities [0.5, 0.5] for **both** H|0⟩ and H|1⟩. That's the defining signature of H: feed it either classical basis state, and the qubit comes out with a fair 50/50 chance of reading 0 or 1 on measurement. The two output states are not the same state, though — |+⟩ and |−⟩ differ by the sign on the second amplitude, the exact same kind of relative phase difference you saw Z produce in the previous lesson. A measurement alone cannot tell |+⟩ from |−⟩; only a gate sensitive to phase (like another H, or an interference-based circuit) can.

## H is its own inverse

Apply H twice to |0⟩ and you should get back exactly where you started, since H²  =  I for the Hadamard matrix. Computing this directly in `node -e` — first H|0⟩, then H applied again to that result — gives [1, 0] exactly, which is |0⟩. No rounding drift, no leftover superposition: two Hadamards cancel perfectly.

This matters practically, not just as a curiosity. Because H is involutory (self-inverse), it's one of the cheapest and most predictable gates to "undo" in a circuit — you never need a separate inverse-Hadamard gate, you just apply H again. You'll see this property reused constantly: any time a circuit applies H, does some work, and then applies H again to the same qubit, that's a deliberate basis-change trick (compute in the |+⟩/|−⟩ basis, then flip back to the |0⟩/|1⟩ basis to measure), not an accident.

## Why H is the standard superposition generator

Every physical qubit starts life, by convention, prepared in |0⟩ — that's the "reset" state hardware naturally settles into. But a qubit sitting in |0⟩ carries no more information than a classical bit: measuring it always returns 0. H is the standard first move in a circuit precisely because it's the simplest unitary that takes that classical-looking starting point and produces a state with genuine 50/50 measurement uncertainty baked into the amplitudes themselves, not just in the experimenter's ignorance.

This is also the first half of the recipe for one of the most important two-qubit states in the field: the Bell state. Chapter 3 builds the full construction — H on one qubit followed by a CNOT between it and a second qubit — which is how two independent qubits become entangled. Everything you just verified about H|0⟩ (equal amplitudes, equal probabilities, exactly reversible) is the piece that chapter assumes you already have cold.

## Key terms

| Term | Meaning |
|---|---|
| Hadamard gate (H) | The matrix (1/√2)[[1,1],[1,-1]]; converts a basis state into an equal-amplitude superposition |
| |+⟩ | Shorthand for H|0⟩ = (1/√2)|0⟩ + (1/√2)|1⟩ |
| |−⟩ | Shorthand for H|1⟩ = (1/√2)|0⟩ − (1/√2)|1⟩ |
| Involutory gate | A gate that is its own inverse (G² = I); H, like X and Z, has this property |
| Superposition generation | Using a unitary like H to turn a definite basis state into a state with genuine measurement uncertainty in its amplitudes |

## Check yourself

Suppose a qubit starts in the state |1⟩, and you apply H, then Z, then H again, in that order. Without computing the full matrix chain, use what you know about H² = I and about what Z does to a |+⟩/|−⟩-style state to reason through what gate sequence H·Z·H is equivalent to on a single qubit, and name which Pauli gate you'd expect the net effect to match.
