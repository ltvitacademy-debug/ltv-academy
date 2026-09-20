# Shared Storage Concepts

The last lesson established that every node in an FCI cluster has to be able to see and
mount the exact same set of data and log files. This lesson gets specific about what
"shared storage" actually means in practice — the real technologies behind it, and the
one rule that makes the whole arrangement safe rather than catastrophic.

## What you'll learn

- The real storage technologies used to back an FCI (SAN and Storage Spaces Direct)
- Why only one node is ever allowed to access the storage at a time
- What "split-brain" means and why shared storage design prevents it

## Two real ways to share storage

- **SAN (Storage Area Network)** — a dedicated storage array, connected to every cluster
  node over either **iSCSI** (storage traffic over standard Ethernet, using the iSCSI
  protocol) or **Fibre Channel** (a dedicated, higher-throughput storage network with its
  own switches and host bus adapters). This is the traditional, most common way to give an
  FCI's nodes access to the same disks. The SAN presents one or more LUNs (logical units)
  that every cluster node can see, and Windows Server Failover Clustering manages which
  node actually has them mounted at any moment.
- **Storage Spaces Direct (S2D)** — a modern, hyper-converged alternative built into
  Windows Server. Instead of a separate SAN array, local disks inside each cluster node are
  pooled together and presented as shared, resilient storage across the cluster, using the
  servers' own local drives and a fast interconnect between them. This removes a dedicated
  SAN as a separate piece of hardware to buy and manage, at the cost of more complex network
  and hardware requirements between nodes.

Both approaches solve the same problem — giving every node in the cluster access to one
consistent set of disks — just with different hardware and cost tradeoffs.

## Only one node touches the storage at a time — by design

This is the rule that makes shared storage work safely rather than corrupt data: at any
given moment, **only the active node has the shared volumes mounted and is writing to
them.** Passive nodes can see the storage exists, but WSFC deliberately keeps them from
mounting or writing to it until a failover actually happens. This is not a shared-nothing,
simultaneous-write arrangement — it's exclusive, one-at-a-time access that simply moves
between nodes.

## Why this matters: split-brain

If two nodes ever believed they were both the active owner of the same storage at the same
time — for example, because a network partition cut them off from each other but each
still thought it was in charge — they could both try to mount and write to the same disks
independently. That's a **split-brain** scenario, and it's exactly the kind of corruption
risk that WSFC's quorum mechanism (the next lesson) exists to prevent. Shared storage design
and cluster quorum are two halves of the same problem: shared storage makes single-copy
data possible, and quorum makes sure only one node is ever allowed to claim it.

## Key terms

| Term | Meaning |
|---|---|
| SAN | A dedicated storage array shared across nodes via iSCSI or Fibre Channel |
| iSCSI | SCSI storage commands sent over standard Ethernet/IP networking |
| Fibre Channel | A dedicated, high-throughput storage network with its own switches and adapters |
| Storage Spaces Direct (S2D) | Hyper-converged shared storage built from pooled local disks across cluster nodes |
| Split-brain | Two nodes both believing they own the same storage simultaneously — a data corruption risk |

## Check yourself

Why is it not safe, architecturally, for both an active and a passive FCI node to mount
and write to the same shared volume at the same time — even briefly?
