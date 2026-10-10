# Lesson 15 — Master Data Management

**Chapter 3 · Ownership and Consistency · Lesson 15 of 26**

## What you'll learn

- What master data management (MDM) actually solves, and what kind of data it applies to
- Why "golden record" is a useful mental model but not a term Salesforce itself commits to
- The hub-and-spoke question: should the master record live inside Salesforce, or outside it?
- How match rules and survivorship rules combine to produce a usable master record
- When MDM is genuine overkill for a given organization

## What MDM solves

A customer named "Acme Industries LLC" exists in Salesforce as an Account, in the ERP as a customer master record, and in the e-commerce platform as a shopper profile — three systems, three IDs, and three slightly different addresses because each one was entered by a different person at a different time. **Master data management** is the discipline (and often the dedicated tooling) for resolving exactly this problem: identifying that these three records describe the same real-world entity, deciding which values are correct when they conflict, and producing one authoritative version that every system can reference. MDM applies to **master data** specifically — the relatively stable, shared entities like customers, products, and locations — not to transactional data like orders or support cases, which are expected to be numerous and system-specific.

## The golden record — and why Salesforce avoids the term

The common shorthand for MDM's output is the **golden record**: the single, trusted version of a customer or product that all systems defer to. It's a useful mental model for this lesson, but worth knowing that Salesforce's own Data Cloud / Data 360 documentation deliberately avoids that language for its identity-resolution output. Instead of producing a record that overwrites or replaces the source systems, Data Cloud's identity resolution process builds a **Unified Profile** by linking source profiles together under match rules — described as a "system of reference" rather than a golden record, precisely because the underlying source records are never overwritten, only connected. You configure this under an Identity Resolution ruleset, pick a primary data model object, and attach match rules (fuzzy name matching, normalized email matching, and so on) that decide which source records represent the same person. The distinction matters architecturally: a classic MDM hub *replaces* conflicting values with one winner, while Salesforce's identity-resolution approach *links* records and lets you reason about them together without destroying the originals.

## Hub and spoke: where does the master actually live?

Every enterprise with more than one system holding customer or product data has to answer one structural question: does the master record live in a dedicated MDM hub that every system — including Salesforce — reads from and writes to, or does one of the operational systems (often Salesforce, since it's customer-facing) act as the master itself, with other systems as spokes?

| Pattern | How it works | Where it fits |
|---|---|---|
| Dedicated MDM hub | A standalone platform owns the golden record; Salesforce, the ERP, and other systems all sync to and from it | Large enterprises with 3+ systems of comparable authority over the same entity |
| Salesforce as master | Salesforce holds the authoritative record for a domain (often customer/account data) and pushes it outward | Smaller organizations, or domains where Salesforce is genuinely the primary system of engagement and entry point |
| Registry / reference model | No physical golden record exists; a thin index tracks which system has the best value for which field, and queries route accordingly | Organizations unwilling or unable to centralize, often for regulatory or latency reasons |

There's no universally correct answer here — it's a genuine architecture decision that depends on which system records data first, which system has the best data quality for a given field, and how much the organization is willing to invest in a dedicated MDM platform versus leaning on Salesforce's own tooling.

## Match and merge rules in practice

Whether the hub is dedicated or Salesforce itself, the mechanics are the same two steps:

- **Match rules** decide whether two records describe the same entity — exact match on a tax ID, fuzzy match on name plus address, normalized match on email. Too loose, and unrelated customers get merged; too strict, and obvious duplicates never get caught.
- **Survivorship rules** decide, once two records are matched, which field values win. A common rule is "most recently updated wins," but that's often wrong — a phone number updated yesterday by a data-entry error shouldn't beat a phone number verified six months ago by a signed contract. Mature survivorship rules are field-by-field and source-aware: trust the ERP for billing address, trust Salesforce for the primary contact name, trust neither for a field both systems treat as a guess.

## When MDM is overkill

Not every organization needs a dedicated MDM program. If an organization has exactly one system of record for customer data and every other system is a genuine read-only consumer of it, there's no conflicting-sources problem to solve, and standing up MDM tooling is solving a problem that doesn't exist yet. MDM earns its cost when there are genuinely multiple systems that can each independently create or edit the same kind of master data — which is the normal state for any enterprise running Salesforce alongside an ERP and a handful of other customer-facing tools, but not automatic just because the systems exist.

## Key terms

| Term | Meaning |
|---|---|
| Master data management (MDM) | The discipline of reconciling master data (customers, products, locations) across multiple systems into one trusted version |
| Master data | Stable, shared entity data — customers, products, locations — as distinct from high-volume transactional data |
| Golden record | The common term for MDM's single trusted output record; used as a general concept in this lesson |
| Unified Profile | Salesforce Data Cloud's identity-resolution output, described as a "system of reference," which links source records rather than overwriting them |
| Match rule | Logic that decides whether two records from different sources describe the same real-world entity |
| Survivorship rule | Logic that decides which field value wins once two records are matched to the same entity |

## Lab

A mid-size retailer has three systems that can each independently create or edit customer records: Salesforce Sales Cloud, a SAP ERP, and a Magento e-commerce storefront. All three currently disagree about the correct billing address for several hundred customers, and no system is treated as more authoritative than the others today. Propose: (1) which hub-and-spoke pattern fits this situation and why, (2) a match-rule approach for identifying the same customer across the three systems, and (3) a survivorship rule for the billing-address conflict specifically — naming which source should generally win and why, rather than defaulting to "most recently updated."

## Check yourself

Can you explain why Salesforce's own Data Cloud documentation avoids the term "golden record" for its identity-resolution output, and what it uses instead? Can you describe the difference between a match rule and a survivorship rule, and give an example of a survivorship rule that is *not* simply "most recent value wins"?
