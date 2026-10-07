# When You Do (and Don't) Write Raw CUDA

You can now read and write a basic CUDA kernel. Here's the honest answer to the question that raises: as a PyTorch practitioner, how often will you actually do this? Almost never — and understanding why is just as important as the syntax itself.

## What you'll learn

- Why nearly all production ML code never calls `cudaMalloc` directly
- What cuBLAS and cuDNN are, and how PyTorch uses them
- The real reasons a team writes a custom kernel anyway
- How `torch.utils.cpp_extension` lets you drop raw CUDA into a PyTorch project when you need to

## PyTorch is already calling CUDA for you

Every `torch.matmul`, `torch.nn.Conv2d`, and `torch.nn.functional.softmax` call on a CUDA tensor is, underneath, a call into **cuBLAS** (NVIDIA's dense linear algebra library) or **cuDNN** (NVIDIA's deep learning primitives library — convolutions, pooling, normalization, attention). Both are written and tuned by NVIDIA engineers specifically for each GPU architecture, hand-optimized for warp occupancy, shared memory tiling, and tensor core usage in ways that take months of engineering to replicate.

```python
import torch
a = torch.randn(4096, 4096, device="cuda")
b = torch.randn(4096, 4096, device="cuda")
c = torch.matmul(a, b)   # calls into cuBLAS, not a hand-written kernel
```

Writing your own matrix multiply kernel to replace this line would almost certainly be slower than cuBLAS's, not faster — this is the single biggest reason to avoid raw CUDA for standard operations.

## When a custom kernel is actually worth it

Teams write raw CUDA (or use Triton, a Python-based kernel language, which is increasingly the more common path) when they need **fusion** — combining multiple operations into a single kernel to avoid writing intermediate results to global memory and reading them back:

```python
# Unfused: three separate kernel launches, three round-trips to global memory
y = torch.relu(x)
y = y * scale
y = y + bias

# A fused kernel does relu, multiply, and add in one pass over the data,
# reading x from global memory once and writing the result once.
```

This pattern — several small, memory-bound element-wise operations chained together — is exactly where a custom fused kernel earns its keep, because the bottleneck is memory traffic (Chapter 3 covers this directly), not compute, and fusing removes redundant trips to global memory.

## Dropping raw CUDA into a PyTorch project

When fusion or a genuinely novel operation justifies it, `torch.utils.cpp_extension` lets you compile a `.cu` file and call it from Python as if it were a native PyTorch op:

```python
from torch.utils.cpp_extension import load

fused_op = load(name="fused_op", sources=["fused_op.cu"])
output = fused_op.forward(x, scale, bias)
```

This is the realistic middle ground: you write the specific kernel that matters, and let PyTorch/cuBLAS/cuDNN handle everything else.

## Key terms

- **cuBLAS** — NVIDIA's dense linear algebra library (matrix multiply, etc.), used by `torch.matmul`
- **cuDNN** — NVIDIA's deep learning primitives library (convolution, pooling, normalization), used by `torch.nn` layers
- **Kernel fusion** — combining multiple operations into one kernel to avoid redundant global memory round-trips
- **Triton** — a Python-based language for writing custom GPU kernels, often preferred over raw CUDA C++ today
- **`torch.utils.cpp_extension`** — PyTorch's mechanism for compiling and calling custom CUDA code from Python
