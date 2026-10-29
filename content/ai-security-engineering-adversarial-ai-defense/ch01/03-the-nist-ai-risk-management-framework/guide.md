# Lesson 3 — The NIST AI Risk Management Framework

**Chapter 1 · AI and LLM Security Fundamentals · Lesson 3 of 4**

## What you'll learn

- What NIST's AI Risk Management Framework (AI RMF) is and why it
  exists alongside OWASP's LLM-specific list rather than competing
  with it
- The four core functions — Govern, Map, Measure, Manage — and what
  each one actually asks an organization to do
- Why AI RMF operates at the organizational and lifecycle level, not
  the single-vulnerability level
- How a security engineer uses this framework day to day, not just
  as a document to cite in an audit

## What the AI RMF is

The **NIST AI Risk Management Framework** (AI RMF 1.0) is a
voluntary framework published by the U.S. National Institute of
Standards and Technology to help organizations manage risks from AI
systems across their entire lifecycle — design, development,
deployment, and ongoing operation. Where OWASP's LLM Top 10 catalogs
*specific technical risks* you'd find in a single application, the
AI RMF addresses a different question: how does an organization
*govern, assess, and continuously manage* AI risk as a program,
across every AI system it builds or uses, not just one app at a
time? The two aren't competitors — a mature AI security practice
uses OWASP's list to understand what can go wrong in a given LLM
feature, and NIST's framework to structure how the organization
manages that risk at scale. NIST builds the AI RMF around four core
functions, each with its own practices.

## Govern

**Govern** is the foundation the other three functions sit on. It's
about establishing the policies, accountability structures, and
organizational culture needed to manage AI risk at all — who owns
AI risk decisions, what risk tolerance the organization has
accepted, what processes exist for reviewing an AI system before and
after it ships. Without Govern in place, Map, Measure, and Manage
end up being ad hoc, one-off efforts that don't generalize to the
next AI system the organization builds. In practice, Govern looks
like documented AI risk policies, a defined approval process before
an AI feature reaches production, and clear ownership of who signs
off on acceptable risk.

## Map

**Map** is about identifying context: what is this AI system for,
who does it affect, what could go wrong, and what are the
consequences if it does? This includes mapping the system's intended
use and reasonably foreseeable misuse, the data it depends on, and
the stakeholders who bear the impact if it fails — end users, the
organization, third parties. For a security engineer, Map is where
you'd catalog exactly which OWASP LLM Top 10 risks are realistically
in play for a given system: does it process untrusted input? Does it
have tool access that creates Excessive Agency exposure? Does it
train or fine-tune on sensitive data?

## Measure

**Measure** is where risks identified during Map get assessed with
actual metrics, testing, and evaluation — not just documented as a
concern. This includes red-teaming an LLM application for prompt
injection susceptibility, testing output-handling code paths for
injection risk, evaluating a model's tendency toward sensitive
information disclosure, and tracking those results over time as the
system and the threat landscape change. Measure is the function that
turns "we think this might be risky" into "here's what we tested,
here's what we found, and here's the evidence."

## Manage

**Manage** is where the organization actually acts on what Measure
found — prioritizing which risks to address first, deciding whether
to accept, mitigate, transfer, or avoid a given risk, and
implementing the controls that reduce it. This is where OWASP's
specific mitigations (input/output validation, least-privilege tool
access for agents, rate-limiting, human-in-the-loop approval for
high-impact actions) actually get deployed. Manage also includes
incident response planning for when a deployed AI system fails or is
exploited despite the controls in place, and ongoing monitoring once
it's in production.

## Using this day to day, not just citing it in an audit

The four functions aren't a one-time checklist — NIST describes them
as happening continuously and feeding back into each other: what you
learn in Measure should update your Map, and both should inform
Govern-level policy over time. A security engineer working on an AI
feature uses this framework the same way they'd use a secure SDLC:
Govern sets the ground rules before you start, Map scopes the actual
risk for this specific system, Measure is where you test it (often
using OWASP's categories as your test plan), and Manage is where
your mitigations and monitoring actually ship.

## Key terms

| Term | Meaning |
|---|---|
| NIST AI RMF | A voluntary NIST framework for managing AI risk across an organization and an AI system's full lifecycle |
| Govern | The AI RMF function establishing policy, accountability, and risk-tolerance decisions underneath the other three functions |
| Map | The AI RMF function that identifies an AI system's context, intended use, foreseeable misuse, and affected stakeholders |
| Measure | The AI RMF function that assesses identified risks with actual testing, metrics, and evaluation |
| Manage | The AI RMF function that prioritizes risks and implements, monitors, and responds to incidents involving the controls that address them |

## Check yourself

You're ready for Lesson 4 when you can explain, without looking, what
each of the four functions actually does, and describe how Map and
Measure would use the OWASP LLM Top 10 categories from Lesson 2 as
concrete inputs to their work.
