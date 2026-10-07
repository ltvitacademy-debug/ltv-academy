# PyTorch Debugging Basics

Closing out Chapter 1, this lesson is less about new API and more about habits — the handful of checks that catch the overwhelming majority of PyTorch mistakes, usually in seconds instead of the hour you'd otherwise spend staring at a stack trace. Every bug you'll hit from here on tends to fall into one of a small number of categories, and you now have all the background (tensors, autograd, devices) to understand exactly why each one happens.

## What you'll learn

- How to read a shape-mismatch error and trace it back to its source
- The device-mismatch error from Lesson 3, revisited as a debugging target
- Why NaN losses happen and how to catch them early
- Using `print(tensor.shape)` and `assert` statements as cheap, effective tools
- A short checklist to run through before assuming a bug is something exotic

## Shape mismatches: the most common error of all

```python
x = torch.randn(32, 10)
w = torch.randn(20, 5)

y = x @ w
# RuntimeError: mat1 and mat2 shapes cannot be multiplied (32x10 and 20x5)
```

PyTorch's error message tells you exactly which two shapes it tried to combine and why it failed — read it literally. `(32x10) @ (20x5)` fails because matrix multiplication requires the inner dimensions to match (10 ≠ 20). The fix is almost always upstream: either `x` has the wrong number of features, or `w` was built with the wrong input size. `print(x.shape, w.shape)` right before the failing line will almost always tell you which one is wrong faster than reading code.

## Device mismatches: revisited

```python
# RuntimeError: Expected all tensors to be on the same device,
# but found at least two devices, cuda:0 and cpu!
```

As covered in Lesson 3, this means some tensor was never moved to the device the rest of your computation is on. The fix is always the same: find the tensor that's still on the wrong device (often a freshly created one without a `device=` argument, or a batch you forgot to `.to(device)`) and move it.

## Catching NaN losses early

A loss that turns into `nan` (not a number) partway through training is one of the most frustrating bugs because the stack trace doesn't point at the cause — it just reports the symptom many steps later.

```python
loss = criterion(output, target)

if torch.isnan(loss):
    print("NaN loss detected at step", step)
    print("output stats:", output.min().item(), output.max().item())
    raise RuntimeError("Training diverged")
```

Common causes of NaN losses: a learning rate that's too high (the update overshoots and diverges), dividing by zero somewhere in a custom loss, taking `log(0)` (common with cross-entropy on a probability that collapsed to exactly 0), or exploding gradients (covered properly in Chapter 3). Checking with `torch.isnan(loss)` or `torch.isnan(tensor).any()` right after computing a suspicious value turns a confusing eventual crash into an immediate, localized one.

## print(tensor.shape) and assert: your cheapest tools

Before reaching for a debugger, two plain tools solve most problems:

```python
print(x.shape, x.dtype, x.device)

assert x.shape == (32, 10), f"expected (32, 10), got {x.shape}"
assert not torch.isnan(loss), "loss is NaN"
```

Sprinkling `print(tensor.shape)` after every reshape or layer while developing a new model is not lazy — it's the single highest-value debugging habit in this entire course. An `assert` statement documents your assumption directly in the code and fails loudly, immediately, exactly where the assumption breaks, instead of letting a wrong shape silently propagate three layers deeper before something finally errors in a confusing way.

## A pre-flight checklist

When something isn't working and you're not sure why, check these in order before assuming the bug is something exotic:

1. Did you call `optimizer.zero_grad()` before `loss.backward()`?
2. Is the loss actually connected to the model's parameters (did you accidentally detach something, or forget `requires_grad=True`)?
3. Are all tensors involved in an operation on the same device?
4. Do the shapes going into each layer match what that layer expects?
5. Is the model in the right mode — `model.train()` vs. `model.eval()`?

In practice, the large majority of PyTorch bugs you'll encounter are one of these five things.

## Key terms

| Term | Meaning |
|---|---|
| Shape mismatch | An operation received tensors whose dimensions are incompatible |
| Device mismatch | An operation received tensors living on different devices |
| NaN loss | A loss value that became "not a number," usually from divergence or an invalid math operation |
| `torch.isnan()` | Returns a boolean tensor flagging NaN values, useful for early detection |
| Pre-flight checklist | A short, ordered list of the most common causes to check first |

## Recap

Most PyTorch bugs are shape mismatches, device mismatches, or NaN losses, and `print(tensor.shape)` plus a few well-placed `assert` statements catch the majority of them in seconds. That closes out Chapter 1 — you can now create tensors, track gradients, manage devices, write a training loop, load real data, and save your work. Up next, Chapter 2: building real neural networks with `nn.Module`.
