# Lesson 1 — Case Study: CRM + ERP

**Chapter 1 · Enterprise Integration Case Studies · Lesson 1 of 20**

## What you'll learn

- How to decide which system owns which data when Salesforce and an ERP both touch the same business objects
- The menu of real integration patterns available for a CRM-to-ERP connection, and when each one fits
- Why External ID fields are the backbone of any two-system sync, not an afterthought
- How to size an integration decision against data volume, latency tolerance, and failure cost

## The scenario: Doverfield Industrial Supply

Doverfield sells industrial parts through a direct sales team using Salesforce Sales Cloud, while its order fulfillment, inventory, and invoicing run on a mature ERP system. Today, sales reps manually re-key won Opportunities into the ERP as sales orders, and nobody in Salesforce can see whether a part is actually in stock or whether an invoice has been paid. Leadership wants "the systems to talk to each other" — a goal, not yet an architecture.

## Deciding who owns what

The first real architecture decision in any CRM+ERP integration is **system of record** per data domain, not per object. Doverfield's ERP has owned product master data, pricing, and inventory for a decade — rebuilding that in Salesforce would duplicate effort and inevitably drift out of sync. Salesforce, meanwhile, is where the sales relationship, the Opportunity, and the account history actually live. The right split is domain-by-domain:

- **ERP owns**: product catalog, list pricing, on-hand inventory, invoice and payment status.
- **Salesforce owns**: account relationship data, Opportunity pipeline, quote-to-close activity.
- **Shared, synced**: the Account/Customer record itself, and the Order once an Opportunity closes — each system needs a current copy, but only one system should be allowed to originate changes to any single field.

Getting this matrix explicit, field by field, before any middleware gets built is what prevents both systems from fighting over the same field later.

## Choosing a sync pattern

Three realistic patterns cover most of what Doverfield needs, and they are not mutually exclusive:

- **Batch (scheduled, bulk).** A nightly job pulls product and pricing updates from the ERP into Salesforce using the Bulk API, so reps always see yesterday's pricing without any real-time dependency. Fine for data that doesn't need to be current to the minute.
- **Near-real-time, event-driven.** When an Opportunity closes in Salesforce, a Platform Event fires; middleware (or an outbound integration) picks it up and creates the sales order in the ERP within seconds, without a synchronous call blocking the Salesforce transaction that closed the deal.
- **Real-time request-reply.** A rep on an Opportunity wants to check live inventory before committing a quantity — that's a synchronous callout from Apex, via a Named Credential, straight to an ERP API, returning an answer in the same transaction.

Doverfield's actual design uses all three: batch for pricing (low volatility, high volume), event-driven for order creation (needs reliability, doesn't need to be instant), and request-reply for the one screen where a rep needs a live inventory number.

## External IDs: the detail that makes or breaks the sync

None of these patterns work without a reliable way to match "this Salesforce record" to "that ERP record." Salesforce's **External ID** field type exists exactly for this: a field marked External ID can be used with `upsert` so that a sync job can insert a brand-new record or update an existing one based on the ERP's own key, without first querying to find out which case applies. Skipping this and matching on a human-readable field like Account Name is a common and expensive mistake — names change, get typo'd, or collide, and a sync built on them silently creates duplicate records instead of updating the right one.

## Key terms

| Term | Meaning |
|---|---|
| System of record | The one system authorized to originate changes to a specific data domain or field |
| Batch integration | A scheduled, bulk-volume sync, tolerant of data being hours old |
| Event-driven integration | Asynchronous sync triggered by a business event (e.g., Platform Events), decoupled from the triggering transaction |
| Request-reply integration | A synchronous callout that blocks until an external system answers, used only when the answer is needed immediately |
| External ID | A Salesforce field marked to hold another system's key, enabling reliable `upsert` matching across systems |

## Lab

Doverfield's VP of Sales now wants reps to see each customer's **current outstanding invoice balance** on the Account page, updated no more than once per hour. Decide: (1) which system is the system of record for this field, (2) which of the three sync patterns above fits a once-per-hour freshness requirement, and (3) what field you'd use as the External ID to match ERP customer records to Salesforce Accounts, and why a human-readable field like Account Name is the wrong choice.

## Check yourself

Can you explain why "system of record" has to be decided per data domain rather than per object? Can you name Doverfield's three sync patterns and match each one to the specific requirement that made it the right fit, rather than a default choice?
