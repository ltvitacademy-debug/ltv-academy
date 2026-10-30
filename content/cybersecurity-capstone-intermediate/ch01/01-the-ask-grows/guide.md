# Lesson 1 — The Ask Grows: Two Stakeholders, One Deadline

**Chapter 1 · Intermediate Capstone: Multi-Source Detection and a Real Misconfiguration · Lesson 1 of 16**

## What you'll learn

- How this project differs from the Beginner project: two stakeholders, not one, with two different motivations for the same buildout
- The two real asks: operational visibility and an auditable compliance trail
- Why this project is a SOC *buildout*, not a one-off hardening pass
- The shape of what's coming: multi-source ingestion, a cross-source correlation rule, a Conditional Access pilot, and a real incident-response runbook

## Where the Beginner project left off

At Hartwell Regional Utilities, a mid-size regional electric and water utility, the Beginner
project solved a narrower problem: Security Analyst **Mara Voss** hardened a handful of
exposed servers and shipped one working Sentinel analytics rule, for IT Manager **Dale
Granger**. That project proved the basics worked — a rule could be written, logs could land in
a workspace, an alert could fire. This project starts the moment Hartwell decides the basics
aren't enough.

## Two stakeholders, two different motivations

This time, two people ask for a much bigger buildout, independently, in the same week:

- **Owen Mercer**, IT Director, wants real **operational visibility** — a SOC that can actually
  see what's happening across Hartwell's environment: the Windows servers, the Linux systems
  running field-operations tooling, and the perimeter firewall that sits between Hartwell's
  network and the internet. Right now, Mara's one Sentinel rule only watches a narrow slice of
  that picture.
- **Renee Castellano**, Compliance Officer, wants an **auditable compliance trail** — utilities
  like Hartwell answer to regulatory frameworks (NERC CIP-style controls are a real, common
  example in the electric sector) that expect documented logging, access review, and incident
  response capability, not just good intentions. Renee needs evidence the controls exist and
  work, not just a verbal assurance that they do.

## Why one project, not two

Owen and Renee didn't coordinate before asking — but their asks land on the same desk the same
week, and they turn out to overlap more than either expected. A SOC that actually sees
Hartwell's firewall, Windows, and Linux traffic *is* the operational visibility Owen wants, and
the same build — done with real documentation, a real incident-response runbook, and a real
access-control pilot — *is* the auditable trail Renee wants. One well-scoped project can satisfy
both; two separate, uncoordinated projects almost certainly won't.

## What this project is actually building

Over the next fifteen lessons, this project builds: multi-source log ingestion into Microsoft
Sentinel (Windows, Linux, and the perimeter firewall), a real cross-source correlation rule that
watches those sources together instead of in isolation, a Conditional Access pilot policy, and
Hartwell's first real incident-response runbook. Lesson 2 reconciles exactly what Owen and Renee
each need before any of that gets built.

## Key terms

| Term | Meaning |
|---|---|
| Operational visibility | The ability to actually see what's happening across an environment's systems, in near-real time |
| Auditable compliance trail | Documented evidence — logs, policies, runbooks — that security controls exist and function, for a regulator or auditor |
| NERC CIP | A set of mandatory cybersecurity standards electric utilities in North America are held to |
| SOC buildout | Expanding a security operations capability's reach and depth, not just adding one rule |

## Check yourself

You're ready for Lesson 2 when you can answer, without looking: what does Owen actually want,
what does Renee actually want, and why do their two independent asks turn out to point at the
same project instead of two separate ones?
