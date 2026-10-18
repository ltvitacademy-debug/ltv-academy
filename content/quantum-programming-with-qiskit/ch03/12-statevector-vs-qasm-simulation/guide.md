# Statevector vs. QASM Simulation

The previous lesson ran a circuit and got back shot counts — an estimate built from repeated sampling. But simulation can also hand you something no real quantum computer ever can: the exact, complete quantum state itself, with no sampling involved at all. Knowing when you have that ground truth versus when you only have an estimate of it is one of the most important distinctions in this whole course.

## What you'll learn

- What exact statevector simulation is, and why it's only possible in simulation, never on real hardware
- What shot-based ("QASM"-style) simulation is, and why it's the model real hardware actually uses
- How to get a statevector with `Statevector(qc)`, with no measurement or shots required
- A verified side-by-side: exact amplitudes vs. a real sampled run of the same circuit
- Why even a perfectly noiseless simulator still only gives you an estimate once you add shots

## Exact statevector simulation: the ground truth

`qiskit.quantum_info.Statevector` computes the full complex amplitude vector of a circuit directly, with no sampling, no shots, and critically, no measurement gates in the circuit at all:

```python
from qiskit import QuantumCircuit
from qiskit.quantum_info import Statevector

qc = QuantumCircuit(2)
qc.h(0)
qc.cx(0, 1)

sv = Statevector(qc)
print(sv)
```

For this Bell-state circuit, the exact result is amplitude `0.7071068` on `00`, amplitude `0.7071068` on `11`, and amplitude `0` on both `01` and `10`. Squaring those amplitudes gives exact probabilities: `P(00) = 0.5`, `P(11) = 0.5`, `P(01) = 0`, `P(10) = 0` — with zero sampling error, because there was no sampling. This is the one thing a real quantum computer can never hand you directly: you cannot read out a qubit's amplitude by looking at it, only by measuring it and collapsing it to a classical bit. `Statevector` exists only because simulation lets you peek "under the hood" in a way physics itself doesn't allow.

## Shot-based simulation: the same model real hardware uses

The alternative is to add measurement gates and run the circuit many times, exactly as covered in the previous lesson:

```python
qc2 = QuantumCircuit(2, 2)
qc2.h(0)
qc2.cx(0, 1)
qc2.measure([0, 1], [0, 1])

backend = AerSimulator()
result = backend.run(transpile(qc2, backend), shots=4096).result()
counts = result.get_counts()
```

This is often loosely called "QASM-style" simulation, after the older `qasm_simulator` backend name — the point isn't the name, it's that this is the execution model real hardware is stuck with: run the circuit, measure, get one bit of classical information per qubit, repeat many times, and build up statistics. A real seeded run of this exact circuit at `shots=4096` gives:

```python
{'00': 2021, '11': 2075, '01': 0, '10': 0}
```

## The same circuit, two different kinds of truth

Put the two results side by side. The statevector approach says, with certainty, `P(00) = 0.5` and `P(11) = 0.5` exactly. The shot-based approach, at 4096 shots, observed `2021/4096 ≈ 0.4934` and `2075/4096 ≈ 0.5066` — close to 0.5, but not exactly 0.5, and it would be a different "not exactly 0.5" on a different run. This is the core idea to hold onto: statevector simulation tells you the exact ground truth, and shot-based simulation — and real hardware — only ever gives you a noisy estimate of that ground truth. That's true even here, where the simulator itself is completely noiseless (no gate error modeled at all). The only source of the gap between 0.5 and 0.4934 is statistical sampling noise from drawing a finite number of shots, not any flaw in the hardware or the gates. Once real hardware noise is added on top of that sampling noise (two lessons from now), you'll have two separate sources of deviation stacked on each other, and distinguishing them is a real, practical skill.

## Key terms

| Term | Meaning |
|---|---|
| Statevector simulation | Exact computation of a circuit's full complex amplitude vector, with no sampling and no measurement needed |
| `Statevector(qc)` | Qiskit's API for exact statevector simulation; the circuit must contain no measurement gates |
| Shot-based simulation | Running a circuit with measurement many times and collecting outcome statistics — the same model real hardware uses |
| Sampling noise | The expected statistical deviation between an observed shot frequency and the true underlying probability, present even with zero hardware error |
| Ground truth vs. estimate | Statevector simulation gives exact probabilities; any shot-based result (simulated or real) is only ever an estimate of them |

## Check yourself

A noiseless `AerSimulator` run of the Bell-state circuit at `shots=4096` gave `2021` counts for `00` instead of the exact `2048` you'd get from `0.5 × 4096`. Since the simulator has no hardware error modeled at all, what is the only possible source of that `2021` vs. `2048` gap, and would adding more shots make it disappear entirely?
