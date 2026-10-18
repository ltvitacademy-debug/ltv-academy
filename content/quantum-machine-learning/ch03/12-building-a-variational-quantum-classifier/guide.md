# Building a Variational Quantum Classifier

This lesson assembles everything from Chapters 2-3 into one named architecture: a Variational Quantum Classifier (VQC). Every piece — encoding, ansatz, measurement, loss, optimizer — has already been introduced individually; here they combine into a complete, working pipeline.

## What you'll learn

- The full VQC architecture as a single assembled pipeline
- How a measurement outcome becomes a class prediction, with a worked thresholding example
- How to compute a binary cross-entropy loss by hand for one sample
- Why a VQC is a template, not a single fixed algorithm — the design choices that vary between implementations

## The full pipeline, assembled

A Variational Quantum Classifier has exactly four stages, each one a lesson you've already seen:

1. **Encode** classical features x into a quantum state (Lesson 10's angle or amplitude encoding).
2. **Apply the ansatz** U(θ) — the trainable, parameterized circuit from Lesson 6.
3. **Measure** an observable (commonly Pauli-Z on one designated qubit) to get an expectation value ⟨Z⟩ ∈ [−1, 1] (Lesson 5).
4. **Convert to a prediction and compute loss**, then use the parameter-shift rule (Lesson 7) to get gradients and update θ with a classical optimizer (Lesson 2's gradient descent).

This is literally the same loop from the Variational Circuits Lab (Lesson 9), except now the encoding stage carries real classical features instead of being skipped, and the task is binary classification instead of hitting an arbitrary target value.

## From expectation value to class prediction

⟨Z⟩ lands somewhere in [−1, 1]. To get a class prediction, map it through a simple rule — commonly, rescale to a probability-like value in [0, 1]:

p = (⟨Z⟩ + 1) / 2

**Worked example**: suppose a trained circuit outputs ⟨Z⟩ = 0.6 for a given input. Then p = (0.6 + 1) / 2 = 1.6 / 2 = **0.8**. If the classification threshold is p ≥ 0.5 → class 1, this sample is predicted class 1 with 80% confidence.

A second example: ⟨Z⟩ = −0.2 gives p = (−0.2 + 1) / 2 = 0.8 / 2 = **0.4**, which is below the 0.5 threshold, so this sample is predicted class 0.

## Computing the loss for one sample, by hand

Binary cross-entropy loss for one sample with true label y and predicted probability p is:

L = −[y·log(p) + (1−y)·log(1−p)]

**Worked example**: true label y = 1, predicted p = 0.8 (from above). Since y = 1, the second term vanishes:

L = −log(0.8) ≈ −(−0.2231) = **0.2231**

A well-calibrated correct prediction (true label 1, predicted probability 0.8) gives a small, non-zero loss — exactly as expected, since cross-entropy only reaches zero loss at p = 1.0 for a true-label-1 sample. Compare: if the same true label 1 sample had been predicted at only p = 0.4 (a confidently wrong-leaning prediction), the loss would be −log(0.4) ≈ 0.9163 — more than 4× larger, correctly penalizing the worse prediction much more heavily.

## A VQC is a template, not one fixed algorithm

Every real VQC implementation (whether you build it in PennyLane or use Qiskit ML's prebuilt `VQC` class from Lesson 3) makes several independent design choices, each of which is itself a research question with no universally correct answer:

- **Which encoding** (angle, amplitude, basis — Lessons 10-11)
- **Which ansatz structure and depth** (how many layers, which entangling pattern — Lesson 6)
- **Which observable to measure** (single-qubit Z, or something more complex across multiple qubits — this choice also affects barren-plateau risk, Lesson 8)
- **Which classical optimizer** (plain gradient descent, Adam, or others — all still relying on parameter-shift gradients underneath)

This is why "I built a VQC" is the start of a technical conversation, not the end of one — the specific choices behind that VQC determine almost everything about how well, and how reliably, it will actually train.

## Key terms

| Term | Meaning |
|---|---|
| Variational Quantum Classifier (VQC) | The assembled pipeline: encode, apply ansatz, measure, convert to prediction, compute loss, update parameters |
| Binary cross-entropy loss | A loss function for binary classification penalizing confident wrong predictions much more than confident correct ones |
| Thresholding | Converting a continuous probability-like output into a discrete class prediction via a cutoff (e.g., p ≥ 0.5) |

## Check yourself

For a trained circuit outputting ⟨Z⟩ = −0.8 on a sample whose true label is y = 0, compute the predicted probability p and the binary cross-entropy loss. Is this a well-calibrated prediction?
