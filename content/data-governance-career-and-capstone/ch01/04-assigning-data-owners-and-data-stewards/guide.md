# Lesson 4 — Assigning Data Owners and Data Stewards

**Chapter 1 · Capstone: LTV Global Data Governance Program · Lesson 4 of 35**

## What you'll learn

- How to assign a named data owner and data steward to each of the
  four critical data elements from Lesson 3
- Why the owner and steward roles are different jobs, held by
  different people
- How to write a RACI line for one CDE so accountability is explicit,
  not assumed
- Where the executive sponsor fits above both roles

**Reminder:** every name, title, and role below is fictional and
illustrative, invented for this capstone.

## Owner versus steward, at LTV Global specifically

A **data owner** is accountable for a domain at the business level —
usually a director or VP who can approve a definition, settle a
dispute, or fund a fix. A **data steward** does the daily work — fixing
bad records, answering "what does this field actually mean," and
flagging problems to the owner. Program lead Marcus Ibe assigns both
roles to each of the four CDEs identified in Lesson 3:

| CDE | Domain | Data owner | Data steward |
|---|---|---|---|
| `Customers.Email` | Customer | Renata Silva, VP of Sales | Priya Anand, senior CRM analyst (Beacon) |
| `Products.SKU` | Product | Tom Okafor, VP of Merchandising | Diego Marsh, merchandising analyst |
| `Orders.OrderTotal` | Order / Finance | Grant Lindqvist, CFO | Sam Okonjo, financial systems analyst (Atlas) |
| `Payments.CardToken` | Payment | Amara Chen, Head of Risk & Compliance | Leo Fitzgerald, payments systems analyst |

Above all four sits **Dana Whitfield**, Chief Data Officer, as
executive sponsor of the whole program — she doesn't own a single
domain herself; she clears roadblocks, funds the work, and reports
progress to the board that asked for this program in the first place.

## Writing a RACI for Customers.Email

A RACI line turns "someone should probably handle this" into an
actual answer. For `Customers.Email` specifically:

| Activity | Responsible | Accountable | Consulted | Informed |
|---|---|---|---|---|
| Flagging a bad or duplicate email record | Priya Anand (steward) | Renata Silva (owner) | IT & Data Services | Customer Support |
| Deciding which system's email value wins on conflict | Renata Silva (owner) | Renata Silva (owner) | Priya Anand, Comet's e-commerce lead | Dana Whitfield |
| Responding to a future data access request involving email | Priya Anand (steward) | Dana Whitfield (CDO) | Legal, Customer Support | Renata Silva |

Notice the owner and the sponsor trade places depending on the
activity: Renata Silva is Accountable for the normal data-quality
decision, but Dana Whitfield becomes Accountable the moment a
regulatory request like Lesson 1's DSAR is involved — exactly the kind
of escalation path a RACI is supposed to make explicit instead of
improvised under pressure.

## Key terms

| Term | Meaning |
|---|---|
| Data owner | The business-accountable person for a domain — approves definitions, settles disputes, funds fixes |
| Data steward | The person doing the daily hands-on work of monitoring and fixing data for an owner |
| Executive sponsor | The senior leader funding and championing the whole program, without personally owning any one domain |
| RACI | Responsible, Accountable, Consulted, Informed — a table naming exactly who does what for a given activity |

## Lab

Pick one of the four CDEs above (or one from your own Lesson 3 lab) and
write a three-row RACI table like the one above, for three different
activities involving that element. Make sure Responsible and
Accountable are never the same box for the same activity unless you
can justify why.

## Check yourself

- What's the functional difference between an owner and a steward at
  LTV Global?
- For `Customers.Email`, who is Accountable for a routine data-quality
  decision, and who becomes Accountable during a regulatory request?
- Why doesn't Dana Whitfield personally own any single CDE?
