# Lesson 12 — Customer Master

**Chapter 3 · Master Data Domains · Lesson 12 of 25**

## What you'll learn

- What belongs in a customer master record, and why it's more than a name and address
- The party model: how MDM systems represent both individuals and organizations as "customers"
- Why the same real-world customer ends up with different IDs in different systems
- Customer hierarchies — the corporate-family-tree problem for B2B customers

## What a customer master record actually holds

A **customer master** is the authoritative record of every party an organization sells to, bills, or supports. It's the first domain most MDM programs tackle because the pain of *not* having one is so visible: a customer calls support, and the rep can't tell that the same company also has three open invoices and a subscription under slightly different names.

A mature customer master record typically carries: a unique customer ID, legal name and any trading/"doing business as" names, one or more addresses (billing, shipping, legal), tax identifiers, primary contacts, customer type or segment, status (active, prospect, inactive), and the relationships that tie it to other customer records. None of that is transactional — it doesn't change every time an order ships. That stability is exactly what makes it master data rather than transactional data (Lesson 2).

## Individuals and organizations: the party model

Most MDM platforms model "customer" using a **party model**: a generic "party" entity that can be either a **person** (individual) or an **organization** (company), with a role — customer, vendor, employee — layered on top. The same party can hold multiple roles at once; a sole proprietor can be both a customer and a vendor of the same company.

This matters for customer master specifically because B2C and B2B customers need different attributes. An individual customer's master record centers on name, date of birth (where legally needed), and household or loyalty-account relationships. An organization customer's record centers on legal entity name, industry classification, and — critically — its place in a corporate hierarchy.

## Why one customer becomes five records

The classic customer-master problem: "Acme Inc.", "ACME INCORPORATED", "Acme, Inc", and "Acme Corp (NY branch)" all exist as separate rows across CRM, billing, and the e-commerce platform, each with its own system-generated ID. No single system was wrong — each one just captured what it needed, when it needed it, with no shared key.

This is precisely the matching and consolidation problem from Chapter 2: customer master is the domain where deterministic matching (Lesson 7), deduplication (Lesson 8), and golden records (Lesson 9) are applied most often in practice, because customer data arrives from the widest variety of sources — web forms, sales reps, support tickets, acquired companies' systems — each with inconsistent formatting and no agreed identifier.

## Customer hierarchies: the corporate family tree

A single corporate customer rarely stands alone. "Acme Inc." might be the ultimate parent of "Acme Manufacturing LLC" and "Acme Europe GmbH," each of which places its own orders and gets its own invoice, but all of which should roll up to one view for credit limits, discount tiers, and account management.

Representing this requires a **hierarchy**: a parent-child structure layered on top of the flat customer records (Lesson 16 covers hierarchy mechanics in general). Getting the hierarchy right — and keeping it current as companies merge, get acquired, or restructure — is often harder than deduplicating the base records, because the "correct" hierarchy is a business judgment (who really controls purchasing decisions?), not just a data-matching exercise.

## Key terms

| Term | Meaning |
|---|---|
| Party model | A data model where "party" is generic (person or organization) and roles like customer or vendor attach on top |
| Trading name / DBA | A name a legal entity does business under, which may differ from its registered legal name |
| Ultimate parent | The top entity in a corporate customer hierarchy that other related accounts roll up to |
| Customer segment | A classification (e.g., enterprise, SMB, consumer) used to apply different service or pricing rules |

## Lab

Pick a company you've been a customer of that has multiple divisions or subsidiaries (a bank with a mortgage arm, a retailer with a credit-card issuer, a telecom with a separate business unit). Sketch what you believe its customer hierarchy looks like from your own experience as a customer — where would your account sit, and what would the "ultimate parent" be? Note one place the hierarchy probably isn't obvious even to the company itself.

## Check yourself

What is the party model, and why does representing "customer" this way help an MDM system handle both individuals and organizations without two separate, disconnected data structures?
