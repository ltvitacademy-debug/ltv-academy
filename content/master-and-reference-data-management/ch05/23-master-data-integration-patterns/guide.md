# Lesson 23 — Master Data Integration Patterns

**Chapter 5 · Enterprise Consistency · Lesson 23 of 25**

## What you'll learn

- How the four MDM architecture styles from Lesson 3 translate into actual data movement
- The difference between batch, API, and event-driven integration mechanisms
- How to pick an integration pattern for a given business scenario
- Why the "wrong" pattern for a scenario still works — until it doesn't, under load

## From architecture style to data movement

Lesson 3 introduced four MDM architecture styles — registry, consolidation, coexistence, and centralized (transaction hub) — as a way of answering "where does the authoritative record actually live." This lesson asks the follow-up question: once you've picked a style, how does data actually move between the hub and the systems that use it?

- **Registry style**: the hub holds an index — pointers and match keys, not full golden records. Integration here means a lightweight, frequent lookup: a consuming system asks the registry "which source system has the authoritative record for this customer ID," then goes and gets it there. Nothing is copied centrally.
- **Consolidation style**: the hub assembles full golden records (Chapter 2) from multiple sources, but doesn't push them back out for editing — consumers read from the hub, typically through scheduled extracts, for reporting and analytics. Integration is mostly one-directional, hub to consumer.
- **Coexistence style**: the hub is authoritative, but source systems can still create and edit records locally, and those edits sync back into the hub. Integration is bidirectional — the hub distributes golden records outward (Lesson 21) and also has to absorb inbound changes from every source system, which is where a lot of real-world MDM complexity lives.
- **Centralized (transaction hub) style**: all create, read, update, and delete operations for the domain happen directly against the hub. There's no "sync" in the traditional sense because there's only one place the data is ever written — every consuming system calls the hub directly, in real time.

## Three integration mechanisms

Whichever style you're in, the actual plumbing tends to be one of three mechanisms:

- **Batch / file-based** — a scheduled job exports or imports a file (CSV, XML, a flat extract) between the hub and a source or target system, typically nightly or on another fixed interval. Simple to build, easy to audit, but data can be hours or a full day stale — acceptable for a data warehouse load, risky for a system that needs same-second accuracy.
- **API-based (request/response)** — a consuming system calls the hub's API (typically REST) to look up or update a record on demand. Data is as fresh as the last call, and the pattern fits registry-style lookups and coexistence-style edits well, but every consumer now depends on the hub's API being available when they need it.
- **Event-driven / publish-subscribe** — when a golden record changes in the hub, it publishes an event ("Customer 48291 updated") onto a message bus, and every interested system subscribes and reacts on its own schedule. This decouples the hub from needing to know who its consumers are, and it's the mechanism of choice for coexistence and centralized styles at real scale — Lesson 21's distribution problem, solved without each consumer polling the hub constantly.

## Matching pattern to scenario

| Scenario | Likely style | Likely mechanism |
|---|---|---|
| Nightly product catalog sync to a data warehouse | Consolidation | Batch / file-based |
| Real-time customer lookup during a support call | Centralized or coexistence | API-based |
| Multiple source systems' customer edits need to reach every downstream app within minutes | Coexistence | Event-driven |
| Quick cross-reference check against a legacy system you don't want to touch | Registry | API-based lookup |

None of these pairings are a law — a registry-style MDM program can absolutely use batch files for its index refresh, and a consolidation-style hub can publish events instead of running nightly extracts. The table is a starting intuition, not a rulebook; the real decision depends on how fresh the data needs to be, how many consumers there are, and how much the source systems can be changed.

## Why the "wrong" pattern can still work, for a while

A nightly batch file quietly feeding a system that actually needed real-time data often works fine on day one — small volumes, forgiving users, nobody checking timestamps. The failure shows up later, under load: a customer calls support about an order placed an hour ago, and the support rep's screen, fed by last night's batch, doesn't have it yet. Picking the integration mechanism isn't a one-time technical decision; it's a bet about how the business will actually use the data, and it's worth revisiting whenever usage patterns change.

## Key terms

| Term | Meaning |
|---|---|
| Registry style | MDM architecture where the hub holds an index/match keys, not full golden records |
| Coexistence style | MDM architecture where source systems keep editing locally and sync bidirectionally with the hub |
| Batch / file-based integration | Scheduled file export/import between systems, simple but potentially stale |
| Event-driven integration | Hub publishes change events; subscribing systems react independently |

## Lab

Take one real system pairing from your own work or a hobby project — any two places the same fact (a customer, a product, anything) has to agree. Decide which of the three mechanisms (batch, API, event-driven) actually connects them today, and whether that matches how fresh the data actually needs to be. If there's a mismatch, write one sentence on what would break first if it stayed that way.

## Check yourself

Walk through all four MDM architecture styles from memory and name which integration mechanism fits each one most naturally, and explain in your own words why the "right" pattern depends on freshness needs rather than being a fixed rule.
