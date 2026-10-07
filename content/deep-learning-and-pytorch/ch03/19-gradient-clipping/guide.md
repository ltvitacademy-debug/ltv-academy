# Gradient Clipping

Every so often a single batch produces a gradient that's enormous — large enough to blow a weight update way off course, sometimes turning the loss into `NaN` in one step. Gradient clipping is the safety rail that keeps that one bad batch from wrecking an otherwise healthy training run.

## What you'll learn

- Why exploding gradients happen and what they look like in a loss curve
- How `torch.nn.utils.clip_grad_norm_` rescales gradients without changing their direction
- The difference between clipping by norm and clipping by value
- Exactly where clipping belongs in the training step

## Why gradients explode

In deep or recurrent networks, gradients are products of many terms through the chain rule. If those terms are consistently a bit larger than 1, the product can grow exponentially with depth — an "exploding gradient." A single unusual batch, a bad learning rate, or an unstable loss landscape early in training can all trigger a gradient spike large enough to send weights to extreme values in one update.

## Clipping by norm

The most common approach computes the total norm of all gradients combined and, if it exceeds `max_norm`, rescales every gradient down proportionally so the new norm equals `max_norm`. Rescaling proportionally preserves the gradient's *direction* — only its magnitude shrinks.

```python
loss = loss_fn(model(x), y)
loss.backward()

torch.nn.utils.clip_grad_norm_(model.parameters(), max_norm=1.0)

optimizer.step()
optimizer.zero_grad()
```

Clipping happens after `loss.backward()` has populated `.grad` on every parameter, and before `optimizer.step()` consumes those gradients. `clip_grad_norm_` modifies the gradients in place, so no reassignment is needed.

## Clipping by value

A simpler, cruder alternative clips each individual gradient component to a fixed range, independent of the others:

```python
torch.nn.utils.clip_grad_value_(model.parameters(), clip_value=0.5)
```

This clamps every gradient element to `[-0.5, 0.5]`. Unlike norm clipping, this can change the gradient's direction, since different components may get clamped by different amounts. Norm-based clipping is the more common default; value clipping shows up more in recurrent network training, where it was historically popular.

## A quick rule of thumb

If you see occasional huge spikes in your loss curve that don't correspond to anything in the data, gradient clipping with `max_norm` somewhere around `1.0`-`5.0` is a cheap, low-risk thing to try before reaching for a smaller learning rate or a complete architecture change.

## Key terms

| Term | Meaning |
|---|---|
| Exploding gradient | A gradient whose magnitude grows extremely large, usually from compounding through many layers or time steps |
| `clip_grad_norm_` | Rescales all gradients proportionally so their combined norm doesn't exceed `max_norm` |
| `clip_grad_value_` | Clamps each gradient element independently to a fixed `[-clip_value, clip_value]` range |
| `max_norm` | The ceiling on the total gradient norm used by `clip_grad_norm_` |
