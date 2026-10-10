# Lesson 8 — Enterprise Integration Wrap-Up

**Chapter 1 · Enterprise Integration Case Studies · Lesson 8 of 20**

## What you'll learn

- How to pull Lessons 1-7's five case studies and one failure review into one reusable decision framework
- The four questions worth asking before designing any new Salesforce integration
- Why "it worked for Doverfield's ERP" is not, by itself, a justification for reusing a pattern elsewhere
- What Chapter 2 is about to do differently with the same five case studies

## What Doverfield's landscape actually taught

Chapter 1 walked through five separate integrations — ERP, data warehouse, identity provider, customer portal, external carrier API — each solving a different problem with a different pattern, then stepped back to look at them as one landscape, then reviewed three real failures that came out of that landscape six months later. None of these lessons were really about Doverfield specifically. Doverfield is a stand-in; the patterns and failure modes are the actual content, and they generalize to any Salesforce org integrating with the same categories of outside system.

## A four-question framework

Stripped of Doverfield's specifics, the recurring decision points across all five case studies reduce to four questions, asked in roughly this order for any new integration:

1. **Who owns this data?** Lesson 1's system-of-record matrix, decided per field or domain, not per object — before anything else gets designed.
2. **How fresh does it need to be, and does that freshness requirement justify the complexity it costs?** Lesson 2's full-extract/incremental/CDC spectrum, and Lesson 1's batch/event-driven/request-reply spectrum, are both answers to this same underlying question applied to different directions of data flow.
3. **What's the blast radius if this integration is slow or down?** Lesson 5's callout-in-a-trigger failure and Lesson 7's ERP-outage incident are both, underneath, answers to this question that got asked too late — after the design already coupled a critical user action to an external system's availability.
4. **Who is allowed to see or change this data, and through what mechanism?** Lessons 3 and 4's identity and sharing-set patterns, which matter just as much for machine-to-machine integration users as for human ones.

## Why a working pattern doesn't automatically transfer

A real temptation, once a pattern works, is to reuse it everywhere without re-asking these four questions for the new case. Doverfield's event-driven order-creation pattern (Lesson 1) worked well because order creation can tolerate being a few seconds delayed — but that same event-driven, slightly-delayed pattern would be the wrong choice for the live shipping-rate lookup in Lesson 5, where the rep is sitting at the screen waiting for an answer right now. The pattern isn't "good" or "bad" in the abstract; it's a fit for a specific combination of freshness requirement, blast-radius tolerance, and ownership question. Re-running the four-question framework for each new integration, rather than copying the last one's answer, is what keeps a landscape coherent instead of accumulating mismatched patterns the way Doverfield's original point-to-point sprawl did.

## Where Chapter 2 goes next

Chapter 1 answered these four questions once, broadly, for five different integration types. Chapter 2 goes back to two of those five pairings — CRM+ERP and the others — and goes deep on specific mechanics this chapter only had room to introduce: detailed data-ownership and sync-conflict design, failure handling and reconciliation, extraction mechanics at real volume, federation design details, portal sharing at scale, and callout resilience patterns. Chapter 1 built the vocabulary and the framework; Chapter 2 uses both to go further into the parts of each case study that a real architecture review board would actually probe.

## Key terms

| Term | Meaning |
|---|---|
| Decision framework | A repeatable set of questions applied to a new design, rather than a single memorized answer |
| Blast radius | The scope of impact if a given integration is slow, down, or wrong |
| Pattern fit | Whether a specific pattern matches a specific combination of requirements, rather than being universally good or bad |

## Lab

Doverfield is evaluating a brand-new, sixth integration: a legal-compliance system that needs to know, within one business day, whenever a customer's contract status changes to "terminated." Run this requirement through the four-question framework from this lesson and produce a one-paragraph recommendation: which data-ownership answer, which freshness/pattern choice, which blast-radius consideration, and which access-control approach fits this specific requirement — justified by the requirement's own characteristics, not by copying Lesson 1's ERP answer by default.

## Check yourself

Can you list the four questions from this lesson's framework, from memory, without looking back? Can you explain, using the shipping-rate-lookup vs. order-creation example, why the same pattern can be right for one integration and wrong for another even within the same company's landscape?
