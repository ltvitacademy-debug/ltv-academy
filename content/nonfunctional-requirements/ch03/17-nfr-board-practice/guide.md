# Lesson 17 — NFR Board Practice

**Chapter 3 · Practice · Lesson 17 of 18**

## What you'll learn

- What an architecture review board actually tests when NFRs are on the agenda
- The difference between defending a decision and defending an opinion
- A practice format for rehearsing NFR defense before a real review board
- Common ways an NFR defense falls apart under board questioning, and how to avoid them

## What a review board is actually testing

An architecture review board — whether an internal governance committee or, for a Salesforce Certified Technical Architect candidate, the review-board format used in that certification's practical exam — isn't primarily testing whether a design is "good" in some abstract sense. It's testing whether the architect can **defend specific decisions against specific challenges**, including challenges aimed directly at the NFRs this course has covered: why this performance target, why this particular trade-off between two conflicting NFRs, why this compliance interpretation, and what happens if an assumption behind the design turns out to be wrong. A board that accepts "it felt like the right call" as an answer isn't doing its job, and an architect who can only offer that answer isn't ready for the review.

## Defending a decision vs. defending an opinion

A decision is defensible when it traces back to a stated NFR, a documented implication, and an explicit account of what was rejected and why — exactly the structure from Lesson 9's trace pattern. An opinion is a conclusion with nothing underneath it: "I thought async was the better approach" is an opinion; "the performance NFR required sub-2-second response during a stated 50,000-case spike, synchronous processing of the notification callout would have put that target at risk because [specific reason], so the callout was moved async, accepting [specific, named trade-off]" is a decision. A review board will probe exactly the gap between these two — asking "why" repeatedly until it finds either a real trace or an unsupported opinion.

## A practice format

Rehearsing this under real time pressure, out loud, is different from writing it down calmly in a lab exercise, which is exactly why this course builds the practice in as its own lesson. A useful rehearsal format:

1. **State the design decision** out loud, in one or two sentences, as if presenting it to the board for the first time.
2. **Have a practice partner ask "why" at least three times in a row**, each time picking the weakest-sounding part of the previous answer to push on — this mimics how a real board finds the edge of what's actually been thought through versus what's being improvised in the moment.
3. **Answer each "why" using the trace structure**: requirement, implication, decision, rejected alternative. If an answer can't be given in that structure, that's the gap to go fix before the real review, not during it.
4. **Introduce a changed assumption** ("what if the spike is actually 200,000 cases, not 50,000?") and defend whether the same decision still holds, or explain specifically what would change and why. A board frequently tests robustness this way — not because the original number was wrong, but to see whether the architect understands why the decision was made, rather than having simply memorized a number.

## Where NFR defenses commonly fall apart

A few patterns show up repeatedly when an NFR defense fails under board questioning: citing a number with no source ("it should handle high volume" with no actual figure behind it, the exact failure Lesson 2 and Lesson 8 warn against); defending a decision that was never actually tested, and admitting as much the moment the board asks for evidence (Lesson 10's "pass" without proof); treating a genuine conflict as if it had no trade-off at all, which a board will usually spot immediately because real NFR conflicts (Lesson 11) almost always involve some cost; and confusing what Salesforce the vendor guarantees with what the specific implementation actually delivers, especially around availability and compliance claims (Lessons 7 and 12), which is one of the fastest ways to lose credibility with a board that knows the difference.

## Key terms

| Term | Meaning |
|---|---|
| Architecture review board | A panel that tests whether an architect can defend specific design decisions under direct questioning |
| Defensible decision | A decision traceable to a stated requirement, its implication, and a named rejected alternative |
| Assumption stress-test | A board technique of changing a stated condition to see whether the architect's reasoning, not just a memorized number, actually holds up |

## Lab

Take the trade-off record you wrote in Lesson 11's lab (the audit-logging vs. response-time conflict). Run this lesson's four-step practice format on it, ideally out loud with another person: state the decision, have them ask "why" three times, answer in trace structure each time, then have them change the assumption (the response-time target tightens from 1.5 seconds to 0.8 seconds) and defend whether your original resolution still holds.

## Check yourself

Can you explain the structural difference between a defensible decision and an opinion, using this lesson's trace-based criteria? Can you name at least two specific ways an NFR defense commonly falls apart under board questioning, and explain why each one is a real gap rather than just bad luck?
