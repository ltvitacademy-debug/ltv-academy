# Junction Objects

Lesson 21 mentioned that Salesforce has no native many-to-many relationship field. This
lesson explains exactly how Salesforce solves that gap in practice: the **junction object**
pattern. It shows up constantly in real orgs, and it's built entirely from a concept you
already know — Master-Detail relationships, just two of them on one custom object instead
of one.

## What you'll learn

- Why a single relationship field can never represent many-to-many
- The junction object pattern: one custom object, two Master-Detail relationships
- A real, standard Salesforce example you'll actually encounter: CampaignMember

## Why one field isn't enough

A single relationship field can only point one direction, at one record. A Contact's
`AccountId` field can point at exactly one Account. That works fine for one-to-many (one
Account, many Contacts) — but it breaks down the moment you need many-to-many. Consider
Contacts and Campaigns: one Contact might be a target of several marketing campaigns, and one
Campaign obviously has many Contacts targeted by it. Neither object can hold a single field
that captures "all of the related records on the other side," because a field holds one
value, not a list of relationships each with its own extra data (like whether the contact
actually responded).

## The junction object pattern

The fix is to introduce a third object in the middle — a **junction object** — that exists
purely to represent the relationship itself. A junction object has exactly two Master-Detail
relationships: one to each of the two objects it's connecting. Each junction record
represents one specific pairing. This works because of what you already learned about
Master-Detail: the junction record can't exist without both parents (mandatory relationship
fields on both sides), and because it's a real object, it can carry its own fields — extra
data *about* the relationship itself, not about either parent alone.

## A real example: CampaignMember

Salesforce ships a standard junction object for exactly the Contacts-to-Campaigns problem
above: **CampaignMember**. Every CampaignMember record links one Contact (or Lead) to one
Campaign, and it carries its own fields beyond the two relationships — most usefully,
**Status** (values like "Sent," "Responded," "Attended"), which tracks how that specific
contact engaged with that specific campaign. That status genuinely could not live on Contact
(a Contact is in many campaigns, each with a different status) or on Campaign (same problem,
reversed). It can only live on the junction record, because the junction record is the only
place in the data model that represents one specific Contact-Campaign pairing.

## Key terms

| Term | Meaning |
|---|---|
| Junction object | A custom object with two Master-Detail relationships, implementing many-to-many |
| CampaignMember | Salesforce's standard junction object linking Contacts/Leads to Campaigns |
| Status (CampaignMember) | A field on the junction record tracking one contact's engagement with one campaign |

## Check yourself

Why does CampaignMember's Status field have to live on the junction object, rather than as a
field directly on Contact or directly on Campaign?
