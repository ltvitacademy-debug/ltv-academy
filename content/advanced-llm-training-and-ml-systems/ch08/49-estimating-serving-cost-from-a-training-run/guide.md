# Estimating Serving Cost From a Training Run

Lessons 47 and 48 gave you the two numbers that matter most for serving: how much memory the KV cache needs, and how much quantization can shrink the weights. This lesson puts them to work on a question training teams get asked constantly and often can't answer: "roughly what will it cost to serve this?" You don't need a serving team's precision to give a useful, defensible estimate — you need the order of magnitude and the assumptions that drive it.

## What you'll learn

- The handful of inputs a serving cost estimate actually depends on
- How to size GPU memory requirements for weights plus KV cache at a target concurrency
- A rough throughput-to-cost calculation in terms of tokens served per dollar
- Where estimates go wrong: the assumptions that silently dominate the answer
- Why this is a planning tool, not a substitute for real load testing

## The inputs that drive the estimate

A serving cost estimate needs surprisingly few numbers, but getting them right matters more than the formula itself:

- **Model size and precision** — parameter count and whether it's served in bf16, int8, or int4 (Lesson 48) sets the weight memory footprint.
- **Target context length and concurrency** — how long are typical requests, and how many do you need to serve at once? This sets KV cache memory (Lesson 47).
- **GPU memory and its $/hour cost** — what hardware fits the above, and what it costs to rent or amortize.
- **Expected throughput** — tokens/sec the chosen serving stack (vLLM, TGI) achieves on that hardware for that model and quantization level, which in practice you'd benchmark, not guess.

## A worked estimate

```python
# Rough serving cost estimate -- order of magnitude, not a quote
params_b = 8                      # 8B-parameter model
bytes_per_param = 1               # int8 quantized
weight_gb = params_b * bytes_per_param  # 8 GB of weights

kv_cache_gb_per_seq = 1.1         # from Lesson 47's worked example
target_concurrency = 16
kv_cache_total_gb = kv_cache_gb_per_seq * target_concurrency  # ~17.6 GB

total_gb_needed = weight_gb + kv_cache_total_gb  # ~25.6 GB -> fits one 40GB GPU

gpu_cost_per_hour = 2.50          # example on-demand rate
throughput_tokens_per_sec = 1800  # benchmarked, not assumed, on this stack

tokens_per_hour = throughput_tokens_per_sec * 3600
cost_per_million_tokens = (gpu_cost_per_hour / tokens_per_hour) * 1_000_000
# ~= $0.39 per million output tokens, at this concurrency and hardware
```

The specific numbers above are illustrative — the point is the shape of the calculation: weight memory plus concurrency-scaled KV cache memory determines what hardware you need; throughput on that hardware (measured, ideally, not estimated) converts a GPU-hour rate into a cost per token.

## Where estimates go wrong

The two assumptions that dominate and are easiest to get wrong: **throughput**, because it depends heavily on the actual serving stack, batching strategy, and real request-length distribution, not just raw hardware specs — a naive "GPU FLOPs / model FLOPs" calculation routinely overestimates achievable throughput by a large factor; and **concurrency**, because planning for average load instead of peak load produces an estimate that looks great until a real traffic spike hits and the KV cache budget runs out mid-day.

## This is a planning tool, not a guarantee

An estimate like this is for deciding whether a model is even in a reasonable cost range before committing engineering time to it, and for setting expectations with the team that will serve it. It is explicitly not a substitute for benchmarking the actual serving stack, on the actual hardware, with a realistic request mix — which is exactly the kind of validation the serving team referenced in the next lesson's handoff should be doing before anything goes to production traffic.

## Key terms

- **Serving cost estimate** — an order-of-magnitude projection of $/token based on weight memory, KV cache memory, GPU cost, and measured throughput
- **Concurrency** — the number of requests served simultaneously, which scales KV cache memory linearly
- **Cost per million tokens** — a common normalized unit for comparing serving configurations
- **Throughput benchmarking** — measuring real tokens/sec on the actual stack, rather than estimating from hardware specs alone
