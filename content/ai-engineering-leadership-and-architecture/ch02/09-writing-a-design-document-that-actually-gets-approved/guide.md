# Writing a Design Document That Actually Gets Approved

An ADR (Lesson 6) documents a decision after it's made. A design document is the artifact that gets a significant decision *made* in the first place — circulated before building starts, read by the people whose buy-in actually matters, and either approved, sent back for revision, or rejected. This lesson covers the structure and the specific habits that separate a design doc that gets a clear, timely decision from one that stalls in review for weeks with no one quite willing to say yes or no.

## What you'll learn

- The structure of a design document that actually drives a decision, not just describes one
- The single most common reason design docs stall in review
- How to pre-empt the three objections every reviewer is implicitly checking for
- Why a design doc's length is usually a sign of a problem, not thoroughness

## The structure that drives a decision

```markdown
# Design Doc: Multi-Region Failover for the Support Assistant

## Problem
Our support assistant currently runs in a single region. A region-level
outage would mean total downtime for all customers, for an unknown
duration. We need a design that keeps the assistant available if any
one region fails.

## Goals / Non-Goals
Goals: survive a full region outage with under 1 minute of downtime.
Non-Goals: this design does NOT address model-provider-level outages
(see ADR-019) or multi-cloud redundancy, which is out of scope for this
quarter.

## Proposed Design
[Diagram + description of the active-active two-region architecture]

## Alternatives Considered
- Active-passive failover: cheaper, but introduces a slower failover
  (~5 minutes) and an untested failover path -- rejected for this use case.
- Single region with faster recovery tooling: doesn't meet the under-
  1-minute goal under a full region outage.

## Risks & Open Questions
- Shared dependency on a single model API account could undermine the
  independence assumption (see Chapter 1, Lesson 4) -- mitigation:
  negotiate a second provider account, tracked as a follow-up.
- Cost impact: roughly 1.8x current infrastructure spend for this
  component. Needs explicit sign-off from finance given the budget
  threshold.

## Rollout Plan
Phase 1 (2 weeks): stand up the second region, no live traffic.
Phase 2 (1 week): shift 10% of traffic, monitor.
Phase 3 (1 week): full active-active cutover.
```

Notice the **Non-Goals** section — naming what this design deliberately does *not* solve is as important as naming what it does, because the single fastest way for a design review to stall is reviewers debating a problem the document never claimed to address.

## The single most common reason design docs stall

A design doc that presents only one option, with no visible alternatives considered, forces reviewers into an all-or-nothing choice: approve this exact plan, or reject it and start over. Reviewers who have real but partial objections — "I like this but worry about X" — have nowhere to put that feedback except a full rejection, which most people are reluctant to do, so the document just sits in limbo instead of getting a clean decision either way. Including real alternatives (as the example above does) gives reviewers a path to say "I prefer the proposed design over the alternatives, but let's address this one risk" — a decision, not a stall.

## Three objections every reviewer is implicitly checking for

1. **"What does this cost, and who's actually paying for it?"** — a design doc that's silent on cost forces this question to be asked out loud in review, turning a smooth approval into a surprise negotiation.
2. **"What happens when this breaks?"** — a Risks & Open Questions section that honestly names real risks (not a token "risks: none") signals the author has actually thought past the happy path, which builds real reviewer confidence.
3. **"What did you NOT consider, and why?"** — Alternatives Considered answers this before anyone has to ask it in the room.

Pre-empting these three in the document itself is what turns a review meeting into a confirmation of a decision the document already made the case for, rather than an interrogation starting from zero.

## Length is usually a symptom, not a virtue

A 15-page design doc is rarely more thorough than a 3-page one — it's usually a sign the author hasn't yet figured out what the actual decision is, and is describing everything they know instead of making the specific case for one proposal. The goal of a design doc is a clear decision, reached efficiently; padding it with exhaustive detail a reviewer doesn't need just makes the actual decision harder to find.

## Key terms

| Term | Meaning |
|---|---|
| Design document | A document circulated before building starts, intended to drive a go/no-go decision from its readers |
| Non-Goals | An explicit statement of what a design deliberately does not attempt to solve |

## Check yourself

Why does a design doc presenting only one option, with no alternatives section, often stall in review longer than one that presents several options?
