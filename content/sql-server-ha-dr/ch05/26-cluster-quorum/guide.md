# Cluster Quorum

The last lesson ended on a promise: something has to guarantee that only one node is ever
allowed to claim the shared storage, even when the cluster's network connections get
messy. That something is **quorum** — a core Windows Server Failover Clustering concept
that applies just as much to a plain WSFC cluster as it does to an Always On Availability
Group built on top of one. This lesson is about what quorum actually is and why it exists.

## What you'll learn

- What quorum means in a Windows Server Failover Cluster
- The real quorum models WSFC supports
- Why quorum is specifically a defense against split-brain, not just an availability rule

## Quorum: a vote about who's still in the cluster

A WSFC cluster is a set of nodes that constantly communicate with each other to agree on
cluster state. **Quorum** is the mechanism by which a cluster decides, at any given moment,
whether enough nodes are talking to each other to keep running safely. Practically, this
means: if the cluster ever splits into groups of nodes that can't see each other — a
network partition — only the group that holds **quorum** (a majority, by whatever rule the
cluster is configured with) is allowed to keep functioning and own cluster resources like
the SQL Server FCI. Every other group is forced to stop, even if some of those nodes are
perfectly healthy — because from their point of view, they can't prove they aren't the
isolated minority.

## The real quorum models

WSFC supports several quorum configurations, chosen based on how many nodes are in the
cluster and how they're distributed:

- **Node majority** — each node gets one vote; the cluster stays up as long as more than
  half the nodes are online and can communicate. Works cleanly with an odd number of nodes.
- **Node and disk majority** — used with an even number of nodes; a shared witness disk
  acts as an extra tie-breaking vote so an even split doesn't leave neither side with a
  majority.
- **Cloud witness** — a modern alternative to a witness disk, using an Azure Storage
  account as the tie-breaking vote instead of a physical or shared disk. This is
  particularly useful for clusters that span sites, where a shared witness disk isn't
  practical.

## Why quorum exists: preventing split-brain, precisely

Quorum's entire purpose is to make split-brain structurally impossible, not just unlikely.
Without it, a network partition that splits a cluster into two isolated groups could leave
each group believing it's the "real" cluster and starting the SQL Server FCI resource
independently — both groups then try to mount and write to the same shared storage, which
is exactly the corruption scenario from the previous lesson. Quorum guarantees that at most
one side of any partition can ever hold a majority, so at most one side is ever allowed to
own the storage and run the instance. It's the rule that makes the "only one active node"
guarantee actually enforceable, not just assumed.

## Key terms

| Term | Meaning |
|---|---|
| Quorum | The mechanism WSFC uses to decide which nodes may keep running cluster resources during a partition |
| Node majority | Quorum model where each node votes; requires more than half the nodes online |
| Node and disk majority | Quorum model for even node counts, using a shared witness disk as a tie-breaker vote |
| Cloud witness | An Azure Storage-based tie-breaking vote, an alternative to a physical witness disk |
| Split-brain | Isolated groups of nodes each believing they should be active — what quorum is designed to prevent |

## Check yourself

A four-node cluster loses network connectivity and splits into two groups of two nodes
each. Neither group has a witness. What does quorum say should happen, and why is that the
safe outcome even though it means the whole cluster goes down?
