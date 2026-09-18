# Lesson 24 — Caching Strategies

**Chapter 5 · Performance at Scale · Lesson 24 of 34**

## What you'll learn

- Two different caching layers Databricks gives you, and how they differ
- The disk cache — automatic, transparent, keyed by file
- `.cache()` / `.persist()` — explicit, in-memory, keyed by DataFrame
- When either one actually helps, and when it just burns cluster memory

## This is engine-level, not system-design-level caching

If you've covered caching from a system-design angle before —
result-set caching, materialized views, invalidation policy — this
lesson isn't that. This is one level down: the two caching
mechanisms the Databricks engine itself gives you underneath any of
that, specific to how Spark and Databricks clusters actually work.

## The disk cache

```text
Disk cache (formerly "Delta cache"):
  automatic, transparent
  caches the compressed BYTES of remote Parquet/Delta files
  onto the local SSD of each worker node
  keyed by file -- not by query, not by DataFrame
```

The first time a cluster reads a file from cloud storage, the disk
cache stores a local copy on that worker's SSD. Every subsequent
read of the *same file*, by any query, on that same cluster, reads
from local disk instead of going back to cloud storage. No code
changes anything — this happens underneath every query
automatically, as long as the cluster's disk cache is enabled.

## `.cache()` / `.persist()`

```python
df = spark.table("gold.daily_revenue").filter("region = 'west'")
df.cache()          # materializes df's RESULT in cluster memory
df.count()           # triggers the actual caching (Spark is lazy)

# ... reuse df multiple times in this session, cheaply ...

df.unpersist()       # release the memory when done
```

`.cache()` is explicit and keyed by DataFrame, not by file. It
materializes the *result of a specific computation* — after
whatever filters, joins, or transformations built that DataFrame —
in cluster memory (or memory-and-disk, with `.persist()` and a
storage level), for the life of that Spark session. Nobody caches
this for you; you decide to, and you're responsible for releasing
it.

## When each one helps

```text
Disk cache helps when:
  the SAME underlying files get scanned repeatedly, by DIFFERENT
  queries, on a long-running cluster -- a BI/SQL warehouse getting
  hit by many dashboards querying the same gold tables all day

.cache() helps when:
  the SAME DataFrame -- already filtered/transformed -- gets reused
  SEVERAL TIMES within one job or notebook session, and
  recomputing it from scratch each time would be expensive
```

## When either one wastes memory

```text
Disk cache wastes nothing extra to enable -- it's automatic and
self-managing. The waste shows up elsewhere: don't assume it means
recomputation is unnecessary for jobs that run once and terminate.

.cache() wastes real memory when:
  - the DataFrame is read/used only ONCE -- caching it just holds
    memory that could go to something else, for no reuse benefit
  - the underlying data changes between reads -- a cached DataFrame
    doesn't refresh itself; it serves the frozen snapshot from when
    .cache() ran
  - the cluster is a JOB cluster that terminates right after this
    one run -- the cache never outlives the job, so nothing was
    ever going to reuse it
```

The core question, every time, is: will this exact result get read
again, on this same cluster, before something invalidates it? If
the honest answer is "probably not," `.cache()` is pure overhead —
memory pressure with no payoff.

## Key terms

| Term | Meaning |
|---|---|
| Disk cache | Automatic local-SSD cache of remote file bytes, keyed by file, transparent to queries |
| `.cache()` / `.persist()` | Explicit, in-memory materialization of one DataFrame's computed result |
| Wasted cache | Caching a result that's read once, or that goes stale before it's reused |

## Check yourself

You're ready for Lesson 25 when you can explain, without looking: why
would caching a DataFrame on a job cluster that terminates
immediately after the job finishes provide zero benefit?
