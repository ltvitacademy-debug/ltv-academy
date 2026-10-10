# Lesson 8 — Testing Triggers and Bulk Behavior

**Chapter 2 · Testing Well · Lesson 8 of 18**

## What you'll learn

- Why a trigger that passes with 1 record can still fail catastrophically with 200
- The specific governor-limit mistakes bulk tests are designed to catch (SOQL/DML inside loops)
- How to write a bulk test that actually proves bulk-safety, not just "it ran without error"
- Why testing exactly 1, exactly 200, and 201 records are each meaningfully different cases

## Triggers always run in bulk

Every Salesforce trigger fires once per transaction, but it receives `Trigger.new` as a **list** — even when a user saves a single record through the UI, the trigger code runs with a list containing exactly one item. The moment someone imports a spreadsheet, runs a mass update, or a batch job processes records, that same trigger can receive 200 records in `Trigger.new` at once (200 being the default batch size for most bulk DML operations). A trigger written with the assumption that it only ever handles one record — a SOQL query or DML statement sitten inside a `for` loop over `Trigger.new` — works perfectly in every manual UI test and then fails the first time it meets a real bulk operation, by blowing through the governor limits covered in Lesson 15 (100 SOQL queries, 150 DML statements per transaction).

```apex
// NOT bulk-safe — one SOQL query per record in Trigger.new
trigger AccountTrigger on Account (before update) {
    for (Account acc : Trigger.new) {
        List<Contact> contacts = [SELECT Id FROM Contact WHERE AccountId = :acc.Id]; // inside the loop!
        // ...
    }
}
```

```apex
// Bulk-safe — one SOQL query total, regardless of how many Accounts fired the trigger
trigger AccountTrigger on Account (before update) {
    Set<Id> accountIds = new Set<Id>();
    for (Account acc : Trigger.new) {
        accountIds.add(acc.Id);
    }
    Map<Id, List<Contact>> contactsByAccount = new Map<Id, List<Contact>>();
    for (Contact c : [SELECT Id, AccountId FROM Contact WHERE AccountId IN :accountIds]) {
        // group into the map...
    }
}
```

A test that only ever inserts one Account will pass against either version of this trigger — the unsafe version's single query doesn't hit any limit with just one record. The bug is completely invisible until the trigger receives enough records at once, which is exactly why a dedicated bulk test is non-negotiable for any trigger.

## Writing a test that actually proves bulk safety

The test that catches the unsafe version above inserts enough records in one DML statement to simulate a real bulk operation:

```apex
@isTest
static void triggerHandlesTwoHundredRecordsInOneTransaction() {
    List<Account> accounts = new List<Account>();
    for (Integer i = 0; i < 200; i++) {
        accounts.add(new Account(Name = 'Bulk Test ' + i));
    }

    Test.startTest();
    insert accounts; // fires AccountTrigger once, with all 200 in Trigger.new
    Test.stopTest();

    List<Account> updated = [SELECT Id, SomeField__c FROM Account WHERE Id IN :accounts];
    System.assertEquals(200, updated.size());
    for (Account acc : updated) {
        System.assertNotEquals(null, acc.SomeField__c, 'Every record in the bulk batch should be processed');
    }
}
```

This single `insert accounts` statement fires the trigger exactly once, with all 200 Accounts in `Trigger.new` simultaneously — the unsafe version above would issue 200 separate SOQL queries inside that one trigger invocation and fail against the 100-query synchronous limit well before reaching the 200th record, something a single-record test could never reveal.

## Test the boundary, not just the middle

200 is Salesforce's commonly cited default batch size for many bulk DML contexts, which makes it a reasonable round number to test against — but don't stop there. A genuinely rigorous trigger test suite also checks:

- **Exactly 1 record** — the "normal UI save" case, proving the bulk-safe rewrite didn't break the simple path.
- **0 records** — an empty list passed in; make sure nothing throws on an empty `Trigger.new`.
- **A number just over a batch boundary** (201, or whatever boundary matters for your specific logic) — to catch off-by-one mistakes in any loop logic that assumes an exact multiple of some batch size.

## Key terms

| Term | Meaning |
|---|---|
| Bulk-safe | Trigger or handler logic written to work correctly regardless of how many records fire it in one transaction |
| `Trigger.new` | The list of new/updated record versions available inside a trigger, always a list even for a single-record save |
| SOQL/DML in a loop | The classic Salesforce anti-pattern of issuing a query or DML statement once per record instead of once per transaction |
| Bulk test | A test that inserts/updates many records in a single DML statement to prove the trigger handles them all correctly in one trigger invocation |

## Lab

Find a trigger in your org (or write a simple one) and deliberately write its handler with a SOQL query inside a loop over `Trigger.new`. Write a single-record test first and confirm it passes. Then write a 200-record bulk test like the one above and watch it fail with a governor limit exception. Fix the handler to query once outside the loop using a `Set<Id>` and a bulk SOQL query, and confirm the same bulk test now passes.

## Check yourself

Can you explain why a trigger test that only ever inserts one record at a time can pass even when the trigger has a serious bulk-safety bug? Can you describe the specific anti-pattern ("SOQL/DML in a loop") that bulk tests are designed to catch, and why it only becomes a problem at a certain record count?
