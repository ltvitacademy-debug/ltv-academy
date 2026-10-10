# Lesson 19 — Enterprise Systems Case Study

**Chapter 4 · Practice · Lesson 19 of 22**

## What you'll learn

- How to apply every concept from Chapters 1 through 3 to a single, realistic scenario
- How to identify systems-of-record conflicts, integration boundary gaps, and governance gaps in a messy real-world description
- How to structure a System Architect's written recommendation, not just identify what's wrong
- Why case-study practice matters before moving into exam-style and review-board-style work

## The scenario: Meridian Fixtures

**Meridian Fixtures** is a fictional mid-size industrial equipment distributor, used here purely as a teaching scenario to practice this course's concepts — not a real company. Meridian has grown through two regional acquisitions over the past six years. Today, its systems landscape looks like this: the original parent company runs a Salesforce org used by its direct sales team; each acquired regional company kept its own Salesforce org, implemented independently with different field names and processes for the same business concepts; all three business units separately feed a shared, aging on-premises ERP system that holds the actual financial system of record, but each org's integration to the ERP was built by a different contractor at a different time, using a different integration pattern; there's a company-wide data warehouse that's supposed to consolidate reporting across all three business units, but the reports regularly don't reconcile, and nobody is quite sure why; and there is no governance body with authority over any of this — each business unit's Salesforce admin makes their own calls independently.

## Working the case

A System Architect brought in to assess Meridian's landscape would need to work through several of this course's concepts in sequence. First, the **multi-org question** (Lesson 12): is Meridian's three-org structure a deliberate, justified strategy, or an accidental one that accumulated through acquisitions with no Reference Architecture ever defined? The scenario as described is clearly the latter — each org exists because of how an acquisition happened, not because of a documented decision about when an additional org is warranted.

Second, the **systems-of-record problem** (Lesson 3): with three Salesforce orgs and one ERP, who actually owns a given customer's master data if that customer somehow interacts with more than one business unit? The scenario doesn't say this has been decided, which is itself diagnostic — an undecided system-of-record question is exactly the kind of gap that produces silent data drift.

Third, the **integration boundary inconsistency** (Lesson 4): three different contractors building three different integration patterns to the same ERP, at different times, with no shared standard, is precisely the kind of accidental, ungoverned integration sprawl Lesson 4 and Lesson 8 both warn about. It's very plausible that this inconsistency, not a data warehouse bug, is the actual root cause of the warehouse's reconciliation failures — three different integration patterns moving data at three different cadences, into three structurally different orgs, feeding one warehouse that assumes a single consistent shape.

Fourth, the **governance gap** (Lesson 8): with no Center of Excellence or equivalent body, there's no mechanism for Meridian to make any of these decisions once, centrally, rather than continuing to let each business unit's admin make independent local calls that compound the inconsistency over time.

## Structuring the recommendation

A System Architect's output here isn't just a list of problems — it's a sequenced recommendation, similar in spirit to the roadmap sequencing from Lesson 18. A defensible order might be: first, establish a governance body with real decision rights (nothing else holds without this); second, use that body to decide, and document, the multi-org strategy going forward and the system-of-record assignment for shared entities; third, standardize the ERP integration pattern across all three business units, likely requiring rework of at least two of the three existing integrations; and only then, fourth, revisit the data warehouse reconciliation problem, which is likely to resolve substantially once the upstream inconsistency driving it is fixed, rather than being a warehouse-side bug to patch independently.

## Key terms

| Term | Meaning |
|---|---|
| Case study scenario | A realistic, deliberately constructed teaching scenario used to practice applying architecture concepts together, rather than one at a time |
| Root cause versus symptom | Distinguishing an underlying structural problem (inconsistent integration patterns) from where its effects happen to surface (warehouse reconciliation failures) |

## Lab

Write Meridian Fixtures' System Architect assessment as a short memo (roughly 300–400 words) to its executive team. Name the four problems this lesson identifies (accidental multi-org, undecided systems of record, inconsistent integration patterns, no governance body), explain in your own words why the data warehouse's reconciliation failures are a symptom rather than the root cause, and give your own sequenced recommendation for what Meridian should address first, second, third, and fourth, with a one-sentence justification for the order you chose.

## Check yourself

Can you explain why fixing the data warehouse's reports directly, without addressing the integration inconsistency feeding it, would likely fail to solve Meridian's actual problem? Can you justify, in your own words, why establishing governance has to come before standardizing the integration patterns, rather than the other way around?
