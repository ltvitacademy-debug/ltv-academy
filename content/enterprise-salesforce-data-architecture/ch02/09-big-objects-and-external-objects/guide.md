# Lesson 9 — Big Objects and External Objects

**Chapter 2 · Data Storage and Scale · Lesson 9 of 26**

## What you'll learn

- What a Big Object is for, and how it differs from a standard or custom object at the storage and query level
- Why Big Objects are defined by their index, and what that constrains about how you can query them
- What an External Object is, how Salesforce Connect exposes outside data without storing a copy of it
- How to decide, at a high level, whether a dataset belongs in a Big Object or behind an External Object

## Big Objects: built for volume, not for flexibility

A **Big Object** is a Salesforce data type purpose-built to hold very large volumes of records — potentially billions — at a consistent performance cost regardless of size, in exchange for giving up most of the flexibility a standard or custom object has. Custom Big Objects are defined in Setup as metadata, not created through ordinary record entry, and their API names always end in `__b` (for example, `ShipmentHistory__b`). Salesforce also ships standard Big Objects of its own — the clearest example is `FieldHistoryArchive`, part of the Field Audit Trail feature, which retains field history for long-term audit and compliance needs well beyond what standard field history tracking keeps.

The trade-off is the index. When you define a custom Big Object, you choose which fields make up its index, and that index is effectively the object's primary key — it determines both the object's identity and what you're allowed to query against. Plain SOQL against a Big Object is constrained to the indexed fields, filtered largely by equality, and generally has to start from the first indexed field with no gaps in the filter chain. This isn't a limitation that shows up later — it's the central design decision: pick index fields that match the lookup pattern you'll actually use (for example, "give me this account's events in this date range"), because you can't change your mind cheaply after the object is populated with real data.

One historical note worth knowing: Salesforce previously offered **Async SOQL**, a background-job query mechanism meant to pull a working subset out of a Big Object into a standard object for reporting. Salesforce retired Async SOQL from all orgs in 2023. If you need to process Big Object data beyond what indexed SOQL supports today, the current approaches are Batch Apex and the Bulk API, built with the same care around governor limits and chunking that any large-data-volume job requires.

Big Objects are the right tool when data is generated once, rarely (if ever) updated, needs to be retained for a long time, and doesn't need to appear in day-to-day UI features like list views, standard reports, or automation triggers. Audit trails, long-term event history, and archived records that occasionally need to be queried but never need to be edited are the classic fit.

## External Objects: don't store it, map it

An **External Object** takes the opposite approach: instead of storing a copy of the data in Salesforce, it maps to data that lives and is maintained entirely in another system. This is enabled by **Salesforce Connect**, which uses an adapter to talk to the outside system — most commonly the **OData adapter** (supporting the OData 2.0 and 4.0 protocols), with an **Apex connector framework** available when the source system doesn't expose an OData endpoint, and a **cross-org adapter** for connecting one Salesforce org to another.

To users, an external object looks and behaves much like a regular object — it can appear in related lists, be searched, and be queried with SOQL or SOSL — but every read is a live callout to the external system rather than a lookup against Salesforce's own database. Whether users can create, update, or delete through an external object (not just read it) depends on the adapter and on what the source system actually supports; some configurations are read-only, others support full CRUD. Architecturally, this means external objects trade query performance and some platform features (certain automation, reporting, and UI surfaces behave differently with externally-sourced data) for the benefit of never duplicating or going stale against the system of record. Salesforce Connect also enforces its own callout limits, so a design that expects to query an external object inside a tight, high-volume loop needs to be checked against those limits early, not discovered in production.

## The decision in one sentence

If the data should be *owned and generated inside* Salesforce, but is too voluminous for standard storage and rarely needs live editing, reach for a **Big Object**. If the data is *owned and maintained outside* Salesforce, and you need current, not-replicated access to it, reach for an **External Object**. Getting this backwards — replicating something that's already a system of record elsewhere, or trying to force live-editable data into a write-once archive — is one of the most common enterprise data-architecture mistakes this chapter exists to prevent.

## Key terms

| Term | Meaning |
|---|---|
| Big Object | A metadata-defined object type for very large record volumes at consistent performance cost, queried mainly through its defined index |
| Index (Big Object) | The field set that determines a Big Object's identity and constrains what SOQL can filter on |
| FieldHistoryArchive | Salesforce's standard Big Object for long-term field-history retention under Field Audit Trail |
| Async SOQL | A retired (2023) background query mechanism for Big Objects; superseded by Batch Apex / Bulk API for large-scale processing |
| External Object | An object that maps to data stored and maintained in an outside system, accessed live rather than replicated |
| Salesforce Connect | The feature that exposes external data as external objects, via OData, Apex, or cross-org adapters |

## Lab

An insurance company wants two things: (1) a ten-year, query-only archive of every policy status change, generated entirely inside Salesforce by an existing Flow, used only a few times a year when an auditor asks for history on a specific policy; and (2) live visibility into a claims-adjudication system that already exists in a separate, vendor-hosted platform, which adjusters need to see from within the Policy record without anyone re-entering or syncing that data into Salesforce. For each of the two requirements, state whether a Big Object or an External Object is the right fit, and justify the choice using the ownership and query-pattern reasoning from this lesson — not just "because it's big" or "because it's external."

## Check yourself

Can you explain why a Big Object's index isn't just a performance optimization, but the thing that defines what you're allowed to query at all? Can you state the one-sentence decision rule for choosing between a Big Object and an External Object, and apply it to a dataset of your own choosing?
