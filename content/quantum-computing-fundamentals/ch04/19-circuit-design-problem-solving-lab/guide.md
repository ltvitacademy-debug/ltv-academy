# Circuit Design Problem-Solving Lab

This lab closes out the chapter with three solved problems, worked the same disciplined way as Lesson 18: propose from a known recipe, identify the gap, verify numerically, then diagram the result. Treat these as homework with real, checked answers rather than examples to skim.

## What you'll learn

- How to adapt the Bell-state recipe to a target that swaps basis states instead of flipping a sign
- How to verify a multi-step design with real computed amplitudes before trusting it
- How to count width and depth for a circuit with three independent qubits feeding into one two-qubit gate
- How to recognize which single additional gate, and at which point in the sequence, produces a required change
- A second worked pattern for tackling any "reach this target state" specification in later chapters

## Problem 1: reach (|01⟩ + |10⟩)/√2 from |00⟩

**Specification:** design and verify a 2-qubit circuit, starting from |00⟩, that produces (|01⟩ + |10⟩)/√2.

**Design:** this target has the same "+" structure as the standard Bell state, but on |01⟩ and |10⟩ instead of |00⟩ and |11⟩. The standard H+CNOT recipe naturally produces a superposition of "both qubits agree" (|00⟩, |11⟩); this target needs "qubits disagree" (|01⟩, |10⟩) instead. Starting qubit 2 from |1⟩ rather than |0⟩ — applying X to qubit 2 before anything else — should shift the whole pattern: whatever basis state q1 ends up in, q2 ends up in the opposite one, since CNOT flips q2 exactly when q1 is 1 off an already-flipped starting point.

**Verify:** starting from |00⟩, apply X to qubit 2: the state becomes |01⟩ = [0, 1, 0, 0]. Apply H to qubit 1: this gives [0, 0.7071, 0, 0.7071] — that's (|01⟩ + |11⟩)/√2. Apply CNOT with control = q1, target = q2: this swaps the |10⟩ and |11⟩ amplitudes, giving [0, 0.7071, 0.7071, 0]. That final vector is exactly (|01⟩ + |10⟩)/√2 — the specification, confirmed term by term.

**Diagram:**

```
q1: ─────H──●──
             │
q2: ──X─────X──
```

## Problem 2: width and depth of a 3-qubit circuit

**Specification:** a circuit applies H to each of 3 independent qubits (q1, q2, q3), and then applies a single CNOT with control = q1, target = q2. What are this circuit's width and depth?

**Solve:** width is 3 — three qubits are used by the circuit's register, regardless of whether all three have gates in every layer. For depth, work out the layering: the three H gates each act on a single, distinct qubit (q1, q2, q3 respectively) with no qubit shared between any pair of them, so all three can occupy the same layer — layer 1. The CNOT acts on q1 and q2, both of which already have a pending H gate from layer 1, so it must come after both of those finish, placing it in layer 2. Qubit 3's H gate stays in layer 1 and has nothing after it, so it doesn't extend the depth any further. Total: **width 3, depth 2** — the same two-layer structure as Lesson 16's worked example, with one additional idle-after-layer-1 qubit (q3) that doesn't change the final depth count.

```
q1: ──H──●──
q2: ──H──X──
q3: ──H─────
```

## Problem 3: reach (|00⟩ − |01⟩ − |10⟩ + |11⟩)/2 from |00⟩

**Specification:** design and verify a 2-qubit circuit, starting from |00⟩, that produces the equal-magnitude superposition of all four basis states with signs (+,−,−,+): (|00⟩ − |01⟩ − |10⟩ + |11⟩)/2.

**Design:** every amplitude has the same magnitude (1/2) and all four basis states appear, which is the signature of applying H independently to *both* qubits — no CNOT needed, since no entanglement is being asked for here, just a specific sign pattern. The question is which basis state to start from before applying the two H gates. H|0⟩ = (|0⟩+|1⟩)/√2 contributes only plus signs, while H|1⟩ = (|0⟩−|1⟩)/√2 contributes a minus sign specifically on the component where that qubit reads 1. Starting both qubits from |1⟩ (i.e., from |11⟩) means every output term where q1 reads 1 gets one minus sign from q1's H, and every term where q2 reads 1 gets a second minus sign from q2's H — so a term gets an *odd* number of minus signs (net negative) exactly when exactly one of its two bits is 1, which is |01⟩ and |10⟩, while |00⟩ and |11⟩ (zero or two minus signs) stay positive. That's exactly the (+,−,−,+) pattern the spec asks for.

**Verify:** start from |11⟩ (apply X to both qubits, or simply start the register there): the state is [0, 0, 0, 1]. Apply H to qubit 1: [0,0,0,1] becomes [0, 0.7071, 0, −0.7071] — that's (|01⟩ − |11⟩)/√2. Apply H to qubit 2: this gives [0.5, −0.5, −0.5, 0.5]. That final vector is exactly (|00⟩ − |01⟩ − |10⟩ + |11⟩)/2 — the specification, confirmed term by term, with no CNOT anywhere in the circuit.

**Diagram:**

```
q1: ──X──H──────
q2: ──X─────H───
```

This problem is a useful contrast with Problems 1 and 2: not every target state needs an entangling gate. A state can use all four basis states with a nontrivial sign pattern and still be fully separable — recognizing that a CNOT isn't always necessary is as much a part of circuit design as knowing when it is.

## Key terms

| Term | Meaning |
|---|---|
| Basis-swap target | A target state whose superposition involves different basis states (like \|01⟩, \|10⟩) than the standard Bell recipe naturally produces |
| Independent H gates | Applying H to each qubit separately with no CNOT, producing an equal-magnitude superposition of all basis states with no entanglement |
| Sign pattern | The specific arrangement of + and − signs across a superposition's terms; some patterns require entangling gates to reach, others don't |
| Design limit | Recognizing when a short, known recipe genuinely cannot reach a target, rather than forcing an incorrect answer |

## Check yourself

For Problem 1's verified circuit (X on q2, H on q1, then CNOT), what are this circuit's width and depth? Use the same layer-counting method from Lesson 16 and Problem 2 of this lab.
