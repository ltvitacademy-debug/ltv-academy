# Integrating QML With PyTorch or TensorFlow

Lesson 19 described the hybrid loop conceptually. This lesson gets concrete about how that loop is actually implemented: treating a quantum circuit as one differentiable "layer" inside an otherwise ordinary PyTorch or TensorFlow model, using real library features named in Lesson 3.

## What you'll learn

- How PennyLane's `qml.qnn.TorchLayer` (and its TensorFlow equivalent) lets a QNode act as a neural network layer
- What a concrete hybrid model architecture looks like: classical layers feeding into a quantum layer feeding into more classical layers
- How gradients flow through the quantum layer during `.backward()`, and what's actually happening underneath
- Practical integration gotchas: data types, batching, and output shape mismatches

## The quantum circuit as a layer

PennyLane's `qml.qnn.TorchLayer` (and the analogous `KerasLayer` for TensorFlow) wraps a QNode so it behaves exactly like any other `torch.nn.Module` layer: it accepts a tensor input, returns a tensor output, and — critically — participates fully in PyTorch's autograd system, meaning calling `.backward()` on a loss that depends on this layer's output correctly computes gradients with respect to the circuit's parameters, using the parameter-shift rule under the hood rather than classical backpropagation through the quantum operations themselves (since, as Lesson 19 explained, there's no way to backprop through actual circuit execution).

## A concrete hybrid architecture

A typical small hybrid model for a classification task might look like:

1. **Classical linear layer**: raw input features (say, 8 numbers) → 2 numbers (a classical dimensionality reduction, exactly like any ordinary neural network layer).
2. **Quantum layer**: those 2 numbers get angle-encoded (Lesson 10) into a 2-qubit variational circuit (Chapter 2's ansatz), which outputs, say, 2 expectation values (one per qubit).
3. **Classical linear layer**: those 2 expectation values → 1 output number, passed through a sigmoid to get a final class probability.

Only the middle stage is quantum; stages 1 and 3 are ordinary classical neural network layers, trained with ordinary backpropagation. This is the realistic shape of most actual hybrid QML models in the literature and in practice — a small quantum "core" sandwiched between classical pre- and post-processing, rather than an all-quantum model end to end.

## How gradients flow through the boundary

During the backward pass, PyTorch's autograd reaches the quantum layer and needs its gradient. `TorchLayer` handles this by internally calling PennyLane's parameter-shift gradient computation (running the extra shifted circuit evaluations from Lesson 7) and returning that gradient to autograd as if it had been computed by ordinary backpropagation — autograd doesn't need to know, or care, that the actual computation underneath used a totally different method. This is the practical payoff of Lesson 7's careful derivation: it's precisely what makes "just drop a QNode into a PyTorch model" actually work, rather than requiring you to hand-write the hybrid loop from Lesson 19 yourself every time.

## Practical integration gotchas

Even with the library doing the heavy lifting, a few things reliably trip people up the first time:

- **Data types**: PennyLane circuits often expect specific tensor dtypes (e.g., `float64`) that may not match PyTorch's default `float32` — a mismatch here throws a type error, not a silently wrong answer, so it's at least easy to catch.
- **Batching**: quantum devices don't natively vectorize over a batch dimension the way classical GPU operations do — PennyLane's broadcasting support handles this for many devices, but mixing an unsupported device with batched input can silently fall back to looping over the batch one sample at a time, which works but is much slower than it looks.
- **Output shape**: forgetting that a 2-qubit circuit measuring 2 observables returns a 2-element output (not a scalar) is a common source of shape-mismatch errors in the very next classical layer.

## Key terms

| Term | Meaning |
|---|---|
| TorchLayer / KerasLayer | PennyLane wrappers that make a QNode behave as a standard PyTorch/TensorFlow layer, participating in autograd |
| Autograd | PyTorch's automatic differentiation system, which TorchLayer plugs into without needing to know the quantum gradient's underlying method |
| Hybrid "sandwich" architecture | A model with classical pre-processing layers, a small quantum core, and classical post-processing layers |

## Check yourself

Why does it matter, practically, that TorchLayer returns a parameter-shift-computed gradient to PyTorch's autograd "as if" it came from ordinary backpropagation — what would break if PennyLane instead required you to manually intercept the backward pass yourself every time?
