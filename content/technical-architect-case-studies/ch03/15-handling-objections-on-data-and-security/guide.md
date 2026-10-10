# Lesson 15 — Handling Objections on Data and Security

**Chapter 3 · Presenting and Defending · Lesson 15 of 21**

## What you'll learn

- The recurring shape of panel objections about data architecture and security decisions
- How to respond to an encryption-scheme challenge without contradicting an earlier design choice
- How to respond to a sharing-model challenge that probes a boundary case the original presentation didn't cover
- How to apply model answers to two objections drawn from earlier case studies in this course

## Objections in this domain follow a small number of patterns

Across many real review sessions, data and security objections tend to cluster into a few recognizable shapes: "why this encryption/protection level and not a stronger or weaker one," "what happens at this specific boundary your sharing model didn't explicitly cover," and "doesn't this design create a single point of failure or a single person with too much access." Recognizing the shape of the objection in the moment — rather than hearing it as an unfamiliar, unpredictable challenge — makes it much easier to respond with the reasoning you already have, instead of improvising from scratch.

## Objection pattern one: "why this encryption level, not stronger or weaker"

Alder Trust Bank's design (Lesson 2) used non-deterministic Shield encryption for SSNs and deterministic encryption for account balances the compliance team needed to filter on. A panelist pushing on this might ask: "if non-deterministic encryption is stronger, why not use it for the balance field too?" The model answer restates the specific trade-off already reasoned through, not a new justification invented on the spot: "non-deterministic encryption would block the exact-match filtering the compliance team's own reporting depends on, so the choice here isn't encryption-strength-at-all-costs, it's matching each field's protection to how that specific field actually needs to be used operationally." This answer works because it was already the real reasoning behind the original design — Lesson 2's reasoning, not an answer manufactured for the objection.

## Objection pattern two: a boundary case the presentation didn't explicitly cover

Fenwick State University's design (Lesson 7) covered the student-to-advisor and student-to-guardian sharing boundaries clearly, but a sharp panelist might ask: "what about a student who is also employed part-time by the university as a teaching assistant — does their employee record see their own student advising notes?" This is a legitimate boundary case the original presentation didn't name, and the honest answer treats it the way Lesson 13 recommended handling rejection-by-omission: acknowledge it's a real edge case, reason through it live using the design's existing principles rather than inventing a new rule, and land on an answer consistent with what's already been presented — "the same legitimate-educational-interest principle applies here: an employee role doesn't, on its own, grant access to that same person's own student records, so this needs an explicit exception in the sharing model recognizing that one person can hold two personas with access that doesn't automatically merge." Reasoning from existing principles live is a stronger response than either bluffing a prepared answer or saying "the design doesn't cover that," which leaves the gap unresolved.

## Objection pattern three: single point of failure or excessive concentrated access

Brightwell Health's step-up authentication design (Lesson 3) might draw: "what if the step-up authentication provider itself goes down — does that lock every patient out of lab results entirely?" This objection is really asking whether a security control has created a new availability risk by concentrating a dependency in one place. A strong answer doesn't defend the control as flawless; it acknowledges the real trade-off (a dependency now exists on the step-up provider's availability) and states what mitigates it (a documented fallback procedure, or an acceptable, bounded degradation such as a short lockout window rather than an indefinite one) — which is the same "name the risk, then name the proportionate response" pattern from Lesson 11, applied live under questioning instead of in writing beforehand.

## The common thread: reasoning survives, scripted answers don't

None of these model answers work because they were memorized word-for-word in advance — they work because the underlying reasoning (the specific trade-off, the existing design principle, the proportionate risk response) was already built into the original design from Lessons 1 through 7, and the response just applies that same reasoning to a new angle. A candidate who only memorized a script for "why did you choose Shield encryption" will be caught flat when the question comes from a different angle than expected; a candidate who understands why the original choice was made can answer any angle on it.

## Key terms

| Term | Meaning |
|---|---|
| Objection pattern | A recurring shape a panel's challenge tends to take, recognizable across different scenarios |
| Boundary case | A scenario detail or edge case the original presentation didn't explicitly address |
| Concentrated dependency | A design risk created when a security control introduces a new single point of failure |
| Reasoning transfer | Applying a design's existing underlying logic to a new question, rather than inventing a new justification on the spot |

## Lab

Write a model answer, in the style shown above, to this objection about Lesson 5's Public Sector Case Management design: "Your cross-program consent gate requires an affirmative consent record before visibility crosses programs — but what if a citizen is unconscious or otherwise unable to give that consent during a genuine emergency that spans two programs?" Reason from the design's existing principles rather than inventing an unrelated new rule.

## Check yourself

Can you name the three objection patterns this lesson describes? Can you explain why a memorized script fails against a question asked from an unexpected angle, while reasoning from the original design principle doesn't?
