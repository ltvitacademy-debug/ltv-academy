# Lesson 8 — Deduplication

**Chapter 2 · Matching and Consolidation · Lesson 8 of 25**

## What you'll learn

- How deduplication differs from the broader matching concept in Lesson 6
- The common causes of duplicate records
- The general deduplication process, from detection to resolution
- Prevention at point of entry vs. cleanup after the fact

## Deduplication vs. matching, precisely

Lesson 6 defined matching broadly — comparing records within or across systems. **Deduplication is matching applied specifically within a single system or dataset**, to find multiple records that already exist there for the same real-world entity. It's the narrower, more common first problem most organizations tackle, often before they're ready to take on matching *across* systems (which is the bigger MDM problem this whole chapter builds toward).

## Why duplicates happen

- **Multiple entry points.** A customer signs up through a website form, then again through a call center agent who didn't find the existing record, creating two rows for one person.
- **System migrations.** Merging two databases (or two divisions' CRMs) during a migration routinely creates duplicates unless matching runs as part of the migration itself.
- **No real-time check at the point of entry.** Without a live search-before-create step, there's nothing stopping a second record from being created for someone who's already in the system.
- **Inconsistent formatting over time.** The same person entered as "Jon Smith" in 2019 and "Jonathan Smith" in 2023 can look like two different people to a naive system.

## The deduplication process

1. **Find duplicate groups.** Run matching (Lessons 6–7) within the dataset to cluster records that likely refer to the same entity.
2. **Decide which values survive.** For each duplicate group, decide what the merged, correct record should contain — this is exactly what survivorship rules (Lesson 10) formalize.
3. **Merge or link.** Either physically combine the duplicate records into one (common in a consolidation or centralized architecture — Lesson 3) or keep them separate but linked by a shared ID (common in a registry-style architecture), depending on the MDM architecture style in use.

## Prevention vs. cleanup

**Cleanup** is reactive: periodically running a dedup process against existing data to catch what's already accumulated — necessary, but duplicates keep forming again if nothing changes upstream. **Prevention** is proactive: running a real-time match check at the point of entry, so when someone tries to create "Jonathan Smith" and a near-match for "Jon Smith" already exists, the system prompts "is this the same person?" before a duplicate is ever created. A mature dedup program does both — cleanup to fix the backlog, prevention to stop the backlog from regrowing.

## Key terms

| Term | Meaning |
|---|---|
| Deduplication | Matching applied within a single system or dataset to find and resolve existing duplicate records |
| Duplicate group | A cluster of records identified as likely referring to the same real-world entity |
| Point-of-entry prevention | A real-time match check run when a new record is created, to stop duplicates before they exist |

## Lab

Think of a system you use (a CRM, a spreadsheet of contacts, even your phone's contact list). Do you know of a duplicate entry in it? Describe which of the four causes in this lesson most likely created it, and whether a point-of-entry check would have caught it.

## Check yourself

Can you explain the difference between deduplication and the broader matching concept from Lesson 6, and describe the three steps of the deduplication process in order?
