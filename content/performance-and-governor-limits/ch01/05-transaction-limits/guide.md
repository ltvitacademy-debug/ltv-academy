# Lesson 5 — Transaction Limits

**Chapter 1 · Performance Foundations · Lesson 5 of 16**

## What you'll learn

- What actually defines the boundary of "one transaction" on Salesforce
- Why a single button click can chain together far more automation than it looks like it does
- How synchronous and asynchronous contexts each get their own fresh limit allowance
- Why understanding transaction boundaries is the key to diagnosing "mystery" limit exceptions

## A transaction is bigger than the code you wrote

A **transaction** is the full set of operations that execute together, as one atomic unit, triggered by a single user action or API call — and it is almost always much larger than just the one trigger or Apex method a developer wrote. A single record save can cascade through validation rules, multiple triggers (on the record itself and on related objects via workflow or process automation), Flow automation, and any Apex those steps invoke — all of it sharing the exact same governor limit budget from Lesson 2's table. If a Flow updates a child record, and that update fires a trigger, and that trigger's Apex issues 40 SOQL queries, those 40 queries count against the same 100-query synchronous ceiling as whatever queries ran earlier in the same save.

This is the real explanation behind one of the most confusing bugs on the platform: a trigger that queries 5 times and has clearly been bulk-tested still throws `Too many SOQL queries: 101`. The trigger itself isn't the problem — it's the last straw in a transaction that already had 96 queries spent by the time it ran, from automation the developer debugging the error may not even know exists on that object.

## Synchronous vs. asynchronous: separate budgets, separate transactions

When Apex code explicitly defers work — a `@future` method, a Queueable job, a Batch Apex execute chunk, or a Scheduled job — that deferred work runs in its **own, separate transaction**, with its own fresh allotment of every governor limit from Lesson 2's table (and the higher asynchronous ceilings specifically, such as 200 SOQL queries and 60,000 ms of CPU time instead of the synchronous 100 and 10,000 ms). This is precisely why asynchronous Apex is a standard escape valve for limit problems: it doesn't make the work itself cheaper, but it gives that work a fresh, larger budget instead of forcing it to share the original transaction's already-partially-spent one.

```apex
public class HeavyWorkQueueable implements Queueable {
    private List<Id> recordIds;

    public HeavyWorkQueueable(List<Id> recordIds) {
        this.recordIds = recordIds;
    }

    public void execute(QueueableContext context) {
        // Runs in its own transaction, with asynchronous limits:
        // 200 SOQL queries, 60,000 ms CPU time, 12 MB heap — a fresh budget,
        // independent of whatever the triggering transaction had already spent.
        List<Account> accounts = [SELECT Id, Name FROM Account WHERE Id IN :recordIds];
        // ... heavier processing here ...
    }
}
```

Enqueuing this from a trigger (`System.enqueueJob(new HeavyWorkQueueable(ids));`) hands the heavy lifting to a transaction that starts with a completely clean slate, rather than one that inherits whatever the synchronous save transaction had already consumed.

## Why this matters for diagnosis, not just design

Understanding transaction boundaries changes how you read a limit exception. `Too many SOQL queries: 101` doesn't mean "this method issued 101 queries" — it means "the cumulative total across everything that ran in this one transaction reached 101," which could be spread across a trigger, two Flows, and a workflow rule, none of which individually looks like the culprit. Debugging this kind of error means reconstructing the whole chain of automation that fired in that transaction, not just rereading the one class whose line number appears in the stack trace — a skill Chapter 2's debug log and Developer Console lessons build directly.

## Key terms

| Term | Meaning |
|---|---|
| Transaction | The full, atomic chain of automation (triggers, Flows, workflow, Apex) executing together from one user action or API call |
| Transaction boundary | The point where one transaction ends and, for deferred work, a new one with a fresh limit budget begins |
| @future / Queueable / Batch Apex | Mechanisms for deferring work into its own separate asynchronous transaction |
| Cumulative exception | A limit exception (e.g., "Too many SOQL queries: 101") reflecting the whole transaction's total usage, not just one method's |

## Lab

A client reports that saving an Opportunity sometimes throws `Too many SOQL queries: 101`, but only on certain records, and the Opportunity trigger itself clearly issues just one query. Write out, as a numbered list, the full set of places you would check to reconstruct what else runs in that same transaction (think: other triggers on Opportunity, triggers on related objects that might be touched by a Process Builder/Flow update, and any Apex those invoke) before concluding the Opportunity trigger itself needs to change.

## Check yourself

Can you explain why a trigger that "only queries 5 times" can still be implicated in a 101-query limit exception? Can you describe why moving heavy work into a Queueable job changes the available governor limit budget, not just when the work runs?
