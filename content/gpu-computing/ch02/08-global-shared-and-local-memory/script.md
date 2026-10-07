# Script — Global, Shared & Local Memory

## Segment 1 (title)

Chapter one introduced the memory hierarchy conceptually. This lesson makes it concrete in code: how you actually declare and use global, shared, and local memory inside a CUDA kernel.

## Segment 2 (code)

Global memory is the large pool allocated with cudaMalloc and passed into a kernel as a pointer. Any thread in any block can read or write any location, with no automatic coordination — two threads writing the same spot without synchronizing is a race condition.

## Segment 3 (code)

Shared memory is declared with the shared keyword inside a kernel and scoped to one block — every thread in that block sees the same array. Sync threads is a barrier that forces every thread to reach that line before any of them proceeds, which matters whenever one thread reads a slot a different thread just wrote.

## Segment 4 (steps)

Confusingly, local memory in CUDA doesn't mean fast storage — that's what registers are for. Local memory is private to a thread but physically lives in the same slow global memory space, used automatically when a thread needs more storage than its registers can hold.

## Segment 5 (outro)

Four tiers, two very different speeds. Next up, lesson nine: writing a simple CUDA kernel, putting the launch hierarchy and this memory model together into one working piece of code.
