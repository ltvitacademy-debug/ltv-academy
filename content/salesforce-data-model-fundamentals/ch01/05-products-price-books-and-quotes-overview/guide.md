# Products, Price Books and Quotes Overview

**Chapter 1 · Objects · Lesson 5 of 23**

An Opportunity (Lesson 4) tracks a deal, but most real deals are about something specific: a set of
products at a set of prices. This lesson is a first-pass overview of the three objects behind that —
later chapters go deeper on their fields and relationships.

## What you'll learn

- What a Product is, and why it exists independently of any one deal
- Why a Price Book exists as its own layer, separate from the Product itself
- What a Quote is for, and how it differs from an Opportunity's line items

## Product: the thing being sold

A **Product** (object name `Product2`) represents something your org sells — a physical item, a
service, a subscription tier. Products are defined once and reused: the same "Installation: Standard"
product can be added to dozens of different Opportunities over time, rather than being re-created
for each deal.

## Price Book: the same product, different prices

A **Price Book** is a named price list. Every org has one **Standard Price Book** that every Product
must have an entry in before it can be sold anywhere. Beyond that, an org can define **custom price
books** — for example, different pricing for an enterprise segment versus a small-business segment.
The link between a specific Product and a specific Price Book, at a specific price, is its own
record: a **Price Book Entry**. This is why pricing is a separate layer from the Product itself — the
same solar panel can have more than one price, depending on which Price Book it's being sold from.

## Quote: a formal snapshot for a customer

Once products are added to an Opportunity (as **Opportunity Products**, also called line items), a
**Quote** can turn that into a formal, customer-facing document — complete with its own page layout,
its own fields (expiration date, discount, shipping), and the ability to generate a PDF or sync
changes back to the Opportunity's line items. A Quote isn't just a report pulled from an Opportunity;
it's its own record, which is why an Opportunity can have multiple Quotes (one for each round of
negotiation) while only one is marked as the Opportunity's Primary Quote at a time.

## Key terms

| Term | Meaning |
|---|---|
| Product (Product2) | The thing being sold, defined once, reused across deals |
| Price Book | A named price list a Product must belong to before it can be sold |
| Price Book Entry | The specific price linking one Product to one Price Book |
| Quote | A formal, printable/emailable snapshot of products and prices for one deal |

## Recap

- Products are defined independently of any single Opportunity and reused across many.
- A Price Book Entry is what actually sets a price — a Product alone has no price.
- A Quote is its own record with its own layout, built to be exported or emailed, not just a report.

## Check yourself

Why can't a brand-new Product be added to an Opportunity the moment it's created, before anyone has
touched a Price Book?
