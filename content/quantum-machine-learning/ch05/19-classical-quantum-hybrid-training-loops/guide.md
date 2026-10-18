# Classical-Quantum Hybrid Training Loops

Nearly every practical QML system described in this course is, structurally, a classical program with a quantum circuit called as a subroutine. This lesson names that structure explicitly and traces exactly where control passes between classical and quantum code during training.

## What you'll learn

- The precise division of labor between the classical host program and the quantum circuit
- A step-by-step trace of one hybrid training iteration, naming which machine/process does each step
- Why this hybrid structure is a necessity, not a design preference, given current hardware
- What "the classical overhead of a hybrid loop" means concretely, and why it's a real cost to budget for

## The division of labor

In every lab so far (Lessons 9, 18), the "training loop" quietly mixed classical and quantum steps. Made explicit, a single hybrid training iteration looks like this:

1. **(Classical)** Load a batch of training data; encode it into circuit parameters/inputs.
2. **(Quantum)** Run the circuit — real hardware or simulator — with the current parameters θ, for each data sample (or batch), returning an expectation value.
3. **(Classical)** Compute the loss, comparing the circuit's output to the true label.
4. **(Quantum)** Run the circuit again at the shifted parameters θ±π/2 for every parameter, to get the parameter-shift gradient terms (Lesson 7).
5. **(Classical)** Assemble the full gradient from those shifted evaluations, and run one step of the classical optimizer (Adam, plain gradient descent, etc.) to update θ.
6. Repeat from step 1 with the new θ.

Every quantum step produces one number (or a small set of numbers) that gets handed back to classical code; every classical step produces new parameters that get handed back to the quantum circuit. This back-and-forth, every single iteration, is the "hybrid" in "hybrid classical-quantum training."

## Why this is necessary, not a preference

It would be convenient if the whole training loop could run entirely on quantum hardware, with no classical computer in the loop at all. That isn't possible with current approaches, for a specific reason: nothing about the parameter-shift rule or standard optimizers (gradient descent, Adam, etc.) has a known way to run as a quantum circuit — gradient aggregation and optimizer state updates (e.g., Adam's running averages of past gradients) are ordinary classical arithmetic, done on an ordinary classical computer, because that's the only hardware that currently does them efficiently. This is also why Chapter 1's framing of QML as "hybrid" rather than "fully quantum" is accurate, not a hedge: there is currently no such thing as an end-to-end quantum ML training loop with zero classical computation in it.

## The classical overhead is a real, budgetable cost

Every round-trip between the classical host and the quantum device (or simulator) costs real time — sending parameters to the device, waiting for circuit execution and measurement, and receiving results back. For a circuit with k parameters trained via parameter-shift, one full gradient step needs 2k quantum-side evaluations (Lesson 7) *plus* whatever classical-side computation assembles and applies them. On real cloud-accessed quantum hardware, each of those round trips can also mean queueing time behind other users' jobs — a cost that doesn't exist at all for a purely classical model training on local or cloud GPUs. This overhead is a genuine, practical reason training a variational model can take dramatically longer in wall-clock time than training a classical model of comparable "size," even before considering whether the quantum model's accuracy justifies that cost.

## Key terms

| Term | Meaning |
|---|---|
| Hybrid classical-quantum training loop | A training procedure where circuit evaluation happens on quantum hardware/simulator and optimization happens on a classical computer |
| Classical host program | The ordinary classical code (Python, typically) that orchestrates data loading, loss computation, and parameter updates around quantum circuit calls |
| Round-trip overhead | The time cost of sending parameters to a quantum device and receiving measurement results back, repeated every training iteration |
| Queueing time | Time spent waiting for a turn on shared, cloud-accessed real quantum hardware |

## Check yourself

A colleague says "we're building a fully quantum machine learning pipeline, with no classical computation anywhere in the loop." Based on this lesson, is that claim accurate for any currently practiced QML training approach — and what specific part of the loop would you point to as evidence either way?
