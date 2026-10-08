# Profiling Tools

Chapter 3 turns from "is this code correct" to "is this code fast enough" — and the first rule of making anything faster is: measure before you touch anything. Intuition about where Python code spends its time is unreliable, even for experienced programmers, because the slow part is rarely where it looks. This lesson covers the four tools you'll reach for, in roughly the order you'd reach for them: `cProfile` to find which *function* is slow, `line_profiler` to find which *line* inside that function is slow, `timeit` to compare small snippets precisely, and `memory_profiler` when the problem is RAM rather than CPU time.

## What you'll learn

- Why "I think the loop is slow" is a hypothesis, not a diagnosis
- `cProfile` and `pstats`: profiling a whole run, sorted by cumulative or total time
- `line_profiler` (`kernprof` / `%lprun`): profiling line-by-line inside one function
- `timeit`: precise timing of a small snippet, isolated from the rest of the program
- `memory_profiler`: measuring memory, not time
- How to read the numbers and decide what's actually worth optimizing

## Measure first, don't guess

It's tempting to look at a slow pipeline, spot the one obvious `for` loop, and start rewriting it — but the real bottleneck is often somewhere unglamorous: a `sum()` call inside a generator expression that runs millions of times, a `datetime` parse buried in a data-loading step, or an innocent-looking `.std()` call recomputed on every iteration. Profiling tools exist precisely so you don't have to guess. The workflow in this lesson is always the same shape: run the profiler, read the output, find the line or function actually eating the time, fix *that*, and re-measure to confirm the fix worked.

## `cProfile` and `pstats`: profile the whole run

`cProfile` is Python's built-in deterministic profiler. It wraps every function call in the program and records how many times each function was called and how much time it took, both on its own (`tottime`) and including everything it called (`cumtime`). Here's a small quant-flavored example — computing a rolling volatility the slow, loop-based way — profiled end to end:

```python
import cProfile
import pstats
import io
import random

def make_prices(n):
    prices = [100.0]
    for _ in range(n - 1):
        prices.append(prices[-1] * (1 + random.gauss(0, 0.01)))
    return prices

def pct_returns(prices):
    return [(prices[i] - prices[i-1]) / prices[i-1] for i in range(1, len(prices))]

def rolling_vol(returns, window):
    vols = []
    for i in range(window, len(returns)):
        chunk = returns[i - window:i]
        mean = sum(chunk) / window
        var = sum((r - mean) ** 2 for r in chunk) / window
        vols.append(var ** 0.5)
    return vols

def run():
    prices = make_prices(20_000)
    rets = pct_returns(prices)
    return sum(rolling_vol(rets, 30))

profiler = cProfile.Profile()
profiler.enable()
run()
profiler.disable()

stats = pstats.Stats(profiler).sort_stats("cumulative")
stats.print_stats(6)
```

Running this produces real output like:

```
         798951 function calls in 0.263 seconds

   Ordered by: cumulative time

   ncalls  tottime  percall  cumtime  percall filename:lineno(function)
        1    0.000    0.000    0.263    0.263 profiling_demo.py:33(run)
        1    0.023    0.023    0.220    0.220 profiling_demo.py:23(rolling_vol)
    39939    0.076    0.000    0.195    0.000 {built-in method builtins.sum}
   619039    0.120    0.000    0.120    0.000 profiling_demo.py:28(<genexpr>)
        1    0.010    0.010    0.036    0.036 profiling_demo.py:9(make_prices)
    19999    0.015    0.000    0.024    0.000 random.py:556(gauss)
```

`rolling_vol` accounts for 0.220 of the 0.263 total seconds — it's clearly the function to optimize. But `cProfile` only tells you it's *this function*; it can't tell you *which line inside it*. For that, you need the next tool.

## `line_profiler`: profile line by line

`line_profiler` instruments a single decorated function and reports time spent on every individual line. You run it via the `kernprof` command-line tool (or `%lprun` inside IPython/Jupyter), decorating the target function with `@profile` — a name `kernprof` injects automatically, so the file doesn't need to import anything to use it:

```python
@profile
def rolling_vol(returns, window):
    vols = []
    for i in range(window, len(returns)):
        chunk = returns[i - window:i]
        mean = sum(chunk) / window
        var = sum((r - mean) ** 2 for r in chunk) / window
        vols.append(var ** 0.5)
    return vols
```

