# Measuring Inference Performance

The first four lessons gave you the vocabulary — latency, throughput, the request lifecycle, prefill and decode. This lesson turns that vocabulary into numbers you can actually collect, so that when Chapter 2 introduces real serving frameworks, you know exactly what to look at before and after switching frameworks or changing a config.

## What you'll learn

- The core metrics worth tracking for any LLM serving stack, and which phase (prefill or decode) each one reflects
- Why percentiles matter more than averages, and which percentile to trust
- How load-testing tools simulate real traffic to produce these numbers
- A worked example of reading a benchmark's output

## The core metrics

- **TTFT (time to first token)** — reflects prefill plus any queuing delay; the first thing a user notices
- **TPOT (time per output token)**, also called inter-token latency — reflects decode speed under the current batch/load
- **End-to-end latency** — TTFT plus (TPOT × number of output tokens), roughly; the total wall-clock time for one request
- **Throughput** — total output tokens/sec across all concurrent requests (sometimes also input tokens/sec for prefill-heavy workloads)
- **GPU utilization** — the percentage of time the GPU's compute units are actually doing work, useful for spotting whether decode's memory-bound nature is leaving compute idle
- **Goodput** — a newer, stricter metric some teams use: throughput counting only the requests that *also* met a latency SLO, since raw throughput can hide a system that's "fast on average" but violating its SLO for a meaningful fraction of users

## Why percentiles beat averages

An average latency can look great while a meaningful share of real users have a bad experience, because a few very slow outliers get smoothed out by many fast ones. Serving teams instead report percentiles:

- **p50 (median)** — the typical experience
- **p95 / p99** — the tail; what your least-lucky users experience
- **p99.9** — relevant at very high request volumes, where even a rare 1-in-1000 failure mode affects real people every few minutes

A system can have an excellent p50 TTFT of 150ms and a p99 TTFT of 4 seconds — both numbers are "true," but only the p99 tells you whether your SLA is actually being met. In practice, teams almost always set their latency SLOs on a tail percentile (commonly p95 or p99), never on the average.

## Load-testing tools

You generally can't measure realistic throughput and tail latency with a single manual request — you need a tool that fires many concurrent requests and records timing for each one. Common approaches:

- Generic HTTP load testers (e.g., `wrk`, `hey`, `locust`) pointed at an OpenAI-compatible `/v1/completions` or `/v1/chat/completions` endpoint
- Purpose-built LLM benchmarking tools shipped by the frameworks themselves, such as vLLM's `benchmarks/benchmark_serving.py` script, which replays a dataset of prompts at a controlled request rate and reports TTFT, TPOT, and throughput percentiles directly
- Triton's `perf_analyzer`, which drives synthetic load against any model Triton is serving and reports latency/throughput curves as concurrency increases

## Reading a benchmark's output

A typical serving benchmark run reports something like this (illustrative numbers, not universal — actual results depend heavily on the model, GPU, and request mix):

```
Successful requests:                    500
Request rate (req/s):                   4.80
Input token throughput (tok/s):         2110.4
Output token throughput (tok/s):        864.2
Mean TTFT (ms):                         182.3
P99 TTFT (ms):                          891.7
Mean TPOT (ms):                         24.6
P99 TPOT (ms):                          58.1
```

Reading this: the mean TTFT (182ms) looks fine on its own, but the p99 TTFT (892ms) shows a real gap between the typical and worst-case experience — exactly the pattern Lesson 1 predicted, where tail latency diverges from the average under load. The TPOT numbers tell you decode is fast and stable per token; the P99/mean ratio for TPOT (about 2.4x) being smaller than for TTFT (about 4.9x) suggests the batching/queuing stage, not decode itself, is where the tail risk concentrates — consistent with what Lesson 2 said about queuing delay growing nonlinearly near saturation.

## Key terms

| Term | Meaning |
|---|---|
| TPOT | Time per output token — decode speed under current load |
| Goodput | Throughput counting only requests that also met a latency SLO |
| p99 | The 99th percentile — the experience of your slowest 1% of requests |
| `perf_analyzer` / `benchmark_serving.py` | Purpose-built load-testing tools for Triton and vLLM, respectively |

## Recap

TTFT, TPOT, throughput, and tail percentiles turn the ideas from this chapter into numbers you can track before and after any change to your serving stack, and load-testing tools are how you produce those numbers under realistic concurrency. Chapter 1 is complete — next up, Chapter 2 opens with Lesson 6: why dedicated serving frameworks like vLLM exist at all, instead of just running a model with a plain Python script.
