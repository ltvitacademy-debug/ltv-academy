# Script — Latency vs. Throughput

## Segment 1 (title)

Welcome to Inference and Model Serving, the fourth and final course in the AI Infrastructure and ML Systems Engineer path. The first three courses got a model trained and packaged. This one is about the last mile: making that model answer real requests, fast and cheaply, at scale. We start with two words you'll use constantly — latency and throughput — and the gap between them.

## Segment 2 (steps)

Latency is how long one request waits. For a large language model, teams usually split it into pieces: time to first token, or TTFT, is how long before the user sees anything at all. Per-token latency is the gap between each token after that. And end-to-end latency is the total time for the whole response. A slow TTFT makes a chatbot feel broken even if the rest streams quickly, because the user is staring at a blank screen.

## Segment 3 (steps)

Throughput measures total work completed per unit time, not how any one request felt. It's usually reported as requests per second for short, uniform jobs, or tokens per second for LLM workloads — often split into prompt tokens and generated tokens, since those cost very different amounts of compute.

## Segment 4 (steps)

The two trade off through one main lever: batching. Bigger batches raise total throughput, but they also raise the wait each individual request feels, since it shares the GPU and may wait for the batch to fill. Median latency creeps up a little; tail latency, the p99, can climb much faster — and that tail is usually what actually limits production, not the average.

## Segment 5 (outro)

Interactive chat optimizes for latency; batch jobs optimize for throughput; most production APIs set a latency ceiling and maximize throughput underneath it. Up next, lesson two: tracing one request through the full inference pipeline, end to end.
