# Script — Paged Attention

## Segment 1 (title)

Lesson seven mentioned PagedAttention in passing as the idea behind vLLM. Now that you know the KV cache's real cost structure, it's time to see exactly what problem it solves.

## Segment 2 (steps)

Before PagedAttention, a serving engine reserved one contiguous chunk of memory per request, sized for the maximum length it might reach, because contiguous memory is hard to grow later without copying everything. Almost no request uses its full allocation — a request that generates two hundred tokens but was allocated room for four thousand wastes the rest for its entire lifetime. That's internal fragmentation, and at scale it caps concurrency on its own.

## Segment 3 (steps)

PagedAttention borrows the idea behind operating system virtual memory. The cache is divided into small, fixed-size blocks — sixteen tokens each, by vLLM's default — and a block table maps each request's logical sequence of blocks to wherever those blocks actually sit in GPU memory, which doesn't have to be contiguous at all.

## Segment 4 (steps)

That indirection pays off twice. Fragmentation drops to a fraction of one block per request instead of thousands of wasted tokens, so a GPU can host far more concurrent requests. And because the block table is just a mapping, two requests sharing an identical prefix — the same system prompt — can point to the exact same physical blocks, splitting only when their content actually diverges.

## Segment 5 (code)

Here's what a block table looks like conceptually: request A's logical blocks map to specific physical block IDs. Request B, sharing A's system prompt, points to those same two physical blocks and only gets its own copy once its content diverges.

## Segment 6 (outro)

That shared-block mechanism is also what makes prefix caching, in lesson twenty-one, possible at scale. Next up, lesson nineteen: continuous batching, which uses this same flexibility at the scheduling level.
