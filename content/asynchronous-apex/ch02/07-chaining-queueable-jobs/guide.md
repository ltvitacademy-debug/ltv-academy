# Lesson 7 — Chaining Queueable Jobs

**Chapter 2 · Working With Async Jobs · Lesson 7 of 16**

## What you'll learn

- How a Queueable job enqueues a follow-up job from inside its own `execute` method
- The chain-depth rules: effectively unlimited in production, capped at 5 in Developer/Trial orgs
- The `Test.isRunningTest()` guard needed to chain jobs safely inside tests
- The optional `delay` parameter and why unthrottled chains can burn through the daily async limit

## Chaining: a job enqueues the next job

One of Queueable Apex's real advantages over a future method (Lesson 4) is that a job's `execute` method can call `System.enqueueJob` again, submitting a follow-up job as its very last action:

```apex
public class ImportStepOne implements Queueable {
    public void execute(QueueableContext context) {
        // ... do step one's work ...

        if (!Test.isRunningTest()) {
            System.enqueueJob(new ImportStepTwo());
        }
    }
}

public class ImportStepTwo implements Queueable {
    public void execute(QueueableContext context) {
        // ... do step two's work, now that step one has committed ...
    }
}
```

This is useful whenever a multi-step process needs each step to fully commit before the next one starts — for example, importing records in step one, then running validation or notification logic in step two only after those records definitely exist.

## Chain depth limits

In a **production** org, there's no hard-enforced limit on how deep a chain can go — a job can enqueue a job, which enqueues another, and so on. But **Developer Edition and Trial orgs cap the stack depth at 5**, meaning the original job plus four chained re-queues. Salesforce's documentation notes this default can be overridden for specific use cases, but the default assumption for a Developer org is: design your chains to need, at most, five links, or request the override if your use case genuinely needs more.

## The `Test.isRunningTest()` guard

Chaining a Queueable job inside another test's execution context produces an error — Apex tests don't allow enqueuing a second asynchronous job from inside a job that's already running as part of `Test.startTest()` / `Test.stopTest()`. The standard workaround, shown in the `ImportStepOne` example above, is to check `Test.isRunningTest()` before chaining and skip the chain call in a test context. This lets your test exercise `ImportStepOne` on its own without the chain attempt breaking the test. (Lesson 15 covers Apex testing patterns for asynchronous code more broadly.)

## The `delay` parameter

`System.enqueueJob` has an overload that accepts a minimum delay, in minutes, before the chained job becomes eligible to run:

```apex
System.enqueueJob(new ImportStepTwo(), 5); // wait at least 5 minutes
```

The delay can be set from 0 to 10 minutes, and it's ignored when running inside a test. This is useful when a chained job needs to wait on something external to settle — for example, giving a downstream system time to finish processing before the next step polls it for a result, or deliberately throttling a chain that would otherwise call a rate-limited external API too quickly.

## Why unthrottled chains are dangerous

A chain with no stopping condition, or one that fires chained jobs as fast as the platform allows, can rapidly consume the shared daily limit on asynchronous Apex executions covered in Lesson 11 — that pool is shared across every future method, Queueable job, Batch Apex execution, and Scheduled Apex run in the org, for the entire day. A chain that runs away (for example, a bug where a job always re-enqueues itself regardless of whether there's more work to do) can burn through that budget and block other asynchronous processes in the org from running at all. Every chaining design needs an explicit stopping condition — a counter, a "no more records left to process" check, or similar — checked *before* the next `System.enqueueJob` call, not after.

## Key terms

| Term | Meaning |
|---|---|
| Chaining | A Queueable job's `execute` method enqueuing a follow-up Queueable job as its last action |
| Chain depth | How many jobs deep a chain goes; unlimited in production by default, capped at 5 in Developer/Trial orgs |
| `Test.isRunningTest()` | Guard used to skip chaining logic when running inside an Apex test |
| `System.enqueueJob(job, delay)` | Enqueues a job with a minimum delay (0–10 minutes) before it becomes eligible to run |

## Lab

Take the `ImportStepOne` / `ImportStepTwo` pattern above and extend it to three steps: `ImportStepOne` chains to `ImportStepTwo`, which chains to `ImportStepThree`. Add an explicit stopping condition to `ImportStepTwo` — a boolean field or query result — so that it only chains to `ImportStepThree` if there's actually more work left to do. Write out all three class skeletons, including the `Test.isRunningTest()` guard on every chain call.

## Check yourself

Can you explain, from memory, why chaining a Queueable job inside an Apex test requires a `Test.isRunningTest()` guard? Can you explain the real-world risk of a chain with no stopping condition, in terms of the shared daily async limit?
