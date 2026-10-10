# Lesson 12 — Answering Reviewer Objections

**Chapter 3 · Presenting · Lesson 12 of 14**

## What you'll learn

- Four recurring categories of objection a review board raises, and what each one is actually testing
- Why "defending" a design and "being honest about its limits" aren't actually in tension
- Worked responses to real objections against three of Chapter 1's case studies
- How to recognize when an objection has actually found a real gap, versus when it hasn't

## Objections are a test of the design, not of you

It's easy to experience a pointed question from a review board as a challenge to fend off. It's more useful, and more accurate, to treat it as free testing: someone with fresh eyes is checking whether your design holds up under a question you may not have asked yourself. The goal of answering well isn't to "win" the exchange — it's to give the most accurate answer you can, including "you're right, that's a gap" when it's true. A design that survives honest scrutiny is more valuable than one that was merely defended successfully.

## Four recurring objection categories

**"Why not the simpler alternative?"** This tests whether Lesson 6's comparison was done honestly, or whether a convenient-looking option was dismissed without real analysis. The right answer names the simpler option's genuine advantage and then explains, with a specific criterion, why it loses anyway — not a dismissive "we looked at that and it doesn't work."

**"What happens when X fails?"** This tests Lesson 7's failure-mode coverage. The strongest possible answer states the failure category by name and the specific mechanism that handles it ("that's a timeout case — the UI falls back to the last-synced value with a visible timestamp"), because a vague "we have monitoring for that" answer signals the failure wasn't actually designed for, just hoped against.

**"How do you know this is secure?"** This tests Lesson 8's four security questions. A strong answer walks through authentication, authorization scope, data handling, and auditability specifically for the point being questioned, rather than reasserting that the integration "uses OAuth" and treating that as a complete answer — which Lesson 8 already established it isn't.

**"What if requirements change later?"** This tests whether Lesson 9's "Consequences" section was actually thought through, not just filled in as a formality. A strong answer names the specific future requirement that would force a redesign (for Meridian, "if catalog data ever needs to be live instead of nightly, the batch sync gets replaced with a callout") rather than claiming the design is infinitely flexible, which no real design is.

## Worked responses

**Harborline Capital, objection: "What if your subscriber is down for a day and events pile up?"** A strong answer: "Platform Events retain a limited replay window, so our subscriber uses a stored replay ID to resume exactly where it left off once it's back up — but if the outage outlasts that retention window, we'd lose events permanently, which is why we also run a daily reconciliation count against the ledger system to catch that specific case." This names the mechanism, the genuine limit, and the backstop — not just reassurance.

**Vantage Utilities, objection: "Couldn't the portal just call Salesforce directly with a shared token?"** A strong answer names that alternative honestly (it's simpler to build) and then states the specific reason it was rejected: a token usable from the browser is readable by anyone with developer tools open, which fails the authorization-scope question from Lesson 8 outright.

**Cascade Outfitters, objection: "Why not just poll every five minutes instead of using CDC?"** A strong answer: polling on an interval would catch most changes but has a specific, demonstrated gap — a record created and deleted between polls is invisible to it — which is exactly the failure this integration's consumer (an analytics team that needs completeness, not sub-second speed) can't tolerate even on an otherwise acceptable staleness budget.

## Recognizing a real gap versus a well-handled question

Not every objection should be deflected with a prepared answer. If a reviewer's question lands on something Lesson 10's self-review pass genuinely never covered, the honest response is to say so plainly and state what you'd need to go find out — which is a stronger answer than an improvised, under-informed one that happens to sound confident.

## Key terms

| Term | Meaning |
|---|---|
| Objection category | A recurring type of reviewer question that tests a specific part of the design (alternatives, failure modes, security, future-proofing) |
| Named mechanism | Citing the specific component or behavior that handles a concern, instead of a general reassurance |
| Honest gap admission | Acknowledging, when true, that an objection has found something the design genuinely doesn't yet handle |

## Lab

Write your own strong response, in the style of this lesson's worked examples, to the following objection against the Bellwood Apparel marketing-platform case study from Lesson 5: "What stops your source-system tag from itself getting lost or overwritten somewhere in the sync pipeline, recreating the exact update loop you built it to prevent?" Name which objection category this falls into, and be honest in your answer about whether this reveals a genuine unresolved gap or a risk the original design already accounted for.

## Check yourself

Can you list this lesson's four objection categories and explain which earlier lesson's tool each one is actually testing? Can you explain, in your own words, why admitting a real gap under questioning is a stronger move than talking around it?
