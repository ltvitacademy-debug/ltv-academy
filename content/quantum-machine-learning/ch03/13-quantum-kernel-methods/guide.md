# Quantum Kernel Methods

Not every QML approach trains a quantum circuit's parameters at all. Quantum kernel methods use the quantum computer for exactly one job — computing a similarity measure between data points — and hand everything else to an entirely classical algorithm. This lesson works the math by hand, end to end.

## What you'll learn

- How a quantum kernel is defined as the squared overlap between two encoded quantum states
- A full worked kernel calculation using angle encoding, matching two different formulas
- How a quantum kernel plugs into a classical support vector machine with zero changes to the SVM itself
- What "quantum advantage" would have to mean for a kernel method specifically, and why that bar is unmet today

## Defining the quantum kernel

Given a feature map that encodes classical data x into a quantum state |φ(x)⟩ (any of Lesson 10's encodings), the quantum kernel between two points x and x' is defined as the squared overlap (fidelity) between their encoded states:

k(x, x') = |⟨φ(x)|φ(x')⟩|²

This number is always between 0 (orthogonal states — maximally "different") and 1 (identical states — maximally "similar"), exactly like a well-behaved classical kernel such as a Gaussian/RBF kernel.

## Full worked example: angle-encoding kernel

Use single-qubit angle encoding: |φ(x)⟩ = RY(x)|0⟩ = [cos(x/2), sin(x/2)] (real-valued, so the inner product is a simple dot product here).

**Step 1 — compute k(x, x) for x = x' = 0.4** (a point with itself): ⟨φ(0.4)|φ(0.4)⟩ = cos(0.2)² + sin(0.2)² = 1 (any valid quantum state has overlap exactly 1 with itself), so k(0.4, 0.4) = 1² = **1**. This matches the direct computation exactly.

**Step 2 — compute k(0.4, 1.2)** (two different points): the inner product ⟨φ(0.4)|φ(1.2)⟩ = cos(0.2)cos(0.6) + sin(0.2)sin(0.6). Computing directly: cos(0.2) ≈ 0.9801, cos(0.6) ≈ 0.8253, sin(0.2) ≈ 0.1987, sin(0.6) ≈ 0.5646. Inner product ≈ (0.9801)(0.8253) + (0.1987)(0.5646) ≈ 0.8089 + 0.1122 ≈ 0.9211. Squaring: k(0.4, 1.2) ≈ 0.9211² ≈ **0.8484**.

**Step 3 — check against the closed-form shortcut.** For this specific single-qubit angle encoding, the inner product simplifies exactly to cos((x−x')/2) by the cosine angle-subtraction identity, so k(x,x') = cos²((x−x')/2). Checking: cos((0.4−1.2)/2) = cos(−0.4) ≈ 0.9211, and squaring gives ≈ **0.8484** — matching Step 2 exactly, confirming both the long-hand inner product and the closed-form shortcut agree.

**Step 4 — confirm orthogonality for a large separation.** k(0.4, 0.4 + π) should be 0, since shifting by π flips the qubit to (close to) the orthogonal state. Direct computation confirms this is ≈ 0 (to within floating-point rounding) — the two points are maximally dissimilar under this kernel when they differ by exactly π.

## Plugging a quantum kernel into a classical SVM — unchanged

A support vector machine never actually needs the explicit feature vectors φ(x) — it only ever needs the kernel matrix K, where K[i][j] = k(xᵢ, xⱼ) for every pair of training points. This means a quantum kernel is a drop-in replacement: compute K using a quantum circuit (or a classical simulation of one) for every pair of data points, then hand that matrix to an entirely unmodified classical SVM solver (e.g., scikit-learn's `SVC(kernel="precomputed")`, or Qiskit ML's `FidelityQuantumKernel` feeding directly into `SVC`, as named in Lesson 3). Every part of SVM theory — margins, support vectors, regularization — applies completely unchanged; only the similarity measure's source is quantum.

## What quantum advantage would mean here, and why it's unproven

The theoretical hope for quantum kernels is that some feature maps might produce a kernel that is classically hard to compute or approximate — meaning no classical algorithm could efficiently reproduce the same similarity structure, giving the downstream SVM access to a genuinely new kind of pattern. Specific constructions with proven classical hardness exist for certain contrived problems. But for real datasets used in practice, there is no demonstrated case where a quantum kernel's SVM beats a well-tuned classical kernel's SVM (RBF, polynomial) on accuracy or any other practically relevant measure — consistent with Chapter 1's overall honest framing. Worse, some natural quantum kernel constructions have been shown to concentrate (kernel values cluster near a constant, losing discriminative power) as the number of qubits grows — a kernel-method cousin of the barren plateau problem from Lesson 8.

## Key terms

| Term | Meaning |
|---|---|
| Quantum kernel | k(x,x') = \|⟨φ(x)\|φ(x')⟩\|², the squared overlap between two quantum-encoded data points |
| Fidelity | Another name for the squared overlap between two quantum states, used as the similarity measure here |
| Kernel matrix | The matrix K[i][j] = k(xi, xj) for all pairs of training points, the only thing an SVM actually needs |
| Kernel concentration | A failure mode where kernel values cluster near a constant as qubit count grows, losing discriminative power |

## Check yourself

Using k(x,x') = cos²((x−x')/2), compute k(0, π/2) by hand and explain in words what a kernel value of exactly 0.5 means about the similarity of these two encoded points, relative to k(x,x)=1 and the orthogonal case k(x, x+π)=0.
