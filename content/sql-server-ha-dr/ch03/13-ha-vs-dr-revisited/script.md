# Script — HA vs. DR, Revisited for On-Prem

## Segment 1 (title)

This chapter is about the on-prem HA and DR technologies you configure by hand — Availability Groups, Failover Cluster Instances, log shipping, and replication. Before comparing them, the HA and DR distinction itself needs to be precise.

## Segment 2 (steps: HA vs. DR, defined by scope of failure)

High availability is about surviving a local, component-level failure — a node or disk dying — with automatic recovery in seconds, usually inside one datacenter. Disaster recovery is about surviving a site-wide event, using a physically separate location, with recovery measured in minutes to hours instead.

## Segment 3 (steps: where the on-prem technologies land)

Failover Cluster Instances are pure HA — shared storage in one place means the whole cluster dies if that storage does. Log shipping leans DR — asynchronous and distance-tolerant. Availability Groups can do both at once: a local synchronous replica for HA, a remote asynchronous replica for DR, in the same AG.

## Segment 4 (outro)

Getting this distinction right matters because the failover mechanics, acceptable data loss, and response plan differ completely between a local automatic failover and a declared-disaster promotion in another city. Next up: the real uptime and SLA math behind "how many nines" a design actually delivers.
