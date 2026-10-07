# Capstone: Benchmarking & Tuning

The Anchorline Systems deployment from Lesson 35 is running, but "running" isn't the same as "meets the brief." This lesson runs a real benchmarking methodology against it — the throughput, TTFT, TPOT, and latency-percentile metrics from Lesson 5 and Lesson 30 — reads what the numbers actually say, and tunes the deployment in response. This is the loop every serving engineer runs before shipping, and it's the one place in this capstone where you let evidence, not intuition, decide what to change.

## What you'll learn

- The four metrics that matter for a chat-style serving workload, and why each one is measured separately
- How to run a load benchmark against the deployment from Lesson 35 using vLLM's own benchmarking tooling
- How to read a results table and identify the actual bottleneck instead of guessing
- The tuning loop: change one variable, re-benchmark, compare — never tune two things at once

## The metrics that matter

Four numbers, from Lesson 5's measurement fundamentals and Lesson 30's benchmarking lesson, tell the real story of a serving deployment:

- **Throughput** — total tokens generated per second across all concurrent requests. The system-wide capacity number.
- **TTFT (time-to-first-token)** — how long a single request waits before the response starts streaming. The number a human actually feels.
- **TPOT (time-per-output-token)** — once streaming starts, how long each subsequent token takes. Determines how fast the response "types."
- **p50 / p99 latency** — the median and the tail. A deployment with a great median and a terrible p99 still produces angry users during every traffic spike, which is exactly why Lesson 31's SLOs are written against percentiles, not averages.

## Running the benchmark

vLLM ships its own load-testing tool for exactly this, invoked as a subcommand:

```bash
pip install "vllm[bench]"

vllm bench serve \
  --backend vllm \
  --base-url http://localhost:8000 \
  --model meta-llama/Llama-3.1-8B-Instruct \
  --random-input-len 300 \
  --random-output-len 150 \
  --num-prompts 200 \
  --request-rate 10
```

This fires 200 synthetic requests shaped like Anchorline's real traffic — a few hundred tokens of question-plus-logs in, a shorter answer out — arriving at a sustained rate of 10 requests per second, and reports throughput, TTFT, TPOT, and latency percentiles across the run. Flag names can shift slightly between vLLM releases, so `vllm bench serve --help` is always the ground truth for your installed version.

## Reading a baseline, and tuning from it

An illustrative baseline run against Lesson 35's deployment, exactly as configured, might look like this — treat every number here as a rough, representative example, not a claimed real measurement:

```text
Baseline (max-num-seqs=64, gpu-memory-utilization=0.90)
  Throughput:        ~1,450 tok/s
  TTFT   p50 / p99:   410ms / 1,180ms
  TPOT   p50 / p99:    28ms /   61ms
  Request p99 latency: 3.9s

After tuning (max-num-seqs=96, gpu-memory-utilization=0.95)
  Throughput:        ~1,890 tok/s
  TTFT   p50 / p99:   380ms /   720ms
  TPOT   p50 / p99:    24ms /   47ms
  Request p99 latency: 2.6s
```

The baseline's p99 TTFT — 1,180ms — misses Anchorline's roughly 500ms target under load, even though the median looks fine. That gap between p50 and p99 is the signal: it points at queuing under burst traffic, not a slow model. The fix is capacity, not precision — raising `--max-num-seqs` so more requests can be in flight at once, and nudging `--gpu-memory-utilization` up to give the larger batch more KV-cache room. Both numbers improve together because they were the actual bottleneck; a different symptom, like a slow p50 TPOT with a tight p99, would have pointed at quantization or a smaller model instead.

The discipline that makes this trustworthy: change one variable, re-run the exact same benchmark command, and compare. Changing `--max-num-seqs` and `--quantization` in the same run would leave you unable to say which change caused which improvement.

## Key terms

| Term | Meaning |
|---|---|
| TPOT | Time-per-output-token — the pace of token generation once streaming has started |
| p99 latency | The worst latency experienced by 99% of requests — the tail that SLOs are written against |
| `vllm bench serve` | vLLM's built-in load-testing subcommand for online serving benchmarks |
| Tuning loop | Change one variable, re-benchmark, compare — never tune two variables in the same run |

## Recap

Benchmarking turned "it's running" into a specific, provable gap — p99 TTFT missing the target under load — and the tuning loop closed most of that gap by raising the batch ceiling and memory budget, the actual bottleneck the numbers pointed to. Next up, Lesson 37: writing this up, and closing out the entire AI Infrastructure / ML Systems Engineer destination.
