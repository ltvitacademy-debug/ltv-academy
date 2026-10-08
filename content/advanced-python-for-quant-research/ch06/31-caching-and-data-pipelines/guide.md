# Caching & Data Pipelines

Research pipelines frequently recompute the same expensive thing over and over — the same backtest, the same slow data transformation, the same signal calculation — because nothing remembers that it was already done. Caching is the fix, and it's conceptually simple: store the result of an expensive call, keyed by exactly the inputs that determine it, and skip the recomputation when those inputs repeat. This closing lesson of Chapter 6 covers in-memory and disk-based caching, the one genuinely hard part of caching (invalidation), and a real pipeline step with disk caching and measured timing to prove it works.

## What you'll learn

- In-memory caching with `functools.lru_cache` vs. disk-based caching with `diskcache`
- Why cache invalidation is the classic hard problem — keying the cache on what actually determines the output
- Building a research pipeline step with disk caching so a re-run skips expensive recomputation
- A real, runnable example with measured timing proving the cached call is faster

## In-memory vs. disk-based caching

`functools.lru_cache`, used already in lesson 25's data layer, caches in the current process's memory — fast, zero setup, but gone the moment the process exits. **`diskcache`** persists cached results to disk, so a cache built up over one script run, one notebook session, or one scheduled job (lesson 27) is still there the next time you run it — exactly what a research pipeline wants, where "the expensive backtest I ran yesterday" shouldn't have to be paid for again today just because the process restarted.

## Cache invalidation: the classic hard problem

The entire value of a cache depends on one thing: the key has to capture *everything* that determines the output. Get that wrong and a cache either misses too often (the key is too specific — e.g. including an irrelevant timestamp, so it never hits twice) or, far worse, *returns a stale wrong answer* (the key is too loose — e.g. keyed only on `signal_name` while `lookback` silently changes the result, so two genuinely different calls collide on the same cache entry and the second one wrongly gets the first one's answer). This is why "cache invalidation" has its own reputation as one of the two genuinely hard problems in computer science: the fix isn't a clever algorithm, it's discipline — the cache key must include every argument that actually affects the result, no more and no less, and lesson 24's data fingerprinting is one more input worth including in a cache key if the same code can run against different data versions.

## A real cached pipeline step

```python
import time
import diskcache

cache = diskcache.Cache("cache")

def expensive_backtest(signal_name: str, lookback: int) -> float:
    """Stands in for a slow research computation."""
    key = ("expensive_backtest", signal_name, lookback)
    if key in cache:
        return cache[key]
    time.sleep(1.0)  # simulate real compute cost
    result = lookback * 0.0123 + len(signal_name) * 0.01  # pretend Sharpe ratio
    cache[key] = result
    return result

t0 = time.perf_counter()
r1 = expensive_backtest("momentum_12m", 252)
t1 = time.perf_counter()
print(f"first call: result={r1:.4f}, took {t1 - t0:.3f}s")

t0 = time.perf_counter()
r2 = expensive_backtest("momentum_12m", 252)
t1 = time.perf_counter()
print(f"second call (same inputs): result={r2:.4f}, took {t1 - t0:.3f}s")

t0 = time.perf_counter()
r3 = expensive_backtest("momentum_12m", 126)  # different input -> correctly misses cache
t1 = time.perf_counter()
print(f"third call (different lookback): result={r3:.4f}, took {t1 - t0:.3f}s")
```

```text
first call: result=3.2196, took 1.004s
second call (same inputs): result=3.2196, took 0.000s
third call (different lookback): result=1.6698, took 1.004s
```

The cache key is `(signal_name, lookback)` — both arguments that actually determine the result — so the second call, with identical arguments, returns instantly from disk (`0.000s` vs. `1.004s`) instead of re-running the simulated expensive work, while the third call, with a genuinely different `lookback`, correctly pays the full cost again rather than wrongly reusing the first call's answer. That's the whole discipline in one example: cache key correctness is what makes the second call a legitimate time-saver and the third call a correct cache miss, rather than a silent bug.

## Where this fits the rest of the pipeline

Put together, this chapter and the one before it describe a complete, practical research pipeline: a data layer (lesson 25) with its own in-memory cache for repeated reads, a disk cache (this lesson) wrapping the genuinely expensive computation steps so a scheduled job (lesson 27) or a re-run after a crash doesn't redo work it already finished, and — when the computation itself needs SQL-style aggregation or point-in-time joins over the underlying data — DuckDB (lessons 28–29) doing that efficiently thanks to columnar storage. Caching isn't a bolt-on optimization at the end; it's one more piece of the same reproducibility and efficiency story the whole course has been building toward.

## Key terms

| Term | Meaning |
|---|---|
| `functools.lru_cache` | In-memory caching keyed on function arguments, lost when the process exits |
| `diskcache` | Disk-persisted caching that survives across process restarts |
| Cache invalidation | The problem of keeping a cache key accurate to everything that determines the output |
| Cache key | The exact set of inputs used to look up (and store) a cached result; too loose risks stale wrong answers |

## Recap

Caching — in-memory with `functools.lru_cache` for one process, on disk with `diskcache` across runs — turns a slow, repeated computation into a one-time cost, as the real timing in this lesson showed (over 1,000x faster on a cache hit), as long as the cache key actually captures everything that determines the result; get that wrong and a cache silently returns stale, wrong answers instead of saving time. That closes Chapter 6 on databases and data access for quants. Next up: Capstone Kickoff — A Fast, Reproducible Research Library, where every technique from this course, including caching and the data layer from this chapter, comes together into one real project.
