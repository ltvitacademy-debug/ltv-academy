# Lesson 17 — Prioritizing Critical Data Elements

**Chapter 4 · Critical Data Elements · Lesson 17 of 25**

## What you'll learn

- Why "is this a CDE?" isn't enough once you have more CDEs than you can govern intensively
- A simple two-axis scoring approach: impact versus likelihood of error
- A worked example ranking three already-identified CDEs
- What changes in practice once an element is ranked, not just flagged

## Why identification alone isn't enough

Lesson 16 gave you a yes/no test: is this element critical? In a real organization, that test often returns "yes" for more elements than anyone can realistically govern with equal intensity — forty CDEs is common at a mid-sized company. At that point, the question shifts from "is this critical?" to "which of our critical elements needs attention *first*?" Prioritization is what turns a long flat list of CDEs into something actually actionable.

## A two-axis scoring approach

A practical way to rank already-identified CDEs: score each on two independent axes.

- **Impact** — how bad is it if this element is wrong? (Reuses the four criteria from Lesson 16: regulatory, financial, decision, downstream reach — the stronger the hit on any of those, the higher the impact score.)
- **Likelihood** — how likely is this element to actually *be* wrong, given its current state? A manually re-keyed field is more error-prone than one calculated deterministically from a reliable source; a field with no validation rule (Data Quality Management, Lesson 17) is riskier than one with strict checks already in place.

Plotting CDEs on these two axes (both on a simple low/medium/high scale works fine — this doesn't need to be more precise than the decision it's informing) sorts them into a priority order: high-impact, high-likelihood elements need governance attention now; low-impact, low-likelihood elements can reasonably wait.

## A worked ranking

| Element | Impact | Likelihood of error | Priority |
|---|---|---|---|
| `OrderTotal` (from Lesson 16) | High — feeds revenue reporting | Medium — calculated, but from several source fields | **High** |
| `TaxRate` | High — directly affects every invoice's legal compliance | Low — sourced from a single, validated reference table | Medium |
| `SalesRepNotes` (free text) | Low — informational only, feeds no calculations | High — manually typed, no validation | Low |

`OrderTotal` tops the list not because it's the single highest-impact element, but because it combines real impact with meaningful error likelihood — exactly the combination that justifies spending limited governance effort first.

## What changes once an element is ranked

A high-priority CDE typically gets: a named, accountable owner (not just "the team" generally), explicit data quality rules (Data Quality Management, Chapter 4) run on a schedule, a documented remediation process (Data Quality Management, Lesson 25) for when it fails a check, and a shorter "last reviewed" cycle than a lower-priority element. Ranking isn't just paperwork — it's what determines where real governance effort actually gets spent.

## Key terms

| Term | Meaning |
|---|---|
| Impact (CDE scoring) | How bad it is if the element is wrong |
| Likelihood (CDE scoring) | How probable it is the element is currently wrong, given its source and validation |

## Lab

Take the CDE(s) you identified in Lesson 16's lab. Score each on impact and likelihood (low/medium/high is fine). Which would you tackle first, and why?

## Check yourself

Can you explain the difference between impact and likelihood in CDE prioritization, and why a high-impact element isn't automatically the top priority if its likelihood of error is low?
