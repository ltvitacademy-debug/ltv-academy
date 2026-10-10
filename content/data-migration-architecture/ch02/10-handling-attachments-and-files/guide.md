# Lesson 10 — Handling Attachments and Files

**Chapter 2 · Designing the Migration · Lesson 10 of 18**

## What you'll learn

- The difference between the modern Files model and the legacy Attachment object
- How a file's binary content differs from a normal record's data, and why that matters for migration
- Why file migration is usually scoped and sequenced as its own workstream
- What options exist when a source system makes bulk file extraction hard

## Two file models, one migration decision

Modern Salesforce stores uploaded files as **ContentVersion** records (the actual file content and its version history) linked to a **ContentDocument** (the file's overall identity) and connected to whatever record it belongs to through a **ContentDocumentLink**. This is the **Files** feature — the one shown throughout the modern Salesforce UI. Salesforce also still supports the older **Attachment** object, which predates Files and links directly to a parent record via a simpler `ParentId` field; it's considered legacy for new development, though orgs with older customizations may still have Attachment records in active use. A migration project has to make a deliberate decision about which model new file data lands in — almost always ContentVersion/Files for anything going forward — and, separately, whether existing legacy Attachment records (if the source happens to already be a Salesforce org) need to be preserved as-is or converted.

## Files aren't like other records

Everything covered so far in this chapter — mapping, transformation, sequencing, External IDs — was written with structured field data in mind: text, numbers, dates, picklists, lookups. A file is a fundamentally different kind of payload: it's binary content (the actual PDF, image, or document bytes) that has to travel alongside its metadata (file name, type, size, the record it's attached to), not just a row of field values. That binary payload is typically far larger per item than a structured record, and a source system holding, say, half a million customer contracts as PDFs represents an amount of raw data transfer that dwarfs the same number of Account or Contact records. Files are also commonly the least standardized part of a legacy system — naming conventions drift, duplicate copies accumulate, and some files may no longer be retrievable at all from an aging source system.

## Why files get their own workstream

Because of that size and non-standardization difference, file migration is almost always planned, scoped, and sequenced separately from the main structured-data load rather than folded into the same batches. A typical approach loads the parent records first (so a target `ContentDocumentLink` — or legacy `AttachmentParentId` — has something real to attach to, which is exactly the sequencing principle from Lesson 8 applied to files specifically), and then runs file migration as its own pass, often over a longer window, using Bulk API or Data Loader against the ContentVersion object with the file's binary content included in the payload. Files also deserve their own scope conversation (echoing Lesson 4): does every historical file genuinely need to migrate, or only files attached to records within the agreed historical date range? A blanket "migrate everything" decision on files specifically can balloon both the migration's duration and the target org's storage costs for very little business value if a large share of those files are old, unused, or duplicated.

## When bulk extraction from the source is hard

Not every source system makes it easy to bulk-export file content — some only expose files one at a time through a UI, with no API or export tool. When that's the reality, a few options exist, and they're all legitimate depending on the situation: a phased or parallel approach where the legacy system stays available (read-only) specifically so files can still be retrieved on demand even after structured data has cut over; a scripted extraction built specifically for that source system, accepting a longer timeline; or, for lower-value historical files, a deliberate scope decision (per the paragraph above) to leave them in a read-only archive rather than migrate them at all. The wrong move is assuming file migration will be as straightforward as the structured-data load and discovering the real extraction difficulty only once the main migration is already underway.

## Key terms

| Term | Meaning |
|---|---|
| ContentVersion / ContentDocument | The modern Salesforce Files model — file content and version history (ContentVersion) under a file's overall identity (ContentDocument) |
| ContentDocumentLink | The link connecting a ContentDocument to the record(s) it's attached to |
| Attachment object | The legacy file-storage object, linking directly to a parent via ParentId; still usable but considered legacy for new development |
| Binary payload | A file's actual content (bytes), as distinct from the structured field metadata describing it |

## Lab

A legacy on-premise system holds 400,000 scanned customer contracts, each 1-5 MB, attached to customer records that are being migrated to Salesforce Accounts. The legacy system has no bulk export API — files can only be downloaded one at a time through its web UI. Propose a realistic approach for migrating these files, addressing: whether you'd attempt to migrate all 400,000 or apply a scope decision first, how you'd sequence file migration relative to the Account load, and what you'd do about the lack of a bulk export mechanism.

## Check yourself

Can you explain the relationship between ContentVersion, ContentDocument, and ContentDocumentLink in one or two sentences? Can you give two concrete reasons file migration is usually planned as its own workstream rather than folded into the structured-data load?
