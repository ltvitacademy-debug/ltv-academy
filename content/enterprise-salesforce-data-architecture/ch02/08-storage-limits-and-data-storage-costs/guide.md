# Lesson 8 — Storage Limits and Data Storage Costs

**Chapter 2 · Data Storage and Scale · Lesson 8 of 26**

## What you'll learn

- The difference between Data Storage and File Storage, and why an architect tracks them separately
- How Salesforce determines an org's storage allocation, and why that number isn't instantaneous
- Why record *count* matters more than field count or field size for most standard and custom objects
- How to build a storage forecast instead of discovering the problem when the org hits its limit

## Two storage buckets, not one

Salesforce splits what an org consumes into separate allocations: **Data Storage** (records in standard and custom objects — Accounts, Opportunities, custom objects, and the rest) and **File Storage** (attachments, files, Content Documents, and anything uploaded as a document rather than stored as fielded data). An org can be comfortably under its data storage limit while running out of file storage, or the reverse — they're tracked and enforced independently, and an architect who only watches one of them gets surprised by the other. Both allocations scale with the org's edition and its number of user licenses, and both are visible in Setup, under Storage Usage, which breaks down consumption by object and shows the largest individual files and the heaviest users.

One detail that trips up teams doing a large data load: storage usage is **not** recalculated the instant a record is inserted. Salesforce computes data and file storage asynchronously, so a bulk import of a million records won't immediately move the needle on the Storage Usage page. Architects planning a large migration should expect a lag before the real number shows up, and shouldn't treat an unchanged storage figure right after a load as proof the load didn't count.

## Why record count, not field count, drives the number

The detail that matters most for capacity planning: Salesforce counts most records toward data storage at a small, fixed amount, regardless of how many custom fields are on the object or how much text sits in those fields. A custom object with five fields and a custom object with two hundred fields — including large text areas — generally cost the platform about the same per record. A handful of record types are documented exceptions that count differently (Campaigns and email-related records are the most commonly cited ones), but the general rule holds for the vast majority of standard and custom object records.

This has a direct architectural consequence: **the number of rows is the lever that matters**, not how wide you make the object. An architect worried about storage cost should be far more concerned about an integration that creates one child record per event, every few seconds, forever, than about a data modeler adding another dozen fields to an existing object. Deleted records, correctly, don't count against the allocation — but records sitting in the Recycle Bin still do until they're purged or age out.

## Building a forecast instead of a surprise

A storage-limit breach is rarely sudden. It's the predictable result of an integration or automated process that creates child records faster than anyone projected, running for months before someone checks the Storage Usage page. The architect's job is to catch this before it becomes an incident:

1. **Baseline current usage** by object, from Storage Usage, broken out by the objects actually growing (not every object grows at the same rate).
2. **Identify the growth drivers** — which integrations or automations create records on a schedule, and at what rate.
3. **Project forward** against the org's current allocation, including planned headcount changes that affect per-user storage.
4. **Decide the relief valve before you need it** — purge/archive policies for data nobody queries anymore, or moving high-volume, low-query data out of standard storage entirely (the subject of the next lesson).

Waiting until the org is near its limit to start this conversation puts the architect in reactive mode, scrambling to purge data under time pressure instead of executing a plan that was already agreed with the business.

## Key terms

| Term | Meaning |
|---|---|
| Data Storage | The allocation covering records in standard and custom objects |
| File Storage | The separate allocation covering attachments, files, and Content Documents |
| Storage Usage page | The Setup page showing consumption by object, largest files, and top users |
| Per-record sizing | Most records count toward storage at a small, fixed amount regardless of field count |
| Storage forecast | A projection of growth against the org's allocation, built from known record-creation drivers |

## Lab

A logistics company's Salesforce org has a custom object, Shipment Event, that logs one record every time a package changes status — roughly 40 events per shipment, across 15,000 shipments a month. The object has twelve fields, including one long-text field for carrier notes. Six months ago it had 25,000 records; today it has 3.2 million. Using the per-record-sizing principle from this lesson, explain to a non-technical stakeholder why adding more fields to Shipment Event would barely move the storage number, while the event volume itself is the real driver. Then propose the first two steps you'd take before this object's growth becomes a storage-limit problem.

## Check yourself

Can you explain why a custom object with 200 fields doesn't necessarily cost more storage per record than one with 5 fields? Can you describe the forecasting steps you'd walk through before an org hits its data storage limit, rather than after?
