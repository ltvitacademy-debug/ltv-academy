# Measuring Performance & Benchmarking

Chapter 6 is about making C++ code fast — but the single most important rule of performance work is that you measure first. Intuition about what's slow is wrong astonishingly often, and "optimizing" code that wasn't actually the bottleneck wastes effort and can make the real code harder to read for no benefit. This lesson covers how to time code correctly with `std::chrono`, the pitfalls that make naive benchmarks lie to you, and a first look at Google Benchmark, the standard tool for doing this properly.

## What you'll learn

- Why "I think this is slow" is not a substitute for a measurement
- How to time code correctly with `std::chrono::high_resolution_clock`
- Three classic benchmarking traps: compiler optimizing away your work, cold cache, and warm-up
- A first look at the Google Benchmark library's basic shape

## Timing code with std::chrono

The standard library's `<chrono>` header gives you a monotonic, high-resolution clock suitable for measuring elapsed wall-clock time:

```cpp
#include <chrono>
#include <iostream>

double price_option(double spot, double strike);

int main() {
    auto start = std::chrono::high_resolution_clock::now();

    double result = price_option(100.0, 105.0);

    auto end = std::chrono::high_resolution_clock::now();
    auto elapsed = std::chrono::duration_cast<std::chrono::microseconds>(end - start);

    std::cout << "took " << elapsed.count() << " microseconds, result=" << result << '\n';
}
```

`high_resolution_clock::now()` returns a `time_point`; subtracting two of them gives a `duration`, and `duration_cast` converts that duration into the unit you want to report. Prefer `high_resolution_clock` (or `steady_clock`, which is guaranteed monotonic — it never goes backward, even if the system clock is adjusted) over `system_clock` for measuring elapsed time; `system_clock` can jump due to NTP synchronization.

## Three traps that make naive benchmarks lie

**1. The compiler optimizes your "work" away.** If you compute a result and never use it, an optimizing compiler is allowed to delete the computation entirely — you'd be timing an empty loop. Always consume the result (print it, accumulate it, or write it to a `volatile` sink) so the compiler cannot prove it's dead.

```cpp
// WRONG: the compiler may delete this whole loop — result is never used
for (int i = 0; i < 1000000; ++i) {
    double r = price_option(100.0, 105.0);
}

// BETTER: accumulate into something observed after the loop
double total = 0.0;
for (int i = 0; i < 1000000; ++i) {
    total += price_option(100.0, 105.0);
}
std::cout << total << '\n';   // forces the work to actually happen
```

**2. Cold cache and cold branch predictor on the first call.** The very first call to a function pays costs later calls don't — instructions and data aren't yet in cache, and branch predictors haven't learned the function's typical behavior. Always run a "warm-up" pass before the timed region, and discard its results.

**3. Measuring something too short to time accurately.** A single call that takes 50 nanoseconds is smaller than the clock's own measurement noise. Run the operation thousands or millions of times in a loop and divide, rather than trusting one timed call.

## A first look at Google Benchmark

Hand-rolled `std::chrono` timing is fine for a quick check, but it is easy to get subtly wrong (forgetting warm-up, forgetting to prevent dead-code elimination, not running enough iterations to be statistically stable). Google Benchmark automates all of this:

```cpp
#include <benchmark/benchmark.h>

static void BM_PriceOption(benchmark::State& state) {
    for (auto _ : state) {
        double result = price_option(100.0, 105.0);
        benchmark::DoNotOptimize(result);   // prevents dead-code elimination
    }
}
BENCHMARK(BM_PriceOption);
BENCHMARK_MAIN();
```

The library runs your loop body enough times to get a statistically stable measurement, reports time per iteration, and `benchmark::DoNotOptimize` solves trap #1 for you explicitly. You'll use Google Benchmark (or an equivalent) throughout the rest of this chapter to validate that each optimization technique actually helped.

## Key terms

| Term | Meaning |
|---|---|
| `std::chrono::high_resolution_clock` | A monotonic clock suitable for measuring elapsed wall-clock time |
| `duration_cast` | Converts a `std::chrono::duration` into a different time unit |
| Warm-up | A discarded initial run to avoid timing cold-cache/cold-branch-predictor costs |
| Dead-code elimination | The compiler removing computations whose results are never used |
| Google Benchmark | A library that automates correct, statistically stable microbenchmarking |

## Recap

Never optimize based on a guess — time it first, correctly, accounting for dead-code elimination, cold-cache effects, and measurement noise, and prefer a real benchmarking library like Google Benchmark once you move past a quick sanity check. Next up, Lesson 27: CPU Caches & Data Layout, the first concrete thing worth measuring and fixing.
