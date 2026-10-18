# Quantum Classifier Lab

This lab walks through building a tiny, fully worked quantum kernel matrix for a 3-point toy dataset by hand, then uses it to make a classification decision the way an SVM would — making the abstract Lesson 13 math concrete on a dataset you can hold in your head.

## What you'll learn

- How to build a complete kernel matrix for a small dataset using angle encoding
- How to interpret that kernel matrix to make a simple nearest-neighbor-style classification call
- Why a 3-point toy example is a teaching tool, not evidence of anything about real-world performance
- What would need to be added to turn this into an actual trained SVM

## The toy dataset

Three 1-feature data points, angle-encoded via RY(x)|0⟩, with known labels:

| Point | x (radians) | Label |
|---|---|---|
| A | 0.4 | 0 |
| B | 0.5 | 0 |
| C | 1.2 + π ≈ 4.3416 | 1 |

Points A and B are close together in feature space; C is deliberately placed roughly "opposite" A on the encoding circle (offset by about π from 1.2) to guarantee a clearly separable toy case.

## Building the kernel matrix

Using k(x, x') = cos²((x − x')/2) from Lesson 13:

**k(A, B)** = cos²((0.4 − 0.5)/2) = cos²(−0.05) ≈ cos²(0.05) ≈ **0.9975** — A and B are nearly maximally similar, as expected since their x-values are close.

**k(A, C)** = cos²((0.4 − 4.3416)/2) = cos²(−1.9708) ≈ **0.1516** — A and C are quite dissimilar.

**k(B, C)** = cos²((0.5 − 4.3416)/2) = cos²(−1.9208) ≈ **0.1176** — B and C are also quite dissimilar, in fact slightly more dissimilar than A and C.

**k(A, A) = k(B, B) = k(C, C) = 1** exactly, as always for any point with itself.

## The full kernel matrix

| | A | B | C |
|---|---|---|---|
| **A** | 1.0000 | 0.9975 | 0.1516 |
| **B** | 0.9975 | 1.0000 | 0.1176 |
| **C** | 0.1516 | 0.1176 | 1.0000 |

## Making a classification call

Suppose a new test point D at x = 0.45 (angle-encoded the same way) needs a label. Using a simple kernel-weighted nearest-neighbor rule (compute k(D, A), k(D, B), k(D, C), and predict the label of whichever training point has the highest kernel value — the most "similar" by the quantum kernel's own measure):

- k(D, A) = cos²((0.45 − 0.4)/2) = cos²(0.025) ≈ **0.9994**
- k(D, B) = cos²((0.45 − 0.5)/2) = cos²(−0.025) ≈ **0.9994** (symmetric, as expected since D sits exactly between A and B)
- k(D, C) = cos²((0.45 − 4.3416)/2) ≈ **0.1342**

D is far more similar to A and B (label 0) than to C (label 1), so the kernel-weighted call predicts **label 0** for D — matching intuition, since D's raw feature value (0.45) sits right between A's (0.4) and B's (0.5).

## What this toy lab does and doesn't prove

This is a hand-traceable illustration of exactly how a quantum kernel matrix is built and used — nothing more. It does not demonstrate any advantage over a classical kernel: a classical RBF kernel on the same three points, with a comparable bandwidth parameter, would make the identical classification call on D, because the underlying geometric intuition (D is "between" A and B) doesn't require anything quantum. The value of this lab is understanding the mechanics precisely, not evidence about quantum vs. classical performance — consistent with Chapter 1's framing.

## From this toy example to a real SVM

A real implementation would: (1) use many more training points, (2) compute the full N×N kernel matrix the same way, (3) hand that matrix to a classical SVM solver (e.g., `SVC(kernel="precomputed")`) rather than a simple nearest-neighbor rule, and (4) let the SVM's margin-maximization optimization — not a hand-picked nearest-neighbor heuristic — determine the actual decision boundary. The nearest-neighbor rule used here is a simplification for hand-tracing, not what Lesson 13's SVM integration actually does.

## Key terms

| Term | Meaning |
|---|---|
| Kernel matrix | The full table of pairwise kernel values for a dataset, K[i][j] = k(xi, xj) |
| Kernel-weighted nearest neighbor | A simplified classification rule predicting the label of the training point with the highest kernel (similarity) value |
| Decision boundary | The boundary an SVM learns by maximizing the margin using the full kernel matrix, not just the single highest-similarity point |

## Check yourself

Using k(x,x') = cos²((x−x')/2), compute k(D, A) and k(D, B) for a new test point D at x = 1.0, given A at x = 0.4 and B at x = 0.5. Which training point is D more similar to, and does that match your intuition about where x = 1.0 sits relative to 0.4 and 0.5?
