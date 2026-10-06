# Enterprise Structure Design Decisions

You learned the mechanics of legal entities, business units, and ledgers in the Enterprise Structures and Chart of Accounts course. This lesson looks at them from a different angle: as implementation deliverables that have to be decided earliest of all, and are unusually expensive to change once the project moves forward.

## What you'll learn

- Why enterprise structure decisions carry more "blast radius" than almost any other setup
- The core decisions that have to be locked down early: legal entities, business units, ledgers, and reference data sets
- How these decisions get documented and approved before anything else is configured
- How Brightfield's structure decisions shaped everything that came after

## Why these decisions come first

Almost every other setup object in Oracle Fusion Financials — a bank account, a payment term, a reconciliation rule, a security role — is assigned to or scoped by a legal entity, a business unit, or a ledger. Changing a chart of accounts structure or splitting a business unit after go-live typically means re-running historical reporting, re-pointing integrations, and sometimes re-migrating data. That's why enterprise structure decisions are front-loaded into the earliest part of the Design phase, well before configuration workbooks for individual modules are finalized.

## The core decisions

- **Legal entities** — the registered companies the business operates as, each with its own balance sheet and statutory reporting obligations.
- **Business units** — the operational units that process transactions (an AP business unit, a receivables business unit), which may map one-to-one with legal entities or may be shared across several.
- **Ledgers** — defined by the "4 Cs": **C**hart of accounts, **C**alendar, **C**urrency, and accounting **C**onvention (the subledger accounting method). One ledger per unique combination of these four is the general rule.
- **Reference data sets** — groups of reference data (like payment terms or tax rules) that can be shared across business units or kept separate, balancing standardization against the flexibility each unit actually needs.

## Documenting and approving these decisions

Because the blast radius is so large, enterprise structure decisions typically get their own design document, reviewed not just by one Business Process Owner but by finance leadership across every ledger and legal entity affected — often including an external auditor or controller's office, since the chart of accounts structure directly shapes future financial statements. This approval happens before individual-module configuration workbooks (Lesson 8) are finalized, because every one of those workbooks assumes the enterprise structure is already settled.

## Brightfield Industrial Group: the structure decision

Brightfield decides on a single US legal entity (its Canadian subsidiary is deferred to a later phase per Lesson 3's scope statement), two business units (one for AP/Procurement, one for AR/Order Management) sharing a single ledger, and one reference data set used by both business units rather than two separate ones — a decision finance leadership approves specifically to keep payment terms and tax rules consistent across Brightfield's US operations rather than risk drift between departments.

## Key terms

| Term | Meaning |
|---|---|
| Legal entity | A registered company with its own statutory reporting obligations |
| Business unit | An operational unit that processes transactions |
| The 4 Cs | Chart of accounts, Calendar, Currency, Convention — defines a ledger |
| Reference data set | A shared or separate grouping of reference data across business units |

## Recap

Enterprise structure decisions — legal entities, business units, the ledger's 4 Cs, and reference data sets — carry the largest blast radius of any implementation decision, so they're locked down and approved earliest, ahead of individual module workbooks. Brightfield's single-ledger, two-business-unit structure with a shared reference data set shaped every configuration workbook that followed. Next up, lesson 10: turning design decisions into formal business process design and solution design documents.
