# Lesson 11 — Optimizing Triggers and Flows

**Chapter 3 · Fixing Performance · Lesson 11 of 16**

## What you'll learn

- The one-trigger-per-object pattern and why it matters for predictable transaction behavior
- How to recognize and avoid recursive trigger invocations
- Why declarative automation (Flow) is not automatically exempt from the same bulkification concerns as Apex
- A combined before/after example touching both a trigger and the Flow it interacts with

## One trigger per object, with a handler class

A common, avoidable source of unpredictable transaction behavior is multiple triggers on the same object, each written independently, with no guaranteed order of execution between them. The standard fix is the **one trigger per object** pattern: exactly one trigger definition per object, which does nothing but delegate to a handler class:

```apex
trigger AccountTrigger on Account (before update, after update) {
    if (Trigger.isBefore && Trigger.isUpdate) {
        AccountTriggerHandler.beforeUpdate(Trigger.new, Trigger.oldMap);
    }
    if (Trigger.isAfter && Trigger.isUpdate) {
        AccountTriggerHandler.afterUpdate(Trigger.new, Trigger.oldMap);
    }
}

public class AccountTriggerHandler {
    public static void beforeUpdate(List<Account> newAccounts, Map<Id, Account> oldMap) {
        // All before-update logic lives here, bulk-safe by construction
        for (Account acc : newAccounts) {
            Account oldAcc = oldMap.get(acc.Id);
            if (acc.AnnualRevenue != oldAcc.AnnualRevenue) {
                acc.Rating = acc.AnnualRevenue > 1000000 ? 'Hot' : 'Warm';
            }
        }
    }

    public static void afterUpdate(List<Account> newAccounts, Map<Id, Account> oldMap) {
        // All after-update logic lives here
    }
}
```

With one trigger and all logic consolidated in a handler, there's a single, readable place to see everything that runs on an Account update, and a single place to apply bulk-safe patterns consistently — rather than five separate triggers each querying and updating independently, multiplying the total governor limit cost of the exact same transaction.

## Recursion: a trigger re-triggering itself

A trigger that updates the same object it's defined on can accidentally invoke itself again, consuming limit budget on a loop that does nothing but repeat work already done:

```apex
trigger AccountTrigger on Account (after update) {
    List<Account> toUpdate = new List<Account>();
    for (Account acc : Trigger.new) {
        if (acc.Rating != 'Hot') {
            acc.Rating = 'Hot';
            toUpdate.add(acc);
        }
    }
    if (!toUpdate.isEmpty()) {
        update toUpdate; // This update fires AccountTrigger's after-update again
    }
}
```

A simple static recursion guard prevents the trigger from reprocessing records it just handled:

```apex
public class AccountTriggerHandler {
    private static Boolean hasRun = false;

    public static void afterUpdate(List<Account> newAccounts) {
        if (hasRun) return;
        hasRun = true;
        // ... logic that may issue a DML update, safe to run exactly once per transaction ...
    }
}
```

Static variables persist for the life of a single transaction (not across transactions), which is exactly the scope needed here — the guard resets automatically on the next, separate transaction.

## Flows need the same bulk-awareness as Apex

Flow automation runs inside the same transaction and against the same governor limits as Apex — a Record-Triggered Flow configured to run "once per record" rather than against the whole trigger context, or one that contains a Get Records element inside a loop, creates exactly the same SOQL-in-a-loop problem Lesson 3 covered in Apex, just expressed declaratively instead of in code. A Flow with a loop that queries or performs a DML action (a Create Records or Update Records element) on each iteration, rather than collecting changes and performing one bulk element after the loop, consumes governor limit budget per record — and because Flow and Apex share the same transaction, a poorly-built Flow can be the actual cause of a governor limit exception that appears to come from an unrelated trigger, exactly the transaction-boundary trap from Lesson 5.

## Key terms

| Term | Meaning |
|---|---|
| One trigger per object | The pattern of exactly one trigger definition per object, delegating all logic to a handler class |
| Trigger handler | A class containing an object's trigger logic, called from the thin trigger itself |
| Recursion guard | A static variable preventing a trigger from reprocessing records it already handled within the same transaction |
| Flow loop anti-pattern | A Get/Create/Update Records element placed inside a Flow loop, consuming limit budget per iteration instead of once |

## Lab

Open a Record-Triggered Flow in a Developer Edition org's Flow Builder (or sketch one on paper if you don't have one built) that includes a loop over a collection of records. Identify whether any Get Records, Create Records, or Update Records element sits inside that loop. If so, describe in writing how you would restructure it to collect the needed changes into a collection variable during the loop, then perform exactly one bulk Create/Update Records element after the loop ends — mirroring the Apex bulkification pattern from Lesson 3.

## Check yourself

Can you explain why multiple independent triggers on the same object create unpredictable behavior, even if each one is individually bulk-safe? Can you describe how a recursion guard works and why a static variable is the right scope for it? Can you explain why a Flow needs the same bulk-awareness as Apex, even though no code is being written?
