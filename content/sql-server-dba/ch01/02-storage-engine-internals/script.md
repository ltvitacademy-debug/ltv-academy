# Script — Storage Engine Internals

## Segment 1 (title)

The storage engine manages how data physically sits on disk and in memory. This lesson goes inside it — pages, extents, the buffer pool, and the two background processes that keep memory and disk in sync.

## Segment 2 (code: Pages and extents)

SQL Server stores data in 8 KB pages, the fundamental unit of I/O — always read and written whole. Pages group into extents of eight contiguous pages each. Uniform extents belong entirely to one object; mixed extents share their eight pages among several small objects.

## Segment 3 (steps: Buffer pool)

SQL Server caches data pages in memory in the buffer pool, by far its largest memory consumer. A logical read pulls a page already cached — cheap. A physical read means the page isn't cached and has to come from disk — expensive. A modified page still waiting to be written back is called a dirty page.

## Segment 4 (steps: Checkpoint vs. lazy writer)

Checkpoint periodically writes all current dirty pages to disk, shortening how much log SQL Server would need to replay after a crash. The lazy writer is a separate process — it evicts pages that haven't been used recently, freeing buffer pool memory for pages the workload needs right now.

## Segment 5 (outro)

Pages, extents, the buffer pool, checkpoint, and the lazy writer are the physical foundation everything else in this course sits on. Next up: memory architecture — how SQL Server manages memory beyond just the buffer pool.
