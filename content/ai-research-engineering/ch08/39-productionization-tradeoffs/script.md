# Script — Productionization Trade-offs

## Segment 1 (title)

Lesson 38 covered packaging a model into a self-contained artifact. Packaging answers whether it can run outside your training script — it doesn't answer how it should run at the latency, volume, and cost a real product needs. Those are trade-offs, not a single right answer.

## Segment 2 (steps)

Latency and throughput pull against each other: batching requests together raises throughput by keeping the GPU busier, but delays the first request in that batch. Quantization shrinks a model and speeds it up at some accuracy cost. Dynamic batching trades a small queueing delay for a lot of throughput, when the latency budget allows it. And the right serving framework follows the actual constraints — QPS, hardware, multi-model needs — not whichever one is trendy.

## Segment 3 (code)

Quantization reduces numerical precision, typically from 32-bit floats to 8-bit integers, which cuts memory bandwidth and often wins real latency, especially on CPU. Dynamic quantization handles weights ahead of time and activations on the fly — a reasonable default for transformer-style models. The trade-off is real, so always re-run the original eval harness against the quantized artifact and report the accuracy delta, not just the speedup.

## Segment 4 (code)

Triton's dynamic batching config tells the server to wait up to a couple of milliseconds hoping to fill a preferred batch size before running inference anyway. For a latency budget in the tens of milliseconds, that's usually a good trade for the throughput gain. For a budget in the low single digits, it may not be — it's a lever to tune deliberately, not something to always switch on.

## Segment 5 (outro)

The model is packaged and now served at a deliberate point on the latency-throughput-cost curve. The next question is what has to travel alongside it from the research side so it doesn't quietly drift away from the result that justified shipping it. Lesson 40 covers what actually has to survive that transition.
