# Lesson 4 — The Real Relationship Between SRE and Platform Engineering

**Chapter 1 · SRE Principles at Enterprise Scale · Lesson 4 of 4**

## What you'll learn

- A quick recap of the platform engineering concept from earlier in
  this path, and what a "paved road" actually means in practice
- Why SRE and platform engineering are genuinely different
  disciplines with different goals, not two names for the same job
- How the two teams depend on each other at hundreds-of-services
  scale, and what breaks when they don't collaborate
- What this division of labor looks like structurally in a real
  organization

## The paved road, recapped

Earlier in this path you covered platform engineering: internal
platform teams build **self-service golden paths** — a standardized
way to provision a service, a database, a CI/CD pipeline, a deployment
target — so that product teams don't each have to solve the same
infrastructure problems from scratch. The core promise of a paved
road is that a team following it gets sensible defaults for free:
logging wired up, a deployment pipeline that works, autoscaling
configured, secrets management handled. The platform team's goal is
developer experience and leverage — getting every team to good
infrastructure outcomes without every team needing deep infra
expertise.

## Where SRE fits — and where it's genuinely different

It's tempting to think SRE and platform engineering are just two
names for "the team that keeps infrastructure running," but they
have different jobs even when they sit close together. Platform
engineering's responsibility is building and maintaining the paved
road itself — the tools, templates, and self-service systems. SRE's
responsibility is the **reliability of what runs on it**: defining
and tracking SLOs, running the error budget policy from Lesson 2,
responding to incidents, driving the toil-reduction discipline from
Lesson 3, and making the engineering tradeoffs that keep production
systems within their reliability targets. A platform team can ship a
perfectly well-designed paved road and a service running on it can
still have a terrible SLO, because reliability depends on how a
specific service is built, deployed, and operated on top of that
road — not only on the road's existence.

## Why they have to work closely together at scale

The two disciplines converge in practice precisely because of
everything covered earlier in this chapter. SRE wants every one of
hundreds of services to have standardized SLO definitions, golden-
signal instrumentation, and sane alerting — but SRE can't realistically
walk into every team individually and get that done by persuasion
alone. The leverage point is the paved road itself: when SRE's
reliability requirements get built directly into the platform's
default templates — every new service gets observability wired in
automatically, every deployment pipeline includes a canary step,
every service scaffold ships with a standard SLO config file already
present — then standardization isn't something SRE has to enforce
team by team, it's something the platform hands every team for free
the moment they use it. This is also, directly, a toil-reduction
strategy: baking a reliability default into the platform once removes
a piece of manual, repetitive setup work from every team that would
otherwise have had to do it themselves. Platform engineering reduces
the toil of *building* good infrastructure; SRE reduces the toil of
*operating* it reliably, and the cleanest version of this is when
those efforts are the same effort.

## Where it breaks down

When these teams don't collaborate, the failure mode is predictable:
platform engineering ships a paved road optimized purely for developer
convenience, with no reliability guardrails built in, and SRE spends
its time fighting individual teams after the fact to retrofit
observability and alerting onto services that were never built with
it. That's expensive, inconsistent, and it's exactly the kind of toil
this chapter has already named as a problem. The other failure mode
is a platform team that adds so many mandatory reliability gates that
the paved road stops being faster than doing it yourself, and teams
route around it entirely — which defeats platform engineering's whole
purpose and leaves SRE back to policing ungoverned services one at a
time.

## The structural reality

In practice, most organizations running at this scale handle the
relationship one of two ways: a dedicated, centralized platform
engineering team builds and owns the paved road with SRE acting as a
close consulting partner whose requirements get embedded into the
platform's defaults, or a combined "Platform SRE" function owns both
responsibilities under one roof. Either structure works. What doesn't
work is treating the two as unrelated — platform engineering without
SRE input tends to under-invest in reliability defaults, and SRE
without a platform to lean on tends to drown in the hundreds-of-
services toil this whole chapter has been describing.

## Key terms

| Term | Meaning |
|---|---|
| Paved road | The standardized, self-service way platform engineering lets teams provision infrastructure, with sensible defaults built in |
| Platform engineering | The discipline that builds and maintains the paved road — tools, templates, self-service systems — for developer leverage |
| SRE (in this relationship) | The discipline responsible for the reliability of what actually runs on the paved road — SLOs, error budget policy, incident response, toil reduction |
| Platform SRE | A combined organizational structure where one team owns both the paved road and the reliability guarantees built into it |

## Check yourself

You've completed Chapter 1 when you can explain, without looking: what
specifically is different about platform engineering's job versus
SRE's job even when they work closely together, and why does baking
SRE's reliability requirements directly into the platform's default
templates function as both a standardization strategy and a
toil-reduction strategy at the same time?
