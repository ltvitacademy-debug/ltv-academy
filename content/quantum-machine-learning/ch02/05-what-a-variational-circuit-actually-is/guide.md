# What a Variational Circuit Actually Is

"Variational quantum circuit" is the single most important phrase in this course. This lesson builds it up piece by piece — state preparation, parameterized gates, measurement, and a classical feedback loop — using one concrete, small circuit you can trace by hand.

## What you'll learn

- The four-part anatomy of every variational circuit: encode, parameterize, measure, feed back
- How a single-qubit RY rotation works as a concrete trainable gate, with the exact state it produces
- What an "expectation value" measurement actually returns, computed by hand for a real example
- Why the circuit alone is not the model — the circuit plus the classical optimizer loop is
- How this connects to the term "variational," borrowed from the variational principle in physics

## The four-part anatomy

Every variational circuit in this course has the same skeleton:

1. **State preparation / encoding**: classical input data x is loaded into the circuit's initial state (Chapter 3 covers this in depth).
2. **Parameterized circuit (the "ansatz")**: a sequence of quantum gates whose rotation angles are trainable parameters θ, not fixed constants.
3. **Measurement**: the circuit is measured, producing an expectation value (or a sampled bit string) that becomes the model's output.
4. **Classical feedback loop**: a classical optimizer looks at how wrong the output was (the loss), computes how to adjust θ, and updates it — then the circuit runs again with new θ.

Steps 1-3 happen on the quantum device (real or simulated); step 4 happens entirely on a classical computer. This loop — quantum circuit evaluated, classical optimizer updates parameters, repeat — is exactly what "variational" means here, and it's also the training loop used for VQE (chemistry) and QAOA (optimization), not just ML.

## A concrete single-qubit circuit

Take the simplest possible variational circuit: one qubit, starting in |0⟩ = [1, 0], acted on by a single parameterized rotation gate RY(θ):

RY(θ)|0⟩ = [cos(θ/2), sin(θ/2)]

This is a real, exact quantum state for any θ — not an approximation. For θ = π/3 (60°):

- cos(π/6) ≈ 0.866
- sin(π/6) = 0.5

So RY(π/3)|0⟩ ≈ [0.866, 0.5]. Check normalization: 0.866² + 0.5² = 0.75 + 0.25 = 1.0 — exactly a valid quantum state, as it must be.

## Measuring an expectation value, worked by hand

Suppose we measure the Pauli-Z observable on this state. For a state [a, b] (with a, b real), the expectation value ⟨Z⟩ = a² - b². At θ = π/3:

⟨Z⟩ = 0.866² - 0.5² = 0.75 - 0.25 = **0.5**

In fact, for this specific circuit, ⟨Z⟩(θ) simplifies exactly to cos(θ) for any θ — you can verify cos(π/3) = 0.5, matching the hand calculation above. This single number, ⟨Z⟩, is the circuit's "output" — the thing a loss function compares against a target label. That one scalar is the entire interface between the quantum circuit and the rest of the classical ML pipeline from Lesson 2.

## The circuit is not the model — the loop is

A common misunderstanding: thinking the quantum circuit alone "is" the machine learning model. It isn't. A fixed circuit with fixed parameters is just a function that maps input to one number — like a frozen, untrained neural network. The *model*, in the ML sense, is the circuit **plus** the training procedure that adjusts θ based on data. Without the classical feedback loop (optimizer, loss function, data), you just have a static physics experiment, not a trainable classifier. Chapter 2's remaining lessons build out exactly that loop: Lesson 6 generalizes to multi-parameter circuits, Lesson 7 shows how to compute the gradient of ⟨Z⟩ with respect to θ without classical backpropagation, and Lesson 8 covers why that gradient can vanish as circuits grow.

## Why "variational"

The term borrows from the variational principle in physics: instead of solving a hard problem exactly, you propose a parameterized family of candidate solutions (here, quantum states reachable by the ansatz) and search over the parameters for the best one according to some objective. Whether the "best" is "lowest energy" (VQE), "best cut of a graph" (QAOA), or "most accurate classifier" (QML), the search procedure is structurally the same: parameterize, evaluate, adjust, repeat.

## Key terms

| Term | Meaning |
|---|---|
| Ansatz | The parameterized quantum circuit structure used as a trainable model |
| RY(θ) | A single-qubit rotation gate about the Y-axis of the Bloch sphere, with a trainable angle θ |
| Expectation value | The average measurement outcome of an observable (e.g., Pauli-Z) over many shots; the circuit's numeric "output" |
| Variational principle | The physics idea of searching over a parameterized family of states for the one optimizing some objective |
| Classical feedback loop | The part of training where a classical optimizer updates circuit parameters based on the loss |

## Check yourself

For the single-qubit circuit RY(θ)|0⟩ measured in the Z basis, what is ⟨Z⟩ when θ = 0, and what does that tell you about the state RY(0)|0⟩ produces? (Hint: RY(0) should do nothing at all to the state.)
