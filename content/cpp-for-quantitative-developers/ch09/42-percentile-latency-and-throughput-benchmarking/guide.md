# Percentile Latency and Throughput Benchmarking

Lesson 26 taught correct microbenchmarking with `std::chrono` and Google Benchmark — timing something accurately, without the compiler or a cold cache lying to you. This lesson covers a different, equally important question: once you've correctly measured thousands of individual latency samples from a running system, what should you actually report? The mean is the single most misleading number you can lead with, and this lesson shows exactly why with a real, computed example.

## What you'll learn

- Why mean (average) latency systematically hides the tail that actually matters in trading systems
- Percentiles (p50, p95, p99, p99.9) and how to compute them correctly from recorded samples
- A worked example showing just how badly the mean can mislead
- Latency vs. throughput: two different questions that need two different measurements

## Why the mean hides exactly what you need to see

A system that processes 10,000 ticks with a mean latency of 10 microseconds sounds uniformly fast. But "mean" only tells you the average — it says nothing about whether every single tick took close to 10 microseconds, or whether 9,900 of them took 9 microseconds and 100 of them took 250 microseconds. In a trading system, that second scenario is the one that actually matters: a rare but real tail of slow outliers (a page fault, a cache miss, a GC-like pause in some underlying library, OS scheduling jitter) can be the difference between a profitable fill and a stale, rejected one — and the mean alone cannot tell you that tail exists.

## Percentiles: the right way to report latency

A **percentile** answers "what fraction of samples were at or below this value?" **p50** (the median) is the value half of all samples fall at or below. **p99** is the value 99% of samples fall at or below — meaning only 1% of samples were slower than this. **p99.9** pushes further: only 1 in 1,000 samples was slower. Computing percentiles correctly just requires sorting the recorded samples and indexing into the sorted array:

```cpp
#include <vector>
#include <algorithm>
#include <cstdint>
#include <cmath>

double percentile(std::vector<double>& sorted_samples, double p) {
    // sorted_samples MUST already be sorted ascending before calling this.
    size_t idx = static_cast<size_t>(std::ceil((p / 100.0) * sorted_samples.size())) - 1;
    idx = std::min(idx, sorted_samples.size() - 1);
    return sorted_samples[idx];
}

void report_latency_stats(std::vector<double> latencies_us) {
    std::sort(latencies_us.begin(), latencies_us.end());

    double sum = 0.0;
    for (double v : latencies_us) sum += v;
    double mean = sum / latencies_us.size();

    std::cout << "mean:  " << mean << " us\n";
    std::cout << "p50:   " << percentile(latencies_us, 50)   << " us\n";
    std::cout << "p95:   " << percentile(latencies_us, 95)   << " us\n";
    std::cout << "p99:   " << percentile(latencies_us, 99)   << " us\n";
    std::cout << "p99.9: " << percentile(latencies_us, 99.9) << " us\n";
}
```

## A real worked example: how badly the mean can mislead

Running this exact computation against a realistic simulated distribution — 10,000 latency samples, mostly clustered around 8-12 microseconds, with 1% of samples hit by a tail event adding 50-250 microseconds (modeling the kind of rare pause a real system actually experiences) — produces:

```
n=10000
mean:  10.55 us
p50:   9.03 us
p95:   11.12 us
p99:   12.85 us
p99.9: 228.66 us
max:   255.62 us
```

Look at what this reveals: the mean (10.55 us), p50 (9.03 us), and even p99 (12.85 us) all look consistently fast and unremarkable — you could report any of the first three numbers and sound like you have a well-behaved, low-latency system. **p99.9 (228.66 us) is over 20x the mean.** That single number is the only one in this table that actually exposes the tail event affecting 1% of traffic — and in a trading system processing thousands of messages per second, "1% of the time" is not a rare, ignorable edge case; it's a regular, recurring cost that a mean-only report completely conceals.

## Latency vs. throughput: two different questions

**Latency** asks "how long did this one operation take?" **Throughput** asks "how many operations can the system complete per unit time?" These are related but genuinely different, and optimizing for one can hurt the other: batching many small operations together typically improves throughput (fewer per-operation overheads, better cache and pipeline utilization) but can hurt latency for any individual operation stuck waiting in that batch — which is exactly the same tension Lesson 39 covered with Nagle's algorithm trading latency for network efficiency. A trading system's order-entry path almost always prioritizes latency (get *this* order out fast); a historical-data ingestion pipeline almost always prioritizes throughput (process the whole day's data as fast as possible, individual record timing irrelevant). Knowing which one actually matters for a given system is a design decision, not a detail — and reporting the wrong metric (throughput for a latency-critical path, or a mean latency number for a throughput-critical one) actively hides whether the system is doing its real job well.

## Key terms

| Term | Meaning |
|---|---|
| Percentile | The value below which a given fraction of samples fall (e.g., p99 = 99% of samples are at or below this value) |
| Tail latency | The behavior of the slowest fraction of samples, typically reported as p99/p99.9 |
| Latency | How long one individual operation takes |
| Throughput | How many operations a system completes per unit time |

## Check yourself

In the worked example, mean, p50, and p99 all looked fast and unremarkable, but p99.9 was over 20x the mean. Why is p99.9 — not the mean — the number a trading system's operators should actually watch closely?
