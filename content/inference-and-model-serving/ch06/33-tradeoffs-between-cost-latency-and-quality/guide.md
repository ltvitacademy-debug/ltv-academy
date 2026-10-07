# Trade-offs Between Cost, Latency & Quality

This lesson closes Chapter 6, and with it, the main body of the course. Every lesson in Chapters 3 through 6 has, underneath its specific topic, been adjusting one of three dials: cost, latency, and quality. This lesson names that trade-off explicitly and reviews the levers you now have for moving it.

## What you'll learn

- Why cost, latency, and quality behave like a three-way trade-off, not three independent knobs
- Which earlier lessons in this course map onto which side of that trade-off
- A practical order of operations for approaching the trade-off, rather than chasing one dial blindly
- How this sets up the capstone, where you'll make these trade-offs for real

## A three-way tension, not three free knobs

In almost every serving decision, you can improve two of these at the expense of the third — rarely all three at once:

- **A bigger, more capable model** raises quality, but costs more per token (Lesson 29) and usually adds latency, since bigger models have more compute per token to work through
- **Aggressive quantization or a smaller model** lowers cost and latency, but risks giving up some quality — the whole subject of Chapter 3's measuring-the-trade-off lesson
- **More replicas, more headroom** lowers latency under load, but raises cost directly, since every extra replica is paid for whether or not it's fully used (Lesson 29's utilization point)

There's no configuration that maximizes all three simultaneously — every choice this course has covered is really a statement about which two you're prioritizing, and how much of the third you're willing to give up to get them.

## Mapping the levers you already have

A quick inventory of where each lever from this course lands on the triangle:

- **Quantization, pruning, distillation (Chapter 3)** — move along the cost/latency vs. quality axis; smaller and faster, with a quality cost that has to be measured, not assumed
- **KV cache, paged attention, continuous batching, speculative decoding (Chapter 4)** — mostly "free" wins, raising throughput and lowering latency without touching quality, because they're about *computing the same result more efficiently*, not approximating it
- **Autoscaling, load balancing, routing, cascades (Chapter 5)** — mostly about cost and latency under real traffic conditions, largely orthogonal to the model's own quality
- **Benchmarking, SLOs, capacity planning (this chapter)** — the measurement and planning layer that tells you, honestly, where you currently sit on all three axes

## A practical order of operations

Rather than optimizing cost in isolation (which tends to quietly erode quality or latency until someone notices), a more durable approach is:

1. **Set the quality floor and the latency ceiling first**, from actual user or business requirements — not from what feels achievable
2. **Apply the "free" wins** — the Chapter 4 techniques that improve throughput/latency without touching quality — before reaching for anything that trades quality away
3. **Only then minimize cost** within whatever constraints steps 1 and 2 leave you, using Chapter 5 and 6's scaling, routing, and capacity tools

Optimizing cost first, and backfilling quality and latency requirements afterward, is how teams end up quietly shipping a worse product to save money they didn't actually need to save.

## Key terms

| Term | Meaning |
|---|---|
| Cost/latency/quality triangle | The three-way trade-off underlying most serving decisions |
| "Free" win | A technique that improves cost/latency without reducing quality (e.g., paged attention) |
| Quality floor | The minimum acceptable quality, set from requirements, not convenience |
| Latency ceiling | The maximum acceptable latency, tied to a real user-facing effect |

## Recap

Cost, latency, and quality trade off against each other in almost every serving decision this course has covered, and a durable approach sets the quality floor and latency ceiling first, takes the free wins next, and only then optimizes cost within what's left. That closes Chapter 6. Next up, the capstone: Lesson 34 kicks off the project where you'll make every one of these trade-offs for real, choosing and deploying an actual model behind an actual serving stack.
