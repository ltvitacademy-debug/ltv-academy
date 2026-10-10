# Lesson 35 — Apex Practice Project: Data Cleanup

**Chapter 5 · Applied Apex · Lesson 35 of 43**

## What you'll learn

- Writing a one-off anonymous Apex script to clean up a small, known set of bad data
- Why that same approach stops being safe once the record volume grows large
- A first look at the `Database.Batchable` interface as the right tool for large-volume cleanup
- Why Batch Apex exists specifically to work around the per-transaction governor limits from Chapter 4
- How to decide which approach a real cleanup task actually needs

## The business problem

A data import left several thousand Contact records with a blank `LeadSource` field, which should default to `'Import'` for any Contact created in the last import batch. This is a textbook data-cleanup task, and it's a good vehicle for seeing where the line falls between "just run a script" and "this needs Batch Apex."

## Small volume: anonymous Apex is enough

If you know the affected set is small — a few hundred records at most — a plain anonymous Apex script, following the bulkification pattern from Lesson 27, is entirely sufficient:

```apex
List<Contact> contactsToFix = [
    SELECT Id, LeadSource
    FROM Contact
    WHERE LeadSource = null
      AND CreatedDate >= :Date.today().addDays(-7)
];

for (Contact c : contactsToFix) {
    c.LeadSource = 'Import';
}

update contactsToFix;
```

This issues one query and one DML statement, comfortably inside every limit from Lesson 26 — as long as the result set stays well under the 50,000-row SOQL limit and the 10,000-row DML limit.

## Why this stops working at larger volume

If the affected set is, say, 80,000 Contacts, the script above breaks down in two ways at once: the query itself risks exceeding the 50,000-row SOQL limit, and even if it didn't, a single `update` on 80,000 records would exceed the 10,000-row DML limit from the same transaction. No amount of bulkification technique fixes this — the problem isn't *how* the code is written, it's that the entire job genuinely doesn't fit inside one transaction's limits at all.

## The right tool: Batch Apex

**Batch Apex** exists specifically for this situation: a job that needs to process more records than fit in a single transaction's governor limits. A class implementing `Database.Batchable<SObject>` breaks the work into separate, smaller transactions automatically, each with its own full set of governor limits:

```apex
public class ContactLeadSourceCleanupBatch implements Database.Batchable<SObject> {

    public Database.QueryLocator start(Database.BatchableContext bc) {
        return Database.getQueryLocator([
            SELECT Id, LeadSource
            FROM Contact
            WHERE LeadSource = null
              AND CreatedDate >= :Date.today().addDays(-7)
        ]);
    }

    public void execute(Database.BatchableContext bc, List<Contact> scope) {
        for (Contact c : scope) {
            c.LeadSource = 'Import';
        }
        update scope;
    }

    public void finish(Database.BatchableContext bc) {
        System.debug('Contact LeadSource cleanup batch finished.');
    }
}
```

`start()` defines the full query via a `Database.QueryLocator`; Salesforce automatically splits the matching records into batches (a default size you can override, up to 2,000 records per batch) and calls `execute()` once per batch, each execution getting its own fresh governor limits; `finish()` runs once, after every batch has completed. You kick it off with `Database.executeBatch(new ContactLeadSourceCleanupBatch());`.

## Deciding which approach a real task needs

The honest decision rule: estimate the affected record count first. If it's comfortably within the per-transaction limits (a safe rule of thumb is well under a few thousand records) and this is genuinely a one-time fix, anonymous Apex is simpler and faster to write. If the count could realistically approach or exceed governor limits, or the cleanup needs to run repeatably (not just once), reach for Batch Apex from the start rather than discovering the limit problem the hard way in production.

## Key terms

| Term | Meaning |
|---|---|
| Batch Apex | A framework for processing large record volumes across multiple automatically-managed transactions, each with its own governor limits |
| `Database.Batchable<SObject>` | The interface a batch class implements, requiring `start()`, `execute()`, and `finish()` methods |
| `Database.QueryLocator` | Defines the full set of records a batch job will process, which Salesforce then splits into batches automatically |

## Lab

In a Developer Edition org, create 15 test Contacts with a blank `LeadSource`. Write and run the anonymous Apex cleanup script from this lesson, and confirm all 15 now have `LeadSource = 'Import'`. Then write the `ContactLeadSourceCleanupBatch` class, run it with `Database.executeBatch()` against a fresh batch of test Contacts, and confirm the same outcome — noticing how much more code the batch version required for the same actual result.

## Check yourself

Why doesn't better bulkification technique fix a cleanup job that genuinely needs to touch more records than the DML row limit allows in one transaction? What are the three methods a `Database.Batchable<SObject>` class must implement, and what does each one do?
