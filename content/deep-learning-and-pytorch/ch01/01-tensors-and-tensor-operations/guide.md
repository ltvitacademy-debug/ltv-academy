# Tensors & Tensor Operations

Welcome to Deep Learning & PyTorch, the first course in the AI/ML Research Engineer & Alignment Engineer destination. Everything you build for the rest of this course — every layer, every loss, every gradient — is ultimately just arithmetic on one data structure: the **tensor**. This lesson builds a solid, hands-on foundation in what a tensor is, how to create one, and how to manipulate its shape and values, because every bug you'll ever chase in PyTorch eventually comes down to a tensor having the wrong shape, dtype, or device.

## What you'll learn

- What a `torch.Tensor` is and how it differs from a plain Python list or NumPy array
- The main ways to create tensors: `torch.tensor`, `torch.zeros`, `torch.ones`, `torch.randn`, `torch.arange`
- The three attributes every tensor carries: `shape`, `dtype`, and `device`
- How to index, slice, and reshape tensors with `view` and `reshape`
- How broadcasting lets PyTorch combine tensors of different shapes, and how matrix multiplication works

## What a tensor actually is

A `torch.Tensor` is a multi-dimensional array, the PyTorch equivalent of a NumPy `ndarray`, with two extra superpowers: it can live on a GPU, and it can track the operations performed on it for automatic differentiation (the subject of the next lesson). A scalar is a 0-dimensional tensor, a vector is 1-dimensional, a matrix is 2-dimensional, and a batch of images is typically a 4-dimensional tensor. PyTorch doesn't care how many dimensions you use — the same operations apply uniformly.

## Creating tensors

```python
import torch

# From existing data
a = torch.tensor([[1, 2, 3], [4, 5, 6]])

# Filled with a constant
zeros = torch.zeros(2, 3)
ones = torch.ones(2, 3)

# Random values
randn = torch.randn(2, 3)       # standard normal
rand = torch.rand(2, 3)         # uniform [0, 1)

# A range of values
r = torch.arange(0, 10, step=2)  # tensor([0, 2, 4, 6, 8])

# Same shape as another tensor
like_zeros = torch.zeros_like(a)
```

`torch.tensor(...)` copies whatever Python data you hand it. `torch.zeros`, `torch.ones`, `torch.randn`, and `torch.rand` all take a shape as positional arguments. The `_like` variants (`zeros_like`, `ones_like`, `randn_like`) are useful when you need a new tensor that matches another tensor's shape and dtype without typing the shape out again.

## The three attributes that matter most

Every tensor carries three attributes you will check constantly while debugging:

```python
a = torch.randn(2, 3)

a.shape    # torch.Size([2, 3]) -- same as a.size()
a.dtype    # torch.float32 -- the element type
a.device   # device(type='cpu') -- where the data physically lives
```

`shape` tells you the dimensions. `dtype` tells you the numeric type — `torch.float32` is the default for most operations, but you'll also see `torch.int64` (the default for `torch.tensor([1, 2, 3])`), `torch.float16`, and `torch.bool`. `device` tells you whether the tensor lives on the CPU or a GPU; operations between tensors on different devices raise an error, which is why Lesson 3 is dedicated entirely to devices.

## Indexing, slicing, and reshaping

Indexing and slicing work almost exactly like NumPy:

```python
a = torch.arange(12).reshape(3, 4)

a[0]          # first row
a[:, 1]       # second column, all rows
a[1, 2]       # single element as a 0-dim tensor
a[a > 5]      # boolean mask -- all elements greater than 5
```

Reshaping changes how a tensor's data is viewed without changing the underlying values:

```python
a = torch.arange(12)

a.view(3, 4)      # reshape, requires the data to be contiguous in memory
a.reshape(3, 4)   # like view, but falls back to copying if needed
a.unsqueeze(0)    # insert a new dimension of size 1 at position 0 -> shape (1, 12)
a.squeeze()       # remove all dimensions of size 1
```

Use `reshape` when you're not sure whether the tensor is contiguous — it's the safer default. `unsqueeze` and `squeeze` come up constantly when you need to add or remove a batch dimension to match what a layer expects.

## Broadcasting and matrix multiplication

Broadcasting lets you combine tensors of different (but compatible) shapes without writing an explicit loop:

```python
a = torch.ones(3, 4)
b = torch.tensor([1.0, 2.0, 3.0, 4.0])   # shape (4,)

c = a + b   # b is broadcast across every row -> shape (3, 4)
```

Two shapes are broadcastable when, comparing dimensions from the right, each pair is either equal or one of them is 1. Elementwise operators (`+`, `-`, `*`, `/`) use broadcasting; matrix multiplication does not — it has its own rule.

```python
x = torch.randn(3, 4)
w = torch.randn(4, 5)

y = x @ w              # matrix multiplication, shape (3, 5)
y2 = torch.matmul(x, w)  # identical to x @ w
```

`x * w` would fail here (incompatible shapes for elementwise multiply); `x @ w` is the matrix product, and it's the operation underneath every linear layer you'll build starting in Chapter 2.

## Key terms

| Term | Meaning |
|---|---|
| `torch.Tensor` | PyTorch's multi-dimensional array; can live on CPU or GPU and track gradients |
| `shape` | The size of each dimension, e.g. `torch.Size([3, 4])` |
| `dtype` | The element type, e.g. `torch.float32`, `torch.int64` |
| `device` | Where the tensor's data lives: `cpu` or `cuda` |
| Broadcasting | Rule for combining differently-shaped tensors elementwise without an explicit loop |
| `view` / `reshape` | Change a tensor's shape without changing its data |

## Recap

A tensor is a multi-dimensional array with a shape, a dtype, and a device, and nearly every PyTorch bug you'll hit traces back to one of those three being wrong. You now know how to create tensors, inspect them, reshape them, and combine them with broadcasting and matrix multiplication. Next up, Lesson 2: autograd, where PyTorch starts tracking what you do to tensors so it can compute gradients automatically.
