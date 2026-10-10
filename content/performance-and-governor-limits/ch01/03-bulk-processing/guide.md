# Lesson 3 — Bulk Processing

**Chapter 1 · Performance Foundations · Lesson 3 of 16**

## What you'll learn

- Why Salesforce triggers always fire on a collection of records, never one at a time
- The single most common anti-pattern on the platform: SOQL or DML inside a loop
- How to rewrite a non-bulkified trigger into a bulkified one, with real before/after Apex
- Why bulkification matters even when you "only ever update one record at a time" in the UI

## Every trigger is already bulk — your code has to catch up

A trigger on Account doesn't fire once per Account. It fires **once per transaction**, with `Trigger.new` holding the entire batch of records being inserted or updated together — which could be 1 record from a single Lightning Experience save, or 200 records from a Data Loader batch, a bulk API job, or a Flow that updates many records at once. The platform handles the "many records, one trigger invocation" part for you. What it does **not** do is protect you from writing code inside that trigger that assumes there's only ever one record in `Trigger.new`.

This is why "it only breaks on bulk imports" is such a common bug report. The code worked fine in every manual test, because every manual test saved one record. The first time 200 records hit it at once, it either throws a governor limit exception or silently does the wrong thing.

## The anti-pattern: SOQL or DML inside a loop

Here's a trigger that looks reasonable at a glance but fails the moment more than roughly 100 records come through it at once:

```apex
trigger AccountTrigger on Account (before update) {
    for (Account acc : Trigger.new) {
        // One query per Account in the batch — this is the anti-pattern
        List<Contact> contacts = [SELECT Id, LastName FROM Contact WHERE AccountId = :acc.Id];
        for (Contact c : contacts) {
            c.Description = 'Parent account updated';
            update c; // One DML statement per Contact, inside a loop inside a loop
        }
    }
}
```

With 1 Account in `Trigger.new`, this runs 1 query and however many `update` statements as there are contacts. With 200 Accounts, it's attempting 200 separate queries — blowing past the synchronous 100-query limit — and a DML statement per Contact on top of that, which also risks the 150-DML-statement ceiling. Nothing about this code is "wrong" in a single-record test; it's wrong the moment it meets volume.

## The fix: query once, collect updates, DML once

```apex
trigger AccountTrigger on Account (before update) {
    Set<Id> accountIds = new Set<Id>();
    for (Account acc : Trigger.new) {
        accountIds.add(acc.Id);
    }

    // One query, for the entire batch
    List<Contact> contactsToUpdate = [
        SELECT Id, LastName, AccountId
        FROM Contact
        WHERE AccountId IN :accountIds
    ];

    for (Contact c : contactsToUpdate) {
        c.Description = 'Parent account updated';
    }

    // One DML statement, for the entire batch
    if (!contactsToUpdate.isEmpty()) {
        update contactsToUpdate;
    }
}
```

This version issues exactly **one** SOQL query and **one** `update` statement no matter whether `Trigger.new` holds 1 record or 200 — the governor limit cost is flat, not proportional to the number of records being processed. That flatness is the entire goal of bulkification: moving the cost of a query or DML statement outside the loop so it's paid once per transaction instead of once per record.

## Bulkifying a helper class, not just a trigger

The same principle applies to any Apex that might process a collection, not just triggers directly. A handler method should take a collection as its parameter and do its database work once:

```apex
public class AccountTriggerHandler {
    public static void flagHighValueAccounts(List<Account> accounts) {
        Set<Id> ids = new Set<Id>();
        for (Account a : accounts) {
            if (a.AnnualRevenue > 1000000) {
                ids.add(a.Id);
            }
        }
        if (ids.isEmpty()) return;

        List<Account> toUpdate = [SELECT Id, Rating FROM Account WHERE Id IN :ids];
        for (Account a : toUpdate) {
            a.Rating = 'Hot';
        }
        update toUpdate;
    }
}
```

The signature taking `List<Account>` instead of a single `Account` is the tell: a bulk-safe method is designed around "a batch of records," and every query or DML statement inside it happens once per call, not once per element of that list.

## Key terms

| Term | Meaning |
|---|---|
| Trigger.new | The full collection of records being inserted or updated in the current trigger invocation |
| SOQL/DML in a loop | The classic anti-pattern: issuing a query or DML statement once per record instead of once per batch |
| Bulkification | Structuring code so governor-limit-consuming operations run once per transaction regardless of record count |
| Bulk-safe method | A method whose signature takes a collection and whose database work happens outside any per-record loop |

## Lab

Take the non-bulkified `AccountTrigger` shown above and, without looking at the fixed version, rewrite it yourself from scratch following the same two-step pattern (collect what you need into a Set, query once, update once). Then deliberately test it with a scenario where `Trigger.new` would hold 150 Accounts whose combined Contacts total more than 150 records, and explain in writing which two specific governor limits the original, non-bulkified version would have been at risk of hitting.

## Check yourself

Can you explain why a trigger that works perfectly in every manual single-record test can still be a serious bug? Can you describe, in your own words, the two-step bulkification pattern (collect into a Set, then query/DML once outside the loop) well enough to apply it to a scenario you haven't seen before?
