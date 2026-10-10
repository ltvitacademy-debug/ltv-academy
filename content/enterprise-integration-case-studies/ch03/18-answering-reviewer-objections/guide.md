# Lesson 18 — Answering Reviewer Objections

**Chapter 3 · Review and Defense · Lesson 18 of 20**

## What you'll learn

- The difference between defending a decision and discovering, live, that it was wrong
- Four common objection patterns a review board raises against integration designs, and how to answer each
- Why "we didn't consider that" is sometimes the right answer, if followed by real reasoning
- How to update a design on the spot without it looking like the original design was never thought through

## Objections are not attacks — they're the actual test

A CTA-style review board's objections aren't meant to catch a candidate out for sport; they're testing whether the candidate's reasoning holds up under pressure, the same pressure a real production incident or a skeptical stakeholder would apply later. The right posture isn't defensive — it's treating each objection as a legitimate question that deserves either a real answer grounded in the design's own tradeoffs, or an honest "that's a gap, here's how I'd close it."

## Objection 1: "Why not just point-to-point? It's simpler."

This objection targets Lesson 6's middleware-hub reasoning. A weak answer insists middleware is always better. A strong answer concedes the premise partially — point-to-point *is* simpler for a single connection — before pointing at the actual tradeoff: "point-to-point is the right call for exactly one integration; Doverfield has five and counting, and the maintenance cost of five independent bespoke connections, each one risking breaking the others on any endpoint change, is what the hub specifically addresses. For a company with only one integration, I'd agree point-to-point is the better choice."

## Objection 2: "What happens when data volume grows 10x?"

This targets whether the chosen pattern was sized for today's volume only. For Doverfield's data-warehouse case (Lessons 2, 11), the honest answer names the actual scaling levers already built in: PK Chunking handles larger Bulk API extracts, CDC's event-driven design doesn't inherently degrade with volume the way a full extract would, and the reconciliation job's cadence can be tuned independently of extraction volume. A design that has no answer to this question — where the only honest response is "it would probably fall over" — is a real gap, and saying so plainly, followed by naming the specific change needed (e.g., "we'd need to move this object from scheduled incremental extract to CDC"), is a far stronger answer than pretending the design already handles it.

## Objection 3: "Isn't this a single point of failure?"

This targets Doverfield's reliance on a middleware hub (Lesson 6) or a single IdP (Lesson 3) as a central dependency. The strong answer doesn't deny the dependency exists — it names the specific mitigation: the IdP design keeps a non-SSO administrative login path available precisely so an IdP outage doesn't lock every user out of Salesforce entirely (Lesson 3); a middleware hub outage is mitigated by the fact that Doverfield's highest-criticality flows (the ones from Lesson 15's matrix with the most severe failure risk) were deliberately kept on direct, simpler paths rather than all routed through the hub. Naming a real mitigation is a far stronger answer than arguing the single point of failure doesn't actually matter.

## Objection 4: "How do you know this actually works under failure, not just in the happy path?"

This targets whether the resilience patterns from Lesson 10 and Lesson 14 (retry with backoff, dead-letter queues, circuit breakers) were actually tested, or just designed. The strong answer describes what a test of the failure path would actually look like — deliberately taking the ERP endpoint offline in a sandbox and confirming the retry/backoff/dead-letter sequence behaves as designed, not just asserting that it would. If that testing hasn't actually happened yet, saying so honestly, and describing the test plan, beats claiming untested confidence.

## Key terms

| Term | Meaning |
|---|---|
| Legitimate objection | A reviewer question testing whether reasoning holds under pressure, not an attempt to catch the candidate out |
| Conceding partially | Acknowledging the valid part of an objection before pointing at the specific tradeoff that justifies the chosen design anyway |
| Honest gap admission | Stating plainly that a design doesn't yet handle something, followed by the specific change that would close the gap |

## Lab

A reviewer objects to Doverfield's customer-portal design (Lesson 4, 13): "Your sharing set approach assumes every customer's portal users are interchangeable — what happens the day a customer asks for internal visibility tiers?" Using this lesson's four-objection framework, write the strong answer: what does the design already have ready for exactly this case (hint: Lesson 13), and what would you say if a customer's exact need somehow fell outside even that answer?

## Check yourself

Can you name the four objection patterns from this lesson and, for each, state in one sentence what a weak answer sounds like versus a strong one? Can you explain why admitting a real gap, with a concrete fix named, is a stronger answer than defending a design that doesn't actually handle the objection?
