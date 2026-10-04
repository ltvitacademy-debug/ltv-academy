# Lesson 4 — The Cost of Poor Data

**Chapter 1 · What Data Governance Is · Lesson 4 of 30**

## What you'll learn

- A real, documented industry figure for what poor data quality costs organizations
- The categories where that cost actually shows up — not just "bad reports"
- Why the true cost is usually higher than any single figure captures
- How to start estimating this cost at your own organization

## A real, cited number

Gartner's data quality research has estimated that poor data quality costs organizations an **average of $12.9 million per year**. That figure comes from Gartner's survey-based research into data quality's business impact (Gartner, Magic Quadrant for Data Quality Solutions, 2020; the estimate continues to be cited on Gartner's own data quality research pages). Treat it as an industry-average order of magnitude, not a number that applies precisely to any one company — the real point isn't the exact digit, it's that this is a measured, material cost, not a vague inconvenience.

## Where the cost actually shows up

"Bad data" rarely appears on a budget line item called "bad data." It shows up scattered across categories that look unrelated unless you know to connect them:

1. **Wasted labor.** Analysts and engineers spend a measurable share of their time reconciling conflicting numbers, chasing down the "real" version of a report, or manually fixing records instead of doing higher-value work.
2. **Bad decisions made on bad numbers.** A forecast built on duplicate customer records overstates demand. A marketing budget gets allocated based on an inflated or stale segment size. These decisions are often never traced back to the data problem that caused them.
3. **Compliance and regulatory exposure.** Inaccurate or mismanaged personal data increases the risk and severity of regulatory penalties (Lesson 5 covers this driver directly) — a data quality problem that becomes a legal one.
4. **Customer-facing failures.** Wrong addresses, duplicate accounts, incorrect billing — all of these are quality failures that customers experience directly, with a direct cost to trust and retention.
5. **Opportunity cost.** Time spent on data firefighting is time not spent on work that grows the business — this is usually the largest and least-measured category of all.

## Why the real number is usually higher than any estimate

Most of these costs are never attributed back to their root cause. A sales team that lost a renewal because of a billing error doesn't file that loss under "data quality" — it gets recorded as churn, with no link back to the broken record that caused it. This is part of why the $12.9 million figure, real as it is, is best treated as a floor: it only captures what organizations were able to identify and attribute, in a space where most costs go unattributed entirely.

## Starting to estimate this at your own organization

You don't need a formal audit to start. A rough but honest approach: pick one recurring data problem (a report that regularly needs manual correction, a dataset with known duplicate records), estimate the hours per month people spend working around it, and multiply by a fully-loaded hourly cost. That single number is usually enough to get a governance conversation taken seriously — it rarely needs to be precise to be persuasive.

## Key terms

| Term | Meaning |
|---|---|
| Cost of poor data quality | The measurable financial impact — labor, bad decisions, compliance exposure, customer harm — of inaccurate or inconsistent data |
| Opportunity cost | The value of what wasn't accomplished because time went to fixing data problems instead |
| Attribution gap | The disconnect between a business loss and the data defect that actually caused it |

## Lab

Pick one recurring data problem at your organization (or a past employer). Write a short estimate: how many hours per month does someone spend working around it, and what's a reasonable fully-loaded hourly cost for that person's time? Multiply the two. That's your first, rough cost-of-poor-data number — write it down along with your assumptions.

## Check yourself

Can you state the Gartner figure this lesson cites, explain why it's best treated as a floor rather than a ceiling, and name at least three of the five cost categories where poor data quality actually shows up?
