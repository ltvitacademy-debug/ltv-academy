# Lesson 12 — Data Architecture and Performance

**Chapter 2 · Data Storage and Scale · Lesson 12 of 26**

## What you'll learn

- How the storage and skew concepts from this chapter compound into org-wide performance risk at scale
- Why automation that works fine in a sandbox can fail under large data volumes in production
- The role of query selectivity and indexed fields in keeping large-object queries fast
- Why sharing recalculation cost, not just query speed, belongs in an architect's performance checklist

## Performance at scale is a design decision, not a tuning exercise

Lessons 8 through 11 covered storage cost, Big Objects and External Objects, and data skew as separate topics. In a real enterprise org, they don't stay separate — they compound. An object with millions of records (storage), concentrated under a small number of parents or owners (skew), touched by automation that wasn't written with volume in mind (this lesson's subject), is exactly the combination that produces production incidents: timeouts, governor-limit exceptions, and record-lock errors that only appear once real data volume arrives, long after the automation passed every test in a sandbox with a few hundred records.

This is why performance, for a Salesforce architect, is a data-architecture concern decided at design time — which fields get indexed, how automation is written, how sharing is structured — rather than something fixed afterward by throwing more compute at it. Salesforce doesn't offer a lever to simply "add more server capacity" the way a traditional database administrator might; the fix has to be in the design.

## Query selectivity and indexed fields

A query against a small object will return quickly almost regardless of how it's written. A query against an object with millions of records behaves completely differently depending on whether its filter criteria are **selective** — narrow enough, against an indexed field, that the platform's query optimizer can use an index rather than scanning a large portion of the table. Standard indexed fields include primary keys, lookup/master-detail fields, audit dates, and fields marked External ID or Unique; custom fields can be indexed on request for object-specific needs. An architect reviewing a data model for a high-volume object should be asking, concretely, "what will the real queries against this object filter on, and are those fields indexed and selective enough to use that index" — not assuming every query will perform the same regardless of volume.

## Automation has to be written for volume, not just for correctness

A trigger, Flow, or batch of Apex that correctly implements business logic for one record can still be a performance liability at volume if it isn't **bulkified** — written to handle a full batch of records (up to the platform's per-transaction record limits) in a single pass, rather than looping with one query or one DML statement per record. Code that issues a SOQL query or a DML statement inside a per-record loop will hit governor limits once enough records pass through it at once, even though it behaved perfectly in testing with a handful of records. For genuinely large jobs — bulk data loads, nightly recalculations, anything processing well beyond a single-transaction's worth of records — the right tool is asynchronous processing (Batch Apex or Queueable Apex) specifically because it's designed to chunk large volumes into governor-limit-safe pieces rather than trying to do everything in one synchronous transaction.

## Sharing recalculation is a hidden performance cost

The skew lesson touched on this, but it generalizes: anything that changes the **role hierarchy**, a **sharing rule**, or the **ownership** of a large number of records can trigger a sharing recalculation across every affected record. On a small object, this is invisible. On an object with millions of records and real skew, a seemingly small org-chart change — promoting someone, restructuring a territory, changing which queue owns a bucket of records — can become a long-running, resource-intensive recalculation that degrades performance for the whole org while it runs. This is exactly why the skew mitigations from the previous lesson (keeping high-volume owners out of the role hierarchy, avoiding single-point concentration) aren't just skew fixes — they're performance-architecture decisions with org-wide consequences.

## Pulling it together

A Salesforce architect designing for performance at scale is really asking one recurring question in several different forms: **does this design assume small data volumes, or does it hold up once this object has the volume the business actually expects in three to five years?** Index strategy, automation bulkification, and sharing-model design are the three places that question gets answered — and all three need to be decided while the data model is still on a whiteboard, not discovered during a production incident.

## Key terms

| Term | Meaning |
|---|---|
| Query selectivity | Whether a query's filter criteria are narrow enough against indexed fields to avoid scanning large portions of a table |
| Indexed field | A field the platform can use to look up matching records efficiently rather than scanning row by row |
| Bulkification | Writing automation to process a full batch of records in one pass instead of looping with per-record queries or DML |
| Governor limits | Platform-enforced per-transaction caps (on queries, DML, CPU time, etc.) that unbulkified code hits at volume |
| Sharing recalculation | The reprocessing of record-level access that follows a role, sharing rule, or ownership change, costly at volume |

## Lab

A field-service company has an Opportunity trigger, written and tested with sample data of 50 records, that queries related Cases and updates a rollup field once per Opportunity inside a `for` loop. The object now holds 2.1 million Opportunities. During a recent territory restructuring, a manager's role was moved in the hierarchy, and a batch data load of 40,000 new Opportunities was scheduled for the same evening. Identify the two separate performance risks in this scenario — one in the trigger's design, one in the timing of the org-chart change — and explain, using this lesson's concepts, what each risk actually does to the system when it's triggered.

## Check yourself

Can you explain why a trigger that works fine in testing can fail once real data volume arrives, using the term "bulkification"? Can you describe why a role-hierarchy change on a large, skewed object is a performance event, not just an org-chart change?
