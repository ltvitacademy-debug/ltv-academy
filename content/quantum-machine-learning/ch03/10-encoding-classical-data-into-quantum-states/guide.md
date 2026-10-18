# Encoding Classical Data Into Quantum States

Before a variational circuit can classify anything, classical data has to get into the quantum system in the first place. This step — data encoding — is often glossed over in introductory treatments, but the encoding choice directly shapes what the rest of the circuit can possibly learn.

## What you'll learn

- Why data encoding is a modeling decision, not a mechanical formality
- The three main encoding families: basis, angle, and amplitude encoding
- How many qubits each encoding family needs for a given amount of classical data
- A worked basis-encoding example and a worked angle-encoding example
- Why the encoding choice directly affects what a quantum kernel (Chapter 3, Lesson 13) can measure

## Encoding is part of the model, not a preprocessing afterthought

In classical ML, feature scaling (normalizing inputs) is a preprocessing step that rarely changes what the model is fundamentally capable of learning. In QML, the encoding is different: it determines the actual geometry of the quantum states your circuit has access to, which directly constrains — or enables — what patterns the ansatz and kernel can detect later. Two circuits with identical ansätze but different encodings are, in a meaningful sense, different models entirely. This is why Lesson 11 is dedicated specifically to comparing two major encoding choices in depth.

## Basis encoding

**Basis encoding** maps classical bits directly onto computational basis states. A classical bit string like "101" becomes the quantum state |101⟩ — one qubit per classical bit, using only the gates needed to flip the right qubits from |0⟩ to |1⟩ (an X gate on each qubit whose target bit is 1).

- Needs exactly n qubits for n classical bits.
- Simple and exact, but extremely qubit-expensive: a 32-feature binary dataset needs 32 qubits just for basis encoding, with no compression at all.
- Works only for discrete/binary data without modification; continuous features need to be binarized first, losing precision.

## Angle encoding

**Angle encoding** maps each classical feature value to a rotation angle on one qubit — exactly the mechanism from Chapter 2's RY(θ) circuit, now applied per-feature rather than as a free trainable parameter. For a feature value x, the qubit's state becomes:

RY(x)|0⟩ = [cos(x/2), sin(x/2)]

**Worked example**: encode the classical value x = 1.0 (in radians) via angle encoding. Using the exact formula: cos(0.5) ≈ 0.8776 and sin(0.5) ≈ 0.4794. So the encoded state is [0.8776, 0.4794] — check normalization: 0.8776² + 0.4794² = 0.7702 + 0.2298 = 1.0000 exactly, confirming it's a valid quantum state.

- Needs one qubit per feature (for single-qubit angle encoding) — far more efficient than basis encoding for continuous data, but still linear in feature count.
- Works naturally with continuous data, with no binarization loss.
- This is the most common encoding used in the labs throughout this course, because it's simple to reason about and directly connects to the parameter-shift machinery from Chapter 2.

## Amplitude encoding

**Amplitude encoding** packs an entire classical vector directly into the amplitudes of a multi-qubit quantum state, after normalizing it to unit length. For n qubits, a state has 2ⁿ amplitudes, so amplitude encoding can represent 2ⁿ classical values using only n qubits — exponentially more data-dense than angle or basis encoding.

**Worked example**: encode the classical vector (3, 4) via amplitude encoding (n = 1 qubit, 2 amplitudes). First normalize: the vector's norm is √(3² + 4²) = √25 = 5. The normalized vector is (3/5, 4/5) = **(0.6, 0.8)** — and 0.6² + 0.8² = 0.36 + 0.64 = 1.0 exactly, a valid amplitude-encoded state |ψ⟩ = 0.6|0⟩ + 0.8|1⟩.

**Second worked example, 2 qubits**: encode (1, 2, 2, 4) (4 values, needing 2 qubits for 4 amplitudes). Norm = √(1² + 2² + 2² + 4²) = √(1+4+4+16) = √25 = 5. Normalized: (0.2, 0.4, 0.4, 0.8) — confirmed by direct division, each original value divided by 5.

- Needs only log₂(N) qubits for N classical values — the compression that makes amplitude encoding theoretically attractive.
- The serious catch: the classical circuit needed to *prepare* an arbitrary amplitude-encoded state can itself require a number of gates that grows with N, sometimes erasing the qubit-count advantage in practice. Efficient state preparation for arbitrary data is itself an active research problem, not a solved one.

## Key terms

| Term | Meaning |
|---|---|
| Basis encoding | Mapping classical bits directly to computational basis states, one qubit per bit |
| Angle encoding | Mapping a classical feature value to a rotation angle on one qubit |
| Amplitude encoding | Packing a normalized classical vector directly into a multi-qubit state's amplitudes, using log2(N) qubits for N values |
| State preparation cost | The number of gates needed to prepare a specific quantum state; a practical bottleneck for amplitude encoding |

## Check yourself

Amplitude-encode the classical vector (0, 3, 4, 0) into a 2-qubit state. What is the normalized amplitude vector, and which two computational basis states end up with nonzero amplitude?
