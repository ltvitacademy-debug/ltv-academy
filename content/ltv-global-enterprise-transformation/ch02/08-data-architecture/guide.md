# Lesson 8 — Data Architecture

**Chapter 2 · Core Architecture · Lesson 8 of 33**

## What you'll learn

- How to assign a system of record for each kind of data across LTV Global's landscape
- Why Salesforce is not the system of record for everything, even in a Salesforce-centric design
- The core data-ownership map this capstone uses for the rest of the course
- Why getting ownership wrong is a more common enterprise mistake than getting any single object's fields wrong

## Data architecture starts with ownership, not objects

Before designing a single custom object, a Technical Architect has to answer a more fundamental question: for each category of data in the business, which system is the **system of record** — the one place whose data is treated as authoritative when systems disagree? Getting this wrong is a classic, expensive enterprise mistake: an organization replicates the same entity into two systems, neither one is clearly authoritative, and the two copies quietly drift apart until nobody trusts either of them. Data architecture is the discipline of deciding ownership deliberately, before any replication happens, rather than discovering the conflict after two systems have already diverged.

## LTV Global's system-of-record map

| Data category | System of record | Why |
|---|---|---|
| Product, inventory, manufacturing/supply-chain orders | Meridian ERP | Pre-dates Salesforce, actively maintained, real-time-capable |
| General ledger, AP, AR, financial transactions | LedgerPoint | Core financial infrastructure LTV Global has no appetite to replace |
| Account, Contact, Opportunity, Case, Equipment Asset ownership | Salesforce | The customer-facing, relationship-owning system this transformation centers on |
| Cross-system reporting and historical analytics | Snowflake | Receives extracts from the other three; owns no transactional data of its own |
| Workforce identity | Okta | The existing corporate identity provider (Lesson 12 covers this fully) |

Notice that Salesforce is deliberately **not** the system of record for product, inventory, or financial transactions — a common instinct for a Salesforce-centric project is to want everything to "live in Salesforce," and this design explicitly rejects that instinct. Salesforce owns the customer relationship; Meridian and LedgerPoint keep owning what they already own well.

## What Salesforce actually stores, and what it only references

Given that ownership map, Salesforce's own data model is deliberately selective about what it replicates versus what it merely references:

- **Replicated into Salesforce, because Salesforce needs to act on it directly:** core Account/Contact/Opportunity/Case data; a synced copy of Product2 records and current inventory-availability fields from Meridian, refreshed on the cadence Lesson 14 defines, so a sales rep doesn't need to leave Salesforce to see whether equipment is in stock.
- **Summarized into Salesforce, not fully replicated:** AR and invoice status from LedgerPoint — enough for a service rep to see "this account has an overdue invoice" without Salesforce storing full general-ledger line detail, which belongs to LedgerPoint alone and would bloat Salesforce's storage for no benefit any Salesforce user actually needs.
- **Never stored in Salesforce at all:** full historical financial transactions and deep inventory-movement history — that analysis happens in Snowflake, against extracts pulled from the systems that actually own that data.

## Why this matters for everything that comes next

This ownership map is the foundation Lesson 9's detailed data model is built on, the reason Lesson 14's ERP/financial integration is designed the way it is, and the reason Lesson 15's data warehouse integration exists at all — Snowflake's whole purpose is to answer the cross-system questions no single system of record can answer alone. It's also the single most defensible fact pattern in this entire capstone during the Chapter 6 ARB defense: a board member asking "why doesn't Salesforce just store the full ledger" has a clean, principled answer, not an improvised one.

## Key terms

| Term | Meaning |
|---|---|
| System of record | The one system whose data is treated as authoritative for a given category of information |
| Data ownership map | A structured assignment of which system owns which category of data across the landscape |
| Replication | Copying a system of record's data into another system so that system can act on it directly |
| Summarization | Copying only a reduced, derived view of a system of record's data, rather than full detail |

## Lab

A new stakeholder proposes: "Let's just replicate LedgerPoint's full general ledger into Salesforce nightly, so Finance has everything in one place." Using this lesson's ownership map and the distinction between replication and summarization, write a three-sentence response explaining what's wrong with this proposal and what you'd recommend instead.

## Check yourself

Can you state, from memory, which system is the system of record for each of LTV Global's five data categories? Can you explain the difference between data that's replicated into Salesforce, data that's only summarized, and data that's never stored there at all — using one LTV Global example of each?
