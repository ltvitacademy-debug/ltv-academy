# Lesson 4 — Queueable Apex

**Chapter 1 · Asynchronous Processing · Lesson 4 of 16**

## What you'll learn

- How to implement the `Queueable` interface and submit a job with `System.enqueueJob`
- Why Queueable Apex can accept non-primitive parameters (like sObjects) when future methods can't
- How to get and use the job ID that `System.enqueueJob` returns
- The enqueue limits per transaction, and the `Database.AllowsCallouts` interface for callouts

## Implementing `Queueable`

A Queueable class implements the `Queueable` interface, which requires exactly one method: `execute`, taking a `QueueableContext` parameter.

```apex
public class AccountSyncJob implements Queueable {
    private List<Account> accountsToSync;

    public AccountSyncJob(List<Account> accountsToSync) {
        this.accountsToSync = accountsToSync;
    }

    public void execute(QueueableContext context) {
        for (Account acc : accountsToSync) {
            // Real sObjects can be passed straight into the constructor —
            // no need to pass just an Id and re-query, unlike a future method.
            acc.Last_Synced_At__c = System.now();
        }
        update accountsToSync;
    }
}
```

Submitting the job looks like this:

```apex
List<Account> toSync = [SELECT Id, Name FROM Account WHERE Needs_Sync__c = true];
Id jobId = System.enqueueJob(new AccountSyncJob(toSync));
```

Notice the constructor takes a real `List<Account>` — this is the first big advantage over future methods. Because a Queueable instance is serialized as a whole object (not just a set of primitive arguments), it can carry sObjects, custom Apex classes, and other non-primitive types directly.

## You get a job ID back

`System.enqueueJob` returns the `Id` of the newly created `AsyncApexJob` record. Unlike a future method call (which gives you nothing to hold onto), you can store that ID and query `AsyncApexJob` later to check on the job's `Status`, `NumberOfErrors`, and so on — the same mechanism Lesson 9 covers for monitoring jobs in Setup.

```apex
Id jobId = System.enqueueJob(new AccountSyncJob(toSync));
System.debug('Queued job: ' + jobId);
```

One exception worth knowing now and revisiting in Lesson 15: `System.enqueueJob` returns `null` when it's called inside a running test, so don't write test assertions that depend on getting a real ID back in that context.

## Enqueue limits

- A single transaction can call `System.enqueueJob` up to **50 times**.
- If the code calling `System.enqueueJob` is itself already running asynchronously (for example, inside a Batch Apex `execute` method), that asynchronous transaction can only enqueue **one** job, not 50.
- `Limits.getQueueableJobs()` returns how many Queueable jobs the current transaction has already enqueued, so code can check its own usage before enqueuing more.

## Callouts from a Queueable job

A Queueable job that needs to make an HTTP callout must implement `Database.AllowsCallouts` in addition to `Queueable`:

```apex
public class AccountSyncJob implements Queueable, Database.AllowsCallouts {
    public void execute(QueueableContext context) {
        HttpRequest req = new HttpRequest();
        req.setEndpoint('callout:External_CRM/sync');
        req.setMethod('POST');
        new Http().send(req);
    }
}
```

Without `Database.AllowsCallouts` on the class, attempting a callout inside `execute` throws a runtime error — the same spirit as `@future(callout=true)`, just expressed as an interface instead of an annotation argument.

## Why Queueable Apex is the modern default

Compared to a future method, Queueable Apex gives you: real parameter types instead of primitives-only, a job ID you can actually track, and — covered in full in Lesson 7 — the ability for a job's `execute` method to enqueue a *second* job when it finishes, chaining work together. None of that is available to a plain future method. For any new asynchronous requirement that isn't trivially simple, Queueable Apex is the better starting point.

## Key terms

| Term | Meaning |
|---|---|
| `Queueable` | The interface a class implements to run as a Queueable job, requiring an `execute(QueueableContext)` method |
| `System.enqueueJob` | The method that submits a Queueable instance to run asynchronously, returning its job `Id` |
| `Database.AllowsCallouts` | The interface a Queueable class must also implement to make HTTP callouts inside `execute` |
| `Limits.getQueueableJobs()` | Returns how many Queueable jobs the current transaction has already enqueued |

## Lab

Write a Queueable class named `OpportunityStageSync` whose constructor takes a `List<Opportunity>`, and whose `execute` method updates a custom field `Synced__c` to `true` on each one and saves them. Then write the line of code that enqueues it, capturing the returned job `Id` into a variable. Finally, add `Database.AllowsCallouts` to the class and sketch (in a comment) what callout you'd add if this job also needed to notify an external system.

## Check yourself

Can you name two concrete advantages Queueable Apex has over a future method? Can you write the `execute(QueueableContext context)` method signature from memory, and explain what you'd add to the class declaration if it needed to make a callout?
