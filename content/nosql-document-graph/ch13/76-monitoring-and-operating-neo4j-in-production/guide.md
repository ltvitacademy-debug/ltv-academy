# Monitoring & Operating Neo4j in Production

This closes out the Neo4j section of the course the way a production DBA closes out any real
deployment: not with the last feature you configured, but with the dashboard you watch after
it's live. SQL Server DBAs already lean on wait stats, `sys.dm_os_performance_counters`, and
tools like SQL Server Management Studio's Activity Monitor. Neo4j exposes the same category of
operational truth through **JMX** and Neo4j's built-in **metrics integration** — and the same
disciplined habit of watching a small set of real health signals, rather than staring at
everything at once, applies just as directly here.

## What you'll learn

- How Neo4j exposes operational metrics, via JMX and the metrics integration
- The real key health signals worth watching in production
- What page cache hit ratio and transaction throughput actually tell you
- How this chapter's tools — backup, clustering, tuning, Aura, monitoring — fit together as one operational picture

## How Neo4j exposes metrics

Neo4j exposes runtime metrics two real ways. **JMX (Java Management Extensions)** is available
on every self-hosted Neo4j instance out of the box — since Neo4j runs on the JVM, any
JMX-capable tool (JConsole, VisualVM, or a monitoring agent configured to scrape JMX) can
connect and read live metrics, the same way SQL Server exposes DMVs for any monitoring tool
that knows how to query them. For more structured, production-grade collection, Neo4j's
built-in **metrics integration** can export the same metrics to files, or push them to systems
like Prometheus or Graphite, on a configurable interval:

```
-- neo4j.conf
server.metrics.enabled=true
server.metrics.csv.enabled=true
server.metrics.prometheus.enabled=true
server.metrics.prometheus.endpoint=localhost:2004
```

Aura, covered last lesson, exposes a curated version of this same data directly in its console
— the managed equivalent of the dashboards a self-hosted deployment has to be configured to
produce itself.

## The real key health signals

Two metrics do most of the work of telling you whether a production Neo4j instance is actually
healthy:

- **Page cache hit ratio** — the percentage of page requests served from the in-memory page
  cache (from the previous lesson) rather than forced to disk. A healthy production instance
  should sit consistently high, often well above 90%; a hit ratio that's dropping or
  persistently low is the single clearest signal that the page cache is undersized relative to
  the graph's actual working set — the direct equivalent of watching SQL Server's buffer cache
  hit ratio counter for the same reason.
- **Transaction throughput** — the rate of committed transactions per second, tracked
  alongside transaction latency. A sudden drop in throughput with rising latency, without a
  corresponding drop in incoming query volume, points to contention somewhere — lock waits,
  an undersized page cache forcing disk I/O, or (in a causal cluster) replication lag between
  core servers and read replicas.

Beyond those two, watching heap memory usage (garbage collection pauses show up as latency
spikes) and, in a causal cluster, replication lag between the leader and its followers/read
replicas, rounds out the real short list — not a wall of forty dashboards nobody actually
looks at.

## Reading these signals together

A dropping page cache hit ratio and rising transaction latency at the same time usually tell
the same story from two angles: the working set no longer fits in memory, so more operations
are hitting disk, and disk-bound operations take longer, which shows up as latency and, under
sustained load, as falling throughput. The fix in that case is almost always the one from the
previous lesson — increase `dbms.memory.pagecache.size` — rather than something exotic. This is
the same instinct as a SQL Server DBA seeing buffer cache hit ratio fall alongside rising
`PAGEIOLATCH` waits and reaching for more buffer pool memory before reaching for anything more
elaborate.

## The whole picture: backup, clustering, tuning, Aura, monitoring

This chapter has now covered the full operational lifecycle of a real Neo4j deployment: how to
protect it (backup and restore), how to keep it available under load (causal clustering), how
to make it fast (page cache sizing and index-aware querying), how to hand the operational
burden to someone else entirely (Aura), and how to watch it once it's live (this lesson). That's
the same shape of responsibility a SQL Server DBA already carries for a relational deployment —
this chapter has just walked through what each piece looks like when the engine underneath is a
graph instead of a set of tables.

## Key terms

| Term | Meaning |
|---|---|
| JMX | Java Management Extensions — the built-in interface exposing live JVM/Neo4j metrics |
| Metrics integration | Neo4j's built-in feature for exporting metrics to CSV, Prometheus, Graphite, etc. |
| Page cache hit ratio | The percentage of page requests served from memory rather than disk |
| Transaction throughput | The rate of committed transactions per second, tracked alongside latency |

## Check yourself

A production Neo4j instance shows a page cache hit ratio that's dropped from 96% to 61% over
the past month, alongside slowly rising query latency, while incoming query volume has stayed
flat. What's the most likely cause, and what's the most direct fix?
