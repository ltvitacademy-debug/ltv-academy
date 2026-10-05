# Lesson 3 — Identifying Critical Data Elements

**Chapter 1 · Capstone: LTV Global Data Governance Program · Lesson 3 of 35**

## What you'll learn

- How to apply critical data element (CDE) scoring criteria to the
  landscape inventory you built in Lesson 2
- The specific candidate elements at LTV Global and how each one scores
- Which elements earn the elevated governance treatment the rest of
  this chapter builds around
- Why not every column in Atlas, Beacon, or Comet needs this level of
  rigor

**Reminder:** LTV Global and every system and element named below are
fictional and illustrative, invented for this capstone.

## Scoring candidate elements

A critical data element earns elevated governance attention — a named
owner, a documented definition, quality rules, and monitoring — by
scoring high on at least one of four criteria: **regulatory impact**
(does a law or contract depend on it), **financial impact** (does it
feed revenue or cost reporting), **decision impact** (does an executive
or board report rely on it), and **operational impact** (does the
business stop functioning correctly if it's wrong).

Marcus Ibe's team scores five candidate elements pulled straight from
the Lesson 2 inventory:

| Element | System | Regulatory | Financial | Decision | Operational | CDE? |
|---|---|---|---|---|---|---|
| `Customers.Email` | Atlas / Beacon / Comet | High (GDPR/CCPA personal data) | Low | Medium | High (order confirmations, support) | **Yes** |
| `Orders.OrderTotal` | Atlas | Low | High (feeds revenue reporting) | High (board revenue number) | Medium | **Yes** |
| `Products.SKU` | Atlas | Low | Medium | Medium | High (inventory, fulfillment keys on it) | **Yes** |
| `Payments.CardToken` | Atlas | High (PCI scope) | Medium | Low | Medium | **Yes** |
| `Customers.MarketingOptIn` | Beacon | Medium | Low | Low | Low | No — important, but not elevated |

## Why these four, not all five

`MarketingOptIn` matters — getting it wrong risks an unwanted email,
not a board-level number or a regulatory finding — so it stays on the
ordinary data dictionary with no special treatment. The other four each
score high on at least one criterion for a concrete, specific reason:
`Email` because UK and California privacy law directly governs it (and
it's exactly what the Lesson 1 DSAR was about), `OrderTotal` because it
rolls up into the number Finance reports to the board, `SKU` because
nearly every fulfillment and inventory process at LTV Global keys off
it, and `CardToken` because it sits inside PCI scope regardless of how
rarely it's queried.

This is the same discipline Lesson 2 modeled at the system level,
applied one level down: name the few elements that actually justify
extra rigor, rather than trying to govern every column in Atlas,
Beacon, and Comet equally. The four CDEs identified here are exactly
the elements Lessons 4 through 7 assign owners to, define, classify,
and write quality rules against.

## Key terms

| Term | Meaning |
|---|---|
| Critical data element (CDE) | A data element that scores high enough on regulatory, financial, decision, or operational impact to justify elevated governance |
| Regulatory impact | Whether a specific law or contractual obligation depends on an element being correct |
| Decision impact | Whether an executive or board-level report relies on an element |

## Lab

Take three columns from a system you know (work, school, or a
personal project) and score each one against the same four criteria
used above: regulatory, financial, decision, operational. Mark which
ones you'd actually call a CDE, and write one sentence justifying each
"yes."

## Check yourself

- Name the four criteria used to score a candidate CDE.
- Which LTV Global element scored high specifically because of PCI
  scope, and which scored high because of the Lesson 1 DSAR incident?
- Why didn't `MarketingOptIn` make the CDE list, even though it's a
  real, used column?
