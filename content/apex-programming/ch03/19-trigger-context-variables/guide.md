# Lesson 19 — Trigger Context Variables

**Chapter 3 · Triggers · Lesson 19 of 43**

## What you'll learn

- The full set of implicit `Trigger.*` context variables
- Which event each variable is and isn't available in
- Why `Trigger.old` doesn't exist on insert, and `Trigger.new` doesn't exist on delete
- How to branch trigger logic using the `Trigger.is*` booleans

## Where context variables come from

Every trigger runs with a set of implicit variables, all accessed through
the reserved `Trigger` keyword. You never declare them — Apex populates them
for you based on what fired the trigger.

```apex
trigger AccountTrigger on Account (before insert, before update) {
    System.debug('Records in this batch: ' + Trigger.size);
}
```

## The record-list variables

| Variable | Contains | Available in |
|---|---|---|
| `Trigger.new` | Current (new) versions of the records | insert, update, undelete |
| `Trigger.old` | Previous (old) versions of the records | update, delete |
| `Trigger.newMap` | `Trigger.new` records keyed by `Id` | before update, after insert, after update, after undelete |
| `Trigger.oldMap` | `Trigger.old` records keyed by `Id` | update, delete |

Two gotchas worth memorizing:

- **No `Trigger.new` on delete.** A record being deleted has no "new"
  version — only `Trigger.old` exists in a delete trigger.
- **No `Trigger.old` on insert.** A brand-new record has no prior version —
  only `Trigger.new` exists in an insert trigger.

Referencing the wrong one for the current context throws a runtime error,
so always match the variable to the event you're in.

```apex
trigger OpportunityTrigger on Opportunity (before update) {
    for (Opportunity opp : Trigger.new) {
        Opportunity oldOpp = Trigger.oldMap.get(opp.Id);
        if (opp.StageName == 'Closed Won' && oldOpp.StageName != 'Closed Won') {
            opp.CloseDate = Date.today();
        }
    }
}
```

This compares each record's new `StageName` against its prior value via
`Trigger.oldMap`, something only possible because `before update` has both
`Trigger.new` and `Trigger.oldMap` available.

## The boolean event-check variables

| Variable | True when |
|---|---|
| `Trigger.isInsert` | Trigger fired due to an insert |
| `Trigger.isUpdate` | Trigger fired due to an update |
| `Trigger.isDelete` | Trigger fired due to a delete |
| `Trigger.isUndelete` | Trigger fired after records were recovered from the Recycle Bin |
| `Trigger.isBefore` | Trigger fired before records were saved |
| `Trigger.isAfter` | Trigger fired after records were saved |
| `Trigger.isExecuting` | True whenever the current Apex code is running in a trigger context (useful inside a helper method that might also run outside a trigger) |

These matter most when one trigger (or one handler) handles multiple
events, since you need to branch on exactly which event is running:

```apex
trigger CaseTrigger on Case (before insert, before update) {
    if (Trigger.isInsert) {
        // only runs for new Cases
    }
    if (Trigger.isUpdate) {
        // only runs for edited Cases
    }
}
```

## Trigger.size

`Trigger.size` is an `Integer` holding the number of records in the
*current* trigger invocation. Because Salesforce processes DML in batches
of up to 200 records (Lesson 23), `Trigger.size` reflects the size of that
batch — not the total number of records in the whole DML statement if it
was larger than 200.

## Key terms

| Term | Meaning |
|---|---|
| `Trigger.new` / `Trigger.old` | Current / prior versions of the records being processed |
| `Trigger.newMap` / `Trigger.oldMap` | Id-keyed maps of the same records |
| `Trigger.isInsert` / `isUpdate` / `isDelete` / `isUndelete` | Which DML event fired the trigger |
| `Trigger.isBefore` / `isAfter` | Which phase of the event is running |
| `Trigger.size` | Number of records in the current trigger batch |

## Lab

Create a trigger on `Contact` for `before insert, before update, before
delete`. In the body, add a `System.debug` that prints which `Trigger.is*`
booleans are true for each operation. Insert a Contact, then update it, then
delete it from the UI, and check Setup → Debug Logs to confirm which flags
were true each time — and confirm `Trigger.old` is unavailable (don't
reference it) during the insert case.

## Check yourself

Why does referencing `Trigger.new` inside a `before delete` block fail, and
which two record-list variables are available during an update?
