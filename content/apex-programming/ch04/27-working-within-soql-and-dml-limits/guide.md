# Lesson 27 — Working Within SOQL and DML Limits

**Chapter 4 · Governor Limits and Design · Lesson 27 of 43**

## What you'll learn

- The single most common way Apex code accidentally breaches the SOQL and DML limits from Lesson 26
- Why "never put a SOQL query or a DML statement inside a loop" is the rule that matters most
- How to use a `Map` keyed by `Id` to replace repeated queries with one query and fast lookups
- How to collect records across a loop and issue one DML statement at the end instead of many
- How this connects back to the bulkification principle from Chapter 3

## The rule that matters most

If there is one rule that prevents more governor-limit failures than any other, it's this: **never issue a SOQL query or a DML statement inside a loop.** Chapter 3 introduced this idea for triggers specifically (bulkification), but it's a general Apex principle that applies everywhere, not just inside trigger bodies.

Here's the failure pattern, almost always written by someone who tested with one record and never noticed a problem:

```apex
// DON'T DO THIS
for (Contact con : contactsToUpdate) {
    Account acc = [SELECT Id, Name FROM Account WHERE Id = :con.AccountId]; // one query per iteration
    con.Description = 'Linked to ' + acc.Name;
    update con; // one DML statement per iteration
}
```

With 5 contacts, this issues 5 queries and 5 DML statements — comfortably inside the limits from Lesson 26. With 300 contacts (a perfectly normal bulk update, a data import, or a batch job), it issues 300 queries, which exceeds the 100-query synchronous limit, and 300 DML statements, which exceeds the 150-statement limit. The code was never wrong on a technicality — it was only ever tested at a scale where the problem couldn't show up.

## The fix: query once, look up with a Map

The standard fix is to move the query outside the loop entirely, fetch everything you need in one shot, and use a `Map<Id, SObjectType>` for fast in-memory lookups instead of a fresh query per record:

```apex
Set<Id> accountIds = new Set<Id>();
for (Contact con : contactsToUpdate) {
    accountIds.add(con.AccountId);
}

Map<Id, Account> accountsById = new Map<Id, Account>(
    [SELECT Id, Name FROM Account WHERE Id IN :accountIds]
);

for (Contact con : contactsToUpdate) {
    Account acc = accountsById.get(con.AccountId);
    if (acc != null) {
        con.Description = 'Linked to ' + acc.Name;
    }
}

update contactsToUpdate; // one DML statement total, regardless of list size
```

This version issues exactly **one** query and **one** DML statement, no matter whether `contactsToUpdate` holds 5 records or 5,000. The `Map<Id, Account>(listOfAccounts)` constructor — the same one Lesson 4 introduced — automatically keys the map by each Account's `Id` field, which is what makes the `.get(con.AccountId)` lookup work.

## Collecting records across a loop, then one DML at the end

The same pattern applies anytime you're building up records to insert or update: build a `List` across the loop, then issue a single DML statement after the loop ends, not inside it.

```apex
List<Task> followUpTasks = new List<Task>();
for (Opportunity opp : closedWonOpps) {
    Task t = new Task(
        WhatId = opp.Id,
        Subject = 'Kick off onboarding',
        ActivityDate = Date.today().addDays(2)
    );
    followUpTasks.add(t);
}
insert followUpTasks; // one statement, however many tasks were built
```

## Why this is the same idea as bulkification

Chapter 3's bulkification lessons taught exactly this discipline for trigger code, because a trigger always receives a batch of up to 200 records at once and has to assume there could be many more batches coming. This lesson generalizes the same discipline to any Apex code — a controller method, a batch job, a REST service — because the underlying governor limits in Lesson 26 apply per transaction, not per line of code or per object. The habit to build is simple: whenever you write a `for` loop, ask whether a SOQL query or a DML statement is about to end up inside it, and if so, move it outside.

## Key terms

| Term | Meaning |
|---|---|
| SOQL/DML-in-a-loop anti-pattern | Issuing a query or DML statement once per loop iteration instead of once total |
| `Map<Id, SObjectType>` lookup | Querying once into a Map keyed by Id, then using `.get()` for fast repeated lookups with zero extra queries |
| Collect-then-DML | Building a List across a loop and issuing one DML statement after the loop ends |

## Lab

In a Developer Edition org, create 10 test Contacts (via anonymous Apex, not one at a time by hand) each linked to a different Account. Write and run an anonymous Apex script that updates every one of those Contacts' `Description` field to include its Account's `Name`, using the Map-lookup pattern from this lesson — exactly one query and exactly one DML statement, regardless of how many Contacts you test with. Confirm with `Limits.getQueries()` and `Limits.getDmlStatements()` that each stayed at 1.

## Check yourself

Can you rewrite the "DON'T DO THIS" snippet from this lesson from memory, using the Map-lookup pattern, without looking back at the fixed version? Why does code that works fine with 5 test records sometimes fail in production with 300 real records?
