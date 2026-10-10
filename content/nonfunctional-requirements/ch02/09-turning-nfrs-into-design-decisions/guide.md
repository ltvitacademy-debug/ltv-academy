# Lesson 9 — Turning NFRs Into Design Decisions

**Chapter 2 · Applying Nonfunctional Requirements · Lesson 9 of 18**

## What you'll learn

- Why a well-written NFR is worthless if it never changes a design decision
- A repeatable pattern for tracing a specific NFR to a specific architectural choice
- Worked examples across data model, automation, and integration design
- How to document the trace from requirement to decision so it survives staff turnover

## A requirement that doesn't change anything isn't doing its job

It's possible to write a technically correct NFR — specific metric, numeric target, clear condition — and then design the system exactly as if it didn't exist. This happens constantly in real projects: the NFR document gets written for a governance checkpoint, gets approved, and then the actual build proceeds from habit and convenience rather than from the stated requirements. The test of whether an NFR elicitation and documentation effort was worth anything is simple: **can you point to a specific design decision and say which NFR caused it to be made differently than the default?** If the answer is no for most of your NFRs, the elicitation work didn't actually do anything.

## The trace pattern: requirement, implication, decision

A reliable way to connect an NFR to a real decision is to write out three things explicitly, every time:

1. **The requirement** — stated as it was in Chapter 1's format (metric, target, condition, or equivalent for non-performance categories).
2. **The implication** — what this requirement rules out or demands, in plain architectural terms.
3. **The decision** — the specific choice made because of the implication, including what was rejected and why.

This sounds mechanical, and it is — deliberately so, because the mechanical version is what survives being handed to a different architect eight months later, while "we just knew it had to be fast" does not.

## Worked example 1: data model

- **Requirement**: the Order Line Item object must support 15 million records by year three, with report filtering on Account remaining under the performance NFR's target throughout (from Lessons 2 and 4).
- **Implication**: a standard custom object with an unselective, frequently-changing filter set risks full table scans at that volume; the object needs an indexed, selective access pattern designed in from the start, and historical data beyond an active window is a candidate for archival rather than living in the hot object indefinitely.
- **Decision**: add a custom index on the filtered field combination used by the primary reports; implement a scheduled archival job that moves Order Line Items older than 24 months into a Big Object, keeping the actively-queried table smaller than the full historical volume; reject the option of leaving all historical data in the standard object and "optimizing later," because the NFR's year-three number makes that choice's cost predictable now.

## Worked example 2: automation design

- **Requirement**: Case creation from the support console must complete in under 2 seconds for 95% of transactions, including during a 50,000-case product-recall spike (from Lesson 2).
- **Implication**: any automation that does meaningful synchronous work on Case insert — callouts, heavy cross-object calculation, assignment logic that queries large related lists — competes for the smaller synchronous CPU budget and directly threatens this target, especially at spike volume.
- **Decision**: move case-assignment scoring and any external notification callout to an asynchronous path (a Queueable or Platform Event-triggered flow) rather than firing inline on the record-triggered Flow; reject putting the notification callout directly in the synchronous trigger, because a slow or unavailable external endpoint would directly violate the 2-second target for every user during the exact spike the NFR calls out.

## Worked example 3: integration design

- **Requirement**: the payment-confirmation integration must tolerate the sending system retrying the same confirmation without creating duplicate Order records (a reliability NFR from Lesson 5).
- **Implication**: the integration's write operation needs to be idempotent — safe to execute more than once with the same input, and producing the same end state either way.
- **Decision**: design the Apex that processes an inbound confirmation to upsert against an External ID field unique to each confirmation, rather than always inserting a new record; reject a design where the integration blindly inserts on every call and relies on a later cleanup job to find and merge duplicates, since that approach leaves duplicate data live (and possibly acted on by other automation) for however long the cleanup job takes to run.

## Documenting the trace

The three-part trace belongs wherever the organization keeps its architecture decisions — a design document, an architecture decision record, or equivalent — associated with the specific NFR it satisfies. This is what makes the connection auditable later: when someone questions why the archival job exists, or why the notification callout isn't inline, the answer is a specific NFR and a specific implication, not "that's just how it was built."

## Key terms

| Term | Meaning |
|---|---|
| Trace (requirement to decision) | The explicit three-part link from a stated NFR, through its architectural implication, to the specific design decision it caused |
| Architecture decision record (ADR) | A documented record of a specific design decision, its context, and the reasoning behind it |
| Default design | What a team would build without deliberately considering a specific NFR — the baseline a real NFR should visibly change |

## Lab

Pick one NFR you wrote in this chapter's earlier labs (from Lesson 2, 4, or 5). Write its full three-part trace — requirement, implication, decision — including at least one design option you explicitly rejected and the reason you rejected it. If you can't identify a rejected alternative, that's a signal the NFR may not have actually changed anything yet; revise the decision until it does.

## Check yourself

Can you explain the test this lesson gives for whether an NFR elicitation effort actually accomplished anything? Can you walk through the three-part trace pattern (requirement, implication, decision) using an example of your own, not one from this lesson?
