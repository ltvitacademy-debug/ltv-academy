# Silent Bugs in Training Code

You saw PyTorch's basic debugging tools back in Chapter 1 — things that throw errors and stack traces. The bugs in this lesson are worse than that: they don't crash anything. The training loop runs, the loss number goes down, and everything looks fine, while the model quietly learns the wrong thing or gets evaluated incorrectly. These are the four most common ones, and the habit that catches each.

## What you'll learn

- Why calling `.backward()` on a loss you never detached can leak memory across an entire epoch
- Why forgetting `model.eval()` during validation gives you misleading numbers, not a crash
- Why forgetting `optimizer.zero_grad()` corrupts every subsequent gradient silently
- A short checklist to run your eyes over before trusting a training loop's output

## Bug 1: accumulating the loss tensor, not its value

`loss` is a tensor attached to the entire computation graph for that step. If you accumulate it directly into a running total instead of its plain Python value, you keep that whole graph alive — for every batch, for the rest of the epoch. Nothing crashes; you just slowly run out of memory, or silently use far more of it than you should.

```python
running_loss = 0.0
for inputs, targets in train_loader:
    optimizer.zero_grad()
    loss = loss_fn(model(inputs), targets)
    loss.backward()
    optimizer.step()
    running_loss += loss.item()   # correct: .item() detaches to a Python float
    # running_loss += loss        # bug: keeps the whole graph alive
```

## Bug 2: forgetting model.eval() during validation

Layers like `Dropout` and `BatchNorm` behave differently during training versus evaluation — dropout randomly zeroes activations only during training, and batch norm uses batch statistics during training but running averages during evaluation. If you validate without calling `model.eval()` first, your validation loss is computed with training-mode behavior still active: no crash, just a validation number that doesn't mean what you think it means.

```python
model.eval()
with torch.no_grad():
    val_loss = loss_fn(model(x_val), y_val)
model.train()   # switch back before the next training batch
```

## Bug 3: forgetting optimizer.zero_grad()

`backward()` *adds* to each parameter's existing `.grad`, it doesn't replace it. If you skip `zero_grad()`, every step's gradient is a sum of that step's gradient plus every previous step's gradient that was never cleared — the optimizer silently takes increasingly wrong steps, with no error anywhere.

```python
for inputs, targets in train_loader:
    optimizer.zero_grad()     # leave this out, and grads just keep summing
    loss = loss_fn(model(inputs), targets)
    loss.backward()
    optimizer.step()
```

## Bug 4: forgetting torch.no_grad() during inference

Even with `model.eval()` set correctly, running inference without `torch.no_grad()` still builds a full autograd graph for every forward pass — correct numerically, but it wastes memory and time tracking gradients you'll never use. On a large validation set this can be the difference between fitting in memory and not.

## A five-second checklist

Before trusting a training run's numbers, check: does the loss accumulate `.item()` rather than the tensor? Is `model.eval()` paired with `model.train()` around every validation pass? Is `zero_grad()` called every step? Is validation wrapped in `torch.no_grad()`? None of these four show up as an error message — they show up as numbers that are wrong in a way that looks plausible.

## Key terms

| Term | Meaning |
|---|---|
| `.item()` | Detaches a scalar tensor to a plain Python number, freeing the computation graph behind it |
| `model.eval()` / `model.train()` | Switches `Dropout`/`BatchNorm` behavior between evaluation and training modes |
| `torch.no_grad()` | Context manager that skips building an autograd graph, saving memory during inference |
| Gradient accumulation bug | Forgetting `zero_grad()`, causing gradients to silently sum across steps |
