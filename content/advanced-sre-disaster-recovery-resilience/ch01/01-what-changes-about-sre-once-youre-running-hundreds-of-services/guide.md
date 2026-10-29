# Lesson 1 — What Changes About SRE Once You're Running Hundreds of Services

**Chapter 1 · SRE Principles at Enterprise Scale · Lesson 1 of 4**

## What you'll learn

- Why the SRE practices you learned for a single service (SLIs, SLOs,
  golden signals, on-call for one team) stop working once an
  organization runs hundreds of them
- What cross-service dependency complexity actually does to
  reliability, and why "my service is fine" stops being a meaningful
  statement
- Why enterprises standardize SLO definitions and alerting practice
  across teams instead of letting each team invent its own
- What a production readiness review is, and why it exists

## The single-service version you already know

Earlier in this path you learned the core SRE toolkit at the scale of
one service: pick the golden signals (latency, traffic, errors,
saturation), define SLIs against them, set an SLO, and alert on
burning error budget rather than on raw thresholds. That model works
cleanly when there's one service, one on-call rotation, and one team
that owns the whole request path. Almost nothing about that model is
wrong at enterprise scale — but almost everything about the
*environment it runs in* changes once a company has gone from a
handful of services to hundreds of them, owned by dozens of
independently-moving teams.

## Cross-service dependency complexity

The first thing that changes is that a service's reliability is no
longer mostly a function of its own code. A checkout service with a
flawless 99.95% SLO can still fail your users if it calls an
inventory service, a pricing service, and a fraud-detection service,
each with its own SLO, and each of those calls a handful of services
beneath it. Reliability composes multiplicatively down a dependency
chain, and at hundreds of services the chain is rarely a simple line
— it's a graph, often with the same low-level service (an auth
token issuer, a feature-flag service, a shared database tier) sitting
underneath dozens of unrelated call paths. That shared dependency
becomes a single point of organizational blast radius: a change one
team makes to a "boring" internal service can take down products
owned by teams who have never heard of them. This is why enterprise
SRE practice puts real engineering effort into dependency mapping —
knowing, concretely, what calls what, and which services sit on the
critical path for which user-facing outcomes — rather than treating
each team's reliability as an isolated number.

## Why ad hoc, per-team SLO practice breaks down

When there are three services, it's tolerable for each team to define
its own SLIs its own way, name its alerts differently, and run its
own on-call playbook. When there are three hundred, that inconsistency
becomes an operational hazard. An incident commander pulled into a
sev-1 at 2 a.m. needs to be able to look at any team's dashboard and
immediately understand what "healthy" means for that service, without
relearning each team's bespoke conventions under pressure. This is
why enterprises standardize: a shared definition of what counts as a
golden signal, a shared format for SLO documents, a shared alerting
severity scale tied to burn rate rather than team-specific thresholds,
and shared runbook templates. Standardization isn't bureaucracy for
its own sake — it's what makes it possible for reliability engineering
to function as a *discipline* across an organization instead of as
hundreds of disconnected local habits. Centralized or embedded SRE
teams typically own and enforce these shared standards, auditing new
services against them before they're allowed meaningful production
traffic.

## Production readiness reviews

One concrete mechanism that shows up almost everywhere at this scale
is the production readiness review (sometimes called a launch review
or PRR): a checklist-driven review a new or significantly-changed
service goes through before it's trusted with real user traffic. It
checks exactly the things this lesson has been building toward — does
the service have SLIs and an SLO defined in the standard format, does
it emit the golden signals in the standard way, does it have
documented runbooks, does it know its own critical dependencies and
have a plan for when they fail, is there a realistic on-call rotation
behind it. A service that can't answer those questions isn't ready to
be one node in a graph of hundreds — it's a latent incident waiting
for a dependency chain to find it.

## Key terms

| Term | Meaning |
|---|---|
| Dependency graph | The map of which services call which other services, used to reason about blast radius and critical paths across hundreds of services |
| Blast radius | The scope of user-facing impact when a given service or shared dependency fails |
| Standardized SLO practice | A shared, enterprise-wide format for defining SLIs, SLOs, alerting severity, and runbooks, so reliability is legible across teams, not just within one |
| Production readiness review (PRR) | A checklist-driven review gating whether a service is trusted with real production traffic, verifying it meets the org's standard reliability practice |

## Check yourself

You're ready for Lesson 2 when you can explain, without looking: why
does a shared dependency used by many teams create more organizational
risk than a dependency used by only one team, and why does enterprise
SRE practice push toward standardized SLO and alerting conventions
instead of letting each team define its own?
