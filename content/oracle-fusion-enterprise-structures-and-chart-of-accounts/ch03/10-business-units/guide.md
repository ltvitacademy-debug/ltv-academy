# Business Units

Legal entities and ledgers answer "who legally exists" and "what book records it." Neither one actually processes a transaction. That job belongs to the **business unit** — the structure this lesson covers, and the one you will touch constantly in every later Oracle Fusion Financials course.

## What you'll learn

- What a business unit actually is, in concrete operational terms
- How a business unit relates to a legal entity and a ledger at the same time
- Why one legal entity can contain multiple business units, and vice versa
- A first look at why business units matter for reference data (expanded in Lesson 12)

## What a business unit is

A **business unit (BU)** is an operational, transaction-processing organization — a department, division, region, or line of business — that performs specific business functions and owns specific transactions. When an accounts payable clerk enters a supplier invoice, or a sales rep enters an order, that transaction is entered *in the context of a business unit*. The business unit is what Oracle Fusion uses to answer "which set of policies, which approval rules, and which ledger does this transaction belong to?"

```
A Business Unit:
  - Processes transactions (invoices, orders, requisitions...)
  - Is assigned to exactly one primary ledger
  - Is usually (but not always) associated with one legal entity
  - Performs one or more "business functions" (Lesson 11)
```

## How it relates to legal entities and ledgers

A business unit is assigned to a ledger — specifically, the primary ledger that will record its transactions' accounting impact — and it is typically associated with a legal entity, since many business functions (like invoicing) are legally meaningful acts performed on behalf of a specific legal entity. That said, the relationship between legal entities and business units is not strictly one-to-one in either direction:

- A single **legal entity** might contain several business units (e.g., separate business units for manufacturing and distribution within the same company).
- A single **business unit** might, in some configurations, process transactions on behalf of more than one legal entity, acting as a shared service provider (more on this in Lesson 11).

## Why this distinction matters

New consultants sometimes assume "legal entity" and "business unit" are just two names for the same thing. They are not, and conflating them causes real design mistakes. The legal entity is about legal and statutory obligations; the business unit is about *how the company actually organizes its operational work*. A company might be one single legal entity but run three completely separate business units — East Region Sales, West Region Sales, and Manufacturing — each with its own approval hierarchies and reference data, while all three post into the same ledger behind the same legal entity.

## A preview: business units and reference data

Business units are also the mechanism Oracle Fusion uses to control which company policies — payment terms, tax rules, approval limits, and more — apply to a given transaction. That control happens through **reference data sets**, assigned to business units, which Lesson 12 covers in full. For now, just remember: the business unit is the "lens" a transaction is viewed through to determine which rules apply.

## Recap

A business unit is the operational structure that actually processes transactions, assigned to a ledger and usually a legal entity, but distinct from both. Next up, lesson 11: business unit functions and assignments — exactly which jobs a business unit can be configured to do.
