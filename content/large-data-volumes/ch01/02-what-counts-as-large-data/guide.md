# Lesson 2 — What Counts as Large Data

**Chapter 1 · Working at Scale · Lesson 2 of 16**

## What you'll learn

- The rough reference points Salesforce itself uses when talking about LDV-scale orgs
- Why record count alone is a poor predictor of whether an org is actually in LDV territory
- Storage volume and user count as the other two dimensions that matter
- How to assess "is this an LDV problem" for a specific object instead of the org as a whole

## Three rough dimensions, not one number

Lesson 1 established that LDV is behavioral, not a fixed threshold. This lesson makes that concrete by looking at the dimensions architects actually use to size the problem. Salesforce's own guidance frames LDV-scale deployments loosely around three dimensions, used together rather than any single one in isolation: tens of thousands of users, tens of millions of records in a single object, or hundreds of gigabytes of record storage. An org can land in LDV territory by being heavy in any one of these dimensions even if the others look modest — a 2-million-record object with very wide records and large attachments can hit storage-driven problems well before it hits a record-count-driven one, and a modest-sized object owned unevenly across a small sales team can hit skew problems that have nothing to do with total volume at all.

This matters because "large data volumes" gets used informally to mean "a lot of records," but the dimension that's actually causing a specific symptom is often not the one people assume. A slow dashboard might be a storage problem (huge attachments bloating the object), a count problem (the SOQL behind the report tile isn't selective), or a skew problem (the report is scoped to one territory that happens to own a disproportionate share of records) — and the fix is different in each case.

## Per-object, not per-org

A second correction to the informal usage: LDV status is a property of an *object*, not of the org as a whole. A large Salesforce org can have one object — say, a custom Transaction_History__c holding tens of millions of rows — firmly in LDV territory, while most of its standard objects (Accounts, Contacts, Opportunities) sit at a few hundred thousand records each and never trigger any of the behaviors covered in this course. Architects reviewing a design for LDV risk should ask the question object by object: which objects in this data model are likely to accumulate volume fastest, and does their specific shape (ownership pattern, parent-child structure, query patterns against them) make them vulnerable even before they hit a large absolute count.

This is also why LDV planning belongs in the data-modeling phase, not as a later remediation project. An object whose growth trajectory and ownership pattern are understood up front can be designed to avoid skew and support selective queries from day one. An object discovered to be a problem only after it's already carrying millions of records requires remediation under much worse constraints — live production data, existing automation depending on its current shape, and no ability to simply redesign the relationships from scratch.

## The practical takeaway: plan for the trajectory, not the launch-day count

Because LDV problems are late-arriving (Lesson 1) and dimension-specific (this lesson), the right planning question for a new object isn't "how many records will this have at launch" — it's "what is this object's growth trajectory, and which of the three dimensions (record count, record width/storage, user/ownership concentration) will it hit first." An object that starts small but is designed to log every customer interaction, every integration event, or every historical snapshot is exactly the kind of object that needs LDV-aware design decisions from the start, even while its record count still looks unremarkable in year one.

## Key terms

| Term | Meaning |
|---|---|
| Record-count dimension | LDV risk driven by sheer number of rows in an object |
| Storage dimension | LDV risk driven by record width or large attachments, independent of row count |
| User/ownership dimension | LDV risk driven by how concentrated ownership or hierarchy relationships are, independent of total volume |
| Per-object LDV status | The principle that LDV risk is assessed object by object, not for the org as a whole |

## Lab

An org has three objects: Accounts (800,000 records, evenly distributed across 200 sales reps), a custom Audit_Log__c object (6 million records, each one small, all owned by a single integration user), and a custom Proposal_Document__c object (150,000 records, each one carrying a large file attachment). For each object, identify which of the three dimensions (record count, storage, ownership concentration) is the primary LDV risk driver, and name one symptom category from Lesson 1 (read-path, write-path, volume-management) you'd expect to see first.

## Check yourself

Can you name the three rough dimensions Salesforce uses to describe LDV-scale deployments? Can you explain why LDV status should be assessed per object rather than for an org as a whole, with an example?
