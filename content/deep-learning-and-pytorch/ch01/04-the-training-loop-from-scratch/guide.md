# The Training Loop, From Scratch

You now have the three ingredients: tensors, autograd, and devices. This lesson assembles them into the pattern you will type, in some form, in every single PyTorch project for the rest of your career: the training loop. We'll build one from scratch for a tiny linear regression problem, without using `nn.Module` or `torch.optim` yet — Chapter 2 formalizes those. Seeing the raw mechanics once makes everything that wraps them afterward make sense.

## What you'll learn

- The five steps every training loop repeats: forward, loss, zero gradients, backward, update
- How to write a manual parameter update using `torch.no_grad()`
- Why the update step must not be tracked by autograd
- How to watch the loss to confirm training is actually working
- The vocabulary: epoch, iteration, forward pass, backward pass

## The problem: fit a line

We'll fit `y = w * x + b` to noisy synthetic data generated from a known `w` and `b`, so we can check that training recovers values close to the originals.

```python
import torch

torch.manual_seed(0)
x = torch.linspace(-5, 5, 100).unsqueeze(1)
true_w, true_b = 2.5, -1.0
y = true_w * x + true_b + 0.3 * torch.randn_like(x)

w = torch.randn(1, requires_grad=True)
b = torch.randn(1, requires_grad=True)
lr = 0.01
```

`w` and `b` are our two learnable parameters, initialized randomly, both tracked by autograd.

## The five-step loop

```python
for epoch in range(200):
    y_pred = w * x + b                  # 1. forward pass
    loss = ((y_pred - y) ** 2).mean()   # 2. compute loss (MSE)

    w.grad = None                       # 3. zero gradients
    b.grad = None
    loss.backward()                     # 4. backward pass

    with torch.no_grad():               # 5. update parameters
        w -= lr * w.grad
        b -= lr * b.grad

    if epoch % 50 == 0:
        print(epoch, loss.item())
```

Walk through this five times in your head, because it's the shape of every training loop you'll ever write:

1. **Forward pass** — run the current parameters through the model to get a prediction.
2. **Loss** — reduce the prediction's error against the true `y` to a single scalar.
3. **Zero gradients** — clear out `.grad` from the previous iteration (Lesson 2 explained why this is necessary).
4. **Backward pass** — call `.backward()` on the loss to populate `.grad` for every parameter.
5. **Update** — move each parameter a small step (`lr`, the learning rate) in the direction that reduces the loss.

## Why the update needs torch.no_grad()

The update line, `w -= lr * w.grad`, modifies `w` using `w.grad` — if this were tracked by autograd, PyTorch would try to build a graph for the update itself, which is both wasteful and wrong (we're not trying to differentiate through the optimization step). Wrapping it in `torch.no_grad()` tells PyTorch "just change the numbers, don't track it":

```python
with torch.no_grad():
    w -= lr * w.grad
    b -= lr * b.grad
```

Leaving this out produces a `RuntimeError` about modifying a leaf variable that requires grad in place, or silently corrupts the graph — either way, remove `torch.no_grad()` as an experiment once and you'll never forget why it's there.

## Watching the loss

The single most useful debugging signal in deep learning is whether the loss goes down. In this example, after 200 epochs, `w` should land close to `2.5` and `b` close to `-1.0`, and the printed loss should shrink steadily toward the noise floor (around `0.09`, since we added noise with standard deviation `0.3`, and `0.3² = 0.09`). If the loss doesn't move at all, something upstream is broken — often a zeroed-out learning rate, a loss that isn't actually connected to the parameters, or gradients that were never computed.

## Vocabulary you'll use constantly

- **Iteration** — one pass through the five-step loop, usually on one batch of data.
- **Epoch** — one full pass through the entire training dataset. Here, since we use the whole dataset every iteration, one epoch is one iteration; starting in Lesson 5, with real `DataLoader`s, an epoch will contain many iterations.
- **Learning rate (`lr`)** — the step size for each parameter update; too large and training diverges, too small and it crawls.

## Key terms

| Term | Meaning |
|---|---|
| Forward pass | Computing predictions from the current parameters |
| Loss | A single scalar measuring how wrong the predictions are |
| Backward pass | Calling `.backward()` to compute gradients via autograd |
| Learning rate | The step size used when updating parameters |
| Epoch | One full pass through the training dataset |

## Recap

Every training loop repeats the same five steps: forward, loss, zero gradients, backward, update — and the update must happen inside `torch.no_grad()` so autograd doesn't try to track it. You just trained a model with nothing but tensors and autograd. Next up, Lesson 5: replacing our hand-rolled data with real `Dataset` and `DataLoader` objects.
