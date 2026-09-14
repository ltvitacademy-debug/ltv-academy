# Script — Sharding a Data Store · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Partitioning splits a table into chunks within one storage system. Sharding takes the same idea one level up — spreading data across genuinely separate database servers, each holding only a slice.

## S2 · CODE CARD (choosing a shard key)

The shard key decides which server a row lands on. A good one spreads storage and traffic evenly across shards; a bad one concentrates both onto one shard while the rest sit nearly idle.

## S3 · CODE CARD (the hot shard problem)

A hot shard is one server absorbing disproportionate traffic — a sequential key like signup date sends everyone's newest writes to the same shard. A hashed customer ID usually spreads that load far more evenly.

## S4 · CODE CARD (when you actually need it)

Sharding adds real operational cost — harder cross-shard joins, nontrivial rebalancing. It's worth it once one well-partitioned server genuinely can't hold the load anymore, not as a default "just in case."

## S5 · OUTRO CARD

Partitioning and sharding both split data up — at different boundaries, for different reasons. Next up: designing for idempotency, so retries on any of this don't corrupt the data.
