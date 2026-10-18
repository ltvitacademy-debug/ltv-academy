# Foundations Check-Yourself Lab

You've covered four dense lessons — classical physics's failures, wave-particle duality, the five postulates, and the deliberate scope of this course. Before chapter 2 builds qubits and Dirac notation on top of all this, this lab works through a handful of applied scenarios that force you to actually use what you learned, the way you'd need to if a colleague asked you to explain it on the spot.

## What you'll learn

- How to explain, mechanism by mechanism, why turning off which-path detection restores interference in a double-slit setup
- How to identify which specific postulate explains a given quantum-mechanical fact
- How to connect the photoelectric effect's threshold behavior to the general theme of quantized energy
- How to defend this course's deliberate scope choice against the "this isn't real physics" objection
- How to tie all four lessons together into one coherent picture of why qubits behave unlike classical bits

## Scenario 1: explaining why "which-path" detection kills interference

A colleague who hasn't taken this course asks you: "If I build a classical simulation of the double-slit experiment — particles following definite trajectories through one slit or the other — can I reproduce the interference pattern, as long as I just don't bother recording which slit each one used?" The answer is no, and the reason is precise, not a matter of bookkeeping. In a classical simulation, each simulated particle genuinely *does* go through exactly one slit or the other at every moment of the simulation, whether or not you choose to log that fact in your output. Interference in the real experiment doesn't come from "not knowing" which path was taken — it comes from the physical amplitude genuinely covering both paths at once and those two path-amplitudes constructively and destructively combining at the screen, which is only possible if there is no definite, physically-real fact (anywhere, logged or not) about which single path was taken. A classical simulation where each particle has a definite single-slit trajectory the whole time — even an unlogged one — has already thrown away the thing that produces interference. You cannot recover a two-path interference pattern from bookkeeping choices on top of definite single-path trajectories; you have to not have a definite single path in the underlying model at all.

## Scenario 2: which postulate explains which fact

Suppose someone measures a qubit and asks you three separate questions, and you need to cite the right postulate for each. "Why did I get exactly 0 or exactly 1, and nothing in between?" — that's postulate 2 and 3 together: the observable is Hermitian, so its only possible outcomes are its eigenvalues (here, 0 and 1), and the outcome you get is always one of those eigenvalues, never an in-between value. "Why was I only able to predict the probability of each outcome in advance, not the outcome itself?" — that's postulate 3 specifically, the Born rule: probability equals the squared magnitude of the relevant amplitude, and that's the most quantum mechanics promises to tell you about a single trial. "Why, when I immediately measured the qubit again right after, did I get the exact same result with certainty?" — that's postulate 4, collapse: the first measurement collapsed the state to the eigenstate matching its outcome, so the second measurement is no longer probabilistic at all — it's now measuring a state that has no other component left to produce a different result.

## Scenario 3: connecting the photoelectric effect to the general theme

A colleague asks why the photoelectric effect's threshold-frequency behavior is usually grouped together with blackbody radiation and atomic spectral lines as "the same kind of evidence." The connective thread is quantization. Blackbody radiation showed that a vibrating mode can only exchange energy in chunks sized by frequency — which is exactly why high-frequency modes can't absorb thermal energy and the ultraviolet catastrophe never happens. The photoelectric effect showed that light itself arrives in those same frequency-sized chunks (photons), so a below-threshold photon is always too weak individually, no matter how many of them arrive per second. Atomic spectral lines showed that bound electrons are restricted to specific discrete energy levels, so emitted light only ever carries energy equal to one of the fixed gaps between levels. All three are the same underlying fact — energy is not continuously divisible at this scale — showing up in three completely different experimental settings: a glowing object's full spectrum, a metal's electron ejection threshold, and a thin gas's emission lines.

## Scenario 4: defending the course's scope choice

A classmate insists that a quantum computing course that never mentions perturbation theory or the hydrogen atom "can't really be teaching quantum mechanics." The rebuttal is the same one from lesson 4, applied directly: quantum circuits are built entirely from two ingredients — a finite-dimensional complex vector space (postulate 1) and unitary operators acting on it (postulate 5), followed by measurement (postulates 2–4). None of that requires solving a differential equation for a specific physical potential, which is exactly what the hydrogen atom and perturbation theory are for. The five postulates themselves — covered in full, exact rigor in lesson 3 — are the actual content of quantum mechanics; the hydrogen atom and perturbation theory are *applications* of those postulates to a particular physical system (an electron bound to a proton) that happens to be irrelevant to how a quantum computer processes information. Skipping an application is not the same as skipping the theory.

## Scenario 5: tying it back to classical bits versus qubits

Put all four lessons together and you get the throughline for the rest of this course: classical physics (lesson 1) assumed continuous, divisible energy and definite trajectories, and a classical bit inherits that comfortable world — a voltage pinned deterministically to 0 or 1. Quantum mechanics (lessons 1–2) showed that nature doesn't actually work that way at small scales: energy is quantized, and particles are described by interfering amplitudes rather than definite trajectories. The postulates (lesson 3) turned that into precise mathematical rules: states are normalized vectors, measurements return eigenvalues probabilistically via the Born rule, and the state collapses afterward. And the scope lesson (lesson 4) told you exactly which slice of that machinery — finite-dimensional vector spaces, Dirac notation, superposition, measurement, entanglement, unitary evolution, no-cloning — you need to carry forward. Chapter 2 starts building the qubit itself on top of exactly this foundation.

## Key terms

| Term | Meaning |
|---|---|
| Which-path information | A definite fact about which slit/path was taken; its existence (not just whether it's logged) is what destroys interference |
| Eigenvalue outcome | The fixed, discrete set of possible measurement results, determined by the Hermitian observable being measured |
| Born rule probability | The squared magnitude of an amplitude, giving the probability of a specific measurement outcome before it happens |
| Quantization | The general theme that energy (and other quantities) take discrete, non-continuous values at the quantum scale |
| Postulate vs. application | The distinction between the five postulates (the theory itself) and specific solved systems like the hydrogen atom (an application of the theory) |

## Check yourself

Combine Scenario 2 and Scenario 5: explain, citing the specific postulates by number, what happens from start to finish when a single qubit prepared in a superposition is measured once — covering what kind of object the state is beforehand, what determines the possible outcomes, what determines each outcome's probability, and what the state becomes immediately afterward — and then explain in one or two sentences why this entire sequence is exactly what "reading out a quantum computation" means for a qubit instead of a classical bit.
