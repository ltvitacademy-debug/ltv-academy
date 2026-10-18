# VQE Implementation Lab

Lesson 12 claimed that an ansatz without entangling gates can be structurally unable to reach a true ground state. This lab proves that claim with a real 2-qubit Hamiltonian, computing both the true ground energy and the best a non-entangling ansatz can do — and measuring the exact gap between them.

## What you'll learn

- How to diagonalize a small 2-qubit Hamiltonian exactly to find its true ground energy
- How to identify whether a quantum state is entangled using a direct numerical test
- How to run a restricted ("product-only") variational search and measure its shortfall
- A concrete, directly-computed demonstration of why ansatz choice has real consequences
- How this result connects forward to the honest-limitations discussion in Chapters 4 and 5

## The lab Hamiltonian

Take a 2-qubit Hamiltonian combining an interaction term and two single-qubit terms:

**H = Z_0Z_1 + 0.5·X_0 + 0.5·X_1**

As a 4×4 matrix in the basis |00⟩, |01⟩, |10⟩, |11⟩ (ordered as q0,q1):

H =
```
[  1    0.5   0.5    0  ]
[ 0.5   -1     0    0.5 ]
[ 0.5    0    -1    0.5 ]
[  0    0.5   0.5    1  ]
```

## Step 1: Exact diagonalization

Diagonalizing this matrix exactly (using a direct numerical eigenvalue method, verified by confirming H·v = E·v for the result) gives four eigenvalues: **1.0, -1.0, +√2 ≈ 1.414214, and -√2 ≈ -1.414214**. These satisfy both consistency checks that confirm the computation is correct: their sum is 0 (matching the matrix's trace, 1-1-1+1=0) and the sum of their squares is 6 (matching trace(H²), computed independently). The true ground state energy is:

**E_0 = -√2 ≈ -1.414214**

with ground state eigenvector (normalized): **(-0.2706, 0.6533, 0.6533, -0.2706)** over (|00⟩, |01⟩, |10⟩, |11⟩).

## Step 2: Is the ground state entangled?

A 2-qubit state with amplitudes (v_00, v_01, v_10, v_11) is a **product state** (not entangled) exactly when it factors as (a|0⟩+b|1⟩)⊗(c|0⟩+d|1⟩) — which requires v_00·v_11 = v_01·v_10 (since both sides equal ac·bd). Checking this ground state directly: v_00·v_11 = (-0.2706)×(-0.2706) ≈ 0.0732, while v_01·v_10 = 0.6533×0.6533 ≈ 0.4268. These are not equal, which proves this ground state **cannot** be written as any product of two independent single-qubit states — it is genuinely entangled.

## Step 3: What can a non-entangling ansatz achieve?

Restrict the search to only product-state trial wavefunctions — ansätze built purely from independent single-qubit rotations with no CNOT or other entangling gate, exactly the limitation flagged in Lesson 12's check-yourself question. Parameterize such a state as (cos(a/2)|0⟩+sin(a/2)|1⟩)⊗(cos(b/2)|0⟩+sin(b/2)|1⟩) and scan both angles a and b exhaustively (a dense direct scan, not an approximation):

**Best product-state energy found: ≈-1.249979, at a ≈ 3.660, b ≈ 5.765**

Compare that to the true ground energy of -1.414214. The **gap is ≈0.164** — a non-entangling ansatz, no matter how its two angles are tuned, cannot get closer than this to the true answer, because the true ground state structurally requires entanglement that this ansatz family can never produce. This is the variational principle (Lesson 11) at work exactly as advertised: the restricted ansatz's best energy (-1.249979) still sits strictly above the true E_0 (-1.414214), and no amount of further classical optimization within that restricted family closes the remaining gap.

## What this demonstrates

This single lab result is the concrete proof behind two claims made earlier in this chapter: first, that the ansatz you choose defines a hard ceiling on what VQE can find (Lesson 12), and second, that the variational principle's inequality ⟨ψ|H|ψ⟩ ≥ E_0 is not just a theoretical guarantee but something you can watch happen numerically, with a specific, non-zero gap when your ansatz family is insufficient. Scaling this lesson up: real molecular ground states (Lesson 13) are typically entangled across many orbitals, which is exactly why ansatz design — choosing something expressive enough to capture that entanglement, without being so elaborate it can't be optimized — is a genuinely hard, unresolved engineering problem, not a detail to wave past.

## Key terms

| Term | Meaning |
|---|---|
| Product state | A 2-qubit state factorable as (a\|0⟩+b\|1⟩)⊗(c\|0⟩+d\|1⟩); satisfies v_00·v_11 = v_01·v_10 |
| Entangled state | A state that cannot be factored into independent single-qubit states; v_00·v_11 ≠ v_01·v_10 |
| Energy gap (ansatz shortfall) | The difference between a restricted ansatz's best achievable energy and the true ground energy, caused by the ansatz's limited expressiveness |
| Diagonalization consistency check | Verifying computed eigenvalues by confirming their sum matches the trace and their sum of squares matches trace(H²) |

## Check yourself

The lab found a specific, nonzero gap (≈0.164) between the best product-state ansatz and the true ground energy. If you added a single CNOT gate (an entangling gate) to the ansatz circuit, between the two independent rotations, would you expect this gap to shrink, stay the same, or grow — and why, structurally, does a CNOT gate change what states the ansatz can represent?
