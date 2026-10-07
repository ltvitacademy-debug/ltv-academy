# The Inference Request Lifecycle

In Lesson 1 you learned that latency gets sliced into pieces like TTFT and per-token latency. This lesson shows you exactly where those pieces come from, by walking a single request through every stage of a model-serving system — from the moment an HTTP call lands to the moment the last token streams back. Once you can see the stages, you can reason about which stage to optimize when a request feels slow.

## What you'll learn

- The six stages a typical inference request passes through, from the client to the GPU and back
- Where queuing delay and cold starts hide, and why they're invisible in a model's own benchmark numbers
- The difference between the serving framework's job and the model runtime's job
- Why most "slow inference" complaints turn out to be about stages that aren't the model at all

## The six stages

1. **Client request arrives** — an HTTP or gRPC call reaches a load balancer or API gateway, carrying the prompt (and parameters like max tokens, temperature).
2. **Routing and admission** — the serving framework decides which replica/GPU handles the request, and whether to admit it immediately or queue it. This is where **queuing delay** is born: if every GPU is already busy, the request waits here before any model code runs at all.
3. **Tokenization** — the raw text prompt is converted into token IDs using the model's tokenizer. Fast, CPU-bound, and almost always negligible — but it still counts toward end-to-end latency.
4. **Scheduling into a batch** — the framework's scheduler decides which requests run together in this step (you'll go deep on this in Lesson 3). A request can sit here briefly while the scheduler waits to see if more requests will join the batch.
5. **Model execution on the GPU** — the actual forward pass: prefill of the prompt, then decode of each output token one at a time (Lesson 4 covers this split in detail). This is the stage most engineers picture when they say "inference," but it's often not the biggest source of delay.
6. **Detokenization and response streaming** — output token IDs are converted back to text and streamed to the client, usually one token (or a few) at a time via server-sent events or a streaming gRPC response.

## Where the hidden delay actually lives

Benchmarks that only measure stage 5 (model execution) in isolation routinely look much faster than what users experience in production, because stages 1–2 and 4 introduce delay that never shows up in a model-only micro-benchmark:

- **Queuing delay** at stage 2 grows nonlinearly as a server approaches saturation — a GPU at 60% utilization might add a few milliseconds of queue wait, while the same GPU at 95% utilization can add seconds.
- **Cold starts** happen when a replica has to load model weights into GPU memory before serving its first request — this can take anywhere from several seconds to a couple of minutes for a large model, and autoscalers that spin up new replicas under load will hit this repeatedly unless they keep a warm pool.
- **Batch-formation wait** at stage 4 is a deliberate trade-off: a framework doing dynamic batching (Lesson 3) will sometimes hold a request a few extra milliseconds hoping another request arrives to batch with it, trading a little latency for better throughput.

## Framework job vs. runtime job

It helps to separate two layers that are easy to blur together:

- The **serving framework** (vLLM, TensorRT-LLM, Triton Inference Server — all covered in Chapter 2) owns stages 1, 2, 4, and 6: routing, admission, scheduling, and the client-facing protocol.
- The **model runtime / execution engine** underneath it owns stage 5: the actual matrix multiplications on the GPU, often using a compiled kernel library.

A serving framework can be excellent at scheduling and still be slow if it wraps a poorly optimized execution engine — and the reverse is also true. Diagnosing a latency problem means figuring out which of the two layers is actually responsible.

## Key terms

| Term | Meaning |
|---|---|
| Queuing delay | Time a request waits for GPU admission before any model code runs |
| Cold start | Delay from loading model weights into GPU memory for the first time |
| Tokenization / detokenization | Converting text to token IDs and back, at the edges of the pipeline |
| Serving framework vs. runtime | The scheduling/routing layer vs. the actual GPU execution layer |

## Recap

A request's total latency is the sum of every stage it passes through — not just the GPU forward pass most people picture when they hear "inference." Queuing, cold starts, and batch-formation wait often dominate in production even when the model itself is fast. Next up, Lesson 3: a close look at stage 4, batching, and the static-vs-dynamic choice that shapes it.
