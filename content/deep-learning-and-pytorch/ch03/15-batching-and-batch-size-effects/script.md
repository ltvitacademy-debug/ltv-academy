# Script — Batching & Batch Size Effects

## Segment 1 (title)

Every training loop you've written so far has quietly made one decision for you: how many examples the model looks at before it updates its weights. That's the batch size, and it touches almost everything — speed, memory, gradient noise, and how well the model generalizes.

## Segment 2 (code)

batch_size is just an argument to DataLoader, usually alongside a few friends. Shuffle re-randomizes the order each epoch. num_workers loads data in the background while the GPU chews on the previous batch, and pin_memory speeds up the transfer to a CUDA device.

## Segment 3 (steps)

Small batches give a noisier gradient estimate, which sounds bad but actually acts like a mild regularizer and can help escape sharp minima. Large batches smooth that noise out and push more work through the GPU per step, but push too far and you often need a higher learning rate and a warmup period just to match the accuracy a smaller batch got for free.

## Segment 4 (code)

A common rule of thumb, the linear scaling rule, says: when you multiply the batch size by some factor, multiply the base learning rate by roughly that same factor. It's a starting point for tuning, not a guarantee — always validate it on your own data.

## Segment 5 (outro)

Batch size is the dial behind the dial — it shapes how every other hyperparameter behaves. Up next, lesson sixteen: regularization with weight decay and dropout.
