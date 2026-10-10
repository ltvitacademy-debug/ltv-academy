# Lesson 10 — Stating Assumptions Explicitly

**Chapter 2 · Working Ambiguous Requirements · Lesson 10 of 21**

## What you'll learn

- Why a stated assumption is treated as a strength by a review board, while a silent one is treated as a risk
- The four categories of assumption that come up in almost every real scenario
- How to write an assumptions section that reads as deliberate, not as a list of excuses
- How to apply this to a scenario from Chapter 1, turning silent guesses into stated assumptions

## A guess and an assumption look the same until you write them down

Lesson 9 taught you how to sort a prompt's details into explicit requirements, implied constraints, and decorative detail — but even a careful read leaves real gaps a prompt simply doesn't fill. Meridian Outfitters' scenario (Lesson 1) never says how large the combined customer database across the three regions actually is, or what budget exists for the Data Cloud licensing the design recommends. A candidate who designs anyway is making a guess either way; the only choice is whether that guess stays silent in their head or gets written down as a stated assumption the panel can see and challenge. A silent guess that turns out wrong looks like a mistake. A stated assumption that turns out wrong looks like a reasonable, documented judgment call — the same guess, with a completely different outcome, based entirely on whether it was written down.

## Four categories that come up almost every time

**Scale and volume assumptions** fill in numbers a scenario doesn't give — record counts, concurrent users, transaction volume — needed to choose between, say, a standard object and a large-data-volume pattern. **Budget and timeline assumptions** fill in cost and schedule constraints a scenario implies but doesn't state precisely, such as assuming a client has the budget for a Shield Platform Encryption add-on because the scenario already describes handling regulated PII. **Existing technology investment assumptions** fill in what's already in place beyond what's named — assuming a client has *some* identity provider in use today, even if the scenario doesn't name which one, because Lesson 4's Carrow Equipment scenario mentioned some dealers running their own identity systems without specifying all 1,200 dealers' setups. **Organizational risk-appetite assumptions** fill in how cautious or aggressive a client is likely to be about a trade-off — assuming Alder Trust Bank (Lesson 2) would rather accept a slower onboarding flow than relax any part of the two-approver segregation-of-duties rule, because a bank's regulatory posture makes that priority predictable even though the scenario never ranks the two explicitly.

## Writing an assumptions section that reads as deliberate

A weak assumptions section reads as a list of excuses for gaps in the design — vague, defensive, written to cover the architect rather than inform the panel. A strong one is short, specific, and states the consequence of being wrong: not just "we assume moderate transaction volume," but "we assume peak transaction volume stays under roughly ten thousand orders per hour during the holiday launch; if actual volume is materially higher, the event-driven inventory sync in this design would need additional queuing capacity before go-live." Naming the consequence is what separates a real, useful assumption from a throwaway sentence that sounds thorough but doesn't actually commit to anything a panel could evaluate.

## Assumptions invite questions — that's the point, not a risk to avoid

Writing an assumption down doesn't make it disappear from scrutiny; it invites the panel to ask about it directly, and that's exactly the trade a stated assumption is making. A panelist who asks "what if your volume assumption is wrong" about a *stated* assumption is giving the candidate a chance to show they already considered the consequence, because the assumptions section said so. A panelist who discovers the same gap in a design that never stated it is instead learning the candidate didn't think about it at all — the same question, landing completely differently depending on which it follows.

## Key terms

| Term | Meaning |
|---|---|
| Stated assumption | A documented judgment call filling a gap a scenario leaves open, written down for the panel to see and challenge |
| Scale/volume assumption | A filled-in number for records, users, or transaction volume a scenario doesn't state |
| Risk-appetite assumption | A judgment about how a client is likely to prioritize competing trade-offs, based on their described context |
| Consequence statement | The specific design impact if a stated assumption turns out to be wrong |

## Lab

Return to Lesson 5's Public Sector Case Management scenario. Write three stated assumptions — one scale/volume, one budget/timeline, and one risk-appetite — that a defensible design for that scenario would need to make. For each, write the one-sentence consequence of being wrong, in the same style as the example above.

## Check yourself

Can you explain, in one sentence, why a stated assumption and a silent guess carry different risk even when they're the exact same guess? Can you name the four assumption categories from memory?
