# Lesson 14 — Data Stewards

**Chapter 3 · Roles and Structure · Lesson 14 of 30**

## What you'll learn

- DAMA-DMBOK's definition of a data steward
- The three kinds of steward — business, technical, and data management
- What a steward actually does day to day, as the owner's Responsible (R) partner
- How to tell a steward apart from an owner and a custodian

## The DAMA-DMBOK definition

DAMA-DMBOK defines a **data steward** as "a business leader and/or subject matter expert
accountable for tasks related to data management" — someone who works to ensure that data
content and metadata stay consistent with the organization's policies, standards, and
business rules, so the data reaches an appropriate level of quality for its actual use.

Where Lesson 13's data owner holds final approval authority over a domain, the steward is
who actually does the recurring work that keeps that domain's data trustworthy: maintaining
definitions, monitoring quality, fielding questions from other teams, and flagging issues
before they reach the owner as a dispute.

## Three kinds of steward

DAMA-DMBOK and the practitioner literature that followed it generally split stewardship into
three flavors, often held by different people on the same domain:

1. **Business data steward** — a subject matter expert from the business side who
   understands what the data *means* (e.g., what counts as an "active customer")
2. **Technical data steward** — someone closer to the data platform who understands how
   the data is structured, where it lives, and how it moves
3. **Data management steward** — a steward focused on the governance process itself:
   metadata, the business glossary, data quality rules, and documentation

A mid-sized domain might have one person wearing all three hats; a large, high-risk domain
(regulated financial data, for example) might have a dedicated person for each.

## What a steward does day to day

- Maintains the agreed definitions for terms in their domain (Lesson 21 covers this in depth)
- Monitors data quality against the thresholds the owner has set
- Answers "what does this field actually mean?" questions from other teams
- Escalates disputes or quality problems to the owner when they can't resolve them directly
- Documents lineage and context so the next person doesn't have to rediscover it

## Steward vs. owner vs. custodian — the full picture

| Role | RACI letter | What they hold |
|---|---|---|
| Data owner | Accountable (A) | Final approval authority over the domain |
| Data steward | Responsible (R) | Day-to-day work of applying the owner's decisions |
| Data custodian | — (Lesson 15) | Technical implementation: storage, security, movement |

One nuance worth knowing: DAMA-DMBOK itself treats "steward" and "custodian" as near-
synonyms in its core text, but the broader governance field — and this course — treats them
as distinct roles, because in practice the person maintaining business definitions and the
person maintaining database infrastructure are almost always different people with
different skills. Lesson 15 draws that line precisely.

## Key terms

| Term | Meaning |
|---|---|
| Data steward | Subject matter expert responsible for day-to-day data management tasks |
| Business data steward | Steward focused on what the data means to the business |
| Technical data steward | Steward focused on how the data is structured and stored |

## Lab

For the same data domain you used in Lesson 13's lab, write one paragraph identifying:

1. Who is currently doing steward-type work for this domain, even informally (maintaining a
   spreadsheet of definitions, answering "what does this mean" questions, flagging bad data)?
2. Which of the three steward flavors — business, technical, data management — best
   describes what that person actually does?
3. Is there a flavor of stewardship this domain is missing entirely?

## Check yourself

Can you state, in one sentence each, what distinguishes a data owner's accountability from a
data steward's responsibility — and name the three kinds of steward DAMA-DMBOK describes?
