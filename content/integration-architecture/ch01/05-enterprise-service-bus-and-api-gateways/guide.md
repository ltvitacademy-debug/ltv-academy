# Lesson 5 — Enterprise Service Bus and API Gateways

**Chapter 1 · Integration Foundations · Lesson 5 of 28**

## What you'll learn

- What an Enterprise Service Bus (ESB) is and how it relates to the hub-and-spoke and middleware concepts from Lesson 4
- What an API gateway is, and how its job differs from an ESB's even though both sit "in front of" backend systems
- Why modern architectures increasingly combine a lightweight API gateway with iPaaS rather than a single heavyweight ESB
- How to recognize which of the two problems — message routing/transformation, or API traffic management — you're actually solving

## The ESB: the classic hub implementation

An **Enterprise Service Bus (ESB)** is the traditional, heavyweight implementation of the hub-and-spoke pattern from Lesson 4: a central piece of infrastructure that every connected system talks to, responsible for routing messages, transforming data formats between systems, and often orchestrating multi-step business processes across several backend systems. Classic ESBs (think of names like IBM Integration Bus, Oracle Service Bus, or TIBCO's offerings) were typically on-premises, licensed per core or per server, and required a dedicated team to install, configure, and operate. An ESB's defining trait is that it does deep, content-aware work on the messages passing through it — it looks inside a message, transforms its structure, and decides where it goes next based on what's actually in it, not just where it came from.

iPaaS platforms (Lesson 4) are, in effect, the cloud-native, subscription-based descendants of the ESB idea — same hub-and-spoke role, delivered as a managed service with pre-built connectors instead of custom-coded adapters.

## The API gateway: a different job at the edge

An **API gateway** solves a related but distinct problem: it's a single, managed entry point that sits in front of one or more backend APIs and handles the concerns that are the same across every API call, regardless of what that call actually does — authentication and authorization, rate limiting (preventing any one consumer from overwhelming a backend system), request/response logging, routing a call to the correct backend version, and sometimes basic request shaping. Unlike an ESB, an API gateway generally doesn't do deep content-aware transformation of the message body or orchestrate multi-step business logic — its job is traffic management and policy enforcement at the edge of the network, not business process logic in the middle of it.

The distinction matters because the two are often confused, but they answer different questions. An ESB answers "how does this message get translated and routed to the right backend, possibly across several steps?" An API gateway answers "who is allowed to call this API, how often, and how do I protect the backend from being overwhelmed?" A mature architecture frequently uses both: an API gateway at the edge managing traffic and security for all incoming API calls, with an iPaaS or ESB layer behind it doing the actual data transformation and multi-system orchestration.

## Why modern architectures favor lighter combinations

Classic, monolithic ESBs fell out of favor for the same reason many monolithic platforms did: a single heavyweight piece of infrastructure doing routing, transformation, and orchestration all at once becomes a bottleneck to change — every integration team depends on the same ESB team and the same deployment cycle. Current practice tends to favor a lighter-weight combination: an API gateway for edge traffic management, paired with an iPaaS (or several smaller, purpose-specific integration flows) for transformation and orchestration, so that teams can iterate on their piece of the integration landscape without all depending on one central bottleneck. This mirrors the broader shift in software architecture from large monoliths toward more loosely coupled, independently deployable services.

## Key terms

| Term | Meaning |
|---|---|
| Enterprise Service Bus (ESB) | A central hub that routes messages, transforms data, and can orchestrate multi-step processes across backend systems |
| API gateway | A managed entry point in front of backend APIs that handles authentication, rate limiting, logging, and routing at the edge |
| Content-aware transformation | Processing that looks inside a message and transforms its structure based on what it actually contains |
| Rate limiting | Restricting how many requests a given consumer can make in a given time window, to protect the backend |

## Lab

A company is building a public-facing API program: external partners will call a set of Salesforce-backed APIs to look up order status, and the company also needs several internal systems to exchange and transform data behind the scenes (translating between an old XML-based legacy format and modern JSON). Recommend which concern (API gateway, ESB/iPaaS, or both) handles each of the two needs, and justify your answer using the distinction this lesson draws between edge traffic management and content-aware transformation.

## Check yourself

Can you explain, in one sentence each, what question an ESB answers versus what question an API gateway answers? Can you name two reasons modern architectures tend to favor a lighter API-gateway-plus-iPaaS combination over a single monolithic ESB?
