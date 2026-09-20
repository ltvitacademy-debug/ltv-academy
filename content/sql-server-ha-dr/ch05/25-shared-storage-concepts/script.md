# Script — Shared Storage Concepts

## Segment 1 (title)

Every FCI node has to see the exact same data and log files. This lesson gets specific about what shared storage really means — the real technologies behind it, and the one rule that keeps it safe instead of catastrophic.

## Segment 2 (code: two real ways to share storage)

A SAN is a dedicated storage array connected to every node over iSCSI or Fibre Channel, presenting disks every node can see. Storage Spaces Direct is the modern alternative — it pools local disks across the cluster's own servers into shared, resilient storage, without a separate SAN box to buy and manage.

## Segment 3 (steps: the rule that keeps this safe)

At any moment, only the active node actually mounts and writes to the shared volume. Passive nodes can see the storage exists, but they're deliberately kept from touching it until a failover happens. If two nodes ever both believed they owned the same storage at once, that's split-brain — and it's a real corruption risk.

## Segment 4 (outro)

Shared storage makes single-copy data possible; the cluster still needs a way to guarantee only one node is ever allowed to claim it. Next up: cluster quorum, the mechanism that makes that guarantee.
