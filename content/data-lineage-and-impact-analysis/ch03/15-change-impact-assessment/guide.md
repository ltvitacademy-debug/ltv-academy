# Lesson 15 — Change Impact Assessment

**Chapter 3 · Dependencies and Impact · Lesson 15 of 25**

## What you'll learn

- How a change impact assessment turns Lesson 14's downstream walk into a formal, repeatable process
- The fields a change impact assessment document typically captures
- How risk gets classified, and why "high risk" doesn't just mean "many consumers"
- A worked example applying the process to a real kind of change: altering a fact table's grain

## From a one-off exercise to a process

Lesson 14 walked through impact analysis as something you do once, for one proposed change. A **change impact assessment** is that same exercise, formalized into a process every meaningful change goes through before it ships — not because every change needs heavy process, but because the changes that *do* need it are hard to tell apart from the ones that don't until you've actually traced the lineage.

The process has four stages:

1. **Propose** — the change is described precisely: what's changing, in what dataset, field, or transformation.
2. **Trace lineage** — the downstream walk from Lesson 14 is performed and documented, not just done in someone's head.
3. **Classify risk** — the findings are scored, typically high / medium / low, based on what was found downstream.
4. **Sign off and communicate** — someone with authority over the affected consumers approves the change, and the people who own those downstream reports and tables are notified before it ships, not after.

## What goes in the document

A change impact assessment is only useful if it's written down. At minimum, it typically captures:

| Field | Captures |
|---|---|
| What's changing | The exact dataset, column, or transformation, and the nature of the change |
| Who's affected | Every downstream consumer found in the lineage trace, with owners |
| Risk level | High / medium / low, driven by severity and whether a CDE is in the path |
| Rollback plan | What happens if the change ships and something breaks anyway |

## Risk classification isn't just counting consumers

A change touching five non-critical internal tables and a change touching one dashboard that happens to be a Critical Data Element (Lesson 14) are not the same risk level, even though the second change "only" touches one thing. Risk classification should weight *what* is affected, not just *how much*. A useful rule of thumb: any change whose downstream trace touches a CDE is automatically treated as at least medium risk, regardless of how small the trace otherwise looks.

## A worked example: changing a fact table's grain

Suppose someone proposes changing `SalesFact` from one row per order to one row per order line — a grain change. Tracing lineage: three downstream reports do simple `SUM(Amount)` aggregations, which will still work correctly at the new grain. One report does a row-count metric ("number of orders") that will now silently double- or triple-count, because the grain changed underneath it. That one report gets flagged high risk and needs its logic updated *before* the grain change ships — exactly the kind of break that counting rows downstream, without checking what each one actually does with the data, would have missed.

## Key terms

| Term | Meaning |
|---|---|
| Change impact assessment | The formal, documented process of tracing and approving a proposed change's downstream impact |
| Risk classification | Scoring a proposed change's downstream impact, typically high/medium/low |
| Grain | The level of detail one row in a table represents (e.g. one row per order vs. one row per order line) |

## Lab

Take the impact analysis you built in Lesson 14's lab and format it as a short change impact assessment: what's changing, who's affected, a risk level with a one-sentence justification, and a rollback plan.

## Check yourself

Can you name the four stages of a change impact assessment, and explain why "touches a CDE" should raise the risk level even when the total number of downstream consumers is small?
