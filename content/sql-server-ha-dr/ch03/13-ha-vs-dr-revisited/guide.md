# HA vs. DR, Revisited for On-Prem

Azure Database Administrator introduced high availability and disaster recovery as a pair of
acronyms attached mostly to cloud services — auto-failover groups, zone redundancy, geo-replication
handled largely by the platform. This course is about the on-prem technologies an administrator
configures by hand: Availability Groups, Failover Cluster Instances, log shipping, and
replication. Before comparing them, the HA/DR distinction itself needs to be precise, because
every technology in this course answers one question or the other — never both equally well.

## What you'll learn

- The real, working definitions of HA and DR — not synonyms for each other
- Why the distinction is about *scope of failure*, not just "how fast can we recover"
- How on-prem technologies split across that line, and where a few blur it deliberately

## High availability: surviving a local failure

**High availability (HA)** is about minimizing downtime from a *local, component-level* failure —
a node crashing, a service stopping, a disk array failing — while staying inside the same
datacenter, usually on the same fast network. The goal is automatic or near-automatic recovery
measured in seconds to a couple of minutes, with the workload picking back up on hardware that
was already standing by. HA technologies assume the disaster is narrow: one machine, one rack,
one component. They do not, by themselves, protect against something that takes out the whole
building.

## Disaster recovery: surviving a site-wide event

**Disaster recovery (DR)** is about surviving an event that takes out an entire site — a fire, a
flood, a regional power or network outage, a natural disaster. DR requires a *second location*: a
different datacenter, a different building, ideally a different power grid and network path
entirely. Because the secondary site is physically distant, DR technologies tolerate more latency
and more asynchronous behavior than HA technologies do, and recovery is measured in minutes to
hours rather than seconds — DR is about having a usable copy to fail over to, not necessarily an
instant one.

## Where on-prem technologies land

- **Failover Cluster Instances (FCI)** — pure HA. Nodes share the same storage and typically sit in
  the same datacenter (or a stretched cluster across very close sites); an FCI does nothing if the
  shared storage itself is destroyed.
- **Availability Groups (AGs)** — can do either, depending on topology. A local synchronous replica
  is HA. A replica placed in a second datacenter, usually asynchronous because of distance, is DR.
  One AG with replicas in both places does both jobs at once — this is the direction most modern
  on-prem HA/DR designs go.
- **Log shipping** — leans DR. It's asynchronous by design, tolerates real distance and network
  latency well, and its recovery time (minutes, restoring the latest log) fits a site-loss scenario
  better than a local-failure one.
- **Replication** — not really HA or DR on its own. It distributes data for reporting, offloading,
  or integration; it isn't designed as a failover mechanism, though a subscriber can sometimes be
  pressed into service in a pinch.

## Why the distinction still matters when a technology does both

Calling an AG replica "HA" when it's actually the site's only DR copy — or vice versa — leads to
wrong assumptions about what happens during a real event. A synchronous local replica failing over
automatically in 10 seconds is a completely different operational event than promoting an
asynchronous replica in another city after a declared disaster, even though both use the same
underlying AG technology. Every chapter from here forward names which side of this line a given
configuration serves, because the failover mechanics, the acceptable data loss, and the response
plan are all different.

## Key terms

| Term | Meaning |
|---|---|
| High availability (HA) | Minimizing downtime from a local, component-level failure, usually same-site, automatic |
| Disaster recovery (DR) | Surviving loss of an entire site by failing over to a physically separate location |
| Scope of failure | The real distinguishing factor between HA and DR — how much infrastructure is lost at once |
| Stretched topology | A single technology (like an AG) configured with both local HA replicas and a remote DR replica |

## Check yourself

A company has an FCI protecting their SQL Server against node failure, with all nodes sharing one
SAN in a single datacenter. Is this configuration HA, DR, or both — and what real-world event would
it fail to protect against?
