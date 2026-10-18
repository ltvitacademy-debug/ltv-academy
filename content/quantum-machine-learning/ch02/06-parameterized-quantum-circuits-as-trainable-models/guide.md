# Parameterized Quantum Circuits as Trainable Models

Lesson 5 built a one-qubit, one-parameter circuit. Real variational models need many qubits and many parameters, arranged in a repeating structure. This lesson generalizes to that multi-parameter case and introduces the layered ansatz pattern you'll reuse for the rest of the course.

## What you'll learn

- How single-qubit rotation layers and entangling layers combine into a multi-qubit ansatz
- Why entangling gates (like CNOT) are necessary for the model to capture correlations between features
- How parameter count scales with qubits and layers, and why that scaling matters practically
- What "circuit depth" means and why it's a cost, not a free source of expressiveness
- A worked example counting parameters for a specific small ansatz

## From one parameter to many: layers

A realistic ansatz repeats a pattern of two layer types, L times:

1. **Rotation layer**: apply a parameterized single-qubit rotation (RY, RX, or RZ) to every qubit. Each qubit's rotation angle is its own independent trainable parameter.
2. **Entangling layer**: apply two-qubit gates (most commonly CNOT, or a controlled rotation) between neighboring qubits, so information from one qubit's state can affect another's.

Stacking rotation-layer → entangling-layer → rotation-layer → entangling-layer... L times is the standard pattern, often called a "hardware-efficient ansatz" because it uses gates that are cheap to run on real NISQ hardware (as opposed to ansätze derived from a specific physics problem, which may need gates that are expensive on real chips).

## Why entangling gates are not optional

If you skip the entangling layers entirely, each qubit evolves completely independently — the circuit is mathematically equivalent to n separate single-qubit circuits running in parallel. That can only represent functions where each output depends on each input feature independently; it can never capture a relationship like "feature 1 and feature 2 together predict the label, but neither alone does." Entangling gates are what let the circuit represent genuinely multi-feature, correlated patterns — the quantum analogue of why a neural network needs more than one isolated neuron per input to model interactions between features.

## Counting parameters: a worked example

Take a 3-qubit ansatz with 2 layers, where each layer applies one RY rotation per qubit (ignoring entangling gates, which here use fixed CNOTs with no trainable angle):

- Parameters per rotation layer = number of qubits = 3
- Number of rotation layers = number of ansatz layers = 2
- Total trainable parameters = 3 × 2 = **6**

If instead each layer used two rotations per qubit (e.g., RY then RZ), the count doubles: 3 qubits × 2 rotations × 2 layers = **12** parameters. This is the exact same kind of accounting you'd do for a classical neural network's weight count — and just like a classical network, more parameters mean more expressiveness but also a harder optimization landscape (Lesson 8 covers exactly how this scaling creates a specific, serious obstacle for quantum circuits called barren plateaus).

## Circuit depth is a real cost, not just a modeling choice

"Depth" means the number of sequential gate layers a circuit needs — roughly, how long it takes to run and how much it's exposed to hardware noise. Unlike a classical neural network, where adding more layers mostly costs compute time and risk of overfitting, adding more layers to a NISQ circuit costs something more fundamental: *each additional gate is a new opportunity for a real hardware error to corrupt the state.* A deeper ansatz is not simply "a more powerful model you can choose to use if you have the compute budget" — on real hardware, depth has a noise cost that eventually overwhelms any benefit from extra expressiveness. This is one of the main reasons ansatz design on NISQ devices is a genuine, active research question rather than "just add more layers like a deep neural network."

## Key terms

| Term | Meaning |
|---|---|
| Hardware-efficient ansatz | A layered rotation + entangling-gate circuit structure chosen for cheap execution on real NISQ hardware |
| Entangling layer | A layer of two-qubit gates (e.g., CNOT) that lets qubits' states become correlated, enabling multi-feature patterns |
| Circuit depth | The number of sequential gate layers in a circuit; a rough proxy for runtime and noise exposure |
| Trainable parameter count | The total number of independent angles the classical optimizer adjusts during training |

## Check yourself

A 4-qubit ansatz uses 3 layers, with each layer applying both an RY and an RZ rotation to every qubit (no trainable angles in the entangling gates). How many total trainable parameters does this ansatz have, and how would that number change if you added a 4th layer?
