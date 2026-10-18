# Quantum Neural Network Lab

This lab traces a 2-layer, 2-qubit QNN-style circuit's forward pass by hand — encoding, two rotation+entangling blocks, and measurement — closing out Chapter 4 by making the "QNN" label from Lessons 15-16 concrete on an actual multi-qubit example.

## What you'll learn

- How to trace a 2-qubit circuit's state through two full layers by hand, step by step
- A precise, verified fact about which qubit's measurement entanglement actually changes after one CNOT layer — and which qubit's it doesn't
- How a second layer changes both qubits' measurements in a way no single-qubit picture can reproduce
- What this lab does and doesn't tell you about scaling to more qubits

## The circuit

Two qubits, starting in |00⟩. Layer structure: RY rotation on each qubit, then a CNOT (control = qubit 1, target = qubit 2), repeated for 2 layers.

**Layer 1 rotations:** apply RY(θ₁) to qubit 1 and RY(θ₂) to qubit 2, with θ₁ = π/2 and θ₂ = π/3.

- Qubit 1 becomes RY(π/2)|0⟩ = [cos(π/4), sin(π/4)] ≈ [0.7071, 0.7071]
- Qubit 2 becomes RY(π/3)|0⟩ = [cos(π/6), sin(π/6)] ≈ [0.8660, 0.5000]

Before entangling, the combined 2-qubit state is the tensor product: amplitude of |00⟩ ≈ 0.6124, |01⟩ ≈ 0.3536, |10⟩ ≈ 0.6124, |11⟩ ≈ 0.3536 (computed directly by multiplying each qubit's amplitudes; normalization checks out to 1.0000).

**Layer 1 CNOT** (control qubit 1, target qubit 2): flips qubit 2's value whenever qubit 1 is |1⟩, swapping the |10⟩ and |11⟩ amplitudes. After the CNOT: |00⟩ ≈ 0.6124, |01⟩ ≈ 0.3536, |10⟩ ≈ 0.3536, |11⟩ ≈ 0.6124.

## A precise fact about this CNOT: qubit 1's own marginal doesn't change

Before computing anything, it's worth stating a fact this lab's numbers confirm exactly: a CNOT never changes the control qubit's own marginal probabilities, because CNOT only ever permutes amplitudes *within* the block where the control is |1⟩ — it never moves probability between the control being |0⟩ and |1⟩. Checking directly: P(qubit 1 = 0) = |amp(00)|² + |amp(01)|² = 0.6124² + 0.3536² = 0.3750 + 0.1250 = **0.5000**, both before and after the CNOT (before: 0.6124² + 0.3536² = 0.5000 too — identical). So ⟨Z⟩ on qubit 1 is cos(π/2) = 0 whether or not the CNOT has happened — entanglement genuinely has zero effect on the *control* qubit's own single-qubit measurement statistics after just one such layer.

## Where entanglement's effect actually shows up: the target qubit

Qubit 2 tells a completely different story. **Before** the CNOT, qubit 2's marginal ⟨Z⟩ is exactly cos(θ₂) = cos(π/3) = **0.5000** — it's just sitting in its own independent RY-rotated state. **After** the CNOT: P(qubit 2 = 0) = |amp(00)|² + |amp(10)|² = 0.6124² + 0.3536² = 0.3750 + 0.1250 = 0.5000, and P(qubit 2 = 1) = |amp(01)|² + |amp(11)|² = 0.3536² + 0.6124² = 0.1250 + 0.3750 = 0.5000, so ⟨Z⟩ on qubit 2 = **0.0000** — a real, computed, exact change from 0.5 down to 0, caused entirely by entangling qubit 2 with qubit 1. This is the genuine, verified demonstration of "entangling layers let the circuit capture correlations between features" from Lesson 6: qubit 2's own measurement statistics shifted because of what happened to qubit 1, something no un-entangled, single-qubit-only circuit could ever produce.

## Layer 2: both qubits now depend on everything

Apply a second rotation layer with θ₃ = π/5 and θ₄ = π/7, then a second CNOT (same control/target pattern), to the already-entangled state from layer 1. Carrying out the full 4-amplitude update (verified by direct matrix computation) gives, after layer 2's CNOT:

- ⟨Z⟩ on qubit 1 ≈ **−0.5090**
- ⟨Z⟩ on qubit 2 ≈ **0.6195**

Neither of these numbers matches any single-qubit calculation using only θ₁/θ₃ (for qubit 1) or θ₂/θ₄ (for qubit 2) alone — both measurements now depend on the full set of four parameters, θ₁ through θ₄, mixed together by two rounds of entanglement. This is precisely the expressiveness extra depth is meant to buy (Lesson 6), and precisely why deeper circuits are more exposed to the barren-plateau effect (Lesson 8): more parameters now jointly influence every measurement, which is also what makes the gradient landscape higher-dimensional and harder to navigate.

## What this lab doesn't show

Two qubits is small enough to trace entirely by hand and far too small to exhibit a real barren plateau (which needs many qubits to show its exponential-in-qubit-count effect) or any meaningful classification task. Its only job here is making the mechanics of entanglement and multi-qubit measurement concrete and checkable — the same honest-scope caveat from Lesson 9's single-qubit lab applies again, one qubit later.

## Key terms

| Term | Meaning |
|---|---|
| Tensor product | The combined multi-qubit state formed from independent single-qubit states before any entangling gate acts |
| Marginal probability | The probability of a measurement outcome on one qubit, found by summing over all possibilities for the other qubits |
| Control qubit invariance | The fact that a CNOT never changes its control qubit's own marginal probabilities, since it only permutes amplitudes within the "control=1" block |
| Entanglement | A multi-qubit state that cannot be written as a tensor product of independent single-qubit states |

## Check yourself

Why does entanglement's effect show up immediately on qubit 2 (the target) after just one CNOT layer, but qubit 1 (the control) only starts showing a genuinely "mixed" measurement once a second rotation+CNOT layer is added? What specific property of CNOT explains the difference?
