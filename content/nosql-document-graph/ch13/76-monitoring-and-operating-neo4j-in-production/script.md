# Script — Monitoring & Operating Neo4j in Production

## Segment 1 (title)

This closes out the Neo4j section the way a production DBA closes out any real deployment — not with the last feature configured, but with the dashboard you watch after it's live. Neo4j exposes that operational truth through JMX and its built-in metrics integration.

## Segment 2 (code: JMX and metrics integration)

Every self-hosted instance exposes JMX out of the box, since Neo4j runs on the JVM. For production-grade collection, the metrics integration can export the same data to CSV files or push it to Prometheus or Graphite on a configurable interval.

## Segment 3 (steps: key health signals)

Two signals do most of the work: page cache hit ratio, which should sit consistently above 90 percent, and transaction throughput tracked alongside latency. In a causal cluster, replication lag between the leader and its followers rounds out the real short list.

## Segment 4 (steps: the full operational lifecycle)

This chapter has now covered the full operational lifecycle of a real Neo4j deployment — protect it with backup and restore, keep it available with causal clustering, make it fast with page cache sizing and indexing, and hand it off or watch it with Aura and monitoring.

## Segment 5 (outro)

That's the same shape of responsibility a SQL Server DBA already carries for a relational deployment. This closes out the Neo4j section of the course — next up, Chapter 14 and the final capstone: choosing the right model for a real business problem.
