# Paged Attention

Lesson 7 mentioned PagedAttention in passing as the idea behind vLLM. Now that Lesson 17 has given you the KV cache's real cost structure, it's time to see exactly what problem PagedAttention solves and how — because the trick it borrows from operating systems is one of the most consequential ideas in modern LLM serving.

## What you'll learn

- Why storing the KV cache in one contiguous block per request wastes enormous amounts of memory
- How PagedAttention borrows the idea of OS virtual memory paging
- What a block table actually is and what it makes possible
- Why this enables sharing cache memory between requests, not just saving space

## The old way: one contiguous allocation per request

Before PagedAttention, a serving engine would reserve one contiguous chunk of GPU memory for each request's KV cache, sized for the *maximum* sequence length the request could possibly reach — because contiguous memory can't easily be grown later without copying everything. The problem: almost no request actually uses its full allocation. A request that generates 200 tokens but was allocated room for 4,096 wastes the other 3,896 tokens' worth of memory for its entire lifetime. This is **internal fragmentation**, and at scale it means a huge fraction of GPU memory sits reserved but empty — which is exactly what caps how many concurrent requests a GPU can actually serve, on top of the raw cache-size cost from Lesson 17.

## The paged way: small fixed-size blocks, tracked by a table

PagedAttention borrows the idea behind operating-system virtual memory paging and applies it to the KV cache. Instead of one large contiguous allocation, the cache is divided into many small, fixed-size **blocks** (vLLM's default is 16 tokens per block). A request's cache is just a list of these blocks, which don't need to be physically adjacent in GPU memory — a **block table** maps each request's logical sequence of blocks to wherever those blocks actually live physically. When a request needs more cache space, the system simply allocates one more fixed-size block wherever one is free, instead of needing a large contiguous span. This mirrors exactly how an OS maps a process's logical memory pages to physical RAM pages that may be scattered anywhere.

## Why this matters more than it sounds

- **Near-zero internal fragmentation.** Blocks are allocated just-in-time, so a request only ever wastes, at most, a fraction of one block — not thousands of tokens' worth of pre-reserved space.
- **Far more concurrent requests per GPU.** Because memory isn't pre-reserved for a worst-case length, a GPU can host many more active requests than the old contiguous-allocation approach allowed, which is the main reason PagedAttention-based engines post much higher throughput under real, mixed-length traffic.
- **Shared blocks, not just saved space.** Because the block table is a layer of indirection, two requests that share an identical prefix — the same system prompt, the same few-shot examples — can literally point to the *same physical blocks* instead of duplicating them, with a copy-on-write split only when one request's continuation diverges from the other's. This sharing is also what makes prefix caching (Lesson 21) and efficient parallel sampling (generating several candidate completions for one prompt) practical at scale.

## Key terms

| Term | Meaning |
|---|---|
| Internal fragmentation | Memory reserved for a request's worst-case length that goes unused |
| Block | A small, fixed-size chunk of KV cache (16 tokens in vLLM's default) |
| Block table | The mapping from a request's logical block sequence to physical memory blocks |
| Copy-on-write | Sharing physical blocks between requests until one request's content diverges |

## Recap

PagedAttention replaces one large, worst-case-sized memory reservation per request with many small, fixed-size blocks tracked by an indirection table — borrowed directly from how operating systems page virtual memory. The payoff is twofold: far less wasted memory, and the ability to physically share cache blocks across requests with identical prefixes. Next up, Lesson 19: continuous batching, which uses that same block-based flexibility to keep the GPU busy at the request-scheduling level, not just the memory-allocation level.
