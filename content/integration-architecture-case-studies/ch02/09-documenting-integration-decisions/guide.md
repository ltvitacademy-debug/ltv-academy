# Lesson 9 — Documenting Integration Decisions

**Chapter 2 · Reviewing Designs · Lesson 9 of 14**

## What you'll learn

- Why a design that only exists in someone's head isn't actually reviewable
- The standard sections of an Architecture Decision Record (ADR) and what each one is for
- How to write the "alternatives considered" section honestly instead of as a formality
- How to turn Lessons 1, 6, 7, and 8's reasoning into a single document a reviewer can actually use

## Why writing it down is part of the architecture, not paperwork after it

Every case study in this chapter so far has lived as reasoning in prose — a scenario, a tradeoff, a decision. That's how an architect thinks through a problem, but it's not how a review board evaluates one. A reviewer who wasn't in the room for all that thinking needs a document that carries the decision and its reasoning on its own, without requiring the architect to be present to explain it verbally. If the design only exists as something you can explain out loud, it isn't actually reviewable yet — it's still in your head.

The standard tool for this is the **Architecture Decision Record (ADR)**: a short, structured document capturing one specific decision, the context that produced it, and the reasoning behind it, written at the time the decision is made rather than reconstructed later from memory.

## The standard sections, applied to Meridian Fixtures

**Title and status.** A short, specific name ("Integration pattern for ERP catalog, price, inventory, and credit-hold data") and a status (proposed, accepted, superseded). Vague titles like "ERP integration" make the ADR hard to find later among several related decisions.

**Context.** What problem is being solved, stated the way Lesson 1 stated it: reps manually checking an ERP report before quoting, with occasional stale-data errors. Context should describe the business problem and relevant constraints, not jump straight to the solution.

**Decision.** The actual choice — Lesson 1's hybrid design — stated plainly: a real-time callout for inventory and credit hold, a scheduled batch sync for catalog and price, using a Named Credential for the callout's authentication.

**Alternatives considered.** This is the section architects most often shortchange, and it's one of the most important. It should name Design A from Lesson 6 (making every field a real-time callout) and state honestly why it was rejected — not dismissed, rejected with reasons: Design A's latency and blast-radius cost don't pay off for fields that barely change. An ADR with no real alternatives listed, or with alternatives that are obviously strawmen, reads as a decision that was never actually tested against anything.

**Consequences.** What this decision makes easier and what it makes harder, going forward. Here: the batch-synced fields are slightly more complex to monitor (two patterns instead of one, as named honestly in Lesson 6), and if a future requirement needs catalog data to be more current than nightly, this decision will need to be revisited rather than quietly worked around.

**Failure handling and security notes.** A pointer to Lesson 7's failure-mode answers (the timeout fallback showing a last-synced value) and Lesson 8's security scoping (least-privilege access for the integration user), so the reviewer doesn't have to take those on faith.

## Writing "alternatives considered" honestly

The test for whether an ADR's alternatives section is doing its job: could someone who disagrees with the final decision read it and feel like their position was represented fairly, even though they lost the argument? An alternatives section written to make the chosen design look obviously correct by comparison, rather than to represent the real tradeoff, is a tell that the decision wasn't actually tested against serious competition — and a reviewer who's seen enough ADRs will recognize that pattern immediately.

## Key terms

| Term | Meaning |
|---|---|
| Architecture Decision Record (ADR) | A structured document capturing one decision, its context, and its reasoning, written at decision time |
| Context section | The business problem and constraints that produced the decision, written before the solution |
| Alternatives considered | The honestly-represented options that were evaluated and rejected, with reasons |
| Consequences | What a decision makes easier or harder going forward, including what would trigger revisiting it |

## Lab

Write a full ADR for the Harborline Capital financial-system integration from Lesson 2, using this lesson's six sections. Pull the context from Lesson 2's scenario, the decision from its event-driven idempotent design, at least one honestly-stated alternative (consider: Salesforce polling the ledger system on a schedule instead), and consequences that name at least one real tradeoff the chosen design accepts.

## Check yourself

Can you list the six sections of an ADR from memory and explain what each one is responsible for? Can you explain the test this lesson gives for whether an "alternatives considered" section was written honestly, rather than as a formality?
