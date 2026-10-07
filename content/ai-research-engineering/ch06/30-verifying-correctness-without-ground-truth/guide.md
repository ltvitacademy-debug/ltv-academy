# Verifying Correctness Without Ground Truth

Most software testing assumes you know the right answer: you call a function, compare the output to an expected value, and pass or fail. Research code frequently breaks that assumption — you're implementing a new loss function, a new attention variant, or a custom gradient, and there is no existing "correct" output to compare against. This lesson covers the actual techniques researchers use to gain confidence in an implementation when there's no labeled answer key: analytical special cases, gradient checking, invariance tests, and comparison against a simpler reference implementation.

## What you'll learn

- Reducing a complex implementation to a special case with a known analytical answer
- Numerical gradient checking as a way to verify a custom backward pass
- Invariance and equivariance tests that don't require knowing the "right" output, only a known relationship between outputs
- Comparing a fast, complex implementation against a slow, simple one on the same input

## Reduce to a case with a known answer

The most broadly useful technique is finding a special case of your general implementation where the correct answer is analytically known, even if the general case isn't. If you're implementing a custom attention variant, check it against standard self-attention when the variant's extra parameter is set to make it mathematically equivalent. If you're implementing a new regularizer, check that it evaluates to exactly zero when the input satisfies the condition the regularizer is supposed to penalize. If you're implementing a KL-divergence-based loss, check that it returns exactly zero when the two distributions being compared are identical:

```python
import torch

p = torch.softmax(torch.randn(10), dim=0)
kl = my_custom_kl_divergence(p, p)   # same distribution compared to itself
assert torch.allclose(kl, torch.tensor(0.0), atol=1e-6), f"KL(p,p) should be ~0, got {kl}"
```

## Gradient checking for custom backward passes

If you've written a custom `autograd.Function` with a manual backward pass, the standard way to verify it is correct — independent of any task-level metric — is `torch.autograd.gradcheck`, which numerically estimates the gradient via finite differences and compares it to your analytical gradient:

```python
from torch.autograd import gradcheck

x = torch.randn(4, 4, dtype=torch.double, requires_grad=True)  # double precision for accuracy
test = gradcheck(MyCustomFunction.apply, (x,), eps=1e-6, atol=1e-4)
assert test  # raises if the numerical and analytical gradients disagree beyond tolerance
```

This test doesn't need to know what the "right" output of your function is at all — it only checks internal consistency between your forward and your backward. A custom backward that fails `gradcheck` is definitively wrong, regardless of whether training with it happened to look reasonable.

## Invariance and equivariance tests

Many models are supposed to have a specific symmetry — a property that doesn't require knowing a single correct output, only a known relationship between two outputs. A model that should be permutation-invariant over a set of inputs should produce the same output when the input order is shuffled; a translation-equivariant convolution should produce a correspondingly shifted output when the input is shifted:

```python
x = torch.randn(1, 10, 32)             # batch, set-size, features
perm = torch.randperm(10)

out1 = model(x)
out2 = model(x[:, perm, :])             # same elements, shuffled order

assert torch.allclose(out1, out2, atol=1e-5), "model should be permutation-invariant over the set dim"
```

If this assertion fails, you've found a real bug — somewhere, the implementation is depending on order when it shouldn't, even though you still don't know what the "correct" numerical output is for any single input.

## Overfit a tiny, hand-constructed example

A model, loss, and training loop that are all implemented correctly should be able to drive the loss to near-zero on a tiny dataset — a handful of examples, sometimes just one — within a small number of steps. This doesn't verify generalization, but it does verify that gradients are flowing, the loss is wired to the right parameters, and nothing in the pipeline is silently broken:

```python
tiny_batch = next(iter(loader))
for step in range(200):
    optimizer.zero_grad()
    loss = compute_loss(model, tiny_batch)
    loss.backward()
    optimizer.step()
print(f"Final loss on 1 batch after 200 steps: {loss.item():.6f}")
# Should be near zero. If it isn't, something upstream of "does it generalize"
# is already broken, and no amount of full-dataset training will fix it.
```

## Compare against a slower, simpler reference implementation

When a fast implementation (vectorized, fused, or using a specialized kernel) exists alongside a naive one, run both on small, identical inputs and compare outputs directly. This is especially common when implementing a custom CUDA kernel or a hand-optimized attention variant against PyTorch's reference `nn.functional.scaled_dot_product_attention`: the naive loop-based version is slow but easy to trust is correct, and agreement between the two on small inputs is strong evidence the fast version is right.

## Key terms

- **Special-case reduction** — testing a general implementation against a narrower case where the correct output is analytically known
- **Gradient checking (`gradcheck`)** — numerically estimating a gradient via finite differences and comparing it to a custom backward pass's analytical gradient
- **Invariance/equivariance test** — verifying a known relationship between two outputs (e.g., permutation invariance) rather than checking against a single correct value
- **Overfitting a tiny batch** — driving the loss to near-zero on a handful of examples to verify the training pipeline is wired correctly, independent of generalization
