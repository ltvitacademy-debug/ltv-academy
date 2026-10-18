# SWAP Networks & Routing Overhead

The previous lesson showed that non-adjacent qubits need SWAP gates to interact at all. This lesson goes one level deeper: what a SWAP actually costs in real gates, how compilers try to minimize that cost across a whole circuit, and why, on large or deep circuits, routing overhead can end up dominating the total error budget.

## What you'll learn

- What a SWAP gate does and how it's typically built on superconducting hardware
- Why one SWAP costs roughly three times a native two-qubit gate
- What a "SWAP network" is and why compilers try to minimize total SWAP count
- A verified example of how cumulative SWAP error scales on a larger circuit
- Why connectivity-aware compilation is a real, consequential engineering problem, not a detail

## What a SWAP gate does

A SWAP gate exchanges the quantum states held by two qubits — whatever qubit A was holding, qubit B now holds, and vice versa. It's the mechanism a compiler uses to physically relocate information across a chip: instead of magically teleporting a qubit's state to where it's needed, the compiler walks it there one adjacent hop at a time, using one SWAP per hop, along edges of the connectivity graph from the previous two lessons.

## Why one SWAP costs about three CNOTs

SWAP isn't a gate most hardware implements natively — on superconducting chips, it's standard to build a SWAP out of three CNOT gates in sequence (CNOT(A,B), CNOT(B,A), CNOT(A,B)), which together have the mathematical effect of exchanging the two qubits' states. That means every SWAP a compiler inserts isn't "one extra gate" — it's three extra two-qubit gates, each with its own real error rate and execution time. Using a representative two-qubit gate error of roughly 0.5%, a single SWAP carries a meaningfully higher error chance than a single native CNOT — not three times the probability exactly (errors don't simply add), but close to it at these small error rates, and it always costs three times the gate count and roughly three times the execution time.

## SWAP networks: minimizing total insertions

For any circuit with more than a couple of two-qubit gates, a compiler isn't just inserting one isolated SWAP — it's solving a genuine optimization problem: given the circuit's full list of required two-qubit interactions and the device's connectivity graph, find an assignment of logical qubits to physical qubits, and a sequence of SWAPs, that lets every required gate happen while inserting as few total SWAPs as possible. This sequence of inserted SWAPs is often called a SWAP network. Real compilers (Qiskit's transpiler and similar tools from other vendors) use heuristic routing algorithms to search for a good SWAP network, because finding the provably optimal one is computationally expensive for anything but small circuits — "good enough, fast enough" routing is the practical standard, not a perfect solution.

## A verified look at cumulative error on a larger circuit

The per-SWAP cost compounds fast once a circuit needs many of them. Take a circuit that would need 40 native two-qubit gates if run on hardware with perfect connectivity, but whose actual mapping onto a real device's connectivity graph requires inserting 20 SWAPs along the way — a realistic number for a circuit with several long-range interactions on a sparse chip. Those 20 SWAPs cost 60 CNOT-equivalents (20 × 3), on top of the original 40, for 100 total two-qubit operations. At a representative 0.5% per-gate error rate, the 40-gate native circuit alone carries roughly an 18% chance of at least one error; with the 60 extra SWAP-derived gates added in, that climbs to roughly 39% — more than double, and now routing overhead alone is responsible for more than half of the circuit's total error risk. On a circuit with worse connectivity match or more long-range gates, SWAP overhead can realistically become the single largest source of error in the whole computation, larger than every other error source combined.

## Why connectivity-aware compilation is a real engineering lever

This is the direct, practical reason routing and SWAP-network minimization get serious engineering attention rather than being treated as a solved detail: the same logical algorithm, compiled well versus compiled poorly for a given device's connectivity graph, can differ by a large margin in total error and total runtime — without the algorithm itself changing at all. Choosing which physical qubits to use, writing circuits that respect a device's natural connectivity where possible, and relying on a good router are all real levers a practitioner has for getting more usable computation out of the same imperfect hardware.

## Key terms

| Term | Meaning |
|---|---|
| SWAP gate | A gate that exchanges the quantum states held by two qubits, used to relocate information across a connectivity graph |
| SWAP network | The full sequence of SWAP gates a compiler inserts to route a circuit's required interactions onto a device's connectivity graph |
| Routing overhead | The extra gates, time, and accumulated error contributed purely by inserted SWAPs, beyond the circuit's native gate count |
| Heuristic routing | A practical, "good enough" algorithm for finding a low-SWAP-count mapping, used because finding the truly optimal mapping is computationally expensive |

## Check yourself

Two compilers produce valid circuits for the same algorithm on the same device: one inserts 5 SWAPs, the other inserts 25. Both circuits are logically correct. Why might the first one still be the far better choice to actually run?
