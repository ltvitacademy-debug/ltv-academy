# Algorithmic Complexity in Practice

Profiling, from the last lesson, finds *where* time is going in a specific run. This lesson is about the layer above that: whether the algorithm itself scales acceptably as the data grows. A function that's "fast enough" on the 500-row sample you tested against can become the dominant cost once a real dataset arrives — not because anything got slower per-element, but because the algorithm's growth rate was always going to catch up. Big-O notation is the vocabulary for reasoning about that growth rate before it bites you in production.

## What you'll learn

- Big-O as a description of growth rate, not a replacement for actual measurement
- Why a vectorized O(n²) algorithm can still be far faster than a loop-based O(n²) one — the constant factor
- O(n log n) sorting/searching vs. O(n²) pairwise comparison, and when each shows up in quant code
- A real measured comparison: naive pairwise loop vs. NumPy broadcasting, at several sizes
- Why "it's fine on my test data" is not evidence it will be fine at scale

## Big-O: growth rate, not a stopwatch

Big-O notation describes how the *cost* of an algorithm grows as the *input size* grows, ignoring constant factors. An O(n) algorithm's cost roughly doubles when n doubles; an O(n²) algorithm's cost roughly quadruples. This matters because two algorithms can both be "correct" and both be acceptable at small n, while one of them silently becomes the whole runtime once n grows past some threshold. Big-O doesn't tell you *which one is faster in milliseconds on your machine* — only actual measurement tells you that — but it tells you which one will eventually win as data grows, which is exactly the kind of thing that's easy to miss if you only ever test on a small sample.

A classic quant-research example: computing a pairwise quantity — correlation, distance, covariance — between every pair of n assets or n observations is inherently O(n²), because there are n² pairs. No amount of clever coding makes that fewer than n² comparisons. What *does* change dramatically is the constant factor multiplying that n².

## Same Big-O, very different constant factor

Here's a naive pairwise absolute-difference calculation, written as an explicit Python double loop, next to the NumPy-broadcasted equivalent. Both are O(n²) — same number of element comparisons — but one does the arithmetic in a Python-level loop and the other does it in compiled, vectorized code:

```python
import numpy as np

def pairwise_dist_naive(x):
    n = len(x)
    out = [[0.0] * n for _ in range(n)]
    for i in range(n):
        for j in range(n):
            out[i][j] = abs(x[i] - x[j])
    return out

def pairwise_dist_vectorized(x):
    return np.abs(x[:, None] - x[None, :])   # broadcasting: n x n in one call
```

Measured on real runs, at a few different sizes:

```
n=  200  naive=     6.12 ms  vectorized=  0.392 ms  speedup=    15.6x
n=  500  naive=    41.43 ms  vectorized=  1.841 ms  speedup=    22.5x
n= 1000  naive=   184.04 ms  vectorized=  9.588 ms  speedup=    19.2x
n= 2000  naive=   734.85 ms  vectorized= 36.187 ms  speedup=    20.3x
```

Two things to notice. First, the speedup from vectorizing is consistently around 15-22x at every size — that's the constant-factor win from Lesson 1's vectorization habit, and it doesn't change the underlying growth rate. Second, look at how each column scales on its own: going from n=1000 to n=2000 (doubling n) roughly quadruples both the naive time (184.04 → 734.85 ms, ~4.0x) and the vectorized time (9.588 → 36.187 ms, ~3.8x) — exactly what O(n²) predicts. Vectorizing made the constant factor much smaller; it did not change the fact that doubling the number of assets quadruples the work.

## O(n log n): sorting and searching

Many quant workflows involve sorting (ranking assets by a signal) or searching (finding where a value falls in a sorted series). Python's `sorted()` and NumPy's `np.sort` use comparison sorts that run in O(n log n) — dramatically better scaling than O(n²) for large n, which is why "sort then do a single pass" is often the right shape for a problem that looks at first glance like it needs pairwise comparison. Binary search (`bisect.bisect` or `np.searchsorted`) on an already-sorted array is O(log n) per lookup — essentially flat as n grows, versus an O(n) linear scan. If you find yourself writing a loop that scans a list looking for where a value belongs, and that list is sorted or can cheaply be kept sorted, `np.searchsorted` is almost always the better-scaling choice.

## Why "fine on my test data" isn't evidence

An O(n²) pairwise correlation over 50 tickers is 2,500 cells — instant, vectorized or not. The same calculation over 5,000 tickers (a realistic universe size) is 25,000,000 cells — a thousand times more work for a 100x larger input, exactly as O(n²) predicts. This is the trap: code that was tested and "felt fast" during development on a small universe can become the dominant cost of a pipeline once it's pointed at the real universe, with no code change at all — just more data. The fix isn't always "make it faster" in the profiling sense from the last lesson; sometimes it's recognizing that the *algorithm's shape* doesn't scale to the size of problem you actually have, and a genuinely different approach (a lower-complexity algorithm, or accepting the O(n²) cost but minimizing its constant factor via vectorization or the compiled-code techniques in the next few lessons) is required.

## Key terms

| Term | Meaning |
|---|---|
| Big-O notation | Describes how an algorithm's cost grows as input size grows, ignoring constant factors |
| Constant factor | The per-operation cost multiplier; vectorization/compilation shrink this without changing Big-O |
| O(n²) | Cost grows with the square of input size; typical of all-pairs comparisons |
| O(n log n) | Typical cost of comparison-based sorting; much better scaling than O(n²) for large n |
| O(log n) | Typical cost of binary search on sorted data; nearly flat as n grows |

## Recap

Big-O describes how cost scales with data size, independent of constant factors — a pairwise comparison is inherently O(n²) no matter how it's coded, but vectorizing it (as the measured 15-22x speedups showed) shrinks the constant factor dramatically without changing that underlying growth rate. Next lesson: Numba, which shrinks the constant factor even further than NumPy can for certain loop-shaped numerical code, by compiling Python functions directly to machine code.
