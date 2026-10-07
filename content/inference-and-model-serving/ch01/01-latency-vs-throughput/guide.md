# Latency vs. Throughput

Welcome to Inference & Model Serving, the fourth and final course in the AI Infrastructure & ML Systems Engineer path. The first three courses got a model trained, packaged, and ready to run. This course is about the last mile: making that model answer real requests, fast and cheaply, at scale. Before touching any serving framework, you need two words you'll use in every lesson from here on — latency and throughput. They sound like synonyms for "fast." They aren't, and the gap between them is the single biggest design tension in model serving.

## What you'll learn

- What latency actually measures, and why "time to first token" and "per-token latency" matter more than one end-to-end number for LLMs
- What throughput measures, and the units it's usually reported in
- Why pushing throughput up tends to push latency up too, and why that isn't a bug
- How to pick which metric to optimize for, based on the use case

## Latency: how long one request waits

Latency is the time a single request spends waiting for its answer. For a classic model (an image classifier, say) that's usually one number: request in, prediction out. For a large language model, teams usually split it into pieces, because a chat UI "feels" different depending on which piece is slow:

- **Time to first token (TTFT)** — how long before the user sees anything at all
- **Per-token latency** (also called inter-token latency) — the gap between each subsequent token once generation has started
- **End-to-end latency** — the total time for the full response

A chatbot with a slow TTFT feels broken even if the rest of the response streams quickly, because the user is staring at a blank screen. A document-summarization job with a slow TTFT is barely noticed, because nobody's watching it live.

## Throughput: how much work the system gets through

Throughput measures total work completed per unit time, not how fast any one request felt. Common units:

- **Requests per second (RPS)** for short, uniform-size workloads
- **Tokens per second**, for LLM workloads, often split into input (prompt) tokens/sec and output (generated) tokens/sec, since prefill and decode cost very different amounts of compute — you'll see that split in Lesson 4

A server generating roughly 2,000 output tokens/sec across 40 concurrent users has about the same total throughput whether those 40 users each feel "snappy" or "sluggish." Throughput doesn't see the individual experience.

## Why they pull against each other

The main lever that raises throughput — batching more requests together so the GPU processes them in one pass instead of many — is the same lever that raises the latency any individual request in that batch feels. It may now wait for other requests to be collected before processing starts, and it shares the GPU's compute with everyone else in the batch. In practice, teams often see throughput roughly double by doubling batch size, while median (p50) latency only creeps up a little — but tail latency (p99), the unlucky requests stuck waiting longest, can climb much faster. That tail is usually the real limiting factor in production, not the average.

## Matching the metric to the use case

- **Interactive chat, copilots, voice assistants** — optimize for low latency, especially TTFT; throughput is secondary because users are impatient but few at a time
- **Batch summarization, offline embedding generation, nightly reports** — optimize for throughput; nobody is watching a progress bar in real time, so maximize tokens/sec per dollar
- **Most production APIs** — define a latency SLO (for example, "p99 TTFT under 500ms") and then maximize throughput within that constraint, instead of treating either metric in isolation

## Key terms

| Term | Meaning |
|---|---|
| Latency | Time a single request waits for its result |
| Time to first token (TTFT) | Latency until the first output token appears |
| Throughput | Total work completed per unit time (RPS or tokens/sec) |
| Tail latency (p99) | The latency experienced by the slowest 1% of requests — usually the real constraint |

## Recap

Latency is about one request's experience; throughput is about the system's total capacity, and the two usually trade off against each other through batching and concurrency. Next up, Lesson 2: we trace a single request through the full inference pipeline, end to end, so you can see exactly where each millisecond of latency actually goes.
