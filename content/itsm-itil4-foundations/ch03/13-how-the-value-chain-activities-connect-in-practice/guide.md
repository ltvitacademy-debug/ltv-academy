# Lesson 13 — How the Value-Chain Activities Connect in Practice

**Chapter 3 · The Service Value Chain · Lesson 13 of 28**

## What you'll learn

- How a single real request moves through all six Service Value Chain activities
- Where Improve's continuous role actually shows up at each stage
- Why ITIL 4 calls a specific combination of activities and practices a "value stream"
- Why a small, routine request can skip most of the chain while a bigger one uses all six
- How to recognize which activity is doing the work at any given moment, on the exam and in practice

## One request, walked through all six activities

Picture an internal department asking for self-service password resets, so users stop having to call the service desk for something that routine. Here's how that single request realistically moves through the Service Value Chain:

**Engage** captures the request and makes sure what's actually being asked for — fewer service desk calls for password resets, not just "a new tool" — is understood correctly and relayed with the right context. **Plan** weighs this against everything else competing for the same budget and the same engineering time, and decides whether, when, and how it fits current priorities. **Design & transition** turns an approved idea into a specification — which self-service mechanism, what it costs, how fast it can ship — then tests it and plans the rollout. **Obtain/build** sources whatever the specification calls for: a license for a self-service password tool, integration work with the identity system, or both. **Deliver & support** runs the capability once it's live: handling the exceptions self-service can't resolve, and fielding what's left of the original call volume.

## Improve's role the entire time

Improve isn't a seventh step after Deliver & support finishes. It's active throughout: Engage might notice this is the fourth similar request this quarter and flag a pattern; Plan might notice the backlog-prioritization process itself is slow; Design & transition might notice testing kept finding the same category of defect; Deliver & support, once live, is the stage most likely to notice the self-service tool itself needs a fix. Every one of those observations is Improve doing its job — continuously, inside each of the other five activities, not as a separate stage the request has to additionally pass through.

## Not every request needs all six, in full

ITIL 4 calls a specific combination of activities, practices, and resources assembled for a particular scenario a **value stream**. The password-reset capability above is a substantial value stream — it realistically touches all six activities. A single user calling in to actually use that password reset, once it exists, is a far smaller value stream: Engage (the call) and Deliver & support (resolving it) do almost all of the work, with Plan, Design & transition, and Obtain/build barely involved, because the capability to do this was already built. Same six activities exist every time; which ones do substantial work, and how much, depends entirely on the value stream.

## Why this distinction is worth knowing cold

The ITIL 4 Foundation exam, and real incident/problem/change work in Chapters 4 and 5, both assume you can place a given scenario on this chain without hesitating: is this activity capturing a need (Engage), deciding priority (Plan), specifying and testing a change (Design & transition), sourcing a component (Obtain/build), running day-to-day operations (Deliver & support), or feeding an improvement opportunity back into the system (Improve)? Chapter 4 starts exactly where Deliver & support lives — Incident Management — because that's where most of the day-to-day practice work in ITIL 4 actually happens.

## Key terms

| Term | Meaning |
|---|---|
| Value stream | A specific combination of Service Value Chain activities and practices assembled for a particular scenario |
| Engage (recap) | Captures and relays stakeholder needs — the entry point for most value streams |
| Plan (recap) | Decides priority and direction before substantial work begins |
| Design & transition (recap) | Specifies, tests, and rolls out a change into live use |
| Obtain/build & Deliver & support (recap) | Source the components, then run and support the result day to day |

## Check yourself

Without looking back: walk your own example — pick any IT request — through Engage, Plan, Design & transition, Obtain/build, and Deliver & support, and identify one point where Improve would realistically notice something worth fixing.
