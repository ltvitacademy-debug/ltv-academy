# torch.compile Under the Hood

One line — `model = torch.compile(model)` — can meaningfully speed up a PyTorch model without touching a single layer. It isn't magic; it's a compiler pipeline doing, automatically, a version of what you'd otherwise do by hand: capturing a graph, fusing kernels, and in some modes, generating CUDA graphs. Knowing the pipeline's three stages tells you what to expect and why the first call is always slow.

## What you'll learn

- The three-stage pipeline behind `torch.compile`: TorchDynamo, AOTAutograd, and TorchInductor
- Why the first call to a compiled model is slow, and subsequent calls are fast
- What a "graph break" is and why it can limit the speedup
- What the `"reduce-overhead"` and `"max-autotune"` modes actually trade off

## The three stages

```python
model = MyModel().to(device)
model = torch.compile(model)              # default mode, default backend

for inputs, labels in loader:
    inputs, labels = inputs.to(device), labels.to(device)
    outputs = model(inputs)               # first call: slow (compiling)
    loss = loss_fn(outputs, labels)       # later calls: fast (cached compiled kernels)
    loss.backward()
```

1. **TorchDynamo** traces your Python/PyTorch code as it actually executes, capturing the sequence of tensor operations into an intermediate graph — without requiring you to rewrite your model in a restricted subset of Python.
2. **AOTAutograd** takes that forward-pass graph and ahead-of-time derives the corresponding backward-pass graph, so both forward and backward can be optimized together instead of autograd building the backward graph op-by-op at runtime.
3. **TorchInductor** compiles both graphs down to optimized kernels — generating Triton kernels for GPU targets — fusing adjacent operations (an elementwise chain becomes one kernel instead of several) wherever the dependency structure allows it.

## Why the first call is slow

Compilation happens lazily, triggered by the first actual forward pass with real input shapes — this is why the first iteration of a compiled training loop is noticeably slower than normal eager execution, and every iteration after that is faster. If input shapes change (a different batch size, say), Dynamo may need to recompile for the new shape, paying that cost again.

## Graph breaks

TorchDynamo can only trace standard tensor operations into its graph. Python control flow that depends on actual tensor *values* (not just shapes), unsupported library calls, or certain data-dependent branches force a **graph break** — Dynamo falls back to eager execution for that piece of code, then resumes tracing afterward. A model with frequent graph breaks ends up as several small compiled graphs stitched together with eager-mode gaps, which caps how much speedup compilation can deliver. Fewer, larger graph breaks compiled regions generally means faster code.

## Choosing a mode

```python
model = torch.compile(model, mode="reduce-overhead")   # uses CUDA graphs internally
model = torch.compile(model, mode="max-autotune")       # tries more kernel variants, slower to compile
```

- **`"default"`** balances compile time against runtime speedup for general use.
- **`"reduce-overhead"`** layers CUDA Graph capture (Lesson 21) on top of the compiled kernels, targeting exactly the launch-overhead problem — most useful for models with many small ops.
- **`"max-autotune"`** searches a larger space of kernel configurations (block sizes, tiling strategies) for TorchInductor to try, trading much longer compile time for potentially faster steady-state kernels — best for long training runs where the extra compile time amortizes away.

## Key terms

- **TorchDynamo** — traces executing Python/PyTorch code into an intermediate graph representation
- **AOTAutograd** — derives the backward-pass graph ahead of time from the traced forward graph
- **TorchInductor** — the backend compiler that generates optimized (Triton, on GPU) kernels from the graph, fusing operations
- **Graph break** — a point where Dynamo falls back to eager execution because it can't trace further
- **Lazy compilation** — compilation triggered by the first real forward pass, not at the `torch.compile()` call itself
- **`mode="reduce-overhead"`** — a compile mode that layers CUDA Graphs on top of compiled kernels
