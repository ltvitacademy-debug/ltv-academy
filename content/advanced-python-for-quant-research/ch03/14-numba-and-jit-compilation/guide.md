# Numba & JIT Compilation

NumPy vectorization gets you most of the way to fast numerical Python, but it has a blind spot: operations that are hard to express as whole-array math — a genuinely sequential simulation, a loop with complex branching, a custom numerical routine that doesn't map to an existing NumPy function. Numba fills that gap by compiling ordinary-looking Python functions directly to machine code the first time they're called, letting you keep writing explicit loops while getting speed in the same ballpark as C.

## What you'll learn

- `@njit` and "nopython mode": what Numba actually compiles
- Just-in-time compilation — compiled on first call, cached after that
- What Numba can and can't compile: no arbitrary Python objects, limited library support
- `parallel=True` / `prange` for multi-core loops, and `fastmath` for relaxed floating-point rules
- A real measured benchmark: pure Python loop vs. NumPy vs. Numba, extending the pairwise example from Lesson 13

## `@njit` and nopython mode

Decorating a function with `@numba.njit` tells Numba to compile it in **nopython mode** — meaning the entire function body must be translated to types Numba understands (NumPy arrays, numbers, tuples, a limited set of Python constructs) with no fallback to the slow, boxed Python object representation. `njit` is shorthand for `jit(nopython=True)`, and it's the mode you want for actual speed; plain `@jit` without `nopython=True` can silently fall back to slow "object mode" if Numba can't fully compile the function, giving you little or no benefit.

```python
from numba import njit
import numpy as np

@njit
def pairwise_dist_numba(x):
    n = x.shape[0]
    out = np.empty((n, n))
    for i in range(n):
        for j in range(n):
            out[i, j] = abs(x[i] - x[j])
    return out
```

This looks like the exact same naive double loop from Lesson 13 — and that's the point. Numba's value proposition is that you keep the obvious, readable loop-based code and let the compiler do the work that vectorization would otherwise force you to do by hand.

## Compiled on first call, cached after that

Numba compiles lazily: the first time a `@njit` function is called with a particular set of argument types, it triggers compilation, which has real, measurable overhead. Every subsequent call with the same argument types reuses the cached compiled version:

```python
@njit
def add_one(a):
    return a + 1

add_one(np.arange(10))   # first call: compiles, then runs
add_one(np.arange(10))   # second call: reuses the cached compiled version
```

Measured on this exact function: the first call took **332.19 ms** (mostly compilation), and the second call took **0.0136 ms** — over 24,000x faster, purely from skipping compilation. This is why you always warm up a Numba function with a throwaway call before timing it, and why Numba is a poor fit for code that runs once with ever-changing input types — the compilation cost dominates when there's no repeated use to amortize it over.

## What Numba can't compile

Nopython mode only understands a subset of Python: NumPy arrays and scalar numeric types, basic control flow, and a specific allow-listed set of NumPy functions — not arbitrary Python objects, not pandas DataFrames, not most of the standard library, and not arbitrary third-party classes. A function that calls `pandas` methods, builds a `dict` of mixed types, or calls a library Numba doesn't recognize will fail to compile in nopython mode (or in older Numba, silently drop to slow object mode). In practice this means: pull just the numeric core of a computation — the part made of arrays, loops, and arithmetic — into a small `@njit` function, and keep the pandas/I/O/orchestration code in regular Python around it.

## `parallel=True`, `prange`, and `fastmath`

For loops where each iteration is independent, `parallel=True` combined with `prange` (parallel range) lets Numba distribute iterations across CPU cores automatically:

```python
from numba import njit, prange

@njit(parallel=True, fastmath=True)
def pairwise_dist_numba_parallel(x):
    n = x.shape[0]
    out = np.empty((n, n))
    for i in prange(n):          # outer loop parallelized across cores
        for j in range(n):
            out[i, j] = abs(x[i] - x[j])
    return out
```

`fastmath=True` relaxes strict IEEE-754 floating-point rules (recall Lesson 7's discussion of floating-point arithmetic) in exchange for speed — it allows reordering operations in ways that are mathematically equivalent but not bit-for-bit identical, which is usually fine for aggregate numerical work but something to be aware of if you need bit-exact reproducibility. `parallel=True` isn't free, though — it adds thread-management overhead, so it only pays off when the per-iteration work is large enough to be worth distributing, which the measurement below demonstrates directly.

## A real measured benchmark

Extending the n=2000 pairwise absolute-difference example from Lesson 13 with the two Numba versions above, measured on the same machine:

```
n=2000
pure python loop:        1253.08 ms
numpy vectorized:           49.747 ms   (   25.2x vs loop)
numba @njit:                 23.190 ms   (   54.0x vs loop,  2.15x vs numpy)
numba parallel+fastmath:     25.042 ms   (   50.0x vs loop,  1.99x vs numpy)
```

Two honest takeaways from real numbers, not idealized ones. First, plain `@njit` beat NumPy's vectorized broadcasting by about 2x here — compiled loops can avoid some of the temporary-array allocation that broadcasting does internally, so "vectorize with NumPy" is not automatically the fastest option once Numba is on the table. Second, `parallel=True` was *not* faster than the single-threaded `@njit` version on this run (25.0 ms vs. 23.2 ms) — on a 4-core machine, for an n=2000 workload, the thread-scheduling overhead roughly canceled out the gain from spreading the work across cores. `parallel=True` is not a free performance switch; it needs a large enough per-core workload to be worth the overhead, and the only way to know is to measure, exactly as Lesson 12 insisted.

## Key terms

| Term | Meaning |
|---|---|
| `@njit` | Compiles a function in Numba's nopython mode; the mode you want for real speed |
| Nopython mode | Numba compilation with no fallback to slow Python object representation |
| JIT (just-in-time) compilation | Compiles on first call with a given argument type, caches the compiled version after |
| `prange` | Parallel version of `range`, used with `parallel=True` to distribute loop iterations across cores |
| `fastmath` | Relaxes strict IEEE-754 rules for speed, at the cost of exact bit-for-bit reproducibility |

## Recap

Numba compiles ordinary-looking Python loops to machine code on first call, and the measured benchmark showed it can beat even NumPy's vectorized broadcasting for loop-shaped numerical work — but compilation has real overhead, `parallel=True` isn't automatically a win, and Numba only understands a limited, numeric subset of Python. Next lesson: Cython, a different, more manual route to compiled-speed Python that trades more upfront work (and a real build step) for even finer control over the generated code.
