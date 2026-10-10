# Lesson 8 — Event-Driven Architecture

**Chapter 1 · Integration Foundations · Lesson 8 of 28**

## What you'll learn

- What event-driven architecture (EDA) is, and how it generalizes the fire-and-forget pattern from Lesson 7 into a full architectural style
- The producer/consumer/event-bus model, and why producers and consumers don't know about each other directly
- High-volume Platform Events and the add-on model that extends Salesforce's native event capacity
- Why EDA trades immediate consistency for loose coupling, and why that trade is often worth making

## From a pattern to an architectural style

Lesson 7 introduced fire-and-forget as one asynchronous messaging pattern among several. **Event-driven architecture (EDA)** takes that same idea and makes it the organizing principle for an entire system: instead of systems calling each other directly (synchronously or asynchronously), systems announce that something happened — an **event** — and any number of other systems react to that announcement independently, without the system that raised the event needing to know who's listening or what they'll do about it.

The vocabulary is consistent across event-driven systems: a **producer** is whatever raises the event (an Opportunity being closed, an order being shipped, a case being escalated). An **event bus** (or event channel) is the infrastructure that receives published events and makes them available to anyone subscribed. A **consumer** is anything that subscribes to and reacts to an event. Critically, the producer doesn't call the consumer directly, doesn't know how many consumers exist, and doesn't change its own behavior based on what any consumer does with the event afterward. This is a deliberately **decoupled** design: a new consumer can start reacting to "Opportunity closed" events next quarter without the producer being touched at all.

## Why decoupling is the whole point

The value EDA delivers is architectural flexibility over time. In a point-to-point or tightly-coupled design, adding a new system that needs to react to "an Opportunity closed" means modifying the code that closes Opportunities — a change to logic that has nothing to do with the new consumer's actual need. In an event-driven design, the Opportunity-closing logic already publishes the event; a new consumer just subscribes to it. This is exactly how a Platform Event-based design lets a finance system, a customer-success alert, and an analytics pipeline all react to the same business event without any of them being aware the other two exist, and without the core Opportunity-closing logic in Salesforce ever needing to change to support a new one joining later.

## Scaling event volume on the Salesforce platform

Because EDA depends on an event bus that can handle real production event volume, Salesforce enforces specific allocations on Platform Events. Per Salesforce's own Platform Event limits documentation, these allocations vary by edition and change across releases, so an architect designing for genuine event volume checks the current Platform Event Allocations page for the org's specific edition rather than assuming a number from memory. Salesforce also offers a **High-Volume Platform Events add-on** that raises an org's event delivery and publishing allocations beyond the native per-edition limits, intended for orgs whose event-driven design generates volume beyond what the base platform allocation supports. The existence of this add-on is itself an architectural signal: Salesforce expects serious event-driven designs to eventually need more headroom than the default allocation gives them, and sizing event volume against the org's actual allocation (not an assumed one) is part of the architect's job, not an afterthought discovered after a design goes live.

## The trade-off: loose coupling instead of immediate consistency

EDA's cost is the mirror image of its benefit. Because consumers react independently and asynchronously, there's no instant, system-wide guarantee that every consumer has processed a given event by any particular moment — one consumer might react in milliseconds, another might be catching up five minutes later after a brief outage. This is called **eventual consistency**: every consumer will eventually reflect the event, but not necessarily all at the same instant. For business processes that need everyone looking at the same data right now, this is a genuine limitation. For most of what EDA is actually used for — notifications, analytics, cross-system synchronization that doesn't require split-second alignment — eventual consistency is an acceptable, even invisible, trade for the flexibility decoupling buys.

## Key terms

| Term | Meaning |
|---|---|
| Event-driven architecture (EDA) | An architectural style where systems announce events and any number of independent consumers react, without direct calls between producer and consumer |
| Producer | The system or process that raises an event |
| Consumer | A system or process that subscribes to and reacts to an event |
| Decoupling | Producers and consumers having no direct knowledge of or dependency on each other |
| Eventual consistency | The guarantee that all consumers will reflect an event eventually, but not necessarily at the same instant |
| High-Volume Platform Events add-on | A Salesforce add-on that raises an org's Platform Event delivery and publishing allocations beyond the base per-edition limit |

## Lab

A retail company wants a new customer-loyalty system to react whenever an Order is marked Shipped, without touching the existing order-fulfillment Apex that marks orders as shipped today. Describe, using the producer/consumer/event-bus vocabulary from this lesson, how an event-driven design would let the loyalty system start reacting to shipped orders without modifying the fulfillment logic at all, and name the one Salesforce platform feature from Lesson 7 that would carry the event.

## Check yourself

Can you explain why a producer in an event-driven design doesn't need to know how many consumers are listening or what they do with an event? Can you explain, in your own words, what eventual consistency means and why it's an acceptable trade-off for most — but not all — business processes?
