# Lesson 25 — Trigger Practice Lab

**Chapter 3 · Triggers · Lesson 25 of 43**

## What you'll learn

- How to combine everything from this chapter into one real trigger
- How a handler, bulkification, and a recursion guard fit together in one object
- How to trace a request through before, after, and a recursive re-entry
- How to verify a trigger's correctness with bulk test data

## The scenario

`Opportunity` needs three behaviors, all from this chapter:

1. **Before insert/update** — default `CloseDate` to 30 days out when blank
   (Lesson 20).
2. **After update** — whenever an Opportunity's `StageName` becomes `Closed
   Won`, bump the parent `Account`'s `Rating` to `'Hot'` (Lesson 20's
   after-trigger pattern, bulkified per Lesson 23).
3. That `Account` update must not cause unwanted recursion if anything on
   `Account` ever reacts back onto `Opportunity` (Lesson 24) — and the
   whole thing must be organized as a thin trigger plus handler (Lessons
   21–22), with exactly one trigger on `Opportunity`.

## The trigger (thin, one per object)

```apex
trigger OpportunityTrigger on Opportunity (before insert, before update, after update) {
    OpportunityTriggerHandler handler = new OpportunityTriggerHandler();

    if (Trigger.isBefore) {
        handler.beforeSave(Trigger.new);
    }
    if (Trigger.isAfter && Trigger.isUpdate) {
        handler.afterUpdate(Trigger.new, Trigger.oldMap);
    }
}
```

## The handler (bulk-safe, with a recursion guard)

```apex
public class OpportunityTriggerHandler {
    private static Set<Id> accountsAlreadyMarkedHot = new Set<Id>();

    public void beforeSave(List<Opportunity> opps) {
        for (Opportunity opp : opps) {
            if (opp.CloseDate == null) {
                opp.CloseDate = Date.today().addDays(30);
            }
        }
    }

    public void afterUpdate(List<Opportunity> newOpps, Map<Id, Opportunity> oldOppsById) {
        Set<Id> accountIdsToHeat = new Set<Id>();

        for (Opportunity opp : newOpps) {
            Opportunity oldOpp = oldOppsById.get(opp.Id);
            Boolean justWon = opp.StageName == 'Closed Won'
                && oldOpp.StageName != 'Closed Won';
            if (justWon && opp.AccountId != null
                    && !accountsAlreadyMarkedHot.contains(opp.AccountId)) {
                accountIdsToHeat.add(opp.AccountId);
            }
        }

        if (accountIdsToHeat.isEmpty()) {
            return;
        }

        Map<Id, Account> accountsById = new Map<Id, Account>(
            [SELECT Id, Rating FROM Account WHERE Id IN :accountIdsToHeat]
        );

        List<Account> accountsToUpdate = new List<Account>();
        for (Account acc : accountsById.values()) {
            if (acc.Rating != 'Hot') {
                acc.Rating = 'Hot';
                accountsToUpdate.add(acc);
            }
            accountsAlreadyMarkedHot.add(acc.Id);
        }

        if (!accountsToUpdate.isEmpty()) {
            update accountsToUpdate;
        }
    }
}
```

## Tracing the request

1. A user (or a Data Loader batch of up to 200 rows) updates Opportunities,
   some moving to `Closed Won`.
2. `OpportunityTrigger` fires once per 200-record batch. In the before
   phase, any blank `CloseDate` gets defaulted directly on `Trigger.new` —
   no DML needed.
3. After the save commits, the after phase runs. It collects only the
   `AccountId`s belonging to Opportunities that *just* became Closed Won,
   skipping any `Id` already in `accountsAlreadyMarkedHot` — the recursion
   / re-processing guard.
4. One SOQL query loads every needed Account by `Id`, into one `Map`.
5. One `update` statement saves every Account that actually needs
   `Rating = 'Hot'` — never one query or one DML call per record.
6. If anything on `Account` were to fire logic back onto `Opportunity`
   inside the same transaction, the guard's `Set<Id>` prevents this handler
   from redoing work for Accounts it already marked, instead of relying on
   a single all-or-nothing boolean.

## Key terms

| Term | Meaning |
|---|---|
| Thin trigger | `OpportunityTrigger` here — only detects context and calls the handler |
| Bulk-safe after logic | Collecting Ids into a Set, querying once with `IN`, updating once from a List |
| Recursion guard | The static `accountsAlreadyMarkedHot` Set preventing repeat work on the same Account within one transaction |
| End-to-end trace | Following one update through before, the commit, and after, including the guard check |

## Lab (capstone)

Build `OpportunityTrigger` and `OpportunityTriggerHandler` exactly as above
in a Developer Edition org or scratch org. Then:

1. Create an Account and three Opportunities under it, none `Closed Won`,
   two with a blank Close Date.
2. Update all three to `Closed Won = true`/`StageName = 'Closed Won'` in a
   single multi-row edit (or via Apex anonymous code using a `List<Opportunity>`
   and one `update` call, to simulate a real batch).
3. Confirm: the two blank Close Dates were defaulted during the save, the
   Account's `Rating` became `Hot`, and — check Setup → Debug Logs — only
   one SOQL query and one DML statement ran for the Account update, not
   three.
4. Then update one of the three Opportunities again (already Closed Won,
   changing an unrelated field like `Amount`). Confirm the Account is
   **not** re-queried/re-updated, since `justWon` is now false and the
   guard also has nothing new to do.

## Check yourself

Walk through the trace above from memory: which phase defaults `CloseDate`,
which phase updates the Account, and what specifically stops the Account
from being updated more than once per batch?
