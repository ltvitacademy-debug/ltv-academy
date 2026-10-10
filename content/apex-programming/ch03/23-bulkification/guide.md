# Lesson 23 — Bulkification

**Chapter 3 · Triggers · Lesson 23 of 43**

## What you'll learn

- Why a trigger can receive up to 200 records in a single invocation
- Why SOQL or DML inside a loop over `Trigger.new` breaks at scale
- The query-once-outside-the-loop pattern using Sets and Maps
- How to design a trigger that behaves the same for 1 record or 200

## Triggers run in batches, not one record at a time

Salesforce doesn't fire a trigger once per record. DML operations are
processed in batches of up to **200 records** per trigger invocation — a
single screen save might pass in 1 record, but a Data Loader import or a
bulk API call can pass in 200 at once, and your trigger runs exactly once
for that whole batch. If 450 records are being inserted, the trigger fires
three times: 200, 200, then 50.

That means code that only thinks about "the record" (singular) will work
fine in manual testing and then fail — or blow through a governor limit —
the moment someone does a real data load.

## The mistake: SOQL or DML inside the loop

```apex
trigger OpportunityTrigger on Opportunity (after update) {
    for (Opportunity opp : Trigger.new) {
        Account acc = [SELECT Id, Rating FROM Account WHERE Id = :opp.AccountId];
        acc.Rating = 'Hot';
        update acc;  // one query AND one DML statement per record!
    }
}
```

With one record this runs fine: 1 query, 1 DML. With 200 records in the
batch, it's 200 queries and 200 DML statements in the same transaction.
Apex limits synchronous code to 100 SOQL queries and 150 DML statements per
transaction — so this trigger works in every manual test and then throws
`System.LimitException: Too many SOQL queries` the first time it runs
against a real bulk load.

## The fix: query once, outside the loop

```apex
trigger OpportunityTrigger on Opportunity (after update) {
    Set<Id> accountIds = new Set<Id>();
    for (Opportunity opp : Trigger.new) {
        accountIds.add(opp.AccountId);
    }

    Map<Id, Account> accountsById = new Map<Id, Account>(
        [SELECT Id, Rating FROM Account WHERE Id IN :accountIds]
    );

    List<Account> accountsToUpdate = new List<Account>();
    for (Opportunity opp : Trigger.new) {
        Account acc = accountsById.get(opp.AccountId);
        if (acc != null && acc.Rating != 'Hot') {
            acc.Rating = 'Hot';
            accountsToUpdate.add(acc);
        }
    }

    if (!accountsToUpdate.isEmpty()) {
        update accountsToUpdate;
    }
}
```

This is always exactly **one SOQL query and one DML statement**, no matter
whether the batch has 1 record or 200:

1. Loop once to collect every `AccountId` into a `Set<Id>` (a set
   automatically removes duplicates, so repeated Account Ids across many
   Opportunities don't cause repeated queries).
2. Run a single SOQL query with `WHERE Id IN :accountIds`, and load the
   results straight into an Id-keyed `Map` for O(1) lookup.
3. Loop again, looking each Account up in the map instead of querying,
   and collect the ones that actually need updating into a list.
4. Issue one `update` on the whole list after the loop.

## Test with more than one record

A single-record test in the Developer Console can hide a bulkification bug
completely — it only shows up once SOQL/DML actually runs more than once.
This is exactly why Apex test methods (covered in Chapter 2) should insert
lists of 200+ records, not just one, before asserting your trigger's
behavior.

## Key terms

| Term | Meaning |
|---|---|
| Bulkification | Writing trigger code that performs the same fixed number of SOQL/DML operations regardless of batch size |
| Batch | Up to 200 records passed into a single trigger invocation |
| `Set<Id>` | Used to collect unique Ids before a single bulk query |
| `Map<Id, sObject>` | Used to look up related records by Id without querying per record |

## Lab

Write an `after update` trigger on `Contact` that, whenever a Contact's
`MailingCity` changes, updates its parent `Account`'s `BillingCity` to
match — using the query-once pattern above (collect Account Ids into a
`Set<Id>`, query once with `IN`, build a `Map`, update once). Then, using
Data Loader or Apex anonymous code, update 200+ Contacts across several
Accounts in a single operation and confirm no governor-limit error occurs.

## Check yourself

If a trigger fires with 200 records in one batch, and the trigger body
contains a SOQL query inside a `for` loop over `Trigger.new`, how many times
does that query run — and why does that matter?
