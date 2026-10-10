# Lesson 24 — Avoiding Recursion in Triggers

**Chapter 3 · Triggers · Lesson 24 of 43**

## What you'll learn

- How a trigger can accidentally re-fire itself through its own DML
- What `Maximum trigger depth exceeded` means
- The static-boolean recursion-guard pattern, and its known limitation
- A more robust alternative: tracking processed record Ids

## How a trigger triggers itself

An `after update` trigger that performs `update` on the *same object* it's
bound to will fire itself again — because that `update` is itself a DML
event on the same sObject:

```apex
trigger AccountTrigger on Account (after update) {
    List<Account> toUpdate = new List<Account>();
    for (Account acc : Trigger.new) {
        if (acc.AnnualRevenue > 1000000 && acc.Rating != 'Hot') {
            acc.Rating = 'Hot';
            toUpdate.add(acc);
        }
    }
    if (!toUpdate.isEmpty()) {
        update toUpdate;   // this update fires AccountTrigger again!
    }
}
```

That `update toUpdate` is a second `after update` on `Account` — which
fires `AccountTrigger` a second time. If the recursive run keeps finding
records that still qualify, this can recurse until Salesforce aborts with
`System.Exception: Maximum trigger depth exceeded`, or it can simply run
the same logic — and any related side effects — more times than intended.

In this specific example the `acc.Rating != 'Hot'` check actually stops the
recursion (the second pass finds nothing left to update), but that's easy
to lose once the logic gets more complex, and it's fragile to rely on.

## The static-boolean guard

The common first pattern for preventing this is a `static Boolean` flag.
Static variables persist for the life of one transaction (not one class
instantiation), so a flag set during the first run is still set when the
trigger re-fires within the same transaction:

```apex
public class AccountTriggerHandler {
    private static Boolean isRunning = false;

    public void afterUpdate(List<Account> newAccounts) {
        if (isRunning) {
            return;  // already inside a run — this is the recursive re-entry
        }
        isRunning = true;

        List<Account> toUpdate = new List<Account>();
        for (Account acc : newAccounts) {
            if (acc.AnnualRevenue > 1000000 && acc.Rating != 'Hot') {
                acc.Rating = 'Hot';
                toUpdate.add(acc);
            }
        }
        if (!toUpdate.isEmpty()) {
            update toUpdate;
        }

        isRunning = false;
    }
}
```

The first call sets `isRunning = true`, does its work, and the `update`
inside it re-enters `afterUpdate` — which immediately returns because
`isRunning` is already `true`. Control returns to the original call, which
then resets the flag to `false`.

## The known limitation of a plain boolean

A single shared boolean blocks *all* re-entry, which can be too blunt: if a
genuinely new, unrelated batch of records needs to go through the same
handler later in the same transaction, the flag (if left `true` by a bug,
or if the guard logic is coarser than this example) can skip records that
should have been processed. The safer general-purpose version tracks which
specific record Ids have already been handled, instead of blocking
everything:

```apex
public class AccountTriggerHandler {
    private static Set<Id> processedAccountIds = new Set<Id>();

    public void afterUpdate(List<Account> newAccounts) {
        List<Account> toUpdate = new List<Account>();
        for (Account acc : newAccounts) {
            if (processedAccountIds.contains(acc.Id)) {
                continue;  // already handled this specific record
            }
            if (acc.AnnualRevenue > 1000000 && acc.Rating != 'Hot') {
                acc.Rating = 'Hot';
                toUpdate.add(acc);
            }
            processedAccountIds.add(acc.Id);
        }
        if (!toUpdate.isEmpty()) {
            update toUpdate;
        }
    }
}
```

This guards per-record rather than per-transaction-wide, so unrelated
records processed later in the same transaction aren't silently skipped.

## Static variables reset per transaction

Either guard only works because static variables live for the duration of
one transaction. A later, separate transaction starts with `isRunning` back
at `false` and `processedAccountIds` empty — the guard never "sticks"
across unrelated requests.

## Key terms

| Term | Meaning |
|---|---|
| Trigger recursion | A trigger's own DML causing it to fire again on the same object |
| `Maximum trigger depth exceeded` | The runtime error when recursive re-firing goes unchecked |
| Static boolean guard | A `static Boolean` flag that blocks re-entry while a handler is already running |
| Static Set<Id> guard | A `static Set<Id>` tracking which specific records have already been processed, avoiding the boolean's all-or-nothing behavior |

## Lab

Reproduce the problem on purpose: write the un-guarded `AccountTrigger`
above (minus the `Rating != 'Hot'` safety check, so it always re-updates)
and update an Account with `AnnualRevenue > 1000000` from the UI. Confirm
you get `Maximum trigger depth exceeded`. Then add the `static Set<Id>`
guard from this lesson to `AccountTriggerHandler`, retest, and confirm the
Account updates cleanly to `Rating = 'Hot'` with no error.

## Check yourself

Why does a `static Boolean` guard work at all — what makes it still be
`true` when the trigger re-enters from its own `update` call — and what's
the downside of using a single shared flag instead of tracking specific
record Ids?
