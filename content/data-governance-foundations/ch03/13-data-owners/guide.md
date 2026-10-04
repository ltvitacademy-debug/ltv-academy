# Lesson 13 — Data Owners

**Chapter 3 · Roles and Structure · Lesson 13 of 30**

## What you'll learn

- What a data owner actually is, in the DAMA-DMBOK sense of the term
- Why the owner is a named business leader, never an IT title
- The four things a data owner is accountable for
- How owner differs from steward — and why that distinction matters later in this chapter

## The DAMA-DMBOK definition

The DAMA Guide to the Data Management Body of Knowledge (DMBOK) defines a **data owner**
as a business data steward who has **approval authority** for decisions about data within
their domain — "an individual responsible for definition, policy, and practice decisions
about data within their area of responsibility." That last phrase is doing the real work:
an owner isn't a job title you print on a business card, it's a responsibility assigned to
someone who already has authority over the part of the business that produces the data.

A VP of Sales is a natural owner for customer and opportunity data. A CFO is a natural owner
for financial data. A VP of Manufacturing is a natural owner for production data. In each
case, the person already makes the business calls that data reflects — governance just makes
that accountability explicit and names a single person responsible for it.

## What a data owner is accountable for

1. **Approving access** — who gets to see or use data in their domain, and under what
   conditions
2. **Setting quality thresholds** — what "good enough" means for this data (Chapter 1
   introduced why that threshold is a business judgment, not a technical one)
3. **Resolving domain disputes** — when two teams disagree about a definition or a number,
   the owner has the authority to make the call
4. **Owning the outcome** — if data in their domain is wrong, late, or misused, the owner is
   who the organization holds accountable — not IT, not the data team

## Owner, not IT

This is the single most common mistake organizations make when they first stand up data
governance: assigning ownership to a database administrator, a BI developer, or "the data
team" by default, because they're the ones who technically touch the data. DAMA-DMBOK is
explicit that this is backwards. A DBA can tell you *how* a table is structured; only a
business leader can tell you *why* a number of 0 in a "returns" field means something
different for a refund than it does for an order that was never shipped. Ownership requires
business context that only sits with the business.

IT and data teams still have an essential role — Lesson 15 covers it under the name **data
custodian** — but it's a different role, with different accountability, held by a different
kind of person.

## Owner vs. steward — a quick preview

Lesson 14 covers the data steward role in full, but the relationship is worth naming now
because it's the backbone of how governance roles divide responsibility. In RACI terms
(Lesson 17 covers RACI itself in depth):

- The **owner** is **Accountable (A)** — they own the outcome and sign off on decisions.
- The **steward** is **Responsible (R)** — they do the day-to-day work of applying the
  owner's decisions.

One owner can — and usually does — delegate day-to-day stewardship work to one or more
stewards, without giving up accountability for the outcome.

## One owner per domain

A data domain should have exactly one named accountable owner — not a department, not a
committee, not "whoever's available." Shared or ambiguous ownership is one of the most
common reasons governance programs stall: when nobody is unambiguously accountable for a
domain, decisions don't get made, disputes don't get resolved, and quality issues sit
unassigned. Naming a single person doesn't mean that person does all the work alone — it
means there's always a clear answer to "who decides?"

## Key terms

| Term | Meaning |
|---|---|
| Data owner | Named business leader with approval authority over a data domain |
| Data domain | A defined area of data (e.g., customer, product, finance) with one accountable owner |
| Accountable (RACI) | Owns the outcome and has final sign-off — the owner's role in RACI terms |

## Lab

Pick one data domain from your own organization (or a hypothetical one — "customer data,"
"product data," "employee data"). Write one paragraph answering:

1. Who in the organization *currently* makes the real business calls about this data, even
   informally?
2. Is that person currently treated as the data owner — or is ownership currently sitting
   with IT or "whoever maintains the system"?
3. What's one decision this domain needs an owner to make that currently has no clear owner?

## Check yourself

Can you explain, without looking back, why DAMA-DMBOK insists a data owner must be a business
role rather than an IT role — and name the one RACI letter that belongs to the owner?
