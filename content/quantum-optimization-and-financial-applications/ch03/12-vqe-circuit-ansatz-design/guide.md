# VQE Circuit Ansatz Design

Lesson 11 used a single-angle ansatz and got the exact answer, almost suspiciously easily. That was no accident — it was a toy case built so the ansatz happened to cover the true ground state. This lesson is about the real design problem: choosing an ansatz general enough to reach a good answer, without so many parameters that the classical optimization becomes hopeless.

## What you'll learn

- What an "ansatz" is and why its circuit structure is a design choice, not a given
- How a single-qubit rotation gate maps a parameter θ to a measurable expectation value
- The two major ansatz families: hardware-efficient and chemistry-inspired (UCC)
- The expressiveness-vs-trainability tradeoff that governs every ansatz choice
- Why the ansatz you pick directly limits what ground energy VQE can possibly find

## What an ansatz actually is

An **ansatz** is the specific, fixed circuit structure used to prepare a trial state |ψ(θ)⟩ from a set of tunable parameters θ = (θ_1, θ_2, ...). It's "variational" in the same sense QAOA's circuit is (Chapter 2): the gate layout is chosen in advance, and only the numbers inside it are searched over. The crucial fact to internalize: **the ansatz determines the entire set of states VQE can ever reach.** If the true ground state isn't expressible by any setting of your ansatz's parameters, no amount of classical optimization will find it — the best you can get is the closest state your ansatz *can* represent, which (by the variational principle from Lesson 11) will have energy strictly above the true E_0.

## A single rotation gate, worked concretely

The simplest ansatz building block is a single-qubit Y-rotation: R_y(θ) applied to |0⟩ produces exactly the state used in Lesson 11, |ψ(θ)⟩ = cos(θ/2)|0⟩ + sin(θ/2)|1⟩. Its Pauli-Z expectation value is a clean, directly verifiable function of θ:

**⟨Z⟩ = cos(θ)**

Checking this at a few angles (direct computation, not approximation):

| θ | cos(θ) = ⟨Z⟩ |
|---|---|
| 0 | 1.0000 |
| π/4 ≈ 0.785 | 0.7071 |
| π/2 ≈ 1.571 | 0.0000 |
| π ≈ 3.142 | -1.0000 |

This single gate sweeps ⟨Z⟩ continuously across its entire possible range, from +1 to -1, as θ varies — one rotation, one parameter, full coverage of every possible Z-expectation value a single qubit can have. Stacking more qubits and more such rotations (plus entangling gates like CNOT between qubits, needed to let qubits' states depend on each other) is how real ansätze scale up to cover more of the exponentially large state space as problems grow.

## Two major ansatz families

**Hardware-efficient ansätze** are built from whatever single- and two-qubit gates run cheaply and accurately on a specific piece of quantum hardware — typically layers of single-qubit rotations (like the R_y above) interleaved with entangling gates (CNOTs), repeated some number of times. They're popular because they minimize hardware error by using native, low-cost gates, but they have a real weakness: because they're chosen for hardware convenience rather than physical insight into the problem, they can struggle to express the true ground state efficiently, and are more prone to the barren-plateau optimization difficulties discussed for QAOA in Chapter 2's Lesson 8.

**Chemistry-inspired ansätze**, most commonly the **Unitary Coupled Cluster (UCC)** family (and its truncated version, UCCSD — Singles and Doubles), are built instead from physical insight about how electrons actually rearrange in a molecule, encoding "excitation" operations motivated by quantum chemistry theory rather than hardware convenience. They tend to need fewer parameters to reach a good answer for molecular problems specifically, which is exactly the kind of use case explored in Lesson 13 — but they typically require deeper circuits (more gates) than a comparable hardware-efficient ansatz, trading hardware cost for a better chance of actually reaching the true ground state.

## The expressiveness-vs-trainability tradeoff

This is the central design tension: an ansatz with *more* parameters and a richer gate structure can, in principle, represent a *wider* range of trial states — including, hopefully, something close to the true ground state. But more parameters also means a harder classical optimization problem (a higher-dimensional landscape to search, exactly as depth increased QAOA's parameter count in Chapter 2's Lesson 9) and a greater risk of hitting barren plateaus where no local search signal is available at all. An ansatz that's too simple (like the single-rotation example above, which only works because the problem happened to be 1 qubit) can't reach a good answer no matter how well it's optimized; an ansatz that's too elaborate can reach a good answer in principle but become practically impossible to train. Choosing well, for a specific problem and specific hardware, is an active area of research — not a solved recipe.

## Key terms

| Term | Meaning |
|---|---|
| Ansatz | The fixed parameterized circuit structure used to prepare VQE's trial states; determines the entire set of reachable states |
| R_y(θ) | A single-qubit rotation gate; sweeps the qubit's Z-expectation value continuously as θ varies |
| Hardware-efficient ansatz | An ansatz built from gates that run cheaply/accurately on specific hardware, at the cost of weaker physical motivation |
| UCC / UCCSD ansatz | A chemistry-inspired ansatz built from physically motivated electron-excitation operations, often needing fewer parameters for molecular problems but deeper circuits |
| Expressiveness-vs-trainability tradeoff | The central ansatz design tension: more expressive ansätze can represent better states but are harder to classically optimize |

## Check yourself

Lesson 11's 1-qubit ansatz happened to reach the exact ground energy of H = Z + 0.5X. Suppose instead the true Hamiltonian required 2 qubits with an entangled ground state (one that cannot be written as a simple product of two independent single-qubit states). Explain why a 2-qubit ansatz made only of independent single-qubit rotations (no CNOT or other entangling gate at all) would be structurally unable to reach that ground state, no matter how its parameters were tuned.
