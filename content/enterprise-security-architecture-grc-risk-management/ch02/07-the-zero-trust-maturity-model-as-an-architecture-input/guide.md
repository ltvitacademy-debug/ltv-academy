# Lesson 7 — The Zero Trust Maturity Model as an Architecture Input

**Chapter 2 · Security Architecture Frameworks · Lesson 7 of 4**

## What you'll learn

- A quick refresher on CISA's Zero Trust Maturity Model (ZTMM) —
  its five pillars and four maturity stages
- Why this lesson treats ZTMM differently than the security
  engineering course did: as an architecture-planning input, not an
  implementation checklist
- How a maturity assessment feeds directly into TOGAF's later ADM
  phases and SABSA's Physical/Component layers
- Why "where are we today, pillar by pillar" is itself an
  architectural deliverable, not just a security team exercise

## A fast refresher on CISA's ZTMM

You met the **CISA Zero Trust Maturity Model** earlier in this path,
in the security engineering course, as a way to implement zero trust
controls. Published and maintained by the **Cybersecurity and
Infrastructure Security Agency (CISA)**, version 2.0 organizes zero
trust around **five pillars**:

- **Identity**
- **Devices**
- **Networks**
- **Applications & Workloads**
- **Data**

cut across by **three cross-cutting capabilities**: **Visibility &
Analytics**, **Automation & Orchestration**, and **Governance**. Each
pillar is scored against **four maturity stages**: **Traditional**,
**Initial**, **Advanced**, and **Optimal** — moving from manual,
perimeter-based controls toward automated, continuously verified,
risk-based ones.

That's the engineering view: given a pillar and a target stage, what
controls do you deploy? This lesson asks a different question.

## ZTMM as a planning input, not a checklist

An enterprise architect doesn't start by picking controls. An
architect starts by asking **where the organization actually is
today**, pillar by pillar, and **how far it has to go** to reach a
target state the business has actually asked for. That's exactly what
a ZTMM maturity assessment produces: a scored baseline across five
pillars, each sitting somewhere between Traditional and Optimal.

Used this way, ZTMM becomes a **gap-analysis artifact** — the same
kind of deliverable a SABSA engagement would produce when comparing
the current Physical/Component-layer reality against the target
architecture implied by the Business Attributes Profile. "Identity is
at Initial, Data is still Traditional, Networks already sit at
Advanced" is a business-relevant finding, because it tells leadership
exactly where investment is needed, and in what order — not just
"here's a list of zero trust products to buy."

## Where it plugs into TOGAF's ADM

A ZTMM baseline fits naturally into specific TOGAF ADM phases:

- **Phase D (Technology Architecture)** — the five pillars line up
  almost directly onto technology architecture building blocks
  (identity services, device management, network segmentation, workload
  controls, data protection), so a pillar-by-pillar maturity score
  becomes a structured input to that phase's target-state design
- **Phase E (Opportunities & Solutions)** — gaps between current and
  target maturity stage, pillar by pillar, become candidate work
  packages
- **Phase F (Migration Planning)** — pillars furthest from target, or
  most exposed to risk, get sequenced earlier; a pillar already near
  Optimal gets deprioritized rather than re-litigated

This is the practical difference between "zero trust as a project"
and "zero trust as an architecture input": the maturity model doesn't
tell you to build anything by itself. It tells you where the gaps are
so the ADM's existing planning phases can sequence the work rationally
instead of chasing whichever pillar got the most attention at the
last vendor conference.

## Why maturity scoring is itself an architectural artifact

A completed ZTMM assessment — five pillars, each with a current stage,
a target stage, and the evidence behind the scoring — is a legitimate
architecture deliverable in its own right. It's business-relevant (it
explains where risk concentrates and why), it's traceable (each score
is backed by evidence, not a guess), and it directly informs sequencing
decisions elsewhere in the architecture process. That combination —
business relevance, traceability, and decision-usefulness — is
precisely what separates an architecture input from a pure engineering
artifact, even though the underlying five pillars and four stages are
identical in both contexts.

## Key terms

| Term | Meaning |
|---|---|
| CISA ZTMM | The Cybersecurity and Infrastructure Security Agency's Zero Trust Maturity Model: five pillars, three cross-cutting capabilities, four maturity stages |
| Maturity stage | Traditional, Initial, Advanced, or Optimal — how far a pillar has moved from manual/perimeter controls to automated, continuous ones |
| Gap analysis | Comparing current maturity stage against a target stage, pillar by pillar, to identify where investment is needed |
| Architecture input | A deliverable (like a ZTMM baseline) that feeds planning/sequencing decisions elsewhere in the architecture process, rather than prescribing a specific control |

## Check yourself

You're ready for Lesson 8 when you can explain, without looking: what
changes when a ZTMM assessment is used as a TOGAF Phase E/F planning
input rather than a security engineering checklist, and why the
assessment itself counts as an architectural deliverable?
