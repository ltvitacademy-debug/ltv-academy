# Opportunities

Leads, Accounts, and Contacts all set up for this: the **Opportunity**, the object that
represents an actual, real deal — in progress or already decided. If you've ever heard the phrase
"pipeline report," this is the object underneath it.

## What you'll learn

- What an Opportunity represents, as distinct from a Lead
- The real key fields: Stage, Amount, Close Date, Probability
- How the Sales Pipeline concept is really just Opportunities grouped by Stage

## An Opportunity is a real, in-progress or closed deal

An **Opportunity** represents a specific, real deal — not a raw, unqualified inquiry (that's a
Lead), but a genuine sales pursuit with an actual dollar value and a target close date. Every
Opportunity is related to an Account (the company) and usually has one or more related Contacts
through Contact Roles (Lesson 9). An Opportunity's whole purpose is to track that deal's progress
from open to closed — won or lost.

## Key fields: Stage, Amount, Close Date, Probability

Four fields carry most of the analytical weight on an Opportunity:

- **Stage** — where the deal sits in the sales process (common values: Prospecting,
  Qualification, Proposal, Negotiation, Closed Won, Closed Lost). This is the field that defines
  the sales pipeline itself.
- **Amount** — the deal's dollar value, the number that gets summed for "total pipeline value"
  or "revenue closed this quarter."
- **Close Date** — the date the deal is expected to close (or actually closed). This is what
  lets a forecast be organized by month or quarter.
- **Probability** — a percentage estimate of how likely the deal is to close, often tied
  automatically to Stage (each Stage typically has a default Probability, though it can be
  overridden on individual records).

## The Sales Pipeline is just Opportunities grouped by Stage

"The pipeline" isn't a separate object or a special report type — it's simply the set of open
Opportunities (Stage not yet Closed Won or Closed Lost), usually grouped or visualized by Stage.
A pipeline report answering "how much is in Negotiation right now" is doing nothing more exotic
than filtering Opportunity records by Stage and summing Amount. Understanding that the pipeline
*is* Opportunity data, not a separate concept layered on top of it, is what makes pipeline
reporting straightforward instead of mysterious.

## Key terms

| Term | Meaning |
|---|---|
| Opportunity | A real, in-progress or closed deal, with a dollar value and close date |
| Stage | Where the deal sits in the sales process; defines the pipeline itself |
| Amount | The deal's dollar value |
| Close Date | The expected or actual date the deal closes |
| Probability | Estimated likelihood of closing, often tied to Stage |
| Sales Pipeline | Open Opportunities, typically grouped/visualized by Stage |

## Check yourself

Is "the sales pipeline" a separate Salesforce object from Opportunity, or something else? What
exactly defines whether an Opportunity counts as part of the open pipeline?
