# Script — HA Technology Comparison

## Segment 1 (title)

Four technologies keep coming up in this course, and each one gets sold as "the" HA answer. None of them is. Each protects against a specific set of failures and leaves specific gaps — an honest comparison names both sides.

## Segment 2 (steps: what each one actually protects against)

Availability Groups protect against node, instance, and even site failure in one technology. FCI protects the instance by moving it to a surviving node, but every node shares the same storage. Log shipping protects against primary loss over real distance, tolerating latency well.

## Segment 3 (steps: and where each one has a real gap)

FCI's shared storage is a single point of failure — lose the SAN, lose the whole cluster. Log shipping failover is manual, with a real data-loss window. And replication was never designed as a failover technology at all — it distributes data, it doesn't provide a clean failover target.

## Segment 4 (outro)

"Which one is best" is the wrong first question — the right one is which specific failure you need to survive, and what gap you can live with. Next up: turning this comparison into an actual decision framework.
