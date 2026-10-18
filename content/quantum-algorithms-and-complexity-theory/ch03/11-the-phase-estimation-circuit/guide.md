# The Phase Estimation Circuit

Lesson 10 defined the problem. This lesson builds the actual circuit that solves it — four steps, each doing exactly one job, ending with the inverse QFT from Chapter 2 reading the answer straight off the counting register.

## What you'll learn

- The four-step structure of the phase estimation circuit
- The phase-kickback trick, derived algebraically for a single control qubit
- Why controlled-U^(2^k) on each counting qubit builds exactly the state the inverse QFT needs
- How this circuit is literally "QFT⁻¹ applied to decode phases," tying directly back to Chapter 2
- The exact-phase worked example: θ = 1/4, n = 2, collapsing to a single deterministic outcome

## The four steps

Phase estimation uses two registers: n **counting qubits** (all starting at |0⟩), and a target register holding the eigenvector |ψ⟩ of U, where U|ψ⟩ = e^(2πiθ)|ψ⟩.

1. **Superposition.** Apply a Hadamard to each of the n counting qubits, putting the counting register into a uniform superposition of all 2ⁿ basis states.
2. **Controlled phase kickback.** For each counting qubit k (numbered 0 through n−1), apply a controlled-U^(2^k) gate, with that counting qubit as control and the target register as target.
3. **Inverse QFT.** Apply the inverse Quantum Fourier Transform to the counting register.
4. **Measurement.** Measure the counting register in the computational basis. The resulting n-bit string is the estimate of θ (as an n-bit binary fraction).

Steps 1 and 4 are mechanical. The substance is in steps 2 and 3.

## Phase kickback: the algebra for one control qubit

Here's the mechanism that makes step 2 work, shown for a single control qubit. Suppose the control qubit is in the superposition (|0⟩ + |1⟩)/√2, and the target register is in an eigenstate |ψ⟩ of U with U|ψ⟩ = e^(iφ)|ψ⟩. Apply controlled-U, with this qubit as control and |ψ⟩ as target. Controlled-U does nothing when the control is |0⟩, and applies U when the control is |1⟩:

**(|0⟩|ψ⟩ + |1⟩|ψ⟩)/√2 → (|0⟩|ψ⟩ + |1⟩·U|ψ⟩)/√2 = (|0⟩|ψ⟩ + e^(iφ)|1⟩|ψ⟩)/√2**

Now factor |ψ⟩ out of both terms:

**= [(|0⟩ + e^(iφ)|1⟩)/√2] ⊗ |ψ⟩**

The target register comes out completely unchanged and disentangled — still exactly |ψ⟩. The phase φ has been "kicked back" onto the *control* qubit instead, turning its uniform superposition into a phase-shifted one. This is the entire trick behind phase estimation: controlled-U never touches the eigenvector register's state, it only ever writes the eigenvalue's phase into the amplitudes of the counting qubits.

## Building the full phase with controlled-U^(2^k)

One control qubit picking up a phase e^(iφ) only tells you one bit's worth of information. Phase estimation runs this same kickback n times — once per counting qubit — but with a doubling trick: counting qubit k controls not U itself, but **U^(2^k)**. Since U|ψ⟩ = e^(2πiθ)|ψ⟩, applying U repeatedly just multiplies the phase: U^(2^k)|ψ⟩ = e^(2πiθ·2^k)|ψ⟩. So after step 2, counting qubit k carries phase e^(2πiθ·2^k) in its own kickback, and the full counting register ends up in the state:

**(1/√(2ⁿ)) Σ_{x=0}^{2ⁿ−1} e^(2πiθx)|x⟩**

That state is *exactly* the form the Quantum Fourier Transform produces when it encodes a phase into a register — which is why step 3 is the **inverse QFT**: it's the same QFT you derived in Chapter 2, run backward, to decode the phase θ out of this exact superposition and turn it into a readable bit string. Phase estimation isn't a new piece of mathematics bolted onto the QFT — it's a direct application of it: encode θ into relative phases via controlled-U^(2^k), then let QFT⁻¹ do the same frequency-extraction job it always does.

## Worked example: θ = 1/4 exactly, n = 2 counting qubits

Take θ = 1/4 exactly — in binary, 1/4 = 0.01, representable exactly with 2 bits. With n = 2 counting qubits there are N = 2² = 4 possible measurement outcomes (k = 0, 1, 2, 3), each corresponding to an estimate k/4. Running the circuit above and computing the exact measurement probabilities gives:

**P(k=0) = 0.000000, P(k=1) = 1.000000, P(k=2) = 0.000000, P(k=3) = 0.000000**

The outcome k = 1 occurs with probability exactly 1 — the circuit is fully deterministic here, because 1/4 lands exactly on the n = 2 grid of representable values (k/4 for k = 0,1,2,3), and k = 1 gives 1/4 = θ exactly. There's no interference leftover to leak probability into any other outcome. This clean, deterministic case is the one to hold onto as the mechanism's "textbook" behavior; Lesson 12 shows what happens to this picture once θ *doesn't* land exactly on the grid.

## Key terms

| Term | Meaning |
|---|---|
| Counting qubits | The n qubits that end up holding the binary estimate of θ after measurement |
| Phase kickback | The mechanism by which a controlled-U gate writes U's eigenvalue phase onto the control qubit while leaving the eigenvector register unchanged |
| Controlled-U^(2^k) | The gate applied by counting qubit k; repeated squaring lets each qubit contribute one more bit of θ |
| Inverse QFT | The Chapter 2 transform, run on the counting register, that decodes θ from the phase-encoded superposition into a measurable bit string |

## Check yourself

Walk through the phase-kickback algebra yourself for φ = π (so U|ψ⟩ = −|ψ⟩): starting from control qubit (|0⟩ + |1⟩)/√2 and target |ψ⟩, show the state after controlled-U, and confirm the target register is still exactly |ψ⟩ while the control qubit's phase has flipped.
