# Lesson 11 — Archiving

**Chapter 3 · Managing Volume · Lesson 11 of 16**

## What you'll learn

- Why archiving is a distinct discipline from deletion, even though both reduce active data
- The standard extract-backup-verify-remove sequence for archiving at LDV scale
- Why chunking matters for extracting very large volumes, and what PK chunking solves
- Why relationship impact analysis has to happen before any records are removed

## Archiving vs. deletion

It's tempting to treat "archiving" as a fancy word for "deleting old data," but the two solve different problems. **Deletion** permanently removes data an organization has decided it no longer needs at all. **Archiving** moves data out of the org's active, frequently-queried working set while still preserving it somewhere it can be retrieved if genuinely needed later — a closed Opportunity from six years ago, a completed Case, a historical transaction record. The business value of the data hasn't gone to zero; it's just no longer worth the ongoing cost of keeping it in the fast-moving, actively-queried part of the org. Lesson 12 covers Big Objects as one specific target for archived data; this lesson covers the general process that gets data there (or anywhere else) safely.

## Why this is a Chapter 3 topic, not just a Chapter 1 topic

Every active record in an LDV-scale object is also something every future query, index, and skinny table (Chapter 1) has to account for, and a potential contributor to skew (Chapter 2) if it's unevenly distributed. Archiving is the ongoing discipline that keeps an org's *active* working set from growing without bound — which is what makes all of Chapters 1 and 2's techniques keep working as an org ages, rather than slowly degrading as years of historical data pile up on top of the current year's genuinely active records.

## The standard sequence: extract, back up, check relationships, remove

A disciplined archiving process generally follows four steps, in this order:

1. **Extract the data.** Pull the records being archived out of Salesforce in a form that preserves what's needed for future retrieval. At high volume, extraction is typically done in chunks rather than one giant query — Bulk API splits extract queries into chunks by default, and that chunk size can be adjusted up or down within a supported range depending on whether fewer, larger chunks or more, smaller chunks perform better for the specific extract.
2. **Back up before removing anything.** A backup taken as close as possible to the point of deletion is the real safety net for an archiving project — not the Recycle Bin, which is a short-term undo mechanism, not an archive (more on this in Lesson 13).
3. **Check relationship impact.** Before removing anything, analyze what deleting these records will do to parent-to-child and child-to-parent relationships elsewhere in the org. A record being archived might be a parent to records that are *not* being archived, or the deletion might orphan related data in ways that break reports, rollups, or integrations that assume the relationship still exists.
4. **Remove the data from the active org.** Only after extraction, backup, and relationship analysis are complete does the actual removal happen — using the deletion strategies covered in Lesson 13.

## Chunking and PK chunking for very large extracts

At moderate volume, chunking an extract by filtering on a field value (like a date range) works fine. At genuinely large scale — hundreds of millions of records — filtering by field value stops being practical as the primary chunking strategy, because the chunks themselves can become uneven or expensive to compute. **PK chunking** addresses this by chunking the extract based on the record's primary key (its Id) rather than a business field, which Salesforce's own guidance describes specifically as a technique to combat slow performance when extracting very large volumes of data out of an org. It's a tool to reach for once ordinary chunk-size adjustments on a field-value-based extract stop being sufficient.

## Key terms

| Term | Meaning |
|---|---|
| Archiving | Moving data out of the active working set while preserving it for potential future retrieval |
| Deletion | Permanently removing data the organization has decided it no longer needs at all |
| Chunking | Splitting a large extract into smaller pieces for more manageable, reliable processing |
| PK chunking | Chunking an extract by record Id rather than a business field, used for very large-scale extracts |

## Lab

A financial services org wants to archive 3 million Case records older than five years out of its active Salesforce org, while keeping them retrievable for audit purposes. Several of these Cases are parents to Contact records that are still active today. Walk through the four-step sequence from this lesson for this specific scenario, and explain specifically what the relationship-impact-check step needs to catch before step 4 (removal) can safely proceed.

## Check yourself

Can you explain, in your own words, the difference between archiving and deletion? Can you list the four-step archiving sequence in order, and explain why the backup step and the relationship-impact-check step both have to happen before any record is actually removed?
