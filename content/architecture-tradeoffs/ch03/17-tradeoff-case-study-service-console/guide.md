# Lesson 17 — Tradeoff Case Study: Service Console

**Chapter 3 · Applying Tradeoffs · Lesson 17 of 20**

## What you'll learn

- How multiple tradeoffs from this course show up simultaneously in one real feature decision
- A full case study: redesigning a Service Cloud console for a growing support team
- How to prioritize when two or more tradeoffs point in different directions
- A worked example of the full documentation-and-communication chain from Lessons 8 and 15

## The scenario

A mid-size software company's support team has grown from 8 agents to 45 over two years, still running on a Service Console built when the team was small. Agents complain the console is slow to load (too many related lists and a complex page layout built up over years) and that case assignment and escalation rules, originally built as a handful of simple Flow decision elements, have grown into a tangled 60-element Flow that even the admin who built it struggles to safely modify. Leadership wants: faster agent response times, no new data-integrity incidents from automation bugs, and a plan that doesn't require hiring a developer the team doesn't currently have.

This single scenario contains at least three tradeoffs from earlier in this course, and the case study skill is recognizing all of them rather than solving the first one you notice.

## Tradeoff 1: Performance vs. complexity (Lesson 3)

The slow-loading console is a performance problem with an available fix: trim the related lists and simplify the page layout to only what agents actually use case-by-case, possibly using Dynamic Forms to show fields conditionally rather than all at once. This is a case where the performance gain is cheap relative to its complexity cost — removing unused related lists and simplifying a layout is lower-risk than, say, introducing a caching layer, and should be done regardless of the other decisions below. Not every performance fix carries equal complexity cost, and this is one of the cheap ones.

## Tradeoff 2: Declarative vs. programmatic (Lesson 6)

The 60-element Flow is the harder call. It's grown past the point where an admin can safely trace it, which is exactly the maintainability signal Lesson 6 flagged as a reason to consider Apex — but the team has no developer, and "no new data-integrity incidents from automation bugs" is leadership's explicit requirement, which argues against ripping out a working (if ugly) Flow for a rewrite the team can't safely build or maintain either. The resolution isn't a clean binary: isolate the specific sub-logic that's actually complex (perhaps a scoring calculation or multi-criteria escalation check) into a single, well-named invocable Apex method the team contracts out once, built with real unit tests, called from a now-much-simpler Flow that keeps the parts an admin needs to read and modify declarative. This is the hybrid pattern from Lesson 6, applied under a real constraint (no in-house developer) that shapes exactly how much moves to Apex.

## Tradeoff 3: Governance vs. agility (Lesson 14)

Whatever gets built needs a safer path to change than "an admin edits the live Flow directly," which is how the current tangle happened in the first place — but a heavy change-advisory process for a 45-agent support team's console tweaks would be governance mismatched to the actual risk, exactly the failure mode Lesson 14 warned produces workarounds. The fit here is a lightweight path: changes to the console layout move through quick peer review by a second admin; changes to the escalation logic (now partly in tested Apex) go through the sandbox-to-production pipeline with its automated tests acting as the safety net, instead of a slow manual board.

## Prioritizing when tradeoffs point different directions

Notice that fixing the Flow (tradeoff 2) wants more rigor, while governance for a 45-agent team (tradeoff 3) wants to avoid over-formalizing. These aren't contradictory once sequenced correctly: the performance fix (cheap, low-risk) ships first and immediately. The Apex-extraction-plus-simplified-Flow redesign (tradeoff 2) ships second, as the bigger, riskier piece. The lightweight governance path (tradeoff 3) gets put in place alongside tradeoff 2's rollout, specifically so the newly-rebuilt automation doesn't immediately start accumulating the same kind of unreviewed tangle that caused the original problem.

## Key terms

| Term | Meaning |
|---|---|
| Dynamic Forms | A Salesforce feature for conditionally showing fields on a Lightning record page without a full separate page layout per scenario |
| Compound scenario | A real-world case containing more than one tradeoff at once, requiring each to be identified and sequenced rather than solved as a single decision |

## Lab

Write the full ADR for this case study's tradeoff 2 decision (declarative vs. programmatic), including what specifically moves to Apex, what stays in Flow, and the condition under which the team would need to revisit this (for example, hiring an in-house developer, or the escalation logic growing more complex again). Then write the 3-4 sentence executive summary of that same decision using Lesson 15's structure.

## Check yourself

Can you name all three tradeoffs present in this case study and explain why recognizing all three, rather than just the first one noticed, matters to getting the recommendation right? Can you explain the sequencing logic — why the performance fix ships first, and why the governance fix is tied to the Flow/Apex rollout rather than built independently?
