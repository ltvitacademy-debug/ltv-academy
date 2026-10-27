# Lesson 21 — Building the Pipeline

**Chapter 6 · The ETL Layer With Data Factory · Lesson 21 of 26**

## What you'll learn

- The real Copy activity moving data from Overlook's scheduling export into `OverlookDB`
- The three steps the Copy activity performs, every single time
- Which integration runtime this specific pipeline actually needs, and why
- What this pipeline deliberately doesn't try to do

## The Copy activity, Overlook's version

Azure Data Factory's **Copy activity** copies data from a source data store to a sink data store.
For Overlook, the source is a daily export file the scheduling system drops into Azure Blob
Storage; the sink is a table in `OverlookDB`. It's the activity this capstone reaches for because
it's genuinely the right tool: moving data between two stores, on a schedule, with no heavy
transformation required.

## Three steps, every time

Regardless of source or sink, the Copy activity performs the same three-step process underneath:

1. **Reads** data from the source — Overlook's scheduling export in Blob Storage.
2. **Performs** serialization/deserialization, compression/decompression, and column mapping,
   based on the source dataset, the sink dataset, and the activity's own configuration.
3. **Writes** data to the sink — the `dbo.Appointments` table in `OverlookDB`.

## Which integration runtime this pipeline needs

Recall that the Copy activity runs on an **integration runtime**. Overlook's scheduling export
lives in Azure Blob Storage — a publicly accessible cloud store — and `OverlookDB` is Azure SQL,
also cloud-hosted. Both ends of this specific pipeline are reachable from the **Azure Integration
Runtime**, Data Factory's own managed runtime, with no self-hosted integration runtime needed. That
would change if the scheduling system's export ever moved behind an on-premises network — a real
consideration worth naming even though it doesn't apply to this capstone's current setup.

## The actual pipeline definition

```
Pipeline: LoadOverlookAppointments
  Source:  BlobStorage / scheduling-exports/appointments_{date}.csv
  Sink:    AzureSqlDatabase / OverlookDB / dbo.Appointments
  Activity: Copy
    - Mapping: CSV columns → Appointments table columns
    - Fault tolerance: skip incompatible rows, log to error file
```

If `dbo.Appointments` didn't already exist, the Copy activity could auto-create it from the source
file's shape — useful for a first draft, but worth reviewing against the real schema this capstone
actually needs before trusting it in production, exactly the caution any auto-generated schema
deserves.

## What this pipeline deliberately doesn't do

The Copy activity moves data — it handles the "E" and "L" of this ETL well, but it's deliberately
limited on the "T." Real transformation beyond column mapping and type conversion belongs to a
mapping data flow or an external compute engine, neither of which this capstone's modest
appointment feed actually needs. Trying to force heavier transformation logic into this Copy
activity's mapping tab would be the kind of over-engineering this capstone deliberately avoids —
matching the tool to the actual size of the problem.

## Key terms

| Term | Meaning |
|---|---|
| Source / Sink | The data store the Copy activity reads from / writes to |
| Azure Integration Runtime | Data Factory's managed runtime, sufficient when both source and sink are cloud-accessible |
| Auto create table | Letting the Copy activity generate a destination table's schema automatically — review before trusting it |

## Check yourself

You're ready for Lesson 22 when you can explain, without looking: why does this pipeline only need
the Azure Integration Runtime, and what would have to change about Overlook's setup for a
self-hosted integration runtime to become necessary?
