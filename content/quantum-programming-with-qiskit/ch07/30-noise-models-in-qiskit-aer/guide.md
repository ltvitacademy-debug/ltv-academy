# Noise Models in Qiskit Aer

Every circuit you've simulated so far has run on a perfect, idealized machine. Real quantum hardware isn't perfect — qubits decohere, gates introduce small errors, and even the final measurement can misreport the result. Qiskit Aer lets you simulate those imperfections deliberately, so you can study how they affect your results before you ever touch real hardware.

## What you'll learn

- The three main noise channel types in `qiskit_aer.noise` and what each one actually models
- How to build and apply a simple custom noise model with `pauli_error`
- The real difference between statistical shot noise and injected hardware error
- How to pull an actual device's live calibrated noise profile into a simulation with `NoiseModel.from_backend()`

## Three kinds of imperfection, three noise channels

`qiskit_aer.noise` ships several error channel constructors, and each one models a genuinely different physical failure mode:

**`depolarizing_error`** models a gate that, with some probability, replaces the intended operation with a random Pauli error (X, Y, or Z) instead of doing nothing wrong. It's a simple, commonly used stand-in for "this gate sometimes just goes wrong," and you've already used it in earlier chapters as a basic noise source.

**`thermal_relaxation_error`** is more physically grounded: it models real T1 energy-relaxation (a qubit in state |1⟩ spontaneously decaying toward |0⟩) and T2 dephasing (loss of phase coherence) as a function of how long a gate takes to execute. The longer a gate takes relative to the qubit's T1/T2, the more relaxation and dephasing accumulate. Be careful about treating any specific T1/T2 number as fixed — real current superconducting-qubit T1/T2 values are typically somewhere in the tens-to-hundreds-of-microseconds range, but they vary by device and by calibration date, and they drift. If you're modeling a specific backend, pull its live numbers from `backend.properties()` rather than hardcoding a value you read somewhere once.

**`readout_error`** models imperfection in the measurement step itself, not the quantum state. A qubit that is truly in state 0 right before measurement is sometimes read out as 1, and vice versa. This is a purely classical reporting error layered on top of whatever state the qubit was actually in — which matters a lot, because unlike gate error, it can potentially be corrected after the fact (the subject of the next lesson).

## Building a simple custom noise model

You don't need a real backend to experiment with noise. Here's a clean, minimal bit-flip-style error injected directly before a measurement:

```python
from qiskit_aer.noise import NoiseModel, pauli_error

error = pauli_error([('X', 0.02), ('I', 0.98)])
noise_model = NoiseModel()
noise_model.add_all_qubit_quantum_error(error, ['x'])
```

This says: whenever an `x` gate is applied to any qubit, there's a 2% chance it actually gets followed by an extra X flip (undoing or compounding the intended operation) and a 98% chance it behaves correctly. Applied to a qubit prepared in `|0⟩` with no other gates, the *true* probabilities under this 2% error channel are P(0) = 0.98 and P(1) = 0.02 — under zero noise, that same qubit would measure 0 with probability 1.0, every single time.

## Two different sources of imperfection

Run that noisy circuit on the Aer simulator at 1024 shots and you'll get actual counts, not the exact 0.98/0.02 split. A real seeded run gives `{'0': 1000, '1': 24}` — an observed error rate of about 2.34%. That's close to the injected 2%, but not exact, and the gap is worth understanding precisely: the noise model injects a *true* 2% probability of error, but the 1024 shots are a finite statistical sample of that probability, so the observed count will always wobble around the true value by some amount of ordinary statistical shot noise. These are two separate, stackable sources of imperfection — the hardware (or simulated hardware) error itself, and the sampling noise from only taking a finite number of shots — and conflating them is a common source of confusion when reading real results.

## Simulating a real device's actual noise profile

Hand-built noise models like the one above are useful for learning, but the real production pattern is to pull an actual backend's current calibrated noise characteristics directly into a simulation:

```python
from qiskit_aer.noise import NoiseModel

noise_model = NoiseModel.from_backend(backend)
```

This builds a noise model from the backend's live calibration data — its actual measured gate errors, T1/T2 times, and readout errors — rather than a hand-picked number. Running your circuit against this model lets you get a realistic preview of how it's likely to behave on that specific device, which is valuable for catching problems before you spend real queue time and quota running on the hardware itself.

## Key terms

| Term | Meaning |
|---|---|
| `depolarizing_error` | Noise channel modeling a gate that, with some probability, is replaced by a random Pauli error |
| `thermal_relaxation_error` | Noise channel modeling real T1 energy relaxation and T2 dephasing over a gate's duration |
| `readout_error` | Noise channel modeling a measurement that misreports the qubit's true state |
| `pauli_error` | Constructor for building a custom error channel from a list of (Pauli, probability) pairs |
| `NoiseModel.from_backend()` | Builds a noise model from a real backend's live calibration data instead of hand-picked values |
| Shot noise | Statistical sampling variation from running a finite number of shots, separate from injected hardware error |

## Check yourself

A noise model injects a true 2% bit-flip error probability, but a 1024-shot run on it comes back with an observed error rate of 2.34% instead of exactly 2.00%. Is this evidence that the noise model is wrong? Explain what's actually going on.
