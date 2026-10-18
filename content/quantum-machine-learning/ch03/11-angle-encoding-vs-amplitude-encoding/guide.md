# Angle Encoding vs. Amplitude Encoding

Lesson 10 introduced both encodings individually. This lesson puts them side by side on the same concrete example so you can see exactly where each one's qubit cost, circuit cost, and practical trade-offs diverge.

## What you'll learn

- A direct, side-by-side qubit-count comparison for the same dataset under each encoding
- How state-preparation circuit depth differs between the two, and why that matters on NISQ hardware
- How each encoding affects what a quantum kernel actually measures (a preview of Lesson 13)
- A concrete recommendation framework: which encoding to reach for, and when

## Same dataset, two encodings, two very different qubit counts

Take a dataset with 4 continuous features per sample — say, (x₁, x₂, x₃, x₄) = (1.0, 0.4, 1.2, 0.8), all in radians.

**Angle encoding** (one qubit per feature, no entanglement needed for the encoding step itself): needs **4 qubits**, one RY rotation gate each. Qubit 1 ends up in state [cos(0.5), sin(0.5)] ≈ [0.8776, 0.4794], computed exactly as in Lesson 10.

**Amplitude encoding**: 4 classical values need only **2 qubits** (2² = 4 amplitudes). First normalize (1.0, 0.4, 1.2, 0.8): norm = √(1.0² + 0.4² + 1.2² + 0.8²) = √(1.0 + 0.16 + 1.44 + 0.64) = √3.24 = 1.8. Normalized vector ≈ (0.5556, 0.2222, 0.6667, 0.4444).

Same 4 numbers, 4 qubits vs. 2 qubits — amplitude encoding's compression advantage is real and exact. The qubit savings grow as the dataset's feature count grows: 16 features need 16 qubits under angle encoding but only 4 under amplitude encoding.

## The qubit savings aren't free: circuit depth

Angle encoding's circuit is shallow and simple: one single-qubit rotation gate per feature, applied in parallel, independent of every other feature. Total circuit depth for state preparation is effectively constant (1 gate layer), regardless of feature count.

Amplitude encoding's circuit is a different story: preparing an *arbitrary* normalized state on n qubits generally requires a sequence of controlled rotations whose count grows with the number of amplitudes (up to O(2ⁿ) gates in the worst case, though structured data can sometimes do better). For the 4-qubit, 16-amplitude case, that's potentially many more gates than angle encoding's 16 parallel single-qubit rotations — on NISQ hardware, each of those extra gates is extra noise exposure (recall Lesson 6's point about depth being a real hardware cost, not a free modeling choice). The qubit-count win can be partly or fully offset by a gate-count loss, depending on the specific data.

## How the choice affects what a quantum kernel measures

Chapter 3's later lessons (13-14) build a quantum kernel by encoding two data points and measuring the overlap between their encoded states. The encoding choice directly determines the *shape* of the resulting similarity measure:

- Under angle encoding with a single-qubit RY feature map, the kernel between two points x and x' works out to k(x, x') = cos²((x − x')/2) — a smooth, periodic function of the difference between features. This was confirmed directly: for x=0.4, x'=1.2, cos²((0.4−1.2)/2) = cos²(−0.4) ≈ 0.8484, matching the inner-product-squared calculation done the long way.
- Under amplitude encoding, the kernel between two points is the squared overlap of their raw normalized vectors — essentially a quantum version of cosine similarity on the original classical vectors.

These are genuinely different similarity measures, not just different implementations of the same thing — angle encoding's periodicity means two very different feature values can map to the same or similar kernel value if they differ by a multiple of some period, which has no analogue in amplitude encoding's direct cosine-similarity structure.

## A practical recommendation framework

- **Few features, want shallow circuits and easy debugging**: angle encoding. This is why nearly every lab in this course defaults to it.
- **Many features, qubit count is the binding constraint, and you can tolerate deeper, more complex state-preparation circuits**: amplitude encoding — but verify the actual gate count for your specific data structure before assuming the qubit savings translate into a net win.
- **Binary/categorical data with no need for continuous precision**: basis encoding (Lesson 10), simplest to reason about but most qubit-expensive per bit.

There is no universally "correct" encoding — it is a genuine design trade-off between qubit count, circuit depth, and the resulting similarity structure, evaluated per dataset and per hardware constraint.

## Key terms

| Term | Meaning |
|---|---|
| State-preparation depth | The number of sequential gate layers needed to prepare an encoded quantum state |
| Feature map | The encoding circuit, viewed as a function from classical data to quantum states |
| Kernel shape | The specific mathematical form of the similarity measure induced by a given encoding |
| Qubit-count vs. gate-count trade-off | The practical tension where fewer qubits (amplitude encoding) can require more total gates than more qubits (angle encoding) |

## Check yourself

A dataset has 8 continuous features per sample. How many qubits does angle encoding need versus amplitude encoding, and what specific question would you need to answer about the data before concluding amplitude encoding is actually the better practical choice?
