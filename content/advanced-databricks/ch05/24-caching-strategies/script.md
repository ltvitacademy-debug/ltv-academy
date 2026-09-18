# Script — Caching Strategies

## Segment 1 (title)

If you've seen caching as a system-design topic before — result sets, materialized views, invalidation — this is one level down. These are the two caching mechanisms the Databricks engine itself gives you underneath any of that.

## Segment 2 (code: disk cache)

The disk cache is automatic and transparent. The first time a cluster reads a file from cloud storage, it stores a local copy on that worker's SSD, keyed by file. Every later read of that same file, by any query on that cluster, comes from local disk instead of going back to cloud storage — no code changes anything.

## Segment 3 (code: .cache/.persist)

.cache() is explicit and keyed by DataFrame, not by file. It materializes the result of a specific computation — after whatever filters and joins built it — in cluster memory, for the life of that session. Nobody does this for you, and nobody releases it for you either.

## Segment 4 (code: when it wastes memory)

The disk cache is self-managing, so it doesn't really waste anything on its own. But .cache() wastes real memory when the DataFrame is read only once, when the underlying data changes and the cache goes stale, or when it's a job cluster that terminates right after this one run — the cache never outlives the job long enough for anything to reuse it.

## Segment 5 (outro)

The question every time: will this exact result get read again, on this cluster, before something invalidates it? If not, caching it is pure overhead. Next up: sizing a cluster for the workload's actual shape.
