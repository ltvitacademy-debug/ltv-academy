# Building Bell States With Gates

**Chapter 3 · Multi-Qubit & Entangling Gates · Lesson 13 of 14**

This is the lesson where entanglement stops being an abstract claim and becomes something you build, gate by gate, and verify by computing actual numbers. Two gates — Hadamard and CNOT — are all it takes.

## What you'll learn

- The canonical H + CNOT recipe that turns |00⟩ into an entangled Bell state
- The exact intermediate and final state vectors, computed directly
- Why the resulting state cannot be written as a product of two single-qubit states
- How measurement probabilities expose that non-separability as perfect correlation
- The other three Bell states, and which gate changes produce each one

## The H + CNOT recipe

Start with both qubits in |00⟩. Apply the Hadamard gate to qubit 1 only (qubit 2 untouched):

```
H ⊗ I  applied to |00⟩  →  (|00⟩ + |10⟩) / √2
```

Computing this as a matrix-vector product gives the state vector [0.7071, 0, 0.7071, 0] in the |00⟩, |01⟩, |10⟩, |11⟩ basis — exactly (|00⟩ + |10⟩)/√2, with qubit 1 in superposition and qubit 2 still definitely |0⟩. This intermediate state is still separable: it's (H|0⟩) ⊗ |0⟩, a product of two independent single-qubit states.

Now apply CNOT with control = q1, target = q2 to that intermediate state:

```
CNOT  applied to (|00⟩ + |10⟩)/√2  →  (|00⟩ + |11⟩) / √2
```

The matrix-vector computation gives [0.7071, 0, 0, 0.7071] — the |10⟩ term's control bit is 1, so CNOT flips its target, turning |10⟩ into |11⟩, while the |00⟩ term's control bit is 0 and passes through untouched. The result, (|00⟩ + |11⟩)/√2, is one of the four **Bell states** — the maximally entangled states of two qubits.

## Why this state is entangled

A 2-qubit state is **separable** (not entangled) if it can be written as (single-qubit state) ⊗ (single-qubit state) — some state (a|0⟩ + b|1⟩) for qubit 1, tensored with some state (c|0⟩ + d|1⟩) for qubit 2. If (|00⟩ + |11⟩)/√2 were separable, it would equal (a|0⟩+b|1⟩)⊗(c|0⟩+d|1⟩) = ac|00⟩ + ad|01⟩ + bc|10⟩ + bd|11⟩ for some choice of a, b, c, d. Matching coefficients against (|00⟩ + |11⟩)/√2 requires ac = 1/√2, ad = 0, bc = 0, and bd = 1/√2. From ad = 0, either a = 0 or d = 0 — but a = 0 makes ac = 0 (contradicting ac = 1/√2), and d = 0 makes bd = 0 (contradicting bd = 1/√2). There is no consistent choice of a, b, c, d. The state genuinely cannot be factored into two independent single-qubit states — that's the formal meaning of entangled.

## Measurement correlations confirm it

The physical signature of that non-separability shows up directly in measurement probabilities. Squaring each amplitude of [0.7071, 0, 0, 0.7071] gives probabilities [0.5, 0, 0, 0.5] for outcomes |00⟩, |01⟩, |10⟩, |11⟩ respectively. In other words: measuring both qubits gives "both 0" half the time and "both 1" half the time, and the mixed outcomes "qubit 1 is 0, qubit 2 is 1" or "qubit 1 is 1, qubit 2 is 0" occur with probability exactly zero. If this state were separable, each qubit's outcome would be independent of the other's, and you'd generally expect some nonzero chance of a mismatched result. Instead, the two qubits' measurement outcomes are perfectly correlated — know one, and you know the other with certainty — which is exactly the behavior a product state cannot produce.

## The other three Bell states

There are four Bell states total, and the same H + CNOT skeleton reaches all of them with small gate changes before or after the CNOT:

| Starting point / change | Resulting Bell state |
|---|---|
| |00⟩, H on q1, then CNOT (the recipe above) | (\|00⟩ + \|11⟩) / √2 |
| Apply X to qubit 2 before the H+CNOT steps | (\|01⟩ + \|10⟩) / √2 |
| |00⟩, H on q1, CNOT, then Z on qubit 1 | (\|00⟩ − \|11⟩) / √2 |
| Combine the X-before and Z-after changes | (\|01⟩ − \|10⟩) / √2 |

To confirm the second row concretely: start from |01⟩ instead of |00⟩ (equivalent to applying X to qubit 2 first), apply H to qubit 1, then the same CNOT (control = q1, target = q2). Computing this step by step: H on qubit 1 of |01⟩ gives [0, 0.7071, 0, 0.7071] — that's (|01⟩ + |11⟩)/√2 — and applying CNOT to that gives [0, 0.7071, 0.7071, 0], which is exactly (|01⟩ + |10⟩)/√2. That matches the table's second row precisely: same two gates, different starting computational basis state, different Bell state out.

## Key terms

| Term | Meaning |
|---|---|
| Bell state | One of four maximally entangled 2-qubit states reachable from a basis state via H + CNOT |
| Separable (product) state | A state writable as (qubit 1 state) ⊗ (qubit 2 state); the opposite of entangled |
| Entanglement | A correlation between qubits that cannot be explained by either qubit having its own independent state |
| Measurement correlation | The pattern of joint outcome probabilities; perfect correlation signals entanglement |

## Check yourself

Starting from |11⟩, apply H to qubit 1, then CNOT with control = q1, target = q2. Using the H+CNOT recipe and the table from this lesson (not a fresh matrix computation), which of the four Bell states do you expect to land on, and what are the four measurement probabilities for that state?
