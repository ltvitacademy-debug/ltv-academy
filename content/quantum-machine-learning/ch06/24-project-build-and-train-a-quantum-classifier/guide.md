# Project: Build & Train a Quantum Classifier

This lesson builds the actual 2-qubit variational classifier for the Iris subproblem chosen in Lesson 23, using two real Iris measurements, and traces one full forward pass and one gradient update by hand — the capstone project's core technical step.

## What you'll learn

- How to assemble encoding + trainable ansatz + entangling gate + measurement into the project's actual circuit
- How to forward-pass two real Iris data points through that circuit and compute their losses
- How to compute and apply one parameter-shift gradient update, and verify it actually reduces loss
- What one verified iteration tells you, and what remains before this is a genuinely trained classifier

## The circuit for this project

Two qubits — one for petal length, one for petal width (Lesson 23's chosen 2-feature reduction):

1. **Encode**: RY(x₁) on qubit 1 (petal length angle), RY(x₂) on qubit 2 (petal width angle) — angle encoding, Lesson 10.
2. **Trainable ansatz**: RY(θ₁) on qubit 1, RY(θ₂) on qubit 2 — the trainable parameters Lesson 24 will update.
3. **Entangle**: CNOT (control qubit 1, target qubit 2) — Lesson 6's entangling layer, letting petal-length and petal-width information interact.
4. **Measure** ⟨Z⟩ on qubit 1 → prediction, via Lesson 12's p = (⟨Z⟩+1)/2.

## Real data, scaled into encoding angles

Using two real measurements from the Iris dataset (Setosa and Versicolor samples, in centimeters), scaled to radians by a fixed factor of 0.3 (an arbitrary but consistent choice — angle encoding just needs *some* fixed, documented mapping from raw feature to angle):

| Sample | Petal length (cm) | Petal width (cm) | x₁ = length×0.3 | x₂ = width×0.3 | Label |
|---|---|---|---|---|---|
| Setosa | 1.4 | 0.2 | 0.42 | 0.06 | 0 |
| Versicolor | 4.7 | 1.4 | 1.41 | 0.42 | 1 |

## Forward pass with an untrained ansatz (θ₁ = θ₂ = 0.5)

Running the full circuit (encode → ansatz → CNOT → measure, computed exactly via matrix simulation):

- **Setosa**: ⟨Z⟩ ≈ **0.6058**, giving p ≈ **0.8029**. True label is 0, so this untrained circuit is confidently *wrong* — binary cross-entropy loss ≈ **1.6241**.
- **Versicolor**: ⟨Z⟩ ≈ **−0.3327**, giving p ≈ **0.3336**. True label is 1, so this is also leaning wrong — loss ≈ **1.0977**.

Both losses are large, which is expected and fine: θ₁ = θ₂ = 0.5 was an arbitrary untrained starting point, not a tuned one. This is exactly analogous to a classical network's random initialization producing poor initial predictions.

## One parameter-shift gradient step, using the Setosa sample

**Parameter-shift gradient of ⟨Z⟩ w.r.t. θ₁**, holding θ₂ fixed, for the Setosa input: evaluating the full circuit at θ₁ + π/2 and θ₁ − π/2 and taking half their difference gives **dZ/dθ₁ ≈ −0.7956** (this single number already reflects the entangled, multi-qubit circuit — it's not a simplified single-qubit shortcut).

**Chain rule to the loss**: for the Setosa sample (true label y = 0), dL/dZ ≈ **2.5369**, so dL/dθ₁ = dL/dZ × dZ/dθ₁ ≈ 2.5369 × (−0.7956) ≈ **−2.0184**.

**Update** with learning rate η = 0.4: θ₁_new = 0.5 − 0.4 × (−2.0184) ≈ 0.5 + 0.8073 ≈ **1.3073**.

## Verifying the update actually helped

Re-running the forward pass for the Setosa sample with the updated θ₁ (θ₂ unchanged at 0.5): ⟨Z⟩ drops to ≈ **−0.1559**, giving p ≈ **0.4220** — much closer to the true label of 0 than the original p ≈ 0.8029. The recomputed loss confirms it: **≈ 0.5483**, down from **≈ 1.6241** — a large, genuine, verified improvement from a single gradient step on a single parameter, using one real data sample.

## What this one verified step does and doesn't establish

This confirms the whole pipeline — real data, angle encoding, an entangled 2-qubit ansatz, parameter-shift gradients, and a classical update — works correctly end to end on real measurements, and that one gradient step measurably helps. It does **not** yet constitute a trained classifier: a real training run needs many iterations across the *entire* training set (not just one sample), updating *both* θ₁ and θ₂ together each step, until the loss stabilizes across the whole dataset — plus a held-out test set to check generalization, which Lesson 25's benchmark will require. This lesson verified the mechanism works; Lesson 25 is where its actual performance gets honestly measured.

## Key terms

| Term | Meaning |
|---|---|
| Untrained ansatz | A variational circuit with parameters set to an arbitrary starting value, before any training has occurred |
| Single-sample gradient step | A parameter update computed from just one training example, as a mechanism check — not a full training run |
| Held-out test set | Data never used during training, used afterward to check whether the model generalizes (Lesson 25) |

## Check yourself

The gradient step in this lesson only updated θ₁, using only the Setosa sample. Why would updating θ₁ using only the Versicolor sample's gradient potentially push θ₁ in a different direction than the Setosa sample did — and why does a real training loop need to account for every sample, not just one, before drawing any conclusion about the model?
