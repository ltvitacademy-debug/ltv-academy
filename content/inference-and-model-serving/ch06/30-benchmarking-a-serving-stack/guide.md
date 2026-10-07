# Benchmarking a Serving Stack

Every number in Lesson 29's cost formula — tokens/sec, utilization, latency — has to come from somewhere real, not a vendor's marketing page. This lesson covers how to actually measure a serving stack's performance under conditions that resemble production, instead of a single hand-timed request that tells you almost nothing about how it behaves under load.

## What you'll learn

- The metrics worth capturing, and why percentiles matter more than averages
- Why a single request, or a tiny handful of them, doesn't tell you anything useful
- How to generate realistic load instead of a uniform, unrealistic one
- The most common benchmarking mistakes that quietly invalidate results

## Metrics that matter

A useful benchmark captures the same metrics you've already met across this course, not just "it answered":

- **Time to first token (TTFT)** and **inter-token latency (ITL)** — not just end-to-end latency, since they tell you *where* time is going (Lesson 1)
- **Throughput** — requests/sec and tokens/sec, both input and output
- **Percentiles, not just the mean** — p50, p90, and especially p99, since tail latency is usually what actually matters in production (Lesson 1 again)

Reporting a single average latency number hides exactly the information you need: whether most requests are fast with a few catastrophic outliers, or everything is uniformly mediocre, looks identical on an average but requires completely different fixes.

## Generate realistic load, not a toy load

A benchmark run against one request at a time, or a fixed, unrealistically uniform set of prompts, measures something, but not what production will actually look like:

- **Concurrency ramps** — test at increasing levels of simultaneous requests (1, 10, 50, 200...) to find where the system's behavior changes, rather than testing at one fixed concurrency and assuming it generalizes
- **Realistic arrival patterns** — real traffic doesn't arrive at perfectly even intervals; tools that can simulate bursty or Poisson-distributed arrivals produce results closer to what you'll actually see
- **Realistic prompt and output length distributions** — a workload of all-short prompts and all-short outputs will badly under-represent the cost and latency of the long-context, long-generation requests that show up in production

```bash
# Example: vLLM's built-in serving benchmark against a running endpoint
vllm bench serve \
  --backend vllm \
  --model meta-llama/Llama-3.1-8B-Instruct \
  --dataset-name random \
  --num-prompts 500 \
  --request-rate 20
```

Purpose-built tools like vLLM's own benchmarking suite, NVIDIA's GenAI-Perf, or general HTTP load generators (k6, Locust) adapted for streaming responses are the usual choices — a hand-rolled loop of sequential `curl` calls won't reproduce the concurrency effects (queuing, batching, contention) that actually determine production performance.

## Common pitfalls

- **No warm-up** — the first few requests often include one-time costs (CUDA kernel compilation, cache population) that don't represent steady-state performance; discard them or run a warm-up pass first
- **Too few samples for percentile accuracy** — you need hundreds, not tens, of requests to get a trustworthy p99 reading
- **Ignoring queueing effects** — a benchmark client that waits for each response before sending the next one never actually tests concurrent load
- **The client becomes the bottleneck** — if the load-generating machine itself runs out of CPU, network bandwidth, or connections, you're benchmarking the client, not the server

## Key terms

| Term | Meaning |
|---|---|
| TTFT / ITL | Time to first token / inter-token latency — where end-to-end time actually goes |
| Concurrency ramp | Testing at increasing levels of simultaneous load to find behavior changes |
| Warm-up | A discarded initial pass to avoid one-time startup costs skewing results |
| Client-side bottleneck | When the load generator, not the server, is the thing actually limiting results |

## Recap

A trustworthy benchmark captures TTFT, ITL, and throughput at real percentiles, under realistic concurrency and prompt/output length distributions — and a handful of common mistakes (no warm-up, too few samples, a bottlenecked client) can quietly invalidate all of it. Next up, Lesson 31: once you can measure performance reliably, how do you turn those numbers into a concrete commitment — an SLO?
