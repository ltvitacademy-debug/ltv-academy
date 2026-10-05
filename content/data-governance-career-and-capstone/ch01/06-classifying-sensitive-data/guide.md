# Lesson 6 — Classifying Sensitive Data

**Chapter 1 · Capstone: LTV Global Data Governance Program · Lesson 6 of 35**

## What you'll learn

- A standard four-tier sensitivity classification scheme
- How to apply it to LTV Global's critical data elements, plus one
  overlooked element the exercise turns up
- Why a tokenized value can still land in the most restricted tier
- How classification feeds directly into Lesson 10's access policies

**Reminder:** LTV Global, its data, and every classification decision
below are fictional and illustrative, invented for this capstone.

## The four tiers

Amara Chen, Head of Risk & Compliance, leads a classification pass
using the standard tiers this career path has already taught:

| Tier | Meaning | Example at LTV Global |
|---|---|---|
| Public | Safe for anyone, inside or outside the company | Published product names and prices on Comet |
| Internal | Safe for any employee, not for the public | Warehouse stock counts in Harbor |
| Confidential | Limited to the people who need it for their job | A customer's email address |
| Restricted | Limited to a named, audited group; breach triggers formal response | A payment card token |

## Classifying LTV Global's elements

| Element | Tier | Why |
|---|---|---|
| `Products.SKU` | Internal | A business identifier, not personal or financial data — but not meant for public catalogs the way the product name is |
| `Orders.OrderTotal` | Internal | Commercially sensitive if it leaked in bulk, but not personal data about an individual |
| `Customers.Email` | Confidential | Personal data under UK/California privacy law — exactly the element behind the Lesson 1 DSAR |
| `Payments.CardToken` | Restricted | Still PCI scope even though it's a token, not a raw card number — a breach here triggers a formal incident response, not a quiet fix |

The classification pass also turns up an element nobody had flagged
yet: `Customers.DateOfBirth`, captured by Comet during warranty
registration for age-restricted outdoor equipment. It gets the same
**Confidential** tier as email, and a note for Lesson 3's team to
reconsider it as a fifth CDE candidate — a reminder that a
classification exercise often surfaces gaps a landscape inventory
alone missed.

## Why a token still lands in Restricted

`Payments.CardToken` isn't the actual card number — it's a tokenized
reference Atlas's payment processor returns after authorization. It
still lands in Restricted rather than Confidential because the
*consequence* of mishandling it (regulatory PCI exposure, a mandatory
breach disclosure) is what drives the tier, not just whether the raw
sixteen digits are technically present. Classification follows impact
of exposure, not just the literal content of the field.

## Key terms

| Term | Meaning |
|---|---|
| Sensitivity classification | A tier (Public, Internal, Confidential, Restricted) assigned to data based on the impact of its exposure |
| PII | Personally identifiable information — data that can identify a specific individual |
| PCI scope | Data covered by the Payment Card Industry Data Security Standard, regardless of tokenization |

## Lab

Classify four elements from your own work, school, or a personal
project into these same four tiers, and write one sentence per element
justifying the tier — specifically naming the *consequence* of
exposure, not just what the field contains.

## Check yourself

- What distinguishes Confidential from Restricted in this scheme?
- Why does `Payments.CardToken` land in Restricted even though it's a
  token, not a raw card number?
- What overlooked element did this classification pass surface, and
  why does that matter for Lesson 3's CDE list?
