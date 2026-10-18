# Metrics That Actually Matter: Qubit Count, Fidelity, Connectivity

Every quantum hardware announcement leads with one number — "1,000 qubits" — and that number is almost always the least useful thing you could know about the device. This lesson teaches you what to look at instead.

## What you'll learn

- Why raw qubit count is a marketing number, not an engineering one
- What fidelity actually measures, and why a single device can have several different fidelity numbers that matter in different ways
- Why connectivity determines what a circuit can run just as much as qubit count or fidelity does
- The "three-way AND" rule: qubits, coherent depth, and connectivity all have to be sufficient at the same time
- How to read past a qubit-count headline to the numbers that actually predict whether your circuit will run

## "Biggest number wins" is the wrong framing

If you only read press releases, quantum hardware progress looks like a qubit-count race: 27, then 127, then 433, then over 1,000. It is tempting to treat this the way you'd treat clock speed on an old CPU box — bigger number, better chip. It doesn't work that way here, for a simple reason: a qubit that exists but can't hold a useful quantum state for long enough, or can't be reached by the qubits it needs to interact with, contributes close to nothing to what the device can actually compute. You learned in earlier chapters that every real qubit — superconducting, trapped-ion, photonic, or neutral-atom — is a noisy physical object with a limited coherence time and an error-prone set of gates. Scaling the *count* of those noisy objects up without also controlling their *quality* just gives you more noise, not more computing power. A device with 1,000 low-fidelity, poorly connected qubits can be less useful for a real algorithm than a device with 50 high-fidelity, well-connected ones.

## Fidelity: the number that tells you how much you can trust each operation

Fidelity measures how close a real physical operation comes to the ideal mathematical operation it's supposed to implement, expressed as a number from 0 to 1 (or as an error rate, which is roughly `1 - fidelity`). There isn't one fidelity number per device — there are several, and they matter differently:

- **Single-qubit gate fidelity** — how accurately a one-qubit gate (like a rotation) is applied. Usually the highest fidelity on the chip, often 99.9%+ on modern devices.
- **Two-qubit gate fidelity** — how accurately an entangling gate (like a CNOT or CZ) between two specific, physically connected qubits is applied. This is almost always noticeably worse than single-qubit fidelity, because two-qubit gates require precise interaction between physical systems and are far more sensitive to crosstalk and calibration drift (Chapter 5 covered why this drifts and has to be recalibrated).
- **Readout fidelity** — how accurately the final measurement correctly reports the qubit's state. A device can have excellent gate fidelity and still deliver garbage answers if readout is unreliable.

A circuit's real-world success rate depends on compounding these error rates across every gate and every readout the circuit actually uses — which is why a device advertising a single average fidelity number is giving you a rough sketch, not the full picture. A circuit that leans heavily on two-qubit gates will feel the two-qubit error rate far more than the single-qubit one.

## Connectivity: the number that tells you what the circuit can reach

Connectivity is the map of which physical qubits can be directly entangled with which other physical qubits — the device's topology, covered in Chapter 4. It matters independently of both qubit count and fidelity because an algorithm's circuit often needs two qubits to interact that are not adjacent on the real chip. When that happens, the compiler has to insert extra SWAP operations to physically move quantum information across the chip until the needed qubits are next to each other — and every inserted SWAP is itself built from real two-qubit gates, each with its own two-qubit error rate. A circuit that looks small and clean on paper can turn into a much deeper, noisier circuit once it's compiled onto a sparsely connected device, even though the qubit count and gate fidelity never changed. This is why a device with fewer qubits but denser connectivity (or all-to-all connectivity, as some trapped-ion and photonic systems approximate) can run a given algorithm more faithfully than a device with far more qubits arranged in a sparse grid.

## The three-way AND: qubits, coherent depth, and connectivity, all at once

Put the three ideas together and you get the rule this lesson is really about: a circuit is runnable on a device only if the device has **enough qubits** to hold the problem, **enough coherent circuit depth** — enough gates it can execute before accumulated error and decoherence destroy the result — to execute the circuit's full gate sequence, *and* **enough connectivity** to route the circuit without exploding that depth with SWAPs. These three requirements are joined by "and," not "or." A device that's excellent on any two of them still fails if it's weak on the third: huge qubit count with poor fidelity can't sustain enough coherent depth to finish a real circuit; excellent fidelity and connectivity on too few qubits can't hold a large enough problem; and large qubit count with excellent fidelity but poor connectivity burns its coherent-depth budget on SWAP overhead before the real algorithm even gets to run. Judging a device on qubit count alone silently assumes the other two are fine — which is exactly the assumption that marketing numbers let you skip past.

## Reading past the headline number

When you evaluate a real device for a real workload, qubit count tells you the theoretical upper bound on problem size and nothing else. The questions that actually predict whether your circuit will run are: what's the two-qubit gate fidelity on the specific qubit pairs my circuit uses, what's the realistic circuit depth this device can sustain before noise dominates, and does the device's connectivity graph already contain the connections my circuit needs, or will the compiler have to route around gaps? The next lesson introduces a benchmark — Quantum Volume — that was designed specifically to fold several of these factors into a single number, because evaluating them one at a time, as this lesson does, is accurate but slow.

## Key terms

| Term | Meaning |
|---|---|
| Fidelity | How closely a real physical operation (gate or readout) matches its ideal mathematical counterpart, expressed as a value near 1 (or as an error rate near 0) |
| Two-qubit gate fidelity | The fidelity of an entangling gate between two specific physically connected qubits; typically the limiting fidelity number on a device |
| Readout fidelity | How accurately a measurement reports a qubit's true final state |
| Coherent circuit depth | The number of sequential gate layers a device can execute before accumulated noise and decoherence make the result unreliable |
| Connectivity | The map of which physical qubits can be directly entangled with which other qubits on a given device |
| SWAP overhead | Extra two-qubit gates a compiler inserts to move quantum information between non-adjacent qubits so a circuit can be executed on a given topology |

## Check yourself

A vendor announces a new 500-qubit chip and says nothing about its two-qubit gate fidelity or its connectivity graph. Using the three-way AND rule from this lesson, explain why you can't yet conclude anything about what real circuits this chip can actually run — and name the two specific follow-up numbers you'd ask for before judging it.
