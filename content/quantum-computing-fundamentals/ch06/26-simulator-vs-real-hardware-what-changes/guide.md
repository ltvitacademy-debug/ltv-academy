# Simulator vs. Real Hardware: What Changes

Everything in this course up to now — exact amplitudes, exact probabilities, inspecting a state vector mid-circuit — is available because every example ran on a noiseless mathematical simulation. Real quantum hardware gives up several of those conveniences at once, and knowing exactly which ones is the difference between a circuit that works in theory and one that works on an actual device.

## What you'll learn

- Why simulators are exact and noiseless while real hardware has gate errors, readout errors, and decoherence
- Why real hardware can only be measured once per run, forcing repeated "shots" instead of exact probability readout
- A real simulated demonstration of why repeated shots only approximate, rather than exactly match, the true probabilities
- Why real hardware's limited qubit-to-qubit connectivity forces extra SWAP gates that a simulator never needs

## Noiseless math vs. noisy physics

Every gate applied in this course so far has been a mathematically exact matrix multiplication — a simulated Hadamard gate produces exactly 1/√2 and nothing else, every time. Real hardware has no such guarantee. Physical qubits suffer gate errors (a physical pulse meant to implement H lands slightly off from the ideal rotation), readout errors (measuring a qubit sometimes reports the wrong bit), and decoherence (a qubit's state slowly degrades toward a fixed, uninformative state over time, driven by unavoidable interaction with its environment). This connects directly to Chapter 4's circuit-depth lesson: every additional sequential layer of gates is more real time elapsed, which is more opportunity for decoherence to corrupt the result. Depth optimization is a serious practical concern on real hardware for exactly this reason — on a simulator, by contrast, depth only affects how long the simulation takes to run, never whether the final answer is correct.

## You can't read a quantum state — you can only sample it, many times

A simulator can print the exact state vector and the exact probability of every outcome at any point mid-circuit, because it has direct access to the underlying array of numbers. Real hardware offers no such window: a measurement is a one-time physical event that collapses the qubit to a single classical outcome, and the state before that collapse is gone. The only way to learn a circuit's probability distribution on real hardware is to run the *entire circuit* from scratch, many times, and tally how often each outcome occurs — each full run is called a "shot."

To make the gap between "exact probability" and "shot-based estimate" concrete, I simulated 1,000 shots of a Bell-state measurement in `node`, sampling each shot from the Bell state's true probabilities (0.5 for |00⟩, 0.5 for |11⟩, 0 for the other two) using `Math.random()`:

```
00: 487
01: 0
10: 0
11: 513
total: 1000
```

The true probabilities are exactly 0.5 and 0.5 — but 1,000 real samples landed at 487 and 513, not 500 and 500. This is not a bug; it's exactly what finite sampling looks like, and it's exactly what running this same circuit on real quantum hardware 1,000 times would produce: a histogram that approaches the true probabilities as the shot count grows, but never lands on them exactly for any finite number of shots. (The 0s for |01⟩ and |10⟩ did land exactly right here, because those true probabilities are exactly zero — sampling noise only shows up around nonzero probabilities.) This is why real quantum hardware reports results as "counts over N shots" rather than as a clean probability number — a simulator can tell you the mathematical truth directly, while hardware can only let you estimate it statistically.

## Real hardware isn't fully connected

A simulator's `applyCNOT(state, control, target, numQubits)` function (built in Lesson 24) works identically no matter which two qubit indices are passed in — qubit 1 can interact with qubit 50 just as easily as qubit 2. Real hardware has no such freedom: physical qubits are arranged in a fixed layout (a line, a grid, a specific connectivity graph), and a two-qubit gate like CNOT can usually only be applied directly between qubits that are physically adjacent in that layout. If a circuit needs two non-adjacent qubits to interact, the hardware (or its compiler) has to insert extra SWAP gates — the gate from Chapter 3 — to physically move one qubit's state next to the other first. This directly costs extra depth (Chapter 4) and extra opportunities for the gate errors and decoherence described above, which is why the same logical circuit can run with meaningfully different real-world fidelity on two different hardware devices with different connectivity graphs, even though a simulator would treat them as completely identical.

## Key terms

| Term | Meaning |
|---|---|
| Decoherence | The gradual, unavoidable loss of a real qubit's quantum state over time due to interaction with its environment |
| Shot | One complete run of a circuit on real hardware, ending in one measurement outcome; probabilities are estimated by tallying many shots |
| Readout error | A measurement on real hardware reporting the wrong classical bit for a qubit's true collapsed state |
| Connectivity graph | The fixed physical layout describing which pairs of qubits on a real device can directly interact via a two-qubit gate |

## Check yourself

If you ran the Bell-state circuit on real hardware for only 10 shots instead of 1,000, would you expect the resulting 00/11 count split to be closer to or farther from a clean 50/50 split than the 1,000-shot result above, and why?
