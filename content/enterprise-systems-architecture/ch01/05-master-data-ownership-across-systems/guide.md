# Lesson 5 — Master Data Ownership Across Systems

**Chapter 1 · Salesforce in the Enterprise · Lesson 5 of 22**

## What you'll learn

- What master data is, and why it's treated differently from transactional data
- The idea of a "golden record" and why master data management (MDM) exists to produce one
- How master data ownership decisions connect directly to the systems-of-record work from Lesson 3
- What goes wrong when no single system is designated as the owner of a master data entity

## Master data versus everything else

**Master data** is the core, slow-changing business entities an enterprise refers to repeatedly across many processes — customers, accounts, products, vendors, employees, locations. It's distinct from **transactional data** (an individual order, a specific case, a single invoice line) in that transactional data references master data rather than duplicating it: an order references a specific customer and product, rather than re-describing who that customer is every time. Because master data gets referenced everywhere, an inconsistency in it — two slightly different spellings of the same company name, two different addresses for the same account — doesn't stay contained to one process. It propagates into every report, every integration, and every downstream decision that touches that entity.

## The golden record problem

In any enterprise with more than one system, the same master data entity usually exists in more than one place: a customer might exist in Salesforce, in the ERP, in a marketing platform, and in a support system, each with its own record ID and potentially its own slightly different version of the "truth" about that customer. **Master Data Management (MDM)** is the discipline of reconciling these into a single, trusted **golden record** — the one version of a given entity's core attributes that the enterprise agrees is correct, even though multiple systems may still hold their own local copies for operational reasons.

Getting to a golden record isn't automatic. It requires matching records across systems that may use different identifiers, resolving conflicts when two systems disagree about the same attribute, and deciding which system's value wins when they do — all decisions a System Architect is frequently pulled into, because they determine what Salesforce's own record for that entity should actually contain and how confidently it can be trusted.

## This is systems-of-record work, applied to master data specifically

Lesson 3 introduced the idea that every shared fact needs exactly one system of record. Master data ownership is that same principle applied to the enterprise's most foundational entities. For a typical enterprise, you'll often find: the ERP or a dedicated MDM platform is the system of record for the core legal/billing identity of a customer or vendor, Salesforce is the system of record for the sales relationship facts about that same customer (primary sales contact, account tier, territory assignment), and an HR system is the system of record for employee master data that Salesforce might consume for approval routing but never originates.

## What happens with no designated owner

Without an explicit master data ownership decision, the common failure is each system quietly treating itself as authoritative, which recreates exactly the "dueling systems of record" problem from Lesson 3 — except now at the scale of the enterprise's most heavily referenced entities, where the damage compounds across every process that touches that data. A customer account with three different billing addresses across three systems isn't a minor nuisance; it's a data-quality failure that shows up in invoicing errors, failed deliveries, and reports that don't reconcile, and it's exactly the kind of problem a System Architect is expected to have prevented at the design stage, not discovered after go-live.

## Key terms

| Term | Meaning |
|---|---|
| Master data | The core, slow-changing business entities (customers, accounts, products, vendors) referenced repeatedly across processes |
| Transactional data | Individual business events (an order, a case, an invoice line) that reference master data rather than duplicating it |
| Golden record | The single, trusted, agreed-upon version of a master data entity's core attributes |
| Master Data Management (MDM) | The discipline of reconciling master data across systems into a golden record |

## Lab

Using the same company from earlier labs, pick its "Customer" or "Account" entity. List the systems you believe would each hold their own copy of a given customer's data (at minimum: Salesforce, the ERP, and one more). For each system, state what specific attribute of that customer it should be the system of record for, following Lesson 3's field-level-authority principle. Then write two sentences on what a golden record process would need to do to reconcile these into one trusted view.

## Check yourself

Can you explain the difference between master data and transactional data with an example of each? Can you describe, in your own words, what a golden record is and why producing one requires more than just picking one system and ignoring the others?
