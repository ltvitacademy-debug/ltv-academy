# Lesson 5 — Responding to Technical Objections

**Chapter 1 · The Review Board · Lesson 5 of 14**

## What you'll learn

- A four-step pattern for responding to any technical objection: acknowledge, clarify, answer, check
- Why answering the objection actually asked matters more than answering the one you prepared for
- How to handle an objection that's based on a misunderstanding of your design, without sounding condescending
- The difference between a scope-creep objection and a genuine design flaw, and why mishandling that distinction costs you either way
- How Salesforce's own CTA review board explicitly expects candidates to defend *and revise* a solution under objection, not just defend it unchanged

## A repeatable pattern for objections

An "objection" in a review board context is any pushback on your design — a raised concern, a pointed question, a direct "I don't think that works." Treating every objection the same way, with a consistent pattern, keeps you from either caving reflexively or getting defensive reflexively. A pattern that holds up:

1. **Acknowledge** — confirm you heard the actual concern, briefly, without yet agreeing or disagreeing.
2. **Clarify** — if there's any ambiguity in what's being objected to, ask a short clarifying question before answering a guess.
3. **Answer** — respond to the specific concern raised, using the requirement-tracing and tradeoff-naming skills from Lesson 4.
4. **Check** — confirm the answer actually landed ("does that address the concern, or is there a specific piece still unresolved?") rather than assuming it did and moving on.

Skipping the "clarify" step is the most common mistake: answering a guessed version of the objection, rather than the one actually raised, wastes time and can read as not having listened.

## Answer the objection actually asked

A natural, costly impulse under pressure is to answer with a prepared response that's adjacent to the real objection but not quite it — because the prepared answer feels safer than reasoning live. Boards notice this quickly: an answer that doesn't actually address the specific concern raised reads as either not having understood the objection or deliberately dodging it, and either read is worse than a shorter, more exact answer. If you're not sure you understood the objection correctly, the clarify step exists precisely so you don't have to guess.

## When the objection is based on a misunderstanding

Sometimes a reviewer's objection rests on a misreading of what your design actually does — they object to something you didn't actually propose. Correcting this well means being precise about what you actually said, without a tone that implies the reviewer wasn't paying attention. "To clarify — the design routes that through the integration layer, not directly, which changes how that failure case plays out" corrects the record without a hint of correction-as-rebuke. Getting defensive or visibly frustrated when this happens — even when you're completely right that it's a misunderstanding — reads worse to a board than the misunderstanding itself would have.

## Scope creep versus a genuine flaw

Some objections aren't really about a flaw in your design — they're a reviewer pushing your design to handle a scenario that was explicitly out of scope for the stated requirements. The right response isn't to pretend the scenario doesn't matter; it's to name that it's out of the stated scope, state briefly how the design *would* need to change to handle it if it were in scope, and move on without over-investing in a hypothetical the actual requirements didn't ask for. Treating every out-of-scope question as if it were a flaw in the in-scope design wastes your limited time defending something you were never asked to solve. Conversely, dismissing a real, in-scope gap as "out of scope" when it isn't is its own serious mistake — the distinction matters, and getting it wrong in either direction costs credibility.

## The CTA board's explicit expectation: defend, then revise

Training material on Salesforce's CTA review board (see Lesson 1's sourcing) consistently describes the Q&A phase as including not just defending your original solution, but revising it live when a judge's objection genuinely exposes something your design should handle differently. This is a meaningfully different skill than pure defense: it means treating a sharp objection as new information that might actually change your answer, not as something to be deflected at all costs. A candidate who revises a design cleanly in response to a well-founded objection is demonstrating exactly the real-world architectural judgment the board exists to test — holding a position you can no longer actually defend, purely to avoid looking like you changed your mind, is the weaker move.

## Key terms

| Term | Meaning |
|---|---|
| Acknowledge-clarify-answer-check | A repeatable four-step pattern for responding to any technical objection raised in a review |
| Scope-creep objection | A challenge pushing a design to handle a scenario genuinely outside the stated requirements, as distinct from a flaw in the in-scope design |
| Defend-and-revise | The expectation, notably in Salesforce's CTA review board, that a candidate may need to genuinely change their solution in response to a well-founded objection, not just defend it unchanged |

## Lab

Write three objections a sharp reviewer might raise against the retailer order-management design from earlier labs: one based on a genuine design gap, one based on a misunderstanding of what the design actually does, and one that's really an out-of-scope scenario disguised as a flaw. For each, draft your acknowledge-clarify-answer-check response, and for the genuine-gap one specifically, write what you would actually change about the design in response rather than just defending it unchanged.

## Check yourself

Can you walk through the acknowledge-clarify-answer-check pattern from memory and explain why skipping "clarify" is the most common mistake? Can you describe how to correct a reviewer's misunderstanding of your design without sounding condescending? Can you explain why the CTA review board's "defend and revise" expectation is a meaningfully different skill from pure defense, and give an example of when revising is the stronger move than holding your ground?
