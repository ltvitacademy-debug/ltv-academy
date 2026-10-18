# Variational Algorithms in Qiskit

Grover's algorithm and the QFT run entirely on the quantum processor, start to finish. Variational algorithms are different: they deliberately split the work between a quantum circuit and a classical optimizer, running back and forth between the two until the result converges. This hybrid loop is the backbone of VQE and QAOA, two of the most practically important algorithms on today's noisy, limited-qubit hardware.

## What you'll learn

- The hybrid quantum-classical loop: ansatz, expectation value, classical optimizer, repeat
- Real use cases: quantum chemistry ground-state energies (VQE) and combinatorial optimization (QAOA)
- The modern import pattern for `VQE`, `COBYLA`, and `StatevectorEstimator`
- A fully hand-verifiable toy example: minimizing ⟨H⟩(θ) for a simplified, illustrative Hamiltonian
- Why gradient-free optimizers like COBYLA are commonly used for real-hardware variational algorithms

## The hybrid loop

A variational algorithm has four moving parts, repeated in a loop:

1. **Ansatz** — a parameterized quantum circuit, like `RY(θ)|0>`, whose parameters (θ, or many θs for larger problems) are what gets tuned.
2. **Objective operator** — a Hamiltonian or cost operator H whose expectation value ⟨H⟩ you want to minimize (or, for some objectives, maximize).
3. **Quantum evaluation** — run the ansatz circuit through an `Estimator` primitive to measure ⟨H⟩ at the current parameter values.
4. **Classical update** — a classical optimizer looks at the measured ⟨H⟩ (and possibly previous measurements) and proposes new parameter values to try next.

Steps 3 and 4 repeat until the optimizer decides it has converged on a minimum. The quantum processor only ever does one job — evaluate ⟨H⟩ at a given set of parameters — while all the "deciding what to try next" logic happens classically. This is why these are called hybrid algorithms: neither half does the whole job alone.

## Real use cases

**VQE** (Variational Quantum Eigensolver) was originally developed for quantum chemistry: if H represents a molecule's electronic Hamiltonian, the minimum achievable ⟨H⟩ over all possible quantum states is the molecule's ground-state energy — a quantity that is expensive to compute classically for larger molecules. **QAOA** (Quantum Approximate Optimization Algorithm) applies the same hybrid-loop structure to combinatorial optimization problems, where H encodes a cost function (such as the cost of a graph partition or scheduling assignment) and the minimum of ⟨H⟩ corresponds to a good or optimal solution.

## The modern import pattern

```python
from qiskit_algorithms import VQE
from qiskit_algorithms.optimizers import COBYLA
from qiskit.primitives import StatevectorEstimator
```

`VQE` and `COBYLA` come from the separate `qiskit-algorithms` package (as covered in Lesson 25), while `StatevectorEstimator` is a core `qiskit` primitive used to evaluate expectation values during simulation. In a full setup, you'd construct an ansatz circuit, a Hamiltonian operator, instantiate `VQE(estimator, ansatz, optimizer)`, and call `.compute_minimum_eigenvalue(operator)` — but before trusting that machinery, it's worth working through the arithmetic it's automating by hand.

## A fully hand-checkable toy example

To make this concrete and verifiable without running any code, use a deliberately simplified **toy** Hamiltonian — explicitly not a real molecule's actual Hamiltonian, chosen only so the arithmetic is fully checkable by hand:

**H = 0.5·Z + 0.3·X**, with ansatz **RY(θ)|0>**

For this specific H and ansatz, the expectation value has a clean closed form: ⟨H⟩(θ) = 0.5·cos(θ) + 0.3·sin(θ). Here is that function evaluated at several θ values (verified by exact formula and confirmed against a fine numerical sweep):

| θ | ⟨H⟩(θ) |
|---|---|
| 0 | 0.500000 |
| π/4 | 0.565685 |
| π/2 | 0.300000 |
| 0.6π (≈1.885 rad) | 0.130808 |
| π | -0.500000 |

Notice the value isn't monotonically decreasing as θ increases from 0 — it rises slightly by π/4 before falling. This is exactly the kind of non-obvious landscape a classical optimizer has to navigate without being told the underlying formula.

## Where the true minimum is

For a Hamiltonian of the form H = a·Z + b·X, the minimum achievable expectation value over any single-qubit state is exactly -√(a² + b²) — this is the "ground state energy" of that toy 2-level system. For a=0.5, b=0.3, that's -√(0.5² + 0.3²) = **-0.583095**, achieved at θ ≈ 3.6826 rad (≈210.96°). Both calculus (setting the derivative of 0.5·cos(θ) + 0.3·sin(θ) to zero) and a fine numerical sweep over θ confirm this same minimum.

Compare this to the table above: none of the five sampled θ values comes close to -0.583095, and θ=π (giving -0.5) is actually the closest of those five, but still well short of the true minimum.

## What the optimizer is actually doing

`COBYLA` is a gradient-free classical optimizer — it doesn't need the derivative of ⟨H⟩(θ), only the ability to evaluate it at chosen points. Picture it probing the landscape: try θ=0, get 0.500000; try a nearby point, see whether the value went up or down; adjust direction based on that; repeat. Over successive evaluations, a well-behaved gradient-free optimizer like COBYLA homes in on θ≈3.68 rad, driving ⟨H⟩ down toward -0.583095, purely by comparing evaluated points against each other — never by being told the formula 0.5·cos(θ) + 0.3·sin(θ) directly. This probing process, repeated automatically and much faster than you could do it by hand, is literally what happens inside every iteration of the VQE hybrid loop.

## Why gradient-free optimizers matter here

On real quantum hardware, you cannot get an exact derivative of ⟨H⟩(θ) "for free" — every measurement is a noisy, finite-shot estimate of an expectation value, and computing a true gradient would require extra, separate measurements at shifted parameter values, adding cost and noise. This is exactly why gradient-free optimizers like COBYLA are commonly chosen for VQE and QAOA on real devices: they make do with point evaluations of ⟨H⟩, which is the one thing a quantum computer can actually hand back to you.

## Key terms

| Term | Meaning |
|---|---|
| Ansatz | The parameterized quantum circuit (here, `RY(θ)\|0>`) whose parameters are tuned during the variational loop |
| `Estimator` | The primitive used to measure the expectation value of an operator on a given circuit state |
| VQE | Variational Quantum Eigensolver; finds the parameters minimizing ⟨H⟩, approximating a Hamiltonian's ground-state energy |
| QAOA | Quantum Approximate Optimization Algorithm; applies the same hybrid loop structure to combinatorial optimization cost functions |
| COBYLA | A gradient-free classical optimizer commonly used in VQE/QAOA because it needs only point evaluations of ⟨H⟩, not derivatives |

## Check yourself

Using the formula ⟨H⟩(θ) = 0.5·cos(θ) + 0.3·sin(θ), compute ⟨H⟩ at θ = 3π/2 by hand, and explain whether that value is closer to or farther from the true minimum of -0.583095 than the θ=π value of -0.5 given in the lesson.