Run with `kernprof -l script.py` then view with `python -m line_profiler script.py.lprof`. Real output from this exact function, run against 20,000 returns:

```
Total time: 0.301975 s
File: lprun_demo.py
Function: rolling_vol at line 1

Line #      Hits         Time  Per Hit   % Time  Line Contents
==============================================================
     1                                           @profile
     2                                           def rolling_vol(returns, window):
     3         1          0.5      0.5      0.0      vols = []
     4     19971       4282.9      0.2      1.4      for i in range(window, len(returns)):
     5     19970      10246.8      0.5      3.4          chunk = returns[i - window:i]
     6     19970      11975.1      0.6      4.0          mean = sum(chunk) / window
     7     19970     264438.0     13.2     87.6          var = sum((r - mean) ** 2 for r in chunk) / window
     8     19970      11031.8      0.6      3.7          vols.append(var ** 0.5)
     9         1          0.2      0.2      0.0      return vols
```

This is the payoff: 87.6% of the time is on line 7, the variance calculation, not the mean or the loop overhead you might have suspected. That one line — a `sum()` over a generator expression recomputing `(r - mean) ** 2` for every element — is where a rewrite (vectorizing with NumPy, as Lesson 1 covered, or compiling with Numba, coming in Lesson 14) should be aimed.

## `timeit`: precise micro-benchmarks

`cProfile` and `line_profiler` are for finding the bottleneck inside a real program. `timeit` is for a different job: precisely comparing two small snippets, with the measurement overhead minimized and the snippet run many times to average out noise:

```python
import timeit

setup = "import numpy as np; x = np.random.default_rng(0).normal(size=10_000)"
loop_time = timeit.timeit("sum(v**2 for v in x)", setup=setup, number=100)
vec_time = timeit.timeit("(x**2).sum()", setup=setup, number=100)
print(loop_time, vec_time)
```

Reach for `timeit` when you've already isolated a candidate line or two (often with help from `line_profiler`) and want a clean, repeatable number comparing alternatives — not for profiling an entire pipeline, where `cProfile` is the right granularity.

## `memory_profiler`: when RAM is the bottleneck

Sometimes the problem isn't CPU time, it's memory — a pipeline that works fine on a sample and then gets killed on the full dataset. `memory_profiler`'s `memory_usage` function samples a function's memory footprint while it runs:

```python
from memory_profiler import memory_usage
import numpy as np

def build_big_array():
    return np.ones((20_000_000,), dtype=np.float64)   # 20M float64 = ~160 MB

mem, result = memory_usage((build_big_array, (), {}), retval=True, interval=0.05)
print(f"min={min(mem):.1f} MB, max={max(mem):.1f} MB, delta={max(mem)-min(mem):.1f} MB")
```

Real measured output:

```
min=186.4 MB, max=339.0 MB, delta=152.6 MB
```

That matches the back-of-envelope math (20,000,000 × 8 bytes ≈ 152.6 MB) almost exactly — `memory_profiler` confirms the allocation is exactly what you'd expect, which is the same discipline as CPU profiling: measure, don't assume.

## Reading the numbers, deciding what matters

A profiler produces a lot of numbers; the skill is knowing which ones to act on. Favor `cumtime` over `tottime` when deciding what to attack first — a function might have low `tottime` itself but a high `cumtime` because of what it calls. Ignore anything under a few percent of total runtime; optimizing a line that's 0.5% of the run buys you almost nothing. And always re-profile after a fix — the bottleneck moves once you remove the biggest one, and the next-biggest offender is rarely where you'd guess either.

## Key terms

| Term | Meaning |
|---|---|
| `cProfile` | Built-in deterministic profiler; reports per-function call counts and timing |
| `tottime` / `cumtime` | Time spent in a function alone, vs. including everything it calls |
| `line_profiler` / `kernprof` | Line-by-line timing inside one decorated function |
| `timeit` | Precise, repeated-run timing for comparing small code snippets |
| `memory_profiler` | Samples a function's memory usage over time, for RAM-bound problems |

## Recap

Profile before you optimize: `cProfile` finds the slow function, `line_profiler` finds the slow line inside it, `timeit` compares small alternatives precisely, and `memory_profiler` covers the case where RAM, not CPU time, is the constraint. Next lesson: algorithmic complexity — why some slowdowns are a constant-factor problem profiling can fix, and others are a Big-O problem that no amount of micro-optimization will solve.
