# Lesson 25 — A Unified Cost View Across Azure, AWS, and On-Prem

**Chapter 7 · Multi-Cloud Cost and Governance · Lesson 1 of 4**

## What you'll learn

- Why Azure Cost Management and AWS Cost Explorer don't just look
  different — they model cost in genuinely different units
- How to fold on-prem infrastructure into the same comparison using a
  fully-loaded cost estimate instead of a cloud-style invoice
- Why the tagging taxonomy you built for FinOps in an earlier course is
  the only thing that makes a cross-cloud rollup possible at all
- What the FinOps Open Cost and Usage Specification (FOCUS) is trying
  to solve, and why it exists

## Same question, three different answer formats

"What did this workload cost us last month?" sounds like one question.
In a hybrid, multi-cloud estate it's really three separate questions
wearing one trench coat. Azure answers it through Cost Management —
usage priced by meter, broken out by resource and by the Azure
Reservations or Savings Plans discounts already applied. AWS answers it
through Cost Explorer and the underlying Cost and Usage Report (CUR) —
usage priced by line item, with its own separate Reserved Instance and
Savings Plan discount model layered on top. On-prem doesn't answer it
at all, because there's no invoice — a server you already own doesn't
generate a bill every month.

None of these three outputs share a schema, a discount model, or even
a definition of what counts as "cost." Before you can build one view,
you have to normalize all three into the same shape.

## Normalizing the cloud side

The practical trap with Azure and AWS isn't that the raw numbers are
wrong — it's that committed-use discounts distort the *apparent* unit
cost unless you amortize them correctly. A reserved instance's sticker
price, averaged crudely across the month it was purchased, looks
nothing like its true per-hour cost once the commitment is spread over
its full term. Both clouds expose amortized cost data for exactly this
reason; a unified view has to pull the amortized figures, not the raw
billed figures, or Azure and AWS workloads will look artificially
cheaper or more expensive than they really are relative to each other.

## Pricing what you already own

On-prem infrastructure needs a different move entirely: a fully-loaded
cost estimate instead of a bill. That means combining straight-line
depreciation of the capital cost (a server's purchase price spread
across its useful life, commonly three to five years) with its ongoing
operating costs — power, cooling, rack space, support contracts, and a
reasonable allocation of the staff time spent keeping it running. The
result is an approximate monthly figure that's *comparable* to a cloud
opex number, not identical to one. Presenting it as exact, invoice-grade
data would be dishonest — the honest framing is "this is our best
estimate of what this hardware really costs us per month," and it
should always be labeled that way in the report.

## The join key: tags, not guesswork

None of this rolls up into one view without a shared join key, and
that key is the tagging taxonomy your FinOps work already established
— cost center, environment, owner, workload. If Azure resources and
AWS resources use the same tag keys and the same allowed values, a
cost report can group spend by workload across both clouds in one
pivot. If the tags drift — different keys, inconsistent casing,
optional fields left blank — the rollup silently breaks, and nobody
notices until a workload's "total cost" quietly excludes half of what
it actually spends.

## FOCUS: an industry attempt at a shared schema

You're not the first team to hit this problem. The FinOps Foundation
publishes FOCUS — the FinOps Open Cost and Usage Specification — an
open schema that normalizes billing data from multiple providers into
one consistent set of columns (service category, billed cost,
effective cost, usage quantity, and so on). Several cloud cost tools
can now export or ingest FOCUS-formatted data. It doesn't solve the
on-prem side for you, and it doesn't eliminate the amortization work —
but it's a real, vendor-neutral target schema to normalize *toward*
instead of inventing your own column mapping from scratch.

## Key terms

| Term | Meaning |
|---|---|
| Amortized cost | A committed-use discount's cost spread evenly across its full term, instead of shown as a lump sum in the purchase month |
| Fully-loaded cost | An on-prem estimate combining depreciation and operating costs into one figure comparable to a cloud opex number |
| Cost allocation tag | A tag key/value (cost center, environment, owner, workload) used as the join key across providers in a unified rollup |
| FOCUS | FinOps Open Cost and Usage Specification — an open, vendor-neutral schema for normalizing billing data across providers |

## Check yourself

You're ready for Lesson 26 when you can explain, without looking: why
does an unamortized reserved-instance cost distort a cross-cloud
comparison, and why can't on-prem infrastructure cost be pulled from a
bill the way cloud cost can?
