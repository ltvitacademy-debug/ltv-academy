# Lesson 6 — Accounts and Contacts

**Chapter 2 · Build: Data and Objects · Lesson 6 of 20**

## What you'll learn

- How to configure Account Record Types for Cascade's customer segments
- The custom fields Account and Contact need to capture Cascade's actual
  business, and exactly how to create them
- How Record Types and custom fields work together to make the same
  object behave differently for different kinds of customers
- What "done" looks like for this lesson, checked against the Lesson 3
  data model

This is the first hands-on build lesson. Everything here follows directly
from the data model you designed in Lesson 3 — you're not inventing
anything new, you're configuring exactly what you already decided on
paper.

## Step 1 — Account Record Types

Cascade sells to six distinct kinds of customers, and a restaurant's
Account looks meaningfully different from a hospital system's — different
fields matter, different page layouts make sense. That's exactly what
Record Types are for.

In **Setup → Object Manager → Account → Record Types**, create:

1. **Restaurant**
2. **Hotel & Hospitality**
3. **Healthcare & Institutional**
4. **Education**
5. **Catering**
6. **Dealer** — Cascade's independent equipment dealers, not an end
   customer

Each Record Type gets its own picklist values for Business Segment (next
step) and, in Lesson 10, its own page layout.

## Step 2 — Account custom fields

| Field label (API name) | Type | Purpose |
|---|---|---|
| Business Segment (`Business_Segment__c`) | Picklist, matches the six Record Types | Lets you report by segment even if Record Type changes later |
| Number of Kitchen Locations (`Number_of_Kitchen_Locations__c`) | Number | Distinguishes a single-location restaurant from a 40-location hotel chain — drives whether an account belongs to Key Accounts |
| Primary Equipment Interest (`Primary_Equipment_Interest__c`) | Picklist (Cooking Equipment / Refrigeration / Dishwashing / Ventilation / Full Kitchen Package) | What this Account is actively shopping for |

To create each one: **Object Manager → Account → Fields & Relationships →
New**, choose the data type, set the field label and length/picklist
values, then **Set Field-Level Security** per profile — Sales Rep and
Sales Manager get Edit; Service and Customer Success profiles get Read
Only, since this is sales-owned data.

## Step 3 — Contact custom fields

A Contact at Cascade isn't just a name — it's a specific role in a
buying decision. These fields capture that:

| Field label (API name) | Type | Purpose |
|---|---|---|
| Contact Role (`Contact_Role__c`) | Picklist (Executive Chef / Kitchen Manager / Purchasing Manager / Facilities Director / General Manager / Owner) | What this person actually does at the Account |
| Decision Maker (`Decision_Maker__c`) | Checkbox | Flags whether this Contact can approve a purchase — used later by the Opportunity-stage validation rule in Chapter 3 |
| Preferred Contact Method (`Preferred_Contact_Method__c`) | Picklist (Phone / Email / Text) | How the rep should reach out — small, but it's the kind of real-world field a working CRM needs |

Create these the same way as the Account fields, under **Object Manager →
Contact → Fields & Relationships → New**.

## Step 4 — Why this combination, not just more fields

Record Type plus Business Segment looks redundant at first — why have
both? Record Type controls which **page layout and picklist values** a
user sees; Business Segment is a plain field you can **report and filter
on** without worrying about Record Type IDs. Chapter 4's reports filter
by Business Segment, not Record Type, because it's simpler to work with
in report builder. This is a real pattern you'll see in production orgs,
not an invented quirk.

## Checking your work against the data model

Go back to the Lesson 3 table. By the end of this lesson, Account and
Contact should match it exactly: Account holds the customer business with
six Record Types and the three custom fields above; Contact holds a named
person at that Account with a Role, a Decision Maker flag, and a
preferred contact method. If anything here doesn't match what you
designed in Lesson 3, that's worth reconciling now — Lesson 7 builds
Leads that convert directly into these objects.

## Key terms

| Term | Meaning |
|---|---|
| Record Type | A configuration that controls which picklist values and page layout a record uses, based on a category |
| Field-Level Security | Per-profile control over whether a field is visible, editable, or hidden |
| Business Segment | A plain picklist field, distinct from Record Type, used for simple reporting and filtering |

## Lab

In your own Developer Edition org, create all six Account Record Types
and all six fields above (three on Account, three on Contact), then
create one test Account of each Record Type with Business Segment set to
match — you'll convert Leads into these same six segments starting in
Lesson 7.

## Check yourself

- Why does Cascade need six Account Record Types instead of one?
- What's the difference between what Record Type controls and what
  Business Segment is used for?
- Which Contact field will the Chapter 3 validation rule reference, and
  what does it flag?
