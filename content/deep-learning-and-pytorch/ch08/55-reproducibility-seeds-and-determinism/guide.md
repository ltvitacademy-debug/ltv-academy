# Reproducibility: Seeds & Determinism

"It worked when I ran it yesterday" is not a reproducible experiment. If you can't rerun the exact same configuration and get the exact same result, you can't be sure a change you made actually caused the improvement you think it did — it might just be run-to-run randomness. This lesson covers what you actually need to set, and why some randomness is harder to remove than you'd expect.

## What you'll learn

- Which random number generators actually need seeding (there's more than one)
- Why `torch.use_deterministic_algorithms(True)` exists and what it costs you
- The `DataLoader` worker seeding gotcha that catches people who seeded everything else correctly
- What "reproducible" realistically means: same machine and software versions, not universally

## Seeding every source of randomness

Python's `random`, NumPy, and PyTorch each keep their own independent random state. Seeding only `torch.manual_seed` while leaving the others alone is a common mistake if your data pipeline uses `random` or `numpy` for augmentation or shuffling.

```python
import random
import numpy as np
import torch

def set_seed(seed: int = 42):
    random.seed(seed)
    np.random.seed(seed)
    torch.manual_seed(seed)
    torch.cuda.manual_seed_all(seed)

set_seed(42)
```

## Determinism on the GPU isn't automatic

Setting seeds controls the *starting point* of randomness, but some GPU operations (certain convolution algorithms in particular) are allowed to pick from multiple valid implementations for performance reasons, and that choice can itself introduce run-to-run variation even with identical seeds. `torch.use_deterministic_algorithms(True)` tells PyTorch to only use operations that have a deterministic implementation, raising an error for ones that don't.

```python
torch.backends.cudnn.deterministic = True
torch.backends.cudnn.benchmark = False
torch.use_deterministic_algorithms(True)
```

This has a real cost: deterministic algorithms are sometimes slower than their non-deterministic counterparts, since the faster implementation is often the one that sacrifices determinism for speed. Turn this on specifically when you're debugging or comparing runs, and know you're trading some speed for it.

## The DataLoader worker seeding gotcha

If your `DataLoader` uses `num_workers > 0`, each worker process gets its own random state — seeding the main process alone does not propagate to them. If your dataset's `__getitem__` uses randomness (common for augmentation), you need a `worker_init_fn` to seed each worker explicitly, or every run will shuffle augmentations differently even with everything else seeded correctly.

```python
def worker_init_fn(worker_id):
    seed = torch.initial_seed() % 2**32
    np.random.seed(seed)
    random.seed(seed)

loader = DataLoader(
    dataset, batch_size=32, num_workers=4,
    worker_init_fn=worker_init_fn,
    generator=torch.Generator().manual_seed(42),
)
```

## What "reproducible" realistically means

Even with all of this done correctly, exact bit-for-bit reproducibility across *different* GPU models, CUDA versions, or PyTorch versions is not guaranteed — different hardware can implement the same operation slightly differently. "Reproducible" in practice means: on the same machine with the same software versions, the same seeded run produces the same result every time. That's still extremely valuable for debugging and for trusting that an improvement you measured is real.

## Key terms

| Term | Meaning |
|---|---|
| `torch.manual_seed` | Seeds PyTorch's own RNG; does not seed Python's `random` or NumPy |
| `torch.use_deterministic_algorithms(True)` | Forces PyTorch to use only deterministic op implementations, erroring on ones that aren't |
| `worker_init_fn` | Seeds each `DataLoader` worker process individually, since they don't inherit the main process's seed |
| Determinism cost | Deterministic algorithms are sometimes slower than their non-deterministic counterparts |
