# Lesson 1 — Large Data Volumes Overview

**Chapter 1 · Working at Scale · Lesson 1 of 16**

## What you'll learn

- Why "Large Data Volumes" (LDV) is an architecture discipline, not a fixed record count
- The three kinds of symptoms LDV produces: slow queries, failed bulk updates, and slow sharing changes
- Why LDV problems are design problems that show up late, after the org already has real data in it
- How this course's three chapters map to the LDV lifecycle: build it right, survive growth, manage volume over time

## LDV is a behavior, not a number

Salesforce's own architecture guidance describes Large Data Volumes as a deliberately imprecise, elastic term. One commonly cited frame of reference is an org with tens of thousands of users, tens of millions of records in a single object, or hundreds of gigabytes of record storage — but that is a rough orientation, not a threshold a Technical Architect should design against. In practice, architects who have supported LDV orgs report that performance problems can start well under a million records in an object if the schema, sharing model, and query patterns weren't designed with scale in mind, while a well-designed org can comfortably hold tens of millions of records without drama.

The honest definition is behavioral: an org has entered LDV territory the moment its data volume starts changing *how* the platform has to behave, not just how much work it has to do. A query that used to return instantly starts needing an index to stay fast. A batch update that used to always succeed starts occasionally failing on record locks. A role hierarchy change that used to be instant starts taking minutes to recalculate sharing. None of these are bugs — they are the Salesforce platform's normal, documented behavior under volume, and a Technical Architect's job is to anticipate them before they show up in production.

## Three categories of symptom

Almost every LDV problem an architect encounters falls into one of three categories, and this course is structured around them:

- **Read-path symptoms** — SOQL queries, reports, list views, and search getting slower as an object grows, because the platform's query optimizer couldn't find a cheap way to narrow down which rows to look at. Chapter 1 ("Working at Scale") covers how Salesforce decides whether a query can use an index, and what an architect can do about it.
- **Write-path symptoms** — data loads and bulk updates failing or slowing down because of record locking, because too many records are concentrated under one owner or one parent record, or because a routine change (like a role move) triggered a sharing recalculation that wasn't anticipated. Chapter 2 ("Skew and Locking") covers this.
- **Volume-management symptoms** — the org simply accumulating more data than it needs to keep active, which makes every read- and write-path problem above worse over time unless something actively manages it. Chapter 3 ("Managing Volume") covers archiving, deletion, and the ongoing discipline of keeping a large org healthy.

## Why this shows up late

LDV issues are notoriously late-arriving. A data model, a sharing model, and a set of automations can all pass every test in a sandbox with a few thousand seed records and still be headed for serious trouble once real production volume arrives — because the specific behaviors that cause LDV problems (index selectivity thresholds, data skew, sharing recalculation cost) are all a function of record *count*, not of logic correctness. A trigger that queries without a selective filter, or a lookup field that will end up pointing thousands of child records at one "default" account, looks completely fine in a 500-record sandbox and becomes a production incident at 2 million records. This is exactly why LDV is treated as its own architectural discipline rather than folded into general data-modeling best practices: the failure mode only becomes visible at a scale most projects don't reach until well after go-live.

## Key terms

| Term | Meaning |
|---|---|
| Large Data Volumes (LDV) | An elastic, behavior-based description of an org where data scale starts changing how the platform performs, not a fixed record count |
| Read-path symptom | A query, report, list view, or search slowdown caused by volume |
| Write-path symptom | A data-load or update failure/slowdown caused by volume (locking, skew, sharing recalculation) |
| Volume-management | The ongoing discipline of archiving, deleting, and otherwise controlling how much active data an org carries |

## Lab

You're the architect on a Salesforce org that has grown from 50,000 Account records at go-live three years ago to 4 million today, with a matching growth in Contacts, Opportunities, and a custom Service_History__c object. The admin team reports: nightly batch jobs are starting to time out, a handful of users complain that list views "spin for a while," and a recent territory realignment took almost an hour to fully apply to every user's visible records. For each of those three complaints, write one sentence identifying which of the three symptom categories (read-path, write-path, volume-management) it falls into, and which later chapter of this course you'd expect to find the fix in.

## Check yourself

Can you explain, in your own words, why "Large Data Volumes" is defined by Salesforce as a behavioral threshold rather than a specific record count? Can you name the three symptom categories this course is organized around, and give one example of each?
