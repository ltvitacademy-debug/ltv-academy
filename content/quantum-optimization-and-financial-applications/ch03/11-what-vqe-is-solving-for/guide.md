# What VQE Is Solving For

VQE — the Variational Quantum Eigensolver — shares QAOA's hybrid quantum/classical loop but points it at a different target: not a combinatorial optimum, but the lowest possible energy of a quantum system. This lesson defines that target precisely and proves, with a fully worked example, that the variational approach actually reaches it.

## What you'll learn

- What a Hamiltonian's "ground state energy" means mathematically (the smallest eigenvalue)
- The variational principle: why any trial state's energy is always ≥ the true ground energy
- A fully worked 1-qubit example where the exact ground energy is computed two independent ways
- Why VQE is useful even though exact diagonalization works fine for small systems
- The connection forward to real molecular problems (Lesson 13) where exact diagonalization stops being feasible

## The target: ground state energy

Every quantum system — a molecule, a material, an abstract spin system — has an associated Hamiltonian operator H, whose eigenvalues are the possible energy levels the system can occupy. The **ground state energy** is the smallest of these eigenvalues, and the corresponding eigenvector is the **ground state** — physically, the most stable, lowest-energy configuration the system can settle into. For a molecule, the ground state energy of its electronic Hamiltonian is directly tied to properties chemists care about: bond lengths, reaction energies, whether a proposed reaction is favorable. Finding it, for systems too large to diagonalize exactly, is VQE's entire purpose.

## The variational principle

The mathematical fact VQE leans on is the **variational principle**: for *any* normalized trial state |ψ⟩ (any valid quantum state, not necessarily an eigenvector of H), the expectation value ⟨ψ|H|ψ⟩ is always greater than or equal to the true ground state energy E_0. Equality holds only when |ψ⟩ actually *is* the ground state. This means: if you have a way to prepare trial states and measure their energy, then **searching for the trial state that minimizes ⟨ψ|H|ψ⟩** is guaranteed to approach the true ground energy from above, never overshoot below it, and give you an exact answer the moment you find the true minimizer. That search — prepare a trial state, measure its energy, adjust, repeat — is exactly the hybrid loop VQE runs, with the quantum computer handling state preparation and energy measurement, and a classical optimizer handling the "adjust" step, just as it did for QAOA's angles in Chapter 2.

## A fully worked 1-qubit example

Take the simplest possible nontrivial Hamiltonian: H = Z + 0.5·X, a 1-qubit Hamiltonian combining a Pauli-Z term and a Pauli-X term. As a 2×2 matrix (Z = diag(1,-1), X = off-diagonal 1s), H = [[1, 0.5], [0.5, -1]].

**Exact answer, via eigenvalues.** For a traceless 2×2 matrix of this form [[a, b], [b, -a]], the eigenvalues are ±√(a²+b²). With a=1, b=0.5: eigenvalues = ±√(1² + 0.5²) = ±√1.25 = **±1.118034**. The ground energy is the smaller one: **E_0 = -1.118034**.

**Variational answer, via a trial ansatz.** Use the simplest possible single-parameter trial state: |ψ(θ)⟩ = cos(θ/2)|0⟩ + sin(θ/2)|1⟩ (a real-amplitude state parameterized by one angle θ, physically a rotation around the Y-axis of the Bloch sphere). Its energy expectation works out to ⟨ψ(θ)|H|ψ(θ)⟩ = cos(θ)·a + sin(θ)·b = cos(θ) + 0.5·sin(θ) (using ⟨Z⟩=cos θ and ⟨X⟩=sin θ for this ansatz). Scanning θ directly over its full range (a dense numerical scan, not an approximation) finds the minimum:

**Minimum energy found: -1.118034, at θ ≈ 3.605 radians**

This matches the exact eigenvalue to six decimal places. The table below shows the energy at a few specific angles along the way, confirming the shape of the search:

| θ (radians) | ⟨ψ(θ)\|H\|ψ(θ)⟩ |
|---|---|
| 0 | 1.000000 |
| π/2 ≈ 1.571 | 0.500000 |
| π ≈ 3.142 | -1.000000 |
| 3.605 (optimum found) | **-1.118034** |

Notice the energy keeps dropping as θ moves past π toward the optimum — a classical optimizer doing this same search (rather than a brute dense scan) would use exactly this kind of "keep improving" signal to converge on 3.605 without ever checking every possible angle, the same pattern you saw with QAOA's γ and β in Chapter 2.

## Why bother, if exact diagonalization works for 1 qubit?

For a single qubit, diagonalizing H by hand (as done above) is obviously easier than running a variational search. The entire point of VQE is that this equivalence breaks down fast: a Hamiltonian describing n qubits lives in a 2^n-dimensional space, and exact diagonalization's cost grows accordingly. A modest 50-qubit molecular Hamiltonian has a 2^50 ≈ 1.1 × 10^15-dimensional space — far beyond any classical computer's ability to diagonalize directly. VQE's bet is that a quantum computer can *prepare* trial states and *measure* their energy efficiently even at that scale, while a classical optimizer handles the comparatively cheap job of proposing better parameters — exactly mirroring this lesson's 1-qubit example, just at a scale where the "exact answer by hand" option no longer exists. Lesson 13 shows this in a real (if still deliberately small) molecular context.

## Key terms

| Term | Meaning |
|---|---|
| Ground state energy | The smallest eigenvalue of a system's Hamiltonian; the lowest possible energy the system can have |
| Variational principle | The guarantee that ⟨ψ\|H\|ψ⟩ ≥ E_0 for any normalized trial state, with equality only at the true ground state |
| Trial ansatz | A parameterized quantum state, like \|ψ(θ)⟩ = cos(θ/2)\|0⟩ + sin(θ/2)\|1⟩, whose parameters are adjusted to minimize energy |
| Exact diagonalization | Directly computing all eigenvalues of a Hamiltonian matrix; exact but infeasible beyond roughly 40-50 qubits on classical hardware |
| Hybrid loop (VQE) | The same quantum-prepares/classical-adjusts pattern as QAOA, here targeting minimum energy instead of maximum cut |

## Check yourself

The variational principle guarantees ⟨ψ|H|ψ⟩ ≥ E_0 for any trial state. Using the worked example's energy table (1.0 at θ=0, 0.5 at θ=π/2, -1.0 at θ=π, -1.118034 at the optimum), explain why none of these four values violates the variational principle, and what it would mean — in terms of the principle itself — if a classical optimizer ever reported a "trial energy" of -1.2 for this particular Hamiltonian.
