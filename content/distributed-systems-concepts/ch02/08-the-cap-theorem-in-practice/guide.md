# The CAP Theorem in Practice

The last two lessons showed that distributed systems communicate asynchronously and often choose eventual consistency over strong consistency. This lesson names the theorem that explains exactly when and why that choice becomes unavoidable: the CAP theorem. It's one of the most quoted — and most misquoted — ideas in distributed systems, so this lesson is careful to state it precisely.

## What you'll learn

- The precise statement of the CAP theorem
- Why "pick any 2 of 3" is a popular but misleading simplification
- The PACELC extension, which covers the case with no partition
- Concrete examples of systems that choose C and systems that choose A

## The precise statement

CAP stands for **C**onsistency, **A**vailability, and **P**artition tolerance:

- **Consistency** — every read reflects the most recent write (the "strong consistency" from Lesson 7)
- **Availability** — every request to a non-failing node receives a response
- **Partition tolerance** — the system keeps operating even when network messages between nodes are lost or delayed

The theorem, proven by Seth Gilbert and Nancy Lynch (building on a conjecture by Eric Brewer), states: **when a network partition actually occurs, a distributed system must choose between consistency and availability — it cannot provide both at the same time.** If a replica can't reach the rest of the cluster, it can either (a) refuse to answer to guarantee it never returns stale data — choosing consistency over availability — or (b) answer anyway using whatever data it has — choosing availability over consistency, and accepting the risk of a stale or conflicting result.

## Why "pick any 2 of 3" is misleading

CAP is frequently summarized as "you can only have two of the three." That phrasing suggests partition tolerance is optional, like consistency and availability — just pick P and one other. In a real distributed system that spans more than one machine, **network partitions will happen eventually**, whether from a cable fault, a switch failure, or a dropped packet. Partition tolerance isn't a feature you can opt out of; it's a property of reality. The actual, meaningful choice CAP describes is: **when a partition happens, do you sacrifice consistency or availability?** Outside of an actual partition, a well-built system can usually offer both C and A just fine — CAP only forces a choice during the partition itself.

## PACELC: the rest of the story

CAP only describes behavior during a partition. The **PACELC** framework (Partition → Availability or Consistency; Else → Latency or Consistency) extends this: even when there's *no* partition, a system still trades off latency against consistency, because keeping replicas strongly consistent requires coordination that adds delay. So a system makes two related but separate choices: what to sacrifice during a partition (A or C), and what to sacrifice during normal operation (lower latency or stronger consistency).

## CP and AP systems in practice

- **CP (consistency-favoring) example**: a strongly consistent configuration store or a leader-based system (like the consensus systems from Lesson 10) that refuses to serve a read if it can't confirm it has the latest committed value — correctness matters more than always answering.
- **AP (availability-favoring) example**: a DNS resolver or a shopping cart service that keeps answering with whatever data it has during a partition, because an answer (even a possibly stale one) is more valuable to the user than an error page.

Neither choice is universally "correct" — it depends entirely on what the data is for, which is exactly the judgment call Lesson 16's case study will walk through.

## Key terms

- **Consistency (in CAP)** — every read reflects the most recent write
- **Availability (in CAP)** — every request to a non-failing node gets a response
- **Partition tolerance** — the system keeps functioning despite lost or delayed messages between nodes
- **PACELC** — extends CAP to describe the latency-vs-consistency trade-off that exists even without a partition
- **CP system / AP system** — shorthand for which of consistency or availability a system favors when a partition occurs

## Recap

The CAP theorem doesn't offer a menu of three features to pick two from — it describes an unavoidable choice between consistency and availability the moment an actual network partition occurs, with PACELC covering the latency trade-off the rest of the time. Next, in Lesson 9, you'll see message queues and streams, one of the main tools systems use to manage communication under exactly this kind of uncertainty.
