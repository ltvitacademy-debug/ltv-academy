# The Ising Model Connection

Every QAOA circuit and every quantum annealer you'll encounter is built to minimize an *Ising Hamiltonian*, not a QUBO directly. The good news: QUBO and Ising are the same problem wearing two different costumes, and the translation between them is one clean substitution.

## What you'll learn

- What the Ising model is and where it comes from (statistical physics of magnetic spins)
- The exact substitution that converts a QUBO's binary variables into Ising spin variables
- How to convert a QUBO objective into an Ising Hamiltonian by hand, term by term
- Why physics-native quantum hardware (annealers, QAOA's cost Hamiltonian) "speaks" Ising, not QUBO
- A fully worked, hand-verified conversion confirming both forms agree

## Spins instead of bits

The Ising model originated in statistical physics as a model of magnetic materials: a lattice of "spins," each pointing either up (+1) or down (-1), interacting with their neighbors and with an external field. The total energy of a spin configuration is:

**H(s) = Σ_i h_i s_i + Σ_{i<j} J_ij s_i s_j**

where each s_i ∈ {+1, -1} (not {0, 1}), h_i is a "local field" coefficient acting on spin i alone, and J_ij is a "coupling" coefficient describing how strongly spins i and j interact. Lower energy H(s) means a more stable, more likely configuration — and finding the spin configuration with the *lowest* energy (the ground state) is mathematically identical in shape to minimizing a QUBO. Quantum annealers were physically built to find low-energy spin configurations, which is exactly why Ising — not QUBO — is the native language of that hardware, and why QAOA's cost Hamiltonian (Lesson 7) is written in Pauli-Z operators that behave exactly like these ±1 spins.

## The substitution

The bridge between QUBO's {0, 1} binary variables and Ising's {+1, -1} spins is a simple affine substitution:

**s_i = 1 - 2x_i** (equivalently, x_i = (1 - s_i) / 2)

Check it: when x_i = 0, s_i = 1 - 0 = 1. When x_i = 1, s_i = 1 - 2 = -1. So "not selected" (x_i = 0) maps to spin-up (s_i = +1), and "selected" (x_i = 1) maps to spin-down (s_i = -1). Substituting this into any QUBO's x^T Q x expression and expanding algebraically always produces exactly the Ising form Σh_i s_i + Σ J_ij s_i s_j, plus a constant offset — the two formulations describe the same optimization landscape, just relabeled.

## A fully worked conversion

Take the same QUBO from Lesson 2: f(x1, x2) = -5x1 - 3x2 + 2x1x2. Substitute x1 = (1-s1)/2 and x2 = (1-s2)/2:

-5x1 = -5(1-s1)/2 = -5/2 + (5/2)s1
-3x2 = -3(1-s2)/2 = -3/2 + (3/2)s2
2x1x2 = 2 · (1-s1)/2 · (1-s2)/2 = (1-s1)(1-s2)/2 = 1/2 - s1/2 - s2/2 + (1/2)s1s2

Adding the constants (-5/2 - 3/2 + 1/2 = -7/2), the s1 coefficients ((5/2) - (1/2) = 2), the s2 coefficients ((3/2) - (1/2) = 1), and the s1s2 coefficient (1/2), the Ising Hamiltonian is:

**H(s1, s2) = -3.5 + 2·s1 + 1·s2 + 0.5·s1s2**

Verify this agrees with the original QUBO at every one of the four assignments (computed directly, not estimated):

| x1, x2 | f(x) (QUBO) | s1, s2 | H(s) (Ising) |
|---|---|---|---|
| 0, 0 | 0 | 1, 1 | -3.5 + 2 + 1 + 0.5 = **0** |
| 0, 1 | -3 | 1, -1 | -3.5 + 2 - 1 - 0.5 = **-3** |
| 1, 0 | -5 | -1, 1 | -3.5 - 2 + 1 - 0.5 = **-5** |
| 1, 1 | -6 | -1, -1 | -3.5 - 2 - 1 + 0.5 = **-6** |

Every row matches exactly. The minimum is still -6, still achieved at the same underlying choice ("both selected" = x = (1,1) = s = (-1,-1)). Nothing about the optimum changed — only the coordinate system describing it did.

## Why this matters for hardware

QAOA's cost Hamiltonian (built formally in Lesson 7) is constructed from Pauli-Z operators acting on qubits, and a qubit's Z-eigenvalues are exactly +1 and -1 — the same two values an Ising spin takes. That is not a coincidence: it's the entire reason QUBO problems can be loaded onto quantum hardware at all. The translation pipeline for every problem in this course runs: **real-world problem → QUBO → Ising Hamiltonian → quantum circuit or annealer schedule**. Lesson 4 takes you through that full pipeline end-to-end for Max-Cut, and the lab in Lesson 5 has you run it yourself on a new problem.

## Key terms

| Term | Meaning |
|---|---|
| Ising model | A physics model of interacting ±1 spins, with energy H(s) = Σh_i s_i + Σ J_ij s_i s_j |
| Spin variable (s_i) | A variable taking value +1 or -1, as opposed to a QUBO's 0/1 binary variable |
| Local field (h_i) | The Ising coefficient describing the energy contribution of spin i acting alone |
| Coupling coefficient (J_ij) | The Ising coefficient describing the interaction energy between spins i and j |
| QUBO-to-Ising substitution | The mapping s_i = 1 - 2x_i (equivalently x_i = (1-s_i)/2) that converts any QUBO into an equivalent Ising Hamiltonian |

## Check yourself

Using the substitution s_i = 1 - 2x_i, convert the single-variable QUBO f(x) = 4x into its Ising form H(s), showing your algebra. Then verify by evaluating both f(x) and H(s) at x=0 and x=1 and confirming they match.
