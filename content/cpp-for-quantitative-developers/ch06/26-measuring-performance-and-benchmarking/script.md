# Script — Measuring Performance & Benchmarking

## Segment 1 (title)

This chapter is about making C++ fast, and the single most important rule in it has nothing to do with C++ at all: measure first. Intuition about what's slow is wrong astonishingly often, and optimizing code that was never actually the bottleneck just wastes effort. We start with how to measure correctly.

## Segment 2 (code)

The chrono header gives you a monotonic, high-resolution clock. Grab a time point before your work, grab another after, and subtract to get a duration, then cast that duration into whatever unit you want to report. Prefer high-resolution clock or steady clock over system clock specifically because system clock can jump around due to time synchronization — it's not guaranteed to only move forward.

## Segment 3 (steps)

Naive timing lies to you in three classic ways. First, dead-code elimination: if you compute a result and never use it, an optimizing compiler is allowed to delete the entire computation, and you end up timing nothing. Second, cold cache and cold branch predictor: the very first call to a function pays costs later calls don't, because nothing's in cache yet and the branch predictor hasn't learned the function's behavior. Third, measuring something too short: a single call that takes fifty nanoseconds is smaller than the clock's own measurement noise.

## Segment 4 (code)

The fix for the first trap is simple: don't let the result go unused. Accumulate every call's output into a total and print that total afterward, and the compiler can no longer prove the loop does nothing, so it has to actually run it.

## Segment 5 (code)

Hand-rolled chrono timing is fine for a quick sanity check, but it's easy to get subtly wrong — forgetting warm-up, forgetting to stop dead-code elimination, not running enough iterations to be statistically stable. Google Benchmark automates all of that: you write the loop body, call DoNotOptimize on the result to stop the compiler from deleting it, and the library handles warm-up and iteration count for you, reporting a stable time per call.

## Segment 6 (outro)

Measure correctly before you touch anything, account for dead code elimination and cold-start effects, and reach for a real benchmarking library once you're past a quick check. Up next, lesson twenty-seven: CPU caches and data layout — the first concrete thing in this chapter actually worth measuring and fixing.
