# Lesson 5 — What a Landing Zone Actually Solves

**Chapter 2 · Landing Zones and Multi-Account Design · Lesson 1 of 4**

## What you'll learn

- The real, recurring problem that shows up the moment a second team
  asks for cloud access — not a hypothetical, a day-one operational
  fact
- Why "ship the workload now, add governance later" fails in practice
  once resources already exist
- What a **landing zone** actually is: not a product you install, but
  a pre-built, governed baseline a new workload lands into
- The handful of things every landing zone — Azure's or AWS's —
  actually provides before the first application resource gets created

## The blank-subscription problem

Picture the moment a new team asks for cloud access. Someone with
admin rights creates a fresh Azure subscription or AWS account, hands
over the login, and the team starts building. At that instant, that
subscription or account has no logging shipped anywhere, no network
connectivity to anything else the company runs, no policy stopping
someone from opening a storage bucket to the public internet, no
consistent tagging for cost allocation, and no guardrail preventing a
misconfigured resource from quietly running up a bill for a month
before anyone notices. None of that is a hypothetical risk — it is the
default state of every brand-new subscription or account on both
clouds, because the provider's job stops at giving you compute and
storage primitives. Governance is not bundled in.

The instinctive fix — "let the team build first, we'll bolt on
logging and policy once something's actually running" — is where this
goes wrong. Retrofitting a tagging standard onto two hundred resources
that already exist, after the fact, across a dozen teams who've each
made their own naming choices, is a project in itself. Retrofitting
network segmentation after a dev environment has been quietly talking
to a production database for six months is worse. The cost of adding
governance is roughly proportional to how much has already been built
without it, so the cheapest point to add it is before anything exists
at all.

## A landing zone is where you add it before, not after

A **landing zone** is a pre-provisioned, pre-governed environment that
a new workload lands into — the cloud equivalent of a building lot
that already has roads paved, water and power run to the property
line, and a permit office that enforces the same building code on
every lot, instead of raw undeveloped land where the first thing
anyone has to do is negotiate all of that from scratch. By the time an
application team's subscription or account exists, it should already
have:

- **Identity and access** wired to the company's actual identity
  provider, not a local admin account someone remembers the password to
- **Network connectivity** already in place to shared services — a hub
  network, centralized DNS, egress controls — instead of each team
  improvising its own internet-facing setup
- **Policy guardrails** that are already active, not aspirational —
  rules that physically prevent the obviously wrong configurations
  rather than a wiki page asking teams to remember them
- **Centralized logging and monitoring**, so a security or ops team can
  see what's happening in a new subscription or account on day one,
  not after someone goes looking for logs that were never configured
- **Cost visibility**, tagged and routed to the right budget, from the
  very first resource created

None of that is one product. On Azure it's a reference architecture
called **Azure Landing Zones**, built from management groups, policy
assignments, and a repeatable provisioning process. On AWS it's **AWS
Control Tower**, built from AWS Organizations, Organizational Units,
and guardrails. Different vendor vocabulary, same underlying answer to
the same underlying problem — which is exactly why this chapter covers
both, and why the next two lessons go deep on each one by name.

## Why this matters more as an organization grows

A single team on a single subscription or account can get away with
skipping most of this — there's no one else to isolate from, and the
blast radius of a mistake is small. The landing zone pattern starts
paying for itself the moment a second team shows up, and it compounds
from there: the fifth team onboarded into an already-built landing
zone inherits network connectivity, logging, and policy automatically,
in minutes, instead of a manual setup project that repeats — slightly
differently, with slightly different gaps — every single time. That
repeatability, not any individual guardrail, is the actual point of
the pattern, and it's what the rest of this chapter builds toward.

## Key terms

| Term | Meaning |
|---|---|
| Landing zone | A pre-provisioned, pre-governed environment a new workload lands into, with identity, networking, policy, logging, and cost tracking already in place |
| Blank subscription/account | The default, ungoverned starting state of any new Azure subscription or AWS account before a landing zone process touches it |
| Guardrail | A policy that's actively enforced, not just documented — it prevents or flags a non-compliant configuration automatically |
| Azure Landing Zones / AWS Control Tower | The two clouds' respective reference implementations of the landing zone pattern, covered by name in Lessons 6 and 7 |

## Check yourself

You're ready for Lesson 6 when you can explain, without looking: why
is retrofitting governance onto an existing, already-built environment
more expensive than building the governance in before the first
workload resource exists?
