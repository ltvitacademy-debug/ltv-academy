# Pulse-Level Control

A "Hadamard gate" or a "CNOT" is a convenient abstraction. Underneath it, on real hardware, is nothing but a carefully shaped analog microwave or laser pulse. This lesson looks at what's inside that abstraction, and why some of the most important fidelity gains in real quantum hardware come from tuning the pulse itself rather than treating the gate as a fixed black box.

## What you'll learn

- What a logical gate actually reduces to at the hardware level: a shaped analog pulse
- The pulse parameters that matter: amplitude, phase, frequency, and duration
- Why pulses are calibrated per-qubit rather than shared across a whole chip
- What pulse-level programming (OpenPulse / Qiskit Pulse-style access) lets you do that gate-level programming doesn't
- A concrete example of pulse shaping improving on a default gate: DRAG pulses

## Underneath a gate: an analog pulse

When you write a circuit using a gate like X, H, or CNOT, a compiler eventually translates that instruction into one or more physical control pulses sent to the hardware. For a superconducting qubit, a single-qubit gate is typically implemented as a microwave pulse at (or near) the qubit's resonant frequency, applied for some duration, with some amplitude and phase. For a trapped-ion or neutral-atom qubit, it's often a laser pulse instead, but the same idea holds: a gate is a name for what a specific, measured pulse accomplishes on that specific qubit.

## The parameters that define a pulse

- **Amplitude** controls how strongly the qubit is driven — for a simple drive, it relates directly to how far the qubit's state rotates.
- **Phase** controls the axis of rotation on the qubit's state space (the Bloch sphere), which is how a single microwave drive can implement different single-qubit rotations.
- **Frequency** has to match the qubit's own transition frequency closely enough to drive it efficiently, and detuning (being off-frequency) is itself sometimes used deliberately as a control knob.
- **Duration** trades off against amplitude for a given total rotation, and also interacts directly with error — longer pulses give decoherence more time to act, while pulses pushed too short or too strong can drive unwanted transitions.

Every one of these parameters is calibrated **per qubit**, because no two physical qubits on a chip are identical: fabrication variation means each qubit has its own resonant frequency and its own response to a drive, so a pulse tuned for qubit 3 is not simply reusable, unmodified, on qubit 7.

## Gate-level vs. pulse-level programming

Most users interact with quantum hardware at the gate level: you write a circuit out of a fixed library of gates (X, H, CNOT, etc.), and the provider's compiler maps each one to its own pre-calibrated default pulse. This is simpler and is the right level for most circuit-writing work.

Some frameworks also expose a lower level of access — pulse-level control, popularized under names like **OpenPulse** and available through interfaces such as Qiskit Pulse-style programming — that lets an advanced user or a compiler bypass the default gate definitions and specify the actual pulse shape directly: its envelope, phase, frequency, and timing, sample by sample. This is strictly more work and strictly more fragile (a hand-tuned pulse can be wrong in ways a named gate usually isn't), but it opens up optimizations that gate-level programming can't reach, because the provider's default pulse for a given gate is tuned to be good on average across typical use, not optimal for your specific circuit, your specific qubit's current state, or a tighter fidelity/speed trade-off than the default assumes.

## Why tune the pulse yourself: DRAG pulses as a concrete example

A well-known example of pulse shaping paying off directly in fidelity is the **DRAG pulse** (Derivative Removal by Adiabatic Gate) used on superconducting qubits. A simple microwave pulse intended to drive a single-qubit rotation can also, unintentionally, drive some probability into a higher, unwanted energy level of the same physical qubit (leakage) — because real superconducting qubits are not perfect two-level systems, and a nearby higher state can be weakly addressed by the same drive. A DRAG pulse corrects for this by adding a small additional component to the pulse shape, derived from the pulse's own envelope, that actively suppresses that leakage pathway. The result is a gate that can run faster, or with lower error, than a naively-shaped pulse would allow at the same speed — a real, measurable fidelity gain that comes specifically from shaping the pulse rather than from any change to the qubit hardware itself.

This is the general pattern pulse-level control enables: the gate abstraction gives you a correct but generic implementation; shaping the underlying pulse lets you specialize it for a specific error mechanism, specific hardware, or a specific speed/fidelity trade-off.

## Key terms

| Term | Meaning |
|---|---|
| Pulse envelope | The shape of a control pulse's amplitude (and phase) over time |
| OpenPulse / pulse-level programming | A lower-level interface that exposes raw pulse parameters directly, below the fixed-gate abstraction |
| Per-qubit calibration | The practice of tuning pulse parameters separately for each physical qubit due to fabrication variation |
| Leakage | Unwanted population of a higher energy level outside the intended two-level qubit subspace |
| DRAG pulse | A shaped pulse technique that suppresses leakage in superconducting qubit gates, improving fidelity or speed |

## Check yourself

A provider's default CNOT gate on a given qubit pair has a published error rate. Why might a research team choose to hand-tune the underlying pulse for that specific gate rather than simply accepting the provider's default — and what do they risk by doing so?
