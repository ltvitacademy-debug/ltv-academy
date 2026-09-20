# Reading a Real Org's Data Model

This is the chapter finale, and it's deliberately practical: a small, realistic data model,
walked through the way an analyst actually reads one — before writing a single query. Every
concept from this chapter (relationship types, junction objects, Schema Builder) shows up
here as something you use, not just something you can define.

## What you'll learn

- A worked, realistic data model: Accounts, Contacts, Opportunities, OpportunityLineItems, and
  Products
- A repeatable process for reading an unfamiliar data model before querying it
- How to reason about cardinality (one-to-many vs. many-to-many) from relationship names alone

## The data model

Here's a small, realistic slice of a Sales Cloud org:

- **Account** — a company. Has many related Contacts and many related Opportunities.
- **Contact** — a person at an Account. Each Contact has one `AccountId` (Lookup to Account).
- **Opportunity** — a deal in progress, tied to one Account via `AccountId` (typically a
  Lookup, sometimes configured as required).
- **OpportunityLineItem** — one product line on one Opportunity (a Master-Detail child of
  Opportunity — it cannot exist without an Opportunity, and deleting the Opportunity deletes
  its line items).
- **Product2** — the product catalog. Each OpportunityLineItem has an `PricebookEntryId`
  which in turn ties back to a Product, so line items connect to products indirectly through
  pricebook entries.

## A repeatable process for reading it

1. **Start at the object you were actually asked about.** If the request is "opportunity
   revenue by product," start at OpportunityLineItem — it's the object that already connects
   an Opportunity to a product-level amount.
2. **Follow each relationship one hop at a time, and name the cardinality.** OpportunityLineItem
   to Opportunity is many-to-one (many line items, one Opportunity) — that's a Master-Detail,
   so every line item is guaranteed to have exactly one Opportunity. Opportunity to Account is
   many-to-one as well.
3. **Check whether any hop is many-to-many, and look for a junction.** Nothing in this slice
   is many-to-many, but if it were — say, if Products needed to relate to multiple Campaigns —
   you'd expect a junction object in between, the way CampaignMember sits between Contact and
   Campaign.
4. **Only now, write the query mentally.** "Opportunity revenue by product" becomes: start at
   OpportunityLineItem, roll up its Amount, grouped by the product it points to (through the
   pricebook entry), optionally filtered by the Opportunity's Account. You know this is a safe
   plan *before* touching SOQL, because you've already confirmed how each object connects and
   what guarantees (like Master-Detail's mandatory link) you can rely on.

## Why this process, not guessing

Skipping straight to writing a query against field names you've half-memorized is how an
analyst produces a query that runs — and returns a number that's subtly wrong, because it
silently dropped records through an optional Lookup, or double-counted through an unexpected
many-to-many. Reading the model first, the way this lesson just did, is slower for the first
thirty seconds and faster for the rest of the project.

## Key terms

| Term | Meaning |
|---|---|
| Cardinality | Whether a relationship is one-to-many, many-to-one, or many-to-many |
| OpportunityLineItem | A Master-Detail child of Opportunity representing one product line |
| PricebookEntry | The link between an OpportunityLineItem and its Product |

## Check yourself

Given this chapter's data model, why is it safe to assume every OpportunityLineItem has
exactly one Opportunity, with no missing or null cases to worry about?
