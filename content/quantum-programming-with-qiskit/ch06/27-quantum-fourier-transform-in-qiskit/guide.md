# Quantum Fourier Transform in Qiskit

The classical discrete Fourier transform converts a signal from "what value at each point in time" to "how much of each frequency is present." The Quantum Fourier Transform (QFT) does the analogous job on a quantum state, and it's one of the most important subroutines in quantum computing — Shor's algorithm and quantum phase estimation both use it internally.

## What you'll learn

- What the QFT does conceptually: maps computational basis states to superpositions with position-dependent phases
- Why QFT is a core `qiskit` circuit (`qiskit.circuit.library.QFT`), not part of `qiskit-algorithms`
- The verified, exact result of applying a 3-qubit QFT to the state representing decimal 1
- Why QFT turns a sharp "spike" into a flat probability distribution, and why that's recoverable information rather than lost information

## What the QFT actually does

Classically, the discrete Fourier transform takes a list of N numbers and returns N numbers describing how much of each frequency component is present in the original. The QFT is the same linear transformation, applied to the amplitudes of a quantum state instead of a classical array — and because it operates on amplitudes, it's reversible and can act on a superposition of many inputs at once, which is exactly what makes it useful inside bigger algorithms like Shor's and phase estimation, where you need the frequency structure hidden inside a periodic quantum state.

Mechanically, the QFT takes each computational basis state `|x>` and maps it to an equal-weighted superposition of all basis states, where each term's phase depends on both x and which basis state it is. That "phase depends on x" property is exactly what lets the QFT output encode information about x even though every output amplitude has the same magnitude.

## Building and using the circuit

You do not need to hand-build the controlled-phase-gate ladder that implements the QFT (though it's a real, well-known construction if you want to study it separately) — core `qiskit` provides it directly:

```python
from qiskit.circuit.library import QFT

qft_circuit = QFT(num_qubits=3)
```

`QFT(num_qubits=3)` returns a ready-to-use 3-qubit circuit implementing the transform, which you can append to any larger circuit exactly like any other gate block — for example, as the final step before measurement in a phase-estimation circuit, or composed with its inverse (`QFT(num_qubits=3).inverse()`) when you need to undo it.

## The exact result: spike in, flat (but phase-structured) out

Here is the verified behavior for a concrete, checkable case. Start with 3 qubits in the basis state representing decimal 1 — that's `|001>` in standard notation, a single sharp "spike": probability 1.0 on that one state, probability 0 on all 7 others. Apply the 3-qubit QFT circuit above to it.

The result: **every one of the 8 basis states now has exactly the same amplitude magnitude**, 0.353553 (which is 1/√8), giving every one of the 8 outcomes exactly the same measurement probability, 0.125. If you only looked at probabilities, it would look like the QFT just flattened everything into uniform randomness, with no trace of the original input "1" left behind.

But magnitude is only half the story. The 8 terms have **different phases** — the real and imaginary parts of each term's amplitude vary by basis state. The `|000>` term comes out as 0.353553 + 0i, purely real, while the other 7 terms have nonzero imaginary components that trace out a specific pattern: a phase ramp of the form e^(2πi·k·x/N), where x=1 is the input value and k indexes which of the 8 basis states you're looking at. That phase ramp — not the (uniform) magnitude — is where the information about the input actually lives.

## Why this is different from just applying Hadamards

Applying H to every one of the 3 qubits would also flatten `|001>` into a distribution where multiple outcomes have nonzero probability — but the resulting phase relationships between terms would be different from, and much simpler than, the QFT's. Both operations destroy the obvious "spike" signature in the probability distribution, but only the QFT's specific phase ramp is the Fourier-transform relationship that lets you recover frequency information. This is the real signature of the QFT: it doesn't erase the input, it re-encodes it from "which outcome is certain" into "what phase relationship exists across all outcomes" — a trade that's only useful because later steps in algorithms like phase estimation are built specifically to extract that phase relationship back out.

## Key terms

| Term | Meaning |
|---|---|
| QFT | Quantum Fourier Transform; the quantum analog of the discrete Fourier transform, mapping basis states to phase-structured superpositions |
| `qiskit.circuit.library.QFT` | The core Qiskit circuit class implementing the QFT; takes `num_qubits` and does not require `qiskit-algorithms` |
| Phase ramp | The pattern e^(2πi·k·x/N) across output basis states that encodes the input value x in a QFT output's phases, not its magnitudes |
| Amplitude magnitude vs. phase | Two separate pieces of information in a complex amplitude; QFT output has uniform magnitude but input-dependent phase |
| Quantum phase estimation | A major algorithm that uses the QFT as a subroutine to extract phase information encoded by another operation |

## Check yourself

After applying the 3-qubit QFT to `|001>`, every one of the 8 output probabilities is exactly 0.125 — identical to what you'd see from a maximally mixed random state. What distinguishes the QFT output from true randomness, and why does that distinction matter for algorithms like phase estimation that rely on the QFT?
