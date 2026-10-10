# Lesson 21 — Documentation and Presentation

**Chapter 4 · Analytics and Delivery · Lesson 21 of 25**

## What you'll learn

- The specific documentation artifacts this platform needs before anyone else can maintain it
- Architecture Decision Records (ADRs), and how to write one properly using this lesson's own example
- A data dictionary, and why it's a different document from the entity-relationship diagram in Lesson 3
- How this documentation sets up Chapter 5's demo and presentation

## Why documentation is its own deliverable, not an afterthought

A finished, working org that only you understand isn't actually finished from Priya's perspective — the Definition of Done from Lesson 1 explicitly lists documentation as a requirement, not a nice-to-have, because the real test of a platform build is whether a second developer (or Jules, extending it declaratively) could pick it up without you in the room. This lesson assembles the documentation artifacts that make that true.

## Architecture Decision Records

An **Architecture Decision Record (ADR)** is a short, standardized document capturing one specific design decision: what was decided, what alternatives were considered, and why the chosen option won. Lesson 2's Lab asked you to write an informal first one; this lesson's job is to do it properly, in a consistent format, for every significant decision made across this capstone:

```markdown
# ADR-004: Warranty Claim Submission via Queueable, Not a Direct Trigger Callout

## Status
Accepted

## Context
WarrantyClaimTrigger needs to notify the ApplianceMakers Warranty Network API
when a claim is submitted. Apex disallows synchronous HTTP callouts from
trigger context because the trigger runs inside the same transaction as its
triggering DML.

## Decision
Enqueue a Queueable job (WarrantyClaimSubmissionQueueable) from the trigger's
afterInsert handler instead of calling out directly.

## Alternatives considered
- Future method: rejected, because future methods only accept primitive
  parameters and can't carry the claim data cleanly.
- Platform Event + separate subscriber: rejected as unnecessary complexity
  for a same-org, same-transaction-adjacent need.

## Consequences
Submission is asynchronous — a claim's Manufacturer_Claim_Id__c is populated
moments after insert, not immediately. The UI must account for this (a
"Submitted, pending confirmation" status) rather than assuming it's
instant.
```

Every ADR you write for this capstone should follow this shape: Status, Context, Decision, Alternatives considered, Consequences. The "Alternatives considered" section is the part most documentation skips and the part that actually proves the decision was reasoned, not accidental — this capstone requires at least five ADRs, covering the Flow-vs-Apex call from Lesson 2, the Queueable-vs-future call above, the lookup-vs-master-detail call from Lesson 3, the OWD choices from Lesson 4, and the Named Credential/exception design from Lesson 15.

## The data dictionary

Lesson 3's entity-relationship diagram shows *how objects connect*; a **data dictionary** is a different artifact that lists, field by field, what every custom field on every custom object actually means, in plain language a non-developer can read:

| Object | Field | Type | Description |
|---|---|---|---|
| `Installation_Job__c` | `Status__c` | Picklist | Scheduled, En Route, In Progress, Completed, Needs Parts — drives the technician job board |
| `Warranty_Claim__c` | `Manufacturer_Claim_Id__c` | Text | ID returned by the manufacturer's API once a claim is successfully submitted; blank until then |
| `Service_Contract__c` | `Coverage_Limit__c` | Currency | Maximum dollar amount claimable under this contract; checked by `WarrantyClaimTriggerHandler` |

This is the document Dmitri's team actually reads when they're unsure what a field means — the ERD answers "what connects to what," the data dictionary answers "what does this specific field mean and why does it exist."

## Setting up Chapter 5

Chapter 5's demo and presentation (Lessons 23–24) draw directly on this lesson's artifacts: the ADRs are what let you answer a "why did you build it this way" question confidently instead of improvising, and the data dictionary is the reference you'll have open while walking through the data model live.

## Key terms

| Term | Meaning |
|---|---|
| Architecture Decision Record (ADR) | A standardized record of one design decision: context, decision, alternatives, consequences |
| Data dictionary | A field-by-field, plain-language description of every custom field's purpose |
| Entity-relationship diagram (ERD) | A diagram of how objects connect (built in Lesson 3) |

## Lab

Write the five ADRs listed above in the format shown, and build a complete data dictionary table covering every custom field on `Installation_Job__c`, `Warranty_Claim__c`, and `Service_Contract__c` from Lesson 3. Keep both documents alongside your Lesson 3 ERD — together they're the documentation package Chapter 5 presents from.

## Check yourself

- What's the difference between an ERD and a data dictionary, and why does this platform need both?
- Why does an ADR's "Alternatives considered" section matter as much as the decision itself?
- Name the five decisions this capstone requires an ADR for.
