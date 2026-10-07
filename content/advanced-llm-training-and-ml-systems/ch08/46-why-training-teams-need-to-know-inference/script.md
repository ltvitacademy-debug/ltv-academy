# Script — Why Training Teams Need to Know Inference

## Segment 1 (title)

Everything so far in this course has been about producing a good checkpoint. None of it matters to a user until that checkpoint is actually serving requests. This chapter is a narrow, practical slice of inference engineering aimed squarely at training engineers — not how to build a serving stack, but enough to make training-time decisions that don't create serving headaches later.

## Segment 2 (steps)

Serving an LLM has two phases with very different hardware behavior. Prefill processes the whole prompt in one pass — it's compute-bound, and it's where time-to-first-token comes from. Decode generates one token at a time, attending back over everything so far — it's memory-bandwidth-bound, not compute-bound, because the GPU spends most of its time moving cached data rather than doing dense math.

## Segment 3 (steps)

Choices made for training quality quietly set a cost floor at serving time. Context length means every request pays for the maximum length the model supports. Attention variant — plain multi-head versus grouped-query or multi-query attention — directly sizes the KV cache. And vocabulary size sets how big the logits tensor is on every single decode step.

## Segment 4 (code)

Latency decomposes into two numbers worth knowing by name: time-to-first-token, dominated by prefill, and time-per-output-token, dominated by decode. Total latency is roughly the first plus the number of output tokens times the second. Throughput is different again — it's tokens per second across all concurrent requests, which a serving team optimizes, and it's not the same thing as making one user's response feel fast.

## Segment 5 (outro)

That vocabulary is enough to read a serving dashboard and have a real conversation with the team that runs your model, instead of nodding along while they explain why a technically impressive checkpoint is awkward or expensive to actually serve. Next up: the KV cache itself, conceptually — the single biggest driver of decode cost and serving memory.
