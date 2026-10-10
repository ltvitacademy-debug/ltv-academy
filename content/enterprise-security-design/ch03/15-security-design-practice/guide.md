# Lesson 15 — Security Design Practice

**Chapter 3 · Security Governance · Lesson 15 of 15**

## What you'll learn

- How to run this entire course's vocabulary forward, from a blank scenario, instead of backward from a diagnosis
- A structured method for producing a security design: boundaries first, then least privilege, then depth, then the governance wrapper
- What a complete answer actually needs to contain to be defensible in a real review board (Lesson 11)
- A full design exercise to practice the method yourself, as this course's closing Lab

## Designing forward is harder than diagnosing backward

Lesson 12's case study and Lesson 14's incident scenario both asked you to diagnose problems that were already placed in front of you — a useful skill, but a different one from designing a system from a blank scenario, where nothing is labeled as a gap yet because nothing exists yet. This closing lesson is about the forward direction: given a business requirement with no existing design, produce one, using this course's vocabulary deliberately rather than improvising.

## A repeatable method

1. **Name the boundaries first (Lesson 1).** Before deciding any specific control, list every point in the proposed system where trust changes: where does it cross the org edge, where does authorization get checked, where does a field-level decision need to be made, where does data leave the org entirely (an integration, an export, a third party).
2. **Apply least privilege at each boundary (Lesson 2).** For every role or integration identified, ask what the actual minimum access is — not what's convenient, not what a similar system elsewhere in the org happens to use.
3. **Add depth, deliberately (Lesson 3).** For each boundary's primary control, ask what the next independent layer is if that control fails. If the honest answer is "nothing," that's not a finished design yet.
4. **Run a threat pass (Lesson 5).** STRIDE the design, at least for anything crossing the org boundary or handling sensitive data, before calling the design done.
5. **Decide on encryption and monitoring explicitly (Lessons 6–8).** Don't default to "we'll encrypt everything" or "we'll encrypt nothing" — name the specific fields that need protection and why, and name what would actually detect a failure of this design if one happened.
6. **Wrap it in governance (Lessons 11, 13).** Define how this design gets reviewed before launch, and what documentation and evidence will exist afterward to prove it's operating as designed.
7. **Sanity-check against incident response (Lesson 14).** If this design fails, what would containment and eradication actually look like, and does the design make that possible (good logging, revocable credentials) or does it make a bad day worse (shared credentials with no way to isolate one compromised piece)?

## What a defensible answer actually contains

A design that would survive a real review board doesn't need to be exhaustive on every point, but it does need to show its reasoning on each one — a reviewer should be able to see *why* a choice was made, not just what the choice was. "We used Named Principal for this integration because it's a backend batch job with no individual user session to attribute" is defensible. "We used Named Principal because that's what we always use" is not — it's the same conclusion with none of the reasoning that would let a reviewer actually evaluate it, and it's exactly the kind of answer Lesson 11's review process exists to push back on.

## Key terms

| Term | Meaning |
|---|---|
| Forward design | Producing a complete security design from a blank requirement, as opposed to diagnosing an existing one |
| Defensible design | A design whose choices are accompanied by stated reasoning a reviewer can actually evaluate |

## Lab — closing design exercise

A professional services firm is launching a client-facing Experience Cloud portal where clients can view their own project status, upload documents, and message their assigned consultant. The portal connects to an internal `Project__c` object and a `Client_Document__c` object (which can contain sensitive financial documents), and a nightly integration syncs billing data from an external accounting system into a `Invoice__c` object that's also visible on the portal.

Using the seven-step method above, produce a full design: name the boundaries, assign least-privilege access for the client-portal users and the billing integration separately, identify at least one depth layer per boundary, run a STRIDE pass on the document upload feature specifically, decide what (if anything) should be encrypted and how a failure would be detected, describe the review and evidence plan, and describe what containment would look like if a client's portal credentials were compromised.

## Check yourself

Without looking back at the method, can you list the seven steps in order and explain, in one sentence each, what question each step answers? Having completed the closing Lab, can you point to at least one decision in your design where you can state the specific reasoning a reviewer would need to see, not just the decision itself?
