# Capstone: Port a Circuit Between Qiskit & Q#

The real test of fluency in two tools isn't writing each one in isolation — it's translating the same algorithm between them and being able to point to exactly where each design decision in one tool maps to a design decision in the other. This capstone does that with a Bell-state circuit, small enough to verify completely.

## What you'll learn

- A full Qiskit implementation of Bell-state preparation and measurement
- The equivalent full Q# implementation
- The exact translation decisions at each step: registers, gate calls, measurement
- A verified confirmation that both produce the identical theoretical output distribution

## The circuit: Bell-state preparation

Both versions implement the same thing: prepare `(|00⟩+|11⟩)/√2`, then measure both qubits.

### In Qiskit

```python
from qiskit import QuantumCircuit

qc = QuantumCircuit(2, 2)
qc.h(0)
qc.cx(0, 1)
qc.measure([0, 1], [0, 1])
```

### In Q#

```qsharp
operation PrepareAndMeasureBell() : (Result, Result) {
    use (q0, q1) = (Qubit(), Qubit());
    H(q0);
    CNOT(q0, q1);
    return (M(q0), M(q1));
}
```

## The translation decisions, step by step

- **Register declaration → qubit allocation.** Qiskit's `QuantumCircuit(2, 2)` declares a quantum register and a classical register up front, as part of constructing the circuit object. Q#'s `use (q0, q1) = (Qubit(), Qubit())` allocates qubits dynamically, scoped to the operation — there's no separate classical register to declare, because Q#'s classical values (the `Result`s returned by `M`) are just ordinary typed values, not a parallel register structure.
- **`.h(0)` / `.cx(0,1)` → `H(q0)` / `CNOT(q0, q1)`.** Qiskit's gate calls are methods on the circuit object, appending gate instructions to its internal list — the circuit accumulates as data. Q#'s `H`/`CNOT` are direct operation calls that take effect immediately when executed; there's no intermediate "append to a list" step, because there's no list.
- **`.measure([0,1],[0,1])` → `(M(q0), M(q1))`.** Qiskit writes measurement results into the classical register at specified indices, read out later from the circuit's results object. Q# returns the measured `Result` values directly as the operation's return value — the "classical register" is just the ordinary tuple return type `(Result, Result)`.

## A verified confirmation: both describe the same distribution

Rather than trust that the translation is correct by inspection alone, the Bell state's theoretical output distribution was computed directly: starting from `|00⟩`, applying `H` to the first qubit and then `CNOT` from the first to the second via explicit matrix multiplication gives a final state with amplitude `1/√2` on `|00⟩` and `1/√2` on `|11⟩`, and exactly **zero** amplitude on `|01⟩` and `|10⟩`. Squaring those amplitudes gives probability exactly **0.5** for `00`, exactly **0.5** for `11`, and exactly **0** for `01` and `10`. Both the Qiskit version and the Q# version implement precisely this sequence of operations — `H` then `CNOT` on the same two qubits, measured at the end — so both are consistent with this one, independently verified theoretical result. Running either version many times should show counts split roughly evenly between `00` and `11`, with no `01` or `10` outcomes at all on an ideal simulator.

## What the translation exercise actually teaches

Porting this circuit isn't hard — the algorithm is small enough that the translation is close to mechanical. What it's meant to make visible is *where* each tool's design philosophy shows up even in a two-gate example: Qiskit's register/circuit-object model is present even here (you declared registers, appended to a circuit), and Q#'s allocation/operation model is present even here (you used `use`, called operations directly, returned typed values). Scaling this same translation exercise up to Grover's or teleportation — which you've now implemented in Q# across this course — is the same mapping, just with more steps.

## Key terms

| Term | Meaning |
|---|---|
| Quantum/classical register | Qiskit's explicit, declared storage for qubits and classical measurement results |
| Dynamic qubit allocation | Q#'s `use`-scoped qubit allocation, with no separate classical register structure |
| Return-type measurement | Q#'s pattern of returning measured `Result` values directly as an operation's output |

## Check yourself

If you needed to port a circuit with 10 qubits and a mid-circuit measurement used to conditionally apply a later gate (not just a final measurement), which of the two tools' models would make that mid-circuit classical control feel more natural to write, and why, based on what you now know about how each represents classical values?
