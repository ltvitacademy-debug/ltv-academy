# Lesson 3 — Point-to-Point Integration

**Chapter 1 · Integration Foundations · Lesson 3 of 28**

## What you'll learn

- What point-to-point integration is, and why it's almost always where an org's integration landscape starts
- The real advantages that make point-to-point the right choice for a genuinely small number of connections
- Why point-to-point connections scale badly as the number of connected systems grows
- The "N-squared problem" and how to recognize it before it becomes unmanageable

## A direct connection between exactly two systems

**Point-to-point integration** connects exactly two systems directly to each other, with each connection built, maintained, and understood as its own self-contained piece of work. Salesforce calls an ERP's API directly; a marketing platform calls Salesforce's REST API directly; there's no shared intermediary layer doing translation, routing, or orchestration on either side. For a genuinely small integration landscape — two or three systems, a handful of connections — point-to-point is often the right answer, not a mistake. It has real advantages: it's simple to build, simple to reason about (the whole flow lives in one place), has no extra infrastructure to stand up or license, and has the lowest possible latency since nothing sits between the two systems.

## Where it breaks down: the N-squared problem

The advantages of point-to-point integration don't scale, because the *number of connections* needed scales much faster than the *number of systems*. With 3 systems that all need to talk to each other, you need at most 3 connections. With 6 systems, you need up to 15. With 10 systems, up to 45. The formula is N×(N-1)/2 — commonly shortened to "the N-squared problem," since the connection count grows roughly with the square of the number of systems, not linearly with it. Each of those connections is a separate thing to build, test, secure, monitor, and eventually fix when one side changes its API. An org that added a new point-to-point connection every time a new system came online, with no shared plan, ends up years later with dozens of individually bespoke connections that nobody fully understands anymore — exactly the integration debt described in Lesson 2.

A second, quieter cost compounds the first: every point-to-point connection typically reimplements its own error handling, its own retry logic, its own authentication, and its own logging, because there's no shared layer to put that logic in once. Fixing a systemic problem — say, adding better retry behavior — means touching every connection individually instead of fixing it in one place.

## When point-to-point is still the right call

This lesson is not an argument that point-to-point is always wrong. It remains the right choice when the number of connections is genuinely small and likely to stay that way, when latency is critical and an extra hop through middleware would hurt, when the integration is simple and unlikely to be reused by a third system later, or when there's a hard deadline and bringing in middleware would be disproportionate to the problem. The architectural judgment call — covered in full in Lesson 11 — is recognizing *when* the number of connections is about to cross from "a few, manageable" into "N-squared territory," and that's usually the signal to introduce a middleware or hub-and-spoke layer (Lesson 4) before the landscape, not after it's already become unmanageable.

## Key terms

| Term | Meaning |
|---|---|
| Point-to-point integration | A direct connection between exactly two systems, with no shared intermediary layer |
| N-squared problem | The way the number of point-to-point connections needed grows roughly with the square of the number of systems, following N×(N-1)/2 |
| Integration debt | Point-to-point connections accumulated without a shared plan, each one making the next harder and riskier to build |

## Lab

A company currently has 4 systems connected point-to-point: Salesforce, their ERP, their marketing platform, and their support ticketing tool, fully meshed (every system talks to every other one) for a total of 6 connections. Leadership is now adding 3 more systems over the next year — a data warehouse, an e-signature tool, and a second regional Salesforce org — with the expectation that all of them eventually need to exchange data with most of the existing systems. Calculate how many point-to-point connections a fully-meshed design would require once all 7 systems are connected, and write two sentences arguing whether this company should continue adding point-to-point connections or introduce a different pattern.

## Check yourself

Can you state the N-squared formula and calculate the number of connections for 5, 8, and 10 fully-meshed systems? Can you name two circumstances in which point-to-point integration remains the correct architectural choice even today?
