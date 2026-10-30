# Lesson 3 — Designing the Multi-Cloud Target Architecture

**Chapter 1 · Advanced Capstone: Kubernetes, Multi-Cloud, and a Cross-Team Incident · Lesson 3 of 26**

## What you'll learn

- Why this phase needs a **primary** cloud and a **backup/DR** cloud, not two equal clouds running
  the same traffic at once
- Why **AKS (Azure Kubernetes Service)** is the right primary for `catalog-api`, `checkout-api`,
  and `cart-api`, given what's already true about Driftwood's platform
- Why **AWS stays the backup/DR target** instead of becoming a second active cluster
- How to draw the target architecture as a diagram you could hand to Casey Lindqvist and Dana
  Whitfield and have them understand the whole shape in one look

## Why "multi-cloud" doesn't mean "active-active everywhere"

"Multi-cloud" gets used loosely enough that it's worth being precise here: this phase is **not**
building two clusters, one on Azure and one on AWS, both taking live customer traffic at once.
That pattern — active-active across clouds — is real, but it roughly doubles the operational
surface area (two sets of manifests to keep in sync, two places a bug can hide, two bills to
reconcile) for a benefit Driftwood doesn't need yet: nothing about this sale requires surviving the
simultaneous loss of an entire cloud provider.

What Driftwood actually has, already established from the intermediate project, is **AWS as a
backup/DR target** — object storage with cross-region replication and a standby database replica,
sitting idle except when something on the primary side fails. This phase keeps that shape and
extends it: one cloud runs the real Kubernetes workload, the other stands ready to take over if it
has to.

## Choosing AKS as primary

Theo's recommendation to Casey and Dana, with the reasoning written out plainly:

- **Identity and networking are already Azure-native.** Driftwood's existing Azure AD tenant,
  virtual network, and the DNS zone the storefront already resolves through all live on Azure.
  Running the primary cluster there means the new Kubernetes workload inherits identity and
  network boundaries that already exist, instead of standing up a parallel set on AWS just to host
  the cluster.
- **The data these three services depend on is already on Azure-managed databases**, from the
  intermediate project. Running `catalog-api`, `checkout-api`, and `cart-api` on AKS keeps compute
  next to data, instead of paying cross-cloud latency on every request during the highest-traffic
  day of the year.
- **AWS is already playing the backup role.** Keeping AWS as backup/DR, rather than flipping the
  two clouds' roles, means this phase builds on the pattern that's already validated, instead of
  re-proving a brand-new one under deadline pressure.

None of this means AWS is a lesser cloud, or that this decision is permanent — it means the
specific, current state of Driftwood's platform makes AKS the lower-risk primary for *this*
migration, on *this* deadline.

## The target architecture, end to end

```
                         Azure (primary)
        ┌───────────────────────────────────────────┐
        │  AKS cluster (3 availability zones)        │
        │   catalog-api  checkout-api  cart-api      │
        │        │            │            │          │
        │        └────────────┴────────────┘          │
        │                     │                        │
        │      Azure-managed databases (catalog, orders) │
        └───────────────────────────────────────────┘
                             │
                 async replication / failover path
                             │
                         AWS (backup / DR)
        ┌───────────────────────────────────────────┐
        │  Cross-region-replicated object storage     │
        │  Standby database read replica, idle        │
        └───────────────────────────────────────────┘
```

The arrow only flows one direction under normal operation: Azure is live, AWS is receiving
replicated data and otherwise idle. If Azure became unavailable, AWS is the documented fallback —
but that failover path itself is explicitly out of scope to rebuild or re-test in this phase; it's
inherited as-is from the intermediate project.

## What this decision does NOT settle

Drawing this diagram answers "which cloud runs what," but leaves real decisions for the lessons
right after it:

- **How the AKS cluster itself is built** — node pools, availability zones, scaling — is
  Lesson 4's job.
- **How Terraform manages both clouds as one system** — so the diagram above isn't just a picture,
  it's enforced in code — is Lesson 6's job.
- **How cost and capacity on this architecture get reported** to Casey and Dana is Lesson 7's job.

## Key terms

| Term | Meaning |
|---|---|
| Primary / backup-DR | An architecture where one cloud runs live traffic and the other stands ready to take over, rather than both running live traffic simultaneously |
| Active-active | A pattern where multiple regions or clouds all serve live traffic at once — explicitly not what this phase builds |
| Cloud-native dependency | Something a service already depends on that lives in a specific cloud (identity, DNS, a managed database), which argues for keeping compute in that same cloud |
| Failover path | The documented route traffic and data would take if the primary cloud became unavailable |

## Lab

1. Redraw the target architecture diagram from this lesson in your own words or your own tool,
   labeling which direction data flows under normal operation and under a failover.
2. Write two sentences defending AKS as primary using Driftwood's actual current state (identity,
   networking, existing managed databases) rather than a general "Azure is better" argument.

## Check yourself

You're ready for Lesson 4 when you can draw this architecture from memory, state which cloud is
primary and why, and explain why this phase is explicitly not building an active-active
architecture across both clouds.
