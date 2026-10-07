# Static vs. Dynamic Batching

Lesson 2 named batching as the stage where throughput gets built, one way or another. This lesson opens that stage up and compares the two basic strategies every serving framework chooses between: static batching, where the batch is fixed and locked before it runs, and dynamic batching, where the batch forms itself on the fly from whatever requests happen to be waiting. The choice between them has a bigger effect on real-world GPU utilization than almost any other setting in a serving stack.

## What you'll learn

- How static batching works, and the specific workload it fits well
- How dynamic batching works, and why it was invented for exactly the workload static batching handles badly
- The two knobs every dynamic batcher exposes: max batch size and max queue delay
- Why LLM serving pushed this idea further still, into continuous batching (previewed here, covered fully in Chapter 4)

## Static batching: the batch is decided up front

In static batching, a fixed number of requests are collected, padded to the same length if needed, and run through the model together as one batch — and the whole batch finishes together, even if some requests inside it produced their output long before others. This works well when:

- Requests arrive in predictable groups (an offline batch job that already has all its inputs queued up)
- Inputs are naturally similar in size, so padding waste is small
- There's no live user waiting on an individual response

It works poorly for live traffic, because a batch can't start until enough requests have arrived to fill it (or a timeout is hit), and it can't finish until every request in it is done — so one unusually long request holds the whole batch hostage.

## Dynamic batching: the batch forms itself

Dynamic batching lets the server assemble a batch on the fly from whatever requests have arrived recently, instead of waiting for a fixed, pre-defined group. Every dynamic batcher (Triton's dynamic batcher included) exposes roughly the same two knobs:

- **Max batch size** — the ceiling on how many requests can be grouped into one execution pass
- **Max queue delay** (sometimes called the batching window) — how long the scheduler will wait, hoping more requests arrive, before running whatever it has

Tuning these two knobs is the main lever for the latency/throughput trade-off from Lesson 1: a short queue delay keeps latency low but may run smaller, less efficient batches; a longer delay fills bigger batches and raises throughput, at the cost of making early-arriving requests wait longer for their batchmates.

## Why LLMs needed to go further: continuous batching

Static and dynamic batching both still treat "a batch" as a single unit that starts and finishes together. That's a problem for LLM generation specifically, because requests in the same batch rarely finish at the same time — one prompt might need 20 output tokens, another 2,000. Under static or basic dynamic batching, the whole batch is stuck waiting on the longest request. **Continuous batching** (pioneered in frameworks like vLLM, and the subject of Lesson 19) solves this by letting individual requests join and leave the batch at each decode step, so a finished request's GPU slot is immediately handed to a new one instead of sitting idle. That's a deep enough topic to earn its own lesson later in the course — for now, just recognize it as "dynamic batching, but at the granularity of a single generated token instead of a whole request."

## Key terms

| Term | Meaning |
|---|---|
| Static batching | A fixed-size batch, assembled up front, that starts and finishes as one unit |
| Dynamic batching | A batch assembled on the fly from recently arrived requests |
| Max batch size | The ceiling on requests grouped into one execution pass |
| Max queue delay | How long the scheduler waits for more requests before running the batch it has |
| Continuous batching | Requests join/leave a batch at each decode step, instead of as a whole unit (Lesson 19) |

## Recap

Static batching suits predictable, offline workloads; dynamic batching suits live traffic by trading a small, tunable wait for much better GPU utilization; and LLM serving pushes the idea further into continuous batching, which you'll study in depth in Chapter 4. Next up, Lesson 4: the prefill/decode split that makes LLM batching uniquely tricky in the first place.
