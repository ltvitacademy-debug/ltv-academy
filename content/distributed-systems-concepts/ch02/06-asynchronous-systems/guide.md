# Asynchronous Systems

Chapter 1 covered what makes a distributed system hard to build well: availability, scalability, reliability, latency, and throughput. This chapter goes one layer deeper and asks how the pieces of a distributed system actually talk to each other — and why that communication can never be as clean as a function call inside a single program. This lesson starts with the most fundamental fact of distributed systems: there is no shared clock, and no message is guaranteed to arrive on time, or at all.

## What you'll learn

- Why a distributed system has no global "now" that every node agrees on
- The difference between synchronous and asynchronous communication
- Why a slow node and a dead node can look identical from the outside
- A conceptual introduction to logical clocks and "happens-before" ordering

## There is no global clock

On a single machine, every operation happens in one agreed-upon order, because there is one clock and one memory. Across a network, that guarantee disappears. Two different machines' clocks drift at different rates, network delivery times vary unpredictably, and messages can arrive out of the order they were sent. A distributed system cannot simply ask "what time is it right now, everywhere" and get a meaningful answer — "now" is only well-defined locally, on each node.

## Synchronous vs. asynchronous communication

**Synchronous** communication means the caller sends a request and blocks — it stops and waits — until a response comes back. This is simple to reason about, but it ties the caller's fate to the callee's: if the callee is slow or down, the caller is stuck too.

**Asynchronous** communication means the caller sends a request (or publishes a message) and moves on immediately. The response, if there is one, arrives later through a callback, a polled status check, or a separate message. This is harder to reason about, but it is what lets a distributed system tolerate the reality that any node, at any moment, might be slow, unreachable, or down.

Most real distributed systems use asynchronous communication as their default and add synchronous-feeling operations on top of it only where they're truly needed.

## The problem you can never fully solve: slow vs. dead

Here is the fact that shapes nearly everything else in this chapter: if you send a message to another node and get no response, you cannot tell whether that node is overloaded and slow, whether the network dropped your message, whether the response is itself stuck in transit, or whether the node has actually crashed. All four look exactly the same from where you're standing — silence. Every failure-detection mechanism you'll see later in this chapter (heartbeats, timeouts, circuit breakers) is really just a policy for *guessing* when enough silence means "probably dead," because the system can never know for certain.

## Ordering events without a shared clock: happens-before

If nodes can't agree on wall-clock time, how does a distributed system reason about which of two events happened "first"? The answer used in practice is **logical ordering** rather than clock time. The core idea, originally described by Leslie Lamport, is called **happens-before**: event A happens-before event B if A could have influenced B — for example, A is "send a message" and B is "receive that message," or A and B occur in sequence on the same node. Two events that have no such causal link are called **concurrent**, and no ordering between them is meaningful at all. Lamport timestamps (and later vector clocks) are simple counters that let nodes detect this ordering without ever comparing physical clocks. You don't need to implement one to use this course — you need the idea, because it's the foundation for how the next lesson, eventual consistency, decides which of two conflicting writes "came first."

## Key terms

- **Synchronous communication** — the caller blocks until it receives a response
- **Asynchronous communication** — the caller continues immediately; the response (if any) arrives later
- **Partial failure** — a failure affecting only some nodes or some messages, not the whole system at once
- **Happens-before** — a causal ordering between two events, used instead of wall-clock time
- **Concurrent events** — two events with no causal link between them; neither "happened first" in any meaningful sense

## Recap

Distributed systems run without a shared clock and without any guarantee that a message will arrive, or arrive on time — which is why most real communication between nodes is asynchronous, and why "no response" can never be distinguished from "slow response." Next, in Lesson 7, you'll see how this uncertainty leads directly to eventual consistency as a deliberate design choice, not a compromise.
