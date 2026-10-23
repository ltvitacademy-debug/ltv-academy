# Lesson 10 — The CSDM Domains: Overview

**Chapter 3 · The Common Service Data Model (CSDM) · Lesson 10 of 26**

## What you'll learn

- The real purpose behind CSDM's layered approach to organizing data
- The three broad kinds of layers: foundational/shared data, design-time planning data, and live operational data
- Why keeping "what we're planning" separate from "what we're running" matters
- How a CI, application, or service is expected to move from one layer to another over its lifecycle
- How to recognize which layer a given piece of data belongs in

## Three layers, one underlying purpose

CSDM doesn't organize everything into one flat pile of CIs, applications, and services. It groups that data into a small number of distinct layers, each with a different job, and real implementations are expected to respect which layer a given piece of data belongs in. At a conceptual level — without getting lost in exact field or table names, which can shift between ServiceNow releases — those layers break down into roughly three kinds of data: a foundational/shared layer, a design-time planning layer, and a live operational layer.

## Foundational, shared data

At the base sits data that everything else depends on but that isn't, itself, a service or an application: locations, companies, business units, and the core infrastructure CIs you built in Chapters 1 and 2 — servers, databases, network devices. This layer is "foundational" in the literal sense: a service can't be modeled meaningfully until the locations and companies it serves, and the infrastructure it runs on, already exist as clean records.

## Design-time planning data

A second layer holds services and applications that are being planned, proposed, or built, but aren't live yet. An application still in development, a service that's been approved in a roadmap but hasn't been deployed to production, a proposed consolidation of two existing services — all of that belongs conceptually in this planning layer. It's real data, worth tracking carefully, but it describes intent and future state, not what's currently running and being supported.

## Live, operational data

The third layer is the services and CIs actually running in production right now — the ones Incident and Problem management care about, the ones impact analysis in Chapter 2 traces through, the ones a customer actually depends on today. This is "operational" in the sense that it's live: outages here affect real users, and this is the data operational dashboards and support teams should be looking at.

## Why the separation matters in practice

Without this separation, a CMDB easily ends up conflating "what we're planning to build" with "what we're actually running" — a proposed application sitting in the same bucket as a production one, confusing both impact analysis, which should only trace through what's genuinely live, and portfolio planning, which needs to see what's still in the pipeline without live production noise mixed in. Keeping planning-stage data and operational data in distinct layers, both built on the same foundational data underneath, is what lets each audience — planners, support engineers, executives — trust that what they're looking at is scoped to what they actually need.

## Key terms

| Term | Meaning |
|---|---|
| Foundational/shared layer | Base data — locations, companies, core infrastructure CIs — that other layers depend on |
| Design-time/planning layer | Services and applications being planned or built, not yet live in production |
| Live/operational layer | Services and CIs actively running and supported in production today |
| Layered domain model | CSDM's approach of grouping data by role rather than storing everything in one undifferentiated pile |

## Check yourself

If a new application has been approved and funded but hasn't been deployed anywhere yet, which layer does it belong in — and what would go wrong if it were modeled as if it were already live?
