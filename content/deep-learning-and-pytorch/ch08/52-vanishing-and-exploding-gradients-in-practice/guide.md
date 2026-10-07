# Vanishing & Exploding Gradients, in Practice

You've seen vanishing gradients discussed conceptually back in Chapter 5, in the context of RNNs and LSTMs. This lesson is about catching both vanishing and exploding gradients in a real PyTorch training loop — actually inspecting gradient norms while a model trains, instead of only recognizing the problem after the loss curve has already gone wrong.

## What you'll learn

- How to compute a model's total gradient norm, layer by layer, after `backward()`
- How to clip gradients with `torch.nn.utils.clip_grad_norm_` before they explode the optimizer step
- What a vanishing gradient looks like in the numbers, not just in theory
- Where to place a gradient check in your training loop so it costs you almost nothing

## Inspecting gradient norms

After `loss.backward()` and before `optimizer.step()`, every parameter with `requires_grad=True` has a `.grad` tensor populated. You can compute the norm of each one, or the combined norm across the whole model, to get a direct numeric read on what's happening.

```python
def grad_norm(model):
    total = 0.0
    for p in model.parameters():
        if p.grad is not None:
            total += p.grad.data.norm(2).item() ** 2
    return total ** 0.5

loss.backward()
print("grad norm:", grad_norm(model))
optimizer.step()
optimizer.zero_grad()
```

A healthy run shows this number staying in a roughly stable range, step to step. A gradient norm that's consistently tiny (approaching zero) across many layers is vanishing gradients in action; a norm that's enormous or growing without bound is exploding gradients.

## Clipping exploding gradients

`torch.nn.utils.clip_grad_norm_` rescales a model's gradients in place so their combined norm doesn't exceed `max_norm`, which stops one unusually large batch from taking a destructively large optimizer step. It's the standard first response to exploding gradients, and it's cheap enough to leave on by default in most training loops.

```python
loss.backward()
total_norm = torch.nn.utils.clip_grad_norm_(
    model.parameters(), max_norm=1.0
)
optimizer.step()
optimizer.zero_grad()
```

`clip_grad_norm_` returns the *pre-clipping* total norm, which is itself useful to log — a return value that's frequently much larger than `max_norm` tells you clipping is doing real work, not just sitting there as a precaution.

## What vanishing gradients look like, layer by layer

Exploding gradients tend to announce themselves — the loss curve spikes or shoots to `nan` quickly. Vanishing gradients are quieter: training looks like it's just not learning, with loss barely moving, and nothing crashes. Checking the gradient norm per-layer (rather than one combined number) usually makes it obvious: in a deep network, gradients computed for early layers can be orders of magnitude smaller than gradients for later layers, because each layer's backward pass multiplies by another factor that can shrink the signal.

```python
for name, p in model.named_parameters():
    if p.grad is not None:
        print(f"{name:40s} grad_norm={p.grad.data.norm(2).item():.6f}")
```

Running that after a backward pass and sorting by magnitude is often the fastest way to confirm "yes, this is vanishing gradients, and it's the first three layers specifically."

## Key terms

| Term | Meaning |
|---|---|
| Gradient norm | The magnitude of a gradient tensor (or a whole model's gradients combined) |
| Exploding gradients | Gradient norms growing very large, often causing loss spikes or `nan` |
| Vanishing gradients | Gradient norms shrinking toward zero, especially in early layers of deep networks |
| `clip_grad_norm_` | Rescales gradients in place to cap their combined norm at `max_norm`, returns the pre-clip norm |
