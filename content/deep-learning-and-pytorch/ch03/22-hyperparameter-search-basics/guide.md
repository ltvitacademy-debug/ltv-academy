# Hyperparameter Search, Basics

By now you've met a long list of knobs — learning rate, batch size, weight decay, dropout probability, patience, and more. Hyperparameter search is the practice of choosing good values for those knobs systematically, instead of guessing once and hoping.

## What you'll learn

- The difference between a model parameter and a hyperparameter
- Grid search vs. random search, and why random search usually wins in practice
- How to structure a simple search loop around your existing training function
- Why a full train-to-completion search is expensive, and what people do instead

## Parameters vs. hyperparameters

A model *parameter* (a weight or bias) is learned by gradient descent during training. A *hyperparameter* is a setting you choose before training starts and that training itself can't optimize — learning rate, batch size, number of layers, dropout probability, and weight decay are all hyperparameters. Hyperparameter search means trying different combinations of these and comparing results on the validation set.

## Grid search

Grid search tries every combination of a fixed set of values for each hyperparameter:

```python
import itertools

lrs = [1e-2, 1e-3, 1e-4]
batch_sizes = [32, 64, 128]

best_config, best_val = None, float("inf")
for lr, bs in itertools.product(lrs, batch_sizes):
    model = build_model()
    optimizer = torch.optim.AdamW(model.parameters(), lr=lr)
    val_loss = train_and_validate(model, optimizer, batch_size=bs)
    if val_loss < best_val:
        best_val, best_config = val_loss, (lr, bs)
```

This is simple and exhaustive, but the number of combinations grows multiplicatively with each hyperparameter you add — three hyperparameters with five values each is already 125 full training runs.

## Random search

Random search samples a fixed *number* of configurations from a specified range or set, rather than trying every combination:

```python
import random

n_trials = 20
for _ in range(n_trials):
    lr = 10 ** random.uniform(-4, -1)       # log-uniform sample
    bs = random.choice([32, 64, 128, 256])
    model = build_model()
    optimizer = torch.optim.AdamW(model.parameters(), lr=lr)
    val_loss = train_and_validate(model, optimizer, batch_size=bs)
```

Counterintuitively, random search usually finds a good configuration faster than grid search for the same compute budget. Grid search spends a lot of its budget exploring unimportant hyperparameters at full resolution; random search's coverage of the *important* hyperparameters stays dense even when you add unimportant ones to the search.

## Keeping the cost under control

Training every candidate configuration to full convergence is expensive. Two common ways to cut that cost: train each candidate for only a few epochs as a cheap proxy for its final performance, and stop clearly bad candidates early rather than letting them run to completion (an approach formalized by schedulers like ASHA in tools such as Ray Tune). This course keeps things to the plain Python loop above, but it's worth knowing that purpose-built libraries exist once your search space grows.

## Key terms

| Term | Meaning |
|---|---|
| Hyperparameter | A training setting chosen before training starts, not learned by gradient descent |
| Grid search | Exhaustively trying every combination of a fixed value set per hyperparameter |
| Random search | Sampling a fixed number of random configurations instead of every combination |
| Log-uniform sampling | Sampling a value like learning rate evenly across orders of magnitude rather than linearly |
| Early-stopping-based search | Cutting off clearly bad hyperparameter trials before they finish training |
