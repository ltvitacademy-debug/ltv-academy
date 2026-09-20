# Contacts

Lesson 8 covered the company. This lesson covers the person: the **Contact**, the object for an
individual — typically someone who works at the company represented by a related Account.

## What you'll learn

- What a Contact object represents, and how it typically relates to an Account
- Why a Contact isn't the same thing as a Lead, even though both represent people
- How Contacts connect to Opportunities through a specific relationship

## A Contact is an individual person, related to an Account

A **Contact** represents one specific person — a name, an email, a phone number, a title — and is
typically linked to an Account through the Contact's **Account Name** field, representing the
company that person works at. A single Account (say, a mid-size company) commonly has many related
Contacts: a VP who champions the deal, a procurement contact who signs off, a day-to-day user who
actually uses the product. Reporting on "everyone we know at this company" means pulling every
Contact related to that Account.

## Contact vs. Lead: same idea, different stage

It's easy to mentally lump Contact and Lead together since both represent people, but they
represent different stages of the same relationship. A Lead is a person *before* they're
qualified as connected to a real Account — often before it's even clear which company they
belong to in Salesforce's data. A Contact is a person *after* that connection is established,
explicitly tied to a specific Account. Lead Conversion (Lesson 7) is literally the process that
turns a Lead into a Contact (plus an Account, plus usually an Opportunity) — they're sequential
stages of the same person's record, not two unrelated objects.

## How Contacts relate to Opportunities

Contacts connect to Opportunities too, through **Contact Roles** — a relationship that records not
just that a Contact is associated with a deal, but *what role* they play in it (Decision Maker,
Influencer, Economic Buyer, and similar values). This matters for real sales analysis: "who are
the decision makers across our open pipeline" is a question that requires traversing from
Opportunity through Contact Roles to Contact — a three-object relationship, not a simple
one-to-one link.

## Key terms

| Term | Meaning |
|---|---|
| Contact | An individual person, typically related to an Account |
| Account Name (on Contact) | The field linking a Contact to the company they work at |
| Contact Role | The relationship recording a Contact's role on a specific Opportunity |

## Check yourself

A Lead and a Contact both represent a person. What's the real difference between them, and what
process connects the two?
