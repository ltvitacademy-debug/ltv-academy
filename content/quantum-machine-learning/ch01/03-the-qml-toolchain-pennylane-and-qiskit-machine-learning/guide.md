# The QML Toolchain: PennyLane & Qiskit Machine Learning

Every circuit, gradient, and training loop in this course runs through one of two real, actively maintained open-source libraries. Knowing what each one is actually for — and where they overlap — will save you from fighting the wrong tool later.

## What you'll learn

- What PennyLane is designed for, and why it treats quantum circuits as differentiable functions
- What Qiskit Machine Learning adds on top of IBM's Qiskit, and how it differs in emphasis from PennyLane
- How both libraries let you simulate circuits classically before ever touching real hardware
- The shared vocabulary (device, QNode/estimator, ansatz) you'll see in every later lab
- Why this course runs everything in simulation, and what that honestly does and doesn't tell you

## PennyLane: quantum circuits as differentiable functions

PennyLane (built by Xanadu) is a Python library whose core idea is to treat a quantum circuit as a function you can differentiate, the same way you'd differentiate a layer in PyTorch or TensorFlow. Its central object is a **QNode**: a quantum circuit bound to a **device** (a simulator, or a real backend from a hardware provider). Once defined, a QNode behaves like a regular differentiable Python function — you can compute its gradient with respect to circuit parameters using `qml.grad`, and that gradient computation uses, under the hood, exactly the parameter-shift rule you'll derive by hand in Lesson 7.

PennyLane's biggest design choice is interoperability: it plugs directly into PyTorch, TensorFlow, and JAX, so a variational circuit can sit as one "layer" inside an otherwise ordinary classical neural network. That's the foundation for Chapter 5's hybrid training loops.

## Qiskit Machine Learning: QML built on IBM's Qiskit

Qiskit Machine Learning is IBM's QML library, built on top of the core Qiskit SDK. Its emphasis is slightly different from PennyLane's: it ships ready-made, higher-level building blocks specifically for ML tasks —

- `EstimatorQNN` and `SamplerQNN`: wrappers that turn a parameterized circuit plus an observable into something that looks like a regular ML model with a `.forward()`/`.backward()`-style interface
- `VQC` (Variational Quantum Classifier): a prebuilt classifier combining a feature map, an ansatz, and an optimizer into one object
- `FidelityQuantumKernel`: a prebuilt quantum kernel (Chapter 3) you can hand directly to scikit-learn's `SVC`

Where PennyLane expects you to assemble the hybrid loop yourself (which is pedagogically useful — you can't skip understanding the parts), Qiskit ML leans toward packaged components that match scikit-learn's familiar `.fit()` / `.predict()` interface, which is convenient once you already understand what's happening underneath.

## Shared vocabulary

Both libraries converge on the same underlying concepts, just with different names:

| Concept | PennyLane term | Qiskit ML term |
|---|---|---|
| Where the circuit actually runs | Device | Backend / Estimator / Sampler |
| The trainable circuit structure | Ansatz | Ansatz (same term) |
| Turning data into a quantum state | Encoding / embedding template | Feature map |
| The circuit-as-a-function object | QNode | EstimatorQNN / SamplerQNN |

Learning either library's documentation will make the other's far easier to read, because the underlying math (state preparation, ansatz, measurement, parameter-shift gradients) is identical — only the API surface differs.

## Simulation first — and what that does and doesn't prove

Every lab in this course runs on a classical simulator (PennyLane's `default.qubit` device, or Qiskit's `AerSimulator`), not real quantum hardware. This is a deliberate, honest choice, not a shortcut:

- **What simulation gives you**: an exact, noise-free (or controllably noisy) environment to learn how variational training actually behaves — convergence, gradient estimation, encoding choices — without burning real quantum-hardware time or paying per-shot costs.
- **What simulation does NOT prove**: that a technique will work the same way on real NISQ hardware. Real devices add gate errors, readout errors, and decoherence that can meaningfully change — and often worsen — training behavior, especially the barren-plateau effects covered in Lesson 8. A result that trains cleanly in simulation is not evidence it will train cleanly on a real chip.

Treat every "it worked" in this course's labs as "it worked in a noise-free simulation of a small circuit" — a necessary first step for learning the mechanics, not a claim about real-hardware performance.

## Key terms

| Term | Meaning |
|---|---|
| QNode | PennyLane's object representing a quantum circuit as a differentiable function bound to a device |
| Device (PennyLane) | The simulator or hardware backend a QNode runs on |
| EstimatorQNN / SamplerQNN | Qiskit Machine Learning wrappers that expose a parameterized circuit as an ML-model-like object |
| Ansatz | The parameterized circuit structure (gate layout) used as the trainable part of a variational model |
| Feature map | A circuit that encodes classical data into a quantum state (Qiskit ML's term for an encoding template) |

## Check yourself

If a lab in this course reports that a variational classifier "trained successfully" using `default.qubit` in PennyLane, what specific claim are you entitled to make — and what claim would be overreaching — about how that same circuit would behave on real NISQ hardware?
