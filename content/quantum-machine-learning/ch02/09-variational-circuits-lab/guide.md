# Variational Circuits Lab

This lab is a hands-on walkthrough of training the single-qubit circuit from Lessons 5 and 7 to hit a specific target output, tracing every gradient-descent step by hand so you can see the full loop (circuit → loss → parameter-shift gradient → update) with real numbers end to end.

## What you'll learn

- How to set up a concrete training target and loss function for a variational circuit
- How to run the full loop — evaluate circuit, compute loss, compute parameter-shift gradient, update parameter — for several iterations by hand
- How to read a convergence trace and recognize when training has actually converged
- What this toy lab does and doesn't tell you about larger, more realistic circuits

## The task: train RY(θ) to hit a target expectation value

Use the same circuit as Lessons 5 and 7: one qubit, RY(θ)|0⟩, measuring ⟨Z⟩ = cos(θ). Suppose the task is to find θ such that ⟨Z⟩ = 0 (i.e., land exactly on the equator of the Bloch sphere — a 50/50 state). Define a simple squared-error loss:

L(θ) = (cos(θ) − 0)² = cos²(θ)

Start at θ₀ = π/3 (the same starting point used in Lesson 7), with learning rate η = 0.4.

## Iteration 1

**Circuit evaluation:** cos(π/3) ≈ 0.5, so L(θ₀) = 0.5² = 0.25.

**Gradient of the loss** (chain rule: dL/dθ = 2·cos(θ)·(−sin(θ)) = −2·cos(θ)·sin(θ)):

- cos(π/3) = 0.5, sin(π/3) ≈ 0.8660
- dL/dθ = −2 × 0.5 × 0.8660 ≈ **−0.8660**

(This matches combining the parameter-shift result from Lesson 7, dcos(θ)/dθ = −0.8660 at θ=π/3, with the chain rule factor 2·cos(θ) = 1.0 for the squared loss.)

**Parameter update:** θ₁ = θ₀ − η × gradient = π/3 − 0.4 × (−0.8660) ≈ 1.0472 + 0.3464 = **1.3936**

## Iteration 2

**Circuit evaluation:** cos(1.3936) ≈ 0.1763, so L(θ₁) ≈ 0.1763² ≈ 0.0311.

Loss dropped from 0.25 to about 0.0311 — a large improvement in a single step, exactly what you'd want to see.

**Gradient:** dL/dθ = −2·cos(θ₁)·sin(θ₁) ≈ −2 × 0.1763 × 0.9843 ≈ **−0.3470**

**Parameter update:** θ₂ = 1.3936 − 0.4 × (−0.3470) ≈ 1.3936 + 0.1388 = **1.5324**

## Iteration 3

**Circuit evaluation:** cos(1.5324) ≈ 0.0384, so L(θ₂) ≈ 0.0384² ≈ 0.0015.

The loss keeps shrinking toward zero — θ is converging toward π/2 ≈ 1.5708, which is exactly where cos(θ) = 0, confirming the loop is working correctly: start far from the target (θ=π/3≈1.047, loss 0.25), take gradient steps, and land very close to the true target (θ=π/2) within just 3 iterations. (One more iteration lands θ ≈ 1.5631, within 0.008 radians of π/2.)

## Reading the convergence trace

| Iteration | θ | cos(θ) | Loss | Gradient |
|---|---|---|---|---|
| 0 | 1.0472 | 0.5000 | 0.2500 | −0.8660 |
| 1 | 1.3936 | 0.1763 | 0.0311 | −0.3470 |
| 2 | 1.5324 | 0.0384 | 0.0015 | ≈ −0.0767 |

Two signs this is genuine convergence, not a fluke: the loss is monotonically decreasing, and the gradient magnitude is shrinking toward zero as θ approaches the true minimum — exactly the behavior you'd expect near a well-behaved optimum, not a barren plateau (Lesson 8), where the gradient would have been near-zero from the very first iteration regardless of distance from the optimum.

## What this toy lab does and doesn't prove

This worked example honestly demonstrates the mechanics of the training loop — circuit evaluation, parameter-shift gradient, classical update — on a single parameter where you can check every number by hand. It does **not** demonstrate that training will go this smoothly for a realistic multi-qubit, multi-layer circuit on a real dataset. A single-parameter, single-qubit landscape has no barren plateau risk (that effect requires many qubits and an expressive, high-dimensional landscape) and no local minima to get stuck in. Chapters 3 and 4 scale this same loop up to real classifiers, where both of those complications become real concerns.

## Key terms

| Term | Meaning |
|---|---|
| Squared-error loss | A loss function L(θ) = (output − target)² penalizing the squared distance from the target value |
| Convergence trace | A table tracking loss and/or gradient magnitude across training iterations, used to verify training is working |
| Chain rule (in this context) | Combining the derivative of the loss w.r.t. the circuit output with the parameter-shift gradient of the circuit output w.r.t. θ |

## Check yourself

Why does the gradient magnitude in the convergence trace shrink toward zero as θ approaches π/2, and why is that a *good* sign here rather than a barren-plateau warning sign?
