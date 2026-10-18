# Reading a Quantum Circuit Diagram

Every gate you've learned so far — H, X, Z, CNOT, Toffoli — has been described as a matrix acting on a state vector. Nobody who actually programs a quantum computer works that way day to day. They draw and read circuit diagrams, and this lesson teaches you the notation precisely enough that you can read someone else's circuit cold.

## What you'll learn

- The exact meaning of a wire, a time axis, a gate symbol, and a measurement symbol in a circuit diagram
- How to read a controlled gate (dot, vertical line, target symbol) left to right
- A full worked reading of the Bell-state circuit from Chapter 3, confirmed against the actual state vector
- Why circuit diagrams, not matrices, are the real interface real quantum programming tools use
- How to translate between a diagram and the sequence-of-gates description you've been using so far

## The notation, piece by piece

A quantum circuit diagram is a picture with one horizontal line — a **wire** — per qubit. The wire is not a physical wire; it's a timeline for that one qubit, read left to right, where left means "earlier" and right means "later." If a circuit uses two qubits, the diagram has exactly two wires, conventionally labeled from the top, q1 and q2 (or q0 and q1 depending on the source's indexing convention — always check which convention a given diagram uses).

A box or symbol drawn on a wire is a gate applied to that qubit at that point in time. A box labeled "H" on qubit 1's wire means "apply the Hadamard gate to qubit 1, here." Reading a single wire left to right just gives you the sequence of single-qubit gates applied to that qubit, in order — exactly the gate sequences you've already been writing out in words.

A **controlled gate**, like CNOT, is drawn across two (or more) wires at the same horizontal position: a filled dot (●) on the control qubit's wire, connected by a vertical line to a symbol on the target qubit's wire. For CNOT specifically, the target symbol is a circled plus (⊕) or sometimes a boxed "X." The vertical line is not a gate by itself — it's notation meaning "these two single-wire marks happen together, as one two-qubit operation, at this moment in time." A Toffoli gate extends this with two control dots on two wires, both connected to one ⊕ on the target wire.

A **measurement** is drawn as a small meter/gauge symbol (a box with a dial or arc) on a wire. After a measurement, the qubit's wire is often followed by a **double line** — two parallel horizontal lines instead of one — representing a classical bit carrying the measurement's classical outcome (0 or 1) forward through the rest of the diagram. This distinction matters: a single line always carries quantum information (a state that can be in superposition), while a double line carries a definite classical value. You'll see double lines put to direct use in Chapter 5, where teleportation requires sending a measured qubit's classical outcome to a distant location to select a correction gate.

## Worked example: the Bell-state circuit

Chapter 3 built the Bell state (|00⟩+|11⟩)/√2 by applying H to qubit 1, then CNOT with qubit 1 as control and qubit 2 as target, both starting from |00⟩. As a circuit diagram:

```
q1: ──H──●──
          │
q2: ─────X──
```

Reading this left to right: qubit 1 starts at the left edge in |0⟩ (the implicit starting state of every wire unless labeled otherwise), passes through the H box, then reaches the control dot (●). Qubit 2 starts at |0⟩, passes straight through with no gate until it reaches the target X at the same horizontal position as qubit 1's control dot. The vertical line tying the dot to the X tells you these two marks are one operation: CNOT, controlled by q1, targeting q2.

Translating the diagram into the gate sequence you already know confirms nothing new is happening: "H on q1, then CNOT(control=q1, target=q2), starting from |00⟩" is exactly what Chapter 3 computed, giving state vector [0.7071, 0, 0, 0.7071] in the |00⟩,|01⟩,|10⟩,|11⟩ basis — (|00⟩+|11⟩)/√2. The diagram is not a new object to analyze; it's a different notation for the identical sequence of gates, and reading it correctly means being able to recover that sequence, in order, directly from the picture.

## Why diagrams, not matrices, are the real interface

Matrices are how you *verify* a circuit's behavior — multiplying matrices by a state vector is exactly how every claim in this course has been checked. But matrices do not scale as a way to *author or read* circuits: a 5-qubit circuit's full matrix is 32×32, and almost nobody writes or reads a circuit by writing out that matrix. Circuit diagrams scale the way source code scales — one gate, one line, one qubit at a time, however many qubits are involved.

This is also exactly the representation that real quantum software tools present. Later courses in this catalog cover Qiskit (IBM's Python library) and Q# (Microsoft's quantum language), and both represent a circuit as an ordered list of gate-on-qubit instructions that render visually as exactly this kind of diagram. When you draw `circuit.h(0)` then `circuit.cx(0, 1)` in Qiskit, the tool literally renders the picture above. Learning to read the diagram now means those tools will look familiar, not foreign, when you reach them.

## Key terms

| Term | Meaning |
|---|---|
| Wire | A horizontal line in a circuit diagram representing one qubit's timeline, read left to right |
| Gate symbol | A box or mark on a wire representing a single-qubit gate applied at that point in time |
| Control dot / target symbol | A filled dot on one wire connected by a vertical line to a symbol (⊕, boxed gate) on another wire, representing a controlled operation like CNOT |
| Measurement symbol | A meter/gauge mark on a wire representing a measurement of that qubit |
| Double line | Two parallel lines following a measurement, representing a classical bit carrying the measurement outcome |

## Check yourself

Draw the circuit diagram (in the same ASCII style used above) for a 2-qubit circuit that starts from |00⟩, applies X to qubit 2, then applies H to qubit 1, then applies CNOT with qubit 1 as control and qubit 2 as target. Reading your own diagram left to right, which gate happens first in time, and on which qubit?
