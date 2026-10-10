# Lesson 11 — Testing Asynchronous Apex

**Chapter 2 · Testing Well · Lesson 11 of 18**

## What you'll learn

- Why asynchronous Apex (`@future`, Queueable, Batch) would be nearly impossible to test without special handling
- How `Test.startTest()` / `Test.stopTest()` force queued async work to run synchronously for the test
- The pattern for testing a Queueable job, a `@future` method, and a Batch Apex class
- `Test.isRunningTest()` and when it's acceptable to use it

## The problem: async code doesn't run "now"

Code annotated `@future`, implementing `Queueable`, or implementing `Database.Batchable` doesn't execute immediately when you call it — it gets enqueued and runs later, on Salesforce's own schedule, outside the transaction that enqueued it. In production that's exactly the point: offloading slow or bulk work so the user's transaction doesn't wait on it. In a test, though, a test method that finishes before the enqueued job actually runs would have nothing to assert against — the whole point of the test is to check what the async job *did*, and if it hasn't run yet, there's nothing there to check.

## Test.startTest() and Test.stopTest() solve this

This is the other major job `Test.startTest()` / `Test.stopTest()` perform, beyond the fresh governor-limit context covered in Lesson 1. Any asynchronous work enqueued between `Test.startTest()` and `Test.stopTest()` — a `@future` call, a Queueable job added with `System.enqueueJob`, a scheduled job, a batch job kicked off with `Database.executeBatch` — is held and then run synchronously, in full, the moment `Test.stopTest()` executes, before the test method continues past that line. This is exactly what the Apex Developer Guide describes as ensuring "all asynchronous calls that come after the `startTest` method are run before doing any assertions."

```apex
@isTest
static void queueableJobUpdatesRelatedRecords() {
    Account acc = TestDataFactory.createAccount('Acme Corp');
    insert acc;

    Test.startTest();
    System.enqueueJob(new AccountEnrichmentQueueable(new List<Id>{ acc.Id }));
    Test.stopTest(); // the Queueable actually runs here, synchronously

    Account updated = [SELECT EnrichedAt__c FROM Account WHERE Id = :acc.Id];
    Assert.isNotNull(updated.EnrichedAt__c, 'The queued job should have stamped EnrichedAt__c by now');
}
```

Without `Test.stopTest()`, nothing guarantees `AccountEnrichmentQueueable.execute()` has run by the time the test tries to query the result back — with it, the job's `execute()` method has definitely already finished.

## The same pattern applies to each async type

A `@future` method enqueued the same way:

```apex
@isTest
static void futureMethodSendsNotification() {
    Test.startTest();
    NotificationService.sendWelcomeEmailAsync(userId); // @future method
    Test.stopTest(); // runs synchronously here

    // assert on whatever side effect the future method produced
}
```

A Batch Apex job started inside the same block runs to completion (all its batches, regardless of scope size) by the time `Test.stopTest()` returns:

```apex
@isTest
static void batchJobProcessesAllRecords() {
    insert TestDataFactory.createAccounts(50);

    Test.startTest();
    Database.executeBatch(new AccountCleanupBatch());
    Test.stopTest(); // all batches of AccountCleanupBatch run here

    List<Account> cleaned = [SELECT Id FROM Account WHERE Status__c = 'Cleaned'];
    Assert.areEqual(50, cleaned.size());
}
```

## Test.isRunningTest()

`Test.isRunningTest()` returns `true` when the currently executing code is running inside a test context, and `false` otherwise. It exists mainly so production code can occasionally branch around something that's genuinely untestable any other way — most commonly, skipping a real external callout a class would otherwise always attempt, in code that for some structural reason can't take a mock the normal way. Reach for this sparingly: branching application logic on "am I in a test" is a design smell most of the time, since it means your test isn't actually exercising the same code path production traffic does. The callout-mocking pattern from Lesson 10 is almost always the better answer when the issue is callouts specifically — save `Test.isRunningTest()` for genuine last-resort cases.

## Key terms

| Term | Meaning |
|---|---|
| Asynchronous Apex | Code (`@future`, Queueable, Batch, Scheduled) that runs later, outside the transaction that enqueued it |
| `Test.startTest()` / `Test.stopTest()` | In addition to giving fresh governor limits, forces any async work enqueued between them to run synchronously at `stopTest()` |
| `System.enqueueJob` | Adds a Queueable job to the execution queue |
| `Test.isRunningTest()` | Returns true when code is executing inside a test context; used sparingly to branch around truly untestable logic |

## Lab

Write a simple Queueable class that takes a list of Account Ids and updates a custom field on each. Write a test that inserts a few Accounts, calls `System.enqueueJob` with your Queueable inside a `Test.startTest()`/`Test.stopTest()` block, and asserts the field was updated on every Account immediately after `Test.stopTest()` returns — no `Test.isRunningTest()`, no sleep, no polling required.

## Check yourself

Can you explain why a test for asynchronous Apex would have nothing to assert against without `Test.startTest()` / `Test.stopTest()`? Can you describe what happens to a `@future` method, a Queueable job, and a Batch Apex job enqueued between those two calls?
