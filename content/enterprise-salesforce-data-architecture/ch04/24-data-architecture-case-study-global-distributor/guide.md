# Lesson 24 — Data Architecture Case Study: Global Distributor

**Chapter 4 · Applying Data Architecture · Lesson 24 of 26**

## What you'll learn

- How to apply this course's data-modeling, storage, and ownership principles together on one realistic scenario
- How org strategy, relationship design, and archiving decisions interact rather than being made in isolation
- How to justify a specific data-architecture decision against a company's concrete constraints, not in the abstract
- What a real architecture case study looks like when it's written up for stakeholders

## Meet Halvorsen Industrial Supply

Halvorsen Industrial Supply distributes industrial parts across 34 countries through a mix of direct sales, regional distributors, and an e-commerce storefront. It runs 11 million Account records (mostly business accounts — distributors, resellers, and large end-customer accounts), 60 million closed Order records going back nine years, and roughly 4 million open Opportunity and Order records actively worked at any time. Each region has its own pricing, currency, and in some cases its own regulatory reporting requirement (the EU operations in particular need to produce VAT-compliant transaction records on demand). Halvorsen is on a single Salesforce org today and wants to stay that way if the data architecture can support it.

## Applying the single-org decision (Lesson 20)

Halvorsen's case for staying single-org is strong: the business genuinely operates as one integrated supply chain, with the same Account and Order concepts meaning the same thing everywhere, and leadership wants one global view of distributor performance. The regulatory wrinkle — EU VAT reporting — doesn't by itself require a separate org; it requires that VAT-relevant fields exist on the Order model and that EU records can be reliably queried and exported on demand, which a single org with the right fields and reporting can do. A separate EU org would solve data residency concerns Halvorsen doesn't actually have (EU law requires certain processing and reporting behavior, not that the data physically sit in EU-only infrastructure, in this scenario), so Halvorsen's architect recommends staying single-org and solving the VAT requirement with a well-designed field model and report, not a second org.

## Applying relationship design and skew avoidance (Lessons 3, 4, 11)

With 60 million closed Orders related to 11 million Accounts, naive master-detail relationships from Order down to Account risk exactly the kind of parent-account skew this course's Lesson 11 describes: a handful of large distributor accounts could end up owning hundreds of thousands of child Orders each, concentrating lock contention on those specific parent records during any bulk update. Halvorsen's architect designs Order as a lookup to Account (not master-detail), since Orders don't need to inherit Account's sharing or be deleted when an Account is deleted, and recommends a secondary review of exactly which distributor accounts are accumulating the highest Order counts, so manual ownership or sharing adjustments can head off skew before it becomes a performance incident.

## Applying storage and archiving strategy (Lessons 8, 9, 13)

Nine years of closed Orders sitting in the standard Order object is a storage-and-performance cost with shrinking business value — closed orders from five years ago are rarely queried, but their sheer volume still slows down every report and query that touches the Order object. Halvorsen's architect recommends archiving Orders older than three years into a Big Object, which keeps them queryable (for the rare VAT audit reaching back further than three years) without them counting against the primary object's active-record footprint or slowing down day-to-day Order queries on current business.

## The write-up

A real case-study write-up for Halvorsen's leadership would state the recommendation (stay single-org), name the three supporting design decisions (lookup over master-detail for Order-to-Account, targeted skew monitoring on large distributor accounts, a three-year Big Object archiving cutoff for closed Orders), and name the one specific business requirement each decision protects — VAT reporting capability, performance under bulk updates, and ongoing query performance as Order volume keeps growing. That's what separates a real architecture recommendation from a generic best-practices list: every decision ties back to one of Halvorsen's actual numbers or actual constraints.

## Key terms

| Term | Meaning |
|---|---|
| Parent-account skew | A small number of parent Accounts accumulating disproportionately many child records, risking lock contention |
| VAT-compliant reporting | A regulatory reporting requirement (common in EU jurisdictions) that doesn't itself require separate data residency |
| Archiving cutoff | The age or status threshold past which records move out of a primary object into an archive (such as a Big Object) |

## Lab

Halvorsen's e-commerce storefront is about to launch in three new countries, expected to add 8 million new individual-consumer Contact records (not Accounts) over two years, a volume and shape of data very different from its existing business-account model. Using this lesson's reasoning style, write a short recommendation on whether these consumer contacts should go on the existing Contact/Account model, a Person Account model (Lesson 7), or a separate object entirely — and name the specific tradeoff your recommendation accepts.

## Check yourself

Can you explain why a separate EU org wasn't the recommended fix for Halvorsen's VAT reporting requirement? Can you walk through, in order, why lookup was chosen over master-detail for Order-to-Account specifically in this scenario?
