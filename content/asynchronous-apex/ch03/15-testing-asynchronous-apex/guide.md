# Lesson 15 — Testing Asynchronous Apex

**Chapter 3 · Choosing and Practicing · Lesson 15 of 16**

## What you'll learn

- How `Test.startTest()` / `Test.stopTest()` forces queued async work to run synchronously for assertions
- Why `System.enqueueJob` returns `null` in a running test, and what that means for your assertions
- How to test a future method, a Queueable job, and a Batch Apex class, each with a worked example
- How to test Scheduled Apex by asserting against `CronTrigger` rather than waiting for a real clock

## `Test.startTest()` / `Test.stopTest()`: the core mechanism

Every asynchronous test in Apex depends on one mechanism: any future method call, Queueable job, or Batch Apex execution **queued between `Test.startTest()` and `Test.stopTest()` actually runs — synchronously — at the moment `Test.stopTest()` is called**, before `stopTest()` returns control to the rest of the test method. This is what lets a test assert on the *results* of asynchronous work without needing a real clock or a real wait.

```apex
@isTest
private class AccountNotifierTest {
    @isTest
    static void testFutureMethodRunsAndUpdatesRecord() {
        Account acc = new Account(Name = 'Test Account');
        insert acc;

        Test.startTest();
        AccountNotifier.notifyExternalSystem(new Set<Id>{ acc.Id });
        Test.stopTest(); // the future method actually executes here

        // By this point, the future method has already run synchronously.
        Account updated = [SELECT Last_Synced_At__c FROM Account WHERE Id = :acc.Id];
        System.assertNotEquals(null, updated.Last_Synced_At__c);
    }
}
```

Work already queued **before** `Test.startTest()` is not what gets flushed by `Test.stopTest()` — the call you're testing needs to happen inside the `startTest`/`stopTest` block for this to apply.

## Testing a Queueable job

```apex
@isTest
private class AccountSyncJobTest {
    @isTest
    static void testQueueableUpdatesAccounts() {
        Account acc = new Account(Name = 'Test Account');
        insert acc;

        Test.startTest();
        System.enqueueJob(new AccountSyncJob(new List<Account>{ acc }));
        Test.stopTest();

        Account updated = [SELECT Last_Synced_At__c FROM Account WHERE Id = :acc.Id];
        System.assertNotEquals(null, updated.Last_Synced_At__c);
    }
}
```

Remember from Lesson 4: `System.enqueueJob` returns `null` when called inside a running test, so don't write an assertion that depends on getting back a real job `Id` — assert on the *outcome* of the job's work instead, as above.

## Testing Batch Apex

```apex
@isTest
private class StaleLeadCleanupBatchTest {
    @isTest
    static void testBatchArchivesStaleLeads() {
        Lead ld = new Lead(
            LastName = 'Test',
            Company = 'Test Co',
            CreatedDate = Date.today().addMonths(-20) // not settable directly; see note below
        );
        insert ld;

        Test.startTest();
        Database.executeBatch(new StaleLeadCleanupBatch());
        Test.stopTest(); // all batch chunks run here, synchronously

        Lead updated = [SELECT Archived__c FROM Lead WHERE Id = :ld.Id];
        System.assertEquals(true, updated.Archived__c);
    }
}
```

`Test.stopTest()` runs every chunk of the batch job synchronously before the test method continues. (One realistic wrinkle: fields like `CreatedDate` normally can't be set directly on insert — a real test for a date-filtered query like this one typically uses `Test.setCreatedDate(ld.Id, ...)` after insert, or restructures the query's filter to something the test can control directly. The point to take from this example is the `Test.startTest()` / `Database.executeBatch` / `Test.stopTest()` shape, not the exact date-manipulation mechanics.)

## Testing Scheduled Apex

Scheduled Apex is tested differently — there's no job *result* to assert on directly, since `execute` here just enqueues other work. Instead, assert that the schedule was registered correctly against `CronTrigger`:

```apex
@isTest
private class NightlyAccountSyncScheduleTest {
    @isTest
    static void testScheduleRegistersCorrectly() {
        String cronExpression = '0 0 1 * * ?';

        Test.startTest();
        String jobId = System.schedule(
            'Nightly Account Sync Test',
            cronExpression,
            new NightlyAccountSyncSchedule()
        );
        Test.stopTest();

        CronTrigger ct = [SELECT CronExpression, NextFireTime FROM CronTrigger WHERE Id = :jobId];
        System.assertEquals('0 0 1 * * ?', ct.CronExpression);
    }
}
```

This confirms the scheduling call itself worked and registered the expected CRON expression — it isn't meant to prove the eventual nightly sync logic works, which is better covered by a direct unit test of the Queueable job it enqueues.

## Chained Queueable jobs need the `Test.isRunningTest()` guard

As Lesson 7 covered, a Queueable job that chains into another job will throw an error if the chain call executes inside a test's `execute`. That's exactly why production chaining code checks `Test.isRunningTest()` before calling `System.enqueueJob` again — it lets a test exercise the first job in a chain without the chain attempt breaking the test run.

## Key terms

| Term | Meaning |
|---|---|
| `Test.startTest()` / `Test.stopTest()` | Marks the block whose queued async work runs synchronously at `stopTest()`, before the test continues |
| Null job Id in tests | `System.enqueueJob` returns `null` inside a running test — assert on outcomes, not the returned Id |
| `CronTrigger` assertion | The way to test Scheduled Apex: assert the registered schedule, not a job result |

## Lab

Write a complete test method for the `AccountNightlySyncJob` Queueable class from Lesson 14: insert an Account with `Needs_External_Sync__c = true`, enqueue the job inside `Test.startTest()`/`Test.stopTest()`, and assert that `Needs_External_Sync__c` was cleared afterward. (You don't need a real callout mock for this lab — note in a comment that a real test of this class would need an `HttpCalloutMock` implementation, which is beyond this lesson's scope.)

## Check yourself

Can you explain, from memory, what `Test.startTest()` / `Test.stopTest()` actually does to asynchronous work queued inside it? Can you explain why Scheduled Apex tests assert against `CronTrigger` rather than against a job result, and why `System.enqueueJob`'s returned value can't be used in a test assertion?
