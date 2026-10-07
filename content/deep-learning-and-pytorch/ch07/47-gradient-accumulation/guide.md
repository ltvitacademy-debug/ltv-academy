# Gradient Accumulation

Bigger batch sizes generally give you smoother, more stable gradient estimates — but a bigger batch means more activations held in GPU memory at once, and at some point you simply run out. Gradient accumulation is the trick that lets you simulate a large batch size using a GPU that can only physically fit a small one, by spreading one "effective" batch across several forward/backward passes before you actually update the weights.

## What you'll learn

- Why a bigger batch doesn't have to mean more memory, if you're willing to spend more time
- The exact accumulation loop: divide the loss, backward every step, step the optimizer only every N steps
- A subtle but common bug: forgetting to divide the loss, which silently changes your effective learning rate
- How accumulation interacts with batch normalization and learning rate

## The core idea

Normally, one training step is: forward pass, compute loss, `backward()`, `optimizer.step()`, `zero_grad()`. Gradient accumulation breaks that into two speeds. You still do a forward and backward pass on every small "micro-batch," which keeps accumulating gradients into `.grad` because `backward()` adds to existing gradients rather than replacing them. You just only call `optimizer.step()` and `zero_grad()` once every `accum_steps` micro-batches.

```python
accum_steps = 4
optimizer.zero_grad()

for i, (inputs, targets) in enumerate(train_loader):
    output = model(inputs)
    loss = loss_fn(output, targets) / accum_steps
    loss.backward()

    if (i + 1) % accum_steps == 0:
        optimizer.step()
        optimizer.zero_grad()
```

Four micro-batches of size 16, accumulated this way, behave like one batch of size 64 for the purposes of the gradient update — at the cost of four forward/backward passes' worth of time instead of one.

## Why you divide the loss

This is the detail that trips people up. `loss.backward()` accumulates *sums* of gradients across however many times you call it before zeroing. If you don't divide the per-micro-batch loss by `accum_steps`, the accumulated gradient ends up `accum_steps` times larger than it should be — which acts exactly like multiplying your learning rate by `accum_steps`, silently, with no error. Dividing before `backward()` keeps the accumulated gradient equivalent to the *average* loss over the full effective batch, matching what a real batch of that size would have produced.

```python
# WRONG — gradients end up accum_steps times too large
loss = loss_fn(output, targets)
loss.backward()

# RIGHT — divide first, so the accumulated gradient matches a real large batch
loss = loss_fn(output, targets) / accum_steps
loss.backward()
```

## The one thing accumulation doesn't fix

Gradient accumulation gives you the *gradient* of a large batch, but layers like `BatchNorm` compute statistics from whichever micro-batch is actually passing through at that instant — accumulation doesn't retroactively pool those statistics across micro-batches. If your model relies heavily on batch norm, a large accumulated batch is not numerically identical to one real large batch; it's usually close enough in practice, but it's worth knowing that it's not exact.

## Key terms

| Term | Meaning |
|---|---|
| Micro-batch | One small forward/backward pass whose gradients get accumulated before an optimizer step |
| Accumulation steps | How many micro-batches make up one effective batch (`accum_steps`) |
| Effective batch size | `micro_batch_size × accum_steps` — the batch size the optimizer update actually behaves like |
| Gradient accumulation | Calling `backward()` multiple times before `optimizer.step()`, letting `.grad` sum across calls |
