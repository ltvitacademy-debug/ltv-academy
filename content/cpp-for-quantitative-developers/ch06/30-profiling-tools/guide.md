# Profiling Tools

Every lesson in this chapter has assumed you know which function is actually slow. In real code, that assumption is usually wrong — the bottleneck is rarely where you'd guess. A **profiler** measures where a program actually spends its time (or memory), and this lesson is your map of the main tools: `perf` for CPU sampling on Linux, Valgrind's suite for memory and cache behavior, and a quick look at what a flame graph is actually showing you.

## What you'll learn

- Why profiling, not guessing, is how real optimization work starts
- `perf record` / `perf report` for CPU-time sampling on Linux
- What Valgrind's `callgrind` and `cachegrind` tools measure, and how they differ from `perf`
- How to read a flame graph

## Why profile instead of guessing

Lesson 26 already established the first principle: measure before you optimize. Profiling is that principle applied to an entire program instead of one function — instead of timing a function you already suspect is slow, a profiler tells you, across the whole run, exactly where the time actually went. Developers are reliably bad at guessing this; a function that "feels" expensive because it's complicated is often a tiny fraction of total runtime, while a function that "feels" trivial (string formatting, a container lookup called in a hot loop) is often the real cost.

## perf: sampling-based CPU profiling on Linux

`perf` is the standard Linux profiler, and it works by **sampling**: it periodically interrupts the running program (e.g. thousands of times per second) and records where the program counter was at each interrupt. Over enough samples, the functions where the program spends the most time accumulate the most samples.

```
perf record -g ./pricer         # run the program, recording call-stack samples
perf report                     # view a breakdown of time spent per function
```

The `-g` flag records call graphs too, so `perf report` can show you not just "this function was expensive" but "this function was expensive, and here's the call chain that led to it." Because sampling has very low overhead, `perf` is suitable for profiling realistic workloads, not just toy benchmarks — unlike instrumentation-based profilers, which add overhead to every single call and can distort timing-sensitive code.

## Valgrind: callgrind and cachegrind

Valgrind runs your program inside a software CPU emulator, which lets it measure things a hardware sampler can't see directly, at the cost of running your program roughly 20-50x slower while doing it:

- **`callgrind`** — counts exact instructions executed per function and builds a precise call graph, useful when you need exact counts rather than statistical samples (good for comparing two implementations' instruction counts directly).
- **`cachegrind`** — simulates the cache hierarchy from Lesson 27 and reports actual cache-miss counts per line of code, which is the most direct way to confirm whether a data-layout change (array-of-structs vs. struct-of-arrays, say) really reduced cache misses.

```
valgrind --tool=callgrind ./pricer
callgrind_annotate callgrind.out.<pid>

valgrind --tool=cachegrind ./pricer
cg_annotate cachegrind.out.<pid>
```

Because of the heavy slowdown, run Valgrind's tools against a small, representative workload rather than a full production-scale run, and reserve them for the specific question `perf`'s sampling can't answer precisely enough.

## Reading a flame graph

A flame graph is a visualization built from stacked call-graph samples (often from `perf`). Each horizontal bar is a function; its width is proportional to the total time it (and everything it called) was on the stack across all samples, and stacking a bar on top of another shows "this function called that one." The widest bars at any given level are where time actually went — tall, narrow spikes are deep call chains that individually consumed little total time, while a wide bar anywhere in the graph is worth investigating regardless of how deep it sits. This is often the fastest way to spot an unexpected bottleneck across an entire program at a glance, rather than reading a table of function names and percentages.

## Key terms

| Term | Meaning |
|---|---|
| Sampling profiler | Periodically records the call stack to statistically estimate time spent per function |
| `perf record` / `perf report` | Linux's standard low-overhead CPU sampling profiler |
| `callgrind` | Valgrind tool giving exact instruction counts and call graphs (slow, precise) |
| `cachegrind` | Valgrind tool simulating the cache hierarchy to report real cache-miss counts |
| Flame graph | A visualization where bar width shows total time spent in a function across all samples |

## Recap

Profiling replaces guessing with evidence: `perf` gives you fast, low-overhead sampling suitable for realistic workloads, Valgrind's `callgrind`/`cachegrind` trade speed for exact instruction and cache-miss counts, and a flame graph turns all of that into a picture where the widest bars are the bottlenecks worth fixing. That closes Chapter 6 on performance optimization. Next up, Chapter 7 begins with Lesson 31: Calling C++ From Python With pybind11, where the C++ you've just learned to measure and optimize gets wired up to the quant research stack most desks actually work in day to day.
