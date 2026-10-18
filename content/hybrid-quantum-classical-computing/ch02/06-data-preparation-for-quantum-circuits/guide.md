# Data Preparation for Quantum Circuits

Before any classical data reaches a quantum circuit, it has to be reshaped into something a circuit can actually accept: a fixed number of qubits, normalized amplitudes, or a specific gate-angle encoding. Getting this step wrong produces a circuit that runs without error and returns a confidently wrong answer.

## What you'll learn

- Why quantum circuits can't accept raw classical data the way a Python function can
- The two most common encoding strategies: amplitude encoding and angle encoding
- How to normalize a classical feature vector for amplitude encoding, with real arithmetic
- Why normalization has to happen in classical code, every time, with no exceptions
- How to decide how many qubits an encoding requires for a given feature count

## Why raw data can't go straight into a circuit

A quantum state vector has a hard mathematical constraint a plain array doesn't: its amplitudes, viewed as a vector, must have a squared magnitude summing to 1 (it must be a valid probability distribution over measurement outcomes). A classical feature vector like `[3, 1, 4, 1, 5, 9, 2, 6]` has no such constraint — its entries can be any real numbers. Before it can be loaded into a circuit as amplitudes, classical code has to transform it into a form that satisfies the circuit's actual physical constraints. This transformation is 100% classical computation; nothing about it happens on the QPU.

## What the circuit side of this looks like, for real

![A real encoding circuit from IBM Quantum](/courses/hybrid-quantum-classical-computing/ch02/06-data-preparation-for-quantum-circuits/ibm-bell-circuit.svg)
*A real circuit a normalized or scaled feature vector gets loaded into, gate by gate.*

![The same circuit, transpiled for a real backend](/courses/hybrid-quantum-classical-computing/ch02/06-data-preparation-for-quantum-circuits/ibm-transpiled-circuit.svg)
*The same circuit after optimization for a real backend — this is what actually ships to the QPU.*

![Amazon Braket notebook options](/courses/hybrid-quantum-classical-computing/ch02/06-data-preparation-for-quantum-circuits/aws-notebook-comparison.webp)
*Where this normalization code actually gets written and tested, before any circuit submission.*

## Amplitude encoding: packing data into qubit amplitudes

Amplitude encoding stores `n` classical values across the `log2(n)` qubits needed to index them, with each value becoming one amplitude of the quantum state. For 8 features, you need `log2(8) = 3` qubits. The classical preprocessing step is to **normalize** the vector so the sum of squared entries equals exactly 1:

```
raw vector:        [3, 1, 4, 1, 5, 9, 2, 6]
sum of squares:     3² + 1² + 4² + 1² + 5² + 9² + 2² + 6² = 173
norm = sqrt(173) =  13.1529
normalized vector = raw / norm
                   = [0.2281, 0.0760, 0.3041, 0.0760, 0.3801, 0.6843, 0.1521, 0.4562]
check: sum of squares of normalized vector = 1.000000  (exactly, by construction)
```

That normalized vector is what gets loaded as the circuit's 8 amplitudes across 3 qubits. If you skip normalization and feed the raw vector's values directly, the circuit preparation step will either fail outright (most SDKs validate this) or silently rescale in a way you didn't intend — either way, it's a classical bug, not a quantum one.

## Angle encoding: packing data into gate rotation angles

The alternative is simpler to implement but uses more qubits for the same amount of data: each classical feature value becomes the rotation angle of a single-qubit gate (commonly `RY` or `RZ`) applied to its own dedicated qubit. 8 features need 8 qubits (one per feature) instead of amplitude encoding's 3, but there's no normalization constraint to satisfy — any real number can be used directly as an angle (typically after scaling to a `[0, 2π]` or `[0, π]` range so the rotation behaves predictably across your feature range). This is the more common choice for near-term variational classifiers (Lesson 2's variational loop, applied to classification) specifically because it avoids the amplitude-encoding circuit's exponential gate-count overhead, trading qubit count for circuit simplicity.

## Choosing between them: a qubit-count and circuit-depth tradeoff

| Factor | Amplitude encoding | Angle encoding |
|---|---|---|
| Qubits needed for n features | `log2(n)` | `n` |
| Circuit depth to prepare | Can be exponential in qubit count for arbitrary vectors | Shallow — one rotation gate per qubit |
| Classical preprocessing required | Normalization to unit norm (mandatory) | Range scaling (recommended, not mathematically mandatory) |
| Common use case | Loading large, pre-normalized datasets (e.g., quantum kernel methods) | Near-term variational classifiers (fewer qubits available, depth matters more than qubit count) |

For a dataset of 1,000 features, amplitude encoding needs only `log2(1000) ≈ 10` qubits but a circuit whose depth can scale badly with the data's structure; angle encoding needs 1,000 qubits — far beyond what any near-term device offers for this use case — which is exactly why amplitude encoding dominates for larger feature counts despite its own depth cost.

## Key terms

| Term | Meaning |
|---|---|
| Amplitude encoding | Encoding classical data directly as the amplitudes of a quantum state, requiring the data be normalized to unit norm |
| Angle encoding | Encoding each classical feature as the rotation angle of a dedicated single-qubit gate |
| Normalization | Scaling a vector so the sum of its squared entries equals 1, a mandatory classical step before amplitude encoding |
| Unit norm constraint | The physical requirement that a quantum state vector's squared amplitudes sum to 1 |
| Feature scaling | Rescaling raw feature values into a bounded range (e.g., [0, 2π]) before angle encoding |

## Check yourself

You have a classical feature vector `[2, 2, 2, 2]`. Compute its normalized form for amplitude encoding by hand (show the sum of squares, the norm, and the resulting normalized vector), state how many qubits it needs, and verify the normalized vector's squared entries sum to 1.
