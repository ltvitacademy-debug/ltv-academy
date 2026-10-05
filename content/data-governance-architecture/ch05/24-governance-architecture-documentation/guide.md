# Lesson 24 — Governance Architecture Documentation

**Chapter 5 · Governance Strategy · Lesson 24 of 30**

## What you'll learn

- Why a governance architecture that only lives in one person's head or one static slide deck doesn't survive contact with reality
- The core documentation set a governance architecture program actually needs
- The difference between living documentation and a one-time deliverable, and why the distinction matters more than the template
- Basic versioning discipline so documentation stays trustworthy as decisions change

## Why documentation is part of the architecture, not an afterthought

An architecture that exists only as a diagram from a kickoff meeting two years ago isn't really an architecture anymore — it's folklore. People leave, priorities shift, and the reasons behind a decision get forgotten faster than the decision itself. Documentation is what lets a governance architecture survive turnover: a new architect, a new CDO, or a new review board member should be able to read it and understand not just what was decided, but why.

This is a known weak point across enterprise architecture practice generally — most established approaches to enterprise architecture (including TOGAF's) treat a maintained **architecture repository** as a core deliverable precisely because the alternative, tribal knowledge, doesn't scale past the people who were in the room.

## The core documentation set

A governance architecture program's documentation generally needs to cover:

- **Principles catalog** — the architecture principles from Lesson 2, written down with their rationale, not just a list of nice-sounding statements.
- **Capability map** — the governance capabilities map from Lesson 4, showing what exists, what's partial, and what's missing.
- **Reference architecture diagrams** — the target-state diagrams from Lesson 3, kept current as the operating model and platform choices evolve.
- **Decision records** — a running log of significant architecture decisions and why they were made, which Lesson 25 covers in depth.
- **Standards and policy references** — pointers to the actual standards and policies from Chapter 4, not duplicated copies that drift out of sync with the source.

## Living documentation, not a one-time deliverable

The single biggest failure mode isn't a missing document — it's a document that was accurate the day it was written and has been wrong ever since. Treat architecture documentation as living: owned by a named person or team, reviewed on a cadence (often tied to the review board from Lesson 26), and updated as part of making a decision, not as a cleanup task someone gets to eventually.

## Basic versioning discipline

Even lightweight documentation needs enough versioning that someone can answer "what did we believe six months ago, and when did that change?" At minimum: a visible last-updated date, a short change note on substantive updates, and a stable location people actually know to check — a wiki page or shared repository that outlives whoever happens to be the architect today, not a file buried in one person's inbox.

## Key terms

| Term | Meaning |
|---|---|
| Architecture repository | A maintained, central location holding the architecture's principles, diagrams, and decisions |
| Living documentation | Documentation treated as continuously maintained, not a one-time deliverable |
| Single source of truth | One authoritative, current copy of a document rather than several drifting copies |
| Versioning discipline | Minimum practices (last-updated date, change notes, stable location) that keep documentation trustworthy over time |

## Lab

Pick one governance decision from earlier in this course (an operating model choice, a platform choice, a policy) and draft a one-paragraph documentation entry for it: what was decided, when, by whom, and the one or two reasons behind it. That's the shape of what belongs in an architecture repository.

## Check yourself

Can you list the five items in the core governance architecture documentation set from memory, and explain the difference between a document that's accurate once and one that's actually living?
