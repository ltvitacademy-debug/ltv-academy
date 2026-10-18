# Why Python for Quantum Computing

Every major quantum computing framework in production today — Qiskit, Cirq, PennyLane, Q# tooling, Amazon Braket's SDK — exposes its primary interface in Python, even though the actual quantum hardware and the heaviest numerical simulation run in compiled code underneath. Understanding why the field converged on Python, and where that choice stops making sense, is the foundation for everything else in this course.

## What you'll learn

- Why Python became the control-layer language for quantum hardware and simulators, not just a convenience choice
- How the scientific Python stack (NumPy, SciPy, Matplotlib) maps onto quantum computing tasks
- Which major quantum SDKs are Python-based, and what each is typically used for
- Why Python's reputation for being "slow" doesn't apply to the numerical core of quantum simulation
- A first look at representing and measuring a qubit state with NumPy

## Python as the control layer, not the compute engine

A real quantum program has two very different jobs happening at once: describing *what* circuit to run (which gates, in what order, on which qubits) and actually *computing* the result, whether that's simulating the physics on a classical computer or sending pulses to real superconducting qubits. Python owns the first job almost universally. It is the language you use to build a circuit object, call `.run()`, and inspect results. The second job — the actual linear algebra, or the real-time control electronics — is handled by compiled C, C++, Fortran, or custom FPGA/ASIC logic that Python calls into. This split is deliberate: Python is easy to read, fast to iterate in, and has a huge ecosystem, while the performance-critical numerical work lives in libraries written in faster languages and merely *exposed* to Python.

## The scientific Python stack quantum computing depends on

Three libraries do almost all of the non-framework-specific heavy lifting in this course and in real quantum software:

- **NumPy** — array storage and linear algebra (vectors, matrices, Kronecker products, eigendecompositions). A quantum state is a vector; a quantum gate is a matrix. NumPy is how both get represented and manipulated in Python.
- **SciPy** — builds on NumPy for more specialized numerical routines: sparse matrices (important once you simulate more than ~20 qubits, where dense state vectors become too large), optimization (used in variational quantum algorithms), and signal processing.
- **Matplotlib** — visualization: probability histograms from measurement results, Bloch sphere plots, convergence curves for optimization loops. Chapter 4 of this course is dedicated to this.

None of these three libraries know anything about quantum mechanics. They are general-purpose numerical and plotting tools. Quantum-specific meaning gets layered on top by the SDKs below.

## The Python-based quantum SDK landscape

- **Qiskit** (IBM) — the most widely used open-source SDK for building and running circuits on IBM's real quantum hardware and simulators.
- **Cirq** (Google) — a lower-level, NumPy-adjacent framework associated with Google's superconducting qubit research.
- **PennyLane** (Xanadu) — focused on differentiable quantum programming, built specifically for hybrid quantum-classical machine learning workflows alongside PyTorch/TensorFlow/JAX.
- **Amazon Braket SDK** — Amazon's Python interface for running circuits across multiple hardware providers (IonQ, Rigetti, and others) through a single cloud service.

You will not install any of these SDKs in this chapter. The point of Chapter 1 is to make sure the *plain* Python and NumPy skills underneath all of them are solid first — every one of these frameworks assumes you are already fluent with arrays, classes, and functions before you ever call `qiskit.QuantumCircuit()`.

## Why "Python is slow" doesn't block this

Python itself — the interpreter looping over individual elements — is indeed slow compared to compiled languages. But the numerical core of NumPy is not: when you write `A @ B` for two NumPy arrays, Python itself does almost no work. It calls into BLAS/LAPACK, decades-old, heavily optimized linear algebra libraries written in Fortran and C, and the loop that actually multiplies numbers runs entirely outside the Python interpreter. The rule that makes scientific Python viable is: **push the loop into NumPy, don't write the loop in Python.** A function that calls `np.dot()` once on a 1000-element array is dramatically faster than a Python `for` loop that touches 1000 elements one at a time — the array call is where the real work gets vectorized into compiled code.

## A first taste: a qubit state in NumPy

A single qubit's state is a 2-element complex vector `[alpha, beta]`, where `|alpha|^2` is the probability of measuring `0` and `|beta|^2` is the probability of measuring `1`. Applying a gate is just matrix-vector multiplication. Here is the Hadamard gate — the gate that puts a qubit into an equal superposition — applied to the starting state `|0>`:

```python
import numpy as np

# |0> as a column vector
psi0 = np.array([1, 0], dtype=complex)

# The Hadamard gate
H = (1 / np.sqrt(2)) * np.array([[1,  1],
                                  [1, -1]], dtype=complex)

psi1 = H @ psi0
probabilities = np.abs(psi1) ** 2

print(psi1)           # [0.70710678+0.j 0.70710678+0.j]
print(probabilities)  # [0.5 0.5]
```

Both entries of `psi1` come out to `0.70710678` (that is, `1/sqrt(2)`), and squaring their magnitudes gives `0.5` and `0.5` — a 50/50 chance of measuring `0` or `1`. You didn't write a loop anywhere in that example; `H @ psi0` is a single vectorized matrix-vector product, computed by the same BLAS machinery described above. This exact pattern — state vector in, matrix multiply, probabilities out — is the mechanical core of every gate-based quantum simulator you'll build in this course, long before any quantum-specific SDK gets involved.

## Key terms

| Term | Meaning |
|---|---|
| Control layer | The part of a quantum software stack responsible for describing and orchestrating what runs, as opposed to performing the actual computation or hardware control |
| BLAS / LAPACK | Long-standing, highly optimized compiled linear algebra libraries that NumPy calls into for operations like matrix multiplication |
| Vectorization | Expressing a computation as whole-array operations (e.g. `H @ psi0`) instead of an explicit Python loop, so the work runs in compiled code |
| State vector | The array of complex amplitudes describing a quantum system; squaring each amplitude's magnitude gives a measurement probability |
| Quantum SDK | A Python framework (Qiskit, Cirq, PennyLane, Braket SDK) that adds circuit-building and hardware/simulator execution on top of general numerical libraries |

## Check yourself

If Python the language is slow at looping over individual values, why doesn't that slowness show up when NumPy multiplies a Hadamard gate matrix by a state vector? Explain what actually executes when you write `H @ psi0`.
