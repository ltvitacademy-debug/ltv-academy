# VQE for Molecular Ground-State Energy

This is VQE's flagship application: computing a molecule's electronic ground state energy, a quantity directly tied to real chemistry (bond strength, reaction favorability) that classical computers struggle to compute exactly as molecules grow. Here you'll see how a molecular Hamiltonian gets built and why even the simplest possible molecule is already a meaningful benchmark.

## What you'll learn

- How a molecule's electronic structure problem becomes a qubit Hamiltonian
- Why molecular Hamiltonians need Pauli-string decomposition before a quantum computer can use them
- The H2 molecule as the standard "hello world" benchmark for molecular VQE, and why
- What "chemical accuracy" means and why it's the bar VQE results get judged against
- An honest accounting of what VQE has and hasn't demonstrated for real molecules so far

## From molecule to qubit Hamiltonian

A molecule's electronic structure problem starts from the full many-electron Schrödinger equation, which is itself intractable to solve exactly for anything beyond the smallest systems. The standard path to a usable Hamiltonian runs through several well-established approximation and mapping steps: pick a finite basis set of molecular orbitals (the STO-3G basis is the smallest common choice, useful for teaching and benchmarking, though too coarse for real chemical predictions), represent the electronic Hamiltonian in terms of fermionic creation/annihilation operators acting on those orbitals, and then apply a fermion-to-qubit mapping (Jordan-Wigner and Bravyi-Kitaev are the two most common) to rewrite that Hamiltonian as a weighted sum of Pauli strings — operators like Z_0, X_0X_1, Z_0Z_1Z_2, and so on, each with its own numerical coefficient. This Pauli-string form is exactly what a VQE circuit measures: each term's expectation value is estimated separately by measuring in the appropriate basis, and the weighted sum of all those measurements gives the total energy ⟨ψ(θ)|H|ψ(θ)⟩ that the classical optimizer is trying to minimize — the same structure as Lesson 11's toy H = Z + 0.5X, just with many more terms.

## H2: the standard benchmark

The hydrogen molecule, H2, is the molecule used to benchmark essentially every new VQE ansatz, optimizer, or hardware platform, for a simple reason: in a minimal STO-3G basis, its electronic Hamiltonian maps down to just 2 or 4 qubits (depending on how symmetries are exploited to reduce qubit count), small enough to actually run on today's noisy hardware while still being a genuine quantum chemistry problem, not an artificial toy. The commonly cited benchmark value in the VQE literature — appearing across numerous tutorials and papers (including Qiskit Nature's own documentation) — places H2's ground state energy, computed in the minimal STO-3G basis near its equilibrium bond length (roughly 0.74 Å), at **approximately -1.137 Hartree**. This number is a widely reproduced reference point, not something this course is deriving from scratch — treat it as the "known right answer" a VQE implementation is checked against, the same role the exact eigenvalue (-1.118034) played for Lesson 11's toy Hamiltonian.

## Chemical accuracy: the bar that matters

Quantum chemists have a specific, demanding standard for a computed energy to be *useful*: **chemical accuracy**, conventionally defined as agreement with the true energy to within about 1.6 milli-Hartree (roughly 1 kcal/mol). This isn't an arbitrary round number — it's approximately the energy scale that distinguishes whether a predicted reaction is favorable or not in real chemistry. A VQE result that's "close" to the right energy in a loose sense (say, within 0.1 Hartree) is not chemically useful; the bar is dramatically tighter. This matters for honest evaluation: a shallow hardware-efficient ansatz (Lesson 12) might get visibly close to H2's -1.137 Hartree benchmark on a noiseless simulator, but reaching chemical accuracy specifically — and sustaining it in the presence of real hardware noise — is a substantially harder target that most current demonstrations do not yet reliably clear for molecules of practical chemical interest.

## An honest accounting

Here is the state of things, stated plainly: VQE has successfully reproduced known ground-state energies for very small molecules (H2, LiH, BeH2, and similar) on both simulators and real quantum hardware, validating that the method works as a proof of concept. What it has *not* done is outperform classical quantum chemistry methods (coupled-cluster theory, density functional theory) on any molecule large enough to be scientifically or industrially interesting — classical methods remain faster and more accurate for essentially every molecule anyone currently needs results for. The honest framing, consistent with the rest of this course: VQE is a validated method on toy-scale problems, not yet a demonstrated advantage on any problem a chemist would actually need solved. Lesson 22 revisits this exact distinction — proof of concept versus proven advantage — as the organizing question for the whole field.

## Key terms

| Term | Meaning |
|---|---|
| STO-3G basis | A minimal molecular orbital basis set, small enough for teaching/benchmarking but too coarse for real chemical accuracy |
| Jordan-Wigner mapping | A standard method for converting a fermionic (electron) Hamiltonian into a qubit Hamiltonian of Pauli strings |
| Pauli string | A tensor product of Pauli operators (like Z_0 X_1 Z_2) with an associated coefficient, the basic unit a VQE circuit measures |
| Chemical accuracy | Agreement with the true energy to within about 1.6 milli-Hartree (~1 kcal/mol), the standard bar for a chemically useful result |
| H2 benchmark | The hydrogen molecule's minimal-basis ground state energy, approximately -1.137 Hartree, used as VQE's standard "hello world" test |

## Check yourself

The lesson distinguishes "VQE reproduced H2's known energy" from "VQE outperformed classical methods on an industrially relevant molecule." Explain why demonstrating the first does not imply the second, and what specifically (in terms of molecule size, basis set, and chemical accuracy) would need to be true before you'd consider the second claim demonstrated.
