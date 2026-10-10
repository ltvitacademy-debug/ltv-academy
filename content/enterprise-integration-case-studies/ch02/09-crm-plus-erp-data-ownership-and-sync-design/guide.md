# Lesson 9 — CRM + ERP: Data Ownership and Sync Design

**Chapter 2 · Deep Dives · Lesson 9 of 20**

## What you'll learn

- How to build a field-level ownership matrix instead of stopping at object-level ownership
- Why a canonical data model matters when CRM and ERP use different field names and shapes for the same concept
- Two concrete conflict-resolution rules, and when each one actually fits
- Why "last write wins" is a default, not a decision, if nobody actually chose it

## Going deeper than Lesson 1's domain split

Lesson 1 established that Doverfield's ERP owns product/pricing/inventory and Salesforce owns the sales relationship and pipeline, with the Account record shared between them. That domain-level split is necessary but not sufficient — "the Account is shared" doesn't say what happens when the ERP's billing address and Salesforce's shipping address disagree, or when a field exists in both systems but neither side was ever told who's allowed to change it.

## Building a field-level ownership matrix

A real design lists every field both systems touch on a shared object and assigns each one an explicit owner, not a default assumption. For Doverfield's Account/Customer record:

| Field | Owner | Why |
|---|---|---|
| Legal company name, billing address | ERP | Tied to invoicing and tax records that must match the ERP's financial system of record |
| Primary contact, account team, Opportunity history | Salesforce | Sales-relationship data the ERP has no reason to originate |
| Credit hold status | ERP | Finance-controlled, directly tied to payment history the ERP tracks |
| Industry, employee count | Salesforce | Enriched by sales research and used for segmentation, not financially load-bearing |

The point of writing this table down explicitly, before any sync code exists, is that it turns "who updates this when both systems could" from an implicit assumption embedded in whoever wrote the sync job into a reviewable architecture decision.

## A canonical data model bridges different shapes

CRM and ERP systems rarely use the same field names or even the same data shapes for the same real-world concept. Doverfield's ERP might store a single `CustomerStatus` code (`A`, `H`, `C`) where Salesforce has two separate booleans (`Is_Active__c`, `Is_On_Credit_Hold__c`). A **canonical data model** — a shared, system-neutral definition of what "customer status" actually means — gives the integration layer one place to translate both directions, rather than scattering ad hoc translation logic across every sync job that happens to touch this field. Without it, a future third system joining the integration has to re-learn and re-implement the ERP's status codes from scratch instead of mapping once to an already-defined canonical shape.

## Two conflict-resolution rules, chosen deliberately

Even with ownership assigned per field, a conflict can still occur during the moment a sync is catching up (a rep updates a Salesforce field at the same instant a batch job is pushing an older ERP value). Two real resolution rules cover most cases, and the right one depends on the field's ownership answer, not a blanket policy:

- **System-of-record wins.** For an owned field (billing address owned by ERP), the owning system's value always wins on conflict, full stop — the other system's copy is a read-only reflection that should never have been editable to conflict with it in the first place.
- **Last-write-wins by timestamp.** For a genuinely shared, bidirectionally-editable field (rare, and worth avoiding where possible), whichever system's update carries the more recent timestamp wins. This only works safely if both systems' clocks are reliably synchronized and the sync records a trustworthy timestamp — an assumption worth testing, not assuming.

The failure mode to watch for is **silent last-write-wins** — a design where nobody explicitly chose a conflict rule, and the sync job's own execution order happens to decide the outcome by accident. That's not a resolution policy; it's an unreviewed side effect that looks fine until two updates land close enough together to expose it.

## Key terms

| Term | Meaning |
|---|---|
| Field-level ownership matrix | An explicit table assigning each shared field's owning system, reviewed as an architecture artifact |
| Canonical data model | A shared, system-neutral definition of a concept that bridges different systems' field shapes |
| System-of-record wins | A conflict rule where the owning system's value always takes precedence |
| Last-write-wins | A conflict rule based on comparing timestamps, valid only when both systems' clocks are reliable |
| Silent last-write-wins | An unreviewed conflict outcome determined by accidental execution order, not a deliberate rule |

## Lab

Doverfield's ERP and Salesforce both have a `PaymentTerms` field, and both have historically allowed users to edit it, with no agreed owner. Using the pattern from this lesson, build a short field-ownership decision for `PaymentTerms`: which system should own it (and why, given it's finance-controlled but also referenced on sales quotes), what conflict-resolution rule follows from that ownership decision, and what has to change about today's dual-editability for your rule to actually hold.

## Check yourself

Can you explain the difference between a field-level ownership matrix and the object-level split from Lesson 1, and why the field-level version is necessary? Can you state, in your own words, why "silent last-write-wins" is a failure mode rather than a legitimate conflict-resolution strategy?
