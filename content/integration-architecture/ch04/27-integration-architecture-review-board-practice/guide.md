# Lesson 27 — Integration Architecture Review Board Practice

**Chapter 4 · Applying Integration Architecture · Lesson 27 of 28**

## What you'll learn

- What an architecture review board is, and how it differs from the one-person checklist review in Lesson 21
- The format Salesforce's own Certified Technical Architect (CTA) review board uses, at a conceptual level, and why it's structured the way it is
- How to defend an integration design decision under structured questioning, not just how to make the decision
- A practice script: a sample integration design and the kind of probing questions a review board would actually ask about it

## From a solo checklist to a panel

Lesson 21 taught a checklist one architect can run alone against a proposed design. A **review board** formalizes the same spirit — catching design problems before they ship — as a structured, multi-person process: a panel of experienced architects questions the design's author directly, out loud, in real time, specifically probing the reasoning behind each major decision rather than just reading a document. The shift from solo checklist to live panel matters because a document can hide a weak justification behind confident-sounding prose, while a live, structured question ("why did you choose synchronous here instead of async?") forces the author to actually articulate the reasoning in the moment — and a reasoning gap that would have been easy to paper over in writing becomes immediately visible under direct questioning.

## How Salesforce's own CTA review board is structured, conceptually

Salesforce's Certified Technical Architect credential — the top of the architect-track certification ladder — includes a review board as its capstone assessment: a candidate presents a solution architecture for a complex, multi-faceted business scenario to a panel of experienced reviewers, then faces direct questioning on the design's trade-offs, risks, and alternatives considered. The reviewers aren't looking for one single "correct" architecture — multiple reasonable designs can pass — they're evaluating whether the candidate can justify their specific choices with sound reasoning, correctly identify the trade-offs their design accepts, and respond credibly when a reviewer pushes on a weak point rather than getting defensive or conceding ground on something that was actually well-reasoned. This course's Lesson 21 checklist and Lesson 11 four-question framework are directly the kind of reasoning a CTA-style review expects a candidate to be able to produce on demand, not just apply privately while designing in isolation.

## Defending a decision under questioning

The skill of defending a design is distinct from the skill of making a good decision in the first place, and it's worth practicing separately. A strong defense states the decision, states the specific facts from the scenario that drove it (echoing Lesson 26's signal-extraction skill), states the trade-off being accepted and why it's acceptable given those facts, and — critically — names at least one alternative that was considered and explains concretely why it was rejected. A weak defense restates the decision without the reasoning behind it ("I chose async because it's more scalable" repeated louder when pressed), or abandons a genuinely sound decision the moment a reviewer pushes back, signaling that the original choice wasn't actually reasoned through, just assumed.

## A practice script

Imagine presenting Lesson 24's Flow 1 (order creation sent asynchronously to the WMS, with an idempotency key). A reviewer asks: "Why not just make this synchronous — wouldn't that guarantee the WMS has the order before the rep's screen even updates?" A strong defense: "The scenario doesn't actually require that guarantee — the WMS needs the order within minutes, not milliseconds, and making this synchronous would couple the Order-save transaction to the WMS's uptime for no business benefit, exactly the availability-coupling cost from Lesson 6. I'm accepting a short delay in exchange for not blocking order creation if the WMS has a brief outage — and the idempotency key means a retry after an ambiguous failure can't cause a duplicate fulfillment, so the asynchronous design doesn't trade away safety to get that decoupling." A follow-up: "What alternative did you consider and reject?" "I considered a synchronous callout with a short timeout and a manual fallback if it failed, but rejected it because it still leaves the rep blocked waiting on a system that doesn't need to be in the critical path for order creation to succeed."

## Key terms

| Term | Meaning |
|---|---|
| Review board | A structured, multi-person process where a panel questions a design's author directly about decisions and trade-offs |
| Certified Technical Architect (CTA) | Salesforce's top architect-track credential, whose capstone assessment is a live review board |

## Lab

Using Lesson 25's Customer 360 case study, prepare a spoken (or written, if practicing alone) defense of the decision to virtualize product-usage telemetry rather than replicate it into Salesforce. Follow this lesson's defense structure: state the decision, state the specific facts that drove it, state the trade-off being accepted and why it's acceptable, and name one alternative you considered and rejected, with your reasoning for rejecting it.

## Check yourself

Can you explain the difference between a solo checklist review (Lesson 21) and a review board, and why the live, multi-person format surfaces reasoning gaps a written checklist might not? Can you state the four-part structure of a strong defense from this lesson, and give an example of what a weak defense sounds like by contrast?
