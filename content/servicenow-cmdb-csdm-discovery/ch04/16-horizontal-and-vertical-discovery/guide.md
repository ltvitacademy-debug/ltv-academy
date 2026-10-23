# Lesson 16 — Horizontal & Vertical Discovery

**Chapter 4 · Discovery Fundamentals · Lesson 16 of 26**

## What you'll learn

- The real distinction between Horizontal Discovery and Vertical Discovery
- Why Horizontal Discovery is the right tool for building baseline infrastructure coverage
- How Vertical Discovery connects directly to Service Mapping from Chapter 2
- Why a precise dependency map for one service needs a different approach than a broad sweep
- When a CMDB program actually needs both, not just one or the other

## Horizontal Discovery: broad, general-purpose coverage

Horizontal Discovery is the mode Lessons 14 and 15 were really describing: a broad sweep
across many infrastructure types at once — servers, network devices, databases, and more —
scanning a defined range to build out general CMDB coverage. It doesn't care, going in, about
any one application's dependencies; it's finding and classifying whatever exists in the range
and populating CIs for all of it. This is the right tool when the goal is baseline coverage:
knowing what infrastructure exists across an environment, not tracing how any one piece of it
connects to any other.

## Vertical Discovery: deep on one specific service

Vertical Discovery takes the opposite approach. Instead of scanning broadly, it goes deep on
one specific application or business service, tracing its full dependency chain — what it
connects to, and what depends on it in turn. Chapter 2 introduced Service Mapping, and Vertical
Discovery is closely related to that same idea: rather than asking "what infrastructure exists
in this subnet," it asks "this one critical application — what does it actually depend on, end
to end, to function?" That might mean tracing from a web server to its load balancer, to its
application server, to its database, to the storage array underneath that database — a precise
chain for one service, rather than a flat inventory of everything nearby.

```
Horizontal Discovery:                   Vertical Discovery:
- scans broadly across many types       - goes deep on ONE service
  (servers, switches, databases)        - traces its full dependency chain
- builds general CMDB coverage          - closely related to Service Mapping
- doesn't map any one dependency chain  - precise, not broad
```

## Why both exist — they solve different problems

A CMDB program that only ran Horizontal Discovery would know what infrastructure exists but
have no reliable picture of how any specific critical service actually depends on that
infrastructure — which is exactly the gap that matters most when that service goes down and
someone needs to know what to check first. A program that only ran Vertical Discovery would
have excellent dependency maps for a handful of important applications but no general awareness
of everything else running in the environment. In practice, both exist because they answer
different real questions: Horizontal Discovery for "what do we have, broadly," and Vertical
Discovery for "what does this one business-critical service actually depend on, precisely."

## Choosing which one a given need calls for

If the goal is populating the CMDB with general infrastructure coverage across an environment —
the kind of baseline work this chapter has focused on so far — Horizontal Discovery is the
right tool. If the goal is understanding exactly how one specific, important application is
built — tracing it through every tier it touches, the way an incident responder needs to during
an outage — Vertical Discovery, in partnership with Service Mapping, is the right tool instead.

## Key terms

| Term | Meaning |
|---|---|
| Horizontal Discovery | Broad scanning across many infrastructure types at once, to build general CMDB coverage |
| Vertical Discovery | Deep, focused discovery of one specific application or service's full dependency chain |
| Dependency chain | The full set of components a service connects to and depends on, end to end |
| Service Mapping | Chapter 2's capability for mapping a service's dependencies, closely related to Vertical Discovery |

## Check yourself

You're ready for Lesson 17 when you can explain, without looking: why would a team run
Horizontal Discovery for general infrastructure coverage but turn to Vertical Discovery
specifically when they need a precise dependency map for one critical business service?
