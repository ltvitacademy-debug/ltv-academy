# Why Connectivity Limits Affect Circuit Design

A logical circuit diagram doesn't know or care which physical qubits anything runs on — it just draws a gate between two wires. Real hardware isn't that forgiving, and the gap between the two is where a compiler's hardest work, and a real chunk of a circuit's final error, actually comes from.

## What you'll learn

- Why a logical circuit's gate list assumes connectivity the hardware may not have
- What "transpiling" or "routing" a circuit onto a device actually does
- Why non-adjacent physical qubits need help (typically SWAP gates) to interact
- A worked, verified example of the extra two-qubit operations and error that routing adds
- Why this directly eats into a circuit's effective fidelity and depth budget

## The logical-circuit assumption

When you write or design a quantum circuit — on paper, in Qiskit, in any circuit diagram — a two-qubit gate between "qubit 3" and "qubit 7" is just drawn as a line connecting two wires. Nothing about that diagram encodes whether qubit 3 and qubit 7 are anywhere near each other on real hardware. This is a deliberate and useful abstraction for designing algorithms, but it's also exactly the gap that the previous lesson's connectivity graph exists to close: a real device has a fixed, specific answer for which qubit pairs can interact directly, and most interesting circuits will ask for at least some pairs that aren't on that list.

## Transpiling: mapping logical qubits onto physical ones

Before a circuit can run on real hardware, a compiler step — generally called transpilation or routing — maps each logical qubit in the circuit onto a specific physical qubit on the chosen device, and then rewrites any gate that falls outside the device's connectivity graph into something the hardware can actually execute. This isn't optional post-processing; it's a required translation step between the algorithm you designed and the gate sequence the hardware actually runs, and it can change the circuit substantially from what was originally drawn, even though the computation it performs is logically identical.

## When qubits aren't adjacent: the SWAP detour

The standard way a compiler makes a non-adjacent two-qubit gate possible is to insert SWAP gates that physically move one qubit's state, one hop at a time, along the connectivity graph's edges, until the two qubits that need to interact are adjacent — then it applies the real gate, and often swaps the state back afterward to preserve the circuit's intended qubit layout for later gates. Each SWAP costs real time and real two-qubit gates (the next lesson covers exactly how many), so routing isn't free: it's a genuine addition to the circuit, not a bookkeeping trick.

## A concrete, verified example

Say a circuit needs a gate between two physical qubits sitting at graph distance 3 apart on a device's connectivity graph (that is, 3 edges separate them along the shortest path). Bringing them adjacent requires 2 SWAPs (one fewer than the distance, since the last hop is where the real gate happens). On superconducting hardware, each SWAP is typically built from 3 CNOTs (covered in detail next lesson), so those 2 SWAPs cost 6 CNOTs — plus the 1 CNOT for the actual logical gate, for 7 total two-qubit operations where the logical circuit only asked for 1. Using a representative two-qubit gate error rate of roughly 0.5% per operation, a single direct gate carries about a 0.5% chance of error; the routed version, with 7 total two-qubit operations, carries closer to a 3.4% chance of at least one error along the way (computed as 1 − (1 − 0.005)^7) — nearly seven times higher, purely from the routing, with the logical operation itself unchanged.

## Why this eats into the fidelity and depth budget

Every real device has only so much usable circuit depth before accumulated error overwhelms the result — Chapters 1 and 2 covered why coherence times and gate error rates impose that ceiling. Routing overhead spends part of that limited budget on gates that don't advance the computation at all; they only exist to work around the chip's wiring. A circuit that looks like it needs, say, 40 native two-qubit gates can end up executing well over 60 after routing, depending on how well its logical connectivity matches the device's physical graph — meaning the real constraint on what a circuit can accomplish isn't just "how many logical gates does the algorithm need," but "how many logical gates does the algorithm need, given how badly its connectivity pattern mismatches this specific chip."

## Key terms

| Term | Meaning |
|---|---|
| Transpilation / routing | The compiler step that maps a logical circuit's qubits onto physical qubits and rewrites gates to respect the device's connectivity graph |
| Graph distance | The number of edges along the shortest path between two qubits on a connectivity graph |
| SWAP detour | Inserting SWAP gates to move qubit states until two qubits that need to interact become adjacent |
| Routing overhead | The extra gates, time, and error a circuit incurs purely from working around connectivity limits, beyond its logical gate count |

## Check yourself

A circuit designer claims their algorithm "only needs 40 two-qubit gates, so it should fit easily within the device's error budget." What question about the device would you ask before accepting that claim, and why?
