# Coherence Times: T1 & T2

Every superconducting qubit is a race against time: the quantum information it holds decays, and the clock that matters most for any real computation is how much useful work can happen before it does. T1 and T2 are the two numbers that describe that clock.

## What you'll learn

- What T1 (energy relaxation) measures, physically
- What T2 (dephasing) measures, and how it differs from T1
- The mathematical relationship between T2 and T1, and why T2 can never exceed 2×T1
- Why coherence time directly limits how deep a quantum circuit can be before results become unreliable
- How coherence times have trended across device generations (hedged, not as a precise current figure)

## T1: energy relaxation

**T1**, or the energy relaxation time, measures how long a qubit prepared in the excited state |1⟩ takes, on average, to decay back down to the ground state |0⟩ — losing its energy to the surrounding environment, much like an excited atom eventually emitting a photon and relaxing. This is sometimes called **amplitude damping**. Physically, T1 is limited by the qubit losing energy into things like microscopic defects in the chip's materials, dielectric loss in the capacitors, or stray coupling to the control and readout wiring. A longer T1 simply means the qubit holds onto its excited-state population longer before relaxing — it's a direct measure of energy loss.

## T2: dephasing

**T2**, the dephasing time, measures something different: how long a qubit prepared in a *superposition* of |0⟩ and |1⟩ maintains the precise phase relationship between those two components before it's scrambled by noise. A qubit can lose its phase information — becoming effectively a random mix of |0⟩ and |1⟩ with no well-defined superposition — even without losing any energy at all. This kind of pure dephasing (often denoted with its own characteristic time, Tφ) is typically caused by slow fluctuations in the qubit's own transition frequency — for a transmon, residual charge noise or flux noise shifting the energy levels slightly from one run to the next, even after the transmon's redesign reduced (but did not eliminate) charge-noise sensitivity.

## The relationship between T2 and T1

T1 and T2 are not independent — dephasing and energy relaxation both contribute to the overall loss of quantum coherence, and the standard relationship is:

1/T2 = 1/(2·T1) + 1/Tφ

where Tφ is the pure dephasing time. Because 1/Tφ is always zero or positive, this relationship guarantees that **T2 can never exceed 2×T1** — and T2 equals exactly 2×T1 only in the ideal limit where pure dephasing is negligible (Tφ → ∞). Running the numbers makes this concrete: for a qubit with T1 = 100 microseconds and a pure dephasing time Tφ of 100 microseconds, the relationship gives T2 ≈ 66.7 microseconds — well under the 200-microsecond ceiling of 2×T1. Only as Tφ grows very large relative to T1 does T2 approach that 2×T1 ceiling. In practice, both T1 and T2 are measured directly on real hardware (T1 via a relaxation experiment, T2 via a Ramsey or spin-echo experiment) rather than assumed, and T2 is almost always somewhat below the 2×T1 bound because some pure dephasing is essentially always present.

## Why coherence time limits circuit depth

Every gate operation on a qubit — every microwave pulse — takes a finite amount of time, and every qubit, whether it's being actively used or just sitting idle as part of a larger circuit, is simultaneously decaying toward the ground state and dephasing the whole time. If a circuit's total run time (the sum of all gate operations and idle time across the full computation) becomes a significant fraction of T1 or T2, the probability that the qubit decays or dephases partway through the computation becomes significant, and the final measurement becomes unreliable. This is why coherence time is often described as placing a hard ceiling on **circuit depth** — roughly, how many sequential gate layers a computation can contain before the accumulated chance of decoherence overwhelms the signal. Longer coherence times directly translate into "more computation possible before the answer becomes noise," which is why improving T1 and T2 has been one of the central, sustained engineering efforts in the whole field.

## How coherence times have trended

Coherence times in superconducting qubits have improved substantially across device generations as materials, fabrication processes, and chip designs have matured — early superconducting qubits had coherence times measured in nanoseconds to low microseconds, and more recent devices have reached coherence times on the order of tens to a few hundred microseconds, roughly, as of recent years. Treat any more specific number you encounter elsewhere as a snapshot of one particular device at one particular point in time, not a stable industry-wide figure — coherence times vary meaningfully between qubits on the very same chip, and the state of the art continues to shift.

## Key terms

| Term | Meaning |
|---|---|
| T1 (energy relaxation time) | Average time for a qubit in |1> to decay to |0>, losing energy to its environment; also called amplitude damping |
| T2 (dephasing time) | Average time a qubit superposition maintains its phase relationship before being scrambled by noise |
| Pure dephasing time (Tφ) | The dephasing contribution from processes other than energy relaxation, e.g. slow frequency fluctuations |
| Circuit depth | Roughly, how many sequential gate layers a quantum computation can contain before accumulated decoherence makes the result unreliable |

## Check yourself

A qubit has T1 = 150 microseconds and a measured T2 = 90 microseconds. Using 1/T2 = 1/(2·T1) + 1/Tφ, is this result physically plausible, and roughly what does it imply about Tφ relative to T1?
