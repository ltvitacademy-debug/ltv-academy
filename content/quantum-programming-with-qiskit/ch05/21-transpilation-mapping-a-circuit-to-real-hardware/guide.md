# Transpilation: Mapping a Circuit to Real Hardware

The circuit you write in `QuantumCircuit` is an abstract plan: you call `h()`, `cx()`, `ccx()` without worrying about what a physical chip can actually do. Transpilation is the real, necessary translation step that turns that abstract plan into something a specific backend can physically execute — and skipping it, or ignoring what it does to your circuit, is one of the most common sources of confusion when moving from simulation to hardware.

## What you'll learn

- Why transpilation is mandatory, not optional, before running on real hardware
- What `optimization_level` actually trades off (0 through 3)
- What routing is and why SWAP gates get inserted
- A real, documented circuit identity showing why gate counts explode after transpilation
- Why "how many gates does my circuit have" only has a meaningful answer after transpiling for a specific backend

## Transpiling for a target backend

```python
from qiskit import transpile

compiled = transpile(qc, backend=backend, optimization_level=3)
```

This call does two things at once: it rewrites every gate in `qc` into the backend's native basis gate set, and it maps your circuit's logical qubits onto the backend's physical qubits, respecting the coupling map covered in the previous lesson. The result, `compiled`, is the circuit that actually gets sent to hardware — not `qc` itself.

## `optimization_level`: 0 through 3

`optimization_level` controls how hard the transpiler works to shrink the resulting circuit:

- **0** — minimal effort. Fast to compile, but the output circuit is typically larger and deeper than necessary.
- **1** — light optimization passes.
- **2** — more aggressive optimization.
- **3** — the most aggressive gate-count and circuit-depth reduction available, at the cost of being the slowest to compile.

For real hardware, where every extra gate is another chance for error to accumulate, higher optimization levels usually matter more than they do in simulation — a shorter, shallower circuit after transpilation tends to produce cleaner results on noisy real devices.

## Routing: why SWAP gates appear

If a two-qubit gate in your circuit acts on two logical qubits that land on non-adjacent physical qubits (per the backend's coupling map), the transpiler can't just skip or fake that connection. Instead it inserts SWAP gates to physically move the relevant qubit states next to each other before applying the real two-qubit interaction. Each SWAP is itself built from multiple native two-qubit gates, so routing can add a meaningful number of extra gates beyond what you wrote — this is one of the two reasons (along with basis-gate rewriting) that a transpiled circuit is almost always bigger than the one you authored.

## A real circuit identity: the Toffoli's hidden cost

Here's a well-documented fact you don't need to simulate to verify — it's a standard textbook decomposition, not a one-off measurement. A single Toffoli (CCX) gate, when decomposed into a basis gate set of CX plus single-qubit gates, is standardly expanded into **6 CNOT gates** plus several single-qubit H, T, and T† gates. That's the cost of just one three-qubit gate once it's broken down into what hardware can actually run.

Now consider a circuit that uses several Toffolis — not unusual in classical-logic-style quantum circuits (adders, comparators, oracles for Grover's algorithm). Each one individually expands to 6 CNOTs plus single-qubit gates during transpilation. A circuit that looked compact and readable with a handful of CCX gates in your source code can balloon into dozens of CNOTs once transpiled — and that's before routing adds any further SWAP overhead for a specific backend's connectivity.

```python
qc = QuantumCircuit(3)
qc.ccx(0, 1, 2)   # one gate in your source...

compiled = transpile(qc, backend=backend, optimization_level=3)
print(compiled.count_ops())  # ...but several CX + single-qubit gates after transpiling
```

## Why gate count is a post-transpilation question

This is the practical lesson underneath all of the above: "how many gates does my circuit have" is not answerable from `qc` alone. The honest answer depends on which backend you're targeting (its basis gates and coupling map) and which `optimization_level` you used. Two different backends can transpile the exact same `QuantumCircuit` into noticeably different gate counts and depths. When you're estimating whether a circuit is "small enough" to run cleanly on noisy hardware, always look at `compiled.count_ops()` and `compiled.depth()` on the transpiled circuit for your actual target backend — never the untranspiled one.

## Key terms

| Term | Meaning |
|---|---|
| Transpilation | The mandatory process of rewriting an abstract circuit into a target backend's native gates and physical qubit layout |
| `optimization_level` | A 0–3 setting controlling how aggressively the transpiler reduces gate count/depth, trading off against compile time |
| Routing | Inserting SWAP gates so a two-qubit gate's target qubits are physically adjacent on the backend |
| Toffoli (CCX) decomposition | The standard textbook identity: one CCX gate expands to 6 CNOT gates plus several single-qubit H/T/T† gates |
| `compiled.count_ops()` | Reports actual gate counts on the transpiled circuit — the only trustworthy source for "how big is my circuit" |

## Check yourself

A colleague says their circuit is "small" because it only has 4 Toffoli gates in the `QuantumCircuit` they wrote. Using the standard Toffoli decomposition fact from this lesson, explain why that circuit could still produce a surprisingly large number of CNOT gates after transpilation, and why the answer also depends on which backend they target.
