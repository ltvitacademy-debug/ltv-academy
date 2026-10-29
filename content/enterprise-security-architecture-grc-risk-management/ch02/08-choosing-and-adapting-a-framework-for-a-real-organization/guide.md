# Lesson 8 — Choosing and Adapting a Framework for a Real Organization

**Chapter 2 · Security Architecture Frameworks · Lesson 8 of 4**

## What you'll learn

- Why no single published framework is "correct" for every
  organization, and what actually should drive the choice
- A practical set of questions to ask before picking SABSA, TOGAF,
  ZTMM, or some combination
- Real patterns organizations use to blend frameworks instead of
  picking exactly one
- Why adopting a framework lightly, using only the artifacts that
  solve a real problem, usually beats implementing it by the book

## There is no universally correct framework

By this point in the chapter you've seen three real, published
frameworks — SABSA, TOGAF, and CISA's ZTMM — each one solving a
genuinely different problem. SABSA gives you business traceability.
TOGAF gives you a repeatable enterprise architecture process. ZTMM
gives you a maturity baseline for a specific, high-priority area of
technology architecture. None of them is "the" answer, and a
security architect who walks into a new organization already
committed to one specific framework, before understanding that
organization, is making the same mistake SABSA warns against:
choosing a control — or here, a framework — before it's tied to a
real requirement.

## Questions that should actually drive the choice

Before recommending a framework (or blend of frameworks), a security
architect should have real answers to:

- **Does an enterprise architecture practice already exist?** If the
  organization already runs TOGAF for its broader EA work, fighting
  that by introducing a competing top-level process is usually a
  losing move — you integrate security *into* what's there.
- **How mature is business-security engagement already?** If business
  stakeholders have never been asked to articulate security-relevant
  attributes in their own language, SABSA's Business Attributes
  Profile exercise is often the single highest-value thing you can
  introduce, independent of anything else.
- **What's driving the engagement — audit, incident, growth, or
  greenfield build?** A regulated financial institution facing a SOC 2
  or ISO 27001 audit often needs SABSA-style traceability most,
  because an auditor will ask exactly the "why does this control
  exist" question SABSA is built to answer.
- **Where is technology architecture itself in its zero trust
  journey?** If identity, network, and data controls are still largely
  Traditional, a ZTMM baseline is a fast, concrete way to show
  leadership where the actual gaps are, long before a full TOGAF or
  SABSA engagement could produce the same clarity.
- **How big is the organization, and how much governance can it
  sustain?** A thirty-person startup cannot sustain the full six-layer
  SABSA Matrix or a formal ADM cycle, and trying to impose one
  wholesale usually produces documentation nobody maintains.

## Real-world blending patterns

In practice, most mature organizations don't run one framework in
isolation — they blend:

- **TOGAF as the outer process, SABSA as the inner content.** The
  enterprise architecture team runs ADM cycles for governance and
  cadence; the security architecture work inside Phases A through D
  is organized using SABSA's layers and traceability discipline,
  exactly as the Open Group/SABSA Institute joint guidance describes.
- **ZTMM as a technology-domain input, not a whole framework.**
  Rather than adopting CISA's model as a top-level architecture
  framework, organizations commonly use it narrowly — as the
  maturity-scoring method feeding Phase D and the Phase E/F work-package
  backlog, sitting *inside* whichever outer framework is already in
  use.
- **A lightweight SABSA subset for smaller organizations.** Many
  mid-size companies adopt only the Business Attributes Profile and
  the discipline of traceability — "can you point to the business
  reason for this control?" — without ever formally running the full
  six-layer matrix. That single habit captures most of SABSA's real
  value at a fraction of its overhead.

## Adapting rather than implementing by the book

The pattern across all of this is the same: **take the artifacts that
solve a real, present problem, and leave the rest.** A framework
followed rigidly, layer by layer or phase by phase, for an
organization that doesn't need that much structure yet, produces
paperwork that drifts out of date and gets ignored at exactly the
moment it matters — during an audit, an incident, or a board review.
A framework adapted to the organization's actual size, maturity, and
immediate driver produces artifacts people actually keep using.

That's also the honest answer to "which framework should I learn
best for my career": know all three well enough to recognize which
problem each one actually solves, because the real skill isn't
reciting SABSA's six layers or TOGAF's eight ADM phases — it's
correctly diagnosing which parts of which framework a specific,
real organization in front of you actually needs right now.

## Key terms

| Term | Meaning |
|---|---|
| Framework blending | Using more than one published framework together, each for the part of the problem it solves best, rather than adopting exactly one wholesale |
| Outer process / inner content | A common pattern: TOGAF's ADM governs cadence and governance, SABSA's layers and traceability fill in the security substance |
| Lightweight adoption | Taking only the highest-value artifacts of a framework (e.g. SABSA's Business Attributes Profile) rather than implementing it in full |
| Adapting vs. implementing by the book | Matching a framework's depth to the organization's actual size, maturity, and driver, instead of applying it uniformly regardless of fit |

## Check yourself

This closes Chapter 2. Before moving to Chapter 3's risk management
fundamentals, make sure you can explain, without looking: given a
mid-size company with no existing enterprise architecture practice,
facing its first SOC 2 audit, which elements of SABSA, TOGAF, and
ZTMM would you actually introduce first, and why?
