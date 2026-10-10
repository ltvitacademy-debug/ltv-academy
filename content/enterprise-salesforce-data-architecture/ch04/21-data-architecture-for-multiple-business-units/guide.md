# Lesson 21 — Data Architecture for Multiple Business Units

**Chapter 4 · Applying Data Architecture · Lesson 21 of 26**

## What you'll learn

- How to design a shared data model for a company that has chosen to stay on a single org with multiple business units
- The specific schema techniques that let business units diverge without forking the object model entirely
- Where record-level separation (not org-level separation) is the right tool
- Why a shared Account/Contact base with business-unit-specific extensions is the common pattern

## Staying on one org, serving several businesses

Lesson 20 covered the decision between one org and many. This lesson assumes the company chose to stay on a single org — the common case — and asks the follow-up architectural question: multiple business units now have to share one data model without that model collapsing into either rigid uniformity (forcing every unit into identical fields and processes that don't fit) or chaos (every unit bolting on its own disconnected custom objects). A multi-business-unit data architecture has to let both things be true: a genuinely shared customer record, and genuinely different processes layered on top of it.

## A shared core, with extensions

The pattern that works in practice is a shared core of standard objects — Account, Contact, Opportunity — that every business unit uses for the concepts that really are the same across the company (this is still "the customer," still "the deal," no matter which unit is selling to them), with business-unit-specific detail captured through extensions rather than parallel object trees. Three extension techniques do most of the work:

- **Record types.** A single object (say, Opportunity) can carry different page layouts, different picklist values, and different required fields per business unit through record types, while the underlying schema — and therefore every report that queries across record types — stays unified.
- **A Business Unit field.** A picklist or lookup field on the shared objects identifying which business unit a record belongs to turns "which unit owns this" into a queryable, reportable attribute instead of something inferred from which custom object a record happens to live in.
- **Business-unit-specific child objects.** Where a business unit genuinely tracks something no other unit has any analog for — a manufacturing unit's warranty claims, a services unit's project milestones — that detail belongs in its own custom object, related back to the shared Account or Opportunity, rather than forced into generic fields on the shared object that only make sense for one unit.

## Where record-level separation does the real work

Once business units share an object model, the next question is visibility: should Business Unit A's sales reps see Business Unit B's opportunities? This is answered with Salesforce's sharing model, not with separate schemas — role hierarchy, sharing rules, and territory management (where applicable) scope who sees which records of the same shared object, keyed off that Business Unit field or an owning role. This is the single-org equivalent of the isolation a multi-org strategy buys at the cost of a separate database: you get per-business-unit visibility control without losing the single shared schema that makes cross-business reporting possible.

## Reporting across and within business units

The payoff for doing this well is that a single report or dashboard can show company-wide Opportunity data by filtering or grouping on the Business Unit field, while a business-unit-specific dashboard filters down to just that unit's records — the same underlying data serving both views, because it was modeled once instead of being forked into separate per-unit objects that would each need their own report built and maintained.

## When this pattern breaks down

This approach has a real limit. If two business units' definitions of "Opportunity" or "Account" have diverged so far that record types and a Business Unit field can't reconcile them without an unmanageable thicket of conditional page layouts and validation rules, that's a signal the units may not actually belong on a shared object model — and it's worth re-opening the multi-org question from Lesson 20, or at minimum isolating that one object into a business-unit-specific custom object rather than forcing it to stay shared.

## Key terms

| Term | Meaning |
|---|---|
| Shared core objects | Standard objects (Account, Contact, Opportunity) used consistently across all business units |
| Record type | A Salesforce feature letting one object carry different layouts, picklists, and required fields per business process or business unit |
| Business Unit field | A field on shared objects identifying which business unit a record belongs to, enabling filtering and sharing by unit |
| Record-level separation | Controlling visibility of individual records (via sharing rules, role hierarchy) rather than separating the schema or org itself |

## Lab

A single Salesforce org serves three business units: Retail, Wholesale, and Services. All three sell to customers tracked as Accounts, but Wholesale needs a credit-limit field that means nothing to Retail, and Services tracks project milestones that neither other unit has. Design the data model: which fields belong on the shared Account/Opportunity objects, which need a Business Unit field for filtering, which business-unit-specific detail belongs in a separate custom object, and whether record types or a separate object makes more sense for Wholesale's credit-limit tracking. Justify each choice.

## Check yourself

Can you name the three extension techniques (record types, a Business Unit field, business-unit-specific child objects) and explain when each is the right tool? Can you explain why record-level separation via sharing rules is the single-org equivalent of what a separate org buys you at a much higher integration cost?
