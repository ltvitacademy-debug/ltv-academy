# Lesson 6 — Data Retention

**Chapter 2 · Policies and Compliance · Lesson 6 of 14**

## What you'll learn

- Why a retention policy has to cover the full lifecycle of a record, not just when to delete it
- How Salesforce's native history-tracking features (Field History Tracking and Field Audit Trail/Shield) relate to record retention rather than record history
- Why "archived" doesn't mean "no longer costing you storage" in Salesforce
- How the Recycle Bin and Mass Delete fit into a retention policy, and their real limitations
- Why legal/compliance retention requirements (e.g., financial or healthcare recordkeeping obligations) often conflict with "delete it when we're done with it"

## Retention is a lifecycle policy, not a deletion button

A **data retention policy** covers a record's entire lifecycle: how long it's kept actively usable, when (if ever) it gets archived, and when it's finally deleted. Treating retention as just "when do we delete this" skips the harder middle question — a record that's no longer needed for daily operations often still has to be kept somewhere, in some form, for a defined period, before deletion is even allowed.

## Field history is not the same thing as record retention

It's easy to conflate "we're tracking history on this field" with "we have a retention policy," but they answer different questions. **Field History Tracking** keeps a change log (old value, new value, who, when) for up to a defined number of fields per object, with Salesforce typically retaining that history for a period in the range of roughly a year and a half to two years depending on access method, after which it ages out. **Field Audit Trail** (part of Salesforce Shield) extends this: an org can define a per-object retention policy that keeps a configurable amount of *active* history (commonly up to about 18 months) before archiving older entries into a separate big-object store, where they can then be kept for a much longer configurable period — commonly cited as up to around 10 years — accessible only through the API rather than the standard history related list. Both features answer "what changed on this record and when," which supports audit and traceability (Lesson 10) — but neither one is itself a policy for how long the *record* as a whole should exist. That's a separate decision.

## Archived still costs you

A common and costly misunderstanding: assuming that once data is "archived," it stops counting against the org's storage or stops being a consideration. In Salesforce, archived field history (via Field Audit Trail) and any other Salesforce-native archiving approach still occupies storage and still has to be accounted for in a retention plan — archiving changes *where* data lives and how it's accessed, not whether it still exists or still costs something. True long-term, low-cost retention for Salesforce data generally means exporting it outside the platform into a separate archive system, not just flipping an "archive" setting inside Salesforce itself.

## Recycle Bin and Mass Delete — the blunt instruments

Salesforce's Recycle Bin gives a deleted record a recovery window (commonly cited as around 15 days) before it's permanently purged — useful as a safety net against accidental deletion, not a retention mechanism in itself. **Mass Delete** (in Setup) is Salesforce's native bulk-deletion tool for standard object types like Cases, Leads, Accounts, Contacts, and Activities, letting an admin filter records by criteria and delete many at once. It's a blunt instrument: before running it against real production data, a retention process should always export/report on the records first, and must account for child records that will cascade-delete along with the parent (Cases bring along related Emails and Comments, for example).

## When legal requirements fight "just delete it"

The biggest practical tension in retention policy is that compliance obligations frequently require keeping data *longer* than the business otherwise would, while privacy regulations like GDPR frequently require deleting (or anonymizing) specific individuals' data on request. A retention policy has to reconcile both: a financial or healthcare recordkeeping obligation might require years of retention for certain record types, while a data-subject erasure request (covered in Lesson 7 and Lesson 8) might apply to one specific person's records inside that same object. The resolution is rarely "pick one rule" — it's usually anonymizing the specific fields that identify the individual while retaining the aggregate or legally-required record shell, a nuance a retention policy has to spell out in advance rather than improvising under deadline pressure when the request arrives.

## Key terms

| Term | Meaning |
|---|---|
| Data retention policy | The lifecycle rule covering how long a record is actively kept, archived, and eventually deleted |
| Field History Tracking | Native Salesforce change-log feature for up to a limited number of fields per object, with a bounded retention window |
| Field Audit Trail | A Salesforce Shield feature extending field history retention with a configurable active + archive period, accessible via API |
| Recycle Bin | A short recovery window after deletion, not itself a retention control |
| Mass Delete | Salesforce's native Setup tool for bulk-deleting standard object records by filter criteria |

## Lab

A healthcare client must keep certain Case records for a multi-year regulatory period, but has also received a GDPR-style erasure request from a specific former patient whose data appears in several of those Cases. Write a short plan: what should happen to the records that are inside the required retention window but also named in the erasure request, and what Salesforce feature or process from this lesson (or Lesson 7/8) would you reach for to execute that plan without simply ignoring either requirement.

## Check yourself

Can you explain why Field History Tracking and Field Audit Trail are not themselves a data retention policy, even though they involve retention periods? Can you explain why "archived" doesn't mean a record has stopped costing storage in Salesforce?
