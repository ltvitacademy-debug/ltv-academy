# Datasets & DataLoaders

In Lesson 4, we fed the entire dataset into the model in one shot, every iteration. Real datasets don't fit that pattern — they're too large for memory, they need shuffling, and training actually works better with small batches rather than the whole thing at once. PyTorch separates this concern into two classes: `Dataset`, which knows how to fetch a single example, and `DataLoader`, which knows how to batch, shuffle, and iterate over a `Dataset`. This lesson shows you both.

## What you'll learn

- How to implement a custom `Dataset` with `__len__` and `__getitem__`
- How `DataLoader` wraps a `Dataset` to produce shuffled, batched iterators
- The difference between `batch_size`, `shuffle`, and `num_workers`
- How an epoch and an iteration relate once you're using real batches
- The built-in `TensorDataset` for when your data already lives in tensors

## Writing a custom Dataset

A `Dataset` only needs to answer two questions: how many examples are there, and how do I get example `i`?

```python
import torch
from torch.utils.data import Dataset

class LinearDataset(Dataset):
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __len__(self):
        return len(self.x)

    def __getitem__(self, idx):
        return self.x[idx], self.y[idx]

x = torch.linspace(-5, 5, 100).unsqueeze(1)
y = 2.5 * x - 1.0 + 0.3 * torch.randn_like(x)
dataset = LinearDataset(x, y)

len(dataset)      # 100
dataset[0]        # (tensor([-5.]), tensor([-13.47]))
```

`__len__` returns the total number of examples. `__getitem__` returns one example given an index — this is the hook where you'd load an image from disk, apply a transform, or tokenize text, rather than holding everything in memory at once.

## Wrapping it in a DataLoader

`DataLoader` takes a `Dataset` and handles batching, shuffling, and iteration for you:

```python
from torch.utils.data import DataLoader

loader = DataLoader(dataset, batch_size=16, shuffle=True)

for x_batch, y_batch in loader:
    x_batch.shape   # torch.Size([16, 1])
    y_batch.shape   # torch.Size([16, 1])
    # ... forward pass, loss, backward, update
```

Iterating over a `DataLoader` yields batches, not individual examples — each `x_batch` stacks `batch_size` examples along a new leading dimension. `shuffle=True` reshuffles the order every epoch, which matters because training on data in a fixed order can bias what the model learns early versus late in training.

## batch_size, shuffle, and num_workers

```python
loader = DataLoader(
    dataset,
    batch_size=32,
    shuffle=True,
    num_workers=2,   # load batches in parallel subprocesses
)
```

- `batch_size` controls how many examples are grouped into each batch. Larger batches give smoother gradient estimates but use more memory; smaller batches are noisier but can generalize better and fit in less memory.
- `shuffle=True` randomizes example order every epoch — always use this for training, and almost always `False` for validation/test loaders, where order doesn't matter and you want reproducible evaluation.
- `num_workers` spawns background worker processes to prepare the next batch (loading, transforming) while the GPU is busy with the current one, which can meaningfully speed up training when data loading is slow (e.g. decoding images from disk).

## Epochs and iterations, for real this time

With a real `DataLoader`, one **epoch** means iterating through the entire loader once — the number of iterations per epoch is `len(dataset) // batch_size` (roughly):

```python
for epoch in range(10):
    for x_batch, y_batch in loader:
        # one iteration: one batch, one forward/backward/update
        ...
```

With 100 examples and `batch_size=16`, each epoch runs about 6 iterations (the last batch may be smaller unless you pass `drop_last=True`).

## TensorDataset: a shortcut

When your data already lives in plain tensors (as in our linear regression example), you don't need to write a custom class at all:

```python
from torch.utils.data import TensorDataset

dataset = TensorDataset(x, y)
loader = DataLoader(dataset, batch_size=16, shuffle=True)
```

`TensorDataset` wraps any number of equal-first-dimension tensors and indexes them together, which covers a surprising number of real training setups.

## Key terms

| Term | Meaning |
|---|---|
| `Dataset` | A class defining `__len__` and `__getitem__` for fetching one example at a time |
| `DataLoader` | Wraps a `Dataset` to produce shuffled, batched iterators |
| `batch_size` | Number of examples grouped into each batch |
| `num_workers` | Background processes that prepare batches in parallel |
| `TensorDataset` | Built-in `Dataset` for data already stored as tensors |

## Recap

`Dataset` answers "how many examples, and how do I get one," while `DataLoader` wraps a `Dataset` to handle batching, shuffling, and parallel loading. Swapping the from-scratch loop's manual data handling for a real `DataLoader` is a drop-in change — the five-step loop from Lesson 4 stays exactly the same. Next up, Lesson 6: saving and loading a trained model so you don't lose your work.
