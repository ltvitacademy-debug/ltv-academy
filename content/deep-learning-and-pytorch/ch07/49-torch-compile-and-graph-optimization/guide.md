# torch.compile & Graph Optimization

Everything you've written so far runs in PyTorch's default "eager mode": each operation executes one at a time, exactly as Python calls it, which is wonderfully easy to debug but leaves a lot of speed on the table. `torch.compile` takes your existing model and, without you rewriting anything, captures its operations as a graph it can optimize and fuse — often for a meaningful speedup with a one-line change.

## What you'll learn

- What "graph optimization" means, in contrast to PyTorch's normal eager execution
- How to wrap a model with `torch.compile` and what actually happens the first time you call it
- The three common `mode` settings and when to reach for each
- Why the first call is slow and subsequent calls are fast

## Eager mode vs. a compiled graph

In eager mode, `model(inputs)` runs each layer's operations immediately, one Python call at a time. PyTorch has no visibility into what comes next, so it can't fuse operations together or eliminate redundant memory round-trips. `torch.compile` changes that: it traces your model's operations into a graph, hands that graph to TorchInductor (PyTorch's default compiler backend), and gets back optimized, often-fused kernels in return.

```python
model = MyModel().to("cuda")
compiled_model = torch.compile(model)

for inputs, targets in train_loader:
    output = compiled_model(inputs)
    loss = loss_fn(output, targets)
    loss.backward()
    optimizer.step()
    optimizer.zero_grad()
```

Nothing about your training loop changes — `compiled_model` is called exactly like `model` was. The optimization happens entirely underneath that call.

## Why the first iteration is slow

The first time `compiled_model(inputs)` actually runs, PyTorch has to trace the graph and compile it, which takes noticeably longer than a normal eager forward pass — sometimes many seconds. Every call after that reuses the compiled artifact and runs fast. This means `torch.compile` only pays off over enough iterations to amortize that one-time cost; it's not worth it for a script that runs a handful of forward passes and exits.

```python
import time

t0 = time.time()
compiled_model(inputs)        # slow: traces + compiles
print("first call:", time.time() - t0)

t0 = time.time()
compiled_model(inputs)        # fast: reuses compiled graph
print("second call:", time.time() - t0)
```

## Choosing a mode

`torch.compile(model, mode=...)` accepts a few presets that trade compile time for runtime speed:

```python
torch.compile(model)                          # "default" — balanced
torch.compile(model, mode="reduce-overhead")  # less Python/dispatch overhead per call
torch.compile(model, mode="max-autotune")     # longer compile, searches for the fastest kernels
```

`"default"` is the right starting point for most training loops. `"reduce-overhead"` helps when your model is small enough that Python and CUDA launch overhead dominate. `"max-autotune"` spends much more time compiling in exchange for the fastest possible kernels — usually worth it only for a model you'll run for a very long training job.

## A caveat: graph breaks

If your model's `forward()` contains Python control flow that depends on tensor *values* (not just shapes) — like a conditional based on a tensor's contents — `torch.compile` may hit a "graph break," falling back to eager execution for that portion. It still runs correctly; you just don't get the speedup for that section. Keeping forward passes free of data-dependent branching gets you the most benefit.

## Key terms

| Term | Meaning |
|---|---|
| Eager mode | PyTorch's default execution: each op runs immediately, one Python call at a time |
| `torch.compile` | Traces a model into a graph and compiles optimized kernels for it via TorchInductor |
| TorchInductor | `torch.compile`'s default backend compiler that generates the fused/optimized kernels |
| Graph break | A point where compiled execution falls back to eager mode, usually from data-dependent control flow |
