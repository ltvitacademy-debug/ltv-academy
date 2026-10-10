# Lesson 17 — Systems of Record Across the Enterprise

**Chapter 3 · Ownership and Consistency · Lesson 17 of 26**

## What you'll learn

- The difference between a system of record and a system of engagement
- Why a single enterprise legitimately has many systems of record, not one
- Where Salesforce typically sits in that landscape, and why that varies by data domain
- How to build a systems-of-record map as a concrete architecture deliverable
- What breaks when the map is wrong, missing, or simply never written down

## System of record vs. system of engagement

A **system of record** is the authoritative source for a specific piece of data — the place where, if every other system disagreed with it, this system would be assumed correct. A **system of engagement** is where people actually interact with the data day to day, which may or may not be the same system. The distinction matters because the two roles get conflated constantly: the system people spend the most time in *feels* authoritative, whether or not it actually is. A sales rep lives in Salesforce all day, every day — which can create the impression that Salesforce is the system of record for everything the rep sees, including fields that are actually mastered elsewhere and merely displayed or synced into Salesforce for convenience.

## Why one enterprise has many systems of record

It's a mistake to look for "the" system of record for an enterprise, as if there's exactly one correct answer. A mid-size company might reasonably have five or six, each authoritative for a different **data domain**:

| Data domain | Typical system of record | Why |
|---|---|---|
| Customer master (name, account hierarchy) | CRM (Salesforce) or a dedicated MDM hub | Sales and service teams create and correct this data first |
| Financial transactions, GL postings | ERP (e.g., SAP, Oracle Financials) | Statutory and audit requirements demand a single, controlled financial ledger |
| Employee and HR data | HRIS (e.g., Workday) | Legal, payroll, and compliance obligations require one controlled source |
| Product catalog | PIM (product information management) or ERP | Product data is created once by product/supply-chain teams, consumed everywhere |
| Support cases, service history | CRM (Salesforce Service Cloud) | Service interactions originate and are tracked there |

None of these is "more correct" than the others in general — each is correct *for its own domain*. The architecture problem isn't choosing one system to be authoritative for everything; it's correctly assigning each domain to the one system that should be trusted for it, and making sure every other system treats that domain as a read-only (or carefully reconciled) copy.

## Where Salesforce typically sits

Salesforce is, by design, a customer-engagement platform first — which is exactly why it's common for Salesforce to be the system of record for data domains close to that purpose (account relationships, opportunity pipeline, case history, activity history) while being merely a system of engagement — a convenient, synced display — for domains that are mastered elsewhere. Billing and invoicing data typically lives in an ERP's general ledger and flows into Salesforce for sales visibility, not the other way around; a sales rep viewing an invoice balance in Salesforce is looking at a copy, not the authoritative figure. Getting this backwards — treating Salesforce-displayed financial data as if it were the system of record, or trying to make the ERP authoritative for live opportunity pipeline — is a common and expensive architecture mistake, because it routes correction effort and integration direction the wrong way.

## Building a systems-of-record map

The concrete deliverable an architect produces from this lesson's concepts is a **systems-of-record map**: a table, maintained and reviewed periodically, that names every major data domain in the enterprise and states, unambiguously, which system is authoritative for it, which systems are read-only consumers, and which direction data flows in an integration. This map does the same job for data domains that the RACI matrix in Lesson 14 did for ownership roles — it converts an implicit, contested assumption into an explicit, agreed-upon statement that new integrations and new reports can be built against without re-litigating the question every time.

## What happens when the map is wrong

Without an explicit systems-of-record map, integrations get built on assumption rather than agreement, and the failure mode is specific: two systems both get write access to the same domain because nobody ever decided which one should be read-only, and they drift apart silently until a reconciliation report surfaces thousands of mismatched records. Or an integration gets built in the wrong direction — syncing a "corrected" value from the system of engagement back into the actual system of record — and a controlled financial or HR dataset gets corrupted by a well-intentioned sales operations fix. The map doesn't prevent every data-quality problem, but it prevents the specific, expensive category of problem that comes from nobody having agreed, in writing, which system was supposed to be trusted in the first place.

## Key terms

| Term | Meaning |
|---|---|
| System of record | The authoritative source for a specific piece of data |
| System of engagement | Where users interact with data day to day, which may differ from the system of record |
| Data domain | A category of related data (customer master, financial transactions, HR data) that can each have its own system of record |
| Systems-of-record map | A documented table assigning each data domain to its authoritative system and describing data-flow direction |

## Lab

A global distributor runs Salesforce (Sales and Service Cloud), a SAP ERP, Workday for HR, and a separate PIM for product data. Build a systems-of-record table covering five domains: customer master, product catalog, pricing, employee data, and order/opportunity data. For each domain, state which system is the system of record, which systems are read-only consumers, and whether Salesforce in that domain is acting as a system of record or a system of engagement. Call out the one domain in your table most likely to be gotten backwards by a team that spends all day in Salesforce.

## Check yourself

Can you explain the difference between a system of record and a system of engagement using an example where the two are different systems? Can you describe, in concrete terms, what goes wrong in an enterprise when an integration writes data in the wrong direction because no systems-of-record map existed?
