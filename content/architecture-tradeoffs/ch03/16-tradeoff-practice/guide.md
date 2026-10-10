# Lesson 16 — Tradeoff Practice

**Chapter 3 · Applying Tradeoffs · Lesson 16 of 20**

## What you'll learn

- How to run a tradeoff decision end-to-end, from scenario to documented, executive-ready recommendation
- A repeatable checklist that chains together every skill from Chapters 1 and 2
- Why practicing on unfamiliar scenarios matters more than re-solving the ones you've already seen
- How to self-check a tradeoff analysis for the mistakes covered later in Lesson 20

## This lesson is a rehearsal, not new material

Every lesson so far taught one piece: what a tradeoff is, specific tradeoffs with their real criteria, how to document a decision as an ADR, how to explain it to executives. This lesson doesn't add a new concept — it's where you run the entire chain, start to finish, on scenarios you haven't seen laid out for you already. That's deliberate. Recognizing the right answer to a worked example is a different skill from generating the analysis yourself against a scenario that doesn't come pre-labeled with which tradeoff it is.

## The end-to-end checklist

For any architecture decision, work through these steps in order:

1. **Name the tradeoff.** What two desirable qualities are actually in tension here? Don't settle for the first tradeoff that comes to mind if the scenario is actually blending two (a decision can be build-vs-buy *and* governance-vs-agility at once — name both if both are real).
2. **State what each side actually costs and buys, specifically for this scenario.** Not the generic version from the lesson — the specific numbers, team, and constraints given in this scenario. Generic reasoning that could apply to any org is a sign you haven't actually engaged with this scenario's particulars.
3. **Apply the decision criteria for this specific tradeoff.** Each tradeoff in Chapters 1-2 came with concrete criteria (data sensitivity and user frequency for security vs. usability; actual measured usage and forecast for cost vs. capability; blast radius for centralized vs. decentralized). Use the actual criteria, not a generic "it depends."
4. **Make the call, and say what you're trading away.** A real recommendation, not a list of pros and cons with no conclusion. State the decision plainly, and name the cost honestly, per Lesson 8.
5. **Name the condition that would make you revisit it.** What specific future fact would change this answer?
6. **Write it as a short ADR, then translate the top of it into an executive-ready opening.** Two outputs from one piece of reasoning: the technical record (Lesson 8's format) and the business-framed summary (Lesson 15's structure).

## Self-check against common failure patterns

Before finalizing any practice scenario, check your own analysis against these patterns — they're the specific mistakes Lesson 20 names in full, and catching them in your own work now is the actual point of this lesson:

- Did you pick a side because it "sounds more modern or sophisticated" (real-time, programmatic, custom-built) rather than because the scenario's actual facts justify it?
- Did you treat the decision as permanent, with no named condition for revisiting it?
- Did you skip naming what's being given up, and only describe what's being gained?
- Did you apply a rule you remember from a different lesson's example, without checking whether this scenario's specific facts (volume, team, regulatory context, timeline) actually match the conditions that made that rule correct there?

## Practice scenarios

Work through all three below using the six-step checklist. For each, produce a one-paragraph ADR-style record and a 3-4 sentence executive-framed summary.

1. A logistics company's Salesforce org needs to let drivers update delivery status from a mobile app with unreliable cell connectivity, and dispatch needs to see status changes "pretty quickly, but a minute or two of lag is fine." A vendor on AppExchange offers a fleet-tracking managed package covering most of the requirement at a per-vehicle monthly cost; building custom would take an estimated 10 weeks.
2. A nonprofit's five regional offices each want their own volunteer-intake process, citing real differences in local regulations, but the national office wants one dashboard showing volunteer totals across all five regions without manual reconciliation.
3. A 40-person admin team is currently required to route every Salesforce change, regardless of size, through a single architecture-review meeting that happens once every two weeks, and change requests are backing up.

## Key terms

| Term | Meaning |
|---|---|
| End-to-end tradeoff analysis | Running the full chain from naming the tradeoff through a documented, executive-ready recommendation, rather than any single step in isolation |
| Self-check pattern | A known failure mode (deciding by fashion, skipping the cost, forgetting the revisit trigger, misapplying a rule outside its original context) checked against your own analysis before finalizing it |

## Lab

Complete all three practice scenarios above in full: name the tradeoff(s), state the specific costs and benefits, apply the real criteria, make the call with its cost named, state a revisit trigger, and produce both a short ADR-style paragraph and an executive-framed summary for each.

## Check yourself

Can you complete the six-step checklist from memory, in order, without looking back at this lesson? For each of the three practice scenarios, can you explain which earlier lesson's criteria you applied, and why that specific tradeoff (not a different one) was the one actually in play?
