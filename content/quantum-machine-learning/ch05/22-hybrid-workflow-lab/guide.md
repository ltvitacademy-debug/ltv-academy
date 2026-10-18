# Hybrid Workflow Lab

This lab traces one complete hybrid training iteration end to end on a tiny, fully specified hybrid model — a classical pre-processing step, a 1-qubit quantum layer, and a classical post-processing step — closing out Chapter 5 by connecting every piece from Lessons 19-21 into one worked numeric example.

## What you'll learn

- How to trace data through a full classical → quantum → classical hybrid forward pass by hand
- How to compute the loss and the gradient contribution from each stage, including the parameter-shift piece
- How to update both the classical and quantum parameters in one coordinated step
- What one iteration's worth of computation honestly tells you about whether this toy model is "working"

## The tiny hybrid model

- **Classical pre-layer**: a single weight w, mapping one raw input feature r to a rotation angle: x = w × r.
- **Quantum layer**: RY(x)|0⟩, measuring ⟨Z⟩ (the same single-qubit circuit from Lessons 5, 7, and 9).
- **Classical post-layer**: a fixed (non-trained, for simplicity) mapping from ⟨Z⟩ to a probability: p = (⟨Z⟩ + 1) / 2 (Lesson 12's thresholding formula).
- **Loss**: binary cross-entropy, L = −[y·log(p) + (1−y)·log(1−p)] (Lesson 12).

**Setup**: raw input r = 0.8, current classical weight w = 1.25, true label y = 1.

## Forward pass

**Classical pre-layer**: x = w × r = 1.25 × 0.8 = **1.0**.

**Quantum layer**: ⟨Z⟩ = cos(x) = cos(1.0) ≈ **0.5403** (exact value of cos(1.0) in radians, computed directly).

**Classical post-layer**: p = (0.5403 + 1) / 2 = 1.5403 / 2 ≈ **0.7702**.

**Loss**: y = 1, so L = −log(0.7702) ≈ **0.2612**.

## Backward pass: two gradients needed

**Gradient of loss w.r.t. the quantum output ⟨Z⟩** (chain rule through the post-layer and loss): since p = (⟨Z⟩+1)/2 and L = −log(p) for y=1, dL/d⟨Z⟩ = dL/dp × dp/d⟨Z⟩ = (−1/p) × (1/2) = −1/(2×0.7702) ≈ **−0.6492**.

**Gradient of ⟨Z⟩ w.r.t. x, via parameter-shift** (Lesson 7): for ⟨Z⟩ = cos(x), the parameter-shift gradient at x=1.0 is [cos(1.0+π/2) − cos(1.0−π/2)]/2 = [cos(2.5708) − cos(−0.5708)]/2 ≈ [−0.8415 − 0.8415]/2 ≈ **−0.8415** (matching the analytic derivative −sin(1.0) ≈ −0.8415, confirming the shift rule again).

**Gradient of x w.r.t. w** (ordinary classical chain rule): x = w×r, so dx/dw = r = **0.8**.

**Full gradient w.r.t. w, chained together**: dL/dw = dL/d⟨Z⟩ × d⟨Z⟩/dx × dx/dw ≈ (−0.6492) × (−0.8415) × (0.8) ≈ **0.4371**.

## Updating the classical weight

With learning rate η = 0.5: w_new = w − η × dL/dw ≈ 1.25 − 0.5 × 0.4370 ≈ 1.25 − 0.2185 ≈ **1.0315**.

Notice w *decreased* — not the naive guess of "increase w to push toward a better answer." Checking what this actually does to the forward pass confirms it was the right direction anyway: x_new = w_new × r ≈ 1.0315 × 0.8 ≈ 0.8252, cos(0.8252) ≈ 0.6784, giving p_new = (0.6784+1)/2 ≈ **0.8392** — higher than the original p ≈ 0.7702. For a true label y = 1, a higher p means a more confident, more correct prediction, and the recomputed loss confirms it: L_new = −log(0.8392) ≈ **0.1753**, down from the original L ≈ 0.2612. The gradient-driven update, despite moving w in the direction that might look counterintuitive at first glance, genuinely reduced the loss — exactly what one correct gradient descent step is supposed to do.

## What this one iteration honestly shows

This single traced iteration confirms the full hybrid chain rule — classical gradient, parameter-shift gradient, and classical gradient again — links up correctly and produces a parameter update that genuinely reduces the loss (verified directly: loss dropped from ≈0.2612 to ≈0.1753 in one step). It does **not** show that this toy architecture would successfully train on a real multi-sample dataset, generalize to unseen data, or avoid the barren-plateau and shot-noise complications of Lessons 8 and 16 at larger scale — exactly the same honest scope limit as every other worked lab in this course.

## Key terms

| Term | Meaning |
|---|---|
| Forward pass | Computing a model's output from an input, stage by stage, before any gradient computation |
| Backward pass | Computing the gradient of the loss with respect to every trainable parameter, stage by stage, in reverse order |
| Chained gradient | A gradient computed by multiplying together the local gradients of each stage in a pipeline (the chain rule) |

## Check yourself

Verify by direct computation that p ≈ 0.8392 (using the updated w ≈ 1.0315, r = 0.8) is indeed higher than the original p ≈ 0.7702 — and explain in one sentence why a higher p is the correct direction for this update, given the true label is y = 1.
