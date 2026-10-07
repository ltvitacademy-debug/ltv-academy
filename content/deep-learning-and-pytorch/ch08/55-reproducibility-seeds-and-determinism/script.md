# Script — Reproducibility: Seeds & Determinism

## Segment 1 (title)

"It worked when I ran it yesterday" is not a reproducible experiment. If you can't rerun the same configuration and get the same result, you can't tell whether a change actually helped or you just got lucky this time.

## Segment 2 (code)

Python's random module, NumPy, and PyTorch each keep their own independent random state. Seeding only torch.manual_seed while your data pipeline uses random or numpy for augmentation is a common mistake — you need to seed all three.

## Segment 3 (code)

Seeds control the starting point, but some GPU operations can pick between multiple valid implementations for performance reasons, and that choice can itself vary run to run even with identical seeds. torch.use_deterministic_algorithms forces PyTorch to only use implementations that are deterministic — and that can genuinely cost you some speed.

## Segment 4 (code)

Here's the gotcha that catches people who seeded everything else correctly: if your DataLoader uses multiple workers, each worker process gets its own random state that doesn't inherit the main process's seed. If your dataset uses randomness for augmentation, you need a worker_init_fn to seed each worker explicitly.

## Segment 5 (steps)

Even done perfectly, exact reproducibility isn't guaranteed across different GPU models or CUDA versions — different hardware can implement the same operation slightly differently. Reproducible in practice means: same machine, same software versions, same seeded result every time. That's still enough to trust that a measured improvement is real.

## Segment 6 (outro)

Next lesson: comparing runs and ablations — putting this reproducibility to work so you can actually trust what a comparison is telling you.
