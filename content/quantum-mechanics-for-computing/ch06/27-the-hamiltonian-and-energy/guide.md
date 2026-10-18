# The Hamiltonian & Energy

The Hamiltonian has been described so far as "the generator of time evolution." It's also, simultaneously, the energy observable — and those two roles turn out to be the same role, not two coincidentally related ones. This lesson makes that precise with a fully worked example.

## What you'll learn

- Why the Hamiltonian's eigenvalues are a system's possible energies
- A verified worked example: the energy eigenstates and eigenvalues of H=(ħω/2)Z
- Why definite-energy states are special: they don't change their probabilities over time
- Why physical qubits have a real energy gap, and why that gap matters for hardware

## The Hamiltonian as the energy observable

Chapter 1's postulates stated that every physical observable corresponds to a Hermitian operator, with measurement outcomes given by its eigenvalues. The Hamiltonian is the observable for **energy** specifically: its eigenvalues are the possible energies the system can be measured to have, and its eigenvectors are the corresponding states of definite energy (often called **energy eigenstates**, or **stationary states**).

## A verified worked example

Take the same Hamiltonian from Lesson 26: H = (ħω/2)Z. Recall the verified facts about the Pauli-Z matrix: Z|0⟩ = |0⟩ (eigenvalue +1) and Z|1⟩ = −|1⟩ (eigenvalue −1). Multiplying through by the constant ħω/2:

H|0⟩ = (ħω/2)Z|0⟩ = (ħω/2)(+1)|0⟩ = (+ħω/2)|0⟩
H|1⟩ = (ħω/2)Z|1⟩ = (ħω/2)(−1)|1⟩ = (−ħω/2)|1⟩

So |0⟩ and |1⟩ are the energy eigenstates of this Hamiltonian, with eigenvalues (energies) +ħω/2 and −ħω/2 respectively. This two-level system has exactly two possible energies, separated by a gap of ħω (the difference between +ħω/2 and −ħω/2) — a standard simplified model for the kind of two-level energy structure real physical qubit hardware (superconducting circuits, trapped ions, electron/nuclear spins) is engineered to have.

## Why energy eigenstates are special: they don't change probability over time

If a system starts in an energy eigenstate — say |0⟩, with energy +ħω/2 — then applying the time-evolution operator from Lesson 26 gives U(t)|0⟩ = e^(−iωt/2)|0⟩: the state only picks up a global phase, exactly as verified in Lesson 26. Since global phase is unobservable, |0⟩'s measurement probabilities (P(0)=1, P(1)=0) never change, no matter how much time passes. This is exactly what "stationary state" means — the probabilities are frozen in time, even though the state vector itself is technically rotating in phase. Contrast this with |+⟩, which is *not* an energy eigenstate of this H: Lesson 26 showed |+⟩ picks up an observable relative phase over time, precisely because it's a superposition of the two different-energy eigenstates |0⟩ and |1⟩, and those two components' phases drift apart at different rates (ω/2 vs −ω/2).

## Why physical qubits have a real energy gap

This isn't just a toy example — it's the standard simplified model for why a physical qubit's two logical states |0⟩ and |1⟩ correspond to two distinct energy levels of a real physical system, separated by a real energy gap ħω. That gap sets a physical frequency ω associated with the qubit (literally, the frequency of microwave or laser pulses engineers use to control it), and that frequency, in turn, sets the natural timescale on which gates can be physically applied: faster gates generally require higher-energy (higher-frequency) control, and there are real physical tradeoffs between gate speed, qubit stability, and noise that trace directly back to this energy structure.

## What this means for computing

Understanding the Hamiltonian-as-energy-observable connection explains *why* qubits are physical objects with real engineering constraints, not abstract bits that happen to be called "quantum." The energy gap between |0⟩ and |1⟩ is a real, physical, measurable number for any actual qubit implementation, and it directly constrains how fast gates can run and how stable the qubit is against unwanted transitions — considerations that become central once this course gives way to hardware-focused courses later in the path.

## Key terms

| Term | Meaning |
|---|---|
| Energy eigenstate (stationary state) | A state that is an eigenvector of the Hamiltonian; its measurement probabilities never change over time, even as it picks up phase |
| Energy gap | The difference between two energy eigenvalues (here, ħω between +ħω/2 and −ħω/2); sets the qubit's characteristic control frequency |
| Eigenvalue / eigenvector (of H) | H's eigenvalues are the system's possible energies; its eigenvectors are the corresponding definite-energy states |

## Check yourself

Explain why |0⟩, an energy eigenstate of H=(ħω/2)Z, keeps the exact same measurement probabilities forever under time evolution, while |+⟩, which is NOT an energy eigenstate of this H, develops an observable relative phase over time (as shown in Lesson 26). What specifically about |+⟩'s relationship to |0⟩ and |1⟩ causes the difference?
