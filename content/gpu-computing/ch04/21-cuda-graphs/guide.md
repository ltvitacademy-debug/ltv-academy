# CUDA Graphs

Every kernel launch has CPU-side overhead — the driver has to set up and dispatch each one, even if the kernel itself finishes in microseconds. For a training step made of hundreds of small kernel launches, that overhead can add up to a meaningful fraction of total time. CUDA Graphs let you capture a whole sequence of launches once and replay it as a single operation, amortizing that overhead away.

## What you'll learn

- Why per-kernel launch overhead becomes significant for workloads with many small kernels
- How CUDA Graph capture and replay works at a conceptual level
- The static-shape constraint that CUDA Graphs impose, and why it exists
- How `torch.cuda.graph` fits into a PyTorch training loop

## The problem: launch overhead adds up

Launching a kernel isn't free — the CPU has to prepare the launch configuration and hand it to the GPU's command queue, and that round trip takes real, fixed time regardless of how small the kernel's actual work is. A model with many small ops (common in some architectures, and in any model with lots of elementwise and normalization layers) can spend a surprising fraction of a training step just launching kernels, rather than running them, especially once mixed precision and other optimizations have already shrunk the actual compute time.

## Capture once, replay many times

A CUDA Graph records the entire sequence of kernel launches, memory operations, and their dependencies as a single graph structure, which can then be launched as one unit — one CPU-side dispatch instead of hundreds:

```python
static_input = torch.randn(32, 3, 224, 224, device="cuda")
static_target = torch.randint(0, 1000, (32,), device="cuda")

# Warm-up iterations in a side stream before capture (required by PyTorch)
s = torch.cuda.Stream()
s.wait_stream(torch.cuda.current_stream())
with torch.cuda.stream(s):
    for _ in range(3):
        optimizer.zero_grad(set_to_none=True)
        y = model(static_input)
        loss = loss_fn(y, static_target)
        loss.backward()
        optimizer.step()
torch.cuda.current_stream().wait_stream(s)

g = torch.cuda.CUDAGraph()
optimizer.zero_grad(set_to_none=True)
with torch.cuda.graph(g):
    static_y = model(static_input)
    static_loss = loss_fn(static_y, static_target)
    static_loss.backward()
    optimizer.step()

# Replay: each call runs the entire captured sequence as one launch
for data, target in loader:
    static_input.copy_(data)
    static_target.copy_(target)
    g.replay()
```

Each `g.replay()` call re-runs the exact same sequence of operations against the (now updated) static tensors — the CPU issues one launch for the whole graph instead of one per kernel inside it.

## The static-shape constraint

This speed comes with a real restriction: a captured graph replays the exact same kernels against the exact same memory addresses every time. Input and output tensors must keep the same shape, dtype, and (ideally) the same underlying memory across every replay — which is why the pattern above copies new data *into* `static_input` rather than reassigning it to a new tensor. Any operation whose control flow or shape depends on the actual data (a dynamic sequence length, a data-dependent branch) can't be captured as-is, since the graph has no way to re-decide that path on replay.

## When it's worth using

CUDA Graphs help most when kernel launch overhead is a meaningful fraction of step time — many small kernels, a model already optimized with mixed precision, or a tight inference loop with fixed batch size. They help least for a model dominated by a few large kernels, where launch overhead was never the bottleneck to begin with. In practice, `torch.compile`'s `"reduce-overhead"` mode (next lesson) automates much of this capture-and-replay pattern for you.

## Key terms

- **Kernel launch overhead** — the fixed CPU-side cost of dispatching a kernel, independent of the kernel's actual runtime
- **CUDA Graph** — a captured, replayable sequence of kernel launches and their dependencies
- **Capture** — recording operations run inside a `torch.cuda.graph` context into a graph instead of executing them normally
- **Replay** — re-executing a captured graph as a single CPU-side dispatch
- **Static tensor** — an input/output tensor whose shape and memory address must stay fixed across replays
- **`torch.cuda.CUDAGraph`** — PyTorch's object representing a captured graph, invoked via `.replay()`
