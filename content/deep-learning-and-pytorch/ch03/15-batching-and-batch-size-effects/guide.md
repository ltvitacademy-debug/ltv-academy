# Batching & Batch Size Effects

Every training loop you've written so far has quietly made one important decision for you: how many examples the model looks at before it updates its weights. That number is the batch size, and it is one of the few hyperparameters that touches almost everything else — training speed, memory usage, gradient noise, and even how well the final model generalizes. This lesson makes that decision explicit.

## What you'll learn

- Why deep learning trains on mini-batches instead of one example or the whole dataset at a time
- How `batch_size` in a `DataLoader` interacts with GPU memory and throughput
- Why small and large batches produce qualitatively different training behavior
- The linear scaling rule for adjusting the learning rate when you change batch size

## From one example to a mini-batch

There are three ways to estimate the gradient of the loss: compute it from a single example (pure stochastic gradient descent), from the entire dataset (full-batch gradient descent), or from a mini-batch somewhere in between. Pure SGD is cheap per step but extremely noisy. Full-batch is the most accurate gradient estimate but is often too slow and memory-hungry to be practical, and it throws away the regularizing effect that a little noise provides. Mini-batches — typically somewhere between 16 and 512 examples — are the practical compromise almost every training loop actually uses.

## Setting batch size with DataLoader

`batch_size` is just an argument to `DataLoader`. A few other arguments usually travel with it:

```python
from torch.utils.data import DataLoader

train_loader = DataLoader(
    train_dataset,
    batch_size=32,
    shuffle=True,
    num_workers=2,
    pin_memory=True,
)
```

`shuffle=True` re-randomizes the order each epoch so the model doesn't learn anything from sample ordering. `num_workers` spins up background processes to load and transform data while the GPU is busy with the previous batch. `pin_memory=True` speeds up the CPU-to-GPU transfer when you're training on CUDA.

## What batch size actually changes

- **Gradient noise.** Smaller batches give a noisier estimate of the true gradient. That noise isn't pure downside — it acts as an implicit regularizer and can help training escape sharp, poorly-generalizing minima.
- **Throughput.** Larger batches mean fewer optimizer steps per epoch and typically better GPU utilization, up to the point where the GPU is saturated.
- **Memory.** Activation memory scales roughly linearly with batch size. This is usually the first wall you hit when you try to scale batch size up on a fixed GPU.
- **Generalization gap.** Very large batches, trained naively, often converge to a sharper minimum and can generalize slightly worse than the same model trained with smaller batches — unless the learning rate and schedule are adjusted to compensate.

## The linear scaling rule

A widely used rule of thumb: when you multiply the batch size by some factor, multiply the base learning rate by roughly the same factor, usually paired with a short learning-rate warmup period.

```python
base_lr = 0.1
base_batch_size = 256

new_batch_size = 1024
scale = new_batch_size / base_batch_size
new_lr = base_lr * scale  # 0.4
```

This is a starting point for tuning, not a law — always validate on your actual data rather than assuming the scaled number is optimal.

## Key terms

| Term | Meaning |
|---|---|
| Mini-batch | A subset of the training set used to compute one gradient update |
| Batch size | The number of examples in one mini-batch |
| Gradient noise | Variance in the gradient estimate caused by using a subset of data instead of the full dataset |
| Linear scaling rule | Heuristic: scale the learning rate roughly proportionally to batch size changes |
| Effective batch size | The true number of examples averaged into one update, including any gradient accumulation |
