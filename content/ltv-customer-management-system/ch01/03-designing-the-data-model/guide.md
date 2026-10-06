# Lesson 3 — Designing the Data Model

**Chapter 1 · Design · Lesson 3 of 20**

## What you'll learn

- How to translate a business scenario (Cascade, from Lesson 2) into a
  Salesforce object model, on paper, before building anything
- Which standard objects Cascade's org needs, and what each one holds
- Why Cascade needs two custom objects, and how they relate to the
  standard objects
- How to read and draw a simple object-relationship diagram using
  Salesforce's own relationship types

## Start from the business, not from Setup

A data model isn't a list of objects — it's a map of how the business's
real entities relate to each other. Before Lesson 6 has you click
anything, you need to answer one question for every piece of data
Cascade cares about: **what object holds this, and what is it related
to?**

For Cascade, work backward from the sales process you saw in Lesson 2:
a Lead gets qualified and converts into an Account, a Contact, and an
Opportunity; the Opportunity carries specific equipment products; when it
closes won, it spins off an Installation; many Accounts also carry a
Service Contract. That sentence alone is almost the entire data model.

## Standard objects Cascade uses

| Object | What it holds at Cascade |
|---|---|
| **Lead** | An unqualified person/company — a trade-show badge scan, a website form fill, a referral, or a dealer pass-along — before Cascade knows if it's a real opportunity |
| **Account** | A customer business: a restaurant, a hotel chain, a hospital system, a school district, a caterer, or a dealer |
| **Contact** | A person at an Account: a chef, a purchasing manager, a facilities director, a kitchen manager |
| **Opportunity** | A specific equipment deal in progress — one or more products, a dollar value, a stage, a close date |
| **Product / Price Book Entry** | Catalog items: specific ranges, ovens, coolers, dishwashers, hoods, each with a standard price |
| **Opportunity Product (Line Item)** | The specific products attached to one Opportunity — this is what makes an "equipment package" concrete |
| **Task / Activity** | Calls, site visits, and follow-ups logged against Leads, Contacts, and Opportunities |
| **Campaign** | A trade show or marketing push that generates Leads, with Leads/Contacts connected through Campaign Members |

## Custom objects Cascade needs

Standard objects stop at "deal closed." Two things happen at Cascade
*after* that point which standard objects don't model well:

### Installation Project (`Installation_Project__c`)

Tracks the on-site work that happens after an Opportunity is won.

| Field | Type | Purpose |
|---|---|---|
| Opportunity | Lookup to Opportunity | Which won deal this installation fulfills |
| Account | Lookup to Account | Denormalized for easy reporting/filtering |
| Site Address | Text | Where the equipment is being installed |
| Target Install Date | Date | Scheduled install date |
| Install Status | Picklist (Scheduled / In Progress / Complete / On Hold) | Where the installation stands |
| Lead Installer | Lookup to User | Who on Marcus Webb's team owns it |
| Equipment Summary | Long Text Area | Human-readable summary of what's being installed |

### Service Contract (`Service_Contract__c`)

Tracks recurring maintenance agreements, independent of the original
Opportunity.

| Field | Type | Purpose |
|---|---|---|
| Account | Lookup to Account | Which customer this contract covers |
| Installation Project | Lookup to Installation Project | Which installation it follows, when applicable |
| Contract Start Date | Date | When coverage begins |
| Contract End Date | Date | When coverage (or the current term) ends |
| Service Tier | Picklist (Basic / Standard / Premium) | What level of coverage |
| Annual Value | Currency | Yearly contract value, used in Chapter 4 reporting |
| Renewal Status | Picklist (On Track / At Risk / Renewed / Lapsed) | Owned by Customer Success |

Both are **Lookup** relationships to Account and Opportunity, not
**Master-Detail** — an Installation Project or Service Contract needs to
be able to outlive or stand independent of record-level ownership and
sharing tied strictly to its parent, which matters once you design
sharing rules in Lesson 4.

## The relationships, end to end

```
Lead  --(conversion)-->  Account --< Contact
                              |
                              +---< Opportunity --< Opportunity Product >-- Product
                              |         |
                              |         +--(won)--> Installation Project
                              |
                              +---< Service Contract
```

Reading this: one Account has many Contacts, many Opportunities, and many
Service Contracts (`--<` means "has many"). One Opportunity has many
Opportunity Products, each tied to one Product from the catalog. A won
Opportunity produces one Installation Project, which a Service Contract
can optionally reference.

## Why this matters before Chapter 2

Every field and relationship in this lesson gets built for real starting
in Lesson 6. Deciding it here — on paper — means Chapter 2 is execution,
not improvisation. It also means the security model in Lesson 4 can be
designed against a model that's already settled, instead of guessing at
what objects will exist.

## Key terms

| Term | Meaning |
|---|---|
| Lookup relationship | A reference between two objects where the child can exist and be reassigned independently of the parent |
| Master-Detail relationship | A tighter reference where the child's security and existence are tied to the parent |
| Opportunity Product (Line Item) | A junction-like record attaching a specific Product, quantity, and price to one Opportunity |
| Denormalized field | A field (like Account on Installation Project) duplicated onto a child object purely to make filtering/reporting easier |

## Lab

Draw Cascade's object-relationship diagram yourself — by hand or in any
diagramming tool — using the ASCII diagram above as your starting point.
Label every relationship as Lookup or Master-Detail, and write one
sentence per custom object explaining why it's a custom object instead of
a standard one.

## Check yourself

- Why do Lead, Account, Contact, and Opportunity alone not fully model
  Cascade's business?
- What does Installation Project track, and why is it a Lookup to
  Opportunity rather than Master-Detail?
- Name the two custom objects and one field unique to each.
