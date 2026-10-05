# Lesson 10 — Designing Access and Retention Policies

**Chapter 1 · Capstone: LTV Global Data Governance Program · Lesson 10 of 35**

## What you'll learn

- How to turn Lesson 6's sensitivity tiers into an actual role-based
  access policy
- A retention schedule for LTV Global's CDEs, grounded in the data
  minimization principle this career path already taught
- Why the payment card token gets the shortest retention window of
  any element in the program
- How access and retention work together, not as two separate policies

**Reminder:** LTV Global, its roles, and every policy figure below are
fictional and illustrative, invented for this capstone.

## From classification to access

Amara Chen's Lesson 6 tiers become real the moment they're mapped to
actual roles. Least privilege drives the design: a role gets exactly
the access its job requires, nothing wider.

| Element | Tier | Finance Analyst | Sales Rep | Support Agent | Risk & Compliance |
|---|---|---|---|---|---|
| `Products.SKU` | Internal | Read | Read | Read | Read |
| `Orders.OrderTotal` | Internal | Read | Read (own accounts) | Read (own tickets) | Read |
| `Customers.Email` | Confidential | No | Read (own accounts) | Read (own tickets) | Read |
| `Payments.CardToken` | Restricted | No | No | No | Read, audited |

Two things stand out: no role gets blanket access to Confidential or
Restricted data by default — Sales and Support are scoped to records
tied to their own accounts or tickets, not the whole Customer table —
and only Risk & Compliance can see `CardToken` at all, with every
access logged.

## Designing the retention schedule

Retention follows the same discipline the Security & Privacy
Governance course taught: keep data only as long as its purpose
requires, not indefinitely by default. Grant Lindqvist (CFO) and
Amara Chen co-own the schedule:

| Element | Retention period | Why |
|---|---|---|
| `Orders.OrderTotal` and order history | 7 years from order date | Matches Finance's own financial recordkeeping standard |
| Golden Customer Record (Lesson 9) | Active plus 3 years of inactivity, then anonymized | No ongoing business purpose once a customer has been inactive that long |
| `Payments.CardToken` | 13 months from the related transaction | Covers the realistic chargeback window; no legitimate reason to hold it longer |
| `Products.SKU` | Indefinite, even after discontinuation | Lesson 5's glossary rule — a retired SKU is still needed to make sense of historical orders |

`CardToken` gets the shortest window in the entire program on purpose:
it's the most Restricted element from Lesson 6, and the rule that
applies across this whole policy is that sensitivity and retention
move together — the more sensitive the data, the less justification
there is to keep it around past its specific, named purpose.

## Access and retention as one policy, not two

These aren't separate documents that happen to share a topic. The
same `CardToken` row that's Restricted in the access table is also the
shortest-lived row in the retention table, for the same underlying
reason. Treating them as one combined policy — who can see it, and for
how long — is what Lesson 12's operating model expects every domain's
owner to maintain going forward, not just for this capstone.

## Key terms

| Term | Meaning |
|---|---|
| Least privilege | Granting a role exactly the access its job requires, no wider |
| Data minimization | Keeping data only as long as it serves a specific, named purpose |
| Retention schedule | A documented policy stating how long each data element is kept before deletion or anonymization |

## Lab

Pick two elements from your own Lesson 6 classification lab — one
Confidential or Restricted, one Internal or Public. Write a short
access table (two or three roles) and a one-line retention period with
justification for each, following the same pattern as the tables
above.

## Check yourself

- Why don't Sales Reps and Support Agents get blanket access to the
  Customers table, even though Email is relevant to their jobs?
- Why does `Payments.CardToken` have the shortest retention period of
  any CDE in this program?
- What principle links the access table and the retention table
  together, rather than treating them as unrelated policies?
