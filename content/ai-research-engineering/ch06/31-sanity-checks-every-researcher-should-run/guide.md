# Sanity Checks Every Researcher Should Run

The previous two lessons covered the mechanics of catching silent bugs and numerical issues. This lesson is the checklist: a short, standard sequence of checks that experienced researchers run on nearly every new codebase or architecture before trusting a single number out of it. None of these individually prove the implementation is correct, but together they catch the overwhelming majority of implementation bugs cheaply, in minutes, before a full training run burns hours or days of compute on a broken setup.

## What you'll learn

- The overfit-a-single-batch check, and what "it doesn't go to zero" actually tells you
- Checking that gradients reach every parameter that's supposed to be trainable
- The input-ablation check: does the loss get *worse* when you feed in random noise?
- Baseline sanity: does a trivial model (e.g. predict the mean) score as expected?
- Why these checks belong at the start of every new experiment, not just the first one ever

## Check 1: overfit a single batch

Covered in the previous lesson as a correctness technique, it's also the single highest-value sanity check to run first on any new setup: take one batch, loop over it a few hundred times, and confirm the loss goes to (near) zero.

```python
batch = next(iter(loader))
losses = []
for step in range(300):
    optimizer.zero_grad()
    loss = compute_loss(model, batch)
    loss.backward()
    optimizer.step()
    losses.append(loss.item())
print(f"first: {losses[0]:.4f}  last: {losses[-1]:.4f}")
# last should be close to 0. If it plateaus well above 0, something in the
# model, loss, or optimizer wiring is broken -- fix this before running anything larger.
```

## Check 2: gradients reach every trainable parameter

A silent and surprisingly common bug is a parameter that looks trainable (`requires_grad=True`) but never actually receives a gradient, usually because it's detached from the graph somewhere or never touched by the forward pass:

```python
loss.backward()
for name, p in model.named_parameters():
    if p.requires_grad and p.grad is None:
        print(f"WARNING: {name} is trainable but got no gradient")
    elif p.requires_grad and torch.all(p.grad == 0):
        print(f"WARNING: {name} got an all-zero gradient")
```

This catches a specific class of bug that overfitting a single batch sometimes misses — a parameter with no gradient simply never updates, but the rest of the model might still be able to drive the loss down without it, masking the problem.

## Check 3: does feeding garbage make things worse?

A model that's actually using its input should perform meaningfully worse when the input is replaced with random noise or zeros. If replacing real input with noise doesn't change the loss much, the model (or the loss, or the data pipeline) isn't actually using the input the way you think it is:

```python
real_loss = compute_loss(model, batch)
noise_batch = {**batch, "input_ids": torch.randint(0, VOCAB_SIZE, batch["input_ids"].shape)}
noise_loss = compute_loss(model, noise_batch)
print(f"real: {real_loss.item():.4f}  noise: {noise_loss.item():.4f}")
# noise_loss should be clearly worse than real_loss. If they're close,
# something is wrong -- maybe the data isn't reaching the model correctly.
```

## Check 4: baseline sanity

Before trusting that a sophisticated model is learning something real, check that a trivial baseline scores where you'd expect. For regression, predicting the mean of the training targets should produce a specific, computable loss; for classification, predicting the majority class should match the majority-class frequency in accuracy. If your sophisticated model scores *worse* than this trivial baseline, or suspiciously close to it, something is wrong before you even get to questions of "is this architecture actually better":

```python
import numpy as np
mean_baseline_mse = np.mean((targets - targets.mean()) ** 2)
print(f"predict-the-mean baseline MSE: {mean_baseline_mse:.4f}")
print(f"model MSE: {model_mse:.4f}")
# model_mse should be meaningfully below the baseline -- if it isn't,
# the model isn't learning anything the baseline doesn't already capture.
```

## Running the checklist every time, not just once

The temptation is to run this checklist once when a codebase is new and skip it for every subsequent experiment built on top of it. That's a mistake — each of these checks is cheap (minutes, sometimes seconds), and a new architecture variant, a new loss term, or a new data pipeline can reintroduce exactly the bugs these checks catch, even in a codebase that passed them before. Treat the checklist as a five-minute tax paid at the start of every new experimental direction, not a one-time rite of passage for the repo.

## Key terms

- **Overfit-a-batch check** — looping training on a single batch to confirm the loss can reach near-zero, verifying the pipeline is wired correctly
- **Dead gradient** — a trainable parameter that receives no gradient (or an all-zero gradient) during backward, usually from a detached or unused subgraph
- **Input-ablation check** — replacing real input with noise and confirming the loss gets meaningfully worse, verifying the model is actually using the input
- **Baseline sanity check** — comparing a model's score against a trivial baseline (predict the mean/majority class) to confirm it's learning something beyond the trivial solution
