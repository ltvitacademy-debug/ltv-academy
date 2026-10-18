# The QAOA Circuit Structure

QAOA — the Quantum Approximate Optimization Algorithm — is the circuit that actually runs the Ising Hamiltonians you built in Chapter 1 on quantum hardware. This lesson lays out its skeleton: what gates fire, in what order, and why the circuit has exactly 2p tunable numbers for a depth-p circuit.

## What you'll learn

- The three-part QAOA circuit: state preparation, alternating cost/mixer layers, measurement
- What "depth p" means and why each layer adds exactly two new parameters (γ and β)
- How to read a QAOA circuit diagram layer by layer
- A fully simulated, exactly-verified example: QAOA solving a single-edge Max-Cut perfectly
- Why QAOA is called "variational" even though it's a fixed circuit structure

## The three-part skeleton

Every QAOA circuit, regardless of the problem, has the same three-part shape:

1. **State preparation**: apply a Hadamard gate to every qubit, starting from |0...0⟩. This produces an equal superposition over all 2^n possible bitstrings — every candidate solution to your QUBO starts with equal footing.
2. **p alternating layers**, each layer consisting of:
   - A **cost unitary** U_C(γ) = e^(-iγH_C), built from the problem's cost Hamiltonian H_C (the Ising form from Chapter 1)
   - A **mixer unitary** U_B(β) = e^(-iβH_B), built from a fixed mixer Hamiltonian H_B (almost always the sum of Pauli-X operators, one per qubit)
3. **Measurement**: measure all qubits in the computational basis, repeatedly, to build up a distribution over candidate bitstrings — then read off the cost of each measured bitstring and keep the best one seen.

The number p is called the **circuit depth** (confusingly, not gate depth in the circuit-diagram sense, but the number of cost/mixer layer repetitions). Each layer contributes exactly two free parameters: γ_k (gamma, controlling that layer's cost unitary) and β_k (beta, controlling that layer's mixer unitary). A depth-p QAOA circuit therefore has exactly **2p tunable parameters** total: (γ_1, β_1, γ_2, β_2, ..., γ_p, β_p).

## Reading the circuit layer by layer

Picture a depth-1 (p=1) circuit on 2 qubits for a single-edge Max-Cut problem (nodes 0 and 1, one edge between them — the simplest possible instance):

```
|0⟩ ──H──┤          ├──┤          ├── measure
         │ U_C(γ)   │  │ U_B(β)   │
|0⟩ ──H──┤          ├──┤          ├── measure
```

Reading left to right: Hadamards create the uniform superposition over the 4 basis states |00⟩, |01⟩, |10⟩, |11⟩. U_C(γ) applies a phase to each basis state proportional to that state's cost (cut value) — it doesn't change any probabilities yet, only phases. U_B(β) is what actually redistributes probability between basis states, because Pauli-X rotations mix amplitudes across different bit values. The interference between the phase pattern U_C set up and the mixing U_B performs is exactly what steers the final measurement distribution toward high-cost (good cut) bitstrings — and tuning γ and β well is what makes that steering effective, which is the whole subject of Lesson 8.

## A fully verified worked example

Running an exact state-vector simulation (not an approximation) of this depth-1, 2-qubit circuit on the single-edge Max-Cut problem, with the cost Hamiltonian's per-basis-state values being 0 for |00⟩, 1 for |01⟩, 1 for |10⟩, and 0 for |11⟩ (matching the per-edge QUBO term from Lesson 4):

At **γ = π/2 ≈ 1.5708** and **β = π/8 ≈ 0.3927**, direct simulation gives the exact measurement probabilities:

| Basis state | Cost value | Probability |
|---|---|---|
| \|00⟩ | 0 | 0.0000 |
| \|01⟩ | 1 | 0.5000 |
| \|10⟩ | 1 | 0.5000 |
| \|11⟩ | 0 | 0.0000 |

This circuit, with these exact angles, **never** measures an uncut assignment — it lands on one of the two cut assignments (|01⟩ or |10⟩) with 100% combined probability, giving an expected cost of exactly **1.0**, the true maximum possible for a single edge. For contrast, at poorly chosen angles γ = 0.1, β = 0.1, the same circuit's expected cost drops to only **≈0.519** — worse than a coin flip's worth of useful signal. Same circuit structure, same problem, wildly different quality — which is the whole reason Lesson 8 exists: picking γ and β well is not automatic.

## Why "variational" if the circuit structure is fixed?

QAOA is called a *variational* quantum algorithm because, while the circuit's gate structure (Hadamards, then p rounds of cost/mixer unitaries) is fixed in advance, the 2p numerical parameters inside it are not — they're adjusted iteratively by a classical optimizer running outside the quantum computer, using measured expectation values as feedback. This hybrid loop — quantum circuit evaluates a candidate (γ, β), classical optimizer proposes the next candidate — is the defining pattern of every algorithm in this course, VQE included (Chapter 3). The quantum hardware never "learns"; it evaluates. The classical optimizer is what learns.

## Key terms

| Term | Meaning |
|---|---|
| QAOA | Quantum Approximate Optimization Algorithm — a variational circuit alternating cost and mixer unitaries to approximately solve QUBO/Ising problems |
| Circuit depth (p) | The number of cost+mixer layer repetitions in a QAOA circuit; contributes 2p tunable parameters |
| Cost unitary U_C(γ) | e^(-iγH_C); applies a phase to each basis state proportional to its cost value |
| Mixer unitary U_B(β) | e^(-iβH_B), typically built from Pauli-X operators; redistributes probability amplitude across basis states |
| Hybrid loop | The quantum-classical pattern where a quantum circuit evaluates parameters and a classical optimizer updates them, shared by QAOA and VQE |

## Check yourself

For the single-edge example above, the circuit achieved expected cost 1.0 (perfect) at γ=π/2, β=π/8, but only ≈0.519 at γ=0.1, β=0.1. Explain, structurally, why a QAOA circuit with the exact same gates and the exact same problem can produce such different outcomes just from changing two numbers — what is it, specifically, about U_C and U_B that makes the choice of γ and β matter this much?
