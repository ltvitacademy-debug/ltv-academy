# Quantum Teleportation

"Teleportation" sounds like science fiction, but the protocol is real, decades old, and worked out here with a fully verified numeric example from start to finish. It's also the clearest possible demonstration that no-cloning and "moving quantum information somewhere else" are entirely compatible.

## What you'll learn

- The teleportation protocol's goal and setup
- A fully worked numeric example: teleporting |ψ⟩=0.6|0⟩+0.8|1⟩
- The exact correction Bob must apply for each of the 4 possible measurement outcomes
- Why teleportation requires a classical channel, and why that rules out faster-than-light signaling
- Why teleportation does not violate no-cloning

## The setup

Alice holds a qubit in some state |ψ⟩=0.6|0⟩+0.8|1⟩ that she wants to send to Bob — crucially, without knowing what |ψ⟩ actually is (if she already knew, she could just tell Bob the amplitudes directly). Alice and Bob each hold one qubit of a pre-shared Bell pair |Φ+⟩=(|00⟩+|11⟩)/√2. So there are three qubits total: Alice's unknown qubit, Alice's half of the Bell pair, and Bob's half of the Bell pair.

## The protocol, with verified numbers

Alice performs a **Bell-basis measurement** on her two qubits (her unknown qubit together with her half of the Bell pair) — a joint measurement that projects onto the four Bell states {Φ+, Φ−, Ψ+, Ψ−}. This was computed directly from the full 3-qubit state and verified: each of the 4 possible outcomes occurs with **exactly probability 0.25**, and depending on which outcome occurs, Bob's qubit — before he does anything — ends up as:

| Alice's outcome | Bob's qubit (before correction) | Correction Bob applies | Result |
|---|---|---|---|
| Φ+ | (0.6, 0.8) | I (nothing) | (0.6, 0.8) |
| Φ− | (0.6, −0.8) | Z | (0.6, 0.8) |
| Ψ+ | (0.8, 0.6) | X | (0.6, 0.8) |
| Ψ− | (−0.8, 0.6) | X then Z | (0.6, 0.8) |

In every one of the four cases, once Bob applies the correction matching Alice's outcome, his qubit becomes **exactly** (0.6, 0.8) — the original |ψ⟩, with no approximation. Verify one row directly: for the Ψ− outcome, Bob starts with (−0.8, 0.6); applying X (which swaps the two amplitudes) gives (0.6, −0.8); applying Z next (which flips the sign of the second amplitude) gives (0.6, 0.8) — matches.

## Alice has to call Bob

Alice's Bell measurement gives her one of four possible outcomes — effectively 2 classical bits of information (00, 01, 10, 11, say). She sends those 2 bits to Bob over an ordinary **classical** communication channel — a phone call, an email, a radio signal, anything. Bob cannot determine which correction to apply without this classical message; without it, his qubit is sitting in an even mixture of all four possible corrected results, and he has no way to extract |ψ⟩ from it alone.

## Why this isn't faster-than-light signaling

Because Bob genuinely needs Alice's classical message before he can recover |ψ⟩, no information has moved faster than that classical message could travel — and that message travels at or below the speed of light, like any other classical signal. The entanglement alone doesn't transmit usable information; it's only useful once combined with the classical bits. This is a hard constraint of the protocol, not an incidental detail.

## Why this isn't cloning

Look closely at what happened to Alice's original qubit: her Bell measurement collapsed it (Chapter 3). After the protocol, Alice no longer has |ψ⟩ in any form — only Bob does. At every point in time, exactly one copy of |ψ⟩ exists. This is completely consistent with no-cloning (Lesson 21): teleportation doesn't create a second copy while the first still exists; it *moves* the state, destroying the original in the process of recreating it elsewhere.

## What this means for computing

Teleportation is a real building block in proposed quantum networking architectures — a way to move quantum information between physically separate quantum processors or over long distances without physically transporting the qubit itself (which is extremely hard to do without decoherence). It requires: one pre-shared entangled pair (consumed in the process, not reusable), one Bell measurement, and 2 classical bits of communication per qubit teleported — a concrete, quantifiable resource cost.

## Key terms

| Term | Meaning |
|---|---|
| Bell-basis measurement | A joint measurement on two qubits that projects onto the four Bell states, used by Alice to measure her two qubits together |
| Classical channel | The ordinary (non-quantum) communication Alice must use to send Bob her 2-bit measurement outcome |
| Teleportation correction | The Pauli operation (I, X, Z, or XZ) Bob applies, depending on Alice's outcome, to recover the original state exactly |

## Check yourself

If Alice's Bell measurement yields the Φ− outcome, Bob's qubit (before correction) is (0.6, −0.8). Walk through why applying Z specifically (not X, not both) recovers exactly (0.6, 0.8), and explain in your own words why Bob cannot skip waiting for Alice's classical message.
