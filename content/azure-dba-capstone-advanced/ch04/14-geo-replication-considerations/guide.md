# Lesson 14 — Geo-Replication Considerations

**Chapter 4 · High Availability & Disaster Recovery · Lesson 14 of 26**

## What you'll learn

- What's actually happening underneath the failover group Lessons 12-13 built and tested
- Why geo-replication is asynchronous, and what that means for Lesson 11's 5-minute RPO
- Region choice, and why it isn't arbitrary for Overlook
- Cost and performance trade-offs the board also needs to understand, not just the DBA

## What geo-replication is actually doing underneath

Lesson 12's failover group used geo-replication as its foundation without explaining the mechanism
itself. **Active geo-replication** continuously copies transactions from `OverlookDB`'s primary to
a readable secondary database in another Azure region. It's the data-movement engine; the failover
group is the endpoint-management layer built on top of it.

## Why it's asynchronous, and what that means for RPO

Geo-replication is **asynchronous** — the primary commits a transaction and acknowledges it to the
application *before* confirming the secondary has received it. This is a deliberate trade-off:
synchronous replication would wait for the distant secondary to confirm every write, which would
add real latency to every single transaction the scheduling application makes. Asynchronous
replication keeps that latency off the critical path, at the cost of a small window where a
transaction could exist on the primary but not yet have reached the secondary.

That window is exactly why Lesson 11 set RPO at 5 minutes rather than 0: a 5-minute RPO is Overlook
acknowledging, explicitly, that asynchronous replication's small replication lag is an acceptable
cost in exchange for not slowing down every write the scheduling application makes.

## Region choice isn't arbitrary

Overlook's secondary server lives in a different Azure region specifically so a region-wide outage
— not just a single server or datacenter failing — doesn't take down both the primary and the
secondary at once. Choosing a secondary region close enough to keep replication lag low, but far
enough to be a genuinely independent failure domain, is a real decision this capstone makes
deliberately, not a default left unexamined.

## Cost and performance trade-offs the board should understand

- **A readable secondary isn't free** — it's a second provisioned database, billed on its own,
  which is a real ongoing cost of this HA/DR posture, not a one-time setup cost.
- **The secondary can be used for read-only reporting traffic** in normal operation — offloading
  read load from the primary — which is a real benefit beyond pure disaster recovery, worth
  mentioning when presenting this platform's cost to leadership (Chapter 7).
- **More replicas, or a stricter RPO, cost more** — this is the kind of trade-off a board needs to
  understand in plain terms, not just see as a line item.

## Key terms

| Term | Meaning |
|---|---|
| Active geo-replication | Continuous, asynchronous copying of transactions to a readable secondary in another region |
| Asynchronous replication | The primary doesn't wait for the secondary to confirm before acknowledging a write |
| Replication lag | The small delay between a write landing on the primary and reaching the secondary |

## Check yourself

You're ready for Lesson 15 when you can explain, without looking: why is geo-replication
asynchronous rather than synchronous, and how does that choice directly connect to Lesson 11's
5-minute RPO target?
